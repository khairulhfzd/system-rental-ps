import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGamepad, FaServer, FaCogs, FaArrowRight, FaRocket, FaShieldAlt } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';

const Landing = () => {
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const floatingY1 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const floatingY2 = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Reveal animation variants
  const revealUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="bg-dark-bg min-h-screen text-slate-200 font-sans overflow-hidden">

      {/* Use global Navbar for consistency */}
      <div className="fixed w-full z-50">
        <nav className="bg-dark-bg/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-black text-white tracking-widest flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)]">
              <FaGamepad className="text-white text-xl" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]">NEXUS</span>
            <span className="text-white/80 font-mono text-sm tracking-widest ml-1 hidden sm:block">SYSTEMS</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-semibold text-slate-400">
            <a href="#features" className="hover:text-primary transition">Features</a>
            <a href="#tech" className="hover:text-accent transition">Technology</a>
            <Link to="/products" className="hidden md:inline text-slate-300 hover:text-white transition">Browse Catalog</Link>
            {token ? (
              <>
                <button
                  onClick={() => navigate(role === 'admin' ? '/admin' : '/user/orders')}
                  className="px-4 py-1.5 rounded-full bg-primary/20 border border-primary/60 text-white hover:bg-primary/30 transition"
                >
                  {role === 'admin' ? 'Go to Dashboard' : 'My Orders'}
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    localStorage.removeItem('role');
                    navigate('/login');
                  }}
                  className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-200 hover:bg-red-500/20 hover:border-red-500/60 hover:text-red-200 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-primary/60 hover:bg-primary/20 text-white transition">
                Terminal Login
              </Link>
            )}
          </div>
        </nav>
      </div>

      {/* Hero Section (Heavy Parallax) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background Image */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen mix-blend-luminosity"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop")' }}
          ></div>
        </motion.div>

        {/* Deep Gradient over background */}
        <div className="absolute inset-0 z-1 bg-gradient-to-b from-dark-bg/20 via-dark-bg/80 to-dark-bg"></div>

        {/* Floating Abstract Shapes */}
        <motion.div style={{ y: floatingY1 }} className="absolute top-1/4 -left-32 w-96 h-96 bg-primary rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse z-1"></motion.div>
        <motion.div style={{ y: floatingY2 }} className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent rounded-full mix-blend-screen filter blur-[150px] opacity-30 animate-pulse delay-1000 z-1"></motion.div>

        {/* Geometric Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-20 z-1 pointer-events-none"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary font-mono text-xs tracking-widest mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span> SYSTEM V2.4 ONLINE
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white drop-shadow-2xl leading-[1.1]">
              Elevate Your <br />
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-fuchsia-500 to-accent">Rental Empire</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full blur-[2px] opacity-50"></span>
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              The ultimate high-performance operating system for PlayStation centers. Experience sub-millisecond POS routing, real-time analytics, and automated cryptographic contracts.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/products" className="px-10 py-4 bg-dark-panel border border-dark-border text-white rounded-xl font-bold text-lg hover:bg-white/5 transition duration-300 w-full sm:w-auto flex justify-center items-center">
                Browse Catalog
              </Link>
              <Link to="/login" className="px-10 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold text-lg hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition duration-300 transform hover:-translate-y-1 w-full sm:w-auto flex justify-center items-center gap-3">
                <FaRocket /> Initialize Core
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative py-32 px-8 bg-dark-bg z-20 overflow-hidden">
        {/* Abstract background line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealUp}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-white tracking-tighter">System <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Architecture</span></h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">Engineered for maximum operational efficiency and zero-downtime reliability.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Box 1 */}
            <motion.div variants={revealUp} className="group relative bg-dark-panel/60 backdrop-blur-sm p-10 rounded-3xl border border-white/5 hover:border-primary/50 transition duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(139,92,246,0.15)] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/20 rounded-full blur-[50px] group-hover:bg-primary/40 transition duration-500"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 flex items-center justify-center mb-8 text-3xl text-primary shadow-[inset_0_0_20px_rgba(139,92,246,0.2)] group-hover:scale-110 transition duration-500">
                  <FaServer />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">Command Overlord</h3>
                <p className="text-slate-400 leading-relaxed font-light">Access a centralized high-fidelity dashboard. Track daily revenue streams, active hardware nodes, and client metrics in real-time.</p>
              </div>
            </motion.div>

            {/* Box 2 */}
            <motion.div variants={revealUp} className="group relative bg-dark-panel/60 backdrop-blur-sm p-10 rounded-3xl border border-white/5 hover:border-accent/50 transition duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(217,70,239,0.15)] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-accent/20 rounded-full blur-[50px] group-hover:bg-accent/40 transition duration-500"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-transparent border border-accent/30 flex items-center justify-center mb-8 text-3xl text-accent shadow-[inset_0_0_20px_rgba(217,70,239,0.2)] group-hover:scale-110 transition duration-500">
                  <FaGamepad />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">Hyper POS Logic</h3>
                <p className="text-slate-400 leading-relaxed font-light">Execute rentals with frictionless precision. Automatically map clients to hardware, track session durations, and finalize transactions instantly.</p>
              </div>
            </motion.div>

            {/* Box 3 */}
            <motion.div variants={revealUp} className="group relative bg-dark-panel/60 backdrop-blur-sm p-10 rounded-3xl border border-white/5 hover:border-blue-500/50 transition duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.15)] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[50px] group-hover:bg-blue-500/40 transition duration-500"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/30 flex items-center justify-center mb-8 text-3xl text-blue-400 shadow-[inset_0_0_20px_rgba(59,130,246,0.2)] group-hover:scale-110 transition duration-500">
                  <FaShieldAlt />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">Crypto-Contracts</h3>
                <p className="text-slate-400 leading-relaxed font-light">Every session closure automatically compiles a secure PDF evidence record. Guarantee professional billing and eliminate operational disputes.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Visual Break Parallax */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-y border-white/5">
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0.5, 1], ['-20%', '20%']) }}
          className="absolute inset-0 z-0 opacity-40 mix-blend-screen"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop")', filter: 'contrast(1.2) saturate(1.5)' }}
          ></div>
          <div className="absolute inset-0 bg-dark-bg/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 mix-blend-multiply"></div>
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-widest drop-shadow-2xl">
            Performance. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Unleashed.</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="tech" className="relative py-28 px-8 bg-[#05050a] border-t border-white/5">
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={revealUp}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white tracking-tight">
              Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Stack</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
              Built with a modern JavaScript stack, tuned for real-time rental operations and console management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="bg-dark-panel/70 border border-white/10 rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-lg font-bold text-white mb-2">Frontend</h3>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>React + Vite + React Router</li>
                <li>TailwindCSS dark theme</li>
                <li>Framer Motion for hero animations</li>
              </ul>
            </motion.div>

            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="bg-dark-panel/70 border border-white/10 rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-lg font-bold text-white mb-2">Backend</h3>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>Node.js + Express (REST API)</li>
                <li>JWT Authentication & role-based guard</li>
                <li>Multer file uploads for payment proofs</li>
              </ul>
            </motion.div>

            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="bg-dark-panel/70 border border-white/10 rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-lg font-bold text-white mb-2">Database & Reports</h3>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>MySQL with structured schema</li>
                <li>Daily & monthly revenue analytics</li>
                <li>Auto-generated PDF rental contracts</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-dark-bg pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-black text-white tracking-widest flex items-center gap-2">
            <FaGamepad className="text-primary" /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">NEXUS</span>
          </div>
          <div className="text-slate-500 font-medium text-sm">
            Deploying modern tech stacks for modern gaming.
          </div>
          <div className="text-slate-600 text-sm font-light">
            &copy; 2026 Nexus Systems Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
