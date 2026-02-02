document.addEventListener('DOMContentLoaded', function() {
    const stage1 = document.getElementById('stage1');
    const stage2 = document.getElementById('stage2');
    const continueBtn = document.getElementById('continue-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const response = document.getElementById('response');
    const card = document.querySelector('#stage2');
    const heartsBg = document.querySelector('.hearts-bg');

    // Continue button - go to stage 2
    continueBtn.addEventListener('click', function() {
        stage1.classList.add('hidden');
        stage2.classList.remove('hidden');
        // Reset animation
        stage2.style.animation = 'none';
        stage2.offsetHeight; // Trigger reflow
        stage2.style.animation = 'fadeInUp 1s ease-out';

        // Start floating hearts
        createFloatingHearts();
    });

    // Yes button click
    yesBtn.addEventListener('click', function() {
        response.classList.remove('hidden');
        response.innerHTML = `
            <p>💜 Yay! You just made me the happiest person ever! 💜</p>
            <div class="plans">
                <p>Get ready for our special day:</p>
                <p>🍽️ Dinner at <strong>Restaurant 224</strong></p>
                <p>🥍 Cheer on the <strong>Saskatoon Rush</strong></p>
            </div>
        `;
        card.classList.add('celebrate');

        // Hide buttons
        document.querySelector('.buttons').style.display = 'none';

        // Create celebration hearts
        createCelebration();
    });

    // No button - runs away with attitude!
    const noResponses = [
        'No 🤨',
        'No 🤨🤨',
        'No?? 🤨🤨🤨',
        'Really, No? 🤨',
        'You sure? 🤨🤨',
        'Think again 🤨🤨🤨',
        'Wrong answer 🤨',
        'Try the other one 🤨🤨',
        'YamJam is going to get you 🦎'
    ];
    let noCount = 0;

    function moveNoButton() {
        const maxX = window.innerWidth - noBtn.offsetWidth - 50;
        const maxY = window.innerHeight - noBtn.offsetHeight - 50;

        const randomX = Math.max(20, Math.floor(Math.random() * maxX));
        const randomY = Math.max(20, Math.floor(Math.random() * maxY));

        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.zIndex = '1000';

        // Change button text with escalating eyebrow emojis
        noBtn.textContent = noResponses[noCount % noResponses.length];
        noCount++;
    }

    // Desktop: hover
    noBtn.addEventListener('mouseover', moveNoButton);

    // Mobile: tap
    noBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        moveNoButton();
    });

    // Create floating hearts in background
    function createFloatingHearts() {
        const hearts = ['💜', '💕', '💗', '💖', '💘', '💟'];

        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createHeart(hearts[Math.floor(Math.random() * hearts.length)]);
            }, i * 400);
        }

        // Keep creating hearts
        setInterval(() => {
            createHeart(hearts[Math.floor(Math.random() * hearts.length)]);
        }, 2000);
    }

    function createHeart(emoji) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = emoji;
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heartsBg.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    // Celebration burst
    function createCelebration() {
        const hearts = ['💜', '💕', '💗', '💖', '💘', '🥰', '😍', '💟'];

        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
                heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
                heartsBg.appendChild(heart);
            }, i * 100);
        }
    }
});
