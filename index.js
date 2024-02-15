const express = require('express');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const travellerRoutes = require('./routes/api/traveller-routes');
const locationRoutes = require('./routes/api/location-routes');
const tripRoutes = require('./routes/api/trip-routes');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const Traveller = require('./models/traveller')(sequelize);
const Location = require('./models/location')(sequelize);
const Trip = require('./models/trip')(sequelize);

app.use('/api/travellers', travellerRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/trips', tripRoutes);

sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
  });
});
