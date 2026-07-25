# Physiome Exercise & Protocol Library

<!-- GENERATED FILE - regenerate with: node tools/seed/build-exercise-library.mjs -->

Global library shipped with Physiome: **125 exercises** and **35 protocol templates**.

Every entry is written from a published clinical practice guideline or trial, and stores that
source in `evidence_source`. Patient-facing text (`instructions`, `contraindications`,
`progression_tips`) is Indonesian; `instructions_en` carries the English version. Rows are
global (`clinic_id IS NULL`): every clinic can read and prescribe them, and no clinic can edit
them — clinics stay free to add their own exercises on top.

Evidence levels: **A** = RCT or clinical practice guideline, **B** = cohort/consensus, **C** = expert or mechanistic rationale.

## Editing the library

1. Edit the JSON in `supabase/seed/exercises/` or `supabase/seed/programs/`.
2. Run `node tools/seed/build-exercise-library.mjs`.
3. Apply `supabase/migrations/20260725120100_seed_global_exercise_library.sql`.

The generator validates required fields, rejects duplicate slugs, and fails if a program
references an exercise slug that does not exist. IDs are derived from the slug, so re-running
updates rows in place rather than creating duplicates.

## Protocol templates

| Protocol | Indication | Duration | Evidence source |
| --- | --- | --- | --- |
| Rehabilitasi ACL - Fase 1: Proteksi & Pemulihan Ekstensi (0-4 Minggu) | Pasca rekonstruksi ligamen cruciatum anterior (ACL) | 4 minggu | Adams et al. JOSPT 2012;42(7):601-614; Logerstedt et al. Knee Ligament Sprain CPG, JOSPT 2017;47(11):A1-A47; Delaware-Oslo ACL Cohort |
| Rehabilitasi ACL - Fase 2: Penguatan Progresif (4-12 Minggu) | Pasca rekonstruksi ACL, fase penguatan | 8 minggu | Logerstedt et al. JOSPT 2017; Grindem et al. Br J Sports Med 2016;50(13):804-808 (Delaware-Oslo); Adams et al. JOSPT 2012 |
| Osteoartritis Lutut - Latihan Neuromuskular & Kekuatan | Osteoartritis lutut ringan hingga berat (termasuk yang menunggu operasi) | 6-8 minggu | Skou & Roos BMC Musculoskelet Disord 2017;18:72 (GLA:D); Fransen et al. Cochrane 2015;1:CD004376; Ageberg et al. BMC Musculoskelet Disord 2010 (NEMEX) |
| Nyeri Patellofemoral (Nyeri Lutut Depan) | Nyeri patellofemoral / anterior knee pain / runner's knee | 6-12 minggu | Willy et al. Patellofemoral Pain CPG, JOSPT 2019;49(9):CPG1-CPG95; Collins et al. Br J Sports Med 2018 (consensus) |
| Tendinopati Patella (Jumper's Knee) | Tendinopati tendon patella (nyeri tepat di bawah tempurung lutut saat melompat/jongkok) | 12 minggu | Rio et al. Br J Sports Med 2015;49(19):1277-1283; Kongsgaard et al. Scand J Med Sci Sports 2009;19(6):790-802 (heavy slow resistance) |
| Pasca Operasi Ganti Sendi Lutut - Fase Awal (0-6 Minggu) | Pasca total knee arthroplasty (penggantian sendi lutut) | 6 minggu | Brigham and Women's Hospital Total Knee Arthroplasty Protocol; Bade & Stevens-Lapsley JOSPT 2012; Artz et al. BMC Musculoskelet Disord 2015 |
| Nyeri Punggung Bawah Akut - Program Pemulihan Aktif | Nyeri punggung bawah akut non-spesifik (< 6 minggu) | 4-6 minggu | George et al. Low Back Pain CPG, JOSPT 2021;51(11):CPG1-CPG60; NICE NG59 Low Back Pain and Sciatica; Long et al. Spine 2004 (directional preference) |
| Nyeri Punggung Bawah Kronis - Kontrol Motorik & Penguatan | Nyeri punggung bawah kronis non-spesifik (> 12 minggu) | 8-12 minggu | Saragiotto et al. Cochrane 2016;1:CD012004 (motor control exercise); George et al. JOSPT 2021; Hayden et al. Cochrane 2021 (exercise for CLBP) |
| Radikulopati Lumbal / Sciatica | Radikulopati lumbal / sciatica (nyeri menjalar di bawah lutut dengan atau tanpa kesemutan) | 6-12 minggu | George et al. Low Back Pain CPG, JOSPT 2021; Basson et al. JOSPT 2017 (neural mobilisation); NICE NG59 |
| Nyeri Leher Mekanik - Kontrol Motorik & Penguatan | Nyeri leher mekanik dengan gangguan kontrol motorik (termasuk nyeri leher pekerja kantor) | 6-8 minggu | Blanpied et al. Neck Pain CPG, JOSPT 2017;47(7):A1-A83; Jull et al. Spine 2002; Ylinen et al. JAMA 2003 |
| Program Pekerja Kantor - Leher, Bahu & Punggung | Nyeri leher-bahu terkait pekerjaan / pencegahan pada pekerja kantor | Berkelanjutan | Blanpied et al. Neck Pain CPG, JOSPT 2017; Waongenngarm et al. Appl Ergon 2018; WHO Physical Activity Guidelines 2020 |
| Nyeri Bahu Terkait Rotator Cuff | Nyeri bahu terkait rotator cuff / subacromial pain syndrome / tendinopati rotator cuff | 12-16 minggu | Hopewell et al. GRASP trial, Lancet 2021;398(10298):416-428; Littlewood et al. Physiotherapy 2015; Cools et al. Br J Sports Med 2014 |
| Frozen Shoulder - Fase Nyeri (Iritabilitas Tinggi) | Kapsulitis adhesiva (frozen shoulder) fase 1-2, iritabilitas tinggi | 6-12 minggu (fase dapat berlangsung 3-9 bulan) | Kelley et al. Adhesive Capsulitis CPG, JOSPT 2013;43(5):A1-A31 |
| Frozen Shoulder - Fase Kaku (Iritabilitas Rendah) | Kapsulitis adhesiva fase 3 (frozen/thawing), iritabilitas rendah | 8-16 minggu | Kelley et al. Adhesive Capsulitis CPG, JOSPT 2013;43(5):A1-A31 |
| Tennis Elbow (Tendinopati Epikondilus Lateral) | Tendinopati epikondilus lateral (tennis elbow) | 6-12 minggu | Lucado et al. Lateral Elbow Tendinopathy CPG, JOSPT 2022;52(12):CPG1-CPG111; Tyler et al. J Shoulder Elbow Surg 2010 |
| Carpal Tunnel Syndrome - Program Konservatif | Carpal tunnel syndrome ringan sampai sedang | 6-8 minggu | Erickson et al. Hand Pain and Sensory Deficits: Carpal Tunnel Syndrome CPG, JOSPT 2019;49(5):CPG1-CPG85; Ballestero-Perez et al. JMPT 2017 |
| Tendinopati Achilles Midportion - Protokol Eksentrik | Tendinopati Achilles midportion (nyeri 2-6 cm di atas tumit) | 12 minggu | Alfredson et al. Am J Sports Med 1998;26(3):360-366; Martin et al. Achilles Pain CPG, JOSPT 2018;48(5):A1-A38; Stevens & Tan JOSPT 2014 |
| Nyeri Tumit Plantar - Latihan Beban Tinggi | Plantar fasciitis / nyeri tumit plantar | 12 minggu | Rathleff et al. Scand J Med Sci Sports 2015;25(3):e292-e300; Martin et al. Heel Pain CPG, JOSPT 2023;53(12):CPG1-CPG39; DiGiovanni et al. JBJS 2003 |
| Keseleo Pergelangan Kaki - Fase Awal (0-2 Minggu) | Keseleo pergelangan kaki lateral akut (derajat I-II) | 2 minggu | Martin et al. Ankle Stability and Movement Coordination Impairments CPG, JOSPT 2021;51(4):CPG1-CPG80; Vuurberg et al. Br J Sports Med 2018 |
| Instabilitas Pergelangan Kaki Kronis - Keseimbangan & Penguatan | Instabilitas pergelangan kaki kronis / keseleo berulang | 4-6 minggu | Martin et al. Ankle Stability CPG, JOSPT 2021; Wester et al. JOSPT 1996; McKeon & Hertel J Athl Train 2008 |
| Tendinopati Gluteal (Nyeri Sisi Luar Panggul) | Tendinopati gluteus medius/minimus (greater trochanteric pain syndrome) | 8-12 minggu | Mellor et al. BMJ 2018;361:k1662 (LEAP trial); Grimaldi & Fearon JOSPT 2015;45(11):910-922 |
| Cedera Hamstring - Penguatan & Kembali Berlari | Cedera regangan hamstring derajat I-II, fase subakut hingga kembali berolahraga | 6-10 minggu | Petersen et al. Am J Sports Med 2011;39(11):2296-2303; van Dyk et al. Br J Sports Med 2019; Askling et al. Br J Sports Med 2013 |
| Osteoartritis Panggul - Latihan Terapeutik | Osteoartritis panggul | 8-12 minggu | Fransen et al. Cochrane 2014;4:CD007912 (hip OA exercise); Cibulka et al. Hip Pain and Mobility Deficits CPG, JOSPT 2017;47(6):A1-A37 |
| Pencegahan Jatuh Lansia - Program Otago | Lansia dengan risiko jatuh, riwayat jatuh dalam 12 bulan terakhir, atau gangguan keseimbangan | 6 bulan | Campbell et al. BMJ 1997;315:1065 (Otago); Robertson et al. BMJ 2001;322:697; Sherrington et al. Br J Sports Med 2017 (falls prevention meta-analysis) |
| Kesehatan Tulang - Osteopenia & Osteoporosis | Osteopenia dan osteoporosis (tanpa fraktur vertebra baru) | 8 bulan program inti, dilanjutkan pemeliharaan | Watson et al. J Bone Miner Res 2018;33(2):211-220 (LIFTMOR); Beck et al. J Sci Med Sport 2017 (Exercise and Sports Science Australia position statement) |
| Rehabilitasi Stroke - Mobilitas & Kontrol Batang Tubuh | Pasca stroke, fase subakut hingga kronis, dengan gangguan mobilitas | 8-12 minggu, dilanjutkan pemeliharaan | Winstein et al. AHA/ASA Adult Stroke Rehabilitation and Recovery Guideline, Stroke 2016;47(6):e98-e169; Billinger et al. Stroke 2014 (physical activity after stroke) |
| Penyakit Parkinson - Latihan Amplitudo Besar | Penyakit Parkinson tahap ringan-sedang | 4 minggu intensif + pemeliharaan seumur hidup | Ebersbach et al. Mov Disord 2010;25(12):1902-1908 (LSVT BIG RCT); Osborne et al. Parkinson Disease CPG, J Neurol Phys Ther 2022;46(4):240-269 |
| Rehabilitasi Vestibular - Hipofungsi Vestibular Unilateral | Hipofungsi vestibular perifer unilateral (neuritis vestibular, pasca labirintitis, gangguan keseimbangan vestibular) | 4-6 minggu | Hall et al. Vestibular Rehabilitation for Peripheral Vestibular Hypofunction: Updated CPG, J Neurol Phys Ther 2022;46(2):118-177 |
| Vertigo Posisi (BPPV) - Latihan Habituasi di Rumah | Benign paroxysmal positional vertigo (BPPV) - vertigo saat perubahan posisi kepala | 1-3 minggu | Bhattacharyya et al. BPPV Clinical Practice Guideline Update, Otolaryngol Head Neck Surg 2017;156(3_suppl):S1-S47 |
| Rehabilitasi Paru - PPOK | Penyakit paru obstruktif kronik (PPOK) dengan sesak napas saat aktivitas | 8-12 minggu | Spruit et al. ATS/ERS Statement on Pulmonary Rehabilitation, Am J Respir Crit Care Med 2013;188(8):e13-e64; McCarthy et al. Cochrane 2015;2:CD003793 |
| Rehabilitasi Jantung - Program Rumah Fase II | Pasca infark miokard, pasca operasi bypass/pemasangan stent, gagal jantung stabil (setelah izin kardiolog) | 12 minggu | ACSM's Guidelines for Exercise Testing and Prescription, 11th ed.; Dibben et al. Cochrane 2021;11:CD001800 (exercise-based cardiac rehabilitation) |
| Inkontinensia Urin Stres - Latihan Otot Dasar Panggul | Inkontinensia urin stres atau campuran pada perempuan | 12 minggu minimum | Dumoulin et al. Cochrane Database Syst Rev 2018;10:CD005654; NICE NG123 Urinary Incontinence and Pelvic Organ Prolapse in Women (2019) |
| Pemulihan Pascamelahirkan - Program Bertahap | Pemulihan pascamelahirkan (persalinan normal maupun caesar), termasuk diastasis recti | 12 minggu | ACOG Committee Opinion 804: Physical Activity and Exercise During Pregnancy and the Postpartum Period (2020); Goom et al. Returning to Running Postnatal Guideline 2019 |
| Kebugaran Umum - Pedoman Aktivitas Fisik WHO | Pemeliharaan kesehatan umum, pencegahan penyakit kronis, dan lanjutan setelah program rehabilitasi selesai | Berkelanjutan | WHO Guidelines on Physical Activity and Sedentary Behaviour 2020; ACSM's Guidelines for Exercise Testing and Prescription, 11th ed. |
| Pasca Perbaikan Rotator Cuff - Fase Pasif (0-6 Minggu) | Pasca operasi perbaikan rotator cuff (arthroscopic rotator cuff repair) | 6 minggu | Thigpen et al. J Shoulder Elbow Surg 2016;25(4):521-535 (ASSET consensus rehabilitation after RCR); Kelley et al. JOSPT 2013 |

## Exercises by body region

### Ankle (11)

| Exercise | Difficulty | Type | Default dose | Evidence |
| --- | --- | --- | --- | --- |
| Calf Stretch (Gastrocnemius) | Beginner | Stretch | 3 set × 1 rep × tahan 40s × 2x/hari | A — Martin et al. Heel Pain - Plantar Fasciitis CPG, JOSPT 2023;53(12):CPG1-CPG39 |
| Soleus Stretch (Bent Knee Calf Stretch) | Beginner | Stretch | 3 set × 1 rep × tahan 40s × 2x/hari | A — Martin et al. Heel Pain CPG, JOSPT 2023 |
| Ankle Pumps | Beginner | Mobility | 3 set × 20 rep × tahan 2s × Setiap 1-2 jam pada fase awal | B — Brigham & Women's Hospital post-operative protocols; Martin et al. Ankle Stability CPG, JOSPT 2021 |
| Ankle Alphabet | Beginner | Mobility | 2 set × 1 rep × 2-3x/hari | B — Martin et al. Ankle Stability and Movement Coordination Impairments CPG, JOSPT 2021;51(4):CPG1-CPG80 |
| Double-Leg Heel Raise | Beginner | Strength | 3 set × 15 rep × tahan 2s × 3-5x/minggu | A — Martin et al. Achilles Pain CPG, JOSPT 2018;48(5):A1-A38; Otago Exercise Programme |
| Single-Leg Heel Raise | Intermediate | Strength | 3 set × 12 rep × tahan 2s × 3-5x/minggu | A — Martin et al. Achilles Pain CPG, JOSPT 2018; Silbernagel et al. Am J Sports Med 2007 |
| Eccentric Heel Drop - Straight Knee (Alfredson) | Intermediate | Strength | 3 set × 15 rep × tahan 3s × 2x/hari, 7 hari/minggu | A — Alfredson et al. Am J Sports Med 1998;26(3):360-366; Martin et al. Achilles Pain CPG, JOSPT 2018 |
| Eccentric Heel Drop - Bent Knee (Alfredson) | Intermediate | Strength | 3 set × 15 rep × tahan 3s × 2x/hari, 7 hari/minggu | A — Alfredson et al. Am J Sports Med 1998; Stevens & Tan JOSPT 2014 (do-as-tolerated comparison) |
| Resisted Ankle Eversion | Beginner | Strength | 3 set × 15 rep × tahan 2s × 1x/hari | A — Martin et al. Ankle Stability CPG, JOSPT 2021;51(4):CPG1-CPG80 |
| Resisted Ankle Dorsiflexion | Beginner | Strength | 3 set × 15 rep × tahan 2s × 1x/hari | B — Martin et al. Ankle Stability CPG, JOSPT 2021; AHA/ASA Stroke Rehabilitation Guideline 2016 |
| Knee-to-Wall Dorsiflexion Mobilisation | Beginner | Mobility | 3 set × 12 rep × tahan 3s × 1-2x/hari | B — Martin et al. Ankle Stability CPG, JOSPT 2021; Bennell et al. Aust J Physiother 1998 (weight-bearing lunge test) |

### Balance (12)

| Exercise | Difficulty | Type | Default dose | Evidence |
| --- | --- | --- | --- | --- |
| Single-Leg Stance | Beginner | Balance | 3 set × 1 rep × tahan 30s × 3-7x/minggu | A — Otago Exercise Programme (Campbell et al. BMJ 1997); Martin et al. Ankle Stability CPG, JOSPT 2021 |
| Single-Leg Stance on Foam / Wobble Board | Advanced | Balance | 5 set × 1 rep × tahan 30s × 5x/minggu | A — Martin et al. Ankle Stability CPG, JOSPT 2021; Wester et al. JOSPT 1996 (wobble board after ankle sprain) |
| Tandem Stance | Beginner | Balance | 3 set × 1 rep × tahan 20s × 3-7x/minggu | A — Otago Exercise Programme; CDC STEADI Four-Stage Balance Test |
| Tandem Walk (Heel-to-Toe Walking) | Intermediate | Balance | 4 set × 10 rep × 3x/minggu | A — Otago Exercise Programme (Campbell et al. BMJ 1997; Robertson et al. BMJ 2001) |
| Sideways Walking | Beginner | Balance | 4 set × 10 rep × 3x/minggu | A — Otago Exercise Programme (Campbell et al. BMJ 1997) |
| Backward Walking | Intermediate | Balance | 4 set × 10 rep × 3x/minggu | A — Otago Exercise Programme (Campbell et al. BMJ 1997) |
| Gaze Stabilisation x1 Viewing - Horizontal | Beginner | Balance | 3 set × 1 rep × tahan 60s × 3-5x/hari | A — Hall et al. Vestibular Rehabilitation for Peripheral Vestibular Hypofunction CPG (Updated), J Neurol Phys Ther 2022;46(2):118-177 |
| Gaze Stabilisation x1 Viewing - Vertical | Beginner | Balance | 3 set × 1 rep × tahan 60s × 3-5x/hari | A — Hall et al. J Neurol Phys Ther 2022;46(2):118-177 |
| Brandt-Daroff Habituation Exercise | Beginner | Balance | 3 set × 5 rep × tahan 30s × 3x/hari | B — Bhattacharyya et al. BPPV Clinical Practice Guideline Update, Otolaryngol Head Neck Surg 2017;156(3_suppl):S1-S47 |
| Big Sit-to-Stand (Amplitude Training) | Intermediate | Motor control | 3 set × 10 rep × tahan 2s × 1-2x/hari | A — Ebersbach et al. Mov Disord 2010;25(12):1902-1908 (LSVT BIG RCT); Osborne et al. Parkinson Disease CPG, JNPT 2022 |
| Big Forward Step and Reach | Intermediate | Motor control | 3 set × 10 rep × tahan 2s × 1x/hari | A — Ebersbach et al. Mov Disord 2010; Osborne et al. Parkinson Disease CPG, JNPT 2022;46(4):240-269 |
| Step Over Obstacle | Intermediate | Balance | 3 set × 10 rep × tahan 2s × 3x/minggu | B — Sherrington et al. Br J Sports Med 2017 (exercise for falls prevention); Otago Exercise Programme |

### Chest (4)

| Exercise | Difficulty | Type | Default dose | Evidence |
| --- | --- | --- | --- | --- |
| Diaphragmatic Breathing | Beginner | Breathing | 3 set × 10 rep × tahan 4s × 2-3x/hari | B — Spruit et al. ATS/ERS Statement on Pulmonary Rehabilitation, Am J Respir Crit Care Med 2013;188(8):e13-e64 |
| Pursed Lip Breathing | Beginner | Breathing | 3 set × 10 rep × Sesuai kebutuhan + 2x/hari latihan | A — Spruit et al. ATS/ERS Statement on Pulmonary Rehabilitation, 2013; GOLD Report 2024 |
| Active Cycle of Breathing Technique (ACBT) | Intermediate | Breathing | 3 set × 4 rep × tahan 3s × 2-3x/hari | A — Spruit et al. ATS/ERS Statement 2013; McIlwaine et al. Eur Respir J 2017 (airway clearance) |
| Thoracic Expansion Exercise | Beginner | Breathing | 3 set × 5 rep × tahan 3s × Setiap 1-2 jam pasca operasi | B — Spruit et al. ATS/ERS Statement 2013; Boden et al. BMJ 2018 (preoperative breathing exercise) |

### Core (8)

| Exercise | Difficulty | Type | Default dose | Evidence |
| --- | --- | --- | --- | --- |
| Abdominal Bracing (Transversus Activation) | Beginner | Motor control | 3 set × 10 rep × tahan 10s × 1-2x/hari | A — Saragiotto et al. Cochrane 2016 (motor control exercise for CLBP); George et al. JOSPT 2021 |
| Bird Dog (Quadruped Alternate Reach) | Intermediate | Motor control | 3 set × 10 rep × tahan 8s × 1x/hari | A — McGill SM. Low Back Disorders, 3rd ed.; Saragiotto et al. Cochrane 2016 |
| Dead Bug | Intermediate | Motor control | 3 set × 10 rep × tahan 2s × 1x/hari | B — McGill SM. Low Back Disorders, 3rd ed.; Saragiotto et al. Cochrane 2016 |
| McGill Curl-Up | Intermediate | Strength | 3 set × 6 rep × tahan 10s × 1x/hari | B — McGill SM. Low Back Disorders, 3rd ed.; Callaghan et al. Clin Biomech 1998 |
| Side Plank (Knees Bent) | Intermediate | Strength | 3 set × 3 rep × tahan 15s × 3-5x/minggu | B — McGill SM. Low Back Disorders, 3rd ed.; Ekstrom et al. JOSPT 2007 (core muscle EMG) |
| Front Plank (Forearm) | Intermediate | Strength | 3 set × 1 rep × tahan 30s × 3-5x/minggu | B — Ekstrom et al. JOSPT 2007; George et al. Low Back Pain CPG, JOSPT 2021 |
| Seated Trunk Rotation and Reach | Beginner | Motor control | 2 set × 10 rep × tahan 2s × 1-2x/hari | B — Winstein et al. AHA/ASA Adult Stroke Rehabilitation and Recovery Guideline, Stroke 2016;47(6):e98-e169 |
| Postpartum Core Connection Breathing | Beginner | Motor control | 3 set × 10 rep × tahan 4s × 1-2x/hari | B — ACOG Committee Opinion 804: Physical Activity and Exercise During Pregnancy and the Postpartum Period (2020); Dumoulin et al. Cochrane 2018 |

### Elbow (4)

| Exercise | Difficulty | Type | Default dose | Evidence |
| --- | --- | --- | --- | --- |
| Ulnar Nerve Glide | Beginner | Neurodynamic | 3 set × 10 rep × tahan 3s × 2x/hari | C — Coppieters & Butler Man Ther 2008 (neurodynamic sliders); praktik klinis terapi tangan |
| Eccentric Wrist Extension (Tyler Twist) | Intermediate | Strength | 3 set × 15 rep × tahan 4s × 1x/hari, 5 hari/minggu | A — Tyler et al. J Shoulder Elbow Surg 2010;19(6):917-922; Lucado et al. Lateral Elbow Tendinopathy CPG, JOSPT 2022;52(12):CPG1-CPG111 |
| Eccentric Wrist Extension with Weight | Beginner | Strength | 3 set × 15 rep × tahan 4s × 1x/hari | A — Lucado et al. Lateral Elbow Tendinopathy CPG, JOSPT 2022; Croisier et al. Br J Sports Med 2007 |
| Forearm Pronation-Supination with Weight | Intermediate | Strength | 3 set × 15 rep × tahan 2s × 3-5x/minggu | B — Lucado et al. Lateral Elbow Tendinopathy CPG, JOSPT 2022 |

### Foot (3)

| Exercise | Difficulty | Type | Default dose | Evidence |
| --- | --- | --- | --- | --- |
| Heel Raise with Towel under Toes (High-Load) | Intermediate | Strength | 3 set × 12 rep × tahan 2s × Selang sehari (setiap 2 hari) | A — Rathleff et al. Scand J Med Sci Sports 2015;25(3):e292-e300; Martin et al. Heel Pain CPG, JOSPT 2023 |
| Plantar Fascia-Specific Stretch | Beginner | Stretch | 3 set × 10 rep × tahan 10s × 3x/hari | A — DiGiovanni et al. J Bone Joint Surg Am 2003;85(7):1270-1277; Martin et al. Heel Pain CPG, JOSPT 2023 |
| Short Foot Exercise (Arch Doming) | Intermediate | Motor control | 3 set × 12 rep × tahan 8s × 1x/hari | B — Mulligan & Cook Man Ther 2013; McKeon et al. Br J Sports Med 2015 (foot core system) |

### General (5)

| Exercise | Difficulty | Type | Default dose | Evidence |
| --- | --- | --- | --- | --- |
| Structured Walking Program | Beginner | Aerobic | 1 set × 1 rep × 5x/minggu | A — WHO Guidelines on Physical Activity and Sedentary Behaviour 2020; ACSM's Guidelines 11th ed. |
| Marching in Place | Beginner | Aerobic | 3 set × 1 rep × tahan 120s × 3-5x/minggu | B — ACSM's Guidelines 11th ed.; Spruit et al. ATS/ERS Statement 2013 |
| Whole-Body Resistance Circuit | Intermediate | Strength | 3 set × 10 rep × 2-3x/minggu | A — ACSM's Guidelines for Exercise Testing and Prescription, 11th ed.; WHO Guidelines on Physical Activity 2020 |
| Progressive Loaded Squat (Bone Loading) | Advanced | Strength | 5 set × 5 rep × 2x/minggu | A — Watson et al. J Bone Miner Res 2018;33(2):211-220 (LIFTMOR RCT) |
| Heel Drop (Bone Impact Loading) | Intermediate | Strength | 2 set × 15 rep × 4-5x/minggu | B — Watson et al. J Bone Miner Res 2018 (LIFTMOR); Zhao et al. Osteoporos Int 2015 (impact exercise meta-analysis) |

### Hand (3)

| Exercise | Difficulty | Type | Default dose | Evidence |
| --- | --- | --- | --- | --- |
| Grip Strengthening (Ball Squeeze) | Beginner | Strength | 3 set × 12 rep × tahan 5s × 1-2x/hari | B — Erickson et al. Hand Pain and Sensory Deficits CPG, JOSPT 2019;49(5):CPG1-CPG85 |
| Tendon Gliding Exercises | Beginner | Mobility | 3 set × 10 rep × tahan 3s × 3x/hari | B — Kim SD. J Phys Ther Sci 2015 (tendon/nerve gliding CTS review); Erickson et al. JOSPT 2019 |
| Finger Extension with Rubber Band | Beginner | Strength | 3 set × 15 rep × tahan 3s × 1x/hari | C — Praktik terapi tangan; Erickson et al. Hand Pain CPG, JOSPT 2019 |

### Hip (14)

| Exercise | Difficulty | Type | Default dose | Evidence |
| --- | --- | --- | --- | --- |
| Bridging (Glute Bridge) | Beginner | Strength | 3 set × 12 rep × tahan 5s × 3-5x/minggu | A — George et al. Low Back Pain CPG, JOSPT 2021; Skou & Roos BMC Musculoskelet Disord 2017 (GLA:D/NEMEX) |
| Single-Leg Bridge | Advanced | Strength | 3 set × 10 rep × tahan 3s × 3x/minggu | B — Reiman et al. J Sport Rehabil 2012 (gluteal muscle activation); GLA:D exercise progression |
| Clamshell | Beginner | Strength | 3 set × 15 rep × tahan 3s × 3-5x/minggu | A — Willy et al. Patellofemoral Pain CPG, JOSPT 2019;49(9):CPG1-CPG95; Distefano et al. JOSPT 2009 (gluteal EMG) |
| Side-Lying Hip Abduction | Intermediate | Strength | 3 set × 15 rep × tahan 2s × 3x/minggu | A — Willy et al. Patellofemoral Pain CPG, JOSPT 2019; Mellor et al. BMJ 2018 (LEAP trial) |
| Isometric Hip Abduction (Wall Press) | Beginner | Strength | 5 set × 1 rep × tahan 40s × 1x/hari | A — Mellor et al. BMJ 2018;361:k1662 (LEAP trial); Grimaldi & Fearon JOSPT 2015 |
| Hip Hitch (Pelvic Drop) | Intermediate | Motor control | 3 set × 12 rep × tahan 2s × 3x/minggu | B — Willy et al. Patellofemoral Pain CPG, JOSPT 2019; Grimaldi & Fearon JOSPT 2015 |
| Lateral Band Walk | Intermediate | Strength | 3 set × 12 rep × 3x/minggu | B — Willy et al. Patellofemoral Pain CPG, JOSPT 2019; Cambridge et al. Clin Biomech 2012 |
| Half-Kneeling Hip Flexor Stretch | Beginner | Stretch | 3 set × 1 rep × tahan 30s × 1-2x/hari | B — Kisner & Colby, Therapeutic Exercise 7th ed.; George et al. Low Back Pain CPG, JOSPT 2021 |
| Piriformis / Glute Stretch (Figure-4) | Beginner | Stretch | 3 set × 1 rep × tahan 30s × 1-2x/hari | B — Kisner & Colby, Therapeutic Exercise 7th ed.; Cochrane review non-specific LBP exercise |
| Supine Hamstring Stretch with Strap | Beginner | Stretch | 3 set × 1 rep × tahan 30s × 1-2x/hari | B — Kisner & Colby, Therapeutic Exercise 7th ed.; Behm et al. Appl Physiol Nutr Metab 2016 (stretching review) |
| Sit to Stand | Beginner | Strength | 3 set × 10 rep × 3-7x/minggu | A — Otago Exercise Programme (Campbell et al. BMJ 1997); Skou & Roos 2017 (GLA:D/NEMEX) |
| Standing Hip Extension | Beginner | Strength | 3 set × 12 rep × tahan 2s × 3x/minggu | A — Otago Exercise Programme (Campbell et al. BMJ 1997); Fransen et al. Cochrane 2014 (hip OA exercise) |
| Standing Hip Abduction | Beginner | Strength | 3 set × 12 rep × tahan 2s × 3x/minggu | A — Otago Exercise Programme (Campbell et al. BMJ 1997; Robertson et al. BMJ 2001) |
| Copenhagen Adduction (Modified) | Advanced | Strength | 2 set × 8 rep × tahan 3s × 2-3x/minggu | A — Harøy et al. Br J Sports Med 2019;53(3):150-157 (adductor strengthening groin injury prevention) |

### Knee (17)

| Exercise | Difficulty | Type | Default dose | Evidence |
| --- | --- | --- | --- | --- |
| Chair Squat (Sit-Back Squat) | Beginner | Strength | 3 set × 12 rep × tahan 2s × 3x/minggu | A — Willy et al. Patellofemoral Pain CPG, JOSPT 2019; Skou & Roos 2017 (GLA:D) |
| Step Up | Intermediate | Strength | 3 set × 10 rep × 3x/minggu | A — Skou & Roos 2017 (GLA:D/NEMEX); Willy et al. JOSPT 2019 |
| Split Squat (Static Lunge) | Advanced | Strength | 3 set × 10 rep × 2-3x/minggu | B — Skou & Roos 2017 (GLA:D progressions); ACSM Guidelines 11th ed. |
| Wall Sit (Isometric Squat) | Intermediate | Strength | 5 set × 1 rep × tahan 45s × 1x/hari | B — Rio et al. Br J Sports Med 2015;49(19):1277-1283 (isometric analgesia patellar tendinopathy) |
| Quadriceps Setting (Quad Set) | Beginner | Motor control | 3 set × 12 rep × tahan 8s × 3-5x/hari pada fase awal | A — Adams et al. JOSPT 2012 (ACL rehab current concepts); Brigham & Women's TKA protocol |
| Straight Leg Raise | Beginner | Strength | 3 set × 12 rep × tahan 3s × 1-2x/hari | A — Adams et al. JOSPT 2012; Brigham & Women's Hospital TKA Protocol |
| Heel Slide (Knee Flexion AROM) | Beginner | Mobility | 3 set × 12 rep × tahan 5s × 3-4x/hari pada fase awal | A — Brigham & Women's Hospital TKA Protocol; Adams et al. JOSPT 2012 (ACL) |
| Short Arc Quad | Beginner | Strength | 3 set × 15 rep × tahan 4s × 1-2x/hari | A — Adams et al. JOSPT 2012; Escamilla et al. JOSPT 2012 (patellofemoral joint loading) |
| Terminal Knee Extension with Band | Intermediate | Strength | 3 set × 15 rep × tahan 3s × 3-5x/minggu | B — Adams et al. JOSPT 2012 (ACL rehab); Logerstedt et al. Knee Ligament Sprain CPG, JOSPT 2017 |
| Wall Squat (Slide) | Intermediate | Strength | 3 set × 12 rep × tahan 4s × 3x/minggu | A — Willy et al. Patellofemoral Pain CPG, JOSPT 2019; Fransen et al. Cochrane 2015 (knee OA exercise) |
| Eccentric Step Down | Advanced | Strength | 3 set × 10 rep × 3x/minggu | A — Willy et al. Patellofemoral Pain CPG, JOSPT 2019; Logerstedt et al. JOSPT 2017 |
| Spanish Squat (Band-Supported Isometric) | Intermediate | Strength | 5 set × 1 rep × tahan 45s × 1x/hari | B — Rio et al. Br J Sports Med 2015; Kongsgaard et al. Scand J Med Sci Sports 2009 (heavy slow resistance) |
| Prone Hamstring Curl | Beginner | Strength | 3 set × 12 rep × tahan 2s × 3x/minggu | B — Logerstedt et al. Knee Ligament Sprain CPG, JOSPT 2017; Askling et al. Br J Sports Med 2013 |
| Nordic Hamstring Curl | Advanced | Strength | 3 set × 8 rep × 1-3x/minggu sesuai fase | A — Petersen et al. Am J Sports Med 2011;39(11):2296-2303; van Dyk et al. Br J Sports Med 2019 (meta-analysis) |
| Patellar Mobilisation (Self) | Beginner | Mobility | 1 set × 4 rep × tahan 20s × 2-3x/hari | B — Brigham & Women's Hospital TKA Protocol; Adams et al. JOSPT 2012 |
| Stationary Cycling | Beginner | Aerobic | 1 set × 1 rep × 3-5x/minggu | A — ACSM's Guidelines for Exercise Testing and Prescription, 11th ed.; WHO 2020 Physical Activity Guidelines |
| Prone Knee Hang (Extension Stretch) | Beginner | Stretch | 2 set × 1 rep × tahan 300s × 2-3x/hari | A — Adams et al. JOSPT 2012 (ACL rehab); Logerstedt et al. JOSPT 2017 |

### Lower back (9)

| Exercise | Difficulty | Type | Default dose | Evidence |
| --- | --- | --- | --- | --- |
| Posterior Pelvic Tilt | Beginner | Motor control | 3 set × 10 rep × tahan 5s × 1-2x/hari | B — George et al. Low Back Pain CPG, JOSPT 2021;51(11):CPG1-CPG60 |
| Prone Press-Up (McKenzie Extension) | Beginner | Mobility | 1 set × 10 rep × tahan 2s × Setiap 2-3 jam pada fase akut | A — McKenzie R & May S. The Lumbar Spine: MDT; Long et al. Spine 2004;29(23):2593-2602 (directional preference) |
| Standing Lumbar Extension | Beginner | Mobility | 1 set × 10 rep × tahan 2s × Setiap 1-2 jam | B — McKenzie R & May S. The Lumbar Spine: MDT; Long et al. Spine 2004 |
| Single Knee to Chest | Beginner | Stretch | 3 set × 1 rep × tahan 30s × 1-2x/hari | B — George et al. Low Back Pain CPG, JOSPT 2021 |
| Lower Trunk Rotation | Beginner | Mobility | 2 set × 10 rep × tahan 15s × 1-2x/hari | B — George et al. Low Back Pain CPG, JOSPT 2021 |
| Cat-Cow (Cat-Camel) | Beginner | Mobility | 2 set × 12 rep × tahan 2s × 1-2x/hari | B — McGill SM. Low Back Disorders, 3rd ed. (cat-camel as spine mobility warm-up) |
| Child's Pose (Prayer Stretch) | Beginner | Stretch | 3 set × 1 rep × tahan 45s × 1-2x/hari | C — Praktik klinis; sejalan dengan preferensi arah fleksi pada stenosis (Ammendolia et al. Cochrane 2013) |
| Sciatic Nerve Glide (Slider) | Beginner | Neurodynamic | 3 set × 12 rep × tahan 2s × 2-3x/hari | B — Coppieters & Butler Man Ther 2008 (sliders vs tensioners); Basson et al. JOSPT 2017 (neural mobilisation meta-analysis) |
| Hip Hinge Pattern Training | Intermediate | Motor control | 3 set × 12 rep × tahan 2s × 3x/minggu | B — George et al. Low Back Pain CPG, JOSPT 2021; Steele et al. 2015 (lumbar extensor training) |

### Neck (6)

| Exercise | Difficulty | Type | Default dose | Evidence |
| --- | --- | --- | --- | --- |
| Chin Tuck (Craniocervical Flexion) | Beginner | Motor control | 3 set × 10 rep × tahan 10s × 1-2x/hari | A — Jull et al. Spine 2002; Blanpied et al. Neck Pain CPG, JOSPT 2017;47(7):A1-A83 |
| Supine Craniocervical Flexion (Staged) | Beginner | Motor control | 3 set × 10 rep × tahan 10s × 1x/hari, 5 hari/minggu | A — Jull et al. J Manipulative Physiol Ther 2008;31(7):525-533 (CCFT); Falla et al. 2007 |
| Active Cervical Rotation | Beginner | Mobility | 2 set × 10 rep × tahan 3s × 2-3x/hari | A — Blanpied et al. Neck Pain CPG, JOSPT 2017;47(7):A1-A83 |
| Upper Trapezius Stretch | Beginner | Stretch | 3 set × 1 rep × tahan 30s × 2x/hari | B — Blanpied et al. Neck Pain CPG, JOSPT 2017; Gross et al. Cochrane 2015 (exercise for neck pain) |
| Levator Scapulae Stretch | Beginner | Stretch | 3 set × 1 rep × tahan 30s × 2x/hari | B — Blanpied et al. Neck Pain CPG, JOSPT 2017 |
| Cervical Isometrics (4-Way) | Beginner | Strength | 2 set × 5 rep × tahan 8s × 1x/hari | A — Blanpied et al. Neck Pain CPG, JOSPT 2017; Ylinen et al. JAMA 2003;289(19):2509-2516 |

### Pelvic floor (3)

| Exercise | Difficulty | Type | Default dose | Evidence |
| --- | --- | --- | --- | --- |
| Pelvic Floor Muscle Training - Slow Holds | Beginner | Strength | 3 set × 10 rep × tahan 8s × 3x/hari | A — Dumoulin et al. Cochrane Database Syst Rev 2018;10:CD005654; NICE NG123 Urinary Incontinence 2019 |
| Pelvic Floor Quick Flicks | Beginner | Strength | 3 set × 10 rep × tahan 1s × 3x/hari | A — Dumoulin et al. Cochrane 2018; Miller et al. J Am Geriatr Soc 1998 (The Knack) |
| The Knack (Pre-Contraction) | Intermediate | Motor control | 1 set × 10 rep × tahan 3s × Setiap hari + saat aktivitas | A — Miller et al. J Am Geriatr Soc 1998;46(7):870-874; Dumoulin et al. Cochrane 2018 |

### Shoulder (19)

| Exercise | Difficulty | Type | Default dose | Evidence |
| --- | --- | --- | --- | --- |
| Scapular Retraction (Shoulder Blade Squeeze) | Beginner | Motor control | 3 set × 12 rep × tahan 5s × 1-2x/hari | B — Cools et al. Br J Sports Med 2014 (scapular rehabilitation); GRASP trial exercise programme, Hopewell et al. Lancet 2021 |
| Wall Angel | Intermediate | Motor control | 3 set × 12 rep × tahan 2s × 1x/hari | B — Cools et al. Br J Sports Med 2014; Ludewig & Reynolds JOSPT 2009 |
| Doorway Pectoral Stretch | Beginner | Stretch | 3 set × 1 rep × tahan 30s × 1-2x/hari | B — Cools et al. Br J Sports Med 2014; Rotator cuff related shoulder pain rehabilitation literature |
| Pendulum Exercise (Codman) | Beginner | Mobility | 1 set × 4 rep × tahan 30s × 3-4x/hari | B — Kelley et al. Adhesive Capsulitis CPG, JOSPT 2013;43(5):A1-A31 |
| Supine Shoulder Flexion with Cane | Beginner | Mobility | 2 set × 10 rep × tahan 5s × 2-3x/hari | B — Kelley et al. Adhesive Capsulitis CPG, JOSPT 2013; Thigpen et al. J Shoulder Elbow Surg 2016 (post-op RCR consensus) |
| Supine External Rotation with Cane | Beginner | Mobility | 3 set × 8 rep × tahan 10s × 2x/hari | A — Kelley et al. Adhesive Capsulitis CPG, JOSPT 2013;43(5):A1-A31 |
| Wall Slide (W to Y) | Intermediate | Motor control | 3 set × 12 rep × tahan 2s × 1x/hari | B — Cools et al. Br J Sports Med 2014; Hardwick et al. JOSPT 2006 (scapular muscle activity wall slide) |
| Isometric Shoulder External Rotation | Beginner | Strength | 3 set × 10 rep × tahan 10s × 1-2x/hari | A — Hopewell et al. GRASP trial, Lancet 2021;398(10298):416-428; Littlewood et al. 2016 |
| Resisted External Rotation with Band | Intermediate | Strength | 3 set × 12 rep × tahan 2s × 3-5x/minggu | A — Hopewell et al. GRASP trial, Lancet 2021; Littlewood et al. Physiotherapy 2015 (self-managed loaded exercise) |
| Resisted Internal Rotation with Band | Intermediate | Strength | 3 set × 12 rep × tahan 2s × 3x/minggu | B — Hopewell et al. GRASP trial, Lancet 2021; Cools et al. Br J Sports Med 2014 |
| Scaption Raise (Full Can) | Intermediate | Strength | 3 set × 12 rep × tahan 1s × 3x/minggu | B — Cools et al. Br J Sports Med 2014; Hopewell et al. GRASP trial, Lancet 2021 |
| Prone Y Raise (Lower Trapezius) | Intermediate | Strength | 3 set × 10 rep × tahan 5s × 3x/minggu | B — Cools et al. Am J Sports Med 2007 (scapular muscle exercise selection); GRASP programme 2021 |
| Prone T Raise (Horizontal Abduction) | Intermediate | Strength | 3 set × 12 rep × tahan 3s × 3x/minggu | B — Cools et al. Am J Sports Med 2007; Br J Sports Med 2014 |
| Serratus Wall Punch (Push-up Plus) | Beginner | Motor control | 3 set × 12 rep × tahan 3s × 1x/hari | B — Ludewig et al. Am J Sports Med 2004 (serratus anterior activation); Cools et al. 2014 |
| Sleeper Stretch (Posterior Capsule) | Intermediate | Stretch | 3 set × 1 rep × tahan 30s × 1-2x/hari | B — McClure et al. J Athl Train 2007 (posterior shoulder stretching); Kelley et al. JOSPT 2013 |
| Cross-Body Adduction Stretch | Beginner | Stretch | 3 set × 1 rep × tahan 30s × 1-2x/hari | B — McClure et al. J Athl Train 2007; Kelley et al. Adhesive Capsulitis CPG, JOSPT 2013 |
| Seated Row with Band | Beginner | Strength | 3 set × 12 rep × tahan 2s × 3x/minggu | B — Hopewell et al. GRASP trial, Lancet 2021; Gross et al. Cochrane 2015 |
| Wall Push-Up | Beginner | Strength | 3 set × 12 rep × 3x/minggu | B — ACSM's Guidelines for Exercise Testing and Prescription, 11th ed.; GRASP programme 2021 |
| Unsupported Arm Raises | Beginner | Strength | 3 set × 12 rep × tahan 2s × 3x/minggu | A — Spruit et al. ATS/ERS Statement on Pulmonary Rehabilitation, Am J Respir Crit Care Med 2013 |

### Thoracic (3)

| Exercise | Difficulty | Type | Default dose | Evidence |
| --- | --- | --- | --- | --- |
| Thoracic Extension over Roller | Beginner | Mobility | 2 set × 8 rep × tahan 5s × 1x/hari | B — Blanpied et al. Neck Pain CPG, JOSPT 2017 (thoracic manipulation/mobility adjunct) |
| Open Book Thoracic Rotation | Beginner | Mobility | 2 set × 10 rep × tahan 5s × 1x/hari | C — Konsensus praktik klinis; adjunct pada Neck Pain CPG JOSPT 2017 |
| Seated Posture Reset (Microbreak) | Beginner | Mobility | 1 set × 5 rep × tahan 5s × Setiap 30-60 menit kerja | B — Waongenngarm et al. Appl Ergon 2018 (interruption of prolonged sitting); WHO 2020 physical activity guidelines |

### Wrist (4)

| Exercise | Difficulty | Type | Default dose | Evidence |
| --- | --- | --- | --- | --- |
| Median Nerve Glide | Beginner | Neurodynamic | 3 set × 10 rep × tahan 3s × 2-3x/hari | B — Ballestero-Perez et al. J Manipulative Physiol Ther 2017 (neural mobilisation CTS); Erickson et al. Hand Pain CPG, JOSPT 2019 |
| Wrist Extensor Stretch | Beginner | Stretch | 3 set × 1 rep × tahan 40s × 2-3x/hari | B — Lucado et al. Lateral Elbow Tendinopathy CPG, JOSPT 2022 |
| Wrist Flexor Stretch | Beginner | Stretch | 3 set × 1 rep × tahan 40s × 2-3x/hari | B — Lucado et al. JOSPT 2022; Vicenzino Man Ther 2003 |
| Wrist Active Range of Motion | Beginner | Mobility | 2 set × 10 rep × tahan 3s × 3-4x/hari | B — Erickson et al. Hand Pain and Sensory Deficits CPG, JOSPT 2019 |
