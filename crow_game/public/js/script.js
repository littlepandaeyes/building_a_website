
/*Name: Sarah-Anne Green
Assignment 4 - Javascript API Server 
August 10/2025
        
Objective: To use the form from Assignment 3 and transform it into an
interactive web application by connecting it to a server API. Using
CRUD operations, and fetch(), users can add, view, update, and remove 
entries from a server-based database.
_______________________________________________________________________*/


//DOM COntent Loaded, so starts working before page fully loads
document.addEventListener("DOMContentLoaded", () => {
  
  //Get todays date for date selection validation
  const today = new Date().toLocaleDateString('en-CA');

  //Get all dynamic tags
  const form = document.getElementById("sightingForm");
  const dateInput = document.getElementById("sightingDate");
  const resetBtn = document.getElementById("resetButton");
  const saveBtn = document.getElementById("saveButton");
  const serverSide = document.getElementById("serverSide");

   //Go to Server Page from Form
  serverSide.addEventListener("click", ()=>{
    window.location.href = "displayServer.html"
  });
 
  // Reset the form
  resetBtn.addEventListener("click", () => {
    form.reset();
    hideMessage("errorMessages");
    hideMessage("savedData");
  });

  // Save button logic
  saveBtn.addEventListener("click", () => {
    hideMessage("errorMessages");
    hideMessage("savedData");

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const {
      rangerName: name,
      rangerID: id,
      sightingDate: date,
      animal,
      location,
      description,
      details
    } = data;

    const animalValue = animal.trim();
    
    const errors = [];

    // Regex patterns
    const nameRegex = /^[A-Z][A-Za-z ]{2,15}$/;
    const idRegex = /^\d{4}$/;
    const animalRegex =/^[A-Z][a-z]{2,15}$/;
    const descrtRegex = /^[a-zA-Z\d? \!\\\-\.\+"'\=\(\)]*$/
    const detailRegex = /^[a-zA-Z\d? \!\\\-\.\+"'\=\(\)]*$/

    // Validation
    if (!nameRegex.test(name)) errors.push("Name must be Capatilized, 2–15 letters only.");
    if (!name) errors.push("Please enter your name.")
    
    if (!idRegex.test(id)) errors.push("Ranger ID must be a 4-digit number.");
    if (!id) errors.push("Please enter your ID number.")
    
    if (!date) errors.push("Please select the date of the encounter.");
    dateInput.max = today;
    if (date > today) errors.push("Encounter's can not be in the future.")
    
    if (!animalRegex.test(animalValue)) errors.push("Please capatalize names, 2-15 letters.")
    if (!animalValue) errors.push("Please enter an animal name.");
    
    if (!descrtRegex.test(description)) errors.push("Only letters, numbers and select special charcters in description.")
    if (!description) errors.push("Please add a brief description about the sighting.");
    
    if (!detailRegex.test(details)) errors.push("Only letters, numbers and select special charcters in the details.")
    if (!details) errors.push("Please give some details about the animal encounter.")

    if (errors.length > 0) {
      showMessage("errorMessages", errors.join("<br>"));
      return;
    }

    // Prepare data object
    const sighting = {
      name,
      id,
      date,
      animal: animalValue,
      location,
      description,
      details,
    };

    // Save to localStorage
    localStorage.setItem("rangerSighting", JSON.stringify(sighting));

    // Display saved data
    showMessage("savedData", `
      <strong>Sighting Saved:</strong><br>
      Ranger ${name} (ID: ${id}) spotted a:
      <strong>${animalValue}</strong> 
      at: <strong>${location}</strong> 
      on: <strong>${date}</strong>.<br>
      Description: ${description}<br>
      Details: ${details}
    `);
    setTimeout(() => hideMessage("savedData"), 10000);
    
    // Reset the Form after saved
    form.reset();
  });


  // Pop up message helpers
  function showMessage(id, html) {
    const div = document.getElementById(id);
    div.innerHTML = html;
    div.classList.add("visible");
  }

  function hideMessage(id) {
    const div = document.getElementById(id);
    div.innerHTML = '';
    div.classList.remove("visible");
  }
});
