const chrono = require('chrono-node');

const parseDateFromText = (text) => {
  try {
    const parsedDate = chrono.es.parseDate(text);
    if (!parsedDate) {
      console.log({ error: 'No se pudo determinar la fecha' });
      return null
    }

    return parsedDate.toISOString().split('T')[0];
  } catch (error) {
    return null
  }
}

module.exports = {
  parseDateFromText
}
