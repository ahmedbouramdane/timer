// Set the sound name in the local storage to use it in main.js
let soundsMenu = document.getElementById('soundSelect');
document.getElementById('alarm-audio').src = localStorage.getItem('selectedSound') || './audio/alarm1.mp3';
let currentSound = localStorage.getItem("selectedSound")
for (let index = 0; index < soundsMenu.children.length; index++) {
    const element = soundsMenu.children[index];
    if (element.value === currentSound) {
        element.selected = true;
    } else {
        element.selected = false;
    }
    
    
    
}


document.getElementById('soundSelect').addEventListener('change', function() {
    localStorage.setItem('selectedSound', this.value);
    // set alarm sound source from local storage or default sound
    let alarmAudio = document.getElementById('alarm-audio');
    let selectedSound = localStorage.getItem('selectedSound') || './audio/alarm1.mp3';
    alarmAudio.src = `${selectedSound}`;
    
});

function applyTheme(theme = 'light') {
    let container = document.getElementById('container');
    let style = document.getElementById('bootstrap');
    
    // Evaluate auto theme
    let actualTheme = theme;
    if (theme === 'auto') {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        actualTheme = prefersDark ? 'dark' : 'light';
    }

    if (actualTheme === 'dark') {
        style.setAttribute('href', './css/bootstrap-bootswatch.min.css');
        container.classList.remove('bg-white');
        container.classList.add('bg-dark');
        document.body.classList.add('dark-theme');
    } else {
        style.setAttribute('href', './css/bootstrap.min.css');
        container.classList.remove('bg-dark');
        container.classList.add('bg-white');
        document.body.classList.remove('dark-theme');
    }
    
    localStorage.setItem('theme', theme);
    const themeSelectBtn = document.getElementById('themeSelect');
    if(themeSelectBtn) themeSelectBtn.value = theme;
}

// Initial load
let savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

document.getElementById('themeSelect').addEventListener('change', (e) => {
    applyTheme(e.currentTarget.value || 'light');
});

// Listen for system theme changes if set to auto
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (localStorage.getItem('theme') === 'auto') {
        applyTheme('auto');
    }
});

// Alarm Volume Control
const volumeSlider = document.getElementById('volumeSlider');
const alarmAudio = document.getElementById('alarm-audio');
if (volumeSlider && alarmAudio) {
    const savedVolume = localStorage.getItem('alarmVolume') || '1';
    volumeSlider.value = savedVolume;
    alarmAudio.volume = parseFloat(savedVolume);

    volumeSlider.addEventListener('input', (e) => {
        const vol = e.target.value;
        alarmAudio.volume = parseFloat(vol);
        localStorage.setItem('alarmVolume', vol);
    });
}

// Identity Color Control
const colorPicker = document.getElementById('colorPicker');
function applyIdentityColor(color) {
    document.documentElement.style.setProperty('--identity-color', color);
}

if (colorPicker) {
    const savedColor = localStorage.getItem('identityColor') || '#0d6efd';
    colorPicker.value = savedColor;
    applyIdentityColor(savedColor);

    colorPicker.addEventListener('input', (e) => {
        const color = e.target.value;
        applyIdentityColor(color);
        localStorage.setItem('identityColor', color);
    });
} else {
    // If we're on a page without the picker, still apply the saved color
    const savedColor = localStorage.getItem('identityColor') || '#0d6efd';
    applyIdentityColor(savedColor);
}