const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const volumeSlider = document.getElementById('volume-slider');
const muteButton = document.getElementById('mute');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const songList = document.getElementById('song-list');

const mediaTracks = [
    { title: "Adventure", artist: "Ehrling", audioSrc: "songs/Ehrling - Adventure.mp3" },
    { title: "Ten", artist: "Jozzy", audioSrc: "songs/Fred again.., Jozzy - Ten (Slowed n Reverb).mp3" },
    { title: "Scheming on me", artist: "Prvnci", audioSrc: "songs/Prvnci- Scheming on me (Instrumental).mp3" },
    { title: " Renegades", artist: "X Ambassadors", audioSrc: "songs/X Ambassadors - Renegades (Lyric Video).mp3" },
    { title: "Mood", artist: "24kGoldn ft. iann dior", audioSrc: "songs/24kGoldn - Mood (Official Video) ft. iann dior.mp3" },
    { title: " Fast Car ", artist: "Jonas Blue ft. Dakota ", audioSrc: "songs/Jonas Blue - Fast Car ft. Dakota (Official Video).mp3" }
];

let currentTrackIndex = 0;
let isMuted = false;

// Load the initial track
function loadTrack(index) {
    audio.src = mediaTracks[index].audioSrc;
    trackTitle.textContent = mediaTracks[index].title;
    trackArtist.textContent = mediaTracks[index].artist;
    audio.load();
}

// Play the current track
function playTrack() {
    audio.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline';
}

// Pause the current track
function pauseTrack() {
    audio.pause();
    playButton.style.display = 'inline';
    pauseButton.style.display = 'none';
}

// Play the next track
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % mediaTracks.length;
    loadTrack(currentTrackIndex);
    playTrack();
}

// Play the previous track
function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + mediaTracks.length) % mediaTracks.length;
    loadTrack(currentTrackIndex);
    playTrack();
}

// Update progress bar
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;

    // Update current time display
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    durationDisplay.textContent = formatTime(audio.duration);
});

// Seek through the track
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Format time in minutes and seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Adjust volume
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
});

// Mute/Unmute
muteButton.addEventListener('click', () => {
    isMuted = !isMuted;
    audio.muted = isMuted;
    muteButton.innerHTML = isMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
});

// Load the song list
function loadSongList() {
    mediaTracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = `${track.title} - ${track.artist}`;
        li.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            playTrack();
        });
        songList.appendChild(li);
    });
}

// Event listeners for buttons
playButton.addEventListener('click', playTrack);
pauseButton.addEventListener('click', pauseTrack);
nextButton.addEventListener('click', nextTrack);
prevButton.addEventListener('click', prevTrack);

// Load the first track and song list
loadTrack(currentTrackIndex);
loadSongList();