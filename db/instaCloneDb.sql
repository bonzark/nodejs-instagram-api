--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-1.pgdg22.04+1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-1.pgdg22.04+1)

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
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    cmnt_id bigint NOT NULL,
    user_id integer,
    content text,
    created_on timestamp without time zone NOT NULL,
    post_id integer
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_cmnt_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_cmnt_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_cmnt_id_seq OWNER TO postgres;

--
-- Name: comments_cmnt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_cmnt_id_seq OWNED BY public.comments.cmnt_id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.likes (
    user_id integer,
    post_id integer
);


ALTER TABLE public.likes OWNER TO postgres;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    post_id bigint NOT NULL,
    user_id integer,
    img_path text NOT NULL,
    caption text,
    created_on timestamp without time zone NOT NULL,
    comments integer DEFAULT 0
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: posts_post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_post_id_seq OWNER TO postgres;

--
-- Name: posts_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_post_id_seq OWNED BY public.posts.post_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id bigint NOT NULL,
    name character varying(50) NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(355) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    last_login timestamp without time zone,
    follower integer[] DEFAULT ARRAY[]::integer[],
    following integer[] DEFAULT ARRAY[]::integer[],
    dp_path character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: comments cmnt_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN cmnt_id SET DEFAULT nextval('public.comments_cmnt_id_seq'::regclass);


--
-- Name: posts post_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN post_id SET DEFAULT nextval('public.posts_post_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (cmnt_id, user_id, content, created_on, post_id) FROM stdin;
1	1	tetetetettetetette	2022-11-09 16:13:47.166092	1
2	1	tetetetettetetette	2022-11-09 16:18:52.258428	6
3	1	tetetetettetetette	2022-11-10 10:19:13.065025	6
4	1	ASASASasdasd	2022-11-10 10:24:07.246316	5
5	1	test	2022-11-10 10:26:29.849392	4
6	1	byeee\n	2022-11-10 10:27:27.422957	4
7	1	noniiiii	2022-11-10 10:27:46.856526	3
8	1	asdasdasda	2022-11-10 10:28:24.529963	6
9	1	asdasd	2022-11-10 10:32:15.297495	6
10	6	kya hal chal	2022-11-14 11:04:18.162214	7
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.likes (user_id, post_id) FROM stdin;
1	2
2	3
2	1
3	1
3	3
1	3
1	6
4	6
3	2
1	5
2	6
1	7
1	1
1	4
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (post_id, user_id, img_path, caption, created_on, comments) FROM stdin;
1	1	http://localhost:9000/postStatic/postImg_1667472933167.jpg	asfk aaujksjdfasf dsjfhk asfbjasd fash fas ndf ashfasflhas f asful asudfasilhf	2022-11-03 16:25:33.228908	1
2	2	http://localhost:9000/postStatic/postImg_1667532174948.jpg	second user post	2022-11-04 08:52:55.010812	0
5	1	http://localhost:9000/postStatic/postImg_1667545219530.jpg	nothing	2022-11-04 12:30:19.593739	1
4	1	http://localhost:9000/postStatic/postImg_1667544976271.jpg	1920x1080	2022-11-04 12:26:16.32081	2
3	3	http://localhost:9000/postStatic/postImg_1667535945826.jpg	omayvaaa mioo shindeee	2022-11-04 09:55:45.867118	1
6	1	http://localhost:9000/postStatic/postImg_1667547441546.png	TEstttttt	2022-11-04 13:07:21.607347	4
7	1	http://localhost:9000/postStatic/postImg_1667881544520.png	test	2022-11-08 09:55:44.598344	1
8	1	http://localhost:9000/postStatic/postImg_1668676522718.jpg	test	2022-11-17 14:45:22.791765	0
9	7	http://localhost:9000/postStatic/postImg_1668677306189.jpg	my post	2022-11-17 14:58:26.235099	0
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, name, username, password, email, created_on, last_login, follower, following, dp_path) FROM stdin;
4	test	Test	$2b$10$HvcP/vtYiUfPZlaDLp5XQOypsYQstfMsa0wSUQbDRquLnCl4u3UKu	t@test.com	2022-11-04 15:16:04.339177	2022-11-04 15:16:04.339177	{}	{3,1}	\N
2	Test	testbhai	$2b$10$Xaimt/4mOL1DoKXmjNE0seAewA0zyEil7iezH.XRLhS7FT.btQtAu	test@test.com	2022-11-03 16:37:33.55379	2022-11-03 16:37:33.55379	{1,3}	{3,1}	http://localhost:9000/dpStatic/dpImg_1667896656456.jpg
5	New User	new_user	$2b$10$l7YUEcg55bxK8/s2/kfBo.hj5Ljw.ytOiVGjxHigukhpD2h4aNrgu	new@gmail.com	2022-11-10 10:48:06.978367	2022-11-10 10:48:06.978367	{}	{}	\N
3	jaydeep	CYBER.jerry	$2b$10$iW522JrXDACZwAKpE5cyieNOwwUlvwbztQ/USwuImUHbK6Lcv.ohq	J@J.com	2022-11-04 09:55:07.15001	2022-11-04 09:55:07.15001	{4,1,2,6}	{1,2}	\N
6	NEw user2	new2	$2b$10$sRnlwxggUDR5AbauQ1nxueQkvhhSuHXluo0JgtT4URnS5c6KlWxce	new2@gmail.com	2022-11-10 11:01:32.197144	2022-11-10 11:01:32.197144	{}	{3}	\N
1	Harsh	harsh	$2b$10$/3baxJ/5rIKD3/dYSq3rTehuWuvNEzuy45T5dxV8HK/aU5cPhSqAi	h@h.com	2022-11-03 16:23:44.029355	2022-11-03 16:23:44.029355	{4,3,2,7}	{2,3}	http://localhost:9000/dpStatic/dpImg_1667883636058.jpg
7	asdasd	qweqweqwe	$2b$10$tn.lUFTaFpNpxq336gZ96..dhQYTfQDXgXJISzfiLcPmXWckctKzK	J1@J.com	2022-11-17 14:51:11.932887	2022-11-17 14:51:11.932887	{}	{1}	\N
\.


--
-- Name: comments_cmnt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_cmnt_id_seq', 10, true);


--
-- Name: posts_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_post_id_seq', 9, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 7, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (cmnt_id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (post_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: posts fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: comments fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: comments fposts; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT fposts FOREIGN KEY (post_id) REFERENCES public.posts(post_id);


--
-- Name: likes likes_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(post_id);


--
-- Name: likes likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

