document.addEventListener('DOMContentLoaded', function() {
            console.log('Navbar JavaScript loaded successfully!');
            
            // Mobile menu toggle (robust: aria, touch, keyboard, body lock)
            const mobileMenu = document.getElementById('mobileMenu');
            const navLinks = document.getElementById('navLinks') || document.querySelector('.nav-links');
            const MOBILE_BREAKPOINT = 768;
            
            if (mobileMenu && navLinks) {
                const setOpen = (open) => {
                    navLinks.classList.toggle('active', open);
                    mobileMenu.classList.toggle('active', open);
                    mobileMenu.setAttribute('aria-expanded', open ? 'true' : 'false');
                    if (window.innerWidth <= MOBILE_BREAKPOINT) {
                        document.documentElement.style.overflow = open ? 'hidden' : '';
                        document.body.style.overflow = open ? 'hidden' : '';
                    } else {
                        document.documentElement.style.overflow = '';
                        document.body.style.overflow = '';
                    }
                };
                
                const toggle = (e) => {
                    if (e) e.preventDefault();
                    setOpen(!navLinks.classList.contains('active'));
                };
                
                mobileMenu.addEventListener('click', toggle, { passive: false });
                mobileMenu.addEventListener('touchstart', toggle, { passive: false });
                mobileMenu.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggle();
                    }
                });
                
                // Close on resize to desktop
                window.addEventListener('resize', () => {
                    if (window.innerWidth > MOBILE_BREAKPOINT && navLinks.classList.contains('active')) {
                        setOpen(false);
                    }
                });
            }
            
            // CTA button - now opens contact section
            const ctaBtn = document.getElementById('ctaBtn');
            
            if (ctaBtn) {
                ctaBtn.addEventListener('click', function() {
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        navLinks.classList.remove('active');
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                    
                    // Navigate to contact section
                    showSection('contact');
                    updateActiveNav('contact');
                });
            }
            
            // Demo button - scrolls to demo section
            const demoBtn = document.getElementById('demoBtn');
            
            if (demoBtn) {
                demoBtn.addEventListener('click', function() {
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        navLinks.classList.remove('active');
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                    
                    // Scroll to demo section
                    document.querySelector('.demo-section').scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            }
            
            // Function to show a specific section and hide others
            function showSection(sectionId) {
                // Hide all page sections
                document.querySelectorAll('.page-section').forEach(section => {
                    section.style.display = 'none';
                });
                
                // Show the requested section
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.style.display = 'block';
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            
            // Function to update active navigation link
            function updateActiveNav(sectionId) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
            
            // Handle navigation link clicks
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href').substring(1);
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        navLinks.classList.remove('active');
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = 'auto';
                        
                        // Close any open mega menus
                        document.querySelectorAll('.mega-menu').forEach(menu => {
                            menu.classList.remove('active');
                        });
                        
                        // Reset arrow icons
                        document.querySelectorAll('.arrow').forEach(arrow => {
                            arrow.style.transform = 'rotate(0deg)';
                        });
                    }
                    
                    // If it's a mega menu trigger on desktop, don't navigate
                    if (this.classList.contains('mega-menu-trigger') && window.innerWidth > 768) {
                        return;
                    }
                    
                    // Handle navigation
                    if (targetId === 'home') {
                        // Scroll to top for home
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    } else if (['products', 'services'].includes(targetId)) {
                        // For main mega menu items, just update active state
                        updateActiveNav(targetId);
                    } else {
                        // For other sections, show the section
                        showSection(targetId);
                        updateActiveNav(targetId);
                    }
                });
            });
            
            // Mobile mega menu toggle
            const megaMenuTriggers = document.querySelectorAll('.mega-menu-trigger');
            
            megaMenuTriggers.forEach(trigger => {
                trigger.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const megaMenu = this.nextElementSibling;
                        
                        // Close all other mega menus first
                        document.querySelectorAll('.mega-menu').forEach(menu => {
                            if (menu !== megaMenu) {
                                menu.classList.remove('active');
                                const otherArrow = menu.previousElementSibling.querySelector('.arrow');
                                if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
                            }
                        });
                        
                        // Toggle current mega menu
                        megaMenu.classList.toggle('active');
                        
                        // Rotate arrow icon
                        const arrow = this.querySelector('.arrow');
                        if (arrow) {
                            arrow.style.transform = megaMenu.classList.contains('active') 
                                ? 'rotate(180deg)' 
                                : 'rotate(0deg)';
                        }
                    }
                });
            });
            
            // Handle clicks inside mega menu links
            document.querySelectorAll('.mega-menu-links a, .featured-btn').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href').substring(1);
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        navLinks.classList.remove('active');
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = 'auto';
                        
                        // Close any open mega menus
                        document.querySelectorAll('.mega-menu').forEach(menu => {
                            menu.classList.remove('active');
                        });
                        
                        // Reset arrow icons
                        document.querySelectorAll('.arrow').forEach(arrow => {
                            arrow.style.transform = 'rotate(0deg)';
                        });
                    }
                    
                    // Show the section
                    showSection(targetId);
                    
                    // Update active nav to parent (Products or Services)
                    const parentLink = this.closest('.has-mega-menu').querySelector('.mega-menu-trigger');
                    if (parentLink) {
                        updateActiveNav(parentLink.getAttribute('href').substring(1));
                    }
                });
            });
            
            // Header scroll effect
            window.addEventListener('scroll', function() {
                const header = document.querySelector('header');
                if (header) {
                    if (window.scrollY > 50) {
                        header.style.background = 'rgba(255, 255, 255, 0.98)';
                        header.style.backdropFilter = 'blur(20px)';
                        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                    } else {
                        header.style.background = 'rgba(255, 255, 255, 0.95)';
                        header.style.backdropFilter = 'blur(20px)';
                        header.style.boxShadow = 'none';
                    }
                }
            });
            
            // Close mega menus when clicking outside on desktop
            document.addEventListener('click', function(e) {
                if (window.innerWidth > 768) {
                    const isMegaMenu = e.target.closest('.has-mega-menu');
                    const isInMegaMenu = e.target.closest('.mega-menu');
                    
                    if (!isMegaMenu && !isInMegaMenu) {
                        document.querySelectorAll('.mega-menu').forEach(menu => {
                            menu.style.opacity = '0';
                            menu.style.transform = 'translateY(15px) scale(0.98)';
                            setTimeout(() => {
                                menu.style.display = 'none';
                            }, 300);
                        });
                    }
                }
            });
            
            // Initialize mega menus on desktop after hiding
            const megaMenuItems = document.querySelectorAll('.has-mega-menu');
            megaMenuItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    if (window.innerWidth > 768) {
                        const megaMenu = this.querySelector('.mega-menu');
                        if (megaMenu) {
                            megaMenu.style.display = 'grid';
                            setTimeout(() => {
                                megaMenu.style.opacity = '1';
                                megaMenu.style.transform = 'translateY(0) scale(1)';
                            }, 10);
                        }
                    }
                });
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    const isClickInsideNav = navLinks.contains(e.target);
                    const isClickOnToggle = mobileMenu.contains(e.target);
                    
                    if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = 'auto';
                        
                        // Close any open mega menus
                        document.querySelectorAll('.mega-menu').forEach(menu => {
                            menu.classList.remove('active');
                        });
                        
                        // Reset arrow icons
                        document.querySelectorAll('.arrow').forEach(arrow => {
                            arrow.style.transform = 'rotate(0deg)';
                        });
                    }
                }
            });
            
            // Show home content initially
            showSection('home');
        });
