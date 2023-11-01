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
    concept1: 'first concept',
    question1: 'one question: ?',
  };

  const { getByText } = render(<Section lesson={lesson} />);
  const concept = getByText('first concept');
  const question = getByText('one question: ?');
  expect(concept).toBeInTheDocument();
  expect(question).toBeInTheDocument();
});

test('Choosing the correct answer gives the appropriate feedback', () => {
  const { getByText } = render(
    <Section
      lesson={{
        concept1: 'first concept',
        question1: 'one question: ?',
        correct_answer1: 'correct',
        wrong_answer1A: 'nop',
        wrong_answer1B: 'wrong',
        wrong_answer1C: 'nuh uhh',
        correct_feedback1: 'nice!',
        incorrect_feedback1: 'um...no'
      }}
      />
    );

  const button = getByText('correct');
  button.click();
  expect(button).toHaveClass('selected')
  expect(button.parentElement.querySelector('.feedback')).toHaveTextContent('nice!')
});

test('Choosing an incorrect answer gives the appropriate feedback', () => {
  const { getByText } = render(
    <Section
      lesson={{
        concept1: 'first concept',
        question1: 'one question: ?',
        correct_answer1: 'correct',
        wrong_answer1A: 'nop',
        wrong_answer1B: 'wrong',
        wrong_answer1C: 'nuh uhh',
        correct_feedback1: 'nice!',
        incorrect_feedback1: 'um...no'
      }}
      />
    );

  const button = getByText('nop');
  button.click();
  expect(button).toHaveClass('selected')
  expect(button.parentElement.querySelector('.feedback')).toHaveTextContent('um...no')
});

test('Choosing an incorrect answer gives the appropriate feedback', () => {
  const { getByText } = render(
    <Section
      lesson={{
        concept1: 'first concept',
        question1: 'one question: ?',
        correct_answer1: 'correct',
        wrong_answer1A: 'nop',
        wrong_answer1B: 'wrong',
        wrong_answer1C: 'nuh uhh',
        correct_feedback1: 'nice!',
        incorrect_feedback1: 'um...no'
      }}
      />
    );

  const button = getByText('wrong');
  button.click();
  expect(button).toHaveClass('selected')
  expect(button.parentElement.querySelector('.feedback')).toHaveTextContent('um...no')
});

test('Choosing an incorrect answer gives the appropriate feedback', () => {
  const { getByText } = render(
    <Section
      lesson={{
        concept1: 'first concept',
        question1: 'one question: ?',
        correct_answer1: 'correct',
        wrong_answer1A: 'nop',
        wrong_answer1B: 'wrong',
        wrong_answer1C: 'nuh uhh',
        correct_feedback1: 'nice!',
        incorrect_feedback1: 'um...no'
      }}
      />
    );

  const button = getByText('nuh uhh');
  button.click();
  expect(button).toHaveClass('selected')
  expect(button.parentElement.querySelector('.feedback')).toHaveTextContent('um...no')
});