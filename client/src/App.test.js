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