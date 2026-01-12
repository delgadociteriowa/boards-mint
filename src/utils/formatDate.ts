const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);

  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return `${mm}/${dd}/${yy} ${hh}:${min}`;
};

export default formatDate;