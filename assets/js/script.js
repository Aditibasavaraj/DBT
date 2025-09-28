// ScholarConnect shared JS: navbar helpers, checker simulation, quiz scoring

function initChecker() {
    const form = document.getElementById('checker-form');
    if (!form) return;
    const aadhaar = document.getElementById('aadhaar');
    const account = document.getElementById('account');
    const msg = document.getElementById('checker-msg');
    const btn = document.getElementById('checker-btn');
    const spinner = document.getElementById('checker-spinner');
    function setLoading(b) { if (btn && spinner) { btn.disabled = b; spinner.classList.toggle('hidden', !b); } }
    function show(type, text) { if (!msg) return; msg.className = 'mt-2 text-sm'; msg.textContent = text; msg.classList.add(type === 'ok' ? 'text-green-700' : 'text-red-700'); }
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        show('ok', ''); msg.classList.add('hidden');
        const a = (aadhaar?.value || '').replace(/\s+/g, '');
        const acc = (account?.value || '').trim();
        const errors = [];
        if (!/^\d{12}$/.test(a)) errors.push('Aadhaar must be 12 digits.');
        if (!acc) errors.push('Account number is required.');
        if (errors.length) { show('err', errors.join(' ')); msg.classList.remove('hidden'); return; }
        setLoading(true);
        await new Promise(r => setTimeout(r, 900));
        const even = Number(a.slice(-1)) % 2 === 0;
        show(even ? 'ok' : 'err', even ? 'Looks DBT-ready. Confirm with bank/NPCI.' : 'Not DBT-enabled yet. Seed Aadhaar and enable DBT.');
        msg.classList.remove('hidden');
        setLoading(false);
    });
}

function initQuiz() {
    const form = document.getElementById('quiz-form');
    if (!form) return;
    const result = document.getElementById('quiz-result');
    const answers = { q1: 'b', q2: 'b', q3: 'b', q4: 'c', q5: 'b' };
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let score = 0; const total = Object.keys(answers).length; const missing = [];
        for (const [k, v] of Object.entries(answers)) {
            const sel = form.querySelector(`input[name="${k}"]:checked`);
            if (!sel) { missing.push(k.replace('q', '')); continue; }
            if (sel.value === v) score++;
        }
        result.className = 'mt-3 text-sm';
        if (missing.length) { result.textContent = `Please answer: ${missing.join(', ')}`; result.classList.add('text-amber-700'); return; }
        const pct = Math.round(100 * score / total);
        result.textContent = `Score: ${score}/${total} (${pct}%)`;
        result.classList.add(score >= 3 ? 'text-green-700' : 'text-red-700');
    });
}

function initAll() { initChecker(); initQuiz(); }

if (typeof window !== 'undefined') { window.ScholarConnect = { initChecker, initQuiz, initAll }; }


