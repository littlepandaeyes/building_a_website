
/*Name: Sarah-Anne Green
Assignment 4 - Javascript API Server 
August 10/2025
        
Objective: To use the form from Assignment 3 and transform it into an
interactive web application by connecting it to a server API. Using
CRUD operations, and fetch(), users can add, view, update, and remove 
entries from a server-based database.
_______________________________________________________________________*/


const express = require('express');
const path = require('path');
const app = express();
const sightingsRouter = require('./routes/sightingsRoutes'); // <-- note the "./"
const { resetSightings } = require('./db/sightings');

app.use(
    express.static(
        path.join(__dirname, 'public')
    )
); //will use this folder for all public content

//payloads recieved in a request are converted to a JSON object
app.use(express.json());

// app.use('/heroes', router);
app.use('/api/sightings', sightingsRouter);

// Reset endpoint
app.post('/api/reset', (req, res) => {
    console.log('RESET /api/reset HIT');
   try {
    resetSightings();
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Reset DB failed:', err);
    res.status(500).json({ error: 'Reset failed' });
  }
});

app.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
});

