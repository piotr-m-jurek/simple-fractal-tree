// canvas setup
const canvas = document.createElement('canvas');
canvas.id = "canvas";
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d')

const WIDTH = 1200
const HEIGHT = 800
canvas.width = WIDTH
canvas.height = HEIGHT
canvas.style.background = "#000"

// slider setup
const slider = document.getElementById('angle')
slider.style.width = `${WIDTH}px`
slider.value = 15
slider.min = 0
slider.max = 180
slider.step = 1


//fractal recursive function
function fractal(startX, startY, len, angle, branchWidth) {
  ctx.beginPath();
  ctx.save();
  
  ctx.translate(startX, startY);
  ctx.rotate(angle * Math.PI/180);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.lineWidth = branchWidth
  ctx.strokeStyle = "#FFF"
  ctx.stroke();
  
  if(len < 20) {
    ctx.restore();
    return;
  }
  
  fractal(0, -len, len*0.8, -slider.value, branchWidth * .8);
  fractal(0, -len, len*0.8, slider.value, branchWidth * .8);
  
  ctx.restore();
}

// drawing
slider.addEventListener('input', () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT)
  fractal(WIDTH / 2, HEIGHT, 160, 0, 10) 
})

fractal(WIDTH / 2, HEIGHT, 160, 0, 10)
