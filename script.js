const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const form = document.querySelector('#templeForm');
const frame = document.querySelector('#submitFrame');
const submitButton = document.querySelector('#submitButton');
const status = document.querySelector('#formStatus');

document.querySelector('#year').textContent = new Date().getFullYear();

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

let submitting = false;
let submittedAt = 0;

form?.addEventListener('submit', () => {
  submitting = true;
  submittedAt = Date.now();
  submitButton.disabled = true;
  submitButton.textContent = '資料送出中…';
  status.className = 'form-status';
  status.textContent = '正在安全送出資料，請勿重複點擊。';

  window.setTimeout(() => {
    if (!submitting) return;
    submitting = false;
    submitButton.disabled = false;
    submitButton.textContent = '重新送出';
    status.className = 'form-status error';
    status.textContent = '尚未收到送出確認，請檢查網路後重試，或致電 04-25896101。';
  }, 12000);
});

frame?.addEventListener('load', () => {
  if (!submitting || Date.now() - submittedAt < 400) return;
  submitting = false;
  submitButton.disabled = false;
  submitButton.textContent = '送出資料';
  status.className = 'form-status success';
  status.textContent = '資料已成功送出，妙玄宮將依填寫內容與您聯絡。';
  form.reset();
  status.scrollIntoView({ behavior: 'smooth', block: 'center' });
});