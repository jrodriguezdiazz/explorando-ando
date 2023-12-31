CREATE TABLE "users" (
  "id" varchar PRIMARY KEY,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "user_details" (
  "user_id" varchar PRIMARY KEY,
  "name" varchar NOT NULL,
  "date_of_birth" date,
  "gender" varchar,
  "profile_picture_url" varchar
);

CREATE TABLE "user_contact_info" (
  "user_id" varchar PRIMARY KEY,
  "phone_number" varchar UNIQUE,
  "address" varchar,
  "city" varchar,
  "country" varchar,
  "postal_code" varchar
);

CREATE TABLE "user_preferences" (
  "user_id" varchar PRIMARY KEY,
  "travel_preferences" text,
  "adventure_level" int,
  "cultural_interest" int,
  "relaxation_level" int
);

CREATE TABLE "user_profile" (
  "user_id" varchar PRIMARY KEY,
  "bio" text,
  "travel_history" text,
  "social_media_links" text
);

CREATE TABLE "preference_type" (
  "id" varchar PRIMARY KEY,
  "name" varchar UNIQUE NOT NULL,
  "description" text
);

CREATE TABLE "preference_category" (
  "preference_type_id" varchar,
  "category_id" varchar
);

CREATE TABLE "category" (
  "id" varchar PRIMARY KEY,
  "name" varchar UNIQUE NOT NULL,
  "description" text
);

CREATE TABLE "destination" (
  "id" varchar PRIMARY KEY,
  "name" varchar NOT NULL,
  "location" varchar NOT NULL,
  "description" text,
  "average_rating" float,
  "category_id" varchar
);

CREATE TABLE "review" (
  "id" varchar PRIMARY KEY,
  "user_id" varchar,
  "destination_id" varchar,
  "date" timestamp NOT NULL,
  "rating" int NOT NULL,
  "content" text,
  "title" varchar
);

CREATE TABLE "offer" (
  "id" varchar PRIMARY KEY,
  "destination_id" varchar,
  "title" varchar NOT NULL,
  "price" float NOT NULL,
  "details" text,
  "availability_start_date" date NOT NULL,
  "availability_end_date" date NOT NULL
);

CREATE TABLE "reservation" (
  "id" varchar PRIMARY KEY,
  "offer_id" varchar,
  "user_id" varchar,
  "reservation_date" timestamp NOT NULL,
  "number_of_people" int NOT NULL,
  "special_requests" text
);

CREATE TABLE "user_activity" (
  "id" varchar PRIMARY KEY,
  "user_id" varchar,
  "activity_type" varchar,
  "activity_details" text,
  "activity_date" timestamp NOT NULL
);

CREATE TABLE "user_session" (
  "id" varchar PRIMARY KEY,
  "user_id" varchar,
  "session_start" timestamp NOT NULL,
  "session_end" timestamp,
  "session_data" text
);

CREATE TABLE "user_behavior_tracking" (
  "id" varchar PRIMARY KEY,
  "user_id" varchar,
  "behavior_type" varchar,
  "behavior_data" text,
  "behavior_date" timestamp NOT NULL
);

CREATE TABLE "payment_info" (
  "id" varchar PRIMARY KEY,
  "user_id" varchar,
  "payment_method" varchar,
  "card_details" text,
  "billing_address_id" varchar
);

CREATE TABLE "transaction_history" (
  "id" varchar PRIMARY KEY,
  "user_id" varchar,
  "reservation_id" varchar,
  "transaction_date" timestamp NOT NULL,
  "amount" float NOT NULL,
  "transaction_details" text
);

CREATE TABLE "event" (
  "id" varchar PRIMARY KEY,
  "destination_id" varchar,
  "name" varchar NOT NULL,
  "description" text,
  "start_date" timestamp NOT NULL,
  "end_date" timestamp NOT NULL
);

CREATE TABLE "event_registration" (
  "id" varchar PRIMARY KEY,
  "event_id" varchar,
  "user_id" varchar,
  "registration_date" timestamp NOT NULL
);

CREATE TABLE "notification" (
  "id" varchar PRIMARY KEY,
  "user_id" varchar,
  "content" text NOT NULL,
  "created_at" timestamp NOT NULL,
  "read" boolean DEFAULT false
);

CREATE TABLE "message" (
  "id" varchar PRIMARY KEY,
  "sender_id" varchar,
  "recipient_id" varchar,
  "content" text NOT NULL,
  "sent_at" timestamp NOT NULL,
  "read" boolean DEFAULT false
);

CREATE TABLE "achievement" (
  "id" varchar PRIMARY KEY,
  "name" varchar NOT NULL,
  "description" text
);

CREATE TABLE "user_achievement" (
  "user_id" varchar,
  "achievement_id" varchar,
  "date_achieved" timestamp NOT NULL
);

CREATE TABLE "social_integration" (
  "id" varchar PRIMARY KEY,
  "user_id" varchar,
  "platform_name" varchar NOT NULL,
  "platform_id" varchar NOT NULL
);

CREATE TABLE "subscription" (
  "id" varchar PRIMARY KEY,
  "user_id" varchar,
  "email" varchar NOT NULL,
  "opt_in" boolean DEFAULT true,
  "subscription_date" timestamp NOT NULL
);

CREATE TABLE "feedback" (
  "id" varchar PRIMARY KEY,
  "user_id" varchar,
  "content" text NOT NULL,
  "submitted_at" timestamp NOT NULL
);

CREATE TABLE "loyalty_program" (
  "id" varchar PRIMARY KEY,
  "user_id" varchar,
  "points" int DEFAULT 0
);

CREATE TABLE "reward" (
  "id" varchar PRIMARY KEY,
  "loyalty_program_id" varchar,
  "description" text,
  "points_required" int
);

CREATE TABLE "contact_messages" (
  "message_id" varchar PRIMARY KEY,
  "full_name" varchar NOT NULL,
  "email" varchar NOT NULL,
  "message" text NOT NULL,
  "created_at" timestamp NOT NULL
);

CREATE TABLE "registered_users" (
  "user_id" varchar PRIMARY KEY,
  "full_name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "registration_date" timestamp NOT NULL
);

CREATE TABLE "message_categories" (
  "category_id" varchar PRIMARY KEY,
  "category_name" varchar NOT NULL,
  "description" text
);

CREATE TABLE "message_status" (
  "status_id" varchar PRIMARY KEY,
  "status_name" varchar NOT NULL,
  "description" text
);

CREATE TABLE "message_category_relation" (
  "message_id" varchar,
  "category_id" varchar
);

CREATE TABLE "message_tracking" (
  "tracking_id" varchar PRIMARY KEY,
  "message_id" varchar,
  "status_id" varchar,
  "action_taken" text,
  "action_date" timestamp NOT NULL
);

CREATE TABLE "destinations" (
  "destination_id" varchar PRIMARY KEY,
  "name" varchar NOT NULL,
  "location" varchar NOT NULL,
  "description" text,
  "average_rating" float
);

CREATE TABLE "reviews" (
  "review_id" varchar PRIMARY KEY,
  "destination_id" varchar,
  "user_id" varchar,
  "rating" int,
  "content" text,
  "review_date" timestamp NOT NULL
);

CREATE TABLE "review_images" (
  "image_id" varchar PRIMARY KEY,
  "review_id" varchar,
  "image_url" varchar NOT NULL
);


CREATE TABLE "facilities" (
  "facility_id" varchar PRIMARY KEY,
  "name" varchar NOT NULL
);

CREATE TABLE "destination_facilities" (
  "destination_id" varchar,
  "facility_id" varchar
);

CREATE TABLE "points_of_interest" (
  "poi_id" varchar PRIMARY KEY,
  "destination_id" varchar,
  "name" varchar NOT NULL,
  "distance" int
);

CREATE TABLE "destination_locations" (
  "destination_id" varchar,
  "latitude" float,
  "longitude" float
);

CREATE TABLE "accommodations" (
  "accommodation_id" varchar PRIMARY KEY,
  "destination_id" varchar,
  "name" varchar NOT NULL,
  "square_feet" int,
  "capacity" int,
  "beds_description" text
);

CREATE TABLE "reservations" (
  "reservation_id" varchar PRIMARY KEY,
  "accommodation_id" varchar,
  "user_id" varchar,
  "check_in_date" date NOT NULL,
  "check_out_date" date NOT NULL,
  "number_of_adults" int,
  "number_of_rooms" int
);

CREATE TABLE "accommodation_prices" (
  "price_id" varchar PRIMARY KEY,
  "accommodation_id" varchar,
  "price" decimal(10,2) NOT NULL,
  "valid_from" date,
  "valid_to" date
);

CREATE TABLE "accommodation_features" (
  "feature_id" varchar PRIMARY KEY,
  "name" varchar NOT NULL
);

CREATE TABLE "accommodation_feature_relations" (
  "accommodation_id" varchar,
  "feature_id" varchar
);

CREATE TABLE "accommodation_images" (
  "image_id" varchar PRIMARY KEY,
  "accommodation_id" varchar,
  "image_url" varchar NOT NULL
);

ALTER TABLE "user_details" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_contact_info" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_preferences" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_profile" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "preference_category" ADD FOREIGN KEY ("preference_type_id") REFERENCES "preference_type" ("id");

ALTER TABLE "preference_category" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id");

ALTER TABLE "destination" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id");

ALTER TABLE "review" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "review" ADD FOREIGN KEY ("destination_id") REFERENCES "destination" ("id");

ALTER TABLE "offer" ADD FOREIGN KEY ("destination_id") REFERENCES "destination" ("id");

ALTER TABLE "reservation" ADD FOREIGN KEY ("offer_id") REFERENCES "offer" ("id");

ALTER TABLE "reservation" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_activity" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_session" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_behavior_tracking" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "payment_info" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "payment_info" ADD FOREIGN KEY ("billing_address_id") REFERENCES "user_contact_info" ("user_id");

ALTER TABLE "transaction_history" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "transaction_history" ADD FOREIGN KEY ("reservation_id") REFERENCES "reservation" ("id");

ALTER TABLE "event" ADD FOREIGN KEY ("destination_id") REFERENCES "destination" ("id");

ALTER TABLE "event_registration" ADD FOREIGN KEY ("event_id") REFERENCES "event" ("id");

ALTER TABLE "event_registration" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "notification" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "message" ADD FOREIGN KEY ("sender_id") REFERENCES "users" ("id");

ALTER TABLE "message" ADD FOREIGN KEY ("recipient_id") REFERENCES "users" ("id");

ALTER TABLE "user_achievement" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_achievement" ADD FOREIGN KEY ("achievement_id") REFERENCES "achievement" ("id");

ALTER TABLE "social_integration" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "subscription" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "feedback" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "loyalty_program" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "reward" ADD FOREIGN KEY ("loyalty_program_id") REFERENCES "loyalty_program" ("id");

ALTER TABLE "message_category_relation" ADD FOREIGN KEY ("message_id") REFERENCES "contact_messages" ("message_id");

ALTER TABLE "message_category_relation" ADD FOREIGN KEY ("category_id") REFERENCES "message_categories" ("category_id");

ALTER TABLE "message_tracking" ADD FOREIGN KEY ("message_id") REFERENCES "contact_messages" ("message_id");

ALTER TABLE "message_tracking" ADD FOREIGN KEY ("status_id") REFERENCES "message_status" ("status_id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("destination_id") REFERENCES "destinations" ("destination_id");

-- ALTER TABLE "reviews" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "review_images" ADD FOREIGN KEY ("review_id") REFERENCES "reviews" ("review_id");

ALTER TABLE "destination_facilities" ADD FOREIGN KEY ("destination_id") REFERENCES "destinations" ("destination_id");

ALTER TABLE "destination_facilities" ADD FOREIGN KEY ("facility_id") REFERENCES "facilities" ("facility_id");

ALTER TABLE "points_of_interest" ADD FOREIGN KEY ("destination_id") REFERENCES "destinations" ("destination_id");

ALTER TABLE "destination_locations" ADD FOREIGN KEY ("destination_id") REFERENCES "destinations" ("destination_id");

ALTER TABLE "accommodations" ADD FOREIGN KEY ("destination_id") REFERENCES "destinations" ("destination_id");

ALTER TABLE "reservations" ADD FOREIGN KEY ("accommodation_id") REFERENCES "accommodations" ("accommodation_id");

ALTER TABLE "reservations" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "accommodation_prices" ADD FOREIGN KEY ("accommodation_id") REFERENCES "accommodations" ("accommodation_id");

ALTER TABLE "accommodation_feature_relations" ADD FOREIGN KEY ("accommodation_id") REFERENCES "accommodations" ("accommodation_id");

ALTER TABLE "accommodation_feature_relations" ADD FOREIGN KEY ("feature_id") REFERENCES "accommodation_features" ("feature_id");

ALTER TABLE "accommodation_images" ADD FOREIGN KEY ("accommodation_id") REFERENCES "accommodations" ("accommodation_id");
