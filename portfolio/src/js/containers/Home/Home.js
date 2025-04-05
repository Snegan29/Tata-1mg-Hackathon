import React, { useState, useRef, useEffect } from 'react';
import './Home.css';
import { FaClinicMedical, FaFlask, FaMobileAlt, FaChartLine, FaUserMd, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { GiMedicines } from 'react-icons/gi';
import { BsClipboardData } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState({
    home: false,
    about: false,
    expertise: false,
    projects: false,
    catalyst: false,
    contact: false
  });

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    expertise: useRef(null),
    projects: useRef(null),
    catalyst: useRef(null),
    contact: useRef(null)
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + (window.innerHeight / 2);
      
      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (ref.current) {
          const sectionTop = ref.current.offsetTop;
          const sectionHeight = ref.current.offsetHeight;
          const sectionBottom = sectionTop + sectionHeight;
          
          // Update active section
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(section);
          }
          
          // Trigger animations when section reaches halfway point
          if (scrollPosition > sectionTop && scrollPosition < sectionBottom) {
            setIsVisible(prev => ({...prev, [section]: true}));
          }
        }
      });
    };

    // Set home as visible initially
    setIsVisible(prev => ({...prev, home: true}));

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (section) => {
    setIsMenuOpen(false);
    sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' });
    // Set timeout to account for scroll time before triggering animation
    setTimeout(() => {
      setIsVisible(prev => ({...prev, [section]: true}));
    }, 500);
  };

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'projects', label: 'Projects' },
    { id: 'catalyst', label: 'Catalyst' },
    { id: 'contact', label: 'Contact' }
  ];

  const expertiseAreas = [
    { icon: <FaClinicMedical />, title: 'Healthcare Systems', description: 'Designing scalable healthcare infrastructure solutions' },
    { icon: <FaFlask />, title: 'Medical Research', description: 'Data-driven approaches to clinical research' },
    { icon: <GiMedicines />, title: 'Pharma Tech', description: 'Innovations in drug delivery and supply chain' },
    { icon: <BsClipboardData />, title: 'Health Analytics', description: 'Predictive analytics for patient outcomes' }
  ];

  const projects = [
    { title: 'AI Diagnostic Tool', description: 'Machine learning model for early disease detection', impact: 'Improved accuracy by 30%' },
    { title: 'Telemedicine Platform', description: 'End-to-end remote consultation system', impact: 'Served 10,000+ patients' },
    { title: 'Medication Tracker', description: 'IoT-enabled smart pill dispenser', impact: 'Improved adherence by 45%' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <div className="App">
      {/* Navigation */}
      <motion.header 
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="container">
          <motion.div 
            className="logo" 
            onClick={() => scrollTo('home')}
            whileHover={{ scale: 1.05 }}
          >
            <span className="logo-icon">⚕</span>
            <span>HealthTech Portfolio</span>
          </motion.div>
          
          <motion.button 
            className="menu-button" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? '✕' : '☰'}
          </motion.button>
          
          <AnimatePresence>
            {isMenuOpen && (
              <motion.ul 
                className={`nav-menu active`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {menuItems.map((item) => (
                  <motion.li 
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * menuItems.indexOf(item) }}
                  >
                    <button
                      onClick={() => scrollTo(item.id)}
                      className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section ref={sectionRefs.home} className="hero-section">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0 }}
            animate={isVisible.home ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ y: 50, opacity: 0 }}
              animate={isVisible.home ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transforming Healthcare Through <span className="highlight">Technology</span>
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              initial={{ y: 50, opacity: 0 }}
              animate={isVisible.home ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Digital health innovator and Tata 1mg Catalyst alumnus building solutions for better patient outcomes
            </motion.p>
            <motion.div 
              className="hero-buttons"
              initial={{ y: 50, opacity: 0 }}
              animate={isVisible.home ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button 
                onClick={() => scrollTo('projects')} 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.button>
              <motion.button 
                onClick={() => scrollTo('contact')} 
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div 
            className="hero-image"
            initial={{ x: 100, opacity: 0 }}
            animate={isVisible.home ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="image-placeholder">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 5, 0],
                  y: [0, -10, 10, -10, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaUserMd className="medical-icon" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section ref={sectionRefs.about} className="about-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ y: 50, opacity: 0 }}
            animate={isVisible.about ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
          <motion.div 
            className="about-content"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible.about ? "visible" : "hidden"}
          >
            <motion.div className="about-text" variants={itemVariants}>
              <p>
                As a healthcare technology specialist with 5+ years in digital health innovation, I've worked at the intersection of medicine and technology to develop solutions that improve access and outcomes.
              </p>
              <p>
                My experience with Tata 1mg Catalyst helped me refine my approach to building scalable, patient-centric solutions that address real-world healthcare challenges.
              </p>
              <motion.div className="stats" variants={containerVariants}>
                <motion.div className="stat-item" variants={itemVariants}>
                  <div className="stat-number">8+</div>
                  <div className="stat-label">Health Projects</div>
                </motion.div>
                <motion.div className="stat-item" variants={itemVariants}>
                  <div className="stat-number">3</div>
                  <div className="stat-label">Patents</div>
                </motion.div>
                <motion.div className="stat-item" variants={itemVariants}>
                  <div className="stat-number">15k+</div>
                  <div className="stat-label">Lives Impacted</div>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div 
              className="about-image"
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: 0.3,
                    duration: 0.8
                  }
                }
              }}
            >
              <div className="image-frame"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section ref={sectionRefs.expertise} className="expertise-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ y: 50, opacity: 0 }}
            animate={isVisible.expertise ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            My Expertise
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ y: 50, opacity: 0 }}
            animate={isVisible.expertise ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Areas where I can add value to healthcare innovation
          </motion.p>
          
          <motion.div 
            className="expertise-grid"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible.expertise ? "visible" : "hidden"}
          >
            {expertiseAreas.map((item, index) => (
              <motion.div 
                key={index} 
                className="expertise-card"
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className="expertise-icon"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {item.icon}
                </motion.div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={sectionRefs.projects} className="projects-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ y: 50, opacity: 0 }}
            animate={isVisible.projects ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            HealthTech Projects
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ y: 50, opacity: 0 }}
            animate={isVisible.projects ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Solutions that made measurable impact
          </motion.p>
          
          <motion.div 
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible.projects ? "visible" : "hidden"}
          >
            {projects.map((project, index) => (
              <motion.div 
                key={index} 
                className="project-card"
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: index * 0.2,
                      duration: 0.6
                    }
                  }
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 15px 30px rgba(0, 168, 150, 0.2)"
                }}
              >
                <div className="project-number">0{index + 1}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-impact">
                  <FaChartLine />
                  <span>{project.impact}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Catalyst Section */}
      <section ref={sectionRefs.catalyst} className="catalyst-section">
        <div className="container">
          <motion.div 
            className="catalyst-content"
            initial={{ opacity: 0 }}
            animate={isVisible.catalyst ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="catalyst-text"
              initial={{ x: -50, opacity: 0 }}
              animate={isVisible.catalyst ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="section-title">Tata 1mg Catalyst Experience</h2>
              <p>
                Being part of the Tata 1mg Catalyst program was transformative for my approach to healthcare innovation. The program provided:
              </p>
              <ul className="catalyst-benefits">
                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={isVisible.catalyst ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.1 }}
                >
                  Access to industry mentors and healthcare experts
                </motion.li>
                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={isVisible.catalyst ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.2 }}
                >
                  Opportunity to pilot solutions with real patient data
                </motion.li>
                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={isVisible.catalyst ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  Guidance on regulatory compliance and scaling
                </motion.li>
                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={isVisible.catalyst ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  Networking with other healthtech innovators
                </motion.li>
              </ul>
              <motion.button 
                className="btn btn-primary"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isVisible.catalyst ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn About the Program
              </motion.button>
            </motion.div>
            <motion.div 
              className="catalyst-logo"
              initial={{ x: 50, opacity: 0 }}
              animate={isVisible.catalyst ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="logo-container">
                <motion.span
                  initial={{ y: -20, opacity: 0 }}
                  animate={isVisible.catalyst ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  Tata
                </motion.span>
                <motion.span 
                  className="logo-1mg"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={isVisible.catalyst ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  1mg
                </motion.span>
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={isVisible.catalyst ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  Catalyst
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={sectionRefs.contact} className="contact-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ y: 50, opacity: 0 }}
            animate={isVisible.contact ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Let's Connect
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ y: 50, opacity: 0 }}
            animate={isVisible.contact ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Interested in healthcare innovation? Get in touch!
          </motion.p>
          
          <motion.div 
            className="contact-content"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible.contact ? "visible" : "hidden"}
          >
            <motion.form 
              className="contact-form"
              variants={{
                hidden: { x: -50, opacity: 0 },
                visible: {
                  x: 0,
                  opacity: 1,
                  transition: {
                    delay: 0.3,
                    duration: 0.8
                  }
                }
              }}
            >
              <motion.div 
                className="form-group"
                initial={{ x: -20, opacity: 0 }}
                animate={isVisible.contact ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                <input type="text" placeholder="Your Name" />
              </motion.div>
              <motion.div 
                className="form-group"
                initial={{ x: -20, opacity: 0 }}
                animate={isVisible.contact ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
              >
                <input type="email" placeholder="Email Address" />
              </motion.div>
              <motion.div 
                className="form-group"
                initial={{ x: -20, opacity: 0 }}
                animate={isVisible.contact ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              >
                <textarea placeholder="Your Message"></textarea>
              </motion.div>
              <motion.button 
                type="submit" 
                className="btn btn-primary"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={isVisible.contact ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </motion.form>
            
            <motion.div 
              className="contact-info"
              variants={{
                hidden: { x: 50, opacity: 0 },
                visible: {
                  x: 0,
                  opacity: 1,
                  transition: {
                    delay: 0.4,
                    duration: 0.8
                  }
                }
              }}
            >
              <div className="info-item">
                <FaMobileAlt />
                <span>+91 98765 43210</span>
              </div>
              <div className="info-item">
                <FaClinicMedical />
                <span>healthinnovator@example.com</span>
              </div>
              <motion.div 
                className="social-links"
                initial={{ opacity: 0 }}
                animate={isVisible.contact ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                <motion.a 
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaLinkedin />
                </motion.a>
                <motion.a 
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaGithub />
                </motion.a>
                <motion.a 
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTwitter />
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.footer 
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <p>© {new Date().getFullYear()} HealthTech Portfolio. All rights reserved.</p>
          <p>Inspired by Tata 1mg Catalyst Program</p>
        </div>
      </motion.footer>
    </div>
  );
}

export default Home;