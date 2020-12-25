
export const isSame = (one, another) =>
  one.year() === another.year() &&
  one.month() === another.month() &&
  one.date() === another.date();

