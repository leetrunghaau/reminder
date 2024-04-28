const express = require('express');
const dotenv = require('dotenv');
var cors = require('cors')
const http = require('http');
const path = require('path');
const app = express();
// Load environment variables from .env file
dotenv.config();
const server = http.createServer(app);

// Parse JSON body
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));
// Routes
const apiRoutes = require('./routes/index');
app.use('/api', cors(), apiRoutes);
// Error handling middleware
const { errorMiddleware } = require('./middlewares/error-middleweara');
app.use(errorMiddleware);

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});