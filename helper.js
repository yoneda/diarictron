export const isSame = (one, another) =>
  one.year() === another.year() &&
  one.month() === another.month() &&
  one.date() === another.date();

export const isInside = (point, rect) =>
  point.x > rect.x &&
  point.x <= rect.x + rect.width &&
  point.y > rect.y &&
  point.y <= rect.y + rect.height;
