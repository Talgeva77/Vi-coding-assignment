const express = require('express');
const routes = require('./routes');
const {refreshCache} = require('./cache');

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await refreshCache();
    app.use('/', routes);
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    
    // Schedule cache refresh every 24 hours
    setInterval(async () => {
      console.log('Refreshing cache...');
      await refreshCache();
      console.log('Cache refreshed.');
              }, 24 * 60 * 60 * 1000);
  }
  catch(err) {
    console.error('Failed to refresh cache:', err);
  }
}

startServer();