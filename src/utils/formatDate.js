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
