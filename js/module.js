
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('settings-toggle');
    const modal = document.getElementById('settings-modal');

    toggleBtn.addEventListener('click', () => {
        modal.classList.toggle('hidden');
    });
});
