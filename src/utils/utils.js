const renderRaw = (string, ...values) => {
  return String.raw(string, ...values);
};

/**
 * @param {number} times
 * @param {function} callback
 * @returns {string}
 */
const repeat = (times, callback) => {
  return new Array(times).fill('').map(callback).join('');
};

export { renderRaw as html, renderRaw as css, repeat };
