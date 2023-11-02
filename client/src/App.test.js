import { render } from '@testing-library/react';
import App from './App';
import Lesson from './components/lesson.js';
import Section from './components/section.js';

test('App component renders', () => {
  render(<App />);
});

test('Lesson component renders', () => {
  render(<Lesson />);
});

test('Section component renders', () => {
  render(<Section />);
});

test('The concept and question are displayed', () => {
  const lesson = {
    concept: 'concept 1',
    question: 'Q1',
  };

  const { getByText } = render(<Section lesson={lesson} />);
  const concept = getByText('concept 1');
  const question = getByText('Q1');
  expect(concept).toBeInTheDocument();
  expect(question).toBeInTheDocument();
});

test('Choosing the correct answer gives the appropriate feedback', () => {
  const { getByText } = render(
    <Section
      lesson={{
        concept: 'concept one',
        question: 'question one',
        correct_answer: 'correct',
        wrong_answerA: 'wrong once',
        wrong_answerB: 'wrong twice',
        wrong_answerC: 'wrong thrice',
        correct_feedback: 'nice work',
        incorrect_feedback: 'that is not correct'
      }}
      />
    );

  const button = getByText('correct');
  button.click();
  expect(button).toHaveClass('selected')
  expect(button.parentElement.querySelector('.feedback')).toHaveTextContent('nice work')
});

test('Choosing an incorrect answer gives the appropriate feedback', () => {
  const { getByText } = render(
    <Section
      lesson={{
        concept: 'concept two',
        question: 'question two',
        correct_answer: 'right again',
        wrong_answerA: 'wrong again',
        wrong_answerB: 'wrong again II',
        wrong_answerC: 'NULL',
        correct_feedback: 'excellent',
        incorrect_feedback: 'that is mahogany!'
      }}
      />
    );

  const button = getByText('wrong again II');
  button.click();
  expect(button).toHaveClass('selected')
  expect(button.parentElement.querySelector('.feedback')).toHaveTextContent('that is mahogany!')
});