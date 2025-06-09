document.addEventListener("DOMContentLoaded", () => {
  // --- Constants and Element Selectors ---
  const THEME_KEY = "theme";
  const DARK_THEME_CLASS = "dark-theme";
  
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const navbar = document.getElementById("navbar");
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const skipLink = document.querySelector('.skip-link');
  const mainContent = document.getElementById('main-content');
  const workflowSVG = document.getElementById('workflow-svg');
  const quoteButtons = document.querySelectorAll('.pricing-card .btn[data-plan]');
  const contactForm = document.getElementById('contact');
  const messageTextarea = document.getElementById('message');
  const faqItems = document.querySelectorAll('.faq-item');

  /**
   * Applies the specified theme to the body.
   * @param {string} theme - The theme to apply ('dark' or 'light').
   */
  const applyTheme = (theme) => {
    body.classList.toggle(DARK_THEME_CLASS, theme === "dark");
  };

  /**
   * Initializes the theme based on user preference or stored settings.
   */
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      applyTheme(prefersDark ? "dark" : "light");
    }
  };

  /**
   * Toggles the theme and saves the preference to localStorage.
   */
  const handleThemeToggle = () => {
    if (!themeToggle) return;
    
    themeToggle.addEventListener("click", () => {
      const isDark = body.classList.contains(DARK_THEME_CLASS);
      const newTheme = isDark ? "light" : "dark";
      applyTheme(newTheme);
      localStorage.setItem(THEME_KEY, newTheme);
    });
  };

  /**
   * Handles the navbar scroll effect.
   */
  const handleNavbarScroll = () => {
    if (!navbar) return;
    
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 20);
    }, { passive: true });
  };
  
  /**
   * Handles the mobile menu toggle functionality.
   */
  const handleMobileMenu = () => {
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener("click", () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenu.classList.toggle("active");
      menuBtn.classList.toggle("active");
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      menuBtn.setAttribute('aria-label', isExpanded ? 'Open menu' : 'Close menu');
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Open menu');
      });
    });
  };

  /**
   * Sets up an IntersectionObserver to animate elements on scroll.
   */
  const setupScrollAnimations = () => {
    const animatedEls = document.querySelectorAll(".animate-on-scroll");
    if (animatedEls.length === 0) return;
      
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedEls.forEach(el => observer.observe(el));
  };

  /**
   * Applies a parallax effect to specified elements on scroll.
   */
  const handleParallaxEffect = () => {
    const parallaxOrbs = document.querySelectorAll(".gradient-orb");
    if (parallaxOrbs.length === 0) return;
    
    const onScroll = () => {
        const scrollY = window.scrollY;
        parallaxOrbs.forEach(orb => {
            const speed = parseFloat(orb.dataset.parallaxSpeed || 0.1);
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
    };

    window.addEventListener("scroll", () => {
      window.requestAnimationFrame(onScroll);
    }, { passive: true });
  };

  /**
   * Makes the skip link focus the main content area correctly.
   */
  const handleSkipLink = () => {
      if (!skipLink || !mainContent) return;
      
      skipLink.addEventListener('click', (e) => {
          e.preventDefault();
          mainContent.setAttribute('tabindex', -1);
          mainContent.focus();
      });
      
      mainContent.addEventListener('blur', () => {
          mainContent.removeAttribute('tabindex');
      });
  };

  /**
   * Sets up and triggers the SVG workflow line animation.
   */
  const handleWorkflowAnimation = () => {
    if (!workflowSVG) return;

    const paths = workflowSVG.querySelectorAll(".workflow-paths path");
    paths.forEach(path => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          workflowSVG.classList.add('animate');
          observer.unobserve(workflowSVG);
        }
      });
    }, { threshold: 0.3 }); 

    observer.observe(workflowSVG);
  };

  /**
   * Handles clicks on the "Get a Free Quote" buttons.
   * Scrolls to the contact form and fills the textarea.
   */
  const handleQuoteButtons = () => {
    if (!quoteButtons.length || !contactForm || !messageTextarea) return;

    quoteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const plan = button.dataset.plan;
        if (!plan) return;

        messageTextarea.value = `Hello, I'm interested in the ${plan} plan and would like to get a free quote. Please provide me with more information.`;

        contactForm.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        setTimeout(() => {
          messageTextarea.focus();
        }, 500);
      });
    });
  };

  /**
   * Handles the FAQ accordion functionality.
   */
  const handleFaqAccordion = () => {
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => {
          const wasActive = item.classList.contains('active');

          // Close all other items
          faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          });

          // Toggle the clicked item
          if (!wasActive) {
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
          }
        });
      }
    });
  };

  // --- Initialize all functionalities ---
  initializeTheme();
  handleThemeToggle();
  handleNavbarScroll();
  handleMobileMenu();
  setupScrollAnimations();
  handleParallaxEffect();
  handleSkipLink();
  handleWorkflowAnimation();
  handleQuoteButtons();
  handleFaqAccordion();
});
