const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express')

const app = express();
app.use(cors());
app.use(bodyParser.json());

// console.log(process.env.MONGO_PROD_URI)
require('dotenv').config();

mongoose.connect(process.env.MONGO_PROD_URI, {
}).then(() => console.log('Connected')).catch((error) => console.error('Error to connect:', error));

const userSchema = new mongoose.Schema({
  name: String,
  crushname: String,
  ratio_of_successfull: Number
})

const crushs = mongoose.model('crushs', userSchema);

app.post('/api/crushs', async (req, res) => {
  try {
    const newUser = new crushs(req.body);
    await newUser.save();
    res.status(201).json({ message: 'New crush added successfully', data: newUser });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Sever is running on port:', PORT);
})

module.exports = app;