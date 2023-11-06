import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import Lesson from './components/Lesson Page/lesson.js';
import Section from './components/Lesson Page/section.js';
import { BrowserRouter } from 'react-router-dom';

describe("Components render", () => {
  test('App component renders', () => {
    render(<App />);
  });

  test('Lesson component renders', () => {
    <BrowserRouter>
        <Lesson />
    </BrowserRouter>
  });

  test('Section component renders', () => {
    const lesson = { concept: 'concept one', question: 'question one' };
    render(<Section lesson={lesson} />);
  });
});

describe("Lesson page displays elements", () => {
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
})