import React from 'react';
import Header from './header.js';
import Listen from './listen.js';
import Section from './section.js';
import Next from './next.js';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Lesson = () => {
    const [lessons, setLessons] = useState([]);
    // Chooses an individual lesson to show based on id
    const { lessonId } = useParams();
    const lesson = lessons[lessonId];
    // Logs if button is clicked or not (if true, changes color)
    const [clicked, setClicked] = useState(false);

    // Loads lesson data from lessons table
    const loadLessons = () => {
        fetch("/lessons")
            .then((response) => response.json())
            .then((lessons) => {
                setLessons(lessons);
            });
    }

    // Fetches audio from server
    const fetchAudio = async (textContent) => {
        try {
            const response = await fetch(`/api?text=${textContent}`);
            // Turns server response into a blob, a file-like object of raw data
            const audioBlob = await response.blob();
            // Turns the blob into a URL
            const audioData = URL.createObjectURL(audioBlob);
            playAudio(audioData);
        } catch (error) {
            console.error("Error fetching audio:", error);
        }
    }
    
    // Turns URL into audio and plays all the text on the page
    function playAudio(audioURL) {
        const audioElement = new Audio(audioURL);
        audioElement.play();
    }

    // Gets text from all Section components on the page
    const collectTextContent = (lesson) => {
        let textContent = lesson ? lesson.title : "undefined";
        console.log(textContent)
        if (lesson) {
            for (let section in lesson) {
                textContent += ". " + lesson[section];
            };
        }
        return textContent;
    }

    // Sends text on the page to API fetch to turn to audio
    const handleReadLesson = () => {
        const textContent = collectTextContent(lesson);
        fetchAudio(textContent);
        setClicked(true)
    }

    useEffect(() => {
        loadLessons();
    }, []);

    return (
        <div>
            <h2>Lesson is present</h2>
            <Header lessons={lessons} />
            {/* May implement the Listen component if current fetch method can't handle all the text on the page */}
            {/* <Listen /> */}
            <button className={`button ${clicked ? 'selected' : ''}`} onClick={handleReadLesson}>Click here to have the lesson read to you!</button>
            <Section lesson={lesson} />
            <Next />
        </div>
    );
};

export default Lesson;