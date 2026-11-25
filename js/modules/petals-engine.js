/**
 * Petals Engine Module
 * Photorealistic 3D tumbling canvas physics for wedding flower showers.
 */
export function initPetalsEngine(canvasId, config) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  function processTransparentSprite(imgSrc, callback) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const offCanvas = document.createElement('canvas');
      const targetSize = 256;
      offCanvas.width = targetSize;
      offCanvas.height = targetSize;
      const oCtx = offCanvas.getContext('2d');
      oCtx.drawImage(img, 0, 0, targetSize, targetSize);
      const imgData = oCtx.getImageData(0, 0, targetSize, targetSize);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i+1], b = data[i+2];
        if (r > 240 && g > 240 && b > 240) {
          data[i+3] = 0;
        } else if (r > 220 && g > 220 && b > 220) {
          const avg = (r + g + b) / 3;
          data[i+3] = Math.round(255 - (avg - 220) * (255 / 20));
        }
      }
      oCtx.putImageData(imgData, 0, 0);
      callback(offCanvas);
    };
    img.src = imgSrc;
  }

  const readySprites = [];

  processTransparentSprite(config.marigoldSrc, (spriteCanvas) => {
    readySprites.push({ canvas: spriteCanvas, type: 'marigold' });
  });
  processTransparentSprite(config.rosePetalSrc, (spriteCanvas) => {
    readySprites.push({ canvas: spriteCanvas, type: 'rose' });
  });

  const maxFlowers = config.maxCount || 18;
  const flowers = [];

  class RealPhotoFlower {
    constructor() {
      this.reset();
    }
    reset() {
      this.spriteObj = readySprites.length ? readySprites[Math.floor(Math.random() * readySprites.length)] : null;
      this.x = Math.random() * width;
      this.y = Math.random() * -height - 20;
      
      const isMarigold = this.spriteObj && this.spriteObj.type === 'marigold';
      this.size = isMarigold ? (Math.random() * 6 + 16) : (Math.random() * 6 + 12);
      
      this.speedY = Math.random() * 1.2 + 0.8;
      this.speedX = Math.random() * 0.7 - 0.35;
      this.angle = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 1.5;
      
      this.pitchAngle = Math.random() * Math.PI;
      this.pitchSpeed = Math.random() * 0.03 + 0.01;
      
      this.opacity = Math.random() * 0.15 + 0.8;
      this.swayTime = Math.random() * 100;
    }
    update() {
      if (!this.spriteObj && readySprites.length) {
        this.spriteObj = readySprites[Math.floor(Math.random() * readySprites.length)];
      }
      this.swayTime++;
      this.y += this.speedY;
      this.x += Math.sin(this.swayTime / 30) * 1.0 + this.speedX;
      this.angle += this.rotSpeed;
      this.pitchAngle += this.pitchSpeed;

      if (this.y > height + 40) {
        this.reset();
        this.y = -30;
        this.x = Math.random() * width;
      }
    }
    draw() {
      if (!this.spriteObj) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.angle * Math.PI) / 180);
      
      const wobbleX = 0.82 + 0.18 * Math.cos(this.pitchAngle);
      const wobbleY = 0.88 + 0.12 * Math.sin(this.pitchAngle);
      ctx.scale(wobbleX, wobbleY);
      
      ctx.globalAlpha = this.opacity;
      ctx.shadowColor = 'rgba(40, 5, 10, 0.15)';
      ctx.shadowBlur = 3;
      ctx.shadowOffsetY = 2;
      
      ctx.drawImage(this.spriteObj.canvas, -this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    }
  }

  for (let i = 0; i < maxFlowers; i++) {
    flowers.push(new RealPhotoFlower());
  }

  function animateFlowers() {
    ctx.clearRect(0, 0, width, height);
    for (let f of flowers) {
      f.update();
      f.draw();
    }
    requestAnimationFrame(animateFlowers);
  }
  animateFlowers();
}
