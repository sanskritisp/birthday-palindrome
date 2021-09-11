const inputDate = document.querySelector("#bdy-input");
const button =  document.querySelector("#btn");
const output = document.querySelector("#output");

button.addEventListener("click", clickHandler);

 function clickHandler(e) {
        var bdayString = inputDate.value;
      
        if (bdayString !== '') {
          var date = bdayString.split('-');
          var yyyy = date[0];
          var mm = date[1];
          var dd = date[2];
      
          var date = {
            day: Number(dd),
            month: Number(mm),
            year: Number(yyyy)
          };
      
          var dateStr = dateAsString(date);
          var list = checkPalindromeForAllDates(dateStr);
          var isPalindrome = false;
      
          for (let i = 0; i < list.length; i++) {
            if (list[i]) {
              isPalindrome = true;
              break;
            }
          }
         if (!isPalindrome) {
            const [counter, nextDate] = getNextPalindrome(date);
            
              output.innerText = "OOPS!! YOUR BIRTHDATE IS NOT A PALINDROME 🙁.The nearest palindrome date is " + nextDate.day + "-" + nextDate.month +"-"+ nextDate.year + " , you missed by " + counter + " days.";
            
          } else {
            output.innerText = 'YEAH!! YOUR BIRTHDATE IS A PALINDROME!🎉';
          }
        }
      }

function reverseString(str) {
    var listOfChars = str.split('');
    var reversedList = listOfChars.reverse();
    var reversedString = reversedList.join('');
    return reversedString;
  }
  
  function isStringPalindrome(str) {
    var reversedString = reverseString(str);
    return str === reversedString;
  }
  
  function dateAsString(date) {
    var dateInStr = { day: '', month: '', year: '' };
  
    if (date.day < 10) {
      dateInStr.day = '0' + date.day;
    }
    else {
      dateInStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateInStr.month = '0' + date.month;
    }
    else {
      dateInStr.month = date.month.toString();
    }
  
    dateInStr.year = date.year.toString();
    return dateInStr;
  }
  
  function dateInAllFormats(date) {
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
  }
  
  function checkPalindromeForAllDates(date) {
    var dateFormatList = dateInAllFormats(date);
    var palindromeList = [];
  
    for (var i = 0; i < dateFormatList.length; i++) {
      var result = isStringPalindrome(dateFormatList[i]);
      palindromeList.push(result);
    }
    return palindromeList;
  }
  
  function leapYear(year) {
  
    if (year % 400 === 0)
      return true;
  
    if (year % 100 === 0)
      return false;
  
    if (year % 4 === 0)
      return true;
  
    return false;
  }
  
  function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month = 3;
        }
      }
      else {
        if (day > 28) {
          day = 1;
          month = 3;
        }
      }
    }
    else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }
  
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year
    }
  }
  
  
  function getNextPalindrome(date) {
  
    var nextDate = getNextDate(date);
    var counter = 0;
  
    while (1) {
      counter++;
      var dateStr = dateAsString(nextDate);
      var resultList = checkPalindromeForAllDates(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [counter, nextDate];
        }
      }
      nextDate = getNextDate(nextDate);
    }
  }
  

  
