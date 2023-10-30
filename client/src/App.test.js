import { render } from '@testing-library/react';
import App from './App';
import Lesson from './components/lesson.js';

test('renders App component', () => {
  render(<App />);
});

test('renders Lesson component', () => {
  render(<Lesson />);
});