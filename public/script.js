const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const socket = io();
const pixelSize = 6;

canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / pixelSize) * pixelSize;
  const y = Math.floor((e.clientY - rect.top) / pixelSize) * pixelSize;
  const color = colorPicker.value;
  
  paintPixel(x, y, color);
  socket.emit('paint', { x, y, color });
});

socket.on('paint', data => {
  paintPixel(data.x, data.y, data.color);
});

function paintPixel(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, pixelSize, pixelSize);
}


