import React, { useState, useEffect } from 'react';

const Section = (props) => {
  console.log(props.lesson);
  const [allOptions, setAllOptions] = useState([]);
  // Gets random number
  const getRandomNum = () => {
    return Math.floor(Math.random() * (allOptions.length + 1));
  }

  // Puts the correct answer at a random index among the wrong answers
  useEffect(() => {
    if (props.lesson) {
      const finalOptions = [
        props.lesson.wrong_answer1A,
        props.lesson.wrong_answer1B,
        props.lesson.wrong_answer1C
      ];
      finalOptions.splice(getRandomNum(), 0, props.lesson.correct_answer1);
      setAllOptions(finalOptions);
    }
  }, [props.lesson]);

  return (
    <div>
      <h2>Section is present</h2>
      {/* Display all answers */}
      {props.lesson ? (
        <>
          <p>Title: {props.lesson.title}</p>
          {allOptions.map((option, index) => {
            return <button key={index}>{option}</button>
      })}
      </>
    ) : (
      <p>Loading...</p>
    )}
    </div>
  );
};

export default Section;