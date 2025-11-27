
/*Name: Sarah-Anne Green
Assignment 4 - Javascript API Server 
August 10/2025
        
Objective: To use the form from Assignment 3 and transform it into an
interactive web application by connecting it to a server API. Using
CRUD operations, and fetch(), users can add, view, update, and remove 
entries from a server-based database.
_______________________________________________________________________*/


// controllers/sightingsControllers.js
const { Sighting: Item, Sightings: items } = require('../db/sightings');
const dataString = 'Sighting';

// get req with query function
function get(req, res){
    const {id} = req.query;
    if(id){
        const item = items.find(i=> i.id == id); // arrow function with implicit return
        if(item) {
            res.status(200).send(item);
        }else{
            res.status(400).send('The specific ' + dataString + ' you wanted with ' + id + ' was not found');
        }
    }else{
        res.status(200).send(items);
    }
};

// get with parameters function
function getWithParams(req, res){
    console.log(req.params);
    const {id} = req.params;
    if(id){
        const item = items.find(i => i.id == id);
        if (item){
            res.status(200).send(item);
        } else{
            res.status(400).send(dataString + ' with id = ' + id + ' not found');
        }
    }else{
        res.status(200).send(items);
    }
};

// POST - add content
// Validation assumes most of it done on client side
// Payload in the body of the req
function post(req, res){
    const item = new Item(req.body);
    // ensure an id exists if model didn't set one
    if(!item.id) item.id = Date.now().toString();
    items.push(item);
    res.status(201).send(item);
}

// PUT - replace something
function put(req, res){
    const {id} = req.params;
    if (id){
        const index = items.findIndex(i => i.id == id);
        if (index != -1){
            const item = new Item(req.body);
            // preserve the original id from the URL
            item.id = id;
            items.splice(index, 1, item);
            res.status(200).send(item);
        }else{
            res.status(400).send(dataString + ' not found');
        }
    }else{
        res.status(400).send('ID is missing...');
        res.status(404).send('Unknown Error');
    }
}

// PATCH - edit something
function patch(req, res){
    const {id} = req.params;
    if(id){
        const item = items.find(i => i.id == id);
        if(item) {
            Object.keys(req.body).forEach(key =>{ // object passed as an argument will return an array of strings
                item[key] = req.body[key];
            })
            res.status(200).send(item); // you have to send something back or server just makes you wait forever
        }else{
            res.status(400).send(dataString + ' not found');
        }
    }else{
        res.status(400).send('ID is missing...');
        res.status(404).send('Unknown Error');
    }
}

// DELETE - remove content
function del(req, res){
    const { id } = req.params;
    if(id) {
        const index = items.findIndex(i => i.id == id); 
        if(index != -1){
            const removed = items.splice(index, 1); // remove or replace (index, optional # of elements to remove)
            res.status(200).send(removed[0]);
        }else{
            res.status(400).send(dataString + ' not found');
        }
    }else{
        res.status(400).send('ID is missing...');
    }
}

module.exports = {
    get, getWithParams,
    put,
    patch,
    post,
    del
};
