CREATE DATABASE online_shopping;
USE online_shopping;
CREATE TABLE CUSTOMER (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15),
    address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE PRODUCT (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE ORDERS (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'PLACED',
    total_amount DECIMAL(12, 2) DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES CUSTOMER(customer_id) ON DELETE CASCADE
);
CREATE TABLE ORDER_ITEMS (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(12, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES ORDERS(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES PRODUCT(product_id)
);
SHOW TABLES;
DESC CUSTOMER
INSERT INTO CUSTOMER (name, email, phone, address)
VALUES (
        'Priya Singh',
        'priya@example.com',
        '9876501234',
        '123 A Block, City'
    ),
    (
        'Rohit Sharma',
        'rohit@example.com',
        '8765432109',
        '45 B Lane, City'
    );
INSERT INTO PRODUCT (name, description, price, stock)
VALUES (
        'Wireless Mouse',
        'Ergonomic wireless mouse',
        799.00,
        50
    ),
    (
        'Mechanical Keyboard',
        'RGB mechanical keyboard',
        2499.00,
        20
    ),
    ('USB-C Charger', '30W fast charger', 899.00, 30);
SHOW DATABASES