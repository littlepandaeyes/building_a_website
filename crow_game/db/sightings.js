
/*Name: Sarah-Anne Green
Assignment 4 - Javascript API Server 
August 10/2025
        
Objective: To use the form from Assignment 3 and transform it into an
interactive web application by connecting it to a server API. Using
CRUD operations, and fetch(), users can add, view, update, and remove 
entries from a server-based database.
_______________________________________________________________________*/



//the array/ fake database

const { Sighting } = require('../models/sighting');

// Seed data (optional; you can start with [])
const DefaultSightingsData  = [
  {
    rangerName: 'Ranger Panda',
    rangerID: '1234',
    sightingDate: '2025-07-24',
    animal: 'Deer',
    location: 'Forest Edge',
    description: 'Medium size, brown',
    details: 'Grazing near trees'
  },
];

// Live array the app mutates
const Sightings = DefaultSightingsData.map(o => new Sighting(o));

// Minimal reset helper (clears, then re-seeds)
function resetSightings({ seed = true } = {}) {
  Sightings.length = 0; // clear existing
  if (seed) {
    DefaultSightingsData.forEach(o => Sightings.push(new Sighting(o)));
  }
};

module.exports = { Sighting, Sightings, resetSightings };
