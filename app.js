/**
 * Eswar D — Interactive Portfolio Script
 * Handles Perspective Mode Switching, 3D Tilt, Interactive Terminal, LMS Tabs, and Copy Toasts
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. PERSPECTIVE MODE SWITCHER
  // ==========================================
  const modeButtons = document.querySelectorAll('.mode-btn');
  const body = document.body;
  const perspectiveTitle = document.getElementById('perspectiveTitle');
  const perspectiveDesc = document.getElementById('perspectiveDesc');

  const perspectiveInfo = {
    hybrid: {
      title: 'Hybrid Dimension Active:',
      desc: 'Displaying both backend software engineering fundamentals and campus-wide leadership milestones.',
      themeClass: 'theme-hybrid'
    },
    engineer: {
      title: 'Engineering Dimension Active:',
      desc: 'Highlighting Python, Flask backend architecture, MySQL schemas, REST routes, and terminal tools.',
      themeClass: 'theme-engineer'
    },
    leader: {
      title: 'Leadership Dimension Active:',
      desc: 'Highlighting Fine Arts Club Presidency, large-scale event production, team management, and public speaking.',
      themeClass: 'theme-leader'
    }
  };

  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedMode = btn.getAttribute('data-mode');
      
      // Update Active Button
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update Body Theme Class
      body.classList.remove('theme-hybrid', 'theme-engineer', 'theme-leader');
      body.classList.add(perspectiveInfo[selectedMode].themeClass);

      // Update Banner Text
      if (perspectiveTitle && perspectiveDesc) {
        perspectiveTitle.textContent = perspectiveInfo[selectedMode].title;
        perspectiveDesc.textContent = perspectiveInfo[selectedMode].desc;
      }

      // Smooth subtle highlight on target elements
      highlightDimensionElements(selectedMode);
    });
  });

  function highlightDimensionElements(mode) {
    const dimensionElements = document.querySelectorAll('[data-dimension]');
    dimensionElements.forEach(el => {
      const dim = el.getAttribute('data-dimension');
      if (mode === 'hybrid') {
        el.style.opacity = '1';
        el.style.filter = 'none';
      } else if (dim === mode) {
        el.style.opacity = '1';
        el.style.filter = 'none';
      } else {
        el.style.opacity = '0.55';
        el.style.filter = 'grayscale(0.3)';
      }
    });
  }

  // ==========================================
  // 2. 3D PARALLAX TILT EFFECT ON PORTRAIT CARD
  // ==========================================
  const portraitWrapper = document.getElementById('portraitTilt');
  if (portraitWrapper) {
    const portraitCard = portraitWrapper.querySelector('.portrait-card');

    portraitWrapper.addEventListener('mousemove', (e) => {
      const rect = portraitWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      portraitCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    portraitWrapper.addEventListener('mouseleave', () => {
      portraitCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // ==========================================
  // 3. LMS INTERACTIVE TABS
  // ==========================================
  const lmsTabs = document.querySelectorAll('.lms-tab');
  const lmsContents = document.querySelectorAll('.lms-tab-content');

  lmsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');

      lmsTabs.forEach(t => t.classList.remove('active'));
      lmsContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const activeContent = document.getElementById(targetId);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });

  // ==========================================
  // 4. SKILLS FILTERING
  // ==========================================
  const filterPills = document.querySelectorAll('.filter-pill');
  const skillCards = document.querySelectorAll('.skill-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const filter = pill.getAttribute('data-filter');

      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 5. INTERACTIVE TERMINAL (CLI)
  // ==========================================
  const termInput = document.getElementById('termInput');
  const termHistory = document.getElementById('termHistory');
  const termScreen = document.getElementById('termScreen');

  const commandResponses = {
    help: `
Available Commands:
  • <span class="highlight-cmd">whoami</span>       : Profile overview & credentials
  • <span class="highlight-cmd">skills</span>       : Technical stack & proficiency
  • <span class="highlight-cmd">lms-demo</span>     : Interactive breakdown of Student LMS project
  • <span class="highlight-cmd">leadership</span>   : Fine Arts Club presidency metrics
  • <span class="highlight-cmd">contact</span>      : Direct email, phone, and profile links
  • <span class="highlight-cmd">resume</span>       : Download / view verified PDF resume
  • <span class="highlight-cmd">sudo hire</span>    : Fast recruiter onboarding shortcut
  • <span class="highlight-cmd">clear</span>        : Reset console output
`,
    whoami: `
<strong>Eswar D</strong> — Final-Year Computer Science & Engineering Student
• University: Aarupadai Veedu Institute of Technology (AVIT — VMRF-DU), Chennai
• Academic Merit: <strong>8.1 CGPA</strong> (2023 – 2027)
• Dual Track: Python / Backend Engineering + President of Fine Arts Club
• Target: Entry-Level Software Engineer / Python Developer
`,
    skills: `
<strong>PRIMARY CORE STACK:</strong>
• Languages: Python 3, SQL, C++, Java (Basics)
• Frameworks: Flask, RESTful API Design, Jinja2
• Relational DB: MySQL (Normalization, Multi-table joins, RBAC)
• Dev Tools: VS Code, PowerShell, Git & GitHub, Jupyter, Google Colab
• Languages: English (Fluent), Tamil (Native), Kannada (Conversational)
`,
    'lms-demo': `
<strong>[SLMS] Student Learning Management System:</strong>
• Architecture: Python / Flask Microframework + MySQL Schema
• Modules:
  1. RBAC Authentication (Admin, Faculty, Student roles)
  2. Automated Roll-call & % Calculator (<75% Alert Threshold)
  3. Continuous Assessment Grading & GPA Calculation
  4. Parent Notification Dispatch Loop
• Live repo: <a href="https://github.com/Eswardeva" target="_blank" style="color:#38bdf8;text-decoration:underline;">github.com/Eswardeva</a>
`,
    leadership: `
<strong>Fine Arts Club Leadership (President):</strong>
• Rallied 1000+ student attendees across flagship college festivals
• Managed 50+ cross-functional student coordinators (sound, stage, finance, design)
• Represented AVIT in state & national intercollegiate symposiums
• Proven crisis mitigation and stakeholder management under live pressure
`,
    contact: `
<strong>Get In Touch Directly:</strong>
• Email   : <a href="mailto:eswareswar0101@gmail.com" style="color:#fbbf24;">eswareswar0101@gmail.com</a>
• Phone   : <a href="tel:+917449256396" style="color:#fbbf24;">+91 74492 56396</a>
• GitHub  : <a href="https://github.com/Eswardeva" target="_blank" style="color:#38bdf8;">github.com/Eswardeva</a>
• LinkedIn: <a href="https://linkedin.com/in/eswar-d-475441379" target="_blank" style="color:#38bdf8;">linkedin.com/in/eswar-d-475441379</a>
• Base    : Chennai, Tamil Nadu (Open to Relocation & Remote)
`,
    resume: `
Opening verified resume PDF in a new tab...
[Link: <a href="Eswar_D_Resume.pdf" target="_blank" style="color:#fbbf24;text-decoration:underline;">Eswar_D_Resume.pdf</a>]
`,
    'sudo hire': `
🚀 <strong>Access Granted! Initiating Recruiter Express Sequence:</strong>
✓ Candidate: Eswar D
✓ Role Target: Software Engineer / Python Developer
✓ Degree: B.E. CSE, 8.1 CGPA
✓ Key Strengths: Python, Flask, MySQL, Dynamic Team Leadership
✓ Contact dispatched: Click email below or call directly!
👉 Email: <a href="mailto:eswareswar0101@gmail.com?subject=Interview%20Invitation%20-%20Eswar%20D" style="color:#34d399;font-weight:bold;">Schedule Interview with Eswar</a>
`,
    clear: ''
  };

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const rawCmd = termInput.value.trim().toLowerCase();
        if (rawCmd) {
          executeCommand(rawCmd);
        }
        termInput.value = '';
      }
    });
  }

  window.executeTerm = function(cmd) {
    if (termInput) {
      termInput.value = cmd;
      executeCommand(cmd.toLowerCase());
      termInput.value = '';
      termInput.focus();
    }
  };

  function executeCommand(cmd) {
    if (cmd === 'clear') {
      termHistory.innerHTML = '';
      return;
    }

    if (cmd === 'resume') {
      window.open('Eswar_D_Resume.pdf', '_blank');
    }

    const commandLine = document.createElement('div');
    commandLine.className = 'term-line';
    commandLine.innerHTML = `<span class="prompt-user">eswar</span>@avit:~$ <span style="color:#fff;">${escapeHtml(cmd)}</span>`;

    const responseLine = document.createElement('div');
    responseLine.className = 'term-output-block';

    if (commandResponses[cmd]) {
      responseLine.innerHTML = commandResponses[cmd];
    } else {
      responseLine.innerHTML = `<span style="color:#f87171;">zsh: command not found: ${escapeHtml(cmd)}</span>. Type <span class="highlight-cmd">'help'</span> for valid commands.`;
    }

    termHistory.appendChild(commandLine);
    termHistory.appendChild(responseLine);

    if (termScreen) {
      termScreen.scrollTop = termScreen.scrollHeight;
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ==========================================
  // 6. SCROLL TO TERMINAL & DEMO TRIGGER
  // ==========================================
  window.scrollToTerminal = function() {
    const termSec = document.getElementById('terminal-section');
    if (termSec) {
      termSec.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        if (termInput) termInput.focus();
      }, 600);
    }
  };

  window.runLmsTerminalDemo = function() {
    window.scrollToTerminal();
    setTimeout(() => {
      executeTerm('lms-demo');
    }, 500);
  };

  window.mockAction = function(name) {
    showToast(`Inspection loaded for ${name}: All records synchronized.`);
  };

  // ==========================================
  // 7. TOAST NOTIFICATIONS & CLIPBOARD COPY
  // ==========================================
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer = null;

  window.showToast = function(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  window.copyToClipboard = function(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied to clipboard: ${text}`);
      if (btnElement) {
        const originalText = btnElement.textContent;
        btnElement.textContent = 'Copied!';
        setTimeout(() => {
          btnElement.textContent = originalText;
        }, 2000);
      }
    }).catch(() => {
      showToast(`Copied: ${text}`);
    });
  };

  // ==========================================
  // 8. CONTACT FORM SUBMISSION HANDLER
  // ==========================================
  window.handleContactSubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const role = document.getElementById('senderRole').value;
    const message = document.getElementById('senderMessage').value;

    const subject = encodeURIComponent(`[Opportunity / Inquiry] ${role} - from ${name}`);
    const bodyContent = encodeURIComponent(
      `Hi Eswar,\n\nName: ${name}\nEmail: ${email}\nOpportunity: ${role}\n\nMessage:\n${message}\n\nSent from your portfolio website.`
    );

    showToast('Launching your mail client with prefilled details...');
    setTimeout(() => {
      window.location.href = `mailto:eswareswar0101@gmail.com?subject=${subject}&body=${bodyContent}`;
    }, 800);
  };

  // ==========================================
  // 9. MOBILE MENU TOGGLE
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

});
