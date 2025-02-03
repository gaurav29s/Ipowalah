CREATE DATABASE SearchApp;
USE SearchApp;

CREATE TABLE Items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO Items (name, description)
VALUES
('Enviro Infra', ' A leading environmental infrastructure company dedicated to sustainable development and eco-friendly solutions. Our mission is to design, build, and operate infrastructure projects that minimize environmental impact and maximize social benefits.
We specialize in:
- Renewable energy systems
- Water and wastewater management
- Waste reduction and recycling
- Green building and sustainable construction
- Environmental consulting and advisory services
Our team of experts is passionate about creating innovative solutions that protect the environment and support communities. We work closely with clients, governments, and stakeholders to deliver projects that meet the highest standards of environmental stewardship and social responsibility.

At [Company Name], we believe that a sustainable future is possible through collaboration, innovation, and a commitment to excellence. Join us in building a better world for generations to come.'),
('Banana', 'A yellow tropical fruit'),
('Carrot', 'An orange root vegetable');