let alarmActive = false;

export function activateSafetyAlarm() {
  alarmActive = true;
  // Code to activate alarm
}

export function deactivateSafetyAlarm() {
  alarmActive = false;
  // Code to deactivate alarm
}

export function handleCheckAlarmStatus() {
  return alarmActive;
}
