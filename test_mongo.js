// test-mongo.js
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb+srv://itzchaitanya88:0NwEOpzv4PncygEC@cluster0.t0fa6kq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

(async () => {
  try {
    await mongoose.connect(uri, { dbName: 'admin' });
    console.log('Connected to MongoDB!');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Connection failed:', err);
    process.exit(1);
  }
})();
