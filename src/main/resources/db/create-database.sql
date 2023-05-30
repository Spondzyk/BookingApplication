-- Create the database
CREATE DATABASE IF NOT EXISTS `migration_example`;
USE `migration_example`;

-- Create table `users`
CREATE TABLE IF NOT EXISTS `users`
(
    `id`    INT          NOT NULL AUTO_INCREMENT,
    `name`  VARCHAR(50)  NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
);

-- Create table `orders`
CREATE TABLE IF NOT EXISTS `orders`
(
    `id`         INT  NOT NULL AUTO_INCREMENT,
    `user_id`    INT  NOT NULL,
    `order_date` DATE NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

-- Create table `products`
CREATE TABLE IF NOT EXISTS `products`
(
    `id`    INT            NOT NULL AUTO_INCREMENT,
    `name`  VARCHAR(100)   NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (`id`)
);

-- Create table `order_items`
CREATE TABLE IF NOT EXISTS `order_items`
(
    `id`         INT NOT NULL AUTO_INCREMENT,
    `order_id`   INT NOT NULL,
    `product_id` INT NOT NULL,
    `quantity`   INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
);

-- Create table `categories`
CREATE TABLE IF NOT EXISTS `categories`
(
    `id`   INT         NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`)
);

-- Create table `product_categories`
CREATE TABLE IF NOT EXISTS `product_categories`
(
    `product_id`  INT NOT NULL,
    `category_id` INT NOT NULL,
    PRIMARY KEY (`product_id`, `category_id`),
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
    FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
);

-- Create table `addresses`
CREATE TABLE IF NOT EXISTS `addresses`
(
    `id`      INT          NOT NULL AUTO_INCREMENT,
    `user_id` INT          NOT NULL,
    `street`  VARCHAR(100) NOT NULL,
    `city`    VARCHAR(50)  NOT NULL,
    `country` VARCHAR(50)  NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

-- Create table `reviews`
CREATE TABLE IF NOT EXISTS `reviews`
(
    `id`         INT NOT NULL AUTO_INCREMENT,
    `product_id` INT NOT NULL,
    `user_id`    INT NOT NULL,
    `rating`     INT NOT NULL,
    `comment`    TEXT,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

-- Create table `payments`
CREATE TABLE IF NOT EXISTS `payments`
(
    `id`           INT            NOT NULL AUTO_INCREMENT,
    `order_id`     INT            NOT NULL,
    `amount`       DECIMAL(10, 2) NOT NULL,
    `payment_date` DATE           NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
);

-- Create table `wishlist`
CREATE TABLE IF NOT EXISTS `wishlist`
(
    `id`         INT NOT NULL AUTO_INCREMENT,
    `user_id`    INT NOT NULL,
    `product_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
);