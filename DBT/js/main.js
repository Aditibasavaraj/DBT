function initVerificationForm() {
    const form = document.getElementById('verification-form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const aadhaarInput = document.getElementById('aadhaar');
    const accountInput = document.getElementById('account');
    const ifscInput = document.getElementById('ifsc');
    const button = document.getElementById('verify-btn');
    const spinner = document.getElementById('verify-spinner');
    const message = document.getElementById('verify-message');

    function setLoading(isLoading) {
        button.disabled = isLoading;
        spinner.classList.toggle('hidden', !isLoading);
    }

    function showMessage(text, type) {
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
        if (!emailInput.value.trim()) errors.push('Email is required.');
        if (!phoneInput.value.trim()) errors.push('Phone is required.');
        const aadhaar = aadhaarInput.value.replace(/\s+/g, '');
        if (!/^\d{12}$/.test(aadhaar)) errors.push('Aadhaar must be 12 digits.');
        if (!accountInput.value.trim()) errors.push('Bank account number is required.');
        if (!ifscInput.value.trim()) errors.push('IFSC is required.');
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
        message.classList.add('hidden');
        const errors = validateInputs();
        if (errors.length) { showMessage(errors.join(' '), 'error'); return; }
        setLoading(true);

        try {
            const payload = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                aadhaar: aadhaarInput.value.replace(/\s+/g, ''),
                bankAccount: accountInput.value.trim(),
                ifsc: ifscInput.value.trim(),
            };

            // 🔹 Replace this with actual fetch to your backend later
            const result = await simulateCheckDbtStatus(payload);

            if (result.dbtReady) {
                showMessage('Great! Your details look DBT-ready. Confirm with your bank/NPCI for official status.', 'success');
            } else {
                showMessage('DBT may not be enabled yet. Ask your bank to seed Aadhaar and enable DBT in NPCI.', 'error');
            }
        } catch {
            showMessage('Something went wrong. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    });
}
