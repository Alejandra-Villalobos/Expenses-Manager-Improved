module.exports.actualDate = () => {
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth =
    (currentDate.getMonth() < 10 ? "0" : "") + (currentDate.getMonth() + 1);
  const currentDayOfMonth = (currentDate.getDate()  < 10 ? "0" : "") + currentDate.getDate();

  const timeNow = `${currentDayOfMonth}-${currentMonth}-${currentYear}`;
  return timeNow;
};
