import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Next from './next';

const sampleLessonData = [
  { title: 'Lesson 1' },
  { title: 'Lesson 2' },
  { title: 'Lesson 3' },
];

describe('Next component', () => {
  test('renders "Next Lesson" button when there are more lessons', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Next lesson={sampleLessonData} lessonId="1" />
      </BrowserRouter>
    );
    const nextLessonButton = getByText('Next Lesson');
    expect(nextLessonButton).toBeInTheDocument();
  });

  test('renders "Forum" button when on the last lesson', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Next lesson={sampleLessonData} lessonId="3" />
      </BrowserRouter>
    );
    const forumButton = getByText('Forum');
    expect(forumButton).toBeInTheDocument();
  });
});
