CREATE DATABASE IF NOT EXISTS clarity_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE clarity_db;

CREATE TABLE IF NOT EXISTS trusted_sources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  domain VARCHAR(150) NOT NULL,
  source_url VARCHAR(255) NOT NULL,
  UNIQUE KEY uq_domain (domain)
);

INSERT INTO trusted_sources (name, domain, source_url) VALUES
  ('RFI Afrique', 'rfi.fr', 'https://www.rfi.fr/afrique/'),
  ('BBC Afrique', 'bbc.com', 'https://www.bbc.com/afrique/'),
  ('France 24', 'france24.com', 'https://www.france24.com/'),
  ('Jeune Afrique', 'jeuneafrique.com', 'https://www.jeuneafrique.com/'),
  ('TVM', 'tvm.mg', 'https://www.tvm.mg/'),
  ('KOLO TV', 'kolotv.mg', 'https://www.kolotv.mg/');


