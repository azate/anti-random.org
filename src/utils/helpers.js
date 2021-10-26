export function isInt(value) {
  return /^-?[0-9]+$/.test(value);
}

export function toInt(value) {
  if (!isInt(value)) {
    return null;
  }

  const parsed = parseInt(String(value), 10);

  return !Number.isNaN(parsed) ? parsed : null;
}
