export const formatPrice = (number:number) => {
  const newNumber = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(number);

  return newNumber;
};
