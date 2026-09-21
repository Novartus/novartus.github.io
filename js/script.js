// ==========================================================================
// Abhee Hudani Portfolio - Fixed Screen App & View Switcher
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC EXPERIENCE & COPYRIGHT
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const expYears = currentYear - startYear + 1;

  const expElement = document.getElementById('exp-years');
  if (expElement) {
    expElement.textContent = `${expYears}+`;
  }
  const bentoExpElement = document.getElementById('bento-exp-stat');
  if (bentoExpElement) {
    bentoExpElement.textContent = `${expYears}+`;
  }
  const copyrightYearElement = document.getElementById('copyright-year');
  if (copyrightYearElement) {
    copyrightYearElement.textContent = currentYear;
  }

  // 2. VIEW SWITCHER ENGINE
  const navTabs = document.querySelectorAll('.nav-vertical-link');
  const viewPanels = document.querySelectorAll('.view-panel');
  const appViewport = document.getElementById('app-viewport');

  // Valid view mappings
  const validViews = ['view-about', 'view-skills', 'view-experience', 'view-projects', 'view-contact'];

  const viewMeta = {
    'view-about': {
      title: 'Abhee Hudani | Senior Full Stack Developer',
      desc: 'Senior Full Stack Developer at RBC specializing in TypeScript/JavaScript, Python & Java, building resilient architectures with React, NestJS, Node.js, and GenAI.'
    },
    'view-skills': {
      title: 'Technical Arsenal & Skills | Abhee Hudani',
      desc: 'Explore Abhee Hudani\'s technical expertise across JavaScript, TypeScript, Python, Java, React, NestJS, Node.js, Next.js, and Cloud Infrastructure.'
    },
    'view-experience': {
      title: 'Career & Experience Timeline | Abhee Hudani',
      desc: 'Professional journey and engineering milestones of Abhee Hudani at RBC, University of Windsor, and Solskyn Tech.'
    },
    'view-projects': {
      title: 'Featured Projects & Architecture | Abhee Hudani',
      desc: 'Showcase of flagship projects including Odin-Eye (Android Health Hub with on-device Gemini Nano AI) and KyberFlow Pro.'
    },
    'view-contact': {
      title: 'Connect & Collaborate | Abhee Hudani',
      desc: 'Get in touch with Abhee Hudani for architectural collaborations, technical inquiries, or professional networking.'
    }
  };

  function switchView(targetViewId, updateUrl = true) {
    if (!validViews.includes(targetViewId)) {
      targetViewId = 'view-about';
    }

    const currentActivePanel = document.querySelector('.view-panel.active');
    const targetPanel = document.getElementById(targetViewId);

    if (!targetPanel) return;
    if (currentActivePanel === targetPanel) return;

    // Transition execution
    const executeSwitch = () => {
      // Update Tab Buttons (seamless vertical links + about me badge)
      navTabs.forEach(tab => {
        const isMatch = tab.getAttribute('data-view') === targetViewId;
        tab.classList.toggle('active', isMatch);
        tab.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });

      // Update View Panels
      viewPanels.forEach(panel => {
        panel.classList.remove('active');
      });
      targetPanel.classList.add('active');

      // Update Page Title and Meta Description for SEO
      if (viewMeta[targetViewId]) {
        document.title = viewMeta[targetViewId].title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', viewMeta[targetViewId].desc);
        }
      }

      // Scroll viewport back to top smoothly
      if (appViewport) {
        appViewport.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Modern View Transitions API with graceful fallback
    if ('startViewTransition' in document) {
      document.startViewTransition(() => {
        executeSwitch();
      });
    } else {
      executeSwitch();
    }

    // Update URL hash without jarring page jump
    if (updateUrl) {
      const hashId = targetViewId.replace('view-', '');
      try {
        window.history.pushState(null, '', `#${hashId}`);
      } catch (e) {
        window.location.hash = hashId;
      }
    }
  }

  // Vertical Navigation Tab Click Listeners
  navTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = tab.getAttribute('data-view');
      switchView(targetView, true);
    });
  });

  // Switch View Buttons inside cards (e.g. Bento cards, editorial arrow, title symbols)
  document.querySelectorAll('.switch-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetView = btn.getAttribute('data-view');
      if (targetView) {
        e.preventDefault();
        switchView(targetView, true);
      }
    });
  });

  // Handle URL hash on initial load and browser back/forward buttons
  function handleHashNavigation() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash) {
      const targetViewId = `view-${hash}`;
      if (validViews.includes(targetViewId)) {
        switchView(targetViewId, false);
      }
    }
  }

  window.addEventListener('popstate', handleHashNavigation);
  handleHashNavigation();

  // 3. THEME TOGGLE CONTROLLER
  const htmlElement = document.documentElement;
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
    if (metaThemeColor) metaThemeColor.setAttribute('content', '#07090E');
  } else {
    htmlElement.setAttribute('data-theme', 'light');
    if (metaThemeColor) metaThemeColor.setAttribute('content', '#EAEBED');
  }

  themeToggles.forEach(toggleBtn => {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', newTheme === 'dark' ? '#07090E' : '#EAEBED');
      }
    });
  });

  // 4. ODIN-EYE ARCHITECTURE MODAL CONTROLLER
  const odinDialog = document.getElementById('odineye-dialog');
  const openOdinBtns = [
    document.getElementById('open-odineye-modal')
  ];
  const closeOdinBtn = document.getElementById('close-odineye-modal');

  if (odinDialog) {
    openOdinBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          odinDialog.showModal();
        });
      }
    });

    if (closeOdinBtn) {
      closeOdinBtn.addEventListener('click', () => {
        odinDialog.close();
      });
    }

    // Close when clicking on dialog backdrop
    odinDialog.addEventListener('click', (e) => {
      const rect = odinDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        odinDialog.close();
      }
    });
  }

  // 5. HERMEX ARCHITECTURE MODAL CONTROLLER
  const hermexDialog = document.getElementById('hermex-dialog');
  const openHermexBtns = [
    document.getElementById('open-hermex-modal')
  ];
  const closeHermexBtn = document.getElementById('close-hermex-modal');

  if (hermexDialog) {
    openHermexBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          hermexDialog.showModal();
        });
      }
    });

    if (closeHermexBtn) {
      closeHermexBtn.addEventListener('click', () => {
        hermexDialog.close();
      });
    }

    // Close when clicking on dialog backdrop
    hermexDialog.addEventListener('click', (e) => {
      const rect = hermexDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        hermexDialog.close();
      }
    });
  }
});
