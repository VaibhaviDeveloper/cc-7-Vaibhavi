import { State, Action } from './types';

// central function to handle state changes based on actions
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    // START: user clicks record button
    case 'START_RECORDING':
      if (state.mode !== 'normal') return state;

      return {
        ...state,
        mode: 'recording-progress',
        currentRecording: [],
        recordingStartTime: action.payload.startTime,
        pauseStart: null,
        totalPausedTime: 0,
      };

    // PAUSE: user pauses during recording
    case 'PAUSE_RECORDING':
      if (state.mode !== 'recording-progress') return state;

      return {
        ...state,
        mode: 'recording-paused',
        pauseStart: action.payload.pauseTime,
      };

    // RESUME: user resumes from pause
    case 'CONTINUE_RECORDING':
      if (state.mode !== 'recording-paused' || state.pauseStart === null) {
        return state;
      }

      return {
        ...state,
        mode: 'recording-progress',
        pauseStart: null,
        totalPausedTime: state.totalPausedTime + action.payload.pauseDuration,
      };

    // STOP: user stops recording and saves
    case 'STOP_RECORDING':
      if (state.mode !== 'recording-progress' && state.mode !== 'recording-paused') {
        return state;
      }

      return {
        ...state,
        mode: 'normal',
        recording: {
          name: 'Recording',
          beats: [...state.currentRecording],
        },
        currentRecording: [],
        recordingStartTime: null,
        pauseStart: null,
        totalPausedTime: 0,
      };

    // ADD: save keystroke to current recording
    case 'ADD_BEAT':
      if (state.mode !== 'recording-progress') return state;

      return {
        ...state,
        currentRecording: [...state.currentRecording, action.payload],
      };

    // START PLAYBACK: user clicks play
    case 'START_PLAYBACK':
      if (state.mode !== 'normal' || state.recording === null) {
        return state;
      }

      return {
        ...state,
        mode: 'playback-progress',
      };

    // PAUSE PLAYBACK: user pauses during playback
    case 'PAUSE_PLAYBACK':
      if (state.mode !== 'playback-progress') return state;

      return {
        ...state,
        mode: 'playback-paused',
      };

    // RESUME PLAYBACK: user resumes from pause
    case 'CONTINUE_PLAYBACK':
      if (state.mode !== 'playback-paused') return state;

      return {
        ...state,
        mode: 'playback-progress',
      };

    // STOP PLAYBACK: recording finishes or user stops
    case 'STOP_PLAYBACK':
      if (state.mode !== 'playback-progress' && state.mode !== 'playback-paused') {
        return state;
      }

      return {
        ...state,
        mode: 'normal',
      };

    // DELETE: user clears the recording
    case 'CLEAR_RECORDING':
      return {
        ...state,
        currentRecording: [],
        recording: null,
      };

    default:
      return state;
  }
}
