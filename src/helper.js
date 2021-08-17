const reverseString = (str) => str.split("").reverse().join("");

//check for palindrome
const isPalindrome = (str) => str === reverseString(str);

//get the date object with key value pairs
// "2021-08-09"
const getDateObject = (date) => {
  let dateString = date.split("-");
  for (let i = 0; i < dateString.length; i += 1) {
    dateString[i] = parseInt(dateString[i], 10);
  }
  return {
    day: dateString[2],
    month: dateString[1],
    year: dateString[0]
  };
};
// console.log(getDateObject("2021-8-09"))

//append zero where required
//day: 7, month: 8, year: 2021
const getFormattedDate = (dateObject) => {
  // let dateObject = getDateObject(date)
  var dateString = { day: "", month: "", year: "" };
  dateString.day =
    dateObject.day < 10 ? "0" + dateObject.day : dateObject.day.toString();

  dateString.month =
    dateObject.month < 10
      ? "0" + dateObject.month
      : dateObject.month.toString();

  dateString.year = dateObject.year.toString();
  return dateString;
};

// console.log(getFormattedDate({day: 19, month: 11, year: 2021}))

//get all formats of date
//these are the strings we will check palindrome for

//day: 7, month: 8, year: 2021
const getDateInAllFormats = (myDate) => {
  let date = {};
  for (const i in getFormattedDate(myDate)) {
    date[i] = getFormattedDate(myDate)[i].toString();
  }
  // let date = getFormattedDate(getDateObject(myDate))
  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yymmdd = date.year.slice(-2) + date.month + date.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};
// console.log(getDateInAllFormats({day: 7, month: 9, year: 2021}))

//day: 7, month: 8, year: 2021
const checkDateIsPalindrome = (date) => {
  const allDateFormats = getDateInAllFormats(date);
  let isDatePalindrome = false;
  for (let i = 0; i < allDateFormats.length; i += 1) {
    if (isPalindrome(allDateFormats[i])) {
      isDatePalindrome = true;
      break;
    }
  }
  return isDatePalindrome;
};
// console.log("hi", checkDateIsPalindrome({day: 21, month: 11, year: 1112}) ? true : false)

const isLeapYear = (year) => {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
};

// console.log(isLeapYear(2004))

//day: 7, month: 8, year: 2021
const getNextDate = (date) => {
  let { day, month, year } = date;
  day += 1;
  const numOfDays = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ];
  if (day > numOfDays[month - 1]) {
    day = 1;
    month += 1;
  }
  if (month > 12) {
    month = 1;
    year += 1;
  }
  return { day, month, year };
};
// console.log(getNextDate({day: 28, month: 02, year: 2020}))

//input: {day: 7, month: 8, year: 2021}
const getPreviousDate = (date) => {
  let { day, month, year } = date;
  day -= 1;
  const numOfDays = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ];
  if (day < 1) {
    day = numOfDays[month - 2] || 31;
    month -= 1;
  }
  if (month < 1) {
    month = 12;
    year -= 1;
  }
  return { day, month, year };
};
// console.log(getPreviousDate({day: 1, month: 1, year: 2021}))

//function to get the date in "yyyy-mm-dd" format from date object format
//used while printing nearest palindromes
const dateObjToStringConverter = (date) => {
  const formattedDate = getFormattedDate(date);
  let { day, month, year } = formattedDate;
  let newDate = day + "-" + month + "-" + year;
  return newDate;
};

//2021-02-12
const getNextPalindrome = (date) => {
  let ctr = 0;
  let nextDate = getDateObject(date);
  while (true) {
    if (checkDateIsPalindrome(nextDate)) {
      return { ctr, date: dateObjToStringConverter(nextDate) };
    } else {
      nextDate = getNextDate(nextDate);
      ctr += 1;
    }
  }
};

// getNextPalindrome("2020-02-01")

const getPreviousPalindrome = (date) => {
  let ctr = 0;
  let previousDate = getDateObject(date);
  while (true) {
    if (checkDateIsPalindrome(previousDate)) {
      return { ctr, date: dateObjToStringConverter(previousDate) };
    } else {
      previousDate = getPreviousDate(previousDate);
      ctr += 1;
    }
  }
};
// getPreviousPalindrome("2020-02-05")
export {
  reverseString,
  isPalindrome,
  getDateObject,
  getFormattedDate,
  getDateInAllFormats,
  checkDateIsPalindrome,
  isLeapYear,
  getNextDate,
  getPreviousDate,
  getNextPalindrome,
  getPreviousPalindrome,
  dateObjToStringConverter
};
