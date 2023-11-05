import React, { useState, useEffect } from 'react';

// Shows each section of a lesson: a concept, quiz question, and feedback
const Section = (props) => {
  const { lesson } = props;
  // Holds all quiz questions for the section
  const [allOptions, setAllOptions] = useState([]);
  // Logs if user selected an answer or not
  const [answered, setAnswered] = useState(false);
  // Logs the chosen answer
  const [selectedAns, setSelectedAns] = useState(null)
  // Logs if chosen answer is correct
  const [isCorrect, setIsCorrect] = useState(null);
  // Gets random number using Fisher-Yates algorithm
  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
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
    } catch (error) {
        console.error("Error fetching audio:", error);
    }
}

// Turns URL into audio and plays all the text on the page
function playAudio(audioURL) {
  const audioElement = new Audio(audioURL);
  audioElement.play();
}

  // Puts the correct answer at a random index among the wrong answers using callback function
  useEffect(() => {
    if (lesson) {
      const finalOptions = [
        lesson.wrong_answerA,
        lesson.wrong_answerB,
        lesson.wrong_answerC,
        lesson.correct_answer
      ];
      setAllOptions(shuffleArray(finalOptions));
    }
    setAnswered(false);
    setSelectedAns(null);
    setIsCorrect(null);
  }, [lesson]);

  // If answer is already selected, user cannot select another answer
  const handleBtnClick = e => {
    // If unannswered, set it to answered
    if (!answered) {
      setAnswered(true);
      setSelectedAns(e.target.textContent)
      // If user selects correct answer, log as correct to display appropriate feedback
      if (e.target.textContent === lesson.correct_answer) {
        setIsCorrect(true);
      }
    }
  }

  const bodyWithLineBreaks = lesson.concept.replace(/\\n/g, '\n');
  const paragraphs = bodyWithLineBreaks.split('\n');

  return (
    <div className='section-container'>
        <button className='audio' onClick={fetchAudio}>Click here to have this part read to you!</button>
        {lesson ? (
          <>
            <div className='main-content'>
            {paragraphs.map((paragraph, index) => (
              <p dangerouslySetInnerHTML={{ __html: paragraph }} key={index}></p>
            ))}
              <p dangerouslySetInnerHTML={{ __html: lesson.question }}></p>
            </div>
            <div className='answer-buttons'>
              {/* Display all answers */}
              {allOptions.map((option, index) => {
                // Tests option is not null to take out nonexistent answers; flexible so questions can have 2-4 answers
                if (option !== null) {
                  return <button className={`answer-buttons ${selectedAns === option ? 'selected' : ''}`} key={index} onClick={handleBtnClick}>{option}</button>
                }
            })}
            </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    {/* Shows feedback when answer is selected */}
      <div className='feedback-grid'>
        {answered && (
          <p className={`feedback`}>
            {isCorrect ? lesson.correct_feedback : lesson.incorrect_feedback}
          </p>
        )}
      </div>
    </div>
  );  
};

export default Section;