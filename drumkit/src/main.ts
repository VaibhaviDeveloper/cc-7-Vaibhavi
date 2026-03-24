import { reducer } from './reducer';
import { State, Beat } from './types';
import { Player } from './player';

// global state for the app
let state: State = {
  mode: 'normal',
  recording: null,
  currentRecording: [],
  recordingStartTime: null,
  pauseStart: null,
  totalPausedTime: 0,
};

// current player instance during playback
let player: Player | null = null;

// send action to reducer and re-render ui
function dispatch(action: Parameters<typeof reducer>[1]) {
  state = reducer(state, action);
  (window as any).state = state;
  render();
}

// play sound for given key code
function playSound(keyCode: string) {
  const audio = document.querySelector<HTMLAudioElement>(`audio[data-key="${keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
}

// add css class to highlight key being pressed
function animateKey(keyCode: string) {
  const keyEl = document.querySelector<HTMLElement>(`.key[data-key="${keyCode}"]`);
  if (!keyEl) return;
  keyEl.classList.add('playing');
  keyEl.addEventListener('transitionend', () => keyEl.classList.remove('playing'), { once: true });
}

// convert milliseconds to mm:ss format
function formatTime(ms: number) {
  const seconds = Math.floor(ms / 1000);
  const m = seconds % 60;
  const s = Math.floor(seconds / 60);
  return `${s}:${m.toString().padStart(2, '0')}`;
}

// update playbar, slider, and time display
function setProgress(beatIndex: number, totalBeats: number) {
  const clamped = Math.min(totalBeats, Math.max(0, beatIndex));
  const percent = totalBeats > 0 ? (clamped / totalBeats) * 100 : 0;
  playProgress.style.width = `${percent}%`;
  seekBar.max = totalBeats.toString();
  seekBar.value = clamped.toString();

  const elapsedMs = player ? player.currentTime : 0;
  const totalMs = player ? player.duration : 0;
  seekTime.textContent = `${formatTime(elapsedMs)} / ${formatTime(totalMs)}`;
}

// listen for keyboard input and record/play sounds
window.addEventListener('keydown', (e) => {
  if (e.repeat) return;
  const keyCode = e.keyCode.toString();
  const audio = document.querySelector<HTMLAudioElement>(`audio[data-key="${keyCode}"]`);
  if (!audio) return;

  // play and animate the key
  animateKey(keyCode);
  playSound(keyCode);

  // if recording, add this beat to the list
  if (state.mode === 'recording-progress') {
    dispatch({ type: 'ADD_BEAT', payload: { key: keyCode, timestamp: Date.now() } });
  }
});

// get button elements from html
const recordBtn = document.getElementById('record') as HTMLButtonElement;
const pauseBtn = document.getElementById('pause') as HTMLButtonElement;
const resumeBtn = document.getElementById('resume') as HTMLButtonElement;
const playBtn = document.getElementById('play') as HTMLButtonElement;
const clearBtn = document.getElementById('clear') as HTMLButtonElement;
const playProgress = document.getElementById('play-progress')!;
const seekBar = document.getElementById('seek-bar') as HTMLInputElement;
const seekTime = document.getElementById('seek-time') as HTMLDivElement;

// record button: start/stop recording
recordBtn.addEventListener('click', () => {
  if (state.mode === 'normal') {
    dispatch({ type: 'START_RECORDING', payload: { startTime: Date.now() } });
  } else if (state.mode === 'recording-progress' || state.mode === 'recording-paused') {
    dispatch({ type: 'STOP_RECORDING' });
  }
});

// pause button: pause recording or playback
pauseBtn.addEventListener('click', () => {
  if (state.mode === 'recording-progress') {
    dispatch({ type: 'ADD_BEAT', payload: { key: 'PAUSE', timestamp: Date.now() } });
    dispatch({ type: 'PAUSE_RECORDING', payload: { pauseTime: Date.now() } });
  } else if (state.mode === 'playback-progress') {
    player?.pause();
    dispatch({ type: 'PAUSE_PLAYBACK' });
  }
});

// resume button: continue recording or playback
resumeBtn.addEventListener('click', () => {
  if (state.mode === 'recording-paused') {
    dispatch({
      type: 'CONTINUE_RECORDING',
      payload: { pauseDuration: Date.now() - (state.pauseStart ?? Date.now()) },
    });
  } else if (state.mode === 'playback-paused') {
    player?.play();
    dispatch({ type: 'CONTINUE_PLAYBACK' });
  }
});

// play button: start playback from current seek position
playBtn.addEventListener('click', () => {
  if (state.mode !== 'normal' || !state.recording) return;

  dispatch({ type: 'START_PLAYBACK' });

  // create player with callback to play sounds
  player = new Player(state.recording, (beat: Beat) => {
    playSound(beat.key);
    animateKey(beat.key);
  });

  // update ui when beats are played
  player.subscribe((beatIndex, totalBeats) => {
    setProgress(beatIndex, totalBeats);
    if (beatIndex >= totalBeats) {
      player = null;
      dispatch({ type: 'STOP_PLAYBACK' });
    }
  });

  // start playback from where the slider is set
  const desiredIndex = Math.max(0, Math.min(player.totalBeats, parseInt(seekBar.value, 10) || 0));
  if (desiredIndex > 0) {
    player.seekTo(desiredIndex);
  }
  setProgress(player.beatIndex, player.totalBeats);
  player.play();
});

// slider: seek to different position in recording
seekBar.addEventListener('input', () => {
  if (!player || !state.recording) return;

  const jumpIndex = parseInt(seekBar.value, 10);
  player.seekTo(jumpIndex);
  setProgress(jumpIndex, player.totalBeats);

  // if playing, continue from new position
  if (state.mode === 'playback-progress') {
    player.play();
  }
});

// clear button: delete recording and reset
clearBtn.addEventListener('click', () => {
  const confirmClear = confirm("Are you sure you want to clear the recording?");

  if (!confirmClear) return;

  player?.pause();
  player = null;
  dispatch({ type: 'CLEAR_RECORDING' });
});

// update ui based on current state
function render() {
  // reset all buttons to default state
  pauseBtn.style.display = 'none';
  resumeBtn.style.display = 'none';
  recordBtn.disabled = false;
  playBtn.disabled = false;
  clearBtn.disabled = false;
  seekBar.disabled = true;

  // update buttons based on mode
  switch (state.mode) {
    case 'normal':
      recordBtn.textContent = 'Record';
      playBtn.disabled = !state.recording;
      clearBtn.disabled = !state.recording;
      seekBar.disabled = !state.recording;
      seekBar.value = '0';
      seekBar.max = state.recording ? state.recording.beats.length.toString() : '0';
      seekTime.textContent = '0:00 / 0:00';
      playProgress.style.width = '0%';
      break;

    case 'recording-progress':
      recordBtn.textContent = '⏹ Stop';
      pauseBtn.style.display = '';
      playBtn.disabled = true;
      clearBtn.disabled = true;
      break;

    case 'recording-paused':
      recordBtn.textContent = '⏹ Stop';
      resumeBtn.style.display = '';
      playBtn.disabled = true;
      clearBtn.disabled = true;
      break;

    case 'playback-progress':
      recordBtn.disabled = true;
      pauseBtn.style.display = '';
      playBtn.disabled = true;
      clearBtn.disabled = true;
      seekBar.disabled = false;
      break;

    case 'playback-paused':
      recordBtn.disabled = true;
      resumeBtn.style.display = '';
      playBtn.disabled = true;
      clearBtn.disabled = true;
      seekBar.disabled = false;
      break;
  }
}
// @ts-ignore - Expose state for Playwright testing
window.state = state;
// @ts-ignore
window.player = player;
render();
