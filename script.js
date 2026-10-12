const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }
const balanceEl = document.getElementById('balance');
const statusEl = document.getElementById('status');
async function loadBalance() {
  if (!tg?.initData) {
    statusEl.textContent = 'Haqiqiy balansni ko‘rish uchun Telegram botidan Mini Appni oching.';
    return;
  }
  statusEl.textContent = 'Yuklanmoqda...';
  try {
    const response = await fetch('/api/balance', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({initData: tg.initData}),
      cache: 'no-store'
    });
    if (!response.ok) throw new Error('Hisobni yuklab bo‘lmadi');
    const result = await response.json();
    balanceEl.textContent = new Intl.NumberFormat('uz-UZ').format(result.balance) + ' UZS';
    statusEl.textContent = 'Telegram ID: ' + result.user_id;
  } catch (error) { statusEl.textContent = error.message; }
}
document.getElementById('refresh').addEventListener('click', loadBalance);
document.querySelectorAll('[data-service]').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('info').textContent = button.dataset.service + ' bo‘limi. Xarid funksiyasi keyin qo‘shiladi.';
  });
});
loadBalance();
