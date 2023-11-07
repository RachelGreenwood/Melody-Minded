const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');
const { Buffer } = require('node:buffer');

const app = express();
// Sets up production
const REACT_BUILD_DIR = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(REACT_BUILD_DIR));

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// Fetches data from text-to-speech API
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

app.get('/', (req, res) => {
  res.json({ message: 'Hello from My template ExpressJS' });
  res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
});

// Gets data from users table
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

// Adds user to users table
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

// Gets data from comments table
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

// Adds comment to comments table
app.post("/comments", async (req, res) => {
  try {
    console.log("In the server", req.body);
    const { poster, comment, avatar } = req.body;
    const datetime = new Date();
    const result = await db.query(
      "INSERT INTO comments (poster, datetime, comment, avatar) VALUES ($1, $2, $3, $4) RETURNING *",
        [poster, datetime, comment, avatar]
    );
    let dbResponse = result.rows[0];
    console.log(dbResponse);
    res.json(dbResponse);
  } catch (err) {
    console.log(err);
    res.status(400).json({err});
  }
});

// Edits a comment
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

// Deletes a comment
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

// Gets data from lessons table
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

// Fetches lessons data from lessons_new table
app.get('/lessons_new', async (req, res) => {
  try {
    const { rows: lessons } = await db.query(`SELECT
    lessons_new.id,
    title,
    concept,
    questions.question,
    questions."wrong_answerA",
    questions."wrong_answerB",
    questions."wrong_answerC",
    questions.correct_answer,
    questions.incorrect_feedback,
    questions.correct_feedback
  FROM
    questions
  INNER JOIN
    concepts
  ON
    questions.concept_id = concepts.id
  INNER JOIN
    lessons_new
  ON
    concepts.lesson_id = lessons_new.id
  ORDER BY title, concept ASC`);
  console.log("In the server, ", lessons);
  res.send(lessons);
  } catch(err) {
    console.log(err);
    return res.status(400).json({err});
  }
});

// Fetches a particular lesson from the lessons_new table
app.get('/lessons_new/:lessonId', async (req, res) => {
  try {
    const { lessonId } = req.params;
    console.log("lesson id: ", lessonId);
    const { rows: lessons } = await db.query(`SELECT
    lessons_new.id,
    title,
    concept,
    questions.question,
    questions."wrong_answerA",
    questions."wrong_answerB",
    questions."wrong_answerC",
    questions.correct_answer,
    questions.incorrect_feedback,
    questions.correct_feedback
  FROM
    questions
  INNER JOIN
    concepts
  ON
    questions.concept_id = concepts.id
  INNER JOIN
    lessons_new
  ON
    concepts.lesson_id = lessons_new.id
  WHERE
    lessons_new.id = $1`, [lessonId]);
  console.log("In the server, ", lessons);
  res.send(lessons);
  } catch(err) {
    console.log(err);
    return res.status(400).json({err});
  }
});

// Shows server is running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
