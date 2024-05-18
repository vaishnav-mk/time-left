let counter = 0;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const timerElement = document.getElementById("timer");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const imageSrc = "imgs/degree.jpg";

const cert = {
  sizeX: 196,
  sizeY: 150,
  x: canvas.width / 2 - 98,
  y: canvas.height / 2 - 75,
  dx: 1.5,
  dy: 1.5,
  invertColors: false,
};

const image = new Image(196, 150);
image.src = imageSrc;

function certMove() {
  cert.x += cert.dx;
  cert.y += cert.dy;
  if (cert.x + cert.sizeX >= canvas.width || cert.x < 0) {
    cert.dx *= -1;
    cert.invertColors = !cert.invertColors;
  }
  if (cert.y + cert.sizeY >= canvas.height || cert.y < 0) {
    cert.dy *= -1;
    cert.invertColors = !cert.invertColors;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (cert.invertColors) {
    ctx.filter = "invert(1)";
  } else {
    ctx.filter = "none";
  }
  ctx.drawImage(image, cert.x, cert.y, cert.sizeX, cert.sizeY);
  ctx.filter = "none";
  window.requestAnimationFrame(certMove);
}

function calcTime(endDate) {
  const now = new Date();
  const timeLeft = endDate - now;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  timerElement.textContent = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds left`;
}

function startTimer(endDate) {
  setInterval(() => calcTime(endDate), 1000);
}

certMove();

const startDate = new Date("2026-05-18T00:00:00");
startTimer(startDate);
