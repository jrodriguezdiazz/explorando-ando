function isValidInteger(str) {
  try {
    const num = parseInt(str, 10);
    return !isNaN(num) && str.trim() === num.toString();

  } catch (e) {
    return false;
  }
}

module.exports = {
  isValidInteger
};
