-- Insert data into table `users`
INSERT INTO `users` (`name`, `email`)
VALUES ('John Doe', 'john.doe@example.com'),
       ('Jane Smith', 'jane.smith@example.com'),
       ('Mike Johnson', 'mike.johnson@example.com');

-- Insert data into table `products`
INSERT INTO `products` (`name`, `price`)
VALUES ('Product A', 10.99),
       ('Product B', 19.99),
       ('Product C', 5.99);

-- Insert data into table `categories`
INSERT INTO `categories` (`name`)
VALUES ('Category X'),
       ('Category Y'),
       ('Category Z');

-- Insert data into table `orders`
INSERT INTO `orders` (`user_id`, `order_date`)
VALUES (1, '2023-05-01'),
       (2, '2023-05-02'),
       (3, '2023-05-03');

-- Insert data into table `order_items`
INSERT INTO `order_items` (`order_id`, `product_id`, `quantity`)
VALUES (1, 1, 2),
       (1, 2, 1),
       (2, 3, 3),
       (3, 1, 1),
       (3, 2, 2);

-- Insert data into table `product_categories`
INSERT INTO `product_categories` (`product_id`, `category_id`)
VALUES (1, 1),
       (1, 2),
       (2, 2),
       (3, 3);

-- Insert data into table `addresses`
INSERT INTO `addresses` (`user_id`, `street`, `city`, `country`)
VALUES (1, '123 Main St', 'New York', 'USA'),
       (2, '456 Elm St', 'Los Angeles', 'USA'),
       (3, '789 Oak St', 'Chicago', 'USA');

-- Insert data into table `reviews`
INSERT INTO `reviews` (`product_id`, `user_id`, `rating`, `comment`)
VALUES (1, 1, 5, 'Great product!'),
       (1, 2, 4, 'Good product.'),
       (2, 3, 3, 'Average product.');

-- Insert data into table `payments`
INSERT INTO `payments` (`order_id`, `amount`, `payment_date`)
VALUES (1, 29.97, '2023-05-02'),
       (2, 59.97, '2023-05-03'),
       (3, 24.97, '2023-05-04');

-- Insert data into table `wishlist`
INSERT INTO `wishlist` (`user_id`, `product_id`)
VALUES (1, 1),
       (1, 2),
       (2, 3);