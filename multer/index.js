const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;

// Set up static folder to serve uploaded images
app.use(express.static('uploads'));

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Image Upload App!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
