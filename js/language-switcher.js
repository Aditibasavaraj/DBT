/**
 * Language Switcher for DBT Awareness Portal
 * Supports English (en), Hindi (hi), and Kannada (kn)
 * Automatically updates elements with [data-translate] attributes.
 */

(function () {
  const translations = {
    en: {
      "site.title": "DBT Awareness Dashboard",
      "hero.title": "DBT Awareness Dashboard",
      "hero.subtitle": "Explore resources, verify accounts, take quizzes, and stay updated — all in one place.",
      "hero.getStarted": "Get Started",
      "nav.home": "Home",
      "nav.about": "About",
      "nav.login": "Login",
      "nav.awareness": "Awareness",
      "nav.scholarships": "Scholarships",
      "nav.quiz": "Quiz",
      "nav.help": "Help",
      "nav.admin": "Admin",
      "nav.contact": "Contact",
      "nav.feedback": "Feedback",
      "nav.resources": "Resources",
      "nav.events": "Events & Workshops",
      "nav.verification": "Verification",
      "login.title": "Welcome 👋",
      "login.subtitle": "Sign in to continue to ScholarConnect",
      "login.email": "Email",
      "login.emailPlaceholder": "you@example.com",
      "login.password": "Password",
      "login.rememberMe": "Remember me",
      "login.forgotPassword": "Forgot password?",
      "login.signIn": "Sign In",
      "login.signInWithGoogle": "Sign in with Google",
      "login.noAccount": "Don't have an account?",
      "login.signUp": "Sign up",
      "verification.title": "DBT Awareness — Verification",
      "verification.subtitle": "Check if your account is DBT-ready",
      "verification.pageTitle": "Student Account Verification",
      "verification.description": "Simulated check against /check-dbt-status.",
      "scholarships.title": "ScholarConnect — Scholarships",
      "scholarships.description": "Explore the latest scholarships available to students. Ensure your Aadhaar-linked bank account is ready to receive Direct Benefit Transfer (DBT) for eligible scholarships.",
      "quiz.title": "ScholarConnect — Quiz",
      "quiz.submit": "Submit",
      "about.title": "About Us",
      "about.description": "ScholarConnect is a digital platform created to spread awareness about Direct Benefit Transfer (DBT) and to guide students in verifying their Aadhaar-bank linkage.",
      "about.whyTitle": "Why ScholarConnect?",
      "about.missionTitle": "Our Mission",
      "about.mission": "Our mission is to bridge the gap between students and government benefit schemes by promoting digital awareness, transparency, and financial inclusion.",
      "stats.studentsReached": "Students Reached",
      "stats.awarenessCampaigns": "Awareness Campaigns",
      "stats.dbtAccountsVerified": "DBT Accounts Verified",
      "inspiration.title": "✨ Stay Inspired ✨",
      "inspiration.quote": "Believe in yourself, you are capable of amazing things.",
      "modules.verification.title": "Verification",
      "modules.verification.description": "Check if an account looks DBT-ready.",
      "modules.verification.action": "Go to Page",
      "modules.quiz.title": "Quiz",
      "modules.quiz.description": "Test your DBT knowledge.",
      "modules.quiz.action": "Go to Page",
      "modules.resources.title": "Resources",
      "modules.resources.description": "Access guides, PDFs, and tutorials for DBT & scholarships.",
      "modules.resources.action": "Go to Page",
      "modules.events.title": "Events & Workshops",
      "modules.events.description": "Upcoming DBT awareness programs and student workshops.",
      "modules.events.action": "Go to Page",
      "modules.feedback.title": "Feedback",
      "modules.feedback.description": "Share your experience or suggestions to improve DBT services.",
      "modules.feedback.action": "Go to Page",
      "modules.help.title": "Help Center",
      "modules.help.description": "Find answers to common questions and get guidance on DBT-related issues.",
      "modules.help.action": "Go to Page"
    },
    hi: {
      "site.title": "डीबीटी जागरूकता डैशबोर्ड",
      "hero.title": "डीबीटी जागरूकता डैशबोर्ड",
      "hero.subtitle": "संसाधनों का अन्वेषण करें, खातों का सत्यापन करें, क्विज़ लें और अपडेट रहें — सब एक ही स्थान पर।",
      "hero.getStarted": "शुरू करें",
      "nav.home": "होम",
      "nav.about": "हमारे बारे में",
      "nav.login": "लॉगिन",
      "nav.awareness": "जागरूकता",
      "nav.scholarships": "छात्रवृत्तियाँ",
      "nav.quiz": "क्विज़",
      "nav.help": "सहायता",
      "nav.admin": "व्यवस्थापक",
      "nav.contact": "संपर्क",
      "nav.feedback": "प्रतिक्रिया",
      "nav.resources": "संसाधन",
      "nav.events": "कार्यक्रम एवं कार्यशालाएं",
      "nav.verification": "सत्यापन",
      "login.title": "स्वागत है 👋",
      "login.subtitle": "ScholarConnect जारी रखने के लिए साइन इन करें",
      "login.email": "ईमेल",
      "login.emailPlaceholder": "you@example.com",
      "login.password": "पासवर्ड",
      "login.rememberMe": "मुझे याद रखें",
      "login.forgotPassword": "पासवर्ड भूल गए?",
      "login.signIn": "साइन इन करें",
      "login.signInWithGoogle": "Google से साइन इन करें",
      "login.noAccount": "खाता नहीं है?",
      "login.signUp": "साइन अप करें",
      "verification.title": "डीबीटी जागरूकता — सत्यापन",
      "verification.subtitle": "जाँचें कि क्या आपका खाता डीबीटी के लिए तैयार है",
      "verification.pageTitle": "छात्र खाता सत्यापन",
      "verification.description": "सिम्युलेटेड डीबीटी स्थिति जाँच।",
      "scholarships.title": "ScholarConnect — छात्रवृत्तियाँ",
      "scholarships.description": "छात्रों के लिए उपलब्ध नवीनतम छात्रवृत्तियों का अन्वेषण करें। सुनिश्चित करें कि आपका आधार-लिंक्ड बैंक खाता डीबीटी प्राप्त करने के लिए तैयार है।",
      "quiz.title": "ScholarConnect — क्विज़",
      "quiz.submit": "जमा करें",
      "about.title": "हमारे बारे में",
      "about.description": "ScholarConnect एक डिजिटल प्लेटफ़ॉर्म है जो प्रत्यक्ष लाभ अंतरण (DBT) के बारे में जागरूकता फैलाने और छात्रों को आधार-बैंक लिंकेज सत्यापित करने में मार्गदर्शन करने के लिए बनाया गया है।",
      "about.whyTitle": "ScholarConnect क्यों?",
      "about.missionTitle": "हमारा उद्देश्य",
      "about.mission": "हमारा मिशन छात्रों और सरकारी लाभ योजनाओं के बीच की दूरी को कम करना है ताकि वे आवश्यक सहायता से वंचित न रहें।",
      "stats.studentsReached": "पहुँचे छात्र",
      "stats.awarenessCampaigns": "जागरूकता अभियान",
      "stats.dbtAccountsVerified": "सत्यापित डीबीटी खाते",
      "inspiration.title": "✨ प्रेरित रहें ✨",
      "inspiration.quote": "खुद पर विश्वास रखें, आप अद्भुत काम करने में सक्षम हैं।",
      "modules.verification.title": "सत्यापन",
      "modules.verification.description": "जाँचें कि क्या खाता डीबीटी के लिए तैयार है।",
      "modules.verification.action": "पेज पर जाएँ",
      "modules.quiz.title": "क्विज़",
      "modules.quiz.description": "अपने डीबीटी ज्ञान का परीक्षण करें।",
      "modules.quiz.action": "पेज पर जाएँ",
      "modules.resources.title": "संसाधन",
      "modules.resources.description": "डीबीटी और छात्रवृत्तियों के लिए गाइड, पीडीएफ और ट्यूटोरियल देखें।",
      "modules.resources.action": "पेज पर जाएँ",
      "modules.events.title": "कार्यक्रम एवं कार्यशालाएं",
      "modules.events.description": "आगामी डीबीटी जागरूकता कार्यक्रम और कार्यशालाएं।",
      "modules.events.action": "पेज पर जाएँ",
      "modules.feedback.title": "प्रतिक्रिया",
      "modules.feedback.description": "डीबीटी सेवाओं में सुधार के लिए अपने सुझाव साझा करें।",
      "modules.feedback.action": "पेज पर जाएँ",
      "modules.help.title": "सहायता केंद्र",
      "modules.help.description": "सामान्य प्रश्नों के उत्तर और सहायता प्राप्त करें।",
      "modules.help.action": "पेज पर जाएँ"
    },
    kn: {
      "site.title": "ಡಿಬಿಟಿ ಜಾಗೃತಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      "hero.title": "ಡಿಬಿಟಿ ಜಾಗೃತಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      "hero.subtitle": "ಸಂಪನ್ಮೂಲಗಳನ್ನು ಅನ್ವೇಷಿಸಿ, ಖಾತೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ, ರಸಪ್ರಶ್ನೆಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ ಮತ್ತು ನವೀಕೃತವಾಗಿರಿ — ಎಲ್ಲವೂ ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ.",
      "hero.getStarted": "ಪ್ರಾರಂಭಿಸಿ",
      "nav.home": "ಮುಖಪುಟ",
      "nav.about": "ನಮ್ಮ ಬಗ್ಗೆ",
      "nav.login": "ಲಾಗಿನ್",
      "nav.awareness": "ಜಾಗೃತಿ",
      "nav.scholarships": "ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು",
      "nav.quiz": "ರಸಪ್ರಶ್ನೆ",
      "nav.help": "ಸಹಾಯ",
      "nav.admin": "ನಿರ್ವಾಹಕ",
      "nav.contact": "ಸಂಪರ್ಕಿಸಿ",
      "nav.feedback": "ಪ್ರತಿಕ್ರಿಯೆ",
      "nav.resources": "ಸಂಪನ್ಮೂಲಗಳು",
      "nav.events": "ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಕಾರ್ಯಾಗಾರಗಳು",
      "nav.verification": "ಪರಿಶೀಲನೆ",
      "login.title": "ಸ್ವಾಗತ 👋",
      "login.subtitle": "ScholarConnect ಮುಂದುವರಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ",
      "login.email": "ಇಮೇಲ್",
      "login.emailPlaceholder": "you@example.com",
      "login.password": "ಪಾಸ್‌ವರ್ಡ್",
      "login.rememberMe": "ನನ್ನನ್ನು ನೆನಪಿನಲ್ಲಿಡಿ",
      "login.forgotPassword": "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?",
      "login.signIn": "ಸೈನ್ ಇನ್",
      "login.signInWithGoogle": "Google ನೊಂದಿಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ",
      "login.noAccount": "ಖಾತೆ ಇಲ್ಲವೇ?",
      "login.signUp": "ಸೈನ್ ಅಪ್ ಮಾಡಿ",
      "verification.title": "ಡಿಬಿಟಿ ಜಾಗೃತಿ — ಪರಿಶೀಲನೆ",
      "verification.subtitle": "ನಿಮ್ಮ ಖಾತೆಯು ಡಿಬಿಟಿಗೆ ಸಿದ್ಧವಾಗಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ",
      "verification.pageTitle": "ವಿದ್ಯಾರ್ಥಿ ಖಾತೆ ಪರಿಶೀಲನೆ",
      "verification.description": "ಅಣಕು ಡಿಬಿಟಿ ಸ್ಥಿತಿ ಪರಿಶೀಲನೆ.",
      "scholarships.title": "ScholarConnect — ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು",
      "scholarships.description": "ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಲಭ್ಯವಿರುವ ಇತ್ತೀಚಿನ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ಅನ್ವೇಷಿಸಿ. ಅರ್ಹ ವಿದ್ಯಾರ್ಥಿವೇತನಕ್ಕಾಗಿ ನೇರ ಲಾಭ ವರ್ಗಾವಣೆ (DBT) ಪಡೆಯಲು ಆಧಾರ್ ಲಿಂಕ್ ಖಾತೆಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
      "quiz.title": "ScholarConnect — ರಸಪ್ರಶ್ನೆ",
      "quiz.submit": "ಸಲ್ಲಿಸಿ",
      "about.title": "ನಮ್ಮ ಬಗ್ಗೆ",
      "about.description": "ScholarConnect ನೇರ ಲಾಭ ವರ್ಗಾವಣೆ (DBT) ಬಗ್ಗೆ ಜಾಗೃತಿ ಮೂಡಿಸಲು ಮತ್ತು ಆಧಾರ್-ಬ್ಯಾಂಕ್ ಜೋಡಣೆಯನ್ನು ಪರಿಶೀಲಿಸಲು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುವ ಡಿಜಿಟಲ್ ವೇದಿಕೆಯಾಗಿದೆ.",
      "about.whyTitle": "ಏಕೆ ScholarConnect?",
      "about.missionTitle": "ನಮ್ಮ ಉದ್ದೇಶ",
      "about.mission": "ವಿದ್ಯಾರ್ಥಿಗಳು ಮತ್ತು ಸರ್ಕಾರಿ ಸೌಲಭ್ಯಗಳ ನಡುವಿನ ಅಂತರವನ್ನು ಕಡಿಮೆ ಮಾಡುವುದು ಮತ್ತು ಆರ್ಥಿಕ ಒಳಗೊಳ್ಳುವಿಕೆಯನ್ನು ಉತ್ತೇಜಿಸುವುದು ನಮ್ಮ ಗುರಿ.",
      "stats.studentsReached": "ತಲುಪಿದ ವಿದ್ಯಾರ್ಥಿಗಳು",
      "stats.awarenessCampaigns": "ಜಾಗೃತಿ ಅಭಿಯಾನಗಳು",
      "stats.dbtAccountsVerified": "ದೃಢೀಕರಿಸಿದ ಡಿಬಿಟಿ ಖಾತೆಗಳು",
      "inspiration.title": "✨ ಪ್ರೇರಿತರಾಗಿರಿ ✨",
      "inspiration.quote": "ನಿಮ್ಮಲ್ಲಿ ನಂಬಿಕೆ ಇರಲಿ, ನೀವು ಅದ್ಭುತವಾದದ್ದನ್ನು ಸಾಧಿಸಲು ಸಮರ್ಥರಾಗಿದ್ದೀರಿ.",
      "modules.verification.title": "ಪರಿಶೀಲನೆ",
      "modules.verification.description": "ಖಾತೆಯು ಡಿಬಿಟಿಗೆ ಸಿದ್ಧವಾಗಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ.",
      "modules.verification.action": "ಪುಟಕ್ಕೆ ಹೋಗಿ",
      "modules.quiz.title": "ರಸಪ್ರಶ್ನೆ",
      "modules.quiz.description": "ನಿಮ್ಮ ಡಿಬಿಟಿ ಜ್ಞಾನವನ್ನು ಪರೀಕ್ಷಿಸಿ.",
      "modules.quiz.action": "ಪುಟಕ್ಕೆ ಹೋಗಿ",
      "modules.resources.title": "ಸಂಪನ್ಮೂಲಗಳು",
      "modules.resources.description": "ಡಿಬಿಟಿ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನಗಳಿಗಾಗಿ ಮಾರ್ಗದರ್ಶಿಗಳು ಮತ್ತು ಪಿಡಿಎಫ್‌ಗಳನ್ನು ವೀಕ್ಷಿಸಿ.",
      "modules.resources.action": "ಪುಟಕ್ಕೆ ಹೋಗಿ",
      "modules.events.title": "ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಕಾರ್ಯಾಗಾರಗಳು",
      "modules.events.description": "ಮುಂಬರುವ ಡಿಬಿಟಿ ಜಾಗೃತಿ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿ ಕಾರ್ಯಾಗಾರಗಳು.",
      "modules.events.action": "ಪುಟಕ್ಕೆ ಹೋಗಿ",
      "modules.feedback.title": "ಪ್ರತಿಕ್ರಿಯೆ",
      "modules.feedback.description": "ಡಿಬಿಟಿ ಸೇವೆಗಳನ್ನು ಸುಧಾರಿಸಲು ನಿಮ್ಮ ಅನುಭವ ಅಥವಾ ಸಲಹೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.",
      "modules.feedback.action": "ಪುಟಕ್ಕೆ ಹೋಗಿ",
      "modules.help.title": "ಸಹಾಯ ಕೇಂದ್ರ",
      "modules.help.description": "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.",
      "modules.help.action": "ಪುಟಕ್ಕೆ ಹೋಗಿ"
    }
  };

  function applyLanguage(lang) {
    const langData = translations[lang] || translations.en;
    document.querySelectorAll("[data-translate]").forEach((el) => {
      const key = el.getAttribute("data-translate");
      if (langData[key]) {
        if (el.tagName.toLowerCase() === "input" && el.hasAttribute("placeholder")) {
          el.placeholder = langData[key];
        } else if (el.tagName.toLowerCase() === "title") {
          document.title = langData[key];
        } else {
          el.textContent = langData[key];
        }
      }
    });

    localStorage.setItem("dbt_language", lang);

    // Update select element if present
    const select = document.getElementById("language-switcher-select");
    if (select && select.value !== lang) {
      select.value = lang;
    }
  }

  function initLanguageUI() {
    const currentLang = localStorage.getItem("dbt_language") || "en";

    // Insert switcher into header nav if not already present
    const nav = document.querySelector("header nav");
    if (nav && !document.getElementById("language-switcher-select")) {
      const wrapper = document.createElement("div");
      wrapper.className = "inline-flex items-center ml-2";
      wrapper.innerHTML = `
        <select id="language-switcher-select" aria-label="Select Language" class="text-xs border border-slate-300 rounded-md px-2 py-1 bg-white text-slate-700 hover:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer">
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="kn">ಕನ್ನಡ</option>
        </select>
      `;
      nav.appendChild(wrapper);

      const select = wrapper.querySelector("select");
      select.value = currentLang;
      select.addEventListener("change", (e) => {
        applyLanguage(e.target.value);
      });
    }

    applyLanguage(currentLang);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLanguageUI);
  } else {
    initLanguageUI();
  }

  // Export to window for programmatic use
  window.DBTLanguage = {
    setLanguage: applyLanguage,
    getCurrentLanguage: () => localStorage.getItem("dbt_language") || "en"
  };
})();
