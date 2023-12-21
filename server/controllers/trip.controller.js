const {pool} = require('../db');
const HttpStatus = require('http-status-codes');
const {parseDateFromText} = require('../utils/parseDate');
const {analyzeText} = require('../utils/analyzeText');

const getCharacteristicsLabels = async () => {
  try {
    const queryResult = await pool.query('SELECT label FROM characteristics');
    return queryResult.rows.map(row => row.label);
  } catch (error) {
    console.error('Error al obtener las etiquetas de características:', error);
    throw error;
  }
};

async function getTripByCharacteristics(req, res) {
  try {
    const {characteristics, date} = req.body;
    const dateParsed = parseDateFromText(date);
    const qualities = await getCharacteristicsLabels();
    const characteristicsFiltered = analyzeText(characteristics, qualities);

    const {rows} = await pool.query(`SELECT *
                                     FROM get_destinations_info()`);

    // const {rows} = await pool.query(`CALL find_trip(characteristics, dateParsed)`);
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
