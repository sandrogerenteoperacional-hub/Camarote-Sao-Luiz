// Header scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.add('scrolled');
    // For this specific design, we can keep it always slightly blurred, 
    // or we can remove the class when at the very top.
    // Let's remove it when at the top for a cleaner look.
    header.classList.remove('scrolled');
  }
});

// Initial check in case page is refreshed midway
if (window.scrollY > 50) {
  header.classList.add('scrolled');
}

// Video Play/Pause & Mute/Unmute logic
const video = document.getElementById('promoVideo');
const playPauseBtn = document.getElementById('playPauseBtn');

if (video && playPauseBtn) {
  playPauseBtn.addEventListener('click', () => {
    // If the video is muted, we unmute it. If unmuted, we mute it.
    // We also toggle the icon
    if (video.muted) {
      video.muted = false;
      playPauseBtn.innerHTML = '<i class="ph-fill ph-speaker-high"></i>';
    } else {
      video.muted = true;
      playPauseBtn.innerHTML = '<i class="ph-fill ph-speaker-slash"></i>';
    }
  });

  // Pause video if it's out of viewport to save battery/performance on mobile
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play().catch(e => console.log("Autoplay prevented"));
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(video);
}

// Confetti Animation (Simple JS implementation for performance)
const confettiContainer = document.getElementById('confetti');
const colors = ['#009B3A', '#FEDF00', '#FFD700', '#002776', '#ffffff'];

function createConfetti() {
  if (!confettiContainer) return;
  
  const confettiCount = window.innerWidth < 768 ? 30 : 70; // Less on mobile
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    
    // Random properties
    const left = Math.random() * 100;
    const animDuration = Math.random() * 3 + 2; // 2s to 5s
    const animDelay = Math.random() * 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.style.left = `${left}%`;
    confetti.style.backgroundColor = color;
    confetti.style.animation = `fall ${animDuration}s linear ${animDelay}s infinite`;
    
    // Random size and rotation
    const width = Math.random() * 8 + 5;
    const height = Math.random() * 15 + 10;
    confetti.style.width = `${width}px`;
    confetti.style.height = `${height}px`;
    
    confettiContainer.appendChild(confetti);
  }
}

// Add keyframes for falling confetti dynamically
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes fall {
    0% {
      transform: translateY(-10vh) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(110vh) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(styleSheet);

// Initialize confetti on load
window.addEventListener('load', createConfetti);
