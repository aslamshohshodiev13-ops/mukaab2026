-- Таблица заявок с сайта (кнопки "Оставить заявку", "Откликнуться" на вакансию, форма контактов).
-- mysql -u root -p mukaab < migration_009_applications.sql

CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) DEFAULT '',
  contact VARCHAR(200) DEFAULT '',       -- телефон / telegram / email, как ввёл человек
  message TEXT,
  source_page VARCHAR(100) DEFAULT '',   -- с какой страницы отправлено, напр. "Авторский надзор"
  subject VARCHAR(200) DEFAULT '',       -- напр. название вакансии или "Общий отклик"
  status ENUM('new','read','done') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
