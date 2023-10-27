const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');
const { Buffer } = require('buffer/');

const app = express();
// Sets up production
const REACT_BUILD_DIR = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(REACT_BUILD_DIR));

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

app.get("/api", async (req, res) => {
  const text = req.query.text;
  const apiKey = process.env.apiKey;
  const audioFormat = "MP3";
  const audioQuality = "44khz_16bit_mono";
  const url = `http://api.voicerss.org/?key=${apiKey}&hl=en-us&src=${text}&f=${audioFormat}&c=MP3&r=${audioQuality}`;
  try {
    const response = await fetch(url);
    const audioData = await response.arrayBuffer();
    res.send(Buffer.from(audioData));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// creates an endpoint for the route /api
app.get('/', (req, res) => {
  res.json({ message: 'Hello from My template ExpressJS' });
  res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
});

app.get('/users', async (req, res) => {
  try {
    const { rows: users } = await db.query('SELECT * FROM users');
    console.log("Get in the server", users);
    res.send(users);
  } catch(err) {
    console.log(err);
    return res.status(400).json({err});
  }
});

app.post("/users", async (req, res) => {
  try {
    console.log("In the server", req.body);
    const { username, email, password, photo, lessons_completed } = req.body;
    const result = await db.query(
      "INSERT INTO users (username, email, password, photo, lessons_completed) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [username, email, password, photo, lessons_completed]
    );
    let dbResponse = result.rows[0];
    console.log(dbResponse);
    res.json(dbResponse);
  } catch (err) {
    console.log(err);
    res.status(400).json({err});
  }
});

app.get('/comments', async (req, res) => {
  try {
    const { rows: comments } = await db.query('SELECT * FROM comments');
    console.log("Get in the server", comments);
    res.send(comments);
  } catch(err) {
    console.log(err);
    return res.status(400).json({err});
  }
});

app.post("/comments", async (req, res) => {
  try {
    console.log("In the server", req.body);
    const { poster, datetime, comment } = req.body;
    const result = await db.query(
      "INSERT INTO comments (poster, datetime, comment) VALUES ($1, $2, $3) RETURNING *",
        [poster, datetime, comment]
    );
    let dbResponse = result.rows[0];
    console.log(dbResponse);
    res.json(dbResponse);
  } catch (err) {
    console.log(err);
    res.status(400).json({err});
  }
});

app.put("/comments/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    const { poster, datetime, comment } = req.body;
    const result = await db.query(
      "UPDATE comments SET poster = $1, datetime = $2, comment = $3 WHERE id = $4 RETURNING *",
      [poster, datetime, comment, commentId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }
    let updatedComment = result.rows[0];
    console.log(updatedComment);
    res.json(updatedComment);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
})

app.delete("/comments/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    const deleteOperation = await db.query("DELETE FROM comments WHERE id=$1", [commentId]);
    console.log(deleteOperation);
    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).json({e});
  }
});

app.get('/lessons', async (req, res) => {
  try {
    const { rows: lessons } = await db.query('SELECT * FROM lessons');
    console.log("Get in the server", lessons);
    res.send(lessons);
  } catch(err) {
    console.log(err);
    return res.status(400).json({err});
  }
});

// create the get request
// app.get('/api/students', cors(), async (req, res) => {
//   // const STUDENTS = [

//   //     { id: 1, firstName: 'Lisa', lastName: 'Lee' },
//   //     { id: 2, firstName: 'Eileen', lastName: 'Long' },
//   //     { id: 3, firstName: 'Fariba', lastName: 'Dadko' },
//   //     { id: 4, firstName: 'Cristina', lastName: 'Rodriguez' },
//   //     { id: 5, firstName: 'Andrea', lastName: 'Trejo' },
//   // ];
//   // res.json(STUDENTS);
//   try {
//     const { rows: students } = await db.query('SELECT * FROM students');
//     res.send(students);
//   } catch (e) {
//     return res.status(400).json({ e });
//   }
// });

// create the POST request
// app.post('/api/students', cors(), async (req, res) => {
//   const newUser = {
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//   };
//   console.log([newUser.firstname, newUser.lastname]);
//   const result = await db.query(
//     'INSERT INTO students(firstname, lastname) VALUES($1, $2) RETURNING *',
//     [newUser.firstname, newUser.lastname],
//   );
//   console.log(result.rows[0]);
//   res.json(result.rows[0]);
// });

// //A put request - Update a student 
// app.put('/api/students/:studentId', cors(), async (req, res) =>{
//   console.log(req.params);
//   //This will be the id that I want to find in the DB - the student to be updated
//   const studentId = req.params.studentId
//   const updatedStudent = { id: req.body.id, firstname: req.body.firstname, lastname: req.body.lastname}
//   console.log("In the server from the url - the student id", studentId);
//   console.log("In the server, from the react - the student to be edited", updatedStudent);
//   // UPDATE students SET lastname = "something" WHERE id="16";
//   const query = `UPDATE students SET lastname=$1, firstname=$2 WHERE id=${studentId} RETURNING *`;
//   const values = [updatedStudent.lastname, updatedStudent.firstname];
//   try {
//     const updated = await db.query(query, values);
//     console.log(updated.rows[0]);
//     res.send(updated.rows[0]);

//   }catch(e){
//     console.log(e);
//     return res.status(400).json({e})
//   }
// })

// // delete request
// app.delete('/api/students/:studentId', cors(), async (req, res) =>{
//   const studentId = req.params.studentId;
//   //console.log("From the delete request-url", req.params);
//   await db.query('DELETE FROM students WHERE id=$1', [studentId]);
//   res.status(200).end();

// });


// create the POST request for a new user
// CREATE TABLE users (
// 	ID SERIAL PRIMARY KEY,
// 	lastname varchar(255),
// 	firstname varchar(255),
//     email varchar(255), 
//     sub varchar(255));
// app.post('/api/me', cors(), async (req, res) => {
//   const newUser = {
//     lastname: req.body.family_name,
//     firstname: req.body.given_name,
//     email: req.body.email,
//     sub: req.body.sub

//   }
//   //console.log(newUser);

//   const queryEmail = 'SELECT * FROM users WHERE email=$1 LIMIT 1';
//   const valuesEmail = [newUser.email]
//   const resultsEmail = await db.query(queryEmail, valuesEmail);
//   if(resultsEmail.rows[0]){
//     console.log(`Thank you ${resultsEmail.rows[0].firstname} for comming back`)
//   } else{
//   const query = 'INSERT INTO users(lastname, firstname, email, sub) VALUES($1, $2, $3, $4) RETURNING *'
//   const values = [newUser.lastname, newUser.firstname, newUser.email, newUser.sub]
//   const result = await db.query(query, values);
//   console.log(result.rows[0]);

//   }

// });



// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
