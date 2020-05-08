PGDMP     4                    x            sklad    10.12    10.12                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false                       1262    16393    sklad    DATABASE     �   CREATE DATABASE sklad WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';
    DROP DATABASE sklad;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false                       0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    12924    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false                       0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1255    16439    id_gen_func()    FUNCTION     �   CREATE FUNCTION public.id_gen_func() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
	NEW.e_id = (SELECT (MAX(e_id)+1) FROM equip);
	RETURN NEW;
END;$$;
 $   DROP FUNCTION public.id_gen_func();
       public       postgres    false    3    1            �            1259    16422    equip    TABLE     �   CREATE TABLE public.equip (
    e_id integer NOT NULL,
    e_type_eq integer,
    e_m_id integer,
    e_kod character(20),
    e_date date,
    e_kol smallint
);
    DROP TABLE public.equip;
       public         postgres    false    3            �            1259    16425    manufact    TABLE     V   CREATE TABLE public.manufact (
    m_id integer NOT NULL,
    m_name character(20)
);
    DROP TABLE public.manufact;
       public         postgres    false    3            �            1259    16416 
   type_equip    TABLE     Z   CREATE TABLE public.type_equip (
    te_id integer NOT NULL,
    te_name character(20)
);
    DROP TABLE public.type_equip;
       public         postgres    false    3            �            1259    16406    users    TABLE     m   CREATE TABLE public.users (
    u_id integer NOT NULL,
    u_login character(20),
    u_pas character(20)
);
    DROP TABLE public.users;
       public         postgres    false    3            �            1259    16397    users_us_id_seq    SEQUENCE     x   CREATE SEQUENCE public.users_us_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.users_us_id_seq;
       public       postgres    false    3            �
          0    16422    equip 
   TABLE DATA               N   COPY public.equip (e_id, e_type_eq, e_m_id, e_kod, e_date, e_kol) FROM stdin;
    public       postgres    false    199   �       �
          0    16425    manufact 
   TABLE DATA               0   COPY public.manufact (m_id, m_name) FROM stdin;
    public       postgres    false    200   �       �
          0    16416 
   type_equip 
   TABLE DATA               4   COPY public.type_equip (te_id, te_name) FROM stdin;
    public       postgres    false    198   �       �
          0    16406    users 
   TABLE DATA               5   COPY public.users (u_id, u_login, u_pas) FROM stdin;
    public       postgres    false    197   -                  0    0    users_us_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.users_us_id_seq', 1, true);
            public       postgres    false    196            ~
           2606    16442    equip id 
   CONSTRAINT     H   ALTER TABLE ONLY public.equip
    ADD CONSTRAINT id PRIMARY KEY (e_id);
 2   ALTER TABLE ONLY public.equip DROP CONSTRAINT id;
       public         postgres    false    199            �
           2606    16446    manufact id_m 
   CONSTRAINT     M   ALTER TABLE ONLY public.manufact
    ADD CONSTRAINT id_m PRIMARY KEY (m_id);
 7   ALTER TABLE ONLY public.manufact DROP CONSTRAINT id_m;
       public         postgres    false    200            |
           2606    16444    type_equip id_te 
   CONSTRAINT     Q   ALTER TABLE ONLY public.type_equip
    ADD CONSTRAINT id_te PRIMARY KEY (te_id);
 :   ALTER TABLE ONLY public.type_equip DROP CONSTRAINT id_te;
       public         postgres    false    198            �
           2620    16440    equip id_gen    TRIGGER     i   CREATE TRIGGER id_gen BEFORE INSERT ON public.equip FOR EACH ROW EXECUTE PROCEDURE public.id_gen_func();
 %   DROP TRIGGER id_gen ON public.equip;
       public       postgres    false    201    199            �
   �   x���1�0��>E/d;qJ�J���c��21��N*U5�=���	[�<�Ҽ	9'����q�/Ñ�)����X�yY�6G�;��1��y���]im>
�����|�QG����渳����j^4�T�a�AQ�9o��%�YJ�xF5i���	_R�O      �
   +   x�3�tI��Q@\F��N��
\Ɯ���9����(�1z\\\ ���      �
   a   x�M��	�0D��)�����$�;g%��o���8�kV<��#YD���kR�	�MmT��a��TZ�"�X@�������q�y4�8�      �
   0   x�3�LL���S@��&�F���\���ũE��j���W� ��     