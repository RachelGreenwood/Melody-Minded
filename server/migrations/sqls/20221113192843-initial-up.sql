CREATE TABLE public.comments (
    id integer NOT NULL,
    poster text,
    datetime timestamp without time zone,
    comment text,
    avatar character varying
);

CREATE TABLE public.concepts (
    id integer NOT NULL,
    concept text,
    lesson_id integer,
    concept_level integer
);

ALTER TABLE public.concepts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.concepts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.lessons_new (
    id integer NOT NULL,
    title text
);

CREATE TABLE public.questions (
    id integer NOT NULL,
    concept_id integer,
    question text,
    "wrong_answerA" text,
    "wrong_answerB" text,
    "wrong_answerC" text,
    correct_answer text,
    incorrect_feedback text,
    correct_feedback text
);

ALTER TABLE public.questions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE public.comments ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.untitled_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.users (
    id integer NOT NULL,
    username text,
    email character varying,
    photo character varying,
    lessons_completed integer
);

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

COPY public.comments (id, poster, datetime, comment, avatar) FROM stdin;
\.

COPY public.concepts (id, concept, lesson_id, concept_level) FROM stdin;
1	Have you noticed how singers make singing look easy? How relaxed they are when performing? This is because they use their whole body as the instrument, not just their voice.\n\nHow your voice sounds can be affected by your posture (how you sit or stand), your breathing, how relaxed or tense you are, how tired you are, and what you eat and drink. This is why you should never drink milk or eat chocolate before a performance; it coats your throat, which is great for when you’re sick, but terrible if you’re trying to sing!\n\nHaving good posture allows you to sing at your best. It can make your voice louder and more confident, and it can help you breathe better and feel more confident. Let’s talk about how you should stand or sit to sing. Try to sing a simple note or song standing as you are. Now, put your feet shoulder-width apart; you can put one foot a little in front of the other to stay balanced for a long time. Push your shoulders forward, up, back, then down. Keep them relaxed but pushed not hunched forward. Now, pretend there’s a string coming from the top of your head. Let it pull your spine up so you’re standing tall, but relaxed. Push your chin back a little. Your head should look straight forward, not pointing up or down. Now try to sing the same note or tune. How is the sound different?	1	1
2	What about when you’re sitting? Your feet should be firmly on the floor. If you’re vertically challenged (i.e. not very tall), move forward in your seat to get your feet on the floor. Your bottom should be a few inches from the back of the seat; never relax against the back of your chair. Keep your feet shoulder-width apart. And like when you’re standing, your back should be straight and your head looking straight forward.	1	1
5	Breathing can really change the way your voice sounds: how loud and confident you are, as well as the lowest and highest notes you can hit. It’s important to be able to control your breath and stay relaxed while breathing.\n\nFirst, check your posture. Having good posture makes breathing properly much easier. Now, breathe normally and try to relax. Don’t change how you’re breathing, but notice how you breathe. Now, put your hands on your stomach. Feel your stomach expanding and pushing your hands outwards when you breathe in, and going back in when you breathe out. Try singing a note or tune like this and compare it to your normal singing. How is it different? This is how you should breathe when you sing. The breath should come from the stomach, not the chest or throat. The rest of your body should be relaxed when you do this. Your shoulders should not be going up a lot when you breathe in. Try breathing deeply. Try breathing in for as long as you comfortably can, then out for as long as you can. Try making a hissing noise when you breathe out. Then try a “zzz” noise when you breathe out	2	2
3	How you hold your music also affects your posture. If you hold it too high, it blocks the mouth and hides the sound, and you can’t see the director guiding you. If you hold it too low, you will have to look down to see the music, which will ruin your posture. Hold the music so that you can see the director just above the top of your music, and you can look between the director and the music by moving only your eyes, not your head.\n\nTake a look at your posture in the mirror. What are you doing well? What do you want to work on to get it perfect?	1	1
\.

COPY public.lessons_new (id, title) FROM stdin;
1	Posture
2	Breathing
\.

COPY public.questions (id, concept_id, question, "wrong_answerA", "wrong_answerB", "wrong_answerC", correct_answer, incorrect_feedback, correct_feedback) FROM stdin;
3	3	What are the singers on the left and right doing wrong that the singer in the middle is doing right?\n<img src="https://www.kennedy-center.org/globalassets/education/resources-for-educators/classroom-resources/artsedge/media/so-you-want-to-be-a-singer/surviving-school-chorus/so-you-want-to-be-a-singer-5-169.jpg" style="display: block; width: 500px"/>	Holding their music too high	Bad back posture	\N	Holding their music too low	Look at their music books!	Great job!
2	2	Which of these is an example of GOOD sitting posture?<img src="data:image/jpeg;base64,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" style="display: block; width: 400px" />	left	\N	\N	right	What should you never do with the back of the chair?	excellent!
1	1	Which of these examples is GOOD posture?\n<img src="https://magarticles.magzter.com/articles/880/287423/5b3255aac77ec/Good-Posture.jpg" style="display: block; width: 300px;" />	right	\N	\N	left	Take a look at the shoulders!	nice work!
4	5	Where should your breath come from when singing?	Your chest	Your throat	Your nose	Your stomach	Put your hands on your stomach and try again. Where is the breath coming from?	Awesome!
\.

COPY public.users (id, username, email, photo, lessons_completed) FROM stdin;
17	rachelgreenwood3301	rachelgreenwood3301@gmail.com	https://lh3.googleusercontent.com/a/ACg8ocKS1xrt2IxeA9YvYc5LtkxFPHG7linGItygmdXLjONQZg=s96-c	0
\.

SELECT pg_catalog.setval('public.concepts_id_seq', 6, true);

SELECT pg_catalog.setval('public.questions_id_seq', 5, true);

SELECT pg_catalog.setval('public.untitled_table_id_seq', 41, true);

SELECT pg_catalog.setval('public.users_id_seq', 17, true);

ALTER TABLE ONLY public.concepts
    ADD CONSTRAINT concepts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT untitled_table_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);