--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

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
-- Name: sensor_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sensor_data (
    id integer NOT NULL,
    serial character varying(255),
    sw_version character varying(255),
    temperature character varying(255),
    date character varying(255),
    gps character varying(255)
);


ALTER TABLE public.sensor_data OWNER TO postgres;

--
-- Name: sensor_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sensor_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sensor_data_id_seq OWNER TO postgres;

--
-- Name: sensor_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sensor_data_id_seq OWNED BY public.sensor_data.id;


--
-- Name: sensor_data id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sensor_data ALTER COLUMN id SET DEFAULT nextval('public.sensor_data_id_seq'::regclass);


--
-- Data for Name: sensor_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sensor_data (id, serial, sw_version, temperature, date, gps) FROM stdin;
1	TEM-000001	01-01	28	2023-04-17T12:22:43	52.52,12.04
2	TEM-000001	01-01	28	2023-04-17T12:22:43	52.52,12.04
3	TEM-000001	01-01	28	2023-04-17T12:22:43	52.52,12.04
4	TEM-000001	01-01	28	2023-04-17T12:22:43	52.52,12.04
\.


--
-- Name: sensor_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sensor_data_id_seq', 4, true);


--
-- Name: sensor_data sensor_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sensor_data
    ADD CONSTRAINT sensor_data_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

