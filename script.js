const player1Section = document.getElementById("time1");
const player2Section = document.getElementById("time2");

const PLAYER1_TIME_STORAGE_KEY = "chessclock.player1.time";
const PLAYER2_TIME_STORAGE_KEY = "chessclock.player2.time";

let player1 = { hour: 1, minute: 30, second: 0, pause: true };
let player2 = { hour: 1, minute: 30, second: 0, pause: true };

function updateClockDisplay() {
  player1Section.innerHTML =
    player1.hour + ":" + player1.minute + ":" + player1.second;
  player2Section.innerHTML =
    player2.hour + ":" + player2.minute + ":" + player2.second;
}

function savePlayerTimes() {
  localStorage.setItem(PLAYER1_TIME_STORAGE_KEY, JSON.stringify(player1));
  localStorage.setItem(PLAYER2_TIME_STORAGE_KEY, JSON.stringify(player2));
}

function loadStoredTime(storageKey, fallbackPlayer) {
  const storedTime = localStorage.getItem(storageKey);
  if (!storedTime) {
    return;
  }

  try {
    const parsedTime = JSON.parse(storedTime);
    if (
      typeof parsedTime.hour === "number" &&
      typeof parsedTime.minute === "number" &&
      typeof parsedTime.second === "number"
    ) {
      fallbackPlayer.hour = parsedTime.hour;
      fallbackPlayer.minute = parsedTime.minute;
      fallbackPlayer.second = parsedTime.second;
    }
  } catch (error) {
    localStorage.removeItem(storageKey);
  }
}

loadStoredTime(PLAYER1_TIME_STORAGE_KEY, player1);
loadStoredTime(PLAYER2_TIME_STORAGE_KEY, player2);

let lowTimeAlert = 30;

updateClockDisplay();

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
    savePlayerTimes();
    renderering();
  }
  updateClockDisplay();
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
    savePlayerTimes();
    renderering();
  }
  updateClockDisplay();
}, 1000);

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

const pauseButton = document.getElementById("pause");
pauseButton.addEventListener("click", () => {
  player1.pause = true;
  player2.pause = true;
  renderering();
});

const settingsMenuButton = document.getElementById("settings");
const middleSection = document.getElementById("pause");
function renderering() {
  if (player1.pause && player2.pause) {
    player1Section.classList.remove("player-active");
    player2Section.classList.remove("player-active");
    settingsMenuButton.classList.add("setting-button-active");
    middleSection.classList.add("pause-active");
  }
  if (!player1.pause && player2.pause) {
    player1Section.classList.add("player-active");
    player2Section.classList.remove("player-active");
    settingsMenuButton.classList.remove("setting-button-active");
    middleSection.classList.remove("pause-active");
  } else if (player1.pause && !player2.pause) {
    player1Section.classList.remove("player-active");
    player2Section.classList.add("player-active");
    settingsMenuButton.classList.remove("setting-button-active");
    middleSection.classList.remove("pause-active");
  }
  if (
    player1Section.classList.contains("player-active") &&
    player1.minute < lowTimeAlert &&
    player1.hour === 0
  ) {
    player1Section.classList.add("player-active-alert");
  } else {
    player1Section.classList.remove("player-active-alert");
  }


  if (
    player2Section.classList.contains("player-active") &&
    player2.minute < lowTimeAlert &&
    player2.hour === 0
  ) {
    player2Section.classList.add("player-active-alert");
  } else {
    player2Section.classList.remove("player-active-alert");
  }
}


const settingsMenu = document.getElementById("settings-menu");
settingsMenuButton.addEventListener("click", () => {
  settingsMenu.classList.add("settings-menu-active");
});


const closeSettingsMenuButton = document.getElementById("close-settings-btn");
closeSettingsMenuButton.addEventListener("click", () => {
  settingsMenu.classList.remove("settings-menu-active");
});


const changeTimeButton = document.getElementById("change-time-btn");
const lowTimeInput = document.getElementById("low-time-alert");

lowTimeInput.value = lowTimeAlert;

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
  if (lowTimeInput.value === "") {
    lowTimeAlert = lowTimeAlert;
  } else {
    lowTimeAlert = lowTimeInput.value;
  }
  savePlayerTimes();
  updateClockDisplay();
  renderering();
});

renderering();
