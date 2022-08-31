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
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(1024),
    `category_id` INT NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
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
    `price` DECIMAL(10, 2) NOT NULL,
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
INSERT INTO `employees`(`code`, `name`, `phone`, `address`, `username`)
VALUES ('EP111', 'ThaiTQ', '0123456788', null, 'user');
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
VALUES (2,1), (3,2), (4,3), (5,3), (6,2), (7,4), (8,4), (9,1), (10,2);


INSERT INTO `brands`(`brand_name`)
VALUES ('Honda'), ('Yamaha'), ('Suzuki'), ('Piaggio'), ('Vinfast');


insert into models (id, brand_id, model_name) values (1, 2, 'Jupiter');
insert into models (id, brand_id, model_name) values (2, 1, 'Wave Alpha 110 (2022)');
insert into models (id, brand_id, model_name) values (3, 1, 'Vision (2022)');
insert into models (id, brand_id, model_name) values (4, 3, 'Rider R150');
insert into models (id, brand_id, model_name) values (5, 1, 'Air Blade(2022)');
insert into models (id, brand_id, model_name) values (6, 2, 'Serius (2022)');
insert into models (id, brand_id, model_name) values (7, 4, 'Liberty S 125');
insert into models (id, brand_id, model_name) values (8, 2, 'Exciter (2022)');
insert into models (id, brand_id, model_name) values (9, 1, 'Lead (2022)');
insert into models (id, brand_id, model_name) values (10, 5, 'Klara S (2022)');


insert into motorbikes (id, license_plates, model_id) values (1, '29-A1 99991', 3);
insert into motorbikes (id, license_plates, model_id) values (2, '29-B1 99992', 4);
insert into motorbikes (id, license_plates, model_id) values (3, '29-C1 99993', 4);
insert into motorbikes (id, license_plates, model_id) values (4, '29-D1 99994', 2);
insert into motorbikes (id, license_plates, model_id) values (5, '29-E1 99995', 4);
insert into motorbikes (id, license_plates, model_id) values (6, '29-F1 99996', 3);
insert into motorbikes (id, license_plates, model_id) values (7, '29-G1 99997', 6);
insert into motorbikes (id, license_plates, model_id) values (8, '29-H1 99998', 7);
insert into motorbikes (id, license_plates, model_id) values (9, '29-I1 99999', 2);
insert into motorbikes (id, license_plates, model_id) values (10, '29-K1 00000', 2);


insert into customers (id, name, phone, address) values (1, 'Heidi Pountain', '204 504 5690', null);
insert into customers (id, name, phone, address) values (2, 'Filmer Dell''Abbate', '969 680 6766', null);
insert into customers (id, name, phone, address) values (3, 'Ingrim Sawart', '845 519 3606', '076 Twin Pines Terrace');
insert into customers (id, name, phone, address) values (4, 'Giles Wisdish', '872 404 2666', '831 Monterey Terrace');
insert into customers (id, name, phone, address) values (5, 'Marven Jeste', '386 984 3751', null);
insert into customers (id, name, phone, address) values (6, 'Papagena Nisot', '693 373 1336', null);
insert into customers (id, name, phone, address) values (7, 'Yolande Winsom', '677 762 7798', null);
insert into customers (id, name, phone, address) values (8, 'Tab Stiller', '635 225 5522', null);
insert into customers (id, name, phone, address) values (9, 'Yehudit Davidove', '370 807 3824', null);
insert into customers (id, name, phone, address) values (10, 'Mick Wyndham', '434 837 0067', '0301 Kensington Street');


insert into categories (`code`, `name`, `description`) values ('DM001', 'Phụ tùng thay thế', 'Linh kiện thiết bị dùng để thay thế cho xe máy');
insert into categories (`code`, `name`, `description`) values ('DM002', 'Đồ chơi xe máy', 'Các loại kính hậu, bao tay, Tay thắng, Đèn led xe máy');
insert into categories (`code`, `name`, `description`) values ('DM003', 'Vỏ khung xe máy', 'Vỏ xe máy, lốp xe Michelin, Dunlop, Maxxis...');
insert into categories (`code`, `name`, `description`) values ('DM004', 'Nhớt xe máy', 'Các loại dầu nhớt thay/tra cho xe: Shell, Motul, Repsol...');
insert into categories (`code`, `name`, `description`) values ('DM005', 'Phụ kiện cho biker', 'Các phụ kiện dành cho các tay lái lụa, tay đua, bốc đầu, dân phượt: Nón bảo hiểm, Đồ phượt');
insert into categories (`code`, `name`, `description`) values ('DM006', 'Khác', 'Các linh kiện, phụ tùng khác');


insert into products (code, name, description, category_id, price, quantity, image) values ('SP001', 'Giáp inox bảo hộ Pro Biker (chính hãng)', '', 5, 159477.63, 75, null);
insert into products (code, name, description, category_id, price, quantity, image) values ('SP002', 'Vỏ Michelin City Grip 2 130/70-16', '', 3, 7865709.48, 12, null);
insert into products (code, name, description, category_id, price, quantity, image) values ('SP003', 'Shell Advance Xe công nghệ Scooter 10W40 1L', '', 4, 380965.33, 46, null);
insert into products (code, name, description, category_id, price, quantity, image) values ('SP004', 'Phuộc Nitron bình dầu chính hãng Việt Nam cho Wave, Dream, Future', '', 1, 8641886.0, 35, null);
insert into products (code, name, description, category_id, price, quantity, image) values ('SP005', 'Bộ nhông sên dĩa Light cho Yamaha Sirius/Jupiter xăng cơ', '', 1, 2416731.59, 86, null);
insert into products (code, name, description, category_id, price, quantity, image) values ('SP006', 'Tay thắng Carbon cho AB160', '', 2, 3142536.91, 60, null);
insert into products (code, name, description, category_id, price, quantity, image) values ('SP007', 'Lọc gió DNA chính hãng cho Honda SHVN 2020 - 2021 - 2022', '', 1, 3093323.86, 21, null);
insert into products (code, name, description, category_id, price, quantity, image) values ('SP008', 'Kính CNC 002 mẫu mới', '', 2, 6316856.0, 67, null);
insert into products (code, name, description, category_id, price, quantity, image) values ('SP009', 'Nhớt Repsol Racing 10W40 1lit', '', 4, 7734254.92, 31, null);
insert into products (code, name, description, category_id, price, quantity, image) values ('SP010', 'Găng tay bảo hộ dài ngón Mechanix Mpact', '', 5, 5850018.0, 58, null);


insert into services (code, name, price) values ('DV001', 'Bảo dưỡng xe máy các hãng', 681085.41);
insert into services (code, name, price) values ('DV002', 'Làm nồi xe tay ga', 4495804.0);
insert into services (code, name, price) values ('DV003', 'Vệ sinh kim phun xăng điện tử', 4929590.93);
insert into services (code, name, price) values ('DV004', 'Sửa phuộc, thay chén cổ xe máy', 1602927.59);
insert into services (code, name, price) values ('DV005', 'Vệ sinh nồi xe các loại', 5849114.02);