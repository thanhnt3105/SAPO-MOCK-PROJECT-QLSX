DROP DATABASE IF EXISTS `db_motor_repair_store`;
CREATE DATABASE `db_motor_repair_store`;
USE `db_motor_repair_store`;

CREATE TABLE `roles` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(20)
);

CREATE TABLE `employees` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `code` VARCHAR(20) NOT NULL UNIQUE,
    `name` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(25) UNIQUE,
    `address` VARCHAR(100),
    `working_status` BOOLEAN DEFAULT TRUE,
    `available` BOOLEAN DEFAULT TRUE, -- apply only to repairing department
	`username` VARCHAR(50) UNIQUE,
    `password` VARCHAR(120),
    `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;

CREATE TABLE `employees_roles` (
    `employee_id` INT NOT NULL,
    `role_id` INT NOT NULL,

    PRIMARY KEY (`employee_id`, `role_id`),    
    FOREIGN KEY(`employee_id`) REFERENCES `employees`(`id`),
    FOREIGN KEY(`role_id`) REFERENCES `roles`(`id`)
);

CREATE TABLE `customers` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(25) NOT NULL UNIQUE,
    `address` VARCHAR(100),
    `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;

CREATE TABLE `brands` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `brand_name` VARCHAR(50) NOT NULL UNIQUE
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;

CREATE TABLE `models` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `brand_id` INT NOT NULL,
    `model_name` VARCHAR(50) NOT NULL UNIQUE,

    FOREIGN KEY(`brand_id`) REFERENCES brands(id)
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;

CREATE TABLE `motorbikes` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `license_plates` VARCHAR(20) NOT NULL UNIQUE,
    `model_id` INT NOT NULL,
    
    FOREIGN KEY (`model_id`) REFERENCES models(id)
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;

CREATE TABLE `categories` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `code` VARCHAR(20) NOT NULL UNIQUE,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(1024)
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;

CREATE TABLE `products` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `code` VARCHAR(20) NOT NULL UNIQUE,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(1024),
    `category_id` INT NOT NULL,
    `price` DECIMAL NOT NULL,
    `quantity` INT NOT NULL,
	`image` VARCHAR(512),
    `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_date` DATETIME ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (`category_id`) REFERENCES categories(id)
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;

CREATE TABLE `services` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `code` VARCHAR(20) NOT NULL UNIQUE,
    `name` VARCHAR(50) NOT NULL,
    `price` DECIMAL NOT NULL,
    `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_date` DATETIME ON UPDATE CURRENT_TIMESTAMP
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;

CREATE TABLE `products_models` (
	`model_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    
    PRIMARY KEY(`model_id`, `product_id`),
	FOREIGN KEY(`model_id`) REFERENCES models(id),
    FOREIGN KEY(`product_id`) REFERENCES products(id)
);

CREATE TABLE `tickets` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `code` VARCHAR(20) NOT NULL UNIQUE,
    `description` VARCHAR(1024),
    `note` VARCHAR(1024),
    `status` BOOLEAN,
    `discount` DECIMAL,
    `total_price` DECIMAL NOT NULL,
    `payment_method` VARCHAR(20),
    `motorbike_id` INT NOT NULL,
    `appointment_date` DATETIME,
    `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`motorbike_id`) REFERENCES motorbikes(id)
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;

CREATE TABLE `tickets_products` (
	`price` DECIMAL NOT NULL,
	`quantity` INT NOT NULL,
    `ticket_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    
    PRIMARY KEY(`ticket_id`, `product_id`),
	FOREIGN KEY(`ticket_id`) REFERENCES `tickets`(`id`),
    FOREIGN KEY(`product_id`) REFERENCES `products`(`id`)
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;

CREATE TABLE `tickets_services` (
	`price` DECIMAL NOT NULL,
    `ticket_id` INT NOT NULL,
    `service_id` INT NOT NULL,
    
    PRIMARY KEY(`ticket_id`, `service_id`),
	FOREIGN KEY(`ticket_id`) REFERENCES `tickets`(`id`),
    FOREIGN KEY(`service_id`) REFERENCES `services`(`id`)
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;

CREATE TABLE `motorbikes_customers` (
	`motorbike_id` INT NOT NULL,
    `customer_id` INT NOT NULL,
    
    PRIMARY KEY(`motorbike_id`, `customer_id`),
	FOREIGN KEY(`motorbike_id`) REFERENCES `motorbikes`(`id`),
    FOREIGN KEY(`customer_id`) REFERENCES `customers`(`id`)
);



-- Insert Data:
INSERT INTO roles(`name`) VALUES('ROLE_CASHIER');
INSERT INTO roles(`name`) VALUES('ROLE_MODERATOR');
INSERT INTO roles(`name`) VALUES('ROLE_ADMIN');
INSERT INTO roles(`name`) VALUES('ROLE_MECHANIC');


INSERT INTO `employees`(`id`, `code`, `name`, `phone`, `address`, `working_status`, `available`, `username`, `password`)
VALUES (1, 'EP000', 'SUPERUSER', '0123456789', null, 1, 1, 'superuser', '$2a$10$jBXQrLZdg.CNXs5Epfcdfu36SA72vogKa3eKoJGru3EvTLpNVlajS'); -- pass: superuser
INSERT INTO `employees_roles`(`employee_id`, `role_id`)
VALUES (1,1), (1,2), (1,3), (1,4);


INSERT INTO `employees`(`code`, `name`, `phone`, `address`)
VALUES ('EP001', 'ThaiTQ', '0123456780', null),
('EP002', 'Thái Trần', '0123456781', null),
('EP003', 'Thai', '0123456782', null),
('EP004', 'Thái', '0123456783', null),
('EP005', 'Trần Thái', '0123456784', null),
('EP006', 'Trần Quang Thái', '0123456785', null),
('EP007', 'TQT', '0123456786', null),
('EP008', 'TQThai', '0123456787', null);
INSERT INTO `employees_roles`(`employee_id`, `role_id`)
VALUES (2,1), (3,2), (4,3), (5,3), (6,2), (7,4), (8,4), (9,1);