export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  export const logAction = (characterName, enemyName, damage, characterHP, logs) => {
    const logIndex = random(0, logs.length - 1);
    const logText = logs[logIndex].replace("[PERSONAGE №1]", characterName).replace("[PERSONAGE №2]", enemyName);
    const logDamage = `- ${damage}. Health: ${characterHP}`;
  
    const logElement = document.getElementById("logs");
    const logItem = document.createElement("div");
    logItem.textContent = `${logText} ${logDamage}`;
  
    logElement.innerHTML = '';
  
    logElement.appendChild(logItem);
  };
  
  
  export const createClickCounter = (limit) => {
    let count = 0;
  
    return () => {
      count++;
      if (count > limit) {
        console.log(`The button has been pressed the maximum number of times (${limit})`);
        return false;
      }
      console.log(
        `Button pressed ${count} time(s). Presses remaining: ${limit - count}`
      );
      return true;
    };
  };
  