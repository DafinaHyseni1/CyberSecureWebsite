const glowBtn = document.querySelector(".glow-button");

if (glowBtn) {
  glowBtn.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#about").scrollIntoView({
      behavior: "smooth"
    });
  });
}

async function analyzeAI() {

  const payload = {
    traffic: Math.floor(Math.random() * 100),
    loginAttempts: Math.floor(Math.random() * 7),
    country: Math.random() > 0.5 ? "US" : "unknown",
    device: Math.random() > 0.5 ? "known" : "new"
  };

  try {
    const res = await fetch("http://localhost:3000/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    console.log("AI RESPONSE:", data);

    showAIResult(data.analysis);

  } catch (error) {
    console.error("Backend error:", error);
  }
}

function showAIResult(analysis) {

  const box = document.getElementById("ai-result");

  if (!box) return;

  box.innerHTML = `
    <h3>🧠 AI Security Analysis</h3>
    <p><strong>Risk:</strong> ${analysis.risk}</p>
    <p><strong>Threat:</strong> ${analysis.threat}</p>
    <p><strong>Action:</strong> ${analysis.action}</p>
  `;

  box.classList.add("active");
}


const canvas = document.getElementById("ai-network");

if (canvas) {

  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particlesArray = [];

  class Particle {
    constructor(x, y, dx, dy, size) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.size = size;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = "#00ffcc";
      ctx.fill();
    }

    update() {
      if (this.x > canvas.width || this.x < 0) this.dx *= -1;
      if (this.y > canvas.height || this.y < 0) this.dy *= -1;

      this.x += this.dx;
      this.y += this.dy;

      this.draw();
    }
  }

  function initParticles() {
    particlesArray = [];

    for (let i = 0; i < 100; i++) {
      const size = Math.random() * 4;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const dx = (Math.random() - 0.5) * 1.5;
      const dy = (Math.random() - 0.5) * 1.5;

      particlesArray.push(new Particle(x, y, dx, dy, size));
    }
  }

  function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(p => p.update());
  }

  initParticles();
  animateParticles();
}


const featureBoxes = document.querySelectorAll(".feature-box");

const featureObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

featureBoxes.forEach(box => featureObserver.observe(box));


const workflowSection = document.getElementById("workflow-section");

if (workflowSection) {

  const workflowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        console.log("WORKFLOW ACTIVE 🚀");

        analyzeAI();

        workflowObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  workflowObserver.observe(workflowSection);
}


const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    toggle.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      toggle.classList.remove("active");
    });
  });
}

