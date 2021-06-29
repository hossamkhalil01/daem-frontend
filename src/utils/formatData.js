const formatDate = (date) => {
  const currentDate = new Date(date);
  const formattedDate = currentDate.toDateString();
  return formattedDate;
};

export default formatDate;
