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

    // Fetches the needed lesson from /lessons_new table
  const loadLessons_New = () => {
    fetch(`/lessons_new/${lessonId}`)
      .then((response) => response.json())
      .then((lessons_new) => {
        setLessons_New(lessons_new);
        console.log(lessons_new)
      });
  }

    useEffect(() => {
        loadLessons_New();
    }, [lessonId]);

    return (
        <div>
            <h2>Lesson is present</h2>
            <header>
                <Header lesson={lessons_new} />
            </header>
            {/* Returns as many sections as exist; flexible to different lesson lengths */}
            <main>
                {lessons_new.map((lesson, index) => {
                    return (
                        <section key={index}>
                            <Section lesson={lesson} />
                        </section>
                    )
                })}
            </main>
            <Next />
        </div>
    );
};

export default Lesson;