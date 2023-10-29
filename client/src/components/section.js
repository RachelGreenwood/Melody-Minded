import React from 'react';

const Section = (props) => {
  // Gets random number
  const getRandomNum = () => {
    return Math.floor(Math.random() * (allOptions.length + 1));
  }

  return (
    <div>
        <h2>Section is present</h2>
        {props.lessons.map((lesson) => {
            return (
                <div key={lesson.id}>
                    <p>Concept: {lesson.concept1}</p>
                    <p>Question: {lesson.question1}</p>
                    <button>Answer 1: {lesson.wrong_answer1A}</button>
                    <button>Answer 2: {lesson.wrong_answer1B}</button>
                    <button>Answer 3: {lesson.wrong_answer1C}</button>
                    <button>Answer 4: {lesson.correct_answer1}</button>
                    <p>Feedback if Wrong: {lesson.incorrect_feedback1}</p>
                    <p>Feedback if Right: {lesson.correct_feedback1}</p>
                </div>
            )
        })} 
    </div>
  );
};

export default Section;