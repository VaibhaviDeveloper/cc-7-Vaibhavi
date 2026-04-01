import { Beat, Recording } from './types';

// function type for observers that get called on playback updates
type Listener = (beatIndex: number, totalBeats: number) => void;
type Timeout = ReturnType<typeof setTimeout>;

// handles playing back recorded beats with pause/seek support
export class Player {
  listeners: Listener[] = [];
  scheduledPlaybackTimers: Timeout[] = [];
  beatIndex: number = 0;
  private normalisedBeats: Beat[];

  get totalBeats() {
    return this.normalisedBeats.length;
  }

  constructor(
    recording: Recording,
    private playback: (beat: Beat) => void
  ) {
    // normalize beats to remove pause durations
    this.normalisedBeats = this.normaliseBeats(recording.beats, 0);
  }

  // total duration of recording in milliseconds
  get duration() {
    if (this.normalisedBeats.length === 0) return 0;
    return this.normalisedBeats[this.normalisedBeats.length - 1].timestamp;
  }

  // current playback time in milliseconds
  get currentTime() {
    if (this.beatIndex === 0 || this.normalisedBeats.length === 0) return 0;
    const idx = Math.min(this.beatIndex - 1, this.normalisedBeats.length - 1);
    return this.normalisedBeats[idx].timestamp;
  }

  // jump to specific beat index and stop playback
  seekTo(beatIndex: number) {
    const boundedIndex = Math.max(0, Math.min(beatIndex, this.totalBeats));
    this.pause();
    this.beatIndex = boundedIndex;
    this.notify();
  }

  // subscribe to playback updates
  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  // unsubscribe from playback updates
  unsubscribe(listener: Listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  // tell all listeners about current playback state
  notify() {
    this.listeners.forEach((l) => l(this.beatIndex, this.totalBeats));
  }

  normaliseBeats(beats: Beat[], fromIndex: number): Beat[] {
    if (beats.length === 0 || fromIndex >= beats.length) return [];

    const referenceTimestamp = beats[fromIndex].timestamp;
    let accumulatedPauseDuration = 0;
    const result: Beat[] = [];

    // loop through beats and skip pause markers
    for (let i = fromIndex; i < beats.length; i++) {
      const beat = beats[i];
      if (beat.key === 'PAUSE') {
        // add pause duration so later beats don't include it
        if (i + 1 < beats.length) {
          accumulatedPauseDuration += beats[i + 1].timestamp - beat.timestamp;
        }
      } else {
        // adjust beat timestamp to account for pauses
        result.push({
          key: beat.key,
          timestamp: beat.timestamp - referenceTimestamp - accumulatedPauseDuration,
        });
      }
    }

    return result;
  }

  // schedule all beats to play at correct times
  play() {
    const beats = this.normalisedBeats;
    const fromIndex = this.beatIndex;
    if (fromIndex >= beats.length) return;

    const referenceTime = beats[fromIndex].timestamp;

    for (let i = fromIndex; i < beats.length; i++) {
      const beat = beats[i];
      const delay = beat.timestamp - referenceTime;
      const index = i;
      const timer = setTimeout(() => {
        this.playback(beat);
        this.beatIndex = index + 1;
        this.notify();
      }, delay);
      this.scheduledPlaybackTimers.push(timer);
    }

    this.notify();
  }

  pause() {
    this.scheduledPlaybackTimers.forEach((t) => clearTimeout(t));
    this.scheduledPlaybackTimers = [];
  }
}
