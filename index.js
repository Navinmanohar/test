const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connected succesfully");
}).catch((err)=>{
    console.log(`error occour in connection ${err.message}`)
})

app.use('/api/auth', require('./Routes/authRoutes'));
app.use('/api/file', require('./Routes/fileRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

"./"