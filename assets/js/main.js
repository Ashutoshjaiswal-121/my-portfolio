/* Single-page portfolio JS (no PHP, no Bootstrap) */

(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- Navbar (mobile toggle + compact on scroll) ----------
  const navToggle = $('#navToggle');
  const navMenuMobile = $('#navMenuMobile');
  const navbar = $('#navbar');

  if (navToggle && navMenuMobile) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenuMobile.classList.contains('hidden') === false;
      navMenuMobile.classList.toggle('hidden', isOpen);
      navToggle.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close on link click
    $$('a[href^="#"]', navMenuMobile).forEach((a) => {
      a.addEventListener('click', () => {
        navMenuMobile.classList.add('hidden');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function onScrollNavbar() {
    if (!navbar) return;
    const scrolled = window.scrollY > 100;
    navbar.classList.toggle('shadow-[0_10px_30px_rgba(0,0,0,0.35)]', scrolled);
  }
  window.addEventListener('scroll', onScrollNavbar, { passive: true });
  onScrollNavbar();

  // ---------- Back to top ----------
  const backToTop = $('#backToTop');
  function onScrollBackToTop() {
    if (!backToTop) return;
    const show = window.scrollY > 300;
    backToTop.style.display = show ? 'flex' : 'none';
  }
  window.addEventListener('scroll', onScrollBackToTop, { passive: true });
  onScrollBackToTop();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Typewriter ----------
  class TypeWriter {
    constructor(element, words, wait = 3000) {
      this.element = element;
      this.words = words;
      this.wait = Number(wait) || 3000;
      this.text = '';
      this.index = 0;
      this.isDeleting = false;
      this.tick();
    }

    tick() {
      const currentWord = this.words[this.index % this.words.length] || '';

      if (this.isDeleting) {
        this.text = currentWord.substring(0, this.text.length - 1);
      } else {
        this.text = currentWord.substring(0, this.text.length + 1);
      }

      this.element.textContent = this.text;

      let speed = 100;
      if (this.isDeleting) speed = 50;

      if (!this.isDeleting && this.text === currentWord) {
        speed = this.wait;
        this.isDeleting = true;
      } else if (this.isDeleting && this.text === '') {
        this.isDeleting = false;
        this.index += 1;
        speed = 500;
      }

      window.setTimeout(() => this.tick(), speed);
    }
  }

  const typeTarget = $('.typewriter-text');
  if (typeTarget) {
    let words = ['Web Developer', 'Frontend Specialist', 'Quick Learner', 'Problem Solver'];
    try {
      const raw = typeTarget.getAttribute('data-words');
      if (raw) words = JSON.parse(raw);
    } catch {
      // ignore
    }
    new TypeWriter(typeTarget, words, 3000);
  }

  // ---------- Education + Certifications + Skills Summary (static data from PHP) ----------
  const educationData = [
    {
      degree: 'Master of Computer Applications (MCA)',
      institution: 'School of Computer Science, KBCNMU, Jalgaon',
      duration: '2025 - 2027',
      description:
        'Currently pursuing MCA (First-Year) with focus on software development and modern web technologies.',
      grade: 'Grade: A+',
      icon: 'fas fa-graduation-cap',
      courses: ['Java', 'Web Technologies', 'DBMS', 'Computer Networks', 'Operating System'],
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'BRABU, Muzaffarpur, Bihar',
      duration: '2018 - 2021',
      description:
        'Built strong programming fundamentals and problem-solving skills through academic projects and hands-on learning.',
      grade: 'CGPA: 8.7',
      icon: 'fas fa-graduation-cap',
      courses: ['C', 'C++', 'Core Java', 'SQL', 'OOPs'],
    },
  ];

  const certificationsData = [
    {
      name: 'C, C++, Data Structures & STL',
      issuer: 'MySirG',
      year: 'Certificate',
      icon: 'fas fa-certificate',
      credential_id: '—',
    },
    {
      name: 'Python Programming',
      issuer: 'CS Vision',
      year: 'Certificate',
      icon: 'fab fa-python',
      credential_id: '—',
    },
    {
      name: 'Solved 50+ DSA problems on GeeksforGeeks',
      issuer: 'GeeksforGeeks (GFG)',
      year: 'Achievement',
      icon: 'fas fa-code',
      credential_id: '50+ Problems',
    },
    {
      name: 'First Runner-Up — ZYNOVA 2K26 National Level Codathon',
      issuer: 'Ayya Nadar Janaki Ammal College, Sivakasi',
      year: '2026',
      icon: 'fas fa-trophy',
      credential_id: 'Prize: ₹1000',
    },
    {
      name: 'Finalist — Metacode 2026 (COMPOSIT, IIT Kharagpur)',
      issuer: 'IIT Kharagpur',
      year: '2026',
      icon: 'fas fa-medal',
      credential_id: 'Finalist',
    },
    {
      name: 'HackTheRank — Certificate of Participation',
      issuer: 'HackTheRank',
      year: 'Participation',
      icon: 'fas fa-award',
      credential_id: '—',
    },
  ];

  const skillsSummaryData = [
    {
      title: 'Languages',
      icon: 'fas fa-code',
      items: ['C', 'C++', 'Core Java', 'Golang', 'Python', 'SQL'],
    },
    {
      title: 'Frontend',
      icon: 'fas fa-laptop-code',
      items: ['HTML', 'CSS', 'JavaScript (ES6+)', 'React', 'Bootstrap', 'Tailwind'],
    },
    {
      title: 'Backend & DB',
      icon: 'fas fa-server',
      items: ['Node.js', 'Express.js', 'MySQL', 'MongoDB'],
    },
    {
      title: 'Core & Tools',
      icon: 'fas fa-gears',
      items: ['OOPs', 'DBMS', 'Operating System', 'Computer Network', 'Git', 'GitHub', 'VS Code', 'IntelliJ IDEA', 'DSA (GFG)'],
    },
  ];

  const educationTimeline = $('#educationTimeline');
  if (educationTimeline) {
    educationTimeline.innerHTML = educationData
      .map(
        (edu, idx) => `
        <div class="relative pl-10 pb-10">
          <div class="absolute left-3 top-1.5 h-full w-px bg-white/10 ${idx === educationData.length - 1 ? 'hidden' : ''}"></div>
          <div class="absolute left-0 top-0.5 h-6 w-6 rounded-full bg-primary/20 ring-2 ring-primary/60"></div>

          <div class="rounded-3xl bg-dark p-6 ring-1 ring-white/10">
            <div class="flex flex-wrap items-start gap-4">
              <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <i class="${edu.icon}"></i>
              </div>
              <div class="flex-1">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <h3 class="font-semibold text-lg">${escapeHtml(edu.degree)}</h3>
                  <span class="text-xs text-text-secondary">${escapeHtml(edu.duration)}</span>
                </div>
                <div class="mt-1 text-sm text-text-secondary">${escapeHtml(edu.institution)}</div>
              </div>
            </div>

            <p class="mt-4 text-sm text-text-secondary leading-relaxed">${escapeHtml(edu.description)}</p>

            <div class="mt-5 flex flex-wrap items-center gap-3">
              <span class="text-sm"><strong>Grade:</strong> <span class="ml-1 inline-flex rounded-full bg-white/5 px-3 py-1 text-xs ring-1 ring-white/10">${escapeHtml(
                edu.grade
              )}</span></span>
            </div>

            <div class="mt-4">
              <div class="text-sm font-semibold">Key Courses:</div>
              <div class="mt-2 flex flex-wrap gap-2">
                ${edu.courses
                  .map((c) => `<span class="rounded-full bg-white/5 px-3 py-1 text-xs ring-1 ring-white/10">${escapeHtml(c)}</span>`)
                  .join('')}
              </div>
            </div>
          </div>
        </div>
      `
      )
      .join('');
  }

  const certificationsGrid = $('#certificationsGrid');
  if (certificationsGrid) {
    certificationsGrid.innerHTML = certificationsData
      .map(
        (c) => `
        <div class="rounded-3xl bg-dark p-6 ring-1 ring-white/10">
          <div class="flex items-start gap-4">
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <i class="${c.icon}"></i>
            </div>
            <div class="flex-1">
              <div class="font-semibold">${escapeHtml(c.name)}</div>
              <div class="text-sm text-text-secondary">${escapeHtml(c.issuer)}</div>
            </div>
          </div>
          <div class="mt-4 flex flex-wrap items-center gap-3 text-xs text-text-secondary">
            <span class="inline-flex items-center gap-2"><i class="fas fa-calendar text-primary"></i>${escapeHtml(c.year)}</span>
            <span class="inline-flex items-center gap-2"><i class="fas fa-id-card text-primary"></i>${escapeHtml(c.credential_id)}</span>
          </div>
          <button type="button" class="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/50 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-dark transition">
            <i class="fas fa-external-link-alt"></i>View Credential
          </button>
        </div>
      `
      )
      .join('');
  }

  const skillsSummary = $('#skillsSummary');
  if (skillsSummary) {
    skillsSummary.innerHTML = skillsSummaryData
      .map(
        (cat) => `
        <div class="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
          <h4 class="font-semibold"><i class="${cat.icon} mr-2 text-primary"></i>${escapeHtml(cat.title)}</h4>
          <div class="mt-4 flex flex-wrap gap-2">
            ${cat.items.map((s) => `<span class="rounded-full bg-dark/60 px-3 py-1 text-xs ring-1 ring-white/10">${escapeHtml(s)}</span>`).join('')}
          </div>
        </div>
      `
      )
      .join('');
  }

  // ---------- Projects (static data from includes/config.php) ----------
  const projects = [
    {
      title: 'Calculator',
      description: 'Built a responsive calculator using React.js and implemented basic arithmetic operations with a clean UI.',
      short_description: 'Responsive calculator built with React',
      technologies: 'React.js, JavaScript (ES6), CSS',
      project_url: '',
      github_url: '',
      image_path: 'assets/uploads/projects/project.png',
      category: 'web',
      featured: true,
    },
    {
      title: 'Currency Converter',
      description: 'Developed a currency converter using JavaScript and converted values between currencies based on predefined rates.',
      short_description: 'Currency converter using JavaScript',
      technologies: 'HTML, CSS, JavaScript',
      project_url: '',
      github_url: '',
      image_path: 'assets/uploads/projects/project.png',
      category: 'web',
      featured: false,
    },
    {
      title: 'Digital Watch',
      description: 'Created a real-time digital clock using the JavaScript Date object with live time updates.',
      short_description: 'Real-time digital clock',
      technologies: 'HTML, CSS, JavaScript',
      project_url: '',
      github_url: '',
      image_path: 'assets/uploads/projects/project.png',
      category: 'web',
      featured: false,
    },
    {
      title: 'E-Jewellery Website',
      description:
        'Developed an E-Jewellery website using HTML, CSS, JavaScript and Bootstrap with category-based product display.',
      short_description: 'E-commerce UI with category-wise products',
      technologies: 'HTML, CSS, JavaScript, Bootstrap',
      project_url: '',
      github_url: '',
      image_path: 'assets/uploads/projects/project.png',
      category: 'web',
      featured: true,
    },
  ];

  const projectsGrid = $('#projectsGrid');
  const noProjects = $('#noProjects');
  const filterButtons = $$('.filter-btn');

  function renderProjects(filter) {
    if (!projectsGrid) return;

    const filtered =
      filter === 'all'
        ? projects
        : projects.filter((p) => (p.category || '').split(' ').includes(filter));

    projectsGrid.innerHTML = filtered
      .map((p, idx) => projectCardHtml(p, idx))
      .join('');

    if (noProjects) noProjects.classList.toggle('hidden', filtered.length !== 0);

    // Bind modal buttons
    $$('[data-project-idx]', projectsGrid).forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const i = Number(btn.getAttribute('data-project-idx'));
        const project = filtered[i];
        if (project) openProjectModal(project);
      });
    });
  }

  function projectCardHtml(p, idx) {
    const techTags = String(p.technologies || '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 8)
      .map((t) => `<span class="rounded-full bg-white/5 px-3 py-1 text-xs ring-1 ring-white/10">${escapeHtml(t)}</span>`)
      .join('');

    const img = p.image_path || 'assets/uploads/projects/project.png';

    return `
      <article class="group overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 hover:ring-primary/40 transition">
        <div class="relative">
          <img src="${escapeAttr(img)}" alt="${escapeAttr(p.title)}" class="h-48 w-full object-cover" loading="lazy" onerror="this.onerror=null; this.src='assets/uploads/projects/project.png';" />
          <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition"></div>

          <div class="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
            ${p.project_url ? `<a class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary hover:text-dark transition" href="${escapeAttr(p.project_url)}" target="_blank" rel="noreferrer" aria-label="Live">
              <i class="fas fa-external-link-alt"></i>
            </a>` : ''}
            ${p.github_url ? `<a class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary hover:text-dark transition" href="${escapeAttr(p.github_url)}" target="_blank" rel="noreferrer" aria-label="GitHub">
              <i class="fab fa-github"></i>
            </a>` : ''}
            <a class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary hover:text-dark transition" href="#" data-project-idx="${idx}" aria-label="Details">
              <i class="fas fa-plus"></i>
            </a>
          </div>

          ${p.featured ? `<div class="absolute left-4 top-4 rounded-full bg-primary/15 px-4 py-1 text-xs font-semibold text-primary ring-1 ring-primary/30">Featured</div>` : ''}
        </div>

        <div class="p-6">
          <h3 class="font-semibold">${escapeHtml(p.title)}</h3>
          <p class="mt-2 text-sm text-text-secondary">${escapeHtml(p.short_description || '')}</p>
          <div class="mt-4 flex flex-wrap gap-2">${techTags}</div>
        </div>
      </article>
    `;
  }

  // Filters
  let activeFilter = 'all';
  if (filterButtons.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.setAttribute('data-active', 'false'));
        btn.setAttribute('data-active', 'true');
        activeFilter = btn.getAttribute('data-filter') || 'all';
        renderProjects(activeFilter);
      });
    });
  }

  // Initial projects render
  renderProjects(activeFilter);

  // ---------- Project modal ----------
  const modal = $('#projectModal');
  const modalTitle = $('#projectModalTitle');
  const modalBody = $('#projectModalBody');

  function openProjectModal(project) {
    if (!modal || !modalTitle || !modalBody) return;

    modalTitle.textContent = project.title || 'Project Details';

    const techTags = String(project.technologies || '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => `<span class="rounded-full bg-white/5 px-3 py-1 text-xs ring-1 ring-white/10">${escapeHtml(t)}</span>`)
      .join('');

    const img = project.image_path || 'assets/uploads/projects/project.png';

    modalBody.innerHTML = `
      <div class="grid gap-6 md:grid-cols-2">
        <div>
          <img src="${escapeAttr(img)}" alt="${escapeAttr(project.title)}" class="w-full rounded-2xl object-cover" onerror="this.onerror=null; this.src='assets/uploads/projects/project.png';" />
        </div>
        <div>
          <h4 class="font-semibold">Project Description</h4>
          <p class="mt-2 text-sm text-text-secondary leading-relaxed">${escapeHtml(project.description || '')}</p>

          <h5 class="mt-5 font-semibold">Technologies Used</h5>
          <div class="mt-3 flex flex-wrap gap-2">${techTags}</div>

          <div class="mt-6 flex flex-wrap gap-3">
            ${project.project_url ? `<a class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-semibold text-dark hover:-translate-y-0.5 transition" href="${escapeAttr(project.project_url)}" target="_blank" rel="noreferrer">
              <i class="fas fa-external-link-alt mr-2"></i>Live Demo
            </a>` : ''}
            ${project.github_url ? `<a class="inline-flex items-center justify-center rounded-full border-2 border-primary/70 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-dark hover:-translate-y-0.5 transition" href="${escapeAttr(project.github_url)}" target="_blank" rel="noreferrer">
              <i class="fab fa-github mr-2"></i>View Code
            </a>` : ''}
          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (modal) {
    $$('[data-modal-close]', modal).forEach((el) => {
      el.addEventListener('click', closeProjectModal);
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeProjectModal();
    });
  }

  // ---------- Contact: character count + validation + fake submit ----------
  const message = $('#message');
  const charCount = $('#charCount');
  const contactForm = $('#contactForm');
  const contactAlert = $('#contactAlert');
  const sendBtnLabel = $('#sendBtnLabel');
  const sendBtnLoading = $('#sendBtnLoading');

  if (message && charCount) {
    const update = () => {
      charCount.textContent = String(message.value.length);
      if (message.value.length > 500) charCount.className = 'text-red-300';
      else if (message.value.length > 300) charCount.className = 'text-amber-300';
      else charCount.className = '';
    };
    message.addEventListener('input', update);
    update();
  }

  function setFeedback(name, text) {
    const el = document.querySelector(`[data-feedback-for="${name}"]`);
    if (el) el.textContent = text || '';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const msg = String(formData.get('message') || '').trim();

      setFeedback('name', '');
      setFeedback('email', '');
      setFeedback('message', '');

      let ok = true;
      if (!name) {
        setFeedback('name', 'This field is required');
        ok = false;
      }
      if (!email) {
        setFeedback('email', 'This field is required');
        ok = false;
      } else if (!isValidEmail(email)) {
        setFeedback('email', 'Please enter a valid email address');
        ok = false;
      }
      if (!msg) {
        setFeedback('message', 'This field is required');
        ok = false;
      }

      if (!ok) return;

      // Simulated send
      if (sendBtnLabel && sendBtnLoading) {
        sendBtnLabel.classList.add('hidden');
        sendBtnLoading.classList.remove('hidden');
      }
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      window.setTimeout(() => {
        if (contactAlert) {
          contactAlert.classList.remove('hidden');
          contactAlert.textContent =
            "Thank you! Your message has been sent successfully. I'll get back to you within 24 hours.";
        }
        contactForm.reset();
        if (message && charCount) charCount.textContent = '0';

        if (sendBtnLabel && sendBtnLoading) {
          sendBtnLabel.classList.remove('hidden');
          sendBtnLoading.classList.add('hidden');
        }
        if (submitBtn) submitBtn.disabled = false;
      }, 800);
    });
  }

  // ---------- FAQ accordion ----------
  $$('.faq-item').forEach((item) => {
    const q = $('.faq-q', item);
    const a = $('.faq-a', item);
    if (!q || !a) return;

    q.addEventListener('click', () => {
      // Close others
      $$('.faq-item').forEach((other) => {
        if (other === item) return;
        const oa = $('.faq-a', other);
        if (oa) oa.classList.add('hidden');
      });

      a.classList.toggle('hidden');
    });
  });

  // ---------- Helpers (basic escaping) ----------
  function escapeHtml(input) {
    return String(input)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function escapeAttr(input) {
    // same as HTML escape for our usage
    return escapeHtml(input);
  }
})();
