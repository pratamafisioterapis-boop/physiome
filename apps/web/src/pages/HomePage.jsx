
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, Users, Calendar, FileText, Dumbbell, 
  BrainCircuit, Activity, CreditCard, Video, Zap, BarChart3, Smartphone,
  MessageSquare, Bell, Shield, ArrowUpRight, Star
} from 'lucide-react'; // Pastikan semua ikon diimpor
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import LandingHeader from '@/components/landing/LandingHeader.jsx';
import LandingFooter from '@/components/landing/LandingFooter.jsx';
import ROICalculator from '@/components/landing/ROICalculator.jsx';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Users, title: 'Manajemen Pasien', desc: 'Rekam medis elektronik terpusat dengan riwayat lengkap.' },
    { icon: Calendar, title: 'Penjadwalan Terapi', desc: 'Sistem booking cerdas dengan pengingat otomatis.' },
    { icon: FileText, title: 'SOAP Notes', desc: 'Dokumentasi klinis cepat dengan template standar.' },
    { icon: Dumbbell, title: 'Exercise Prescription', desc: 'Buat program latihan kustom dengan video HD.' },
    { icon: BrainCircuit, title: 'AI Program Generator', desc: 'Rekomendasi latihan berbasis AI sesuai diagnosa.' },
    { icon: Activity, title: 'Outcome Measures', desc: 'Lacak skor nyeri dan fungsional secara objektif.' },
    { icon: CreditCard, title: 'Paket Terapi', desc: 'Kelola paket sesi dan langganan pasien.' },
    { icon: FileText, title: 'Billing & Pembayaran', desc: 'Invoice otomatis dan pelacakan pembayaran.' },
    { icon: Video, title: 'Telehealth', desc: 'Konsultasi video terintegrasi langsung di platform.' },
    { icon: Zap, title: 'Workflow Automation', desc: 'Otomatisasi tugas repetitif untuk hemat waktu.' },
    { icon: BarChart3, title: 'Dashboard Analitik', desc: 'Laporan performa klinik dan produktivitas.' },
    { icon: Smartphone, title: 'Mobile Patient App', desc: 'Aplikasi khusus pasien untuk panduan latihan.' },
  ];

  const aiFeatures = [
    { title: 'AI SOAP Notes', desc: 'Ubah catatan singkat menjadi dokumentasi SOAP profesional dalam hitungan detik.' },
    { title: 'AI Exercise Generator', desc: 'Dapatkan draf program latihan instan berdasarkan diagnosa dan tingkat nyeri pasien.' },
    { title: 'AI Progress Analysis', desc: 'Analisis tren pemulihan pasien secara otomatis dari data kepatuhan latihan.' },
    { title: 'AI Clinical Insights', desc: 'Peringatan dini jika pasien menunjukkan tanda-tanda penurunan fungsional.' },
    { title: 'AI Patient Summary', desc: 'Ringkasan riwayat pasien komprehensif untuk persiapan sesi yang lebih cepat.' },
  ];

  const faqs = [
    { q: 'Apakah tersedia uji coba gratis?', a: 'Ya, kami menyediakan uji coba gratis selama 14 hari dengan akses penuh ke semua fitur premium tanpa memerlukan kartu kredit.' },
    { q: 'Apakah data pasien saya aman?', a: 'Keamanan adalah prioritas utama kami. Data dienkripsi end-to-end dan disimpan di server bersertifikasi HIPAA/SATUSEHAT dengan backup harian.' },
    { q: 'Bisakah saya memindahkan data dari sistem lama?', a: 'Tentu. Tim support kami akan membantu proses migrasi data pasien dan rekam medis Anda secara gratis saat onboarding.' },
    { q: 'Apakah Physiome mendukung telehealth?', a: 'Ya, Physiome memiliki fitur video call terintegrasi yang aman untuk sesi konsultasi jarak jauh.' },
    { q: 'Bisakah saya menggunakan video latihan sendiri?', a: 'Sangat bisa. Anda dapat mengunggah video latihan klinik Anda sendiri atau menggunakan ribuan video HD dari library bawaan kami.' },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <Helmet><title>Physiome | Software Manajemen Klinik Fisioterapi Cerdas</title></Helmet>
      <LandingHeader />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Platform Fisioterapi #1 di Indonesia
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] mb-6">
                Kelola Klinik Fisioterapi Lebih <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Cerdas dengan AI</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
                Tingkatkan efisiensi operasional, otomatisasi dokumentasi SOAP, dan berikan pengalaman pemulihan terbaik bagi pasien Anda dalam satu platform terpadu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full text-base h-14 px-8 shadow-glow" onClick={() => navigate('/register')}>
                  Mulai Gratis Sekarang <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full text-base h-14 px-8 border-border hover:bg-muted">
                  Jadwalkan Demo
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <p>Dipercaya oleh <strong>500+</strong> fisioterapis</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:h-[600px] flex items-center justify-center"
            >
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl transform rotate-3 scale-105 -z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1686061592689-312bbfb5c055?q=80&w=2070&auto=format&fit=crop" 
                  alt="Physiome Dashboard" 
                  className="rounded-3xl shadow-2xl border border-border/50 object-cover w-full h-auto"
                />
                
                {/* Floating Cards */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-8 top-12 glass-card p-4 rounded-2xl flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center text-success">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Recovery Progress</p>
                    <p className="text-lg font-bold text-foreground">+24%</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -right-8 bottom-20 glass-card p-4 rounded-2xl flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Exercise Adherence</p>
                    <p className="text-lg font-bold text-foreground">89%</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-10 border-y border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-muted-foreground mb-8 uppercase tracking-wider">Dipercaya oleh Klinik dan Fisioterapis Modern</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 font-bold text-xl"><Activity className="w-6 h-6"/> PhysioCare</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Shield className="w-6 h-6"/> MedRehab</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Dumbbell className="w-6 h-6"/> SportsClinic</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Users className="w-6 h-6"/> OrthoHealth</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Alur Kerja yang Mulus</h2>
            <p className="text-lg text-muted-foreground">Tiga langkah mudah untuk mentransformasi cara Anda mengelola klinik dan merawat pasien.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -z-10" />
            
            {[
              { step: '01', title: 'Daftarkan Klinik Anda', desc: 'Setup profil klinik, undang terapis, dan atur jadwal layanan dalam hitungan menit.' },
              { step: '02', title: 'Kelola Pasien & Program', desc: 'Catat rekam medis, buat SOAP notes dengan AI, dan berikan program latihan kustom.' },
              { step: '03', title: 'Pantau Progres Terapi', desc: 'Lacak kepatuhan pasien dan evaluasi hasil klinis melalui dashboard analitik real-time.' }
            ].map((item, i) => (
              <motion.div key={i} {...fadeIn} transition={{ delay: i * 0.2 }} className="relative flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-background border-4 border-primary rounded-full flex items-center justify-center text-3xl font-extrabold text-primary mb-6 shadow-glow">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES BENTO GRID */}
      <section id="features" className="py-24 bg-secondary text-secondary-foreground rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 my-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Semua yang Anda Butuhkan</h2>
            <p className="text-secondary-foreground/70 text-lg">Fitur komprehensif yang dirancang khusus untuk alur kerja fisioterapi modern.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <motion.div 
                key={i} 
                {...fadeIn}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feat.title}</h3>
                <p className="text-sm text-secondary-foreground/60 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXERCISE PRESCRIPTION SHOWCASE */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Fitur Unggulan: <br/><span className="text-primary">Exercise Prescription</span></h2>
              <p className="text-lg text-muted-foreground mb-8">
                Tinggalkan kertas cetak. Berikan program latihan interaktif dengan video HD langsung ke smartphone pasien Anda untuk meningkatkan kepatuhan dan hasil terapi.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: 'Library Video HD', desc: 'Akses ribuan video latihan profesional atau unggah video klinik Anda sendiri.' },
                  { title: 'Smart Program Builder', desc: 'Buat program kustom dengan drag-and-drop, atur set, repetisi, dan durasi.' },
                  { title: 'Tracking Kepatuhan', desc: 'Pantau apakah pasien melakukan latihan di rumah secara real-time.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeIn} className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-[3rem] transform -rotate-3 scale-105 -z-10" />
              <img 
                src="https://images.unsplash.com/photo-1593150543200-56e05bdb018e?q=80&w=2070&auto=format&fit=crop" 
                alt="Mobile Patient App" 
                className="rounded-[3rem] shadow-2xl border-8 border-white object-cover w-full h-[600px]"
              />
              <div className="absolute bottom-8 left-8 right-8 glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold">Aplikasi Pasien</h4>
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">Tersedia</span>
                </div>
                <p className="text-sm text-muted-foreground">Pasien dapat melihat video instruksi, mencatat nyeri, dan berkomunikasi dengan terapis melalui aplikasi khusus.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI SECTION */}
      <section className="py-24 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground font-medium text-sm mb-4">
              <BrainCircuit className="w-4 h-4" /> Powered by Generative AI
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Asisten AI untuk Fisioterapis Modern</h2>
            <p className="text-lg text-muted-foreground">Kurangi waktu administrasi hingga 60% dan fokus pada perawatan pasien dengan bantuan kecerdasan buatan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiFeatures.map((feat, i) => (
              <motion.div 
                key={i} 
                {...fadeIn}
                className={`bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow ${i === 0 ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-card to-primary/5' : ''}`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ANALYTICS & ROI */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeIn} className="order-2 lg:order-1 relative">
                <img 
                  src="https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?q=80&w=2074&auto=format&fit=crop" 
                  alt="Analytics Dashboard" 
                  className="rounded-3xl shadow-2xl border border-border"
                />
              </motion.div>
              <motion.div {...fadeIn} className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Pantau Kinerja Klinik Secara Real-Time</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Ambil keputusan berbasis data. Dashboard analitik kami memberikan visibilitas penuh terhadap operasional klinik, finansial, dan hasil klinis pasien.
                </p>
                <ul className="space-y-4">
                  {['Laporan Pendapatan & Invoice', 'Produktivitas Terapis', 'Tingkat Retensi Pasien', 'Analisis Outcome Klinis'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                      <ArrowUpRight className="w-5 h-5 text-primary" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          <motion.div {...fadeIn}>
            <ROICalculator />
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kisah Sukses Klien Kami</h2>
            <p className="text-lg text-muted-foreground">Lihat bagaimana Physiome membantu klinik fisioterapi berkembang.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Dr. Maya Chen', role: 'Pemilik Klinik, PhysioCare', quote: 'Physiome mengubah cara kami bekerja. Waktu untuk dokumentasi berkurang drastis berkat AI SOAP notes, dan pasien sangat menyukai aplikasi latihannya.' },
              { name: 'Budi Santoso', role: 'Senior Fisioterapis', quote: 'Fitur exercise prescription sangat intuitif. Saya bisa membuat program kustom dalam 2 menit. Kepatuhan pasien meningkat 40% sejak menggunakan platform ini.' },
              { name: 'Sarah Williams', role: 'Manajer Operasional', quote: 'Sistem billing dan penjadwalan yang terintegrasi membuat operasional klinik jauh lebih rapi. Tidak ada lagi jadwal bentrok atau invoice yang terlewat.' }
            ].map((testi, i) => (
              <motion.div key={i} {...fadeIn} className="bg-card p-8 rounded-3xl border border-border shadow-sm relative">
                <div className="flex gap-1 text-warning mb-6">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-foreground text-lg mb-8 italic">"{testi.quote}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-muted rounded-full overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?img=${i+30}`} alt={testi.name} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{testi.name}</h4>
                    <p className="text-sm text-muted-foreground">{testi.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pilih Paket yang Sesuai</h2>
            <p className="text-lg text-muted-foreground">Harga transparan tanpa biaya tersembunyi. Skalakan klinik Anda bersama kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Starter', price: 'Rp 499k', desc: 'Untuk praktisi mandiri', features: ['1 Terapis', 'Hingga 100 Pasien Aktif', 'Rekam Medis Dasar', 'Exercise Library Standar', 'Email Support'] },
              { name: 'Growth', price: 'Rp 999k', desc: 'Untuk klinik berkembang', recommended: true, features: ['Hingga 5 Terapis', 'Pasien Tidak Terbatas', 'AI SOAP Notes', 'Custom Exercise Video', 'Aplikasi Pasien', 'Priority Support'] },
              { name: 'Enterprise', price: 'Custom', desc: 'Untuk jaringan klinik besar', features: ['Terapis Tidak Terbatas', 'Multi-Cabang', 'Custom Branding (White-label)', 'API Access', 'Dedicated Account Manager'] }
            ].map((plan, i) => (
              <motion.div 
                key={i} 
                {...fadeIn}
                className={`relative bg-card rounded-3xl border p-8 flex flex-col ${plan.recommended ? 'border-primary shadow-xl scale-105 z-10' : 'border-border shadow-sm'}`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Paling Populer
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{plan.desc}</p>
                <div className="mb-8">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-muted-foreground">/bulan</span>}
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> {feat}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.recommended ? 'default' : 'outline'} 
                  className={`w-full rounded-xl h-12 ${plan.recommended ? 'shadow-glow' : ''}`}
                >
                  {plan.price === 'Custom' ? 'Hubungi Sales' : 'Mulai Gratis'}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-muted/30 border-t border-border/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pertanyaan yang Sering Diajukan</h2>
          </div>
          <Accordion type="single" collapsible className="w-full bg-card rounded-2xl border border-border p-2 shadow-sm">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b-0">
                <AccordionTrigger className="px-4 hover:no-underline hover:text-primary text-left font-semibold">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary -z-20" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop')] opacity-10 mix-blend-overlay bg-cover bg-center -z-10" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-primary-foreground">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Siap Membawa Klinik Anda ke Level Berikutnya?</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Bergabunglah dengan ratusan fisioterapis modern yang telah meningkatkan efisiensi dan kualitas pelayanan mereka bersama Physiome.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="rounded-full text-base h-14 px-8 text-primary hover:bg-white" onClick={() => navigate('/register')}>
              Mulai Uji Coba Gratis
            </Button>
            <Button size="lg" className="rounded-full text-base h-14 px-8 bg-transparent border-2 border-white/30 hover:bg-white/10 text-white">
              Jadwalkan Demo
            </Button>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default HomePage;
