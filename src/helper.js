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

export const hasLabel = (array, key) => {
  if (key === 0) return true;
  else if (key > 0) {
    return dayjs(array[key - 1].createdAt).isAfter(
      dayjs(array[key].createdAt),
      "month"
    );
  }
};
