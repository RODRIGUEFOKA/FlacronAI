import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { initScrollAnimations, addRippleEffect } from '../utils/scrollAnimations';

// Import custom high-end components
import AnimatedGridPattern from '../components/ui/AnimatedGridPattern';
import RainbowButton from '../components/ui/RainbowButton';
import ShimmerButton from '../components/ui/ShimmerButton';
import SmoothCursor from '../components/ui/SmoothCursor';
import PricingCard from '../components/ui/PricingCard';
import BrandLogoMarquee from '../components/ui/BrandLogoMarquee';
import VelocityScroll from '../components/ui/VelocityScroll';
import Marquee3D from '../components/ui/Marquee3D';
import ChatbotFAQ from '../components/ui/ChatbotFAQ';

// Lazy load heavy components
const InteractiveGlobe = lazy(() => import('../components/ui/InteractiveGlobe'));

import '../styles/elite-landing.css';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Count up animation for stats
  const [stats, setStats] = useState({ reports: 0, clients: 0, accuracy: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    document.title = 'FlacronAI - AI-Powered Insurance Report Generator';

    const animations = initScrollAnimations();
    addRippleEffect();

    return () => {
      if (animations && animations.disconnect) {
        animations.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate reports
          let reportsCount = 0;
          const reportsInterval = setInterval(() => {
            reportsCount += 200;
            if (reportsCount >= 10000) {
              setStats(prev => ({ ...prev, reports: 10000 }));
              clearInterval(reportsInterval);
            } else {
              setStats(prev => ({ ...prev, reports: reportsCount }));
            }
          }, 10);

          // Animate clients
          let clientsCount = 0;
          const clientsInterval = setInterval(() => {
            clientsCount += 10;
            if (clientsCount >= 500) {
              setStats(prev => ({ ...prev, clients: 500 }));
              clearInterval(clientsInterval);
            } else {
              setStats(prev => ({ ...prev, clients: clientsCount }));
            }
          }, 15);

          // Animate accuracy
          let accuracyCount = 0;
          const accuracyInterval = setInterval(() => {
            accuracyCount += 2;
            if (accuracyCount >= 99) {
              setStats(prev => ({ ...prev, accuracy: 99 }));
              clearInterval(accuracyInterval);
            } else {
              setStats(prev => ({ ...prev, accuracy: accuracyCount }));
            }
          }, 20);
        }
      },
      { threshold: 0.5 }
    );

    const statsElement = document.querySelector('.hero-stats-redesign');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <>
      {/* Smooth Custom Cursor */}
      <SmoothCursor />

      {/* Animated Grid Pattern Background */}
      <AnimatedGridPattern />

      {/* Fixed Floating Navigation */}
      <motion.header
        className="navbar-redesign"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container">
          <div className="navbar-content-redesign">
            <motion.div
              className="logo-redesign"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <img src="/logo.png" alt="FlacronAI" className="logo-img-redesign" />
            </motion.div>
            <nav className="nav-redesign">
              <a href="#home" className="nav-link-redesign">Home</a>
              <a href="#features" className="nav-link-redesign">Features</a>
              <a href="#pricing" className="nav-link-redesign">Pricing</a>
              <Link to="/auth" className="nav-cta-redesign">
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section - Centered Commanding Layout */}
      <motion.section
        className="hero-redesign"
        id="home"
        style={{ y: heroY }}
      >
        {/* Massive Background Glow */}
        <div className="hero-glow-massive"></div>
        <div className="hero-glow-secondary"></div>

        {/* Interactive 3D Globe (lazy loaded) */}
        <Suspense fallback={null}>
          <InteractiveGlobe />
        </Suspense>

        <div className="container">
          <div className="hero-centered-layout">
            {/* Top Badge - Centered */}
            <motion.div
              className="badge-top-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <svg className="badge-icon-redesign" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#FF7C08"/>
              </svg>
              <span>Powered by IBM WatsonX AI & Microsoft</span>
            </motion.div>

            {/* Commanding Centered Title */}
            <motion.div
              className="hero-title-commanding"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h1>
                Generate Insurance<br />
                Reports in <span className="highlight-orange">Seconds</span>
              </h1>
            </motion.div>

            {/* Centered Description */}
            <motion.p
              className="hero-description-commanding"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Professional AI-powered report generation using IBM WatsonX AI & Microsoft.<br />
              Transform hours of work into minutes with accurate, consistent documentation.
            </motion.p>

            {/* CTA Buttons with Custom Components */}
            <motion.div
              className="cta-buttons-commanding"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <RainbowButton to="/auth">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Start Free Trial
              </RainbowButton>

              <ShimmerButton href="#features">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Learn More
              </ShimmerButton>
            </motion.div>

            {/* Stats Below - Centered */}
            <motion.div
              className="hero-stats-redesign"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div className="stat-item-redesign">
                <div className="stat-number-redesign">{stats.reports >= 10000 ? '10K+' : stats.reports.toLocaleString()}</div>
                <div className="stat-label-redesign">Reports Generated</div>
              </div>
              <div className="stat-divider-redesign"></div>
              <div className="stat-item-redesign">
                <div className="stat-number-redesign">{stats.clients >= 500 ? '500+' : stats.clients}</div>
                <div className="stat-label-redesign">Happy Clients</div>
              </div>
              <div className="stat-divider-redesign"></div>
              <div className="stat-item-redesign">
                <div className="stat-number-redesign">{stats.accuracy}%</div>
                <div className="stat-label-redesign">Accuracy Rate</div>
              </div>
            </motion.div>

            {/* Brand Logo Marquee - Integrated in Hero */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              style={{ marginTop: '5rem' }}
            >
              <BrandLogoMarquee />
            </motion.div>

            {/* Velocity Scroll Text - Bottom of Hero */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 1 }}
              style={{ marginTop: '4rem' }}
            >
              <VelocityScroll />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section - Bento Grid */}
      <section className="features-elite" id="features">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title-elite">Everything You Need</h2>
            <p className="section-subtitle-elite">
              Professional tools designed for modern insurance professionals
            </p>
          </motion.div>

          <div className="bento-grid-elite">
            {[
              {
                icon: <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 22l-.394-1.433a2.25 2.25 0 00-1.423-1.423L13.25 19l1.433-.394a2.25 2.25 0 001.423-1.423L16.5 16l.394 1.183a2.25 2.25 0 001.423 1.423L19.75 19l-1.433.394a2.25 2.25 0 00-1.423 1.423z" strokeLinecap="round" strokeLinejoin="round"/>,
                title: "AI Document Generator",
                description: "Generates CRU-style or custom templates instantly using IBM WatsonX AI & OpenAI"
              },
              {
                icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>,
                title: "Structured Input Forms",
                description: "Captures claim numbers, property data, damages, and contacts efficiently"
              },
              {
                icon: <><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 3v6a1 1 0 001 1h6M9 13h6M9 17h6" strokeLinecap="round" strokeLinejoin="round"/></>,
                title: "Multiple Export Formats",
                description: "Export reports in DOCX, PDF, and HTML formats with your logo"
              },
              {
                icon: <><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/></>,
                title: "Photo Integration",
                description: "Upload site photos and get AI-powered damage analysis"
              },
              {
                icon: <><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/></>,
                title: "Map & GPS",
                description: "Automatically includes inspection site maps in reports"
              },
              {
                icon: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>,
                title: "Quality Checker",
                description: "AI ensures reports have no missing key fields"
              },
              {
                icon: <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"/>,
                title: "Multi-User Access",
                description: "Role-based access control for teams and agencies"
              },
              {
                icon: <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" strokeLinecap="round" strokeLinejoin="round"/>,
                title: "Multi-Language",
                description: "Generate reports in English, French, and Spanish"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bento-card-elite"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="bento-card-glow"></div>
                <div className="feature-icon-elite">
                  <svg viewBox="0 0 24 24" fill="none">
                    {feature.icon}
                  </svg>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Reviews Marquee Section */}
      <Marquee3D />

      {/* Pricing Section - High-End Glassmorphic Redesign */}
      <section className="pricing-elite" id="pricing">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title-elite">Simple, Transparent Pricing</h2>
            <p className="section-subtitle-elite">Choose the plan that scales with your business</p>
          </motion.div>

          {/* Pricing Cards Grid */}
          <div className="pricing-grid-premium">
            <PricingCard
              name="Starter"
              price="0"
              period="/month"
              description="Perfect for individuals getting started"
              features={[
                { text: "1 report per month", available: true },
                { text: "All report types", available: true },
                { text: "PDF export", available: true },
                { text: "No watermark", available: false },
                { text: "Custom logo", available: false },
                { text: "Priority support", available: false }
              ]}
              link="/auth?redirect=checkout&plan=starter"
              isFeatured={false}
              isAnnual={false}
              index={0}
            />

            <PricingCard
              name="Pro"
              price="39.99"
              period="/month"
              description="Most popular for small businesses"
              features={[
                { text: "20 reports per month", available: true },
                { text: "All report types", available: true },
                { text: "PDF & DOCX export", available: true },
                { text: "No watermark", available: true },
                { text: "Custom logo", available: true },
                { text: "Email support", available: true }
              ]}
              link="/auth?redirect=checkout&plan=professional"
              isFeatured={true}
              isAnnual={false}
              index={1}
            />

            <PricingCard
              name="Enterprise"
              price="Custom"
              period=""
              description="Advanced features for large teams"
              features={[
                { text: "Unlimited reports", available: true },
                { text: "Unlimited users", available: true },
                { text: "API access", available: true },
                { text: "White-label portal", available: true },
                { text: "Custom integration", available: true },
                { text: "Dedicated support", available: true }
              ]}
              link="/auth?redirect=checkout&plan=enterprise"
              isFeatured={false}
              isAnnual={false}
              index={2}
            />
          </div>
        </div>
      </section>

      {/* Chatbot FAQ */}
      <ChatbotFAQ />

      {/* Footer */}
      <footer className="footer-elite">
        <div className="container">
          <div className="footer-grid-elite">
            <div className="footer-section-elite">
              <img src="/logo.png" alt="FlacronAI" className="footer-logo-elite" />
              <p>AI-powered insurance report generation using IBM WatsonX AI & Microsoft.</p>
            </div>
            <div className="footer-section-elite">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <Link to="/dashboard">Dashboard</Link>
              <a href="#">API Docs</a>
            </div>
            <div className="footer-section-elite">
              <h4>Company</h4>
              <a href="https://flacronenterprises.com/about-us/" target="_blank" rel="noopener noreferrer">About</a>
              <a href="https://flacronenterprises.com/contact-us/" target="_blank" rel="noopener noreferrer">Contact</a>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms of Service</Link>
            </div>
            <div className="footer-section-elite">
              <h4>Connect</h4>
              <a href="https://www.tiktok.com/@flacronenterprises" target="_blank" rel="noopener noreferrer">TikTok</a>
              <a href="https://www.linkedin.com/company/flacronenterprisesllc/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://www.instagram.com/flacronenterprisesllc/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/people/Flacron-Enterprises/61579538447653/" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="mailto:support@flacronenterprises.com">Support</a>
            </div>
          </div>
          <div className="footer-bottom-elite">
            <p>&copy; 2025 Flacron Enterprises. All rights reserved.</p>
            <p className="footer-powered">Powered by IBM WatsonX AI & Microsoft</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
