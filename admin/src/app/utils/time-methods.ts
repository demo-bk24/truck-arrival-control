export const padTo2Digits = (num: any) => {
  return num.toString().padStart(2, '0');
};

export const convertHoursToHM = (hour: any) => {
  const milliseconds = hour * 60 * 60 * 1000;
  let seconds = Math.floor(milliseconds / 1000) || 0;
  let minutes = Math.floor(seconds / 60) || 0;
  let hours = Math.floor(minutes / 60) || 0;
  seconds = seconds % 60;
  minutes = seconds >= 30 ? minutes + 1 : minutes;
  minutes = minutes % 60;
  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
};

export const convertMinutestoHM = (mins: any) => {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
};
