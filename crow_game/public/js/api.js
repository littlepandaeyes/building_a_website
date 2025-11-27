
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
  const API_BASE = "/api/sightings";

  //Get all tags
  const form = document.getElementById("sightingForm");
  const idHidden = document.getElementById("sightingId");

  const rangerName = document.getElementById("rangerName");
  const rangerID = document.getElementById("rangerID");
  const sightingDate = document.getElementById("sightingDate");
  const animal = document.getElementById("animal");
  const locationSel = document.getElementById("location");
  const description = document.getElementById("description");
  const details = document.getElementById("details");

  const saveBtn = document.getElementById("saveButton");
  const cancelBtn = document.getElementById("resetButton");
  const resetDbBtn = document.getElementById("resetDbButton");

  const list = document.getElementById("sightingsList");
  const errorBox = document.getElementById("errorMessages");
  const savedBox = document.getElementById("savedData");

  //Go to Form Page from Server
    const returnBtn = document.getElementById("returnToForm");
    returnBtn?.addEventListener("click", () => { 
        window.location.href = "index.html"; });


  //Get todays date for date selection validation
  sightingDate.max = new Date().toLocaleDateString("en-CA");


  //Shows and Hides messages in the UI
  const msg = {
    show(el, text) { el.textContent = text; el.classList.add("visible"); }, //adds text into an element
    clear(el) { el.textContent = ""; el.classList.remove("visible"); }, //clears text from an element
    clearAll() { this.clear(errorBox); this.clear(savedBox); } //clears both error and saved box
  };

  // Create new Entry
  let mode = "create";
  function setCreateMode() {
    mode = "create";
    form.reset();
    idHidden.value = "";
    saveBtn.textContent = "Save";
    msg.clearAll();
  }

  //update an existing entry
  function setUpdateMode(rec) {
    mode = "update";
    idHidden.value = rec.id || "";
    rangerName.value = rec.rangerName || "";
    rangerID.value = rec.rangerID || "";
    sightingDate.value = rec.sightingDate || "";
    animal.value = rec.animal || "";
    locationSel.value = rec.location || "";
    description.value = rec.description || "";
    details.value = rec.details || "";
    saveBtn.textContent = "Update";
    msg.clearAll();
  }

  // Clean up entries
  function collect() {
    return {
      rangerName: rangerName.value.trim(),
      rangerID: rangerID.value.trim(),
      sightingDate: sightingDate.value,
      animal: animal.value.trim(),
      location: locationSel.value,
      description: description.value.trim(),
      details: details.value.trim()
    };
  }

  //Mini Regex and Validation (less extensive then main page cause devs use this one)
  function validate(p) {
    const errs = [];
    if (!/^[a-zA-Z ]{2,15}$/.test(p.rangerName)) errs.push("Name: 2–15 letters/spaces.");
    if (!/^\d{4}$/.test(p.rangerID)) errs.push("Ranger ID: 4 digits.");
    const today = new Date().toLocaleDateString("en-CA");
    if (!p.sightingDate) errs.push("Select a date.");
    else if (p.sightingDate > today) errs.push("Date cannot be in the future.");
    if (!p.animal) errs.push("Enter the animal.");
    if (!p.location) errs.push("Select a location.");
    if (!p.description) errs.push("Add a brief description.");
    if (!p.details) errs.push("Add details about the encounter.");
    return errs;
  }

  // Take items from server and show them in html
  function render(items) {
    list.innerHTML = ""; //list starts fresh everytime
    if (!items || !items.length) {
      list.innerHTML = "<li>No sightings yet.</li>";
      return; //checks if there are items yet
    }
    items.forEach(s => { //for loop to go through items in the array
      const li = document.createElement("li"); //create the li for the item
      li.innerHTML = ` 
        <strong>${esc(s.rangerName)}</strong>
        — ID ${esc(s.rangerID)}
        — ${esc(s.sightingDate)}
        — <em>${esc(s.animal)}</em>
        — ${esc(s.location)}
        — ${esc(s.description)}
        <div class="buttons" style="margin-top:.4rem;">
          <button class="btn-edit" data-id="${s.id}">Edit</button>
          <button class="btn-delete" data-id="${s.id}">Delete</button>
        </div>
      `;
      list.appendChild(li); //add it to the bottom of the list

      //Edit the sighting
      li.querySelector(".btn-edit").addEventListener("click", async () => {
        msg.clearAll();
        const res = await fetch(`${API_BASE}/${s.id}`);
        if (!res.ok) { 
            msg.show(errorBox, "Could not load record."); 
            return; }
        const rec = await res.json();
        setUpdateMode(rec);
        msg.show(savedBox, "Loaded for editing.");
      });

      // Delete the sighting
      li.querySelector(".btn-delete").addEventListener("click", async () => {
        msg.clearAll();
        if (!confirm("Delete this sighting?")) return; //do nothing
        const res = await fetch(`${API_BASE}/${s.id}`, { method: "DELETE" });
        if (!res.ok) { 
            msg.show(errorBox, "Delete failed."); 
            return; }
        msg.show(savedBox, "Deleted.");
        await loadAll();
        setCreateMode();
      });
    });
  }

  // Networking
  async function loadAll() {
    msg.clearAll();
    const res = await fetch(API_BASE);
    if (!res.ok) { 
        msg.show(errorBox, "Could not load from server."); 
        return; }
    render(await res.json());
  }

  // Save or Update the sighting logic
  async function saveOrUpdate() {
    msg.clearAll(); //clear old messages
    const payload = collect(); //grab all current values
    const errs = validate(payload); //validation
    if (errs.length) { 
        msg.show(errorBox, errs.join(" ")); 
        return; }

    let res;
    if (mode === "create" || !idHidden.value) {
    //create
      res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
    //update
      res = await fetch(`${API_BASE}/${idHidden.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
    //did it save ok
    if (!res.ok) { 
        msg.show(errorBox, "Save failed."); 
        return; }

    //refresh list
    await loadAll();

    //sucess message
    msg.show(savedBox, mode === "create" ? "Created." : "Updated.");
    setCreateMode();
  }

  // events
  saveBtn.addEventListener("click", saveOrUpdate);
  cancelBtn.addEventListener("click", setCreateMode);

  // RESET DB button
  if (resetDbBtn) {
        resetDbBtn.addEventListener("click", async () => {
        msg.clearAll();
        if (!confirm("Reset the database?")) return;
        const res = await fetch('/api/reset', { method: 'POST' });
        if (!res.ok) { 
            msg.show(errorBox, "Reset failed."); 
            return; }
        await loadAll();
        setCreateMode();
        msg.show(savedBox, "Database reset.");
    });
  }

  // initalization - enter create mode and load all sightings
  setCreateMode();
  loadAll();

  // so the user entering text can't break the html
  function esc(str) {
    return String(str ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
});
