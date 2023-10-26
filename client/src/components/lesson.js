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
    const header = lessons.length > 0 ? lessons[lessonId].title : "No header available";
    const concept = lessons.length > 0 ? lessons[lessonId].concept1 : "No concept available";
    const question = lessons.length > 0 ? lessons[lessonId].question1 : "No question available";
    const answer1 = lessons.length > 0 ? lessons[lessonId].wrong_answer1A : "No answer available";
    const answer2 = lessons.length > 0 ? lessons[lessonId].wrong_answer1B : "No answer available";
    const answer3 = lessons.length > 0 ? lessons[lessonId].wrong_answer1C : "No answer available";
    const answer4 = lessons.length > 0 ? lessons[lessonId].correct_answer1 : "No answer available";
    const Wfeedback = lessons.length > 0 ? lessons[lessonId].incorrect_feedback1 : "No feedback available";
    const Cfeedback = lessons.length > 0 ? lessons[lessonId].correct_feedback1 : "No feedback available";

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
            const response = await fetch(`/api?text=${header}. ${concept}. ${question}. ${answer1}. ${answer2}. ${answer3}. ${answer4}. ${Wfeedback}. ${Cfeedback}`);
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
    
    return (
        <div>
            <h2>Lesson is present</h2>
            <Header lessons={lessons} />
            {/* <Listen /> */}
            <button onClick={fetchAudio}>Click here to have the lesson read to you!</button>
            <Section lessons={lessons} />
            <Next />
        </div>
    );
};

export default Lesson;