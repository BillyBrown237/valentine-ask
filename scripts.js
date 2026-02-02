// ========================================
// DOM ELEMENTS
// ========================================
const zone = document.getElementById("zone");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const hint = document.getElementById("hint");
const question = document.getElementById("question");
const confettiCanvas = document.getElementById("confettiCanvas");

// ========================================
// GET NAME FROM URL PARAMETER
// ========================================
function getNameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    // Return the name if it exists, otherwise return null
    return name ? name.trim() : null;
}

// ========================================
// SET PERSONALIZED QUESTION
// ========================================
function setPersonalizedQuestion() {
    const name = getNameFromURL();

    if (name) {
        // Capitalize first letter of name
        const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        question.textContent = `${name}, will you be my Valentine?`;
    } else {
        // Default question if no name is provided
        question.textContent = "Will you be my Valentine?";
    }
}

// ========================================
// CONFETTI SETUP
// ========================================
function resizeConfettiCanvas() {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    confettiCanvas.width = Math.floor(window.innerWidth * dpr);
    confettiCanvas.height = Math.floor(window.innerHeight * dpr);
    confettiCanvas.style.width = "100vw";
    confettiCanvas.style.height = "100vh";
}

resizeConfettiCanvas();
window.addEventListener("resize", resizeConfettiCanvas);
window.addEventListener("orientationchange", () => setTimeout(resizeConfettiCanvas, 150));

const confettiInstance = confetti.create(confettiCanvas, {
    resize: false,
    useWorker: true
});

function fullScreenConfetti() {
    const end = Date.now() + 1600;
    const particleCount = isMobile() ? 8 : 12; // Fewer particles on mobile for performance

    (function frame() {
        confettiInstance({
            particleCount: particleCount,
            spread: 90,
            startVelocity: 45,
            ticks: 180,
            origin: { x: Math.random(), y: Math.random() * 0.3 }
        });
        if (Date.now() < end) requestAnimationFrame(frame);
    })();

    setTimeout(() => {
        confettiInstance({
            particleCount: isMobile() ? 200 : 300, // Fewer particles on mobile
            spread: 140,
            startVelocity: 60,
            ticks: 220,
            origin: { x: 0.5, y: 0.55 }
        });
    }, 300);
}

// ========================================
// YES BUTTON GROWS
// ========================================
let yesScale = 1;

function growYes() {
    const { growIncrement } = getResponsiveValues();
    const maxScale = isMobile() ? 1.8 : 2.2; // Smaller max scale on mobile

    yesScale = Math.min(maxScale, yesScale + growIncrement);
    yesBtn.style.transform = `translateY(-50%) scale(${yesScale})`;
}

// ========================================
// RESPONSIVE UTILITIES
// ========================================
function isMobile() {
    return window.innerWidth <= 768 ||
        ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0);
}

function getResponsiveValues() {
    const width = window.innerWidth;

    if (width <= 360) {
        return { distance: 100, speed: 120, growIncrement: 0.08 };
    } else if (width <= 768) {
        return { distance: 120, speed: 140, growIncrement: 0.09 };
    } else {
        return { distance: 140, speed: 150, growIncrement: 0.1 };
    }
}

// ========================================
// NO BUTTON RUNS AWAY
// ========================================
function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
}

function moveNo(px, py) {
    const z = zone.getBoundingClientRect();
    const b = noBtn.getBoundingClientRect();
    const { speed } = getResponsiveValues();

    let dx = (b.left + b.width / 2) - px;
    let dy = (b.top + b.height / 2) - py;
    let mag = Math.hypot(dx, dy) || 1;
    dx /= mag;
    dy /= mag;

    // Use responsive speed value
    let newLeft = (b.left - z.left) + dx * speed;
    let newTop  = (b.top - z.top) + dy * speed;

    // Add padding to prevent button from going to edges
    const padding = isMobile() ? 10 : 5;
    newLeft = clamp(newLeft, padding, z.width - b.width - padding);
    newTop  = clamp(newTop, padding, z.height - b.height - padding);

    noBtn.style.left = newLeft + "px";
    noBtn.style.top = newTop + "px";
    noBtn.style.transform = "none";

    growYes();
}

// ========================================
// EVENT LISTENERS
// ========================================

// Make "No" button run away from cursor/touch
zone.addEventListener("pointermove", e => {
    const b = noBtn.getBoundingClientRect();
    const { distance } = getResponsiveValues();

    const d = Math.hypot(
        (b.left + b.width / 2) - e.clientX,
        (b.top + b.height / 2) - e.clientY
    );

    if (d < distance) moveNo(e.clientX, e.clientY);
});

// Additional touch event for better mobile support
zone.addEventListener("touchmove", e => {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        const b = noBtn.getBoundingClientRect();
        const { distance } = getResponsiveValues();

        const d = Math.hypot(
            (b.left + b.width / 2) - touch.clientX,
            (b.top + b.height / 2) - touch.clientY
        );

        if (d < distance) {
            moveNo(touch.clientX, touch.clientY);
            e.preventDefault();
        }
    }
}, { passive: false });
noBtn.addEventListener("pointerdown", e => {
    e.preventDefault()
    moveNo(e.clientX, e.clientY)
})
// Prevent "No" button from being clicked
noBtn.addEventListener("click", e => e.preventDefault());

// Handle "Yes" button click
yesBtn.addEventListener("click", () => {
    zone.style.display = "none";
    hint.style.display = "none";
    result.style.display = "block";
    resizeConfettiCanvas();
    fullScreenConfetti();
});

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    setPersonalizedQuestion();
});

// Handle window resize and orientation changes
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Reset Yes button scale on resize
        yesScale = 1;
        yesBtn.style.transform = "translateY(-50%) scale(1)";

        // Reposition No button to default if needed
        const zone = document.getElementById("zone");
        const zoneRect = zone.getBoundingClientRect();
        if (zoneRect.width > 0) {
            noBtn.style.left = "";
            noBtn.style.top = "";
            noBtn.style.transform = "translateY(-50%)"; // Maintain vertical centering
        }
    }, 250);
});
