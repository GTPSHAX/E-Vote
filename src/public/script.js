document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'U' || e.key === 'I' || e.key === 'J')) {
        e.preventDefault();
    }
});

const sections = document.querySelectorAll('section');
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

let voted = 0;

function limitSelection(selectedCheckbox) {
    const checkboxes = document.querySelectorAll('input[name="paslon"]');
    let anyChecked = false;
    const voteButton = document.getElementById('voteButton');
    checkboxes.forEach((box) => {
        if (voteButton.disabled) {
            box.checked = false;
            return;
        }
        if (box !== selectedCheckbox) {
            box.checked = false;
        }
        if (box.checked) {
            anyChecked = true;
        }
    });
    if (anyChecked && !voteButton.disabled && !voted) {
        voteButton.disabled = false;
        voteButton.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
        voteButton.disabled = true;
        voteButton.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

function vote(btn) {
    if (!btn.disabled) {
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

let countdown = 9;
const button = document.getElementById('voteButton');

const interval = setInterval(() => {
    countdown--;
    button.textContent = `VOTE [${countdown} detik]`;
    if (countdown <= 0) {
        clearInterval(interval);
        button.classList.remove('bg-red-500');
        button.classList.add('bg-green-500', 'hover:bg-green-600');
        button.textContent = 'VOTE';
        button.disabled = false;
        // button.addEventListener('click', () => {
        //     document.getElementById('voteForm').submit();
        // });
    }
}, 1000);

button.disabled = true;