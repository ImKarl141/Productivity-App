-- @block

CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    bio TEXT,
    country VARCHAR(2)

);

-- @block 

INSERT INTO users (email, bio, country)
VALUES 
    ('friend@gmail.com', 'hello friend!', 'ES'),
    ('elliot@gmail.com', 'fuck society', 'AR'),
    ('dolorez@gmail.com', 'can you believe that!', 'US');


-- @block
SELECT id, email from users
ORDER BY id DESC;