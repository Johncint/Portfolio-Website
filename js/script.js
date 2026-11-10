const intro = document.getElementById("intro");
const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-links a");
const backToTop = document.querySelector(".back-to-top");
const scrollBar = document.querySelector(".scroll-progress");
const hero = document.querySelector(".hero");
const heroFrame = document.querySelector(".hero-image-frame");
const typedName = document.getElementById("typed-name");
const navCopy = document.querySelector(".nav-copy");
const navIndicator = document.querySelector(".nav-indicator");
const toast = document.getElementById("toast");
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const projectEmpty = document.getElementById("project-empty");
const aboutTabs = document.querySelectorAll(".about-tab");
const aboutPanels = document.querySelectorAll(".about-panel");
const contactCopy = document.querySelector(".contact-copy");
const yearEl = document.getElementById("year");
const lastUpdatedEl = document.getElementById("last-updated");
const themeToggle = document.getElementById("theme-toggle");

// Custom Cursor Elements
const cursorDot = document.getElementById("cursor-dot");
const cursorRing = document.getElementById("cursor-ring");

// Lightbox Elements
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");

// Command Palette Elements
const cmdTrigger = document.getElementById("cmd-trigger");
const cmdPalette = document.getElementById("cmd-palette");
const cmdBackdrop = document.getElementById("cmd-backdrop");
const cmdInput = document.getElementById("cmd-input");
const cmdList = document.getElementById("cmd-list");
const cmdItems = document.querySelectorAll(".cmd-list li");

const NAME = "Johncint Bagonoc";
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------------------------------------------------
// 0. CUSTOM MOUSE CURSOR
// ---------------------------------------------------
if (cursorDot && cursorRing && !prefersReduced && window.innerWidth > 860) {
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  };
  animateRing();

  const clickables = document.querySelectorAll("a, button, input, textarea, .theme-toggle, .project-card");
  clickables.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorRing.classList.add("hover-active");
      cursorDot.classList.add("hover-active");
    });
    el.addEventListener("mouseleave", () => {
      cursorRing.classList.remove("hover-active");
      cursorDot.classList.remove("hover-active");
    });
  });

  document.addEventListener("mouseleave", () => {
    document.body.classList.add("cursor-hidden");
  });

  document.addEventListener("mouseenter", () => {
    document.body.classList.remove("cursor-hidden");
  });
}

// ---------------------------------------------------
// 1. THEME TOGGLE (Light / Dark Mode)
// ---------------------------------------------------
const htmlEl = document.documentElement;
const savedTheme = localStorage.getItem("theme") || "dark";
htmlEl.setAttribute("data-theme", savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = htmlEl.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    htmlEl.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

// ---------------------------------------------------
// 2. INTRO ANIMATION & TYPING
// ---------------------------------------------------
let typedStarted = false;

function startTyping() {
  if (typedStarted || !typedName) return;
  typedStarted = true;

  if (prefersReduced) {
    typedName.textContent = NAME;
    return;
  }

  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const current = NAME.slice(0, charIndex);
    typedName.textContent = current;

    if (!deleting && charIndex < NAME.length) {
      charIndex++;
      setTimeout(tick, 120);
    } else if (!deleting && charIndex === NAME.length) {
      deleting = true;
      setTimeout(tick, 1800);
    } else if (deleting && charIndex > 0) {
      charIndex--;
      setTimeout(tick, 60);
    } else {
      deleting = false;
      setTimeout(tick, 500);
    }
  };

  tick();
}

if (intro) {
  document.body.classList.add("intro-lock");

  const closeIntro = () => {
    intro.classList.add("done");
    document.body.classList.remove("intro-lock");
    document.body.style.overflow = "";
    startTyping();
  };

  if (prefersReduced) {
    closeIntro();
  } else {
    window.setTimeout(closeIntro, 5000);
    intro.addEventListener("click", closeIntro, { once: true });
  }
} else {
  startTyping();
}

// ---------------------------------------------------
// 3. SCROLL PROGRESS & NAVBAR
// ---------------------------------------------------
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 10);

  if (scrollBar) {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    scrollBar.style.width = pct + "%";
  }
});

// ---------------------------------------------------
// 4. MOBILE MENU
// ---------------------------------------------------
if (navToggle && navMenu) {
  const closeMenu = () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("click", (e) => {
    if (
      navMenu.classList.contains("open") &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720 && navMenu.classList.contains("open")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
      closeMenu();
    }
  });
}

// ---------------------------------------------------
// 5. BACK TO TOP
// ---------------------------------------------------
if (backToTop) {
  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ---------------------------------------------------
// 6. HERO 3D TILT & GLOW
// ---------------------------------------------------
if (hero) {
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    hero.style.setProperty("--my", `${e.clientY - rect.top}px`);
  });
}

if (heroFrame) {
  heroFrame.addEventListener("mousemove", (e) => {
    const rect = heroFrame.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroFrame.style.transform = `perspective(600px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg)`;
  });

  heroFrame.addEventListener("mouseleave", () => {
    heroFrame.style.transform = "";
  });
}

// ---------------------------------------------------
// 7. SCROLL ANIMATIONS
// ---------------------------------------------------
const animateEls = document.querySelectorAll("[data-animate]");

if (animateEls.length) {
  if (prefersReduced) {
    animateEls.forEach((el) => el.classList.add("in-view"));
  } else {
    const animObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    animateEls.forEach((el) => animObserver.observe(el));
  }
}

// ---------------------------------------------------
// 8. ACTIVE NAV INDICATOR
// ---------------------------------------------------
function moveIndicator() {
  if (!navIndicator) return;
  const active = document.querySelector(".nav-links a.active");

  if (!active) {
    navIndicator.classList.remove("visible");
    return;
  }

  const linksRect = document.querySelector(".nav-links").getBoundingClientRect();
  const linkRect = active.getBoundingClientRect();
  const center = linkRect.left - linksRect.left + linkRect.width / 2;

  navIndicator.style.left = `${center}px`;
  navIndicator.classList.add("visible");
}

const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

if (sections.length && navAnchors.length) {
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchors.forEach((a) => {
            a.classList.toggle(
              "active",
              a.getAttribute("href") === `#${entry.target.id}`
            );
          });
          moveIndicator();
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((s) => activeObserver.observe(s));
}

window.addEventListener("resize", moveIndicator);
window.addEventListener("load", moveIndicator);

// ---------------------------------------------------
// 9. TOAST & COPY EMAIL
// ---------------------------------------------------
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
}

if (navCopy) {
  navCopy.addEventListener("click", async () => {
    const email = navCopy.dataset.email;

    try {
      await navigator.clipboard.writeText(email);
      navCopy.classList.add("copied");
      navCopy.textContent = "Copied!";
      showToast(`Copied ${email} to clipboard`);

      setTimeout(() => {
        navCopy.classList.remove("copied");
        navCopy.textContent = "Copy email";
      }, 1500);
    } catch {
      showToast("Couldn't copy — try selecting it manually");
    }
  });
}

if (contactCopy) {
  contactCopy.addEventListener("click", async () => {
    const email = contactCopy.dataset.email;
    const label = contactCopy.querySelector(".contact-copy-label");

    try {
      await navigator.clipboard.writeText(email);
      contactCopy.classList.add("copied");
      if (label) label.textContent = "Copied!";
      showToast(`Copied ${email} to clipboard`);

      setTimeout(() => {
        contactCopy.classList.remove("copied");
        if (label) label.textContent = "Copy email";
      }, 1500);
    } catch {
      showToast("Couldn't copy — try selecting it manually");
    }
  });
}

// ---------------------------------------------------
// 10. PROJECT FILTERS
// ---------------------------------------------------
if (filterBtns.length && projectCards.length) {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      let visible = 0;

      projectCards.forEach((card) => {
        const show = filter === "all" || card.dataset.tech === filter;
        card.classList.toggle("hidden", !show);
        if (show) visible++;
      });

      if (projectEmpty) projectEmpty.hidden = visible > 0;
    });
  });
}

// ---------------------------------------------------
// 11. ABOUT TABS
// ---------------------------------------------------
if (aboutTabs.length && aboutPanels.length) {
  aboutTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      aboutTabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      aboutPanels.forEach((p) => p.classList.remove("active"));

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const target = document.querySelector(
        `.about-panel[data-panel="${tab.dataset.tab}"]`
      );
      if (target) target.classList.add("active");
    });
  });
}

// ---------------------------------------------------
// 12. FOOTER YEAR & LAST UPDATED
// ---------------------------------------------------
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (lastUpdatedEl) {
  if (document.lastModified) {
    lastUpdatedEl.textContent = new Date(document.lastModified).toLocaleDateString(
      "en-US",
      { month: "short", day: "numeric", year: "numeric" }
    );
  }
}

// ---------------------------------------------------
// 13. IMAGE LIGHTBOX
// ---------------------------------------------------
if (lightbox && lightboxImg && lightboxTriggers.length) {
  lightboxTriggers.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
    setTimeout(() => { lightboxImg.src = ""; }, 300);
  };

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}

// ---------------------------------------------------
// 14. COMMAND PALETTE (⌘K / Ctrl+K)
// ---------------------------------------------------
if (cmdTrigger && cmdPalette && cmdInput && cmdList) {
  const openCmd = () => {
    cmdPalette.classList.add("active");
    cmdInput.value = "";
    cmdItems.forEach((item) => (item.style.display = "flex"));
    setTimeout(() => cmdInput.focus(), 100);
    document.body.style.overflow = "hidden";
  };

  const closeCmd = () => {
    cmdPalette.classList.remove("active");
    document.body.style.overflow = "";
  };

  cmdTrigger.addEventListener("click", openCmd);
  cmdBackdrop.addEventListener("click", closeCmd);

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      if (cmdPalette.classList.contains("active")) {
        closeCmd();
      } else {
        openCmd();
      }
    }
    if (e.key === "Escape" && cmdPalette.classList.contains("active")) {
      closeCmd();
    }
  });

  cmdInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    cmdItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? "flex" : "none";
    });
  });

  cmdItems.forEach((item) => {
    item.addEventListener("click", () => {
      const target = item.dataset.target;
      const action = item.dataset.action;

      if (target) {
        const el = document.querySelector(target);
        if (el) {
          closeCmd();
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else if (action === "theme") {
        themeToggle.click();
        closeCmd();
      }
    });
  });
}

// ---------------------------------------------------
// 15. CONTACT FORM SUBMISSION (Web3Forms)
// ---------------------------------------------------
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector(".contact-submit");
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      const data = await res.json();

      if (data.success) {
        showToast("Message sent successfully!");
        contactForm.reset();
      } else {
        showToast("Oops! Something went wrong. Try again.");
      }
    } catch (error) {
      showToast("Couldn't send message. Check your connection.");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ---------------------------------------------------
// 16. RESUME DOWNLOAD ANIMATION (Progress Bar Style)
// ---------------------------------------------------
const resumeBtn = document.getElementById("resume-btn");

if (resumeBtn) {
  const resumeText = resumeBtn.querySelector(".resume-text");
  const progressBar = resumeBtn.querySelector(".resume-progress");
  
  resumeBtn.addEventListener("click", (e) => {
    // If the button is already downloading, do nothing
    if (resumeBtn.classList.contains("downloading")) return;
    
    e.preventDefault(); 
    
    try {
      // 1. Change button state
      resumeBtn.classList.add("downloading");
      if (resumeText) resumeText.textContent = "Downloading...";
      if (progressBar) progressBar.style.width = "0%";
      
      let width = 0;
      
      // 2. Animate the progress bar filling up
      const interval = setInterval(() => {
        width += 10;
        if (progressBar) progressBar.style.width = width + "%";
        
        // 3. When it reaches 100%, trigger the download
        if (width >= 100) {
          clearInterval(interval);
          
          // Trigger download
          const link = document.createElement("a");
          link.href = resumeBtn.getAttribute("href");
          link.target = "_blank";
          link.click();
          
          // 4. Show "Success!" briefly, then reset
          if (resumeText) resumeText.textContent = "Success!";
          if (progressBar) progressBar.style.background = "#4ade80"; // Green
          
          setTimeout(() => {
            resumeBtn.classList.remove("downloading");
            if (resumeText) resumeText.textContent = "Resume";
            if (progressBar) {
              progressBar.style.width = "0%";
              progressBar.style.background = "rgba(255, 255, 255, 0.25)";
            }
          }, 1500);
        }
      }, 30);
    } catch (error) {
      // If anything fails, just open the link normally
      window.open(resumeBtn.getAttribute("href"), "_blank");
    }
  });
}
