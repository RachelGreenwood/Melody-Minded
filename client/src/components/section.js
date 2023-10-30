import React, { useState, useEffect } from 'react';

const Section = (props) => {
  const { lesson } = props;
  const [clicked, setClicked] = useState(false);
  const [allOptions, setAllOptions] = useState([]);
  // Logs if user selected an answer or not
  const [answered, setAnswered] = useState(false);
  // Logs the chosen answer
  const [selectedAns, setSelectedAns] = useState(null)
  // Logs if chosen answer is correct
  const [isCorrect, setIsCorrect] = useState(null);
  // Gets random number
  const getRandomNum = () => {
    return Math.floor(Math.random() * (allOptions.length + 1));
  }

  const fetchAudio = async (textContent) => {
    try {
        const response = await fetch(`/api?text=${lesson.concept1}. ${lesson.question1}. ${allOptions}.`);
        // Turns server response into a blob, a file-like object of raw data
        const audioBlob = await response.blob();
        // Turns the blob into a URL
        const audioData = URL.createObjectURL(audioBlob);
        playAudio(audioData);
        setClicked(true);
    } catch (error) {
        console.error("Error fetching audio:", error);
    }
}

// Turns URL into audio and plays all the text on the page
function playAudio(audioURL) {
  const audioElement = new Audio(audioURL);
  audioElement.play();
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

  const handleBtnClick = e => {
    if (!answered) {
      setAnswered(true);
      setSelectedAns(e.target.textContent)
      if (e.target.textContent === props.lesson.correct_answer1) {
        setIsCorrect(true);
      }
    }
  }


  return (
    <div>
      <h2>Section is present</h2>
      <button className={`button ${clicked ? 'selected' : ''}`} onClick={fetchAudio}>Click here to have this part read to you!</button>
      {/* Display all answers */}
      {props.lesson ? (
        <>
          <p>{props.lesson.concept1}</p>
          <p>{props.lesson.question1}</p>
          {allOptions.map((option, index) => {
            return <button className={`button ${selectedAns === option ? 'selected' : ''}`} key={index} onClick={handleBtnClick}>{option}</button>
      })}
      </>
    ) : (
      <p>Loading...</p>
    )}
    {answered && (
      <div className={`feedback`}>
        {isCorrect ? props.lesson.correct_feedback1 : props.lesson.incorrect_feedback1}
      </div>
    )}
    </div>
  );
};

export default Section;