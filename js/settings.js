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
const volumePercentage = document.getElementById('volumePercentage');
if (volumeSlider && alarmAudio) {
    const savedVolume = localStorage.getItem('alarmVolume') || '1';
    volumeSlider.value = savedVolume;
    alarmAudio.volume = parseFloat(savedVolume);
    if(volumePercentage) volumePercentage.textContent = `${Math.round(savedVolume * 100)}%`;

    volumeSlider.addEventListener('input', (e) => {
        const vol = e.target.value;
        alarmAudio.volume = parseFloat(vol);
        if(volumePercentage) volumePercentage.textContent = `${Math.round(vol * 100)}%`;
        localStorage.setItem('alarmVolume', vol);
    });
}

// Identity Color Control & Advanced Modal
const solidColors = ["#0d6efd", "#6610f2", "#6f42c1", "#e83e8c", "#dc3545", "#fd7e14", "#ffc107", "#198754", "#20c997", "#0dcaf0", "#343a40"];
const gradientColors = [
    "linear-gradient(135deg, #0d6efd, #0dcaf0)",
    "linear-gradient(135deg, #6610f2, #e83e8c)",
    "linear-gradient(135deg, #fd7e14, #ffc107)",
    "linear-gradient(135deg, #198754, #20c997)",
    "linear-gradient(135deg, #dc3545, #fd7e14)",
    "linear-gradient(135deg, #212529, #343a40)"
];
const patternColors = [
    "radial-gradient(circle, var(--identity-pattern-color) 10%, transparent 10%)",
    "linear-gradient(45deg, var(--identity-pattern-color) 25%, transparent 25%, transparent 75%, var(--identity-pattern-color) 75%, var(--identity-pattern-color))",
    "repeating-linear-gradient(45deg, var(--identity-pattern-color), var(--identity-pattern-color) 2px, transparent 2px, transparent 6px)",
    "repeating-radial-gradient(var(--identity-pattern-color), var(--identity-pattern-color) 3px, transparent 3px, transparent 15px)"
];

function applyIdentityColor(bgValue, colorValue = bgValue, patternOpacity = 1) {
    document.documentElement.style.setProperty('--identity-bg', bgValue);
    document.documentElement.style.setProperty('--identity-color', colorValue === bgValue ? bgValue : colorValue);
    
    // Pattern specific logic
    if (bgValue.includes('var(--identity-pattern-color)')) {
        document.documentElement.style.setProperty('--identity-pattern-color', `rgba(13, 110, 253, ${patternOpacity})`);
        document.documentElement.style.setProperty('--identity-bg', bgValue);
        document.documentElement.style.backgroundSize = '20px 20px';
    } else {
        document.documentElement.style.backgroundSize = 'auto'; // Reset
    }
}

function initColorGrids() {
    const solidGrid = document.getElementById('solidColorGrid');
    const gradientGrid = document.getElementById('gradientColorGrid');
    const patternGrid = document.getElementById('patternColorGrid');
    
    if(solidGrid && solidGrid.childElementCount === 0) {
        solidColors.forEach(color => {
            const btn = document.createElement('button');
            btn.className = 'color-btn';
            btn.style.background = color;
            btn.onclick = (e) => selectColor(e, color, color);
            solidGrid.appendChild(btn);
        });
    }

    if(gradientGrid && gradientGrid.childElementCount === 0) {
        gradientColors.forEach(grad => {
            const btn = document.createElement('button');
            btn.className = 'color-btn gradient-btn';
            btn.style.background = grad;
            let firstColorMatch = grad.match(/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/);
            let firstColor = firstColorMatch ? firstColorMatch[0] : "#0d6efd";
            btn.onclick = (e) => selectColor(e, grad, firstColor);
            gradientGrid.appendChild(btn);
        });
    }

    if(patternGrid && patternGrid.childElementCount === 0) {
        patternColors.forEach(pat => {
            const btn = document.createElement('button');
            btn.className = 'color-btn pattern-btn';
            btn.style.setProperty('--identity-pattern-color', 'rgba(13, 110, 253, 0.8)');
            btn.style.background = pat;
            btn.style.backgroundSize = '10px 10px';
            btn.style.border = '1px solid #dee2e6';
            btn.onclick = (e) => selectColor(e, pat, "#0d6efd", document.getElementById('patternOpacity').value);
            patternGrid.appendChild(btn);
        });
    }
    
    const patternOpacity = document.getElementById('patternOpacity');
    const opacityPercentage = document.getElementById('opacityPercentage');
    if (patternOpacity && opacityPercentage) {
        patternOpacity.addEventListener('input', (e) => {
            const val = e.target.value;
            opacityPercentage.textContent = `${Math.round(val * 100)}%`;
            const savedBg = localStorage.getItem('identityBg');
            if(savedBg && savedBg.includes('var(--identity-pattern-color)')) {
                selectColor(null, savedBg, localStorage.getItem('identityColor'), val);
            }
        });
        opacityPercentage.textContent = `${Math.round(patternOpacity.value * 100)}%`;
    }
}

function selectColor(event, bgValue, colorValue, patternOpacity = 1) {
    applyIdentityColor(bgValue, colorValue, patternOpacity);
    localStorage.setItem('identityBg', bgValue);
    localStorage.setItem('identityColor', colorValue);
    localStorage.setItem('patternOpacity', patternOpacity);
    
    // Visual feedback
    if(event && event.currentTarget) {
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active-color'));
        event.currentTarget.classList.add('active-color');
    }
}

// Initialization apply
const savedBg = localStorage.getItem('identityBg') || '#0d6efd';
const savedColor = localStorage.getItem('identityColor') || '#0d6efd';
const savedOpacity = localStorage.getItem('patternOpacity') || '0.1';
applyIdentityColor(savedBg, savedColor, savedOpacity);
window.addEventListener('load', initColorGrids);