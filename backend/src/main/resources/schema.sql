CREATE TABLE IF NOT EXISTS `user` (
                                      `id` INT AUTO_INCREMENT PRIMARY KEY,
                                      `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50),
    `password` VARCHAR(255) NOT NULL,
    `active` TINYINT(1) NOT NULL,
    `created_at` TIMESTAMP NOT NULL ,
    `created_by` VARCHAR(20) NOT NULL DEFAULT 'system',
    `updated_at` TIMESTAMP,
    `updated_by` VARCHAR(20) DEFAULT NULL
    );

CREATE TABLE IF NOT EXISTS `client` (
                                        `id` INT AUTO_INCREMENT PRIMARY KEY,
                                        `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50),
    `contact_info` TEXT,
    `additional_info` TEXT,
    `status` VARCHAR(50),
    `created_at` TIMESTAMP ,
    `created_by` VARCHAR(20) NOT NULL DEFAULT 'system',
    `updated_at` TIMESTAMP,
    `updated_by` VARCHAR(20) DEFAULT NULL
    );

CREATE TABLE IF NOT EXISTS `claim` (
                                       `id` INT AUTO_INCREMENT PRIMARY KEY,
                                       `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `deadline` TIMESTAMP,
    `status` VARCHAR(50),
    `user_id` INT,
    `client_id` INT,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `created_by` VARCHAR(20) NOT NULL DEFAULT 'system',  -- Значення за замовчуванням
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(20) DEFAULT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`client_id`) REFERENCES `client` (`id`) ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS `document` (
                                          `id` INT AUTO_INCREMENT PRIMARY KEY,                                  `claim_id` INT NOT NULL,                                  `name` VARCHAR(255) NOT NULL,
    `text` TEXT,
    `created_at` TIMESTAMP NOT NULL ,
    `updated_at` TIMESTAMP,
    FOREIGN KEY (`claim_id`) REFERENCES `claim` (`id`) ON DELETE CASCADE
    );

INSERT INTO `user` (first_name, last_name, email, phone, password, active, created_at)
VALUES
    ('John', 'Doe', 'john.doe@example.com', '123456789', 'hashed_password_1', 1, CURRENT_TIMESTAMP),
    ('Jane', 'Smith', 'jane.smith@example.com', '987654321', 'hashed_password_2', 1, CURRENT_TIMESTAMP);

INSERT INTO `client` (first_name, last_name, email, phone, contact_info, additional_info, status, created_at)
VALUES
    ('Acme', 'Corp', 'contact@acme.com', '111222333', 'Some contact info', 'Additional info', 'active', CURRENT_TIMESTAMP),
    ('Beta', 'Industries', 'info@beta.com', '444555666', 'Another contact', 'Extra details', 'inactive', CURRENT_TIMESTAMP);

INSERT INTO `claim` (name, description, deadline, status, user_id, client_id, created_at)
VALUES
    ('Claim 1', 'Description for claim 1', '2024-12-31 23:59:59', 'open', 1, 1, CURRENT_TIMESTAMP),
    ('Claim 2', 'Description for claim 2', '2024-11-30 23:59:59', 'closed', 2, 2, CURRENT_TIMESTAMP);

INSERT INTO `document` (claim_id, name, text, created_at)
VALUES
    (1, 'Document 1', 'This is the text for document 1',CURRENT_TIMESTAMP),
    (2, 'Document 2', 'This is the text for document 2',CURRENT_TIMESTAMP);