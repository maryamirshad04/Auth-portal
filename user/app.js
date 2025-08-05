const userRoutes = require('./src/routes/userRoutes'); 
const { connectDB } = require('./src/Model/userModel'); 
require('dotenv').config(); 
const express = require('express'); 
const cors = require('cors'); 
const app = express(); 
const port = 5000; 

app.use(cors({ 
  origin: 'http://localhost:3000', credentials: true 
})); 

app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/user', userRoutes); 

app.get('/', (req, res) => { 
  res.send('Hello World!');
}); 

connectDB().then(() => { 
  app.listen(port, () => { 
    console.log(`Server listening on port ${port}`); 
  }); 
});