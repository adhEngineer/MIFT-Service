const form = document.querySelector("#quoteForm");
const statusEl = document.querySelector("#formStatus");

if (form && statusEl) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const city = String(data.get("city") || "").trim();
    const service = String(data.get("service") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !phone || !city || !service || !message) {
      statusEl.textContent = "Completează câmpurile obligatorii înainte de trimitere.";
      statusEl.style.color = "#b84b2f";
      return;
    }

    statusEl.style.color = "#2f8f5b";
    statusEl.textContent = `Cererea pentru ${service.toLowerCase()} a fost pregătită. Pentru confirmare rapidă, sună la 0742513255.`;
    form.reset();
  });
}

const counters = document.querySelectorAll("[data-count]");

const runCounter = (entry) => {
  const node = entry.target;
  const target = Number(node.dataset.count);
  const start = performance.now();
  const duration = 900;

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.textContent = `${Math.round(target * eased)}+`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounter(entry);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.45 }
  );

  counters.forEach((counter) => observer.observe(counter));
} else {
  counters.forEach((counter) => {
    counter.textContent = `${counter.dataset.count}+`;
  });
}
