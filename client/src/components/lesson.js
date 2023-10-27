import React from 'react';
import Header from './header.js';
import Listen from './listen.js';
import Section from './section.js';
import Next from './next.js';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Lesson = () => {
    const [lessons, setLessons] = useState([]);
    const { lessonId } = useParams();
    const lesson = lessons[lessonId];

    const loadLessons = () => {
        fetch("/lessons")
            .then((response) => response.json())
            .then((lessons) => {
                setLessons(lessons);
                console.log(lessons);
            });
    }

    const fetchAudio = async (textContent) => {
        try {
            const response = await fetch(`/api?text=${textContent}`);
            const audioBlob = await response.blob();
            const audioData = URL.createObjectURL(audioBlob);
            playAudio(audioData);
        } catch (error) {
            console.error("Error fetching audio:", error);
        }
    }
    
    function playAudio(audioURL) {
        const audioElement = new Audio(audioURL);
        audioElement.play();
    }

    const collectTextContent = (lesson) => {
        let textContent = lesson ? lesson.title : "undefined"; // Start with the lesson title
        console.log(textContent)
        if (lesson) {
            for (let section in lesson) {
                textContent += ". " + lesson[section];
            };
        }
        return textContent;
    }

    const handleReadLesson = () => {
        const textContent = collectTextContent(lesson);
        console.log(textContent)
        fetchAudio(textContent);
    }

    useEffect(() => {
        loadLessons();
    }, []);
    
    return (
        <div>
            <h2>Lesson is present</h2>
            <Header lessons={lessons} />
            {/* <Listen /> */}
            {/* <button onClick={fetchAudio}>Click here to have the lesson read to you!</button> */}
            <button onClick={handleReadLesson}>Click here to have the lesson read to you!</button>
            <Section lessons={lessons} />
            <Next />
        </div>
    );
};

export default Lesson;