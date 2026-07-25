-- Global, evidence-based exercise & rehabilitation protocol library.
--
-- GENERATED FILE - do not edit by hand.
-- Source: supabase/seed/exercises/*.json and supabase/seed/programs/*.json
-- Regenerate with: node tools/seed/build-exercise-library.mjs
--
-- 125 exercises, 35 protocol templates.
-- clinic_id IS NULL marks a row as global: readable by every clinic and
-- not editable from a clinic account (enforced in the api Edge Function).
-- Every entry carries the guideline or trial its dosage comes from in
-- evidence_source, so clinicians can check the basis of what they prescribe.
--
-- Statement-per-table (not per-row) so the file stays applicable as a single
-- migration; no explicit BEGIN/COMMIT so it can also be executed as a block.

-- ------------------------------------------------------------- exercises
insert into public.exercises (
  id, slug, name, name_id, description, description_en, body_region, category, difficulty,
  movement_type, starting_position, target_muscles, equipment_needed, instructions, instructions_en,
  contraindications, progression_tips, default_sets, default_reps, default_hold_seconds,
  default_rest_seconds, default_frequency, evidence_level, evidence_source, tags, clinic_id
) values
-- Chin Tuck (Craniocervical Flexion)
(
  '10ba579e-9175-38b9-9c11-ae2ddcf244b2', 'chin-tuck', 'Chin Tuck (Craniocervical Flexion)', 'Tarik Dagu (Fleksi Kraniocervikal)', 'Latihan aktivasi otot fleksor leher dalam untuk memperbaiki kontrol dan posisi kepala pada nyeri leher.', 'Deep cervical flexor activation to restore head-on-neck control in neck pain.',
  'Neck', 'Neck & Upper', 'Beginner', 'Motor control', 'Sitting',
  'Longus colli, longus capitis (fleksor leher dalam)', '{}'::text[], '1. Duduk tegak, bahu rileks, pandangan lurus ke depan.
2. Angguk kepala pelan seolah mengatakan "ya" dengan gerakan sangat kecil, tarik dagu ke belakang membentuk "dagu ganda".
3. Jaga leher belakang tetap panjang; jangan menunduk atau mendorong kepala ke depan.
4. Tahan 10 detik sambil bernapas normal, lalu lepas perlahan.
5. Istirahat 10 detik antar pengulangan.', '1. Sit tall with relaxed shoulders and eyes level.
2. Nod gently as if saying "yes" with a very small movement, drawing the chin back into a "double chin".
3. Keep the back of the neck long; do not bend forward or poke the chin.
4. Hold 10 seconds while breathing normally, then release slowly.
5. Rest 10 seconds between repetitions.',
  'Hentikan bila muncul pusing berputar, kesemutan menjalar ke lengan, atau nyeri kepala hebat. Hindari pada instabilitas cervical, fraktur belum sembuh, dan rheumatoid arthritis cervical yang belum dievaluasi.', 'Mulai berbaring telentang dengan handuk kecil di bawah kepala, lalu maju ke posisi duduk, lalu berdiri menempel dinding. Tambah durasi tahan 10 detik x 10 repetisi sebelum menambah beban lain.', 3, 10,
  10, 30, '1-2x/hari',
  'A', 'Jull et al. Spine 2002; Blanpied et al. Neck Pain CPG, JOSPT 2017;47(7):A1-A83', ARRAY['neck pain', 'postural', 'deep neck flexor', 'cervicogenic headache']::text[], null
),
-- Supine Craniocervical Flexion (Staged)
(
  'a7144c74-e592-30b1-b2c3-adc995e319b6', 'craniocervical-flexion-supine', 'Supine Craniocervical Flexion (Staged)', 'Fleksi Kraniocervikal Telentang Bertahap', 'Versi bertahap dari latihan fleksor leher dalam sesuai protokol Craniocervical Flexion Test, dengan lima level kedalaman anggukan.', 'Staged deep neck flexor training following the craniocervical flexion test protocol, using five progressive nod levels.',
  'Neck', 'Neck & Upper', 'Beginner', 'Motor control', 'Supine',
  'Longus colli, longus capitis', ARRAY['Handuk gulung', 'Manset tekanan (opsional)']::text[], '1. Berbaring telentang, lutut ditekuk, letakkan handuk gulung tipis di bawah leher.
2. Angguk kepala pelan (gerakan "ya" kecil) sampai level 1 - anggukan paling ringan.
3. Tahan 10 detik tanpa mengangkat kepala dari alas dan tanpa mengeraskan otot leher depan yang besar.
4. Ulangi 10 kali, lalu naikkan kedalaman anggukan satu level bila 10 repetisi terasa mudah dan bersih.
5. Jangan pernah menahan napas selama latihan.', '1. Lie on your back with knees bent and a thin rolled towel under the neck.
2. Nod gently (small "yes" movement) to level 1 - the lightest nod.
3. Hold 10 seconds without lifting the head off the surface and without hardening the large front-of-neck muscles.
4. Repeat 10 times, then move up one nod level once 10 clean repetitions feel easy.
5. Never hold your breath during the exercise.',
  'Hindari bila ada instabilitas cervical, pasca fraktur cervical yang belum sembuh, atau gejala mielopati (kaki kaku, gangguan keseimbangan, gangguan berkemih).', 'Naikkan satu level tiap kali pasien mampu 10 repetisi x 10 detik tanpa substitusi sternokleidomastoideus. Setelah level 5 tercapai, lanjut ke latihan menahan kepala melayang dan penguatan ekstensor leher.', 3, 10,
  10, 60, '1x/hari, 5 hari/minggu',
  'A', 'Jull et al. J Manipulative Physiol Ther 2008;31(7):525-533 (CCFT); Falla et al. 2007', ARRAY['neck pain', 'deep neck flexor', 'motor control']::text[], null
),
-- Active Cervical Rotation
(
  'd1d7fea9-0081-3e6b-ad05-06681470746f', 'cervical-rotation-arom', 'Active Cervical Rotation', 'Rotasi Leher Aktif', 'Latihan lingkup gerak sendi leher untuk mengurangi kekakuan dan mempertahankan rotasi cervical.', 'Cervical range-of-motion drill to reduce stiffness and maintain rotation.',
  'Neck', 'Neck & Upper', 'Beginner', 'Mobility', 'Sitting',
  'Rotator cervical, otot suboksipital', '{}'::text[], '1. Duduk tegak dengan bahu rileks dan kedua kaki menapak lantai.
2. Putar kepala perlahan ke kanan sejauh nyaman, seolah melihat ke belakang bahu.
3. Tahan 3-5 detik di ujung gerakan yang nyaman, lalu kembali ke tengah.
4. Ulangi ke sisi kiri. Gerakan harus halus dan tanpa hentakan.
5. Berhenti bila muncul pusing atau nyeri menjalar.', '1. Sit tall with relaxed shoulders and both feet on the floor.
2. Slowly turn your head to the right as far as comfortable, as if looking over your shoulder.
3. Hold 3-5 seconds at the comfortable end range, then return to centre.
4. Repeat to the left. Movement should be smooth and unforced.
5. Stop if dizziness or radiating pain appears.',
  'Hentikan bila muncul pusing berputar, penglihatan ganda, atau mual (kemungkinan gangguan vertebrobasilar). Hindari rotasi paksa pada whiplash akut.', 'Setelah nyaman, kombinasikan dengan chin tuck (rotasi dari posisi dagu tertarik) untuk menargetkan segmen cervical atas.', 2, 10,
  3, 20, '2-3x/hari',
  'A', 'Blanpied et al. Neck Pain CPG, JOSPT 2017;47(7):A1-A83', ARRAY['neck pain', 'mobility', 'whiplash']::text[], null
),
-- Upper Trapezius Stretch
(
  '039eab36-77a2-3812-82ec-729e8b58eae2', 'upper-trapezius-stretch', 'Upper Trapezius Stretch', 'Peregangan Trapezius Atas', 'Peregangan otot trapezius atas untuk mengurangi ketegangan leher-bahu pada nyeri leher mekanik.', 'Upper trapezius stretch to ease neck-shoulder tension in mechanical neck pain.',
  'Neck', 'Neck & Upper', 'Beginner', 'Stretch', 'Sitting',
  'Upper trapezius', '{}'::text[], '1. Duduk tegak, pegang sisi kursi dengan tangan kanan agar bahu kanan tetap turun.
2. Miringkan kepala ke kiri (telinga kiri mendekat ke bahu kiri).
3. Bantu dengan tangan kiri di atas kepala, tarik sangat ringan sampai terasa regangan di sisi leher kanan.
4. Tahan 30 detik dengan napas tenang, lalu lepas perlahan.
5. Ulangi ke sisi sebaliknya.', '1. Sit tall and hold the side of the chair with your right hand to keep the right shoulder down.
2. Tilt your head to the left (left ear toward left shoulder).
3. Assist gently with the left hand on the head until a stretch is felt on the right side of the neck.
4. Hold 30 seconds breathing calmly, then release slowly.
5. Repeat on the other side.',
  'Jangan menarik paksa. Hindari bila ada gejala radikulopati yang memburuk saat leher dimiringkan atau riwayat operasi cervical baru.', 'Tambahkan sedikit rotasi menjauh dari sisi yang diregang untuk menargetkan levator scapulae. Peregangan paling efektif setelah kompres hangat 10 menit.', 3, 1,
  30, 15, '2x/hari',
  'B', 'Blanpied et al. Neck Pain CPG, JOSPT 2017; Gross et al. Cochrane 2015 (exercise for neck pain)', ARRAY['neck pain', 'stretch', 'office worker']::text[], null
),
-- Levator Scapulae Stretch
(
  'fa276747-7aa6-3c3a-b718-047e8b690982', 'levator-scapulae-stretch', 'Levator Scapulae Stretch', 'Peregangan Levator Scapulae', 'Peregangan levator scapulae untuk nyeri di sudut atas tulang belikat dan kekakuan leher.', 'Levator scapulae stretch for pain at the superior angle of the scapula and neck stiffness.',
  'Neck', 'Neck & Upper', 'Beginner', 'Stretch', 'Sitting',
  'Levator scapulae', '{}'::text[], '1. Duduk tegak, angkat lengan kanan dan letakkan tangan kanan di belakang kepala/di bahu kanan.
2. Putar kepala 45 derajat ke kiri (seolah melihat ke arah ketiak kiri).
3. Tundukkan kepala ke arah tersebut sampai terasa regangan di belakang leher kanan bawah.
4. Tahan 30 detik, napas tenang.
5. Ulangi 3 kali per sisi.', '1. Sit tall, raise the right arm and place the right hand behind the head or on the right shoulder.
2. Rotate the head 45 degrees to the left (as if looking toward the left armpit).
3. Bend the head in that direction until a stretch is felt at the lower right side of the neck.
4. Hold 30 seconds with calm breathing.
5. Repeat 3 times per side.',
  'Hentikan bila muncul kesemutan atau nyeri menjalar ke lengan. Hindari pada bahu yang nyeri saat diangkat (impingement akut).', 'Jika bahu tidak bisa diangkat, kaitkan tangan di bawah kursi dan lakukan hanya komponen kepala.', 3, 1,
  30, 15, '2x/hari',
  'B', 'Blanpied et al. Neck Pain CPG, JOSPT 2017', ARRAY['neck pain', 'stretch']::text[], null
),
-- Cervical Isometrics (4-Way)
(
  '06b19223-31e5-3ae3-baeb-99c1d41c5542', 'cervical-isometric-set', 'Cervical Isometrics (4-Way)', 'Isometrik Leher 4 Arah', 'Kontraksi isometrik submaksimal leher ke empat arah untuk membangun kekuatan tanpa memicu gerakan yang nyeri.', 'Sub-maximal four-way cervical isometrics to build strength without provoking painful movement.',
  'Neck', 'Neck & Upper', 'Beginner', 'Strength', 'Sitting',
  'Fleksor, ekstensor, dan fleksor lateral cervical', '{}'::text[], '1. Duduk tegak dengan dagu sedikit tertarik.
2. Letakkan telapak tangan di dahi, dorong kepala ke tangan dengan kekuatan sekitar 30% maksimal - kepala tidak bergerak.
3. Tahan 5-10 detik, lalu rileks 10 detik.
4. Ulangi dengan tangan di belakang kepala, lalu di sisi kanan, lalu sisi kiri.
5. Jaga napas tetap mengalir; jangan mengejan.', '1. Sit tall with the chin slightly tucked.
2. Place a palm on your forehead and press the head into the hand at about 30% effort - the head does not move.
3. Hold 5-10 seconds, then relax for 10 seconds.
4. Repeat with the hand behind the head, then on the right side, then the left.
5. Keep breathing; do not strain.',
  'Hindari usaha maksimal pada hipertensi tidak terkontrol dan pada whiplash akut derajat tinggi. Hentikan bila nyeri meningkat > 2 poin skala 0-10.', 'Mulai 20-30% kekuatan pada fase nyeri, naikkan bertahap ke 50-70% saat nyeri mereda. Lanjut ke latihan ekstensor leher tengkurap bila isometrik sudah tidak nyeri.', 2, 5,
  8, 20, '1x/hari',
  'A', 'Blanpied et al. Neck Pain CPG, JOSPT 2017; Ylinen et al. JAMA 2003;289(19):2509-2516', ARRAY['neck pain', 'isometric', 'strength']::text[], null
),
-- Scapular Retraction (Shoulder Blade Squeeze)
(
  'e1a68070-1c40-3af5-9669-f03f6647a4fc', 'scapular-retraction', 'Scapular Retraction (Shoulder Blade Squeeze)', 'Rapatkan Tulang Belikat', 'Aktivasi otot penstabil skapula sebagai dasar semua program bahu dan leher.', 'Scapular stabiliser activation that underpins most shoulder and neck programs.',
  'Shoulder', 'Neck & Upper', 'Beginner', 'Motor control', 'Sitting',
  'Middle trapezius, rhomboid', '{}'::text[], '1. Duduk atau berdiri tegak dengan lengan di samping badan.
2. Rapatkan kedua tulang belikat ke arah tulang belakang dan sedikit ke bawah.
3. Jangan mengangkat bahu ke arah telinga dan jangan menahan napas.
4. Tahan 5 detik, lalu rileks penuh.
5. Ulangi 10-15 kali.', '1. Sit or stand tall with arms by your sides.
2. Draw both shoulder blades toward the spine and slightly downward.
3. Do not shrug toward the ears and do not hold your breath.
4. Hold 5 seconds, then fully relax.
5. Repeat 10-15 times.',
  'Hindari bila ada nyeri tajam di antara tulang belikat saat kontraksi atau pasca operasi bahu yang belum diizinkan gerakan aktif.', 'Maju ke row dengan karet elastis, lalu prone Y/T raise untuk menambah beban pada trapezius bawah.', 3, 12,
  5, 30, '1-2x/hari',
  'B', 'Cools et al. Br J Sports Med 2014 (scapular rehabilitation); GRASP trial exercise programme, Hopewell et al. Lancet 2021', ARRAY['posture', 'scapula', 'office worker']::text[], null
),
-- Thoracic Extension over Roller
(
  '7bd763e3-2137-3791-99f3-ee669db17651', 'thoracic-extension-foam-roller', 'Thoracic Extension over Roller', 'Ekstensi Punggung Atas dengan Roller', 'Mobilisasi ekstensi thoracic untuk postur membungkuk dan keterbatasan elevasi bahu.', 'Thoracic extension mobilisation for a flexed posture and limited shoulder elevation.',
  'Thoracic', 'Spine & Core', 'Beginner', 'Mobility', 'Supine',
  'Ekstensor thoracic, mobilitas segmen thoracic', ARRAY['Foam roller atau handuk gulung']::text[], '1. Letakkan foam roller melintang di bawah punggung atas, lutut ditekuk, kaki menapak.
2. Sangga kepala dengan kedua tangan di belakang kepala.
3. Lengkungkan punggung atas ke belakang melewati roller sejauh nyaman, jangan melengkungkan pinggang.
4. Tahan 5 detik, kembali ke posisi awal.
5. Geser roller 2-3 cm ke atas atau ke bawah dan ulangi pada 3 titik berbeda.', '1. Place a foam roller across your upper back, knees bent and feet flat.
2. Support your head with both hands behind it.
3. Extend the upper back over the roller as far as comfortable without arching the lower back.
4. Hold 5 seconds and return.
5. Move the roller 2-3 cm up or down and repeat at 3 different levels.',
  'Hindari pada osteoporosis berat, fraktur kompresi vertebra, dan pasca operasi tulang belakang tanpa izin dokter.', 'Bila roller terlalu keras, gunakan handuk gulung. Tambahkan angkat lengan ke atas kepala untuk memperbesar ekstensi.', 2, 8,
  5, 20, '1x/hari',
  'B', 'Blanpied et al. Neck Pain CPG, JOSPT 2017 (thoracic manipulation/mobility adjunct)', ARRAY['posture', 'thoracic', 'office worker']::text[], null
),
-- Open Book Thoracic Rotation
(
  '130ee14d-bbe4-37c6-94cb-057059415447', 'open-book-thoracic-rotation', 'Open Book Thoracic Rotation', 'Rotasi Punggung Atas (Open Book)', 'Latihan rotasi thoracic berbaring menyamping untuk memperbaiki mobilitas rotasi batang tubuh.', 'Side-lying thoracic rotation drill to restore trunk rotation mobility.',
  'Thoracic', 'Spine & Core', 'Beginner', 'Mobility', 'Side-lying',
  'Rotator thoracic, otot dada', ARRAY['Bantal']::text[], '1. Berbaring menyamping, lutut ditekuk 90 derajat dan ditumpuk, kepala disangga bantal.
2. Julurkan kedua lengan lurus ke depan, telapak bertemu.
3. Buka lengan atas ke arah belakang seperti membuka buku, ikuti dengan pandangan mata.
4. Jaga lutut tetap menempel; gerakan datang dari punggung atas.
5. Tahan 3-5 detik di ujung gerak, kembali perlahan.', '1. Lie on your side, knees bent 90 degrees and stacked, head on a pillow.
2. Reach both arms straight in front, palms together.
3. Open the top arm backwards like opening a book, following it with your eyes.
4. Keep the knees together; the movement comes from the upper back.
5. Hold 3-5 seconds at end range, return slowly.',
  'Hindari bila terjadi nyeri menjalar ke tungkai atau setelah operasi tulang belakang lumbal yang belum stabil.', 'Tambah jeda tahan hingga 10 detik dan gabungkan dengan napas panjang keluar saat membuka untuk menambah lingkup gerak.', 2, 10,
  5, 20, '1x/hari',
  'C', 'Konsensus praktik klinis; adjunct pada Neck Pain CPG JOSPT 2017', ARRAY['mobility', 'thoracic', 'posture']::text[], null
),
-- Wall Angel
(
  '8d00f1d7-f0d4-35a4-a694-68a10c2d8920', 'wall-angel', 'Wall Angel', 'Wall Angel (Malaikat Dinding)', 'Latihan kontrol skapula dan mobilitas bahu di dinding untuk postur bahu membulat.', 'Wall-based scapular control and shoulder mobility drill for rounded-shoulder posture.',
  'Shoulder', 'Neck & Upper', 'Intermediate', 'Motor control', 'Standing',
  'Trapezius bawah, serratus anterior, rotator eksternal bahu', ARRAY['Dinding']::text[], '1. Berdiri menempel dinding: kepala belakang, punggung atas, dan bokong menyentuh dinding, kaki 10 cm dari dinding.
2. Tempelkan punggung tangan dan siku ke dinding membentuk huruf W.
3. Geser lengan ke atas membentuk huruf Y sambil menjaga kontak dengan dinding.
4. Turunkan kembali perlahan ke posisi W.
5. Berhenti pada titik di mana punggung mulai melengkung dari dinding.', '1. Stand with the back of the head, upper back and buttocks touching a wall, feet 10 cm away.
2. Place the backs of the hands and elbows on the wall in a W shape.
3. Slide the arms up into a Y while keeping contact with the wall.
4. Lower slowly back to the W position.
5. Stop at the point where the back starts to arch off the wall.',
  'Hentikan bila timbul nyeri jepitan di depan bahu. Hindari elevasi penuh pada impingement akut atau pasca perbaikan rotator cuff sebelum izin dokter.', 'Awali dengan lingkup gerak kecil dan tanpa beban; tambahkan karet elastis ringan di pergelangan tangan saat kontrol sudah baik.', 3, 12,
  2, 30, '1x/hari',
  'B', 'Cools et al. Br J Sports Med 2014; Ludewig & Reynolds JOSPT 2009', ARRAY['posture', 'scapula', 'shoulder']::text[], null
),
-- Doorway Pectoral Stretch
(
  '7481d589-aa48-3382-b509-2ec09d7d7579', 'doorway-pec-stretch', 'Doorway Pectoral Stretch', 'Peregangan Dada di Kusen Pintu', 'Peregangan otot dada yang memendek pada postur bahu membulat dan nyeri leher-bahu.', 'Pectoral stretch for shortened chest muscles in rounded-shoulder posture and neck-shoulder pain.',
  'Shoulder', 'Neck & Upper', 'Beginner', 'Stretch', 'Standing',
  'Pectoralis major dan minor', ARRAY['Kusen pintu']::text[], '1. Berdiri di ambang pintu, letakkan lengan bawah di kusen dengan siku setinggi bahu (90 derajat).
2. Langkahkan satu kaki ke depan dan condongkan badan pelan sampai terasa regangan di depan dada.
3. Jaga bahu tetap turun dan punggung tidak melengkung.
4. Tahan 30 detik, napas tenang.
5. Ulangi 3 kali per sisi.', '1. Stand in a doorway with the forearm on the frame, elbow at shoulder height (90 degrees).
2. Step one foot forward and lean gently until a stretch is felt across the front of the chest.
3. Keep the shoulder down and avoid arching the back.
4. Hold 30 seconds, breathing calmly.
5. Repeat 3 times per side.',
  'Hentikan bila terasa kesemutan di lengan (kemungkinan kompresi neurovaskular) atau nyeri tajam di depan bahu. Hindari pada instabilitas bahu anterior.', 'Ubah tinggi siku (di bawah, setinggi, dan di atas bahu) untuk menargetkan serabut pectoralis yang berbeda.', 3, 1,
  30, 15, '1-2x/hari',
  'B', 'Cools et al. Br J Sports Med 2014; Rotator cuff related shoulder pain rehabilitation literature', ARRAY['stretch', 'posture', 'shoulder']::text[], null
),
-- Median Nerve Glide
(
  'cffecfe2-7e5e-36bd-88cb-1c4b640041b3', 'median-nerve-glide', 'Median Nerve Glide', 'Neurodinamik Saraf Medianus', 'Latihan meluncurkan saraf medianus untuk carpal tunnel syndrome ringan-sedang dan gejala saraf di lengan.', 'Median nerve gliding for mild-to-moderate carpal tunnel syndrome and arm nerve symptoms.',
  'Wrist', 'Neck & Upper', 'Beginner', 'Neurodynamic', 'Sitting',
  'Mobilitas saraf medianus (bukan penguatan otot)', '{}'::text[], '1. Duduk tegak, lengan yang bergejala di samping badan dengan siku ditekuk 90 derajat, telapak menghadap atas.
2. Luruskan siku dan tarik pergelangan tangan serta jari ke belakang (ekstensi) sampai terasa tarikan RINGAN saja.
3. Miringkan kepala menjauhi lengan hanya bila tarikan masih ringan; miringkan ke arah lengan untuk mengurangi ketegangan.
4. Tahan 3-5 detik, lalu kembali ke posisi awal.
5. Gerakan harus berayun lembut - jangan sampai kesemutan bertambah atau bertahan lebih dari beberapa detik.', '1. Sit tall with the symptomatic arm at your side, elbow bent 90 degrees, palm up.
2. Straighten the elbow and extend the wrist and fingers backwards only until a MILD pull is felt.
3. Side-bend the head away from the arm only if the pull stays mild; bend toward the arm to reduce tension.
4. Hold 3-5 seconds, then return to the start.
5. The movement should be a gentle oscillation - tingling must not increase or last more than a few seconds.',
  'Hentikan bila kesemutan/mati rasa bertambah atau menetap. Hindari pada gejala saraf akut berat, kelemahan otot progresif, atau tanda mielopati - rujuk untuk evaluasi medis.', 'Mulai dengan gerakan komponen tunggal (hanya pergelangan tangan) sebelum menggabungkan siku dan leher. Dosis rendah dan sering lebih baik daripada peregangan lama.', 3, 10,
  3, 30, '2-3x/hari',
  'B', 'Ballestero-Perez et al. J Manipulative Physiol Ther 2017 (neural mobilisation CTS); Erickson et al. Hand Pain CPG, JOSPT 2019', ARRAY['carpal tunnel', 'nerve glide', 'hand']::text[], null
),
-- Ulnar Nerve Glide
(
  '77364ecc-bec0-33b6-88d2-fff8f5e2b12b', 'ulnar-nerve-glide', 'Ulnar Nerve Glide', 'Neurodinamik Saraf Ulnaris', 'Latihan luncur saraf ulnaris untuk gejala kesemutan di jari manis dan kelingking (cubital tunnel).', 'Ulnar nerve glide for tingling in the ring and little fingers (cubital tunnel syndrome).',
  'Elbow', 'Neck & Upper', 'Beginner', 'Neurodynamic', 'Standing',
  'Mobilitas saraf ulnaris', '{}'::text[], '1. Berdiri tegak, angkat lengan ke samping dengan siku ditekuk.
2. Bentuk lingkaran dengan ibu jari dan telunjuk, lalu putar tangan sehingga lingkaran menghadap ke bawah.
3. Bawa tangan mendekati wajah seperti membentuk "kacamata" di sekitar mata, jaga siku tetap tinggi.
4. Tahan 3 detik pada tarikan ringan, lalu kembali ke posisi awal.
5. Berhenti bila kesemutan bertambah.', '1. Stand tall and raise the arm to the side with the elbow bent.
2. Make a circle with thumb and index finger, then rotate the hand so the circle faces down.
3. Bring the hand toward the face to form "goggles" around the eye, keeping the elbow high.
4. Hold 3 seconds at a mild pull, then return.
5. Stop if tingling increases.',
  'Hentikan bila mati rasa memburuk atau muncul kelemahan mencengkeram. Hindari pada dislokasi saraf ulnaris yang nyeri.', 'Kurangi tekukan siku bila gejala mudah terprovokasi. Kombinasikan dengan edukasi menghindari menekuk siku lama saat tidur.', 3, 10,
  3, 30, '2x/hari',
  'C', 'Coppieters & Butler Man Ther 2008 (neurodynamic sliders); praktik klinis terapi tangan', ARRAY['nerve glide', 'elbow', 'cubital tunnel']::text[], null
),
-- Seated Posture Reset (Microbreak)
(
  '6fef5474-cbe3-3faa-b8b3-71f20e2f78e1', 'sitting-posture-reset', 'Seated Posture Reset (Microbreak)', 'Reset Postur Duduk (Jeda Singkat)', 'Rangkaian jeda singkat untuk pekerja kantor: berdiri, ekstensi, dan reposisi setiap 30-60 menit.', 'Short microbreak routine for desk workers: stand, extend and reposition every 30-60 minutes.',
  'Thoracic', 'Spine & Core', 'Beginner', 'Mobility', 'Sitting',
  'Ekstensor thoracic, otot leher, fleksor pinggul', ARRAY['Kursi']::text[], '1. Berdiri dari kursi dan tarik napas panjang.
2. Letakkan kedua tangan di pinggang, lengkungkan punggung ke belakang pelan sebanyak 5 kali.
3. Rapatkan tulang belikat 5 kali sambil menahan 5 detik.
4. Lakukan 5 kali tarik dagu (chin tuck).
5. Berjalan 1-2 menit sebelum kembali duduk.', '1. Stand up from the chair and take a deep breath.
2. Place both hands on the waist and gently extend the back 5 times.
3. Squeeze the shoulder blades 5 times, holding 5 seconds each.
4. Perform 5 chin tucks.
5. Walk for 1-2 minutes before sitting back down.',
  'Hindari ekstensi punggung bila memperburuk nyeri tungkai (kemungkinan stenosis); ganti dengan berjalan saja.', 'Setel pengingat setiap 30-60 menit. Rutinitas ini adalah dosis frekuensi tinggi - kualitas gerakan lebih penting daripada jumlah repetisi.', 1, 5,
  5, 0, 'Setiap 30-60 menit kerja',
  'B', 'Waongenngarm et al. Appl Ergon 2018 (interruption of prolonged sitting); WHO 2020 physical activity guidelines', ARRAY['office worker', 'posture', 'microbreak']::text[], null
),
-- Pendulum Exercise (Codman)
(
  '452b7f54-8fea-37f4-bb5c-828b0d400646', 'pendulum-codman', 'Pendulum Exercise (Codman)', 'Latihan Pendulum (Codman)', 'Ayunan lengan pasif yang aman untuk bahu sangat nyeri, pasca operasi bahu, atau frozen shoulder fase nyeri.', 'Gentle passive arm swinging, safe for a very painful shoulder, early post-operative shoulder, or the painful phase of frozen shoulder.',
  'Shoulder', 'Neck & Upper', 'Beginner', 'Mobility', 'Standing',
  'Relaksasi otot bahu, mobilitas glenohumeral pasif', ARRAY['Meja atau kursi sebagai tumpuan']::text[], '1. Berdiri di samping meja, tumpukan tangan yang sehat di meja dan condongkan badan ke depan.
2. Biarkan lengan yang sakit menggantung lurus ke bawah dalam keadaan benar-benar rileks.
3. Gerakkan badan (bukan lengan) sehingga lengan berayun ke depan-belakang selama 30 detik.
4. Lanjutkan ayunan ke samping 30 detik, lalu memutar searah dan berlawanan jarum jam masing-masing 30 detik.
5. Otot bahu tidak boleh dikencangkan - gerakan datang dari badan.', '1. Stand beside a table, support yourself with the healthy hand and lean forward.
2. Let the painful arm hang straight down, completely relaxed.
3. Move your body (not the arm) so the arm swings forward and back for 30 seconds.
4. Continue side to side for 30 seconds, then circles in each direction for 30 seconds.
5. The shoulder muscles must stay relaxed - the movement comes from the trunk.',
  'Hindari bila ada fraktur bahu yang belum stabil atau dislokasi belum tereduksi. Pada pasca perbaikan rotator cuff, ikuti izin dokter bedah.', 'Setelah nyeri berkurang, tambahkan beban ringan 0,5-1 kg di tangan untuk efek traksi, lalu maju ke latihan lingkup gerak aktif-bantu.', 1, 4,
  30, 15, '3-4x/hari',
  'B', 'Kelley et al. Adhesive Capsulitis CPG, JOSPT 2013;43(5):A1-A31', ARRAY['frozen shoulder', 'post-op', 'mobility']::text[], null
),
-- Supine Shoulder Flexion with Cane
(
  'b3824bcc-8987-3c95-96f4-80291686552a', 'supine-flexion-with-cane', 'Supine Shoulder Flexion with Cane', 'Fleksi Bahu Telentang dengan Tongkat', 'Latihan lingkup gerak aktif-bantu di mana lengan sehat membantu lengan yang sakit, aman untuk fase awal rehabilitasi bahu.', 'Active-assisted range of motion where the healthy arm helps the painful arm - safe for early shoulder rehabilitation.',
  'Shoulder', 'Neck & Upper', 'Beginner', 'Mobility', 'Supine',
  'Lingkup gerak fleksi glenohumeral (aktif-bantu)', ARRAY['Tongkat/gagang sapu']::text[], '1. Berbaring telentang, lutut ditekuk. Pegang tongkat dengan kedua tangan selebar bahu, telapak menghadap ke bawah.
2. Gunakan lengan yang sehat untuk mendorong tongkat ke atas kepala sejauh nyaman.
3. Lengan yang sakit hanya ikut, tidak berusaha mengangkat.
4. Tahan 5 detik di ujung gerak, lalu turunkan perlahan.
5. Hentikan sebelum nyeri tajam; regangan ringan diperbolehkan.', '1. Lie on your back with knees bent. Hold a stick with both hands shoulder-width apart, palms down.
2. Use the healthy arm to push the stick overhead as far as comfortable.
3. The painful arm goes along for the ride and does not lift.
4. Hold 5 seconds at end range, then lower slowly.
5. Stop short of sharp pain; a mild stretch is acceptable.',
  'Pada pasca perbaikan rotator cuff, batasi elevasi sesuai protokol bedah (umumnya maksimal 90-120 derajat pada 6 minggu pertama).', 'Setelah lingkup gerak pasif hampir penuh, ubah ke gerakan aktif tanpa tongkat, lalu duduk dan berdiri untuk menambah efek gravitasi.', 2, 10,
  5, 30, '2-3x/hari',
  'B', 'Kelley et al. Adhesive Capsulitis CPG, JOSPT 2013; Thigpen et al. J Shoulder Elbow Surg 2016 (post-op RCR consensus)', ARRAY['frozen shoulder', 'post-op', 'AAROM']::text[], null
),
-- Supine External Rotation with Cane
(
  'e7b7517b-f42e-386c-90a7-97120dd2728d', 'supine-external-rotation-cane', 'Supine External Rotation with Cane', 'Rotasi Eksternal Telentang dengan Tongkat', 'Latihan lingkup gerak rotasi eksternal, gerakan yang paling sering terbatas pada frozen shoulder.', 'External rotation ROM drill - the motion most commonly restricted in frozen shoulder.',
  'Shoulder', 'Neck & Upper', 'Beginner', 'Mobility', 'Supine',
  'Kapsul anterior, rotator eksternal', ARRAY['Tongkat', 'Handuk gulung']::text[], '1. Berbaring telentang, siku lengan yang sakit ditekuk 90 derajat dan menempel di sisi badan, dengan handuk gulung di bawah siku.
2. Pegang tongkat dengan kedua tangan.
3. Dorong tongkat dengan tangan sehat sehingga lengan sakit berputar ke arah luar.
4. Jaga siku tetap menempel di badan sepanjang gerakan.
5. Tahan 5-10 detik pada regangan ringan, lalu kembali.', '1. Lie on your back, the affected elbow bent 90 degrees and tucked at your side with a rolled towel under it.
2. Hold a stick with both hands.
3. Push the stick with the healthy hand so the affected arm rotates outward.
4. Keep the elbow against your side throughout.
5. Hold 5-10 seconds at a mild stretch, then return.',
  'Setelah perbaikan subscapularis atau stabilisasi anterior, batasi rotasi eksternal sesuai instruksi dokter bedah. Hindari regangan agresif pada frozen shoulder fase nyeri tinggi.', 'Naikkan sudut abduksi bahu (0 -> 45 -> 90 derajat) seiring perbaikan lingkup gerak. Regangan 30 detik lebih efektif setelah kompres hangat.', 3, 8,
  10, 30, '2x/hari',
  'A', 'Kelley et al. Adhesive Capsulitis CPG, JOSPT 2013;43(5):A1-A31', ARRAY['frozen shoulder', 'external rotation', 'AAROM']::text[], null
),
-- Wall Slide (W to Y)
(
  '7cf97fdb-0665-3741-a737-3930d794abd5', 'wall-slide-shoulder', 'Wall Slide (W to Y)', 'Geser Lengan di Dinding (W ke Y)', 'Latihan elevasi bahu terbimbing dinding untuk melatih ritme skapulohumeral.', 'Wall-guided shoulder elevation to retrain scapulohumeral rhythm.',
  'Shoulder', 'Neck & Upper', 'Intermediate', 'Motor control', 'Standing',
  'Serratus anterior, trapezius bawah', ARRAY['Dinding']::text[], '1. Berdiri menghadap dinding, letakkan sisi kelingking kedua tangan dan lengan bawah di dinding, siku setinggi bahu (huruf W).
2. Geser lengan ke atas membentuk huruf Y sambil menjaga kontak dengan dinding.
3. Jangan mengangkat bahu ke telinga; rasakan tulang belikat berputar ke atas.
4. Turunkan perlahan ke posisi awal dalam 3 detik.
5. Hentikan pada ketinggian yang masih bebas nyeri.', '1. Face a wall and place the little-finger side of both hands and forearms on it, elbows at shoulder height (W shape).
2. Slide the arms up into a Y while keeping contact with the wall.
3. Do not shrug; feel the shoulder blades rotating upward.
4. Lower slowly to the start over 3 seconds.
5. Stop at the highest pain-free height.',
  'Hentikan bila muncul nyeri jepitan tajam. Hindari elevasi di atas 90 derajat pada 6 minggu pertama pasca perbaikan rotator cuff.', 'Maju dari wall slide ke wall slide dengan karet elastis di pergelangan tangan, lalu ke elevasi bebas dengan beban ringan.', 3, 12,
  2, 30, '1x/hari',
  'B', 'Cools et al. Br J Sports Med 2014; Hardwick et al. JOSPT 2006 (scapular muscle activity wall slide)', ARRAY['shoulder', 'scapula', 'motor control']::text[], null
),
-- Isometric Shoulder External Rotation
(
  '74046b5e-bd2d-3ba5-aef5-b1308b690f58', 'isometric-shoulder-external-rotation', 'Isometric Shoulder External Rotation', 'Isometrik Rotasi Eksternal Bahu', 'Kontraksi isometrik rotator cuff posterior yang dapat dilakukan bahkan saat bahu masih nyeri.', 'Posterior rotator cuff isometric that can be performed even while the shoulder is still painful.',
  'Shoulder', 'Neck & Upper', 'Beginner', 'Strength', 'Standing',
  'Infraspinatus, teres minor', ARRAY['Dinding atau kusen pintu']::text[], '1. Berdiri di samping dinding dengan siku ditekuk 90 derajat dan menempel di sisi badan.
2. Letakkan punggung tangan menempel dinding.
3. Dorong punggung tangan ke dinding dengan kekuatan sekitar 50-70% - tidak ada gerakan yang terjadi.
4. Tahan 10 detik sambil bernapas normal, lalu rileks 10 detik.
5. Ulangi 10 kali.', '1. Stand beside a wall with the elbow bent 90 degrees and tucked at your side.
2. Place the back of the hand against the wall.
3. Press the back of the hand into the wall at about 50-70% effort - no movement occurs.
4. Hold 10 seconds breathing normally, then relax 10 seconds.
5. Repeat 10 times.',
  'Hentikan bila nyeri meningkat lebih dari 2 poin (skala 0-10) atau menetap setelah latihan. Hindari kontraksi kuat pada 6 minggu pertama pasca perbaikan rotator cuff.', 'Setelah isometrik bebas nyeri, maju ke rotasi eksternal dengan karet elastis (kontraksi dinamis), lalu tambahkan sudut abduksi.', 3, 10,
  10, 30, '1-2x/hari',
  'A', 'Hopewell et al. GRASP trial, Lancet 2021;398(10298):416-428; Littlewood et al. 2016', ARRAY['rotator cuff', 'isometric', 'shoulder pain']::text[], null
),
-- Resisted External Rotation with Band
(
  'b1824bb8-02bf-330c-a97e-58bf8595533e', 'band-external-rotation', 'Resisted External Rotation with Band', 'Rotasi Eksternal dengan Karet Elastis', 'Latihan penguatan utama rotator cuff posterior pada nyeri bahu terkait rotator cuff.', 'The key posterior rotator cuff strengthening exercise for rotator cuff related shoulder pain.',
  'Shoulder', 'Neck & Upper', 'Intermediate', 'Strength', 'Standing',
  'Infraspinatus, teres minor, penstabil skapula', ARRAY['Karet elastis (resistance band)', 'Handuk gulung']::text[], '1. Ikat karet elastis setinggi pinggang, berdiri menyamping dengan lengan yang dilatih di sisi luar.
2. Siku ditekuk 90 derajat dan dijepit di sisi badan (boleh dengan handuk gulung di ketiak).
3. Tarik karet ke arah luar dengan memutar lengan bawah, jaga siku tetap menempel.
4. Tahan 2 detik di ujung gerak, lalu kembali perlahan selama 3 detik.
5. Nyeri saat latihan sampai 4/10 masih dapat diterima dan harus mereda dalam 24 jam.', '1. Anchor the band at waist height and stand side-on with the exercising arm furthest from the anchor.
2. Bend the elbow 90 degrees and tuck it to your side (a rolled towel in the armpit helps).
3. Pull the band outward by rotating the forearm, keeping the elbow tucked.
4. Hold 2 seconds at end range, then return slowly over 3 seconds.
5. Pain up to 4/10 during the exercise is acceptable and should settle within 24 hours.',
  'Hindari pada 6-12 minggu pertama pasca perbaikan rotator cuff tanpa izin dokter bedah. Hentikan bila nyeri malam bertambah.', 'Naikkan resistensi karet ketika 3 set x 15 repetisi dapat diselesaikan dengan kontrol baik. Progresi berikutnya: rotasi eksternal pada 45 lalu 90 derajat abduksi.', 3, 12,
  2, 45, '3-5x/minggu',
  'A', 'Hopewell et al. GRASP trial, Lancet 2021; Littlewood et al. Physiotherapy 2015 (self-managed loaded exercise)', ARRAY['rotator cuff', 'strength', 'shoulder pain']::text[], null
),
-- Resisted Internal Rotation with Band
(
  '7dbec74c-f51f-3504-bbdb-3005c2f8c21d', 'band-internal-rotation', 'Resisted Internal Rotation with Band', 'Rotasi Internal dengan Karet Elastis', 'Penguatan rotator internal untuk keseimbangan kekuatan rotator cuff.', 'Internal rotator strengthening to balance rotator cuff strength.',
  'Shoulder', 'Neck & Upper', 'Intermediate', 'Strength', 'Standing',
  'Subscapularis, pectoralis major', ARRAY['Karet elastis']::text[], '1. Ikat karet setinggi pinggang, berdiri menyamping dengan lengan yang dilatih di sisi dalam (dekat titik ikat).
2. Siku ditekuk 90 derajat, menempel di sisi badan.
3. Tarik karet ke arah perut dengan memutar lengan bawah ke dalam.
4. Tahan 2 detik, kembali perlahan 3 detik.
5. Jaga badan tidak ikut berputar.', '1. Anchor the band at waist height and stand side-on with the exercising arm nearest the anchor.
2. Bend the elbow 90 degrees, tucked to your side.
3. Pull the band toward your stomach by rotating the forearm inward.
4. Hold 2 seconds, return slowly over 3 seconds.
5. Do not let the trunk rotate.',
  'Hindari pada 12 minggu pertama pasca perbaikan subscapularis. Hentikan bila nyeri anterior bahu meningkat.', 'Seimbangkan volume dengan rotasi eksternal (rasio kira-kira 1:1 hingga 2:3) untuk mencegah dominasi rotator internal.', 3, 12,
  2, 45, '3x/minggu',
  'B', 'Hopewell et al. GRASP trial, Lancet 2021; Cools et al. Br J Sports Med 2014', ARRAY['rotator cuff', 'strength']::text[], null
),
-- Scaption Raise (Full Can)
(
  '1a84bba5-b033-3bc7-b361-978658ac38cf', 'scaption-raise', 'Scaption Raise (Full Can)', 'Angkat Lengan Bidang Skapula (Full Can)', 'Elevasi lengan pada bidang skapula (30 derajat dari depan) - posisi paling efisien dan paling sedikit menimbulkan jepitan.', 'Arm elevation in the scapular plane (30 degrees forward), the most efficient and least impinging position.',
  'Shoulder', 'Neck & Upper', 'Intermediate', 'Strength', 'Standing',
  'Supraspinatus, deltoid, serratus anterior', ARRAY['Dumbel ringan 0,5-2 kg (opsional)']::text[], '1. Berdiri tegak dengan lengan di samping badan, ibu jari menghadap ke atas.
2. Angkat lengan ke arah diagonal depan (sekitar 30 derajat dari bidang samping) sampai setinggi bahu.
3. Angkat dalam 2 detik, tahan 1 detik, turunkan dalam 3 detik.
4. Jangan mengangkat bahu ke telinga dan jangan mencondongkan badan.
5. Hentikan pada ketinggian bebas nyeri.', '1. Stand tall with arms at your sides, thumbs pointing up.
2. Raise the arm on a forward diagonal (about 30 degrees from the side plane) to shoulder height.
3. Lift over 2 seconds, hold 1 second, lower over 3 seconds.
4. Do not shrug or lean the trunk.
5. Stop at the pain-free height.',
  'Hindari bila terdapat nyeri busur (painful arc) yang tajam; kurangi rentang gerak dahulu. Hindari pada fase awal pasca operasi bahu.', 'Mulai tanpa beban sampai 15 repetisi bersih, lalu tambah 0,5 kg bertahap. Progresi: sampai setinggi bahu -> di atas kepala.', 3, 12,
  1, 45, '3x/minggu',
  'B', 'Cools et al. Br J Sports Med 2014; Hopewell et al. GRASP trial, Lancet 2021', ARRAY['rotator cuff', 'strength', 'shoulder']::text[], null
),
-- Prone Y Raise (Lower Trapezius)
(
  'dbe84c48-cc01-3870-8d44-5d7c6f1c80e0', 'prone-y-raise', 'Prone Y Raise (Lower Trapezius)', 'Angkat Lengan Y Tengkurap (Trapezius Bawah)', 'Penguatan trapezius bawah yang penting untuk kontrol skapula dan nyeri bahu kronis.', 'Lower trapezius strengthening, important for scapular control and persistent shoulder pain.',
  'Shoulder', 'Neck & Upper', 'Intermediate', 'Strength', 'Prone',
  'Trapezius bawah, trapezius tengah', ARRAY['Matras', 'Dumbel 0,5-1 kg (opsional)']::text[], '1. Tengkurap di matras dengan dahi disangga handuk.
2. Julurkan lengan ke atas kepala membentuk huruf Y (sekitar 120 derajat), ibu jari menghadap atas.
3. Angkat lengan dari lantai dengan menggerakkan tulang belikat ke bawah-dalam terlebih dahulu.
4. Tahan 3-5 detik, turunkan perlahan.
5. Jangan melengkungkan pinggang atau mengangkat kepala.', '1. Lie face down with the forehead supported on a towel.
2. Reach the arms overhead in a Y (about 120 degrees), thumbs up.
3. Lift the arms off the floor, initiating by drawing the shoulder blades down and in.
4. Hold 3-5 seconds, lower slowly.
5. Do not arch the low back or lift the head.',
  'Hindari pada nyeri punggung bawah yang memburuk saat tengkurap dan pada 8 minggu pertama pasca perbaikan rotator cuff.', 'Mulai tanpa beban; tambahkan 0,5 kg saat 3x12 repetisi bersih tercapai. Alternatif untuk yang tidak bisa tengkurap: prone on incline bench.', 3, 10,
  5, 45, '3x/minggu',
  'B', 'Cools et al. Am J Sports Med 2007 (scapular muscle exercise selection); GRASP programme 2021', ARRAY['scapula', 'strength', 'shoulder']::text[], null
),
-- Prone T Raise (Horizontal Abduction)
(
  'b88fc287-f1d9-3d85-9ca7-0f12fc79a184', 'prone-t-raise', 'Prone T Raise (Horizontal Abduction)', 'Angkat Lengan T Tengkurap', 'Penguatan retraktor skapula untuk stabilitas bahu dan postur.', 'Scapular retractor strengthening for shoulder stability and posture.',
  'Shoulder', 'Neck & Upper', 'Intermediate', 'Strength', 'Prone',
  'Trapezius tengah, rhomboid, deltoid posterior', ARRAY['Matras', 'Dumbel 0,5-1 kg (opsional)']::text[], '1. Tengkurap dengan dahi disangga handuk.
2. Rentangkan lengan ke samping setinggi bahu membentuk huruf T, ibu jari menghadap atas.
3. Angkat lengan dari lantai dengan merapatkan tulang belikat.
4. Tahan 3 detik, turunkan perlahan.
5. Jaga leher rileks.', '1. Lie face down with the forehead on a towel.
2. Spread the arms out to the sides at shoulder height in a T, thumbs up.
3. Lift the arms off the floor by squeezing the shoulder blades together.
4. Hold 3 seconds, lower slowly.
5. Keep the neck relaxed.',
  'Hindari bila menimbulkan nyeri leher atau punggung bawah. Tidak untuk fase awal pasca operasi bahu.', 'Kombinasikan Y, T, dan W dalam satu sirkuit. Tambahkan beban hanya bila skapula tetap terkontrol.', 3, 12,
  3, 45, '3x/minggu',
  'B', 'Cools et al. Am J Sports Med 2007; Br J Sports Med 2014', ARRAY['scapula', 'strength', 'posture']::text[], null
),
-- Serratus Wall Punch (Push-up Plus)
(
  '99b0f906-54e7-3b44-85b0-3a32726fd0a8', 'serratus-wall-punch', 'Serratus Wall Punch (Push-up Plus)', 'Dorongan Serratus di Dinding', 'Aktivasi serratus anterior untuk mencegah scapular winging dan mendukung elevasi lengan.', 'Serratus anterior activation to counter scapular winging and support arm elevation.',
  'Shoulder', 'Neck & Upper', 'Beginner', 'Motor control', 'Standing',
  'Serratus anterior', ARRAY['Dinding']::text[], '1. Berdiri menghadap dinding, kedua telapak tangan di dinding setinggi bahu, siku lurus.
2. Tanpa menekuk siku, dorong badan menjauhi dinding sehingga tulang belikat melebar ke samping.
3. Tahan 3 detik, lalu biarkan tulang belikat kembali merapat perlahan.
4. Jangan mengangkat bahu ke telinga.
5. Ulangi 12-15 kali.', '1. Face a wall with both palms on it at shoulder height, elbows straight.
2. Without bending the elbows, push your body away so the shoulder blades spread apart.
3. Hold 3 seconds, then let the shoulder blades come back together slowly.
4. Do not shrug.
5. Repeat 12-15 times.',
  'Hentikan bila muncul nyeri pergelangan tangan; gunakan tumpuan kepalan tangan. Hindari beban berat pada bahu tidak stabil.', 'Progresi: dinding -> meja -> lantai (push-up plus dengan lutut) -> push-up plus penuh.', 3, 12,
  3, 30, '1x/hari',
  'B', 'Ludewig et al. Am J Sports Med 2004 (serratus anterior activation); Cools et al. 2014', ARRAY['scapula', 'serratus', 'motor control']::text[], null
),
-- Sleeper Stretch (Posterior Capsule)
(
  'cc6ee609-3d0f-3008-a635-3915fdad1ad6', 'sleeper-stretch', 'Sleeper Stretch (Posterior Capsule)', 'Peregangan Kapsul Posterior (Sleeper Stretch)', 'Peregangan kapsul posterior bahu untuk defisit rotasi internal (GIRD), umum pada atlet lempar dan nyeri bahu kronis.', 'Posterior shoulder capsule stretch for internal rotation deficit (GIRD), common in overhead athletes and persistent shoulder pain.',
  'Shoulder', 'Neck & Upper', 'Intermediate', 'Stretch', 'Side-lying',
  'Kapsul posterior glenohumeral', ARRAY['Matras', 'Bantal']::text[], '1. Berbaring menyamping pada sisi bahu yang sakit, bahu diposisikan 90 derajat ke depan, siku ditekuk 90 derajat.
2. Gunakan tangan yang atas untuk menekan lengan bawah ke arah lantai (rotasi internal).
3. Tekan sampai terasa regangan di belakang bahu - bukan nyeri di depan bahu.
4. Tahan 30 detik, ulangi 3 kali.
5. Jaga tulang belikat tetap menempel matras (jangan berguling ke belakang).', '1. Lie on the affected side with the shoulder 90 degrees forward and the elbow bent 90 degrees.
2. Use the top hand to press the forearm toward the floor (internal rotation).
3. Press until a stretch is felt at the back of the shoulder - not pain at the front.
4. Hold 30 seconds, repeat 3 times.
5. Keep the shoulder blade flat on the mat (do not roll backward).',
  'Hentikan bila nyeri di depan bahu (tanda jepitan anterior). Hindari pada instabilitas bahu dan pasca operasi labrum.', 'Alternatif yang lebih aman untuk banyak pasien: cross-body adduction stretch. Ukur perbaikan dengan selisih rotasi internal kanan-kiri.', 3, 1,
  30, 20, '1-2x/hari',
  'B', 'McClure et al. J Athl Train 2007 (posterior shoulder stretching); Kelley et al. JOSPT 2013', ARRAY['stretch', 'GIRD', 'overhead athlete']::text[], null
),
-- Cross-Body Adduction Stretch
(
  '37bfb338-441d-3d4f-ba05-41f9e13ae10f', 'cross-body-adduction-stretch', 'Cross-Body Adduction Stretch', 'Peregangan Bahu Silang Badan', 'Peregangan sederhana bagian belakang bahu, alternatif sleeper stretch yang lebih mudah ditoleransi.', 'Simple posterior shoulder stretch, a better-tolerated alternative to the sleeper stretch.',
  'Shoulder', 'Neck & Upper', 'Beginner', 'Stretch', 'Standing',
  'Kapsul posterior, deltoid posterior', '{}'::text[], '1. Berdiri atau duduk tegak.
2. Bawa lengan yang sakit menyilang di depan dada.
3. Gunakan lengan sehat untuk menarik lengan tersebut mendekat ke dada (pegang di atas siku, bukan di siku).
4. Tahan 30 detik sampai terasa regangan di belakang bahu.
5. Ulangi 3 kali.', '1. Stand or sit tall.
2. Bring the affected arm across the front of your chest.
3. Use the other arm to pull it closer to the chest (hold above the elbow, not on the elbow).
4. Hold 30 seconds until a stretch is felt at the back of the shoulder.
5. Repeat 3 times.',
  'Hentikan bila terasa nyeri tajam di depan bahu atau kesemutan di lengan.', 'Lakukan setelah aktivitas atau kompres hangat. Tidak perlu regangan kuat - regangan sedang 30 detik sudah cukup.', 3, 1,
  30, 15, '1-2x/hari',
  'B', 'McClure et al. J Athl Train 2007; Kelley et al. Adhesive Capsulitis CPG, JOSPT 2013', ARRAY['stretch', 'shoulder']::text[], null
),
-- Seated Row with Band
(
  '0487b7c2-166f-3304-a6d2-9760909fddcb', 'band-row', 'Seated Row with Band', 'Dayung Duduk dengan Karet Elastis', 'Latihan tarik horizontal untuk kekuatan punggung atas dan postur, komponen inti program bahu dan leher.', 'Horizontal pulling exercise for upper back strength and posture, a core component of shoulder and neck programs.',
  'Shoulder', 'Neck & Upper', 'Beginner', 'Strength', 'Sitting',
  'Rhomboid, trapezius tengah, latissimus dorsi', ARRAY['Karet elastis']::text[], '1. Duduk dengan kaki lurus ke depan, lingkarkan karet di telapak kaki dan pegang kedua ujungnya.
2. Duduk tegak, tarik siku ke belakang dekat sisi badan.
3. Rapatkan tulang belikat di akhir gerakan, tahan 2 detik.
4. Kembalikan tangan perlahan selama 3 detik.
5. Jangan mengangkat bahu ke telinga atau membungkuk.', '1. Sit with legs straight out, loop the band around your feet and hold both ends.
2. Sit tall and pull the elbows back close to your sides.
3. Squeeze the shoulder blades at the end of the movement, hold 2 seconds.
4. Return the hands slowly over 3 seconds.
5. Do not shrug or slouch.',
  'Hindari pada nyeri punggung bawah yang memburuk dalam posisi duduk kaki lurus - gunakan versi duduk di kursi dengan karet diikat di depan.', 'Naikkan ketebalan karet saat 3x15 repetisi terasa mudah. Variasi: row satu tangan untuk mengatasi asimetri.', 3, 12,
  2, 45, '3x/minggu',
  'B', 'Hopewell et al. GRASP trial, Lancet 2021; Gross et al. Cochrane 2015', ARRAY['strength', 'posture', 'scapula']::text[], null
),
-- Wall Push-Up
(
  '82533aa8-5bbd-302a-b91e-a1c699922af7', 'wall-push-up', 'Wall Push-Up', 'Push-Up Dinding', 'Latihan tumpuan beban tubuh ringan untuk membangun kekuatan lengan dan bahu pada tahap awal.', 'Low-load closed-chain exercise to build early arm and shoulder strength.',
  'Shoulder', 'Neck & Upper', 'Beginner', 'Strength', 'Standing',
  'Pectoralis, triceps, serratus anterior', ARRAY['Dinding']::text[], '1. Berdiri menghadap dinding sejauh satu lengan, telapak tangan di dinding setinggi bahu.
2. Tekuk siku dan turunkan dada mendekati dinding, jaga badan tetap lurus.
3. Dorong kembali ke posisi awal.
4. Di akhir dorongan, tambahkan sedikit dorongan ekstra untuk melebarkan tulang belikat.
5. Ulangi 10-15 kali.', '1. Stand an arm''s length from a wall with palms on it at shoulder height.
2. Bend the elbows and lower your chest toward the wall, keeping the body straight.
3. Push back to the start.
4. At the end of the push, add a small extra push to spread the shoulder blades.
5. Repeat 10-15 times.',
  'Hentikan bila nyeri pergelangan tangan atau bahu meningkat. Hindari pada 12 minggu pertama pasca perbaikan rotator cuff.', 'Progresi beban: dinding -> meja -> lantai dengan lutut -> push-up penuh. Semakin jauh kaki dari dinding, semakin berat.', 3, 12,
  0, 45, '3x/minggu',
  'B', 'ACSM''s Guidelines for Exercise Testing and Prescription, 11th ed.; GRASP programme 2021', ARRAY['strength', 'shoulder', 'beginner']::text[], null
),
-- Eccentric Wrist Extension (Tyler Twist)
(
  'f1aa3a53-91f4-3231-bcd5-dadb36f65c68', 'tyler-twist-eccentric-wrist-extension', 'Eccentric Wrist Extension (Tyler Twist)', 'Ekstensi Pergelangan Eksentrik (Tyler Twist)', 'Latihan eksentrik khusus untuk tendinopati epikondilus lateral (tennis elbow) menggunakan batang karet.', 'Targeted eccentric loading for lateral elbow tendinopathy (tennis elbow) using a rubber bar.',
  'Elbow', 'Neck & Upper', 'Intermediate', 'Strength', 'Standing',
  'Extensor carpi radialis brevis, ekstensor pergelangan tangan', ARRAY['FlexBar / batang karet elastis']::text[], '1. Pegang batang karet secara vertikal dengan tangan yang sakit di bawah, pergelangan sedikit ekstensi.
2. Genggam ujung atas batang dengan tangan yang sehat, lalu puntir batang dengan tangan sehat hingga tegang.
3. Julurkan kedua lengan lurus ke depan sambil menjaga puntiran.
4. Perlahan biarkan tangan yang sakit terurai/melepas puntiran selama 3-4 detik (ini fase eksentrik).
5. Nyeri ringan 3-4/10 selama latihan dapat diterima; nyeri harus mereda dalam 24 jam.', '1. Hold the bar vertically with the affected hand at the bottom, wrist slightly extended.
2. Grip the top of the bar with the healthy hand and twist the bar until taut.
3. Extend both arms straight in front while maintaining the twist.
4. Slowly let the affected wrist untwist over 3-4 seconds (this is the eccentric phase).
5. Discomfort of 3-4/10 during the exercise is acceptable; it should settle within 24 hours.',
  'Hentikan bila nyeri > 5/10 atau menetap > 24 jam. Hindari pada ruptur tendon, fraktur epikondilus, dan nyeri saraf radialis yang belum dievaluasi.', 'Naikkan ke batang dengan resistensi lebih tinggi (merah -> hijau -> biru) saat 3x15 repetisi bisa dilakukan dengan nyeri <3/10. Lanjutkan minimal 6-12 minggu.', 3, 15,
  4, 60, '1x/hari, 5 hari/minggu',
  'A', 'Tyler et al. J Shoulder Elbow Surg 2010;19(6):917-922; Lucado et al. Lateral Elbow Tendinopathy CPG, JOSPT 2022;52(12):CPG1-CPG111', ARRAY['tennis elbow', 'eccentric', 'tendinopathy']::text[], null
),
-- Eccentric Wrist Extension with Weight
(
  '238e59c5-7f14-3b32-9969-376166e6d100', 'eccentric-wrist-extension-dumbbell', 'Eccentric Wrist Extension with Weight', 'Ekstensi Pergelangan Eksentrik dengan Beban', 'Alternatif Tyler Twist tanpa FlexBar - pembebanan eksentrik ekstensor pergelangan tangan dengan beban bebas.', 'A FlexBar-free alternative - eccentric loading of the wrist extensors with a free weight.',
  'Elbow', 'Neck & Upper', 'Beginner', 'Strength', 'Sitting',
  'Ekstensor pergelangan tangan', ARRAY['Dumbel 0,5-2 kg atau botol air']::text[], '1. Duduk dengan lengan bawah bertumpu di meja, telapak menghadap ke bawah, pergelangan tangan menjuntai di tepi meja.
2. Pegang beban ringan; gunakan tangan yang sehat untuk mengangkat pergelangan ke posisi ekstensi penuh.
3. Lepaskan bantuan tangan sehat, lalu turunkan beban perlahan selama 3-4 detik.
4. Bantu kembali ke atas dengan tangan sehat (fase mengangkat tidak dilatih).
5. Ulangi 15 kali per set.', '1. Sit with the forearm supported on a table, palm down, wrist over the edge.
2. Hold a light weight; use the healthy hand to lift the wrist into full extension.
3. Release the assistance and lower the weight slowly over 3-4 seconds.
4. Assist back up with the healthy hand (the lifting phase is not trained).
5. Repeat 15 times per set.',
  'Hentikan bila nyeri tajam atau bengkak bertambah. Hindari beban berat pada fase sangat nyeri - gunakan isometrik dahulu.', 'Mulai 0,5 kg, naikkan 0,25-0,5 kg tiap 1-2 minggu bila 3x15 repetisi terasa nyaman.', 3, 15,
  4, 60, '1x/hari',
  'A', 'Lucado et al. Lateral Elbow Tendinopathy CPG, JOSPT 2022; Croisier et al. Br J Sports Med 2007', ARRAY['tennis elbow', 'eccentric', 'tendinopathy']::text[], null
),
-- Wrist Extensor Stretch
(
  '60718002-77d5-34c9-9167-bc7eec607f8d', 'wrist-extensor-stretch', 'Wrist Extensor Stretch', 'Peregangan Otot Ekstensor Pergelangan', 'Peregangan otot ekstensor lengan bawah untuk tennis elbow dan nyeri pergelangan tangan akibat pekerjaan berulang.', 'Forearm extensor stretch for tennis elbow and repetitive-strain wrist pain.',
  'Wrist', 'Neck & Upper', 'Beginner', 'Stretch', 'Standing',
  'Ekstensor pergelangan tangan dan jari', '{}'::text[], '1. Julurkan lengan yang sakit lurus ke depan, siku lurus, telapak menghadap ke bawah.
2. Tekuk pergelangan tangan ke bawah dengan bantuan tangan sehat.
3. Tahan sampai terasa regangan di sisi luar lengan bawah, tanpa nyeri tajam.
4. Tahan 30-45 detik.
5. Ulangi 3 kali.', '1. Extend the affected arm straight in front, elbow straight, palm down.
2. Bend the wrist downward with help from the other hand.
3. Hold until a stretch is felt on the outside of the forearm, without sharp pain.
4. Hold 30-45 seconds.
5. Repeat 3 times.',
  'Hentikan bila menimbulkan kesemutan (kemungkinan iritasi saraf radialis).', 'Lakukan sebelum dan sesudah aktivitas mencengkeram. Peregangan saja tidak cukup - harus digabung dengan latihan penguatan eksentrik.', 3, 1,
  40, 20, '2-3x/hari',
  'B', 'Lucado et al. Lateral Elbow Tendinopathy CPG, JOSPT 2022', ARRAY['tennis elbow', 'stretch', 'wrist']::text[], null
),
-- Wrist Flexor Stretch
(
  '453be95b-0cda-3770-af69-4bcfbcd61407', 'wrist-flexor-stretch', 'Wrist Flexor Stretch', 'Peregangan Otot Fleksor Pergelangan', 'Peregangan fleksor lengan bawah untuk golfer''s elbow dan kekakuan pergelangan tangan.', 'Forearm flexor stretch for golfer''s elbow and wrist stiffness.',
  'Wrist', 'Neck & Upper', 'Beginner', 'Stretch', 'Standing',
  'Fleksor pergelangan tangan dan jari', '{}'::text[], '1. Julurkan lengan lurus ke depan dengan telapak menghadap ke atas.
2. Tarik jari-jari ke bawah/ke belakang dengan tangan yang lain.
3. Tahan sampai terasa regangan di sisi dalam lengan bawah.
4. Tahan 30-45 detik, napas tenang.
5. Ulangi 3 kali.', '1. Extend the arm straight in front with the palm facing up.
2. Pull the fingers down and back with the other hand.
3. Hold until a stretch is felt on the inside of the forearm.
4. Hold 30-45 seconds, breathing calmly.
5. Repeat 3 times.',
  'Hentikan bila muncul kesemutan di jari (kemungkinan iritasi saraf medianus/ulnaris).', 'Kombinasikan dengan penguatan fleksor eksentrik untuk medial epicondylalgia.', 3, 1,
  40, 20, '2-3x/hari',
  'B', 'Lucado et al. JOSPT 2022; Vicenzino Man Ther 2003', ARRAY['golfer''s elbow', 'stretch', 'wrist']::text[], null
),
-- Grip Strengthening (Ball Squeeze)
(
  'f9efe9dc-3254-30ce-936d-db1d6657ca61', 'grip-strengthening-ball', 'Grip Strengthening (Ball Squeeze)', 'Penguatan Genggaman (Remas Bola)', 'Penguatan genggaman untuk pemulihan fungsi tangan pasca cedera, artritis, dan tennis elbow.', 'Grip strengthening to restore hand function after injury, in arthritis, and in tennis elbow.',
  'Hand', 'Neck & Upper', 'Beginner', 'Strength', 'Sitting',
  'Fleksor jari, otot intrinsik tangan', ARRAY['Bola karet lunak atau gulungan handuk']::text[], '1. Duduk dengan lengan bawah bertumpu di meja atau paha.
2. Genggam bola lunak, remas dengan kekuatan sedang.
3. Tahan 5 detik, lalu lepaskan sepenuhnya selama 5 detik.
4. Ulangi 10-15 kali.
5. Hentikan bila nyeri sendi meningkat.', '1. Sit with the forearm supported on a table or thigh.
2. Grip a soft ball and squeeze at a moderate effort.
3. Hold 5 seconds, then fully release for 5 seconds.
4. Repeat 10-15 times.
5. Stop if joint pain increases.',
  'Pada artritis inflamasi aktif, gunakan intensitas rendah. Hentikan bila sendi bengkak/panas bertambah.', 'Naikkan kekerasan bola bertahap. Kekuatan genggam adalah tolok ukur objektif - catat dengan dinamometer bila tersedia.', 3, 12,
  5, 30, '1-2x/hari',
  'B', 'Erickson et al. Hand Pain and Sensory Deficits CPG, JOSPT 2019;49(5):CPG1-CPG85', ARRAY['hand', 'grip', 'strength']::text[], null
),
-- Tendon Gliding Exercises
(
  '786880ec-bb08-3e54-a0ec-583d2c1624c4', 'tendon-gliding-hand', 'Tendon Gliding Exercises', 'Latihan Luncur Tendon Tangan', 'Rangkaian lima posisi tangan untuk melancarkan luncuran tendon fleksor, digunakan pada carpal tunnel syndrome dan kekakuan tangan.', 'Five-position hand sequence to promote flexor tendon excursion, used in carpal tunnel syndrome and hand stiffness.',
  'Hand', 'Neck & Upper', 'Beginner', 'Mobility', 'Sitting',
  'Tendon fleksor jari (FDS, FDP)', '{}'::text[], '1. Mulai dengan jari lurus (posisi netral).
2. Tekuk jari membentuk "kait" (hook fist): sendi ujung dan tengah menekuk, buku jari lurus.
3. Buat kepalan penuh (full fist).
4. Buat "kepalan lurus" (straight fist): buku jari menekuk, sendi ujung lurus.
5. Buat "meja" (tabletop): buku jari menekuk 90 derajat, jari lurus. Tahan tiap posisi 3 detik dan kembali ke posisi lurus di antaranya.', '1. Start with the fingers straight (neutral).
2. Make a hook fist: end and middle joints bend, knuckles straight.
3. Make a full fist.
4. Make a straight fist: knuckles bend, end joints straight.
5. Make a tabletop: knuckles bent 90 degrees, fingers straight. Hold each position 3 seconds, returning to straight in between.',
  'Setelah perbaikan tendon, ikuti protokol terapis tangan - jangan lakukan tanpa izin. Hentikan bila nyeri tajam.', 'Lakukan sering dengan repetisi sedikit (misal 5-10 siklus, 3-5x/hari) untuk menjaga luncuran tanpa iritasi.', 3, 10,
  3, 20, '3x/hari',
  'B', 'Kim SD. J Phys Ther Sci 2015 (tendon/nerve gliding CTS review); Erickson et al. JOSPT 2019', ARRAY['carpal tunnel', 'hand', 'mobility']::text[], null
),
-- Forearm Pronation-Supination with Weight
(
  'ec7dcc9c-34da-3d9d-b22a-a4f51636a01f', 'forearm-pronation-supination', 'Forearm Pronation-Supination with Weight', 'Pronasi-Supinasi Lengan Bawah dengan Beban', 'Penguatan rotasi lengan bawah, komponen penting rehabilitasi tennis elbow dan pasca cedera lengan bawah.', 'Forearm rotation strengthening, an important component of tennis elbow and post-forearm-injury rehabilitation.',
  'Elbow', 'Neck & Upper', 'Intermediate', 'Strength', 'Sitting',
  'Pronator teres, supinator, brachioradialis', ARRAY['Palu ringan atau dumbel dengan pegangan satu sisi']::text[], '1. Duduk dengan lengan bawah bertumpu di paha atau meja, siku ditekuk 90 derajat.
2. Pegang palu ringan pada gagangnya, posisi awal ibu jari menghadap atas.
3. Putar lengan bawah perlahan sehingga telapak menghadap ke bawah, tahan 2 detik.
4. Putar kembali sehingga telapak menghadap ke atas, tahan 2 detik.
5. Gerakkan hanya lengan bawah - bahu tetap diam.', '1. Sit with the forearm supported on the thigh or a table, elbow bent 90 degrees.
2. Hold a light hammer by the handle, thumb up to start.
3. Slowly rotate the forearm so the palm faces down, hold 2 seconds.
4. Rotate back so the palm faces up, hold 2 seconds.
5. Move only the forearm - the shoulder stays still.',
  'Hindari pada fraktur lengan bawah yang belum menyatu. Hentikan bila nyeri siku > 4/10.', 'Perbesar lengan tuas dengan memegang palu lebih jauh dari kepala palu untuk menambah beban tanpa menambah berat.', 3, 15,
  2, 45, '3-5x/minggu',
  'B', 'Lucado et al. Lateral Elbow Tendinopathy CPG, JOSPT 2022', ARRAY['tennis elbow', 'forearm', 'strength']::text[], null
),
-- Finger Extension with Rubber Band
(
  '9e7fd2b3-7cd4-3ced-93f8-f6629c26857f', 'finger-extension-rubber-band', 'Finger Extension with Rubber Band', 'Ekstensi Jari dengan Karet Gelang', 'Penguatan otot pembuka jari untuk menyeimbangkan otot penggenggam yang dominan.', 'Finger-opening strengthening to balance the dominant gripping muscles.',
  'Hand', 'Neck & Upper', 'Beginner', 'Strength', 'Sitting',
  'Ekstensor jari, otot intrinsik tangan', ARRAY['Karet gelang']::text[], '1. Lingkarkan karet gelang mengelilingi semua jari dan ibu jari.
2. Buka jari-jari melawan tahanan karet selebar mungkin.
3. Tahan 3 detik di posisi terbuka.
4. Tutup perlahan selama 3 detik.
5. Ulangi 15 kali.', '1. Loop a rubber band around all fingers and the thumb.
2. Open the fingers against the band as wide as possible.
3. Hold 3 seconds in the open position.
4. Close slowly over 3 seconds.
5. Repeat 15 times.',
  'Hentikan bila nyeri sendi jari meningkat, terutama pada artritis inflamasi aktif.', 'Gunakan dua karet gelang atau karet lebih tebal untuk menambah tahanan.', 3, 15,
  3, 30, '1x/hari',
  'C', 'Praktik terapi tangan; Erickson et al. Hand Pain CPG, JOSPT 2019', ARRAY['hand', 'strength', 'tennis elbow']::text[], null
),
-- Wrist Active Range of Motion
(
  '9673c200-8c19-3b82-98f4-3f382cd528e8', 'wrist-active-rom', 'Wrist Active Range of Motion', 'Lingkup Gerak Aktif Pergelangan Tangan', 'Latihan lingkup gerak pergelangan tangan setelah imobilisasi, fraktur yang sudah sembuh, atau kekakuan pasca gips.', 'Wrist range-of-motion drill after immobilisation, healed fracture, or post-cast stiffness.',
  'Wrist', 'Neck & Upper', 'Beginner', 'Mobility', 'Sitting',
  'Sendi radiokarpal, otot lengan bawah', '{}'::text[], '1. Duduk dengan lengan bawah bertumpu di meja, pergelangan tangan menjuntai di tepi.
2. Gerakkan pergelangan ke atas (ekstensi) sejauh nyaman, tahan 3 detik.
3. Turunkan ke bawah (fleksi), tahan 3 detik.
4. Lanjutkan dengan gerakan ke sisi ibu jari dan sisi kelingking.
5. Akhiri dengan memutar pergelangan perlahan 5 kali tiap arah.', '1. Sit with the forearm on a table, wrist over the edge.
2. Move the wrist up (extension) as far as comfortable, hold 3 seconds.
3. Move it down (flexion), hold 3 seconds.
4. Continue with thumb-side and little-finger-side movements.
5. Finish with 5 slow wrist circles in each direction.',
  'Ikuti izin dokter setelah fraktur atau operasi. Hentikan bila nyeri tajam atau bengkak bertambah.', 'Setelah lingkup gerak penuh tercapai tanpa nyeri, lanjut ke penguatan isometrik lalu dengan beban.', 2, 10,
  3, 20, '3-4x/hari',
  'B', 'Erickson et al. Hand Pain and Sensory Deficits CPG, JOSPT 2019', ARRAY['wrist', 'mobility', 'post-immobilisation']::text[], null
),
-- Posterior Pelvic Tilt
(
  'aad9d0ab-45c0-38be-8d5a-06f0cf0f0b50', 'pelvic-tilt', 'Posterior Pelvic Tilt', 'Miringkan Panggul ke Belakang', 'Latihan dasar kesadaran gerak panggul dan aktivasi otot perut dalam, titik awal hampir semua program punggung bawah.', 'Basic pelvic awareness and deep abdominal activation - the starting point of most low back programs.',
  'Lower back', 'Spine & Core', 'Beginner', 'Motor control', 'Supine',
  'Transversus abdominis, otot perut bawah', ARRAY['Matras']::text[], '1. Berbaring telentang, lutut ditekuk, kaki menapak lantai selebar pinggul.
2. Rasakan ada sedikit rongga di bawah pinggang.
3. Ratakan pinggang ke lantai dengan memutar panggul ke belakang, seperti menarik tulang kemaluan ke arah pusar.
4. Tahan 5 detik sambil bernapas normal, lalu rileks.
5. Gerakan kecil saja - jangan mengangkat bokong dari lantai.', '1. Lie on your back, knees bent, feet flat and hip-width apart.
2. Notice the small gap under your lower back.
3. Flatten the back into the floor by rolling the pelvis backwards, drawing the pubic bone toward the navel.
4. Hold 5 seconds while breathing normally, then relax.
5. Keep the movement small - do not lift the buttocks off the floor.',
  'Hentikan bila nyeri menjalar ke tungkai bertambah. Pada beberapa pasien dengan preferensi ekstensi, gerakan ini justru memperberat gejala.', 'Setelah dikuasai, lakukan dalam posisi duduk dan berdiri, lalu gunakan sebagai dasar bridging dan dead bug.', 3, 10,
  5, 20, '1-2x/hari',
  'B', 'George et al. Low Back Pain CPG, JOSPT 2021;51(11):CPG1-CPG60', ARRAY['low back pain', 'motor control', 'beginner']::text[], null
),
-- Abdominal Bracing (Transversus Activation)
(
  'da2791e7-4578-3a68-824e-7270109262b5', 'abdominal-bracing', 'Abdominal Bracing (Transversus Activation)', 'Pengencangan Otot Perut Dalam', 'Aktivasi kelompok otot penstabil dalam batang tubuh, dasar latihan kontrol motorik untuk nyeri punggung bawah kronis.', 'Activation of the deep trunk stabilisers - the foundation of motor control training for persistent low back pain.',
  'Core', 'Spine & Core', 'Beginner', 'Motor control', 'Supine',
  'Transversus abdominis, otot dasar panggul, multifidus', ARRAY['Matras']::text[], '1. Berbaring telentang dengan lutut ditekuk.
2. Letakkan ujung jari 2 cm ke dalam dari tulang panggul depan.
3. Tarik perut bagian bawah ke dalam dengan lembut (sekitar 20-30% kekuatan), seperti hendak memasang celana ketat.
4. Rasakan ketegangan halus di bawah jari - perut tidak boleh menonjol atau menahan napas.
5. Tahan 10 detik sambil bernapas normal, ulangi 10 kali.', '1. Lie on your back with knees bent.
2. Place your fingertips 2 cm inward from the front hip bones.
3. Gently draw in the lower abdomen (about 20-30% effort), as if zipping up tight trousers.
4. Feel a subtle tension under the fingers - the belly must not bulge and you must not hold your breath.
5. Hold 10 seconds while breathing normally, repeat 10 times.',
  'Hindari kontraksi kuat/mengejan pada hernia perut, diastasis recti berat, dan kehamilan trimester akhir tanpa panduan.', 'Setelah dikuasai berbaring, latih saat duduk, berdiri, lalu saat menggerakkan lengan/tungkai (dead bug, bird dog).', 3, 10,
  10, 20, '1-2x/hari',
  'A', 'Saragiotto et al. Cochrane 2016 (motor control exercise for CLBP); George et al. JOSPT 2021', ARRAY['low back pain', 'core', 'motor control']::text[], null
),
-- Bridging (Glute Bridge)
(
  'c2f149f2-f58b-3135-a06b-276a1a6a1a47', 'bridging', 'Bridging (Glute Bridge)', 'Angkat Pinggul (Bridging)', 'Latihan penguatan gluteus dan stabilisasi lumbopelvic yang menjadi tulang punggung program punggung, pinggul, dan lutut.', 'Gluteal strengthening and lumbopelvic stabilisation - a backbone exercise across back, hip and knee programs.',
  'Hip', 'Spine & Core', 'Beginner', 'Strength', 'Supine',
  'Gluteus maximus, hamstring, ekstensor lumbal', ARRAY['Matras']::text[], '1. Berbaring telentang, lutut ditekuk, kaki menapak lantai selebar pinggul, lengan di samping badan.
2. Kencangkan otot bokong, lalu angkat pinggul sampai badan lurus dari bahu ke lutut.
3. Jangan melengkungkan pinggang berlebihan - tenaga datang dari bokong, bukan punggung bawah.
4. Tahan 5 detik, lalu turun perlahan selama 3 detik.
5. Ulangi 10-15 kali.', '1. Lie on your back, knees bent, feet flat hip-width apart, arms at your sides.
2. Squeeze the buttocks, then lift the hips until the body is straight from shoulders to knees.
3. Do not over-arch the low back - the work comes from the glutes, not the lumbar spine.
4. Hold 5 seconds, then lower slowly over 3 seconds.
5. Repeat 10-15 times.',
  'Hentikan bila nyeri punggung bawah tajam atau kram hamstring. Setelah operasi panggul, ikuti batasan gerak dari dokter bedah.', 'Progresi: bridging dua kaki -> tahan lebih lama -> bridging dengan kaki di kursi -> bridging satu kaki -> bridging dengan beban di panggul.', 3, 12,
  5, 30, '3-5x/minggu',
  'A', 'George et al. Low Back Pain CPG, JOSPT 2021; Skou & Roos BMC Musculoskelet Disord 2017 (GLA:D/NEMEX)', ARRAY['low back pain', 'glutes', 'core', 'knee']::text[], null
),
-- Single-Leg Bridge
(
  'cf0c76ce-2a71-3230-80a9-2ae34393b4fe', 'single-leg-bridge', 'Single-Leg Bridge', 'Angkat Pinggul Satu Kaki', 'Progresi bridging satu kaki untuk kekuatan gluteus unilateral dan kontrol panggul.', 'Single-leg bridge progression for unilateral gluteal strength and pelvic control.',
  'Hip', 'Spine & Core', 'Advanced', 'Strength', 'Supine',
  'Gluteus maximus, hamstring, penstabil panggul', ARRAY['Matras']::text[], '1. Berbaring telentang dengan satu lutut ditekuk dan kaki menapak; luruskan tungkai lainnya.
2. Kencangkan bokong dan angkat pinggul sampai badan lurus, menumpu pada satu kaki.
3. Jaga panggul tetap sejajar - jangan sampai satu sisi turun.
4. Tahan 3-5 detik, turun perlahan.
5. Selesaikan semua repetisi pada satu sisi lalu ganti.', '1. Lie on your back with one knee bent and foot flat; straighten the other leg.
2. Squeeze the glutes and lift the hips until the body is straight, supported on one leg.
3. Keep the pelvis level - do not let one side drop.
4. Hold 3-5 seconds, lower slowly.
5. Complete all repetitions on one side, then switch.',
  'Terlalu berat untuk fase akut nyeri punggung. Hentikan bila panggul tidak dapat dijaga sejajar - kembali ke bridging dua kaki.', 'Bila kram hamstring, dekatkan kaki ke bokong dan fokuskan tekanan pada tumit.', 3, 10,
  3, 45, '3x/minggu',
  'B', 'Reiman et al. J Sport Rehabil 2012 (gluteal muscle activation); GLA:D exercise progression', ARRAY['glutes', 'hip', 'advanced']::text[], null
),
-- Bird Dog (Quadruped Alternate Reach)
(
  '2dfa3f7f-8cda-3066-a48a-836f7b6ce5cc', 'bird-dog', 'Bird Dog (Quadruped Alternate Reach)', 'Bird Dog (Angkat Lengan dan Tungkai Berlawanan)', 'Latihan stabilisasi batang tubuh klasik (McGill Big 3) yang melatih kontrol lumbal saat anggota gerak bergerak.', 'Classic trunk stabilisation drill (one of McGill''s Big 3) training lumbar control while the limbs move.',
  'Core', 'Spine & Core', 'Intermediate', 'Motor control', 'Quadruped',
  'Multifidus, erector spinae, gluteus maximus, core', ARRAY['Matras']::text[], '1. Posisi merangkak: tangan di bawah bahu, lutut di bawah panggul, punggung netral.
2. Kencangkan perut ringan, lalu julurkan lengan kanan ke depan dan tungkai kiri ke belakang bersamaan.
3. Jaga panggul tetap sejajar - bayangkan segelas air di punggung bawah tidak boleh tumpah.
4. Tahan 5-10 detik, kembali perlahan, lalu ganti sisi.
5. Jangan mengangkat lengan/tungkai lebih tinggi dari badan.', '1. On hands and knees: hands under shoulders, knees under hips, spine neutral.
2. Gently brace the abdomen, then reach the right arm forward and the left leg back at the same time.
3. Keep the pelvis level - imagine a glass of water on your low back that must not spill.
4. Hold 5-10 seconds, return slowly, then switch sides.
5. Do not raise the limbs above trunk level.',
  'Hindari bila nyeri lutut saat menumpu (gunakan alas tebal) dan pada nyeri bahu saat menumpu berat badan.', 'Progresi: hanya lengan -> hanya tungkai -> lengan+tungkai -> tambahkan gerakan menggambar kotak dengan tangan -> bird dog dengan karet elastis.', 3, 10,
  8, 30, '1x/hari',
  'A', 'McGill SM. Low Back Disorders, 3rd ed.; Saragiotto et al. Cochrane 2016', ARRAY['low back pain', 'core', 'motor control', 'McGill Big 3']::text[], null
),
-- Dead Bug
(
  'd1099867-0b87-344d-982d-3e379d451952', 'dead-bug', 'Dead Bug', 'Dead Bug (Gerak Lengan-Tungkai Telentang)', 'Latihan kontrol lumbal dengan beban anggota gerak, aman untuk punggung karena tulang belakang tetap disangga.', 'Lumbar control drill with limb loading, back-friendly because the spine stays supported.',
  'Core', 'Spine & Core', 'Intermediate', 'Motor control', 'Supine',
  'Transversus abdominis, rectus abdominis, oblique', ARRAY['Matras']::text[], '1. Berbaring telentang, angkat kedua lengan lurus ke atas dan tekuk pinggul-lutut 90 derajat (posisi meja).
2. Ratakan pinggang ke lantai dan pertahankan sepanjang latihan.
3. Turunkan lengan kanan ke belakang kepala dan luruskan tungkai kiri ke depan bersamaan.
4. Turunkan hanya sejauh pinggang masih menempel lantai, lalu kembali.
5. Ganti sisi. Bernapas mengalir, jangan menahan napas.', '1. Lie on your back, arms straight up and hips/knees bent 90 degrees (tabletop).
2. Flatten the low back into the floor and maintain it throughout.
3. Lower the right arm overhead while extending the left leg forward.
4. Go only as far as the low back stays flat, then return.
5. Switch sides. Keep breathing; do not hold your breath.',
  'Hentikan bila pinggang terangkat dari lantai atau nyeri menjalar bertambah - kurangi jangkauan gerak.', 'Progresi: hanya tungkai -> hanya lengan -> berlawanan -> tambah beban ringan di tangan. Kualitas lebih penting daripada jumlah.', 3, 10,
  2, 30, '1x/hari',
  'B', 'McGill SM. Low Back Disorders, 3rd ed.; Saragiotto et al. Cochrane 2016', ARRAY['core', 'low back pain', 'motor control']::text[], null
),
-- McGill Curl-Up
(
  '4983a846-58ab-3e9e-b298-c0dcbe59127c', 'mcgill-curl-up', 'McGill Curl-Up', 'Curl-Up McGill', 'Versi sit-up yang aman bagi tulang belakang: mengaktifkan otot perut tanpa membebani diskus lumbal dengan fleksi berulang.', 'A spine-sparing sit-up variant: it activates the abdominals without repeatedly flexing the lumbar discs.',
  'Core', 'Spine & Core', 'Intermediate', 'Strength', 'Supine',
  'Rectus abdominis, oblique', ARRAY['Matras']::text[], '1. Berbaring telentang, satu lutut ditekuk dengan kaki menapak, tungkai lainnya lurus.
2. Letakkan kedua tangan di bawah pinggang untuk menjaga lengkungan alami.
3. Angkat kepala dan bahu hanya beberapa sentimeter dari lantai - dagu tidak menempel dada, leher tetap sejalan dengan badan.
4. Tahan 8-10 detik dengan napas normal, lalu turun perlahan.
5. Ganti tungkai yang ditekuk setiap set.', '1. Lie on your back with one knee bent, foot flat, and the other leg straight.
2. Place both hands under the low back to preserve its natural curve.
3. Lift the head and shoulders only a few centimetres off the floor - chin not on the chest, neck in line with the trunk.
4. Hold 8-10 seconds with normal breathing, then lower slowly.
5. Swap the bent leg each set.',
  'Hindari pada nyeri leher yang diprovokasi mengangkat kepala dan pada fraktur kompresi vertebra.', 'Gunakan pola "reverse pyramid" McGill: 6 repetisi, lalu 4, lalu 2 dengan tahan 8-10 detik, untuk membangun daya tahan tanpa kelelahan berlebih.', 3, 6,
  10, 30, '1x/hari',
  'B', 'McGill SM. Low Back Disorders, 3rd ed.; Callaghan et al. Clin Biomech 1998', ARRAY['core', 'low back pain', 'McGill Big 3']::text[], null
),
-- Side Plank (Knees Bent)
(
  '557a185e-6395-3132-b5f1-144cb7da7e67', 'side-plank-modified', 'Side Plank (Knees Bent)', 'Plank Samping Lutut Ditekuk', 'Latihan penstabil lateral batang tubuh dengan beban yang lebih ringan, bagian dari McGill Big 3.', 'Lower-load lateral trunk stabiliser exercise, part of McGill''s Big 3.',
  'Core', 'Spine & Core', 'Intermediate', 'Strength', 'Side-lying',
  'Quadratus lumborum, oblique, gluteus medius', ARRAY['Matras']::text[], '1. Berbaring menyamping dengan lutut ditekuk 90 derajat, siku tepat di bawah bahu.
2. Angkat pinggul dari lantai sehingga badan lurus dari kepala ke lutut.
3. Jaga bahu, panggul, dan lutut dalam satu garis; jangan berputar ke depan atau belakang.
4. Tahan 10-20 detik, turun perlahan.
5. Ulangi di sisi lain.', '1. Lie on your side with knees bent 90 degrees, elbow directly under the shoulder.
2. Lift the hips off the floor so the body is straight from head to knees.
3. Keep shoulder, hip and knee in line; do not rotate forward or back.
4. Hold 10-20 seconds, lower slowly.
5. Repeat on the other side.',
  'Hindari bila nyeri bahu saat menumpu. Hentikan bila punggung bawah nyeri tajam.', 'Progresi: lutut ditekuk -> tungkai lurus -> tungkai lurus dengan lengan atas terangkat -> side plank dengan rotasi. Naikkan durasi sebelum menaikkan tingkat kesulitan.', 3, 3,
  15, 30, '3-5x/minggu',
  'B', 'McGill SM. Low Back Disorders, 3rd ed.; Ekstrom et al. JOSPT 2007 (core muscle EMG)', ARRAY['core', 'low back pain', 'McGill Big 3']::text[], null
),
-- Front Plank (Forearm)
(
  'ded978fa-fe7c-3203-92c7-a03f3533b82b', 'front-plank', 'Front Plank (Forearm)', 'Plank Depan (Bertumpu Lengan Bawah)', 'Latihan daya tahan isometrik batang tubuh untuk stabilitas menyeluruh.', 'Isometric trunk endurance exercise for global stability.',
  'Core', 'Spine & Core', 'Intermediate', 'Strength', 'Prone',
  'Transversus abdominis, rectus abdominis, gluteus', ARRAY['Matras']::text[], '1. Tengkurap dengan siku di bawah bahu dan lengan bawah menempel lantai.
2. Angkat badan bertumpu pada lengan bawah dan ujung kaki (atau lutut untuk versi lebih ringan).
3. Badan harus lurus dari kepala sampai tumit - jangan biarkan pinggang melorot atau bokong naik.
4. Kencangkan perut dan bokong, bernapas normal.
5. Tahan 20-30 detik, ulangi 3 kali.', '1. Lie face down with elbows under the shoulders and forearms on the floor.
2. Lift the body onto the forearms and toes (or knees for an easier version).
3. The body must be straight from head to heels - do not let the hips sag or pike up.
4. Brace the abdomen and glutes, breathing normally.
5. Hold 20-30 seconds, repeat 3 times.',
  'Hindari pada hipertensi tidak terkontrol (hindari menahan napas), diastasis recti berat, dan nyeri bahu saat menumpu.', 'Naikkan durasi 5 detik setiap minggu sampai 45-60 detik sebelum menambah variasi (angkat satu kaki, plank dinamis).', 3, 1,
  30, 45, '3-5x/minggu',
  'B', 'Ekstrom et al. JOSPT 2007; George et al. Low Back Pain CPG, JOSPT 2021', ARRAY['core', 'strength', 'endurance']::text[], null
),
-- Prone Press-Up (McKenzie Extension)
(
  '3502c338-bd7e-3d23-b957-1eb38c0ccd45', 'prone-press-up', 'Prone Press-Up (McKenzie Extension)', 'Dorong Badan Tengkurap (Ekstensi McKenzie)', 'Latihan ekstensi lumbal berulang yang sering mengurangi nyeri menjalar pada pasien dengan preferensi arah ekstensi.', 'Repeated lumbar extension that often reduces radiating pain in patients with an extension directional preference.',
  'Lower back', 'Spine & Core', 'Beginner', 'Mobility', 'Prone',
  'Mobilitas ekstensi lumbal', ARRAY['Matras']::text[], '1. Tengkurap dengan telapak tangan di samping bahu, seperti hendak push-up.
2. Luruskan siku untuk mengangkat dada, biarkan panggul dan tungkai tetap menempel lantai dan otot punggung rileks.
3. Naik hanya sejauh yang nyaman; tahan 2 detik di atas.
4. Turun perlahan ke posisi awal.
5. Perhatikan gejala: nyeri yang "menarik masuk" dari tungkai ke punggung adalah tanda baik (sentralisasi).', '1. Lie face down with palms beside the shoulders, as if to push up.
2. Straighten the elbows to lift the chest, keeping the pelvis and legs on the floor and the back muscles relaxed.
3. Push up only as far as comfortable; hold 2 seconds at the top.
4. Lower slowly to the start.
5. Watch symptoms: pain moving from the leg back toward the spine (centralisation) is a good sign.',
  'HENTIKAN bila nyeri menjalar semakin jauh ke tungkai (perifelisasi) - ini tanda arah gerakan tidak sesuai. Hindari pada stenosis spinalis yang memburuk dengan ekstensi, spondilolistesis tidak stabil, dan kehamilan lanjut.', 'Mulai dari berbaring tengkurap datar -> bertumpu siku (prone on elbows) 5 menit -> press-up penuh. Lakukan 10 repetisi setiap 2-3 jam pada fase akut.', 1, 10,
  2, 0, 'Setiap 2-3 jam pada fase akut',
  'A', 'McKenzie R & May S. The Lumbar Spine: MDT; Long et al. Spine 2004;29(23):2593-2602 (directional preference)', ARRAY['low back pain', 'McKenzie', 'sciatica', 'directional preference']::text[], null
),
-- Standing Lumbar Extension
(
  'ba3fcad2-154b-3663-a31a-8e5aade68764', 'standing-lumbar-extension', 'Standing Lumbar Extension', 'Ekstensi Punggung Berdiri', 'Versi berdiri dari ekstensi McKenzie, praktis dilakukan di tempat kerja untuk mencegah kekakuan akibat duduk lama.', 'Standing version of McKenzie extension, practical at work to offset prolonged sitting.',
  'Lower back', 'Spine & Core', 'Beginner', 'Mobility', 'Standing',
  'Mobilitas ekstensi lumbal', '{}'::text[], '1. Berdiri dengan kaki selebar bahu.
2. Letakkan kedua telapak tangan di pinggang bagian belakang dengan jari mengarah ke bawah.
3. Lengkungkan punggung ke belakang sejauh nyaman sambil menjaga lutut lurus.
4. Tahan 2 detik, kembali tegak.
5. Ulangi 10 kali.', '1. Stand with feet shoulder-width apart.
2. Place both palms on the small of your back, fingers pointing down.
3. Bend backwards as far as comfortable, keeping the knees straight.
4. Hold 2 seconds, return upright.
5. Repeat 10 times.',
  'Hentikan bila nyeri menjalar ke tungkai bertambah atau muncul pusing. Hindari pada stenosis spinalis simtomatik.', 'Gunakan sebagai ''pemeliharaan'' setelah gejala mereda: 10 repetisi setiap 1-2 jam duduk.', 1, 10,
  2, 0, 'Setiap 1-2 jam',
  'B', 'McKenzie R & May S. The Lumbar Spine: MDT; Long et al. Spine 2004', ARRAY['low back pain', 'McKenzie', 'office worker']::text[], null
),
-- Single Knee to Chest
(
  '87c49f4a-6633-3024-b59e-0ee76dff5e3b', 'knee-to-chest', 'Single Knee to Chest', 'Tarik Lutut ke Dada', 'Peregangan lembut punggung bawah yang sering meredakan kekakuan pagi hari dan nyeri punggung mekanik.', 'Gentle low back stretch that often eases morning stiffness and mechanical back pain.',
  'Lower back', 'Spine & Core', 'Beginner', 'Stretch', 'Supine',
  'Ekstensor lumbal, gluteus maximus', ARRAY['Matras']::text[], '1. Berbaring telentang dengan kedua lutut ditekuk.
2. Peluk satu lutut dengan kedua tangan dan tarik ke arah dada sejauh nyaman.
3. Jaga tungkai lainnya tetap menapak lantai dan punggung rileks.
4. Tahan 30 detik, lalu turunkan perlahan.
5. Ulangi ke sisi lain, 3 kali per sisi.', '1. Lie on your back with both knees bent.
2. Hug one knee with both hands and pull it toward the chest as far as comfortable.
3. Keep the other foot flat on the floor and the back relaxed.
4. Hold 30 seconds, then lower slowly.
5. Repeat on the other side, 3 times per side.',
  'Hindari pada pasca operasi panggul (batasan fleksi > 90 derajat) dan bila memperburuk nyeri menjalar.', 'Bila nyaman, lakukan dengan dua lutut sekaligus. Bila terasa nyeri di depan panggul, kurangi jangkauan.', 3, 1,
  30, 15, '1-2x/hari',
  'B', 'George et al. Low Back Pain CPG, JOSPT 2021', ARRAY['low back pain', 'stretch', 'beginner']::text[], null
),
-- Lower Trunk Rotation
(
  'b4808bd4-5884-380f-bf53-658e110469e3', 'lower-trunk-rotation', 'Lower Trunk Rotation', 'Rotasi Batang Tubuh Bawah', 'Mobilisasi rotasi lumbal yang lembut untuk mengurangi kekakuan dan ketegangan otot punggung.', 'Gentle lumbar rotation mobilisation to reduce stiffness and back muscle tension.',
  'Lower back', 'Spine & Core', 'Beginner', 'Mobility', 'Supine',
  'Rotator lumbal, oblique', ARRAY['Matras']::text[], '1. Berbaring telentang dengan lutut ditekuk dan rapat, kaki menapak lantai.
2. Rentangkan kedua lengan ke samping untuk stabilitas.
3. Jatuhkan kedua lutut perlahan ke sisi kanan sejauh nyaman sambil bahu tetap menempel lantai.
4. Tahan 10-20 detik, kembali ke tengah.
5. Ulangi ke sisi kiri.', '1. Lie on your back with knees bent and together, feet flat.
2. Spread both arms out to the sides for stability.
3. Let both knees drop slowly to the right as far as comfortable while keeping the shoulders on the floor.
4. Hold 10-20 seconds, return to centre.
5. Repeat to the left.',
  'Hindari rotasi paksa pada diskus herniasi akut yang nyeri saat rotasi dan pada osteoporosis berat.', 'Lakukan pelan dengan napas keluar saat menurunkan lutut. Bila satu sisi jauh lebih kaku, beri repetisi tambahan pada sisi tersebut.', 2, 10,
  15, 15, '1-2x/hari',
  'B', 'George et al. Low Back Pain CPG, JOSPT 2021', ARRAY['low back pain', 'mobility', 'stretch']::text[], null
),
-- Cat-Cow (Cat-Camel)
(
  '6e2a7e09-93ba-3b82-96ce-668224821870', 'cat-cow', 'Cat-Cow (Cat-Camel)', 'Kucing-Sapi (Cat-Camel)', 'Mobilisasi tulang belakang menyeluruh dengan beban rendah - pemanasan standar sebelum latihan punggung.', 'Low-load whole-spine mobilisation - a standard warm-up before back exercise.',
  'Lower back', 'Spine & Core', 'Beginner', 'Mobility', 'Quadruped',
  'Mobilitas seluruh tulang belakang', ARRAY['Matras']::text[], '1. Posisi merangkak: tangan di bawah bahu, lutut di bawah panggul.
2. Buang napas sambil membulatkan punggung ke atas dan menundukkan kepala (posisi kucing).
3. Tarik napas sambil menurunkan perut dan mengangkat dada serta kepala (posisi sapi).
4. Bergerak perlahan mengikuti napas, tanpa memaksa ujung gerakan.
5. Ulangi 10-15 siklus.', '1. On hands and knees: hands under shoulders, knees under hips.
2. Exhale while rounding the back upward and tucking the head (cat).
3. Inhale while letting the belly drop and lifting the chest and head (cow).
4. Move slowly with the breath, without forcing end range.
5. Repeat 10-15 cycles.',
  'Hindari bila nyeri lutut/pergelangan tangan saat menumpu. Kurangi jangkauan pada osteoporosis berat.', 'Gunakan sebagai pemanasan 1-2 menit sebelum latihan inti. Hindari menahan di ujung gerakan pada nyeri diskus akut.', 2, 12,
  2, 15, '1-2x/hari',
  'B', 'McGill SM. Low Back Disorders, 3rd ed. (cat-camel as spine mobility warm-up)', ARRAY['low back pain', 'mobility', 'warm-up']::text[], null
),
-- Child's Pose (Prayer Stretch)
(
  'bdefb3b4-48e3-3464-b0ef-7e3af19377a5', 'child-pose', 'Child''s Pose (Prayer Stretch)', 'Posisi Anak (Peregangan Sujud)', 'Peregangan fleksi punggung yang menenangkan, berguna bagi pasien dengan preferensi arah fleksi (misalnya stenosis).', 'Calming flexion-based back stretch, useful for patients with a flexion directional preference such as spinal stenosis.',
  'Lower back', 'Spine & Core', 'Beginner', 'Stretch', 'Quadruped',
  'Ekstensor lumbal, latissimus dorsi', ARRAY['Matras', 'Bantal (opsional)']::text[], '1. Mulai dari posisi merangkak.
2. Dudukkan bokong ke arah tumit sambil menjulurkan lengan ke depan.
3. Biarkan dahi menyentuh matras atau bantal.
4. Bernapas dalam dan rasakan regangan di punggung bawah.
5. Tahan 30-60 detik.', '1. Start on hands and knees.
2. Sit the buttocks back toward the heels while reaching the arms forward.
3. Let the forehead rest on the mat or a pillow.
4. Breathe deeply and feel the stretch in the low back.
5. Hold 30-60 seconds.',
  'Hindari pada nyeri lutut berat, pasca operasi lutut/panggul dengan batasan fleksi, dan kehamilan lanjut (gunakan lutut terbuka lebar).', 'Letakkan bantal di antara betis dan paha bila lutut tidak dapat ditekuk penuh. Kombinasikan dengan napas panjang untuk relaksasi otot.', 3, 1,
  45, 15, '1-2x/hari',
  'C', 'Praktik klinis; sejalan dengan preferensi arah fleksi pada stenosis (Ammendolia et al. Cochrane 2013)', ARRAY['low back pain', 'stretch', 'stenosis']::text[], null
),
-- Sciatic Nerve Glide (Slider)
(
  '80e4bdd1-d981-3f03-890a-1e5967c8a124', 'sciatic-nerve-glide', 'Sciatic Nerve Glide (Slider)', 'Neurodinamik Saraf Skiatik', 'Teknik meluncurkan saraf skiatik untuk gejala nyeri menjalar tungkai (sciatica) yang sudah tidak akut berat.', 'Sciatic nerve sliding technique for leg-radiating symptoms (sciatica) that are no longer severely acute.',
  'Lower back', 'Spine & Core', 'Beginner', 'Neurodynamic', 'Sitting',
  'Mobilitas saraf skiatik', ARRAY['Kursi']::text[], '1. Duduk di kursi dengan punggung agak membungkuk dan dagu menempel dada.
2. Luruskan lutut sisi yang bergejala sambil MENGANGKAT kepala (dagu naik) secara bersamaan.
3. Kembalikan: tekuk lutut sambil menundukkan kepala kembali.
4. Gerakan harus mengalir dan lembut - tidak boleh menimbulkan nyeri menjalar yang meningkat.
5. Ulangi 10-15 kali dengan irama pelan.', '1. Sit on a chair slightly slouched with the chin on the chest.
2. Straighten the symptomatic knee while simultaneously LIFTING the head (chin up).
3. Reverse: bend the knee while tucking the head back down.
4. The movement should be smooth and gentle - it must not increase radiating pain.
5. Repeat 10-15 times at a slow rhythm.',
  'HENTIKAN bila nyeri menjalar bertambah atau menetap. Hindari bila ada tanda cauda equina (mati rasa area selangkangan, gangguan berkemih/buang air besar, kelemahan tungkai progresif) - INI DARURAT MEDIS.', 'Mulai dengan gerakan berlawanan (slider) yang tidak menambah ketegangan saraf; baru setelah gejala mereda gunakan tensioner (lutut lurus + kepala menunduk bersamaan).', 3, 12,
  2, 30, '2-3x/hari',
  'B', 'Coppieters & Butler Man Ther 2008 (sliders vs tensioners); Basson et al. JOSPT 2017 (neural mobilisation meta-analysis)', ARRAY['sciatica', 'nerve glide', 'low back pain']::text[], null
),
-- Hip Hinge Pattern Training
(
  '6709fdba-003a-3c95-8bb3-9c240affe244', 'hip-hinge-pattern', 'Hip Hinge Pattern Training', 'Latihan Pola Menekuk Panggul (Hip Hinge)', 'Melatih pola membungkuk yang aman dengan menekuk panggul, bukan melengkungkan pinggang - keterampilan kunci untuk mencegah nyeri punggung berulang.', 'Trains a safe bending pattern from the hips instead of the lumbar spine - a key skill for preventing recurrent back pain.',
  'Lower back', 'Spine & Core', 'Intermediate', 'Motor control', 'Standing',
  'Gluteus maximus, hamstring, ekstensor lumbal', ARRAY['Tongkat/gagang sapu']::text[], '1. Berdiri dengan kaki selebar pinggul, pegang tongkat di belakang badan menyentuh kepala, punggung atas, dan tulang ekor.
2. Dorong panggul ke belakang sambil menekuk sedikit lutut, badan condong ke depan.
3. Jaga ketiga titik kontak tongkat sepanjang gerakan - bila salah satu lepas, gerakan terlalu jauh.
4. Turun sampai terasa regangan di belakang paha, lalu kembali berdiri dengan mendorong panggul ke depan.
5. Ulangi 10-12 kali.', '1. Stand hip-width apart holding a stick along your back touching head, upper back and tailbone.
2. Push the hips backwards while slightly bending the knees, letting the trunk tip forward.
3. Keep all three contact points on the stick throughout - if one lifts off, you have gone too far.
4. Descend until a stretch is felt behind the thighs, then stand up by driving the hips forward.
5. Repeat 10-12 times.',
  'Hentikan bila nyeri menjalar bertambah. Pada fase nyeri akut, kurangi kedalaman gerakan.', 'Progresi: tanpa beban -> memegang beban ringan -> kettlebell deadlift -> Romanian deadlift. Pola ini adalah dasar mengangkat beban dengan aman.', 3, 12,
  2, 45, '3x/minggu',
  'B', 'George et al. Low Back Pain CPG, JOSPT 2021; Steele et al. 2015 (lumbar extensor training)', ARRAY['low back pain', 'motor control', 'lifting']::text[], null
),
-- Clamshell
(
  '35f87135-1da6-36d1-94ca-448a6300fe35', 'clamshell', 'Clamshell', 'Clamshell (Buka Lutut Menyamping)', 'Latihan aktivasi gluteus medius yang menjadi dasar program nyeri lutut, pinggul, dan punggung bawah.', 'Gluteus medius activation exercise that underpins knee, hip and low back programs.',
  'Hip', 'Lower Limb', 'Beginner', 'Strength', 'Side-lying',
  'Gluteus medius, gluteus minimus, rotator eksternal pinggul', ARRAY['Matras', 'Karet elastis (opsional)']::text[], '1. Berbaring menyamping dengan pinggul ditekuk sekitar 45 derajat dan lutut ditekuk 90 derajat, satu lutut di atas yang lain.
2. Jaga kedua tumit tetap bersentuhan.
3. Angkat lutut atas seperti membuka kerang, tanpa memutar panggul ke belakang.
4. Tahan 2-3 detik di atas, lalu turunkan perlahan.
5. Letakkan tangan di panggul untuk memastikan panggul tidak berguling.', '1. Lie on your side with hips bent about 45 degrees and knees bent 90 degrees, one knee stacked on the other.
2. Keep both heels touching.
3. Lift the top knee like opening a clam, without rolling the pelvis backwards.
4. Hold 2-3 seconds at the top, then lower slowly.
5. Place a hand on the pelvis to check it does not roll.',
  'Hentikan bila nyeri di sisi luar panggul meningkat (mungkin kompresi tendon gluteal). Hindari adduksi berlebihan pada tendinopati gluteal.', 'Progresi: tanpa beban -> karet elastis di atas lutut -> tambah tahan lebih lama -> side-lying hip abduction dengan tungkai lurus.', 3, 15,
  3, 30, '3-5x/minggu',
  'A', 'Willy et al. Patellofemoral Pain CPG, JOSPT 2019;49(9):CPG1-CPG95; Distefano et al. JOSPT 2009 (gluteal EMG)', ARRAY['gluteus medius', 'knee', 'hip', 'PFP']::text[], null
),
-- Side-Lying Hip Abduction
(
  '3423a649-246b-3c07-8983-1847afb3e571', 'side-lying-hip-abduction', 'Side-Lying Hip Abduction', 'Angkat Tungkai Menyamping', 'Penguatan abduktor pinggul dengan lengan tuas panjang, progresi dari clamshell.', 'Long-lever hip abductor strengthening, a progression from the clamshell.',
  'Hip', 'Lower Limb', 'Intermediate', 'Strength', 'Side-lying',
  'Gluteus medius, tensor fasciae latae', ARRAY['Matras', 'Beban pergelangan kaki (opsional)']::text[], '1. Berbaring menyamping dengan kedua tungkai lurus dan bertumpuk, badan segaris.
2. Tekuk lutut bawah untuk stabilitas bila perlu.
3. Angkat tungkai atas ke arah langit-langit setinggi sekitar 30-40 cm, dengan tumit sedikit di belakang badan.
4. Jaga jari kaki menghadap ke depan (jangan memutar ke atas) dan panggul tidak berguling ke belakang.
5. Tahan 2 detik, turun perlahan selama 3 detik.', '1. Lie on your side with both legs straight and stacked, body in line.
2. Bend the bottom knee for stability if needed.
3. Lift the top leg toward the ceiling about 30-40 cm, with the heel slightly behind the body line.
4. Keep the toes pointing forward (not rotated up) and do not roll the pelvis backwards.
5. Hold 2 seconds, lower over 3 seconds.',
  'Hentikan bila nyeri di sisi luar panggul (trochanter) meningkat. Kurangi ketinggian angkat pada tendinopati gluteal.', 'Tambahkan beban pergelangan kaki 0,5-2 kg saat 3x15 repetisi bersih tercapai. Progresi fungsional berikutnya: hip hitch dan side plank dengan abduksi.', 3, 15,
  2, 45, '3x/minggu',
  'A', 'Willy et al. Patellofemoral Pain CPG, JOSPT 2019; Mellor et al. BMJ 2018 (LEAP trial)', ARRAY['gluteus medius', 'hip', 'strength']::text[], null
),
-- Isometric Hip Abduction (Wall Press)
(
  'd0063d73-aa97-3907-a346-2cc9f58cf58b', 'isometric-hip-abduction-wall', 'Isometric Hip Abduction (Wall Press)', 'Isometrik Abduksi Pinggul (Tekan Dinding)', 'Latihan isometrik beban rendah yang menjadi tahap pertama protokol tendinopati gluteal (LEAP).', 'Low-load isometric that forms the first stage of the LEAP gluteal tendinopathy protocol.',
  'Hip', 'Lower Limb', 'Beginner', 'Strength', 'Standing',
  'Gluteus medius, gluteus minimus', ARRAY['Dinding']::text[], '1. Berdiri menyamping sekitar 20 cm dari dinding, sisi yang sakit dekat dinding.
2. Tekuk lutut yang dekat dinding dan tekan bagian luar lutut/paha ke dinding.
3. Tumpu berat badan pada tungkai yang jauh dari dinding; jaga panggul tetap sejajar.
4. Tekan dengan kekuatan sekitar 30-50% dan tahan 30-45 detik.
5. Ulangi 5 kali dengan istirahat 30 detik.', '1. Stand side-on about 20 cm from a wall with the painful side nearest the wall.
2. Bend the knee closest to the wall and press the outside of that knee/thigh into the wall.
3. Take your weight on the far leg; keep the pelvis level.
4. Press at about 30-50% effort and hold 30-45 seconds.
5. Repeat 5 times with 30 seconds rest.',
  'Hindari posisi menyilangkan kaki dan tidur menyamping pada sisi yang sakit tanpa bantal di antara lutut - keduanya menekan tendon gluteal.', 'Setelah isometrik nyaman, maju ke latihan menahan berat badan satu kaki, lalu abduksi dinamis dengan karet elastis, sesuai tahapan LEAP.', 5, 1,
  40, 30, '1x/hari',
  'A', 'Mellor et al. BMJ 2018;361:k1662 (LEAP trial); Grimaldi & Fearon JOSPT 2015', ARRAY['gluteal tendinopathy', 'isometric', 'hip']::text[], null
),
-- Hip Hitch (Pelvic Drop)
(
  'a75dab45-f5c5-34a7-8bea-3d1336e2c023', 'hip-hitch', 'Hip Hitch (Pelvic Drop)', 'Hip Hitch (Angkat Panggul Satu Sisi)', 'Melatih kontrol panggul saat berdiri satu kaki - fungsi utama gluteus medius saat berjalan dan berlari.', 'Trains pelvic control in single-leg stance - the gluteus medius'' main job during walking and running.',
  'Hip', 'Lower Limb', 'Intermediate', 'Motor control', 'Standing',
  'Gluteus medius (sisi tumpu)', ARRAY['Anak tangga atau balok rendah']::text[], '1. Berdiri satu kaki di tepi anak tangga, tungkai lainnya menggantung bebas di sisi luar.
2. Pegang pegangan ringan untuk keseimbangan.
3. Turunkan panggul sisi yang menggantung beberapa sentimeter dengan tetap menjaga lutut tumpu lurus.
4. Angkat kembali panggul tersebut lebih tinggi dari posisi netral menggunakan otot pinggul sisi tumpu.
5. Ulangi 10-15 kali dengan gerakan terkontrol.', '1. Stand on one leg at the edge of a step with the other leg hanging free off the side.
2. Hold a rail lightly for balance.
3. Let the pelvis on the hanging side drop a few centimetres while keeping the standing knee straight.
4. Lift that side of the pelvis back up above neutral using the standing hip muscles.
5. Repeat 10-15 times with controlled movement.',
  'Hindari bila keseimbangan sangat terganggu tanpa pengawasan. Hentikan bila nyeri sisi luar panggul meningkat.', 'Progresi: dengan pegangan -> tanpa pegangan -> di atas permukaan tidak stabil. Amati di cermin bahwa lutut tumpu tidak jatuh ke dalam.', 3, 12,
  2, 45, '3x/minggu',
  'B', 'Willy et al. Patellofemoral Pain CPG, JOSPT 2019; Grimaldi & Fearon JOSPT 2015', ARRAY['gluteus medius', 'running', 'hip', 'PFP']::text[], null
),
-- Lateral Band Walk
(
  '3e2ec358-a377-3edb-ab27-9ef80d96cfa5', 'lateral-band-walk', 'Lateral Band Walk', 'Jalan Menyamping dengan Karet Elastis', 'Penguatan abduktor pinggul dalam posisi menumpu berat badan, relevan untuk nyeri lutut dan stabilitas lari.', 'Weight-bearing hip abductor strengthening, relevant to knee pain and running stability.',
  'Hip', 'Lower Limb', 'Intermediate', 'Strength', 'Standing',
  'Gluteus medius, gluteus maximus', ARRAY['Karet elastis loop']::text[], '1. Pasang karet elastis loop di sekitar kedua pergelangan kaki atau tepat di atas lutut.
2. Berdiri dengan lutut sedikit ditekuk (posisi setengah jongkok) dan punggung tegak.
3. Melangkah ke samping dengan langkah selebar bahu, jaga tegangan karet.
4. Ikuti dengan kaki lainnya tanpa merapatkan kedua kaki sepenuhnya.
5. Lakukan 10-15 langkah ke satu arah, lalu kembali ke arah sebaliknya.', '1. Place a loop band around both ankles or just above the knees.
2. Stand with knees slightly bent (quarter squat) and back upright.
3. Step sideways about shoulder width, keeping band tension.
4. Follow with the other foot without letting the feet come fully together.
5. Take 10-15 steps one way, then return the other way.',
  'Hentikan bila nyeri lutut anterior atau nyeri sisi luar panggul meningkat. Hindari pada gangguan keseimbangan berat.', 'Naikkan resistensi karet atau turunkan posisi jongkok untuk menambah beban. Karet di pergelangan kaki lebih berat daripada di atas lutut.', 3, 12,
  0, 45, '3x/minggu',
  'B', 'Willy et al. Patellofemoral Pain CPG, JOSPT 2019; Cambridge et al. Clin Biomech 2012', ARRAY['gluteus medius', 'knee', 'running']::text[], null
),
-- Half-Kneeling Hip Flexor Stretch
(
  'bfb5b5de-cd80-33fa-aa87-4eb813eeee64', 'hip-flexor-stretch-half-kneeling', 'Half-Kneeling Hip Flexor Stretch', 'Peregangan Fleksor Pinggul Setengah Berlutut', 'Peregangan otot fleksor pinggul yang memendek akibat duduk lama, penting untuk nyeri punggung dan pinggul.', 'Stretch for hip flexors shortened by prolonged sitting, relevant to back and hip pain.',
  'Hip', 'Lower Limb', 'Beginner', 'Stretch', 'Half-kneeling',
  'Iliopsoas, rectus femoris', ARRAY['Matras atau bantalan lutut']::text[], '1. Berlutut pada satu lutut dengan kaki depan menapak di depan (posisi setengah berlutut), gunakan bantalan di bawah lutut belakang.
2. Kencangkan otot bokong sisi belakang dan miringkan panggul ke belakang (tarik tulang kemaluan ke atas).
3. Geser badan sedikit ke depan tanpa melengkungkan pinggang.
4. Tahan 30 detik saat terasa regangan di depan pinggul belakang.
5. Ulangi 3 kali per sisi.', '1. Kneel on one knee with the other foot forward (half-kneeling), padding under the back knee.
2. Squeeze the buttock on the kneeling side and tilt the pelvis backwards (tuck the pubic bone up).
3. Shift the body slightly forward without arching the low back.
4. Hold 30 seconds when a stretch is felt at the front of the back hip.
5. Repeat 3 times per side.',
  'Hindari bila nyeri lutut saat berlutut (gunakan posisi berdiri dengan kaki di kursi). Hentikan bila nyeri punggung bawah bertambah - biasanya karena pinggang melengkung.', 'Angkat lengan sisi belakang ke atas dan miringkan sedikit ke sisi berlawanan untuk menambah regangan psoas.', 3, 1,
  30, 15, '1-2x/hari',
  'B', 'Kisner & Colby, Therapeutic Exercise 7th ed.; George et al. Low Back Pain CPG, JOSPT 2021', ARRAY['stretch', 'hip', 'office worker']::text[], null
),
-- Piriformis / Glute Stretch (Figure-4)
(
  'cfb1b8eb-b87d-3845-993a-9d4fe665b618', 'piriformis-stretch', 'Piriformis / Glute Stretch (Figure-4)', 'Peregangan Piriformis (Angka 4)', 'Peregangan otot rotator dalam pinggul untuk nyeri bokong dan kekakuan pinggul.', 'Deep hip rotator stretch for buttock pain and hip stiffness.',
  'Hip', 'Lower Limb', 'Beginner', 'Stretch', 'Supine',
  'Piriformis, rotator eksternal pinggul, gluteus', ARRAY['Matras']::text[], '1. Berbaring telentang dengan kedua lutut ditekuk.
2. Silangkan pergelangan kaki sisi yang sakit di atas lutut sisi lainnya membentuk angka 4.
3. Pegang paha belakang tungkai penopang dan tarik ke arah dada.
4. Tahan 30 detik sampai terasa regangan di bokong sisi yang disilangkan.
5. Ulangi 3 kali per sisi.', '1. Lie on your back with both knees bent.
2. Cross the ankle of the painful side over the opposite knee to form a figure 4.
3. Hold behind the supporting thigh and pull it toward the chest.
4. Hold 30 seconds until a stretch is felt in the crossed-side buttock.
5. Repeat 3 times per side.',
  'Hindari setelah operasi penggantian panggul (posisi menyilang berisiko dislokasi pada 12 minggu pertama). Hentikan bila nyeri menjalar tungkai bertambah.', 'Versi duduk lebih mudah bagi pasien yang sulit berbaring. Regangan tidak boleh menimbulkan kesemutan.', 3, 1,
  30, 15, '1-2x/hari',
  'B', 'Kisner & Colby, Therapeutic Exercise 7th ed.; Cochrane review non-specific LBP exercise', ARRAY['stretch', 'hip', 'buttock pain']::text[], null
),
-- Supine Hamstring Stretch with Strap
(
  '174456a1-f87b-30b8-811a-7b1ac9ccf524', 'supine-hamstring-stretch', 'Supine Hamstring Stretch with Strap', 'Peregangan Hamstring Telentang dengan Tali', 'Peregangan hamstring yang aman bagi punggung karena dilakukan berbaring, bukan membungkuk.', 'Back-friendly hamstring stretch performed lying down rather than bending forward.',
  'Hip', 'Lower Limb', 'Beginner', 'Stretch', 'Supine',
  'Hamstring', ARRAY['Handuk panjang atau tali/strap']::text[], '1. Berbaring telentang, lingkarkan handuk pada telapak kaki satu tungkai.
2. Luruskan tungkai tersebut ke atas sambil menarik handuk perlahan.
3. Jaga tungkai lainnya tetap menekuk dengan kaki menapak lantai dan punggung rileks.
4. Tahan pada regangan sedang (bukan nyeri) selama 30 detik.
5. Ulangi 3 kali per sisi.', '1. Lie on your back and loop a towel around the sole of one foot.
2. Straighten that leg upward while gently pulling the towel.
3. Keep the other leg bent with the foot flat and the back relaxed.
4. Hold a moderate stretch (not pain) for 30 seconds.
5. Repeat 3 times per side.',
  'Hentikan bila timbul kesemutan atau nyeri menjalar - itu menandakan ketegangan saraf, bukan otot; gunakan neurodinamik saraf skiatik.', 'Tekuk sedikit lutut bila terasa tarikan saraf. Peregangan paling efektif setelah pemanasan atau mandi hangat.', 3, 1,
  30, 15, '1-2x/hari',
  'B', 'Kisner & Colby, Therapeutic Exercise 7th ed.; Behm et al. Appl Physiol Nutr Metab 2016 (stretching review)', ARRAY['stretch', 'hamstring', 'low back pain']::text[], null
),
-- Sit to Stand
(
  '6659ecf4-e7c7-32ac-b8e3-1d1a3f6f5f17', 'sit-to-stand', 'Sit to Stand', 'Duduk ke Berdiri', 'Latihan fungsional paling penting untuk kekuatan tungkai dan kemandirian, dipakai dari rehabilitasi lansia sampai pasca operasi lutut.', 'The most important functional leg-strength and independence exercise, used from geriatric rehab to post-knee-surgery care.',
  'Hip', 'Lower Limb', 'Beginner', 'Strength', 'Sitting',
  'Quadriceps, gluteus maximus, otot betis', ARRAY['Kursi kokoh tanpa roda']::text[], '1. Duduk di tepi depan kursi dengan kaki selebar pinggul, sedikit ditarik ke belakang.
2. Condongkan badan ke depan ("hidung di atas jari kaki").
3. Berdiri dengan mendorong melalui tumit, tanpa berpegangan bila mampu.
4. Duduk kembali perlahan selama 3 detik - jangan menjatuhkan badan.
5. Ulangi 10 kali; catat berapa kali dalam 30 detik sebagai ukuran kemajuan.', '1. Sit at the front edge of the chair with feet hip-width apart, slightly drawn back.
2. Lean the trunk forward ("nose over toes").
3. Stand by driving through the heels, without using the hands if able.
4. Sit back down slowly over 3 seconds - do not drop into the chair.
5. Repeat 10 times; count repetitions in 30 seconds to track progress.',
  'Gunakan kursi berlengan dan pengawasan bila ada risiko jatuh. Hindari kursi beroda. Ikuti batasan beban tumpu setelah operasi.', 'Progresi: kursi tinggi dengan bantuan tangan -> kursi standar tanpa tangan -> kursi rendah -> satu kaki -> memegang beban. Uji 30-detik chair stand adalah tolok ukur objektif.', 3, 10,
  0, 45, '3-7x/minggu',
  'A', 'Otago Exercise Programme (Campbell et al. BMJ 1997); Skou & Roos 2017 (GLA:D/NEMEX)', ARRAY['functional', 'falls prevention', 'geriatric', 'knee OA']::text[], null
),
-- Chair Squat (Sit-Back Squat)
(
  '310df6b5-3d32-3f28-bd36-b9d8cce7af28', 'chair-squat', 'Chair Squat (Sit-Back Squat)', 'Squat ke Kursi', 'Squat dengan target kursi sebagai pembatas kedalaman, aman untuk pemula dan pasien osteoartritis lutut.', 'Squat with a chair as a depth target - safe for beginners and knee osteoarthritis patients.',
  'Knee', 'Lower Limb', 'Beginner', 'Strength', 'Standing',
  'Quadriceps, gluteus maximus, hamstring', ARRAY['Kursi']::text[], '1. Berdiri membelakangi kursi dengan kaki selebar bahu.
2. Dorong panggul ke belakang dan turunkan badan seolah hendak duduk.
3. Jaga lutut segaris dengan jari kaki kedua - jangan jatuh ke dalam.
4. Sentuh kursi ringan (tanpa benar-benar duduk), lalu berdiri kembali.
5. Ulangi 10-15 kali.', '1. Stand with your back to a chair, feet shoulder-width apart.
2. Push the hips back and lower as if to sit.
3. Keep the knees tracking over the second toe - do not let them collapse inward.
4. Lightly touch the chair (without fully sitting), then stand back up.
5. Repeat 10-15 times.',
  'Hentikan bila nyeri lutut > 5/10. Batasi kedalaman pada nyeri patellofemoral atau setelah operasi lutut sesuai protokol.', 'Progresi: kursi tinggi -> kursi rendah -> squat tanpa kursi -> squat dengan beban. Untuk nyeri patellofemoral, batasi tekukan lutut 0-45 derajat pada awal.', 3, 12,
  2, 60, '3x/minggu',
  'A', 'Willy et al. Patellofemoral Pain CPG, JOSPT 2019; Skou & Roos 2017 (GLA:D)', ARRAY['knee OA', 'quadriceps', 'functional']::text[], null
),
-- Step Up
(
  '7838d23c-140d-3267-a85e-91ceb10e9579', 'step-up', 'Step Up', 'Naik Tangga (Step Up)', 'Latihan kekuatan satu kaki yang meniru pola naik tangga sehari-hari.', 'Single-leg strength exercise mirroring the everyday stair-climbing pattern.',
  'Knee', 'Lower Limb', 'Intermediate', 'Strength', 'Standing',
  'Quadriceps, gluteus maximus, gluteus medius', ARRAY['Anak tangga atau step 10-20 cm']::text[], '1. Berdiri menghadap step setinggi 10-20 cm, pegang pegangan bila perlu.
2. Letakkan seluruh telapak kaki sisi yang dilatih di atas step.
3. Naik dengan mendorong melalui tumit kaki di atas step - jangan mendorong dari kaki di bawah.
4. Turun perlahan selama 3 detik dengan kaki yang sama tetap di atas.
5. Ulangi 10 kali lalu ganti sisi.', '1. Stand facing a 10-20 cm step, holding a rail if needed.
2. Place the whole foot of the exercising leg on the step.
3. Step up by driving through the heel of the top foot - do not push off the bottom foot.
4. Lower slowly over 3 seconds with the same foot staying on the step.
5. Repeat 10 times, then switch sides.',
  'Hentikan bila lutut jatuh ke dalam atau nyeri > 5/10. Hindari step tinggi pada nyeri patellofemoral fase akut.', 'Naikkan tinggi step (10 -> 15 -> 20 cm) sebelum menambah beban di tangan. Perhatikan lutut tetap segaris dengan jari kaki.', 3, 10,
  0, 60, '3x/minggu',
  'A', 'Skou & Roos 2017 (GLA:D/NEMEX); Willy et al. JOSPT 2019', ARRAY['knee', 'functional', 'quadriceps']::text[], null
),
-- Split Squat (Static Lunge)
(
  '7aa8e15b-2f58-3d59-8b9c-d05c1ad5befe', 'split-squat', 'Split Squat (Static Lunge)', 'Split Squat (Lunge Statis)', 'Latihan kekuatan tungkai satu sisi dengan tuntutan keseimbangan, tahap lanjut program lutut dan pinggul.', 'Single-leg strength exercise with a balance demand - a later-stage knee and hip progression.',
  'Knee', 'Lower Limb', 'Advanced', 'Strength', 'Standing',
  'Quadriceps, gluteus maximus, fleksor pinggul sisi belakang', ARRAY['Matras (opsional)', 'Kursi untuk pegangan']::text[], '1. Berdiri dengan satu kaki melangkah ke depan sekitar satu langkah panjang.
2. Turunkan lutut belakang lurus ke bawah sampai membentuk sekitar 90 derajat di kedua lutut.
3. Jaga badan tegak dan lutut depan tidak melewati jauh di depan jari kaki.
4. Dorong kembali ke atas melalui tumit kaki depan.
5. Selesaikan repetisi pada satu sisi lalu ganti.', '1. Stand with one foot about a stride length in front of the other.
2. Lower the back knee straight down until both knees are near 90 degrees.
3. Keep the trunk upright and the front knee not travelling far past the toes.
4. Push back up through the front heel.
5. Complete the repetitions on one side, then switch.',
  'Hindari pada nyeri lutut sedang-berat, gangguan keseimbangan, dan fase awal pasca operasi lutut/panggul.', 'Progresi: berpegangan -> tanpa pegangan -> memegang beban -> kaki belakang di atas kursi (Bulgarian split squat).', 3, 10,
  0, 60, '2-3x/minggu',
  'B', 'Skou & Roos 2017 (GLA:D progressions); ACSM Guidelines 11th ed.', ARRAY['knee', 'strength', 'advanced']::text[], null
),
-- Standing Hip Extension
(
  'ee5e9688-d701-32fb-bb23-d0aa2e64771e', 'standing-hip-extension', 'Standing Hip Extension', 'Ekstensi Pinggul Berdiri', 'Penguatan gluteus maximus dalam posisi berdiri, cocok untuk lansia dan pasien osteoartritis pinggul.', 'Standing gluteus maximus strengthening, suitable for older adults and hip osteoarthritis.',
  'Hip', 'Lower Limb', 'Beginner', 'Strength', 'Standing',
  'Gluteus maximus, hamstring', ARRAY['Kursi untuk pegangan', 'Karet elastis (opsional)']::text[], '1. Berdiri menghadap kursi/meja dan pegang ringan untuk keseimbangan.
2. Jaga badan tetap tegak dan lutut lurus.
3. Ayunkan satu tungkai lurus ke belakang sekitar 20-30 cm menggunakan otot bokong.
4. Jangan melengkungkan punggung bawah untuk menambah jangkauan.
5. Tahan 2 detik, kembali perlahan. Ulangi 12-15 kali per sisi.', '1. Stand facing a chair or table and hold it lightly for balance.
2. Keep the trunk upright and the knee straight.
3. Swing one leg straight back about 20-30 cm using the buttock muscles.
4. Do not arch the low back to gain range.
5. Hold 2 seconds, return slowly. Repeat 12-15 times per side.',
  'Setelah operasi penggantian panggul, ikuti batasan gerak dari dokter bedah. Hentikan bila nyeri punggung bawah bertambah.', 'Tambahkan karet elastis di pergelangan kaki atau beban 0,5-2 kg. Bagian dari Otago Exercise Programme untuk pencegahan jatuh.', 3, 12,
  2, 45, '3x/minggu',
  'A', 'Otago Exercise Programme (Campbell et al. BMJ 1997); Fransen et al. Cochrane 2014 (hip OA exercise)', ARRAY['hip OA', 'glutes', 'falls prevention', 'Otago']::text[], null
),
-- Standing Hip Abduction
(
  '18e81e43-206b-3409-9ead-602cd2e00387', 'standing-hip-abduction', 'Standing Hip Abduction', 'Abduksi Pinggul Berdiri', 'Penguatan abduktor pinggul berdiri yang termasuk dalam Otago Exercise Programme untuk pencegahan jatuh.', 'Standing hip abductor strengthening, part of the Otago Exercise Programme for falls prevention.',
  'Hip', 'Lower Limb', 'Beginner', 'Strength', 'Standing',
  'Gluteus medius', ARRAY['Kursi untuk pegangan', 'Karet elastis (opsional)']::text[], '1. Berdiri di belakang kursi, pegang sandaran dengan ringan.
2. Jaga badan tegak dan jari kaki menghadap ke depan.
3. Angkat satu tungkai lurus ke samping sekitar 20-30 cm.
4. Jangan mencondongkan badan ke sisi berlawanan.
5. Tahan 2 detik, turunkan perlahan. Ulangi 12-15 kali per sisi.', '1. Stand behind a chair, holding the back lightly.
2. Keep the trunk upright and toes pointing forward.
3. Lift one leg straight out to the side about 20-30 cm.
4. Do not lean the trunk to the opposite side.
5. Hold 2 seconds, lower slowly. Repeat 12-15 times per side.',
  'Ikuti batasan pasca operasi panggul. Gunakan pengawasan bila keseimbangan buruk.', 'Kurangi pegangan tangan (dua tangan -> satu tangan -> satu jari -> tanpa pegangan) sebagai progresi keseimbangan sekaligus kekuatan.', 3, 12,
  2, 45, '3x/minggu',
  'A', 'Otago Exercise Programme (Campbell et al. BMJ 1997; Robertson et al. BMJ 2001)', ARRAY['falls prevention', 'Otago', 'hip', 'geriatric']::text[], null
),
-- Copenhagen Adduction (Modified)
(
  '43361f9b-7901-3208-ac19-e0cc26da144a', 'copenhagen-adduction', 'Copenhagen Adduction (Modified)', 'Copenhagen Adduction (Modifikasi)', 'Latihan penguatan adduktor eksentrik yang terbukti menurunkan risiko cedera selangkangan pada atlet.', 'Eccentric adductor strengthening shown to reduce groin injury risk in athletes.',
  'Hip', 'Lower Limb', 'Advanced', 'Strength', 'Side-lying',
  'Adduktor pinggul', ARRAY['Bangku atau kursi', 'Matras']::text[], '1. Berbaring menyamping bertumpu pada siku bawah.
2. Letakkan bagian dalam lutut tungkai atas di atas bangku (versi modifikasi/lebih mudah).
3. Angkat panggul dan tungkai bawah dari lantai sampai badan lurus.
4. Tahan 3 detik, lalu turunkan perlahan selama 3 detik.
5. Mulai 1 set 6 repetisi per sisi dan tingkatkan bertahap.', '1. Lie on your side propped on the bottom elbow.
2. Rest the inside of the top knee on a bench (the easier, modified version).
3. Lift the pelvis and bottom leg off the floor until the body is straight.
4. Hold 3 seconds, then lower slowly over 3 seconds.
5. Start with 1 set of 6 repetitions per side and build gradually.',
  'Hindari pada nyeri selangkangan akut, osteitis pubis fase akut, dan hernia inguinalis simtomatik. Latihan ini berat - dosis awal harus rendah.', 'Progresi: lutut di bangku -> pergelangan kaki di bangku (versi penuh). Naikkan volume perlahan (maks +2 repetisi/minggu) karena nyeri otot tertunda sering terjadi.', 2, 8,
  3, 60, '2-3x/minggu',
  'A', 'Harøy et al. Br J Sports Med 2019;53(3):150-157 (adductor strengthening groin injury prevention)', ARRAY['groin', 'adductor', 'sports', 'prevention']::text[], null
),
-- Wall Sit (Isometric Squat)
(
  '38df3ddb-43fd-373d-878a-e8347db0347e', 'wall-sit', 'Wall Sit (Isometric Squat)', 'Duduk Dinding (Squat Isometrik)', 'Kontraksi isometrik quadriceps yang membangun daya tahan dan sering meredakan nyeri tendon patella.', 'Quadriceps isometric that builds endurance and often reduces patellar tendon pain.',
  'Knee', 'Lower Limb', 'Intermediate', 'Strength', 'Standing',
  'Quadriceps, gluteus', ARRAY['Dinding']::text[], '1. Berdiri menempel dinding dengan kaki sekitar 40-50 cm dari dinding.
2. Geser punggung turun sampai lutut menekuk sekitar 45-60 derajat (jangan lebih dari 90 derajat).
3. Jaga lutut segaris dengan jari kaki dan berat merata pada kedua kaki.
4. Tahan 30-45 detik sambil bernapas normal.
5. Ulangi 5 kali dengan istirahat 1 menit.', '1. Stand with your back against a wall, feet about 40-50 cm away.
2. Slide down until the knees bend about 45-60 degrees (no more than 90).
3. Keep the knees in line with the toes and weight even on both feet.
4. Hold 30-45 seconds while breathing normally.
5. Repeat 5 times with 1 minute rest.',
  'Hindari pada hipertensi tidak terkontrol (kontraksi isometrik lama meningkatkan tekanan darah). Kurangi kedalaman pada nyeri patellofemoral.', 'Untuk tendinopati patella, gunakan 5x45 detik isometrik pada 60 derajat sebagai analgesia sebelum latihan berat.', 5, 1,
  45, 60, '1x/hari',
  'B', 'Rio et al. Br J Sports Med 2015;49(19):1277-1283 (isometric analgesia patellar tendinopathy)', ARRAY['knee', 'isometric', 'patellar tendinopathy']::text[], null
),
-- Quadriceps Setting (Quad Set)
(
  '1f312628-fe17-35a3-8a27-e200c26b918c', 'quad-set', 'Quadriceps Setting (Quad Set)', 'Kontraksi Otot Paha Depan (Quad Set)', 'Latihan pertama setelah operasi atau cedera lutut: mengaktifkan quadriceps tanpa menggerakkan sendi.', 'The first exercise after knee surgery or injury: activating the quadriceps without moving the joint.',
  'Knee', 'Lower Limb', 'Beginner', 'Motor control', 'Supine',
  'Quadriceps (terutama vastus medialis)', ARRAY['Handuk gulung']::text[], '1. Berbaring telentang atau duduk dengan tungkai lurus, letakkan handuk gulung kecil di bawah lutut.
2. Tekan bagian belakang lutut ke arah handuk sambil mengencangkan otot paha depan.
3. Tumit boleh sedikit terangkat dari alas.
4. Tahan 5-10 detik, rasakan otot di atas lutut mengeras, lalu rileks 5 detik.
5. Ulangi 10-15 kali.', '1. Lie on your back or sit with the leg straight, a small rolled towel under the knee.
2. Press the back of the knee down into the towel while tightening the front thigh muscle.
3. The heel may lift slightly off the surface.
4. Hold 5-10 seconds, feeling the muscle above the knee harden, then relax 5 seconds.
5. Repeat 10-15 times.',
  'Aman pada hampir semua kondisi lutut. Hentikan bila nyeri tajam di dalam sendi.', 'Latihan ini adalah prasyarat straight leg raise. Bila terjadi ''extension lag'' (tumit tidak bisa terangkat tanpa lutut menekuk), tetap fokus di quad set dahulu.', 3, 12,
  8, 20, '3-5x/hari pada fase awal',
  'A', 'Adams et al. JOSPT 2012 (ACL rehab current concepts); Brigham & Women''s TKA protocol', ARRAY['post-op', 'ACL', 'TKA', 'quadriceps']::text[], null
),
-- Straight Leg Raise
(
  '2e20c63e-394b-30fa-ad40-64c8c46f0dea', 'straight-leg-raise', 'Straight Leg Raise', 'Angkat Tungkai Lurus', 'Penguatan quadriceps tanpa menekuk lutut - aman pada fase awal pasca operasi lutut dan osteoartritis.', 'Quadriceps strengthening without knee bending - safe in early post-operative knee care and osteoarthritis.',
  'Knee', 'Lower Limb', 'Beginner', 'Strength', 'Supine',
  'Quadriceps, iliopsoas', ARRAY['Matras']::text[], '1. Berbaring telentang dengan satu lutut ditekuk dan kaki menapak; tungkai yang dilatih lurus.
2. Kencangkan otot paha depan (quad set) terlebih dahulu sampai lutut benar-benar lurus.
3. Angkat tungkai lurus setinggi sekitar 30 cm.
4. Tahan 3 detik, turunkan perlahan selama 3 detik.
5. Lutut tidak boleh menekuk saat mengangkat.', '1. Lie on your back with one knee bent and foot flat; the exercising leg straight.
2. First tighten the front thigh (quad set) until the knee is fully straight.
3. Lift the straight leg about 30 cm.
4. Hold 3 seconds, lower slowly over 3 seconds.
5. The knee must not bend during the lift.',
  'Hentikan bila nyeri punggung bawah bertambah - tekuk tungkai lainnya lebih dalam. Hindari bila terdapat extension lag yang besar; latih quad set dahulu.', 'Tambahkan beban 0,5-2 kg di pergelangan kaki bila 3x15 repetisi mudah. Variasi arah: telentang (quadriceps), menyamping (abduktor), tengkurap (gluteus).', 3, 12,
  3, 45, '1-2x/hari',
  'A', 'Adams et al. JOSPT 2012; Brigham & Women''s Hospital TKA Protocol', ARRAY['post-op', 'quadriceps', 'knee OA', 'ACL']::text[], null
),
-- Heel Slide (Knee Flexion AROM)
(
  '7078c397-1ff1-397f-9045-213ed8a239f4', 'heel-slide', 'Heel Slide (Knee Flexion AROM)', 'Geser Tumit (Lingkup Gerak Lutut)', 'Latihan mengembalikan tekukan lutut setelah operasi, imobilisasi, atau cedera.', 'Restores knee flexion after surgery, immobilisation, or injury.',
  'Knee', 'Lower Limb', 'Beginner', 'Mobility', 'Supine',
  'Lingkup gerak fleksi lutut', ARRAY['Matras', 'Handuk atau kantong plastik untuk mengurangi gesekan']::text[], '1. Berbaring telentang dengan kedua tungkai lurus, letakkan handuk licin di bawah tumit sisi yang dilatih.
2. Geser tumit ke arah bokong dengan menekuk lutut sejauh yang nyaman.
3. Tahan 5 detik pada ujung gerak yang terasa tarikan ringan.
4. Luruskan kembali perlahan.
5. Ulangi 10-15 kali; catat sudut tekukan yang dicapai.', '1. Lie on your back with both legs straight, a slippery towel under the heel of the exercising leg.
2. Slide the heel toward the buttock, bending the knee as far as comfortable.
3. Hold 5 seconds at the point of a mild stretch.
4. Straighten back slowly.
5. Repeat 10-15 times; record the flexion angle achieved.',
  'Ikuti batasan lingkup gerak dari dokter bedah (misalnya maksimal 90 derajat pada 2 minggu pertama pasca TKA). Hentikan bila bengkak meningkat tajam.', 'Gunakan handuk untuk menarik tumit lebih jauh saat gerakan aktif mentok. Ukur kemajuan mingguan dengan goniometer atau jarak tumit-bokong.', 3, 12,
  5, 30, '3-4x/hari pada fase awal',
  'A', 'Brigham & Women''s Hospital TKA Protocol; Adams et al. JOSPT 2012 (ACL)', ARRAY['post-op', 'ROM', 'TKA', 'ACL']::text[], null
),
-- Short Arc Quad
(
  '2de5746b-285e-3552-b9ab-2fadf90bdbd8', 'short-arc-quad', 'Short Arc Quad', 'Short Arc Quad (Luruskan Lutut Setengah)', 'Penguatan quadriceps pada rentang gerak akhir yang paling sering lemah setelah operasi lutut.', 'Quadriceps strengthening through the terminal range that is most often weak after knee surgery.',
  'Knee', 'Lower Limb', 'Beginner', 'Strength', 'Supine',
  'Quadriceps', ARRAY['Handuk gulung besar atau bantal guling']::text[], '1. Berbaring telentang dengan handuk gulung besar di bawah lutut sehingga lutut menekuk sekitar 30 derajat.
2. Luruskan lutut dengan mengangkat tumit dari alas, paha tetap menempel handuk.
3. Tahan 3-5 detik pada posisi lurus penuh.
4. Turunkan perlahan selama 3 detik.
5. Ulangi 12-15 kali.', '1. Lie on your back with a large rolled towel under the knee so it bends about 30 degrees.
2. Straighten the knee by lifting the heel off the surface, keeping the thigh on the towel.
3. Hold 3-5 seconds in full extension.
4. Lower slowly over 3 seconds.
5. Repeat 12-15 times.',
  'Aman untuk sebagian besar kondisi lutut termasuk nyeri patellofemoral karena beban sendi rendah pada rentang ini.', 'Tambahkan beban pergelangan kaki 0,5-2 kg. Progresi berikutnya: knee extension duduk dengan rentang penuh (bila tidak ada nyeri patellofemoral).', 3, 15,
  4, 45, '1-2x/hari',
  'A', 'Adams et al. JOSPT 2012; Escamilla et al. JOSPT 2012 (patellofemoral joint loading)', ARRAY['post-op', 'quadriceps', 'TKA', 'PFP']::text[], null
),
-- Terminal Knee Extension with Band
(
  '4b76caf1-4e09-38ff-ba7c-79e90ee74b9f', 'terminal-knee-extension-band', 'Terminal Knee Extension with Band', 'Ekstensi Lutut Akhir dengan Karet Elastis', 'Penguatan quadriceps sambil menumpu berat badan, membantu mengembalikan ekstensi lutut penuh saat berjalan.', 'Weight-bearing quadriceps strengthening that helps restore full knee extension during gait.',
  'Knee', 'Lower Limb', 'Intermediate', 'Strength', 'Standing',
  'Quadriceps (vastus medialis obliquus)', ARRAY['Karet elastis']::text[], '1. Ikat karet elastis setinggi lutut pada tiang; lingkarkan pada bagian belakang lutut yang dilatih.
2. Berdiri menghadap titik ikat, mundur sampai karet tegang, lutut sedikit menekuk.
3. Luruskan lutut melawan tahanan karet sampai benar-benar lurus.
4. Tahan 3 detik sambil mengencangkan paha depan.
5. Kembali perlahan ke posisi menekuk. Ulangi 15 kali.', '1. Anchor a band at knee height; loop it behind the exercising knee.
2. Face the anchor and step back until the band is taut, knee slightly bent.
3. Straighten the knee against the band until fully extended.
4. Hold 3 seconds while tightening the front thigh.
5. Return slowly to the bent position. Repeat 15 times.',
  'Ikuti batasan beban tumpu pasca operasi. Hentikan bila lutut terasa tidak stabil.', 'Naikkan resistensi karet, lalu lakukan dengan berdiri satu kaki untuk menambah tuntutan keseimbangan.', 3, 15,
  3, 45, '3-5x/minggu',
  'B', 'Adams et al. JOSPT 2012 (ACL rehab); Logerstedt et al. Knee Ligament Sprain CPG, JOSPT 2017', ARRAY['ACL', 'quadriceps', 'post-op']::text[], null
),
-- Wall Squat (Slide)
(
  'cce63300-4661-3e35-9d50-447f07980cd6', 'wall-squat-slide', 'Wall Squat (Slide)', 'Squat Dinding', 'Squat terbimbing dinding dengan kontrol kedalaman, cocok untuk osteoartritis lutut dan tahap menengah rehabilitasi.', 'Wall-guided squat with controlled depth, suitable for knee osteoarthritis and mid-stage rehabilitation.',
  'Knee', 'Lower Limb', 'Intermediate', 'Strength', 'Standing',
  'Quadriceps, gluteus', ARRAY['Dinding']::text[], '1. Berdiri menempel dinding dengan kaki 40-50 cm dari dinding, selebar bahu.
2. Geser punggung turun sampai lutut menekuk 45-60 derajat.
3. Tahan 3-5 detik pada posisi bawah.
4. Geser kembali ke atas dengan mendorong melalui tumit.
5. Ulangi 10-12 kali.', '1. Stand with your back on a wall, feet 40-50 cm away, shoulder-width apart.
2. Slide down until the knees bend 45-60 degrees.
3. Hold 3-5 seconds at the bottom.
4. Slide back up driving through the heels.
5. Repeat 10-12 times.',
  'Batasi kedalaman pada nyeri patellofemoral dan setelah operasi lutut. Hentikan bila nyeri > 5/10.', 'Tambah kedalaman bertahap dan durasi tahan. Progresi berikutnya: squat bebas, lalu squat dengan beban.', 3, 12,
  4, 60, '3x/minggu',
  'A', 'Willy et al. Patellofemoral Pain CPG, JOSPT 2019; Fransen et al. Cochrane 2015 (knee OA exercise)', ARRAY['knee OA', 'quadriceps', 'PFP']::text[], null
),
-- Eccentric Step Down
(
  'd75efc70-179c-316e-802b-6d0ffeae6cbe', 'step-down-eccentric', 'Eccentric Step Down', 'Turun Tangga Terkontrol (Eksentrik)', 'Latihan kontrol eksentrik quadriceps dan panggul, sekaligus tes fungsional untuk nyeri lutut anterior.', 'Eccentric quadriceps and hip control exercise that doubles as a functional test for anterior knee pain.',
  'Knee', 'Lower Limb', 'Advanced', 'Strength', 'Standing',
  'Quadriceps (eksentrik), gluteus medius', ARRAY['Step 10-20 cm', 'Pegangan']::text[], '1. Berdiri di atas step dengan satu kaki, kaki lainnya menggantung di depan.
2. Pegang pegangan ringan bila perlu.
3. Tekuk lutut tumpu perlahan selama 3-4 detik sampai tumit kaki yang menggantung menyentuh lantai ringan.
4. Jangan biarkan lutut jatuh ke dalam atau panggul turun ke sisi berlawanan.
5. Kembali naik dan ulangi 8-12 kali per sisi.', '1. Stand on a step on one leg with the other foot hanging in front.
2. Hold a rail lightly if needed.
3. Slowly bend the standing knee over 3-4 seconds until the hanging heel lightly touches the floor.
4. Do not let the knee collapse inward or the pelvis drop on the opposite side.
5. Return up and repeat 8-12 times per side.',
  'Terlalu berat untuk fase akut nyeri patellofemoral - mulai dari step sangat rendah (5 cm). Hindari pada instabilitas lutut yang belum diobati.', 'Naikkan tinggi step bertahap (5 -> 10 -> 15 -> 20 cm). Gunakan cermin untuk umpan balik posisi lutut.', 3, 10,
  0, 60, '3x/minggu',
  'A', 'Willy et al. Patellofemoral Pain CPG, JOSPT 2019; Logerstedt et al. JOSPT 2017', ARRAY['PFP', 'quadriceps', 'eccentric', 'advanced']::text[], null
),
-- Spanish Squat (Band-Supported Isometric)
(
  '7c78edd9-613d-3add-98bd-df116681c17a', 'spanish-squat', 'Spanish Squat (Band-Supported Isometric)', 'Spanish Squat (Isometrik dengan Karet)', 'Latihan isometrik khusus untuk tendinopati patella - memberi beban tinggi pada tendon dengan nyeri minimal.', 'Targeted isometric for patellar tendinopathy - high tendon load with minimal pain.',
  'Knee', 'Lower Limb', 'Intermediate', 'Strength', 'Standing',
  'Quadriceps, tendon patella', ARRAY['Karet elastis tebal', 'Tiang kokoh']::text[], '1. Ikat karet elastis tebal setinggi lutut pada tiang kokoh dan lingkarkan di belakang kedua lutut.
2. Mundur sampai karet tegang, berdiri tegak.
3. Turun ke posisi squat sekitar 60-70 derajat sambil bersandar ke belakang pada karet, badan tetap tegak vertikal.
4. Tahan 30-45 detik.
5. Ulangi 5 kali dengan istirahat 1-2 menit.', '1. Anchor a thick band at knee height and loop it behind both knees.
2. Step back until the band is taut and stand tall.
3. Sit down into about 60-70 degrees of knee bend while leaning back into the band, trunk staying vertical.
4. Hold 30-45 seconds.
5. Repeat 5 times with 1-2 minutes rest.',
  'Hindari pada hipertensi tidak terkontrol. Hentikan bila nyeri tendon > 4/10 selama latihan.', 'Gunakan sebagai analgesia sebelum aktivitas olahraga (5x45 detik). Lanjut ke heavy slow resistance (squat/leg press 3-4 set x 6-8 repetisi berat) untuk remodeling tendon.', 5, 1,
  45, 90, '1x/hari',
  'B', 'Rio et al. Br J Sports Med 2015; Kongsgaard et al. Scand J Med Sci Sports 2009 (heavy slow resistance)', ARRAY['patellar tendinopathy', 'isometric', 'jumper''s knee']::text[], null
),
-- Prone Hamstring Curl
(
  '7ee694e0-020a-316e-b056-9fb0c90a5782', 'hamstring-curl-prone', 'Prone Hamstring Curl', 'Curl Hamstring Tengkurap', 'Penguatan hamstring terisolasi untuk cedera hamstring, rehabilitasi ACL, dan keseimbangan otot paha.', 'Isolated hamstring strengthening for hamstring injury, ACL rehabilitation, and thigh muscle balance.',
  'Knee', 'Lower Limb', 'Beginner', 'Strength', 'Prone',
  'Hamstring', ARRAY['Matras', 'Beban pergelangan kaki atau karet elastis (opsional)']::text[], '1. Tengkurap dengan kedua tungkai lurus dan panggul menempel matras.
2. Tekuk satu lutut membawa tumit ke arah bokong sejauh nyaman.
3. Jangan mengangkat panggul dari matras.
4. Tahan 2 detik, turunkan perlahan selama 3 detik.
5. Ulangi 12-15 kali per sisi.', '1. Lie face down with both legs straight and the pelvis on the mat.
2. Bend one knee, bringing the heel toward the buttock as far as comfortable.
3. Do not lift the pelvis off the mat.
4. Hold 2 seconds, lower slowly over 3 seconds.
5. Repeat 12-15 times per side.',
  'Setelah rekonstruksi ACL dengan graft hamstring, tunda penguatan hamstring resistif sesuai protokol bedah (umumnya 4-6 minggu).', 'Tambahkan beban pergelangan kaki atau karet elastis. Progresi lanjut: Nordic hamstring curl untuk kekuatan eksentrik.', 3, 12,
  2, 45, '3x/minggu',
  'B', 'Logerstedt et al. Knee Ligament Sprain CPG, JOSPT 2017; Askling et al. Br J Sports Med 2013', ARRAY['hamstring', 'ACL', 'strength']::text[], null
),
-- Nordic Hamstring Curl
(
  '1dd125ec-6d26-3563-8710-0b99a0e60e2c', 'nordic-hamstring-curl', 'Nordic Hamstring Curl', 'Nordic Hamstring Curl', 'Latihan eksentrik hamstring yang terbukti menurunkan risiko cedera hamstring hingga sekitar 50% pada atlet.', 'Eccentric hamstring exercise shown to cut hamstring injury risk by roughly half in athletes.',
  'Knee', 'Lower Limb', 'Advanced', 'Strength', 'Quadruped',
  'Hamstring (eksentrik)', ARRAY['Matras', 'Partner atau alat penahan pergelangan kaki']::text[], '1. Berlutut di matras dengan badan tegak; minta partner menahan kuat kedua pergelangan kaki.
2. Kencangkan perut dan bokong sehingga badan lurus dari lutut ke kepala.
3. Turunkan badan ke depan SELAMBAT mungkin, tahan dengan hamstring.
4. Tangkap badan dengan tangan saat sudah tidak bisa menahan.
5. Dorong dengan tangan untuk kembali ke posisi awal (fase mengangkat tidak dilatih).', '1. Kneel on a mat with the trunk upright; have a partner hold your ankles firmly.
2. Brace the abdomen and glutes so the body is straight from knees to head.
3. Lower the body forward AS SLOWLY as possible, resisting with the hamstrings.
4. Catch yourself with the hands when you can no longer hold.
5. Push back up with the arms (the lifting phase is not trained).',
  'Hindari pada cedera hamstring akut (< 2-3 minggu), nyeri lutut saat berlutut, dan pasca rekonstruksi ACL graft hamstring < 12 minggu. Nyeri otot tertunda (DOMS) sangat umum - mulai dengan volume rendah.', 'Ikuti progresi 10 minggu: minggu 1 = 2x5 (1x/minggu); minggu 2 = 2x6 (2x/minggu); minggu 3 = 3x6-8 (3x/minggu); minggu 4 = 3x8-10; minggu 5-10 = 3 set 12/10/8 repetisi; pemeliharaan 1x/minggu.', 3, 8,
  0, 90, '1-3x/minggu sesuai fase',
  'A', 'Petersen et al. Am J Sports Med 2011;39(11):2296-2303; van Dyk et al. Br J Sports Med 2019 (meta-analysis)', ARRAY['hamstring', 'prevention', 'eccentric', 'sports']::text[], null
),
-- Patellar Mobilisation (Self)
(
  'c16526d8-b995-3a80-97a1-87eaf63ff3a0', 'patellar-mobilization', 'Patellar Mobilisation (Self)', 'Mobilisasi Tempurung Lutut Mandiri', 'Mobilisasi tempurung lutut untuk mengurangi kekakuan setelah operasi atau imobilisasi lutut.', 'Patellar mobilisation to reduce stiffness after knee surgery or immobilisation.',
  'Knee', 'Lower Limb', 'Beginner', 'Mobility', 'Sitting',
  'Mobilitas patellofemoral', '{}'::text[], '1. Duduk dengan tungkai lurus dan otot paha benar-benar rileks.
2. Pegang tepi tempurung lutut dengan ibu jari dan telunjuk kedua tangan.
3. Geser tempurung lutut ke arah dalam, tahan 10-30 detik.
4. Ulangi ke arah luar, ke atas, dan ke bawah.
5. Gerakan harus lembut; otot paha harus tetap rileks sepanjang latihan.', '1. Sit with the leg straight and the thigh muscles completely relaxed.
2. Grip the edges of the kneecap with the thumbs and index fingers of both hands.
3. Glide the kneecap inward and hold 10-30 seconds.
4. Repeat outward, upward and downward.
5. Keep the movement gentle; the thigh must stay relaxed throughout.',
  'Hindari pada dislokasi patella akut, fraktur patella, dan luka operasi yang belum menutup.', 'Lakukan sebelum latihan lingkup gerak lutut untuk hasil yang lebih baik pada kekakuan pasca operasi.', 1, 4,
  20, 10, '2-3x/hari',
  'B', 'Brigham & Women''s Hospital TKA Protocol; Adams et al. JOSPT 2012', ARRAY['post-op', 'TKA', 'mobility']::text[], null
),
-- Stationary Cycling
(
  'c580be70-0ff9-33d2-b41d-67498a9ba363', 'stationary-cycling', 'Stationary Cycling', 'Sepeda Statis', 'Latihan aerobik dengan beban sendi rendah, sekaligus mengembalikan lingkup gerak lutut secara bertahap.', 'Low-joint-load aerobic exercise that also progressively restores knee range of motion.',
  'Knee', 'Cardio', 'Beginner', 'Aerobic', 'Sitting',
  'Quadriceps, hamstring, betis, sistem kardiovaskular', ARRAY['Sepeda statis']::text[], '1. Atur tinggi sadel sehingga lutut sedikit menekuk (sekitar 15-20 derajat) saat pedal di posisi terbawah.
2. Bila lutut belum bisa memutar penuh, lakukan gerakan maju-mundur setengah putaran terlebih dahulu.
3. Kayuh dengan tahanan ringan selama 5-10 menit sebagai awalan.
4. Intensitas sedang: masih bisa berbicara tetapi tidak bisa bernyanyi (RPE 11-13 dari skala Borg 6-20).
5. Tingkatkan durasi 2-5 menit per minggu sampai 20-30 menit.', '1. Set the saddle so the knee is slightly bent (about 15-20 degrees) at the bottom of the pedal stroke.
2. If the knee cannot complete a full revolution, rock back and forth through half-revolutions first.
3. Pedal at light resistance for 5-10 minutes to start.
4. Moderate intensity: able to talk but not sing (RPE 11-13 on the Borg 6-20 scale).
5. Increase duration by 2-5 minutes per week toward 20-30 minutes.',
  'Hentikan bila muncul nyeri dada, sesak napas tidak wajar, atau pusing. Turunkan sadel secara bertahap saja pada lutut yang masih kaku.', 'Naikkan durasi terlebih dahulu, baru tahanan. Target jangka panjang 150 menit aktivitas sedang per minggu sesuai pedoman WHO/ACSM.', 1, 1,
  0, 0, '3-5x/minggu',
  'A', 'ACSM''s Guidelines for Exercise Testing and Prescription, 11th ed.; WHO 2020 Physical Activity Guidelines', ARRAY['aerobic', 'knee OA', 'cardio', 'post-op']::text[], null
),
-- Prone Knee Hang (Extension Stretch)
(
  '800994ed-8763-3b2c-b654-0b79e593e20e', 'prone-knee-hang', 'Prone Knee Hang (Extension Stretch)', 'Gantung Lutut Tengkurap (Peregangan Ekstensi)', 'Peregangan pasif untuk mengembalikan ekstensi lutut penuh - prioritas utama setelah operasi lutut.', 'Passive stretch to restore full knee extension - a top priority after knee surgery.',
  'Knee', 'Lower Limb', 'Beginner', 'Stretch', 'Prone',
  'Kapsul posterior lutut, hamstring', ARRAY['Meja atau tempat tidur']::text[], '1. Tengkurap di tempat tidur dengan lutut dan tungkai bawah menggantung di luar tepi.
2. Biarkan gravitasi meluruskan lutut secara pasif - otot harus rileks total.
3. Tahan 5-10 menit; boleh tambahkan beban ringan di pergelangan kaki.
4. Jangan menahan bila timbul nyeri tajam - kurangi beban.
5. Lakukan 2-3 kali sehari pada fase pemulihan ekstensi.', '1. Lie face down on a bed with the knee and lower leg hanging over the edge.
2. Let gravity passively straighten the knee - the muscles must be completely relaxed.
3. Hold 5-10 minutes; a light ankle weight may be added.
4. Do not push through sharp pain - reduce the weight.
5. Perform 2-3 times daily while restoring extension.',
  'Hindari setelah perbaikan meniskus atau ligamen bila ekstensi penuh masih dibatasi dokter bedah. Hentikan bila nyeri > 5/10.', 'Ekstensi penuh biasanya lebih penting daripada fleksi pada fase awal - defisit ekstensi yang dibiarkan sulit dikoreksi kemudian.', 2, 1,
  300, 60, '2-3x/hari',
  'A', 'Adams et al. JOSPT 2012 (ACL rehab); Logerstedt et al. JOSPT 2017', ARRAY['post-op', 'ACL', 'TKA', 'extension']::text[], null
),
-- Calf Stretch (Gastrocnemius)
(
  'c96818e9-13c1-3492-adeb-ad5219c42a25', 'calf-stretch-gastrocnemius', 'Calf Stretch (Gastrocnemius)', 'Peregangan Betis (Gastrocnemius)', 'Peregangan betis dengan lutut lurus untuk keterbatasan dorsofleksi pergelangan kaki dan nyeri tumit.', 'Straight-knee calf stretch for limited ankle dorsiflexion and heel pain.',
  'Ankle', 'Lower Limb', 'Beginner', 'Stretch', 'Standing',
  'Gastrocnemius', ARRAY['Dinding']::text[], '1. Berdiri menghadap dinding dengan kedua tangan menempel setinggi bahu.
2. Langkahkan satu kaki ke belakang, lutut belakang LURUS dan tumit menempel lantai.
3. Tekuk lutut depan dan condongkan badan ke dinding sampai terasa regangan di betis atas kaki belakang.
4. Jaga jari kaki belakang menghadap lurus ke depan.
5. Tahan 30-45 detik, ulangi 3 kali per sisi.', '1. Face a wall with both hands on it at shoulder height.
2. Step one foot back, keeping the back knee STRAIGHT and the heel on the floor.
3. Bend the front knee and lean toward the wall until a stretch is felt in the upper calf of the back leg.
4. Keep the back foot pointing straight forward.
5. Hold 30-45 seconds, repeat 3 times per side.',
  'Hentikan bila nyeri tajam di tendon Achilles - kemungkinan tendinopati akut atau ruptur parsial. Hindari peregangan agresif pada tendinopati insersional.', 'Kombinasikan dengan peregangan soleus (lutut ditekuk) untuk mencakup kedua otot betis. Peregangan paling efektif dilakukan 2-3 kali sehari.', 3, 1,
  40, 15, '2x/hari',
  'A', 'Martin et al. Heel Pain - Plantar Fasciitis CPG, JOSPT 2023;53(12):CPG1-CPG39', ARRAY['calf', 'stretch', 'plantar fasciitis', 'ankle']::text[], null
),
-- Soleus Stretch (Bent Knee Calf Stretch)
(
  '824f88d2-6b33-39f1-b858-f8276f57f2cf', 'soleus-stretch', 'Soleus Stretch (Bent Knee Calf Stretch)', 'Peregangan Soleus (Lutut Ditekuk)', 'Peregangan otot betis dalam yang penting untuk dorsofleksi saat berjongkok dan menaiki tangga.', 'Deep calf stretch important for dorsiflexion during squatting and stair climbing.',
  'Ankle', 'Lower Limb', 'Beginner', 'Stretch', 'Standing',
  'Soleus', ARRAY['Dinding']::text[], '1. Berdiri menghadap dinding dengan satu kaki di belakang.
2. Tekuk lutut belakang sambil menjaga tumit tetap menempel lantai.
3. Turunkan badan sedikit sampai terasa regangan di betis bagian bawah/dekat tumit.
4. Tahan 30-45 detik.
5. Ulangi 3 kali per sisi.', '1. Face a wall with one foot behind.
2. Bend the back knee while keeping the heel on the floor.
3. Sink slightly until a stretch is felt low in the calf near the heel.
4. Hold 30-45 seconds.
5. Repeat 3 times per side.',
  'Hentikan bila nyeri tajam di tendon Achilles atau tumit.', 'Ukur kemajuan dengan tes knee-to-wall (jarak jari kaki ke dinding saat lutut menyentuh dinding); target normal sekitar 10 cm.', 3, 1,
  40, 15, '2x/hari',
  'A', 'Martin et al. Heel Pain CPG, JOSPT 2023', ARRAY['calf', 'stretch', 'ankle', 'dorsiflexion']::text[], null
),
-- Ankle Pumps
(
  'db85f8da-5c7a-3702-b361-0b1f4fb071cf', 'ankle-pumps', 'Ankle Pumps', 'Pompa Pergelangan Kaki', 'Gerakan sederhana untuk melancarkan aliran darah, mengurangi bengkak, dan mencegah bekuan darah setelah operasi atau tirah baring.', 'Simple movement to promote circulation, reduce swelling and help prevent blood clots after surgery or bed rest.',
  'Ankle', 'Lower Limb', 'Beginner', 'Mobility', 'Supine',
  'Tibialis anterior, gastrocnemius-soleus', '{}'::text[], '1. Berbaring atau duduk dengan tungkai lurus dan disangga.
2. Tarik ujung kaki ke arah wajah sejauh mungkin.
3. Tahan 2 detik, lalu dorong ujung kaki menjauh (seperti menginjak pedal gas).
4. Ulangi dengan irama tetap 15-20 kali.
5. Dapat dilakukan sesering mungkin sepanjang hari.', '1. Lie or sit with the leg straight and supported.
2. Pull the toes toward your face as far as possible.
3. Hold 2 seconds, then push the toes away (like pressing a pedal).
4. Repeat rhythmically 15-20 times.
5. Can be done as often as desired throughout the day.',
  'Aman pada hampir semua kondisi. Bila ada nyeri betis satu sisi disertai bengkak dan hangat, hentikan dan cari pertolongan medis (kemungkinan trombosis vena dalam).', 'Latihan dasar untuk fase awal pasca operasi apapun; lakukan setiap jam saat terjaga pada minggu pertama.', 3, 20,
  2, 10, 'Setiap 1-2 jam pada fase awal',
  'B', 'Brigham & Women''s Hospital post-operative protocols; Martin et al. Ankle Stability CPG, JOSPT 2021', ARRAY['post-op', 'circulation', 'ankle', 'swelling']::text[], null
),
-- Ankle Alphabet
(
  '9911489f-877f-3506-807f-32a0ab0e9e9f', 'ankle-alphabet', 'Ankle Alphabet', 'Alfabet Pergelangan Kaki', 'Latihan lingkup gerak segala arah untuk pergelangan kaki setelah cedera atau imobilisasi.', 'Multi-directional ankle range-of-motion drill after injury or immobilisation.',
  'Ankle', 'Lower Limb', 'Beginner', 'Mobility', 'Sitting',
  'Semua arah gerak pergelangan kaki', '{}'::text[], '1. Duduk dengan tungkai lurus atau menggantung, kaki bebas bergerak.
2. Bayangkan menuliskan huruf A sampai Z dengan ibu jari kaki di udara.
3. Gerakan datang dari pergelangan kaki, bukan dari lutut atau panggul.
4. Gerakkan sebesar dan sepelan mungkin dalam batas nyaman.
5. Selesaikan satu putaran alfabet, ulangi 1-2 kali.', '1. Sit with the leg straight or hanging, the foot free to move.
2. Imagine writing the letters A to Z in the air with your big toe.
3. The movement comes from the ankle, not the knee or hip.
4. Make the letters as large and slow as comfortable.
5. Complete one alphabet, repeat 1-2 times.',
  'Ikuti batasan pasca operasi/gips. Hentikan bila bengkak meningkat tajam setelah latihan.', 'Setelah lingkup gerak baik, lanjut ke penguatan dengan karet elastis empat arah dan latihan keseimbangan.', 2, 1,
  0, 30, '2-3x/hari',
  'B', 'Martin et al. Ankle Stability and Movement Coordination Impairments CPG, JOSPT 2021;51(4):CPG1-CPG80', ARRAY['ankle sprain', 'ROM', 'post-immobilisation']::text[], null
),
-- Double-Leg Heel Raise
(
  '4f4e6fce-0cc8-34ce-929f-a64d2e068be1', 'double-leg-heel-raise', 'Double-Leg Heel Raise', 'Jinjit Dua Kaki', 'Penguatan betis dasar untuk tendinopati Achilles, nyeri tumit, dan pencegahan jatuh.', 'Foundational calf strengthening for Achilles tendinopathy, heel pain and falls prevention.',
  'Ankle', 'Lower Limb', 'Beginner', 'Strength', 'Standing',
  'Gastrocnemius, soleus', ARRAY['Pegangan (kursi/dinding)']::text[], '1. Berdiri tegak dengan kaki selebar pinggul, pegang kursi/dinding untuk keseimbangan.
2. Angkat kedua tumit setinggi mungkin selama 2 detik.
3. Tahan 2 detik di posisi atas.
4. Turunkan perlahan selama 3 detik sampai tumit menyentuh lantai.
5. Ulangi 12-15 kali.', '1. Stand tall with feet hip-width apart, holding a chair or wall for balance.
2. Raise both heels as high as possible over 2 seconds.
3. Hold 2 seconds at the top.
4. Lower slowly over 3 seconds until the heels touch the floor.
5. Repeat 12-15 times.',
  'Hindari pada dugaan ruptur tendon Achilles (nyeri mendadak disertai ketidakmampuan jinjit). Ikuti batasan pasca operasi.', 'Progresi: dua kaki -> dua kaki dengan beban -> satu kaki -> satu kaki di tepi tangga (rentang penuh) -> heel raise dengan beban berat.', 3, 15,
  2, 45, '3-5x/minggu',
  'A', 'Martin et al. Achilles Pain CPG, JOSPT 2018;48(5):A1-A38; Otago Exercise Programme', ARRAY['calf', 'Achilles', 'falls prevention', 'strength']::text[], null
),
-- Single-Leg Heel Raise
(
  'b7c83c49-0dc3-3d01-8863-15d8a5c2261b', 'single-leg-heel-raise', 'Single-Leg Heel Raise', 'Jinjit Satu Kaki', 'Penguatan betis satu sisi - standar penilaian dan latihan pada tendinopati Achilles.', 'Unilateral calf strengthening - both an assessment standard and a treatment staple in Achilles tendinopathy.',
  'Ankle', 'Lower Limb', 'Intermediate', 'Strength', 'Standing',
  'Gastrocnemius, soleus', ARRAY['Pegangan']::text[], '1. Berdiri satu kaki dengan pegangan ringan untuk keseimbangan.
2. Angkat tumit setinggi mungkin selama 2 detik.
3. Tahan 2 detik di atas.
4. Turunkan perlahan selama 3 detik.
5. Ulangi sampai 15 repetisi atau sampai tidak dapat mempertahankan tinggi angkatan.', '1. Stand on one leg with a light hand support for balance.
2. Raise the heel as high as possible over 2 seconds.
3. Hold 2 seconds at the top.
4. Lower slowly over 3 seconds.
5. Repeat up to 15 times or until you can no longer maintain the height.',
  'Hindari pada dugaan ruptur Achilles. Hentikan bila nyeri > 5/10 atau nyeri menetap > 24 jam setelah latihan.', 'Target fungsional: 25 repetisi satu kaki dengan tinggi angkatan penuh. Bandingkan kanan-kiri untuk mengukur defisit.', 3, 12,
  2, 60, '3-5x/minggu',
  'A', 'Martin et al. Achilles Pain CPG, JOSPT 2018; Silbernagel et al. Am J Sports Med 2007', ARRAY['calf', 'Achilles', 'strength']::text[], null
),
-- Eccentric Heel Drop - Straight Knee (Alfredson)
(
  'd5672a46-ea41-3e00-8c6a-313ac07aee71', 'eccentric-heel-drop-straight-knee', 'Eccentric Heel Drop - Straight Knee (Alfredson)', 'Turun Tumit Eksentrik Lutut Lurus (Alfredson)', 'Komponen utama protokol Alfredson untuk tendinopati Achilles midportion: 3x15 repetisi, dua kali sehari, 12 minggu.', 'Core component of the Alfredson protocol for midportion Achilles tendinopathy: 3x15 repetitions, twice daily, for 12 weeks.',
  'Ankle', 'Lower Limb', 'Intermediate', 'Strength', 'Standing',
  'Gastrocnemius, tendon Achilles', ARRAY['Anak tangga atau step', 'Pegangan']::text[], '1. Berdiri dengan ujung kaki di tepi anak tangga, tumit menggantung di luar tepi, pegang pegangan.
2. Naik ke posisi jinjit menggunakan KEDUA kaki (atau kaki sehat saja).
3. Angkat kaki yang sehat, sehingga hanya kaki yang sakit menahan beban.
4. Turunkan tumit perlahan selama 3 detik sampai di bawah level anak tangga.
5. Kembali ke atas dengan bantuan kaki sehat - fase naik TIDAK dilatih.', '1. Stand with the forefoot on the edge of a step, heels hanging off, holding a rail.
2. Rise onto your toes using BOTH feet (or the healthy foot only).
3. Lift the healthy foot so only the affected leg bears weight.
4. Lower the heel slowly over 3 seconds until it is below step level.
5. Return to the top with help from the healthy leg - the raising phase is NOT trained.',
  'Hindari pada tendinopati Achilles insersional (nyeri tepat di tulang tumit) - turun di bawah level rata lantai dapat memperberat; gunakan lantai datar. Hindari pada dugaan ruptur.', 'Nyeri sampai 5/10 selama latihan dapat diterima dan diharapkan. Bila 3x15 repetisi tanpa nyeri, tambahkan beban di ransel (mulai 5 kg). Protokol penuh: 3x15 lutut lurus + 3x15 lutut ditekuk, 2x sehari, 7 hari/minggu selama 12 minggu.', 3, 15,
  3, 60, '2x/hari, 7 hari/minggu',
  'A', 'Alfredson et al. Am J Sports Med 1998;26(3):360-366; Martin et al. Achilles Pain CPG, JOSPT 2018', ARRAY['Achilles', 'eccentric', 'tendinopathy', 'Alfredson']::text[], null
),
-- Eccentric Heel Drop - Bent Knee (Alfredson)
(
  'efee271b-4cba-3c1b-b845-27397e85dcb8', 'eccentric-heel-drop-bent-knee', 'Eccentric Heel Drop - Bent Knee (Alfredson)', 'Turun Tumit Eksentrik Lutut Ditekuk (Alfredson)', 'Komponen kedua protokol Alfredson yang menargetkan otot soleus dengan lutut ditekuk.', 'The second Alfredson component, targeting the soleus with the knee bent.',
  'Ankle', 'Lower Limb', 'Intermediate', 'Strength', 'Standing',
  'Soleus, tendon Achilles', ARRAY['Anak tangga', 'Pegangan']::text[], '1. Berdiri dengan ujung kaki di tepi anak tangga seperti latihan sebelumnya.
2. Tekuk lutut sekitar 30-45 derajat dan pertahankan tekukan sepanjang gerakan.
3. Naik ke posisi jinjit dengan kedua kaki.
4. Angkat kaki sehat dan turunkan tumit kaki yang sakit perlahan selama 3 detik.
5. Kembali ke atas dengan bantuan kaki sehat.', '1. Stand with the forefoot on the edge of a step as in the previous exercise.
2. Bend the knee about 30-45 degrees and keep it bent throughout.
3. Rise onto the toes with both feet.
4. Lift the healthy foot and lower the affected heel slowly over 3 seconds.
5. Return to the top with help from the healthy leg.',
  'Sama dengan versi lutut lurus. Hindari pada tendinopati insersional dan dugaan ruptur.', 'Dilakukan bersama versi lutut lurus - totalnya 180 repetisi eksentrik per hari pada protokol Alfredson asli. Versi volume lebih rendah ("do as tolerated") memberi hasil serupa dan lebih mudah dipatuhi.', 3, 15,
  3, 60, '2x/hari, 7 hari/minggu',
  'A', 'Alfredson et al. Am J Sports Med 1998; Stevens & Tan JOSPT 2014 (do-as-tolerated comparison)', ARRAY['Achilles', 'eccentric', 'soleus', 'Alfredson']::text[], null
),
-- Heel Raise with Towel under Toes (High-Load)
(
  '2a2fc90c-8ad5-362b-a590-b0a8b2447e4b', 'heel-raise-towel-toes', 'Heel Raise with Towel under Toes (High-Load)', 'Jinjit dengan Handuk di Bawah Jari Kaki (Beban Tinggi)', 'Latihan kekuatan beban tinggi untuk plantar fasciitis, terbukti lebih baik daripada peregangan pada 3 bulan.', 'High-load strength training for plantar fasciitis, shown superior to stretching at 3 months.',
  'Foot', 'Lower Limb', 'Intermediate', 'Strength', 'Standing',
  'Gastrocnemius-soleus, fascia plantaris (mekanisme windlass)', ARRAY['Handuk', 'Anak tangga', 'Ransel dengan beban (untuk progresi)']::text[], '1. Gulung handuk dan letakkan di bawah jari-jari kaki sehingga jari terangkat (ekstensi).
2. Berdiri dengan ujung kaki di tepi anak tangga, tumit menggantung.
3. Naik ke posisi jinjit selama 3 detik.
4. Tahan 2 detik di atas.
5. Turun perlahan selama 3 detik. Lakukan setiap dua hari sekali.', '1. Roll a towel and place it under the toes so they are extended.
2. Stand with the forefoot on the edge of a step, heel hanging off.
3. Rise onto the toes over 3 seconds.
4. Hold 2 seconds at the top.
5. Lower slowly over 3 seconds. Perform every second day.',
  'Hentikan bila nyeri tumit meningkat > 24 jam setelah latihan. Hindari pada fraktur stres kalkaneus.', 'Progresi beban Rathleff: minggu 1-2 = 3x12 repetisi tanpa beban; minggu 3-4 = 4x10 dengan beban di ransel; minggu 5 dan seterusnya = 5x8 dengan beban lebih berat. Lakukan selang sehari.', 3, 12,
  2, 90, 'Selang sehari (setiap 2 hari)',
  'A', 'Rathleff et al. Scand J Med Sci Sports 2015;25(3):e292-e300; Martin et al. Heel Pain CPG, JOSPT 2023', ARRAY['plantar fasciitis', 'heel pain', 'high-load', 'Rathleff']::text[], null
),
-- Plantar Fascia-Specific Stretch
(
  '82e9de72-d7e2-3350-b6a7-77adb574b152', 'plantar-fascia-specific-stretch', 'Plantar Fascia-Specific Stretch', 'Peregangan Khusus Fascia Plantaris', 'Peregangan spesifik fascia plantaris (DiGiovanni), terutama efektif dilakukan sebelum langkah pertama di pagi hari.', 'Plantar fascia-specific stretch (DiGiovanni), most effective before the first steps in the morning.',
  'Foot', 'Lower Limb', 'Beginner', 'Stretch', 'Sitting',
  'Fascia plantaris', '{}'::text[], '1. Duduk dan silangkan kaki yang sakit di atas lutut kaki lainnya.
2. Gunakan tangan untuk menarik semua jari kaki ke arah tulang kering sampai terasa regangan di telapak kaki.
3. Raba dengan tangan lain - fascia plantaris harus terasa tegang seperti tali.
4. Tahan 10 detik.
5. Ulangi 10 kali, 3 sesi per hari, termasuk SEBELUM bangkit dari tempat tidur di pagi hari.', '1. Sit and cross the affected foot over the opposite knee.
2. Use your hand to pull all the toes back toward the shin until a stretch is felt in the arch.
3. Feel with the other hand - the plantar fascia should feel taut like a cord.
4. Hold 10 seconds.
5. Repeat 10 times, 3 sessions per day, including BEFORE getting out of bed in the morning.',
  'Hentikan bila nyeri tajam menetap. Hindari pada dugaan ruptur fascia plantaris (nyeri mendadak dengan bunyi "pop").', 'Peregangan pagi sebelum menapak adalah yang paling penting - nyeri langkah pertama pagi adalah ciri khas plantar fasciitis.', 3, 10,
  10, 10, '3x/hari',
  'A', 'DiGiovanni et al. J Bone Joint Surg Am 2003;85(7):1270-1277; Martin et al. Heel Pain CPG, JOSPT 2023', ARRAY['plantar fasciitis', 'heel pain', 'stretch']::text[], null
),
-- Resisted Ankle Eversion
(
  '521cfc4c-19ba-320d-9650-e6c58afcda84', 'resisted-ankle-eversion', 'Resisted Ankle Eversion', 'Eversi Pergelangan Kaki dengan Tahanan', 'Penguatan otot peroneal - kunci pencegahan cedera ulang pada keseleo pergelangan kaki sisi luar.', 'Peroneal strengthening - key to preventing re-injury after a lateral ankle sprain.',
  'Ankle', 'Lower Limb', 'Beginner', 'Strength', 'Sitting',
  'Peroneus longus dan brevis', ARRAY['Karet elastis']::text[], '1. Duduk dengan tungkai lurus, lingkarkan karet elastis di sekitar telapak kaki bagian depan.
2. Ikat ujung karet ke titik tetap di sisi DALAM kaki (atau tahan dengan kaki lainnya).
3. Dorong kaki ke arah luar melawan tahanan, gerakan datang dari pergelangan kaki saja.
4. Tahan 2 detik, kembali perlahan selama 3 detik.
5. Ulangi 15 kali.', '1. Sit with the leg straight and loop a band around the forefoot.
2. Anchor the band on the INSIDE of the foot (or hold it with the other foot).
3. Push the foot outward against the resistance, moving only at the ankle.
4. Hold 2 seconds, return slowly over 3 seconds.
5. Repeat 15 times.',
  'Hindari pada fase akut keseleo berat (0-72 jam) - prioritaskan proteksi dan pengurangan bengkak dahulu. Hentikan bila nyeri tajam.', 'Naikkan resistensi karet setiap 2 minggu. Lengkapi dengan inversi, dorsofleksi, dan plantarfleksi untuk penguatan empat arah.', 3, 15,
  2, 45, '1x/hari',
  'A', 'Martin et al. Ankle Stability CPG, JOSPT 2021;51(4):CPG1-CPG80', ARRAY['ankle sprain', 'peroneal', 'strength']::text[], null
),
-- Resisted Ankle Dorsiflexion
(
  'f97ecb32-9eb4-3924-b314-158300de8cb2', 'resisted-ankle-dorsiflexion', 'Resisted Ankle Dorsiflexion', 'Dorsofleksi Pergelangan Kaki dengan Tahanan', 'Penguatan otot pengangkat kaki, penting untuk mencegah tersandung dan pada foot drop.', 'Strengthening of the foot-lifting muscle, important for preventing trips and in foot drop.',
  'Ankle', 'Lower Limb', 'Beginner', 'Strength', 'Sitting',
  'Tibialis anterior', ARRAY['Karet elastis']::text[], '1. Duduk dengan tungkai lurus; ikat karet elastis pada objek di depan dan lingkarkan pada punggung kaki.
2. Tarik ujung kaki ke arah wajah melawan tahanan karet.
3. Tahan 2 detik pada posisi tertarik penuh.
4. Kembalikan perlahan selama 3 detik.
5. Ulangi 15 kali.', '1. Sit with the leg straight; anchor a band in front and loop it over the top of the foot.
2. Pull the toes toward your face against the band.
3. Hold 2 seconds at full dorsiflexion.
4. Return slowly over 3 seconds.
5. Repeat 15 times.',
  'Hentikan bila timbul kram atau nyeri di depan tulang kering yang menetap (kemungkinan sindrom kompartemen kronik - perlu evaluasi).', 'Penting pada rehabilitasi stroke dan foot drop; kombinasikan dengan latihan berjalan dengan tumit menyentuh lebih dulu.', 3, 15,
  2, 45, '1x/hari',
  'B', 'Martin et al. Ankle Stability CPG, JOSPT 2021; AHA/ASA Stroke Rehabilitation Guideline 2016', ARRAY['ankle', 'strength', 'foot drop', 'stroke']::text[], null
),
-- Short Foot Exercise (Arch Doming)
(
  'c7e3cf64-f6f8-3f6b-8606-8dbe769f23af', 'short-foot-exercise', 'Short Foot Exercise (Arch Doming)', 'Latihan Kaki Pendek (Angkat Lengkung Kaki)', 'Aktivasi otot intrinsik kaki untuk mendukung lengkung kaki, digunakan pada nyeri tumit dan instabilitas pergelangan kaki.', 'Intrinsic foot muscle activation to support the arch, used in heel pain and ankle instability.',
  'Foot', 'Lower Limb', 'Intermediate', 'Motor control', 'Sitting',
  'Otot intrinsik kaki (abductor hallucis, flexor digitorum brevis)', '{}'::text[], '1. Duduk dengan telapak kaki menapak lantai penuh, lutut ditekuk 90 derajat.
2. Tanpa menekuk jari kaki, tarik pangkal ibu jari ke arah tumit sehingga lengkung kaki naik.
3. Jari-jari kaki harus tetap lurus dan menyentuh lantai.
4. Tahan 5-10 detik sambil bernapas normal.
5. Ulangi 10-15 kali per kaki.', '1. Sit with the whole foot flat on the floor, knee bent 90 degrees.
2. Without curling the toes, draw the ball of the big toe toward the heel so the arch lifts.
3. The toes must stay straight and in contact with the floor.
4. Hold 5-10 seconds with normal breathing.
5. Repeat 10-15 times per foot.',
  'Sering menimbulkan kram pada awalnya - kurangi durasi tahan. Hindari bila timbul nyeri tajam di lengkung kaki.', 'Progresi: duduk -> berdiri dua kaki -> berdiri satu kaki -> saat berjalan. Butuh 4-8 minggu untuk terlihat perubahan kekuatan.', 3, 12,
  8, 30, '1x/hari',
  'B', 'Mulligan & Cook Man Ther 2013; McKeon et al. Br J Sports Med 2015 (foot core system)', ARRAY['foot', 'intrinsic', 'plantar fasciitis', 'ankle instability']::text[], null
),
-- Knee-to-Wall Dorsiflexion Mobilisation
(
  'bfc37dc8-b16e-3f48-a051-c7780bd4a539', 'knee-to-wall-dorsiflexion', 'Knee-to-Wall Dorsiflexion Mobilisation', 'Mobilisasi Dorsofleksi Lutut ke Dinding', 'Mobilisasi dan pengukuran dorsofleksi pergelangan kaki, keterbatasan yang umum setelah keseleo dan pada nyeri lutut.', 'Ankle dorsiflexion mobilisation and measure - a common restriction after sprains and in knee pain.',
  'Ankle', 'Lower Limb', 'Beginner', 'Mobility', 'Standing',
  'Sendi talocrural, kompleks betis', ARRAY['Dinding']::text[], '1. Berdiri menghadap dinding dengan jari kaki sekitar 8-10 cm dari dinding.
2. Jaga tumit tetap menempel lantai.
3. Tekuk lutut ke depan mencoba menyentuh dinding tanpa tumit terangkat.
4. Tahan 3 detik, kembali. Ulangi 10-15 kali.
5. Bila lutut menyentuh dinding dengan mudah, mundurkan kaki 1 cm dan ulangi.', '1. Stand facing a wall with the toes about 8-10 cm away.
2. Keep the heel flat on the floor.
3. Drive the knee forward toward the wall without the heel lifting.
4. Hold 3 seconds, return. Repeat 10-15 times.
5. If the knee touches easily, move the foot back 1 cm and repeat.',
  'Hentikan bila nyeri di depan pergelangan kaki (kemungkinan impingement anterior). Ikuti batasan beban tumpu pasca operasi.', 'Catat jarak maksimum jari kaki ke dinding sebagai ukuran objektif; normal sekitar 9-10 cm. Selisih > 1,5 cm antar sisi bermakna klinis.', 3, 12,
  3, 30, '1-2x/hari',
  'B', 'Martin et al. Ankle Stability CPG, JOSPT 2021; Bennell et al. Aust J Physiother 1998 (weight-bearing lunge test)', ARRAY['ankle', 'mobility', 'dorsiflexion']::text[], null
),
-- Single-Leg Stance
(
  '9ce4f900-f155-3039-aec5-8f3db2c57e44', 'single-leg-stance', 'Single-Leg Stance', 'Berdiri Satu Kaki', 'Latihan keseimbangan statis dasar - komponen inti pencegahan jatuh dan rehabilitasi instabilitas pergelangan kaki.', 'Foundational static balance drill - a core component of falls prevention and ankle instability rehabilitation.',
  'Balance', 'Balance & Neuro', 'Beginner', 'Balance', 'Standing',
  'Penstabil pergelangan kaki dan pinggul, sistem keseimbangan', ARRAY['Kursi atau meja untuk pegangan']::text[], '1. Berdiri di dekat meja atau kursi yang kokoh untuk keamanan.
2. Angkat satu kaki sehingga tidak menyentuh lantai, lutut sedikit ditekuk.
3. Jaga panggul sejajar dan pandangan lurus ke depan pada satu titik.
4. Tahan 30 detik atau selama mampu, lalu ganti kaki.
5. Kurangi bantuan tangan secara bertahap: dua tangan -> satu tangan -> satu jari -> tanpa pegangan.', '1. Stand near a sturdy table or chair for safety.
2. Lift one foot off the floor with the knee slightly bent.
3. Keep the pelvis level and eyes fixed on a point ahead.
4. Hold 30 seconds or as long as able, then switch legs.
5. Reduce hand support gradually: two hands -> one hand -> one finger -> none.',
  'Selalu lakukan di dekat pegangan bila ada riwayat jatuh. Hindari mata tertutup tanpa pengawasan.', 'Progresi: pegangan penuh -> tanpa pegangan -> mata tertutup -> di atas busa/bantal -> sambil menggerakkan kepala -> sambil melempar bola.', 3, 1,
  30, 30, '3-7x/minggu',
  'A', 'Otago Exercise Programme (Campbell et al. BMJ 1997); Martin et al. Ankle Stability CPG, JOSPT 2021', ARRAY['balance', 'falls prevention', 'ankle instability', 'Otago']::text[], null
),
-- Single-Leg Stance on Foam / Wobble Board
(
  'edb844f4-1162-3052-bda0-ce71c70766cf', 'single-leg-stance-foam', 'Single-Leg Stance on Foam / Wobble Board', 'Berdiri Satu Kaki di Busa / Papan Keseimbangan', 'Latihan keseimbangan pada permukaan tidak stabil, terbukti menurunkan risiko keseleo ulang pergelangan kaki.', 'Unstable-surface balance training, shown to reduce recurrent ankle sprain risk.',
  'Balance', 'Balance & Neuro', 'Advanced', 'Balance', 'Standing',
  'Kontrol neuromuskular pergelangan kaki dan pinggul', ARRAY['Bantal busa atau wobble board', 'Pegangan']::text[], '1. Letakkan bantal busa atau wobble board di dekat dinding/pegangan.
2. Berdiri satu kaki di atas permukaan tersebut dengan lutut sedikit ditekuk.
3. Pertahankan keseimbangan selama 30 detik tanpa kaki lain menyentuh lantai.
4. Jaga papan tidak menyentuh lantai (bila menggunakan wobble board).
5. Istirahat 30 detik antar percobaan, ulangi 3-5 kali per sisi.', '1. Place a foam pad or wobble board near a wall or rail.
2. Stand on one leg on the surface with the knee slightly bent.
3. Maintain balance for 30 seconds without the other foot touching down.
4. Keep the board''s edges off the floor if using a wobble board.
5. Rest 30 seconds between attempts, repeat 3-5 times per side.',
  'Hindari tanpa pengawasan pada risiko jatuh tinggi, gangguan penglihatan berat, atau vertigo aktif.', 'Progresi: dua kaki di busa -> satu kaki di busa -> satu kaki + gerakan kepala -> satu kaki + menangkap bola. Program 4-6 minggu, 5x/minggu, terbukti efektif mencegah keseleo ulang.', 5, 1,
  30, 30, '5x/minggu',
  'A', 'Martin et al. Ankle Stability CPG, JOSPT 2021; Wester et al. JOSPT 1996 (wobble board after ankle sprain)', ARRAY['balance', 'ankle instability', 'proprioception', 'advanced']::text[], null
),
-- Tandem Stance
(
  'c75626d7-38c8-3ed8-8bc0-e4a17c6916c4', 'tandem-stance', 'Tandem Stance', 'Berdiri Tandem (Kaki Sejajar Depan-Belakang)', 'Latihan keseimbangan dengan basis penopang menyempit - bagian dari Four-Stage Balance Test dan Otago.', 'Narrowed base-of-support balance drill - part of the Four-Stage Balance Test and the Otago programme.',
  'Balance', 'Balance & Neuro', 'Beginner', 'Balance', 'Standing',
  'Kontrol postural lateral', ARRAY['Pegangan']::text[], '1. Berdiri di dekat dinding atau meja untuk keamanan.
2. Letakkan satu kaki tepat di depan kaki lainnya sehingga tumit depan menyentuh jari kaki belakang.
3. Jaga pandangan lurus ke depan dan lengan di samping badan.
4. Tahan 10-30 detik, lalu tukar posisi kaki.
5. Ulangi 3-5 kali per posisi.', '1. Stand near a wall or table for safety.
2. Place one foot directly in front of the other so the front heel touches the back toes.
3. Keep the eyes forward and arms at your sides.
4. Hold 10-30 seconds, then swap feet.
5. Repeat 3-5 times per position.',
  'Selalu di dekat pegangan pada lansia dengan riwayat jatuh.', 'Progresi Four-Stage Balance Test: kaki rapat -> semi-tandem -> tandem penuh -> berdiri satu kaki. Mampu tandem 10 detik adalah patokan klinis.', 3, 1,
  20, 20, '3-7x/minggu',
  'A', 'Otago Exercise Programme; CDC STEADI Four-Stage Balance Test', ARRAY['balance', 'falls prevention', 'geriatric', 'Otago']::text[], null
),
-- Tandem Walk (Heel-to-Toe Walking)
(
  'd1d55be7-b3a8-3a0a-bf9b-9f180e77348b', 'tandem-walk', 'Tandem Walk (Heel-to-Toe Walking)', 'Jalan Tandem (Tumit ke Jari Kaki)', 'Latihan keseimbangan berjalan dengan basis sempit, komponen Otago untuk pencegahan jatuh.', 'Narrow-base dynamic balance walking, an Otago component for falls prevention.',
  'Balance', 'Balance & Neuro', 'Intermediate', 'Balance', 'Standing',
  'Kontrol keseimbangan dinamis', ARRAY['Koridor dengan dinding di samping']::text[], '1. Berdiri di koridor dengan dinding di satu sisi untuk pegangan darurat.
2. Berjalan lurus dengan meletakkan tumit kaki depan tepat menyentuh jari kaki belakang setiap langkah.
3. Pandangan lurus ke depan, bukan ke bawah.
4. Berjalan 10 langkah, berbalik dengan hati-hati, lalu kembali.
5. Ulangi 4 kali bolak-balik.', '1. Stand in a corridor with a wall on one side for emergency support.
2. Walk in a straight line placing the front heel directly against the back toes each step.
3. Look straight ahead, not down.
4. Walk 10 steps, turn carefully, and return.
5. Repeat 4 lengths.',
  'Perlu pengawasan pada gangguan keseimbangan sedang-berat. Hentikan bila pusing.', 'Progresi: dengan sentuhan dinding -> tanpa sentuhan -> berjalan mundur tandem -> sambil menoleh kanan-kiri.', 4, 10,
  0, 30, '3x/minggu',
  'A', 'Otago Exercise Programme (Campbell et al. BMJ 1997; Robertson et al. BMJ 2001)', ARRAY['balance', 'falls prevention', 'gait', 'Otago']::text[], null
),
-- Sideways Walking
(
  '2f02aac8-df3f-31dd-af74-ec77365a5543', 'sideways-walking', 'Sideways Walking', 'Berjalan Menyamping', 'Latihan berjalan lateral untuk kekuatan abduktor pinggul dan keseimbangan samping, bagian dari Otago.', 'Lateral walking for hip abductor strength and side-to-side balance, an Otago component.',
  'Balance', 'Balance & Neuro', 'Beginner', 'Balance', 'Standing',
  'Abduktor pinggul, kontrol postural lateral', ARRAY['Dinding atau meja panjang']::text[], '1. Berdiri di samping meja panjang atau dinding, tangan dapat menyentuh ringan.
2. Melangkah ke samping dengan satu kaki, lalu ikuti dengan kaki lainnya.
3. Jaga badan menghadap lurus ke depan dan jari kaki tidak berputar.
4. Lakukan 10 langkah ke satu arah, lalu 10 langkah kembali.
5. Ulangi 4 kali bolak-balik.', '1. Stand beside a long table or wall so a hand can touch it lightly.
2. Step sideways with one foot, then bring the other foot across.
3. Keep the body facing forward and the toes from turning out.
4. Take 10 steps one way, then 10 steps back.
5. Repeat 4 lengths.',
  'Pengawasan diperlukan pada risiko jatuh tinggi.', 'Progresi: dengan pegangan -> tanpa pegangan -> dengan karet elastis di pergelangan kaki.', 4, 10,
  0, 30, '3x/minggu',
  'A', 'Otago Exercise Programme (Campbell et al. BMJ 1997)', ARRAY['balance', 'falls prevention', 'Otago', 'hip']::text[], null
),
-- Backward Walking
(
  '764a4358-8e9b-3975-8bc8-da946e522f5f', 'backward-walking', 'Backward Walking', 'Berjalan Mundur', 'Latihan berjalan mundur yang menantang kontrol postural dan strategi langkah, bagian dari Otago.', 'Backward walking, challenging postural control and stepping strategy - an Otago component.',
  'Balance', 'Balance & Neuro', 'Intermediate', 'Balance', 'Standing',
  'Kontrol keseimbangan, quadriceps, gluteus', ARRAY['Koridor dengan pegangan']::text[], '1. Berdiri di koridor dengan dinding atau pegangan di samping.
2. Berjalan mundur perlahan 10 langkah, meletakkan ujung kaki terlebih dahulu.
3. Jangan menoleh ke belakang - pastikan jalur sudah aman terlebih dahulu.
4. Berbalik dan ulangi.
5. Lakukan 4 kali bolak-balik.', '1. Stand in a corridor with a wall or rail alongside.
2. Walk backwards slowly for 10 steps, placing the toes down first.
3. Do not turn to look behind - clear the path beforehand.
4. Turn around and repeat.
5. Complete 4 lengths.',
  'Hanya dengan pengawasan pada gangguan keseimbangan. Pastikan jalur bebas hambatan.', 'Progresi: dengan pegangan -> tanpa pegangan -> berjalan mundur tandem.', 4, 10,
  0, 30, '3x/minggu',
  'A', 'Otago Exercise Programme (Campbell et al. BMJ 1997)', ARRAY['balance', 'falls prevention', 'Otago', 'gait']::text[], null
),
-- Gaze Stabilisation x1 Viewing - Horizontal
(
  '517b0c1c-f7bd-3a65-a9aa-55d78a278b69', 'gaze-stabilization-x1-horizontal', 'Gaze Stabilisation x1 Viewing - Horizontal', 'Stabilisasi Pandangan x1 - Horizontal', 'Latihan adaptasi VOR utama untuk hipofungsi vestibular unilateral - dasar rehabilitasi vestibular.', 'The primary VOR adaptation exercise for unilateral vestibular hypofunction - the cornerstone of vestibular rehabilitation.',
  'Balance', 'Balance & Neuro', 'Beginner', 'Balance', 'Sitting',
  'Refleks vestibulo-okular (VOR)', ARRAY['Kartu dengan huruf/target kecil']::text[], '1. Duduk dan pegang kartu bertuliskan huruf kecil sejauh lengan, setinggi mata.
2. Fokuskan pandangan pada huruf tersebut - huruf harus tetap TERBACA JELAS sepanjang latihan.
3. Gerakkan KEPALA ke kanan dan kiri sekitar 30 derajat, sementara kartu tetap diam.
4. Gerakkan kepala secepat mungkin selama huruf masih terlihat jelas.
5. Lakukan 1-2 menit, istirahat, lalu ulangi. Total minimal 12 menit per hari terbagi dalam 3 sesi.', '1. Sit holding a card with a small letter at arm''s length, at eye level.
2. Focus on the letter - it must stay CLEARLY IN FOCUS throughout.
3. Move your HEAD left and right about 30 degrees while the card stays still.
4. Move the head as fast as you can while the letter remains clear.
5. Do this for 1-2 minutes, rest, then repeat. At least 12 minutes total per day across 3 sessions.',
  'Pusing ringan selama latihan adalah normal dan diperlukan untuk adaptasi, tetapi harus mereda dalam beberapa menit. Hentikan bila muntah, nyeri kepala hebat, atau gejala neurologis baru.', 'Progresi: duduk -> berdiri -> berdiri kaki rapat -> berjalan. Latar belakang: polos -> berpola. Dosis akut/subakut: 3x/hari total minimal 12 menit; kronik: 3-5x/hari total minimal 20 menit selama 4-6 minggu.', 3, 1,
  60, 60, '3-5x/hari',
  'A', 'Hall et al. Vestibular Rehabilitation for Peripheral Vestibular Hypofunction CPG (Updated), J Neurol Phys Ther 2022;46(2):118-177', ARRAY['vestibular', 'dizziness', 'VOR', 'gaze stabilization']::text[], null
),
-- Gaze Stabilisation x1 Viewing - Vertical
(
  '08b0ec8a-aabf-3cf4-8e38-f6db1e2a2bba', 'gaze-stabilization-x1-vertical', 'Gaze Stabilisation x1 Viewing - Vertical', 'Stabilisasi Pandangan x1 - Vertikal', 'Versi vertikal dari latihan adaptasi VOR untuk melengkapi latihan horizontal.', 'Vertical version of the VOR adaptation exercise, complementing the horizontal drill.',
  'Balance', 'Balance & Neuro', 'Beginner', 'Balance', 'Sitting',
  'Refleks vestibulo-okular (bidang vertikal)', ARRAY['Kartu dengan huruf kecil']::text[], '1. Duduk memegang kartu bertuliskan huruf kecil sejauh lengan.
2. Fokuskan pandangan pada huruf.
3. Anggukkan kepala ke atas dan bawah sekitar 30 derajat sementara kartu tetap diam.
4. Jaga huruf tetap terbaca jelas; perlambat bila mulai kabur.
5. Lakukan 1-2 menit per sesi.', '1. Sit holding a card with a small letter at arm''s length.
2. Focus on the letter.
3. Nod the head up and down about 30 degrees while the card stays still.
4. Keep the letter clear; slow down if it blurs.
5. Perform 1-2 minutes per session.',
  'Sama dengan versi horizontal. Hindari gerakan cepat pada pasien dengan instabilitas cervical.', 'Kombinasikan horizontal dan vertikal dalam satu sesi. Kemajuan diukur dengan Dynamic Visual Acuity dan skor DHI.', 3, 1,
  60, 60, '3-5x/hari',
  'A', 'Hall et al. J Neurol Phys Ther 2022;46(2):118-177', ARRAY['vestibular', 'dizziness', 'VOR']::text[], null
),
-- Brandt-Daroff Habituation Exercise
(
  '64c4a37d-a7bc-3c82-9233-d5dbfb80cade', 'brandt-daroff', 'Brandt-Daroff Habituation Exercise', 'Latihan Habituasi Brandt-Daroff', 'Latihan mandiri untuk vertigo posisi (BPPV) dan habituasi pusing yang dipicu perubahan posisi.', 'Home exercise for positional vertigo (BPPV) and habituation of position-triggered dizziness.',
  'Balance', 'Balance & Neuro', 'Beginner', 'Balance', 'Sitting',
  'Habituasi sistem vestibular', ARRAY['Tempat tidur atau matras']::text[], '1. Duduk di tepi tempat tidur dengan kaki menjuntai.
2. Berbaring cepat ke sisi kanan dengan kepala menoleh 45 derajat ke atas/kiri; tunggu sampai pusing hilang atau 30 detik.
3. Duduk kembali dan tunggu 30 detik.
4. Ulangi ke sisi kiri dengan kepala menoleh ke kanan.
5. Lakukan 5 siklus per sesi, 3 sesi per hari sampai bebas gejala selama 2 hari.', '1. Sit on the edge of a bed with the feet hanging.
2. Lie down quickly onto the right side with the head turned 45 degrees upward/left; wait until dizziness stops or 30 seconds.
3. Sit back up and wait 30 seconds.
4. Repeat to the left side with the head turned right.
5. Perform 5 cycles per session, 3 sessions per day until symptom-free for 2 days.',
  'Hentikan bila muncul gejala neurologis (bicara pelo, penglihatan ganda, kelemahan) - INI BUKAN BPPV dan perlu evaluasi darurat. Hati-hati pada masalah leher berat.', 'Manuver reposisi (Epley) yang dilakukan klinisi lebih efektif untuk BPPV kanal posterior; Brandt-Daroff berguna sebagai latihan lanjutan di rumah atau bila diagnosis kanal tidak pasti.', 3, 5,
  30, 30, '3x/hari',
  'B', 'Bhattacharyya et al. BPPV Clinical Practice Guideline Update, Otolaryngol Head Neck Surg 2017;156(3_suppl):S1-S47', ARRAY['BPPV', 'vertigo', 'vestibular', 'dizziness']::text[], null
),
-- Big Sit-to-Stand (Amplitude Training)
(
  '48bee2ff-a1aa-35b8-b12b-d29c6831824d', 'sit-to-stand-amplitude', 'Big Sit-to-Stand (Amplitude Training)', 'Duduk-Berdiri Amplitudo Besar', 'Latihan gerakan berlebihan (amplitude training) untuk penyakit Parkinson, prinsip inti pendekatan LSVT BIG.', 'Oversized-movement (amplitude) training for Parkinson''s disease, the core principle of the LSVT BIG approach.',
  'Balance', 'Balance & Neuro', 'Intermediate', 'Motor control', 'Sitting',
  'Quadriceps, gluteus, ekstensor batang tubuh', ARRAY['Kursi kokoh']::text[], '1. Duduk di tepi kursi dengan kaki menapak lantai.
2. Julurkan kedua lengan LEBAR ke depan dan atas sambil berdiri dengan gerakan sebesar dan seluas mungkin.
3. Berdiri tegak penuh dengan dada terbuka dan lengan terentang, tahan 2 detik.
4. Duduk kembali dengan gerakan besar dan terkontrol.
5. Lakukan dengan usaha maksimal dan hitungan suara keras; ini bagian dari terapi.', '1. Sit at the edge of a chair with feet flat.
2. Reach both arms WIDE forward and up while standing with the biggest movement possible.
3. Stand fully upright with the chest open and arms extended, hold 2 seconds.
4. Sit back down with a large, controlled movement.
5. Perform with maximal effort and count out loud - this is part of the therapy.',
  'Perlu pengawasan pada risiko jatuh dan hipotensi ortostatik (pusing saat berdiri). Gunakan kursi berlengan bila perlu.', 'Program LSVT BIG standar: 16 sesi 1 jam dalam 4 minggu (4x/minggu) plus latihan mandiri harian. Kunci efektivitas adalah intensitas tinggi dan usaha maksimal, bukan jumlah repetisi.', 3, 10,
  2, 60, '1-2x/hari',
  'A', 'Ebersbach et al. Mov Disord 2010;25(12):1902-1908 (LSVT BIG RCT); Osborne et al. Parkinson Disease CPG, JNPT 2022', ARRAY['Parkinson', 'LSVT BIG', 'amplitude', 'neuro']::text[], null
),
-- Big Forward Step and Reach
(
  '53552abf-a236-3153-b44f-f48f92f33b49', 'big-forward-step-and-reach', 'Big Forward Step and Reach', 'Langkah Besar ke Depan dengan Julur Lengan', 'Latihan amplitudo langkah untuk penyakit Parkinson: melawan langkah kecil dan gerakan yang mengecil.', 'Step amplitude training for Parkinson''s disease, counteracting shortened steps and shrinking movements.',
  'Balance', 'Balance & Neuro', 'Intermediate', 'Motor control', 'Standing',
  'Tungkai, batang tubuh, koordinasi lengan-tungkai', ARRAY['Ruang bebas hambatan', 'Pegangan bila perlu']::text[], '1. Berdiri tegak dengan ruang bebas di depan.
2. Langkahkan satu kaki ke depan SEJAUH mungkin sambil menjulurkan lengan berlawanan ke depan-atas.
3. Tahan posisi selebar mungkin selama 2 detik.
4. Kembali ke posisi berdiri dan ulangi dengan kaki lainnya.
5. Hitung keras setiap repetisi dengan suara lantang.', '1. Stand tall with clear space ahead.
2. Step one foot forward AS FAR as possible while reaching the opposite arm forward and up.
3. Hold the widest position for 2 seconds.
4. Return to standing and repeat with the other leg.
5. Count each repetition out loud.',
  'Perlu pengawasan pada gangguan keseimbangan atau riwayat jatuh. Hentikan bila terjadi freezing yang berulang - gunakan isyarat visual/auditori.', 'Tambahkan tugas ganda (berhitung mundur, menyebut nama) saat gerakan sudah stabil, untuk melatih fungsi di dunia nyata.', 3, 10,
  2, 45, '1x/hari',
  'A', 'Ebersbach et al. Mov Disord 2010; Osborne et al. Parkinson Disease CPG, JNPT 2022;46(4):240-269', ARRAY['Parkinson', 'LSVT BIG', 'gait', 'neuro']::text[], null
),
-- Seated Trunk Rotation and Reach
(
  'a597c7ad-9d29-3d79-9657-bd5b1e9398ed', 'seated-trunk-rotation', 'Seated Trunk Rotation and Reach', 'Rotasi dan Julur Batang Tubuh Duduk', 'Latihan kontrol batang tubuh duduk untuk rehabilitasi stroke tahap awal dan kontrol postural.', 'Seated trunk control drill for early stroke rehabilitation and postural control.',
  'Core', 'Balance & Neuro', 'Beginner', 'Motor control', 'Sitting',
  'Otot batang tubuh, kontrol postural duduk', ARRAY['Kursi kokoh']::text[], '1. Duduk tegak di kursi kokoh dengan kedua kaki menapak lantai.
2. Julurkan satu lengan menyilang ke arah lutut berlawanan.
3. Kembali ke posisi tegak dan julurkan ke arah samping-atas berlawanan.
4. Jaga bokong tetap menempel kursi.
5. Ulangi 10 kali per arah, bergantian sisi.', '1. Sit tall in a sturdy chair with both feet flat on the floor.
2. Reach one arm across toward the opposite knee.
3. Return upright and reach up and out to the opposite side.
4. Keep the buttocks in contact with the chair.
5. Repeat 10 times per direction, alternating sides.',
  'Perlu pengawasan bila kontrol duduk belum stabil - gunakan kursi berlengan dan pendamping.', 'Progresi: jangkauan dalam basis penopang -> di luar basis penopang -> mengambil objek dari lantai -> di permukaan tidak stabil.', 2, 10,
  2, 30, '1-2x/hari',
  'B', 'Winstein et al. AHA/ASA Adult Stroke Rehabilitation and Recovery Guideline, Stroke 2016;47(6):e98-e169', ARRAY['stroke', 'trunk control', 'neuro', 'seated']::text[], null
),
-- Step Over Obstacle
(
  '3dcb4e38-e5ce-32f8-a09a-371fad030e66', 'step-over-obstacle', 'Step Over Obstacle', 'Melangkahi Rintangan', 'Latihan mengangkat kaki melewati rintangan untuk mencegah tersandung, penting pada lansia dan pasien neurologis.', 'Obstacle-clearance training to prevent trips, important for older adults and neurological patients.',
  'Balance', 'Balance & Neuro', 'Intermediate', 'Balance', 'Standing',
  'Fleksor pinggul, dorsofleksor pergelangan kaki, kontrol keseimbangan', ARRAY['Rintangan rendah 5-15 cm (buku, kerucut, gulungan handuk)']::text[], '1. Letakkan rintangan rendah (5-15 cm) di lantai; berdiri di dekat pegangan.
2. Melangkah melewati rintangan dengan mengangkat lutut cukup tinggi.
3. Berhenti sejenak dengan satu kaki di seberang untuk melatih kontrol.
4. Selesaikan langkah dan berbalik dengan hati-hati.
5. Ulangi 10 kali; tingkatkan tinggi rintangan bertahap.', '1. Place a low obstacle (5-15 cm) on the floor; stand near a rail.
2. Step over it, lifting the knee high enough to clear it.
3. Pause briefly with one foot across to train control.
4. Complete the step and turn carefully.
5. Repeat 10 times; raise the obstacle height gradually.',
  'Hanya dengan pengawasan pada risiko jatuh tinggi. Gunakan rintangan yang mudah terdorong (bukan benda keras) untuk keamanan.', 'Progresi: rintangan rendah -> lebih tinggi -> beberapa rintangan berturut-turut -> sambil membawa benda -> dengan tugas kognitif.', 3, 10,
  2, 45, '3x/minggu',
  'B', 'Sherrington et al. Br J Sports Med 2017 (exercise for falls prevention); Otago Exercise Programme', ARRAY['balance', 'falls prevention', 'gait', 'geriatric']::text[], null
),
-- Structured Walking Program
(
  'baee4323-5662-3b44-8531-a1f4fa30c052', 'walking-program', 'Structured Walking Program', 'Program Jalan Kaki Terstruktur', 'Program berjalan bertahap sebagai dasar aktivitas fisik pada hampir semua kondisi kronis.', 'Progressive walking program forming the base of physical activity across most chronic conditions.',
  'General', 'Cardio', 'Beginner', 'Aerobic', 'Standing',
  'Sistem kardiovaskular, otot tungkai', ARRAY['Sepatu yang nyaman']::text[], '1. Mulai dengan berjalan 10 menit dengan kecepatan nyaman.
2. Intensitas sedang: napas sedikit lebih cepat, masih dapat berbicara tetapi tidak dapat bernyanyi.
3. Tambahkan 2-5 menit per minggu sesuai toleransi.
4. Target: 30 menit per hari, 5 hari per minggu (total 150 menit/minggu).
5. Boleh dipecah menjadi sesi 10 menit; totalnya yang penting.', '1. Start with 10 minutes of walking at a comfortable pace.
2. Moderate intensity: breathing a little faster, able to talk but not sing.
3. Add 2-5 minutes per week as tolerated.
4. Target: 30 minutes a day, 5 days a week (150 minutes weekly).
5. It can be split into 10-minute bouts; the total is what matters.',
  'Hentikan dan cari pertolongan bila muncul nyeri dada, sesak napas berat, pusing, atau denyut jantung tidak teratur. Pada pasien jantung, ikuti batas denyut nadi yang ditentukan tim medis.', 'Naikkan durasi terlebih dahulu, baru kecepatan atau tanjakan. Gunakan penghitung langkah untuk motivasi; peningkatan 1000-2000 langkah/hari sudah bermakna.', 1, 1,
  0, 0, '5x/minggu',
  'A', 'WHO Guidelines on Physical Activity and Sedentary Behaviour 2020; ACSM''s Guidelines 11th ed.', ARRAY['aerobic', 'general health', 'cardio', 'walking']::text[], null
),
-- Diaphragmatic Breathing
(
  'cecd984e-1dae-3d33-8bb0-74a918e27dc1', 'diaphragmatic-breathing', 'Diaphragmatic Breathing', 'Pernapasan Diafragma', 'Latihan pernapasan dasar untuk efisiensi ventilasi, pengendalian sesak, dan relaksasi.', 'Foundational breathing exercise for ventilatory efficiency, breathlessness control and relaxation.',
  'Chest', 'Cardio', 'Beginner', 'Breathing', 'Supine',
  'Diafragma', ARRAY['Bantal']::text[], '1. Berbaring telentang dengan lutut ditekuk dan disangga bantal, atau duduk bersandar.
2. Letakkan satu tangan di dada dan satu di perut.
3. Tarik napas perlahan melalui hidung selama 3-4 detik sehingga tangan di PERUT yang naik, tangan di dada tetap diam.
4. Buang napas perlahan melalui mulut selama 4-6 detik.
5. Ulangi 10 kali; hentikan bila merasa pusing (hiperventilasi).', '1. Lie on your back with knees bent and supported, or sit reclined.
2. Place one hand on the chest and one on the abdomen.
3. Breathe in slowly through the nose over 3-4 seconds so the ABDOMINAL hand rises while the chest hand stays still.
4. Breathe out slowly through the mouth over 4-6 seconds.
5. Repeat 10 times; stop if you feel light-headed (hyperventilation).',
  'Hentikan bila pusing atau kesemutan di sekitar mulut/jari (tanda hiperventilasi). Pada PPOK berat, utamakan pursed lip breathing.', 'Progresi posisi: berbaring -> duduk -> berdiri -> saat berjalan. Latihan ini juga menurunkan aktivitas simpatis dan membantu manajemen nyeri kronis.', 3, 10,
  4, 30, '2-3x/hari',
  'B', 'Spruit et al. ATS/ERS Statement on Pulmonary Rehabilitation, Am J Respir Crit Care Med 2013;188(8):e13-e64', ARRAY['breathing', 'COPD', 'relaxation', 'pulmonary']::text[], null
),
-- Pursed Lip Breathing
(
  '339ac773-daba-3eac-bd99-4c96c19e79fd', 'pursed-lip-breathing', 'Pursed Lip Breathing', 'Pernapasan Bibir Mengerucut', 'Teknik pernapasan untuk mengurangi sesak napas dan mencegah kolaps jalan napas pada PPOK.', 'Breathing technique to reduce breathlessness and prevent airway collapse in COPD.',
  'Chest', 'Cardio', 'Beginner', 'Breathing', 'Sitting',
  'Kontrol pernapasan ekspirasi', '{}'::text[], '1. Duduk nyaman dengan bahu rileks.
2. Tarik napas melalui hidung selama 2 hitungan dengan mulut tertutup.
3. Kerucutkan bibir seperti hendak meniup lilin.
4. Buang napas perlahan melalui bibir yang mengerucut selama 4 hitungan (dua kali lebih lama dari menarik napas).
5. Gunakan teknik ini saat sesak, saat menaiki tangga, atau saat beraktivitas berat.', '1. Sit comfortably with relaxed shoulders.
2. Breathe in through the nose for 2 counts with the mouth closed.
3. Purse the lips as if about to blow out a candle.
4. Breathe out slowly through pursed lips for 4 counts (twice as long as the inhale).
5. Use this whenever breathless, when climbing stairs, or during exertion.',
  'Aman pada hampir semua kondisi. Bila sesak tidak membaik dengan teknik ini, cari pertolongan medis.', 'Latih saat istirahat sampai otomatis, lalu terapkan saat berjalan dan menaiki tangga. Kombinasikan dengan pacing aktivitas.', 3, 10,
  0, 30, 'Sesuai kebutuhan + 2x/hari latihan',
  'A', 'Spruit et al. ATS/ERS Statement on Pulmonary Rehabilitation, 2013; GOLD Report 2024', ARRAY['COPD', 'breathing', 'dyspnea', 'pulmonary']::text[], null
),
-- Active Cycle of Breathing Technique (ACBT)
(
  '1df9513b-bfad-351c-a97f-883c84b6a45c', 'active-cycle-breathing', 'Active Cycle of Breathing Technique (ACBT)', 'Siklus Aktif Teknik Pernapasan (ACBT)', 'Teknik pembersihan jalan napas mandiri untuk pasien dengan produksi dahak berlebih (PPOK, bronkiektasis, pasca operasi).', 'Self-directed airway clearance technique for patients with excess sputum (COPD, bronchiectasis, post-operative).',
  'Chest', 'Cardio', 'Intermediate', 'Breathing', 'Sitting',
  'Otot pernapasan, pembersihan jalan napas', ARRAY['Tisu/wadah dahak']::text[], '1. KONTROL NAPAS: bernapas tenang dengan diafragma selama 20-30 detik.
2. EKSPANSI TORAKS: tarik napas dalam 3-4 kali, tahan 2-3 detik di puncak, buang napas rileks.
3. Ulangi kontrol napas 20-30 detik.
4. HUFF: tarik napas sedang, lalu hembuskan cepat dengan mulut terbuka seperti mengembunkan kaca (bukan batuk keras).
5. Ulangi siklus 3-4 kali atau sampai dahak keluar; jangan sampai kelelahan.', '1. BREATHING CONTROL: breathe quietly with the diaphragm for 20-30 seconds.
2. THORACIC EXPANSION: take 3-4 deep breaths, hold 2-3 seconds at the top, relax out.
3. Repeat breathing control for 20-30 seconds.
4. HUFF: take a medium breath, then blow out fast with an open mouth as if fogging a mirror (not a hard cough).
5. Repeat the cycle 3-4 times or until sputum clears; do not exhaust yourself.',
  'Hentikan bila muncul batuk darah, nyeri dada, atau sesak memburuk. Hati-hati pada pasien dengan risiko pneumotoraks dan fraktur iga.', 'Lakukan sebelum makan dan sebelum tidur. Kombinasikan dengan posisi yang membantu drainase bila diinstruksikan fisioterapis.', 3, 4,
  3, 30, '2-3x/hari',
  'A', 'Spruit et al. ATS/ERS Statement 2013; McIlwaine et al. Eur Respir J 2017 (airway clearance)', ARRAY['COPD', 'airway clearance', 'breathing', 'bronchiectasis']::text[], null
),
-- Thoracic Expansion Exercise
(
  '22819741-be3d-3072-8904-8cbd17ccc349', 'thoracic-expansion-exercise', 'Thoracic Expansion Exercise', 'Latihan Ekspansi Dada', 'Latihan napas dalam untuk mencegah komplikasi paru setelah operasi dan meningkatkan ventilasi basal.', 'Deep breathing exercise to prevent post-operative pulmonary complications and improve basal ventilation.',
  'Chest', 'Cardio', 'Beginner', 'Breathing', 'Sitting',
  'Otot interkostal, diafragma', '{}'::text[], '1. Duduk tegak atau setengah berbaring dengan sandaran.
2. Letakkan kedua tangan di sisi bawah tulang rusuk.
3. Tarik napas dalam melalui hidung, rasakan tulang rusuk melebar ke samping ke arah tangan.
4. Tahan napas 2-3 detik di puncak.
5. Buang napas rileks. Ulangi 5 kali, istirahat, lalu ulangi 3 set.', '1. Sit upright or semi-reclined with support.
2. Place both hands on the lower ribs.
3. Breathe in deeply through the nose, feeling the ribs expand sideways into your hands.
4. Hold the breath 2-3 seconds at the top.
5. Breathe out relaxed. Repeat 5 times, rest, then complete 3 sets.',
  'Hentikan bila pusing. Setelah operasi perut/dada, sangga luka dengan bantal saat batuk.', 'Kombinasikan dengan mobilisasi dini (duduk di tepi tempat tidur, berjalan) yang lebih efektif mencegah komplikasi paru daripada latihan napas saja.', 3, 5,
  3, 30, 'Setiap 1-2 jam pasca operasi',
  'B', 'Spruit et al. ATS/ERS Statement 2013; Boden et al. BMJ 2018 (preoperative breathing exercise)', ARRAY['breathing', 'post-op', 'pulmonary']::text[], null
),
-- Marching in Place
(
  '8a9cf977-2618-3536-ae63-5d2862a52760', 'marching-in-place', 'Marching in Place', 'Jalan di Tempat', 'Latihan aerobik ringan yang dapat dilakukan di ruang terbatas, cocok untuk pemanasan dan rehabilitasi jantung-paru.', 'Low-load aerobic drill for confined spaces, suitable for warm-up and cardiopulmonary rehabilitation.',
  'General', 'Cardio', 'Beginner', 'Aerobic', 'Standing',
  'Fleksor pinggul, tungkai, sistem kardiovaskular', ARRAY['Kursi untuk pegangan']::text[], '1. Berdiri tegak di dekat kursi untuk pegangan bila perlu.
2. Angkat lutut bergantian setinggi nyaman, ayunkan lengan berlawanan.
3. Pertahankan irama tetap selama 1-3 menit.
4. Intensitas: masih dapat berbicara kalimat pendek (RPE 11-13 skala Borg 6-20).
5. Boleh dilakukan duduk bila berdiri tidak memungkinkan.', '1. Stand tall near a chair for support if needed.
2. Lift the knees alternately to a comfortable height, swinging the opposite arms.
3. Keep a steady rhythm for 1-3 minutes.
4. Intensity: still able to speak short sentences (RPE 11-13 on the Borg 6-20 scale).
5. It can be done seated if standing is not possible.',
  'Hentikan bila muncul nyeri dada, sesak berlebih, pusing, atau denyut jantung tidak teratur.', 'Naikkan durasi dari 1 menit ke 5 menit, lalu tinggi lutut dan kecepatan. Gunakan sebagai pemanasan sebelum latihan kekuatan.', 3, 1,
  120, 60, '3-5x/minggu',
  'B', 'ACSM''s Guidelines 11th ed.; Spruit et al. ATS/ERS Statement 2013', ARRAY['aerobic', 'cardiac rehab', 'COPD', 'warm-up']::text[], null
),
-- Unsupported Arm Raises
(
  '1bc90f41-93ba-33d0-a361-17204b1c4bf0', 'seated-arm-raises-unsupported', 'Unsupported Arm Raises', 'Angkat Lengan Tanpa Sangga', 'Latihan lengan tanpa penyangga untuk PPOK - menargetkan otot yang berperan ganda dalam pernapasan dan aktivitas sehari-hari.', 'Unsupported arm training for COPD - targeting muscles that double as accessory respiratory muscles and are used in daily tasks.',
  'Shoulder', 'Cardio', 'Beginner', 'Strength', 'Sitting',
  'Deltoid, otot bantu napas', ARRAY['Beban ringan 0,5-1 kg (opsional)']::text[], '1. Duduk tegak di kursi tanpa bersandar pada lengan kursi.
2. Angkat kedua lengan lurus ke depan setinggi bahu.
3. Tahan 2 detik, turunkan perlahan.
4. Gunakan pursed lip breathing: buang napas saat mengangkat.
5. Ulangi 10-15 kali; hentikan bila sesak mencapai 5-6 dari skala Borg 0-10.', '1. Sit tall in a chair without leaning on the armrests.
2. Raise both arms straight forward to shoulder height.
3. Hold 2 seconds, lower slowly.
4. Use pursed lip breathing: breathe out as you lift.
5. Repeat 10-15 times; stop if breathlessness reaches 5-6 on the Borg 0-10 scale.',
  'Hentikan bila sesak berat, pusing, atau saturasi oksigen turun di bawah batas yang ditentukan tim medis (umumnya < 88%).', 'Tambahkan beban 0,5 kg setelah 15 repetisi tanpa beban mudah. Latihan lengan tanpa sangga secara khusus direkomendasikan pada rehabilitasi paru.', 3, 12,
  2, 60, '3x/minggu',
  'A', 'Spruit et al. ATS/ERS Statement on Pulmonary Rehabilitation, Am J Respir Crit Care Med 2013', ARRAY['COPD', 'pulmonary rehab', 'arm training']::text[], null
),
-- Pelvic Floor Muscle Training - Slow Holds
(
  'd7855197-924e-3f0c-9b72-7eca8b302645', 'pelvic-floor-slow-contraction', 'Pelvic Floor Muscle Training - Slow Holds', 'Latihan Otot Dasar Panggul - Tahan Lama', 'Latihan penguatan otot dasar panggul (Kegel) - terapi lini pertama untuk inkontinensia urin stres.', 'Pelvic floor muscle training (Kegel) - first-line therapy for stress urinary incontinence.',
  'Pelvic floor', 'Women''s Health', 'Beginner', 'Strength', 'Sitting',
  'Levator ani, otot dasar panggul', '{}'::text[], '1. Duduk, berbaring, atau berdiri dengan nyaman; bernapas normal.
2. Kencangkan otot seperti menahan buang angin DAN menahan aliran urin secara bersamaan, dengan gerakan mengangkat ke dalam.
3. Perut, paha, dan bokong TIDAK boleh ikut mengencang, dan jangan menahan napas.
4. Tahan 6-10 detik, lalu rileks sepenuhnya selama 10 detik (fase rileks sama pentingnya).
5. Ulangi 8-12 kali per set, 3 set per hari, minimal 3 bulan.', '1. Sit, lie, or stand comfortably; breathe normally.
2. Squeeze as if stopping wind AND stopping the flow of urine at the same time, with an inward-lifting action.
3. The abdomen, thighs and buttocks must NOT tighten, and do not hold your breath.
4. Hold 6-10 seconds, then fully relax for 10 seconds (the relaxation phase matters equally).
5. Repeat 8-12 times per set, 3 sets per day, for at least 3 months.',
  'Jangan berlatih dengan menghentikan aliran urin saat berkemih secara rutin - dapat mengganggu pengosongan kandung kemih. Pada nyeri panggul dengan otot dasar panggul yang terlalu tegang, latihan relaksasi lebih tepat - konsultasikan dengan fisioterapis.', 'Naikkan durasi tahan 1 detik per minggu sampai 10 detik. Latih dalam berbagai posisi: berbaring -> duduk -> berdiri -> saat aktivitas. Hasil biasanya terlihat setelah 6-12 minggu latihan rutin.', 3, 10,
  8, 10, '3x/hari',
  'A', 'Dumoulin et al. Cochrane Database Syst Rev 2018;10:CD005654; NICE NG123 Urinary Incontinence 2019', ARRAY['pelvic floor', 'incontinence', 'women''s health', 'postpartum']::text[], null
),
-- Pelvic Floor Quick Flicks
(
  'b9e37d3e-daa3-3762-8bdd-3c86cfabf0a1', 'pelvic-floor-quick-flicks', 'Pelvic Floor Quick Flicks', 'Kontraksi Cepat Otot Dasar Panggul', 'Kontraksi cepat untuk melatih serat otot cepat yang dibutuhkan saat batuk, bersin, dan mengangkat beban.', 'Fast contractions to train the fast-twitch fibres needed during coughing, sneezing and lifting.',
  'Pelvic floor', 'Women''s Health', 'Beginner', 'Strength', 'Sitting',
  'Serat cepat otot dasar panggul', '{}'::text[], '1. Duduk atau berbaring dengan nyaman.
2. Kencangkan otot dasar panggul dengan cepat dan kuat.
3. Langsung lepaskan sepenuhnya.
4. Ulangi 10 kali berturut-turut dengan irama cepat.
5. Lakukan setelah set kontraksi lambat, 3 kali sehari.', '1. Sit or lie comfortably.
2. Tighten the pelvic floor quickly and strongly.
3. Release fully straight away.
4. Repeat 10 times in a row at a quick rhythm.
5. Do this after the slow-hold sets, 3 times daily.',
  'Sama dengan latihan tahan lama. Hentikan bila muncul nyeri panggul.', 'Terapkan sebagai "The Knack": kencangkan otot dasar panggul TEPAT SEBELUM batuk, bersin, atau mengangkat beban.', 3, 10,
  1, 2, '3x/hari',
  'A', 'Dumoulin et al. Cochrane 2018; Miller et al. J Am Geriatr Soc 1998 (The Knack)', ARRAY['pelvic floor', 'incontinence', 'women''s health']::text[], null
),
-- The Knack (Pre-Contraction)
(
  '3144a9cd-c6fc-35ed-8a81-8de9f12dc2c0', 'the-knack', 'The Knack (Pre-Contraction)', 'The Knack (Kontraksi Sebelum Batuk)', 'Keterampilan mengencangkan otot dasar panggul tepat sebelum aktivitas yang meningkatkan tekanan perut - mengurangi kebocoran urin segera.', 'The skill of contracting the pelvic floor just before an abdominal-pressure-raising activity - reduces leakage immediately.',
  'Pelvic floor', 'Women''s Health', 'Intermediate', 'Motor control', 'Standing',
  'Otot dasar panggul (koordinasi fungsional)', '{}'::text[], '1. Pastikan sudah mampu mengencangkan otot dasar panggul dengan benar.
2. Sesaat SEBELUM batuk, bersin, tertawa, atau mengangkat beban, kencangkan otot dasar panggul.
3. Pertahankan kontraksi selama aktivitas tersebut berlangsung.
4. Lepaskan setelah selesai.
5. Latih 10 kali sehari dengan simulasi batuk ringan sampai menjadi otomatis.', '1. Make sure you can contract the pelvic floor correctly first.
2. Just BEFORE coughing, sneezing, laughing or lifting, tighten the pelvic floor.
3. Hold the contraction through the activity.
4. Release afterwards.
5. Practise 10 times a day with a light simulated cough until it becomes automatic.',
  'Konsultasikan bila terdapat nyeri panggul kronis - kontraksi berlebihan dapat memperberat.', 'Terapkan pada aktivitas nyata: mengangkat belanjaan, menggendong anak, bangkit dari kursi. Efek dapat terasa dalam hitungan hari, berbeda dengan penguatan yang butuh berminggu-minggu.', 1, 10,
  3, 10, 'Setiap hari + saat aktivitas',
  'A', 'Miller et al. J Am Geriatr Soc 1998;46(7):870-874; Dumoulin et al. Cochrane 2018', ARRAY['pelvic floor', 'incontinence', 'functional', 'women''s health']::text[], null
),
-- Postpartum Core Connection Breathing
(
  '275375bc-0a4a-3932-a300-b6a529c828e5', 'postpartum-core-connection', 'Postpartum Core Connection Breathing', 'Pernapasan Koneksi Inti Pascamelahirkan', 'Latihan koordinasi napas dan otot inti untuk pemulihan pascamelahirkan, termasuk pada diastasis recti.', 'Breath and deep core coordination for postpartum recovery, including diastasis recti.',
  'Core', 'Women''s Health', 'Beginner', 'Motor control', 'Supine',
  'Diafragma, transversus abdominis, otot dasar panggul', ARRAY['Matras', 'Bantal']::text[], '1. Berbaring telentang dengan lutut ditekuk dan kepala disangga bantal.
2. Tarik napas melalui hidung, biarkan perut dan dasar panggul melebar/rileks.
3. Saat membuang napas, kencangkan otot dasar panggul ke atas sambil menarik perut bawah ke dalam dengan lembut.
4. Tahan 3-5 detik sambil terus membuang napas perlahan.
5. Rileks sepenuhnya saat menarik napas berikutnya. Ulangi 10 kali.', '1. Lie on your back with knees bent and head supported.
2. Breathe in through the nose, letting the abdomen and pelvic floor widen and relax.
3. As you breathe out, lift the pelvic floor while gently drawing in the lower abdomen.
4. Hold 3-5 seconds while continuing to exhale slowly.
5. Fully relax on the next inhale. Repeat 10 times.',
  'Tunda latihan bila masih ada perdarahan berat, nyeri hebat, atau belum mendapat izin dari dokter kandungan (umumnya evaluasi 6 minggu pascamelahirkan). Setelah operasi caesar, ikuti panduan dokter.', 'Setelah koordinasi terbentuk, tambahkan gerakan anggota gerak (heel slide, dead bug) sambil mempertahankan koneksi napas. Hindari sit-up dan plank penuh pada diastasis recti yang belum membaik.', 3, 10,
  4, 30, '1-2x/hari',
  'B', 'ACOG Committee Opinion 804: Physical Activity and Exercise During Pregnancy and the Postpartum Period (2020); Dumoulin et al. Cochrane 2018', ARRAY['postpartum', 'core', 'pelvic floor', 'diastasis recti', 'women''s health']::text[], null
),
-- Whole-Body Resistance Circuit
(
  '6652b4f0-776c-3bee-a042-0f09b34b66ce', 'resistance-training-major-muscle-groups', 'Whole-Body Resistance Circuit', 'Sirkuit Latihan Beban Seluruh Tubuh', 'Sirkuit latihan beban seluruh tubuh sesuai pedoman ACSM: 2-3 sesi per minggu untuk semua kelompok otot besar.', 'Whole-body resistance circuit per ACSM guidance: 2-3 sessions weekly covering all major muscle groups.',
  'General', 'Strength & Conditioning', 'Intermediate', 'Strength', 'Standing',
  'Seluruh kelompok otot besar', ARRAY['Karet elastis atau dumbel', 'Kursi']::text[], '1. Lakukan pemanasan 5 menit (jalan di tempat atau sepeda ringan).
2. Kerjakan 6-8 latihan yang mencakup: dorong (push-up dinding), tarik (row karet), tungkai (sit to stand), engsel pinggul (hip hinge), inti (plank/bird dog), betis (heel raise).
3. Lakukan 2-3 set 8-12 repetisi untuk tiap latihan dengan beban yang membuat 2-3 repetisi terakhir terasa berat.
4. Istirahat 60-90 detik antar set.
5. Naikkan beban sekitar 5% saat 12 repetisi dapat diselesaikan dengan mudah pada semua set.', '1. Warm up for 5 minutes (marching or light cycling).
2. Work through 6-8 exercises covering: push (wall push-up), pull (band row), legs (sit to stand), hip hinge, core (plank/bird dog), calves (heel raise).
3. Perform 2-3 sets of 8-12 repetitions each, with a load that makes the last 2-3 repetitions hard.
4. Rest 60-90 seconds between sets.
5. Increase load by about 5% once 12 repetitions become easy on all sets.',
  'Konsultasikan sebelum memulai bila ada penyakit jantung tidak terkontrol, hipertensi berat (>180/110), atau retinopati diabetik proliferatif. Hindari menahan napas (manuver Valsava).', 'Sisakan minimal 48 jam antara sesi untuk kelompok otot yang sama. Beban progresif adalah kunci - repetisi tanpa penambahan beban akan berhenti memberi manfaat.', 3, 10,
  0, 75, '2-3x/minggu',
  'A', 'ACSM''s Guidelines for Exercise Testing and Prescription, 11th ed.; WHO Guidelines on Physical Activity 2020', ARRAY['general health', 'strength', 'ACSM', 'conditioning']::text[], null
),
-- Progressive Loaded Squat (Bone Loading)
(
  'e7fc486f-4f7c-3562-902f-e02a215fea09', 'loaded-squat-osteoporosis', 'Progressive Loaded Squat (Bone Loading)', 'Squat dengan Beban Progresif (Pembebanan Tulang)', 'Latihan beban tinggi terawasi untuk osteopenia/osteoporosis, mengikuti prinsip protokol HiRIT (LIFTMOR).', 'Supervised heavy resistance training for osteopenia/osteoporosis, following the HiRIT (LIFTMOR) principles.',
  'General', 'Strength & Conditioning', 'Advanced', 'Strength', 'Standing',
  'Quadriceps, gluteus, ekstensor batang tubuh, tulang belakang dan panggul', ARRAY['Barbel atau dumbel', 'Pengawasan terlatih']::text[], '1. WAJIB diawali fase pembelajaran teknik 4-6 minggu dengan beban ringan di bawah pengawasan terlatih.
2. Berdiri dengan kaki selebar bahu, beban di punggung atas (back squat) atau dipegang di depan.
3. Turunkan panggul ke belakang dan bawah, jaga punggung netral dan lutut segaris jari kaki.
4. Turun sampai paha mendekati sejajar lantai atau sedalam yang aman, lalu berdiri kembali.
5. Dosis protokol: 5 set x 5 repetisi pada beban berat (>80-85% 1RM), 2x/minggu.', '1. A 4-6 week technique learning phase with light loads under qualified supervision is MANDATORY.
2. Stand shoulder-width apart with the load on the upper back (back squat) or held in front.
3. Lower the hips back and down, keeping a neutral spine and knees tracking over the toes.
4. Descend until the thighs approach parallel or as deep as is safe, then stand back up.
5. Protocol dose: 5 sets of 5 repetitions at a heavy load (>80-85% 1RM), twice weekly.',
  'HANYA dengan pengawasan profesional terlatih. Hindari pada fraktur vertebra baru, osteoporosis berat dengan riwayat fraktur fragilitas multipel tanpa izin dokter, dan hipertensi tidak terkontrol. Hindari fleksi tulang belakang dengan beban dan gerakan memutar berbeban.', 'Protokol LIFTMOR menunjukkan peningkatan kepadatan tulang leher femur dan tulang belakang tanpa fraktur pada 101 peserta selama 8 bulan - kuncinya adalah beban tinggi dengan teknik terawasi, bukan repetisi banyak dengan beban ringan.', 5, 5,
  0, 120, '2x/minggu',
  'A', 'Watson et al. J Bone Miner Res 2018;33(2):211-220 (LIFTMOR RCT)', ARRAY['osteoporosis', 'bone health', 'strength', 'advanced', 'supervised']::text[], null
),
-- Heel Drop (Bone Impact Loading)
(
  'eb813a2c-4535-3011-8c78-8edb84adc1ff', 'heel-drop-impact-bone', 'Heel Drop (Bone Impact Loading)', 'Hentakan Tumit (Pembebanan Impak Tulang)', 'Pembebanan impak sederhana untuk merangsang pembentukan tulang, komponen program kesehatan tulang.', 'Simple impact loading to stimulate bone formation, a component of bone health programs.',
  'General', 'Strength & Conditioning', 'Intermediate', 'Strength', 'Standing',
  'Pembebanan impak pada tulang panggul dan tulang belakang', ARRAY['Pegangan']::text[], '1. Berdiri tegak dengan kaki selebar pinggul, pegang meja untuk keseimbangan.
2. Naik ke posisi jinjit setinggi mungkin.
3. Jatuhkan tumit ke lantai dengan hentakan terkontrol (tidak melompat).
4. Tegakkan badan; hentakan harus terasa sampai panggul.
5. Ulangi 10-20 kali, 1-2 set.', '1. Stand tall, feet hip-width apart, holding a table for balance.
2. Rise up onto the toes as high as possible.
3. Drop the heels to the floor with a controlled thump (not a jump).
4. Keep the trunk upright; the impact should be felt up to the hips.
5. Repeat 10-20 times, 1-2 sets.',
  'Hindari pada fraktur vertebra baru, nyeri punggung akut, penggantian sendi panggul/lutut yang belum stabil, dan gangguan keseimbangan berat. Konsultasikan pada osteoporosis berat.', 'Naikkan jumlah hentakan dari 10 ke 50 per hari secara bertahap. Beban impak singkat dan sering lebih efektif untuk tulang daripada satu sesi panjang.', 2, 15,
  0, 60, '4-5x/minggu',
  'B', 'Watson et al. J Bone Miner Res 2018 (LIFTMOR); Zhao et al. Osteoporos Int 2015 (impact exercise meta-analysis)', ARRAY['osteoporosis', 'bone health', 'impact']::text[], null
)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  name_id = excluded.name_id,
  description = excluded.description,
  description_en = excluded.description_en,
  body_region = excluded.body_region,
  category = excluded.category,
  difficulty = excluded.difficulty,
  movement_type = excluded.movement_type,
  starting_position = excluded.starting_position,
  target_muscles = excluded.target_muscles,
  equipment_needed = excluded.equipment_needed,
  instructions = excluded.instructions,
  instructions_en = excluded.instructions_en,
  contraindications = excluded.contraindications,
  progression_tips = excluded.progression_tips,
  default_sets = excluded.default_sets,
  default_reps = excluded.default_reps,
  default_hold_seconds = excluded.default_hold_seconds,
  default_rest_seconds = excluded.default_rest_seconds,
  default_frequency = excluded.default_frequency,
  evidence_level = excluded.evidence_level,
  evidence_source = excluded.evidence_source,
  tags = excluded.tags,
  updated_at = now();

-- ----------------------------------------------------- protocol templates
insert into public.exercise_programs (
  id, slug, name, description, description_en, indication, phase, body_region, clinical_goal,
  expected_duration, frequency, difficulty, precautions, progression_criteria, patient_education,
  evidence_level, evidence_source, tags, exercises, status, clinic_id, ai_generated
) values
-- Rehabilitasi ACL - Fase 1: Proteksi & Pemulihan Ekstensi (0-4 Minggu)
(
  '74beb4d4-204b-3117-ad17-56a66ffd8566', 'acl-reconstruction-phase-1', 'Rehabilitasi ACL - Fase 1: Proteksi & Pemulihan Ekstensi (0-4 Minggu)', 'Fase awal pasca rekonstruksi ACL. Prioritas: menghilangkan bengkak, mengembalikan ekstensi lutut penuh, dan mengaktifkan kembali quadriceps. Ekstensi penuh yang tertunda adalah komplikasi tersering dan paling sulit dikoreksi kemudian.', 'Early phase after ACL reconstruction. Priorities: control swelling, restore full knee extension, and reactivate the quadriceps. A delayed extension deficit is the most common and hardest-to-correct complication.',
  'Pasca rekonstruksi ligamen cruciatum anterior (ACL)', 'Fase 1 (0-4 minggu pasca operasi)', 'Knee', 'Ekstensi lutut 0 derajat penuh, fleksi minimal 90-110 derajat, quadriceps aktif tanpa extension lag, bengkak minimal',
  '4 minggu', '2-3x/hari', 'Beginner', 'Ikuti batasan beban tumpu dan penggunaan brace dari dokter bedah. Hentikan latihan dan hubungi klinik bila lutut bengkak mendadak, demam, kemerahan pada luka, atau nyeri betis satu sisi (kemungkinan trombosis vena dalam). Hindari open kinetic chain knee extension 0-45 derajat pada 12 minggu pertama.',
  'Naik ke Fase 2 bila: ekstensi 0 derajat tercapai, fleksi >= 110 derajat, straight leg raise tanpa extension lag, efusi minimal, dan pola jalan normal tanpa alat bantu.', 'Ekstensi penuh lebih penting daripada fleksi pada fase ini. Elevasi tungkai dan kompres dingin 15-20 menit setelah latihan untuk mengendalikan bengkak. Nyeri ringan wajar; nyeri yang meningkat tajam berarti dosis terlalu tinggi.', 'A',
  'Adams et al. JOSPT 2012;42(7):601-614; Logerstedt et al. Knee Ligament Sprain CPG, JOSPT 2017;47(11):A1-A47; Delaware-Oslo ACL Cohort', ARRAY['ACL', 'post-op', 'knee', 'phase 1']::text[], '[{"id":"db85f8da-5c7a-3702-b361-0b1f4fb071cf","slug":"ankle-pumps","name":"Ankle Pumps","name_id":"Pompa Pergelangan Kaki","sets":3,"reps":20,"repetitions":20,"hold_duration":2,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Lakukan setiap jam saat terjaga pada minggu pertama untuk sirkulasi."},{"id":"1f312628-fe17-35a3-8a27-e200c26b918c","slug":"quad-set","name":"Quadriceps Setting (Quad Set)","name_id":"Kontraksi Otot Paha Depan (Quad Set)","sets":3,"reps":12,"repetitions":12,"hold_duration":8,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Prioritas utama: pastikan otot paha depan benar-benar mengeras."},{"id":"800994ed-8763-3b2c-b654-0b79e593e20e","slug":"prone-knee-hang","name":"Prone Knee Hang (Extension Stretch)","name_id":"Gantung Lutut Tengkurap (Peregangan Ekstensi)","sets":2,"reps":1,"repetitions":1,"hold_duration":300,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Target ekstensi 0 derajat; otot harus rileks total."},{"id":"7078c397-1ff1-397f-9045-213ed8a239f4","slug":"heel-slide","name":"Heel Slide (Knee Flexion AROM)","name_id":"Geser Tumit (Lingkup Gerak Lutut)","sets":3,"reps":12,"repetitions":12,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Catat sudut fleksi yang dicapai setiap minggu."},{"id":"c16526d8-b995-3a80-97a1-87eaf63ff3a0","slug":"patellar-mobilization","name":"Patellar Mobilisation (Self)","name_id":"Mobilisasi Tempurung Lutut Mandiri","sets":1,"reps":4,"repetitions":4,"hold_duration":20,"rest_between_sets":10,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Lakukan sebelum latihan lingkup gerak."},{"id":"2e20c63e-394b-30fa-ad40-64c8c46f0dea","slug":"straight-leg-raise","name":"Straight Leg Raise","name_id":"Angkat Tungkai Lurus","sets":3,"reps":12,"repetitions":12,"hold_duration":3,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Hanya bila quad set sudah kuat dan tidak ada extension lag."},{"id":"2de5746b-285e-3552-b9ab-2fadf90bdbd8","slug":"short-arc-quad","name":"Short Arc Quad","name_id":"Short Arc Quad (Luruskan Lutut Setengah)","sets":3,"reps":15,"repetitions":15,"hold_duration":4,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Beban sendi rendah, aman pada fase awal."}]'::jsonb, 'Active', null, false
),
-- Rehabilitasi ACL - Fase 2: Penguatan Progresif (4-12 Minggu)
(
  'cc50df10-9908-3e30-a3ae-e301c97a6527', 'acl-reconstruction-phase-2', 'Rehabilitasi ACL - Fase 2: Penguatan Progresif (4-12 Minggu)', 'Fase penguatan pasca rekonstruksi ACL dengan latihan menumpu berat badan dan kontrol neuromuskular. Target utama adalah menutup defisit kekuatan quadriceps antar sisi.', 'Strengthening phase after ACL reconstruction using weight-bearing and neuromuscular control exercise. The main target is closing the between-limb quadriceps strength deficit.',
  'Pasca rekonstruksi ACL, fase penguatan', 'Fase 2 (4-12 minggu pasca operasi)', 'Knee', 'Limb Symmetry Index kekuatan quadriceps >= 80%, pola jalan dan naik-turun tangga normal, kontrol lutut baik saat satu kaki',
  '8 minggu', '3-4x/minggu', 'Intermediate', 'Hindari gerakan memutar dan pivot mendadak. Hindari open kinetic chain knee extension pada rentang 0-45 derajat sampai 12 minggu. Bengkak yang bertambah setelah latihan adalah tanda beban terlalu tinggi.',
  'Naik ke fase lanjut bila: kekuatan quadriceps >= 80% sisi sehat, tidak ada efusi, single leg squat terkontrol tanpa lutut jatuh ke dalam, dan hop test dimulai atas izin klinisi.', 'Kembali ke olahraga tidak ditentukan oleh waktu saja tetapi oleh kriteria kekuatan dan kontrol. Menunda kembali bertanding sampai minimal 9 bulan menurunkan risiko cedera ulang secara bermakna.', 'A',
  'Logerstedt et al. JOSPT 2017; Grindem et al. Br J Sports Med 2016;50(13):804-808 (Delaware-Oslo); Adams et al. JOSPT 2012', ARRAY['ACL', 'post-op', 'knee', 'phase 2', 'strength']::text[], '[{"id":"c580be70-0ff9-33d2-b41d-67498a9ba363","slug":"stationary-cycling","name":"Stationary Cycling","name_id":"Sepeda Statis","sets":1,"reps":1,"repetitions":1,"hold_duration":0,"rest_between_sets":0,"prepare_time":5,"work_time":600,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Pemanasan 10 menit dengan tahanan ringan."},{"id":"310df6b5-3d32-3f28-bd36-b9d8cce7af28","slug":"chair-squat","name":"Chair Squat (Sit-Back Squat)","name_id":"Squat ke Kursi","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Berat merata pada kedua kaki; gunakan cermin untuk umpan balik."},{"id":"4b76caf1-4e09-38ff-ba7c-79e90ee74b9f","slug":"terminal-knee-extension-band","name":"Terminal Knee Extension with Band","name_id":"Ekstensi Lutut Akhir dengan Karet Elastis","sets":3,"reps":15,"repetitions":15,"hold_duration":3,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Fokus pada ekstensi penuh dengan kontraksi quadriceps kuat."},{"id":"7838d23c-140d-3267-a85e-91ceb10e9579","slug":"step-up","name":"Step Up","name_id":"Naik Tangga (Step Up)","sets":3,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Mulai step 10 cm, naikkan bertahap."},{"id":"c2f149f2-f58b-3135-a06b-276a1a6a1a47","slug":"bridging","name":"Bridging (Glute Bridge)","name_id":"Angkat Pinggul (Bridging)","sets":3,"reps":12,"repetitions":12,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Penguatan gluteus untuk mengurangi beban pada lutut."},{"id":"35f87135-1da6-36d1-94ca-448a6300fe35","slug":"clamshell","name":"Clamshell","name_id":"Clamshell (Buka Lutut Menyamping)","sets":3,"reps":15,"repetitions":15,"hold_duration":3,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Kontrol panggul mencegah lutut jatuh ke dalam."},{"id":"9ce4f900-f155-3039-aec5-8f3db2c57e44","slug":"single-leg-stance","name":"Single-Leg Stance","name_id":"Berdiri Satu Kaki","sets":3,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Progresi ke permukaan busa bila stabil."},{"id":"7ee694e0-020a-316e-b056-9fb0c90a5782","slug":"hamstring-curl-prone","name":"Prone Hamstring Curl","name_id":"Curl Hamstring Tengkurap","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Bila graft hamstring, mulai setelah 6 minggu sesuai izin dokter bedah."}]'::jsonb, 'Active', null, false
),
-- Osteoartritis Lutut - Latihan Neuromuskular & Kekuatan
(
  '7554c38d-f2e8-35b1-bb5c-6fb7dc3d16d4', 'knee-osteoarthritis-neuromuscular', 'Osteoartritis Lutut - Latihan Neuromuskular & Kekuatan', 'Program berbasis pendekatan neuromuskular (NEMEX/GLA:D) untuk osteoartritis lutut: latihan terawasi 2x seminggu selama 6-8 minggu yang menargetkan kontrol sendi, kekuatan, dan kepercayaan diri bergerak.', 'Neuromuscular exercise program (NEMEX/GLA:D approach) for knee osteoarthritis: supervised sessions twice weekly for 6-8 weeks targeting joint control, strength and movement confidence.',
  'Osteoartritis lutut ringan hingga berat (termasuk yang menunggu operasi)', 'Program inti 6-8 minggu, dilanjutkan pemeliharaan', 'Knee', 'Mengurangi nyeri, meningkatkan kekuatan tungkai dan kualitas gerak fungsional (naik tangga, bangkit dari kursi, berjalan)',
  '6-8 minggu', '2-3x/minggu', 'Beginner', 'Nyeri sampai 5/10 selama latihan dapat diterima dan tidak berbahaya; nyeri harus kembali ke tingkat semula dalam 24 jam. Bila nyeri menetap lebih dari sehari, turunkan beban satu tingkat. Hentikan bila lutut mengunci atau memberi rasa mau jatuh (giving way).',
  'Naikkan beban/kedalaman gerakan bila kualitas gerak tetap baik selama 2 sesi berturut-turut dan nyeri tidak meningkat lebih dari 24 jam.', 'Osteoartritis bukan alasan untuk berhenti bergerak - latihan adalah terapi lini pertama dan tidak merusak sendi. Manfaat mulai terasa setelah 4-6 minggu dan hilang bila latihan dihentikan, sehingga pemeliharaan jangka panjang penting.', 'A',
  'Skou & Roos BMC Musculoskelet Disord 2017;18:72 (GLA:D); Fransen et al. Cochrane 2015;1:CD004376; Ageberg et al. BMC Musculoskelet Disord 2010 (NEMEX)', ARRAY['knee OA', 'GLA:D', 'NEMEX', 'neuromuscular']::text[], '[{"id":"c580be70-0ff9-33d2-b41d-67498a9ba363","slug":"stationary-cycling","name":"Stationary Cycling","name_id":"Sepeda Statis","sets":1,"reps":1,"repetitions":1,"hold_duration":0,"rest_between_sets":0,"prepare_time":5,"work_time":600,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Pemanasan 10 menit intensitas sedang."},{"id":"6659ecf4-e7c7-32ac-b8e3-1d1a3f6f5f17","slug":"sit-to-stand","name":"Sit to Stand","name_id":"Duduk ke Berdiri","sets":3,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Tanpa bantuan tangan bila mampu; turunkan tinggi kursi sebagai progresi."},{"id":"310df6b5-3d32-3f28-bd36-b9d8cce7af28","slug":"chair-squat","name":"Chair Squat (Sit-Back Squat)","name_id":"Squat ke Kursi","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Perhatikan lutut segaris jari kaki kedua."},{"id":"7838d23c-140d-3267-a85e-91ceb10e9579","slug":"step-up","name":"Step Up","name_id":"Naik Tangga (Step Up)","sets":3,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Kontrol pelan saat turun."},{"id":"c2f149f2-f58b-3135-a06b-276a1a6a1a47","slug":"bridging","name":"Bridging (Glute Bridge)","name_id":"Angkat Pinggul (Bridging)","sets":3,"reps":12,"repetitions":12,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Penguatan gluteus mengurangi beban lutut."},{"id":"3423a649-246b-3c07-8983-1847afb3e571","slug":"side-lying-hip-abduction","name":"Side-Lying Hip Abduction","name_id":"Angkat Tungkai Menyamping","sets":3,"reps":15,"repetitions":15,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Tambahkan beban pergelangan kaki sebagai progresi."},{"id":"9ce4f900-f155-3039-aec5-8f3db2c57e44","slug":"single-leg-stance","name":"Single-Leg Stance","name_id":"Berdiri Satu Kaki","sets":3,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Latihan kontrol keseimbangan dan kepercayaan diri."},{"id":"4f4e6fce-0cc8-34ce-929f-a64d2e068be1","slug":"double-leg-heel-raise","name":"Double-Leg Heel Raise","name_id":"Jinjit Dua Kaki","sets":3,"reps":15,"repetitions":15,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Penguatan betis untuk stabilitas berjalan."},{"id":"c96818e9-13c1-3492-adeb-ad5219c42a25","slug":"calf-stretch-gastrocnemius","name":"Calf Stretch (Gastrocnemius)","name_id":"Peregangan Betis (Gastrocnemius)","sets":2,"reps":1,"repetitions":1,"hold_duration":40,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Pendinginan."}]'::jsonb, 'Active', null, false
),
-- Nyeri Patellofemoral (Nyeri Lutut Depan)
(
  'eabe5c16-78b5-30c3-8692-97519deac488', 'patellofemoral-pain', 'Nyeri Patellofemoral (Nyeri Lutut Depan)', 'Program berbasis pedoman JOSPT 2019: latihan gabungan yang menargetkan otot pinggul posterolateral DAN otot lutut, terbukti lebih baik daripada latihan lutut saja.', 'JOSPT 2019 guideline-based program: combined exercise targeting the posterolateral hip AND knee musculature, shown superior to knee-targeted exercise alone.',
  'Nyeri patellofemoral / anterior knee pain / runner''s knee', 'Program 6-12 minggu', 'Knee', 'Mengurangi nyeri saat jongkok, naik-turun tangga, duduk lama, dan berlari',
  '6-12 minggu', '3x/minggu', 'Beginner', 'Batasi kedalaman jongkok pada rentang yang bebas nyeri (sering 0-45 derajat pada awal). Nyeri selama latihan sebaiknya <= 3/10 dan tidak meningkat keesokan harinya. Hindari lompat dan lari menurun pada fase awal.',
  'Perluas rentang gerak jongkok dan tambahkan latihan satu kaki bila nyeri terkontrol selama 1-2 minggu. Kembali berlari bertahap setelah step down 20 cm terkontrol tanpa nyeri.', 'Nyeri patellofemoral umumnya membaik dengan latihan, bukan dengan istirahat total. Perbaikan biasanya butuh 6-12 minggu. Kepatuhan pada dosis latihan adalah faktor keberhasilan terbesar.', 'A',
  'Willy et al. Patellofemoral Pain CPG, JOSPT 2019;49(9):CPG1-CPG95; Collins et al. Br J Sports Med 2018 (consensus)', ARRAY['PFP', 'knee', 'running', 'anterior knee pain']::text[], '[{"id":"35f87135-1da6-36d1-94ca-448a6300fe35","slug":"clamshell","name":"Clamshell","name_id":"Clamshell (Buka Lutut Menyamping)","sets":3,"reps":15,"repetitions":15,"hold_duration":3,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Latihan pinggul posterolateral - komponen wajib menurut CPG."},{"id":"3423a649-246b-3c07-8983-1847afb3e571","slug":"side-lying-hip-abduction","name":"Side-Lying Hip Abduction","name_id":"Angkat Tungkai Menyamping","sets":3,"reps":15,"repetitions":15,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Naikkan beban pergelangan kaki bertahap."},{"id":"3e2ec358-a377-3edb-ab27-9ef80d96cfa5","slug":"lateral-band-walk","name":"Lateral Band Walk","name_id":"Jalan Menyamping dengan Karet Elastis","sets":3,"reps":12,"repetitions":12,"hold_duration":0,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Jaga posisi setengah jongkok sepanjang gerakan."},{"id":"a75dab45-f5c5-34a7-8bea-3d1336e2c023","slug":"hip-hitch","name":"Hip Hitch (Pelvic Drop)","name_id":"Hip Hitch (Angkat Panggul Satu Sisi)","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Kontrol panggul saat menumpu satu kaki."},{"id":"2de5746b-285e-3552-b9ab-2fadf90bdbd8","slug":"short-arc-quad","name":"Short Arc Quad","name_id":"Short Arc Quad (Luruskan Lutut Setengah)","sets":3,"reps":15,"repetitions":15,"hold_duration":4,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Beban patellofemoral rendah - aman pada fase nyeri."},{"id":"cce63300-4661-3e35-9d50-447f07980cd6","slug":"wall-squat-slide","name":"Wall Squat (Slide)","name_id":"Squat Dinding","sets":3,"reps":12,"repetitions":12,"hold_duration":4,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Batasi kedalaman pada rentang bebas nyeri."},{"id":"d75efc70-179c-316e-802b-6d0ffeae6cbe","slug":"step-down-eccentric","name":"Eccentric Step Down","name_id":"Turun Tangga Terkontrol (Eksentrik)","sets":3,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Mulai dari step 5-10 cm; hanya bila nyeri terkontrol."},{"id":"c96818e9-13c1-3492-adeb-ad5219c42a25","slug":"calf-stretch-gastrocnemius","name":"Calf Stretch (Gastrocnemius)","name_id":"Peregangan Betis (Gastrocnemius)","sets":2,"reps":1,"repetitions":1,"hold_duration":40,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Dorsofleksi terbatas meningkatkan beban patellofemoral."}]'::jsonb, 'Active', null, false
),
-- Tendinopati Patella (Jumper's Knee)
(
  '3be2a644-c3af-392a-8649-750bbee34b7a', 'patellar-tendinopathy', 'Tendinopati Patella (Jumper''s Knee)', 'Program pembebanan tendon bertahap: isometrik untuk analgesia, dilanjutkan heavy slow resistance untuk remodeling tendon.', 'Progressive tendon loading program: isometrics for analgesia followed by heavy slow resistance for tendon remodelling.',
  'Tendinopati tendon patella (nyeri tepat di bawah tempurung lutut saat melompat/jongkok)', 'Fase pembebanan 12 minggu', 'Knee', 'Mengurangi nyeri tendon, mengembalikan kapasitas menahan beban lompat dan jongkok',
  '12 minggu', 'Isometrik harian; latihan beban 3x/minggu', 'Intermediate', 'Nyeri selama latihan <= 4/10 dan harus kembali ke tingkat semula dalam 24 jam. Hindari latihan plyometrik/lompat sampai fase akhir. Hentikan bila nyeri pagi hari memburuk secara progresif.',
  'Naik ke beban lebih berat bila nyeri saat single leg decline squat menurun dan tidak ada peningkatan nyeri 24 jam. Kembali berolahraga bertahap setelah 8-12 minggu pembebanan konsisten.', 'Tendon membutuhkan beban untuk sembuh - istirahat total justru memperlemah tendon. Perbaikan lambat (bulan, bukan minggu) dan sangat bergantung pada konsistensi.', 'A',
  'Rio et al. Br J Sports Med 2015;49(19):1277-1283; Kongsgaard et al. Scand J Med Sci Sports 2009;19(6):790-802 (heavy slow resistance)', ARRAY['patellar tendinopathy', 'jumper''s knee', 'tendon loading']::text[], '[{"id":"7c78edd9-613d-3add-98bd-df116681c17a","slug":"spanish-squat","name":"Spanish Squat (Band-Supported Isometric)","name_id":"Spanish Squat (Isometrik dengan Karet)","sets":5,"reps":1,"repetitions":1,"hold_duration":45,"rest_between_sets":90,"prepare_time":5,"work_time":45,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Isometrik analgesik - lakukan setiap hari, juga sebelum olahraga."},{"id":"38df3ddb-43fd-373d-878a-e8347db0347e","slug":"wall-sit","name":"Wall Sit (Isometric Squat)","name_id":"Duduk Dinding (Squat Isometrik)","sets":5,"reps":1,"repetitions":1,"hold_duration":45,"rest_between_sets":60,"prepare_time":5,"work_time":45,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Alternatif bila tidak ada karet elastis tebal."},{"id":"310df6b5-3d32-3f28-bd36-b9d8cce7af28","slug":"chair-squat","name":"Chair Squat (Sit-Back Squat)","name_id":"Squat ke Kursi","sets":4,"reps":8,"repetitions":8,"hold_duration":3,"rest_between_sets":120,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Heavy slow resistance: 3 detik turun, 3 detik naik, beban berat."},{"id":"d75efc70-179c-316e-802b-6d0ffeae6cbe","slug":"step-down-eccentric","name":"Eccentric Step Down","name_id":"Turun Tangga Terkontrol (Eksentrik)","sets":3,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":90,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Kontrol eksentrik 4 detik."},{"id":"b7c83c49-0dc3-3d01-8863-15d8a5c2261b","slug":"single-leg-heel-raise","name":"Single-Leg Heel Raise","name_id":"Jinjit Satu Kaki","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Rantai posterior mendukung penyerapan beban."},{"id":"c2f149f2-f58b-3135-a06b-276a1a6a1a47","slug":"bridging","name":"Bridging (Glute Bridge)","name_id":"Angkat Pinggul (Bridging)","sets":3,"reps":12,"repetitions":12,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Penguatan gluteus mengurangi beban pada tendon patella."}]'::jsonb, 'Active', null, false
),
-- Pasca Operasi Ganti Sendi Lutut - Fase Awal (0-6 Minggu)
(
  '93853113-96b7-3f4d-84fa-13944bb95581', 'total-knee-arthroplasty-early', 'Pasca Operasi Ganti Sendi Lutut - Fase Awal (0-6 Minggu)', 'Program pemulihan awal setelah total knee arthroplasty: mengembalikan lingkup gerak, mengaktifkan quadriceps, dan mengembalikan kemandirian berjalan.', 'Early recovery after total knee arthroplasty: restore range of motion, reactivate the quadriceps, and regain walking independence.',
  'Pasca total knee arthroplasty (penggantian sendi lutut)', 'Fase 1 (0-6 minggu pasca operasi)', 'Knee', 'Fleksi lutut >= 110 derajat, ekstensi 0 derajat, berjalan mandiri dengan atau tanpa alat bantu, naik-turun tangga aman',
  '6 minggu', '2-3x/hari', 'Beginner', 'Hubungi klinik bila muncul demam, kemerahan/keluar cairan dari luka, nyeri betis satu sisi dengan bengkak (kemungkinan trombosis vena dalam), atau nyeri yang tiba-tiba jauh memburuk. Jangan meletakkan bantal di bawah lutut saat berbaring - dapat menyebabkan kontraktur fleksi.',
  'Naik ke fase lanjut bila fleksi >= 110 derajat, ekstensi 0 derajat, mampu straight leg raise tanpa lag, dan berjalan 10 menit tanpa alat bantu.', 'Bengkak dan hangat pada lutut wajar selama beberapa minggu. Kompres dingin 15-20 menit setelah latihan. Lingkup gerak yang tidak dikejar pada 6-12 minggu pertama sulit diperoleh kemudian.', 'A',
  'Brigham and Women''s Hospital Total Knee Arthroplasty Protocol; Bade & Stevens-Lapsley JOSPT 2012; Artz et al. BMC Musculoskelet Disord 2015', ARRAY['TKA', 'post-op', 'knee', 'arthroplasty']::text[], '[{"id":"db85f8da-5c7a-3702-b361-0b1f4fb071cf","slug":"ankle-pumps","name":"Ankle Pumps","name_id":"Pompa Pergelangan Kaki","sets":3,"reps":20,"repetitions":20,"hold_duration":2,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Setiap jam saat terjaga pada minggu pertama - pencegahan trombosis."},{"id":"1f312628-fe17-35a3-8a27-e200c26b918c","slug":"quad-set","name":"Quadriceps Setting (Quad Set)","name_id":"Kontraksi Otot Paha Depan (Quad Set)","sets":3,"reps":12,"repetitions":12,"hold_duration":8,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Latihan paling penting pada minggu pertama."},{"id":"7078c397-1ff1-397f-9045-213ed8a239f4","slug":"heel-slide","name":"Heel Slide (Knee Flexion AROM)","name_id":"Geser Tumit (Lingkup Gerak Lutut)","sets":3,"reps":12,"repetitions":12,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Ikuti batasan sudut dari dokter bedah."},{"id":"800994ed-8763-3b2c-b654-0b79e593e20e","slug":"prone-knee-hang","name":"Prone Knee Hang (Extension Stretch)","name_id":"Gantung Lutut Tengkurap (Peregangan Ekstensi)","sets":2,"reps":1,"repetitions":1,"hold_duration":300,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Alternatif: duduk dengan tumit di kursi lain, biarkan lutut lurus pasif."},{"id":"c16526d8-b995-3a80-97a1-87eaf63ff3a0","slug":"patellar-mobilization","name":"Patellar Mobilisation (Self)","name_id":"Mobilisasi Tempurung Lutut Mandiri","sets":1,"reps":4,"repetitions":4,"hold_duration":20,"rest_between_sets":10,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Mencegah kekakuan tempurung lutut."},{"id":"2de5746b-285e-3552-b9ab-2fadf90bdbd8","slug":"short-arc-quad","name":"Short Arc Quad","name_id":"Short Arc Quad (Luruskan Lutut Setengah)","sets":3,"reps":15,"repetitions":15,"hold_duration":4,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"2e20c63e-394b-30fa-ad40-64c8c46f0dea","slug":"straight-leg-raise","name":"Straight Leg Raise","name_id":"Angkat Tungkai Lurus","sets":3,"reps":12,"repetitions":12,"hold_duration":3,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"6659ecf4-e7c7-32ac-b8e3-1d1a3f6f5f17","slug":"sit-to-stand","name":"Sit to Stand","name_id":"Duduk ke Berdiri","sets":3,"reps":8,"repetitions":8,"hold_duration":0,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Gunakan kursi tinggi dengan lengan pada awalnya."},{"id":"baee4323-5662-3b44-8531-a1f4fa30c052","slug":"walking-program","name":"Structured Walking Program","name_id":"Program Jalan Kaki Terstruktur","sets":1,"reps":1,"repetitions":1,"hold_duration":0,"rest_between_sets":0,"prepare_time":5,"work_time":600,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Mulai 5-10 menit beberapa kali sehari dengan alat bantu sesuai anjuran."}]'::jsonb, 'Active', null, false
),
-- Nyeri Punggung Bawah Akut - Program Pemulihan Aktif
(
  '739b4ecd-a5b4-3121-9572-ee2313d76080', 'low-back-pain-acute', 'Nyeri Punggung Bawah Akut - Program Pemulihan Aktif', 'Program untuk nyeri punggung bawah akut non-spesifik: tetap aktif, gerakan berulang sesuai preferensi arah, dan kembali ke aktivitas normal secepat mungkin.', 'Program for acute non-specific low back pain: stay active, repeated movements in the preferred direction, and early return to normal activity.',
  'Nyeri punggung bawah akut non-spesifik (< 6 minggu)', 'Fase akut (0-6 minggu)', 'Lower back', 'Mengurangi nyeri, memulihkan gerakan, dan kembali ke aktivitas sehari-hari serta pekerjaan',
  '4-6 minggu', 'Beberapa kali per hari', 'Beginner', 'SEGERA cari pertolongan medis bila muncul: mati rasa di area selangkangan/pelana, gangguan buang air kecil atau besar, kelemahan tungkai progresif, demam dengan nyeri punggung, atau nyeri hebat setelah trauma. Hentikan gerakan yang membuat nyeri menjalar semakin jauh ke tungkai.',
  'Beralih ke program kronis/penguatan bila nyeri sudah terkendali dan gerakan dasar bebas, umumnya setelah 2-6 minggu.', 'Tirah baring tidak membantu dan justru memperlambat pemulihan. Sebagian besar nyeri punggung akut membaik dalam 6 minggu. Pencitraan (rontgen/MRI) tidak diperlukan tanpa tanda bahaya. Nyeri tidak selalu berarti kerusakan jaringan.', 'A',
  'George et al. Low Back Pain CPG, JOSPT 2021;51(11):CPG1-CPG60; NICE NG59 Low Back Pain and Sciatica; Long et al. Spine 2004 (directional preference)', ARRAY['low back pain', 'acute', 'McKenzie']::text[], '[{"id":"3502c338-bd7e-3d23-b957-1eb38c0ccd45","slug":"prone-press-up","name":"Prone Press-Up (McKenzie Extension)","name_id":"Dorong Badan Tengkurap (Ekstensi McKenzie)","sets":1,"reps":10,"repetitions":10,"hold_duration":2,"rest_between_sets":0,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Lakukan setiap 2-3 jam. HENTIKAN bila nyeri menjalar semakin jauh ke tungkai."},{"id":"ba3fcad2-154b-3663-a31a-8e5aade68764","slug":"standing-lumbar-extension","name":"Standing Lumbar Extension","name_id":"Ekstensi Punggung Berdiri","sets":1,"reps":10,"repetitions":10,"hold_duration":2,"rest_between_sets":0,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Versi praktis saat bekerja atau berpergian."},{"id":"87c49f4a-6633-3024-b59e-0ee76dff5e3b","slug":"knee-to-chest","name":"Single Knee to Chest","name_id":"Tarik Lutut ke Dada","sets":3,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Gunakan bila arah fleksi lebih meredakan gejala."},{"id":"b4808bd4-5884-380f-bf53-658e110469e3","slug":"lower-trunk-rotation","name":"Lower Trunk Rotation","name_id":"Rotasi Batang Tubuh Bawah","sets":2,"reps":10,"repetitions":10,"hold_duration":15,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Mobilisasi lembut untuk kekakuan."},{"id":"6e2a7e09-93ba-3b82-96ce-668224821870","slug":"cat-cow","name":"Cat-Cow (Cat-Camel)","name_id":"Kucing-Sapi (Cat-Camel)","sets":2,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Pemanasan mobilitas tulang belakang."},{"id":"aad9d0ab-45c0-38be-8d5a-06f0cf0f0b50","slug":"pelvic-tilt","name":"Posterior Pelvic Tilt","name_id":"Miringkan Panggul ke Belakang","sets":3,"reps":10,"repetitions":10,"hold_duration":5,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"baee4323-5662-3b44-8531-a1f4fa30c052","slug":"walking-program","name":"Structured Walking Program","name_id":"Program Jalan Kaki Terstruktur","sets":1,"reps":1,"repetitions":1,"hold_duration":0,"rest_between_sets":0,"prepare_time":5,"work_time":600,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Berjalan 10 menit beberapa kali sehari lebih baik daripada berbaring."}]'::jsonb, 'Active', null, false
),
-- Nyeri Punggung Bawah Kronis - Kontrol Motorik & Penguatan
(
  'bb8adf74-6b9b-3d45-8194-327f812fdfb1', 'low-back-pain-chronic-motor-control', 'Nyeri Punggung Bawah Kronis - Kontrol Motorik & Penguatan', 'Program 8-12 minggu untuk nyeri punggung bawah persisten: latihan kontrol motorik bertahap dilanjutkan penguatan progresif dan aktivitas aerobik.', '8-12 week program for persistent low back pain: staged motor control training progressing to strengthening and aerobic activity.',
  'Nyeri punggung bawah kronis non-spesifik (> 12 minggu)', 'Program 8-12 minggu', 'Lower back', 'Meningkatkan kapasitas dan kepercayaan diri bergerak, mengurangi disabilitas, kembali bekerja dan berolahraga',
  '8-12 minggu', '3-5x/minggu', 'Intermediate', 'Peningkatan nyeri ringan saat memulai latihan baru adalah wajar dan tidak berbahaya. Hentikan bila muncul tanda bahaya neurologis (kelemahan progresif, gangguan berkemih). Naikkan beban maksimal 10% per minggu.',
  'Naikkan beban dan kompleksitas setiap 2 minggu bila latihan dapat diselesaikan dengan kualitas gerak baik dan nyeri tidak meningkat > 24 jam.', 'Tidak ada satu jenis latihan yang paling unggul untuk nyeri punggung kronis - yang paling penting adalah latihan yang Anda sukai dan lakukan secara konsisten. Nyeri kronis dipengaruhi tidur, stres, dan aktivitas; menangani ketiganya mempercepat pemulihan.', 'A',
  'Saragiotto et al. Cochrane 2016;1:CD012004 (motor control exercise); George et al. JOSPT 2021; Hayden et al. Cochrane 2021 (exercise for CLBP)', ARRAY['low back pain', 'chronic', 'motor control', 'core']::text[], '[{"id":"6e2a7e09-93ba-3b82-96ce-668224821870","slug":"cat-cow","name":"Cat-Cow (Cat-Camel)","name_id":"Kucing-Sapi (Cat-Camel)","sets":2,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Pemanasan."},{"id":"da2791e7-4578-3a68-824e-7270109262b5","slug":"abdominal-bracing","name":"Abdominal Bracing (Transversus Activation)","name_id":"Pengencangan Otot Perut Dalam","sets":3,"reps":10,"repetitions":10,"hold_duration":10,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Aktivasi 20-30% saja - bukan kontraksi maksimal."},{"id":"d1099867-0b87-344d-982d-3e379d451952","slug":"dead-bug","name":"Dead Bug","name_id":"Dead Bug (Gerak Lengan-Tungkai Telentang)","sets":3,"reps":10,"repetitions":10,"hold_duration":2,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Pinggang harus tetap menempel lantai."},{"id":"2dfa3f7f-8cda-3066-a48a-836f7b6ce5cc","slug":"bird-dog","name":"Bird Dog (Quadruped Alternate Reach)","name_id":"Bird Dog (Angkat Lengan dan Tungkai Berlawanan)","sets":3,"reps":10,"repetitions":10,"hold_duration":8,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Panggul tetap sejajar."},{"id":"557a185e-6395-3132-b5f1-144cb7da7e67","slug":"side-plank-modified","name":"Side Plank (Knees Bent)","name_id":"Plank Samping Lutut Ditekuk","sets":3,"reps":3,"repetitions":3,"hold_duration":15,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Progresi ke tungkai lurus bila stabil."},{"id":"4983a846-58ab-3e9e-b298-c0dcbe59127c","slug":"mcgill-curl-up","name":"McGill Curl-Up","name_id":"Curl-Up McGill","sets":3,"reps":6,"repetitions":6,"hold_duration":10,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Gunakan pola turun 6-4-2 repetisi."},{"id":"c2f149f2-f58b-3135-a06b-276a1a6a1a47","slug":"bridging","name":"Bridging (Glute Bridge)","name_id":"Angkat Pinggul (Bridging)","sets":3,"reps":12,"repetitions":12,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"6709fdba-003a-3c95-8bb3-9c240affe244","slug":"hip-hinge-pattern","name":"Hip Hinge Pattern Training","name_id":"Latihan Pola Menekuk Panggul (Hip Hinge)","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Keterampilan mengangkat beban dengan aman."},{"id":"bfb5b5de-cd80-33fa-aa87-4eb813eeee64","slug":"hip-flexor-stretch-half-kneeling","name":"Half-Kneeling Hip Flexor Stretch","name_id":"Peregangan Fleksor Pinggul Setengah Berlutut","sets":2,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"baee4323-5662-3b44-8531-a1f4fa30c052","slug":"walking-program","name":"Structured Walking Program","name_id":"Program Jalan Kaki Terstruktur","sets":1,"reps":1,"repetitions":1,"hold_duration":0,"rest_between_sets":0,"prepare_time":5,"work_time":1800,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Target 150 menit aktivitas sedang per minggu."}]'::jsonb, 'Active', null, false
),
-- Radikulopati Lumbal / Sciatica
(
  '7672a97d-8a45-3a1b-b29e-26f9dab54679', 'lumbar-radiculopathy-sciatica', 'Radikulopati Lumbal / Sciatica', 'Program untuk nyeri menjalar tungkai akibat iritasi akar saraf lumbal: gerakan sesuai preferensi arah, neurodinamik lembut, dan pemulihan kapasitas bertahap.', 'Program for leg-radiating pain from lumbar nerve root irritation: directional preference movements, gentle neurodynamics and graded capacity restoration.',
  'Radikulopati lumbal / sciatica (nyeri menjalar di bawah lutut dengan atau tanpa kesemutan)', 'Fase subakut (setelah nyeri sangat akut mereda)', 'Lower back', 'Sentralisasi gejala (nyeri menarik dari tungkai ke punggung), memulihkan toleransi duduk/berdiri/berjalan',
  '6-12 minggu', '2-3x/hari untuk latihan arah; 3x/minggu untuk penguatan', 'Beginner', 'DARURAT MEDIS bila muncul mati rasa area selangkangan, gangguan berkemih/buang air besar, atau kelemahan tungkai yang memburuk cepat (sindrom cauda equina). Prinsip utama: gerakan yang membuat nyeri tungkai MENJAUH dari punggung harus dihentikan.',
  'Gejala tersentralisasi (nyeri berpindah dari tungkai ke punggung) sebelum menambah beban. Setelah nyeri tungkai hilang, lanjutkan ke program penguatan punggung bawah kronis.', 'Sekitar 90% radikulopati lumbal membaik tanpa operasi dalam 3 bulan. Kesemutan yang berkurang jangkauannya adalah tanda perbaikan meskipun intensitas nyeri punggung sementara naik.', 'A',
  'George et al. Low Back Pain CPG, JOSPT 2021; Basson et al. JOSPT 2017 (neural mobilisation); NICE NG59', ARRAY['sciatica', 'radiculopathy', 'low back pain', 'nerve']::text[], '[{"id":"3502c338-bd7e-3d23-b957-1eb38c0ccd45","slug":"prone-press-up","name":"Prone Press-Up (McKenzie Extension)","name_id":"Dorong Badan Tengkurap (Ekstensi McKenzie)","sets":1,"reps":10,"repetitions":10,"hold_duration":2,"rest_between_sets":0,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Pantau arah gejala setiap sesi - hentikan bila nyeri menjalar makin jauh."},{"id":"80e4bdd1-d981-3f03-890a-1e5967c8a124","slug":"sciatic-nerve-glide","name":"Sciatic Nerve Glide (Slider)","name_id":"Neurodinamik Saraf Skiatik","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Gerakan meluncur lembut - tidak boleh menambah nyeri menjalar."},{"id":"ba3fcad2-154b-3663-a31a-8e5aade68764","slug":"standing-lumbar-extension","name":"Standing Lumbar Extension","name_id":"Ekstensi Punggung Berdiri","sets":1,"reps":10,"repetitions":10,"hold_duration":2,"rest_between_sets":0,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Setiap 1-2 jam bila banyak duduk."},{"id":"da2791e7-4578-3a68-824e-7270109262b5","slug":"abdominal-bracing","name":"Abdominal Bracing (Transversus Activation)","name_id":"Pengencangan Otot Perut Dalam","sets":3,"reps":10,"repetitions":10,"hold_duration":10,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"c2f149f2-f58b-3135-a06b-276a1a6a1a47","slug":"bridging","name":"Bridging (Glute Bridge)","name_id":"Angkat Pinggul (Bridging)","sets":3,"reps":12,"repetitions":12,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"2dfa3f7f-8cda-3066-a48a-836f7b6ce5cc","slug":"bird-dog","name":"Bird Dog (Quadruped Alternate Reach)","name_id":"Bird Dog (Angkat Lengan dan Tungkai Berlawanan)","sets":3,"reps":10,"repetitions":10,"hold_duration":8,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"baee4323-5662-3b44-8531-a1f4fa30c052","slug":"walking-program","name":"Structured Walking Program","name_id":"Program Jalan Kaki Terstruktur","sets":1,"reps":1,"repetitions":1,"hold_duration":0,"rest_between_sets":0,"prepare_time":5,"work_time":900,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Berjalan dalam batas toleransi; pecah menjadi beberapa sesi pendek."}]'::jsonb, 'Active', null, false
),
-- Nyeri Leher Mekanik - Kontrol Motorik & Penguatan
(
  'c2d6771e-7da1-3426-976e-f1d15a9aa498', 'neck-pain-deep-flexor', 'Nyeri Leher Mekanik - Kontrol Motorik & Penguatan', 'Program berbasis protokol fleksor leher dalam (Jull) dikombinasikan dengan penguatan skapula dan mobilitas, sesuai Neck Pain CPG JOSPT.', 'Deep cervical flexor protocol (Jull) combined with scapular strengthening and mobility, per the JOSPT Neck Pain CPG.',
  'Nyeri leher mekanik dengan gangguan kontrol motorik (termasuk nyeri leher pekerja kantor)', 'Program 6-8 minggu', 'Neck', 'Mengurangi nyeri dan disabilitas leher, meningkatkan daya tahan otot fleksor leher dalam dan kontrol postur',
  '6-8 minggu', '1x/hari, 5 hari/minggu', 'Beginner', 'Hentikan dan konsultasikan bila muncul pusing berputar, penglihatan ganda, kesulitan menelan, kelemahan atau kesemutan menetap di lengan, atau nyeri kepala hebat mendadak. Latihan harus terasa ringan - bukan usaha maksimal.',
  'Naikkan level anggukan pada latihan fleksi kraniocervikal bila mampu 10 repetisi x 10 detik tanpa otot leher besar ikut mengeras.', 'Postur tidak sempurna bukan penyebab tunggal nyeri leher; posisi yang dipertahankan terlalu lama lebih berpengaruh. Jeda gerak setiap 30-60 menit lebih bermanfaat daripada mencari postur ''sempurna''.', 'A',
  'Blanpied et al. Neck Pain CPG, JOSPT 2017;47(7):A1-A83; Jull et al. Spine 2002; Ylinen et al. JAMA 2003', ARRAY['neck pain', 'deep neck flexor', 'office worker', 'motor control']::text[], '[{"id":"a7144c74-e592-30b1-b2c3-adc995e319b6","slug":"craniocervical-flexion-supine","name":"Supine Craniocervical Flexion (Staged)","name_id":"Fleksi Kraniocervikal Telentang Bertahap","sets":3,"reps":10,"repetitions":10,"hold_duration":10,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Latihan inti - kualitas lebih penting daripada kekuatan."},{"id":"10ba579e-9175-38b9-9c11-ae2ddcf244b2","slug":"chin-tuck","name":"Chin Tuck (Craniocervical Flexion)","name_id":"Tarik Dagu (Fleksi Kraniocervikal)","sets":3,"reps":10,"repetitions":10,"hold_duration":10,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Versi duduk untuk diterapkan saat bekerja."},{"id":"d1d7fea9-0081-3e6b-ad05-06681470746f","slug":"cervical-rotation-arom","name":"Active Cervical Rotation","name_id":"Rotasi Leher Aktif","sets":2,"reps":10,"repetitions":10,"hold_duration":3,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"06b19223-31e5-3ae3-baeb-99c1d41c5542","slug":"cervical-isometric-set","name":"Cervical Isometrics (4-Way)","name_id":"Isometrik Leher 4 Arah","sets":2,"reps":5,"repetitions":5,"hold_duration":8,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Mulai 20-30% kekuatan pada fase nyeri."},{"id":"e1a68070-1c40-3af5-9669-f03f6647a4fc","slug":"scapular-retraction","name":"Scapular Retraction (Shoulder Blade Squeeze)","name_id":"Rapatkan Tulang Belikat","sets":3,"reps":12,"repetitions":12,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"0487b7c2-166f-3304-a6d2-9760909fddcb","slug":"band-row","name":"Seated Row with Band","name_id":"Dayung Duduk dengan Karet Elastis","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Penguatan punggung atas terbukti mengurangi nyeri leher kronis."},{"id":"039eab36-77a2-3812-82ec-729e8b58eae2","slug":"upper-trapezius-stretch","name":"Upper Trapezius Stretch","name_id":"Peregangan Trapezius Atas","sets":3,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"fa276747-7aa6-3c3a-b718-047e8b690982","slug":"levator-scapulae-stretch","name":"Levator Scapulae Stretch","name_id":"Peregangan Levator Scapulae","sets":3,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"7bd763e3-2137-3791-99f3-ee669db17651","slug":"thoracic-extension-foam-roller","name":"Thoracic Extension over Roller","name_id":"Ekstensi Punggung Atas dengan Roller","sets":2,"reps":8,"repetitions":8,"hold_duration":5,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""}]'::jsonb, 'Active', null, false
),
-- Program Pekerja Kantor - Leher, Bahu & Punggung
(
  '728293ef-4901-3309-b4e5-f9b9700be3cb', 'office-worker-neck-shoulder', 'Program Pekerja Kantor - Leher, Bahu & Punggung', 'Program pencegahan dan pemeliharaan untuk pekerja komputer: jeda gerak berfrekuensi tinggi ditambah penguatan punggung atas 3x/minggu.', 'Prevention and maintenance program for computer workers: frequent movement microbreaks plus upper back strengthening three times weekly.',
  'Nyeri leher-bahu terkait pekerjaan / pencegahan pada pekerja kantor', 'Program pemeliharaan berkelanjutan', 'Neck', 'Mengurangi ketidaknyamanan leher-bahu, meningkatkan toleransi duduk dan kapasitas otot punggung atas',
  'Berkelanjutan', 'Jeda gerak setiap 30-60 menit; penguatan 3x/minggu', 'Beginner', 'Bila nyeri menetap lebih dari 6 minggu atau disertai kesemutan lengan, lakukan evaluasi fisioterapi. Latihan tidak menggantikan penyesuaian ergonomi tempat kerja.',
  'Naikkan resistensi karet elastis pada latihan row dan wall angel setiap 3-4 minggu.', 'Bukan postur duduk ''salah'' yang menjadi masalah utama, melainkan lamanya posisi dipertahankan. Aturan praktis: bergerak setiap 30-60 menit dan capai 150 menit aktivitas sedang per minggu.', 'B',
  'Blanpied et al. Neck Pain CPG, JOSPT 2017; Waongenngarm et al. Appl Ergon 2018; WHO Physical Activity Guidelines 2020', ARRAY['office worker', 'prevention', 'neck', 'posture']::text[], '[{"id":"6fef5474-cbe3-3faa-b8b3-71f20e2f78e1","slug":"sitting-posture-reset","name":"Seated Posture Reset (Microbreak)","name_id":"Reset Postur Duduk (Jeda Singkat)","sets":1,"reps":5,"repetitions":5,"hold_duration":5,"rest_between_sets":0,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Setiap 30-60 menit kerja - ini komponen paling penting."},{"id":"10ba579e-9175-38b9-9c11-ae2ddcf244b2","slug":"chin-tuck","name":"Chin Tuck (Craniocervical Flexion)","name_id":"Tarik Dagu (Fleksi Kraniocervikal)","sets":2,"reps":10,"repetitions":10,"hold_duration":10,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"e1a68070-1c40-3af5-9669-f03f6647a4fc","slug":"scapular-retraction","name":"Scapular Retraction (Shoulder Blade Squeeze)","name_id":"Rapatkan Tulang Belikat","sets":3,"reps":12,"repetitions":12,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"8d00f1d7-f0d4-35a4-a694-68a10c2d8920","slug":"wall-angel","name":"Wall Angel","name_id":"Wall Angel (Malaikat Dinding)","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"0487b7c2-166f-3304-a6d2-9760909fddcb","slug":"band-row","name":"Seated Row with Band","name_id":"Dayung Duduk dengan Karet Elastis","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"3x/minggu."},{"id":"7481d589-aa48-3382-b509-2ec09d7d7579","slug":"doorway-pec-stretch","name":"Doorway Pectoral Stretch","name_id":"Peregangan Dada di Kusen Pintu","sets":3,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"039eab36-77a2-3812-82ec-729e8b58eae2","slug":"upper-trapezius-stretch","name":"Upper Trapezius Stretch","name_id":"Peregangan Trapezius Atas","sets":2,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"130ee14d-bbe4-37c6-94cb-057059415447","slug":"open-book-thoracic-rotation","name":"Open Book Thoracic Rotation","name_id":"Rotasi Punggung Atas (Open Book)","sets":2,"reps":10,"repetitions":10,"hold_duration":5,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"cffecfe2-7e5e-36bd-88cb-1c4b640041b3","slug":"median-nerve-glide","name":"Median Nerve Glide","name_id":"Neurodinamik Saraf Medianus","sets":2,"reps":10,"repetitions":10,"hold_duration":3,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Hanya bila ada gejala kesemutan tangan."}]'::jsonb, 'Active', null, false
),
-- Nyeri Bahu Terkait Rotator Cuff
(
  'e9e2edd9-0b87-37b3-b6cb-3719ee153abf', 'rotator-cuff-related-shoulder-pain', 'Nyeri Bahu Terkait Rotator Cuff', 'Program latihan progresif berbasis GRASP: dimulai dari isometrik bebas nyeri, lanjut ke penguatan rotator cuff dan skapula dengan beban bertambah selama 12-16 minggu.', 'GRASP-informed progressive exercise: starting with pain-free isometrics and progressing to loaded rotator cuff and scapular strengthening over 12-16 weeks.',
  'Nyeri bahu terkait rotator cuff / subacromial pain syndrome / tendinopati rotator cuff', 'Program 12-16 minggu', 'Shoulder', 'Mengurangi nyeri, mengembalikan kekuatan dan fungsi bahu untuk aktivitas di atas kepala',
  '12-16 minggu', '3-5x/minggu', 'Intermediate', 'Nyeri sampai 4/10 selama latihan dapat diterima dan harus mereda dalam 24 jam. Hentikan dan evaluasi ulang bila nyeri malam memburuk atau muncul kelemahan mendadak (kemungkinan robekan rotator cuff). Kurangi rentang gerak, bukan menghentikan latihan, bila terasa jepitan.',
  'Naikkan resistensi bila 3 set x 15 repetisi dapat diselesaikan dengan nyeri < 3/10. Perluas rentang elevasi bertahap sesuai toleransi.', 'Sebagian besar nyeri bahu rotator cuff membaik dengan latihan progresif tanpa operasi atau suntikan. Perbaikan membutuhkan waktu 3-4 bulan; menghentikan latihan saat nyeri berkurang adalah penyebab tersering kekambuhan.', 'A',
  'Hopewell et al. GRASP trial, Lancet 2021;398(10298):416-428; Littlewood et al. Physiotherapy 2015; Cools et al. Br J Sports Med 2014', ARRAY['rotator cuff', 'shoulder pain', 'GRASP', 'tendinopathy']::text[], '[{"id":"74046b5e-bd2d-3ba5-aef5-b1308b690f58","slug":"isometric-shoulder-external-rotation","name":"Isometric Shoulder External Rotation","name_id":"Isometrik Rotasi Eksternal Bahu","sets":3,"reps":10,"repetitions":10,"hold_duration":10,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Tahap awal - gunakan bila nyeri masih tinggi."},{"id":"b1824bb8-02bf-330c-a97e-58bf8595533e","slug":"band-external-rotation","name":"Resisted External Rotation with Band","name_id":"Rotasi Eksternal dengan Karet Elastis","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Latihan inti program - naikkan resistensi bertahap."},{"id":"7dbec74c-f51f-3504-bbdb-3005c2f8c21d","slug":"band-internal-rotation","name":"Resisted Internal Rotation with Band","name_id":"Rotasi Internal dengan Karet Elastis","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"1a84bba5-b033-3bc7-b361-978658ac38cf","slug":"scaption-raise","name":"Scaption Raise (Full Can)","name_id":"Angkat Lengan Bidang Skapula (Full Can)","sets":3,"reps":12,"repetitions":12,"hold_duration":1,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Batasi pada ketinggian bebas nyeri di awal."},{"id":"0487b7c2-166f-3304-a6d2-9760909fddcb","slug":"band-row","name":"Seated Row with Band","name_id":"Dayung Duduk dengan Karet Elastis","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"dbe84c48-cc01-3870-8d44-5d7c6f1c80e0","slug":"prone-y-raise","name":"Prone Y Raise (Lower Trapezius)","name_id":"Angkat Lengan Y Tengkurap (Trapezius Bawah)","sets":3,"reps":10,"repetitions":10,"hold_duration":5,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Penguatan trapezius bawah."},{"id":"99b0f906-54e7-3b44-85b0-3a32726fd0a8","slug":"serratus-wall-punch","name":"Serratus Wall Punch (Push-up Plus)","name_id":"Dorongan Serratus di Dinding","sets":3,"reps":12,"repetitions":12,"hold_duration":3,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"7cf97fdb-0665-3741-a737-3930d794abd5","slug":"wall-slide-shoulder","name":"Wall Slide (W to Y)","name_id":"Geser Lengan di Dinding (W ke Y)","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"37bfb338-441d-3d4f-ba05-41f9e13ae10f","slug":"cross-body-adduction-stretch","name":"Cross-Body Adduction Stretch","name_id":"Peregangan Bahu Silang Badan","sets":3,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""}]'::jsonb, 'Active', null, false
),
-- Frozen Shoulder - Fase Nyeri (Iritabilitas Tinggi)
(
  'ae3ece0c-3481-3862-a368-b8d1ca92f670', 'adhesive-capsulitis-painful-phase', 'Frozen Shoulder - Fase Nyeri (Iritabilitas Tinggi)', 'Program untuk fase nyeri frozen shoulder: gerakan lembut dalam rentang bebas nyeri, edukasi, dan menghindari peregangan agresif yang justru memperpanjang fase nyeri.', 'Painful-phase frozen shoulder program: gentle movement within pain-free range, education, and avoidance of aggressive stretching that prolongs the painful phase.',
  'Kapsulitis adhesiva (frozen shoulder) fase 1-2, iritabilitas tinggi', 'Fase nyeri (freezing)', 'Shoulder', 'Mengendalikan nyeri (terutama nyeri malam), mempertahankan lingkup gerak yang ada tanpa memperparah inflamasi',
  '6-12 minggu (fase dapat berlangsung 3-9 bulan)', '3-4x/hari, sesi pendek', 'Beginner', 'Intensitas latihan HARUS disesuaikan dengan iritabilitas: pada fase ini peregangan intensitas tinggi merupakan kontraindikasi dan dapat memperpanjang fase nyeri 3-6 bulan. Aturan praktis: nyeri tidak boleh bertahan lebih dari beberapa menit setelah latihan.',
  'Beralih ke program fase kaku bila nyeri malam sudah jarang dan nyeri saat gerak hanya muncul di ujung lingkup gerak.', 'Frozen shoulder umumnya berjalan sendiri melalui tiga fase dalam 1-3 tahun. Pada fase nyeri, tujuan bukan menambah gerakan tetapi mengendalikan nyeri. ''No pain no gain'' TIDAK berlaku pada fase ini.', 'A',
  'Kelley et al. Adhesive Capsulitis CPG, JOSPT 2013;43(5):A1-A31', ARRAY['frozen shoulder', 'adhesive capsulitis', 'shoulder', 'painful phase']::text[], '[{"id":"452b7f54-8fea-37f4-bb5c-828b0d400646","slug":"pendulum-codman","name":"Pendulum Exercise (Codman)","name_id":"Latihan Pendulum (Codman)","sets":1,"reps":4,"repetitions":4,"hold_duration":30,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Otot bahu harus benar-benar rileks; gerakan dari badan."},{"id":"b3824bcc-8987-3c95-96f4-80291686552a","slug":"supine-flexion-with-cane","name":"Supine Shoulder Flexion with Cane","name_id":"Fleksi Bahu Telentang dengan Tongkat","sets":2,"reps":10,"repetitions":10,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Hanya sampai batas nyaman - jangan meregang."},{"id":"e7b7517b-f42e-386c-90a7-97120dd2728d","slug":"supine-external-rotation-cane","name":"Supine External Rotation with Cane","name_id":"Rotasi Eksternal Telentang dengan Tongkat","sets":2,"reps":8,"repetitions":8,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Rotasi eksternal biasanya paling terbatas."},{"id":"e1a68070-1c40-3af5-9669-f03f6647a4fc","slug":"scapular-retraction","name":"Scapular Retraction (Shoulder Blade Squeeze)","name_id":"Rapatkan Tulang Belikat","sets":3,"reps":12,"repetitions":12,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Menjaga kontrol skapula tanpa membebani sendi bahu."},{"id":"74046b5e-bd2d-3ba5-aef5-b1308b690f58","slug":"isometric-shoulder-external-rotation","name":"Isometric Shoulder External Rotation","name_id":"Isometrik Rotasi Eksternal Bahu","sets":3,"reps":10,"repetitions":10,"hold_duration":10,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Intensitas rendah 20-30% saja pada fase nyeri."},{"id":"d1d7fea9-0081-3e6b-ad05-06681470746f","slug":"cervical-rotation-arom","name":"Active Cervical Rotation","name_id":"Rotasi Leher Aktif","sets":2,"reps":10,"repetitions":10,"hold_duration":3,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Mencegah kekakuan leher akibat pola gerak terbatas."}]'::jsonb, 'Active', null, false
),
-- Frozen Shoulder - Fase Kaku (Iritabilitas Rendah)
(
  'a44d56b8-a3ff-3d57-aeda-9daf49748bae', 'adhesive-capsulitis-stiff-phase', 'Frozen Shoulder - Fase Kaku (Iritabilitas Rendah)', 'Program fase kaku: peregangan intensitas sedang-tinggi dan penguatan bertahap untuk mengembalikan lingkup gerak fungsional.', 'Stiff-phase program: moderate-to-high intensity stretching and graded strengthening to restore functional range of motion.',
  'Kapsulitis adhesiva fase 3 (frozen/thawing), iritabilitas rendah', 'Fase kaku (frozen/thawing)', 'Shoulder', 'Meningkatkan lingkup gerak bahu ke arah fungsional (menyisir rambut, meraih saku belakang, mengambil benda di rak)',
  '8-16 minggu', '2x/hari peregangan; 3x/minggu penguatan', 'Intermediate', 'Peregangan boleh menimbulkan ketidaknyamanan sedang tetapi harus mereda dalam 30 menit. Bila nyeri malam kembali muncul, kurangi intensitas - iritabilitas meningkat kembali.',
  'Kurangi frekuensi peregangan dan tambah penguatan saat lingkup gerak mendekati sisi sehat.', 'Pada fase ini, peregangan yang lebih tegas dibutuhkan dan aman. Kombinasi kompres hangat sebelum peregangan meningkatkan hasil. Pemulihan penuh dapat memakan waktu 6-18 bulan.', 'A',
  'Kelley et al. Adhesive Capsulitis CPG, JOSPT 2013;43(5):A1-A31', ARRAY['frozen shoulder', 'adhesive capsulitis', 'stretching']::text[], '[{"id":"b3824bcc-8987-3c95-96f4-80291686552a","slug":"supine-flexion-with-cane","name":"Supine Shoulder Flexion with Cane","name_id":"Fleksi Bahu Telentang dengan Tongkat","sets":3,"reps":10,"repetitions":10,"hold_duration":10,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Tahan lebih lama pada fase ini."},{"id":"e7b7517b-f42e-386c-90a7-97120dd2728d","slug":"supine-external-rotation-cane","name":"Supine External Rotation with Cane","name_id":"Rotasi Eksternal Telentang dengan Tongkat","sets":3,"reps":8,"repetitions":8,"hold_duration":20,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Naikkan sudut abduksi bertahap 0 -> 45 -> 90 derajat."},{"id":"37bfb338-441d-3d4f-ba05-41f9e13ae10f","slug":"cross-body-adduction-stretch","name":"Cross-Body Adduction Stretch","name_id":"Peregangan Bahu Silang Badan","sets":3,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"cc6ee609-3d0f-3008-a635-3915fdad1ad6","slug":"sleeper-stretch","name":"Sleeper Stretch (Posterior Capsule)","name_id":"Peregangan Kapsul Posterior (Sleeper Stretch)","sets":3,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Hentikan bila terasa nyeri di depan bahu."},{"id":"7cf97fdb-0665-3741-a737-3930d794abd5","slug":"wall-slide-shoulder","name":"Wall Slide (W to Y)","name_id":"Geser Lengan di Dinding (W ke Y)","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"b1824bb8-02bf-330c-a97e-58bf8595533e","slug":"band-external-rotation","name":"Resisted External Rotation with Band","name_id":"Rotasi Eksternal dengan Karet Elastis","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Mulai penguatan setelah lingkup gerak membaik."},{"id":"0487b7c2-166f-3304-a6d2-9760909fddcb","slug":"band-row","name":"Seated Row with Band","name_id":"Dayung Duduk dengan Karet Elastis","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"7481d589-aa48-3382-b509-2ec09d7d7579","slug":"doorway-pec-stretch","name":"Doorway Pectoral Stretch","name_id":"Peregangan Dada di Kusen Pintu","sets":3,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""}]'::jsonb, 'Active', null, false
),
-- Tennis Elbow (Tendinopati Epikondilus Lateral)
(
  'd9053ecb-e25c-3b24-b6c6-af8545036a56', 'lateral-elbow-tendinopathy', 'Tennis Elbow (Tendinopati Epikondilus Lateral)', 'Program berbasis pembebanan eksentrik (Tyler Twist) yang dikombinasikan dengan penguatan lengan bawah dan bahu, sesuai CPG JOSPT 2022.', 'Eccentric loading program (Tyler Twist) combined with forearm and shoulder strengthening, per the JOSPT 2022 CPG.',
  'Tendinopati epikondilus lateral (tennis elbow)', 'Program 6-12 minggu', 'Elbow', 'Mengurangi nyeri saat mencengkeram dan mengangkat, mengembalikan kekuatan genggam',
  '6-12 minggu', '1x/hari, 5 hari/minggu', 'Intermediate', 'Nyeri 3-4/10 selama latihan eksentrik dapat diterima dan bahkan diharapkan; nyeri > 5/10 atau menetap > 24 jam berarti beban terlalu tinggi. Hentikan sementara aktivitas mencengkeram berat pada 2 minggu pertama, bukan berhenti total.',
  'Naikkan resistensi batang karet atau beban dumbel saat 3x15 repetisi terasa nyaman (nyeri < 3/10).', 'Tennis elbow bukan peradangan melainkan gangguan struktur tendon, sehingga anti-inflamasi jangka panjang tidak menyelesaikan masalah. Pembebanan bertahap adalah pengobatan utama, dan pemulihan biasanya 3-6 bulan.', 'A',
  'Lucado et al. Lateral Elbow Tendinopathy CPG, JOSPT 2022;52(12):CPG1-CPG111; Tyler et al. J Shoulder Elbow Surg 2010', ARRAY['tennis elbow', 'tendinopathy', 'eccentric', 'elbow']::text[], '[{"id":"f1aa3a53-91f4-3231-bcd5-dadb36f65c68","slug":"tyler-twist-eccentric-wrist-extension","name":"Eccentric Wrist Extension (Tyler Twist)","name_id":"Ekstensi Pergelangan Eksentrik (Tyler Twist)","sets":3,"reps":15,"repetitions":15,"hold_duration":4,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Latihan inti; fase eksentrik 3-4 detik."},{"id":"238e59c5-7f14-3b32-9969-376166e6d100","slug":"eccentric-wrist-extension-dumbbell","name":"Eccentric Wrist Extension with Weight","name_id":"Ekstensi Pergelangan Eksentrik dengan Beban","sets":3,"reps":15,"repetitions":15,"hold_duration":4,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Alternatif bila tidak ada FlexBar."},{"id":"ec7dcc9c-34da-3d9d-b22a-a4f51636a01f","slug":"forearm-pronation-supination","name":"Forearm Pronation-Supination with Weight","name_id":"Pronasi-Supinasi Lengan Bawah dengan Beban","sets":3,"reps":15,"repetitions":15,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"f9efe9dc-3254-30ce-936d-db1d6657ca61","slug":"grip-strengthening-ball","name":"Grip Strengthening (Ball Squeeze)","name_id":"Penguatan Genggaman (Remas Bola)","sets":3,"reps":12,"repetitions":12,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Ukur kemajuan dengan kekuatan genggam."},{"id":"9e7fd2b3-7cd4-3ced-93f8-f6629c26857f","slug":"finger-extension-rubber-band","name":"Finger Extension with Rubber Band","name_id":"Ekstensi Jari dengan Karet Gelang","sets":3,"reps":15,"repetitions":15,"hold_duration":3,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"60718002-77d5-34c9-9167-bc7eec607f8d","slug":"wrist-extensor-stretch","name":"Wrist Extensor Stretch","name_id":"Peregangan Otot Ekstensor Pergelangan","sets":3,"reps":1,"repetitions":1,"hold_duration":40,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Sebelum dan sesudah aktivitas."},{"id":"0487b7c2-166f-3304-a6d2-9760909fddcb","slug":"band-row","name":"Seated Row with Band","name_id":"Dayung Duduk dengan Karet Elastis","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Kekuatan bahu-punggung mengurangi beban pada siku."},{"id":"b1824bb8-02bf-330c-a97e-58bf8595533e","slug":"band-external-rotation","name":"Resisted External Rotation with Band","name_id":"Rotasi Eksternal dengan Karet Elastis","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""}]'::jsonb, 'Active', null, false
),
-- Carpal Tunnel Syndrome - Program Konservatif
(
  'a019336e-fca8-38ed-803e-f93c0433068e', 'carpal-tunnel-conservative', 'Carpal Tunnel Syndrome - Program Konservatif', 'Program konservatif untuk carpal tunnel ringan-sedang: neurodinamik saraf medianus, luncur tendon, penguatan, dan edukasi penggunaan bidai malam.', 'Conservative program for mild-to-moderate carpal tunnel syndrome: median neurodynamics, tendon gliding, strengthening, and night splint education.',
  'Carpal tunnel syndrome ringan sampai sedang', 'Program 6-8 minggu', 'Wrist', 'Mengurangi kesemutan malam hari, memperbaiki fungsi tangan dan kekuatan genggam',
  '6-8 minggu', '2-3x/hari', 'Beginner', 'Rujuk untuk evaluasi bedah bila terdapat kelemahan/pengecilan otot pangkal ibu jari, mati rasa menetap, atau tidak ada perbaikan setelah 6-8 minggu terapi konservatif. Latihan neurodinamik tidak boleh menambah kesemutan.',
  'Kurangi frekuensi bila gejala malam sudah jarang; lanjutkan penguatan dan modifikasi aktivitas.', 'Bidai pergelangan tangan posisi netral saat tidur adalah salah satu intervensi paling efektif. Hindari tidur dengan pergelangan tangan tertekuk. Latihan melengkapi, bukan menggantikan, bidai dan modifikasi aktivitas.', 'B',
  'Erickson et al. Hand Pain and Sensory Deficits: Carpal Tunnel Syndrome CPG, JOSPT 2019;49(5):CPG1-CPG85; Ballestero-Perez et al. JMPT 2017', ARRAY['carpal tunnel', 'nerve glide', 'hand', 'wrist']::text[], '[{"id":"cffecfe2-7e5e-36bd-88cb-1c4b640041b3","slug":"median-nerve-glide","name":"Median Nerve Glide","name_id":"Neurodinamik Saraf Medianus","sets":3,"reps":10,"repetitions":10,"hold_duration":3,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Gerakan lembut - kesemutan tidak boleh bertambah."},{"id":"786880ec-bb08-3e54-a0ec-583d2c1624c4","slug":"tendon-gliding-hand","name":"Tendon Gliding Exercises","name_id":"Latihan Luncur Tendon Tangan","sets":3,"reps":10,"repetitions":10,"hold_duration":3,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Lima posisi berurutan."},{"id":"9673c200-8c19-3b82-98f4-3f382cd528e8","slug":"wrist-active-rom","name":"Wrist Active Range of Motion","name_id":"Lingkup Gerak Aktif Pergelangan Tangan","sets":2,"reps":10,"repetitions":10,"hold_duration":3,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"453be95b-0cda-3770-af69-4bcfbcd61407","slug":"wrist-flexor-stretch","name":"Wrist Flexor Stretch","name_id":"Peregangan Otot Fleksor Pergelangan","sets":3,"reps":1,"repetitions":1,"hold_duration":40,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"f9efe9dc-3254-30ce-936d-db1d6657ca61","slug":"grip-strengthening-ball","name":"Grip Strengthening (Ball Squeeze)","name_id":"Penguatan Genggaman (Remas Bola)","sets":3,"reps":12,"repetitions":12,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Intensitas sedang saja."},{"id":"9e7fd2b3-7cd4-3ced-93f8-f6629c26857f","slug":"finger-extension-rubber-band","name":"Finger Extension with Rubber Band","name_id":"Ekstensi Jari dengan Karet Gelang","sets":3,"reps":15,"repetitions":15,"hold_duration":3,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"10ba579e-9175-38b9-9c11-ae2ddcf244b2","slug":"chin-tuck","name":"Chin Tuck (Craniocervical Flexion)","name_id":"Tarik Dagu (Fleksi Kraniocervikal)","sets":2,"reps":10,"repetitions":10,"hold_duration":10,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Gejala saraf tangan dapat dipengaruhi mobilitas leher."}]'::jsonb, 'Active', null, false
),
-- Tendinopati Achilles Midportion - Protokol Eksentrik
(
  '9a3e23ba-be45-3856-bb85-714408ece594', 'achilles-tendinopathy-alfredson', 'Tendinopati Achilles Midportion - Protokol Eksentrik', 'Protokol Alfredson: pembebanan eksentrik betis 3x15 repetisi (lutut lurus dan ditekuk), dua kali sehari selama 12 minggu.', 'The Alfredson protocol: eccentric calf loading, 3x15 repetitions (straight and bent knee), twice daily for 12 weeks.',
  'Tendinopati Achilles midportion (nyeri 2-6 cm di atas tumit)', 'Program 12 minggu', 'Ankle', 'Mengurangi nyeri tendon dan mengembalikan kapasitas berjalan, berlari, serta melompat',
  '12 minggu', '2x/hari, 7 hari/minggu', 'Intermediate', 'TIDAK untuk tendinopati insersional (nyeri tepat di tulang tumit) - gunakan lantai datar tanpa turun di bawah level. Nyeri sampai 5/10 selama latihan dapat diterima. Hentikan segera bila terjadi nyeri mendadak seperti tertendang disertai ketidakmampuan jinjit (dugaan ruptur - darurat).',
  'Bila 3x15 repetisi dapat dilakukan tanpa nyeri, tambahkan beban dalam ransel mulai 5 kg dan naikkan bertahap.', 'Nyeri selama latihan wajar dan bukan tanda kerusakan. Perbaikan biasanya baru terasa setelah 4-6 minggu dan hasil maksimal pada 12 minggu. Versi dosis lebih rendah ''sesuai toleransi'' memberi hasil serupa bila 180 repetisi/hari terlalu berat.', 'A',
  'Alfredson et al. Am J Sports Med 1998;26(3):360-366; Martin et al. Achilles Pain CPG, JOSPT 2018;48(5):A1-A38; Stevens & Tan JOSPT 2014', ARRAY['Achilles', 'tendinopathy', 'eccentric', 'Alfredson']::text[], '[{"id":"d5672a46-ea41-3e00-8c6a-313ac07aee71","slug":"eccentric-heel-drop-straight-knee","name":"Eccentric Heel Drop - Straight Knee (Alfredson)","name_id":"Turun Tumit Eksentrik Lutut Lurus (Alfredson)","sets":3,"reps":15,"repetitions":15,"hold_duration":3,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Pagi dan sore. Fase turun 3 detik; naik dibantu kaki sehat."},{"id":"efee271b-4cba-3c1b-b845-27397e85dcb8","slug":"eccentric-heel-drop-bent-knee","name":"Eccentric Heel Drop - Bent Knee (Alfredson)","name_id":"Turun Tumit Eksentrik Lutut Ditekuk (Alfredson)","sets":3,"reps":15,"repetitions":15,"hold_duration":3,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Menargetkan soleus; lakukan setelah versi lutut lurus."},{"id":"c96818e9-13c1-3492-adeb-ad5219c42a25","slug":"calf-stretch-gastrocnemius","name":"Calf Stretch (Gastrocnemius)","name_id":"Peregangan Betis (Gastrocnemius)","sets":3,"reps":1,"repetitions":1,"hold_duration":40,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"824f88d2-6b33-39f1-b858-f8276f57f2cf","slug":"soleus-stretch","name":"Soleus Stretch (Bent Knee Calf Stretch)","name_id":"Peregangan Soleus (Lutut Ditekuk)","sets":3,"reps":1,"repetitions":1,"hold_duration":40,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"b7c83c49-0dc3-3d01-8863-15d8a5c2261b","slug":"single-leg-heel-raise","name":"Single-Leg Heel Raise","name_id":"Jinjit Satu Kaki","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Ukur kapasitas: target akhir 25 repetisi satu kaki."},{"id":"9ce4f900-f155-3039-aec5-8f3db2c57e44","slug":"single-leg-stance","name":"Single-Leg Stance","name_id":"Berdiri Satu Kaki","sets":3,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""}]'::jsonb, 'Active', null, false
),
-- Nyeri Tumit Plantar - Latihan Beban Tinggi
(
  'ebf30ed5-8a8e-34c3-8e1e-6d23ecbe4585', 'plantar-heel-pain-high-load', 'Nyeri Tumit Plantar - Latihan Beban Tinggi', 'Program berbasis penelitian Rathleff: jinjit dengan handuk di bawah jari kaki setiap dua hari, dikombinasikan peregangan spesifik fascia plantaris.', 'Rathleff-based program: heel raises with a towel under the toes every second day, combined with plantar fascia-specific stretching.',
  'Plantar fasciitis / nyeri tumit plantar', 'Program 12 minggu', 'Foot', 'Mengurangi nyeri langkah pertama pagi hari dan meningkatkan toleransi berdiri serta berjalan',
  '12 minggu', 'Latihan beban selang sehari; peregangan 3x/hari', 'Intermediate', 'Hentikan bila nyeri meningkat lebih dari 24 jam setelah sesi. Nyeri tumit yang disertai mati rasa atau nyeri malam hari yang hebat perlu evaluasi lebih lanjut (kemungkinan fraktur stres atau jepitan saraf).',
  'Progresi Rathleff: minggu 1-2 = 3x12 tanpa beban; minggu 3-4 = 4x10 dengan beban ransel; minggu 5+ = 5x8 dengan beban lebih berat.', 'Peregangan fascia plantaris SEBELUM menapak di pagi hari adalah kunci mengurangi nyeri langkah pertama. Perbaikan bermakna umumnya terlihat pada 3 bulan. Alas kaki dengan bantalan dan penopang lengkung membantu.', 'A',
  'Rathleff et al. Scand J Med Sci Sports 2015;25(3):e292-e300; Martin et al. Heel Pain CPG, JOSPT 2023;53(12):CPG1-CPG39; DiGiovanni et al. JBJS 2003', ARRAY['plantar fasciitis', 'heel pain', 'high-load', 'foot']::text[], '[{"id":"82e9de72-d7e2-3350-b6a7-77adb574b152","slug":"plantar-fascia-specific-stretch","name":"Plantar Fascia-Specific Stretch","name_id":"Peregangan Khusus Fascia Plantaris","sets":3,"reps":10,"repetitions":10,"hold_duration":10,"rest_between_sets":10,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Sesi pertama SEBELUM turun dari tempat tidur."},{"id":"2a2fc90c-8ad5-362b-a590-b0a8b2447e4b","slug":"heel-raise-towel-toes","name":"Heel Raise with Towel under Toes (High-Load)","name_id":"Jinjit dengan Handuk di Bawah Jari Kaki (Beban Tinggi)","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":90,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Selang sehari. 3 detik naik, 2 detik tahan, 3 detik turun."},{"id":"c96818e9-13c1-3492-adeb-ad5219c42a25","slug":"calf-stretch-gastrocnemius","name":"Calf Stretch (Gastrocnemius)","name_id":"Peregangan Betis (Gastrocnemius)","sets":3,"reps":1,"repetitions":1,"hold_duration":40,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"824f88d2-6b33-39f1-b858-f8276f57f2cf","slug":"soleus-stretch","name":"Soleus Stretch (Bent Knee Calf Stretch)","name_id":"Peregangan Soleus (Lutut Ditekuk)","sets":3,"reps":1,"repetitions":1,"hold_duration":40,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"c7e3cf64-f6f8-3f6b-8606-8dbe769f23af","slug":"short-foot-exercise","name":"Short Foot Exercise (Arch Doming)","name_id":"Latihan Kaki Pendek (Angkat Lengkung Kaki)","sets":3,"reps":12,"repetitions":12,"hold_duration":8,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"bfc37dc8-b16e-3f48-a051-c7780bd4a539","slug":"knee-to-wall-dorsiflexion","name":"Knee-to-Wall Dorsiflexion Mobilisation","name_id":"Mobilisasi Dorsofleksi Lutut ke Dinding","sets":3,"reps":12,"repetitions":12,"hold_duration":3,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Dorsofleksi terbatas adalah faktor risiko utama."}]'::jsonb, 'Active', null, false
),
-- Keseleo Pergelangan Kaki - Fase Awal (0-2 Minggu)
(
  'e2667341-08f8-3b27-b3fd-0b42d08a3452', 'lateral-ankle-sprain-early', 'Keseleo Pergelangan Kaki - Fase Awal (0-2 Minggu)', 'Program fase awal keseleo pergelangan kaki lateral: proteksi, mobilisasi dini terkontrol, dan pemulihan lingkup gerak - mobilisasi dini lebih baik daripada imobilisasi.', 'Early-phase lateral ankle sprain care: protection, controlled early mobilisation, and range-of-motion recovery - early mobilisation beats immobilisation.',
  'Keseleo pergelangan kaki lateral akut (derajat I-II)', 'Fase 1 (0-2 minggu)', 'Ankle', 'Mengurangi bengkak dan nyeri, mengembalikan lingkup gerak dan pola jalan normal',
  '2 minggu', '3-4x/hari', 'Beginner', 'Lakukan evaluasi medis untuk kemungkinan fraktur (Ottawa Ankle Rules) bila tidak mampu menumpu 4 langkah atau ada nyeri tekan pada tulang tertentu. Hindari latihan resistif pada 72 jam pertama bila bengkak masih bertambah.',
  'Naik ke fase keseimbangan/penguatan bila mampu berjalan tanpa pincang, bengkak menurun, dan lingkup gerak mendekati sisi sehat.', 'Protokol POLICE (Protection, Optimal Loading, Ice, Compression, Elevation) menggantikan RICE lama: beban optimal yang dimulai dini mempercepat pemulihan. Sekitar 30-40% keseleo menjadi instabilitas kronis bila rehabilitasi tidak dituntaskan.', 'A',
  'Martin et al. Ankle Stability and Movement Coordination Impairments CPG, JOSPT 2021;51(4):CPG1-CPG80; Vuurberg et al. Br J Sports Med 2018', ARRAY['ankle sprain', 'acute', 'ankle']::text[], '[{"id":"db85f8da-5c7a-3702-b361-0b1f4fb071cf","slug":"ankle-pumps","name":"Ankle Pumps","name_id":"Pompa Pergelangan Kaki","sets":3,"reps":20,"repetitions":20,"hold_duration":2,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Membantu mengurangi bengkak; lakukan dengan tungkai ditinggikan."},{"id":"9911489f-877f-3506-807f-32a0ab0e9e9f","slug":"ankle-alphabet","name":"Ankle Alphabet","name_id":"Alfabet Pergelangan Kaki","sets":2,"reps":1,"repetitions":1,"hold_duration":0,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Lingkup gerak segala arah dalam batas nyaman."},{"id":"bfc37dc8-b16e-3f48-a051-c7780bd4a539","slug":"knee-to-wall-dorsiflexion","name":"Knee-to-Wall Dorsiflexion Mobilisation","name_id":"Mobilisasi Dorsofleksi Lutut ke Dinding","sets":3,"reps":12,"repetitions":12,"hold_duration":3,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Mulai setelah nyeri akut mereda."},{"id":"521cfc4c-19ba-320d-9650-e6c58afcda84","slug":"resisted-ankle-eversion","name":"Resisted Ankle Eversion","name_id":"Eversi Pergelangan Kaki dengan Tahanan","sets":3,"reps":15,"repetitions":15,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Mulai hari ke-3 sampai ke-5 sesuai toleransi."},{"id":"f97ecb32-9eb4-3924-b314-158300de8cb2","slug":"resisted-ankle-dorsiflexion","name":"Resisted Ankle Dorsiflexion","name_id":"Dorsofleksi Pergelangan Kaki dengan Tahanan","sets":3,"reps":15,"repetitions":15,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"4f4e6fce-0cc8-34ce-929f-a64d2e068be1","slug":"double-leg-heel-raise","name":"Double-Leg Heel Raise","name_id":"Jinjit Dua Kaki","sets":3,"reps":15,"repetitions":15,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Mulai saat menumpu berat badan sudah nyaman."}]'::jsonb, 'Active', null, false
),
-- Instabilitas Pergelangan Kaki Kronis - Keseimbangan & Penguatan
(
  '0256f195-d323-3eaa-ad97-a20c7611f4b6', 'chronic-ankle-instability', 'Instabilitas Pergelangan Kaki Kronis - Keseimbangan & Penguatan', 'Program keseimbangan dan penguatan 4-6 minggu untuk instabilitas pergelangan kaki kronis dan pencegahan keseleo berulang.', '4-6 week balance and strengthening program for chronic ankle instability and recurrent sprain prevention.',
  'Instabilitas pergelangan kaki kronis / keseleo berulang', 'Program 4-6 minggu, dilanjutkan pemeliharaan', 'Ankle', 'Mengurangi episode giving way, meningkatkan kontrol keseimbangan dan kepercayaan diri di permukaan tidak rata',
  '4-6 minggu', '5x/minggu', 'Intermediate', 'Lakukan latihan keseimbangan di dekat pegangan. Hentikan bila nyeri sendi meningkat atau muncul rasa mengunci (kemungkinan lesi osteokondral - perlu evaluasi).',
  'Naikkan kesulitan bila mampu bertahan 30 detik tanpa kaki lain menyentuh lantai selama 3 sesi berturut-turut.', 'Latihan keseimbangan 4-6 minggu terbukti menurunkan risiko keseleo ulang secara bermakna. Melanjutkan latihan 1-2x/minggu setelah program selesai mempertahankan manfaat.', 'A',
  'Martin et al. Ankle Stability CPG, JOSPT 2021; Wester et al. JOSPT 1996; McKeon & Hertel J Athl Train 2008', ARRAY['ankle instability', 'balance', 'proprioception', 'prevention']::text[], '[{"id":"9ce4f900-f155-3039-aec5-8f3db2c57e44","slug":"single-leg-stance","name":"Single-Leg Stance","name_id":"Berdiri Satu Kaki","sets":3,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Progresi: mata terbuka -> mata tertutup."},{"id":"edb844f4-1162-3052-bda0-ce71c70766cf","slug":"single-leg-stance-foam","name":"Single-Leg Stance on Foam / Wobble Board","name_id":"Berdiri Satu Kaki di Busa / Papan Keseimbangan","sets":5,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Latihan inti program - 5x30 detik setiap hari."},{"id":"521cfc4c-19ba-320d-9650-e6c58afcda84","slug":"resisted-ankle-eversion","name":"Resisted Ankle Eversion","name_id":"Eversi Pergelangan Kaki dengan Tahanan","sets":3,"reps":15,"repetitions":15,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Penguatan peroneal mencegah keseleo ulang."},{"id":"f97ecb32-9eb4-3924-b314-158300de8cb2","slug":"resisted-ankle-dorsiflexion","name":"Resisted Ankle Dorsiflexion","name_id":"Dorsofleksi Pergelangan Kaki dengan Tahanan","sets":3,"reps":15,"repetitions":15,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"b7c83c49-0dc3-3d01-8863-15d8a5c2261b","slug":"single-leg-heel-raise","name":"Single-Leg Heel Raise","name_id":"Jinjit Satu Kaki","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"c7e3cf64-f6f8-3f6b-8606-8dbe769f23af","slug":"short-foot-exercise","name":"Short Foot Exercise (Arch Doming)","name_id":"Latihan Kaki Pendek (Angkat Lengkung Kaki)","sets":3,"reps":12,"repetitions":12,"hold_duration":8,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"bfc37dc8-b16e-3f48-a051-c7780bd4a539","slug":"knee-to-wall-dorsiflexion","name":"Knee-to-Wall Dorsiflexion Mobilisation","name_id":"Mobilisasi Dorsofleksi Lutut ke Dinding","sets":3,"reps":12,"repetitions":12,"hold_duration":3,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"3dcb4e38-e5ce-32f8-a09a-371fad030e66","slug":"step-over-obstacle","name":"Step Over Obstacle","name_id":"Melangkahi Rintangan","sets":3,"reps":10,"repetitions":10,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Latihan fungsional tahap akhir."}]'::jsonb, 'Active', null, false
),
-- Tendinopati Gluteal (Nyeri Sisi Luar Panggul)
(
  '28a2527f-850f-3239-be36-29d275568d42', 'gluteal-tendinopathy-leap', 'Tendinopati Gluteal (Nyeri Sisi Luar Panggul)', 'Program edukasi dan latihan bertahap berbasis uji klinis LEAP: isometrik abduksi, penguatan progresif, dan modifikasi beban sehari-hari.', 'Education plus graded exercise based on the LEAP trial: isometric abduction, progressive strengthening, and daily load modification.',
  'Tendinopati gluteus medius/minimus (greater trochanteric pain syndrome)', 'Program 8-12 minggu', 'Hip', 'Mengurangi nyeri sisi luar panggul saat tidur menyamping, berjalan, dan naik tangga',
  '8-12 minggu', '6 hari/minggu (selang beban rendah dan tinggi, 1 hari istirahat)', 'Beginner', 'HINDARI posisi yang menekan tendon: menyilangkan kaki, berdiri bertumpu pada satu pinggul, tidur menyamping pada sisi nyeri tanpa bantal di antara lutut, dan peregangan iliotibial band yang agresif. Nyeri tidak boleh meningkat > 24 jam.',
  'Dari isometrik ke latihan menahan beban badan bila nyeri terkontrol; lanjut ke penguatan dinamis dan fungsional bertahap.', 'Edukasi manajemen beban adalah bagian terapi yang sama pentingnya dengan latihan. Uji LEAP menunjukkan edukasi + latihan lebih baik daripada suntikan kortikosteroid maupun menunggu, baik pada 8 minggu maupun 52 minggu.', 'A',
  'Mellor et al. BMJ 2018;361:k1662 (LEAP trial); Grimaldi & Fearon JOSPT 2015;45(11):910-922', ARRAY['gluteal tendinopathy', 'hip', 'LEAP', 'trochanteric pain']::text[], '[{"id":"d0063d73-aa97-3907-a346-2cc9f58cf58b","slug":"isometric-hip-abduction-wall","name":"Isometric Hip Abduction (Wall Press)","name_id":"Isometrik Abduksi Pinggul (Tekan Dinding)","sets":5,"reps":1,"repetitions":1,"hold_duration":40,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Tahap 1 - hari beban rendah."},{"id":"c2f149f2-f58b-3135-a06b-276a1a6a1a47","slug":"bridging","name":"Bridging (Glute Bridge)","name_id":"Angkat Pinggul (Bridging)","sets":3,"reps":12,"repetitions":12,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"35f87135-1da6-36d1-94ca-448a6300fe35","slug":"clamshell","name":"Clamshell","name_id":"Clamshell (Buka Lutut Menyamping)","sets":3,"reps":15,"repetitions":15,"hold_duration":3,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Hindari adduksi berlebihan saat kembali."},{"id":"3423a649-246b-3c07-8983-1847afb3e571","slug":"side-lying-hip-abduction","name":"Side-Lying Hip Abduction","name_id":"Angkat Tungkai Menyamping","sets":3,"reps":15,"repetitions":15,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Jangan mengangkat terlalu tinggi."},{"id":"6659ecf4-e7c7-32ac-b8e3-1d1a3f6f5f17","slug":"sit-to-stand","name":"Sit to Stand","name_id":"Duduk ke Berdiri","sets":3,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"18e81e43-206b-3409-9ead-602cd2e00387","slug":"standing-hip-abduction","name":"Standing Hip Abduction","name_id":"Abduksi Pinggul Berdiri","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Hari beban tinggi."},{"id":"7838d23c-140d-3267-a85e-91ceb10e9579","slug":"step-up","name":"Step Up","name_id":"Naik Tangga (Step Up)","sets":3,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Perhatikan panggul tetap sejajar."},{"id":"9ce4f900-f155-3039-aec5-8f3db2c57e44","slug":"single-leg-stance","name":"Single-Leg Stance","name_id":"Berdiri Satu Kaki","sets":3,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""}]'::jsonb, 'Active', null, false
),
-- Cedera Hamstring - Penguatan & Kembali Berlari
(
  'ef7b9eb4-3032-353b-b402-9b838cd55707', 'hamstring-strain-return-to-run', 'Cedera Hamstring - Penguatan & Kembali Berlari', 'Program penguatan hamstring bertahap dengan penekanan eksentrik (Nordic) untuk pemulihan cedera dan pencegahan cedera ulang.', 'Graded hamstring strengthening with an eccentric (Nordic) emphasis for injury recovery and re-injury prevention.',
  'Cedera regangan hamstring derajat I-II, fase subakut hingga kembali berolahraga', 'Fase 2-3 (setelah nyeri akut mereda)', 'Knee', 'Mengembalikan kekuatan eksentrik hamstring, panjang otot fungsional, dan kapasitas berlari',
  '6-10 minggu', '2-3x/minggu', 'Advanced', 'Jangan memulai Nordic hamstring pada fase akut (< 2-3 minggu atau saat masih nyeri saat berjalan). Nyeri otot tertunda (DOMS) sangat umum pada 1-2 minggu pertama - naikkan volume maksimal 2 repetisi per minggu. Hentikan bila nyeri tajam di lokasi cedera.',
  'Kembali berlari bertahap bila: kekuatan hamstring simetris (< 10% selisih), tidak ada nyeri saat jalan cepat, dan mampu Nordic 3x8 tanpa nyeri.', 'Cedera hamstring memiliki angka kekambuhan tinggi bila kembali berolahraga terlalu cepat. Latihan eksentrik seperti Nordic menurunkan risiko cedera ulang hingga sekitar 50% dan harus dilanjutkan sebagai pemeliharaan 1x/minggu.', 'A',
  'Petersen et al. Am J Sports Med 2011;39(11):2296-2303; van Dyk et al. Br J Sports Med 2019; Askling et al. Br J Sports Med 2013', ARRAY['hamstring', 'sports', 'eccentric', 'return to sport']::text[], '[{"id":"c2f149f2-f58b-3135-a06b-276a1a6a1a47","slug":"bridging","name":"Bridging (Glute Bridge)","name_id":"Angkat Pinggul (Bridging)","sets":3,"reps":12,"repetitions":12,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Awali dengan versi dua kaki."},{"id":"cf0c76ce-2a71-3230-80a9-2ae34393b4fe","slug":"single-leg-bridge","name":"Single-Leg Bridge","name_id":"Angkat Pinggul Satu Kaki","sets":3,"reps":10,"repetitions":10,"hold_duration":3,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"7ee694e0-020a-316e-b056-9fb0c90a5782","slug":"hamstring-curl-prone","name":"Prone Hamstring Curl","name_id":"Curl Hamstring Tengkurap","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"1dd125ec-6d26-3563-8710-0b99a0e60e2c","slug":"nordic-hamstring-curl","name":"Nordic Hamstring Curl","name_id":"Nordic Hamstring Curl","sets":3,"reps":8,"repetitions":8,"hold_duration":0,"rest_between_sets":90,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Ikuti progresi 10 minggu; mulai 2x5 sekali seminggu."},{"id":"6709fdba-003a-3c95-8bb3-9c240affe244","slug":"hip-hinge-pattern","name":"Hip Hinge Pattern Training","name_id":"Latihan Pola Menekuk Panggul (Hip Hinge)","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"174456a1-f87b-30b8-811a-7b1ac9ccf524","slug":"supine-hamstring-stretch","name":"Supine Hamstring Stretch with Strap","name_id":"Peregangan Hamstring Telentang dengan Tali","sets":2,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Peregangan lembut saja pada fase awal."},{"id":"43361f9b-7901-3208-ac19-e0cc26da144a","slug":"copenhagen-adduction","name":"Copenhagen Adduction (Modified)","name_id":"Copenhagen Adduction (Modifikasi)","sets":2,"reps":8,"repetitions":8,"hold_duration":3,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Untuk atlet - pencegahan cedera selangkangan."},{"id":"baee4323-5662-3b44-8531-a1f4fa30c052","slug":"walking-program","name":"Structured Walking Program","name_id":"Program Jalan Kaki Terstruktur","sets":1,"reps":1,"repetitions":1,"hold_duration":0,"rest_between_sets":0,"prepare_time":5,"work_time":1200,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Bertahap menuju jogging ringan sesuai kriteria."}]'::jsonb, 'Active', null, false
),
-- Osteoartritis Panggul - Latihan Terapeutik
(
  '7c822fd1-a717-3f6c-9a77-db8a1fe75be6', 'hip-osteoarthritis', 'Osteoartritis Panggul - Latihan Terapeutik', 'Program latihan terapi untuk osteoartritis panggul: penguatan abduktor dan ekstensor panggul, latihan fungsional, dan aktivitas aerobik.', 'Therapeutic exercise for hip osteoarthritis: hip abductor and extensor strengthening, functional training, and aerobic activity.',
  'Osteoartritis panggul', 'Program 8-12 minggu, dilanjutkan pemeliharaan', 'Hip', 'Mengurangi nyeri panggul, meningkatkan kekuatan dan jarak berjalan',
  '8-12 minggu', '3x/minggu', 'Beginner', 'Nyeri sampai 5/10 saat latihan dapat diterima bila kembali normal dalam 24 jam. Bila nyeri panggul disertai demam, penurunan berat badan, atau nyeri malam hebat, perlu evaluasi medis.',
  'Naikkan beban atau repetisi bila latihan terasa mudah selama 2 sesi berturut-turut tanpa peningkatan nyeri lebih dari 24 jam.', 'Latihan adalah terapi lini pertama untuk osteoartritis panggul dan direkomendasikan semua pedoman internasional. Manfaat sebanding dengan obat pereda nyeri tanpa efek samping, tetapi memerlukan konsistensi minimal 8 minggu.', 'A',
  'Fransen et al. Cochrane 2014;4:CD007912 (hip OA exercise); Cibulka et al. Hip Pain and Mobility Deficits CPG, JOSPT 2017;47(6):A1-A37', ARRAY['hip OA', 'osteoarthritis', 'strength']::text[], '[{"id":"baee4323-5662-3b44-8531-a1f4fa30c052","slug":"walking-program","name":"Structured Walking Program","name_id":"Program Jalan Kaki Terstruktur","sets":1,"reps":1,"repetitions":1,"hold_duration":0,"rest_between_sets":0,"prepare_time":5,"work_time":600,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Pemanasan 10 menit."},{"id":"c2f149f2-f58b-3135-a06b-276a1a6a1a47","slug":"bridging","name":"Bridging (Glute Bridge)","name_id":"Angkat Pinggul (Bridging)","sets":3,"reps":12,"repetitions":12,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"35f87135-1da6-36d1-94ca-448a6300fe35","slug":"clamshell","name":"Clamshell","name_id":"Clamshell (Buka Lutut Menyamping)","sets":3,"reps":15,"repetitions":15,"hold_duration":3,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"18e81e43-206b-3409-9ead-602cd2e00387","slug":"standing-hip-abduction","name":"Standing Hip Abduction","name_id":"Abduksi Pinggul Berdiri","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"ee5e9688-d701-32fb-bb23-d0aa2e64771e","slug":"standing-hip-extension","name":"Standing Hip Extension","name_id":"Ekstensi Pinggul Berdiri","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"6659ecf4-e7c7-32ac-b8e3-1d1a3f6f5f17","slug":"sit-to-stand","name":"Sit to Stand","name_id":"Duduk ke Berdiri","sets":3,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"310df6b5-3d32-3f28-bd36-b9d8cce7af28","slug":"chair-squat","name":"Chair Squat (Sit-Back Squat)","name_id":"Squat ke Kursi","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"bfb5b5de-cd80-33fa-aa87-4eb813eeee64","slug":"hip-flexor-stretch-half-kneeling","name":"Half-Kneeling Hip Flexor Stretch","name_id":"Peregangan Fleksor Pinggul Setengah Berlutut","sets":2,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Gunakan versi berdiri bila berlutut nyeri."},{"id":"9ce4f900-f155-3039-aec5-8f3db2c57e44","slug":"single-leg-stance","name":"Single-Leg Stance","name_id":"Berdiri Satu Kaki","sets":3,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""}]'::jsonb, 'Active', null, false
),
-- Pencegahan Jatuh Lansia - Program Otago
(
  '2feff032-5fba-301a-8c98-2f1fa1de2ffd', 'falls-prevention-otago', 'Pencegahan Jatuh Lansia - Program Otago', 'Program latihan kekuatan dan keseimbangan berbasis Otago Exercise Programme: latihan 3x/minggu ditambah berjalan, terbukti menurunkan angka jatuh 35-40% pada lansia.', 'Strength and balance program based on the Otago Exercise Programme: exercises three times weekly plus walking, shown to reduce falls by 35-40% in older adults.',
  'Lansia dengan risiko jatuh, riwayat jatuh dalam 12 bulan terakhir, atau gangguan keseimbangan', 'Program inti 6 bulan, dilanjutkan seumur hidup', 'General', 'Meningkatkan kekuatan tungkai dan keseimbangan, menurunkan risiko dan angka jatuh',
  '6 bulan', 'Latihan 3x/minggu + jalan kaki 2-3x/minggu', 'Beginner', 'Semua latihan keseimbangan harus dilakukan di dekat pegangan yang kokoh (meja/kursi berat/dinding). Hentikan bila muncul pusing berputar, nyeri dada, atau sesak. Pastikan alas kaki tertutup dan tidak licin, serta pencahayaan cukup.',
  'Kurangi dukungan tangan secara bertahap (dua tangan -> satu tangan -> satu jari -> tanpa pegangan) dan tambahkan beban pergelangan kaki bila 3 set x 12 repetisi terasa mudah.', 'Jatuh bukan bagian normal dari penuaan dan sebagian besar dapat dicegah. Manfaat terbesar diperoleh bila latihan dilakukan minimal 2 jam per minggu dan berkelanjutan - manfaat hilang bila latihan dihentikan. Uji 30-detik chair stand dan four-stage balance dapat digunakan untuk memantau kemajuan.', 'A',
  'Campbell et al. BMJ 1997;315:1065 (Otago); Robertson et al. BMJ 2001;322:697; Sherrington et al. Br J Sports Med 2017 (falls prevention meta-analysis)', ARRAY['falls prevention', 'Otago', 'geriatric', 'balance']::text[], '[{"id":"6659ecf4-e7c7-32ac-b8e3-1d1a3f6f5f17","slug":"sit-to-stand","name":"Sit to Stand","name_id":"Duduk ke Berdiri","sets":3,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Latihan kekuatan tungkai paling penting; catat jumlah dalam 30 detik setiap bulan."},{"id":"18e81e43-206b-3409-9ead-602cd2e00387","slug":"standing-hip-abduction","name":"Standing Hip Abduction","name_id":"Abduksi Pinggul Berdiri","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Tambahkan beban pergelangan kaki sebagai progresi."},{"id":"ee5e9688-d701-32fb-bb23-d0aa2e64771e","slug":"standing-hip-extension","name":"Standing Hip Extension","name_id":"Ekstensi Pinggul Berdiri","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"4f4e6fce-0cc8-34ce-929f-a64d2e068be1","slug":"double-leg-heel-raise","name":"Double-Leg Heel Raise","name_id":"Jinjit Dua Kaki","sets":3,"reps":15,"repetitions":15,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Berpegangan pada meja."},{"id":"c75626d7-38c8-3ed8-8bc0-e4a17c6916c4","slug":"tandem-stance","name":"Tandem Stance","name_id":"Berdiri Tandem (Kaki Sejajar Depan-Belakang)","sets":3,"reps":1,"repetitions":1,"hold_duration":20,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Progresi: kaki rapat -> semi-tandem -> tandem penuh."},{"id":"9ce4f900-f155-3039-aec5-8f3db2c57e44","slug":"single-leg-stance","name":"Single-Leg Stance","name_id":"Berdiri Satu Kaki","sets":3,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"d1d55be7-b3a8-3a0a-bf9b-9f180e77348b","slug":"tandem-walk","name":"Tandem Walk (Heel-to-Toe Walking)","name_id":"Jalan Tandem (Tumit ke Jari Kaki)","sets":4,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"2f02aac8-df3f-31dd-af74-ec77365a5543","slug":"sideways-walking","name":"Sideways Walking","name_id":"Berjalan Menyamping","sets":4,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"764a4358-8e9b-3975-8bc8-da946e522f5f","slug":"backward-walking","name":"Backward Walking","name_id":"Berjalan Mundur","sets":4,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Pastikan jalur bebas hambatan."},{"id":"baee4323-5662-3b44-8531-a1f4fa30c052","slug":"walking-program","name":"Structured Walking Program","name_id":"Program Jalan Kaki Terstruktur","sets":1,"reps":1,"repetitions":1,"hold_duration":0,"rest_between_sets":0,"prepare_time":5,"work_time":1800,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Berjalan hingga 30 menit, 2-3x/minggu di hari berbeda dari latihan kekuatan."}]'::jsonb, 'Active', null, false
),
-- Kesehatan Tulang - Osteopenia & Osteoporosis
(
  '0a877d5f-54fd-3b96-84cc-2caa527755ce', 'osteoporosis-bone-health', 'Kesehatan Tulang - Osteopenia & Osteoporosis', 'Program pembebanan progresif untuk kepadatan tulang: latihan beban dengan pengawasan, pembebanan impak, dan latihan postur-keseimbangan.', 'Progressive loading program for bone density: supervised resistance training, impact loading, and posture-balance work.',
  'Osteopenia dan osteoporosis (tanpa fraktur vertebra baru)', 'Fase pembelajaran teknik 4-6 minggu, dilanjutkan pembebanan progresif', 'General', 'Meningkatkan atau mempertahankan kepadatan mineral tulang, meningkatkan kekuatan otot dan keseimbangan, menurunkan risiko fraktur akibat jatuh',
  '8 bulan program inti, dilanjutkan pemeliharaan', '2x/minggu latihan beban; impak 4-5x/minggu', 'Advanced', 'Latihan beban berat HARUS diawasi profesional terlatih dan didahului fase pembelajaran teknik. HINDARI: membungkuk ke depan dengan beban, gerakan memutar tulang belakang berbeban, dan sit-up. Konsultasikan dengan dokter bila ada riwayat fraktur vertebra, nyeri punggung baru, atau penurunan tinggi badan.',
  'Naikkan beban hanya setelah teknik dikuasai dan konsisten selama 4-6 minggu. Progresi beban bertahap menuju 80-85% 1RM sesuai toleransi dan pengawasan.', 'Latihan intensitas tinggi terawasi terbukti aman pada osteoporosis - uji LIFTMOR tidak menemukan fraktur pada 101 peserta selama 8 bulan. Latihan beban ringan dengan banyak repetisi TIDAK cukup merangsang tulang. Latihan melengkapi (bukan menggantikan) asupan kalsium, vitamin D, dan obat bila diresepkan.', 'A',
  'Watson et al. J Bone Miner Res 2018;33(2):211-220 (LIFTMOR); Beck et al. J Sci Med Sport 2017 (Exercise and Sports Science Australia position statement)', ARRAY['osteoporosis', 'bone health', 'strength', 'supervised']::text[], '[{"id":"e7fc486f-4f7c-3562-902f-e02a215fea09","slug":"loaded-squat-osteoporosis","name":"Progressive Loaded Squat (Bone Loading)","name_id":"Squat dengan Beban Progresif (Pembebanan Tulang)","sets":5,"reps":5,"repetitions":5,"hold_duration":0,"rest_between_sets":120,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"HANYA dengan pengawasan terlatih setelah fase pembelajaran teknik."},{"id":"6709fdba-003a-3c95-8bb3-9c240affe244","slug":"hip-hinge-pattern","name":"Hip Hinge Pattern Training","name_id":"Latihan Pola Menekuk Panggul (Hip Hinge)","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Prasyarat teknik sebelum deadlift berbeban."},{"id":"eb813a2c-4535-3011-8c78-8edb84adc1ff","slug":"heel-drop-impact-bone","name":"Heel Drop (Bone Impact Loading)","name_id":"Hentakan Tumit (Pembebanan Impak Tulang)","sets":2,"reps":15,"repetitions":15,"hold_duration":0,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Pembebanan impak untuk panggul dan tulang belakang."},{"id":"6652b4f0-776c-3bee-a042-0f09b34b66ce","slug":"resistance-training-major-muscle-groups","name":"Whole-Body Resistance Circuit","name_id":"Sirkuit Latihan Beban Seluruh Tubuh","sets":3,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":75,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Sirkuit dasar bagi yang belum siap beban berat."},{"id":"dbe84c48-cc01-3870-8d44-5d7c6f1c80e0","slug":"prone-y-raise","name":"Prone Y Raise (Lower Trapezius)","name_id":"Angkat Lengan Y Tengkurap (Trapezius Bawah)","sets":3,"reps":10,"repetitions":10,"hold_duration":5,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Penguatan ekstensor punggung untuk postur."},{"id":"7bd763e3-2137-3791-99f3-ee669db17651","slug":"thoracic-extension-foam-roller","name":"Thoracic Extension over Roller","name_id":"Ekstensi Punggung Atas dengan Roller","sets":2,"reps":8,"repetitions":8,"hold_duration":5,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"9ce4f900-f155-3039-aec5-8f3db2c57e44","slug":"single-leg-stance","name":"Single-Leg Stance","name_id":"Berdiri Satu Kaki","sets":3,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Pencegahan jatuh sama pentingnya dengan kepadatan tulang."},{"id":"c75626d7-38c8-3ed8-8bc0-e4a17c6916c4","slug":"tandem-stance","name":"Tandem Stance","name_id":"Berdiri Tandem (Kaki Sejajar Depan-Belakang)","sets":3,"reps":1,"repetitions":1,"hold_duration":20,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""}]'::jsonb, 'Active', null, false
),
-- Rehabilitasi Stroke - Mobilitas & Kontrol Batang Tubuh
(
  'fb33eabd-cd57-3c3c-acfa-47e3473ce009', 'stroke-early-mobility', 'Rehabilitasi Stroke - Mobilitas & Kontrol Batang Tubuh', 'Program latihan berulang berorientasi tugas untuk pemulihan pasca stroke: kontrol batang tubuh, transfer, kekuatan tungkai, dan daya tahan berjalan.', 'Task-oriented repetitive training after stroke: trunk control, transfers, leg strength, and walking endurance.',
  'Pasca stroke, fase subakut hingga kronis, dengan gangguan mobilitas', 'Fase subakut-kronis', 'General', 'Meningkatkan kontrol duduk dan berdiri, kemampuan transfer, kapasitas berjalan, dan kemandirian aktivitas sehari-hari',
  '8-12 minggu, dilanjutkan pemeliharaan', '3-5x/minggu', 'Beginner', 'Latihan harus disesuaikan tingkat kemampuan dan diawasi bila kontrol postur belum stabil. Pantau tekanan darah dan denyut nadi pada pasien dengan penyakit jantung. Hentikan bila muncul gejala neurologis baru - segera cari pertolongan medis. Latihan agresif pada fase sangat akut tidak dianjurkan.',
  'Naikkan repetisi dan kurangi bantuan secara bertahap. Target aerobik: minimal 120 menit/minggu pada intensitas 40-70% cadangan denyut jantung untuk memperbaiki kapasitas berjalan.', 'Jumlah pengulangan gerakan berperan besar dalam pemulihan otak (neuroplastisitas) - latihan yang sering dan spesifik pada tugas nyata lebih efektif daripada latihan pasif. Latihan kekuatan tidak meningkatkan spastisitas.', 'A',
  'Winstein et al. AHA/ASA Adult Stroke Rehabilitation and Recovery Guideline, Stroke 2016;47(6):e98-e169; Billinger et al. Stroke 2014 (physical activity after stroke)', ARRAY['stroke', 'neuro', 'task-specific', 'mobility']::text[], '[{"id":"a597c7ad-9d29-3d79-9657-bd5b1e9398ed","slug":"seated-trunk-rotation","name":"Seated Trunk Rotation and Reach","name_id":"Rotasi dan Julur Batang Tubuh Duduk","sets":2,"reps":10,"repetitions":10,"hold_duration":2,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Kontrol batang tubuh sebagai dasar semua fungsi."},{"id":"c2f149f2-f58b-3135-a06b-276a1a6a1a47","slug":"bridging","name":"Bridging (Glute Bridge)","name_id":"Angkat Pinggul (Bridging)","sets":3,"reps":12,"repetitions":12,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Penting untuk transfer di tempat tidur."},{"id":"6659ecf4-e7c7-32ac-b8e3-1d1a3f6f5f17","slug":"sit-to-stand","name":"Sit to Stand","name_id":"Duduk ke Berdiri","sets":3,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Latihan fungsional paling penting; gunakan kursi tinggi bila perlu."},{"id":"f97ecb32-9eb4-3924-b314-158300de8cb2","slug":"resisted-ankle-dorsiflexion","name":"Resisted Ankle Dorsiflexion","name_id":"Dorsofleksi Pergelangan Kaki dengan Tahanan","sets":3,"reps":15,"repetitions":15,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Untuk foot drop dan mencegah tersandung."},{"id":"7838d23c-140d-3267-a85e-91ceb10e9579","slug":"step-up","name":"Step Up","name_id":"Naik Tangga (Step Up)","sets":3,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Dengan pegangan dan pengawasan."},{"id":"9ce4f900-f155-3039-aec5-8f3db2c57e44","slug":"single-leg-stance","name":"Single-Leg Stance","name_id":"Berdiri Satu Kaki","sets":3,"reps":1,"repetitions":1,"hold_duration":20,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Dengan pegangan."},{"id":"2f02aac8-df3f-31dd-af74-ec77365a5543","slug":"sideways-walking","name":"Sideways Walking","name_id":"Berjalan Menyamping","sets":4,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"baee4323-5662-3b44-8531-a1f4fa30c052","slug":"walking-program","name":"Structured Walking Program","name_id":"Program Jalan Kaki Terstruktur","sets":1,"reps":1,"repetitions":1,"hold_duration":0,"rest_between_sets":0,"prepare_time":5,"work_time":1200,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Target minimal 120 menit/minggu untuk kapasitas berjalan."},{"id":"1bc90f41-93ba-33d0-a361-17204b1c4bf0","slug":"seated-arm-raises-unsupported","name":"Unsupported Arm Raises","name_id":"Angkat Lengan Tanpa Sangga","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Latihan lengan pada sisi yang terkena sesuai kemampuan."}]'::jsonb, 'Active', null, false
),
-- Penyakit Parkinson - Latihan Amplitudo Besar
(
  '2f95d602-668f-3e27-80cb-e703ece0e28a', 'parkinson-amplitude-training', 'Penyakit Parkinson - Latihan Amplitudo Besar', 'Program latihan gerakan berlebihan berintensitas tinggi berbasis prinsip LSVT BIG untuk melawan bradikinesia dan pengecilan gerakan.', 'High-intensity oversized-movement training based on LSVT BIG principles to counter bradykinesia and movement shrinkage.',
  'Penyakit Parkinson tahap ringan-sedang', 'Program intensif 4 minggu, dilanjutkan latihan harian mandiri', 'General', 'Memperbesar amplitudo gerakan, memperbaiki kecepatan berjalan dan panjang langkah, meningkatkan keseimbangan dan kemandirian',
  '4 minggu intensif + pemeliharaan seumur hidup', 'Program intensif 4x/minggu; latihan mandiri harian', 'Intermediate', 'Perlu pengawasan pada risiko jatuh dan hipotensi ortostatik. Waspadai freezing of gait - gunakan isyarat visual (garis di lantai) atau auditori (hitungan/metronom). Sesuaikan jadwal latihan dengan waktu obat bekerja optimal (fase ''on'').',
  'Naikkan amplitudo dan kompleksitas gerakan, lalu tambahkan tugas ganda (berhitung, menyebut kata) untuk melatih fungsi di dunia nyata.', 'Kuncinya adalah INTENSITAS dan USAHA MAKSIMAL, bukan jumlah repetisi. Gerakan yang terasa ''berlebihan'' bagi pasien biasanya baru mencapai amplitudo normal. Latihan harus berkelanjutan - manfaat menurun bila dihentikan.', 'A',
  'Ebersbach et al. Mov Disord 2010;25(12):1902-1908 (LSVT BIG RCT); Osborne et al. Parkinson Disease CPG, J Neurol Phys Ther 2022;46(4):240-269', ARRAY['Parkinson', 'LSVT BIG', 'amplitude', 'neuro']::text[], '[{"id":"48bee2ff-a1aa-35b8-b12b-d29c6831824d","slug":"sit-to-stand-amplitude","name":"Big Sit-to-Stand (Amplitude Training)","name_id":"Duduk-Berdiri Amplitudo Besar","sets":3,"reps":10,"repetitions":10,"hold_duration":2,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Gerakan sebesar mungkin dengan hitungan lantang."},{"id":"53552abf-a236-3153-b44f-f48f92f33b49","slug":"big-forward-step-and-reach","name":"Big Forward Step and Reach","name_id":"Langkah Besar ke Depan dengan Julur Lengan","sets":3,"reps":10,"repetitions":10,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Langkah sejauh mungkin."},{"id":"a597c7ad-9d29-3d79-9657-bd5b1e9398ed","slug":"seated-trunk-rotation","name":"Seated Trunk Rotation and Reach","name_id":"Rotasi dan Julur Batang Tubuh Duduk","sets":2,"reps":10,"repetitions":10,"hold_duration":2,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Jangkauan besar ke luar basis penopang."},{"id":"3dcb4e38-e5ce-32f8-a09a-371fad030e66","slug":"step-over-obstacle","name":"Step Over Obstacle","name_id":"Melangkahi Rintangan","sets":3,"reps":10,"repetitions":10,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Isyarat visual membantu mengatasi freezing."},{"id":"d1d55be7-b3a8-3a0a-bf9b-9f180e77348b","slug":"tandem-walk","name":"Tandem Walk (Heel-to-Toe Walking)","name_id":"Jalan Tandem (Tumit ke Jari Kaki)","sets":4,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Dengan pengawasan."},{"id":"2f02aac8-df3f-31dd-af74-ec77365a5543","slug":"sideways-walking","name":"Sideways Walking","name_id":"Berjalan Menyamping","sets":4,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"7bd763e3-2137-3791-99f3-ee669db17651","slug":"thoracic-extension-foam-roller","name":"Thoracic Extension over Roller","name_id":"Ekstensi Punggung Atas dengan Roller","sets":2,"reps":8,"repetitions":8,"hold_duration":5,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Melawan postur membungkuk."},{"id":"baee4323-5662-3b44-8531-a1f4fa30c052","slug":"walking-program","name":"Structured Walking Program","name_id":"Program Jalan Kaki Terstruktur","sets":1,"reps":1,"repetitions":1,"hold_duration":0,"rest_between_sets":0,"prepare_time":5,"work_time":1800,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Berjalan dengan langkah besar dan ayunan lengan lebar."}]'::jsonb, 'Active', null, false
),
-- Rehabilitasi Vestibular - Hipofungsi Vestibular Unilateral
(
  '711f3f05-6db2-3024-8fc9-ac1978ee5ee2', 'vestibular-hypofunction', 'Rehabilitasi Vestibular - Hipofungsi Vestibular Unilateral', 'Program adaptasi refleks vestibulo-okular dan latihan keseimbangan sesuai dosis pedoman klinis 2022.', 'VOR adaptation and balance training dosed per the 2022 clinical practice guideline.',
  'Hipofungsi vestibular perifer unilateral (neuritis vestibular, pasca labirintitis, gangguan keseimbangan vestibular)', 'Program 4-6 minggu', 'Balance', 'Mengurangi pusing dan ketidakstabilan, memperbaiki ketajaman penglihatan dinamis dan keseimbangan berjalan',
  '4-6 minggu', '3-5x/hari (sesi pendek)', 'Beginner', 'Pusing ringan-sedang selama latihan adalah NORMAL dan diperlukan untuk adaptasi, tetapi harus mereda dalam beberapa menit. Hentikan dan cari evaluasi medis bila muncul gejala neurologis (bicara pelo, penglihatan ganda, kelemahan, kesulitan menelan) atau nyeri kepala hebat mendadak. Lakukan latihan berdiri di dekat pegangan.',
  'Naikkan kesulitan: duduk -> berdiri -> berdiri kaki rapat -> berjalan; latar polos -> berpola; kecepatan gerakan kepala bertambah.', 'Menghindari gerakan kepala justru memperlambat pemulihan. Otak membutuhkan sinyal ''error'' dari gerakan untuk beradaptasi. Dosis harian yang cukup lebih penting daripada satu sesi panjang: minimal 12 menit/hari pada fase akut dan 20 menit/hari pada fase kronis.', 'A',
  'Hall et al. Vestibular Rehabilitation for Peripheral Vestibular Hypofunction: Updated CPG, J Neurol Phys Ther 2022;46(2):118-177', ARRAY['vestibular', 'dizziness', 'balance', 'VOR']::text[], '[{"id":"517b0c1c-f7bd-3a65-a9aa-55d78a278b69","slug":"gaze-stabilization-x1-horizontal","name":"Gaze Stabilisation x1 Viewing - Horizontal","name_id":"Stabilisasi Pandangan x1 - Horizontal","sets":3,"reps":1,"repetitions":1,"hold_duration":60,"rest_between_sets":60,"prepare_time":5,"work_time":60,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Total minimal 12 menit/hari terbagi 3 sesi (akut) atau 20 menit (kronis)."},{"id":"08b0ec8a-aabf-3cf4-8e38-f6db1e2a2bba","slug":"gaze-stabilization-x1-vertical","name":"Gaze Stabilisation x1 Viewing - Vertical","name_id":"Stabilisasi Pandangan x1 - Vertikal","sets":3,"reps":1,"repetitions":1,"hold_duration":60,"rest_between_sets":60,"prepare_time":5,"work_time":60,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"c75626d7-38c8-3ed8-8bc0-e4a17c6916c4","slug":"tandem-stance","name":"Tandem Stance","name_id":"Berdiri Tandem (Kaki Sejajar Depan-Belakang)","sets":3,"reps":1,"repetitions":1,"hold_duration":20,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Di dekat pegangan."},{"id":"9ce4f900-f155-3039-aec5-8f3db2c57e44","slug":"single-leg-stance","name":"Single-Leg Stance","name_id":"Berdiri Satu Kaki","sets":3,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"edb844f4-1162-3052-bda0-ce71c70766cf","slug":"single-leg-stance-foam","name":"Single-Leg Stance on Foam / Wobble Board","name_id":"Berdiri Satu Kaki di Busa / Papan Keseimbangan","sets":3,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Latihan keseimbangan pada permukaan tidak stabil."},{"id":"d1d55be7-b3a8-3a0a-bf9b-9f180e77348b","slug":"tandem-walk","name":"Tandem Walk (Heel-to-Toe Walking)","name_id":"Jalan Tandem (Tumit ke Jari Kaki)","sets":4,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"baee4323-5662-3b44-8531-a1f4fa30c052","slug":"walking-program","name":"Structured Walking Program","name_id":"Program Jalan Kaki Terstruktur","sets":1,"reps":1,"repetitions":1,"hold_duration":0,"rest_between_sets":0,"prepare_time":5,"work_time":1200,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Berjalan sambil menoleh kanan-kiri sebagai progresi lanjut."}]'::jsonb, 'Active', null, false
),
-- Vertigo Posisi (BPPV) - Latihan Habituasi di Rumah
(
  '8c49a486-18bd-30b7-ac34-6bb207bb06c0', 'bppv-home-habituation', 'Vertigo Posisi (BPPV) - Latihan Habituasi di Rumah', 'Latihan habituasi Brandt-Daroff untuk vertigo posisi jinak, digunakan sebagai pelengkap manuver reposisi yang dilakukan klinisi.', 'Brandt-Daroff habituation exercises for benign positional vertigo, used as an adjunct to clinician-performed repositioning manoeuvres.',
  'Benign paroxysmal positional vertigo (BPPV) - vertigo saat perubahan posisi kepala', 'Sampai bebas gejala selama 2 hari berturut-turut', 'Balance', 'Menghilangkan vertigo yang dipicu perubahan posisi',
  '1-3 minggu', '3x/hari', 'Beginner', 'Latihan menimbulkan pusing sementara - lakukan di tempat tidur/matras yang aman dan jangan mengemudi setelahnya sampai gejala reda. HENTIKAN dan cari pertolongan medis bila muncul gejala neurologis, nyeri kepala hebat, atau pusing terus-menerus tanpa dipicu posisi (ini bukan BPPV).',
  'Hentikan program setelah bebas gejala 2 hari berturut-turut. Bila tidak membaik dalam 2-3 minggu, lakukan evaluasi ulang untuk manuver reposisi spesifik kanal.', 'BPPV disebabkan kristal kecil yang lepas di telinga dalam, bukan masalah otak. Manuver reposisi (misalnya Epley) yang dilakukan klinisi biasanya lebih cepat efektif; Brandt-Daroff berguna sebagai latihan mandiri lanjutan atau bila akses klinik terbatas.', 'B',
  'Bhattacharyya et al. BPPV Clinical Practice Guideline Update, Otolaryngol Head Neck Surg 2017;156(3_suppl):S1-S47', ARRAY['BPPV', 'vertigo', 'vestibular']::text[], '[{"id":"64c4a37d-a7bc-3c82-9233-d5dbfb80cade","slug":"brandt-daroff","name":"Brandt-Daroff Habituation Exercise","name_id":"Latihan Habituasi Brandt-Daroff","sets":3,"reps":5,"repetitions":5,"hold_duration":30,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"5 siklus per sesi, 3 sesi per hari."},{"id":"517b0c1c-f7bd-3a65-a9aa-55d78a278b69","slug":"gaze-stabilization-x1-horizontal","name":"Gaze Stabilisation x1 Viewing - Horizontal","name_id":"Stabilisasi Pandangan x1 - Horizontal","sets":2,"reps":1,"repetitions":1,"hold_duration":60,"rest_between_sets":60,"prepare_time":5,"work_time":60,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Untuk pusing sisa setelah kristal tereposisi."},{"id":"c75626d7-38c8-3ed8-8bc0-e4a17c6916c4","slug":"tandem-stance","name":"Tandem Stance","name_id":"Berdiri Tandem (Kaki Sejajar Depan-Belakang)","sets":3,"reps":1,"repetitions":1,"hold_duration":20,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Latihan keseimbangan pendukung."},{"id":"9ce4f900-f155-3039-aec5-8f3db2c57e44","slug":"single-leg-stance","name":"Single-Leg Stance","name_id":"Berdiri Satu Kaki","sets":3,"reps":1,"repetitions":1,"hold_duration":20,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Dengan pegangan."}]'::jsonb, 'Active', null, false
),
-- Rehabilitasi Paru - PPOK
(
  'a088838e-e4ee-30d0-9202-07e93559b0fb', 'copd-pulmonary-rehab', 'Rehabilitasi Paru - PPOK', 'Program rehabilitasi paru berbasis pernyataan ATS/ERS: latihan aerobik dan kekuatan minimal 3x/minggu selama 8-12 minggu, ditambah teknik pernapasan.', 'ATS/ERS-based pulmonary rehabilitation: aerobic and resistance training at least three times weekly for 8-12 weeks, plus breathing techniques.',
  'Penyakit paru obstruktif kronik (PPOK) dengan sesak napas saat aktivitas', 'Program 8-12 minggu', 'General', 'Mengurangi sesak napas, meningkatkan kapasitas berjalan dan kualitas hidup, mengurangi rawat inap',
  '8-12 minggu', '3x/minggu', 'Beginner', 'Pantau saturasi oksigen bila tersedia; hentikan bila turun di bawah batas yang ditentukan tim medis (umumnya < 88%). Hentikan bila muncul nyeri dada, pusing, atau sesak sangat berat (skala Borg > 6/10). Tunda latihan intensif saat eksaserbasi akut.',
  'Naikkan durasi aerobik terlebih dahulu (2-5 menit/minggu), baru intensitas. Naikkan beban latihan kekuatan sekitar 5% bila 12 repetisi mudah.', 'Sesak napas saat berlatih tidak berbahaya dan tidak merusak paru. Menghindari aktivitas justru memperburuk kondisi (lingkaran sesak-tidak aktif-lemah). Manfaat rehabilitasi paru sebanding atau melebihi banyak obat, tetapi menurun bila latihan berhenti - lanjutkan program pemeliharaan.', 'A',
  'Spruit et al. ATS/ERS Statement on Pulmonary Rehabilitation, Am J Respir Crit Care Med 2013;188(8):e13-e64; McCarthy et al. Cochrane 2015;2:CD003793', ARRAY['COPD', 'pulmonary rehab', 'aerobic', 'breathing']::text[], '[{"id":"339ac773-daba-3eac-bd99-4c96c19e79fd","slug":"pursed-lip-breathing","name":"Pursed Lip Breathing","name_id":"Pernapasan Bibir Mengerucut","sets":3,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Gunakan juga saat sesak dan saat aktivitas berat."},{"id":"cecd984e-1dae-3d33-8bb0-74a918e27dc1","slug":"diaphragmatic-breathing","name":"Diaphragmatic Breathing","name_id":"Pernapasan Diafragma","sets":3,"reps":10,"repetitions":10,"hold_duration":4,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"1df9513b-bfad-351c-a97f-883c84b6a45c","slug":"active-cycle-breathing","name":"Active Cycle of Breathing Technique (ACBT)","name_id":"Siklus Aktif Teknik Pernapasan (ACBT)","sets":3,"reps":4,"repetitions":4,"hold_duration":3,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Bila terdapat produksi dahak berlebih."},{"id":"8a9cf977-2618-3536-ae63-5d2862a52760","slug":"marching-in-place","name":"Marching in Place","name_id":"Jalan di Tempat","sets":3,"reps":1,"repetitions":1,"hold_duration":120,"rest_between_sets":60,"prepare_time":5,"work_time":120,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Pemanasan aerobik; intensitas RPE 11-13."},{"id":"baee4323-5662-3b44-8531-a1f4fa30c052","slug":"walking-program","name":"Structured Walking Program","name_id":"Program Jalan Kaki Terstruktur","sets":1,"reps":1,"repetitions":1,"hold_duration":0,"rest_between_sets":0,"prepare_time":5,"work_time":1200,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Komponen aerobik utama; boleh interval bila sesak (jalan 2 menit - istirahat 1 menit)."},{"id":"6659ecf4-e7c7-32ac-b8e3-1d1a3f6f5f17","slug":"sit-to-stand","name":"Sit to Stand","name_id":"Duduk ke Berdiri","sets":3,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Kekuatan tungkai berkorelasi kuat dengan kapasitas berjalan."},{"id":"1bc90f41-93ba-33d0-a361-17204b1c4bf0","slug":"seated-arm-raises-unsupported","name":"Unsupported Arm Raises","name_id":"Angkat Lengan Tanpa Sangga","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Latihan lengan tanpa sangga direkomendasikan khusus pada PPOK."},{"id":"4f4e6fce-0cc8-34ce-929f-a64d2e068be1","slug":"double-leg-heel-raise","name":"Double-Leg Heel Raise","name_id":"Jinjit Dua Kaki","sets":3,"reps":15,"repetitions":15,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"6652b4f0-776c-3bee-a042-0f09b34b66ce","slug":"resistance-training-major-muscle-groups","name":"Whole-Body Resistance Circuit","name_id":"Sirkuit Latihan Beban Seluruh Tubuh","sets":3,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":75,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"2-4 set x 6-12 repetisi pada 50-85% 1RM sesuai ATS/ERS."}]'::jsonb, 'Active', null, false
),
-- Rehabilitasi Jantung - Program Rumah Fase II
(
  'e3af52f2-1ee9-39d1-91d0-8a7dcafb9abe', 'cardiac-rehab-home-phase-2', 'Rehabilitasi Jantung - Program Rumah Fase II', 'Program latihan rumah untuk fase II rehabilitasi jantung: aerobik terpantau intensitas ditambah latihan kekuatan ringan.', 'Home exercise program for phase II cardiac rehabilitation: intensity-monitored aerobic work plus light resistance training.',
  'Pasca infark miokard, pasca operasi bypass/pemasangan stent, gagal jantung stabil (setelah izin kardiolog)', 'Fase II (setelah kondisi stabil, umumnya 2-12 minggu pasca kejadian)', 'General', 'Meningkatkan kapasitas fungsional, mengurangi gejala, dan menurunkan risiko kejadian jantung berulang',
  '12 minggu', '3-5x/minggu', 'Beginner', 'WAJIB mendapat izin dan batas denyut nadi dari kardiolog sebelum memulai. HENTIKAN SEGERA dan cari pertolongan bila: nyeri dada, sesak napas tidak wajar, pusing, denyut jantung tidak teratur, atau keringat dingin. Jangan berlatih bila gejala jantung tidak stabil, demam, atau tekanan darah istirahat > 180/110 mmHg. Hindari latihan segera setelah makan besar atau di cuaca sangat panas.',
  'Naikkan durasi 2-5 menit per minggu menuju 20-60 menit per sesi. Naikkan intensitas hanya bila durasi target tercapai dan tidak ada gejala.', 'Gunakan skala usaha yang dirasakan (RPE Borg 6-20), target 11-13 ("ringan sampai agak berat") - masih dapat berbicara. Selalu awali pemanasan 5-10 menit dan akhiri pendinginan 5-10 menit; menghentikan latihan mendadak dapat memicu gangguan irama jantung.', 'A',
  'ACSM''s Guidelines for Exercise Testing and Prescription, 11th ed.; Dibben et al. Cochrane 2021;11:CD001800 (exercise-based cardiac rehabilitation)', ARRAY['cardiac rehab', 'aerobic', 'cardiovascular']::text[], '[{"id":"8a9cf977-2618-3536-ae63-5d2862a52760","slug":"marching-in-place","name":"Marching in Place","name_id":"Jalan di Tempat","sets":1,"reps":1,"repetitions":1,"hold_duration":300,"rest_between_sets":60,"prepare_time":5,"work_time":300,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Pemanasan 5-10 menit - wajib."},{"id":"baee4323-5662-3b44-8531-a1f4fa30c052","slug":"walking-program","name":"Structured Walking Program","name_id":"Program Jalan Kaki Terstruktur","sets":1,"reps":1,"repetitions":1,"hold_duration":0,"rest_between_sets":0,"prepare_time":5,"work_time":1200,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Komponen utama: 20-60 menit pada RPE 11-13, 3-5x/minggu."},{"id":"c580be70-0ff9-33d2-b41d-67498a9ba363","slug":"stationary-cycling","name":"Stationary Cycling","name_id":"Sepeda Statis","sets":1,"reps":1,"repetitions":1,"hold_duration":0,"rest_between_sets":0,"prepare_time":5,"work_time":1200,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Alternatif aerobik dengan beban sendi rendah."},{"id":"6659ecf4-e7c7-32ac-b8e3-1d1a3f6f5f17","slug":"sit-to-stand","name":"Sit to Stand","name_id":"Duduk ke Berdiri","sets":2,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Hindari menahan napas saat mengejan."},{"id":"1bc90f41-93ba-33d0-a361-17204b1c4bf0","slug":"seated-arm-raises-unsupported","name":"Unsupported Arm Raises","name_id":"Angkat Lengan Tanpa Sangga","sets":2,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Beban ringan, 10-15 repetisi."},{"id":"0487b7c2-166f-3304-a6d2-9760909fddcb","slug":"band-row","name":"Seated Row with Band","name_id":"Dayung Duduk dengan Karet Elastis","sets":2,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Resistensi ringan; bernapas keluar saat menarik."},{"id":"4f4e6fce-0cc8-34ce-929f-a64d2e068be1","slug":"double-leg-heel-raise","name":"Double-Leg Heel Raise","name_id":"Jinjit Dua Kaki","sets":2,"reps":15,"repetitions":15,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"cecd984e-1dae-3d33-8bb0-74a918e27dc1","slug":"diaphragmatic-breathing","name":"Diaphragmatic Breathing","name_id":"Pernapasan Diafragma","sets":2,"reps":10,"repetitions":10,"hold_duration":4,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Bagian pendinginan dan relaksasi."}]'::jsonb, 'Active', null, false
),
-- Inkontinensia Urin Stres - Latihan Otot Dasar Panggul
(
  '120fbe16-4c4b-36b4-9fba-4bf457bcac28', 'pelvic-floor-stress-incontinence', 'Inkontinensia Urin Stres - Latihan Otot Dasar Panggul', 'Program latihan otot dasar panggul terawasi minimal 3 bulan - terapi lini pertama untuk inkontinensia urin stres pada perempuan.', 'Supervised pelvic floor muscle training for at least 3 months - first-line therapy for female stress urinary incontinence.',
  'Inkontinensia urin stres atau campuran pada perempuan', 'Program minimal 3 bulan', 'Pelvic floor', 'Mengurangi atau menghilangkan kebocoran urin saat batuk, bersin, tertawa, dan beraktivitas',
  '12 minggu minimum', '3x/hari', 'Beginner', 'Pastikan teknik benar - kontraksi yang salah (mengejan ke bawah) dapat memperburuk gejala; sebaiknya diperiksa fisioterapis terlatih. Jangan berlatih dengan menghentikan aliran urin saat berkemih. Bila terdapat nyeri panggul kronis, otot dasar panggul mungkin justru terlalu tegang - konsultasikan sebelum menguatkan.',
  'Naikkan durasi tahan 1 detik/minggu sampai 10 detik. Latih dalam posisi yang semakin menantang: berbaring -> duduk -> berdiri -> saat beraktivitas.', 'Perbaikan biasanya mulai terasa setelah 6-12 minggu latihan rutin, jadi konsistensi sangat penting. Latihan ini adalah terapi lini pertama sebelum obat atau operasi. Kaitkan latihan dengan kebiasaan harian (misalnya setiap kali menyikat gigi atau berhenti di lampu merah) agar tidak lupa.', 'A',
  'Dumoulin et al. Cochrane Database Syst Rev 2018;10:CD005654; NICE NG123 Urinary Incontinence and Pelvic Organ Prolapse in Women (2019)', ARRAY['pelvic floor', 'incontinence', 'women''s health']::text[], '[{"id":"d7855197-924e-3f0c-9b72-7eca8b302645","slug":"pelvic-floor-slow-contraction","name":"Pelvic Floor Muscle Training - Slow Holds","name_id":"Latihan Otot Dasar Panggul - Tahan Lama","sets":3,"reps":10,"repetitions":10,"hold_duration":8,"rest_between_sets":10,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Latihan inti: 8-12 kontraksi, 3x/hari, minimal 3 bulan."},{"id":"b9e37d3e-daa3-3762-8bdd-3c86cfabf0a1","slug":"pelvic-floor-quick-flicks","name":"Pelvic Floor Quick Flicks","name_id":"Kontraksi Cepat Otot Dasar Panggul","sets":3,"reps":10,"repetitions":10,"hold_duration":1,"rest_between_sets":2,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Lakukan setelah set kontraksi lambat."},{"id":"3144a9cd-c6fc-35ed-8a81-8de9f12dc2c0","slug":"the-knack","name":"The Knack (Pre-Contraction)","name_id":"The Knack (Kontraksi Sebelum Batuk)","sets":1,"reps":10,"repetitions":10,"hold_duration":3,"rest_between_sets":10,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Terapkan pada aktivitas nyata sehari-hari."},{"id":"cecd984e-1dae-3d33-8bb0-74a918e27dc1","slug":"diaphragmatic-breathing","name":"Diaphragmatic Breathing","name_id":"Pernapasan Diafragma","sets":2,"reps":10,"repetitions":10,"hold_duration":4,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Koordinasi napas dan dasar panggul."},{"id":"c2f149f2-f58b-3135-a06b-276a1a6a1a47","slug":"bridging","name":"Bridging (Glute Bridge)","name_id":"Angkat Pinggul (Bridging)","sets":3,"reps":12,"repetitions":12,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Penguatan gluteus mendukung fungsi dasar panggul."},{"id":"310df6b5-3d32-3f28-bd36-b9d8cce7af28","slug":"chair-squat","name":"Chair Squat (Sit-Back Squat)","name_id":"Squat ke Kursi","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Latihan fungsional; hembuskan napas dan angkat dasar panggul saat berdiri."}]'::jsonb, 'Active', null, false
),
-- Pemulihan Pascamelahirkan - Program Bertahap
(
  '32169997-282a-39ba-bd47-1854d7a48fc0', 'postpartum-recovery', 'Pemulihan Pascamelahirkan - Program Bertahap', 'Program pemulihan bertahap pascamelahirkan: koneksi napas-inti-dasar panggul, penguatan progresif, dan kembali beraktivitas aerobik.', 'Graded postpartum recovery: breath-core-pelvic floor connection, progressive strengthening, and return to aerobic activity.',
  'Pemulihan pascamelahirkan (persalinan normal maupun caesar), termasuk diastasis recti', 'Mulai setelah izin dokter (umumnya evaluasi 6 minggu)', 'Core', 'Memulihkan fungsi otot inti dan dasar panggul, mengurangi nyeri punggung, dan kembali ke aktivitas fisik dengan aman',
  '12 minggu', '5x/minggu', 'Beginner', 'Mulai hanya setelah mendapat izin dokter kandungan. Hentikan dan konsultasikan bila muncul: perdarahan bertambah, nyeri panggul, rasa berat/menonjol di area vagina (kemungkinan prolaps), atau kebocoran urin yang memburuk. Hindari sit-up, crunch, dan plank penuh sampai diastasis recti membaik. Setelah operasi caesar, hindari beban berat pada 6-8 minggu pertama.',
  'Naikkan beban dan kompleksitas bila tidak ada gejala kebocoran, rasa berat panggul, atau perut menonjol seperti kerucut saat latihan.', 'Pemulihan pascamelahirkan membutuhkan waktu berbulan-bulan; jaringan ikat perut dan dasar panggul masih beradaptasi hingga 6-12 bulan. Kembali berlari sebaiknya menunggu minimal 12 minggu dan setelah lulus uji beban (melompat dan berlari di tempat tanpa gejala).', 'B',
  'ACOG Committee Opinion 804: Physical Activity and Exercise During Pregnancy and the Postpartum Period (2020); Goom et al. Returning to Running Postnatal Guideline 2019', ARRAY['postpartum', 'women''s health', 'core', 'pelvic floor']::text[], '[{"id":"275375bc-0a4a-3932-a300-b6a529c828e5","slug":"postpartum-core-connection","name":"Postpartum Core Connection Breathing","name_id":"Pernapasan Koneksi Inti Pascamelahirkan","sets":3,"reps":10,"repetitions":10,"hold_duration":4,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Fondasi program - kuasai sebelum latihan lain."},{"id":"d7855197-924e-3f0c-9b72-7eca8b302645","slug":"pelvic-floor-slow-contraction","name":"Pelvic Floor Muscle Training - Slow Holds","name_id":"Latihan Otot Dasar Panggul - Tahan Lama","sets":3,"reps":10,"repetitions":10,"hold_duration":8,"rest_between_sets":10,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"b9e37d3e-daa3-3762-8bdd-3c86cfabf0a1","slug":"pelvic-floor-quick-flicks","name":"Pelvic Floor Quick Flicks","name_id":"Kontraksi Cepat Otot Dasar Panggul","sets":3,"reps":10,"repetitions":10,"hold_duration":1,"rest_between_sets":2,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"da2791e7-4578-3a68-824e-7270109262b5","slug":"abdominal-bracing","name":"Abdominal Bracing (Transversus Activation)","name_id":"Pengencangan Otot Perut Dalam","sets":3,"reps":10,"repetitions":10,"hold_duration":10,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Intensitas ringan; perut tidak boleh menonjol."},{"id":"c2f149f2-f58b-3135-a06b-276a1a6a1a47","slug":"bridging","name":"Bridging (Glute Bridge)","name_id":"Angkat Pinggul (Bridging)","sets":3,"reps":12,"repetitions":12,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"d1099867-0b87-344d-982d-3e379d451952","slug":"dead-bug","name":"Dead Bug","name_id":"Dead Bug (Gerak Lengan-Tungkai Telentang)","sets":3,"reps":10,"repetitions":10,"hold_duration":2,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Hentikan bila perut menonjol berbentuk kerucut."},{"id":"2dfa3f7f-8cda-3066-a48a-836f7b6ce5cc","slug":"bird-dog","name":"Bird Dog (Quadruped Alternate Reach)","name_id":"Bird Dog (Angkat Lengan dan Tungkai Berlawanan)","sets":3,"reps":10,"repetitions":10,"hold_duration":8,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"310df6b5-3d32-3f28-bd36-b9d8cce7af28","slug":"chair-squat","name":"Chair Squat (Sit-Back Squat)","name_id":"Squat ke Kursi","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":60,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"0487b7c2-166f-3304-a6d2-9760909fddcb","slug":"band-row","name":"Seated Row with Band","name_id":"Dayung Duduk dengan Karet Elastis","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Untuk postur menyusui dan menggendong."},{"id":"baee4323-5662-3b44-8531-a1f4fa30c052","slug":"walking-program","name":"Structured Walking Program","name_id":"Program Jalan Kaki Terstruktur","sets":1,"reps":1,"repetitions":1,"hold_duration":0,"rest_between_sets":0,"prepare_time":5,"work_time":1200,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Mulai 10 menit, tingkatkan bertahap."}]'::jsonb, 'Active', null, false
),
-- Kebugaran Umum - Pedoman Aktivitas Fisik WHO
(
  'ab843579-9989-3e52-8acb-e65522f02d8c', 'general-physical-activity', 'Kebugaran Umum - Pedoman Aktivitas Fisik WHO', 'Program aktivitas fisik dasar sesuai pedoman WHO 2020 dan ACSM: 150 menit aktivitas aerobik sedang per minggu ditambah latihan kekuatan 2 hari per minggu.', 'Baseline physical activity program per the WHO 2020 and ACSM guidelines: 150 minutes of moderate aerobic activity weekly plus resistance training on 2 days.',
  'Pemeliharaan kesehatan umum, pencegahan penyakit kronis, dan lanjutan setelah program rehabilitasi selesai', 'Berkelanjutan', 'General', 'Memenuhi rekomendasi aktivitas fisik minimum untuk kesehatan kardiovaskular, metabolik, tulang, dan mental',
  'Berkelanjutan', 'Aerobik 5x/minggu; kekuatan 2-3x/minggu', 'Beginner', 'Konsultasikan sebelum memulai bila ada penyakit jantung, hipertensi tidak terkontrol, diabetes dengan komplikasi, atau gejala saat aktivitas (nyeri dada, sesak berlebih, pusing). Naikkan beban maksimal 10% per minggu untuk mencegah cedera berlebihan.',
  'Setelah mencapai 150 menit/minggu, tambahkan intensitas (menuju 300 menit sedang atau 150 menit berat per minggu) untuk manfaat tambahan.', 'Setiap gerakan bermanfaat - beberapa aktivitas lebih baik daripada tidak sama sekali, dan manfaat terbesar terjadi saat orang yang tidak aktif mulai bergerak. Duduk lama sebaiknya diselingi berdiri/berjalan singkat. Aktivitas dapat dipecah menjadi sesi 10 menit.', 'A',
  'WHO Guidelines on Physical Activity and Sedentary Behaviour 2020; ACSM''s Guidelines for Exercise Testing and Prescription, 11th ed.', ARRAY['general health', 'prevention', 'WHO', 'wellness']::text[], '[{"id":"baee4323-5662-3b44-8531-a1f4fa30c052","slug":"walking-program","name":"Structured Walking Program","name_id":"Program Jalan Kaki Terstruktur","sets":1,"reps":1,"repetitions":1,"hold_duration":0,"rest_between_sets":0,"prepare_time":5,"work_time":1800,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"30 menit x 5 hari = 150 menit/minggu."},{"id":"6652b4f0-776c-3bee-a042-0f09b34b66ce","slug":"resistance-training-major-muscle-groups","name":"Whole-Body Resistance Circuit","name_id":"Sirkuit Latihan Beban Seluruh Tubuh","sets":3,"reps":10,"repetitions":10,"hold_duration":0,"rest_between_sets":75,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"2-3x/minggu pada hari tidak berurutan."},{"id":"6659ecf4-e7c7-32ac-b8e3-1d1a3f6f5f17","slug":"sit-to-stand","name":"Sit to Stand","name_id":"Duduk ke Berdiri","sets":3,"reps":12,"repetitions":12,"hold_duration":0,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"82533aa8-5bbd-302a-b91e-a1c699922af7","slug":"wall-push-up","name":"Wall Push-Up","name_id":"Push-Up Dinding","sets":3,"reps":12,"repetitions":12,"hold_duration":0,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Progresi ke push-up lantai."},{"id":"0487b7c2-166f-3304-a6d2-9760909fddcb","slug":"band-row","name":"Seated Row with Band","name_id":"Dayung Duduk dengan Karet Elastis","sets":3,"reps":12,"repetitions":12,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"ded978fa-fe7c-3203-92c7-a03f3533b82b","slug":"front-plank","name":"Front Plank (Forearm)","name_id":"Plank Depan (Bertumpu Lengan Bawah)","sets":3,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"4f4e6fce-0cc8-34ce-929f-a64d2e068be1","slug":"double-leg-heel-raise","name":"Double-Leg Heel Raise","name_id":"Jinjit Dua Kaki","sets":3,"reps":15,"repetitions":15,"hold_duration":2,"rest_between_sets":45,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":""},{"id":"9ce4f900-f155-3039-aec5-8f3db2c57e44","slug":"single-leg-stance","name":"Single-Leg Stance","name_id":"Berdiri Satu Kaki","sets":3,"reps":1,"repetitions":1,"hold_duration":30,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Latihan keseimbangan dianjurkan terutama usia di atas 65 tahun."},{"id":"6fef5474-cbe3-3faa-b8b3-71f20e2f78e1","slug":"sitting-posture-reset","name":"Seated Posture Reset (Microbreak)","name_id":"Reset Postur Duduk (Jeda Singkat)","sets":1,"reps":5,"repetitions":5,"hold_duration":5,"rest_between_sets":0,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Untuk memutus duduk lama."}]'::jsonb, 'Active', null, false
),
-- Pasca Perbaikan Rotator Cuff - Fase Pasif (0-6 Minggu)
(
  'effb529a-6d12-363f-b738-69258813e85c', 'post-rotator-cuff-repair-early', 'Pasca Perbaikan Rotator Cuff - Fase Pasif (0-6 Minggu)', 'Fase proteksi setelah operasi perbaikan rotator cuff: gerakan pasif dan aktif-bantu dalam batas yang diizinkan dokter bedah, tanpa kontraksi aktif otot yang diperbaiki.', 'Protection phase after rotator cuff repair: passive and active-assisted movement within surgeon-approved limits, without active contraction of the repaired tendon.',
  'Pasca operasi perbaikan rotator cuff (arthroscopic rotator cuff repair)', 'Fase 1 (0-6 minggu pasca operasi)', 'Shoulder', 'Melindungi perbaikan tendon, mencegah kekakuan, dan mengendalikan nyeri',
  '6 minggu', '3-4x/hari', 'Beginner', 'IKUTI PROTOKOL DOKTER BEDAH - batasan sudut dan waktu bervariasi sesuai ukuran robekan dan teknik operasi. JANGAN melakukan kontraksi aktif otot rotator cuff (mengangkat lengan sendiri) pada fase ini. Gunakan sling sesuai instruksi. Hubungi dokter bila muncul demam, kemerahan luka, atau nyeri mendadak yang jauh memburuk.',
  'Naik ke fase aktif setelah diizinkan dokter bedah (umumnya 6 minggu), dengan lingkup gerak pasif hampir penuh dan nyeri terkendali.', 'Tendon yang dijahit membutuhkan waktu 6-12 minggu untuk menempel ke tulang. Melakukan gerakan aktif terlalu dini adalah penyebab utama kegagalan perbaikan. Latihan siku, pergelangan tangan, dan jari tetap dilakukan untuk mencegah kekakuan dan bengkak.', 'B',
  'Thigpen et al. J Shoulder Elbow Surg 2016;25(4):521-535 (ASSET consensus rehabilitation after RCR); Kelley et al. JOSPT 2013', ARRAY['rotator cuff repair', 'post-op', 'shoulder', 'phase 1']::text[], '[{"id":"452b7f54-8fea-37f4-bb5c-828b0d400646","slug":"pendulum-codman","name":"Pendulum Exercise (Codman)","name_id":"Latihan Pendulum (Codman)","sets":1,"reps":4,"repetitions":4,"hold_duration":30,"rest_between_sets":15,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Gerakan dari badan; otot bahu harus rileks total."},{"id":"b3824bcc-8987-3c95-96f4-80291686552a","slug":"supine-flexion-with-cane","name":"Supine Shoulder Flexion with Cane","name_id":"Fleksi Bahu Telentang dengan Tongkat","sets":2,"reps":10,"repetitions":10,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Hanya sampai batas sudut yang diizinkan dokter bedah."},{"id":"e7b7517b-f42e-386c-90a7-97120dd2728d","slug":"supine-external-rotation-cane","name":"Supine External Rotation with Cane","name_id":"Rotasi Eksternal Telentang dengan Tongkat","sets":2,"reps":8,"repetitions":8,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Batasi rotasi eksternal sesuai protokol operasi."},{"id":"9673c200-8c19-3b82-98f4-3f382cd528e8","slug":"wrist-active-rom","name":"Wrist Active Range of Motion","name_id":"Lingkup Gerak Aktif Pergelangan Tangan","sets":2,"reps":10,"repetitions":10,"hold_duration":3,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Mencegah kekakuan dan bengkak tangan."},{"id":"f9efe9dc-3254-30ce-936d-db1d6657ca61","slug":"grip-strengthening-ball","name":"Grip Strengthening (Ball Squeeze)","name_id":"Penguatan Genggaman (Remas Bola)","sets":3,"reps":12,"repetitions":12,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Aman dilakukan sejak minggu pertama."},{"id":"d1d7fea9-0081-3e6b-ad05-06681470746f","slug":"cervical-rotation-arom","name":"Active Cervical Rotation","name_id":"Rotasi Leher Aktif","sets":2,"reps":10,"repetitions":10,"hold_duration":3,"rest_between_sets":20,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Mencegah nyeri leher akibat penggunaan sling."},{"id":"e1a68070-1c40-3af5-9669-f03f6647a4fc","slug":"scapular-retraction","name":"Scapular Retraction (Shoulder Blade Squeeze)","name_id":"Rapatkan Tulang Belikat","sets":3,"reps":12,"repetitions":12,"hold_duration":5,"rest_between_sets":30,"prepare_time":5,"work_time":0,"cycles":1,"rest_time":0,"permission_mode":"Patient Controlled","notes":"Gerakan skapula lembut tanpa menggerakkan sendi bahu."}]'::jsonb, 'Active', null, false
)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  description = excluded.description,
  description_en = excluded.description_en,
  indication = excluded.indication,
  phase = excluded.phase,
  body_region = excluded.body_region,
  clinical_goal = excluded.clinical_goal,
  expected_duration = excluded.expected_duration,
  frequency = excluded.frequency,
  difficulty = excluded.difficulty,
  precautions = excluded.precautions,
  progression_criteria = excluded.progression_criteria,
  patient_education = excluded.patient_education,
  evidence_level = excluded.evidence_level,
  evidence_source = excluded.evidence_source,
  tags = excluded.tags,
  exercises = excluded.exercises,
  status = excluded.status,
  updated_at = now();
