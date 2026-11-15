(() => {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const rememberInput = document.getElementById("remember");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const toggleBtn = document.getElementById("togglePassword");
  const submitBtn = document.getElementById("submitBtn");
  const formMessage = document.getElementById("formMessage");

  const EMAIL_KEY = "foodsave_remembered_email";
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Isi ulang email jika sebelumnya dicentang "Ingat saya"
  try {
    const saved = localStorage.getItem(EMAIL_KEY);
    if (saved) {
      emailInput.value = saved;
      rememberInput.checked = true;
    }
  } catch (_) { /* localStorage tidak tersedia */ }

  // Tampilkan / sembunyikan kata sandi
  toggleBtn.addEventListener("click", () => {
    const show = passwordInput.type === "password";
    passwordInput.type = show ? "text" : "password";
    toggleBtn.setAttribute("aria-label", show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi");
    toggleBtn.style.color = show ? "var(--primary)" : "";
  });

  function setError(input, errorEl, message) {
    input.closest(".field").classList.toggle("invalid", Boolean(message));
    errorEl.textContent = message;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (!value) return setError(emailInput, emailError, "Email wajib diisi."), false;
    if (!EMAIL_REGEX.test(value)) return setError(emailInput, emailError, "Format email tidak valid."), false;
    setError(emailInput, emailError, "");
    return true;
  }

  function validatePassword() {
    const value = passwordInput.value;
    if (!value) return setError(passwordInput, passwordError, "Kata sandi wajib diisi."), false;
    if (value.length < 6) return setError(passwordInput, passwordError, "Kata sandi minimal 6 karakter."), false;
    setError(passwordInput, passwordError, "");
    return true;
  }

  emailInput.addEventListener("blur", validateEmail);
  passwordInput.addEventListener("blur", validatePassword);
  emailInput.addEventListener("input", () => emailError.textContent && validateEmail());
  passwordInput.addEventListener("input", () => passwordError.textContent && validatePassword());

  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = "form-message " + (type || "");
  }

  // Ganti fungsi ini dengan panggilan API sungguhan (fetch) ke backend kamu
  function fakeLoginRequest(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password === "gagal123") reject(new Error("Email atau kata sandi salah."));
        else resolve({ name: email.split("@")[0] });
      }, 1200);
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showMessage("");

    const okEmail = validateEmail();
    const okPass = validatePassword();
    if (!okEmail || !okPass) return;

    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    try {
      const user = await fakeLoginRequest(emailInput.value.trim(), passwordInput.value);

      try {
        if (rememberInput.checked) localStorage.setItem(EMAIL_KEY, emailInput.value.trim());
        else localStorage.removeItem(EMAIL_KEY);
      } catch (_) {}

      showMessage("Berhasil masuk! Selamat datang, " + user.name + ".", "success");
      window.location.href = "index.html";
    } catch (err) {
      showMessage(err.message, "fail");
    } finally {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
    }
  });

  // Tombol login sosial (placeholder)
  document.querySelectorAll("[data-provider]").forEach((btn) => {
    btn.addEventListener("click", () => {
      showMessage("Login dengan " + btn.dataset.provider + " belum dihubungkan.", "fail");
    });
  });
})();