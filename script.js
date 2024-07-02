const stations = [
    {
        title: 'Stacja 1',
        texts: ['Tekst 1.1', 'Tekst 1.2', 'Tekst 1.3'],
        audio: 'sounds/station1.mp3'
    },
    {
        title: 'Stacja 2',
        texts: ['Tekst 2.1', 'Tekst 2.2', 'Tekst 2.3'],
        audio: 'sounds/station2.mp3'
    },
    {
        title: 'Stacja 3',
        texts: ['Tekst 3.1', 'Tekst 3.2', 'Tekst 3.3'],
        audio: 'sounds/station3.mp3'
    }
];
//
let currentStationIndex = 0;
let currentTextIndex = 0;
const stationTitle = document.getElementById('station-title');
const stationText = document.getElementById('station-text');
const audioPlayer = document.getElementById('audio-player');

function updateStation() {
    const station = stations[currentStationIndex];
    stationTitle.textContent = station.title;
    audioPlayer.src = station.audio;
    audioPlayer.play();
    updateText();
}

function updateText() {
    const station = stations[currentStationIndex];
    stationText.classList.remove('neon-fade-in-out');
    void stationText.offsetWidth; // Trigger reflow
    stationText.classList.add('neon-fade-in-out');
    setTimeout(() => {
        stationText.textContent = station.texts[currentTextIndex];
        currentTextIndex = (currentTextIndex + 1) % station.texts.length;
    }, 1000); // Match this to the animation duration
}

document.getElementById('prev-btn').addEventListener('click', () => {
    currentStationIndex = (currentStationIndex - 1 + stations.length) % stations.length;
    currentTextIndex = 0;
    updateStation();
});

document.getElementById('next-btn').addEventListener('click', () => {
    currentStationIndex = (currentStationIndex + 1) % stations.length;
    currentTextIndex = 0;
    updateStation();
});

setInterval(updateText, 5000);
updateStation();
