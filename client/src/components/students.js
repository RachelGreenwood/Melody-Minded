import { useState, useEffect } from "react";
import Form from "./form";

function Students(props) {
  let user = props.user;
  // this is my original state with an array of students 
  const [students, setStudents] = useState([]);
  const [comments, setComments] = useState([]);
  const [lessons, setLessons] = useState([]);

  // New State to contro the existing student Id that the user wants to edit
  const [editStudentId, setEditStudentId] = useState(null);

  const loadStudents = () =>{
    // A function to fetch the list of students that will be load anytime that list change
    fetch("/users")
      .then((response) => response.json())
      .then((students) => {
            setStudents(students);
          });
  }

  const loadComments = () =>{
    // A function to fetch the list of students that will be load anytime that list change
    fetch("/comments")
      .then((response) => response.json())
      .then((comments) => {
            setComments(comments);
          });
  }

  useEffect(() => {
    loadStudents();
    loadComments();
  }, []);

  //A function to handle the Delete funtionality
  const onDelete = (student) =>{
    return fetch(`/api/students/${student.id}`, {
      method: "DELETE"
    }).then((response) => {
      //console.log(response);
      if(response.ok){
        loadStudents();
      }
    })
  }

  const addStudent = (newStudent) => {
    //console.log(newStudent);
    //postStudent(newStudent);
    setStudents((students) => [...students, newStudent]);
  };

  //A function to control the update in the parent (student component)

  const updateStudent = (savedStudent) =>{
    console.log("Line 29 savedStudent", savedStudent);
    // This function should update the whole list of students - 
    setStudents((students) => {
      const newArrayStudents = [];
      for(let student of students){
        if(student.id === savedStudent.id){
          newArrayStudents.push(savedStudent);
        } else {
          newArrayStudents.push(student);
        }
      }
      return newArrayStudents;
    })
    // This line is only to close the form;
    setEditStudentId(null);
  }
  
  const onEdit = (student) =>{
    console.log("This is line 26 on student component", student);
    const editingID = student.id;
    console.log("Just the student id", student.id)
    setEditStudentId(editingID);

  }

  return (
    <div className="students">
      <h2> List of Students </h2>
      {students[0].username}
      {comments[0].comment}
      {!user ? (<h4>Please signup to add students to our DB </h4>) : (<Form saveStudent={addStudent} />)}
      
    </div>
  );
}

export default Students;
