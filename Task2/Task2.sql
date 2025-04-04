--create tables
CREATE TABLE IF NOT EXISTS PUBLIC."Clients" (
	"Id" BIGINT NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	"ClientName" VARCHAR(200) NOT NULL,
	CONSTRAINT "PK_Clients" PRIMARY KEY ("Id")
);

CREATE TABLE IF NOT EXISTS PUBLIC."ClientContacts" (
	"Id" BIGINT NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	"ClientId" BIGINT,
	"ContactType" VARCHAR(200) NOT NULL,
	"ContactValue" VARCHAR(200) NOT NULL,
	CONSTRAINT "PK_ClientContacts" PRIMARY KEY ("Id"),
	CONSTRAINT "FK_ClientContacts_Clients_ClientId" FOREIGN KEY ("ClientId") REFERENCES PUBLIC."Clients" ("Id") MATCH SIMPLE ON UPDATE NO ACTION ON DELETE RESTRICT
);

--seed tables
INSERT INTO
	PUBLIC."Clients" ("Id", "ClientName")
VALUES
	(1, 'Клиент1'),
	(2, 'Клиент2'),
	(3, 'Клиент3'),
	(4, 'Клиент4');
	
INSERT INTO
	PUBLIC."ClientContacts" ("ClientId", "ContactType", "ContactValue")
VALUES
	(1, 'тип1', 'значение1'),
	(2, 'тип1', 'значение1'),
	(2, 'тип2', 'значение2'),
	(3, 'тип1', 'значение1'),
	(3, 'тип2', 'значение2'),
	(3, 'тип3', 'значение3'),
	(4, 'тип1', 'значение1'),
	(4, 'тип2', 'значение2'),
	(4, 'тип3', 'значение3'),
	(4, 'тип4', 'значение4');
	
--client contact count
SELECT
	"Clients"."Id",
	"Clients"."ClientName",
	COUNT(*)
FROM
	PUBLIC."Clients"
	JOIN "ClientContacts" ON "Clients"."Id" = "ClientContacts"."ClientId"
GROUP BY
	1,
	2;
	
--clients having contact count > 2
SELECT
	"Clients"."Id",
	"Clients"."ClientName",
	COUNT(*)
FROM
	PUBLIC."Clients"
	JOIN "ClientContacts" ON "Clients"."Id" = "ClientContacts"."ClientId"
GROUP BY
	1,
	2
HAVING
	COUNT(*) > 2;

--Drop tables
DROP TABLE IF EXISTS public."ClientContacts";
DROP TABLE IF EXISTS public."Clients";

