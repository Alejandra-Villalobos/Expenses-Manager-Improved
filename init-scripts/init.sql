CREATE TABLE users (
	user_id uuid NOT NULL DEFAULT gen_random_uuid(),
	"name" varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (user_id)
);

CREATE TABLE bank (
	bank_id uuid NOT NULL DEFAULT gen_random_uuid(),
	account varchar(15) NOT NULL,
	bank_name varchar(50) NOT NULL,
	currency varchar(10) NOT NULL,
	amount float8 NOT NULL,
	user_id uuid NOT NULL,
	username varchar(100) NOT NULL,
	CONSTRAINT bank_pkey PRIMARY KEY (bank_id),
	CONSTRAINT bank_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE income (
	income_id uuid NOT NULL DEFAULT gen_random_uuid(),
	category varchar(10) NOT NULL,
	description varchar(50) NULL,
	amount float8 NOT NULL,
	add_date varchar(50) NULL DEFAULT CURRENT_TIMESTAMP,
	bank_id uuid NOT NULL,
	user_id uuid NOT NULL,
	CONSTRAINT income_pkey PRIMARY KEY (income_id),
	CONSTRAINT income_bank_id_fkey FOREIGN KEY (bank_id) REFERENCES bank(bank_id),
	CONSTRAINT income_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE outcome (
	outcome_id uuid NOT NULL DEFAULT gen_random_uuid(),
	category varchar(10) NOT NULL,
	description varchar(50) NULL,
	amount float8 NOT NULL,
	add_date varchar(50) NULL DEFAULT CURRENT_TIMESTAMP,
	to_bank_account uuid NULL,
	bank_id uuid NOT NULL,
	user_id uuid NOT NULL,
	CONSTRAINT outcome_pkey PRIMARY KEY (outcome_id),
	CONSTRAINT outcome_bank_id_fkey FOREIGN KEY (bank_id) REFERENCES bank(bank_id),
	CONSTRAINT outcome_to_bank_account_fkey FOREIGN KEY (to_bank_account) REFERENCES bank(bank_id),
	CONSTRAINT outcome_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE "token" (
	token_id uuid NOT NULL DEFAULT gen_random_uuid(),
	"content" varchar NOT NULL,
	user_id uuid NOT NULL,
	active bool NOT NULL DEFAULT true,
	"timestamp" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT token_content_key UNIQUE (content),
	CONSTRAINT token_pkey PRIMARY KEY (token_id),
	CONSTRAINT token_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);