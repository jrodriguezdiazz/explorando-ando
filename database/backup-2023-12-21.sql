--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2023-12-21 10:31:16 AST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = on;

DROP DATABASE IF EXISTS "explorando_ando";
--
-- TOC entry 3979 (class 1262 OID 18380)
-- Name: explorando_ando; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE "explorando_ando" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';


\connect "explorando_ando"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = on;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "public";


--
-- TOC entry 275 (class 1255 OID 20645)
-- Name: get_destinations_info("text"[], "text"); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION "public"."get_destinations_info"("destination_ids" "text"[] DEFAULT NULL::"text"[], "dateselected" "text" DEFAULT NULL::"text"[]) RETURNS TABLE("id" "text", "title" "text", "latitude" double precision, "longitude" double precision, "description" "text", "tripscomforts" "text"[], "nearbyplaces" "json", "accommodations" "json")
    LANGUAGE "plpgsql"
AS '
    BEGIN
    RETURN QUERY
    SELECT
        d.id::text AS id,
        d.name::text AS title,
        dl.latitude::float8,
        dl.longitude::float8,
        d.description::text,
        ARRAY_AGG(DISTINCT f.name)::text[] AS tripsComforts,
        JSON_AGG(
                JSON_BUILD_OBJECT(''name'', p.name, ''distance'', p.distance::text)
            ) AS nearbyPlaces,
        (
            SELECT JSON_AGG(
                           JSON_BUILD_OBJECT(
                                   ''id'', a.accommodation_id::text,
                                   ''name'', a.name::text,
                                   ''image'', ai.image_url::text,
                                   ''feature'', (SELECT ARRAY_AGG(af.name::text) FROM accommodation_feature_relations afr JOIN accommodation_features af ON afr.feature_id = af.feature_id WHERE afr.accommodation_id = a.accommodation_id)
                               )
                       )
            FROM accommodations a
                     LEFT JOIN accommodation_images ai ON a.accommodation_id = ai.accommodation_id
            WHERE a.destination_id = d.id
        ) AS accommodations
    FROM destinations d
             LEFT JOIN destination_locations dl ON d.id = dl.destination_id
             LEFT JOIN destination_facilities df ON d.id = df.destination_id
             LEFT JOIN facilities f ON df.facility_id = f.facility_id
             LEFT JOIN points_of_interest p ON d.id = p.destination_id
    WHERE d.id = ANY(destination_ids) OR destination_ids IS NULL
    GROUP BY d.id, dl.latitude, dl.longitude, d.description;
    END;
';


--
-- TOC entry 260 (class 1259 OID 20370)
-- Name: accommodation_feature_relations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."accommodation_feature_relations" (
                                                            "accommodation_id" character varying,
                                                            "feature_id" character varying
);


--
-- TOC entry 259 (class 1259 OID 20363)
-- Name: accommodation_features; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."accommodation_features" (
                                                   "feature_id" character varying NOT NULL,
                                                   "name" character varying NOT NULL
);


--
-- TOC entry 261 (class 1259 OID 20375)
-- Name: accommodation_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."accommodation_images" (
                                                 "image_id" character varying NOT NULL,
                                                 "accommodation_id" character varying,
                                                 "image_url" character varying NOT NULL
);


--
-- TOC entry 258 (class 1259 OID 20356)
-- Name: accommodation_prices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."accommodation_prices" (
                                                 "price_id" character varying NOT NULL,
                                                 "accommodation_id" character varying,
                                                 "price" numeric(10,2) NOT NULL,
                                                 "valid_from" "date",
                                                 "valid_to" "date"
);


--
-- TOC entry 256 (class 1259 OID 20342)
-- Name: accommodations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."accommodations" (
                                           "accommodation_id" character varying NOT NULL,
                                           "destination_id" character varying,
                                           "name" character varying NOT NULL,
                                           "square_feet" integer,
                                           "capacity" integer,
                                           "beds_description" "text"
);


--
-- TOC entry 236 (class 1259 OID 20206)
-- Name: achievement; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."achievement" (
                                        "id" character varying NOT NULL,
                                        "name" character varying NOT NULL,
                                        "description" "text"
);


--
-- TOC entry 262 (class 1259 OID 20628)
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."categories" (
                                       "id" character varying NOT NULL,
                                       "category" character varying NOT NULL
);


--
-- TOC entry 222 (class 1259 OID 20104)
-- Name: category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."category" (
                                     "id" character varying NOT NULL,
                                     "name" character varying NOT NULL,
                                     "description" "text"
);


--
-- TOC entry 263 (class 1259 OID 20633)
-- Name: characteristics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."characteristics" (
                                            "id" character varying NOT NULL,
                                            "label" character varying NOT NULL,
                                            "category_id" character varying NOT NULL,
                                            "range" "jsonb" NOT NULL
);


--
-- TOC entry 243 (class 1259 OID 20255)
-- Name: contact_messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."contact_messages" (
                                             "message_id" character varying NOT NULL,
                                             "full_name" character varying NOT NULL,
                                             "email" character varying NOT NULL,
                                             "message" "text" NOT NULL,
                                             "created_at" timestamp without time zone NOT NULL
);


--
-- TOC entry 223 (class 1259 OID 20113)
-- Name: destination; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."destination" (
                                        "id" character varying NOT NULL,
                                        "name" character varying NOT NULL,
                                        "location" character varying NOT NULL,
                                        "description" "text",
                                        "average_rating" double precision,
                                        "category_id" character varying
);


--
-- TOC entry 253 (class 1259 OID 20325)
-- Name: destination_facilities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."destination_facilities" (
                                                   "destination_id" character varying,
                                                   "facility_id" character varying
);


--
-- TOC entry 255 (class 1259 OID 20337)
-- Name: destination_locations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."destination_locations" (
                                                  "destination_id" character varying,
                                                  "latitude" double precision,
                                                  "longitude" double precision
);


--
-- TOC entry 249 (class 1259 OID 20297)
-- Name: destinations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."destinations" (
                                         "id" character varying NOT NULL,
                                         "name" character varying NOT NULL,
                                         "location" character varying NOT NULL,
                                         "description" "text",
                                         "average_rating" double precision,
                                         "price" numeric,
                                         "height" numeric,
                                         "banner" character varying,
                                         "province" character varying
);


--
-- TOC entry 232 (class 1259 OID 20176)
-- Name: event; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."event" (
                                  "id" character varying NOT NULL,
                                  "destination_id" character varying,
                                  "name" character varying NOT NULL,
                                  "description" "text",
                                  "start_date" timestamp without time zone NOT NULL,
                                  "end_date" timestamp without time zone NOT NULL
);


--
-- TOC entry 233 (class 1259 OID 20183)
-- Name: event_registration; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."event_registration" (
                                               "id" character varying NOT NULL,
                                               "event_id" character varying,
                                               "user_id" character varying,
                                               "registration_date" timestamp without time zone NOT NULL
);


--
-- TOC entry 252 (class 1259 OID 20318)
-- Name: facilities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."facilities" (
                                       "facility_id" character varying NOT NULL,
                                       "name" character varying NOT NULL
);


--
-- TOC entry 240 (class 1259 OID 20233)
-- Name: feedback; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."feedback" (
                                     "id" character varying NOT NULL,
                                     "user_id" character varying,
                                     "content" "text" NOT NULL,
                                     "submitted_at" timestamp without time zone NOT NULL
);


--
-- TOC entry 241 (class 1259 OID 20240)
-- Name: loyalty_program; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."loyalty_program" (
                                            "id" character varying NOT NULL,
                                            "user_id" character varying,
                                            "points" integer DEFAULT 0
);


--
-- TOC entry 235 (class 1259 OID 20198)
-- Name: message; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."message" (
                                    "id" character varying NOT NULL,
                                    "sender_id" character varying,
                                    "recipient_id" character varying,
                                    "content" "text" NOT NULL,
                                    "sent_at" timestamp without time zone NOT NULL,
                                    "read" boolean DEFAULT false
);


--
-- TOC entry 245 (class 1259 OID 20271)
-- Name: message_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."message_categories" (
                                               "category_id" character varying NOT NULL,
                                               "category_name" character varying NOT NULL,
                                               "description" "text"
);


--
-- TOC entry 247 (class 1259 OID 20285)
-- Name: message_category_relation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."message_category_relation" (
                                                      "message_id" character varying,
                                                      "category_id" character varying
);


--
-- TOC entry 246 (class 1259 OID 20278)
-- Name: message_status; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."message_status" (
                                           "status_id" character varying NOT NULL,
                                           "status_name" character varying NOT NULL,
                                           "description" "text"
);


--
-- TOC entry 248 (class 1259 OID 20290)
-- Name: message_tracking; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."message_tracking" (
                                             "tracking_id" character varying NOT NULL,
                                             "message_id" character varying,
                                             "status_id" character varying,
                                             "action_taken" "text",
                                             "action_date" timestamp without time zone NOT NULL
);


--
-- TOC entry 234 (class 1259 OID 20190)
-- Name: notification; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."notification" (
                                         "id" character varying NOT NULL,
                                         "user_id" character varying,
                                         "content" "text" NOT NULL,
                                         "created_at" timestamp without time zone NOT NULL,
                                         "read" boolean DEFAULT false
);


--
-- TOC entry 225 (class 1259 OID 20127)
-- Name: offer; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."offer" (
                                  "id" character varying NOT NULL,
                                  "destination_id" character varying,
                                  "title" character varying NOT NULL,
                                  "price" double precision NOT NULL,
                                  "details" "text",
                                  "availability_start_date" "date" NOT NULL,
                                  "availability_end_date" "date" NOT NULL
);


--
-- TOC entry 230 (class 1259 OID 20162)
-- Name: payment_info; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."payment_info" (
                                         "id" character varying NOT NULL,
                                         "user_id" character varying,
                                         "payment_method" character varying,
                                         "card_details" "text",
                                         "billing_address_id" character varying
);


--
-- TOC entry 254 (class 1259 OID 20330)
-- Name: points_of_interest; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."points_of_interest" (
                                               "poi_id" character varying NOT NULL,
                                               "destination_id" character varying,
                                               "name" character varying NOT NULL,
                                               "distance" integer
);


--
-- TOC entry 221 (class 1259 OID 20099)
-- Name: preference_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."preference_category" (
                                                "preference_type_id" character varying,
                                                "category_id" character varying
);


--
-- TOC entry 220 (class 1259 OID 20090)
-- Name: preference_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."preference_type" (
                                            "id" character varying NOT NULL,
                                            "name" character varying NOT NULL,
                                            "description" "text"
);


--
-- TOC entry 244 (class 1259 OID 20262)
-- Name: registered_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."registered_users" (
                                             "user_id" character varying NOT NULL,
                                             "full_name" character varying NOT NULL,
                                             "email" character varying NOT NULL,
                                             "registration_date" timestamp without time zone NOT NULL
);


--
-- TOC entry 226 (class 1259 OID 20134)
-- Name: reservation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."reservation" (
                                        "id" character varying NOT NULL,
                                        "offer_id" character varying,
                                        "user_id" character varying,
                                        "reservation_date" timestamp without time zone NOT NULL,
                                        "number_of_people" integer NOT NULL,
                                        "special_requests" "text"
);


--
-- TOC entry 257 (class 1259 OID 20349)
-- Name: reservations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."reservations" (
                                         "reservation_id" character varying NOT NULL,
                                         "accommodation_id" character varying,
                                         "user_id" character varying,
                                         "check_in_date" "date" NOT NULL,
                                         "check_out_date" "date" NOT NULL,
                                         "number_of_adults" integer,
                                         "number_of_rooms" integer
);


--
-- TOC entry 224 (class 1259 OID 20120)
-- Name: review; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."review" (
                                   "id" character varying NOT NULL,
                                   "user_id" character varying,
                                   "destination_id" character varying,
                                   "date" timestamp without time zone NOT NULL,
                                   "rating" integer NOT NULL,
                                   "content" "text",
                                   "title" character varying
);


--
-- TOC entry 251 (class 1259 OID 20311)
-- Name: review_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."review_images" (
                                          "image_id" character varying NOT NULL,
                                          "review_id" character varying,
                                          "image_url" character varying NOT NULL
);


--
-- TOC entry 250 (class 1259 OID 20304)
-- Name: reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."reviews" (
                                    "review_id" character varying NOT NULL,
                                    "destination_id" character varying,
                                    "user_id" character varying,
                                    "rating" integer,
                                    "content" "text",
                                    "review_date" timestamp without time zone NOT NULL
);


--
-- TOC entry 242 (class 1259 OID 20248)
-- Name: reward; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."reward" (
                                   "id" character varying NOT NULL,
                                   "loyalty_program_id" character varying,
                                   "description" "text",
                                   "points_required" integer
);


--
-- TOC entry 238 (class 1259 OID 20218)
-- Name: social_integration; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."social_integration" (
                                               "id" character varying NOT NULL,
                                               "user_id" character varying,
                                               "platform_name" character varying NOT NULL,
                                               "platform_id" character varying NOT NULL
);


--
-- TOC entry 239 (class 1259 OID 20225)
-- Name: subscription; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."subscription" (
                                         "id" character varying NOT NULL,
                                         "user_id" character varying,
                                         "email" character varying NOT NULL,
                                         "opt_in" boolean DEFAULT true,
                                         "subscription_date" timestamp without time zone NOT NULL
);


--
-- TOC entry 231 (class 1259 OID 20169)
-- Name: transaction_history; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."transaction_history" (
                                                "id" character varying NOT NULL,
                                                "user_id" character varying,
                                                "reservation_id" character varying,
                                                "transaction_date" timestamp without time zone NOT NULL,
                                                "amount" double precision NOT NULL,
                                                "transaction_details" "text"
);


--
-- TOC entry 237 (class 1259 OID 20213)
-- Name: user_achievement; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."user_achievement" (
                                             "user_id" character varying,
                                             "achievement_id" character varying,
                                             "date_achieved" timestamp without time zone NOT NULL
);


--
-- TOC entry 227 (class 1259 OID 20141)
-- Name: user_activity; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."user_activity" (
                                          "id" character varying NOT NULL,
                                          "user_id" character varying,
                                          "activity_type" character varying,
                                          "activity_details" "text",
                                          "activity_date" timestamp without time zone NOT NULL
);


--
-- TOC entry 229 (class 1259 OID 20155)
-- Name: user_behavior_tracking; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."user_behavior_tracking" (
                                                   "id" character varying NOT NULL,
                                                   "user_id" character varying,
                                                   "behavior_type" character varying,
                                                   "behavior_data" "text",
                                                   "behavior_date" timestamp without time zone NOT NULL
);


--
-- TOC entry 217 (class 1259 OID 20067)
-- Name: user_contact_info; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."user_contact_info" (
                                              "user_id" character varying NOT NULL,
                                              "phone_number" character varying,
                                              "address" character varying,
                                              "city" character varying,
                                              "country" character varying,
                                              "postal_code" character varying
);


--
-- TOC entry 216 (class 1259 OID 20060)
-- Name: user_details; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."user_details" (
                                         "user_id" character varying NOT NULL,
                                         "name" character varying NOT NULL,
                                         "date_of_birth" "date",
                                         "gender" character varying,
                                         "profile_picture_url" character varying
);


--
-- TOC entry 218 (class 1259 OID 20076)
-- Name: user_preferences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."user_preferences" (
                                             "user_id" character varying NOT NULL,
                                             "travel_preferences" "text",
                                             "adventure_level" integer,
                                             "cultural_interest" integer,
                                             "relaxation_level" integer
);


--
-- TOC entry 219 (class 1259 OID 20083)
-- Name: user_profile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."user_profile" (
                                         "user_id" character varying NOT NULL,
                                         "bio" "text",
                                         "travel_history" "text",
                                         "social_media_links" "text"
);


--
-- TOC entry 228 (class 1259 OID 20148)
-- Name: user_session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."user_session" (
                                         "id" character varying NOT NULL,
                                         "user_id" character varying,
                                         "session_start" timestamp without time zone NOT NULL,
                                         "session_end" timestamp without time zone,
                                         "session_data" "text"
);


--
-- TOC entry 215 (class 1259 OID 20051)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."users" (
                                  "id" character varying NOT NULL,
                                  "email" character varying NOT NULL,
                                  "password" character varying NOT NULL,
                                  "created_at" timestamp without time zone,
                                  "updated_at" timestamp without time zone,
                                  "status_id" integer,
                                  "first_name" character varying(255),
                                  "last_name" character varying(255),
                                  "user_name" character varying(255),
                                  "birthday" "date",
                                  "phone" character varying(50),
                                  "sex_id" integer,
                                  "roles_id" integer
);


--
-- TOC entry 3970 (class 0 OID 20370)
-- Dependencies: 260
-- Data for Name: accommodation_feature_relations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."accommodation_feature_relations" ("accommodation_id", "feature_id") VALUES ('1', '1') ON CONFLICT DO NOTHING;
INSERT INTO "public"."accommodation_feature_relations" ("accommodation_id", "feature_id") VALUES ('1', '2') ON CONFLICT DO NOTHING;
INSERT INTO "public"."accommodation_feature_relations" ("accommodation_id", "feature_id") VALUES ('1', '3') ON CONFLICT DO NOTHING;


--
-- TOC entry 3969 (class 0 OID 20363)
-- Dependencies: 259
-- Data for Name: accommodation_features; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."accommodation_features" ("feature_id", "name") VALUES ('1', '300 pies cuadrados') ON CONFLICT DO NOTHING;
INSERT INTO "public"."accommodation_features" ("feature_id", "name") VALUES ('2', 'Duerme 3') ON CONFLICT DO NOTHING;
INSERT INTO "public"."accommodation_features" ("feature_id", "name") VALUES ('3', '1 cama doble y 1 cama individual') ON CONFLICT DO NOTHING;


--
-- TOC entry 3971 (class 0 OID 20375)
-- Dependencies: 261
-- Data for Name: accommodation_images; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."accommodation_images" ("image_id", "accommodation_id", "image_url") VALUES ('1', '1', 'https://www.thespruce.com/thmb/ercyUzkNihNJGN9yIfD_y___t_g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cozy-bedroom-ideas-5078657-hero-2763eb67d1f0404e9ab8eb7280553e8e.jpg') ON CONFLICT DO NOTHING;


--
-- TOC entry 3968 (class 0 OID 20356)
-- Dependencies: 258
-- Data for Name: accommodation_prices; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3966 (class 0 OID 20342)
-- Dependencies: 256
-- Data for Name: accommodations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."accommodations" ("accommodation_id", "destination_id", "name", "square_feet", "capacity", "beds_description") VALUES ('1', 'bayahibe', 'Estándar twin bed, Camas múltiples', 300, 3, '1 cama doble y 1 cama individual') ON CONFLICT DO NOTHING;


--
-- TOC entry 3946 (class 0 OID 20206)
-- Dependencies: 236
-- Data for Name: achievement; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3972 (class 0 OID 20628)
-- Dependencies: 262
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."categories" ("id", "category") VALUES ('1', 'price') ON CONFLICT DO NOTHING;
INSERT INTO "public"."categories" ("id", "category") VALUES ('2', 'height') ON CONFLICT DO NOTHING;


--
-- TOC entry 3932 (class 0 OID 20104)
-- Dependencies: 222
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3973 (class 0 OID 20633)
-- Dependencies: 263
-- Data for Name: characteristics; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."characteristics" ("id", "label", "category_id", "range") VALUES ('1', 'barato', '1', '{"end": 100, "start": 0}') ON CONFLICT DO NOTHING;
INSERT INTO "public"."characteristics" ("id", "label", "category_id", "range") VALUES ('2', 'moderado', '1', '{"end": 200, "start": 101}') ON CONFLICT DO NOTHING;
INSERT INTO "public"."characteristics" ("id", "label", "category_id", "range") VALUES ('3', 'caro', '1', '{"end": 300, "start": 201}') ON CONFLICT DO NOTHING;
INSERT INTO "public"."characteristics" ("id", "label", "category_id", "range") VALUES ('5', 'normal', '2', '{"end": 100, "start": 11}') ON CONFLICT DO NOTHING;
INSERT INTO "public"."characteristics" ("id", "label", "category_id", "range") VALUES ('6', 'alto', '2', '{"end": 999, "start": 101}') ON CONFLICT DO NOTHING;
INSERT INTO "public"."characteristics" ("id", "label", "category_id", "range") VALUES ('7', 'muy alto', '2', '{"end": 4000, "start": 1000}') ON CONFLICT DO NOTHING;
INSERT INTO "public"."characteristics" ("id", "label", "category_id", "range") VALUES ('4', 'bajo', '2', '{"end": 10, "start": 0}') ON CONFLICT DO NOTHING;


--
-- TOC entry 3953 (class 0 OID 20255)
-- Dependencies: 243
-- Data for Name: contact_messages; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3933 (class 0 OID 20113)
-- Dependencies: 223
-- Data for Name: destination; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3963 (class 0 OID 20325)
-- Dependencies: 253
-- Data for Name: destination_facilities; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."destination_facilities" ("destination_id", "facility_id") VALUES ('bayahibe', '1') ON CONFLICT DO NOTHING;
INSERT INTO "public"."destination_facilities" ("destination_id", "facility_id") VALUES ('bayahibe', '2') ON CONFLICT DO NOTHING;
INSERT INTO "public"."destination_facilities" ("destination_id", "facility_id") VALUES ('bayahibe', '3') ON CONFLICT DO NOTHING;
INSERT INTO "public"."destination_facilities" ("destination_id", "facility_id") VALUES ('puntacana', '1') ON CONFLICT DO NOTHING;
INSERT INTO "public"."destination_facilities" ("destination_id", "facility_id") VALUES ('puntacana', '2') ON CONFLICT DO NOTHING;
INSERT INTO "public"."destination_facilities" ("destination_id", "facility_id") VALUES ('puntacana', '3') ON CONFLICT DO NOTHING;
INSERT INTO "public"."destination_facilities" ("destination_id", "facility_id") VALUES ('samana', '1') ON CONFLICT DO NOTHING;
INSERT INTO "public"."destination_facilities" ("destination_id", "facility_id") VALUES ('samana', '1') ON CONFLICT DO NOTHING;
INSERT INTO "public"."destination_facilities" ("destination_id", "facility_id") VALUES ('samana', '3') ON CONFLICT DO NOTHING;


--
-- TOC entry 3965 (class 0 OID 20337)
-- Dependencies: 255
-- Data for Name: destination_locations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."destination_locations" ("destination_id", "latitude", "longitude") VALUES ('bayahibe', 18.366, -68.822) ON CONFLICT DO NOTHING;


--
-- TOC entry 3959 (class 0 OID 20297)
-- Dependencies: 249
-- Data for Name: destinations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."destinations" ("id", "name", "location", "description", "average_rating", "price", "height", "banner", "province") VALUES ('bayahibe', 'Bayahibe', 'https://maps.app.goo.gl/cjzUDEoPEWpEpL8s8', 'Bayahibe es una pequeña localidad costera...', 4.5, 250, 10, 'https://www.mitur.gob.do/wp-content/uploads/2022/03/Playa-Dominicus-Bayahibe.jpg', 'La Altagracia') ON CONFLICT DO NOTHING;
INSERT INTO "public"."destinations" ("id", "name", "location", "description", "average_rating", "price", "height", "banner", "province") VALUES ('puntacana', 'Punta Cana', 'https://maps.app.goo.gl/puntacana', 'Punta Cana es conocida por sus playas de arena blanca...', 4.5, 150, 20, 'https://www.riu.com/blog/wp-content/uploads/2018/07/shutterstock_310904339.jpg', 'La Altagracia') ON CONFLICT DO NOTHING;
INSERT INTO "public"."destinations" ("id", "name", "location", "description", "average_rating", "price", "height", "banner", "province") VALUES ('samana', 'Samaná', 'https://maps.app.goo.gl/samana', 'Samaná, con sus hermosas playas y naturaleza exuberante...', 4.7, 50, 100, 'https://bpprivilegeclub.com/blog/wp-content/uploads/2021/06/Santa-Barbara-de-Samana.jpg', 'Samaná') ON CONFLICT DO NOTHING;


--
-- TOC entry 3942 (class 0 OID 20176)
-- Dependencies: 232
-- Data for Name: event; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3943 (class 0 OID 20183)
-- Dependencies: 233
-- Data for Name: event_registration; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3962 (class 0 OID 20318)
-- Dependencies: 252
-- Data for Name: facilities; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."facilities" ("facility_id", "name") VALUES ('1', 'Free wifi') ON CONFLICT DO NOTHING;
INSERT INTO "public"."facilities" ("facility_id", "name") VALUES ('2', 'Air Conditioning') ON CONFLICT DO NOTHING;
INSERT INTO "public"."facilities" ("facility_id", "name") VALUES ('3', 'Parking available') ON CONFLICT DO NOTHING;


--
-- TOC entry 3950 (class 0 OID 20233)
-- Dependencies: 240
-- Data for Name: feedback; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3951 (class 0 OID 20240)
-- Dependencies: 241
-- Data for Name: loyalty_program; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3945 (class 0 OID 20198)
-- Dependencies: 235
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3955 (class 0 OID 20271)
-- Dependencies: 245
-- Data for Name: message_categories; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3957 (class 0 OID 20285)
-- Dependencies: 247
-- Data for Name: message_category_relation; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3956 (class 0 OID 20278)
-- Dependencies: 246
-- Data for Name: message_status; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3958 (class 0 OID 20290)
-- Dependencies: 248
-- Data for Name: message_tracking; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3944 (class 0 OID 20190)
-- Dependencies: 234
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3935 (class 0 OID 20127)
-- Dependencies: 225
-- Data for Name: offer; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3940 (class 0 OID 20162)
-- Dependencies: 230
-- Data for Name: payment_info; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3964 (class 0 OID 20330)
-- Dependencies: 254
-- Data for Name: points_of_interest; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."points_of_interest" ("poi_id", "destination_id", "name", "distance") VALUES ('1', 'bayahibe', 'Hotel Penselvenyia', 2) ON CONFLICT DO NOTHING;
INSERT INTO "public"."points_of_interest" ("poi_id", "destination_id", "name", "distance") VALUES ('2', 'bayahibe', 'Travis Bakery store house', 3) ON CONFLICT DO NOTHING;
INSERT INTO "public"."points_of_interest" ("poi_id", "destination_id", "name", "distance") VALUES ('3', 'bayahibe', 'Hotel Penselvenyia', 1) ON CONFLICT DO NOTHING;
INSERT INTO "public"."points_of_interest" ("poi_id", "destination_id", "name", "distance") VALUES ('4', 'puntacana', 'Hard Rock Cafe Punta Cana', 5) ON CONFLICT DO NOTHING;
INSERT INTO "public"."points_of_interest" ("poi_id", "destination_id", "name", "distance") VALUES ('5', 'puntacana', 'Playa Bávaro', 2) ON CONFLICT DO NOTHING;
INSERT INTO "public"."points_of_interest" ("poi_id", "destination_id", "name", "distance") VALUES ('6', 'samana', 'Salto El Limón', 10) ON CONFLICT DO NOTHING;
INSERT INTO "public"."points_of_interest" ("poi_id", "destination_id", "name", "distance") VALUES ('7', 'samana', 'Parque Nacional Los Haitises', 15) ON CONFLICT DO NOTHING;


--
-- TOC entry 3931 (class 0 OID 20099)
-- Dependencies: 221
-- Data for Name: preference_category; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3930 (class 0 OID 20090)
-- Dependencies: 220
-- Data for Name: preference_type; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3954 (class 0 OID 20262)
-- Dependencies: 244
-- Data for Name: registered_users; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3936 (class 0 OID 20134)
-- Dependencies: 226
-- Data for Name: reservation; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3967 (class 0 OID 20349)
-- Dependencies: 257
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3934 (class 0 OID 20120)
-- Dependencies: 224
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3961 (class 0 OID 20311)
-- Dependencies: 251
-- Data for Name: review_images; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3960 (class 0 OID 20304)
-- Dependencies: 250
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3952 (class 0 OID 20248)
-- Dependencies: 242
-- Data for Name: reward; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3948 (class 0 OID 20218)
-- Dependencies: 238
-- Data for Name: social_integration; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3949 (class 0 OID 20225)
-- Dependencies: 239
-- Data for Name: subscription; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3941 (class 0 OID 20169)
-- Dependencies: 231
-- Data for Name: transaction_history; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3947 (class 0 OID 20213)
-- Dependencies: 237
-- Data for Name: user_achievement; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3937 (class 0 OID 20141)
-- Dependencies: 227
-- Data for Name: user_activity; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3939 (class 0 OID 20155)
-- Dependencies: 229
-- Data for Name: user_behavior_tracking; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3927 (class 0 OID 20067)
-- Dependencies: 217
-- Data for Name: user_contact_info; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3926 (class 0 OID 20060)
-- Dependencies: 216
-- Data for Name: user_details; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3928 (class 0 OID 20076)
-- Dependencies: 218
-- Data for Name: user_preferences; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3929 (class 0 OID 20083)
-- Dependencies: 219
-- Data for Name: user_profile; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3938 (class 0 OID 20148)
-- Dependencies: 228
-- Data for Name: user_session; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3925 (class 0 OID 20051)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."users" ("id", "email", "password", "created_at", "updated_at", "status_id", "first_name", "last_name", "user_name", "birthday", "phone", "sex_id", "roles_id") VALUES ('1', 'jrodriguezdiazz@gmail.com', '$2b$10$d7Te9WNb/3hz0ymtp1sL4.hnJ5OtorBXlNmsq7i.qggE8hKOVZ1mu', NULL, NULL, 1, 'Jorge', 'Rodriguez', 'jrodriguezdiazz', '2000-12-01', '809-752-0141', 1, 1) ON CONFLICT DO NOTHING;
INSERT INTO "public"."users" ("id", "email", "password", "created_at", "updated_at", "status_id", "first_name", "last_name", "user_name", "birthday", "phone", "sex_id", "roles_id") VALUES ('c087818b-d588-496d-8e87-f4d52535402d', 'jorgedejesusrodriguezdiaz@gmail.com', '$2b$10$ir0K3i6XQv0c73gVYRrjce3LEBaJZNxQamoh3e5Qxr6Nt8RjBxxTG', NULL, NULL, 1, 'Pedro', 'Rodriguez Diaz', 'undefined', '2023-11-30', '8097520141', 2, 1) ON CONFLICT DO NOTHING;


--
-- TOC entry 3728 (class 2606 OID 20369)
-- Name: accommodation_features accommodation_features_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."accommodation_features"
    ADD CONSTRAINT "accommodation_features_pkey" PRIMARY KEY ("feature_id");


--
-- TOC entry 3730 (class 2606 OID 20381)
-- Name: accommodation_images accommodation_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."accommodation_images"
    ADD CONSTRAINT "accommodation_images_pkey" PRIMARY KEY ("image_id");


--
-- TOC entry 3726 (class 2606 OID 20362)
-- Name: accommodation_prices accommodation_prices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."accommodation_prices"
    ADD CONSTRAINT "accommodation_prices_pkey" PRIMARY KEY ("price_id");


--
-- TOC entry 3722 (class 2606 OID 20348)
-- Name: accommodations accommodations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."accommodations"
    ADD CONSTRAINT "accommodations_pkey" PRIMARY KEY ("accommodation_id");


--
-- TOC entry 3688 (class 2606 OID 20212)
-- Name: achievement achievement_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."achievement"
    ADD CONSTRAINT "achievement_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3658 (class 2606 OID 20112)
-- Name: category category_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."category"
    ADD CONSTRAINT "category_name_key" UNIQUE ("name");


--
-- TOC entry 3660 (class 2606 OID 20110)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."category"
    ADD CONSTRAINT "category_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3732 (class 2606 OID 20639)
-- Name: characteristics characteristics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."characteristics"
    ADD CONSTRAINT "characteristics_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3700 (class 2606 OID 20261)
-- Name: contact_messages contact_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."contact_messages"
    ADD CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("message_id");


--
-- TOC entry 3662 (class 2606 OID 20119)
-- Name: destination destination_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."destination"
    ADD CONSTRAINT "destination_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3712 (class 2606 OID 20303)
-- Name: destinations destinations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."destinations"
    ADD CONSTRAINT "destinations_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3680 (class 2606 OID 20182)
-- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."event"
    ADD CONSTRAINT "event_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3682 (class 2606 OID 20189)
-- Name: event_registration event_registration_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."event_registration"
    ADD CONSTRAINT "event_registration_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3718 (class 2606 OID 20324)
-- Name: facilities facilities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."facilities"
    ADD CONSTRAINT "facilities_pkey" PRIMARY KEY ("facility_id");


--
-- TOC entry 3694 (class 2606 OID 20239)
-- Name: feedback feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."feedback"
    ADD CONSTRAINT "feedback_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3696 (class 2606 OID 20247)
-- Name: loyalty_program loyalty_program_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."loyalty_program"
    ADD CONSTRAINT "loyalty_program_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3706 (class 2606 OID 20277)
-- Name: message_categories message_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."message_categories"
    ADD CONSTRAINT "message_categories_pkey" PRIMARY KEY ("category_id");


--
-- TOC entry 3686 (class 2606 OID 20205)
-- Name: message message_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."message"
    ADD CONSTRAINT "message_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3708 (class 2606 OID 20284)
-- Name: message_status message_status_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."message_status"
    ADD CONSTRAINT "message_status_pkey" PRIMARY KEY ("status_id");


--
-- TOC entry 3710 (class 2606 OID 20296)
-- Name: message_tracking message_tracking_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."message_tracking"
    ADD CONSTRAINT "message_tracking_pkey" PRIMARY KEY ("tracking_id");


--
-- TOC entry 3684 (class 2606 OID 20197)
-- Name: notification notification_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."notification"
    ADD CONSTRAINT "notification_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3666 (class 2606 OID 20133)
-- Name: offer offer_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."offer"
    ADD CONSTRAINT "offer_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3676 (class 2606 OID 20168)
-- Name: payment_info payment_info_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."payment_info"
    ADD CONSTRAINT "payment_info_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3720 (class 2606 OID 20336)
-- Name: points_of_interest points_of_interest_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."points_of_interest"
    ADD CONSTRAINT "points_of_interest_pkey" PRIMARY KEY ("poi_id");


--
-- TOC entry 3654 (class 2606 OID 20098)
-- Name: preference_type preference_type_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."preference_type"
    ADD CONSTRAINT "preference_type_name_key" UNIQUE ("name");


--
-- TOC entry 3656 (class 2606 OID 20096)
-- Name: preference_type preference_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."preference_type"
    ADD CONSTRAINT "preference_type_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3702 (class 2606 OID 20270)
-- Name: registered_users registered_users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."registered_users"
    ADD CONSTRAINT "registered_users_email_key" UNIQUE ("email");


--
-- TOC entry 3704 (class 2606 OID 20268)
-- Name: registered_users registered_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."registered_users"
    ADD CONSTRAINT "registered_users_pkey" PRIMARY KEY ("user_id");


--
-- TOC entry 3668 (class 2606 OID 20140)
-- Name: reservation reservation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reservation"
    ADD CONSTRAINT "reservation_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3724 (class 2606 OID 20355)
-- Name: reservations reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reservations"
    ADD CONSTRAINT "reservations_pkey" PRIMARY KEY ("reservation_id");


--
-- TOC entry 3716 (class 2606 OID 20317)
-- Name: review_images review_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."review_images"
    ADD CONSTRAINT "review_images_pkey" PRIMARY KEY ("image_id");


--
-- TOC entry 3664 (class 2606 OID 20126)
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."review"
    ADD CONSTRAINT "review_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3714 (class 2606 OID 20310)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_id");


--
-- TOC entry 3698 (class 2606 OID 20254)
-- Name: reward reward_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reward"
    ADD CONSTRAINT "reward_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3690 (class 2606 OID 20224)
-- Name: social_integration social_integration_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."social_integration"
    ADD CONSTRAINT "social_integration_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3692 (class 2606 OID 20232)
-- Name: subscription subscription_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."subscription"
    ADD CONSTRAINT "subscription_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3678 (class 2606 OID 20175)
-- Name: transaction_history transaction_history_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."transaction_history"
    ADD CONSTRAINT "transaction_history_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3670 (class 2606 OID 20147)
-- Name: user_activity user_activity_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."user_activity"
    ADD CONSTRAINT "user_activity_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3674 (class 2606 OID 20161)
-- Name: user_behavior_tracking user_behavior_tracking_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."user_behavior_tracking"
    ADD CONSTRAINT "user_behavior_tracking_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3646 (class 2606 OID 20075)
-- Name: user_contact_info user_contact_info_phone_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."user_contact_info"
    ADD CONSTRAINT "user_contact_info_phone_number_key" UNIQUE ("phone_number");


--
-- TOC entry 3648 (class 2606 OID 20073)
-- Name: user_contact_info user_contact_info_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."user_contact_info"
    ADD CONSTRAINT "user_contact_info_pkey" PRIMARY KEY ("user_id");


--
-- TOC entry 3644 (class 2606 OID 20066)
-- Name: user_details user_details_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."user_details"
    ADD CONSTRAINT "user_details_pkey" PRIMARY KEY ("user_id");


--
-- TOC entry 3650 (class 2606 OID 20082)
-- Name: user_preferences user_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."user_preferences"
    ADD CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("user_id");


--
-- TOC entry 3652 (class 2606 OID 20089)
-- Name: user_profile user_profile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."user_profile"
    ADD CONSTRAINT "user_profile_pkey" PRIMARY KEY ("user_id");


--
-- TOC entry 3672 (class 2606 OID 20154)
-- Name: user_session user_session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."user_session"
    ADD CONSTRAINT "user_session_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3640 (class 2606 OID 20059)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");


--
-- TOC entry 3642 (class 2606 OID 20057)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3779 (class 2606 OID 20612)
-- Name: accommodation_feature_relations accommodation_feature_relations_accommodation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."accommodation_feature_relations"
    ADD CONSTRAINT "accommodation_feature_relations_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "public"."accommodations"("accommodation_id");


--
-- TOC entry 3780 (class 2606 OID 20617)
-- Name: accommodation_feature_relations accommodation_feature_relations_feature_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."accommodation_feature_relations"
    ADD CONSTRAINT "accommodation_feature_relations_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "public"."accommodation_features"("feature_id");


--
-- TOC entry 3781 (class 2606 OID 20622)
-- Name: accommodation_images accommodation_images_accommodation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."accommodation_images"
    ADD CONSTRAINT "accommodation_images_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "public"."accommodations"("accommodation_id");


--
-- TOC entry 3778 (class 2606 OID 20607)
-- Name: accommodation_prices accommodation_prices_accommodation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."accommodation_prices"
    ADD CONSTRAINT "accommodation_prices_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "public"."accommodations"("accommodation_id");


--
-- TOC entry 3775 (class 2606 OID 20592)
-- Name: accommodations accommodations_destination_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."accommodations"
    ADD CONSTRAINT "accommodations_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id");


--
-- TOC entry 3739 (class 2606 OID 20412)
-- Name: destination destination_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."destination"
    ADD CONSTRAINT "destination_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id");


--
-- TOC entry 3771 (class 2606 OID 20572)
-- Name: destination_facilities destination_facilities_destination_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."destination_facilities"
    ADD CONSTRAINT "destination_facilities_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id");


--
-- TOC entry 3772 (class 2606 OID 20577)
-- Name: destination_facilities destination_facilities_facility_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."destination_facilities"
    ADD CONSTRAINT "destination_facilities_facility_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "public"."facilities"("facility_id");


--
-- TOC entry 3774 (class 2606 OID 20587)
-- Name: destination_locations destination_locations_destination_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."destination_locations"
    ADD CONSTRAINT "destination_locations_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id");


--
-- TOC entry 3752 (class 2606 OID 20477)
-- Name: event event_destination_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."event"
    ADD CONSTRAINT "event_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "public"."destination"("id");


--
-- TOC entry 3753 (class 2606 OID 20482)
-- Name: event_registration event_registration_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."event_registration"
    ADD CONSTRAINT "event_registration_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id");


--
-- TOC entry 3754 (class 2606 OID 20487)
-- Name: event_registration event_registration_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."event_registration"
    ADD CONSTRAINT "event_registration_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- TOC entry 3762 (class 2606 OID 20527)
-- Name: feedback feedback_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."feedback"
    ADD CONSTRAINT "feedback_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- TOC entry 3763 (class 2606 OID 20532)
-- Name: loyalty_program loyalty_program_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."loyalty_program"
    ADD CONSTRAINT "loyalty_program_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- TOC entry 3765 (class 2606 OID 20547)
-- Name: message_category_relation message_category_relation_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."message_category_relation"
    ADD CONSTRAINT "message_category_relation_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."message_categories"("category_id");


--
-- TOC entry 3766 (class 2606 OID 20542)
-- Name: message_category_relation message_category_relation_message_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."message_category_relation"
    ADD CONSTRAINT "message_category_relation_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "public"."contact_messages"("message_id");


--
-- TOC entry 3756 (class 2606 OID 20502)
-- Name: message message_recipient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."message"
    ADD CONSTRAINT "message_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "public"."users"("id");


--
-- TOC entry 3757 (class 2606 OID 20497)
-- Name: message message_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."message"
    ADD CONSTRAINT "message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id");


--
-- TOC entry 3767 (class 2606 OID 20552)
-- Name: message_tracking message_tracking_message_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."message_tracking"
    ADD CONSTRAINT "message_tracking_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "public"."contact_messages"("message_id");


--
-- TOC entry 3768 (class 2606 OID 20557)
-- Name: message_tracking message_tracking_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."message_tracking"
    ADD CONSTRAINT "message_tracking_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "public"."message_status"("status_id");


--
-- TOC entry 3755 (class 2606 OID 20492)
-- Name: notification notification_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."notification"
    ADD CONSTRAINT "notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- TOC entry 3742 (class 2606 OID 20427)
-- Name: offer offer_destination_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."offer"
    ADD CONSTRAINT "offer_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "public"."destination"("id");


--
-- TOC entry 3748 (class 2606 OID 20462)
-- Name: payment_info payment_info_billing_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."payment_info"
    ADD CONSTRAINT "payment_info_billing_address_id_fkey" FOREIGN KEY ("billing_address_id") REFERENCES "public"."user_contact_info"("user_id");


--
-- TOC entry 3749 (class 2606 OID 20457)
-- Name: payment_info payment_info_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."payment_info"
    ADD CONSTRAINT "payment_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- TOC entry 3773 (class 2606 OID 20582)
-- Name: points_of_interest points_of_interest_destination_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."points_of_interest"
    ADD CONSTRAINT "points_of_interest_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id");


--
-- TOC entry 3737 (class 2606 OID 20407)
-- Name: preference_category preference_category_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."preference_category"
    ADD CONSTRAINT "preference_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id");


--
-- TOC entry 3738 (class 2606 OID 20402)
-- Name: preference_category preference_category_preference_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."preference_category"
    ADD CONSTRAINT "preference_category_preference_type_id_fkey" FOREIGN KEY ("preference_type_id") REFERENCES "public"."preference_type"("id");


--
-- TOC entry 3743 (class 2606 OID 20432)
-- Name: reservation reservation_offer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reservation"
    ADD CONSTRAINT "reservation_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "public"."offer"("id");


--
-- TOC entry 3744 (class 2606 OID 20437)
-- Name: reservation reservation_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reservation"
    ADD CONSTRAINT "reservation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- TOC entry 3776 (class 2606 OID 20597)
-- Name: reservations reservations_accommodation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reservations"
    ADD CONSTRAINT "reservations_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "public"."accommodations"("accommodation_id");


--
-- TOC entry 3777 (class 2606 OID 20602)
-- Name: reservations reservations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reservations"
    ADD CONSTRAINT "reservations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- TOC entry 3740 (class 2606 OID 20422)
-- Name: review review_destination_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."review"
    ADD CONSTRAINT "review_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "public"."destination"("id");


--
-- TOC entry 3770 (class 2606 OID 20567)
-- Name: review_images review_images_review_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."review_images"
    ADD CONSTRAINT "review_images_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "public"."reviews"("review_id");


--
-- TOC entry 3741 (class 2606 OID 20417)
-- Name: review review_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."review"
    ADD CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- TOC entry 3769 (class 2606 OID 20562)
-- Name: reviews reviews_destination_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "reviews_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id");


--
-- TOC entry 3764 (class 2606 OID 20537)
-- Name: reward reward_loyalty_program_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reward"
    ADD CONSTRAINT "reward_loyalty_program_id_fkey" FOREIGN KEY ("loyalty_program_id") REFERENCES "public"."loyalty_program"("id");


--
-- TOC entry 3760 (class 2606 OID 20517)
-- Name: social_integration social_integration_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."social_integration"
    ADD CONSTRAINT "social_integration_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- TOC entry 3761 (class 2606 OID 20522)
-- Name: subscription subscription_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."subscription"
    ADD CONSTRAINT "subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- TOC entry 3750 (class 2606 OID 20472)
-- Name: transaction_history transaction_history_reservation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."transaction_history"
    ADD CONSTRAINT "transaction_history_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "public"."reservation"("id");


--
-- TOC entry 3751 (class 2606 OID 20467)
-- Name: transaction_history transaction_history_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."transaction_history"
    ADD CONSTRAINT "transaction_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- TOC entry 3758 (class 2606 OID 20512)
-- Name: user_achievement user_achievement_achievement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."user_achievement"
    ADD CONSTRAINT "user_achievement_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievement"("id");


--
-- TOC entry 3759 (class 2606 OID 20507)
-- Name: user_achievement user_achievement_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."user_achievement"
    ADD CONSTRAINT "user_achievement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- TOC entry 3745 (class 2606 OID 20442)
-- Name: user_activity user_activity_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."user_activity"
    ADD CONSTRAINT "user_activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- TOC entry 3747 (class 2606 OID 20452)
-- Name: user_behavior_tracking user_behavior_tracking_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."user_behavior_tracking"
    ADD CONSTRAINT "user_behavior_tracking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- TOC entry 3734 (class 2606 OID 20387)
-- Name: user_contact_info user_contact_info_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."user_contact_info"
    ADD CONSTRAINT "user_contact_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- TOC entry 3733 (class 2606 OID 20382)
-- Name: user_details user_details_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."user_details"
    ADD CONSTRAINT "user_details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- TOC entry 3735 (class 2606 OID 20392)
-- Name: user_preferences user_preferences_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."user_preferences"
    ADD CONSTRAINT "user_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- TOC entry 3736 (class 2606 OID 20397)
-- Name: user_profile user_profile_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."user_profile"
    ADD CONSTRAINT "user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- TOC entry 3746 (class 2606 OID 20447)
-- Name: user_session user_session_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."user_session"
    ADD CONSTRAINT "user_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


-- Completed on 2023-12-21 10:31:16 AST

--
-- PostgreSQL database dump complete
--
