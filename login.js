// =============================================
//  NutriGuiide — Login Page JS
//  Email + Phone OTP validation & simulation
// =============================================

'use strict';

/* =========================================
   GLOBALS
   ========================================= */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;  // Indian mobile: starts 6-9, 10 digits

const PW_RULES = {
  minLen: /.{8,}/,
  number: /[0-9]/,
  special: /[!@#$%^&*()\-_=+\[\]{};:'",.<>?\/\\|`~]/,
};

// Simulated correct OTP for demo (always 4 5 6 7 8 9 → "456789")
const DEMO_OTP = '456789';

let currentTab = 'email';
let otpInterval = null;  // countdown timer reference

/* =========================================
   TAB SWITCHING
   ========================================= */
function switchTab(tab) {
  currentTab = tab;
  document.getElementById('tab-email').classList.toggle('active', tab === 'email');
  document.getElementById('tab-phone').classList.toggle('active', tab === 'phone');
  document.getElementById('panel-email').classList.toggle('active', tab === 'email');
  document.getElementById('panel-phone').classList.toggle('active', tab === 'phone');
  hideAlert();
}

/* =========================================
   ALERT HELPERS
   ========================================= */
function showAlert(msg, type = 'error') {
  const el = document.getElementById('formAlert');
  const txt = document.getElementById('alertText');
  txt.textContent = msg;
  el.classList.add('show');
  if (type === 'info') {
    el.style.background = 'rgba(78,205,196,0.08)';
    el.style.color = 'var(--mint-dark)';
    el.style.borderColor = 'rgba(78,205,196,0.25)';
  } else {
    el.style.background = '';
    el.style.color = '';
    el.style.borderColor = '';
  }
}

function hideAlert() {
  document.getElementById('formAlert').classList.remove('show');
}

/* =========================================
   FIELD HELPERS
   ========================================= */
function setFieldValid(input, errEl, succEl) {
  input.classList.remove('error');
  input.classList.add('valid');
  errEl?.classList.remove('show');
  succEl?.classList.add('show');
}

function setFieldError(input, errEl, succEl, msgEl, msg) {
  input.classList.remove('valid');
  input.classList.add('error');
  if (msgEl && msg) msgEl.textContent = msg;
  errEl?.classList.add('show');
  succEl?.classList.remove('show');
}

function clearField(input, errEl, succEl) {
  input.classList.remove('error', 'valid');
  errEl?.classList.remove('show');
  succEl?.classList.remove('show');
}

/* =========================================
   EMAIL VALIDATION
   ========================================= */
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const emailErrText = document.getElementById('emailErrorText');
const emailSuccess = document.getElementById('emailSuccess');

function validateEmail(blur = false) {
  const val = emailInput.value.trim();
  if (val === '') {
    if (blur) setFieldError(emailInput, emailError, emailSuccess, emailErrText, 'Email address is required.');
    else clearField(emailInput, emailError, emailSuccess);
    return false;
  }
  if (!EMAIL_REGEX.test(val)) {
    setFieldError(emailInput, emailError, emailSuccess, emailErrText, 'Please enter a valid email (e.g. you@example.com).');
    return false;
  }
  setFieldValid(emailInput, emailError, emailSuccess);
  return true;
}

emailInput.addEventListener('input', () => { hideAlert(); validateEmail(false); });
emailInput.addEventListener('blur', () => validateEmail(true));

/* =========================================
   PASSWORD VALIDATION
   ========================================= */
const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('passwordError');
const passwordErrText = document.getElementById('passwordErrorText');
const passwordSuccess = document.getElementById('passwordSuccess');
const pwRequirements = document.getElementById('pwRequirements');
const reqLen = document.getElementById('req-len');
const reqNum = document.getElementById('req-num');
const reqSpecial = document.getElementById('req-special');
const togglePwBtn = document.getElementById('togglePw');

function checkPwRules(val) {
  return {
    minLen: PW_RULES.minLen.test(val),
    number: PW_RULES.number.test(val),
    special: PW_RULES.special.test(val),
  };
}

function updatePwUI(checks) {
  reqLen.classList.toggle('met', checks.minLen);
  reqNum.classList.toggle('met', checks.number);
  reqSpecial.classList.toggle('met', checks.special);
}

function validatePassword(blur = false) {
  const val = passwordInput.value;
  if (val === '') {
    if (blur) setFieldError(passwordInput, passwordError, passwordSuccess, passwordErrText, 'Password is required.');
    else clearField(passwordInput, passwordError, passwordSuccess);
    pwRequirements.classList.remove('show');
    return false;
  }
  const checks = checkPwRules(val);
  updatePwUI(checks);
  const ok = checks.minLen && checks.number && checks.special;
  if (!ok) {
    const failed = [];
    if (!checks.minLen) failed.push('8+ characters');
    if (!checks.number) failed.push('a number');
    if (!checks.special) failed.push('a special character (!@#$%^&*)');
    setFieldError(passwordInput, passwordError, passwordSuccess, passwordErrText,
      `Password needs: ${failed.join(', ')}.`);
    return false;
  }
  setFieldValid(passwordInput, passwordError, passwordSuccess);
  return true;
}

passwordInput.addEventListener('focus', () => pwRequirements.classList.add('show'));
passwordInput.addEventListener('input', () => {
  hideAlert();
  validatePassword(false);
  updatePwUI(checkPwRules(passwordInput.value));
});
passwordInput.addEventListener('blur', () => {
  validatePassword(true);
  if (!passwordInput.value) pwRequirements.classList.remove('show');
});

togglePwBtn?.addEventListener('click', () => {
  const show = passwordInput.type === 'password';
  passwordInput.type = show ? 'text' : 'password';
  togglePwBtn.textContent = show ? '🙈' : '👁️';
});

/* =========================================
   SUCCESS OVERLAY
   ========================================= */
function showSuccessOverlay() {
  document.getElementById('successOverlay').classList.add('show');
  requestAnimationFrame(() => {
    setTimeout(() => { document.getElementById('redirectProgress').style.width = '100%'; }, 80);
  });
  let secs = 3;
  const lbl = document.getElementById('redirectLabel');
  lbl.textContent = `Redirecting to dashboard in ${secs}s...`;
  const cd = setInterval(() => {
    secs--;
    if (secs <= 0) {
      clearInterval(cd);
      lbl.textContent = 'Loading your dashboard...';
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 400);
    } else {
      lbl.textContent = `Redirecting to dashboard in ${secs}s...`;
    }
  }, 1000);
}

/* =========================================
   AUTH SIMULATION (Email)
   ========================================= */
function simulateAuth(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ok = EMAIL_REGEX.test(email) &&
        checkPwRules(password).minLen &&
        checkPwRules(password).number &&
        checkPwRules(password).special;
      if (ok) resolve({ email });
      else reject(new Error('Incorrect email or password. Please try again.'));
    }, 1800);
  });
}

/* =========================================
   EMAIL FORM SUBMIT
   ========================================= */
const loginFormEmail = document.getElementById('loginFormEmail');
const submitBtnEmail = document.getElementById('submitBtnEmail');
const spinnerEmail = document.getElementById('spinnerEmail');
const submitTextEmail = document.getElementById('submitTextEmail');

loginFormEmail.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideAlert();
  const emailOk = validateEmail(true);
  const passwordOk = validatePassword(true);
  if (!emailOk || !passwordOk) { shakeBtn(submitBtnEmail); return; }

  // Loading
  submitBtnEmail.disabled = true;
  spinnerEmail.style.display = 'block';
  submitTextEmail.textContent = 'Verifying...';

  try {
    const result = await simulateAuth(emailInput.value.trim(), passwordInput.value);
    submitTextEmail.textContent = '✓ Verified!';
    spinnerEmail.style.display = 'none';
    sessionStorage.setItem('nzUser', JSON.stringify({ email: result.email }));
    setTimeout(showSuccessOverlay, 300);
  } catch (err) {
    submitBtnEmail.disabled = false;
    spinnerEmail.style.display = 'none';
    submitTextEmail.textContent = 'Sign In';
    showAlert(err.message);
    shakeBtn(submitBtnEmail);
  }
});

/* =========================================
   PHONE VALIDATION
   ========================================= */
const phoneInput = document.getElementById('phoneNumber');
const phoneError = document.getElementById('phoneError');
const phoneErrText = document.getElementById('phoneErrorText');
const phoneSuccess = document.getElementById('phoneSuccess');

function validatePhone(blur = false) {
  const val = phoneInput.value.trim().replace(/\s/g, '');
  if (val === '') {
    if (blur) setFieldError(phoneInput, phoneError, phoneSuccess, phoneErrText, 'Mobile number is required.');
    else clearField(phoneInput, phoneError, phoneSuccess);
    return false;
  }
  if (!PHONE_REGEX.test(val)) {
    setFieldError(phoneInput, phoneError, phoneSuccess, phoneErrText,
      'Enter a valid 10-digit Indian mobile number (starting with 6–9).');
    return false;
  }
  setFieldValid(phoneInput, phoneError, phoneSuccess);
  return true;
}

phoneInput.addEventListener('input', () => {
  hideAlert();
  // Allow only digits
  phoneInput.value = phoneInput.value.replace(/\D/g, '');
  validatePhone(false);
});
phoneInput.addEventListener('blur', () => validatePhone(true));

/* =========================================
   SEND OTP
   ========================================= */
const sendOtpBtn = document.getElementById('sendOtpBtn');
const spinnerOtp = document.getElementById('spinnerOtp');
const sendOtpText = document.getElementById('sendOtpText');

sendOtpBtn.addEventListener('click', async () => {
  hideAlert();
  if (!validatePhone(true)) { shakeBtn(sendOtpBtn); return; }

  sendOtpBtn.disabled = true;
  spinnerOtp.style.display = 'block';
  sendOtpText.textContent = 'Sending...';

  // Simulate SMS send latency (1.2s)
  await delay(1200);

  spinnerOtp.style.display = 'none';
  sendOtpText.textContent = 'OTP Sent ✓';

  // Show OTP step
  const num = phoneInput.value.trim();
  document.getElementById('otpSentTo').textContent =
    `+91 ${num.slice(0, 5)} ${num.slice(5)}`;
  document.getElementById('phoneStep1').style.display = 'none';
  document.getElementById('phoneStep2').classList.add('show');

  // Focus first OTP box
  otpBoxes[0].focus();
  startOtpTimer(30);

  // Show demo hint
  showAlert(`Demo: your OTP is ${DEMO_OTP}`, 'info');
});

/* =========================================
   OTP BOX LOGIC
   ========================================= */
const otpBoxes = Array.from(document.querySelectorAll('.otp-box'));

otpBoxes.forEach((box, i) => {
  box.addEventListener('input', (e) => {
    const val = e.target.value.replace(/\D/g, '');
    e.target.value = val ? val[val.length - 1] : ''; // keep last digit
    box.classList.toggle('filled', !!e.target.value);
    document.getElementById('otpError').classList.remove('show');
    if (e.target.value && i < otpBoxes.length - 1) otpBoxes[i + 1].focus();
  });

  box.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !box.value && i > 0) {
      otpBoxes[i - 1].focus();
      otpBoxes[i - 1].value = '';
      otpBoxes[i - 1].classList.remove('filled');
    }
    // Allow paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) return;
  });

  // Handle paste on first box
  box.addEventListener('paste', (e) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
    paste.split('').slice(0, 6).forEach((ch, idx) => {
      if (otpBoxes[idx]) {
        otpBoxes[idx].value = ch;
        otpBoxes[idx].classList.add('filled');
      }
    });
    otpBoxes[Math.min(paste.length, 5)].focus();
  });
});

function getEnteredOtp() {
  return otpBoxes.map(b => b.value).join('');
}

/* =========================================
   OTP TIMER
   ========================================= */
function startOtpTimer(seconds) {
  clearInterval(otpInterval);
  document.getElementById('otpTimerWrap').style.display = 'block';
  document.getElementById('resendWrap').style.display = 'none';

  let remaining = seconds;
  document.getElementById('otpTimerNum').textContent = remaining;

  otpInterval = setInterval(() => {
    remaining--;
    document.getElementById('otpTimerNum').textContent = remaining;
    if (remaining <= 0) {
      clearInterval(otpInterval);
      document.getElementById('otpTimerWrap').style.display = 'none';
      document.getElementById('resendWrap').style.display = 'block';
    }
  }, 1000);
}

// Resend
document.getElementById('resendLink')?.addEventListener('click', async () => {
  otpBoxes.forEach(b => { b.value = ''; b.classList.remove('filled'); });
  document.getElementById('otpError').classList.remove('show');
  showAlert(`New OTP sent! Demo OTP: ${DEMO_OTP}`, 'info');
  startOtpTimer(30);
  otpBoxes[0].focus();
});

/* =========================================
   VERIFY OTP
   ========================================= */
const verifyOtpBtn = document.getElementById('verifyOtpBtn');
const spinnerVerify = document.getElementById('spinnerVerify');
const verifyOtpText = document.getElementById('verifyOtpText');
const otpError = document.getElementById('otpError');
const otpErrText = document.getElementById('otpErrorText');

verifyOtpBtn.addEventListener('click', async () => {
  hideAlert();
  const entered = getEnteredOtp();

  if (entered.length < 6) {
    otpError.classList.add('show');
    otpErrText.textContent = 'Please enter all 6 digits of the OTP.';
    shakeEl(document.querySelector('.otp-boxes'));
    return;
  }

  verifyOtpBtn.disabled = true;
  spinnerVerify.style.display = 'block';
  verifyOtpText.textContent = 'Verifying...';

  await delay(1400);

  if (entered === DEMO_OTP) {
    verifyOtpText.textContent = '✓ Verified!';
    spinnerVerify.style.display = 'none';
    const phone = phoneInput.value.trim();
    sessionStorage.setItem('nzUser', JSON.stringify({ phone }));
    setTimeout(showSuccessOverlay, 300);
  } else {
    verifyOtpBtn.disabled = false;
    spinnerVerify.style.display = 'none';
    verifyOtpText.textContent = 'Verify & Sign In';
    otpError.classList.add('show');
    otpErrText.textContent = `Incorrect OTP. (Demo: use ${DEMO_OTP})`;
    otpBoxes.forEach(b => b.classList.add('error'));
    setTimeout(() => otpBoxes.forEach(b => b.classList.remove('error')), 1500);
    shakeEl(document.querySelector('.otp-boxes'));
  }
});

/* =========================================
   BACK TO PHONE
   ========================================= */
function backToPhone() {
  document.getElementById('phoneStep1').style.display = '';
  document.getElementById('phoneStep2').classList.remove('show');
  otpBoxes.forEach(b => { b.value = ''; b.classList.remove('filled'); });
  clearInterval(otpInterval);
  hideAlert();
}

/* =========================================
   SOCIAL BUTTONS (Demo)
   ========================================= */
document.querySelectorAll('.btn-social').forEach(btn => {
  btn.addEventListener('click', () => {
    const provider = btn.dataset.provider || btn.textContent.trim().split(' ')[1];
    showAlert(`${provider} sign-in is not enabled in this demo. Use email or phone.`, 'info');
  });
});

/* =========================================
   UTILITIES
   ========================================= */
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

function shakeBtn(btn) {
  const moves = [-5, 5, -4, 4, 0];
  moves.forEach((x, i) => {
    setTimeout(() => btn.style.transform = `translateX(${x}px)`, i * 60);
  });
}

function shakeEl(el) {
  if (!el) return;
  const moves = [-5, 5, -4, 4, 0];
  moves.forEach((x, i) => {
    setTimeout(() => el.style.transform = `translateX(${x}px)`, i * 60);
  });
}
