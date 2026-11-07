const intro = document.getElementById("intro");
const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-links a");
const backToTop = document.querySelector(".back-to-top");
const scrollBar = document.querySelector(".scroll-progress");
const hero = document.querySelector(".hero");
const heroFrame = document.querySelector(".hero-image-frame");
const clockTime = document.getElementById("clock-time");
const clockDate = document.getElementById("clock-date");
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

const NAME = "Johncint F Bagonoc";
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 10);

  if (scrollBar) {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    scrollBar.style.width = pct + "%";
  }
});

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

if (backToTop) {
  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

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

if (clockTime && clockDate) {
  const updateClock = () => {
    const now = new Date();

    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const date = now.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    clockTime.textContent = time;
    clockDate.textContent = date;
  };

  updateClock();
  setInterval(updateClock, 1000);
}

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