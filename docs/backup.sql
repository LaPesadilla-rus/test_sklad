PGDMP         8    
            x            sklad    10.12    10.12                 0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            !           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            "           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false                      0    16422    equip 
   TABLE DATA               |   COPY public.equip (e_id, e_type_eq, e_m_id, e_kod, e_date, e_kol, e_un_id, e_contr_num, e_contr_date, e_kat_id) FROM stdin;
    public       postgres    false    199   !	                 0    16473 	   equip_spr 
   TABLE DATA               ?   COPY public.equip_spr (eq_id, eq_type_id, eq_name) FROM stdin;
    public       postgres    false    204   �	                 0    16447 
   filial_spr 
   TABLE DATA               2   COPY public.filial_spr (f_id, f_name) FROM stdin;
    public       postgres    false    201   $
                 0    16465    kategor_spr 
   TABLE DATA               7   COPY public.kategor_spr (kat_id, kat_name) FROM stdin;
    public       postgres    false    203   �
                 0    16425    manufact_spr 
   TABLE DATA               4   COPY public.manufact_spr (m_id, m_name) FROM stdin;
    public       postgres    false    200   �
                 0    16416    type_equip_spr 
   TABLE DATA               8   COPY public.type_equip_spr (te_id, te_name) FROM stdin;
    public       postgres    false    198                    0    16456 	   units_spr 
   TABLE DATA               3   COPY public.units_spr (un_id, un_name) FROM stdin;
    public       postgres    false    202   �                 0    16406    users 
   TABLE DATA               5   COPY public.users (u_id, u_login, u_pas) FROM stdin;
    public       postgres    false    197   �       &           0    0    users_us_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.users_us_id_seq', 1, true);
            public       postgres    false    196               �   x����� �gx��@��G�h��K;v���c���PS��z�B��|�1�����b��T��gM�ׁf囈�!����F�6�fō�s�#�'$"�_��-a�y��Y���F�����.���TޣdSN�km�(�&�ow�.!�<bKD���/F���@�e�         4   x�3�4��v54R@\��F���A����(F@��.n
h�+F��� �a         T   x�3༰�bӅ�.츰��^ �A�9/������{��F��]�za��&�`9c�.��xaÅ��r1z\\\ 7�4G         H   x�3�0�bㅽ�]�ta���[.6^l���� �ܠ���e�ya���_l��,�C	p��qqq �@%�         +   x�3�tI��Q@\F��N��
\Ɯ���9����(�1z\\\ ���         a   x�M��	�0D��)�����$�;g%��o���8�kV<��#YD���kR�	�MmT��a��TZ�"�X@�������q�y4�8�            x�3��q�I
��8/6_����qqq �{�         0   x�3�LL���S@��&�F���\���ũE��j���W� ��     