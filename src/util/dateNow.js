let formatDate = (date) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
let getTimeNow = () => {
  let time = new Date();
  let timeNow =
    ("0" + time.getHours()).slice(-2) +
    ":" +
    ("0" + time.getMinutes()).slice(-2) +
    ":" +
    ("0" + time.getSeconds()).slice(-2);
  return timeNow;
};
module.exports = {
  formatDate,
  getTimeNow,
};
