CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    bio TEXT,
    contactEmail VARCHAR(255),
    phone VARCHAR(50),
    instagram VARCHAR(255),
    linkedin VARCHAR(255),
    profilePic VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    type ENUM('photography', 'videography', 'web-design') NOT NULL,
    category VARCHAR(100),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    src LONGTEXT NOT NULL, -- Storing Data URL or path
    is_best BOOLEAN DEFAULT FALSE,
    contributor VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(userId) ON DELETE CASCADE
);
