ALTER TABLE `users`
    ADD COLUMN `dateOfBirth` DATE;

UPDATE `users`
SET `dateOfBirth` = CASE `email`
                        WHEN 'john.doe@example.com' THEN '1990-05-15'
                        WHEN 'jane.smith@example.com' THEN '1985-09-23'
                        WHEN 'mike.johnson@example.com' THEN '1998-02-10'
    END
WHERE `email` IN ('john.doe@example.com', 'jane.smith@example.com', 'mike.johnson@example.com');
