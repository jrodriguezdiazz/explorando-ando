const {pool} = require('../db');
const HttpStatus = require('http-status-codes');
const {parseDateFromText} = require('../utils/parseDate');
const {analyzeText} = require('../utils/analyzeText');

const getCharacteristicsLabels = async () => {
  try {
    const queryResult = await pool.query('SELECT label, range, c.category FROM characteristics INNER JOIN categories c on characteristics.category_id = c.id');
    return {data: queryResult.rows, labels: queryResult.rows.map(({label}) => label)};
  } catch (error) {
    console.error('Error al obtener las etiquetas de características:', error);
    throw error;
  }
};

const getTripsIdsByCharacteristics = async (characteristicsFiltered) => {
  let query = 'SELECT id FROM destinations';

  if (characteristicsFiltered.length > 0) {
    const whereConditions = characteristicsFiltered.map(char => {
      return `${char.category} BETWEEN ${char.range.start} AND ${char.range.end}`;
    });

    query += ' WHERE ' + whereConditions.join(' AND ');
  }

  try {
    const {rows} = await pool.query(query);
    return rows.map(({id}) => `'${id}'`);
  } catch (error) {
    return [];
  }
};


async function getTripByCharacteristics(req, res) {
  try {
    const {characteristics, date} = req.body;
    const dateParsed = parseDateFromText(date);
    console.log(dateParsed);
    const {labels, data} = await getCharacteristicsLabels();
    const characteristicsToFiltered = analyzeText(characteristics, labels);
    const characteristicsFiltered = data.filter(({label}) => characteristicsToFiltered.includes(label));
    const ids = await getTripsIdsByCharacteristics(characteristicsFiltered);
    const query = `SELECT *
                   FROM get_destinations_info(ARRAY [${ids}], '${dateParsed}');`;

    const {rows} = await pool.query(query);
    res.json({
      error: false,
      data: rows
    });
  } catch (err) {
    console.log(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
}

async function getAllTrips(req, res) {
  try {
    const {rows} = await pool.query(`SELECT *
                                     FROM get_destinations_info()`);

    res.json({
      error: false,
      data: rows
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
}

async function getTripById(req, res) {
  try {
    const {rows} = await pool.query(`SELECT *
                                     FROM get_destinations_info(ARRAY ['${req.params.id}']);`);

    res.json({
      error: false,
      data: rows
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
}

async function findNextTrip(req, res) {
  try {
    const {rows} = await pool.query(`SELECT *
                                     FROM get_destinations_info();`);
    res.json({
      error: false,
      data: rows
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
}

module.exports = {
  getAllTrips,
  findNextTrip,
  getTripById,
  getTripByCharacteristics
};
