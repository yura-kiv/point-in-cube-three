export const mapRange = (value, low1, high1, low2, high2) => {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
};

export const lerp = (start, end, alpha) => {
  return (1 - alpha) * start + alpha * end;
};