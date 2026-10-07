// src/lib/canvas-effects.ts
export function createParticleEffect(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const particles: Particle[] = [];
  const particleCount = 50;

  class Particle {
    x: number = 0;
    y: number = 0;
    radius: number = 0;
    color: string = '';
    velocityX: number = 0;
    velocityY: number = 0;
    alpha: number = 0;

    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 2 + 1;
      this.color = `hsl(${Math.random() * 60 + 180}, 80%, 60%)`; // cyan-blue range
      this.velocityX = (Math.random() - 0.5) * 0.5;
      this.velocityY = (Math.random() - 0.5) * 0.5;
      this.alpha = Math.random() * 0.5 + 0.5;
    }

    update() {
      this.x += this.velocityX;
      this.y += this.velocityY;

      // Bounce off edges
      if (this.x < 0 || this.x > canvas.width) this.velocityX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.velocityY *= -1;

      // Fade out slowly
      this.alpha = Math.max(0, this.alpha - 0.002);
      if (this.alpha <= 0) this.reset();
    }

    draw() {
      ctx!.beginPath();
      ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx!.fillStyle = this.color;
      ctx!.globalAlpha = this.alpha;
      ctx!.fill();
      ctx!.globalAlpha = 1;
    }
  }

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  const animate = () => {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);

    for (const particle of particles) {
      particle.update();
      particle.draw();
    }

    requestAnimationFrame(animate);
  };

  animate();

  return {
    resize: () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
  };
}