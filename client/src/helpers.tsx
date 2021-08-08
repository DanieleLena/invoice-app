import { useEffect, useState } from "react";

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

export const createId = () => {
  let letters = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 2)
    .toUpperCase();

  var numbers = Math.floor(1000 + Math.random() * 9000);

  let id =letters + numbers;
  return id;
};

export function useDelayUnmount(isMounted: boolean, delayTime: number) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId: any;
    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);
  return shouldRender;
}







// export const invoices_url = "https://invoice-app-daniele.herokuapp.com/invoices/";
export const invoices_url =
  "http://localhost:5000/invoices/" ||
  "https://invoice-app-daniele.herokuapp.com/invoices/";

                            
