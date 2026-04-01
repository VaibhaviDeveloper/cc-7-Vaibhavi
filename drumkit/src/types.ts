export type Mode =
  | 'normal'
  | 'recording-progress'
  | 'recording-paused'
  | 'playback-progress'
  | 'playback-paused';

export interface Beat {
  key: string;
  timestamp: number;
}

export interface Recording {
  name: string;
  beats: Beat[];
}

export interface State {
  mode: Mode;
  recording: Recording | null;
  currentRecording: Beat[];

  recordingStartTime: number | null;
  pauseStart: number | null;
  totalPausedTime: number;
}

export type Action =
  | { type: 'START_RECORDING'; payload: { startTime: number } }
  | { type: 'PAUSE_RECORDING'; payload: { pauseTime: number } }
  | { type: 'CONTINUE_RECORDING'; payload: { pauseDuration: number } }
  | { type: 'STOP_RECORDING' }
  | { type: 'ADD_BEAT'; payload: Beat }
  | { type: 'START_PLAYBACK' }
  | { type: 'PAUSE_PLAYBACK' }
  | { type: 'CONTINUE_PLAYBACK' }
  | { type: 'STOP_PLAYBACK' }
  | { type: 'CLEAR_RECORDING' };
