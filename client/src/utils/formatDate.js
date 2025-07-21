const formatDate = (createdAt) => {
  const date = new Date(createdAt);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' }); // e.g., "January"
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export default formatDate;