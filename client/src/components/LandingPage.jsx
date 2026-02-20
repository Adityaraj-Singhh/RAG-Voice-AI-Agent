import React, { useState } from 'react';
import LeadForm from './LeadForm';
import sgtuLogo from '../utils/sgtu_Logo.png';

/**
 * Landing Page Component - SGT University Style
 * Modern dashboard-inspired design with dark blue navbar
 */
const LandingPage = ({ onFormSuccess }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /**
   * Scroll to the application form
   */
  const scrollToForm = () => {
    const formSection = document.getElementById('apply-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-primary-800 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              1800 102 5661
            </span>
            <span className="hidden md:flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@sgtuniversity.org
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block">📍 India</span>
            <span className="bg-secondary-500 px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
              Admissions Open 2026
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-primary-500 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src={sgtuLogo} alt="SGT University" className="h-12 w-auto object-contain" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <a href="#home" className="nav-link text-white hover:bg-primary-600 px-4 py-2 rounded-lg transition-all">
                Home
              </a>
              <a href="#about" className="nav-link text-white hover:bg-primary-600 px-4 py-2 rounded-lg transition-all">
                About Us
              </a>
              <a href="#programs" className="nav-link text-white hover:bg-primary-600 px-4 py-2 rounded-lg transition-all">
                Programs
              </a>
              <a href="#features" className="nav-link text-white hover:bg-primary-600 px-4 py-2 rounded-lg transition-all">
                Why Choose Us
              </a>
              <a href="#campus" className="nav-link text-white hover:bg-primary-600 px-4 py-2 rounded-lg transition-all">
                Campus Life
              </a>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={scrollToForm}
                className="bg-secondary-500 hover:bg-secondary-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base"
              >
                Apply Now
              </button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-white p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-primary-400 animate-slide-down">
              <a href="#home" className="block text-white py-3 px-4 hover:bg-primary-600 rounded-lg">Home</a>
              <a href="#about" className="block text-white py-3 px-4 hover:bg-primary-600 rounded-lg">About Us</a>
              <a href="#programs" className="block text-white py-3 px-4 hover:bg-primary-600 rounded-lg">Programs</a>
              <a href="#features" className="block text-white py-3 px-4 hover:bg-primary-600 rounded-lg">Why Choose Us</a>
              <a href="#campus" className="block text-white py-3 px-4 hover:bg-primary-600 rounded-lg">Campus Life</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Dashboard Style */}
      <section id="home" className="relative bg-gradient-to-br from-navy-900 via-primary-800 to-primary-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-secondary-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-300 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-10 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">Admissions Open for 2026 Batch</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4 sm:mb-6">
                Transform Your
                <span className="block text-secondary-400">Future With Us</span>
              </h1>
              
              <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-lg leading-relaxed">
                Join India's premier institution for world-class education. Experience excellence in learning with state-of-the-art facilities and industry-ready curriculum.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  onClick={scrollToForm}
                  className="group bg-secondary-500 hover:bg-secondary-600 text-white font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
                >
                  Start Your Application
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <a
                  href="#programs"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all border border-white/20 text-center"
                >
                  Explore Programs
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6">
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-400">50K+</div>
                  <div className="text-xs sm:text-sm text-white/60">Alumni Worldwide</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400">95%</div>
                  <div className="text-xs sm:text-sm text-white/60">Placement Rate</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">A+</div>
                  <div className="text-xs sm:text-sm text-white/60">NAAC Accredited</div>
                </div>
              </div>
            </div>

            {/* Right Content - Feature Cards */}
            <div className="hidden md:grid grid-cols-2 gap-4 animate-slide-left">
              {/* Card 1 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all transform hover:-translate-y-1 min-h-[140px] lg:h-[160px]">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">100+ Courses</h3>
                <p className="text-sm text-white/70">Wide range of UG & PG programs</p>
              </div>

              {/* Card 2 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all transform hover:-translate-y-1 min-h-[140px] lg:h-[160px]">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Top Recruiters</h3>
                <p className="text-sm text-white/70">500+ companies recruit annually</p>
              </div>

              {/* Card 3 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all transform hover:-translate-y-1 min-h-[140px] lg:h-[160px]">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Research Hub</h3>
                <p className="text-sm text-white/70">World-class research facilities</p>
              </div>

              {/* Card 4 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all transform hover:-translate-y-1 min-h-[140px] lg:h-[160px]">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Global Network</h3>
                <p className="text-sm text-white/70">International collaborations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 sm:p-6 text-white text-center transform hover:scale-105 transition-all">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">25+</div>
              <div className="text-blue-100 text-xs sm:text-sm">Years of Excellence</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 sm:p-6 text-white text-center transform hover:scale-105 transition-all">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">500+</div>
              <div className="text-green-100 text-xs sm:text-sm">Expert Faculty</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 sm:p-6 text-white text-center transform hover:scale-105 transition-all">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">50+</div>
              <div className="text-purple-100 text-xs sm:text-sm">Acre Campus</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-4 sm:p-6 text-white text-center transform hover:scale-105 transition-all">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">₹12L</div>
              <div className="text-orange-100 text-xs sm:text-sm">Avg. Package</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-10 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-right">
              <span className="text-secondary-500 font-semibold text-sm uppercase tracking-wider">About Us</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mt-2 mb-6">
                Shaping Leaders of Tomorrow
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are a premier educational institution committed to providing world-class education that prepares students for global challenges. Our focus on innovation, research, and holistic development makes us a preferred choice for aspiring professionals.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900">NAAC A+ Accredited</h4>
                    <p className="text-sm text-gray-600">Recognized for excellence in education quality</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900">UGC Approved</h4>
                    <p className="text-sm text-gray-600">All programs recognized by regulatory bodies</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900">Industry Partnerships</h4>
                    <p className="text-sm text-gray-600">Collaborations with Fortune 500 companies</p>
                  </div>
                </div>
              </div>
              <button
                onClick={scrollToForm}
                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2"
              >
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="relative animate-slide-left">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 text-white">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
                    <span className="text-5xl">🎓</span>
                  </div>
                  <h3 className="text-2xl font-bold">Excellence in Education</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">100+</div>
                    <div className="text-sm text-white/80">Programs</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">15K+</div>
                    <div className="text-sm text-white/80">Students</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">95%</div>
                    <div className="text-sm text-white/80">Placement</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-sm text-white/80">Countries</div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary-500 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-300 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-secondary-500 font-semibold text-sm uppercase tracking-wider">Our Programs</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mt-2 mb-4">
              Choose Your Path to Success
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a diverse range of undergraduate and postgraduate programs designed to prepare you for a successful career
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Engineering Card */}
            <div className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-3 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <div className="p-5 sm:p-8">
                <div className="w-14 sm:w-16 h-14 sm:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl sm:text-4xl">⚙️</span>
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">Engineering & Technology</h3>
                <p className="text-gray-600 mb-6">
                  B.Tech, M.Tech in CSE, Mechanical, Civil, Electronics, AI/ML, and more cutting-edge fields.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    AICTE Approved Programs
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Industry-Ready Curriculum
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Top IT Placements
                  </li>
                </ul>
                <button onClick={scrollToForm} className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold py-3 rounded-xl transition-all">
                  Apply for Engineering →
                </button>
              </div>
            </div>

            {/* Medical Card */}
            <div className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-3 bg-gradient-to-r from-green-500 to-green-600"></div>
              <div className="p-5 sm:p-8">
                <div className="w-14 sm:w-16 h-14 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl sm:text-4xl">🏥</span>
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">Medical & Health Sciences</h3>
                <p className="text-gray-600 mb-6">
                  MBBS, BDS, Nursing, Pharmacy, Physiotherapy, and Allied Health Sciences programs.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    NMC/DCI Recognized
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Multi-Specialty Hospital
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Clinical Training
                  </li>
                </ul>
                <button onClick={scrollToForm} className="w-full bg-green-50 hover:bg-green-100 text-green-600 font-semibold py-3 rounded-xl transition-all">
                  Apply for Medical →
                </button>
              </div>
            </div>

            {/* Management & Law Card */}
            <div className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-3 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <div className="p-5 sm:p-8">
                <div className="w-14 sm:w-16 h-14 sm:h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl sm:text-4xl">💼</span>
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">Management & Law</h3>
                <p className="text-gray-600 mb-6">
                  MBA, BBA, B.Com, LLB, BA LLB with specializations in Finance, Marketing, HR, and more.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    BCI Approved Law Programs
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Corporate Internships
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Moot Court Facilities
                  </li>
                </ul>
                <button onClick={scrollToForm} className="w-full bg-purple-50 hover:bg-purple-100 text-purple-600 font-semibold py-3 rounded-xl transition-all">
                  Apply for Management →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Dashboard Cards Style */}
      <section id="features" className="py-10 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-secondary-500 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mt-2 mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience world-class education with industry-leading facilities and expert mentorship
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-bold text-navy-900 mb-2">Expert Faculty</h3>
              <p className="text-sm text-gray-600">Learn from 500+ experienced professors and industry experts</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-navy-900 mb-2">100% Placement</h3>
              <p className="text-sm text-gray-600">Strong industry connections with Fortune 500 companies</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="font-bold text-navy-900 mb-2">Modern Labs</h3>
              <p className="text-sm text-gray-600">State-of-the-art facilities for hands-on learning</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-navy-900 mb-2">Global Exposure</h3>
              <p className="text-sm text-gray-600">International exchange programs and collaborations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Life Section */}
      <section id="campus" className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-secondary-500 font-semibold text-sm uppercase tracking-wider">Campus Life</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mt-2 mb-4">
              Experience Life at Our Campus
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A vibrant community with world-class amenities for holistic development
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-5 sm:p-8 text-white">
              <span className="text-4xl sm:text-5xl mb-4 block">🏛️</span>
              <h3 className="text-xl font-bold mb-2">Smart Classrooms</h3>
              <p className="text-white/80 text-sm">Technology-enabled learning spaces with modern AV equipment</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-5 sm:p-8 text-white">
              <span className="text-4xl sm:text-5xl mb-4 block">📖</span>
              <h3 className="text-xl font-bold mb-2">Digital Library</h3>
              <p className="text-white/80 text-sm">24/7 access to millions of e-books, journals, and research papers</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-5 sm:p-8 text-white">
              <span className="text-4xl sm:text-5xl mb-4 block">⚽</span>
              <h3 className="text-xl font-bold mb-2">Sports Complex</h3>
              <p className="text-white/80 text-sm">Olympic-standard facilities for various indoor and outdoor sports</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-16 bg-gradient-to-br from-navy-900 via-primary-800 to-primary-900 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-300 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm">Limited Seats Available</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
            Ready to Begin Your <span className="text-secondary-400">Success Story?</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Our AI-powered admissions team will call you within 24 hours to guide you through the application process and answer all your questions.
          </p>
          <button
            onClick={scrollToForm}
            className="group bg-secondary-500 hover:bg-secondary-600 text-white font-bold px-6 sm:px-10 py-4 sm:py-5 rounded-xl text-base sm:text-lg transition-all transform hover:scale-105 shadow-xl inline-flex items-center gap-3"
          >
            Apply Now - It's Free!
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <p className="text-sm text-white/60 mt-4">No application fees • Quick 2-minute form • Instant confirmation</p>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="apply-form" className="py-12 sm:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-100 rounded-full opacity-50 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary-100 text-primary-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              📝 APPLICATION FORM
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-navy-900 mb-4">
              Start Your Journey Today
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Take the first step towards your dream career. Fill out the form and our admissions team will contact you within 24 hours.
            </p>
          </div>
          
          <LeadForm onSuccess={onFormSuccess} />
          
          {/* Features below form */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-navy-900 mb-1">Quick Process</h4>
              <p className="text-sm text-gray-500">Complete application in under 2 minutes</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h4 className="font-semibold text-navy-900 mb-1">Personal Callback</h4>
              <p className="text-sm text-gray-500">Get a call from our expert counselors</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-navy-900 mb-1">100% Secure</h4>
              <p className="text-sm text-gray-500">Your data is protected and private</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img src={sgtuLogo} alt="SGT University" className="w-10 h-10 object-contain" />
                <div>
                  <div className="font-bold">SGT UNIVERSITY</div>
                  <div className="text-xs text-gray-400">Gurugram, Haryana</div>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Shree Guru Gobind Singh Tricentenary University - Shaping future leaders through world-class education.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors">Programs</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Why Us</a></li>
                <li><a href="#campus" className="hover:text-white transition-colors">Campus</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#programs" className="hover:text-white transition-colors">Science</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors">Commerce</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors">Humanities</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors">Engineering</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  1800 102 5661
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@sgtuniversity.org
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Gurugram, Haryana
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>© 2025 University. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
