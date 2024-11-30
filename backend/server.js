const app = require('./app.js');
const http = require('http');
const { server: socketServer } = require('./utils/Socket.IO/socketHandler'); // Import your Socket.IO server

require('dotenv').config();

const port = process.env.PORT || 5000;

// Create the HTTP server instance
const httpServer = http.createServer(app);

// Attach Socket.IO to the same HTTP server
socketServer.attach(httpServer);

// Start the HTTP server
httpServer.listen(port, () => {
    console.log(`Server and Socket.IO are running on port ${port}`);
});
