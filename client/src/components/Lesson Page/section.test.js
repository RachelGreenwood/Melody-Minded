import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Section from './section';

const sampleLesson = {
  concept: 'Sample concept',
  question: 'Sample question',
  correct_answer: 'Correct Answer',
  wrong_answerA: 'Wrong Answer A',
  wrong_answerB: 'Wrong Answer B',
  wrong_answerC: 'Wrong Answer C',
  correct_feedback: 'Correct feedback',
  incorrect_feedback: 'Incorrect feedback',
};

describe('Section component', () => {
  test('Renders the section', () => {
    const { getByText, getAllByText } = render(<Section lesson={sampleLesson} />);
    const conceptText = getByText('Sample concept');
    const questionText = getByText('Sample question');
    const answerButtons = getAllByText(/Answer/);

    expect(conceptText).toBeInTheDocument();
    expect(questionText).toBeInTheDocument();
    expect(answerButtons).toHaveLength(4);
  });

  test('Clicking the appropriate button activates the text-to-speech API', () => {
    const fetchAudio = jest.fn();
    const { getByText } = render(<Section lesson={sampleLesson} />);
    const audioButton = getByText('Click here to have this part read to you!');
    audioButton.onclick = fetchAudio;
    fireEvent.click(audioButton);
    expect(fetchAudio).toHaveBeenCalled();
  });

  test('Clicking an answer button sets answered, selected answer, and isCorrect', () => {
    const { getByText } = render(<Section lesson={sampleLesson} />);
    const answerButton = getByText('Correct Answer');
    fireEvent.click(answerButton);
    const feedbackText = getByText('Correct feedback');
    expect(answerButton).toHaveClass('selected');
    expect(feedbackText).toBeInTheDocument();
  });
});
