const mongoose = require("mongoose");

const ConnectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
      console.log('Connected to Database')
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = ConnectDatabase;
