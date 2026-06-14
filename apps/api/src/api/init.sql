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

-- Insert Seed Exercises (The Library)
INSERT INTO exercises (id, name, description, body_region, difficulty, category, thumbnail_url, video_url, instructions) VALUES 
('ex-001', 'Chin Tuck', 'Gentle neck exercise to improve posture', 'Neck', 'Beginner', 'Mobility', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400', 'https://www.youtube.com/watch?v=0hX0U4A-kM0', '1. Sit upright. 2. Gently tuck chin toward chest. 3. Hold 5s.'),
('ex-002', 'Scapular Retraction', 'Strengthen shoulder blade muscles', 'Shoulder', 'Beginner', 'Strengthening', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', 'https://www.youtube.com/watch?v=W0X8M2TqMkk', '1. Pull shoulder blades back and down. 2. Squeeze for 5s.'),
('ex-003', 'Hamstring Stretch', 'Improve lower limb flexibility', 'Lower Back', 'Beginner', 'Stretching', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400', 'https://www.youtube.com/watch?v=N_v9U32uXIs', '1. Sit with legs extended. 2. Lean forward at hips.'),
('ex-004', 'Bridge Exercise', 'Strengthen glutes and core', 'Hip', 'Intermediate', 'Strengthening', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400', 'https://www.youtube.com/watch?v=wPM8icPu6H8', '1. Lie on back. 2. Lift hips toward ceiling.'),
('ex-005', 'Heel Slide', 'Improve knee range of motion', 'Knee', 'Beginner', 'Mobility', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', 'https://www.youtube.com/watch?v=vV7Yp6B4C4A', '1. Slide heel toward buttock. 2. Hold, then return.'),
('ex-006', 'Calf Stretch', 'Stretch ankle and calf muscles', 'Ankle', 'Beginner', 'Stretching', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400', 'https://www.youtube.com/watch?v=0_uW_E5o1xM', '1. Lean against wall. 2. Step one foot back, keep heel down.');

-- Insert Program Templates (Menyertakan kolom exercises dengan array JSON kosong atau contoh)
INSERT INTO exercise_programs (id, name, description, clinical_goal, body_region, expected_duration, status, clinic_id, exercises) VALUES 
('tmpl-001', 'Neck Pain Relief', 'Gentle mobility and isometric strengthening for cervical spine.', 'Improve neck mobility', 'Neck', '4 weeks', 'Active', NULL, '[{"name": "Chin Tucks", "sets": 3, "reps": 10, "holdTime": 5, "video_url": "https://www.youtube.com/watch?v=0hX0U4A-kM0", "notes": "Gently tuck your chin towards your neck, maintaining upright posture."}, {"name": "Upper Trapezius Stretch", "sets": 2, "reps": 1, "holdTime": 30, "video_url": "https://www.youtube.com/watch?v=nxD-vS0Yp30", "notes": "Gently pull your head to one side until a stretch is felt."}, {"name": "Isometric Neck Side Bending", "sets": 3, "reps": 10, "holdTime": 5, "video_url": "https://www.youtube.com/watch?v=vVj_p_hO6kI", "notes": "Press your hand against the side of your head while resisting the movement."}]'),
('tmpl-002', 'Low Back Stabilization', 'Core engagement and lumbar stabilization protocol.', 'Core stability', 'Lower Back', '6 weeks', 'Active', NULL, '[{"name": "Pelvic Tilts", "sets": 3, "reps": 15, "holdTime": 0, "video_url": "https://www.youtube.com/watch?v=5rT8Y6L0o_4", "notes": "Flatten your lower back against the floor by tightening your stomach muscles."}, {"name": "Bridging", "sets": 3, "reps": 10, "holdTime": 5, "video_url": "https://www.youtube.com/watch?v=wPM8icPu6H8", "notes": "Lift your hips off the floor while keeping your back straight."}, {"name": "Bird Dog", "sets": 3, "reps": 10, "holdTime": 5, "video_url": "https://www.youtube.com/watch?v=I6Bv3S_Msh8", "notes": "Extend opposite arm and leg while maintaining a stable core."}]'),
('tmpl-003', 'Frozen Shoulder (Phase 1)', 'Passive and active-assisted ROM for adhesive capsulitis.', 'Increase ROM', 'Shoulder', '4 weeks', 'Active', NULL, '[{"name": "Pendulum Exercises", "sets": 3, "reps": 1, "holdTime": 60, "video_url": "https://www.youtube.com/watch?v=3M_p_K_3S4U", "notes": "Lean forward and let your arm hang loosely. Gently swing it in circles."}, {"name": "Passive Shoulder Flexion", "sets": 3, "reps": 10, "holdTime": 0, "video_url": "https://www.youtube.com/watch?v=AIsQO_Xf-wY", "notes": "Use a table to slide your arm forward while sitting."}, {"name": "Shoulder External Rotation", "sets": 3, "reps": 10, "holdTime": 0, "video_url": "https://www.youtube.com/watch?v=55Yq_67d26A", "notes": "Use a stick to gently push your hand outwards."}]'),
('tmpl-004', 'ACL Post-Op (Weeks 1-4)', 'Early phase ACL reconstruction protocol.', 'Post-op recovery', 'Knee', '4 weeks', 'Active', NULL, '[{"name": "Quad Sets", "sets": 3, "reps": 10, "holdTime": 5, "video_url": "https://www.youtube.com/watch?v=vV7Yp6B4C4A", "notes": "Squeeze your thigh muscle hard."}, {"name": "Heel Slides", "sets": 3, "reps": 15, "holdTime": 0, "video_url": "https://www.youtube.com/watch?v=Xz2L7Vw5-7M", "notes": "Slowly slide your heel towards your buttock."}, {"name": "Straight Leg Raises", "sets": 3, "reps": 10, "holdTime": 0, "video_url": "https://www.youtube.com/watch?v=0_uW_E5o1xM", "notes": "Keep your knee straight and lift your leg off the bed."}]'),
('tmpl-005', 'Stroke Rehab (Upper Limb)', 'Neuro-rehabilitation focusing on upper extremity function.', 'Functional recovery', 'Neurological', '8 weeks', 'Active', NULL, '[{"name": "Table Top Reach", "sets": 3, "reps": 10, "holdTime": 0, "video_url": "https://www.youtube.com/watch?v=hBf6p_vK2w4", "notes": "Slide your affected hand forward across a table."}, {"name": "Hand Squeeze", "sets": 3, "reps": 15, "holdTime": 3, "video_url": "https://www.youtube.com/watch?v=H7Z8S5e2hE0", "notes": "Squeeze a stress ball or soft sponge."}, {"name": "Wrist Extensions", "sets": 3, "reps": 12, "holdTime": 0, "video_url": "https://www.youtube.com/watch?v=r088_r0iUxE", "notes": "Lift the back of your hand towards the ceiling."}]'),
('tmpl-006', 'Knee Osteoarthritis', 'Quad strengthening and joint offloading strategies.', 'Pain management', 'Knee', '6 weeks', 'Active', NULL, '[{"name": "Wall Squats", "sets": 3, "reps": 10, "holdTime": 5, "video_url": "https://www.youtube.com/watch?v=XvHovkFpYdI", "notes": "Lean against a wall and slide down into a partial squat."}, {"name": "Terminal Knee Extension", "sets": 3, "reps": 15, "holdTime": 5, "video_url": "https://www.youtube.com/watch?v=LqU70zUuLp4", "notes": "Fully straighten your knee against a resistance band."}, {"name": "Clamshells", "sets": 3, "reps": 12, "holdTime": 0, "video_url": "https://www.youtube.com/watch?v=r_G_7X1a-sQ", "notes": "Lie on your side and lift your top knee while keeping feet together."}]');