const cors = require('cors');
const express = require('express');

const errorHandler = require('./middlewares/errorHandler');
const joiErrorHandler = require('./middlewares/joiErrorHandler');
const routes = require('./routes/index.routes');

const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

// Router
app.use('/api', routes);


// Joi Error Handler Middleware
app.use(joiErrorHandler);

// Error Handler Middleware
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFound);
app.use(errorHandler.methodNotAllowed);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is listening on port ${process.env.APP_PORT}`);
});
