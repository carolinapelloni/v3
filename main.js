
(() => {
  // Menu responsive
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";

      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.setAttribute(
        "aria-label",
        isOpen ? "Apri menu" : "Chiudi menu"
      );

      nav.classList.toggle("open", !isOpen);
      toggle.textContent = isOpen ? "☰" : "✕";
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Apri menu");
        toggle.textContent = "☰";
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 650) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
      }
    });
  }

  // Anno automatico nel footer
  document.querySelectorAll("[data-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  // Form contatti: prepara un messaggio nel programma email
  const form = document.querySelector("#contact-form");

  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const data = new FormData(form);

      // SOSTITUISCI con il tuo indirizzo email
      const recipient = "ciao@tuodominio.it";

      const subject =
        `Richiesta dal sito Studio Forma — ${data.get("subject")}`;

      const body = [
        `Nome: ${data.get("name")}`,
        `Email: ${data.get("email")}`,
        `Argomento: ${data.get("subject")}`,
        "",
        "Messaggio:",
        data.get("message")
      ].join("\n");

      const mailto =
        `mailto:${recipient}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;
    });
  }
})();
