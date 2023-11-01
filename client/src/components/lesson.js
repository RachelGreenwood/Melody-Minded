import React from 'react';
import Header from './header.js';
import Section from './section.js';
import Next from './next.js';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Shows the full lesson
const Lesson = () => {
    const [lessons_new, setLessons_New] = useState([]);
    // Chooses an individual lesson to show based on id
    const { lessonId } = useParams();

  const loadLessons_New = () => {
    fetch(`/lessons_new/${lessonId}`)
      .then((response) => response.json())
      .then((lessons_new) => {
        setLessons_New(lessons_new);
      });
  }

    useEffect(() => {
        loadLessons_New();
    }, [lessonId]);

    return (
        <div>
            <h2>Lesson is present</h2>
            <Header lesson={lessons_new} />
            {lessons_new.map((lesson, index) => {
                return (
                    <div key={index}>
                        <Section lesson={lesson} />
                    </div>
                )
            })}
            <Next />
        </div>
    );
};

export default Lesson;