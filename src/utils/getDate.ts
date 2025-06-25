export const getDate = () => {
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();
  const date = today.getDate();
  const day = today.toLocaleString("default", { weekday: "short" });
  const hour = today.getHours();

  return { currentDate: `${day} ${date} ${month}, ${year}`, hour };
};
