-- create table
CREATE TABLE IF NOT EXISTS PUBLIC."Dates" ("Id" BIGINT NOT NULL, "Dt" DATE NOT NULL);

-- seed table
INSERT INTO
	PUBLIC."Dates" ("Id", "Dt")
VALUES
	(1, '2021-01-01'),
	(1, '2021-01-10'),
	(1, '2021-01-30'),
	(2, '2021-01-15'),
	(2, '2021-01-30');

-- Get date intervels
WITH
	"RankedDates" AS (
		SELECT
			"Id",
			"Dt",
			ROW_NUMBER() OVER (
				PARTITION BY
					"Id"
				ORDER BY
					"Dt"
			) AS "RowNum"
		FROM
			PUBLIC."Dates"
	)
SELECT
	R1."Id",
	R1."Dt" AS "Sd",
	R2."Dt" AS "Ed"
FROM
	"RankedDates" R1
	JOIN "RankedDates" R2 ON R1."Id" = R2."Id"
	AND R1."RowNum" + 1 = R2."RowNum"
ORDER BY
	R1."Id",
	R1."Dt";

--Drop tables
DROP TABLE IF EXISTS PUBLIC."Dates";
