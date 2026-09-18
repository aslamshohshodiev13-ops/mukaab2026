-- Переносит старые email/phone в новые поля раздела "Контакты" + выставляет порядок по умолчанию.
-- Старые ключи email/phone не удаляются (на всякий случай), просто больше не используются в админке.
-- mysql -u root -p mukaab < migration_011_contacts_migrate.sql

INSERT INTO settings (setting_key, setting_value)
SELECT 'contact_email', setting_value FROM settings WHERE setting_key='email'
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

INSERT INTO settings (setting_key, setting_value)
SELECT 'contact_phone', setting_value FROM settings WHERE setting_key='phone'
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

INSERT INTO settings (setting_key, setting_value) VALUES
  ('telegram_order','1'), ('whatsapp_order','2'), ('contact_email_order','3'), ('contact_phone_order','4'),
  ('telegram_enabled','1'), ('whatsapp_enabled','1'), ('contact_email_enabled','1'), ('contact_phone_enabled','1')
ON DUPLICATE KEY UPDATE setting_key=setting_key;
