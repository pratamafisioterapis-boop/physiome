-- Adds 48 new evidence-based exercises to the global exercise library on top of
-- the initial 125 shipped in 20260725120100_seed_global_exercise_library.sql.
--
-- New coverage: thoracic outlet syndrome, medial/lateral epicondylalgia variants,
-- De Quervain's, trigger finger, thumb CMC OA, scoliosis (Schroth), anti-rotation
-- core, FAI hip mobility, ACL return-to-sport plyometrics, chronic ankle instability
-- (Star Excursion), cerebellar ataxia (Frenkel), dual-task fall prevention, advanced
-- vestibular rehab, airway clearance, pelvic floor relaxation, and a new TMJ/jaw region.
--
-- Source: supabase/seed/exercises/*.json (same rows as in the regenerated
-- 20260725120100 file). Regenerate the full source with:
--   node tools/seed/build-exercise-library.mjs
--
-- Uses the same deterministic slug-derived UUIDs and upsert-by-id as the original
-- migration, so this is safe to run even if some rows already exist.

insert into public.exercises (
  id, slug, name, name_id, description, description_en, body_region, category, difficulty,
  movement_type, starting_position, target_muscles, equipment_needed, instructions, instructions_en,
  contraindications, progression_tips, default_sets, default_reps, default_hold_seconds,
  default_rest_seconds, default_frequency, evidence_level, evidence_source, tags, clinic_id
) values
-- Deep Neck Flexor Endurance Hold
(
  '5569da21-f260-3de2-9b66-7e00225719b7', 'deep-neck-flexor-endurance-hold', 'Deep Neck Flexor Endurance Hold', 'Latihan Ketahanan Fleksor Leher Dalam', 'Latihan ketahanan isometrik fleksor leher dalam berdasarkan protokol tes ketahanan fleksor kraniocervical, digunakan pada nyeri leher kronis dan whiplash.', 'Isometric endurance training for the deep neck flexors based on the craniocervical flexion endurance test protocol, used in chronic neck pain and whiplash.',
  'Neck', 'Neck & Upper', 'Intermediate', 'Motor control', 'Supine',
  'Longus colli, longus capitis (fleksor leher dalam)', ARRAY['Kantong tekanan biofeedback (opsional)']::text[], '1. Berbaring telentang, lutut ditekuk, dagu sedikit ditarik ke dalam (chin tuck ringan).
2. Angkat kepala sekitar 1-2 cm dari alas tanpa membiarkan dagu menonjol maju.
3. Pertahankan posisi tanpa gemetar atau otot leher superfisial (sternocleidomastoid) menegang berlebihan.
4. Tahan selama waktu yang ditoleransi (mulai 10 detik), turunkan perlahan.
5. Hentikan set bila teknik mulai rusak (dagu menonjol, leher superfisial dominan).', '1. Lie on your back, knees bent, chin gently tucked in.
2. Lift the head about 1-2 cm off the surface without letting the chin poke forward.
3. Hold the position without shaking or the superficial neck muscles (sternocleidomastoid) taking over.
4. Hold for a tolerated duration (start at 10 seconds), lower slowly.
5. Stop the set once technique breaks down (chin pokes forward, superficial muscles dominate).',
  'Hindari pada cedera leher akut/tidak stabil, pasca operasi cervical tanpa izin, atau bila timbul pusing/nyeri kepala hebat.', 'Naikkan durasi tahan bertahap (10 -> 30 detik) sebelum menambah repetisi. Setelah kuat, lanjutkan ke chin tuck dengan resistensi manual.', 3, 5,
  10, 30, '1x/hari',
  'A', 'Jull et al. J Manipulative Physiol Ther 2008;31(7):525-533 (craniocervical flexion test/training); Blanpied et al. Neck Pain CPG, JOSPT 2017;47(7):A1-A83', ARRAY['neck pain', 'deep neck flexor', 'endurance', 'whiplash']::text[], null
),
-- Prone Thoracic Extension (Prone Cobra)
(
  '005ea8b2-aee8-39d5-8f77-f6663128747c', 'prone-cobra-thoracic-extension', 'Prone Thoracic Extension (Prone Cobra)', 'Ekstensi Torakal Tengkurap (Prone Cobra)', 'Penguatan ekstensor punggung atas dan otot scapular untuk memperbaiki postur membungkuk dan mendukung program nyeri leher/bahu terkait postur.', 'Upper back and scapular extensor strengthening to correct a forward-slumped posture, supporting posture-related neck and shoulder pain programs.',
  'Thoracic', 'Spine & Core', 'Intermediate', 'Strength', 'Prone',
  'Ekstensor torakal, trapezius tengah-bawah, rotator cuff posterior', ARRAY['Matras']::text[], '1. Berbaring tengkurap, dahi di atas handuk gulung, lengan di samping badan dengan ibu jari menghadap ke atas.
2. Angkat dahi, dada atas, dan lengan sedikit dari matras dengan meremas tulang belikat ke bawah dan ke belakang.
3. Putar lengan sehingga ibu jari mengarah ke langit-langit (rotasi eksternal bahu).
4. Tahan posisi, jaga leher tetap netral (pandangan ke bawah).
5. Turunkan perlahan dan ulangi.', '1. Lie face down, forehead on a rolled towel, arms at your sides with thumbs pointing up.
2. Lift the forehead, upper chest, and arms slightly off the mat while squeezing the shoulder blades down and back.
3. Rotate the arms so the thumbs point toward the ceiling (shoulder external rotation).
4. Hold the position, keeping the neck neutral (gaze down).
5. Lower slowly and repeat.',
  'Hindari pada nyeri punggung bawah yang memburuk dengan ekstensi, spondylolisthesis tidak stabil, atau kehamilan trimester lanjut.', 'Mulai dengan tahan singkat 5-8 detik, tingkatkan durasi dan repetisi. Tambahkan beban ringan di tangan setelah teknik dikuasai.', 3, 10,
  8, 30, '1x/hari, 3-5x/minggu',
  'B', 'Blanpied et al. Neck Pain CPG, JOSPT 2017;47(7):A1-A83; Cools et al. Br J Sports Med 2014 (scapular rehabilitation)', ARRAY['posture', 'thoracic', 'extension', 'scapular']::text[], null
),
-- Scalene Stretch (Thoracic Outlet)
(
  'e918cbcc-2ace-3b5f-8eb6-06644857f7c3', 'scalene-stretch-thoracic-outlet', 'Scalene Stretch (Thoracic Outlet)', 'Peregangan Otot Skalenus (Thoracic Outlet)', 'Peregangan otot skalenus untuk mengurangi kompresi pada thoracic outlet syndrome neurogenik dan nyeri leher-bahu-lengan terkait postur.', 'Scalene muscle stretch to reduce compression in neurogenic thoracic outlet syndrome and posture-related neck-shoulder-arm pain.',
  'Neck', 'Neck & Upper', 'Beginner', 'Stretch', 'Sitting',
  'Otot skalenus anterior dan medius', ARRAY['Kursi']::text[], '1. Duduk tegak, pegang tepi kursi dengan tangan sisi yang akan diregangkan untuk menahan bahu turun.
2. Miringkan kepala menjauhi sisi yang diregangkan.
3. Putar dagu sedikit ke atas dan ke arah bahu yang berlawanan untuk menargetkan skalenus anterior, atau jaga dagu netral untuk skalenus medius.
4. Tahan hingga terasa regangan ringan di sisi leher, jangan sampai nyeri atau kesemutan.
5. Kembali ke posisi netral perlahan.', '1. Sit tall and hold the edge of the chair with the hand on the side to be stretched, to keep that shoulder down.
2. Tilt the head away from the side being stretched.
3. Turn the chin slightly up and toward the opposite shoulder to target the anterior scalene, or keep the chin neutral for the middle scalene.
4. Hold until a mild stretch is felt on the side of the neck, without pain or tingling.
5. Return slowly to neutral.',
  'Hentikan segera bila timbul kesemutan/baal menjalar ke lengan (tanda kompresi saraf/pembuluh darah bertambah). Hindari pada diseksi arteri vertebralis yang dicurigai.', 'Gabungkan dengan latihan postur dan mobilisasi saraf brachial plexus setelah gejala neurogenik terkontrol.', 3, 1,
  20, 20, '2x/hari',
  'C', 'Watson LA et al. Man Ther 2009 (thoracic outlet syndrome conservative management); Hooper TL et al. J Man Manip Ther 2010 (TOS diagnosis and conservative management review)', ARRAY['thoracic outlet', 'scalene', 'stretch', 'neck']::text[], null
),
-- Cervical Flexion-Rotation Self-Mobilisation
(
  'e342c34a-5a55-31ad-bc86-ee9e4a77c18c', 'cervical-flexion-rotation-mobilisation', 'Cervical Flexion-Rotation Self-Mobilisation', 'Mobilisasi Mandiri Fleksi-Rotasi Servikal', 'Mobilisasi mandiri segmen leher atas untuk sakit kepala servikogenik dan keterbatasan rotasi C1-C2 pasca whiplash.', 'Self-mobilisation of the upper neck segments for cervicogenic headache and C1-C2 rotation restriction after whiplash.',
  'Neck', 'Neck & Upper', 'Intermediate', 'Mobility', 'Sitting',
  'Sendi C1-C2 (atlantoaxial)', ARRAY['Kursi dengan sandaran']::text[], '1. Duduk tegak, tekuk leher ke depan (dagu ke dada) sejauh nyaman.
2. Sambil mempertahankan posisi fleksi, putar kepala perlahan ke arah sisi yang kaku/nyeri.
3. Tahan di titik akhir gerak yang nyaman (bukan nyeri tajam), rasakan regangan ringan di leher atas.
4. Tahan 5-10 detik, lalu kembali ke posisi netral.
5. Ulangi, coba tambah sedikit rotasi tiap repetisi bila toleransi baik.', '1. Sit upright, bend the neck forward (chin to chest) as far as comfortable.
2. While maintaining the flexed position, slowly rotate the head toward the stiff/painful side.
3. Hold at a comfortable end range (not sharp pain), feeling a mild stretch in the upper neck.
4. Hold 5-10 seconds, then return to neutral.
5. Repeat, trying to add a little more rotation each repetition if well tolerated.',
  'Hindari pada red flags vaskular (pusing berat, diplopia, disartria, drop attack) atau ketidakstabilan ligamen servikal atas (mis. Down syndrome, artritis reumatoid berat). Hentikan bila muncul gejala neurologis.', 'Gunakan sebagai bagian program sakit kepala servikogenik bersama latihan fleksor leher dalam dan penguatan scapular.', 2, 8,
  8, 20, '1-2x/hari',
  'B', 'Hall TM et al. Man Ther 2007 (flexion-rotation test cervicogenic headache); Blanpied et al. Neck Pain CPG, JOSPT 2017', ARRAY['cervicogenic headache', 'whiplash', 'mobility', 'C1-C2']::text[], null
),
-- Brachial Plexus Nerve Glide (Median Bias)
(
  '21601569-0e92-32ed-ba65-651b96232c78', 'brachial-plexus-nerve-glide', 'Brachial Plexus Nerve Glide (Median Bias)', 'Luncur Saraf Pleksus Brakialis (Bias Median)', 'Teknik sliding saraf untuk thoracic outlet syndrome neurogenik dan nyeri lengan menjalar terkait iritasi pleksus brakialis.', 'A neural sliding technique for neurogenic thoracic outlet syndrome and radiating arm pain related to brachial plexus irritation.',
  'Shoulder', 'Neck & Upper', 'Intermediate', 'Neurodynamic', 'Sitting',
  'Mobilitas saraf median sepanjang pleksus brakialis', '{}'::text[], '1. Duduk tegak, rentangkan lengan ke samping setinggi bahu, siku lurus, telapak menghadap ke depan.
2. Tekuk pergelangan tangan dan jari ke belakang (ekstensi) sambil memiringkan kepala menjauhi lengan tersebut.
3. Kembalikan pergelangan ke posisi netral sambil memiringkan kepala kembali ke arah lengan - ini adalah gerakan ''sliding'', bukan ''tensioning''.
4. Ulangi gerakan bolak-balik secara ritmis dan lembut.
5. Hentikan bila muncul kesemutan/nyeri tajam menjalar, bukan sekadar rasa tertarik ringan.', '1. Sit upright, extend the arm out to the side at shoulder height, elbow straight, palm facing forward.
2. Bend the wrist and fingers back (extension) while tilting the head away from that arm.
3. Return the wrist to neutral while tilting the head back toward the arm - this is a ''slider'', not a ''tensioner''.
4. Repeat the back-and-forth motion rhythmically and gently.
5. Stop if sharp radiating pain or tingling appears, beyond a mild pulling sensation.',
  'Hindari pada cedera pleksus brakialis akut berat, diseksi vaskular yang dicurigai, atau bila gejala neurologis memburuk (kelemahan progresif).', 'Mulai dengan versi slider ringan; setelah gejala neurogenik stabil, tambahkan penguatan postural (scapular retraction, prone T/Y raise).', 3, 10,
  2, 30, '2-3x/hari',
  'C', 'Coppieters & Butler Man Ther 2008 (neurodynamic sliders vs tensioners); Watson LA et al. Man Ther 2009 (thoracic outlet syndrome)', ARRAY['thoracic outlet', 'neurodynamic', 'nerve glide']::text[], null
),
-- 90/90 External Rotation with Band
(
  'e2b4bab4-438f-3809-a58c-c836f81255b7', 'shoulder-90-90-external-rotation-band', '90/90 External Rotation with Band', 'Rotasi Eksternal 90/90 dengan Band', 'Penguatan rotator cuff posterior pada posisi abduksi 90 derajat yang meniru fase cocking pada olahraga lempar/overhead.', 'Posterior rotator cuff strengthening at 90 degrees of abduction, mimicking the cocking phase in throwing/overhead sports.',
  'Shoulder', 'Neck & Upper', 'Advanced', 'Strength', 'Standing',
  'Infraspinatus, teres minor (rotator cuff posterior) pada posisi fungsional lempar', ARRAY['Resistance band']::text[], '1. Berdiri menyamping ke titik jangkar band, angkat lengan ke samping setinggi bahu (abduksi 90 derajat), siku ditekuk 90 derajat menghadap ke depan.
2. Pegang band dengan tangan menghadap ke bawah/depan (posisi awal rotasi internal).
3. Putar lengan bawah ke atas/belakang (rotasi eksternal) melawan tahanan band sambil menjaga siku tetap setinggi bahu.
4. Tahan 1-2 detik di puncak gerak, lalu kembali perlahan.
5. Jaga agar bahu tidak naik/shrug selama gerakan.', '1. Stand side-on to the band anchor, raise the arm out to the side at shoulder height (90 degrees abduction), elbow bent 90 degrees pointing forward.
2. Hold the band with the hand facing down/forward (starting internal rotation position).
3. Rotate the forearm up/back (external rotation) against the band resistance while keeping the elbow at shoulder height.
4. Hold 1-2 seconds at the top, then return slowly.
5. Keep the shoulder from shrugging during the movement.',
  'Hindari pada instabilitas glenohumeral anterior akut atau nyeri impingement yang memburuk pada posisi 90 derajat abduksi. Perkenalkan hanya pada fase lanjut rehabilitasi/return-to-sport.', 'Gunakan sebagai latihan tahap lanjut sebelum kembali ke olahraga lempar; tambahkan kecepatan gerak (rhythmic stabilization) setelah kekuatan dasar tercapai.', 3, 12,
  1, 45, '3x/minggu',
  'B', 'Cools et al. Br J Sports Med 2014 (scapular and rotator cuff rehabilitation exercise selection); Wilk KE et al. Am J Sports Med 2011 (throwing athlete rehabilitation)', ARRAY['overhead athlete', 'rotator cuff', 'return to sport', 'throwing']::text[], null
),
-- Plyometric Chest Pass (Medicine Ball)
(
  '1b181ab3-b8c8-396f-bb9e-0938789862d5', 'plyometric-chest-pass', 'Plyometric Chest Pass (Medicine Ball)', 'Lempar Dada Pliometrik (Bola Medisin)', 'Latihan pliometrik lengan atas fase akhir rehabilitasi bahu untuk mempersiapkan atlet kembali ke olahraga yang membutuhkan daya ledak lengan.', 'Late-stage plyometric upper-limb drill to prepare an athlete to return to sports requiring explosive arm power.',
  'Shoulder', 'Neck & Upper', 'Advanced', 'Strength', 'Standing',
  'Pectoralis mayor, deltoid anterior, triceps, rotator cuff (kontrol eksentrik)', ARRAY['Bola medisin 1-3 kg', 'Dinding/rekan latihan']::text[], '1. Berdiri menghadap dinding dengan jarak sekitar 1-2 meter, pegang bola medisin setinggi dada.
2. Dorong dan lempar bola ke dinding secepat mungkin dengan kedua tangan.
3. Terima pantulan bola dengan menyerap gaya melalui siku dan bahu (kontrol eksentrik cepat) sebelum langsung mendorong lagi.
4. Jaga gerakan tetap terkontrol dan ritmis; hentikan bila teknik menurun karena lelah.
5. Mulai dengan beban ringan dan jarak dekat sebelum meningkatkan intensitas.', '1. Stand facing a wall about 1-2 metres away, hold a medicine ball at chest height.
2. Push and throw the ball at the wall as fast as possible with both hands.
3. Catch the rebound by absorbing the force through the elbows and shoulders (fast eccentric control) before pushing again immediately.
4. Keep the movement controlled and rhythmic; stop if technique deteriorates with fatigue.
5. Start with a light ball and short distance before increasing intensity.',
  'Hanya untuk fase akhir rehabilitasi (return-to-sport) dengan kekuatan dasar rotator cuff dan scapular sudah memadai. Hindari pada instabilitas bahu yang belum direhabilitasi atau nyeri aktif.', 'Naikkan berat bola, jarak lempar, atau kecepatan repetisi secara bertahap. Bisa divariasikan dengan lempar satu tangan/rotasional sesuai tuntutan olahraga.', 3, 10,
  0, 60, '2-3x/minggu',
  'B', 'Wilk KE et al. Am J Sports Med 2011 (throwing athlete return-to-sport progression); Cools et al. Br J Sports Med 2014', ARRAY['plyometric', 'return to sport', 'power', 'overhead athlete']::text[], null
),
-- Latissimus Dorsi Stretch
(
  '706a5508-18b9-3b2e-911b-c6caa9f9ce2e', 'latissimus-dorsi-stretch', 'Latissimus Dorsi Stretch', 'Peregangan Otot Latissimus Dorsi', 'Peregangan latissimus dorsi untuk membantu lingkup gerak elevasi penuh bahu, sering menjadi pembatas tersembunyi pada nyeri bahu dan frozen shoulder fase lanjut.', 'Latissimus dorsi stretch to help restore full shoulder elevation, often a hidden limiter in shoulder pain and later-phase frozen shoulder.',
  'Shoulder', 'Neck & Upper', 'Beginner', 'Stretch', 'Standing',
  'Latissimus dorsi, teres major', ARRAY['Meja/kursi/tiang sebagai pegangan']::text[], '1. Berdiri menghadap meja/pegangan setinggi pinggang, pegang dengan kedua tangan.
2. Tekuk pinggul ke belakang sambil menjaga lengan tetap lurus dan kepala di antara kedua lengan.
3. Biarkan dada turun ke arah lantai sampai terasa regangan di sisi tubuh dan ketiak.
4. Tahan sambil bernapas tenang, jangan menahan napas.
5. Kembali perlahan ke posisi berdiri.', '1. Stand facing a waist-height table/support, hold on with both hands.
2. Hinge the hips back while keeping the arms straight and the head between the arms.
3. Let the chest sink toward the floor until a stretch is felt along the side of the body and armpit.
4. Hold while breathing calmly, don''t hold your breath.
5. Return slowly to standing.',
  'Hindari pada pasca operasi bahu tanpa izin ahli bedah atau nyeri tajam saat elevasi penuh. Modifikasi sudut bila nyeri punggung bawah muncul saat hip hinge.', 'Gabungkan dengan latihan elevasi aktif dan penguatan scapular untuk hasil fungsional yang lebih baik.', 3, 1,
  30, 20, '1-2x/hari',
  'C', 'Kelley et al. Adhesive Capsulitis CPG, JOSPT 2013;43(5):A1-A31; Kisner & Colby, Therapeutic Exercise 7th ed.', ARRAY['frozen shoulder', 'stretch', 'elevation']::text[], null
),
-- Rhythmic Stabilization (Shoulder)
(
  'ba960929-87c6-31cd-ad28-e68b798acded', 'shoulder-rhythmic-stabilization', 'Rhythmic Stabilization (Shoulder)', 'Stabilisasi Ritmis Bahu', 'Latihan stabilisasi proprioseptif fase lanjut untuk instabilitas bahu dan persiapan kembali ke olahraga kontak/overhead.', 'Late-stage proprioceptive stabilisation drill for shoulder instability and preparation to return to contact or overhead sports.',
  'Shoulder', 'Neck & Upper', 'Advanced', 'Motor control', 'Standing',
  'Rotator cuff dan stabilisator scapular (kokontraksi cepat)', ARRAY['Rekan latihan atau terapis']::text[], '1. Berdiri dengan lengan terangkat 90 derajat ke depan atau samping, siku sedikit ditekuk.
2. Rekan/terapis memberikan dorongan kecil dan tak terduga ke berbagai arah pada lengan/tangan.
3. Tahan posisi lengan senetral mungkin, biarkan otot bahu bereaksi secara refleks terhadap dorongan.
4. Lanjutkan selama 10-20 detik per set, istirahat cukup di antara set.
5. Tingkatkan kesulitan dengan menutup mata atau berdiri di permukaan tidak stabil.', '1. Stand with the arm raised 90 degrees forward or to the side, elbow slightly bent.
2. A partner/therapist applies small, unpredictable pushes to the arm/hand in different directions.
3. Hold the arm as steady as possible, letting the shoulder muscles react reflexively to the pushes.
4. Continue for 10-20 seconds per set, resting adequately between sets.
5. Increase difficulty by closing the eyes or standing on an unstable surface.',
  'Hanya untuk fase lanjut rehabilitasi dengan nyeri terkontrol dan kekuatan dasar memadai. Hindari pada instabilitas akut atau pasca operasi tanpa izin.', 'Naikkan kecepatan dan besar dorongan, atau lakukan pada posisi fungsional olahraga spesifik (mis. posisi lempar).', 3, 1,
  15, 30, '2-3x/minggu',
  'C', 'Wilk KE et al. Am J Sports Med 2011 (throwing athlete rehabilitation); Cools et al. Br J Sports Med 2014', ARRAY['proprioception', 'instability', 'return to sport']::text[], null
),
-- Eccentric Wrist Flexion (Golfer's Elbow)
(
  'f0326825-e5ea-356e-bb52-48a84a091976', 'eccentric-wrist-flexion-golfers-elbow', 'Eccentric Wrist Flexion (Golfer''s Elbow)', 'Fleksi Pergelangan Eksentrik (Golfer''s Elbow)', 'Pembebanan eksentrik fleksor pergelangan tangan, analog Tyler Twist untuk tendinopati epikondilus medial (golfer''s elbow).', 'Eccentric loading of the wrist flexors, the golfer''s-elbow analogue of the Tyler Twist for medial epicondyle tendinopathy.',
  'Elbow', 'Neck & Upper', 'Intermediate', 'Strength', 'Sitting',
  'Fleksor pergelangan tangan, pronator teres (origo epikondilus medial)', ARRAY['Dumbel ringan atau botol air']::text[], '1. Duduk dengan lengan bawah bertumpu di paha atau meja, telapak menghadap ke atas, pergelangan menjuntai di tepi.
2. Pegang beban ringan; gunakan tangan yang sehat untuk mengangkat pergelangan ke posisi fleksi penuh.
3. Lepaskan bantuan, lalu turunkan beban perlahan (ekstensi pergelangan) selama 3-4 detik.
4. Bantu kembali ke atas dengan tangan sehat untuk repetisi berikutnya.
5. Nyeri ringan dapat diterima, harus mereda dalam 24 jam.', '1. Sit with the forearm supported on the thigh or a table, palm up, wrist over the edge.
2. Hold a light weight; use the healthy hand to lift the wrist into full flexion.
3. Release the assistance and lower the weight slowly (wrist extension) over 3-4 seconds.
4. Assist back up with the healthy hand for the next repetition.
5. Mild discomfort is acceptable; it should settle within 24 hours.',
  'Hentikan bila nyeri > 5/10, kesemutan pada jari manis/kelingking (kemungkinan iritasi saraf ulnaris), atau bengkak bertambah.', 'Naikkan beban 0,25-0,5 kg tiap 1-2 minggu saat 3x15 repetisi terasa nyaman dengan nyeri <3/10.', 3, 15,
  4, 60, '1x/hari, 5 hari/minggu',
  'B', 'Lucado et al. Lateral Elbow Tendinopathy CPG, JOSPT 2022 (eccentric loading principle); Kisner & Colby, Therapeutic Exercise 7th ed. (medial epicondylalgia management)', ARRAY['golfer''s elbow', 'eccentric', 'tendinopathy']::text[], null
),
-- Thumb Eccentric Loading (De Quervain's)
(
  '2a576091-93bb-34cb-9b3c-832cc5afafc4', 'thumb-eccentric-loading-de-quervains', 'Thumb Eccentric Loading (De Quervain''s)', 'Pembebanan Eksentrik Ibu Jari (De Quervain''s)', 'Pembebanan bertahap tendon kompartemen pertama pergelangan untuk tenosinovitis De Quervain, dimulai setelah fase nyeri akut mereda.', 'Graded loading of the first dorsal compartment tendons for De Quervain''s tenosynovitis, started once the acute pain phase has settled.',
  'Wrist', 'Neck & Upper', 'Beginner', 'Strength', 'Sitting',
  'Abductor pollicis longus, extensor pollicis brevis', ARRAY['Karet gelang ringan']::text[], '1. Duduk dengan lengan bawah bertumpu di meja, pergelangan dalam posisi netral, ibu jari mengarah ke atas.
2. Lingkarkan karet gelang di sekitar ibu jari dan telunjuk.
3. Gerakkan ibu jari menjauh dari telapak (abduksi) melawan tahanan ringan sampai posisi terbuka penuh.
4. Lepaskan tahanan bantuan tangan sehat, lalu biarkan ibu jari kembali perlahan ke posisi awal selama 3-4 detik (fase eksentrik).
5. Hentikan bila nyeri tajam di sisi ibu jari pergelangan tangan.', '1. Sit with the forearm supported on a table, wrist in neutral, thumb pointing up.
2. Loop a light rubber band around the thumb and index finger.
3. Move the thumb away from the palm (abduction) against light resistance to a fully open position.
4. Release the assist from the healthy hand, then let the thumb return slowly to the start over 3-4 seconds (eccentric phase).
5. Stop if sharp pain occurs on the thumb side of the wrist.',
  'Hindari pada fase sangat nyeri/bengkak akut - mulai dengan istirahat, splinting ibu jari, dan es terlebih dahulu. Hentikan bila nyeri meningkat >24 jam.', 'Mulai dengan resistensi minimal setelah nyeri diam terkontrol; naikkan ketebalan karet secara bertahap selama beberapa minggu.', 3, 12,
  3, 45, '1x/hari',
  'B', 'Huisstede BM et al. Arch Phys Med Rehabil 2018 (evidence-based guideline hand/wrist conditions incl. De Quervain''s); Goel R, Abzug JM. Curr Rev Musculoskelet Med 2015', ARRAY['de quervain', 'thumb', 'eccentric', 'wrist']::text[], null
),
-- A1 Pulley Tendon Glide (Trigger Finger)
(
  '809bfcaa-d2f1-30fa-8128-c3e360818be1', 'trigger-finger-tendon-glide', 'A1 Pulley Tendon Glide (Trigger Finger)', 'Luncur Tendon Pulley A1 (Trigger Finger)', 'Latihan luncur dan peregangan lembut untuk trigger finger (stenosing tenosynovitis), membantu mengurangi ''tersangkut''nya tendon di pulley A1.', 'Gliding and gentle stretching drill for trigger finger (stenosing tenosynovitis), helping reduce tendon catching at the A1 pulley.',
  'Hand', 'Neck & Upper', 'Beginner', 'Mobility', 'Sitting',
  'Tendon fleksor jari pada level pulley A1 (pangkal jari)', '{}'::text[], '1. Duduk dengan tangan rileks di depan tubuh.
2. Tekuk jari yang terkena perlahan menuju telapak tangan sejauh nyaman, tahan sebentar.
3. Gunakan tangan sehat untuk membantu meluruskan sendi pangkal jari (MCP) sepenuhnya bila terasa tersangkut.
4. Pijat lembut area pangkal telapak tangan (dasar jari) searah tendon sebelum dan sesudah gerakan.
5. Ulangi perlahan, hindari memaksakan gerakan bila nyeri tajam muncul.', '1. Sit with the hand relaxed in front of the body.
2. Slowly bend the affected finger toward the palm as far as comfortable, hold briefly.
3. Use the healthy hand to help fully straighten the base joint (MCP) if it feels caught.
4. Gently massage the base of the palm (finger base) along the tendon before and after the movement.
5. Repeat slowly, avoid forcing the movement if sharp pain occurs.',
  'Hentikan bila jari terkunci total (locked trigger finger) tanpa bisa diluruskan - rujuk ke dokter untuk injeksi/pertimbangan operasi. Hindari pada infeksi aktif atau pasca operasi tanpa izin.', 'Kombinasikan dengan splint ekstensi malam hari pada kasus ringan-sedang, dan modifikasi aktivitas menggenggam berulang.', 3, 10,
  3, 20, '3-4x/hari',
  'C', 'Makkouk AH et al. Curr Rev Musculoskelet Med 2008 (trigger finger conservative management); praktik terapi tangan', ARRAY['trigger finger', 'hand', 'mobility', 'tendon glide']::text[], null
),
-- Thumb CMC Opposition Strengthening
(
  '6097e08b-4d15-3d01-9962-07b58b8a744e', 'thumb-cmc-opposition-strengthening', 'Thumb CMC Opposition Strengthening', 'Penguatan Oposisi Sendi CMC Ibu Jari', 'Penguatan otot intrinsik ibu jari untuk osteoartritis sendi carpometacarpal (CMC) ibu jari, membantu mengurangi nyeri saat mencubit/menjepit.', 'Intrinsic thumb muscle strengthening for thumb carpometacarpal (CMC) joint osteoarthritis, helping reduce pain with pinching/gripping.',
  'Hand', 'Neck & Upper', 'Beginner', 'Strength', 'Sitting',
  'Opponens pollicis, abductor pollicis brevis, otot intrinsik ibu jari', ARRAY['Karet gelang kecil (opsional)']::text[], '1. Duduk dengan tangan rileks, telapak menghadap ke atas.
2. Sentuhkan ujung ibu jari ke ujung jari kelingking, bentuk ''O'' yang bulat sempurna.
3. Tahan posisi sambil merasakan kontraksi di pangkal ibu jari, hindari menekuk sendi ujung ibu jari berlebihan.
4. Lepaskan perlahan, ulangi dengan jari manis, tengah, dan telunjuk secara bergantian.
5. Tambahkan tahanan ringan dari karet gelang di sekitar ibu jari-kelingking bila nyeri terkontrol.', '1. Sit with the hand relaxed, palm facing up.
2. Touch the tip of the thumb to the tip of the little finger, forming a perfectly round ''O''.
3. Hold while feeling the contraction at the base of the thumb, avoiding excessive bending of the thumb tip joint.
4. Release slowly, repeat with the ring, middle, and index fingers in turn.
5. Add light resistance from a small rubber band around the thumb and little finger once pain is controlled.',
  'Hindari intensitas tinggi pada fase inflamasi aktif (sendi bengkak/panas). Hentikan bila nyeri tajam pada sendi CMC.', 'Gabungkan dengan splint stabilisasi CMC saat aktivitas berat dan modifikasi teknik menjepit/mencubit dalam aktivitas sehari-hari.', 3, 10,
  5, 20, '1x/hari',
  'B', 'Erickson et al. Hand Pain and Sensory Deficits CPG, JOSPT 2019;49(5):CPG1-CPG85; Villafañe JH et al. J Chiropr Med 2013 (thumb CMC OA exercise)', ARRAY['thumb', 'CMC osteoarthritis', 'strength', 'hand']::text[], null
),
-- Isometric Wrist Flexion-Extension
(
  'c3c92d8d-34c7-39df-b4cc-7bfc3d6bb735', 'isometric-wrist-flexion-extension', 'Isometric Wrist Flexion-Extension', 'Isometrik Fleksi-Ekstensi Pergelangan Tangan', 'Kontraksi isometrik lembut pergelangan tangan, dosis awal setelah imobilisasi fraktur/pasca operasi sebelum gerakan aktif penuh diizinkan.', 'Gentle isometric wrist contractions, an early-dose exercise after fracture immobilisation/surgery before full active movement is permitted.',
  'Wrist', 'Neck & Upper', 'Beginner', 'Strength', 'Sitting',
  'Fleksor dan ekstensor pergelangan tangan', ARRAY['Meja']::text[], '1. Duduk dengan lengan bawah bertumpu di meja, pergelangan dalam posisi netral.
2. Tekan telapak tangan ke bawah meja tanpa gerakan pergelangan (kontraksi fleksor isometrik).
3. Tahan 5-8 detik, lepaskan perlahan.
4. Balikkan tangan, tekan punggung tangan ke meja (kontraksi ekstensor isometrik), tahan 5-8 detik.
5. Lakukan dengan intensitas nyaman, tanpa nyeri tajam.', '1. Sit with the forearm supported on a table, wrist in neutral.
2. Press the palm down into the table without any wrist movement (isometric flexor contraction).
3. Hold 5-8 seconds, release slowly.
4. Turn the hand over, press the back of the hand into the table (isometric extensor contraction), hold 5-8 seconds.
5. Perform at a comfortable intensity, without sharp pain.',
  'Ikuti izin dokter/ahli bedah setelah fraktur atau operasi - jangan mulai sebelum konsolidasi cukup. Hentikan bila nyeri tajam atau bengkak bertambah.', 'Setelah nyaman dan diizinkan, lanjutkan ke lingkup gerak aktif penuh lalu penguatan dinamis dengan band/beban ringan.', 3, 8,
  6, 20, '3-4x/hari',
  'C', 'Erickson et al. Hand Pain and Sensory Deficits CPG, JOSPT 2019; praktik klinis rehabilitasi pasca fraktur distal radius', ARRAY['wrist', 'isometric', 'post-fracture', 'early phase']::text[], null
),
-- Ulnar Nerve Flossing at Elbow (Cubital Tunnel)
(
  'd9d376ce-7132-3ecd-b65c-4bfd5ff36ead', 'ulnar-nerve-flossing-cubital-tunnel', 'Ulnar Nerve Flossing at Elbow (Cubital Tunnel)', 'Luncur Saraf Ulnaris di Siku (Cubital Tunnel)', 'Teknik sliding saraf ulnaris untuk cubital tunnel syndrome (kompresi saraf ulnaris di siku) dengan gejala kesemutan jari manis dan kelingking.', 'Ulnar nerve sliding technique for cubital tunnel syndrome (ulnar nerve compression at the elbow), presenting with ring and little finger tingling.',
  'Elbow', 'Neck & Upper', 'Intermediate', 'Neurodynamic', 'Sitting',
  'Mobilitas saraf ulnaris melalui cubital tunnel', '{}'::text[], '1. Duduk tegak, angkat lengan setinggi bahu, tekuk siku sehingga tangan mendekati telinga (posisi ''menelepon terbalik'').
2. Tekuk pergelangan dan jari-jari ke belakang (ekstensi) sambil siku masih tertekuk.
3. Luruskan siku perlahan sambil pergelangan tetap dalam posisi ekstensi - ini menciptakan gerakan sliding pada saraf ulnaris.
4. Kembali ke posisi awal, ulangi gerakan secara ritmis dan lembut.
5. Hentikan bila kesemutan/nyeri tajam menjalar bertambah, bukan sekadar rasa tertarik ringan.', '1. Sit upright, raise the arm to shoulder height, bend the elbow so the hand approaches the ear (''backwards phone call'' position).
2. Bend the wrist and fingers back (extension) while the elbow stays bent.
3. Slowly straighten the elbow while the wrist stays extended - this creates a sliding motion on the ulnar nerve.
4. Return to the start, repeat the motion rhythmically and gently.
5. Stop if tingling or sharp radiating pain increases, beyond a mild pulling sensation.',
  'Hindari pada cubital tunnel syndrome berat dengan kelemahan otot progresif (rujuk untuk evaluasi bedah). Hentikan bila gejala memburuk setelah latihan.', 'Kombinasikan dengan modifikasi posisi siku saat tidur/bekerja (hindari fleksi siku lama) dan bantalan siku bila diperlukan.', 3, 10,
  2, 30, '2-3x/hari',
  'C', 'Coppieters & Butler Man Ther 2008 (neurodynamic sliders); Svernlöv B et al. J Hand Surg Eur 2009 (conservative treatment cubital tunnel syndrome)', ARRAY['cubital tunnel', 'ulnar nerve', 'neurodynamic', 'elbow']::text[], null
),
-- Pallof Press (Anti-Rotation)
(
  '01537ca1-feec-3970-be9d-28916e355d78', 'pallof-press-anti-rotation', 'Pallof Press (Anti-Rotation)', 'Pallof Press (Anti-Rotasi)', 'Latihan anti-rotasi core untuk melatih stabilitas batang tubuh melawan gaya memutar, berguna pada nyeri punggung bawah dan persiapan olahraga rotasional.', 'An anti-rotation core exercise training trunk stability against a twisting force, useful in low back pain and preparation for rotational sports.',
  'Core', 'Spine & Core', 'Intermediate', 'Strength', 'Standing',
  'Obliquus internus/externus, transversus abdominis (kontrol anti-rotasi)', ARRAY['Resistance band dengan titik jangkar']::text[], '1. Berdiri menyamping ke titik jangkar band, pegang band dengan kedua tangan di depan dada.
2. Dorong band lurus ke depan menjauhi dada tanpa membiarkan badan berputar mengikuti tarikan band.
3. Tahan posisi lengan lurus 2-3 detik, jaga panggul dan bahu tetap menghadap lurus ke depan.
4. Tarik kembali ke dada perlahan.
5. Selesaikan set, lalu balik badan untuk melatih sisi berlawanan.', '1. Stand side-on to the band anchor, hold the band with both hands at chest level.
2. Press the band straight out from the chest without letting the body rotate toward the band''s pull.
3. Hold the arms-extended position for 2-3 seconds, keeping the hips and shoulders facing straight ahead.
4. Pull back to the chest slowly.
5. Finish the set, then turn around to train the opposite side.',
  'Hindari pada nyeri punggung bawah akut yang memburuk dengan beban tegak berdiri. Mulai dengan tahanan ringan bila baru pulih dari cedera.', 'Naikkan tahanan band, jarak berdiri dari jangkar, atau lakukan pada permukaan tidak stabil/setengah berlutut untuk menambah tuntutan.', 3, 10,
  3, 30, '3x/minggu',
  'B', 'McGill SM. Low Back Disorders, 3rd ed. (anti-rotation core training); George et al. Low Back Pain CPG, JOSPT 2021;51(11):CPG1-CPG60', ARRAY['core', 'anti-rotation', 'low back pain', 'stability']::text[], null
),
-- Suitcase Carry (Loaded Carry)
(
  'eacb57e2-61fd-3439-b042-ff1277c30981', 'suitcase-carry-loaded', 'Suitcase Carry (Loaded Carry)', 'Suitcase Carry (Angkat Beban Satu Sisi)', 'Latihan fungsional membawa beban di satu sisi tubuh untuk melatih stabilitas batang tubuh melawan fleksi lateral, relevan untuk kembali ke aktivitas mengangkat sehari-hari.', 'A functional single-side loaded carry that trains trunk stability against lateral flexion, relevant for returning to everyday lifting activities.',
  'Core', 'Spine & Core', 'Intermediate', 'Strength', 'Standing',
  'Obliquus lateralis, quadratus lumborum (kontrol anti-lateral fleksi)', ARRAY['Dumbel atau kettlebell']::text[], '1. Berdiri tegak, pegang beban di satu tangan di samping tubuh.
2. Jalan lurus ke depan dengan langkah normal, jaga badan tetap tegak tanpa condong ke sisi beban.
3. Pertahankan bahu level dan panggul stabil sepanjang langkah.
4. Tempuh jarak/waktu yang ditentukan, lalu istirahat dan ulangi dengan sisi berlawanan.
5. Letakkan beban dengan hati-hati bila otot mulai lelah dan postur mulai rusak.', '1. Stand tall, hold a weight in one hand at your side.
2. Walk forward with a normal stride, keeping the trunk upright without leaning toward the loaded side.
3. Keep the shoulders level and the pelvis stable throughout the walk.
4. Cover the prescribed distance/time, then rest and repeat on the opposite side.
5. Set the weight down carefully if the muscles fatigue and posture starts to break down.',
  'Hindari pada nyeri punggung bawah akut yang belum stabil atau hernia dinding perut yang belum dievaluasi. Mulai dengan beban ringan.', 'Naikkan beban atau jarak tempuh secara bertahap. Berguna sebagai jembatan menuju aktivitas mengangkat/membawa belanjaan dalam kehidupan sehari-hari.', 3, 1,
  40, 45, '2-3x/minggu',
  'C', 'McGill SM. Low Back Disorders, 3rd ed. (loaded carry for trunk stability); George et al. Low Back Pain CPG, JOSPT 2021 (functional restoration principle)', ARRAY['core', 'functional', 'carry', 'low back pain']::text[], null
),
-- Schroth Rotational Angular Breathing
(
  'ad763aa5-fabf-3230-a12a-b6b8b79ead63', 'schroth-rotational-angular-breathing', 'Schroth Rotational Angular Breathing', 'Pernapasan Angular Rotasional Schroth', 'Teknik pernapasan terarah dari metode Schroth untuk skoliosis idiopatik, mengarahkan napas ke sisi cekung tulang belakang yang mengalami kolaps untuk mengoreksi bentuk lengkung secara tiga dimensi.', 'A directed breathing technique from the Schroth method for idiopathic scoliosis, guiding breath into the collapsed concave side of the spinal curve to correct the three-dimensional shape.',
  'Lower back', 'Spine & Core', 'Advanced', 'Breathing', 'Sitting',
  'Otot interkostal pada sisi cekung kurva skoliosis; korektor postur tiga dimensi', ARRAY['Cermin (untuk umpan balik postur)']::text[], '1. Duduk atau berdiri dalam posisi koreksi postur yang diarahkan terapis (elongasi tulang belakang, koreksi bahu dan panggul).
2. Letakkan tangan di sisi cekung tulang rusuk (sisi yang tampak lebih ''masuk'' pada kurva).
3. Tarik napas dalam, arahkan aliran udara secara sadar ke area di bawah tangan tersebut sehingga rusuk mengembang ke sisi itu.
4. Embuskan napas perlahan sambil mempertahankan koreksi postur, jangan biarkan badan kembali ke pola kurva awal.
5. Latihan ini idealnya diajarkan dan dipantau langsung oleh terapis bersertifikasi Schroth sebelum dilakukan mandiri.', '1. Sit or stand in the postural correction position guided by the therapist (spinal elongation, shoulder and pelvis correction).
2. Place a hand on the concave side of the rib cage (the side that looks more ''caved in'' on the curve).
3. Breathe in deeply, consciously directing airflow into the area under that hand so the ribs expand on that side.
4. Exhale slowly while maintaining the postural correction, don''t let the body collapse back into the original curve pattern.
5. This exercise is ideally taught and supervised in person by a certified Schroth therapist before being performed independently.',
  'Harus diajarkan oleh terapis bersertifikasi Schroth - teknik yang salah dapat memperkuat pola kompensasi. Tidak menggantikan pemantauan medis rutin kurva skoliosis (rontgen berkala sesuai anjuran dokter).', 'Setelah pola napas dikuasai, gabungkan dengan latihan koreksi postur aktif dan penguatan otot tulang belakang tiga dimensi sesuai klasifikasi kurva pasien.', 3, 8,
  5, 20, '1x/hari',
  'B', 'Kuru T et al. Clin Rehabil 2016;30(2):181-190 (RCT Schroth exercises in adolescent idiopathic scoliosis); Otman S et al. Turk J Med Sci 2005', ARRAY['scoliosis', 'schroth', 'breathing', 'postural correction']::text[], null
),
-- Quadruped Rock Back (Segmental Control)
(
  'ddacb30a-3cf6-368b-8559-aabfa21c1eaa', 'quadruped-rock-back', 'Quadruped Rock Back (Segmental Control)', 'Rock Back Posisi Merangkak (Kontrol Segmental)', 'Latihan mobilitas lumbopelvic terkontrol yang mengajarkan gerakan pinggul terpisah dari tulang belakang, dasar untuk pola gerak fungsional yang aman pada nyeri punggung bawah.', 'A controlled lumbopelvic mobility drill that teaches hip movement dissociated from the spine, a foundation for safe functional movement patterns in low back pain.',
  'Lower back', 'Spine & Core', 'Beginner', 'Motor control', 'Quadruped',
  'Kontrol lumbopelvic, otot gluteal, fleksor pinggul (mobilitas terkontrol)', ARRAY['Matras']::text[], '1. Posisi merangkak (tangan di bawah bahu, lutut di bawah panggul), tulang belakang dalam posisi netral.
2. Kencangkan otot inti ringan untuk mengunci posisi tulang belakang netral.
3. Dorong panggul ke belakang menuju tumit, biarkan gerakan terjadi di pinggul - jaga punggung tetap datar/netral, jangan membulat.
4. Berhenti sebelum punggung mulai membulat atau nyeri muncul, lalu kembali ke posisi awal.
5. Fokus pada kualitas gerak, bukan jarak/kedalaman.', '1. Get into a quadruped position (hands under shoulders, knees under hips), spine in a neutral position.
2. Gently brace the core to lock in the neutral spine position.
3. Push the hips back toward the heels, letting the movement occur at the hips - keep the back flat/neutral, don''t let it round.
4. Stop before the back starts to round or pain appears, then return to the start.
5. Focus on movement quality, not distance/depth.',
  'Hindari beban lutut penuh pada osteoartritis lutut berat - gunakan bantalan lutut. Hentikan bila nyeri punggung tajam muncul saat gerakan.', 'Setelah kontrol baik tercapai, integrasikan pola hip hinge ini ke latihan fungsional seperti deadlift ringan dan mengangkat benda dari lantai.', 3, 10,
  2, 20, '1x/hari',
  'C', 'McGill SM. Low Back Disorders, 3rd ed. (hip-spine dissociation training); George et al. Low Back Pain CPG, JOSPT 2021', ARRAY['low back pain', 'motor control', 'hip hinge', 'lumbopelvic']::text[], null
),
-- Prone Hip Extension with Neutral Spine
(
  'ab8c8c4a-b6b8-3089-a5e3-6dcae1a9447d', 'prone-hip-extension-neutral-spine', 'Prone Hip Extension with Neutral Spine', 'Ekstensi Pinggul Tengkurap dengan Tulang Belakang Netral', 'Latihan aktivasi gluteal terisolasi yang menjaga tulang belakang lumbal tetap netral/stabil, penting pada spondylolisthesis dan nyeri punggung bawah dengan pola gerak ekstensi berlebihan.', 'An isolated gluteal activation exercise that keeps the lumbar spine neutral/stable, important in spondylolisthesis and low back pain with an excessive extension movement pattern.',
  'Lower back', 'Spine & Core', 'Intermediate', 'Motor control', 'Prone',
  'Gluteus maximus (dominan) dengan minimalisasi kompensasi ekstensor lumbal', ARRAY['Matras']::text[], '1. Berbaring tengkurap, dahi bertumpu di tangan yang disusun, kencangkan otot inti ringan.
2. Angkat satu tungkai lurus ke atas beberapa sentimeter dengan mengontraksikan otot bokong, bukan dengan melengkungkan punggung bawah.
3. Pastikan gerakan hanya berasal dari pinggul - bila punggung mulai melengkung, kurangi tinggi angkatan.
4. Tahan 2-3 detik di puncak, turunkan perlahan dan terkontrol.
5. Ganti tungkai setelah menyelesaikan set.', '1. Lie face down, forehead resting on stacked hands, gently brace the core.
2. Lift one straight leg a few centimetres by contracting the buttock muscle, not by arching the lower back.
3. Make sure the movement comes only from the hip - if the back starts to arch, reduce the lift height.
4. Hold 2-3 seconds at the top, lower slowly and with control.
5. Switch legs after completing the set.',
  'Hindari pada spondylolisthesis simptomatik derajat tinggi atau nyeri punggung yang jelas memburuk dengan ekstensi. Hentikan bila punggung bawah terasa ''terjepit'' saat gerakan.', 'Setelah pola gerak bersih (tanpa kompensasi lumbal), tambahkan resistance band di pergelangan kaki atau posisi standing hip extension untuk membebani lebih fungsional.', 3, 12,
  3, 30, '3-5x/minggu',
  'B', 'George et al. Low Back Pain CPG, JOSPT 2021;51(11):CPG1-CPG60; McGill SM. Low Back Disorders, 3rd ed. (gluteal dominance training for spine sparing)', ARRAY['spondylolisthesis', 'gluteal', 'low back pain', 'motor control']::text[], null
),
-- 90/90 Hip Stretch
(
  '7708a0c0-68a5-378c-9bc5-41bc985dabd8', '90-90-hip-stretch', '90/90 Hip Stretch', 'Peregangan Pinggul 90/90', 'Peregangan rotasi pinggul dua arah sekaligus, populer pada rehabilitasi femoroacetabular impingement (FAI) dan pembatasan rotasi pinggul.', 'A two-directional hip rotation stretch, commonly used in femoroacetabular impingement (FAI) rehabilitation and hip rotation restriction.',
  'Hip', 'Lower Limb', 'Intermediate', 'Stretch', 'Sitting',
  'Rotator eksternal dan internal pinggul (piriformis, gluteus, kapsul sendi panggul)', ARRAY['Matras']::text[], '1. Duduk di lantai, tungkai depan ditekuk 90 derajat di depan tubuh, tungkai belakang ditekuk 90 derajat di sisi tubuh.
2. Jaga tulang belakang tetap tegak, condongkan badan sedikit ke depan di atas tungkai depan hingga terasa regangan di bokong tungkai depan (rotasi eksternal).
3. Tahan, lalu kembali tegak dan condongkan badan ke arah tungkai belakang untuk meregangkan rotasi internal pinggul belakang.
4. Jaga agar tidak ada nyeri tajam di sendi panggul - regangan seharusnya terasa di otot, bukan di dalam sendi.
5. Ganti posisi tungkai depan-belakang untuk melatih sisi berlawanan.', '1. Sit on the floor, front leg bent 90 degrees in front of the body, back leg bent 90 degrees to the side.
2. Keep the spine tall, lean slightly forward over the front leg until a stretch is felt in the front leg''s buttock (external rotation).
3. Hold, then sit back up and lean toward the back leg to stretch the back hip''s internal rotation.
4. Make sure there''s no sharp pain inside the hip joint - the stretch should be felt in the muscle, not inside the joint.
5. Switch the front-back leg position to train the opposite side.',
  'Hindari pada instabilitas sendi panggul, labral tear yang sangat iritatif, atau nyeri tajam di dalam sendi saat posisi ini. Modifikasi sudut bila nyeri lutut muncul.', 'Gunakan sebagai pemanasan mobilitas sebelum latihan penguatan pinggul; kombinasikan dengan latihan kontrol motorik pinggul untuk hasil fungsional.', 3, 1,
  30, 20, '1-2x/hari',
  'C', 'Griffin DR et al. Br J Sports Med 2016;50(19):1169-1176 (Warwick Agreement FAI syndrome consensus); Kisner & Colby, Therapeutic Exercise 7th ed.', ARRAY['FAI', 'hip mobility', 'stretch', 'rotation']::text[], null
),
-- Standing Hip Circles (FAI Mobility)
(
  '17ccebcf-7a29-33b1-8cac-3896b8ec2f24', 'standing-hip-circles', 'Standing Hip Circles (FAI Mobility)', 'Rotasi Pinggul Berdiri (Mobilitas FAI)', 'Latihan mobilitas panggul multibidang untuk memelihara lingkup gerak fungsional dan mengurangi kekakuan pada femoroacetabular impingement dan osteoartritis panggul awal.', 'A multi-plane hip mobility exercise to maintain functional range of motion and reduce stiffness in femoroacetabular impingement and early hip osteoarthritis.',
  'Hip', 'Lower Limb', 'Beginner', 'Mobility', 'Standing',
  'Mobilitas sendi panggul multiarah, otot stabilisator pinggul tungkai tumpu', ARRAY['Kursi/dinding untuk pegangan']::text[], '1. Berdiri dengan satu tangan berpegangan pada kursi/dinding untuk keseimbangan.
2. Angkat lutut tungkai yang dilatih ke depan setinggi pinggul.
3. Putar lutut membentuk lingkaran besar ke arah luar, ke belakang, lalu kembali ke depan secara perlahan dan terkontrol.
4. Lakukan repetisi yang ditentukan, lalu ulangi dengan arah putaran berlawanan.
5. Ganti tungkai setelah kedua arah selesai.', '1. Stand holding onto a chair/wall with one hand for balance.
2. Lift the knee of the leg being trained forward to hip height.
3. Circle the knee out to the side, back, and forward again slowly and with control, tracing a large circle.
4. Perform the prescribed repetitions, then repeat in the opposite rotation direction.
5. Switch legs once both directions are complete.',
  'Hentikan bila nyeri tajam di dalam sendi panggul atau bunyi ''klik'' disertai nyeri muncul. Hindari pada dislokasi panggul baru atau instabilitas berat.', 'Perbesar diameter lingkaran secara bertahap sesuai toleransi nyeri. Bisa dikombinasikan dengan latihan penguatan pinggul sebagai bagian pemanasan.', 2, 8,
  0, 20, '1x/hari',
  'C', 'Griffin DR et al. Br J Sports Med 2016 (Warwick Agreement FAI syndrome); Cibulka et al. Hip Pain and Mobility Deficits CPG, JOSPT 2017;47(6):A1-A37', ARRAY['FAI', 'hip mobility', 'circles']::text[], null
),
-- Adductor Squeeze (Ball Between Knees)
(
  'fa93c034-6c2a-36d0-8e3f-9619952e3b05', 'adductor-squeeze-ball', 'Adductor Squeeze (Ball Between Knees)', 'Remas Adduktor (Bola di Antara Lutut)', 'Kontraksi isometrik adduktor paha, latihan dasar pada cedera regangan groin/adduktor dan bagian dari program pencegahan cedera groin pada olahraga.', 'Isometric hip adductor contraction, a foundational exercise in groin/adductor strain injury and part of sport groin injury prevention programs.',
  'Hip', 'Lower Limb', 'Beginner', 'Strength', 'Supine',
  'Adductor longus, adductor brevis, gracilis', ARRAY['Bola lunak atau bantal kecil']::text[], '1. Berbaring telentang, lutut ditekuk, telapak kaki rata di lantai.
2. Letakkan bola lunak atau bantal di antara kedua lutut.
3. Remas bola dengan meremas kedua lutut ke arah tengah dengan kekuatan sedang.
4. Tahan 5-8 detik, lepaskan perlahan.
5. Jaga panggul tetap stabil, tidak terangkat, selama kontraksi.', '1. Lie on your back, knees bent, feet flat on the floor.
2. Place a soft ball or pillow between the knees.
3. Squeeze the ball by pressing both knees together at a moderate effort.
4. Hold 5-8 seconds, release slowly.
5. Keep the pelvis stable, not lifting, throughout the contraction.',
  'Hindari intensitas tinggi pada fase akut cedera groin dengan nyeri berat. Hentikan bila nyeri tajam di pangkal paha.', 'Setelah isometrik nyaman, lanjutkan ke adduksi dinamis dengan band dan akhirnya Copenhagen Adduction untuk atlet yang kembali berolahraga.', 3, 10,
  6, 20, '1-2x/hari',
  'A', 'Harøy et al. Br J Sports Med 2019;53(3):150-157 (Copenhagen adduction/groin injury prevention programme); Mosler AB et al. Br J Sports Med 2018 (groin injury clinical guideline)', ARRAY['groin strain', 'adductor', 'isometric', 'injury prevention']::text[], null
),
-- Seated Piriformis Stretch
(
  '0e3736d9-f0b5-3028-80c8-abfa455edf9f', 'seated-piriformis-stretch', 'Seated Piriformis Stretch', 'Peregangan Piriformis Duduk', 'Variasi duduk peregangan piriformis, mudah dilakukan di tempat kerja untuk nyeri bokong/sciatica terkait sindrom piriformis.', 'A seated variation of the piriformis stretch, easy to perform at work for buttock pain/sciatica related to piriformis syndrome.',
  'Hip', 'Lower Limb', 'Beginner', 'Stretch', 'Sitting',
  'Piriformis, rotator eksternal pinggul dalam', ARRAY['Kursi']::text[], '1. Duduk tegak di kursi, silangkan pergelangan kaki tungkai yang sakit ke atas lutut tungkai yang lain (posisi angka 4).
2. Jaga punggung tetap lurus, condongkan badan ke depan dari pinggul.
3. Tahan sampai terasa regangan di bokong tungkai yang disilangkan.
4. Jaga napas tetap tenang selama menahan posisi.
5. Kembali tegak perlahan dan ganti sisi.', '1. Sit tall in a chair, cross the ankle of the affected leg over the opposite knee (figure-4 position).
2. Keep the back straight, hinge forward from the hips.
3. Hold until a stretch is felt in the buttock of the crossed leg.
4. Keep breathing calmly while holding the position.
5. Return upright slowly and switch sides.',
  'Hentikan bila nyeri menjalar ke tungkai bertambah tajam (kemungkinan iritasi saraf skiatik bertambah, bukan sekadar otot). Hindari pada pasca operasi panggul tanpa izin.', 'Kombinasikan dengan penguatan gluteal dan hip abduktor untuk mengurangi kekambuhan sindrom piriformis.', 3, 1,
  30, 20, '2-3x/hari',
  'C', 'Kisner & Colby, Therapeutic Exercise 7th ed.; George et al. Low Back Pain CPG, JOSPT 2021 (adjunct for radicular symptoms)', ARRAY['piriformis', 'sciatica', 'stretch', 'office']::text[], null
),
-- Single-Leg Hop for Distance
(
  '777535c5-634f-3c29-ae9b-8e17f9fbc3cf', 'single-leg-hop-distance', 'Single-Leg Hop for Distance', 'Lompat Satu Kaki untuk Jarak', 'Uji sekaligus latihan pliometrik satu tungkai standar untuk fase akhir rehabilitasi ACL/kembali ke olahraga, sekaligus salah satu dari empat ''hop tests'' yang divalidasi.', 'A standard single-leg plyometric test-and-training drill for late-stage ACL rehabilitation/return to sport, and one of the four validated hop tests.',
  'Knee', 'Lower Limb', 'Advanced', 'Strength', 'Standing',
  'Quadriceps, gluteal, gastrocnemius-soleus (daya ledak dan penyerapan gaya satu tungkai)', ARRAY['Lantai datar dengan ruang cukup', 'Pita pengukur (opsional)']::text[], '1. Berdiri seimbang di satu tungkai di belakang garis awal, tangan bebas di samping tubuh.
2. Lompat sejauh mungkin ke depan menggunakan tungkai yang sama, ayunkan lengan untuk momentum.
3. Mendarat dengan tungkai yang sama, tekuk lutut untuk menyerap gaya secara terkontrol.
4. Tahan posisi mendarat stabil selama 2-3 detik tanpa kehilangan keseimbangan.
5. Hanya dilakukan setelah kekuatan quadriceps mencapai minimal 90% simetri dibanding tungkai sehat (Limb Symmetry Index) dan atas izin terapis.', '1. Balance on one leg behind a start line, arms free at your sides.
2. Hop forward as far as possible using the same leg, swinging the arms for momentum.
3. Land on the same leg, bending the knee to absorb the force with control.
4. Hold the landing stable for 2-3 seconds without losing balance.
5. Only performed once quadriceps strength reaches at least 90% symmetry versus the healthy leg (Limb Symmetry Index) and with therapist clearance.',
  'Jangan lakukan sebelum kriteria kekuatan dan kontrol neuromuskular fase menengah rehabilitasi ACL tercapai. Hentikan bila lutut terasa tidak stabil (''giving way'') atau nyeri tajam saat mendarat.', 'Gunakan hasil jarak lompat untuk menghitung Limb Symmetry Index (target >90%) sebelum kembali ke olahraga. Lanjutkan ke triple hop dan crossover hop bila hop tunggal sudah simetris.', 3, 3,
  3, 60, '2x/minggu',
  'A', 'Grindem et al. Br J Sports Med 2016;50(13):804-808 (Delaware-Oslo ACL cohort, hop tests and return-to-sport criteria); Logerstedt et al. Knee Ligament Sprain CPG, JOSPT 2017;47(11):A1-A47', ARRAY['ACL', 'return to sport', 'hop test', 'plyometric']::text[], null
),
-- Lateral Bound (Skater Hop)
(
  '3674d74c-791e-36d4-b834-bf64ad0999e7', 'lateral-bound-skater-hop', 'Lateral Bound (Skater Hop)', 'Lompat Lateral (Skater Hop)', 'Latihan pliometrik lateral fase akhir rehabilitasi lutut/pergelangan kaki, melatih kontrol frontal plane yang penting untuk olahraga dengan perubahan arah cepat.', 'A late-stage lateral plyometric drill for knee/ankle rehabilitation, training frontal-plane control important for sports with rapid changes of direction.',
  'Knee', 'Lower Limb', 'Advanced', 'Strength', 'Standing',
  'Gluteus medius, quadriceps, peroneal (kontrol frontal plane dan penyerapan gaya lateral)', ARRAY['Lantai datar dengan ruang cukup']::text[], '1. Berdiri seimbang di satu tungkai, lutut sedikit ditekuk.
2. Lompat ke samping menuju tungkai yang lain, mendarat dengan tungkai tersebut dan serap gaya dengan menekuk lutut dan pinggul.
3. Tahan posisi mendarat 1-2 detik, jaga lutut sejajar dengan jari kaki (tidak jatuh ke dalam/valgus).
4. Segera lompat kembali ke arah berlawanan begitu stabil.
5. Ulangi bolak-balik seperti gerakan skater es.', '1. Balance on one leg, knee slightly bent.
2. Bound sideways toward the other leg, landing on that leg and absorbing the force by bending the knee and hip.
3. Hold the landing for 1-2 seconds, keeping the knee tracking over the toes (not collapsing inward/valgus).
4. Immediately bound back the other way once stable.
5. Repeat back and forth like a speed skater''s stride.',
  'Hanya untuk fase lanjut rehabilitasi dengan kekuatan dan kontrol dinamis lutut/pergelangan kaki memadai. Hentikan bila lutut jatuh ke dalam (valgus) berulang atau nyeri saat mendarat.', 'Mulai dengan jarak lompat pendek dan tahan lebih lama sebelum lompat berikutnya; naikkan jarak dan kecepatan repetisi secara bertahap.', 3, 8,
  2, 60, '2x/minggu',
  'B', 'Myer GD et al. J Strength Cond Res 2006 (plyometric training and neuromuscular control); Logerstedt et al. Knee Ligament Sprain CPG, JOSPT 2017', ARRAY['ACL', 'plyometric', 'return to sport', 'frontal plane']::text[], null
),
-- Box Jump with Soft Landing
(
  '7d86e5c2-2899-32a1-979c-6a5cb8e56646', 'box-jump-soft-landing', 'Box Jump with Soft Landing', 'Lompat ke Kotak dengan Pendaratan Lembut', 'Latihan pliometrik dua tungkai yang menekankan teknik pendaratan lembut, digunakan pada fase akhir rehabilitasi lutut untuk melatih penyerapan gaya yang aman sebelum kembali ke olahraga lompat.', 'A double-leg plyometric exercise emphasising soft landing technique, used in late-phase knee rehabilitation to train safe force absorption before returning to jumping sports.',
  'Knee', 'Lower Limb', 'Advanced', 'Strength', 'Standing',
  'Quadriceps, gluteal, gastrocnemius-soleus (daya ledak dua tungkai dan mekanik pendaratan)', ARRAY['Kotak plyo/bangku stabil rendah']::text[], '1. Berdiri menghadap kotak rendah dengan jarak nyaman, kaki selebar bahu.
2. Tekuk lutut dan pinggul sedikit, ayunkan lengan, lalu lompat ke atas kotak dengan kedua kaki.
3. Mendarat di atas kotak dengan lembut - lutut menekuk, pinggul ke belakang, tumit menyentuh permukaan (bukan hanya ujung kaki).
4. Berdiri tegak sepenuhnya di atas kotak sebelum melangkah turun (bukan melompat turun) untuk repetisi berikutnya.
5. Fokus pada suara pendaratan sesenyap mungkin sebagai indikator penyerapan gaya yang baik.', '1. Stand facing a low box at a comfortable distance, feet shoulder-width apart.
2. Bend the knees and hips slightly, swing the arms, then jump onto the box with both feet.
3. Land on the box softly - knees bending, hips back, heels touching down (not just the toes).
4. Stand fully upright on the box before stepping down (not jumping down) for the next repetition.
5. Focus on landing as quietly as possible as an indicator of good force absorption.',
  'Hanya untuk fase lanjut rehabilitasi dengan kekuatan dasar dan kontrol lutut memadai. Hindari pada efusi sendi aktif, nyeri patellofemoral yang belum terkontrol, atau osteoartritis lutut berat.', 'Setelah pendaratan dua tungkai konsisten lembut, naikkan tinggi kotak, lalu progres ke pendaratan satu tungkai dan drop jump.', 3, 6,
  2, 60, '2x/minggu',
  'B', 'Myer GD et al. Br J Sports Med 2006 (plyometric training ACL injury prevention/rehabilitation); Logerstedt et al. JOSPT 2017 Knee Ligament Sprain CPG', ARRAY['plyometric', 'landing mechanics', 'return to sport']::text[], null
),
-- Multi-Angle Isometric Quad Sets
(
  '537d6a6e-d7e8-3e07-9f71-1fda07e134e2', 'multi-angle-isometric-quad', 'Multi-Angle Isometric Quad Sets', 'Kontraksi Isometrik Quad di Berbagai Sudut', 'Kontraksi isometrik quadriceps pada beberapa sudut lutut berbeda, berguna pasca dislokasi patela dan nyeri patellofemoral yang terbatas pada busur gerak tertentu.', 'Isometric quadriceps contractions at several different knee angles, useful after patellar dislocation and in patellofemoral pain limited to a specific range of the arc of motion.',
  'Knee', 'Lower Limb', 'Beginner', 'Strength', 'Sitting',
  'Quadriceps (vastus medialis obliquus, vastus lateralis, rectus femoris)', ARRAY['Kursi', 'Bantal/gulungan handuk']::text[], '1. Duduk di kursi dengan lutut ditekuk pada sudut tertentu (misalnya 90, 60, 40, dan 20 derajat secara bergantian di sesi berbeda).
2. Dorong tumit ke lantai/ke bawah sambil mengencangkan otot paha depan, seolah ingin meluruskan lutut melawan tahanan tak bergerak.
3. Tahan kontraksi 6-10 detik tanpa menahan napas.
4. Lepaskan perlahan, istirahat, dan ulangi pada sudut yang sama sebelum berpindah sudut lain.
5. Hindari sudut yang memicu nyeri tajam patellofemoral - pilih sudut yang nyaman (pain-free arc).', '1. Sit in a chair with the knee bent at a specific angle (e.g. 90, 60, 40, and 20 degrees, rotating through different sessions).
2. Push the heel down/into the floor while tightening the front thigh muscle, as if trying to straighten the knee against an immovable resistance.
3. Hold the contraction 6-10 seconds without holding your breath.
4. Release slowly, rest, and repeat at the same angle before moving to another angle.
5. Avoid angles that trigger sharp patellofemoral pain - choose a comfortable (pain-free) arc.',
  'Ikuti izin dokter/ahli bedah pasca dislokasi patela atau operasi lutut. Hindari sudut yang memicu nyeri tajam atau rasa ''akan lepas'' di lutut.', 'Setelah nyaman di beberapa sudut, lanjutkan ke penguatan dinamis busur pendek (short arc quad) lalu lingkup gerak penuh dengan beban.', 3, 8,
  8, 30, '1-2x/hari',
  'B', 'Willy et al. Patellofemoral Pain CPG, JOSPT 2019;49(9):CPG1-CPG95; Escamilla et al. JOSPT 2012 (patellofemoral joint loading by knee angle)', ARRAY['patellofemoral', 'isometric', 'quad', 'post-dislocation']::text[], null
),
-- Controlled Partial Squat (Meniscus-Safe)
(
  '3d36a280-a520-3875-b44e-f25d3da6d9e3', 'controlled-partial-squat-meniscus', 'Controlled Partial Squat (Meniscus-Safe)', 'Squat Parsial Terkontrol (Aman untuk Meniskus)', 'Squat pada busur gerak terbatas yang menghindari fleksi lutut dalam, digunakan pada fase awal-menengah rehabilitasi cedera/perbaikan meniskus untuk membatasi kompresi sendi.', 'A limited-arc squat avoiding deep knee flexion, used in early-to-mid meniscus injury/repair rehabilitation to limit joint compression.',
  'Knee', 'Lower Limb', 'Beginner', 'Strength', 'Standing',
  'Quadriceps, gluteal (pada busur gerak lutut terbatas 0-60 derajat)', ARRAY['Kursi sebagai panduan kedalaman']::text[], '1. Berdiri dengan kaki selebar bahu, kursi diletakkan di belakang sebagai panduan batas kedalaman.
2. Turunkan badan perlahan dengan menekuk lutut dan pinggul, jaga lutut tidak melampaui sekitar 60 derajat fleksi (paha belum sejajar lantai).
3. Jaga lutut sejajar arah jari kaki, berat badan merata di kedua kaki.
4. Berdiri kembali dengan mendorong melalui tumit.
5. Hentikan bila terasa ''terjepit'' atau nyeri tajam di garis sendi lutut.', '1. Stand with feet shoulder-width apart, a chair placed behind as a depth guide.
2. Lower slowly by bending the knees and hips, keeping the knee from going past about 60 degrees of flexion (thigh not yet parallel to the floor).
3. Keep the knee tracking over the toes, weight even on both feet.
4. Stand back up by pushing through the heels.
5. Stop if a ''catching'' sensation or sharp pain occurs at the knee joint line.',
  'Ikuti batasan sudut sesuai instruksi ahli bedah pasca perbaikan meniskus (umumnya hindari fleksi dalam pada 4-6 minggu pertama). Hindari squat dalam pada meniskus robek yang belum stabil.', 'Perdalam sudut squat secara bertahap sesuai izin dan toleransi nyeri, dari busur pendek menuju squat penuh dalam beberapa minggu.', 3, 10,
  2, 30, '3x/minggu',
  'B', 'Logerstedt et al. Knee Ligament Sprain CPG, JOSPT 2017;47(11):A1-A47 (graded loading principles); Skou & Roos BMC Musculoskelet Disord 2017 (GLA:D progressive loading)', ARRAY['meniscus', 'squat', 'post-op', 'graded loading']::text[], null
),
-- Star Excursion Balance Reach Training
(
  '150dad92-02f7-3af3-ad2d-afe0e7ee4923', 'star-excursion-balance-training', 'Star Excursion Balance Reach Training', 'Latihan Keseimbangan Jangkau Bintang (Star Excursion)', 'Latihan keseimbangan dinamis satu tungkai berdasarkan Star Excursion Balance Test, digunakan pada instabilitas pergelangan kaki kronis untuk melatih kontrol neuromuskular multiarah.', 'A dynamic single-leg balance drill based on the Star Excursion Balance Test, used in chronic ankle instability to train multidirectional neuromuscular control.',
  'Ankle', 'Lower Limb', 'Intermediate', 'Balance', 'Standing',
  'Peroneal, tibialis posterior, gluteal (kontrol dinamis satu tungkai multiarah)', ARRAY['Selotip/kapur untuk menandai garis di lantai']::text[], '1. Berdiri seimbang di satu tungkai di tengah garis yang ditandai membentuk bintang (anterior, posterolateral, posteromedial minimal).
2. Jangkau tungkai yang bebas sejauh mungkin ke arah anterior sambil menjaga tungkai tumpu tetap stabil, sentuh lantai ringan dengan ujung kaki.
3. Kembali ke posisi tegak tanpa kehilangan keseimbangan atau menyentuh lantai dengan tungkai tumpu.
4. Ulangi ke arah posteromedial dan posterolateral secara bergantian.
5. Catat jarak jangkauan untuk memantau perkembangan dan asimetri antar tungkai.', '1. Balance on one leg at the centre of lines marked in a star pattern (anterior, posterolateral, posteromedial at minimum).
2. Reach the free leg as far as possible in the anterior direction while keeping the standing leg stable, lightly touching the floor with the toes.
3. Return to standing without losing balance or the standing foot shifting.
4. Repeat toward posteromedial and posterolateral in turn.
5. Record the reach distance to track progress and side-to-side asymmetry.',
  'Hindari pada instabilitas akut pasca keseleo derajat III yang belum stabil untuk menahan beban penuh. Hentikan bila nyeri tajam atau tungkai tumpu terasa ''goyah'' berlebihan.', 'Naikkan jumlah arah jangkauan (hingga 8 arah), lakukan di permukaan tidak stabil, atau tutup mata setelah kontrol dasar tercapai.', 3, 5,
  0, 30, '3-5x/minggu',
  'A', 'Gribble PA et al. J Athl Train 2012 (Star Excursion Balance Test selection criteria); Martin et al. Ankle Stability and Movement Coordination Impairments CPG, JOSPT 2021;51(4):CPG1-CPG80', ARRAY['chronic ankle instability', 'balance', 'star excursion', 'proprioception']::text[], null
),
-- Seated Calf Raise (Soleus Focus)
(
  '52af020e-c339-3e02-bb5a-279e152300a9', 'seated-calf-raise', 'Seated Calf Raise (Soleus Focus)', 'Angkat Betis Duduk (Fokus Soleus)', 'Penguatan betis dengan lutut tertekuk yang menargetkan soleus secara spesifik, digunakan pada fase awal pasca ruptur/perbaikan tendon Achilles saat beban berdiri penuh belum diizinkan.', 'A bent-knee calf strengthening exercise specifically targeting the soleus, used in early-phase Achilles tendon rupture/repair rehabilitation before full standing load is permitted.',
  'Ankle', 'Lower Limb', 'Beginner', 'Strength', 'Sitting',
  'Soleus (dominan, dengan lutut tertekuk mengurangi kontribusi gastrocnemius)', ARRAY['Kursi', 'Beban di paha (opsional)']::text[], '1. Duduk di kursi dengan lutut ditekuk 90 derajat, telapak kaki rata di lantai.
2. Angkat tumit setinggi mungkin sambil menjaga jari kaki tetap menempel lantai.
3. Tahan 2-3 detik di puncak gerak, rasakan kontraksi di betis bagian dalam/bawah.
4. Turunkan perlahan dan terkontrol.
5. Tambahkan beban ringan di atas paha (dumbel/piring beban) setelah gerakan tanpa beban terasa mudah.', '1. Sit in a chair with the knee bent 90 degrees, foot flat on the floor.
2. Raise the heel as high as possible while keeping the toes on the floor.
3. Hold 2-3 seconds at the top, feeling the contraction in the deep/lower calf.
4. Lower slowly and with control.
5. Add light weight on top of the thigh (dumbbell/weight plate) once the unweighted movement feels easy.',
  'Ikuti batasan beban sesuai izin ahli bedah pasca ruptur/perbaikan Achilles. Hentikan bila nyeri tajam di tendon Achilles atau bengkak bertambah.', 'Setelah beban duduk terasa ringan, progres ke standing double-leg heel raise, lalu single-leg heel raise sesuai protokol fase rehabilitasi Achilles.', 3, 15,
  3, 30, '1x/hari',
  'B', 'Martin et al. Achilles Pain CPG, JOSPT 2018;48(5):A1-A38; Silbernagel KG et al. Am J Sports Med 2007 (Achilles tendon rehabilitation protocol)', ARRAY['achilles', 'post-op', 'calf strength', 'early phase']::text[], null
),
-- Toe Spread / Intrinsic Foot Strengthening
(
  'b8d857bf-9e64-3a1b-a970-02e4b4a0c5d9', 'toe-spread-intrinsic-strengthening', 'Toe Spread / Intrinsic Foot Strengthening', 'Membuka Jari Kaki / Penguatan Otot Intrinsik Kaki', 'Latihan penguatan otot intrinsik kaki untuk mengurangi tekanan berlebih pada bantalan metatarsal, relevan untuk neuroma Morton dan metatarsalgia.', 'Intrinsic foot muscle strengthening to reduce excess pressure on the metatarsal pad, relevant for Morton''s neuroma and metatarsalgia.',
  'Foot', 'Lower Limb', 'Beginner', 'Strength', 'Sitting',
  'Otot intrinsik kaki, abduktor jari kaki (dorsal/plantar interossei)', ARRAY['Karet gelang (opsional)']::text[], '1. Duduk dengan kaki rata di lantai, rileks.
2. Coba lebarkan/regangkan semua jari kaki menjauh satu sama lain tanpa menekuk jari.
3. Tahan posisi terbuka selama 5 detik, rasakan kontraksi di telapak kaki bagian depan.
4. Rileks dan ulangi.
5. Untuk tantangan lebih, lingkarkan karet gelang di sekeliling semua jari kaki sebagai tahanan ringan.', '1. Sit with the foot flat on the floor, relaxed.
2. Try to spread/widen all the toes apart from each other without curling them.
3. Hold the spread position for 5 seconds, feeling the contraction in the front of the foot sole.
4. Relax and repeat.
5. For more challenge, loop a rubber band around all the toes as light resistance.',
  'Hentikan bila kram kaki hebat muncul berulang. Hindari pada fase inflamasi akut sendi metatarsophalangeal.', 'Kombinasikan dengan short foot exercise dan towel scrunches untuk membangun kontrol arkus kaki yang lebih komprehensif.', 3, 10,
  5, 20, '1-2x/hari',
  'C', 'McKeon et al. Br J Sports Med 2015 (foot core system); praktik klinis manajemen konservatif neuroma Morton', ARRAY['morton''s neuroma', 'metatarsalgia', 'intrinsic foot', 'strength']::text[], null
),
-- Towel Scrunches (Intrinsic Foot Strengthening)
(
  'ffe05965-00a0-3b2c-a120-dca66f4036f4', 'towel-scrunches', 'Towel Scrunches (Intrinsic Foot Strengthening)', 'Meremas Handuk dengan Kaki (Penguatan Kaki Intrinsik)', 'Latihan klasik penguatan otot intrinsik telapak kaki, mendukung arkus kaki pada plantar fasciitis dan kaki datar fungsional.', 'A classic intrinsic foot sole strengthening exercise, supporting the arch in plantar fasciitis and functional flat foot.',
  'Foot', 'Lower Limb', 'Beginner', 'Strength', 'Sitting',
  'Fleksor jari kaki, otot intrinsik plantar', ARRAY['Handuk kecil']::text[], '1. Duduk dengan kaki di atas handuk kecil yang terhampar di lantai.
2. Gunakan jari-jari kaki untuk meremas dan menarik handuk ke arah tumit, seperti meremas kertas dengan jari tangan.
3. Setelah handuk terkumpul sepenuhnya, luruskan kembali dan ulangi.
4. Jaga tumit tetap menempel lantai sepanjang gerakan.
5. Untuk tantangan lebih, letakkan beban ringan di ujung handuk.', '1. Sit with the foot on a small towel laid flat on the floor.
2. Use the toes to scrunch and pull the towel toward the heel, like crumpling paper with the fingers.
3. Once the towel is fully gathered, straighten it out and repeat.
4. Keep the heel on the floor throughout the movement.
5. For more challenge, place a light weight at the far end of the towel.',
  'Hentikan bila kram telapak kaki berulang atau nyeri tajam pada fase akut plantar fasciitis - mulai dengan gerakan lembut lebih dulu.', 'Naikkan beban di ujung handuk secara bertahap. Kombinasikan dengan short foot exercise dan peregangan plantar fascia.', 3, 8,
  0, 20, '1x/hari',
  'C', 'Martin et al. Heel Pain - Plantar Fasciitis CPG, JOSPT 2023;53(12):CPG1-CPG39 (foot intrinsic strengthening adjunct); McKeon et al. Br J Sports Med 2015', ARRAY['plantar fasciitis', 'flat foot', 'intrinsic foot', 'arch']::text[], null
),
-- Single-Leg Balance with Functional Reach
(
  '35540b69-a245-350e-8e72-8230175a1976', 'single-leg-balance-reach-ankle', 'Single-Leg Balance with Functional Reach', 'Keseimbangan Satu Kaki dengan Jangkauan Fungsional', 'Latihan keseimbangan fungsional yang menggabungkan berdiri satu kaki dengan tugas jangkauan, jembatan menuju aktivitas sehari-hari dan olahraga setelah cedera pergelangan kaki.', 'A functional balance exercise combining single-leg standing with a reaching task, bridging toward everyday activity and sport after ankle injury.',
  'Ankle', 'Lower Limb', 'Intermediate', 'Balance', 'Standing',
  'Peroneal, otot stabilisator pergelangan kaki, kontrol postural', ARRAY['Objek kecil untuk diambil (opsional)']::text[], '1. Berdiri seimbang di tungkai yang cedera, tungkai lain sedikit terangkat.
2. Jangkau tangan ke depan untuk mengambil objek kecil dari lantai/meja rendah tanpa menyentuhkan tungkai yang terangkat ke lantai.
3. Kembali tegak sambil tetap menjaga keseimbangan di satu tungkai.
4. Ulangi dengan variasi arah jangkauan (depan, samping) sesuai toleransi.
5. Bila keseimbangan hilang, sentuhkan kaki ke lantai sebentar lalu lanjutkan.', '1. Balance on the injured leg, the other leg slightly lifted.
2. Reach forward to pick up a small object from the floor/low table without touching the lifted leg down.
3. Return upright while still balancing on the single leg.
4. Repeat with varied reach directions (forward, side) as tolerated.
5. If balance is lost, briefly touch the foot down then continue.',
  'Hindari beban penuh pada fase akut keseleo pergelangan kaki dengan nyeri berat saat berdiri. Hentikan bila pergelangan kaki terasa akan ''goyah''/tidak stabil.', 'Tingkatkan jarak jangkauan atau kompleksitas tugas (mis. menangkap bola) setelah keseimbangan dasar stabil.', 3, 8,
  0, 30, '3-5x/minggu',
  'B', 'Martin et al. Ankle Stability and Movement Coordination Impairments CPG, JOSPT 2021;51(4):CPG1-CPG80', ARRAY['ankle sprain', 'balance', 'functional', 'proprioception']::text[], null
),
-- Frenkel's Exercise - Heel-to-Shin Slide
(
  '1135fc5e-6431-32e6-88cf-28957ceaf322', 'frenkel-heel-to-shin', 'Frenkel''s Exercise - Heel-to-Shin Slide', 'Latihan Frenkel - Luncur Tumit ke Tulang Kering', 'Latihan koordinasi klasik Frenkel untuk ataksia serebelar, membantu pasien mempelajari kembali gerakan halus dan terarah menggunakan input visual sebagai kompensasi.', 'A classic Frenkel coordination exercise for cerebellar ataxia, helping patients relearn smooth, purposeful movement using visual input as compensation.',
  'Balance', 'Balance & Neuro', 'Beginner', 'Motor control', 'Supine',
  'Koordinasi tungkai, kontrol serebelar', ARRAY['Matras']::text[], '1. Berbaring telentang dengan kedua tungkai lurus.
2. Angkat satu tungkai, lalu letakkan tumit tepat di atas lutut tungkai yang lain sambil melihat gerakan tersebut.
3. Luncurkan tumit perlahan dan terkontrol menyusuri tulang kering menuju pergelangan kaki.
4. Luncurkan kembali ke atas menuju lutut dengan kecepatan yang sama, terkontrol.
5. Fokus pada kehalusan gerakan, bukan kecepatan - berhenti bila gerakan menjadi kasar/gemetar berlebihan.', '1. Lie on your back with both legs straight.
2. Lift one leg, then place the heel exactly on top of the other leg''s knee while watching the movement.
3. Slide the heel slowly and with control down the shin toward the ankle.
4. Slide back up toward the knee at the same controlled speed.
5. Focus on smoothness, not speed - stop if the movement becomes jerky/excessively shaky.',
  'Sesuaikan intensitas pada kelelahan berat (mis. pada multiple sclerosis fase eksaserbasi). Hentikan bila muncul pusing berat atau mual.', 'Setelah lancar dengan mata terbuka, coba dengan mata tertutup untuk mengurangi ketergantungan kompensasi visual, sesuai toleransi.', 3, 8,
  0, 30, '1-2x/hari',
  'B', 'Cameron MH, Nilsagard Y. Handb Clin Neurol 2018;159:237-250 (gait and balance rehabilitation in MS/ataxia); klasik Frenkel HS coordination exercises', ARRAY['ataxia', 'cerebellar', 'coordination', 'multiple sclerosis']::text[], null
),
-- Frenkel's Exercise - Seated Heel Tapping
(
  '18040181-d111-336e-be09-1104d014f7c4', 'frenkel-heel-tapping', 'Frenkel''s Exercise - Seated Heel Tapping', 'Latihan Frenkel - Ketuk Tumit Duduk', 'Latihan koordinasi Frenkel posisi duduk untuk melatih penempatan kaki yang presisi, digunakan pada ataksia akibat gangguan serebelar atau proprioseptif.', 'A seated Frenkel coordination exercise to train precise foot placement, used in ataxia from cerebellar or proprioceptive dysfunction.',
  'Balance', 'Balance & Neuro', 'Beginner', 'Motor control', 'Sitting',
  'Koordinasi tungkai bawah, kontrol serebelar', ARRAY['Kursi', 'Tanda di lantai (opsional)']::text[], '1. Duduk tegak di kursi dengan kedua kaki menggantung bebas atau menyentuh lantai.
2. Tandai sebuah titik target di lantai (atau bayangkan titik tersebut).
3. Ketukkan tumit ke titik target tersebut dengan gerakan terkontrol, lalu angkat kembali.
4. Ulangi dengan mengetuk titik target yang berbeda-beda di sekitar area (depan, samping) sesuai instruksi.
5. Perhatikan akurasi penempatan, bukan kecepatan gerakan.', '1. Sit tall in a chair with both feet hanging free or touching the floor.
2. Mark a target point on the floor (or imagine one).
3. Tap the heel onto that target point with a controlled movement, then lift back up.
4. Repeat, tapping different target points around the area (front, side) as instructed.
5. Focus on placement accuracy, not speed of movement.',
  'Sesuaikan pada kelemahan berat atau kelelahan signifikan. Hentikan bila pusing atau nyeri muncul.', 'Perbanyak jumlah titik target dan perbesar jarak antar titik seiring perbaikan koordinasi.', 3, 10,
  0, 20, '1-2x/hari',
  'B', 'Cameron MH, Nilsagard Y. Handb Clin Neurol 2018;159:237-250; klasik Frenkel HS coordination exercises for tabes dorsalis/ataxia', ARRAY['ataxia', 'coordination', 'multiple sclerosis', 'proprioception']::text[], null
),
-- Dual-Task Walking with Cognitive Challenge
(
  '0b3e8295-93f3-3f02-a5b9-2cb6bc45ad86', 'dual-task-walking-cognitive', 'Dual-Task Walking with Cognitive Challenge', 'Berjalan Tugas Ganda dengan Tantangan Kognitif', 'Latihan berjalan sambil melakukan tugas kognitif bersamaan, melatih kemampuan mempertahankan keseimbangan saat perhatian terbagi - relevan untuk pencegahan jatuh pada lansia dan pasca stroke.', 'Walking while performing a simultaneous cognitive task, training the ability to maintain balance under divided attention - relevant for fall prevention in older adults and after stroke.',
  'Balance', 'Balance & Neuro', 'Intermediate', 'Balance', 'Standing',
  'Kontrol postural dinamis, integrasi kognitif-motorik', ARRAY['Lorong berjalan yang aman']::text[], '1. Berjalan pada lintasan lurus yang aman dengan kecepatan nyaman, didampingi bila risiko jatuh tinggi.
2. Sambil berjalan, lakukan tugas kognitif seperti menghitung mundur dari 100 dengan kelipatan 3, atau menyebutkan nama hewan bergantian huruf.
3. Jaga agar berjalan tetap menjadi prioritas - jika keseimbangan terganggu, hentikan tugas kognitif sejenak.
4. Tempuh jarak/waktu yang ditentukan.
5. Tingkatkan kesulitan tugas kognitif secara bertahap seiring perbaikan kemampuan.', '1. Walk along a safe straight path at a comfortable pace, supervised if fall risk is high.
2. While walking, perform a cognitive task such as counting backward from 100 by 3s, or naming animals alternating letters.
3. Keep walking as the priority - if balance is disturbed, pause the cognitive task briefly.
4. Cover the prescribed distance/time.
5. Increase the cognitive task difficulty gradually as ability improves.',
  'Selalu dampingi pasien dengan risiko jatuh tinggi. Hentikan bila pasien tampak sangat goyah atau kebingungan meningkat.', 'Tambahkan rintangan fisik ringan (mis. melangkahi objek) bersamaan dengan tugas kognitif untuk latihan tugas ganda yang lebih menantang.', 3, 1,
  60, 60, '3x/minggu',
  'B', 'Silsupadol P et al. Arch Phys Med Rehabil 2009;90(3):381-387 (dual-task training for balance in older adults); Sherrington et al. Br J Sports Med 2017 (falls prevention meta-analysis)', ARRAY['falls prevention', 'dual task', 'cognitive', 'stroke']::text[], null
),
-- VOR x2 Viewing (Vestibular)
(
  '8f5dcc76-88ee-35fc-abcd-f24d81f9a770', 'vor-x2-viewing', 'VOR x2 Viewing (Vestibular)', 'Latihan VOR x2 Viewing (Vestibular)', 'Latihan adaptasi refleks vestibulo-okular tingkat lanjut menggunakan dua target visual bergerak berlawanan arah, untuk hipofungsi vestibular yang tidak membaik dengan gaze stabilisation x1 standar.', 'An advanced vestibulo-ocular reflex adaptation exercise using two visual targets moving in opposite directions, for vestibular hypofunction not improving with standard x1 gaze stabilisation.',
  'Balance', 'Balance & Neuro', 'Intermediate', 'Balance', 'Sitting',
  'Refleks vestibulo-okular (VOR), adaptasi vestibular', ARRAY['Dua target visual kecil dengan tulisan']::text[], '1. Duduk tegak dengan dua target bertuliskan huruf/angka, satu dipegang di tangan kiri satu di tangan kanan, sejajar pandangan.
2. Gerakkan kedua tangan (dan target) ke arah berlawanan (satu ke kiri, satu ke kanan) secara bersamaan.
3. Gerakkan kepala ke arah berlawanan dengan salah satu target sambil mata tetap fokus membaca target tersebut.
4. Lakukan gerakan horizontal terlebih dahulu, lalu vertikal setelah dikuasai.
5. Tingkatkan kecepatan gerakan kepala secara bertahap selama target masih terbaca jelas (tidak buram).', '1. Sit upright with two targets each showing letters/numbers, one held in the left hand and one in the right, at eye level.
2. Move both hands (and targets) in opposite directions (one left, one right) at the same time.
3. Move the head in the opposite direction to one of the targets while the eyes stay focused on reading that target.
4. Perform horizontal movements first, then vertical once mastered.
5. Gradually increase head movement speed as long as the target remains clearly readable (not blurred).',
  'Hanya dilakukan setelah gaze stabilisation x1 viewing dikuasai tanpa gejala berat. Hentikan bila mual/pusing berat muncul; istirahat sejenak lalu lanjutkan dengan intensitas lebih rendah.', 'Lanjutkan ke latihan berjalan sambil melakukan gaze stabilisation setelah versi duduk dikuasai dengan baik.', 3, 1,
  60, 30, '3-5x/hari',
  'A', 'Hall et al. Vestibular Rehabilitation for Peripheral Vestibular Hypofunction: Updated CPG, J Neurol Phys Ther 2022;46(2):118-177', ARRAY['vestibular', 'VOR', 'gaze stabilisation', 'dizziness']::text[], null
),
-- Standing Balance Eyes Closed (Romberg Progression)
(
  '67183b46-dbf1-38c5-87c8-d248b31eb2ad', 'standing-balance-eyes-closed', 'Standing Balance Eyes Closed (Romberg Progression)', 'Keseimbangan Berdiri Mata Tertutup (Progresi Romberg)', 'Latihan keseimbangan yang menghilangkan input visual untuk memaksa sistem somatosensori dan vestibular bekerja lebih dominan, digunakan pada gangguan keseimbangan perifer dan sentral.', 'A balance exercise removing visual input to force the somatosensory and vestibular systems to work harder, used in peripheral and central balance disorders.',
  'Balance', 'Balance & Neuro', 'Intermediate', 'Balance', 'Standing',
  'Sistem somatosensori dan vestibular (kompensasi hilangnya input visual)', ARRAY['Dinding di dekatnya untuk keamanan']::text[], '1. Berdiri dengan kaki rapat di dekat dinding untuk keamanan, mata terbuka terlebih dahulu untuk membangun kepercayaan diri posisi.
2. Tutup mata perlahan, pertahankan posisi berdiri stabil.
3. Tahan selama waktu yang ditoleransi, buka mata bila keseimbangan mulai goyah signifikan.
4. Selalu ada pendamping/dinding dalam jangkauan untuk mencegah jatuh.
5. Catat durasi bertahan sebagai tolok ukur kemajuan.', '1. Stand with feet together near a wall for safety, eyes open first to build confidence in the position.
2. Close the eyes slowly, maintaining a stable standing position.
3. Hold for a tolerated duration, opening the eyes if balance becomes significantly unsteady.
4. Always have a companion/wall within reach to prevent falls.
5. Record the hold duration as a progress benchmark.',
  'Selalu awasi pada pasien dengan risiko jatuh tinggi. Jangan lakukan tanpa pengaman pada riwayat jatuh berulang atau vertigo berat yang belum terkontrol.', 'Setelah stabil di lantai keras, progres ke permukaan busa, lalu ke stance tandem/satu kaki dengan mata tertutup sesuai toleransi.', 3, 1,
  30, 30, '1x/hari',
  'B', 'Hall et al. Vestibular Rehabilitation CPG, J Neurol Phys Ther 2022;46(2):118-177; CDC STEADI Four-Stage Balance Test', ARRAY['balance', 'vestibular', 'somatosensory', 'falls prevention']::text[], null
),
-- Incentive Spirometry
(
  '2545817f-5710-3660-9551-db4ac1d11708', 'incentive-spirometry', 'Incentive Spirometry', 'Spirometri Insentif', 'Latihan pernapasan volumetrik menggunakan alat untuk mencegah atelektasis dan komplikasi paru pasca operasi abdomen/toraks.', 'Volumetric breathing training using a device to prevent atelectasis and pulmonary complications after abdominal/thoracic surgery.',
  'Chest', 'Cardio', 'Beginner', 'Breathing', 'Sitting',
  'Otot inspirasi, ekspansi paru volumetrik', ARRAY['Alat spirometri insentif']::text[], '1. Duduk tegak, pegang alat spirometri insentif setinggi dada.
2. Embuskan napas normal terlebih dahulu, lalu letakkan mulut pada corong alat dan tutup rapat dengan bibir.
3. Tarik napas perlahan dan dalam melalui mulut, usahakan mengangkat penanda/bola pada alat setinggi dan sestabil mungkin.
4. Tahan napas 3-5 detik di puncak tarikan bila mampu, lalu lepaskan mulut dan embuskan napas normal.
5. Istirahat beberapa napas normal di antara usaha sebelum mengulang.', '1. Sit upright, hold the incentive spirometer at chest height.
2. Breathe out normally first, then place the mouth on the device mouthpiece and seal it with the lips.
3. Breathe in slowly and deeply through the mouth, trying to raise the marker/ball on the device as high and steadily as possible.
4. Hold the breath 3-5 seconds at the top if able, then release the mouthpiece and breathe out normally.
5. Rest for a few normal breaths between attempts before repeating.',
  'Gunakan dengan hati-hati pada pneumotoraks yang belum ditangani atau nyeri dada tajam yang tidak diketahui penyebabnya. Hentikan bila pusing berlebihan (hiperventilasi).', 'Tingkatkan target volume pada alat secara bertahap sesuai kemampuan; lakukan lebih sering pada periode awal pasca operasi (setiap jam saat terjaga).', 3, 10,
  4, 30, 'Setiap 1-2 jam pasca operasi',
  'A', 'Restrepo RD et al. Respir Care 2011;56(10):1600-1604 (AARC Clinical Practice Guideline: Incentive Spirometry); Boden et al. BMJ 2018 (preoperative breathing exercise training)', ARRAY['post-op', 'breathing', 'atelectasis prevention', 'spirometry']::text[], null
),
-- Autogenic Drainage (Airway Clearance)
(
  'ef40b654-91cc-36b1-ab9f-66145c8b9541', 'autogenic-drainage', 'Autogenic Drainage (Airway Clearance)', 'Drainase Autogenik (Pembersihan Jalan Napas)', 'Teknik pembersihan jalan napas tiga tahap yang menggunakan pernapasan terkontrol pada volume paru berbeda untuk melepaskan dan memindahkan sekret tanpa batuk paksa berlebihan, digunakan pada PPOK dan bronkiektasis/fibrosis kistik.', 'A three-stage airway clearance technique using controlled breathing at different lung volumes to loosen and move secretions without excessive forced coughing, used in COPD and bronchiectasis/cystic fibrosis.',
  'Chest', 'Cardio', 'Advanced', 'Breathing', 'Sitting',
  'Kontrol volume dan kecepatan aliran napas untuk mobilisasi sekret', '{}'::text[], '1. Tahap ''melepaskan'': bernapas dengan volume paru rendah (napas dangkal santai) selama beberapa siklus untuk melonggarkan sekret di saluran napas kecil.
2. Tahap ''mengumpulkan'': bernapas dengan volume paru sedang untuk memindahkan sekret ke saluran napas tengah.
3. Tahap ''mengeluarkan'': tarik napas dalam ke volume paru tinggi, lalu embuskan dengan cepat namun terkontrol (bukan batuk paksa) menuju saluran napas besar.
4. Batukkan sekret keluar hanya setelah terasa di tenggorokan bagian atas, bukan dipaksakan lebih awal.
5. Teknik ini idealnya diajarkan langsung oleh fisioterapis respirasi sebelum dilakukan mandiri di rumah.', '1. ''Unstick'' phase: breathe at low lung volume (relaxed shallow breathing) for several cycles to loosen secretions in the small airways.
2. ''Collect'' phase: breathe at mid lung volume to move secretions into the middle airways.
3. ''Evacuate'' phase: breathe in deeply to a high lung volume, then breathe out quickly but controlled (not a forced cough) to move secretions into the large airways.
4. Only cough the secretions out once they are felt in the upper throat, not forced earlier.
5. This technique is ideally taught in person by a respiratory physiotherapist before being performed independently at home.',
  'Hindari pada hemoptisis aktif (batuk darah) tanpa evaluasi medis, pneumotoraks yang belum stabil, atau kelelahan pernapasan berat. Harus diajarkan langsung sebelum dilakukan mandiri.', 'Kombinasikan dengan Active Cycle of Breathing Technique dan posisi drainase postural sesuai lokasi sekret yang ditargetkan.', 3, 6,
  3, 30, '1-2x/hari',
  'A', 'McIlwaine M et al. Eur Respir J 2017 (airway clearance techniques in cystic fibrosis systematic review); Spruit et al. ATS/ERS Statement on Pulmonary Rehabilitation, 2013', ARRAY['airway clearance', 'COPD', 'bronchiectasis', 'breathing']::text[], null
),
-- Segmental Breathing (Lateral Costal Expansion)
(
  '54ec8669-bdde-346a-a7b4-0940cc69bede', 'segmental-lateral-costal-breathing', 'Segmental Breathing (Lateral Costal Expansion)', 'Pernapasan Segmental (Ekspansi Kostal Lateral)', 'Latihan pernapasan yang menargetkan ekspansi rusuk bagian bawah-samping, membantu meningkatkan ventilasi area paru yang kurang terekspansi pasca operasi toraks atau pada penyakit paru restriktif.', 'A breathing exercise targeting expansion of the lower-side ribs, helping improve ventilation to underexpanded lung areas after thoracic surgery or in restrictive lung disease.',
  'Chest', 'Cardio', 'Beginner', 'Breathing', 'Sitting',
  'Otot interkostal, ekspansi rongga dada bagian bawah-lateral', '{}'::text[], '1. Duduk tegak, letakkan kedua tangan di sisi bawah tulang rusuk (kanan dan kiri) atau tangan terapis/pendamping di sana.
2. Embuskan napas penuh terlebih dahulu.
3. Tarik napas dalam melalui hidung, fokuskan aliran udara untuk mendorong rusuk mengembang ke arah samping melawan tangan.
4. Tahan sebentar di puncak tarikan, lalu embuskan perlahan melalui mulut sambil merasakan rusuk turun kembali.
5. Ulangi dengan fokus pada satu sisi dada bila salah satu sisi kurang terekspansi (misalnya pasca operasi toraks unilateral).', '1. Sit upright, place both hands on the lower sides of the rib cage (left and right) or have a therapist/companion''s hands there.
2. Breathe out fully first.
3. Breathe in deeply through the nose, focusing the airflow to push the ribs to expand sideways against the hands.
4. Hold briefly at the top, then breathe out slowly through the mouth while feeling the ribs fall back down.
5. Repeat focusing on one side of the chest if one side is underexpanded (e.g. after unilateral thoracic surgery).',
  'Hindari tekanan berlebihan pada area luka operasi yang baru. Hentikan bila nyeri tajam atau pusing berlebihan muncul.', 'Kombinasikan dengan thoracic expansion exercise dan mobilisasi dini pasca operasi untuk hasil ventilasi paru yang optimal.', 3, 8,
  3, 20, 'Setiap 1-2 jam pasca operasi, lalu 3x/hari',
  'B', 'Spruit et al. ATS/ERS Statement on Pulmonary Rehabilitation, Am J Respir Crit Care Med 2013;188(8):e13-e64; Boden et al. BMJ 2018 (preoperative breathing exercise)', ARRAY['breathing', 'post-op', 'thoracic surgery', 'lung expansion']::text[], null
),
-- Pelvic Floor Relaxation (Reverse Kegel)
(
  'e3a3f3ef-410c-33be-b155-6146c4cc1218', 'pelvic-floor-relaxation-reverse-kegel', 'Pelvic Floor Relaxation (Reverse Kegel)', 'Relaksasi Dasar Panggul (Reverse Kegel)', 'Latihan relaksasi dan pemanjangan sadar otot dasar panggul, digunakan pada nyeri panggul kronis, dispareunia, vaginismus, dan dasar panggul yang terlalu tegang (hipertonik).', 'Conscious relaxation and lengthening of the pelvic floor muscles, used in chronic pelvic pain, dyspareunia, vaginismus, and an overactive (hypertonic) pelvic floor.',
  'Pelvic floor', 'Women''s Health', 'Beginner', 'Motor control', 'Supine',
  'Relaksasi otot dasar panggul (kebalikan dari kontraksi Kegel)', ARRAY['Matras', 'Bantal di bawah lutut']::text[], '1. Berbaring telentang dengan lutut ditekuk dan bantal di bawah lutut, tubuh rileks sepenuhnya.
2. Tarik napas dalam ke arah perut bawah, bayangkan dasar panggul mengembang dan turun/melebar seperti bunga yang mekar saat udara masuk.
3. Embuskan napas perlahan tanpa mengencangkan dasar panggul - biarkan tetap rileks memanjang.
4. Ulangi dengan fokus penuh pada sensasi ''melepaskan'' dan bukan pada mengencangkan otot.
5. Latihan ini sering dikombinasikan dengan edukasi postur dan manajemen stres oleh terapis dasar panggul.', '1. Lie on your back with knees bent and a pillow under the knees, the body fully relaxed.
2. Breathe in deeply toward the lower belly, imagining the pelvic floor expanding and dropping/widening like a flower opening as air comes in.
3. Breathe out slowly without tightening the pelvic floor - let it stay relaxed and lengthened.
4. Repeat with full focus on the sensation of ''letting go'' rather than tightening the muscle.
5. This exercise is often combined with posture education and stress management by a pelvic floor therapist.',
  'Bila nyeri panggul justru bertambah atau pasien kesulitan merasakan relaksasi tanpa panduan, rujuk ke fisioterapis dasar panggul untuk biofeedback langsung.', 'Setelah relaksasi dasar tercapai, integrasikan dengan latihan pernapasan diafragma penuh dan posisi fungsional (duduk, berdiri) sehari-hari.', 3, 8,
  6, 20, '1-2x/hari',
  'B', 'Rosenbaum TY, Owens A. J Sex Med 2008;5(3):513-523 (pelvic floor physical therapy for pain and sexual dysfunction); NICE NG123 Urinary Incontinence and Pelvic Organ Prolapse in Women (2019)', ARRAY['pelvic pain', 'hypertonic pelvic floor', 'relaxation', 'dyspareunia']::text[], null
),
-- Six-Minute Walk Progressive Training
(
  'fa5b64af-6181-3e4c-ba47-d32ab2816ed7', 'six-minute-walk-progressive-training', 'Six-Minute Walk Progressive Training', 'Latihan Berjalan Progresif Berbasis 6-Minute Walk', 'Program latihan jalan progresif berbasis hasil tes 6-minute walk test (6MWT), dasar rehabilitasi jantung dan paru untuk membangun kapasitas fungsional secara aman dan terukur.', 'A progressive walking program based on the 6-minute walk test (6MWT) result, a foundation of cardiac and pulmonary rehabilitation to safely and measurably build functional capacity.',
  'General', 'Cardio', 'Beginner', 'Aerobic', 'Standing',
  'Kapasitas aerobik keseluruhan, daya tahan kardiorespirasi', ARRAY['Lintasan datar terukur', 'Kursi untuk istirahat']::text[], '1. Tentukan jarak awal dari hasil 6-minute walk test atau jarak yang bisa ditempuh dengan sesak napas/kelelahan ringan (skala Borg 3-4/10).
2. Berjalan dengan kecepatan mandiri senyaman mungkin di lintasan datar, boleh berhenti istirahat duduk bila perlu lalu lanjutkan.
3. Pantau sesak napas dan kelelahan menggunakan skala Borg; hentikan bila mencapai 7/10 atau muncul nyeri dada/pusing.
4. Catat total jarak/waktu tempuh setiap sesi.
5. Tingkatkan jarak atau kecepatan secara bertahap (sekitar 10% per 1-2 minggu) berdasarkan toleransi.', '1. Establish a starting distance from the 6-minute walk test result or a distance achievable with mild breathlessness/fatigue (Borg scale 3-4/10).
2. Walk at a self-selected comfortable pace on a flat track, resting seated if needed and then continuing.
3. Monitor breathlessness and fatigue using the Borg scale; stop if it reaches 7/10 or chest pain/dizziness occurs.
4. Record the total distance/time covered each session.
5. Increase the distance or pace gradually (about 10% per 1-2 weeks) based on tolerance.',
  'Hentikan segera dan cari bantuan medis bila muncul nyeri dada, pusing berat, sesak napas ekstrem, atau denyut jantung tidak beraturan. Dapatkan izin kardiolog/pulmonolog sebelum memulai pada kondisi jantung/paru tidak stabil.', 'Gunakan sebagai batu loncatan menuju program jalan terstruktur (Structured Walking Program) dengan target durasi dan intensitas yang lebih tinggi.', 1, 1,
  0, 0, '3-5x/minggu',
  'A', 'Dibben et al. Cochrane 2021;11:CD001800 (exercise-based cardiac rehabilitation); Spruit et al. ATS/ERS Statement on Pulmonary Rehabilitation, 2013 (6MWT-based walking prescription)', ARRAY['cardiac rehab', 'pulmonary rehab', 'walking', 'aerobic capacity']::text[], null
),
-- TMJ Rest Position (Tongue-to-Palate)
(
  '89e7b01a-0e4c-3ebc-b709-a2504f50c563', 'tmj-rest-position', 'TMJ Rest Position (Tongue-to-Palate)', 'Posisi Istirahat Sendi Rahang (Lidah ke Langit-Langit)', 'Latihan kesadaran posisi istirahat rahang, langkah dasar manajemen gangguan sendi temporomandibular (TMD) untuk mengurangi kebiasaan mengatupkan/menggemeretakkan gigi.', 'A jaw resting-position awareness exercise, a foundational step in temporomandibular disorder (TMD) management to reduce jaw clenching/grinding habits.',
  'Jaw', 'Neck & Upper', 'Beginner', 'Motor control', 'Sitting',
  'Otot masseter, temporalis (relaksasi), kontrol posisi rahang istirahat', '{}'::text[], '1. Duduk tegak dan rileks, bibir tertutup ringan tanpa dipaksa.
2. Letakkan ujung lidah lembut menempel di langit-langit mulut, tepat di belakang gigi depan atas.
3. Biarkan gigi atas dan bawah tidak saling bersentuhan (ada jarak kecil di antaranya) - ini adalah posisi istirahat rahang yang benar.
4. Rileks kan otot pipi dan rahang sepenuhnya, jaga napas tetap tenang melalui hidung.
5. Latih kesadaran posisi ini sepanjang hari, terutama saat stres atau berkonsentrasi (mis. bekerja di depan komputer).', '1. Sit upright and relaxed, lips lightly closed without forcing.
2. Rest the tip of the tongue gently on the roof of the mouth, just behind the upper front teeth.
3. Let the upper and lower teeth not touch each other (a small gap between them) - this is the correct jaw rest position.
4. Fully relax the cheek and jaw muscles, keep breathing calmly through the nose.
5. Practise awareness of this position throughout the day, especially during stress or concentration (e.g. working at a computer).',
  'Bila kesulitan bernapas melalui hidung (mis. hidung tersumbat kronis), sesuaikan dan konsultasikan ke dokter THT. Tidak menggantikan evaluasi gigi/TMJ oleh dokter gigi bila nyeri berat atau kunci rahang.', 'Gabungkan dengan pengingat rutin (alarm/catatan tempel) untuk membangun kebiasaan sepanjang hari, dan edukasi mengenai pemicu stres yang memicu mengatup gigi.', 1, 1,
  0, 0, 'Sepanjang hari, cek berkala',
  'B', 'Armijo-Olivo S et al. Phys Ther 2016;96(1):9-25 (manual therapy and exercise for TMD systematic review); McNeely ML et al. Phys Ther 2006;86(5):710-725', ARRAY['TMJ', 'TMD', 'jaw relaxation', 'clenching']::text[], null
),
-- Controlled Mouth Opening (Rocabado 6x6)
(
  'd101fa3e-af0f-3545-b19a-f16dbb5c38b8', 'controlled-mouth-opening-tmj', 'Controlled Mouth Opening (Rocabado 6x6)', 'Membuka Mulut Terkontrol (Rocabado 6x6)', 'Latihan mobilitas rahang terkontrol dari program Rocabado 6x6, membantu memperbaiki jalur pembukaan mulut yang deviasi dan mengurangi klik/bunyi sendi TMJ.', 'A controlled jaw mobility exercise from the Rocabado 6x6 program, helping correct a deviated mouth-opening path and reduce TMJ clicking/popping.',
  'Jaw', 'Neck & Upper', 'Intermediate', 'Mobility', 'Sitting',
  'Sendi temporomandibular, otot pterygoid lateral (kontrol jalur buka-tutup)', ARRAY['Cermin']::text[], '1. Duduk di depan cermin, letakkan ujung lidah di langit-langit mulut belakang gigi depan (posisi istirahat).
2. Buka mulut perlahan sejauh mungkin sambil menjaga ujung lidah tetap menempel di langit-langit (ini membatasi gerak dan menjaga jalur lurus).
3. Amati di cermin agar rahang membuka lurus ke bawah tanpa bergeser/deviasi ke satu sisi.
4. Tutup mulut perlahan kembali dengan kontrol yang sama.
5. Bila rahang menyimpang ke satu sisi, coba koreksi dengan gerakan lebih lambat dan fokus visual di cermin.', '1. Sit in front of a mirror, place the tongue tip on the roof of the mouth behind the front teeth (rest position).
2. Open the mouth slowly as far as possible while keeping the tongue tip on the roof (this limits movement and keeps the path straight).
3. Watch in the mirror to make sure the jaw opens straight down without shifting/deviating to one side.
4. Close the mouth slowly with the same control.
5. If the jaw deviates to one side, try correcting with slower movement and visual focus in the mirror.',
  'Hentikan bila nyeri tajam, rahang terkunci (tidak bisa menutup/membuka), atau bunyi ''klik'' disertai nyeri hebat - rujuk ke dokter gigi spesialis TMJ. Hindari membuka mulut paksa melebihi batas nyaman.', 'Bagian dari program Rocabado 6x6 lengkap yang juga mencakup latihan postur lidah, kontrol rotasi rahang, dan penguatan isometrik - idealnya diajarkan lengkap oleh terapis.', 2, 6,
  3, 20, '6x/hari',
  'B', 'McNeely ML et al. Phys Ther 2006;86(5):710-725 (systematic review effectiveness of physical therapy for TMD); Rocabado M. Cranio 1983 (6x6 exercise programme)', ARRAY['TMJ', 'TMD', 'mobility', 'Rocabado']::text[], null
),
-- TMJ Isometric Exercises (4-Way)
(
  'e3a3bdad-16d9-3ca1-a022-1a695bc78922', 'tmj-isometrics', 'TMJ Isometric Exercises (4-Way)', 'Isometrik Sendi Rahang 4 Arah', 'Kontraksi isometrik rahang empat arah untuk melatih kontrol otot pengunyah tanpa membebani sendi TMJ secara berlebihan, cocok untuk fase nyeri TMD.', 'Four-direction isometric jaw contractions to train chewing muscle control without overloading the TMJ, suitable for the painful phase of TMD.',
  'Jaw', 'Neck & Upper', 'Beginner', 'Strength', 'Sitting',
  'Otot pengunyah (masseter, temporalis, pterygoid) - kontraksi isometrik multiarah', '{}'::text[], '1. Duduk tegak, letakkan tinju/telapak tangan di bawah dagu.
2. Dorong dagu ke bawah melawan tahanan tangan tanpa membiarkan mulut membuka - tahan 5 detik.
3. Letakkan tangan di satu sisi rahang, dorong rahang ke arah tangan tersebut melawan tahanan tanpa gerakan nyata - tahan 5 detik, ulangi sisi lain.
4. Letakkan tangan di depan dagu, dorong rahang ke depan melawan tahanan - tahan 5 detik.
5. Semua kontraksi harus lembut (30-50% usaha maksimal) dan tidak boleh memicu nyeri.', '1. Sit upright, place a fist/palm under the chin.
2. Push the chin down against the hand''s resistance without letting the mouth open - hold 5 seconds.
3. Place a hand on one side of the jaw, push the jaw toward that hand against resistance without visible movement - hold 5 seconds, repeat the other side.
4. Place a hand in front of the chin, push the jaw forward against resistance - hold 5 seconds.
5. All contractions should be gentle (30-50% maximal effort) and must not trigger pain.',
  'Hindari usaha maksimal/kuat - gunakan intensitas rendah-sedang saja. Hentikan bila nyeri sendi bertambah atau rahang terasa akan ''terkunci''.', 'Setelah nyeri terkontrol, gabungkan dengan controlled mouth opening dan postur leher (chin tuck) karena TMD sering berkaitan dengan postur cervical.', 2, 4,
  5, 20, '1-2x/hari',
  'B', 'Armijo-Olivo S et al. Phys Ther 2016;96(1):9-25 (exercise therapy for TMD); Shaffer SM et al. J Orthop Sports Phys Ther 2014 (TMD evaluation and management)', ARRAY['TMJ', 'TMD', 'isometric', 'jaw']::text[], null
),
-- Chin Tuck with Tongue-Up Swallow (TMJ/Cervical Integration)
(
  'fcc3a731-63b2-3ba9-ba76-4fd72ee46ca8', 'chin-tuck-tongue-up-tmj', 'Chin Tuck with Tongue-Up Swallow (TMJ/Cervical Integration)', 'Chin Tuck dengan Menelan Lidah Terangkat (Integrasi TMJ/Servikal)', 'Latihan gabungan postur leher dan pola menelan yang benar, mengatasi hubungan erat antara postur cervical dan disfungsi TMJ (forward head posture memperberat gejala TMD).', 'A combined neck posture and correct swallowing pattern exercise, addressing the close relationship between cervical posture and TMJ dysfunction (forward head posture worsens TMD symptoms).',
  'Jaw', 'Neck & Upper', 'Beginner', 'Motor control', 'Sitting',
  'Fleksor leher dalam dan otot suprahyoid/infrahyoid (integrasi postur leher-rahang)', '{}'::text[], '1. Duduk tegak dengan postur baik, lakukan chin tuck ringan (tarik dagu ke dalam tanpa menunduk).
2. Letakkan ujung lidah di langit-langit mulut belakang gigi depan.
3. Sambil mempertahankan posisi lidah dan chin tuck, telan ludah dengan normal tanpa mengatupkan gigi kuat atau menjulurkan rahang ke depan.
4. Rasakan otot leher depan bekerja ringan, bukan otot rahang yang dominan.
5. Ulangi secara perlahan, fokus pada koordinasi bukan kecepatan.', '1. Sit upright with good posture, perform a gentle chin tuck (draw the chin in without looking down).
2. Place the tongue tip on the roof of the mouth behind the front teeth.
3. While maintaining the tongue position and chin tuck, swallow normally without clenching the teeth hard or jutting the jaw forward.
4. Feel the front neck muscles working lightly, not the jaw muscles dominating.
5. Repeat slowly, focusing on coordination rather than speed.',
  'Hentikan bila muncul nyeri leher tajam atau kesulitan menelan yang tidak biasa (rujuk untuk evaluasi disfagia bila menetap). Sesuaikan pada pasien dengan gangguan menelan yang sudah terdiagnosis.', 'Gabungkan dengan program latihan fleksor leher dalam dan postur duduk ergonomis untuk hasil jangka panjang pada TMD terkait postur.', 3, 8,
  3, 20, '2-3x/hari',
  'C', 'Shaffer SM et al. J Orthop Sports Phys Ther 2014;44(2):A1-A18 (temporomandibular disorders: management including cervical spine); Armijo-Olivo S et al. Phys Ther 2016', ARRAY['TMJ', 'TMD', 'posture', 'cervical', 'swallowing']::text[], null
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
