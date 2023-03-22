const renderRaw = (string, ...values) => {
  return String.raw(string, ...values);
};

export { renderRaw as html, renderRaw as css };
