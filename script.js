const cover = document.querySelector('.img-container img');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const progress = document.querySelector('.progress');
const playBtn = document.querySelector('.play-pause');
const playPauseImg = document.querySelector('.play-pause img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const currentSongTime = document.querySelector('.current-time');
const currentSongDuration = document.querySelector('.duration');
const progressBar = document.querySelector('.progress-bar');

let audio;

const songs = [
  {
    title: 'Lost in the City Lights',
    artist: 'Cosmo Sheldrake',
    src: '/songs/lost-in-city-lights-145038.mp3',
    image: '/images/cover-1.png',
  },
  {
    title: 'Forest Lullaby',
    artist: 'Lesfm',
    src: '/songs/forest-lullaby-110624.mp3',
    image: '/images/cover-2.png',
  },
];

const loadSong = (song) => {
  cover.src = song.image;
  title.textContent = song.title;
  artist.textContent = song.artist;

  if (!audio) {
    audio = new Audio(song.src);
  } else {
    audio.src = song.src;
  }

  currentSongTime.textContent = convertTime(audio.currentTime);
  currentSongDuration.textContent = '';
};

const playSong = () => {
  playBtn.classList.add('playing');
  audio.play();
};

const pauseSong = () => {
  playBtn.classList.remove('playing');
  audio.pause();
};

const prevSong = () => {
  audio.currentTime = 0;
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
};

const nextSong = () => {
  audio.currentTime = 0;
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
};

const convertTime = (timeInSeconds) => {
  let timeMinutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, '0');
  let timeSeconds = Math.floor(timeInSeconds % 60)
    .toString()
    .padStart(2, '0');

  return `${timeMinutes}:${timeSeconds}`;
};

const updateProgress = (e) => {
  const { currentTime, duration } = e.srcElement;

  progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;

  currentSongTime.textContent = convertTime(currentTime);

  if (duration) {
    currentSongDuration.textContent = convertTime(duration);
  }
};

const setProgress = (e) => {
  const width = e.target.clientWidth;
  const clickX = e.offsetX;

  audio.currentTime = (clickX / width) * audio.duration;

  progress.style.width = `${(clickX / width) * 100}%`;
};

// MAIN
let songIndex = 0;

loadSong(songs[songIndex]);

playBtn.addEventListener('click', () => {
  if (playBtn.classList.contains('playing')) {
    pauseSong();
  } else {
    playSong();
  }
});

nextBtn.addEventListener('click', nextSong);

prevBtn.addEventListener('click', prevSong);

audio.addEventListener('timeupdate', updateProgress);

audio.addEventListener('ended', nextSong);

progressBar.addEventListener('click', setProgress);
