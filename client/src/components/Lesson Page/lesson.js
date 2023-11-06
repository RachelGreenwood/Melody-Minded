import React from 'react';
import Header from './header.js';
import Section from './section.js';
import Next from './next.js';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './lesson.css';

// Shows the full lesson
const Lesson = () => {
    // Chooses an individual lesson to show based on id
    const { lessonId } = useParams();
    // Holds the lesson matching this id
    const [section, setSection] = useState([]);
    // Holds data of all lessons (for Next component)
    const [lesson, setLesson] = useState([]);

// Fetches the needed lesson from /lessons_new table
  const loadLessons_New = () => {
    fetch(`/lessons_new/${lessonId}`)
      .then((response) => response.json())
      .then((lessons_new) => {
        setSection(lessons_new);
      });
  }

  // Fetches all lessons from /lessons_new table (for Next component)
  const loadAllLessons= () => {
    fetch(`/lessons_new/`)
      .then((response) => response.json())
      .then((lessons_new) => {
        setLesson(lessons_new)
      });
  }

    useEffect(() => {
        loadLessons_New();
        loadAllLessons();
    }, [lessonId]);

    return (
        <div>
            <header>
                <Header lesson={section} />
            </header>
            {/* Returns as many sections as exist; flexible to different lesson lengths */}
            <main>
                {section.map((lesson, index) => {
                    return (
                        <section className='section' key={index}>
                            <Section lesson={lesson} />
                        </section>
                    )
                })}
            </main>
            {/* Button to next lesson */}
            <Next lessonId={lessonId} lesson={lesson} />
        </div>
    );
};

export default Lesson;