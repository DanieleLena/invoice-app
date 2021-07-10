export const formatPrice = (number: number) => {
  const newNumber = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(number);

  return newNumber;
};

export const formatDate = (date: string) => {
  let toFormatDate = new Date(date).toDateString();
  let array = toFormatDate.split(" ");
  let formattedData = `${array[2]} ${array[1]} ${array[3]}`;
  return formattedData;
};


