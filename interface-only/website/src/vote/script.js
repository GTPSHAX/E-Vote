// document.addEventListener('contextmenu', function(e) {
//     e.preventDefault();
// });

// document.addEventListener('keydown', function(e) {
//     if (e.ctrlKey && (e.key === 'U' || e.key === 'I' || e.key === 'J')) {
//         e.preventDefault();
//     }
// });

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

function limitSelection(selectedCheckbox) {
    const checkboxes = document.querySelectorAll('input[name="image"]');
    checkboxes.forEach((box) => {
        if (box !== selectedCheckbox) {
            box.checked = false;
        }
    });
}