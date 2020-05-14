PGDMP                         x            sklad    12.2    12.2 +    H           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            I           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            J           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            K           1262    16393    sklad    DATABASE     �   CREATE DATABASE sklad WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';
    DROP DATABASE sklad;
                postgres    false            �            1259    16450 	   equip_spr    TABLE     r   CREATE TABLE public.equip_spr (
    eq_id integer NOT NULL,
    eq_type_id smallint,
    eq_name character(20)
);
    DROP TABLE public.equip_spr;
       public         heap    postgres    false            �            1259    16434 
   filial_spr    TABLE     [   CREATE TABLE public.filial_spr (
    fi_id smallint NOT NULL,
    fi_name character(20)
);
    DROP TABLE public.filial_spr;
       public         heap    postgres    false            �            1259    16413    kategor_spr    TABLE     ^   CREATE TABLE public.kategor_spr (
    kat_id smallint NOT NULL,
    kat_name character(20)
);
    DROP TABLE public.kategor_spr;
       public         heap    postgres    false            �            1259    16464    otd_spr    TABLE     X   CREATE TABLE public.otd_spr (
    ot_id smallint NOT NULL,
    ot_name character(20)
);
    DROP TABLE public.otd_spr;
       public         heap    postgres    false            �            1259    16442    provider_spr    TABLE     \   CREATE TABLE public.provider_spr (
    pr_id integer NOT NULL,
    pr_name character(20)
);
     DROP TABLE public.provider_spr;
       public         heap    postgres    false            �            1259    16511    relation_spr    TABLE     8   CREATE TABLE public.relation_spr (
    re_id integer
);
     DROP TABLE public.relation_spr;
       public         heap    postgres    false            �            1259    16472    storage    TABLE     u  CREATE TABLE public.storage (
    st_id integer NOT NULL,
    st_eq_id integer,
    st_pr_id smallint,
    st_kat_id smallint,
    st_un_id smallint,
    st_amount smallint,
    st_inv_num character(25),
    st_contr_num character(20),
    st_contr_date date,
    st_inp_usr integer,
    st_inp_date date,
    st_red_usr smallint,
    st_red_date date,
    st_prim text
);
    DROP TABLE public.storage;
       public         heap    postgres    false            �            1259    16394    type_equip_spr    TABLE     _   CREATE TABLE public.type_equip_spr (
    te_id smallint NOT NULL,
    te_name character(20)
);
 "   DROP TABLE public.type_equip_spr;
       public         heap    postgres    false            �            1259    16405 	   units_spr    TABLE     Z   CREATE TABLE public.units_spr (
    un_id smallint NOT NULL,
    un_name character(20)
);
    DROP TABLE public.units_spr;
       public         heap    postgres    false            �            1259    16421    users    TABLE     �   CREATE TABLE public.users (
    us_id integer NOT NULL,
    us_login character(20),
    us_pas character(20),
    us_role smallint
);
    DROP TABLE public.users;
       public         heap    postgres    false            B          0    16450 	   equip_spr 
   TABLE DATA           ?   COPY public.equip_spr (eq_id, eq_type_id, eq_name) FROM stdin;
    public          postgres    false    208   a.       @          0    16434 
   filial_spr 
   TABLE DATA           4   COPY public.filial_spr (fi_id, fi_name) FROM stdin;
    public          postgres    false    206   �.       >          0    16413    kategor_spr 
   TABLE DATA           7   COPY public.kategor_spr (kat_id, kat_name) FROM stdin;
    public          postgres    false    204   ;/       C          0    16464    otd_spr 
   TABLE DATA           1   COPY public.otd_spr (ot_id, ot_name) FROM stdin;
    public          postgres    false    209   �/       A          0    16442    provider_spr 
   TABLE DATA           6   COPY public.provider_spr (pr_id, pr_name) FROM stdin;
    public          postgres    false    207   �/       E          0    16511    relation_spr 
   TABLE DATA           -   COPY public.relation_spr (re_id) FROM stdin;
    public          postgres    false    211   0       D          0    16472    storage 
   TABLE DATA           �   COPY public.storage (st_id, st_eq_id, st_pr_id, st_kat_id, st_un_id, st_amount, st_inv_num, st_contr_num, st_contr_date, st_inp_usr, st_inp_date, st_red_usr, st_red_date, st_prim) FROM stdin;
    public          postgres    false    210   70       <          0    16394    type_equip_spr 
   TABLE DATA           8   COPY public.type_equip_spr (te_id, te_name) FROM stdin;
    public          postgres    false    202   �0       =          0    16405 	   units_spr 
   TABLE DATA           3   COPY public.units_spr (un_id, un_name) FROM stdin;
    public          postgres    false    203   1       ?          0    16421    users 
   TABLE DATA           A   COPY public.users (us_id, us_login, us_pas, us_role) FROM stdin;
    public          postgres    false    205   a1       �
           2606    16457    equip_spr pk_equip_spr 
   CONSTRAINT     W   ALTER TABLE ONLY public.equip_spr
    ADD CONSTRAINT pk_equip_spr PRIMARY KEY (eq_id);
 @   ALTER TABLE ONLY public.equip_spr DROP CONSTRAINT pk_equip_spr;
       public            postgres    false    208            �
           2606    16441    filial_spr pk_filial_spr 
   CONSTRAINT     Y   ALTER TABLE ONLY public.filial_spr
    ADD CONSTRAINT pk_filial_spr PRIMARY KEY (fi_id);
 B   ALTER TABLE ONLY public.filial_spr DROP CONSTRAINT pk_filial_spr;
       public            postgres    false    206            �
           2606    16420    kategor_spr pk_kategor_spr 
   CONSTRAINT     \   ALTER TABLE ONLY public.kategor_spr
    ADD CONSTRAINT pk_kategor_spr PRIMARY KEY (kat_id);
 D   ALTER TABLE ONLY public.kategor_spr DROP CONSTRAINT pk_kategor_spr;
       public            postgres    false    204            �
           2606    16471    otd_spr pk_otd_spr 
   CONSTRAINT     S   ALTER TABLE ONLY public.otd_spr
    ADD CONSTRAINT pk_otd_spr PRIMARY KEY (ot_id);
 <   ALTER TABLE ONLY public.otd_spr DROP CONSTRAINT pk_otd_spr;
       public            postgres    false    209            �
           2606    16449    provider_spr pk_provider_spr 
   CONSTRAINT     ]   ALTER TABLE ONLY public.provider_spr
    ADD CONSTRAINT pk_provider_spr PRIMARY KEY (pr_id);
 F   ALTER TABLE ONLY public.provider_spr DROP CONSTRAINT pk_provider_spr;
       public            postgres    false    207            �
           2606    16483    storage pk_storage 
   CONSTRAINT     S   ALTER TABLE ONLY public.storage
    ADD CONSTRAINT pk_storage PRIMARY KEY (st_id);
 <   ALTER TABLE ONLY public.storage DROP CONSTRAINT pk_storage;
       public            postgres    false    210            �
           2606    16404    type_equip_spr pk_type_equip 
   CONSTRAINT     ]   ALTER TABLE ONLY public.type_equip_spr
    ADD CONSTRAINT pk_type_equip PRIMARY KEY (te_id);
 F   ALTER TABLE ONLY public.type_equip_spr DROP CONSTRAINT pk_type_equip;
       public            postgres    false    202            �
           2606    16412    units_spr pk_units_spr 
   CONSTRAINT     W   ALTER TABLE ONLY public.units_spr
    ADD CONSTRAINT pk_units_spr PRIMARY KEY (un_id);
 @   ALTER TABLE ONLY public.units_spr DROP CONSTRAINT pk_units_spr;
       public            postgres    false    203            �
           2606    16425    users pk_users 
   CONSTRAINT     O   ALTER TABLE ONLY public.users
    ADD CONSTRAINT pk_users PRIMARY KEY (us_id);
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT pk_users;
       public            postgres    false    205            �
           1259    16463    fki_fk_equips_type    INDEX     N   CREATE INDEX fki_fk_equips_type ON public.equip_spr USING btree (eq_type_id);
 &   DROP INDEX public.fki_fk_equips_type;
       public            postgres    false    208            �
           1259    16489    fki_fk_storage_equip    INDEX     L   CREATE INDEX fki_fk_storage_equip ON public.storage USING btree (st_eq_id);
 (   DROP INDEX public.fki_fk_storage_equip;
       public            postgres    false    210            �
           1259    16495    fki_fk_storage_kategor    INDEX     O   CREATE INDEX fki_fk_storage_kategor ON public.storage USING btree (st_kat_id);
 *   DROP INDEX public.fki_fk_storage_kategor;
       public            postgres    false    210            �
           1259    16501    fki_fk_storage_provider    INDEX     O   CREATE INDEX fki_fk_storage_provider ON public.storage USING btree (st_pr_id);
 +   DROP INDEX public.fki_fk_storage_provider;
       public            postgres    false    210            �
           1259    16507    fki_fk_storage_units    INDEX     L   CREATE INDEX fki_fk_storage_units ON public.storage USING btree (st_un_id);
 (   DROP INDEX public.fki_fk_storage_units;
       public            postgres    false    210            �
           2606    16458    equip_spr fk_equips_type    FK CONSTRAINT     �   ALTER TABLE ONLY public.equip_spr
    ADD CONSTRAINT fk_equips_type FOREIGN KEY (eq_type_id) REFERENCES public.type_equip_spr(te_id) NOT VALID;
 B   ALTER TABLE ONLY public.equip_spr DROP CONSTRAINT fk_equips_type;
       public          postgres    false    202    2723    208            �
           2606    16484    storage fk_storage_equip    FK CONSTRAINT     �   ALTER TABLE ONLY public.storage
    ADD CONSTRAINT fk_storage_equip FOREIGN KEY (st_eq_id) REFERENCES public.equip_spr(eq_id) NOT VALID;
 B   ALTER TABLE ONLY public.storage DROP CONSTRAINT fk_storage_equip;
       public          postgres    false    208    2736    210            �
           2606    16490    storage fk_storage_kategor    FK CONSTRAINT     �   ALTER TABLE ONLY public.storage
    ADD CONSTRAINT fk_storage_kategor FOREIGN KEY (st_kat_id) REFERENCES public.kategor_spr(kat_id) NOT VALID;
 D   ALTER TABLE ONLY public.storage DROP CONSTRAINT fk_storage_kategor;
       public          postgres    false    204    2727    210            �
           2606    16496    storage fk_storage_provider    FK CONSTRAINT     �   ALTER TABLE ONLY public.storage
    ADD CONSTRAINT fk_storage_provider FOREIGN KEY (st_pr_id) REFERENCES public.provider_spr(pr_id) NOT VALID;
 E   ALTER TABLE ONLY public.storage DROP CONSTRAINT fk_storage_provider;
       public          postgres    false    2733    210    207            �
           2606    16502    storage fk_storage_units    FK CONSTRAINT     �   ALTER TABLE ONLY public.storage
    ADD CONSTRAINT fk_storage_units FOREIGN KEY (st_un_id) REFERENCES public.units_spr(un_id) NOT VALID;
 B   ALTER TABLE ONLY public.storage DROP CONSTRAINT fk_storage_units;
       public          postgres    false    2725    210    203            B   s   x�3�4����K/.��S�pt44P .C��c�*  ��!g����O������1\Ә�91dNQf^IjLӈ��� B��T�;����"Q���������� ��j      @   G   x�3༰�bӅ�.츰��^ �A�9/������{��F�&\�u��;PW� �9*�      >   H   x�3�0�bㅽ�]�ta���[.6^l���� �ܠ���e�ya���_l��,�C	p��qqq ��%�      C   F   x�3�0������!煥v\l��|���f �Eڈ��"�Ć�.칰�bӅ}v1�B�=... �(�      A   !   x�3�t�V@\��Ι%�9�y�(�1z\\\ ��      E      x������ � �      D   Z   x�3�4�BC 256uqsT� �&�fffƆF
��~pA#CK]]C�v##]S]C�?�0���.l����(ua#������ �#      <   m   x�U���@C��� �Y�a�((`� �
�FX�\E���:�����h"&���9��*�U%shI2;�M1#Z���$w���,x3V�H
��	NN���2���D�      =   3   x�3��q�Ipr^l�����Y�]l������.�@������ �v�      ?      x�3�LL���S@��b���� �	      