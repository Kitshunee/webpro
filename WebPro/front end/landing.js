(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ---------- Navbar: bayangan saat scroll ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  const burger = $("#burger");
  const navLinks = $("#navLinks");

  function setMenu(open) {
    burger.classList.toggle("open", open);
    navLinks.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  }
  burger.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  $$("a", navLinks).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  /* ---------- Penanda menu aktif sesuai section ---------- */
  const sectionLinks = $$('.nav__links a[href^="#"]');
  const sections = sectionLinks
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Animasi muncul saat di-scroll ---------- */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- Hitung naik angka dampak ---------- */
  const fmt = (n, decimals) =>
    n.toLocaleString("id-ID", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  function animateCount(el) {
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = prefix + fmt(target, decimals) + suffix;
      return;
    }

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + fmt(target * eased, decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counters = $$(".count");
  const countObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => countObserver.observe(c));

  /* ---------- Filter kategori makanan ---------- */
  const chips = $$(".chip");
  const foods = $$(".food");
  const emptyState = $("#emptyState");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter;
      chips.forEach((c) => {
        const active = c === chip;
        c.classList.toggle("active", active);
        c.setAttribute("aria-selected", String(active));
      });

      let visible = 0;
      foods.forEach((card) => {
        const show = filter === "all" || card.dataset.category === filter;
        card.hidden = !show;
        if (show) visible++;
      });
      emptyState.hidden = visible > 0;
    });
  });

  /* ---------- Toast ---------- */
  const toast = $("#toast");
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
  }

  /* ---------- Tombol Selamatkan / Ambil Paket ---------- */
  $$("[data-claim]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.done) return;
      const name = btn.dataset.claim;
      btn.dataset.done = "1";
      btn.textContent = "Terpesan ✓";
      btn.disabled = true;
      btn.style.opacity = ".75";
      showToast("“" + name + "” berhasil dipesan. Cek jam ambilnya ya!");
      // Untuk versi nyata: arahkan ke login/checkout, misalnya
      // window.location.href = "login.html";
    });
  });

  /* ---------- Form notifikasi ---------- */
  const notifyForm = $("#notifyForm");
  const notifyInput = $("#notifyLocation");
  const notifyMsg = $("#notifyMsg");

  notifyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = notifyInput.value.trim();

    notifyMsg.classList.remove("ok", "err");
    if (value.length < 3) {
      notifyInput.classList.add("invalid");
      notifyMsg.textContent = "Masukkan kode pos atau nama kotamu (minimal 3 karakter).";
      notifyMsg.classList.add("err");
      notifyInput.focus();
      return;
    }

    notifyInput.classList.remove("invalid");
    notifyMsg.textContent = "Siap! Kami akan mengabari saat ada surplus di sekitar " + value + ".";
    notifyMsg.classList.add("ok");
    notifyForm.reset();
  });

  notifyInput.addEventListener("input", () => notifyInput.classList.remove("invalid"));
})();