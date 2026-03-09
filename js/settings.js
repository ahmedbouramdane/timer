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

// Font Family Control
const fontFamilySelect = document.getElementById('fontFamilySelect');
if (fontFamilySelect) {
    const savedFont = localStorage.getItem('fontFamily') || 'system-ui';
    fontFamilySelect.value = savedFont;
    document.body.style.fontFamily = savedFont;

    fontFamilySelect.addEventListener('change', (e) => {
        const font = e.target.value;
        document.body.style.fontFamily = font;
        localStorage.setItem('fontFamily', font);
    });
}

// Fit to Screen Control
const fitToScreenToggle = document.getElementById('fitToScreenToggle');
if (fitToScreenToggle) {
    // Enabled by default 
    const isFit = localStorage.getItem('fitToScreen') !== 'false'; 
    fitToScreenToggle.checked = isFit;
    
    if (isFit) document.body.classList.add('fit-to-screen');
    else document.body.classList.remove('fit-to-screen');

    fitToScreenToggle.addEventListener('change', (e) => {
        const checked = e.target.checked;
        localStorage.setItem('fitToScreen', checked);
        if (checked) {
            document.body.classList.add('fit-to-screen');
        } else {
            document.body.classList.remove('fit-to-screen');
        }
    });
}

// Title Size Control
const titleSizeRange = document.getElementById('titleSizeRange');
if (titleSizeRange) {
    const savedTitleSize = localStorage.getItem('titleSize') || '3';
    titleSizeRange.value = savedTitleSize;
    document.body.classList.add('title-size-' + savedTitleSize);

    titleSizeRange.addEventListener('input', (e) => {
        const size = e.target.value;
        document.body.classList.remove('title-size-1', 'title-size-2', 'title-size-3', 'title-size-4', 'title-size-5');
        document.body.classList.add('title-size-' + size);
        localStorage.setItem('titleSize', size);
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
    "linear-gradient(135deg, #212529, #343a40)",
    "linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)",
    "linear-gradient(to right, #4facfe, #00f2fe)",
    "linear-gradient(to right, #43e97b, #38f9d7)",
    "linear-gradient(to right, #fa709a, #fee140)",
    "linear-gradient(to right, #a18cd1, #fbc2eb)",
    "linear-gradient(to top, #30cfd0, #330867)",
    "linear-gradient(120deg, #84fab0, #8fd3f4)",
    "linear-gradient(120deg, #fccb90, #d57eeb)",
    "linear-gradient(to right, #ff8177, #ff867a, #ff8c7f, #f99185, #cf8e81, #ff8177)",
    "linear-gradient(to top, #96fbc4 0%, #f9f586 100%)",
    "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)"
];
const patternColors = [
    "radial-gradient(circle, var(--identity-pattern-color) 10%, transparent 10%)",
    "linear-gradient(45deg, var(--identity-pattern-color) 25%, transparent 25%, transparent 75%, var(--identity-pattern-color) 75%, var(--identity-pattern-color))",
    "repeating-linear-gradient(45deg, var(--identity-pattern-color), var(--identity-pattern-color) 2px, transparent 2px, transparent 6px)",
    "repeating-radial-gradient(var(--identity-pattern-color), var(--identity-pattern-color) 3px, transparent 3px, transparent 15px)"
];

function getContrastYIQ(hexcolor){
    hexcolor = hexcolor.replace("#", "");
    if (hexcolor.length === 3) {
        hexcolor = hexcolor.split('').map(c => c + c).join('');
    }
    const r = parseInt(hexcolor.substr(0,2),16);
    const g = parseInt(hexcolor.substr(2,2),16);
    const b = parseInt(hexcolor.substr(4,2),16);
    const yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? '#000000' : '#ffffff';
}

function applyIdentityColor(bgValue, colorValue = bgValue, patternOpacity = 1) {
    document.documentElement.style.setProperty('--identity-bg', bgValue);
    document.documentElement.style.setProperty('--identity-color', colorValue === bgValue ? bgValue : colorValue);
    
    // Evaluate contrast for text on primary elements if it's a solid / first matched color
    let extractedHexMatch = colorValue.match(/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/);
    let extractedHex = extractedHexMatch ? extractedHexMatch[0] : "#0d6efd";
    document.documentElement.style.setProperty('--identity-text', getContrastYIQ(extractedHex));
    
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
    
    // Setup Custom Color Picker listener
    const customColorPicker = document.getElementById('customColorPicker');
    if (customColorPicker) {
        customColorPicker.addEventListener('input', (e) => {
            const chosenColor = e.target.value;
            selectColor(null, chosenColor, chosenColor);
        });
    }

    // --- NEW LOGIC: Advanced Custom Gradient ---
    const applyCustomGrad = document.getElementById('applyCustomGrad');
    const gradAngle = document.getElementById('gradAngle');
    const gradAngleVal = document.getElementById('gradAngleVal');
    const gradColor1 = document.getElementById('gradColor1');
    const gradColor2 = document.getElementById('gradColor2');
    
    if (gradAngle && gradAngleVal) {
        gradAngle.addEventListener('input', (e) => {
            gradAngleVal.innerHTML = `${e.target.value}&deg;`;
        });
    }
    
    if (applyCustomGrad) {
        applyCustomGrad.addEventListener('click', () => {
            const angle = gradAngle.value;
            const c1 = gradColor1.value;
            const c2 = gradColor2.value;
            const customGrad = `linear-gradient(${angle}deg, ${c1}, ${c2})`;
            selectColor(null, customGrad, c1); // Pass c1 as reference for text color match
        });
    }
    
    // --- NEW LOGIC: Custom Pattern Upload ---
    const uploadPatternBtn = document.getElementById('uploadPatternBtn');
    if (uploadPatternBtn) {
        uploadPatternBtn.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    const base64Data = evt.target.result;
                    // Ensure the base pattern structure overrides smoothly by setting identity-bg explicitly to url()
                    const customPatternVal = `url('${base64Data}') center/cover no-repeat`;
                    selectColor(null, customPatternVal, '#0d6efd'); // Fallback color reference
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // --- NEW LOGIC: Custom Page Title Ticker ---
    const customPageTitleInput = document.getElementById('customPageTitleInput');
    const tickerWrap = document.querySelector('.ticker-wrap');
    const customPageTitle = document.getElementById('customPageTitle');
    
    const defaultTickerMsg = "You can change this title from the settings. write your class N as ex: 1 BAC SM 2";

    function applyCustomTitle(val) {
        if (!val || val.trim() === '') {
            // If empty, show the default English instruction
            if(tickerWrap) tickerWrap.style.display = 'block';
            if(customPageTitle) customPageTitle.textContent = defaultTickerMsg;
        } else if (val.toLowerCase() === 'none') {
            // Special keyword 'none' to hide it
            if(tickerWrap) tickerWrap.style.display = 'none';
        } else {
            if(tickerWrap) tickerWrap.style.display = 'block';
            if(customPageTitle) customPageTitle.textContent = val;
        }
    }

    if (customPageTitleInput) {
        let savedTitle = localStorage.getItem('customPageTitle');
        // If it's the first time or empty, initialize with default so user sees it in input
        if (savedTitle === null || savedTitle.trim() === '') {
            savedTitle = defaultTickerMsg;
            localStorage.setItem('customPageTitle', savedTitle);
        }
        
        customPageTitleInput.value = savedTitle;
        applyCustomTitle(savedTitle);
        
        customPageTitleInput.addEventListener('input', (e) => {
            const val = e.target.value;
            localStorage.setItem('customPageTitle', val);
            applyCustomTitle(val);
        });
    }
    
    // --- NEW LOGIC: Custom Alarm Upload ---
    const uploadAudioInput = document.getElementById('uploadAudioInput');
    const soundSelect = document.getElementById('soundSelect');
    
    // Check local storage for existing custom audio
    function populateCustomAudio() {
        const customAudioLabel = localStorage.getItem('customAudioName');
        const customAudioData = localStorage.getItem('customAudioData');
        
        // Remove existing custom option if it exists
        const existingCustom = Array.from(soundSelect.options).find(opt => opt.value === 'custom_audio');
        if (existingCustom) existingCustom.remove();
        
        if (customAudioData && customAudioLabel) {
            const option = document.createElement('option');
            option.value = 'custom_audio';
            option.text = `👤 [Custom] ${customAudioLabel}`;
            soundSelect.appendChild(option);
            
            // If it was selected before, reselect it
            if (localStorage.getItem('selectedSound') === 'custom_audio') {
                soundSelect.value = 'custom_audio';
            }
        }
    }
    
    if (soundSelect) populateCustomAudio();

    if (uploadAudioInput) {
        uploadAudioInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    const base64Data = evt.target.result;
                    
                    // Simple size limit check for localStorage (roughly 5MB to be safe)
                    try {
                        localStorage.setItem('customAudioData', base64Data);
                        localStorage.setItem('customAudioName', file.name);
                        populateCustomAudio();
                        soundSelect.value = 'custom_audio';
                        localStorage.setItem('selectedSound', 'custom_audio');
                        const alarmAudio = document.getElementById('alarm-audio');
                        if (alarmAudio) alarmAudio.src = base64Data;
                    } catch (err) {
                        alert("File too large. Browser storage limits custom audio upload size.");
                    }
                };
                reader.readAsDataURL(file);
            }
        });
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