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

// const date = () => {
//   // "2021-09-24
//   // 2021-07-31

//   let a = "2021-07-31";

//   let b = new Date(a);

//   console.log(b);
  
// }
// date();

let dateArray = [
  { name: "ok", date: "2021-09-24" },
  { name: "ok1", date: "2021-07-31" },
  { name: "ok2", date: "2021-07-31" },
  { name: "ok3", date: "2021-08-12" },
  { name: "ok4", date: "1998-03-28" },
  { name: "ok5", date: "2018-03-28" },
  { name: "ok6", date: "2021-09-15" },
];

// dateArray.sort(function (date1:any, date2:any) {
//   date1 = new Date(date1.date);
//   date2 = new Date(date2.date);
//   if (date1 > date2) return 1;
//   if (date1 < date2) return -1;
// });

// console.log(dateArray);






export const invoices_url = "http://localhost:5000/invoices/";

