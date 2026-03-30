import { describe, it, expect } from 'vitest';
import { reducer } from './reducer';
import { State, Beat } from './types';

const initialState: State = {
  mode: 'normal',
  recording: null,
  currentRecording: [],
  recordingStartTime: null,
  pauseStart: null,
  totalPausedTime: 0,
};

const beat: Beat = { key: 'A', timestamp: 100 };

describe('Reducer', () => {
  it('START_RECORDING', () => {
    const newState = reducer(initialState, {
      type: 'START_RECORDING',
      payload: { startTime: 1000 },
    });

    expect(newState.mode).toBe('recording-progress');
    expect(newState.currentRecording).toEqual([]);
    expect(newState.recordingStartTime).toBe(1000);
  });

  it('START_RECORDING ignored if not normal', () => {
    const state = { ...initialState, mode: 'recording-progress' as const };

    const newState = reducer(state, {
      type: 'START_RECORDING',
      payload: { startTime: 1000 },
    });

    expect(newState).toBe(state);
  });

  it('PAUSE_RECORDING', () => {
    const state = { ...initialState, mode: 'recording-progress' as const };

    const newState = reducer(state, {
      type: 'PAUSE_RECORDING',
      payload: { pauseTime: 2000 },
    });

    expect(newState.mode).toBe('recording-paused');
    expect(newState.pauseStart).toBe(2000);
  });

  it('PAUSE_RECORDING should not work if not recording', () => {
    const state = { ...initialState, mode: 'normal' as const };

    const newState = reducer(state, {
      type: 'PAUSE_RECORDING',
      payload: { pauseTime: 2000 },
    });

    expect(newState).toBe(state);
  });

  it('CONTINUE_RECORDING', () => {
    const state: State = {
      ...initialState,
      mode: 'recording-paused',
      pauseStart: 2000,
      totalPausedTime: 100,
    };

    const newState = reducer(state, {
      type: 'CONTINUE_RECORDING',
      payload: { pauseDuration: 300 },
    });

    expect(newState.mode).toBe('recording-progress');
    expect(newState.pauseStart).toBeNull();
    expect(newState.totalPausedTime).toBe(400);
  });

  it('CONTINUE_RECORDING ignored if invalid', () => {
    const newState = reducer(initialState, {
      type: 'CONTINUE_RECORDING',
      payload: { pauseDuration: 300 },
    });

    expect(newState).toBe(initialState);
  });

  it('CONTINUE_RECORDING should fail if pauseStart is null', () => {
    const state: State = {
      ...initialState,
      mode: 'recording-paused',
      pauseStart: null,
      totalPausedTime: 0,
    };

    const newState = reducer(state, {
      type: 'CONTINUE_RECORDING',
      payload: { pauseDuration: 300 },
    });

    expect(newState).toBe(state);
  });

  it('ADD_BEAT', () => {
    const state = { ...initialState, mode: 'recording-progress' as const };

    const newState = reducer(state, {
      type: 'ADD_BEAT',
      payload: beat,
    });

    expect(newState.currentRecording).toEqual([beat]);
  });

  it('ADD_BEAT ignored when not recording', () => {
    const newState = reducer(initialState, {
      type: 'ADD_BEAT',
      payload: beat,
    });

    expect(newState).toBe(initialState);
  });

  it('STOP_RECORDING', () => {
    const state: State = {
      ...initialState,
      mode: 'recording-progress',
      currentRecording: [beat],
      recordingStartTime: 1000,
    };

    const newState = reducer(state, {
      type: 'STOP_RECORDING',
    });

    expect(newState.mode).toBe('normal');
    expect(newState.recording?.beats).toEqual([beat]);
    expect(newState.currentRecording).toEqual([]);
  });

  it('STOP_RECORDING from paused state', () => {
    const state: State = {
      ...initialState,
      mode: 'recording-paused',
      currentRecording: [beat, beat],
      pauseStart: 1500,
    };

    const newState = reducer(state, {
      type: 'STOP_RECORDING',
    });

    expect(newState.mode).toBe('normal');
    expect(newState.recording?.beats).toEqual([beat, beat]);
  });

  it('STOP_RECORDING should do nothing if invalid mode', () => {
    const state: State = {
      ...initialState,
      mode: 'normal',
    };

    const newState = reducer(state, {
      type: 'STOP_RECORDING',
    });

    expect(newState).toBe(state);
  });

  it('START_PLAYBACK', () => {
    const state: State = {
      ...initialState,
      recording: { name: 'R1', beats: [beat] },
    };

    const newState = reducer(state, {
      type: 'START_PLAYBACK',
    });

    expect(newState.mode).toBe('playback-progress');
  });

  it('START_PLAYBACK ignored if no recording', () => {
    const newState = reducer(initialState, {
      type: 'START_PLAYBACK',
    });

    expect(newState).toBe(initialState);
  });

  it('PAUSE_PLAYBACK', () => {
    const state = { ...initialState, mode: 'playback-progress' as const };

    const newState = reducer(state, {
      type: 'PAUSE_PLAYBACK',
    });

    expect(newState.mode).toBe('playback-paused');
  });

  it('PAUSE_PLAYBACK should not work in normal mode', () => {
    const state = { ...initialState, mode: 'normal' as const };

    const newState = reducer(state, {
      type: 'PAUSE_PLAYBACK',
    });

    expect(newState).toBe(state);
  });

  it('PAUSE_PLAYBACK should not work when paused already', () => {
    const state = { ...initialState, mode: 'playback-paused' as const };

    const newState = reducer(state, {
      type: 'PAUSE_PLAYBACK',
    });

    expect(newState).toBe(state);
  });

  it('CONTINUE_PLAYBACK', () => {
    const state = { ...initialState, mode: 'playback-paused' as const };

    const newState = reducer(state, {
      type: 'CONTINUE_PLAYBACK',
    });

    expect(newState.mode).toBe('playback-progress');
  });

  it('CONTINUE_PLAYBACK should not work in normal mode', () => {
    const state = { ...initialState, mode: 'normal' as const };

    const newState = reducer(state, {
      type: 'CONTINUE_PLAYBACK',
    });

    expect(newState).toBe(state);
  });

  it('CONTINUE_PLAYBACK should not work when already playing', () => {
    const state = { ...initialState, mode: 'playback-progress' as const };

    const newState = reducer(state, {
      type: 'CONTINUE_PLAYBACK',
    });

    expect(newState).toBe(state);
  });

  it('STOP_PLAYBACK', () => {
    const state = { ...initialState, mode: 'playback-progress' as const };

    const newState = reducer(state, {
      type: 'STOP_PLAYBACK',
    });

    expect(newState.mode).toBe('normal');
  });

  it('STOP_PLAYBACK from paused state', () => {
    const state = { ...initialState, mode: 'playback-paused' as const };

    const newState = reducer(state, {
      type: 'STOP_PLAYBACK',
    });

    expect(newState.mode).toBe('normal');
  });

  it('STOP_PLAYBACK should not work in normal mode', () => {
    const state = { ...initialState, mode: 'normal' as const };

    const newState = reducer(state, {
      type: 'STOP_PLAYBACK',
    });

    expect(newState).toBe(state);
  });

  it('CLEAR_RECORDING', () => {
    const state: State = {
      ...initialState,
      recording: { name: 'R1', beats: [beat] },
      currentRecording: [beat],
    };

    const newState = reducer(state, {
      type: 'CLEAR_RECORDING',
    });

    expect(newState.recording).toBeNull();
    expect(newState.currentRecording).toEqual([]);
  });

  it('default case returns state', () => {
    const newState = reducer(initialState, { type: 'UNKNOWN' } as any);
    expect(newState).toBe(initialState);
  });
});
