import dayjs from "dayjs";
import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper";

export const statusBarHeight = getStatusBarHeight(true);
export const bottomSpace = getBottomSpace();
export const ITEM_WIDTH = 220;

export const fillEmptyColumns = (columns, start, end) => {
  const filledColumns = columns.slice(0);

  // 1. 첫날 이전 공백 채우기, 시작 요일의 number 0:일 ~ 6:토
  const startDay = dayjs(start).get("day");

  for (let i = 1; i <= startDay; i += 1) {
    // start부터 i 일을 빼고 배열에 넣기
    const date = dayjs(start).subtract(i, "day");
    filledColumns.unshift(date);
  }
  // 2. 마지막날 이후 공백 채우기
  const endDay = dayjs(end).get("day");
  /**
    0 -> 6
    1 -> 5
    2 -> 4
    endDay + ? = 6
   */
  for (let i = 1; i <= 6 - endDay; i += 1) {
    const date = dayjs(end).add(i, "day");
    filledColumns.push(date);
  }

  return filledColumns;
};
export const getCalendarColumns = (now) => {
  const start = dayjs(now).startOf("month"); // 현재 달의 첫 날의 date
  const end = dayjs(now).endOf("month"); // 현재 달의 마지막 날의 date
  const endDate = dayjs(end).get("date"); // 마지막 날짜. number

  const columns = [];
  // 마지막 날짜만큼 배열 채우기
  for (let i = 0; i < endDate; i += 1) {
    const date = dayjs(start).add(i, "day");
    columns.push(date);
  }

  const filledColumns = fillEmptyColumns(columns, start, end);
  return filledColumns;
};

/**
 * 
 * @param day 0 ~ 6
 * @returns 일 ~ 월
 */
const dayTexts = ['일', '월', '화', '수', '목', '금', '토'];
export const getDayText = (day) => {
  return dayTexts[day];
  // switch (day) {
  //   case 0: return '일';
  //   case 1: return '월';
  //   case 2: return '화';
  //   case 3: return '수';
  //   case 4: return '목';
  //   case 5: return '금';
  //   case 6: return '토';
  //   default: return '';
  // }
}

export const getDayColor = (day) => {
  const sunday = 0;
  const saturday = 6;
  
  return day === sunday ? '#e67639' : day === saturday ? '#5872d1' : '#2b2b2b';  
};