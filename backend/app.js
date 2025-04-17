const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes/routing');

dotenv.config();
const app = express();

//middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use('/api', routes);

//server
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`app listing to ${PORT}`);
});
