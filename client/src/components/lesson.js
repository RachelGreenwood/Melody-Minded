import React from 'react';
import Header from './header.js';
import Section from './section.js';
import Next from './next.js';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Shows the full lesson
const Lesson = () => {
    const [lessons, setLessons] = useState([]);
    const [lessons_new, setLessons_New] = useState([]);
    // Chooses an individual lesson to show based on id
    const { lessonId } = useParams();
    // const lesson = lessons[lessonId];
    const lesson = lessons_new[lessonId];
    console.log(lesson);
    // console.log(newLessonId);

  const loadLessons_New = () => {
    fetch(`/lessons_new/${lessonId}`)
      .then((response) => response.json())
      .then((lessons_new) => {
        setLessons_New(lessons_new);
      });
  }

    // Loads lesson data from lessons table
    const loadLessons = () => {
        fetch("/lessons")
            .then((response) => response.json())
            .then((lessons) => {
                setLessons(lessons);
            });
    }

    useEffect(() => {
        loadLessons();
        loadLessons_New();
    }, [lessonId]);

    return (
        <div>
            <h2>Lesson is present</h2>
            <Header lesson={lessons_new} />
            <Section lesson={lessons_new[0]} />
            <Section lesson={lessons_new[1]} />
            <Next />
        </div>
    );
};

export default Lesson;