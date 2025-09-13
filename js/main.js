// activate full screen and change the container height when the window is resized or clicked
window.addEventListener('resize', () => {
    const windowHeight = window.innerHeight;
    container.style.height = `${windowHeight - nav.offsetHeight -footer.offsetHeight}px`;
});
window.addEventListener('click', () => {
    const windowHeight = window.innerHeight;
    container.style.height = `${windowHeight - nav.offsetHeight -footer.offsetHeight}px`;
});
window.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
            console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    }
});

let container = document.getElementById("container"),
    nav = document.getElementsByTagName('nav')[0],
    footer = document.getElementsByTagName('footer')[0];
const windowHeight = window.innerHeight;
container.style.minHeight = `${windowHeight - nav.offsetHeight -footer.offsetHeight}px`;

//****************** */ Start - Login settings *************************
let username = document.getElementsByName('username')[0];
let password = document.getElementsByName('password')[0];
let timerContainer = document.getElementsByClassName('timer')[0];
let loginContainer = document.getElementsByClassName('login-form')[0];
timerContainer.style.display = 'none';
const USERS = ['Ahmed Bouramdane', 'Youssef'];
const PASSWORDS = ['AhmedB1234', 'Youssefenn'];

function updateClassroom(password) {
    let classroom = document.getElementById('classroom');
    if (password === 'AhmedB1234') {
        classroom.innerHTML = `1<sup>ère</sup> année Bac Science Math 2`;
    } else if (password === 'Youssefenn') {
        classroom.innerHTML = `1<sup>ère</sup> année Bac Science Math 1 `;
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

//****************** */ End - Login settings *************************


//****************** */ Start - Timer Container *************************
let startBtn = document.getElementById('start-btn');
let pauseBtn = document.getElementById('pause-btn');
let resetBtn = document.getElementById('reset-btn');
let timePicker = document.getElementById('time-flatpickr');
let timeShow = document.getElementsByClassName('time-show')[0];
let interval;
let totalSeconds = 0;
let isPaused = false;
let remainingSeconds = 0;
let begin = false;

function updateTimeDisplay(seconds) {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    timeShow.innerHTML = `${hours}:${minutes}:${secs}`;
}

startBtn.addEventListener('click', () => {
    begin = true;
    if (isPaused) {
        startBtn.innerHTML = 'Start';
        totalSeconds = remainingSeconds;
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
});
resetBtn.addEventListener('click', () => {
    begin = false;
    startBtn.innerHTML = 'Start';
    clearInterval(interval);
    isPaused = false;
    totalSeconds = 0;
    remainingSeconds = 0;
    updateTimeDisplay(totalSeconds);
    timePicker._flatpickr.setDate("00:00:00", true); // Reset flatpickr input
});
timePicker.addEventListener('change', (e) => {
    const timeParts = e.target.value.split(':');
    if (timeParts.length === 3) {
        const hours = parseInt(timeParts[0], 10) || 0;
        const minutes = parseInt(timeParts[1], 10) || 0;
        const seconds = parseInt(timeParts[2], 10) || 0;
        totalSeconds = hours * 3600 + minutes * 60 + seconds;
        updateTimeDisplay(totalSeconds);
    }
});

updateTimeDisplay(totalSeconds);


// show the bs model that in the timer pug file automatically when the time is up and play sound
function showModal() {
    const myModal = new bootstrap.Modal(document.getElementById('timeUpModal'), {});
    myModal.show();
    document.getElementById('alarm-audio').play();
    begin = true;

}
setInterval(() => {
    if (totalSeconds === 0 && !isPaused && begin) {
        showModal();
        isPaused = true; // To prevent multiple modal pop-ups
    } 

    document.querySelectorAll('.close, .btn-danger').forEach(el => {
        el.addEventListener('click', () => {
            document.getElementById('alarm-audio').pause();
            document.getElementById('alarm-audio').currentTime = 0;
        });
    }); 

}, 1000);




//****************** */ End - Timer Container *************************

// media query and replace bootstrap classes
function applyResponsiveDesign() {
    if (window.innerWidth < 576) { // Bootstrap's sm breakpoint
        startBtn.classList.remove('btn-lg', 'me-3');    
        startBtn.classList.add('btn-md', 'mb-2', 'w-100');
        pauseBtn.classList.remove('btn-lg', 'me-3');
        pauseBtn.classList.add('btn-md', 'mb-2', 'w-100');
        resetBtn.classList.remove('btn-lg');
        resetBtn.classList.add('btn-md', 'w-100', 'mb-2');
    } else {
        startBtn.classList.remove('btn-md', 'mb-2', 'w-100');
        startBtn.classList.add('btn-lg', 'me-3');
        pauseBtn.classList.remove('btn-md', 'mb-2', 'w-100');
        pauseBtn.classList.add('btn-lg', 'me-3');
        resetBtn.classList.remove('btn-md', 'w-100', 'mb-2');
        resetBtn.classList.add('btn-lg');       
    } 
    // login full width on small screens
    if (window.innerWidth < 576) {
        loginContainer.classList.remove('w-50');
        loginContainer.classList.add('w-100', 'px-3');
    } else {
        loginContainer.classList.remove('w-100', 'px-3');
        loginContainer.classList.add('w-50');        
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

    // add font awsome icons to the nav links
    const navLinks = document.querySelectorAll('nav .nav-link');
    navLinks[0].innerHTML = `<i class="fas fa-home me-2"></i> Home`;
    navLinks[1].innerHTML = `<i class="fas fa-info me-2"></i> About us`;
    navLinks[2].innerHTML = `<i class="fas fa-envelope me-2"></i> Contact us`;

    // .set-time flex to column on small screens
    const setTimeDiv = document.querySelector('.set-time');
    if (window.innerWidth < 576) {
        setTimeDiv.classList.remove('flex-row', 'justify-content-evenly');
        setTimeDiv.classList.add('flex-column', 'align-items-center', 'gap-3');
    }

    // footer items flex to column on small screens
    const footerDiv = document.querySelector('footer');
    if (window.innerWidth < 576) {
        footerDiv.classList.remove('flex-row', 'justify-content-between');
        footerDiv.classList.add('flex-column', 'align-items-center', 'gap-2');
    }
}

applyResponsiveDesign();
window.addEventListener('resize', applyResponsiveDesign);   
// onload 
window.addEventListener('load', applyResponsiveDesign);

//****************** */ End - Responsive Design ************************* 

// flatpickr settings in android and mobile screen also
flatpickr("#time-flatpickr", {
    enableTime: true,
    enableSeconds: true,
    noCalendar: true,
    dateFormat: "H:i:S",
    time_24hr: true,
    defaultDate: "00:00:00"
});