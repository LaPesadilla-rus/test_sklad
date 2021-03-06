PGDMP         ;                x            sklad    12.2    12.2 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16393    sklad    DATABASE     �   CREATE DATABASE sklad WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';
    DROP DATABASE sklad;
                postgres    false                       1255    17738    balance_delete_row()    FUNCTION     �   CREATE FUNCTION public.balance_delete_row() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
IF (NEW.bl_amount = 0) THEN
	DELETE FROM storage WHERE bl_id = NEW.bl_id;
	END IF;
RETURN NULL;
END$$;
 +   DROP FUNCTION public.balance_delete_row();
       public          postgres    false                       1255    16936    balance_gen_bl_id()    FUNCTION     Y  CREATE FUNCTION public.balance_gen_bl_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE
id_gen integer;
BEGIN
SELECT MAX(bl_id)+1 INTO id_gen FROM balance;
if id_gen is NULL 
	then id_gen = 1; 
	END IF;
if NEW.bl_prim = 'null' then
	NEW.bl_prim = '';
	END IF;
NEW.bl_id = id_gen;
NEW.bl_inp_date = CURRENT_TIMESTAMP;
RETURN NEW;
END$$;
 *   DROP FUNCTION public.balance_gen_bl_id();
       public          postgres    false            �            1255    16971    equip_traff()    FUNCTION     �   CREATE FUNCTION public.equip_traff() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
NEW.et_date = CURRENT_TIMESTAMP;
RETURN NEW;
END$$;
 $   DROP FUNCTION public.equip_traff();
       public          postgres    false            �            1255    17001    hystory_date_gen()    FUNCTION     �   CREATE FUNCTION public.hystory_date_gen() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
NEW.hy_date = CURRENT_TIMESTAMP;
RETURN NEW;
END$$;
 )   DROP FUNCTION public.hystory_date_gen();
       public          postgres    false            �            1255    16981    logbook_gen_data()    FUNCTION     �   CREATE FUNCTION public.logbook_gen_data() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
NEW.lb_date = CURRENT_TIMESTAMP;
RETURN NEW;
END$$;
 )   DROP FUNCTION public.logbook_gen_data();
       public          postgres    false            �            1255    17453    mol_id_gen()    FUNCTION     �   CREATE FUNCTION public.mol_id_gen() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE
id_gen integer;
BEGIN
SELECT MAX(mo_id)+1 INTO id_gen FROM mol_spr;
if id_gen is NULL 
	then id_gen = 1; 
	END IF;
NEW.mo_id = id_gen;
RETURN NEW;
END$$;
 #   DROP FUNCTION public.mol_id_gen();
       public          postgres    false                       1255    17451    otd_id_gen()    FUNCTION     �   CREATE FUNCTION public.otd_id_gen() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE
id_gen integer;
BEGIN
SELECT MAX(ot_id)+1 INTO id_gen FROM otd_spr;
if id_gen is NULL 
	then id_gen = 1; 
	END IF;
NEW.ot_id = id_gen;
RETURN NEW;
END$$;
 #   DROP FUNCTION public.otd_id_gen();
       public          postgres    false            �            1255    16881    relation_spr_gen_id_re_unic()    FUNCTION     <  CREATE FUNCTION public.relation_spr_gen_id_re_unic() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE
id_gen integer;
re_unic varchar(10);
BEGIN
SELECT MAX(re_id)+1 INTO id_gen FROM relation_spr;
NEW.re_id = id_gen;

re_unic = (NEW.re_id_osn || '_' || NEW.re_id_dop);

NEW.re_unic = re_unic;
RETURN NEW;
END$$;
 4   DROP FUNCTION public.relation_spr_gen_id_re_unic();
       public          postgres    false            �            1255    16939    storage_delete_rows()    FUNCTION     �   CREATE FUNCTION public.storage_delete_rows() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
IF (NEW.st_amount = 0) THEN
	DELETE FROM storage WHERE st_id = NEW.st_id;
	END IF;
RETURN NULL;
END$$;
 ,   DROP FUNCTION public.storage_delete_rows();
       public          postgres    false            �            1255    16885    storage_gen_st_id()    FUNCTION     �   CREATE FUNCTION public.storage_gen_st_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE
id_gen integer;
BEGIN
SELECT MAX(st_id)+1 INTO id_gen FROM storage;
NEW.st_id = id_gen;
NEW.st_inp_date = CURRENT_TIMESTAMP;
RETURN NEW;
END$$;
 *   DROP FUNCTION public.storage_gen_st_id();
       public          postgres    false            �            1255    17040    storage_in_date_gen()    FUNCTION     �   CREATE FUNCTION public.storage_in_date_gen() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
NEW.si_date = CURRENT_TIMESTAMP;
RETURN NEW;
END$$;
 ,   DROP FUNCTION public.storage_in_date_gen();
       public          postgres    false            �            1255    17022    storage_out_date()    FUNCTION     �   CREATE FUNCTION public.storage_out_date() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
NEW.so_date = CURRENT_TIMESTAMP;
RETURN NEW;
END$$;
 )   DROP FUNCTION public.storage_out_date();
       public          postgres    false                       1255    17087    users_gen_id_date()    FUNCTION     �   CREATE FUNCTION public.users_gen_id_date() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE
id_gen integer;
BEGIN
SELECT MAX(us_id)+1 INTO id_gen FROM users;
NEW.us_id = id_gen;
NEW.us_date = CURRENT_TIMESTAMP;
RETURN NEW;
END$$;
 *   DROP FUNCTION public.users_gen_id_date();
       public          postgres    false            �            1259    16975    act_spr    TABLE     _   CREATE TABLE public.act_spr (
    ac_id integer NOT NULL,
    ac_name character varying(10)
);
    DROP TABLE public.act_spr;
       public         heap    postgres    false            �            1259    16973    act_spr_ac_id_seq    SEQUENCE     �   CREATE SEQUENCE public.act_spr_ac_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.act_spr_ac_id_seq;
       public          postgres    false    229            �           0    0    act_spr_ac_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.act_spr_ac_id_seq OWNED BY public.act_spr.ac_id;
          public          postgres    false    228            �            1259    16897    balance    TABLE     �  CREATE TABLE public.balance (
    bl_id integer NOT NULL,
    bl_eq_id integer,
    bl_pr_id integer,
    bl_un_id smallint,
    bl_amount smallint,
    bl_inv_num character varying,
    bl_contr_num character varying,
    bl_contr_date date,
    bl_inp_date timestamp with time zone,
    bl_inp_usr character varying,
    bl_prim text,
    bl_mol_id integer,
    bl_usr_id integer,
    bl_otd_id integer,
    bl_buh_name character varying(120)
);
    DROP TABLE public.balance;
       public         heap    postgres    false            �            1259    16847    equip_spr_eq_id_seq    SEQUENCE     �   CREATE SEQUENCE public.equip_spr_eq_id_seq
    START WITH 7
    INCREMENT BY 1
    MINVALUE 0
    MAXVALUE 2147483647
    CACHE 1;
 *   DROP SEQUENCE public.equip_spr_eq_id_seq;
       public          postgres    false            �            1259    16450 	   equip_spr    TABLE     �   CREATE TABLE public.equip_spr (
    eq_id integer DEFAULT nextval('public.equip_spr_eq_id_seq'::regclass) NOT NULL,
    eq_type_id smallint,
    eq_name character varying(20),
    eq_mark_id integer,
    eq_kat_id integer
);
    DROP TABLE public.equip_spr;
       public         heap    postgres    false    219            �            1259    16961    equip_traff    TABLE     ,  CREATE TABLE public.equip_traff (
    et_id integer NOT NULL,
    et_user character varying(20),
    et_date timestamp with time zone,
    et_mol_id1 integer,
    et_otd_id1 integer,
    et_mol_id2 integer,
    et_otd_id2 integer,
    et_bl_id integer,
    et_eq_id integer,
    et_usr_id integer
);
    DROP TABLE public.equip_traff;
       public         heap    postgres    false            �            1259    16959    equip_traff_et_id_seq    SEQUENCE     �   CREATE SEQUENCE public.equip_traff_et_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.equip_traff_et_id_seq;
       public          postgres    false    227            �           0    0    equip_traff_et_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.equip_traff_et_id_seq OWNED BY public.equip_traff.et_id;
          public          postgres    false    226            �            1259    16802    filial_spr_fi_id_seq    SEQUENCE     �   CREATE SEQUENCE public.filial_spr_fi_id_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 0
    MAXVALUE 2147483647
    CACHE 1;
 +   DROP SEQUENCE public.filial_spr_fi_id_seq;
       public          postgres    false            �            1259    16434 
   filial_spr    TABLE     �   CREATE TABLE public.filial_spr (
    fi_id integer DEFAULT nextval('public.filial_spr_fi_id_seq'::regclass) NOT NULL,
    fi_name character varying(20)
);
    DROP TABLE public.filial_spr;
       public         heap    postgres    false    217            �            1259    16941    history    TABLE     b  CREATE TABLE public.history (
    hy_id integer NOT NULL,
    hy_eq_id integer,
    hy_pr_id integer,
    hy_un_id smallint,
    hy_amount smallint,
    hy_inv_num character varying(20),
    hy_contr_num character varying(20),
    hy_prim text,
    hy_inp_usr character varying(20),
    hy_mol_id1 integer,
    hy_otd_id1 integer,
    hy_mol_id2 integer,
    hy_otd_id2 integer,
    hy_act_id smallint,
    hy_act_num integer,
    hy_date timestamp with time zone,
    hy_user character varying(20),
    hy_poyasn text,
    hy_in_osn_id integer,
    hy_usr_id integer,
    hy_buh_name character varying(40)
);
    DROP TABLE public.history;
       public         heap    postgres    false            �            1259    16990    history_hy_id_seq    SEQUENCE     �   CREATE SEQUENCE public.history_hy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.history_hy_id_seq;
       public          postgres    false    223            �           0    0    history_hy_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.history_hy_id_seq OWNED BY public.history.hy_id;
          public          postgres    false    230            �            1259    16787    kategor_spr_kat_id_seq    SEQUENCE     �   CREATE SEQUENCE public.kategor_spr_kat_id_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 0
    MAXVALUE 2147483647
    CACHE 1;
 -   DROP SEQUENCE public.kategor_spr_kat_id_seq;
       public          postgres    false            �            1259    16413    kategor_spr    TABLE     �   CREATE TABLE public.kategor_spr (
    kat_id integer DEFAULT nextval('public.kategor_spr_kat_id_seq'::regclass) NOT NULL,
    kat_name character varying(20)
);
    DROP TABLE public.kategor_spr;
       public         heap    postgres    false    216            �            1259    16950    logbook    TABLE     �  CREATE TABLE public.logbook (
    lb_id integer NOT NULL,
    lb_date timestamp with time zone,
    lb_mol_name character varying(20),
    lb_isp_name character varying(20),
    lb_prim text,
    lb_act_id integer,
    lb_act_num integer,
    lb_usr_id integer,
    lb_mol_id integer,
    lb_otd_id integer,
    lb_eq_id integer,
    lb_inv_num character varying(40),
    lb_buh_name character varying(40),
    lb_amount integer
);
    DROP TABLE public.logbook;
       public         heap    postgres    false            �            1259    16948    logbook_lb_id_seq    SEQUENCE     �   CREATE SEQUENCE public.logbook_lb_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.logbook_lb_id_seq;
       public          postgres    false    225            �           0    0    logbook_lb_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.logbook_lb_id_seq OWNED BY public.logbook.lb_id;
          public          postgres    false    224            �            1259    16522    marka_equip_spr    TABLE     g   CREATE TABLE public.marka_equip_spr (
    ma_id integer NOT NULL,
    ma_name character varying(20)
);
 #   DROP TABLE public.marka_equip_spr;
       public         heap    postgres    false            �            1259    16525    marka_equip_spr_ma_id_seq    SEQUENCE     �   CREATE SEQUENCE public.marka_equip_spr_ma_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.marka_equip_spr_ma_id_seq;
       public          postgres    false    212            �           0    0    marka_equip_spr_ma_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.marka_equip_spr_ma_id_seq OWNED BY public.marka_equip_spr.ma_id;
          public          postgres    false    213            �            1259    16851    mol_spr    TABLE     r   CREATE TABLE public.mol_spr (
    mo_id integer NOT NULL,
    mo_name character varying,
    mo_otd_id integer
);
    DROP TABLE public.mol_spr;
       public         heap    postgres    false            �            1259    16464    otd_spr    TABLE     `   CREATE TABLE public.otd_spr (
    ot_id integer NOT NULL,
    ot_name character varying(100)
);
    DROP TABLE public.otd_spr;
       public         heap    postgres    false            �            1259    16773    provider_spr_pr_id_seq    SEQUENCE     �   CREATE SEQUENCE public.provider_spr_pr_id_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 0
    MAXVALUE 2147483647
    CACHE 1;
 -   DROP SEQUENCE public.provider_spr_pr_id_seq;
       public          postgres    false            �            1259    16442    provider_spr    TABLE     �   CREATE TABLE public.provider_spr (
    pr_id integer DEFAULT nextval('public.provider_spr_pr_id_seq'::regclass) NOT NULL,
    pr_name character varying(20)
);
     DROP TABLE public.provider_spr;
       public         heap    postgres    false    215            �            1259    16511    relation_spr    TABLE     �   CREATE TABLE public.relation_spr (
    re_id integer NOT NULL,
    re_id_osn integer,
    re_id_dop integer,
    re_unic character varying(20)
);
     DROP TABLE public.relation_spr;
       public         heap    postgres    false            �            1259    16865    relation_spr_re_id_seq    SEQUENCE     �   CREATE SEQUENCE public.relation_spr_re_id_seq
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    MAXVALUE 2147483647
    CACHE 1;
 -   DROP SEQUENCE public.relation_spr_re_id_seq;
       public          postgres    false            �            1259    16472    storage    TABLE     �  CREATE TABLE public.storage (
    st_id integer NOT NULL,
    st_eq_id integer,
    st_pr_id integer,
    st_un_id integer,
    st_amount integer,
    st_inv_num character varying(25),
    st_contr_num character varying(20),
    st_contr_date date,
    st_inp_date timestamp without time zone,
    st_red_date date,
    st_prim text,
    st_inp_usr character varying(20),
    st_upd_usr character varying(20),
    st_usr_id integer,
    st_usr_upd_id integer,
    st_buh_name character varying(120)
);
    DROP TABLE public.storage;
       public         heap    postgres    false            �            1259    17033 
   storage_in    TABLE     c  CREATE TABLE public.storage_in (
    si_id integer NOT NULL,
    si_inv_num character varying(20),
    si_eq_id integer,
    si_un_id smallint,
    si_amount integer,
    si_usr_id integer,
    si_date timestamp with time zone,
    si_pr_id integer,
    si_contr_num character varying(20),
    si_contr_date date,
    si_buh_name character varying(40)
);
    DROP TABLE public.storage_in;
       public         heap    postgres    false            �            1259    17031    storage_in_si_id_seq    SEQUENCE     �   CREATE SEQUENCE public.storage_in_si_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.storage_in_si_id_seq;
       public          postgres    false    234            �           0    0    storage_in_si_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.storage_in_si_id_seq OWNED BY public.storage_in.si_id;
          public          postgres    false    233            �            1259    17013    storage_out    TABLE     �  CREATE TABLE public.storage_out (
    so_id integer NOT NULL,
    so_otd_id integer,
    so_mol_id integer,
    so_inv_num character varying,
    so_kat_id integer,
    so_eq_id integer,
    so_un_id smallint,
    so_amount integer,
    so_usr_id integer,
    so_date timestamp with time zone,
    so_pr_id integer,
    so_contr_num character varying(20),
    so_buh_name character varying(40)
);
    DROP TABLE public.storage_out;
       public         heap    postgres    false            �            1259    17011    storage_out_so_id_seq    SEQUENCE     �   CREATE SEQUENCE public.storage_out_so_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.storage_out_so_id_seq;
       public          postgres    false    232            �           0    0    storage_out_so_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.storage_out_so_id_seq OWNED BY public.storage_out.so_id;
          public          postgres    false    231            �            1259    16812    type_equip_spr_te_id_seq    SEQUENCE     �   CREATE SEQUENCE public.type_equip_spr_te_id_seq
    START WITH 3
    INCREMENT BY 1
    MINVALUE 0
    MAXVALUE 2147483647
    CACHE 1;
 /   DROP SEQUENCE public.type_equip_spr_te_id_seq;
       public          postgres    false            �            1259    16394    type_equip_spr    TABLE     �   CREATE TABLE public.type_equip_spr (
    te_id integer DEFAULT nextval('public.type_equip_spr_te_id_seq'::regclass) NOT NULL,
    te_name character varying(20),
    te_kat_id integer
);
 "   DROP TABLE public.type_equip_spr;
       public         heap    postgres    false    218            �            1259    16717    units_spr_un_id_seq    SEQUENCE     �   CREATE SEQUENCE public.units_spr_un_id_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 0
    MAXVALUE 2147483647
    CACHE 1;
 *   DROP SEQUENCE public.units_spr_un_id_seq;
       public          postgres    false            �            1259    16405 	   units_spr    TABLE     �   CREATE TABLE public.units_spr (
    un_id integer DEFAULT nextval('public.units_spr_un_id_seq'::regclass) NOT NULL,
    un_name character varying(20)
);
    DROP TABLE public.units_spr;
       public         heap    postgres    false    214            �            1259    16421    users    TABLE     W  CREATE TABLE public.users (
    us_id integer NOT NULL,
    us_login character varying(20),
    us_pas character varying(20),
    us_role integer,
    us_mol_id integer,
    us_dolsn character varying(20),
    us_name character varying(20),
    us_rt character varying(50),
    us_rt_lt time with time zone,
    us_date time with time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    17091    zayavki    TABLE       CREATE TABLE public.zayavki (
    za_id integer NOT NULL,
    za_num integer,
    za_kat_id integer,
    za_type_id integer,
    za_marka_id integer,
    za_eq_id integer,
    za_txt text,
    za_date time with time zone,
    za_status integer,
    za_msg text
);
    DROP TABLE public.zayavki;
       public         heap    postgres    false            �            1259    17089    zayavki_za_id_seq    SEQUENCE     �   CREATE SEQUENCE public.zayavki_za_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.zayavki_za_id_seq;
       public          postgres    false    236            �           0    0    zayavki_za_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.zayavki_za_id_seq OWNED BY public.zayavki.za_id;
          public          postgres    false    235                       2604    16978    act_spr ac_id    DEFAULT     n   ALTER TABLE ONLY public.act_spr ALTER COLUMN ac_id SET DEFAULT nextval('public.act_spr_ac_id_seq'::regclass);
 <   ALTER TABLE public.act_spr ALTER COLUMN ac_id DROP DEFAULT;
       public          postgres    false    228    229    229                       2604    16964    equip_traff et_id    DEFAULT     v   ALTER TABLE ONLY public.equip_traff ALTER COLUMN et_id SET DEFAULT nextval('public.equip_traff_et_id_seq'::regclass);
 @   ALTER TABLE public.equip_traff ALTER COLUMN et_id DROP DEFAULT;
       public          postgres    false    226    227    227                       2604    16992    history hy_id    DEFAULT     n   ALTER TABLE ONLY public.history ALTER COLUMN hy_id SET DEFAULT nextval('public.history_hy_id_seq'::regclass);
 <   ALTER TABLE public.history ALTER COLUMN hy_id DROP DEFAULT;
       public          postgres    false    230    223                       2604    16953    logbook lb_id    DEFAULT     n   ALTER TABLE ONLY public.logbook ALTER COLUMN lb_id SET DEFAULT nextval('public.logbook_lb_id_seq'::regclass);
 <   ALTER TABLE public.logbook ALTER COLUMN lb_id DROP DEFAULT;
       public          postgres    false    225    224    225                       2604    16527    marka_equip_spr ma_id    DEFAULT     ~   ALTER TABLE ONLY public.marka_equip_spr ALTER COLUMN ma_id SET DEFAULT nextval('public.marka_equip_spr_ma_id_seq'::regclass);
 D   ALTER TABLE public.marka_equip_spr ALTER COLUMN ma_id DROP DEFAULT;
       public          postgres    false    213    212                       2604    17036    storage_in si_id    DEFAULT     t   ALTER TABLE ONLY public.storage_in ALTER COLUMN si_id SET DEFAULT nextval('public.storage_in_si_id_seq'::regclass);
 ?   ALTER TABLE public.storage_in ALTER COLUMN si_id DROP DEFAULT;
       public          postgres    false    233    234    234                       2604    17016    storage_out so_id    DEFAULT     v   ALTER TABLE ONLY public.storage_out ALTER COLUMN so_id SET DEFAULT nextval('public.storage_out_so_id_seq'::regclass);
 @   ALTER TABLE public.storage_out ALTER COLUMN so_id DROP DEFAULT;
       public          postgres    false    232    231    232                       2604    17094    zayavki za_id    DEFAULT     n   ALTER TABLE ONLY public.zayavki ALTER COLUMN za_id SET DEFAULT nextval('public.zayavki_za_id_seq'::regclass);
 <   ALTER TABLE public.zayavki ALTER COLUMN za_id DROP DEFAULT;
       public          postgres    false    236    235    236            �          0    16975    act_spr 
   TABLE DATA           1   COPY public.act_spr (ac_id, ac_name) FROM stdin;
    public          postgres    false    229   z�       �          0    16897    balance 
   TABLE DATA           �   COPY public.balance (bl_id, bl_eq_id, bl_pr_id, bl_un_id, bl_amount, bl_inv_num, bl_contr_num, bl_contr_date, bl_inp_date, bl_inp_usr, bl_prim, bl_mol_id, bl_usr_id, bl_otd_id, bl_buh_name) FROM stdin;
    public          postgres    false    222   ��       �          0    16450 	   equip_spr 
   TABLE DATA           V   COPY public.equip_spr (eq_id, eq_type_id, eq_name, eq_mark_id, eq_kat_id) FROM stdin;
    public          postgres    false    208   ƾ       �          0    16961    equip_traff 
   TABLE DATA           �   COPY public.equip_traff (et_id, et_user, et_date, et_mol_id1, et_otd_id1, et_mol_id2, et_otd_id2, et_bl_id, et_eq_id, et_usr_id) FROM stdin;
    public          postgres    false    227   ˿       �          0    16434 
   filial_spr 
   TABLE DATA           4   COPY public.filial_spr (fi_id, fi_name) FROM stdin;
    public          postgres    false    206   ��       �          0    16941    history 
   TABLE DATA           
  COPY public.history (hy_id, hy_eq_id, hy_pr_id, hy_un_id, hy_amount, hy_inv_num, hy_contr_num, hy_prim, hy_inp_usr, hy_mol_id1, hy_otd_id1, hy_mol_id2, hy_otd_id2, hy_act_id, hy_act_num, hy_date, hy_user, hy_poyasn, hy_in_osn_id, hy_usr_id, hy_buh_name) FROM stdin;
    public          postgres    false    223   %�       �          0    16413    kategor_spr 
   TABLE DATA           7   COPY public.kategor_spr (kat_id, kat_name) FROM stdin;
    public          postgres    false    204   ��       �          0    16950    logbook 
   TABLE DATA           �   COPY public.logbook (lb_id, lb_date, lb_mol_name, lb_isp_name, lb_prim, lb_act_id, lb_act_num, lb_usr_id, lb_mol_id, lb_otd_id, lb_eq_id, lb_inv_num, lb_buh_name, lb_amount) FROM stdin;
    public          postgres    false    225   c�       �          0    16522    marka_equip_spr 
   TABLE DATA           9   COPY public.marka_equip_spr (ma_id, ma_name) FROM stdin;
    public          postgres    false    212   ��       �          0    16851    mol_spr 
   TABLE DATA           <   COPY public.mol_spr (mo_id, mo_name, mo_otd_id) FROM stdin;
    public          postgres    false    220   �       �          0    16464    otd_spr 
   TABLE DATA           1   COPY public.otd_spr (ot_id, ot_name) FROM stdin;
    public          postgres    false    209   ��       �          0    16442    provider_spr 
   TABLE DATA           6   COPY public.provider_spr (pr_id, pr_name) FROM stdin;
    public          postgres    false    207   ��       �          0    16511    relation_spr 
   TABLE DATA           L   COPY public.relation_spr (re_id, re_id_osn, re_id_dop, re_unic) FROM stdin;
    public          postgres    false    211   -�       �          0    16472    storage 
   TABLE DATA           �   COPY public.storage (st_id, st_eq_id, st_pr_id, st_un_id, st_amount, st_inv_num, st_contr_num, st_contr_date, st_inp_date, st_red_date, st_prim, st_inp_usr, st_upd_usr, st_usr_id, st_usr_upd_id, st_buh_name) FROM stdin;
    public          postgres    false    210   ��       �          0    17033 
   storage_in 
   TABLE DATA           �   COPY public.storage_in (si_id, si_inv_num, si_eq_id, si_un_id, si_amount, si_usr_id, si_date, si_pr_id, si_contr_num, si_contr_date, si_buh_name) FROM stdin;
    public          postgres    false    234   �       �          0    17013    storage_out 
   TABLE DATA           �   COPY public.storage_out (so_id, so_otd_id, so_mol_id, so_inv_num, so_kat_id, so_eq_id, so_un_id, so_amount, so_usr_id, so_date, so_pr_id, so_contr_num, so_buh_name) FROM stdin;
    public          postgres    false    232   ��       �          0    16394    type_equip_spr 
   TABLE DATA           C   COPY public.type_equip_spr (te_id, te_name, te_kat_id) FROM stdin;
    public          postgres    false    202   �       �          0    16405 	   units_spr 
   TABLE DATA           3   COPY public.units_spr (un_id, un_name) FROM stdin;
    public          postgres    false    203   >      �          0    16421    users 
   TABLE DATA           y   COPY public.users (us_id, us_login, us_pas, us_role, us_mol_id, us_dolsn, us_name, us_rt, us_rt_lt, us_date) FROM stdin;
    public          postgres    false    205   �      �          0    17091    zayavki 
   TABLE DATA           �   COPY public.zayavki (za_id, za_num, za_kat_id, za_type_id, za_marka_id, za_eq_id, za_txt, za_date, za_status, za_msg) FROM stdin;
    public          postgres    false    236   �      �           0    0    act_spr_ac_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.act_spr_ac_id_seq', 1, true);
          public          postgres    false    228                        0    0    equip_spr_eq_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.equip_spr_eq_id_seq', 19, true);
          public          postgres    false    219                       0    0    equip_traff_et_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.equip_traff_et_id_seq', 32, true);
          public          postgres    false    226                       0    0    filial_spr_fi_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.filial_spr_fi_id_seq', 4, true);
          public          postgres    false    217                       0    0    history_hy_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.history_hy_id_seq', 597, true);
          public          postgres    false    230                       0    0    kategor_spr_kat_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.kategor_spr_kat_id_seq', 3, true);
          public          postgres    false    216                       0    0    logbook_lb_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.logbook_lb_id_seq', 403, true);
          public          postgres    false    224                       0    0    marka_equip_spr_ma_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.marka_equip_spr_ma_id_seq', 6, true);
          public          postgres    false    213                       0    0    provider_spr_pr_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.provider_spr_pr_id_seq', 8, true);
          public          postgres    false    215                       0    0    relation_spr_re_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.relation_spr_re_id_seq', 6, true);
          public          postgres    false    221            	           0    0    storage_in_si_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.storage_in_si_id_seq', 15, true);
          public          postgres    false    233            
           0    0    storage_out_so_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.storage_out_so_id_seq', 14, true);
          public          postgres    false    231                       0    0    type_equip_spr_te_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.type_equip_spr_te_id_seq', 22, true);
          public          postgres    false    218                       0    0    units_spr_un_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.units_spr_un_id_seq', 11, true);
          public          postgres    false    214                       0    0    zayavki_za_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.zayavki_za_id_seq', 1, false);
          public          postgres    false    235            5           2606    16980    act_spr act_spr_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.act_spr
    ADD CONSTRAINT act_spr_pkey PRIMARY KEY (ac_id);
 >   ALTER TABLE ONLY public.act_spr DROP CONSTRAINT act_spr_pkey;
       public            postgres    false    229            -           2606    16904    balance balance_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.balance
    ADD CONSTRAINT balance_pkey PRIMARY KEY (bl_id);
 >   ALTER TABLE ONLY public.balance DROP CONSTRAINT balance_pkey;
       public            postgres    false    222            3           2606    16966    equip_traff equip_traff_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.equip_traff
    ADD CONSTRAINT equip_traff_pkey PRIMARY KEY (et_id);
 F   ALTER TABLE ONLY public.equip_traff DROP CONSTRAINT equip_traff_pkey;
       public            postgres    false    227            /           2606    17000    history history_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.history
    ADD CONSTRAINT history_pkey PRIMARY KEY (hy_id);
 >   ALTER TABLE ONLY public.history DROP CONSTRAINT history_pkey;
       public            postgres    false    223                       2606    17010    storage inv_num 
   CONSTRAINT     P   ALTER TABLE ONLY public.storage
    ADD CONSTRAINT inv_num UNIQUE (st_inv_num);
 9   ALTER TABLE ONLY public.storage DROP CONSTRAINT inv_num;
       public            postgres    false    210            1           2606    16958    logbook logbook_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.logbook
    ADD CONSTRAINT logbook_pkey PRIMARY KEY (lb_id);
 >   ALTER TABLE ONLY public.logbook DROP CONSTRAINT logbook_pkey;
       public            postgres    false    225                       2606    16457    equip_spr pk_equip_spr 
   CONSTRAINT     W   ALTER TABLE ONLY public.equip_spr
    ADD CONSTRAINT pk_equip_spr PRIMARY KEY (eq_id);
 @   ALTER TABLE ONLY public.equip_spr DROP CONSTRAINT pk_equip_spr;
       public            postgres    false    208                       2606    16806    filial_spr pk_filial_spr 
   CONSTRAINT     Y   ALTER TABLE ONLY public.filial_spr
    ADD CONSTRAINT pk_filial_spr PRIMARY KEY (fi_id);
 B   ALTER TABLE ONLY public.filial_spr DROP CONSTRAINT pk_filial_spr;
       public            postgres    false    206                       2606    16790    kategor_spr pk_kategor_spr 
   CONSTRAINT     \   ALTER TABLE ONLY public.kategor_spr
    ADD CONSTRAINT pk_kategor_spr PRIMARY KEY (kat_id);
 D   ALTER TABLE ONLY public.kategor_spr DROP CONSTRAINT pk_kategor_spr;
       public            postgres    false    204            )           2606    16535    marka_equip_spr pk_marka 
   CONSTRAINT     Y   ALTER TABLE ONLY public.marka_equip_spr
    ADD CONSTRAINT pk_marka PRIMARY KEY (ma_id);
 B   ALTER TABLE ONLY public.marka_equip_spr DROP CONSTRAINT pk_marka;
       public            postgres    false    212            +           2606    16864    mol_spr pk_mol_mo_id 
   CONSTRAINT     U   ALTER TABLE ONLY public.mol_spr
    ADD CONSTRAINT pk_mol_mo_id PRIMARY KEY (mo_id);
 >   ALTER TABLE ONLY public.mol_spr DROP CONSTRAINT pk_mol_mo_id;
       public            postgres    false    220                       2606    16780    otd_spr pk_otd_spr 
   CONSTRAINT     S   ALTER TABLE ONLY public.otd_spr
    ADD CONSTRAINT pk_otd_spr PRIMARY KEY (ot_id);
 <   ALTER TABLE ONLY public.otd_spr DROP CONSTRAINT pk_otd_spr;
       public            postgres    false    209                       2606    16449    provider_spr pk_provider_spr 
   CONSTRAINT     ]   ALTER TABLE ONLY public.provider_spr
    ADD CONSTRAINT pk_provider_spr PRIMARY KEY (pr_id);
 F   ALTER TABLE ONLY public.provider_spr DROP CONSTRAINT pk_provider_spr;
       public            postgres    false    207            %           2606    16831    relation_spr pk_relation_spr 
   CONSTRAINT     ]   ALTER TABLE ONLY public.relation_spr
    ADD CONSTRAINT pk_relation_spr PRIMARY KEY (re_id);
 F   ALTER TABLE ONLY public.relation_spr DROP CONSTRAINT pk_relation_spr;
       public            postgres    false    211            !           2606    16483    storage pk_storage 
   CONSTRAINT     S   ALTER TABLE ONLY public.storage
    ADD CONSTRAINT pk_storage PRIMARY KEY (st_id);
 <   ALTER TABLE ONLY public.storage DROP CONSTRAINT pk_storage;
       public            postgres    false    210                       2606    16815    type_equip_spr pk_type_equip 
   CONSTRAINT     ]   ALTER TABLE ONLY public.type_equip_spr
    ADD CONSTRAINT pk_type_equip PRIMARY KEY (te_id);
 F   ALTER TABLE ONLY public.type_equip_spr DROP CONSTRAINT pk_type_equip;
       public            postgres    false    202                       2606    16721    units_spr pk_units_spr 
   CONSTRAINT     W   ALTER TABLE ONLY public.units_spr
    ADD CONSTRAINT pk_units_spr PRIMARY KEY (un_id);
 @   ALTER TABLE ONLY public.units_spr DROP CONSTRAINT pk_units_spr;
       public            postgres    false    203                       2606    16425    users pk_users 
   CONSTRAINT     O   ALTER TABLE ONLY public.users
    ADD CONSTRAINT pk_users PRIMARY KEY (us_id);
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT pk_users;
       public            postgres    false    205            '           2606    16884 !   relation_spr relation_spr_re_unic 
   CONSTRAINT     _   ALTER TABLE ONLY public.relation_spr
    ADD CONSTRAINT relation_spr_re_unic UNIQUE (re_unic);
 K   ALTER TABLE ONLY public.relation_spr DROP CONSTRAINT relation_spr_re_unic;
       public            postgres    false    211            9           2606    17038    storage_in storage_in_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.storage_in
    ADD CONSTRAINT storage_in_pkey PRIMARY KEY (si_id);
 D   ALTER TABLE ONLY public.storage_in DROP CONSTRAINT storage_in_pkey;
       public            postgres    false    234            7           2606    17021    storage_out storage_out_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.storage_out
    ADD CONSTRAINT storage_out_pkey PRIMARY KEY (so_id);
 F   ALTER TABLE ONLY public.storage_out DROP CONSTRAINT storage_out_pkey;
       public            postgres    false    232            ;           2606    17099    zayavki zayavki_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.zayavki
    ADD CONSTRAINT zayavki_pkey PRIMARY KEY (za_id);
 >   ALTER TABLE ONLY public.zayavki DROP CONSTRAINT zayavki_pkey;
       public            postgres    false    236                       1259    16463    fki_fk_equips_type    INDEX     N   CREATE INDEX fki_fk_equips_type ON public.equip_spr USING btree (eq_type_id);
 &   DROP INDEX public.fki_fk_equips_type;
       public            postgres    false    208            "           1259    16873    fki_fk_relation-equip1    INDEX     V   CREATE INDEX "fki_fk_relation-equip1" ON public.relation_spr USING btree (re_id_osn);
 ,   DROP INDEX public."fki_fk_relation-equip1";
       public            postgres    false    211            #           1259    16879    fki_fk_relation-equip2    INDEX     V   CREATE INDEX "fki_fk_relation-equip2" ON public.relation_spr USING btree (re_id_dop);
 ,   DROP INDEX public."fki_fk_relation-equip2";
       public            postgres    false    211                       1259    16489    fki_fk_storage_equip    INDEX     L   CREATE INDEX fki_fk_storage_equip ON public.storage USING btree (st_eq_id);
 (   DROP INDEX public.fki_fk_storage_equip;
       public            postgres    false    210                       1259    17053    fki_fk_storage_provider    INDEX     O   CREATE INDEX fki_fk_storage_provider ON public.storage USING btree (st_pr_id);
 +   DROP INDEX public.fki_fk_storage_provider;
       public            postgres    false    210                       1259    17070    fki_fk_storage_units    INDEX     L   CREATE INDEX fki_fk_storage_units ON public.storage USING btree (st_un_id);
 (   DROP INDEX public.fki_fk_storage_units;
       public            postgres    false    210            	           1259    17008    fki_type_eq_kat_spr    INDEX     S   CREATE INDEX fki_type_eq_kat_spr ON public.type_equip_spr USING btree (te_kat_id);
 '   DROP INDEX public.fki_type_eq_kat_spr;
       public            postgres    false    202            J           2620    17739    balance balance_delete_row    TRIGGER     |   CREATE TRIGGER balance_delete_row AFTER UPDATE ON public.balance FOR EACH ROW EXECUTE FUNCTION public.balance_delete_row();
 3   DROP TRIGGER balance_delete_row ON public.balance;
       public          postgres    false    222    261            I           2620    16937    balance balance_gen_bl_id    TRIGGER     {   CREATE TRIGGER balance_gen_bl_id BEFORE INSERT ON public.balance FOR EACH ROW EXECUTE FUNCTION public.balance_gen_bl_id();
 2   DROP TRIGGER balance_gen_bl_id ON public.balance;
       public          postgres    false    222    259            M           2620    16972     equip_traff equip_traff_date_gen    TRIGGER     |   CREATE TRIGGER equip_traff_date_gen BEFORE INSERT ON public.equip_traff FOR EACH ROW EXECUTE FUNCTION public.equip_traff();
 9   DROP TRIGGER equip_traff_date_gen ON public.equip_traff;
       public          postgres    false    227    241            E           2620    16886    storage gen_st_id    TRIGGER     s   CREATE TRIGGER gen_st_id BEFORE INSERT ON public.storage FOR EACH ROW EXECUTE FUNCTION public.storage_gen_st_id();
 *   DROP TRIGGER gen_st_id ON public.storage;
       public          postgres    false    210    239            G           2620    16882    relation_spr gen_unic    TRIGGER     �   CREATE TRIGGER gen_unic BEFORE INSERT ON public.relation_spr FOR EACH ROW EXECUTE FUNCTION public.relation_spr_gen_id_re_unic();
 .   DROP TRIGGER gen_unic ON public.relation_spr;
       public          postgres    false    238    211            K           2620    17002    history hyst_date_gen    TRIGGER     v   CREATE TRIGGER hyst_date_gen BEFORE INSERT ON public.history FOR EACH ROW EXECUTE FUNCTION public.hystory_date_gen();
 .   DROP TRIGGER hyst_date_gen ON public.history;
       public          postgres    false    243    223            L           2620    16989    logbook logbook_gen_date    TRIGGER     y   CREATE TRIGGER logbook_gen_date BEFORE INSERT ON public.logbook FOR EACH ROW EXECUTE FUNCTION public.logbook_gen_data();
 1   DROP TRIGGER logbook_gen_date ON public.logbook;
       public          postgres    false    242    225            H           2620    17454    mol_spr mol_id_gen    TRIGGER     m   CREATE TRIGGER mol_id_gen BEFORE INSERT ON public.mol_spr FOR EACH ROW EXECUTE FUNCTION public.mol_id_gen();
 +   DROP TRIGGER mol_id_gen ON public.mol_spr;
       public          postgres    false    220    237            D           2620    17452    otd_spr otd_id_gen    TRIGGER     m   CREATE TRIGGER otd_id_gen BEFORE INSERT ON public.otd_spr FOR EACH ROW EXECUTE FUNCTION public.otd_id_gen();
 +   DROP TRIGGER otd_id_gen ON public.otd_spr;
       public          postgres    false    260    209            F           2620    16940    storage storage_delete_rows    TRIGGER     ~   CREATE TRIGGER storage_delete_rows AFTER UPDATE ON public.storage FOR EACH ROW EXECUTE FUNCTION public.storage_delete_rows();
 4   DROP TRIGGER storage_delete_rows ON public.storage;
       public          postgres    false    240    210            O           2620    17041    storage_in storage_in_date_gen    TRIGGER     �   CREATE TRIGGER storage_in_date_gen BEFORE INSERT ON public.storage_in FOR EACH ROW EXECUTE FUNCTION public.storage_in_date_gen();
 7   DROP TRIGGER storage_in_date_gen ON public.storage_in;
       public          postgres    false    245    234            N           2620    17023     storage_out storage_out_date_gen    TRIGGER     �   CREATE TRIGGER storage_out_date_gen BEFORE INSERT ON public.storage_out FOR EACH ROW EXECUTE FUNCTION public.storage_out_date();
 9   DROP TRIGGER storage_out_date_gen ON public.storage_out;
       public          postgres    false    232    244            C           2620    17088    users users_id_date gen    TRIGGER     {   CREATE TRIGGER "users_id_date gen" BEFORE INSERT ON public.users FOR EACH ROW EXECUTE FUNCTION public.users_gen_id_date();
 2   DROP TRIGGER "users_id_date gen" ON public.users;
       public          postgres    false    258    205            =           2606    16816    equip_spr fk_equips_type    FK CONSTRAINT     �   ALTER TABLE ONLY public.equip_spr
    ADD CONSTRAINT fk_equips_type FOREIGN KEY (eq_type_id) REFERENCES public.type_equip_spr(te_id) NOT VALID;
 B   ALTER TABLE ONLY public.equip_spr DROP CONSTRAINT fk_equips_type;
       public          postgres    false    208    2827    202            A           2606    16868    relation_spr fk_relation-equip1    FK CONSTRAINT     �   ALTER TABLE ONLY public.relation_spr
    ADD CONSTRAINT "fk_relation-equip1" FOREIGN KEY (re_id_osn) REFERENCES public.equip_spr(eq_id) NOT VALID;
 K   ALTER TABLE ONLY public.relation_spr DROP CONSTRAINT "fk_relation-equip1";
       public          postgres    false    2840    208    211            B           2606    16874    relation_spr fk_relation-equip2    FK CONSTRAINT     �   ALTER TABLE ONLY public.relation_spr
    ADD CONSTRAINT "fk_relation-equip2" FOREIGN KEY (re_id_dop) REFERENCES public.equip_spr(eq_id) NOT VALID;
 K   ALTER TABLE ONLY public.relation_spr DROP CONSTRAINT "fk_relation-equip2";
       public          postgres    false    2840    208    211            >           2606    16484    storage fk_storage_equip    FK CONSTRAINT     �   ALTER TABLE ONLY public.storage
    ADD CONSTRAINT fk_storage_equip FOREIGN KEY (st_eq_id) REFERENCES public.equip_spr(eq_id) NOT VALID;
 B   ALTER TABLE ONLY public.storage DROP CONSTRAINT fk_storage_equip;
       public          postgres    false    2840    208    210            ?           2606    17054    storage fk_storage_provider    FK CONSTRAINT     �   ALTER TABLE ONLY public.storage
    ADD CONSTRAINT fk_storage_provider FOREIGN KEY (st_pr_id) REFERENCES public.provider_spr(pr_id) NOT VALID;
 E   ALTER TABLE ONLY public.storage DROP CONSTRAINT fk_storage_provider;
       public          postgres    false    207    2837    210            @           2606    17071    storage fk_storage_units    FK CONSTRAINT     �   ALTER TABLE ONLY public.storage
    ADD CONSTRAINT fk_storage_units FOREIGN KEY (st_un_id) REFERENCES public.units_spr(un_id) NOT VALID;
 B   ALTER TABLE ONLY public.storage DROP CONSTRAINT fk_storage_units;
       public          postgres    false    210    2829    203            <           2606    17003    type_equip_spr type_eq_kat_spr    FK CONSTRAINT     �   ALTER TABLE ONLY public.type_equip_spr
    ADD CONSTRAINT type_eq_kat_spr FOREIGN KEY (te_kat_id) REFERENCES public.kategor_spr(kat_id) NOT VALID;
 H   ALTER TABLE ONLY public.type_equip_spr DROP CONSTRAINT type_eq_kat_spr;
       public          postgres    false    2831    202    204            �   -   x�3�44�52�2Ӧ\�`ڜ�L[r��hcC.30m����� �:&      �   �  x���Kn�0���)�/L̋��
��ƀP�@���{��^�Y�:R�ԣ�"����?C����  8��OJȅ�G��'����A���#e�GPC�F�@�`�]/�@A��"5�e���ս�xy����x]���#�VKĐC�=��EB,Lҁ�"���^k��ъ��d�P�J[>S���'٧�0ݑp%�Ag,#!�1��OR�R��hu�IR-SBݗisBp���Gԭ�Ie�I�
5/)m�^���T��yb�Fj{�>����z�õ���c1���$�U�j�3�]'>�{���fAX1>F���>�Tb�/�qy�v;�����J�W��&}ضBlWg�c��9����_��is^bӇ����1�w��q�>㜶�Y%h��,^�r��2������c��#�a	R�|��L7��ܒ�6��� �P�f��_���\5�y�)e�O�������6���,_��2��rla�W5�5
���s��X�� �~���qX      �   �   x�U�=n�0�g��
Q?v3����C�h�.����:��� �h�lEz�F��,%���W�����c����Vm��z0����s���je|a�$tr�_��j����l���������O�AH��m�!Ɗ6H�	B݄�T3���)ŔEMw"f��r.Y4OZ����˦ʖ�A�V!3��̱˩Sd*�-Z�����:4!��x�_���!�'��^��ŗ��s��z����U�      �   �  x���=��0�N1�kT�/����C'���B���:pQC�U��'.�~�Y�`o�b��S1��?��G�^`���\Y���6�%�<lK%L����N�E�IU��!+�cq֦u��!�������i�V��I��f*x,���Q� �`U5	1�]Ceˮ̍��	\zېx��A�l	�q��=�Hc�"<N��p�t(��bq@-�ȎN��x�z4�+�0b�#�c��Y�N
19	ɾ��
��G)6�&�4{>��R
|��+�$ɠ�i���EW�B�Z( �T��ыCE����Td]ݛ�߰)�-�d�Ƨ��l�.�E0W���f�_��˄Og�=�I*����>�)Z���q�=q�#�g����x��U���5B�r\IF��2c��)�}Ar���+�����\5'W��0�ϲ�"l�/�zcW�J�Ap��j��,Q܂8[�،+b(m�xlƩ⮡̥7~X �͸��G����U\�Zb�x�i]׿L�:W      �   C   x�3�0�¾�/츰L��6pp^Xx���m@�}@���8/L���b�vr��qqq I�&�      �      x��]��d�Q]�<��W��?�n$��,�қA�l�,[~���	��HF#Y�+|�FDܺ�Vխʬ�ʪ��5Ӳ��D��<'"222��g< 1ʏ���}�_#��ۿ��?=|���~����O���!����wc�2�7��&��b������?�������������y���O���_�C�y���b� �s3�寊3f�)sʇ���",ڰ���UvPLo!M����C�CS9��\S���&�����f|�i�8����3>{�����`�*����YL�1:�'�=Vy��%Tho�Vxh�������`.f؃�7�)���Y�x��۠���@ٳ^ZXh�Jw��3��
�,���5&�F@*�@�k�4�0Y����5�(V��c�����y��`Eht�e,���3��lX�Xڃ��	jJ�`�Чuq�m,1S�cܒ����e��3�4�>aL&,��G*e�o!���Z-#�Mg4�@�1~�;�Jyʲlk�#��w�bz�d�>%>$�ޗ�E��)D�l}�p/���V�7@�|҇|�K>�:*s�`�+��	���M�T�� �芜p�(J��-��!�f�8��&�,U ��C�{�*�S�T-�bܓ:I�S�-��c�=�RT?��D�G.�j�1�ٓ:��ǩFfӷd���a��ib��r`q�(�C��=��pS��D�ju�;-060��C��
)�*}�qA�!�!܃������-����c����+PS�0Ք6}�qn����V@K^� <\�z#�s�$�~�ML�Z+2M���I�&�K7q�H� ���sc���q�j6x;�@��z�<��b <~���ߠ���G�<0,�� ���G��@�L�V�a%ݖ,�]z���$1�!�NI�{�r��b���F�!���B�T-P�j�!�i`�`�t�6�c|Ie��6��҆D��B;nA=�b��J����A;0Lo\&�2�J��{5�R��2�:�2��Ɍ��|�ɚ-�I%q/������������F0����Gճ�ϢR�j��SJT������k��fgS�졒�ۇ�,R�0�B�A\��+��H��F�9trV�`�k,���i�C'�T���(�+?�-;NO���I��/�����?��g�����o�����������_�^~��.�ӯs{D�Fĵ���n��O����%b��߮���������^������6N	/7��E�$n�y����R֌�D�#�«Š2/�!C��:a �OO/74
��fJ򈡼�[�+�d�8�#v�C��H����_}uf�g�qߞ�e��H�J�&vۓ7��8m�7�t�k�IZe5�ڧ��O�M*]�T����:ڐ�:bO�7E.��'ʢ#&U]?�Ibй=b�'�=��IBHYE5޳G�Q�R�YB�\��a��U�� ��B�C8�7�F��e��ќx� ���I�\�$˙K1����OZI�שT��ts[����c+��$�G�q������rk9u��Յ�'2���Ղ���:k�@�
%��B��p��G?��J:����#�D��O4'g�#�C��Q�2h΀�;6d�)���9_}��=d���#0���/Q]Y�2�H����5s���}#?�k������̜K��tʣn��~���\���U�N�P<�����}#�4W�4!	ц���z���+�xQ|�|<����c�$ �d���?��۠ABܢ�lS�<��P7��MU���6�0h�x���f8�S�Iʯ�!�q����0��/Cyc�ES��2u7_�53 v���a��ѾaCx���Q��hNUJ�*�1s�i^�����)'44ʲ�A���z���`�Ge� ���^Y�%B�
�@=-0�����G���M?�[LS%>���1Q��x���7a�O�1G�6سc'&��F�y괢J�P%ʦbC�Y���z���=}�Klw�����8b�E�E��V�]&�K��C��eX~���~�×��/����� �:�TK�d[��I�Z�".*ڼ'��|�嗽!{w,(sB)ל�;�<e�U՞���q���AZD��,���� \�Tls��S� E�:,�y�;g`FX|�|GMW�{yy�ױ��2pPm$�Lƅ��8j.EkYA6��-��*�x��sH����m�>��h�BGʸ���|���tDd֍BʕG�`z6߱�m4c1������<;b�L�4�G�S"�B��Ћɲ�ڛ<��6��b�]{�q�N�-��O�y�B6Z!z�,	ψI�$�I�r���$;����^nҜ�E���7)�I\d-!&�HRy�Ii��Q�R��@��&�N��(�1(������R�l�%��5	u�1N����/fo��M0�*Q�Ѥ���K���eS,�q謆_L�GK�%��_L�W���b��FW�R况�,|وT�������Ę_��8̦)e��r�9}6I�!����@Ӌ9]L�/*���KWUNC�jäy���՜�@�w�W�ʢ���;=��ϒF/�$NFbL/�jF�H�F�K+WC/R:�C(
�Ӌ��R�&.ƍ�r���'a�Dmz1��^j���×��8��$���d��C~1���|N6	�h���bǜ��D�T�j[��Ŏ9�w�X�&ɖ�/f��$J:KK�}�^��4׾ŉ���=p-՜v��-�/fo��<��2�q�^�ޤ�{A����K婞�Y�DJ��͂zU��,I� f!���:����I�CFmP���$n��d��Ԫ�&�6j*��T��_S�8jꋩ=�͝��jS^I������N`<�.Oe�x�pnб'g���/éq�Si�m��s�g�S9�m��x�[����Tw�	�<5�2nO}�#ް'ORȖ�S��w��F{��?����t�{�MH��y*C?����g�=��b���l����{>��=�|?��Ѭ���CF{>����|?��� ~�1�v�3{>��s0��A�l����\��|?����̞����;~�=�ϵ�N#��=�c��^����1�l��c�Y��P�ď�g���"Ms>����f�ǰ3d��ug�|;��yeƚ���!��B������ƣIqn�Pӱ�W�MB=����tF���ƣI��ݥ�b;#=[L����Z���Eۂ�����c'��u~;���s�kxm
���S:_����?����ߩ2����T���7�9�wG#B��k�5ŋ�]xZ��:��7�����ۃ���-�+Pݣ�h[|�je=���!Ǹ6к�7w��ފ<HɊ��`�o�o�>^��ww�Y���i"̗5u]ܵ���Z��2����o>}��Oz�Y~͍���'�j��\��o���XL�z�|�.e� ��u��2L���/�2aֹ�׮�L&h7$:ͯU+�Ӕ)]�vQ�c�:T��g#�¢��g���%O�G������.iY���r'Ȃ������������3dM������t8:��r�6��wo�i�����^������)UΝ��$u��r�v.ڮޅ҄u'�ݠ�v`���!�i�(���O�(H�۟�#�\�XEb�ݏ�`���`� ��Z�S��i�+�罡&V�a9^��C�aͷr�cPf��E�<�T�i�A�;���{}�	��JF�{�A�Q�@��	6VQb9���Xe��&���V�)#-o��_���u�#��d����	t�)���<�2��R�r�	-���TUh1��P��u����RX��4O�1���0����U��z)ăX����`�lE�;�P��l�,C[�>Y�,̽h��EFw���
p�׭�?�FPٝ�0�7��{�6f�=�>c� ��đl�!����S�,�Q{�J�^2����IXki@�bˣkBnC�Rk����,�^���b�;�h�����sٸ�y�(hb���mX��HF�������?A�^��ǚ���J:������1��q|"��F��d���P,��<�9�5�)F�>��a�X�	�60�v��!�3(�qc �  ����c7�����z���l�_'�Zʝ�bۼ�[n͌�9Լ�fR��!<v���w߉-��vÔ۩�3Cd���	w��'�:�8��,�͈g7aC������a�߾	�"��Z �a��A��7�Rǫ&lG8�^/��4ǃw��ἀ�n�t&t�mC�z�!���Cm0n��	��(Sp��#j$���K1^q�CˊI]̣s�|���HO�`���/M�D��6���H[�lCm;4�ߦ�G;^ͩ�E���qO+��n-�����oC������Ck;7��h��D������d`h#��p�Vg���0݆֡�Ck�67�F;4բ:Ք���Ԃ�~��&_�!�3w�06]ѳ�|�]�|�%�z���~�r��$n��\�c~�)�(,�{~Cc���xH<���/I:�A���<��d}w2wnDlX�w=�J�i�B��B���b]��x��\��`��m_���'��{urc�x��A�+;L��)q-=�E�y��v÷�{�V��M�T>I1�x:9w��1B�Ӱs���:��������>�qƳE��oLz0�2��Y��KT�.Q�g�00S���;q53^�h,T��yM�����&z�|<T�X�a�������F��L���f��46��%��|t�5pZLu�ˑkm�4R��k��ǃ�Ў���!^s�lv�z	ݍC;��~uS�ܡ�V� Xg;�u8�ݗ]Wc����@�7	o&��pZ��s�<��3��Sm7�����	邯�և<�%j���AC��^���2h�,����`��qY����]U����J�%#���l��~I�C�q��I�j�ȣ�ط�	q�tG}~� Z�$>o�e-�����b���\�~�K�ۋN5GL�=�xF�A�K�>ZO$���-��$�������ho�_���|r}�6Z͹t�(}?�h�K[�M�]���w��^�H�'߆���~��C�����Q�s���T%ĩ�Z{Xb��XF~~Z�R�q^3)A�/�O��Mq;�b��I����|WG9K��Y�r*��	�y�Rۧ�7�μx:�A���I�;g=�����M�0��Dd�}罾�\PD����C#�hɆV=��[��m�*[1D�K���`ܫi>i��� �`v������X-.�
6��5�i,�c����2a�=���Faϑ<~(Y7*����ѭ����z��y��bV�L��ط��;�v~p��=˦͜l:�@�t�3��j���C�O���ٓM�9�Yo�=}L��6���~��:F6�?r 0�}Fa�CP��z���6�n�_���#��pf	��5�6�_�%�hP�Rm�fuRJ�0��D���*��q�kJ2Ԛ`�l�6ZĄ��op�A��%�m�ū�^����b���z��Ĩs��e➟��	���#֕�}`g���Ϡ�:C���Fc��M��%�o�����-���d���d9���}��~��E9��������,^��Iz~�PL��_�#�=IϷ��D�-���,`�'?%]ˁ���h����F�i����	Z��FS"���䧔=Z�ܦ|��v6���JK�EY���֐��m��*�j(O&�ݢޔ�Y��R�h��$Tq%��4�X,����v3�z�>���k�z {��6=phl["�|�"4/j5h�)�����g��W�/�=F��[6�4#���iF[��S�Q�ݑ���Y3�Lg�)�X�}:ބK�zi���}��c�H9�8K�2�a�}�#�Ǹ�ܻ��BnwNy�A�~$~UT�~:R/�� ����ث�&�Am���6�����˨;ݼ+�
Zx��~��Bt߳;��W�	��3[���7�Q̌Ć�{�zHM�J��MNR{le5_dMb�Z�h�VWr)�s~%g��il?��v�-W5$�<��ɨ׮�UY� Kb�Qaג�`� B����M���l��pp����0q�(3���͇�'Ě!��hn>VK7��
z��ҝ�ߠᯄǹ��ޏ�*������6�.��O�'�E�ڠ�ժ�w-��z+�.uofrp�0ZF��J�����M��f��W"[xF�uݭn�^4�,x��谏/��:e�!�Ԥ	'�B�<`�sݜm�D���Mf}�/Uֳ��e�Wf1���j�q��g�N�"�:d�@���y{I�a�%u���>R�>����6U��T�u�1*{o���`��'jϩƨ0x������kj�;�N�����
.ؕO��X�&��R���w{�v,ʩ1T�$��.���5c�v6L�1���ї
h�h�K}���
���њK��3Y��#�^�{�$�ؤ"N��Σ�ݔ�]vh�qI���)��T��WMx�WI\õ襖l<�򎮉g:���K�ּן�F�s��p?���^O��^��M�~ð�y�s�zG&��O�
^�%6[�WM�\�:*x��wɦ?���@���Pͫ���\�}4��?�#�IE�u�=�#��i�gB�G�+��uiKB�cI��pM�6��(�.�5!bgB����˼ ��>I"��yW�R���h��a�9�дA��sr8+����	WL9�N� ��Z/���:L=����q�vx���T���;��	���W�Ǟk!�>DW���5w�Zش���%�Ɗ�s��=��{F�}�anvU3®��m��]�T�p�1���p�W�Oh>w�^caз?�� GᲳ!�@�B��Ӡ�3�j��M	b��sC_�f{%����b�Y�ñ�z뚚x���Ow�6�5;%��>;%�A�x���Mx�'z�d�mI�=�R�%j�߭͆� Z��WL��y7�~�hm����Wb�d��wi��C:A�GW� ��̈́5�؄W�'1q��E_� �un+�B������:�v��=�:�'���G�8Jw \Uj���#�8����ۘ�R�-�qEw}���#dKe�g=��<X��wa����f�UVV1��X�/�ETW�&���W�s܋k��c%����3�i�Ւ����;����6��O0�Z]6Ѫ	�؍�)��A���nd7U՘��Wu4�m��8�a�����hh�B�W��AI/Y�/�Tq������j	U��Z��yzc�J�Ի����/.���?��uHT-B�ʅ��؄���&Qu��4E��"�u˶):�&:.߫�9ɦ9�ƙ��������:����K��%W���xw�]�|�@��'1D>_��5�n����3��aeI}���͜�7:x�{s�}�3͏�j1y����ǡ����-M9W� ��lzS܊M�|g��^`f��?U=�yq[x����"������GA��W*u⪭P��2c��-�'�	$�-&	��CMg[�ꮇ�q�EXe?:�D����X��s=�FKﭡ�u���gR��$ns�Y��Q�&X�wI@4��l(Yr>�Xa����ݦ���U�(��ଁc��'����rG��č�+6��{ͨo��yYr;���P0��I���^	�'B�W|yc*>Q���O��,��jg��-����"mUU����xF���:B5FH������0O9�����[Ui+��Ad�b���йZr_]7��K�4���9�}�6zJ)�`9v��{ؠ��.8�2��@�`���%��@=���� ��!_Q���B���q��0�.y��CFf�
����H��F�{�7w6�n�'5Z��?�?)�U2�D���F��'��[�x(�}�u{;ơ���5.v��tOl���$I�oy݋M��<�=q��z'�G�;>C����Tr���}&tL�)z���'��/�o�q�=ִɝ#��Q�`R��	���T6ל���i�&^
��6r=�
�OsG_Co�7��W�xb�hxp����5�fӣ���6DC���A�ҥ��˪k�>O�)݉P�H�R��}�����?����?}����߾�j������l��6���	�W�y9P8������~�uT��^
:�5%2�^�t��/�H�j�      �   T   x����  k~
'0�<4`b�Ā�AW��ȷ���&G�@���N4��R��d��q��k��(�4��W7K��dE�I�1'      �      x��ˮ$�q��ͧ8{C��[^j��J�W4�6d0e�KIm�0���-B(��3���3��眎����tMUgu@	#�����2�̌����w\���O@#��np���8:�y����7?�����篟��:�>������秧����'o~����ο{:���՛��������?�ۿx������|B��t������߿>��0>  �ׯ�����N����V?�|/=��G�1�L����9�����U	���S���������7?~��7?����Ͽ}��>��/~�����{"y�����GV#���������M�j����2r�7���|�A|x����
|:�A����5H_أ��r��K�T��#��0z�`A����l�s�@��=��ms���Gy3ڒm��L�)H>-�ׄ� B���A�>H�1�ѹ!x�Ç�5��S�g��PBN�ɓ\ާ�|A�׾����$~����'z+zv�}��_L��*;���e����x��+�ML���Ԓ��Үe�sZw,Y;�����.�=��}}#?����t�]鶼��<��$x���tcS7k�i�8 ����w�M�q"�y�aBM�z��jK;�x�N���[O�W�~W�-�huOKd���*b�	1i10R|`^aQ�N�}K7�\r���>Ç�m>�\"\�RJ�޺��Є�Z��^bI҆���:�]uG�[Z��>|���j��!�-g���9I�Nl�nq��my�̖2Ε�ɆF�O�9�$���l0v-�6���8;�0�Ƌ@�Z��nr�֍�)З�v��#@��{ELsm���Ȉ<p�8�5�*&���bHJ�����ij����I�r�d[ܬe����"o��\���݂����#���i�%�|y���i�~�Ӯy���O���q�P����Ճ8�<�sF���!�l���υ����~�O�(�����e�7���yZ(g�4����G�P�tJ��\2Q����?X��򅱻����$!���D�j�e���$c5Jt1�C�@�(oO��qO]\p����	�ǻ��<v���R��˩ ���6\q�I��$b��hS.=ɤwV�xѼI�Ը�eLzv��?k.���>��/ɮΗ4n�q�97�����̼�C�S�@�܎�jÍ��a��`5֡@y	(b��OvUc���?��#u(8B������Tc��C��i��_cm~�X\5��L&�O9��1����:��A#�C°������F��"Y�i�� �c*�N��TX�K}�j!RF�P����J��p#�Hq�*�nQR�S�JI$�sZi�@=ˀX%����Z㤞$�k%2R�bx�]����B�:_=������p!j%9���Է�J�eU���Fxt�ᑗݍ����B=��M�(�$Cp�k�z�A�B�a��*^�^ˈz�B���R=_w���}��S'�2�d��h�+�;�gpd$�EN�DD�����z�[!X�s�妖��X��^���Q`py-0�nܙ+-l�(!�eM�8��U-lij!<m�:���Tt���;�K��sym�Ӂv�)�nX�k �:� )�߫�����Š��to7���Fv��1j T�4)/i�^�f���1�h��D�W���B�^�ԝ3i��;�1]����֙�u.�	�0�C\i	Nu�K��B,���I�J�	Z8��~��3D|[Oy%��K��a)8� �8�����I'`�Ń{)�lVRR�|�3�������DO��G:�Q�L��J����)�]���R����z� �.���CN}n���DSO����@�6�zN}��t�zeR����s�z�a��Ჷ��W�������K�@J~��F%�����F���<�rrC�Ǣ�8drH)%���qܧN��nD4�Px��0��zғ[?Bٴ�D��8���v���t0ad"'Z�J���S�:��Tல��K�0I	!?J /J����c��iu�慕���-[	�0��o����e�B9��� �lI;��<cO���u�W���v�������uo���ӦG��KO��5k�Z�fCVW^=D�|�0��#k]2	���p�����/R���*��aD�fuw�Sʼ)\�W輤� �okƏ������;>���������;�;J�{}�.<7��\�.g�e���pj�=�gCin�B=�l����o���'v���J���ďu�/�T^���Qz��z;���SӉv�X�}�V=J3`c);J�l�����9J/�^K�̀�����K��6��0M^l�`��xn[`���C#Vh�RZ�+�����]k��@��
��wFÌ2-�DCOdZ��0�`ءaz��0� �{��D�O�ƴd��0�vdT����3*.tb�����bB�Jr��c!��p�*~q�-;�m�],><����n��&��f�)�%�����-��H�\�����i��f�V҈�Z)�߰W�z��٩��[�ixZ�%��h؁j��L#��N�l��# �ư�����}[/ĦYgcC.!"?j��)�2���	Q�t��t�/m��o=�9��e�i ^�KvLÌ�F��4��Ҡ���^�,�=� �KW�Z��h8����wFþ'�^i�!ih#x$f�Ж1�@ء_�"i{���D��#Ѱ/�1�3:$cDDCO��P?���at� ���g���3�ˡ�,��ƈ�4�h���F< ;4���OAk|	k0�9����Î�C���ƅ�,�v`�G�!��G�t��{cBg� 4��:ш��g�P1���a�ƭ	����!%�C�ۡ����@qp.��\�G��,Ѐ�0���0dD7�e\�0��V!,��a_��@#��yQ��^3JshDgi���Ni4K#,����c_�lL��J��0��e��	OM����?�C�h�L���UW���Ɇ��O͢�h���ꟛŋ�b�'xH}f�0�ُ{�Ѭk��@O4��h�%}h�@�4zM����d�h(_V�ث�j�&cD/4R��h��3':��u��M�8љF���Vak2F4LU��)��,lMƈ^h�N�kj�r&�DM�8љF�n#5
[�#���	;��O��Vtƈ^hP�{�U��I|��q�3�N�hj����F�4��!��Ǜ��UيNљF�а/�v�Ǧ������6���`���~�e۫ǫ��U܊/�_��Fr[ްz�]�>��?�د!5i�[�@C�� 0�]Nv����F̳� !�Z��F�&��4"DץnU�"��i�iC`�`ء����h�N/�VM.B�Ӑ�W����hر��Lû�0ӆ6�G�a�j#*\���s��.'�VM.�v�Wr vlh'z��{��
�D�4�h�I��WmC*%��`�a��[�����a_�Dg�4�=3m#�ʧ� RL�6vO�JCDc/�Ib��[s���v�(�Wwc/�h��4�|k���@CI�h��г4�������3�|j]@@�:��Yؗ�d�EX`�ݳ0�ET( G�!H$�o�9ϝM���`����=�KX�+> ;6��LÕ;:)�g��R�uc	Y�+�R�;ϭ;:�ځ^i�C���H4t�emB�Wx3����i�=khZ`�ҕ,vx^uþ&ڇ^a�ahz�A���S�ܺP*w0D�~�Oк�u1���$�.���A4b�G�
��5X��?�&���,ڳ��i��}O�<$�p`fڈ
��2q�F�C�W�%�i��q����^�+< ��x�C�0� 0�и��<U�������-�것����}�f-[��]� ��W ���q/u٥Z{�WFɶ���J�6�������=�`$���#����"��Y�w;�螅v���P�!JӖ7`���U�`r�E6B��>⫲M.̲������y�uj�Z&m�F���W�gh��?x�fJ0M/�H~����c�wc�,d?5�����=;�+~�0b�PM0B�0���� f  ��O���v�,��g�X���G{٬<�ƨ��3��?3e�GrCH1��Y4k���3��?���yd�N0�sy6���2���,``q�a��R[����i�h��$U�DI�bA'$]�p6��Rł�B+���vF�H U,�C��͝�Ip����� �LD�=KγF@��P9�l��{���?�S4��q�it2�˖��R��y���}�� p6xU4�tg�L]�]<_�A�����6���a�r��wؾ&�h�}'g��F�4z���V�lr�@��q�3���ki�`�YC�ct��Ѕ>�V��"r�?_hp��_�Eþ'a��F<03m$��"��0%�VStRy1=j�fH�O��1�a7!�F�!���(�i�j�H}�-&	]�*�� I}���q��E�YR4t~c��/����nK`|�C��a_c��������=h�9�a�a�үn�	��nU;x�푷�`��m���˺���-ό��V���`�lD�w���и%	�bز�k9[lU�_3�N��my��;��Ү�r�n� eD7�`ܲog��:h$4�l�v���&�vdn(�nc��2i��ît[�&�����p�����M&�̺��t[�&��R���E��H&�̺1+ߏn��,}�H<pD�������|9떝����|����},b�K}�I�.)�l����i|֙-��O��H��釄�5-��v��=��*\���0e�ޏ��i:�+�A.͋���vm��Xg��[G�M�~t[�:cO3��/�m3l镕)�u�-;׭3r�؝�ȸ�n~��uƺ��;�}���X>*���1HUP�J������K�^�_�	S}��i�C�������ͳF�C$�|%ŕ��5�^�AG�a_Y����wm�u��8��4,M�0�s=�T�k�q�;������h7z�!G��==mxmF%��B�7 �\���LC\�𖗢a_�F�4�4�����a�mEKψ4�ľËM��]���F8 ��h'z�IC;�#�0��#�\*�!K�.	.n�ŗo~v����os�C�v���  =+y���|�Gq�GI���f�ڭ9H^����8 �kۙ�N�'�/:��F��3���4���H���M|R�<��껨�R��x�Kw�iAA�X�Y�,�}��o�)�O�e{-;�Zr�s��z�.�)ܡ�;����U
��;*�嫧PJ����*�!h�NZu�~��▅Y'.��N���߀C�~���5T�VF��HL>�mU/���:F��N���C��I�F,CDR�`[���(>.�u����y�����l['H�B�B�6�ڬ~a��:A^e�]�ְuzD)w�)�kc��T/��[�ǋlvY��!�C����#��� y2�[��ܸG�a'� g�y��'�/a�:Ab(�8:q[:(nܛ+�u��ʦ]�V#;��j�"�����.���br�a�-���ɻ���&Cǲ�|�1�����M6�D�H��O�g�&��ңF�����K�b�|��1{��&�{��z[kiN�,��%�?���1�}ˢhYn+_�þ\LN9�n�p��u�Mu�>/~6~���[���O>���!      �   /   x�3���2����K/.���2�tN��f�%��%i�E��\1z\\\ �De      �   f   x�M̡�0�a}7\h��a@a��Qt��3�nD�
�̟�5�'|�+L'd�f��#���Y�%lx���	��:�.d�%��M��u��f� �LA      �   A   x�3估���/6\�d�sq^X�l���.6]�wa7C$8/L����b�=... ��$M      �   9   x�3�,I-.1�2�&\fP�9g	pYpsr:g�d�d�esp��s��qqq ��      �   i   x����0��0Ei;V�D'�����EQ�5��ji󀋯[SK]M�ά2�zXb���Af��� ��Q'H����]�}so�bh%�	���q����?�"l      �   `  x���Kn�0���)|���C��@�.
��l�Q��I�Ed��-�u/Ѭ{	�C���t 2cF���?�e�Q /e�e�2�9�H�����
���JK�^+����r����]�J�@TN��M�����V����m�Lr�^�d7Hq�A�!r&��4q)sE+�`y���͉m�l#K;6%�:�+��ߛ:�#�=��`[!h��a�kTHN�d�O~���^�ʒ.�:<õً�j��0�zY�{��T�S�����a����:�%F{�%�����$U�q�Y�A�����\�g�P*ۗ��ܻf�>�����`I��l+"$g�$zz��:�֟���o�U\V��C�ס�]_�ЎmX9��e+��*���A*Y��l�^^m��m�N�l��n��U�4�Az��6jF�6�A��\i�n��j��o"6vpg�d�������_�p,���V>���N�.�m�SGXR�A,��������͘�qDT���-�Ɂk�S�hf#]��̺\2
m��h �7̆eZh@O~ƅk�H4��<Ś
�&BfX�.�c][�r��6!QigC���&h����Gl?0d#I��Bڃi6(^<(%0� �����Ċ\V{%�R6���
	ĉ�ӻhn�r�Z�;�I�!^C�4L�2&�i�̩8B�y�l=:�7y��_����
�\>�f�4��a��R�4����.�El�t:Ky~�ϸ��R?��t�|���s��0�O~i�W�n7<�hp�&�+p� �`2z�y򴕮���^-t�L3��p�!XK�9k�~س�;��fay�p�Z�LG^.�Dx�Ћ6!5L�/N9yd:mGS������ss|>�=����Y���(�)Cm�      �   �  x���KN�0�דSt�j�ˏ�!8�J�!!D�p{�NII���r,{���g<"��2� ��O��{L{N;ª�2�TDP���p�~y_���q``��4�N ��c;�T11S���x�W�x� yL[���>v���J1$��4k���|�D��Sh�|tE����\9���~:�",�)B����0J�%L�_A���H~W�v����aĔ(nJ��0�ћ�nF�7\y�E�E+�(҆*@��YԆ,�*)dΦwW鱶�w)n[S��U8o뙭�#���U�3�[1$���q�����&�N��J�[�\+rԫ�TRK�
_v$��L1#-�V��a��]5��{sx�\��d#�ͱ2�0��4�8W��&7���*�?f�vG����������퉖9Oz-�ӤDN��|wx
�0� ]>��      �   �   x�����!�>���H�$F�WX�@/�e/þ��Yڭ�B<����X�``�
�{�bbZ�V�Q;�D����//��p9�� �h���\%ϝz8��Ů��)�r�Be�l�sݻ�S���pSkZ!�*������G�[@9*� �l��!�	0�Ϗ ?�FGQ��#�<�D���e�Ɯb�����ǿ�ާ`Y`M�qI���N���}��K�1� җu�      �   �   x����0D��)<�lC�d�$5R:�Dl`P@�E`��8��ݻWW�<KK,=����UF�e(}9[p�����dQ�g&���mkL�'V�2Y�v�OM�X���<d�e��7�|Te�gb��q�� ~DO�      �   J   x�3��|a?��Y�]l������.��2�,I-.1�2�F\���y)�i�y�)�&F\�;.6q��qqq 	Xs      �   "  x�E��N�0�g�)2�l��_��10vqGB�)�� C���**!J�W�~#��P��X��t�M��ϰ𷰀���|�w[���5,bh���������oBw����{E�rzv1('���'8obx �HЀsd��?#zT��ӼF%�R����(��)6���rRW�//7���W���AL胓ˠ���a�]ȼ���cx!�A��I�.�2X���+���9�I�W���DQι9�<���u���GϪ��L2B5K����\��2�:u�OHE�܏�      �      x������ � �     