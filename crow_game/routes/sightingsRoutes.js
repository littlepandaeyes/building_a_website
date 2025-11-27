
/*Name: Sarah-Anne Green
Assignment 4 - Javascript API Server 
August 10/2025
        
Objective: To use the form from Assignment 3 and transform it into an
interactive web application by connecting it to a server API. Using
CRUD operations, and fetch(), users can add, view, update, and remove 
entries from a server-based database.
_______________________________________________________________________*/

const express = require('express');
const router = express.Router();
const {
    get, 
    getWithParams,
    post,
    put,
    patch,
    del
} = require('../controllers/sightingsController');

// get req with query request
router.get('/', get);  //is now a named function instead of an anonymous function 

// get with parameters request
router.get('/:id', getWithParams);

//can be route file for post
router.post('/', post);

//need to know what ID to modify
router.patch('/:id', patch);
router.put('/:id', put);
router.delete('/:id', del);

module.exports = router;











//Week 10 code not refactored, was other ways to do query's

// const id = req.query.id;
// const name = req.query.name;
// const role = req.query.role;



//get req with parameters /: = parameter

// app.get('/heroes', (req, res)=>{
//     const {id} = req.query;
//     if(id){
//     let heroFound = undefined;
//     heroes.forEach(hero => {
//         if(hero.id == id){
//             heroFound = hero;
//         }
        
//     });
//     res.status(200).send(heroFound);
//     }
//     else{
//         res.status(200).send(heroes);
//     };
// });

// app.get('/heroes', (req, res)=>{
//     const{id, name, role} = req.query;
//     console.log(req.query);
//     console.log('id', id);
//     console.log('name',name);
//     console.log('role', role);
//     res.status(200).send(heroes);
// });




//used for individual updates per page - inefficient
// app.get('/', (req, res)=>{
//     // res.status(200).send('Hello from the Server, using NodeMon');
//     // res.status(200).sendFile(__dirname, '\\index.html'); -- only good for windows
//     res.status(200).sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/styles.css', (req, res)=>{
//     res.status(200).sendFile(path.join(__dirname, 'styles.css'));
// });