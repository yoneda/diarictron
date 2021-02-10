import dayjs from "dayjs";

export const isSame = (one, another) =>
  one.year() === another.year() &&
  one.month() === another.month() &&
  one.date() === another.date();

export const isInside = (point, rect) =>
  point.x > rect.x &&
  point.x <= rect.x + rect.width &&
  point.y > rect.y &&
  point.y <= rect.y + rect.height;

export const humanDate = date =>
  dayjs(date)
    .format("YYYY年MM月DD日(dddd) H:m")
    .replace(
      /Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday/,
      match => {
        switch (match) {
          case "Monday":
            return "月";
          case "Tuesday":
            return "火";
          case "Wednesday":
            return "水";
          case "Thursday":
            return "木";
          case "Friday":
            return "金";
          case "Saturday":
            return "土";
          case "Sunday":
            return "日";
        }
      }
    );
