// Definisi global variable
let voted = 0;
let countdown = 10;
const sections = document.querySelectorAll('section');
const checkboxes = document.querySelectorAll('input[name="paslon"]');
const button = document.getElementById('voteButton');
const inputVote = document.querySelectorAll("#vote-box>label>img");


// Biar gak bisa buka web dev
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'U' || e.key === 'I' || e.key === 'J')) {
        e.preventDefault();
    }
});
////////////////////////////////////////////////////////////////////////////


// Navbar footer
const navLinks = {
    peraturan: document.getElementById('nav-peraturan'),
    calon: document.getElementById('nav-calon'),
    vote: document.getElementById('nav-vote'),
};

function activateNavLink(id) {
    Object.keys(navLinks).forEach(key => {
        if (key === id) {
            navLinks[key].classList.add('text-blue-600');
        }
    });
}

function onScroll() {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight/2 && rect.bottom >= window.innerHeight/2) {
            activateNavLink(section.id);
        }
    });
}

window.addEventListener('scroll', onScroll);
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
////////////////////////////////////////////////////////////////////


// Biar gak bisa pilih 2 gambar
function limitSelection(selectedCheckbox) {
    const voteButton = document.getElementById('voteButton');
    let anyChecked = false;
    checkboxes.forEach((box) => {
        if (box != selectedCheckbox) {
            box.checked = false;
        }
        if (box.checked) {
            anyChecked = true;
        }
    });
    if (anyChecked && !countdown) {
        voteButton.disabled = false;
        voteButton.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
        voteButton.disabled = true;
        voteButton.classList.add('opacity-50', 'cursor-not-allowed');
    }
}
///////////////////////////////////////////////////////////////////////////////


// Send vote ke database
function vote(btn) {
    if (!btn.disabled && !voted) {
        btn.disabled = true;
        voted = 1;
        document.getElementById('voteForm').submit();
        btn.innerText = "Mohon Bersabar...";
        setTimeout(()=>{
            alert("Server sedang mengalami gangguan. Mohon coba lagi...");
            location.reload();
        }, 30000)
    }
}
///////////////////////////////////////////////////////////////////////////////


// Countdown/Delay vote
const interval = setInterval(() => {
    countdown--;
    button.textContent = `VOTE [${countdown} detik]`;
    if (countdown <= 0) {
        clearInterval(interval);
        inputVote.forEach(btn => {
            btn.classList.remove('opacity-50', 'cursor-not-allowed');
        });
        checkboxes.forEach(btn => {
            btn.disabled = false;
        });
        button.classList.remove('bg-red-500');
        button.classList.add('bg-green-500', 'hover:bg-green-600');
        button.textContent = 'VOTE';
    }
}, 1000);
/////////////////////////////////////////////////////////////////////////////


// Penetapan awal
checkboxes.forEach(btn => {
    btn.disabled = true;
});
inputVote.forEach(btn => {
    btn.classList.add('opacity-50', 'cursor-not-allowed');
});
button.disabled = true;
////////////////////////////////////////////////////////////////