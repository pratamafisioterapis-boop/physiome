# PocketBase → Prisma Mapping (Top-priority collections)

This document maps key PocketBase collections to Prisma models and HTTP endpoints for the migration.

Collections covered: `users`, `clinics`, `patients`, `exercises`, `programs`, `appointments`, `invoices`.

---

## 1) users
- PB collection: `users`
- Prisma model sketch:

```
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  passwordHash  String   @map("password")
  fullName      String?  @map("full_name")
  role          UserRole @default(USER)
  clinicId      String?  @relation(fields: [clinicId], references: [id])
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

enum UserRole { USER THERAPIST ADMIN SUPER_ADMIN }
```

- Endpoints (examples):
  - GET `/users?skip=0&take=20&filter=email:like:foo` — list + paging + simple filter
  - GET `/users/:id`
  - POST `/users` — create (hash password server-side)
  - PUT `/users/:id` — update
  - DELETE `/users/:id`

- Notes: preserve PB auth behavior (password hashing, email verification) and migrate `sessions` separately.

---

## 2) clinics
- PB collection: `clinics`
- Prisma model sketch:
```
model Clinic {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  settings    Json?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  users       User[]
}
```
- Endpoints: GET `/clinics`, GET `/clinics/:id`, POST `/clinics`, PUT `/clinics/:id`.
- Notes: clinic-specific subscription stored in `clinic_subscriptions` model (already added).

---

## 3) patients
- PB collection: `patients`
- Prisma model sketch:
```
model Patient {
  id          String   @id @default(cuid())
  clinicId    String   @index
  fullName    String
  dob         DateTime?
  gender      String?
  metadata    Json?
  createdAt   DateTime @default(now())
}
```
- Endpoints: GET `/patients`, GET `/patients/:id`, POST `/patients`, PUT `/patients/:id`.
- Notes: maintain relationships to `therapist` and `programs`.

---

## 4) exercises
- PB collection: `exercises`
- Prisma model sketch:
```
model Exercise {
  id            String   @id @default(cuid())
  title         String
  slug          String?  @unique
  description   String?
  gifUrl        String?
  videoUrl      String?
  equipment     String?
  timesAssigned Int      @default(0)
  completionRate Float?
  translations  Json?
  createdAt     DateTime @default(now())
}
```
- Endpoints: GET `/exercises`, GET `/exercises/:id`, POST `/exercises`, PUT `/exercises/:id`.
- Notes: if PB stored files, migrate file URLs into `gifUrl`/`videoUrl` or separate `File` model.

---

## 5) programs (exercise_programs / programs)
- PB collections: `exercise_programs`, `programs`, `program_templates`
- Prisma model sketch (program + programExercises relation):
```
model Program {
  id          String   @id @default(cuid())
  title       String
  isPublic    Boolean  @default(false)
  createdAt   DateTime @default(now())
  exercises   ProgramExercise[]
}

model ProgramExercise {
  id         String   @id @default(cuid())
  programId  String
  exerciseId String
  order      Int
  reps       Int?
  sets       Int?
}
```
- Endpoints: GET `/programs`, GET `/programs/:id`, POST `/programs`, PUT `/programs/:id`.

---

## 6) appointments
- PB collection: `appointments`
- Prisma model sketch:
```
model Appointment {
  id          String   @id @default(cuid())
  clinicId    String
  patientId   String
  therapistId String?
  startAt     DateTime
  endAt       DateTime?
  status      String
  createdAt   DateTime @default(now())
}
```
- Endpoints: GET `/appointments`, POST `/appointments`, PUT `/appointments/:id`, DELETE `/appointments/:id`.
- Notes: preserve reminders, push notifications handled by server jobs.

---

## 7) invoices / payments
- PB collections: `invoices`, `payments`, `billingSettings`
- Prisma model sketch:
```
model Invoice {
  id          String   @id @default(cuid())
  clinicId    String
  patientId   String?
  amount      Decimal
  status      String
  issuedAt    DateTime
  paidAt      DateTime?
}

model Payment {
  id          String   @id @default(cuid())
  invoiceId   String?
  method      String
  providerId  String? // e.g., Stripe payment intent
  amount      Decimal
  status      String
  createdAt   DateTime @default(now())
}
```
- Endpoints: GET `/invoices`, POST `/invoices`, POST `/payments`, webhook `/webhook/stripe` (if using Stripe).

---

## General endpoint patterns / pagination
- Use query params: `?skip=0&take=20&sort=-createdAt&filter[field]=value`.
- Response wrapper:
```
{ data: [...], meta: { total, skip, take } }
```

## Notes about files and uploads
- PB file records are stored under PB data; migrate files to `apps/api/uploads` or S3 and store public URLs on model fields.
- Create `/uploads` endpoint that accepts multipart/form-data and returns file URL + metadata.

---

## Next step
- Create Prisma schema changes + sample migration script to import PB JSON exports.
