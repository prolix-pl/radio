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

let currentStationIndex = 0;
let currentTextIndex = 0;
let clickCount = 0; // Number of clicks
const stationTitle = document.getElementById('station-title');
const stationText = document.getElementById('station-text');
const audioPlayer = document.getElementById('audio-player');
const colorPicker = document.getElementById('color-picker');

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

function changeColor() {
    const color = colorPicker.value;
    stationTitle.style.color = color;
    stationText.style.color = color;
    stationTitle.style.textShadow = `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}, 0 0 80px ${color}`;
    stationText.style.textShadow = `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}, 0 0 80px ${color}`;
}

stationTitle.addEventListener('click', () => {
    clickCount++;
    if (clickCount >= 3) {
        colorPicker.style.display = 'block';
        colorPicker.focus();
        clickCount = 0; // Reset the click count after showing color picker
    }
});

colorPicker.addEventListener('input', () => {
    changeColor();
});

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
