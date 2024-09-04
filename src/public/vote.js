document.addEventListener("DOMContentLoaded", function() {
    const confirmButton = document.getElementById('confirmButton');
    const confirmation = document.getElementById('confirmation');
    const result = document.getElementById('result');
    confirmButton.disabled = true;
    let countdown = 9;

    const interval = setInterval(() => {
        confirmButton.textContent = `Lanjutkan [${countdown} Detik]`;
        if (countdown === 0) {
            clearInterval(interval);
            confirmButton.classList.remove('cursor-not-allowed', 'opacity-50');
            confirmButton.classList.add('hover:bg-red-700');
            confirmButton.disabled = false;
            confirmButton.textContent = 'Lanjutkan';
        }
        countdown--;
    }, 1000);

    confirmButton.addEventListener('click', function() {
        confirmation.classList.add('hidden');
        result.classList.remove('hidden');
    });
});