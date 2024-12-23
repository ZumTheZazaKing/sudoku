export const formatDuration = (seconds) => {
  // Calculate minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Build the formatted duration
  let result = "";
  if (minutes > 0) {
    result += `${minutes}m`;
  }
  if (remainingSeconds > 0) {
    result += (minutes > 0 ? " " : "") + `${remainingSeconds}s`;
  }

  return result;
};
