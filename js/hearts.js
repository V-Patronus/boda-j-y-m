// effects.js

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.classList.add(Math.random() > 0.5 ? 'red' : 'blue');
    heart.innerHTML = '❤️'; // corazón animado
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 12000);
}

setInterval(createHeart, 800);

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.innerHTML = '♥'; // mini-corazón dorado
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 2 + 's';

    const wrapper = document.querySelector('.invite-wrapper');
    if (wrapper) {
        wrapper.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 2000);
    }
}

setInterval(createSparkle, 300);
