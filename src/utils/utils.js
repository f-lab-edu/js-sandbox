const renderRaw = (string, ...values) => {
  return String.raw(string, ...values);
};

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export { renderRaw as html, renderRaw as css, shuffle };
