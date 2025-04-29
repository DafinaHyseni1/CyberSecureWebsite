document.querySelector(".glow-button").addEventListener("click", function(event) {
  event.preventDefault(); 
  document.querySelector("#about").scrollIntoView({
      behavior: "smooth" 
  });
});

const canvas = document.getElementById('ai-network');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < 100; i++) {
    const size = Math.random() * 5;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const directionX = (Math.random() - 0.5) * 2;
    const directionY = (Math.random() - 0.5) * 2;
    const color = '#00ffcc';

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach((particle) => particle.update());
}

init();
animate();

document.querySelectorAll('.spoke-circle').forEach(circle => {
    circle.addEventListener('mouseover', () => {
        circle.style.transform = 'scale(1.3)';
    });

    circle.addEventListener('mouseout', () => {
        circle.style.transform = 'scale(1)';
    });
});




document.addEventListener("scroll", () => {
  const featureBoxes = document.querySelectorAll(".feature-box");
  featureBoxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 100; 
    if (boxTop < triggerPoint) {
      box.classList.add("in-view");
    }
  });
});
