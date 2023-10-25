import React from 'react';

const Section = (props) => {
  return (
    <div>
        <h2>Section is present</h2>
        {props.lessons.map((lesson) => {
            return (
                <div key={lesson.id}>
                    <p>Concept: {lesson.concept1}</p>
                    <p>Question: {lesson.question1}</p>
                    <p>Answer 1: {lesson.wrong_answer1A}</p>
                    <p>Answer 2: {lesson.wrong_answer1B}</p>
                    <p>Answer 3: {lesson.wrong_answer1C}</p>
                    <p>Answer 4: {lesson.correct_answer1}</p>
                    <p>Feedback if Wrong: {lesson.incorrect_feedback1}</p>
                    <p>Feedback if Right: {lesson.correct_feedback1}</p>
                </div>
            )
        })} 
    </div>
  );
};

export default Section;