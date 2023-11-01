import React, { useState, useEffect } from 'react';

// Shows each section of a lesson: a concept, quiz question, and feedback
const Section = (props) => {
  const { lesson } = props;
  // Logs if a button has been clicked (to update color)
  const [clicked, setClicked] = useState(false);
  // Holds all quiz questions for the section
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

  // Fetches text-to-speech audio data from the server and sets text to concept, question, and all answers
  const fetchAudio = async () => {
    try {
        const response = await fetch(`/api?text=${lesson.concept}. ${lesson.question}. ${allOptions}.`);
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
        props.lesson.wrong_answerA,
        props.lesson.wrong_answerB,
        props.lesson.wrong_answerC
      ];
      finalOptions.splice(getRandomNum(), 0, props.lesson.correct_answer);
      setAllOptions(finalOptions);
    }
  }, [props.lesson]);

  // If answer is already selected, user cannot select another answer
  const handleBtnClick = e => {
    // If unannswered, set it to answered
    if (!answered) {
      setAnswered(true);
      setSelectedAns(e.target.textContent)
      // If user selects correct answer, log as correct to display appropriate feedback
      if (e.target.textContent === props.lesson.correct_answer) {
        setIsCorrect(true);
      }
    }
  }


  return (
    <div>
      <h2>Section is present</h2>
      <button className={`button ${clicked ? 'selected' : ''}`} onClick={fetchAudio}>Click here to have this part read to you!</button>
      {props.lesson ? (
        <>
          <p>{props.lesson.concept}</p>
          <p>{props.lesson.question}</p>
          {/* Display all answers */}
          {allOptions.map((option, index) => {
            return <button className={`button ${selectedAns === option ? 'selected' : ''}`} key={index} onClick={handleBtnClick}>{option}</button>
      })}
      </>
    ) : (
      <p>Loading...</p>
    )}
    {/* Shows feedback when answer is selectted */}
    {answered && (
      <div className={`feedback`}>
        {isCorrect ? props.lesson.correct_feedback : props.lesson.incorrect_feedback}
      </div>
    )}
    </div>
  );
};

export default Section;