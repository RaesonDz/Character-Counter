(function(){
  const textInput = document.getElementById('textInput');
  const wordCount = document.getElementById('wordCount');
  const charCount = document.getElementById('charCount');
  const charWithSpaces = document.getElementById('charWithSpaces');
  const sentenceCount = document.getElementById('sentenceCount');

  const langToggle = document.getElementById('langToggle');
  const themeToggle = document.getElementById('themeToggle');

  const title = document.getElementById('title');
  const subtitle = document.getElementById('subtitle');
  const wordsLabel = document.getElementById('wordsLabel');
  const charsLabel = document.getElementById('charsLabel');
  const charsSpaceLabel = document.getElementById('charsSpaceLabel');
  const sentencesLabel = document.getElementById('sentencesLabel');
  const footerNote = document.getElementById('footerNote');

  let currentLang = 'ar';
  let currentTheme = 'dark';

  const translations = {
    ar: {
      title: "✍️ عداد الكلمات والأحرف",
      subtitle: "أدخل نصك وسيظهر عدد الكلمات والأحرف والجمل",
      words: "الكلمات",
      chars: "الأحرف (بدون مسافات)",
      charsSpace: "الأحرف (مع مسافات)",
      sentences: "عدد الجمل",
      footer: "هذه الأداة تساعدك على متابعة حجم النص عند الكتابة أو النشر.",
      langBtn: "English",
      placeholder: "ابدأ الكتابة هنا..."
    },
    en: {
      title: "✍️ Word & Character Counter",
      subtitle: "Type your text to see words, characters, and sentences count",
      words: "Words",
      chars: "Characters (no spaces)",
      charsSpace: "Characters (with spaces)",
      sentences: "Sentences",
      footer: "This tool helps you track text length while writing or publishing.",
      langBtn: "العربية",
      placeholder: "Start typing here..."
    }
  };

  function updateStats(){
    const text = textInput.value;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!؟!?]+/).filter(s => s.trim().length > 0);

    wordCount.textContent = words.length;
    charCount.textContent = text.replace(/\s/g, '').length;
    charWithSpaces.textContent = text.length;
    sentenceCount.textContent = sentences.length;
  }

  function switchLang(){
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    const t = translations[currentLang];

    title.textContent = t.title;
    subtitle.textContent = t.subtitle;
    wordsLabel.textContent = t.words;
    charsLabel.textContent = t.chars;
    charsSpaceLabel.textContent = t.charsSpace;
    sentencesLabel.textContent = t.sentences;
    footerNote.textContent = t.footer;
    langToggle.innerHTML = `<i data-lucide="globe"></i> ${t.langBtn}`;
    textInput.placeholder = t.placeholder;

    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    lucide.createIcons();
  }

  function toggleTheme(){
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.className = currentTheme;
    themeToggle.innerHTML = currentTheme === 'dark' ? `<i data-lucide="moon"></i>` : `<i data-lucide="sun"></i>`;
    lucide.createIcons();
  }

  textInput.addEventListener('input', updateStats);
  langToggle.addEventListener('click', switchLang);
  themeToggle.addEventListener('click', toggleTheme);

  // init
  updateStats();
})();