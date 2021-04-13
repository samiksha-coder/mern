export const dateFormatter = (input) => {
  const dateObj = new Date(input.data.updated);
  const dateFormat = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "short",
    timeStyle: "medium",
    hour12: true,
  });
  return dateFormat.format(dateObj);
};
