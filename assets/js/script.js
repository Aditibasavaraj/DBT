// assets/js/script.js

// -----------------------------------------------------------------------------
// ScholarConnect Common Utilities (from your first code block)
// -----------------------------------------------------------------------------

function initChecker() {
    const form = document.getElementById('checker-form');
    if (!form) return;
    const aadhaar = document.getElementById('aadhaar');
    const account = document.getElementById('account');
    const msg = document.getElementById('checker-msg');
    const btn = document.getElementById('checker-btn');
    const spinner = document.getElementById('checker-spinner');

    function setLoading(b) {
        if (btn && spinner) {
            btn.disabled = b;
            spinner.classList.toggle('hidden', !b);
        }
    }

    function show(type, text) {
        if (!msg) return;
        msg.className = 'mt-2 text-sm'; // Reset classes
        msg.textContent = text;
        msg.classList.add(type === 'ok' ? 'text-green-700' : 'text-red-700');
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Clear previous messages and hide initially
        msg.textContent = '';
        msg.className = 'mt-2 text-sm hidden';

        const a = (aadhaar?.value || '').replace(/\s+/g, '');
        const acc = (account?.value || '').trim();
        const errors = [];
        if (!/^\d{12}$/.test(a)) errors.push('Aadhaar must be 12 digits.');
        if (!acc) errors.push('Account number is required.');

        if (errors.length) {
            show('err', errors.join(' '));
            msg.classList.remove('hidden');
            return;
        }

        setLoading(true);
        await new Promise(r => setTimeout(r, 900)); // Simulate API call delay

        const even = Number(a.slice(-1)) % 2 === 0; // Simple simulation for DBT status
        show(even ? 'ok' : 'err', even ? 'Looks DBT-ready. Confirm with bank/NPCI.' : 'Not DBT-enabled yet. Seed Aadhaar and enable DBT.');
        msg.classList.remove('hidden');
        setLoading(false);
    });
}


// -----------------------------------------------------------------------------
// Dynamic Quiz Logic (from your second code block, integrated)
// -----------------------------------------------------------------------------

const quizData = {
  student: {
    title: "Aadhaar / DBT Basics for Students",
    questions: [
      {
        question: "1) Aadhaar-linked account primarily means:",
        options: {
          a: "Enabled for DBT in NPCI",
          b: "Aadhaar present for identity/eKYC",
          c: "Guaranteed scholarship transfer",
        },
        answer: "a",
      },
      {
        question: "2) DBT-enabled Aadhaar-seeded account implies:",
        options: {
          a: "Generic Aadhaar link only",
          b: "Aadhaar seeded + APBS enabled",
          c: "UPI-only feature",
        },
        answer: "b",
      },
      {
        question: "3) To reliably receive DBT, you should have:",
        options: {
          a: "Just Aadhaar-linked account",
          b: "DBT-enabled Aadhaar-seeded account",
          c: "Cash disbursement",
        },
        answer: "b",
      },
      {
        question: "4) Aadhaar-based DBT uses:",
        options: {
          a: "NEFT",
          b: "RTGS",
          c: "NPCI APBS",
        },
        answer: "c",
      },
      {
        question: "5) If DBT fails, first verify:",
        options: {
          a: "Nothing; it will resend",
          b: "Aadhaar seeded + DBT-enabled in NPCI",
          c: "Close account",
        },
        answer: "b",
      },
    ],
  },
  admin: {
    title: "Administrative DBT / Scholarship Management Quiz",
    questions: [
      {
        question: "1) The primary role of an Admin in ScholarConnect is:",
        options: {
          a: "Directly approve scholarships",
          b: "Manage user accounts and scholarship listings",
          c: "Answer student queries only",
        },
        answer: "b",
      },
      {
        question: "2) What does APBS stand for?",
        options: {
          a: "Aadhaar Payment Bank System",
          b: "Aadhaar Payment Bridge System",
          c: "Automated Payment Banking System",
        },
        answer: "b",
      },
      {
        question: "3) Which document is crucial for linking bank accounts for DBT?",
        options: {
          a: "Passport",
          b: "Driver's License",
          c: "Aadhaar Card",
        },
        answer: "c",
      },
      {
        question: "4) What is a common reason for DBT transaction failure?",
        options: {
          a: "Bank account is too old",
          b: "Aadhaar not seeded or not DBT-enabled in NPCI mapper",
          c: "Student used a different color pen on application",
        },
        answer: "b",
      },
      {
        question: "5) How can an admin verify a student's DBT status?",
        options: {
          a: "By calling the student's bank directly",
          b: "Through an NPCI mapper lookup tool (if available and authorized)",
          c: "It's not possible for an admin to verify",
        },
        answer: "b",
      },
    ],
  },
  guest: {
    title: "General Knowledge Quiz on Scholarships",
    questions: [
      {
        question: "1) What is a scholarship?",
        options: {
          a: "A loan that must be repaid",
          b: "Financial aid awarded to students, not to be repaid",
          c: "A payment for tuition only",
        },
        answer: "b",
      },
      {
        question: "2) Who typically offers scholarships?",
        options: {
          a: "Governments, universities, private organizations",
          b: "Only rich individuals",
          c: "Only banks",
        },
        answer: "a",
      },
      {
        question: "3) What is Aadhaar primarily used for in India?",
        options: {
          a: "Shopping online",
          b: "Identity verification and government services",
          c: "International travel",
        },
        answer: "b",
      },
    ],
  },
};

// Function to simulate getting the current user's role
function getCurrentUserRole() {
  const urlParams = new URLSearchParams(window.location.search);
  const role = urlParams.get('role');
  if (role && quizData[role]) {
    return role;
  }
  return 'student'; // Default to 'student'
}

function renderQuiz(role) {
  const quizSection = quizData[role];
  if (!quizSection) {
    const quizTitleElem = document.getElementById("quiz-title");
    if (quizTitleElem) quizTitleElem.textContent = "Quiz Not Found";
    const questionsContainer = document.getElementById("quiz-questions-container");
    if (questionsContainer) questionsContainer.innerHTML = "<p>No quiz defined for this role.</p>";
    const submitBtn = document.querySelector("#quiz-form button[type='submit']");
    if (submitBtn) submitBtn.style.display = 'none';
    return;
  }

  const quizTitleElem = document.getElementById("quiz-title");
  if (quizTitleElem) quizTitleElem.textContent = quizSection.title;
  const questionsContainer = document.getElementById("quiz-questions-container");
  if (!questionsContainer) return;
  questionsContainer.innerHTML = ''; // Clear previous questions

  quizSection.questions.forEach((q, qIndex) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "rounded-xl border border-slate-200 p-4";
    const legend = document.createElement("legend");
    legend.className = "font-medium";
    legend.textContent = q.question;
    fieldset.appendChild(legend);

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "mt-3 space-y-2 text-sm";

    for (const optionKey in q.options) {
      const label = document.createElement("label");
      label.className = "flex items-start gap-3";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${qIndex + 1}`; // Ensure unique names for each question
      input.value = optionKey;
      input.className = "mt-1";

      label.appendChild(input);
      label.appendChild(document.createTextNode(q.options[optionKey]));
      optionsDiv.appendChild(label);
    }
    fieldset.appendChild(optionsDiv);
    questionsContainer.appendChild(fieldset);
  });
}

function submitQuiz(event) {
  event.preventDefault();
  const form = event.target;
  const currentUserRole = getCurrentUserRole();
  const currentQuiz = quizData[currentUserRole];
  let score = 0;
  const resultDiv = document.getElementById("quiz-result");
  if (!resultDiv) return;
  resultDiv.innerHTML = ''; // Clear previous results

  if (!currentQuiz) {
    resultDiv.textContent = "Error: Quiz data not found for this role.";
    return;
  }

  // Track unanswered questions
  const unansweredQuestions = [];

  currentQuiz.questions.forEach((q, qIndex) => {
    const questionNumber = qIndex + 1;
    const questionName = `q${questionNumber}`;
    const selectedInput = form.querySelector(`input[name="${questionName}"]:checked`);

    if (!selectedInput) {
      unansweredQuestions.push(questionNumber);
    } else if (selectedInput.value === q.answer) {
      score++;
    }
  });

  if (unansweredQuestions.length > 0) {
      resultDiv.className = 'mt-3 text-sm text-red-700';
      resultDiv.textContent = `Please answer all questions. Missing: ${unansweredQuestions.join(', ')}.`;
      return;
  }

  const totalQuestions = currentQuiz.questions.length;
  resultDiv.innerHTML = `<p class="font-semibold">You scored ${score} out of ${totalQuestions}!</p>`;
  resultDiv.className = `mt-3 text-sm ${score >= Math.ceil(totalQuestions / 2) ? 'text-green-700' : 'text-red-700'}`; // Pass if score is at least half

  // Highlight correct/incorrect answers and disable inputs
  currentQuiz.questions.forEach((q, qIndex) => {
    const questionName = `q${qIndex + 1}`;
    const selectedInput = form.querySelector(`input[name="${questionName}"]:checked`);
    const correctInput = form.querySelector(`input[name="${questionName}"][value="${q.answer}"]`);

    form.querySelectorAll(`input[name="${questionName}"]`).forEach(input => input.disabled = true); // Disable all options

    if (selectedInput) {
      if (selectedInput.value === q.answer) {
        selectedInput.closest('label').classList.add('text-green-600', 'font-medium');
      } else {
        selectedInput.closest('label').classList.add('text-red-600', 'font-medium');
        if (correctInput) {
            correctInput.closest('label').classList.add('text-green-600');
        }
      }
    } else {
        // If question was not answered, still show correct answer
        if (correctInput) {
            correctInput.closest('label').classList.add('text-green-600', 'font-medium');
        }
    }
  });

  const submitBtn = document.querySelector("#quiz-form button[type='submit']");
  if (submitBtn) submitBtn.style.display = 'none'; // Hide submit button after submission
}


// -----------------------------------------------------------------------------
// Initialization when DOM is ready
// -----------------------------------------------------------------------------

function initAll() {
    // Initialize checker if its elements are present
    const checkerForm = document.getElementById('checker-form');
    if (checkerForm) {
        initChecker();
    }

    // Initialize quiz if its elements are present
    const quizForm = document.getElementById('quiz-form');
    if (quizForm) {
        const currentUserRole = getCurrentUserRole();
        renderQuiz(currentUserRole);
        quizForm.addEventListener("submit", submitQuiz);
    }
}

// Attach initAll to DOMContentLoaded to ensure elements exist
document.addEventListener("DOMContentLoaded", initAll);

// Provide a global object for external calls, if necessary
if (typeof window !== 'undefined') {
    window.ScholarConnect = {
        initChecker,
        // The old initQuiz is replaced by renderQuiz/submitQuiz lifecycle
        // If other parts of your app need an initQuiz function, you could
        // make one that calls renderQuiz with a default role, e.g.:
        // initQuiz: (role = 'student') => {
        //   renderQuiz(role);
        //   const quizForm = document.getElementById("quiz-form");
        //   if (quizForm) quizForm.addEventListener("submit", submitQuiz);
        // },
        initAll
    };
}