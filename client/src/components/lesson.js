import React from 'react';
import Header from './header.js';
import Section from './section.js';
import Next from './next.js';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Lesson = () => {
    const [lessons, setLessons] = useState([]);
    // Chooses an individual lesson to show based on id
    const { lessonId } = useParams();
    const lesson = lessons[lessonId];

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
    }, []);

    return (
        <div>
            <h2>Lesson is present</h2>
            <Header lessons={lessons} />
            <Section lesson={lesson} />
            <Next />
        </div>
    );
};

export default Lesson;