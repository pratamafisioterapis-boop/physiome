-- Skema Database Awal untuk Physiome (MySQL)

DROP DATABASE IF EXISTS physiome;
CREATE DATABASE IF NOT EXISTS physiome;
USE physiome;

-- Tabel Pasien (Fitur Utama) - Dipindahkan ke atas agar bisa di-refer oleh tabel lain
CREATE TABLE IF NOT EXISTS patients (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    status ENUM('Active', 'Inactive', 'Discharged') DEFAULT 'Active',
    clinic_id VARCHAR(255),
    birth_date DATE,
    gender ENUM('male', 'female', 'other'),
    address TEXT,
    occupation VARCHAR(255),
    main_complaint TEXT,
    diagnosis TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Clinics
CREATE TABLE IF NOT EXISTS clinics (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Users
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fullName VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    role ENUM('admin', 'therapist', 'patient') DEFAULT 'therapist',
    invite_code_id VARCHAR(255),
    clinic_id VARCHAR(255), -- Menambahkan kolom clinic_id
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Invite Codes
CREATE TABLE IF NOT EXISTS invite_codes (
    id VARCHAR(255) PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL,
    is_active TINYINT(1) DEFAULT 1,
    expires_at DATETIME,
    used_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (used_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Link users to invite_codes
ALTER TABLE users ADD CONSTRAINT fk_user_invite FOREIGN KEY (invite_code_id) REFERENCES invite_codes(id);

-- Tabel untuk Riwayat Chat AI (Dibutuhkan oleh integrated-ai.js)
CREATE TABLE IF NOT EXISTS integrated_ai_messages (
    id VARCHAR(255) PRIMARY KEY, -- Mengubah tipe ID menjadi VARCHAR untuk UUID
    userId VARCHAR(255),
    role VARCHAR(50) NOT NULL, -- user, assistant, tool
    content JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk Pelacakan Gambar AI
CREATE TABLE IF NOT EXISTS integrated_ai_images (
    id VARCHAR(255) PRIMARY KEY, -- Mengubah tipe ID menjadi VARCHAR untuk UUID
    userId VARCHAR(255),
    filename VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Exercises
CREATE TABLE IF NOT EXISTS exercises (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    body_region VARCHAR(100),
    difficulty ENUM('Beginner', 'Intermediate', 'Advanced'),
    category VARCHAR(100),
    thumbnail_url TEXT,
    video_url TEXT,
    instructions TEXT,
    contraindications TEXT,
    progression_tips TEXT,
    clinic_id VARCHAR(255),
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Exercise Programs
CREATE TABLE IF NOT EXISTS exercise_programs (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    clinical_goal TEXT,
    body_region VARCHAR(100),
    expected_duration VARCHAR(50),
    exercises JSON, -- Menyimpan urutan exercise dan config timer
    created_by VARCHAR(255),
    clinic_id VARCHAR(255),
    status ENUM('Active', 'Draft', 'Archived') DEFAULT 'Active',
    ai_generated TINYINT(1) DEFAULT 0,
    ai_confidence_score FLOAT,
    ai_prompt TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Program Assignments
CREATE TABLE IF NOT EXISTS program_assignments (
    id VARCHAR(255) PRIMARY KEY,
    program_id VARCHAR(255),
    patient_id VARCHAR(255),
    start_date DATETIME,
    end_date DATETIME,
    therapist_notes TEXT,
    status ENUM('Active', 'Completed', 'Paused', 'Cancelled') DEFAULT 'Active',
    clinic_id VARCHAR(255),
    adherence_rate INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Tabel SOAP Notes (Fitur Utama)
CREATE TABLE IF NOT EXISTS soap_notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id VARCHAR(255) NOT NULL,
    therapist_id VARCHAR(255),
    subjective TEXT,
    objective TEXT,
    assessment TEXT,
    plan TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Tabel Appointments
CREATE TABLE IF NOT EXISTS appointments (
    id VARCHAR(255) PRIMARY KEY,
    patient_id VARCHAR(255) NOT NULL,
    therapist_id VARCHAR(255),
    clinic_id VARCHAR(255),
    date DATE NOT NULL,
    time VARCHAR(10) NOT NULL,
    duration INT DEFAULT 30,
    status ENUM('Scheduled', 'Confirmed', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Tabel Billing Settings
CREATE TABLE IF NOT EXISTS billing_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    currentCounter INT DEFAULT 1,
    lastDateKey VARCHAR(10)
);

-- Tabel Invoices
CREATE TABLE IF NOT EXISTS invoices (
    id VARCHAR(255) PRIMARY KEY,
    invoiceNumber VARCHAR(100) NOT NULL UNIQUE,
    patientId VARCHAR(255) NOT NULL,
    therapistId VARCHAR(255),
    invoiceDate DATETIME NOT NULL,
    dueDate DATETIME NOT NULL,
    totalAmount INT NOT NULL, -- in cents
    amountPaid INT DEFAULT 0,
    status ENUM('Draft', 'Sent', 'Partial', 'Paid', 'Overdue', 'Void') DEFAULT 'Draft',
    packageType VARCHAR(100),
    emailSentDate DATETIME,
    emailSentTo VARCHAR(255),
    reminderSentDate DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patientId) REFERENCES patients(id)
);

-- Tabel Payments
CREATE TABLE IF NOT EXISTS payments (
    id VARCHAR(255) PRIMARY KEY,
    invoiceId VARCHAR(255) NOT NULL,
    patientId VARCHAR(255) NOT NULL,
    paymentAmount INT NOT NULL,
    paymentDate DATETIME NOT NULL,
    paymentMethod VARCHAR(50),
    referenceNumber VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (invoiceId) REFERENCES invoices(id),
    FOREIGN KEY (patientId) REFERENCES patients(id)
);

-- Tabel Patient Packages
CREATE TABLE IF NOT EXISTS patient_packages (
    id VARCHAR(255) PRIMARY KEY,
    patientId VARCHAR(255) NOT NULL,
    packageId VARCHAR(255),
    status ENUM('Active', 'Expiring Soon', 'Expired', 'Completed') DEFAULT 'Active',
    totalSessions INT DEFAULT 0,
    sessionsUsed INT DEFAULT 0,
    expiryDate DATETIME,
    renewalCount INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patientId) REFERENCES patients(id)
);

-- Tabel User Language Preferences
CREATE TABLE IF NOT EXISTS user_language_preferences (
    userId VARCHAR(255) PRIMARY KEY,
    preferred_language VARCHAR(5) DEFAULT 'en',
    app_language VARCHAR(5) DEFAULT 'en',
    exercise_language VARCHAR(5) DEFAULT 'en',
    reminder_language VARCHAR(5) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Menambahkan created_at
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Exercises (Latihan)
CREATE TABLE IF NOT EXISTS exercises (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    body_region VARCHAR(100),
    difficulty ENUM('Beginner', 'Intermediate', 'Advanced'),
    category VARCHAR(100),
    thumbnail_url TEXT,
    video_url TEXT,
    instructions TEXT,
    clinic_id VARCHAR(255),
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Exercise Programs (Protokol/Template)
CREATE TABLE IF NOT EXISTS exercise_programs (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    clinical_goal TEXT,
    body_region VARCHAR(100),
    expected_duration VARCHAR(50),
    exercises JSON, -- Menyimpan konfigurasi latihan dalam format JSON
    created_by VARCHAR(255),
    clinic_id VARCHAR(255),
    status ENUM('Active', 'Draft', 'Archived') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Appointments (Janji Temu)
CREATE TABLE IF NOT EXISTS appointments (
    id VARCHAR(255) PRIMARY KEY,
    patient_id VARCHAR(255) NOT NULL,
    therapist_id VARCHAR(255),
    clinic_id VARCHAR(255),
    date DATE NOT NULL,
    time VARCHAR(10) NOT NULL,
    duration INT DEFAULT 30,
    status ENUM('Scheduled', 'Confirmed', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);


-- Index untuk performa pencarian
CREATE INDEX idx_ai_messages_user ON integrated_ai_messages(userId);
CREATE INDEX idx_soap_notes_patient ON soap_notes(patient_id);
CREATE INDEX idx_invoices_patient ON invoices(patientId);
CREATE INDEX idx_payments_invoice ON payments(invoiceId);

-- Insert default settings
INSERT INTO billing_settings (currentCounter, lastDateKey) VALUES (0, '');

-- Insert sample users (Password: demo123456)
-- Catatan: Untuk pengembangan, kita menggunakan password plain text sesuai implementasi auth.js saat ini.
INSERT INTO users (id, email, password, fullName, role) VALUES 
('user-admin-001', 'admin@demo.com', 'demo123456', 'Administrator System', 'admin'),
('user-therapist-001', 'therapist@demo.com', 'demo123456', 'Budi Santoso, M.Fis', 'therapist'),
('user-patient-001', 'patient@demo.com', 'demo123456', 'Siti Aminah', 'patient');

-- Insert sample invite codes
INSERT INTO invite_codes (id, code, role, is_active) VALUES 
('invite-dev-001', 'PHYSIO2025', 'therapist', 1);