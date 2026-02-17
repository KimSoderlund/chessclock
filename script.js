const player1Section = document.getElementById("time1");
const player2Section = document.getElementById("time2");

//Create player objects
let player1 = { hour: 1, minute: 30, second: 0, pause: true };
let player2 = { hour: 1, minute: 30, second: 0, pause: true };

//set innerHTML to the player objects
player1Section.innerHTML =
  player1.hour + ":" + player1.minute + ":" + player1.second;
player2Section.innerHTML =
  player2.hour + ":" + player2.minute + ":" + player2.second;

setInterval(() => {
  if (!player1.pause) {
    if (player1.second > 0) {
      player1.second--;
    } else if (player1.second === 0 && player1.minute > 0) {
      player1.minute--;
      player1.second = 59;
    } else if (
      player1.second === 0 &&
      player1.minute === 0 &&
      player1.hour > 0
    ) {
      player1.hour--;
      player1.minute = 59;
      player1.second = 59;
    } else {
      return;
    }
    renderering();
  }
  player1Section.innerHTML =
    player1.hour + ":" + player1.minute + ":" + player1.second;
}, 1000);

setInterval(() => {
  if (!player2.pause) {
    if (player2.second > 0) {
      player2.second--;
    } else if (player2.second === 0 && player2.minute > 0) {
      player2.minute--;
      player2.second = 59;
    } else if (
      player2.second === 0 &&
      player2.minute === 0 &&
      player2.hour > 0
    ) {
      player2.hour--;
      player2.minute = 59;
      player2.second = 59;
    } else {
      return;
    }
    renderering();
  }
  player2Section.innerHTML =
    player2.hour + ":" + player2.minute + ":" + player2.second;
}, 1000);

//eventlisteners for the player sections
player1Section.addEventListener("click", () => {
  if (!player1.pause) {
    player1.pause = true;
    player2.pause = false;
  } else {
  }
  if (player1.pause && player2.pause) {
    player1.pause = false;
    player2.pause = true;
  }
  renderering();
});

player2Section.addEventListener("click", () => {
  if (!player2.pause) {
    player2.pause = true;
    player1.pause = false;
  } else {
  }
  if (player1.pause && player2.pause) {
    player1.pause = true;
    player2.pause = false;
  }
  renderering();
});

//eventlistener for the pause button
const pauseButton = document.getElementById("pause");
pauseButton.addEventListener("click", () => {
  player1.pause = true;
  player2.pause = true;
  renderering();
});

const settingsMenuButton = document.getElementById("settings");
function renderering() {
  if (player1.pause && player2.pause) {
    player1Section.classList.remove("player-active");
    player2Section.classList.remove("player-active");
    settingsMenuButton.classList.add("setting-button-active");
  }
  if (!player1.pause && player2.pause) {
    player1Section.classList.add("player-active");
    player2Section.classList.remove("player-active");
    settingsMenuButton.classList.remove("setting-button-active");
  } else if (player1.pause && !player2.pause) {
    player1Section.classList.remove("player-active");
    player2Section.classList.add("player-active");
    settingsMenuButton.classList.remove("setting-button-active");
  }
  if (
    player1Section.classList.contains("player-active") &&
    player1.minute < 15
  ) {
    player1Section.classList.add("player-active-alert");
  } else {
    player1Section.classList.remove("player-active-alert");
  }
  if (
    player2Section.classList.contains("player-active") &&
    player2.minute < 15
  ) {
    player2Section.classList.add("player-active-alert");
  } else {
    player2Section.classList.remove("player-active-alert");
  }
}

//display settings menu when settings button is clicked
const settingsMenu = document.getElementById("settings-menu");
settingsMenuButton.addEventListener("click", () => {
  console.log("settings menu button clicked");
  settingsMenu.classList.add("settings-menu-active");
});

//close settings menu when close button is clicked
const closeSettingsMenuButton = document.getElementById("close-settings-btn");
closeSettingsMenuButton.addEventListener("click", () => {
  settingsMenu.classList.remove("settings-menu-active");
});

//change time for players
const changeTimeButton = document.getElementById("change-time-btn");
changeTimeButton.addEventListener("click", () => {
  let newHour = parseInt(document.getElementById("newHour").value);
  let newMinute = parseInt(document.getElementById("newMinute").value);
  let newSecond = parseInt(document.getElementById("newSecond").value);
  if (isNaN(newHour) || newHour < 0) {
    newHour = 0;
  }
  if (isNaN(newMinute) || newMinute < 0) {
    newMinute = 0;
  }
  if (isNaN(newSecond) || newSecond < 0) {
    newSecond = 0;
  }
  player1.hour = newHour;
  player1.minute = newMinute;
  player1.second = newSecond;
  player2.hour = newHour;
  player2.minute = newMinute;
  player2.second = newSecond;
});

renderering();
