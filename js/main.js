let container = document.getElementById("container"),
    nav = document.getElementsByTagName('nav')[0],
    // footer = document.getElementsByTagName('footer')[0],
     windowHeight = window.innerHeight;

// activate full screen and change the container height when the window is resized or clicked
// window.addEventListener('resize', () => {
//     container.style.height = `${windowHeight - nav.offsetHeight -footer.offsetHeight}px`;
// });
// window.addEventListener('click', () => {
//     const windowHeight = window.innerHeight;
//     container.style.height = `${windowHeight - nav.offsetHeight -footer.offsetHeight}px`;
// });
window.addEventListener('dblclick', () => {
    
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
            console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    }
//     const windowHeight = window.innerHeight;
// container.style.height = `${windowHeight - nav.offsetHeight -footer.offsetHeight}px`;

});

// function setHeight(footer=false) {
//     container.style.height = `${windowHeight - nav.offsetHeight - footer.offsetHeight}px`;
// }


// container.style.minHeight = `${windowHeight - nav.offsetHeight -footer.offsetHeight}px`;

//****************** */ Start - Login settings *************************
let username = document.getElementsByName('username')[0];
let password = document.getElementsByName('password')[0];
let timerContainer = document.getElementsByClassName('timer')[0];
/*
let loginContainer = document.getElementsByClassName('login-form')[0];
// timerContainer.style.display = 'none';
const USERS = ['Ahmed Bouramdane', 'Youssef', "Haytham"];
const PASSWORDS = ['AhmedB1234', 'Youssefenn', "Haytham1234"];

function updateClassroom(password) {
    let classroom = document.getElementById('classroom');
    if (password === 'AhmedB1234') {
        classroom.innerHTML = `1<sup>ère</sup> année Bac Science Math 2`;
    } else if (password === 'Youssefenn') {
        classroom.innerHTML = `1<sup>ère</sup> année Bac Science Math 1 `;
    } else if (password === 'Haytham1234') {
        classroom.innerHTML = `1<sup>ère</sup> année Bac Science Math 5 `;
    } else {
        classroom.innerHTML = `Classroom not found`;
    }
}
document.getElementById("login-btn").addEventListener('click', () => {
    if (USERS.includes(username.value) && PASSWORDS.includes(password.value)) {
        timerContainer.style.display = 'block';
        loginContainer.style.display = 'none';
        updateClassroom(password.value);
        
    } else {
        // validation failed
        username.style.border = '2px solid red';
        password.style.border = '2px solid red';
        username.value = '';
        password.value = '';
        // bg light red for 2 seconds
        username.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
        password.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';

        setTimeout(() => {
            username.style.backgroundColor = '';
            password.style.backgroundColor = '';
            username.style.border = '';
            password.style.border = '';
        }, 2000);
        
    }
})
*/

//****************** */ End - Login settings *************************
let na = 34;

//****************** */ Start - Timer Container *************************
let startBtn = document.getElementById('start-btn');
let pauseBtn = document.getElementById('pause-btn');
let resetBtn = document.getElementById('reset-btn');
// Replaced flatpickr with native inputs
let inputHours = document.getElementById('input-hours');
let inputMinutes = document.getElementById('input-minutes');
let inputSeconds = document.getElementById('input-seconds');
let timeShow = document.getElementsByClassName('time-show')[0];
let interval;
let totalSeconds = 0;
let isPaused = false;
let remainingSeconds = 0;
let begin = true;
let allSecondsInTheRound = 0;

function updateTimeDisplay(seconds) {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    timeShow.innerHTML = `<span id="hours" class="animate-num">${hours}</span><span class="time-separator">:</span><span id="minutes" class="animate-num">${minutes}</span><span class="time-separator">:</span><span id="seconds" class="animate-num">${secs}</span>`;
    // progress bar
    const percentage = ((seconds * 100) / allSecondsInTheRound).toFixed(0);
    const progress = document.getElementsByClassName("progress-bar")[0];

    progress.setAttribute('style', `width: ${!isNaN(percentage) ? percentage : 100}% !important`)
    progress.innerText = `${!isNaN(percentage) ? percentage : 100}%`
}

startBtn.addEventListener('click', () => {
    // Validate inputs
    let h = parseInt(inputHours.value) || 0;
    let m = parseInt(inputMinutes.value) || 0;
    let s = parseInt(inputSeconds.value) || 0;
    
    if (h === 0 && m === 0 && s === 0) {
        // show bootstrap toast for invalid time format automatically
        let toastEl = document.querySelector('#invalidTimeToast .toast');
        let toast = new bootstrap.Toast(toastEl);
        toast.show();
        return; // Stop processing if input is invalid
    }
    begin = false;
    pauseBtn.disabled = false;
    startBtn.disabled = true;
    isPaused = false;
    if (isPaused) {
        startBtn.innerHTML = 'Start';
        totalSeconds = remainingSeconds;
        allSecondsInTheRound = remainingSeconds;
    } else {
        // Compute total seconds if starting from beginning (not paused)
        if (remainingSeconds === 0) {
            totalSeconds = h * 3600 + m * 60 + s;
            allSecondsInTheRound = totalSeconds;
        }
    }
    interval = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateTimeDisplay(totalSeconds);
        } else {
            clearInterval(interval);
        }
    }, 1000);
});

pauseBtn.addEventListener('click', () => {
    clearInterval(interval);
    isPaused = true;
    remainingSeconds = totalSeconds;
    startBtn.innerHTML = 'Resume';
    startBtn.disabled = false;
    resetBtn.disabled = false;
    pauseBtn.disabled = true;
});
resetBtn.addEventListener('click', () => {
    begin = true;
    startBtn.innerHTML = 'Start';
    clearInterval(interval);
    isPaused = false;
    totalSeconds = 0;
    allSecondsInTheRound = 0;
    remainingSeconds = 0;
    updateTimeDisplay(totalSeconds);
    
    // Reset inputs
    inputHours.value = '00';
    inputMinutes.value = '00';
    inputSeconds.value = '00';
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    
    // reset progress bar width visually
    const progress = document.getElementsByClassName("progress-bar")[0];
    progress.setAttribute('style', `width: 100% !important`)
    progress.innerText = `100%`
});

function updateTime() {
    const hours = parseInt(inputHours.value, 10) || 0;
    const minutes = parseInt(inputMinutes.value, 10) || 0;
    const seconds = parseInt(inputSeconds.value, 10) || 0;
    
    // Limit minutes and seconds to 59 automatically
    if (inputMinutes.value > 59) inputMinutes.value = 59;
    if (inputSeconds.value > 59) inputSeconds.value = 59;

    totalSeconds = hours * 3600 + (parseInt(inputMinutes.value, 10) || 0) * 60 + (parseInt(inputSeconds.value, 10) || 0);
    allSecondsInTheRound = totalSeconds;
    updateTimeDisplay(totalSeconds);
}

// Add event listeners to new inputs
[inputHours, inputMinutes, inputSeconds].forEach(input => {
    input.addEventListener('input', updateTime);
    // Select all on focus
    input.addEventListener('focus', function() { this.select(); });
});

// show the bs model that in the timer pug file automatically when the time is up and play sound
function showModal() {
    const myModal = new bootstrap.Modal(document.getElementById('timeUpModal'), {});
    myModal.show();
    // set alarm sound source from local storage or default sound
    let alarmAudio = document.getElementById('alarm-audio');
    let selectedSound = localStorage.getItem('selectedSound') || './audio/alarm1.mp3';
    alarmAudio.src = `${selectedSound}`;
    document.getElementById('alarm-audio').play();

}
// Handle modal close event globally, works for backdrop clicks and buttons
document.getElementById('timeUpModal').addEventListener('hidden.bs.modal', () => {
    document.getElementById('alarm-audio').pause();
    document.getElementById('alarm-audio').currentTime = 0;
    begin = true;
    startBtn.innerHTML = 'Start';
    clearInterval(interval);
    isPaused = false;
    totalSeconds = 0;
    remainingSeconds = 0;
    updateTimeDisplay(totalSeconds);
    
    // Reset inputs
    inputHours.value = '00';
    inputMinutes.value = '00';
    inputSeconds.value = '00';

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;

    updateTime();
});

setInterval(() => {
    if (totalSeconds === 0 && !isPaused && !begin) {
        showModal();
        isPaused = true; // To prevent multiple modal pop-ups
    } 
}, 1000);




//****************** */ End - Timer Container *************************

// media query and replace bootstrap classes
function applyResponsiveDesign() {
    if (window.innerWidth < 576) { // Bootstrap's sm breakpoint
        startBtn.classList.remove('btn-lg');    
        startBtn.classList.add('btn-md', 'mb-2', 'w-100');
        pauseBtn.classList.remove('btn-lg');
        pauseBtn.classList.add('btn-md', 'mb-2', 'w-100');
        resetBtn.classList.remove('btn-lg');
        resetBtn.classList.add('btn-md', 'w-100', 'mb-2');
    } else {
        startBtn.classList.remove('btn-md', 'mb-2', 'w-100');
        startBtn.classList.add('btn-lg');
        pauseBtn.classList.remove('btn-md', 'mb-2', 'w-100');
        pauseBtn.classList.add('btn-lg');
        resetBtn.classList.remove('btn-md', 'w-100', 'mb-2');
        resetBtn.classList.add('btn-lg');       
    } 
    // avoid high school logo stretching on small screens
    const logoContainer = document.querySelector('.high-school-logo');
    if (window.innerWidth < 576) {
        logoContainer.style.height = '70px';
        logoContainer.children[0].classList.remove('w-25');
        logoContainer.children[0].classList.add('w-100');
        logoContainer.children[1].classList.remove('w-25');
        logoContainer.children[1].classList.add('w-100');
    } else {
        logoContainer.style.height = 'auto';
    }
    

    // small the gap class on the nav bar on small screens
    const navBar = document.querySelector('nav .navbar-nav');
    if (window.innerWidth < 576) {
        navBar.classList.remove('gap-5');
        navBar.classList.add('gap-1');
    } else {
        navBar.classList.remove('gap-1');
        navBar.classList.add('gap-5');        
    }


    // .set-time flex to column on small screens
    const setTimeDiv = document.querySelector('.set-time');
    if (window.innerWidth < 576) {
        setTimeDiv.classList.remove('flex-row', 'justify-content-evenly');
        setTimeDiv.classList.add('flex-column', 'align-items-center', 'gap-3');
    }

    // footer items flex to column on small screens
    // const footerDiv = document.querySelector('footer');
    // if (window.innerWidth < 576) {
    //     footerDiv.classList.remove('flex-row', 'justify-content-between');
    //     footerDiv.classList.add('flex-column', 'align-items-center', 'gap-2');
    // }
}

applyResponsiveDesign();
window.addEventListener('resize', applyResponsiveDesign);   
// onload 
window.addEventListener('load', () => {
    applyResponsiveDesign();
    // Set dynamic year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Typing Animation
const typingText = document.getElementById('typing-text');
const words = ["</> made by Ahmed Bouramdane", "Lydex de Rabat 2025-2026"];
let wordIndex = 0;
let letterIndex = 0;
let currentWord = "";
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;

    currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, letterIndex - 1);
        letterIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, letterIndex + 1);
        letterIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && letterIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        wordIndex++;
        if (wordIndex >= words.length) wordIndex = 0;
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
}
// Start typing animation
if(typingText) typeEffect();

//****************** */ End - Responsive Design ************************* 