/* Replace with your SQL commands */
CREATE TABLE public.lessons (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text,
    concept1 text,
    question1 text,
    "wrong_answer1A" text,
    "wrong_answer1B" text,
    "wrong_answer1C" text,
    correct_answer1 text,
    incorrect_feedback1 text,
    correct_feedback1 text
);

INSERT INTO lessons (title, concept1, question1, "wrong_answer1A", "wrong_answer1B", "wrong_answer1C", correct_answer1, incorrect_feedback1, correct_feedback1) VALUES ('testlesson', 'first concept', 'one question: ?', 'nop', 'wrong', 'nuh uhh', 'correct', 'um...no', 'nice!');