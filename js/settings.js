// Set the sound name in the local storage to use it in main.js
document.getElementById('alarm-audio').src = localStorage.getItem('selectedSound') || 'alarm1.mp3';
document.getElementById('soundSelect').addEventListener('change', function() {
    localStorage.setItem('selectedSound', this.value);
    // set alarm sound source from local storage or default sound
    let alarmAudio = document.getElementById('alarm-audio');
    let selectedSound = localStorage.getItem('selectedSound') || 'alarm1.mp3';
    alarmAudio.src = `${selectedSound}`;
    
});

function darkTheme(dark=false) {
    if (dark) {
        let container = document.getElementById('container');
        let style = document.getElementById('bootstrap');
        style.setAttribute('href', './css/bootstrap-bootswatch.min.css')
        container.classList.remove('bg-white')
        container.classList.add('bg-dark')
        console.log(container);
        localStorage.setItem('theme', 'dark');
    }

    else {
        let style = document.getElementById('bootstrap');
        style.setAttribute('href', './css/bootstrap.min.css');
        container.classList.remove('bg-dark')
        container.classList.add('bg-white')
        localStorage.setItem('theme', 'light');

    }
}

if (localStorage.getItem('theme') === 'dark') {
    darkTheme(true);
}

document.getElementById('themeSelect').addEventListener('change', (e) => {
    localStorage.setItem('selectedTheme', e.currentTarget.value || 'light')
    if (e.currentTarget.value === 'dark') {
        darkTheme(true);
        
    } else {
        darkTheme();
    }

})