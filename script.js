const envelope = document.getElementById('envelope');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close-btn');
const confettiContainer = document.getElementById('confetti-container');

// Abrir carta
envelope.addEventListener('click', () => {
    envelope.classList.add('clicked');
    
    // Esperamos 0.5s a que el sobre se abra
    setTimeout(() => {
        modal.classList.add('open');
        lanzarConfetti(); 
    }, 500);
});

// Cerrar carta
closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
    setTimeout(() => {
        envelope.classList.remove('clicked');
        confettiContainer.innerHTML = ''; 
    }, 500);
});

// FUNCIÓN DE EXPLOSIÓN DE CORAZONES (Versión SVG infalible)
function lanzarConfetti() {
    const colors = ['#CCA9DD', '#b085c8', '#ead6f5', '#9b6bc2', '#ffffff', '#e6e6fa'];
    
    // SVG del corazón
    const svgHeart = `
    <svg viewBox="0 0 32 29.6">
        <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
    </svg>`;

    for (let i = 0; i < 150; i++) { 
        const heart = document.createElement('div');
        heart.classList.add('confetti-heart');
        heart.innerHTML = svgHeart; // Insertamos el SVG
        
        // Color aleatorio
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        // TAMAÑO ALEATORIO
        const scale = (Math.random() * 2) + 1.5; // Escala grande
        
        // Posición final aleatoria
        const x = (Math.random() - 0.5) * window.innerWidth * 1.5;
        const y = (Math.random() - 0.5) * window.innerHeight * 1.5;
        
        const rotation = Math.random() * 360;
        const duration = 1 + Math.random() * 2;
        
        heart.style.transition = `all ${duration}s ease-out`;
        heart.style.transform = `translate(-50%, -50%) scale(0) rotate(0deg)`;
        
        confettiContainer.appendChild(heart);
        
        // Animación
        setTimeout(() => {
            heart.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`;
            heart.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            heart.style.opacity = '0';
        }, duration * 800); 
    }
}

// CONTADOR
const startDate = new Date('2023-04-25T00:00:00');

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('timer').innerText = 
        `${days} días : ${hours} h : ${minutes} m : ${seconds} s`;
}

setInterval(updateCounter, 1000);
updateCounter();