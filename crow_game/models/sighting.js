
/*Name: Sarah-Anne Green
Assignment 4 - Javascript API Server 
August 10/2025
        
Objective: To use the form from Assignment 3 and transform it into an
interactive web application by connecting it to a server API. Using
CRUD operations, and fetch(), users can add, view, update, and remove 
entries from a server-based database.
_______________________________________________________________________*/


// models/sighting.js
class Sighting {
  constructor({
    id,
    rangerName = '',
    rangerID = '',
    sightingDate = '',
    animal = '',
    location = '',
    description = '',
    details = '',
  } = {}) 
  {
    this.id = id || Date.now().toString();
    this.rangerName = String(rangerName).trim();
    this.rangerID = String(rangerID).trim();
    this.sightingDate = String(sightingDate).trim(); // YYYY-MM-DD
    this.animal = String(animal).trim();
    this.location = String(location).trim();
    this.description = String(description).trim();
    this.details = String(details).trim();
  }
}

module.exports = { Sighting };
