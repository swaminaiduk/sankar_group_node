import * as mongoose from 'mongoose';
import config from '../config/app';

// Connecting to the database
export default (async () => {
  try {
    await mongoose.connect(
      config.DB_HOST,
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        autoIndex: true,
        // useCreateIndex: true
      }
    );
    // listen for requests
    console.log('Database Conection is Ok');
  } catch (err) {
    console.log(`${err} Could not Connect to the Database. Exiting Now...`);
    process.exit();
  }
})();
