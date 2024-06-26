let counter = 0;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startTimerElement = document.getElementById("start-timer");
const endTimerElement = document.getElementById("end-timer");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let imageSrc = "imgs/logo.png";

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

let isEasterEggEnabled = false;

const triggerEasterEgg = () => {
  isEasterEggEnabled = !isEasterEggEnabled;
  imageSrc = isEasterEggEnabled ? "imgs/keepYourselfSafe.png" : "imgs/logo.png";
  image.src = imageSrc;
};

let rotationAngle = 0;

function certMove() {
  cert.x += cert.dx;
  cert.y += cert.dy;

  rotationAngle += isEasterEggEnabled ? 0.1 : 0.01;

  if (cert.x + cert.sizeX >= canvas.width || cert.x < 0) {
    cert.dx *= -1;
    if (!isEasterEggEnabled) {
      cert.invertColors = !cert.invertColors;
    }
  }
  if (cert.y + cert.sizeY >= canvas.height || cert.y < 0) {
    cert.dy *= -1;
    if (!isEasterEggEnabled) {
      cert.invertColors = !cert.invertColors;
    }
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!isEasterEggEnabled && cert.invertColors) {
    ctx.filter = "invert(1)";
  } else {
    ctx.filter = "none";
  }

  ctx.save();

  ctx.translate(cert.x + cert.sizeX / 2, cert.y + cert.sizeY / 2);

  ctx.rotate(rotationAngle);

  ctx.drawImage(
    image,
    -cert.sizeX / 2,
    -cert.sizeY / 2,
    cert.sizeX,
    cert.sizeY
  );

  ctx.restore();

  ctx.filter = "none";
  window.requestAnimationFrame(certMove);
}

function calcTime(startDate, endDate) {
  const now = new Date();

  const timeElapsed = now - startDate;
  const elapsedDays = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
  const elapsedHours = Math.floor(
    (timeElapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const elapsedMinutes = Math.floor(
    (timeElapsed % (1000 * 60 * 60)) / (1000 * 60)
  );
  const elapsedSeconds = Math.floor((timeElapsed % (1000 * 60)) / 1000);
  startTimerElement.textContent = `Downfall started ${elapsedDays} days, ${elapsedHours} hours, ${elapsedMinutes} minutes, ${elapsedSeconds} seconds ago`;

  const timeLeft = endDate - now;
  const leftDays = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const leftHours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const leftMinutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const leftSeconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  endTimerElement.textContent = `Downfall will end in ${leftDays} days, ${leftHours} hours, ${leftMinutes} minutes, ${leftSeconds} seconds`;
}

function startTimers(startDate, endDate) {
  setInterval(() => calcTime(startDate, endDate), 1000);
}

certMove();

const startDate = new Date("2022-09-12T00:00:00");
const endDate = new Date("2026-05-18T00:00:00");
startTimers(startDate, endDate);
