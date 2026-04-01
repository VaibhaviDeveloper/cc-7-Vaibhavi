import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Player } from './player';
import type { Beat, Recording } from './types';

describe('Player', () => {
  let playbackMock: import('vitest').Mock<(beat: Beat) => void>;

  beforeEach(() => {
    // Initialize as a typed mock
    playbackMock = vi.fn<(beat: Beat) => void>();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  /**
   * Helper to create a Recording object.
   * Includes 'name' to satisfy the Recording interface requirement.
   */
  const createRecording = (beats: Beat[]): Recording => ({
    name: 'Test Recording',
    beats,
  });

  it('initializes correctly', () => {
    const player = new Player(
      createRecording([
        { key: 'A', timestamp: 0 },
        { key: 'B', timestamp: 100 },
      ]),
      playbackMock
    );

    expect(player.totalBeats).toBe(2);
    expect(player.duration).toBe(100);
    expect(player.currentTime).toBe(0);
  });

  it('plays beats in order', () => {
    const player = new Player(
      createRecording([
        { key: 'A', timestamp: 0 },
        { key: 'B', timestamp: 100 },
      ]),
      playbackMock
    );

    player.play();

    // First beat triggers immediately at 0ms
    vi.advanceTimersByTime(0);
    expect(playbackMock).toHaveBeenCalledWith({
      key: 'A',
      timestamp: 0,
    });

    // Second beat triggers at 100ms
    vi.advanceTimersByTime(100);
    expect(playbackMock).toHaveBeenCalledWith({
      key: 'B',
      timestamp: 100,
    });

    expect(playbackMock).toHaveBeenCalledTimes(2);
  });

  it('pauses playback', () => {
    const player = new Player(
      createRecording([
        { key: 'A', timestamp: 0 },
        { key: 'B', timestamp: 100 },
      ]),
      playbackMock
    );

    player.play();
    // Advance slightly, then pause
    vi.advanceTimersByTime(10);
    player.pause();

    // Advance past the next beat's scheduled time
    vi.advanceTimersByTime(200);

    // Only the first beat (at 0ms) should have been called before the pause
    expect(playbackMock).toHaveBeenCalledTimes(1);
  });

  it('seeks correctly', () => {
    const player = new Player(
      createRecording([
        { key: 'A', timestamp: 0 },
        { key: 'B', timestamp: 100 },
        { key: 'C', timestamp: 200 },
      ]),
      playbackMock
    );
    player.seekTo(2);
    expect(player.currentTime).toBe(100);
  });

  it('notifies listeners', () => {
    const player = new Player(
      createRecording([
        { key: 'A', timestamp: 0 },
        { key: 'B', timestamp: 100 },
      ]),
      playbackMock
    );

    const listener = vi.fn();
    player.subscribe(listener);

    player.play();
    expect(listener).toHaveBeenCalledWith(0, 2);

    vi.advanceTimersByTime(0);
    expect(listener).toHaveBeenCalledWith(1, 2);

    vi.advanceTimersByTime(100);
    expect(listener).toHaveBeenCalledWith(2, 2);
  });

  it('unsubscribes listeners', () => {
    const player = new Player(createRecording([{ key: 'A', timestamp: 0 }]), playbackMock);

    const listener = vi.fn();
    player.subscribe(listener);
    player.unsubscribe(listener);

    player.play();
    vi.advanceTimersByTime(0);

    // Listener will not be called if unsubscription was successful
    expect(listener).not.toHaveBeenCalled();
  });

  it('handles empty recording', () => {
    const player = new Player(createRecording([]), playbackMock);

    player.play();
    vi.runAllTimers();

    expect(playbackMock).not.toHaveBeenCalled();
    expect(player.duration).toBe(0);
  });

  it('clamps seekTo bounds', () => {
    const player = new Player(createRecording([{ key: 'A', timestamp: 0 }]), playbackMock);

    // Lower bound clamp
    player.seekTo(-5);
    expect(player.beatIndex).toBe(0);

    // Upper bound clamp
    player.seekTo(100);
    expect(player.beatIndex).toBe(player.totalBeats);
  });

  it('normalizes pauses correctly', () => {
    const player = new Player(
      createRecording([
        { key: 'A', timestamp: 0 },
        { key: 'PAUSE', timestamp: 100 },
        { key: 'B', timestamp: 300 },
      ]),
      playbackMock
    );

    // Logic: 300 (total) - 200 (pause duration) = 100
    expect(player.duration).toBe(100);
    expect(player.totalBeats).toBe(2);
  });

  it('does not play when already at end', () => {
    const player = new Player(createRecording([{ key: 'A', timestamp: 0 }]), playbackMock);
    player.seekTo(1);
    playbackMock.mockClear();

    player.play();
    vi.runAllTimers();
    // Should not trigger playback because index >= beats.length
    expect(playbackMock).not.toHaveBeenCalled();
  });
});
