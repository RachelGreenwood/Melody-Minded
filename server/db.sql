--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Homebrew)
-- Dumped by pg_dump version 14.8 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: tpl1122_2
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    poster text,
    datetime timestamp without time zone,
    comment text
);


ALTER TABLE public.comments OWNER TO tpl1122_2;

--
-- Name: lessons; Type: TABLE; Schema: public; Owner: tpl1122_2
--

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


ALTER TABLE public.lessons OWNER TO tpl1122_2;

--
-- Name: lessons_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_2
--

ALTER TABLE public.lessons ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.lessons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: untitled_table_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_2
--

ALTER TABLE public.comments ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.untitled_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: tpl1122_2
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text,
    email character varying,
    password character varying,
    photo character varying,
    lessons_completed integer
);


ALTER TABLE public.users OWNER TO tpl1122_2;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_2
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: tpl1122_2
--

COPY public.comments (id, poster, datetime, comment) FROM stdin;
1	testuser	\N	testcomment
\.


--
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: tpl1122_2
--

COPY public.lessons (id, title, concept1, question1, "wrong_answer1A", "wrong_answer1B", "wrong_answer1C", correct_answer1, incorrect_feedback1, correct_feedback1) FROM stdin;
1	testlesson	first concept	one question: ?	nop	wrong	nuh uhh	correct	um...no	nice!
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tpl1122_2
--

COPY public.users (id, username, email, password, photo, lessons_completed) FROM stdin;
1	test	test	test	test	1
2	tester	test2	test2	test2	4
3	Techtonica	info@techtonica.org	HelloWorld	img	7
\.


--
-- Name: lessons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_2
--

SELECT pg_catalog.setval('public.lessons_id_seq', 1, true);


--
-- Name: untitled_table_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_2
--

SELECT pg_catalog.setval('public.untitled_table_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_2
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: lessons lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_2
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_pkey PRIMARY KEY (id);


--
-- Name: comments untitled_table_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_2
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT untitled_table_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_2
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

