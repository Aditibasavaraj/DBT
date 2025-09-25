// Shared JS: FAQ accordion, verification form simulation, quiz scoring, dashboard chart demo

// Initialize FAQ accordions
function initFaqAccordions() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach((item) => {
        const button = item.querySelector('button');
        const content = item.querySelector('[role="region"]');
        if (!button || !content) return;

        function setExpanded(expanded) {
            button.setAttribute('aria-expanded', String(expanded));
            content.classList.toggle('hidden', !expanded);
            const icon = button.querySelector('svg');
            if (icon) {
                icon.style.transform = expanded ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        }

        setExpanded(false);
        button.addEventListener('click', () => {
            const isOpen = button.getAttribute('aria-expanded') === 'true';
            setExpanded(!isOpen);
        });
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); button.click(); }
        });
    });
}

// Verification form: simulate /check-dbt-status
function initVerificationForm() {
    const form = document.getElementById('verification-form');
    if (!form) return;
    const nameInput = document.getElementById('name');
    const aadhaarInput = document.getElementById('aadhaar');
    const accountInput = document.getElementById('account');
    const button = document.getElementById('verify-btn');
    const spinner = document.getElementById('verify-spinner');
    const message = document.getElementById('verify-message');

    function setLoading(isLoading) {
        if (button) button.disabled = isLoading;
        if (spinner) spinner.classList.toggle('hidden', !isLoading);
    }
    function showMessage(text, type) {
        if (!message) return;
        message.textContent = text;
        message.className = 'mt-2 text-sm';
        if (type === 'success') message.classList.add('text-green-700');
        else if (type === 'error') message.classList.add('text-red-700');
        else message.classList.add('text-slate-700');
        message.classList.remove('hidden');
    }
    function validateInputs() {
        const errors = [];
        if (!nameInput.value.trim()) errors.push('Name is required.');
        const aadhaar = aadhaarInput.value.replace(/\s+/g, '');
        if (!/^\d{12}$/.test(aadhaar)) errors.push('Aadhaar must be 12 digits.');
        if (!accountInput.value.trim()) errors.push('Bank account number is required.');
        return errors;
    }
    async function simulateCheckDbtStatus(payload) {
        await new Promise((r) => setTimeout(r, 1000));
        const lastDigit = Number(String(payload.aadhaar).slice(-1));
        const dbtReady = !Number.isNaN(lastDigit) && lastDigit % 2 === 0;
        return { dbtReady };
    }
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (message) message.classList.add('hidden');
        const errors = validateInputs();
        if (errors.length) { showMessage(errors.join(' '), 'error'); return; }
        setLoading(true);
        try {
            const payload = {
                name: nameInput.value.trim(),
                aadhaar: aadhaarInput.value.replace(/\s+/g, ''),
                account: accountInput.value.trim(),
            };
            const result = await simulateCheckDbtStatus(payload);
            if (result.dbtReady) showMessage('Great! Your details look DBT-ready. Confirm with your bank/NPCI for official status.', 'success');
            else showMessage('DBT may not be enabled yet. Ask your bank to seed Aadhaar and enable DBT in NPCI.', 'error');
        } catch {
            showMessage('Something went wrong. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    });
}

// Quiz scoring
function initQuiz() {
    const form = document.getElementById('dbt-quiz');
    if (!form) return;
    const resultEl = document.getElementById('quiz-result');
    const resetBtn = document.getElementById('quiz-reset');
    const answers = { q1: 'b', q2: 'b', q3: 'b', q4: 'c', q5: 'b' };
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let score = 0; const unanswered = [];
        Object.keys(answers).forEach((key, idx) => {
            const selected = form.querySelector(`input[name="${key}"]:checked`);
            if (!selected) { unanswered.push(idx + 1); return; }
            if (selected.value === answers[key]) score += 1;
        });
        if (!resultEl) return;
        resultEl.className = 'text-sm mt-2';
        resultEl.classList.remove('hidden');
        if (unanswered.length) { resultEl.classList.add('text-amber-700'); resultEl.textContent = `Please answer question(s): ${unanswered.join(', ')}.`; return; }
        const total = Object.keys(answers).length; const percent = Math.round((score / total) * 100);
        if (score === total) { resultEl.classList.add('text-green-700'); resultEl.textContent = `Perfect! You scored ${score}/${total} (${percent}%).`; }
        else if (score >= 3) { resultEl.classList.add('text-blue-700'); resultEl.textContent = `Good job! You scored ${score}/${total} (${percent}%). Review the sections to improve.`; }
        else { resultEl.classList.add('text-red-700'); resultEl.textContent = `You scored ${score}/${total} (${percent}%). Revisit the differences and try again.`; }
    });
    if (resetBtn) {
        resetBtn.addEventListener('click', () => { form.reset(); if (resultEl) resultEl.classList.add('hidden'); });
    }
}

// Dashboard charts using Chart.js (if present)
function initDashboardCharts() {
    if (typeof Chart === 'undefined') return;
    const ctx = document.getElementById('benefitsChart');
    if (!ctx) return;
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{ label: 'DBT Disbursed (₹ lakhs)', data: [12, 19, 15, 22, 28, 31], backgroundColor: 'rgba(99, 102, 241, 0.35)', borderColor: 'rgba(99, 102, 241, 1)', borderWidth: 2 }]
    };
    new Chart(ctx, { type: 'line', data, options: { responsive: true, plugins: { legend: { display: true } }, scales: { y: { beginAtZero: true } } } });
}

// Auto-init helpers (optional)
function initAll() {
    initFaqAccordions();
    initVerificationForm();
    initQuiz();
    initDashboardCharts();
}

// Expose globals
if (typeof window !== 'undefined') {
    window.DBT = { initFaqAccordions, initVerificationForm, initQuiz, initDashboardCharts, initAll };
}


// Quotes rotator for dashboard
function initQuotesRotator() {
    const container = document.getElementById('quotes-rotator');
    const textEl = document.getElementById('quotes-text');
    const dotsEl = document.getElementById('quotes-dots');
    if (!container || !textEl || !dotsEl) return;
    const quotes = [
        'Education is the most powerful weapon you can use to change the world.',
        'Believe in yourself, you are capable of amazing things.',
        'Small steps every day lead to big achievements.',
        'Knowledge empowers, awareness transforms.'
    ];
    let idx = 0; let timer = null;
    function renderDots(active) {
        dotsEl.innerHTML = '';
        quotes.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'h-2 w-2 rounded-full ' + (i === active ? 'bg-primary-600' : 'bg-slate-300');
            dotsEl.appendChild(dot);
        });
    }
    function show(i) {
        textEl.style.opacity = '0';
        setTimeout(() => {
            textEl.textContent = quotes[i];
            renderDots(i);
            textEl.style.opacity = '1';
        }, 200);
    }
    function start() {
        show(idx);
        timer = setInterval(() => { idx = (idx + 1) % quotes.length; show(idx); }, 4500);
    }
    container.addEventListener('mouseenter', () => { if (timer) { clearInterval(timer); timer = null; } });
    container.addEventListener('mouseleave', () => { if (!timer) start(); });
    start();
}

if (typeof window !== 'undefined') {
    window.DBT = Object.assign(window.DBT || {}, { initQuotesRotator });
}

