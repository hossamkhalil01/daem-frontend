export const formatDate = (date, language) => {
  const _date = new Date(date.split("T")[0]);
  return _date.toLocaleString(language, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const getAge = (date) => {
  const _date = new Date(date);
  return Math.floor((Date.now() - _date.getTime()) / (1000 * 3600 * 24 * 365));
};

export const timeSincePublication = (datetime) => {
  let period = "";
  const now = new Date();
  console.log(now);
  const date = datetime.split("T")[0];
  const time = datetime.split("T")[1].split(".")[0];
  const dateSections = date.split("-");
  const years = now.getFullYear() - dateSections[0];
  const months = now.getMonth() - dateSections[1];
  console.log(now.getMonth());
  console.log(months);
  const days = now.getDate() - dateSections[2];
  const timeSections = time.split(":");
  const hours = now.getHours() - timeSections[0];
  const minutes = now.getMinutes() - timeSections[1];
  if (years) period = years + " years ago";
  else if (months) period = months + " months ago";
  else if (days) period = days + " days ago";
  else if (hours) period = hours + " hours ago"
  else period = minutes + " minutes ago";
  return period;
};