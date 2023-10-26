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
    const text = "Hello, world";

    const loadLessons = () => {
        fetch("/lessons")
            .then((response) => response.json())
            .then((lessons) => {
                setLessons(lessons);
                console.log(lessons);
            });
    }

    const fetchAudio = async () => {
        try {
            const response = await fetch(`/api?text=${text}`);
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

    useEffect(() => {
        loadLessons();
    }, []);

    // useEffect(() => {
    //     const handleClick = () => {
    //         fetchAudio();
    //     };
    //     window.addEventListener("click", handleClick);
    //         return () => {
    //     window.removeEventListener("click", handleClick);
    //     };
    // }, []);
    
    

    return (
        <div>
            <h2>Lesson is present</h2>
            <Header lessons={lessons} />
            <Listen />
            <Section lessons={lessons} />
            <Next />
        </div>
    );
};

export default Lesson;