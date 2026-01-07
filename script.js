/**
 * Romantic Surprise Website
 * Main JavaScript file handling interactions and animations
 */

$(document).ready(function () {

    // ===================================
    // HEART BALLOON CLICK EVENT
    // ===================================
    $('#heartBalloon').on('click', function () {
        // Prevent multiple clicks
        $(this).off('click');

        // Start the explosion sequence
        explodeHeart();

        // Trigger fireworks
        setTimeout(() => {
            createFireworks();
        }, 300);

        // Transition to message screen
        setTimeout(() => {
            transitionToMessage();
        }, 2500);
    });

    // ===================================
    // HEART EXPLOSION ANIMATION
    // ===================================
    function explodeHeart() {
        const $balloon = $('#heartBalloon');
        const $container = $('#fireworksContainer');

        // Get balloon position
        const balloonRect = $balloon[0].getBoundingClientRect();
        const centerX = balloonRect.left + balloonRect.width / 2;
        const centerY = balloonRect.top + balloonRect.height / 2;

        // Add blast effect to the heart
        $balloon.find('.balloon-heart').addClass('heart-blast');

        // Hide the balloon
        setTimeout(() => {
            $balloon.fadeOut(400);
        }, 200);

        // Create heart fragments
        createHeartFragments(centerX, centerY, $container);

        // Create sparkles
        createSparkles(centerX, centerY, $container);

        // Create glowing particles
        createGlowParticles(centerX, centerY, $container);
    }

    // ===================================
    // CREATE HEART FRAGMENTS
    // ===================================
    function createHeartFragments(x, y, $container) {
        const fragmentCount = 12;

        for (let i = 0; i < fragmentCount; i++) {
            const $fragment = $('<div class="particle heart-fragment"></div>');
            $container.append($fragment);

            // Calculate random direction
            const angle = (360 / fragmentCount) * i + Math.random() * 30;
            const distance = 150 + Math.random() * 100;
            const duration = 800 + Math.random() * 400;

            // Set initial position
            $fragment.css({
                left: x + 'px',
                top: y + 'px'
            });

            // Animate outward
            const endX = x + Math.cos(angle * Math.PI / 180) * distance;
            const endY = y + Math.sin(angle * Math.PI / 180) * distance;

            $fragment.animate({
                left: endX + 'px',
                top: endY + 'px',
                opacity: 0
            }, duration, 'easeOutQuad', function () {
                $(this).remove();
            });
        }
    }

    // ===================================
    // CREATE SPARKLE PARTICLES
    // ===================================
    function createSparkles(x, y, $container) {
        const sparkleCount = 30;

        for (let i = 0; i < sparkleCount; i++) {
            const $sparkle = $('<div class="particle sparkle"></div>');
            $container.append($sparkle);

            // Random direction and distance
            const angle = Math.random() * 360;
            const distance = 100 + Math.random() * 150;
            const duration = 600 + Math.random() * 600;
            const delay = Math.random() * 200;

            // Set initial position
            $sparkle.css({
                left: x + 'px',
                top: y + 'px'
            });

            // Animate outward with delay
            setTimeout(() => {
                const endX = x + Math.cos(angle * Math.PI / 180) * distance;
                const endY = y + Math.sin(angle * Math.PI / 180) * distance;

                $sparkle.animate({
                    left: endX + 'px',
                    top: endY + 'px',
                    opacity: 0
                }, duration, function () {
                    $(this).remove();
                });
            }, delay);
        }
    }

    // ===================================
    // CREATE GLOWING PARTICLES
    // ===================================
    function createGlowParticles(x, y, $container) {
        const glowCount = 20;

        for (let i = 0; i < glowCount; i++) {
            const $glow = $('<div class="particle glow"></div>');
            $container.append($glow);

            // Random direction
            const angle = Math.random() * 360;
            const distance = 80 + Math.random() * 120;
            const duration = 1000 + Math.random() * 500;

            // Set initial position
            $glow.css({
                left: x + 'px',
                top: y + 'px'
            });

            // Animate outward
            const endX = x + Math.cos(angle * Math.PI / 180) * distance;
            const endY = y + Math.sin(angle * Math.PI / 180) * distance;

            $glow.animate({
                left: endX + 'px',
                top: endY + 'px',
                opacity: 0,
                width: '50px',
                height: '50px'
            }, duration, function () {
                $(this).remove();
            });
        }
    }

    // ===================================
    // CREATE FIREWORKS EFFECT
    // ===================================
    function createFireworks() {
        const $container = $('#fireworksContainer');
        const fireworksCount = 5;

        for (let i = 0; i < fireworksCount; i++) {
            setTimeout(() => {
                // Random position on screen
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;

                // Create firework burst
                createFireworkBurst(x, y, $container);
            }, i * 300);
        }
    }

    // ===================================
    // CREATE SINGLE FIREWORK BURST
    // ===================================
    function createFireworkBurst(x, y, $container) {
        const particleCount = 25;
        const colors = ['#ff1744', '#ffeb3b', '#00e676', '#2979ff', '#f093fb'];

        for (let i = 0; i < particleCount; i++) {
            const $firework = $('<div class="firework"></div>');
            const color = colors[Math.floor(Math.random() * colors.length)];

            $firework.css({
                background: color,
                boxShadow: `0 0 10px ${color}`
            });

            $container.append($firework);

            // Calculate direction
            const angle = (360 / particleCount) * i;
            const distance = 80 + Math.random() * 60;
            const duration = 800 + Math.random() * 400;

            // Set initial position
            $firework.css({
                left: x + 'px',
                top: y + 'px'
            });

            // Animate outward
            const endX = x + Math.cos(angle * Math.PI / 180) * distance;
            const endY = y + Math.sin(angle * Math.PI / 180) * distance;

            $firework.animate({
                left: endX + 'px',
                top: endY + 'px',
                opacity: 0
            }, duration, function () {
                $(this).remove();
            });
        }
    }

    // ===================================
    // TRANSITION TO MESSAGE SCREEN
    // ===================================
    function transitionToMessage() {
        // Fade out surprise screen
        $('#surpriseScreen').removeClass('active');

        // Fade in message screen
        setTimeout(() => {
            $('#messageScreen').addClass('active');

            // Auto-transition to romantic message screen after 6 seconds
            setTimeout(() => {
                transitionToRomanticMessage();
            }, 6000);
        }, 400);
    }

    // ===================================
    // TRANSITION TO ROMANTIC MESSAGE SCREEN
    // ===================================
    function transitionToRomanticMessage() {
        // Fade out message screen
        $('#messageScreen').removeClass('active');

        // Fade in romantic message screen
        setTimeout(() => {
            $('#romanticMessageScreen').addClass('active');
        }, 400);
    }

    // ===================================
    // GALLERY BUTTON CLICK EVENT
    // ===================================
    $('#galleryBtn').on('click', function () {
        // Add click animation
        $(this).css('transform', 'scale(0.95)');

        setTimeout(() => {
            $(this).css('transform', 'scale(1)');

            // Transition to gallery
            transitionToGallery();
        }, 200);
    });

    // ===================================
    // TRANSITION TO GALLERY SCREEN
    // ===================================
    function transitionToGallery() {
        // Fade out romantic message screen
        $('#romanticMessageScreen').removeClass('active');

        // Fade in gallery screen
        setTimeout(() => {
            $('#galleryScreen').addClass('active');
        }, 400);
    }

    // ===================================
    // LOVE LETTER BUTTON CLICK EVENT
    // ===================================
    $('#loveLetterBtn').on('click', function () {
        // Add click animation
        $(this).css('transform', 'scale(0.95)');

        setTimeout(() => {
            $(this).css('transform', 'scale(1)');

            // Transition to love letter
            transitionToLoveLetter();
        }, 200);
    });

    // ===================================
    // TRANSITION TO LOVE LETTER SCREEN
    // ===================================
    function transitionToLoveLetter() {
        // Fade out gallery screen
        $('#galleryScreen').removeClass('active');

        // Fade in love letter screen
        setTimeout(() => {
            $('#loveLetterScreen').addClass('active');

            // Start typing animation after a short delay
            setTimeout(() => {
                startTypingAnimation();
            }, 800);
        }, 400);
    }

    // ===================================
    // TYPING ANIMATION FOR LOVE LETTER
    // ===================================
    function startTypingAnimation() {
        const letterText = `My Dearest Love,

From the moment I met you, my world changed forever. You brought light into my darkest days and filled my heart with a joy I never knew existed.

Every smile you share, every word you speak, and every moment we spend together is a treasure I hold close to my heart.

You are my dream come true, my best friend, and the love of my life. With you, I've found my home, my happiness, and my forever.

I promise to love you, cherish you, and stand by your side through every moment life brings our way.

Thank you for being you, and for choosing to share your life with me.`;

        const $letterTextElement = $('#letterText');
        let index = 0;
        const typingSpeed = 30; // milliseconds per character

        function typeCharacter() {
            if (index < letterText.length) {
                $letterTextElement.text(letterText.substring(0, index + 1));
                index++;
                setTimeout(typeCharacter, typingSpeed);
            } else {
                // Typing complete
                $letterTextElement.addClass('typing-complete');

                // Show signature after a delay
                setTimeout(() => {
                    $('#letterSignature').fadeIn(1000);

                    // Show button after signature
                    setTimeout(() => {
                        $('#letterButton').fadeIn(1000);
                    }, 1000);
                }, 500);
            }
        }

        typeCharacter();
    }

    // ===================================
    // QUESTION BUTTON CLICK EVENT
    // ===================================
    $('#questionBtn').on('click', function () {
        // Add click animation
        $(this).css('transform', 'scale(0.95)');

        setTimeout(() => {
            $(this).css('transform', 'scale(1)');

            // Transition to question
            transitionToQuestion();
        }, 200);
    });

    // ===================================
    // TRANSITION TO QUESTION SCREEN
    // ===================================
    function transitionToQuestion() {
        // Fade out love letter screen
        $('#loveLetterScreen').removeClass('active');

        // Fade in question screen
        setTimeout(() => {
            $('#questionScreen').addClass('active');
        }, 400);
    }

    // ===================================
    // YES BUTTON CLICK EVENTS
    // ===================================
    $('.yes-button').on('click', function () {
        // Add celebration effect
        $(this).css('transform', 'scale(0.9)');

        setTimeout(() => {
            $(this).css('transform', 'scale(1)');

            // Create massive celebration
            createMassiveCelebration();

            // Show celebration message
            setTimeout(() => {
                showCelebrationMessage();
            }, 1500);
        }, 200);
    });

    // ===================================
    // MASSIVE CELEBRATION
    // ===================================
    function createMassiveCelebration() {
        const $container = $('<div class="fireworks-container"></div>');
        $('#questionScreen').append($container);

        // Create continuous fireworks for 10 seconds
        let fireworkInterval = setInterval(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createFireworkBurst(x, y, $container);
        }, 200);

        // Create heart explosions
        let heartInterval = setInterval(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createHeartExplosion(x, y, $container);
        }, 400);

        // Create sparkle bursts
        let sparkleInterval = setInterval(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createSparkleBurst(x, y, $container);
        }, 300);

        // Create glowing particles
        let glowInterval = setInterval(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createGlowBurst(x, y, $container);
        }, 500);

        // Stop all animations after 10 seconds
        setTimeout(() => {
            clearInterval(fireworkInterval);
            clearInterval(heartInterval);
            clearInterval(sparkleInterval);
            clearInterval(glowInterval);

            // Fade out and remove container
            setTimeout(() => {
                $container.fadeOut(1000, function () {
                    $(this).remove();
                });
            }, 2000);
        }, 10000);
    }

    // ===================================
    // HEART EXPLOSION FOR CELEBRATION
    // ===================================
    function createHeartExplosion(x, y, $container) {
        const heartCount = 8;

        for (let i = 0; i < heartCount; i++) {
            const $heart = $('<div class="particle heart-fragment"></div>');
            $container.append($heart);

            const angle = (360 / heartCount) * i;
            const distance = 100 + Math.random() * 80;
            const duration = 1000 + Math.random() * 500;

            $heart.css({
                left: x + 'px',
                top: y + 'px'
            });

            const endX = x + Math.cos(angle * Math.PI / 180) * distance;
            const endY = y + Math.sin(angle * Math.PI / 180) * distance;

            $heart.animate({
                left: endX + 'px',
                top: endY + 'px',
                opacity: 0
            }, duration, function () {
                $(this).remove();
            });
        }
    }

    // ===================================
    // SPARKLE BURST FOR CELEBRATION
    // ===================================
    function createSparkleBurst(x, y, $container) {
        const sparkleCount = 15;

        for (let i = 0; i < sparkleCount; i++) {
            const $sparkle = $('<div class="particle sparkle"></div>');
            $container.append($sparkle);

            const angle = Math.random() * 360;
            const distance = 80 + Math.random() * 100;
            const duration = 800 + Math.random() * 600;

            $sparkle.css({
                left: x + 'px',
                top: y + 'px'
            });

            const endX = x + Math.cos(angle * Math.PI / 180) * distance;
            const endY = y + Math.sin(angle * Math.PI / 180) * distance;

            $sparkle.animate({
                left: endX + 'px',
                top: endY + 'px',
                opacity: 0
            }, duration, function () {
                $(this).remove();
            });
        }
    }

    // ===================================
    // GLOW BURST FOR CELEBRATION
    // ===================================
    function createGlowBurst(x, y, $container) {
        const glowCount = 10;

        for (let i = 0; i < glowCount; i++) {
            const $glow = $('<div class="particle glow"></div>');
            $container.append($glow);

            const angle = (360 / glowCount) * i;
            const distance = 60 + Math.random() * 80;
            const duration = 1200 + Math.random() * 600;

            $glow.css({
                left: x + 'px',
                top: y + 'px'
            });

            const endX = x + Math.cos(angle * Math.PI / 180) * distance;
            const endY = y + Math.sin(angle * Math.PI / 180) * distance;

            $glow.animate({
                left: endX + 'px',
                top: endY + 'px',
                opacity: 0,
                width: '60px',
                height: '60px'
            }, duration, function () {
                $(this).remove();
            });
        }
    }

    // ===================================
    // CELEBRATION MESSAGE
    // ===================================
    function showCelebrationMessage() {
        // Hide question content
        $('.question-container').fadeOut(500);

        // Show celebration message with updated text
        const celebrationHTML = `
            <div class="celebration-message" style="animation: zoomIn 1s ease-out;">
                <h1 style="font-family: 'Great Vibes', cursive; font-size: 5rem; color: #fff; 
                    text-shadow: 0 0 30px rgba(255, 255, 255, 1), 0 0 50px rgba(255, 182, 193, 0.8); 
                    margin-bottom: 30px; animation: heartBeat 2s ease-in-out infinite;">
                    I knew it ❤️
                </h1>
                <p style="font-family: 'Dancing Script', cursive; font-size: 2.5rem; color: #fff;
                    text-shadow: 0 0 25px rgba(255, 182, 193, 1), 0 0 40px rgba(255, 182, 193, 0.6);
                    animation: gentleGlow 3s ease-in-out infinite;">
                    I love you forever 💖
                </p>
            </div>
        `;

        setTimeout(() => {
            $('#questionScreen').append(celebrationHTML);
        }, 600);
    }

    // ===================================
    // CUSTOM EASING FUNCTIONS
    // ===================================
    // Add custom easing for smoother animations
    $.easing.easeOutQuad = function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    };

    // ===================================
    // PREVENT CONTEXT MENU (OPTIONAL)
    // ===================================
    // Uncomment to prevent right-click for a cleaner experience
    // $(document).on('contextmenu', function(e) {
    //     e.preventDefault();
    // });

});
