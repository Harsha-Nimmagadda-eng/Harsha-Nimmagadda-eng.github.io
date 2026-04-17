(function () {
  const fallbackSections = [{
    id: "education",
    title: "Education",
    items: ["Add your education details here."]
  }, {
    id: "experience",
    title: "Experience",
    items: ["Add your experience details here."]
  }, {
    id: "publications",
    title: "Publications",
    items: ["Add your publication details here."]
  }, {
    id: "awards",
    title: "Awards",
    items: ["Add your award details here."]
  }, {
    id: "skills",
    title: "Skills",
    items: ["Add your skills here."]
  }];

  const navItems = [{ name: "Work", href: "#work" }, {
    name: "Education",
    href: "#education"
  }, {
    name: "Experience",
    href: "#experience"
  }, {
    name: "Publications",
    href: "#publications"
  }, {
    name: "Awards",
    href: "#awards"
  }, {
    name: "Skills",
    href: "#skills"
  }];

  function getSections() {
    if (Array.isArray(window.__PROFILE_SECTIONS__) && window.__PROFILE_SECTIONS__.length) {
      return window.__PROFILE_SECTIONS__;
    }
    return fallbackSections;
  }

  function ensureWorkAnchor() {
    const allSections = document.querySelectorAll("section");
    allSections.forEach((section) => {
      const heading = section.querySelector(".head-text");
      if (heading && heading.textContent && heading.textContent.trim() === "My Selected Work") {
        section.id = "work";
      }
    });
  }

  function createProfileSection() {
    if (document.getElementById("education")) return null;

    const section = document.createElement("section");
    section.className = "c-space my-20 hover-target";

    const grid = document.createElement("div");
    grid.className = "grid grid-cols-1 md:grid-cols-2 gap-5 h-full";

    getSections().forEach((item) => {
      const card = document.createElement("div");
      card.id = item.id;
      card.className = "grid-container scroll-mt-24";

      const title = document.createElement("p");
      title.className = "grid-headtext";
      title.textContent = item.title;

      const body = document.createElement("div");
      body.className = "mt-3 space-y-3";

      const lines = Array.isArray(item.items) ? item.items : [];
      lines.forEach((line) => {
        const p = document.createElement("p");
        p.className = "grid-subtext";
        p.textContent = line;
        body.appendChild(p);
      });

      card.appendChild(title);
      card.appendChild(body);
      grid.appendChild(card);
    });

    section.appendChild(grid);
    return section;
  }

  function ensureNavItems() {
    const navLists = document.querySelectorAll(".nav-ul");

    navLists.forEach((ul) => {
      navItems.forEach((item) => {
        const exists = Array.from(ul.querySelectorAll("a.nav-li_a")).some((a) => a.getAttribute("href") === item.href);
        if (exists) return;

        const li = document.createElement("li");
        li.className = "nav-li";

        const a = document.createElement("a");
        a.href = item.href;
        a.className = "nav-li_a";
        a.textContent = item.name;

        li.appendChild(a);
        ul.insertBefore(li, ul.lastElementChild);
      });
    });
  }

  function inject() {
    const main = document.querySelector("main");
    const contact = document.getElementById("contact");
    if (!main || !contact) return false;

    ensureWorkAnchor();

    const profileSection = createProfileSection();
    if (profileSection) {
      main.insertBefore(profileSection, contact);
    }

    ensureNavItems();
    return true;
  }

  let tries = 0;
  const timer = setInterval(() => {
    tries += 1;
    if (inject() || tries > 30) {
      clearInterval(timer);
    }
  }, 300);
})();
