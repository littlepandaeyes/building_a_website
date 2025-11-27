
# Name: Sarah-Anne Green
# Assignment 4 - Javascript API Server
# Auguest 10/2025
_____________________________________________________________________

# Ranger's Wildlife Sighting Log

This is an HTML form, powered by JavaScript that collects and validates ranger  
wildlife sightings. 

A two part project with original page saving to local storage and page 2 saving to the server. There is a link back and forth between the two pages, the idea being an admin would use the server side one.

## Parts
- Form (Assignment 3): public/index.html
- Sever App (Assignment 4): public/displayServer.html

They are almost identical as they share the same format and styling


# How to Run
1. Install Dependencies:
    npm install
    Note: node_modules is not included in the zip, will come with this step

2. Start the server
    node server.js

3. Open the app
    server UI: http://localhost:4000/displayServer.html

# Project Structure
.
├─ server.js
├─ routes/
│  └─ sightingsRoutes.js
├─ controllers/
│  └─ sightingsController.js
├─ db/
│  └─ sightings.js          
├─ models/
│  └─ sighting.js
└─ public/
   ├─ index.html           
   ├─ displayServer.html   
   ├─ js/
   │  └─ api.js 
   │  └─ script.js             
   └─ css/
      └─ style.css


# Form Fields

- **Ranger Name**  
  - Input for the name of the ranger submitting the sighting.
  - 2–15 letters only, must capatalize first letter.

- **Ranger ID Number**  
  - A 4-digit unique identifier assigned to the ranger.
  - 4 numbers only, min 1000, max 9999.
  
- **Date of Sighting**  
  - The calendar date the sighting occurred. 
  - Cannot be in the future.

- **Animal Sighted**  
  - A short answer field to enter animal name. 
  - User can select which one was seen from a suggestion list. (index page only)
  - 3-15 letters only, must capatilize first letter.

- **Location Spotted**  
  - Dropdown to choose where the animal was seen (e.g., Forest Edge, Campground, etc.).
  - Defaults to Rangers Windows, can never be invalid.

- **Brief Description**  
  - A short summary describing the sighting (color, size, behavior, etc.).
  - Takes letters, numbers and select special characters. 
  - No maximum characters.

- **Sighting Details**  
  - A longer textarea where rangers can give full details about the encounter.
  - Takes letters, numbers and select special characters. 
  - No maximum characters.

---

# Sample Regex for Validation

```javascript
const nameRegex = /^[A-Z][A-Za-z ]{2,15}$/;  // Validates 2 to 15 letters and spaces only

const idRegex = /^\d{4}$/;              // Validates exactly 4 digits (e.g., 1234)

```
# Testing the Form

1. Load existing records
 -Open displayServer.html → list auto-loads via GET /api/sightings.
2. Create
 -Fill the form → Save → new row appears (POST).
3. Edit
 -Click Edit on a row → fields populate → change values → Update (PUT).
4. Delete
 -Click Delete on a row → confirm → row disappears (DELETE).
5. Reset Database
 -Click Reset Database → list returns to seeded entry (POST /api/reset).
6. Validation checks
 -Try an invalid name (e.g., 1 char), wrong ID (not 4 digits), future date → errors appear and save is blocked.

# API Layout
Base URL: http://localhost:4000/api/sightings

Method	Path	                  Description	Body                  (JSON)
GET	    /api/sightings	        List all sightings	               —
GET	    /api/sightings/:id	    Get one by id	—
POST	  /api/sightings	        Create a new sighting	            { rangerName, rangerID, sightingDate, animal, location, description, details }
PUT	    /api/sightings/:id	    Update (replace) a sighting	      same as POST body
DELETE	/api/sightings/:id	    Delete a sighting           	     —
POST	  /api/reset	            Reset DB to default sightings	     —

## Notes
id is generated server-side on POST.
The in-memory DB is kept in db/sightings.js. resetSightings() clears and re-seeds (or can be configured to empty).

# Known Issues
Data is stored in memory; restarting the server resets everything.
resetSightings() re-sets from DefaultSightingsData.
Index page still saves to local server and will not update the api, only the server page will do that.
Ensure you run from the project root so static files resolve correctly.