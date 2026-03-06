const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
const mobile = document.getElementById('mobile');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
        bar.style.display = "none";
        mobile.style.display = "none";
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
        bar.style.display = "block";
        mobile.style.display = "flex";
    })
}