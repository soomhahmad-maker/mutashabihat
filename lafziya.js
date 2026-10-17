/* ===== المتشابهات اللفظية و توجيهها — بناءً على كتاب «أسرار التكرار في القرآن» للكرماني ===== */

/* ملاحظة: يُترك هذا المصفوفة فارغة عمدًا حتى يتم توفير نسخة موثوقة من الكتاب والتحقق من الأمثلة.
   أضف كل مثال ككائن في المصفوفة حسب النموذج الآتي، مع توثيق المصدر بدقة. */

/* مثال على كيفية الإضافة (معلق — لا يُعد محتوىً):
{
  id: 1,
  category: "اختلاف الألفاظ", // خيارات: "تقديم وتأخير" | "زيادة وحذف" | "اختلاف الألفاظ" | "أخرى"
  title: "عنوان مجموعة المتشابه",
  verses: [                 // مواضع الآيات المتشابهة
    { surah: 2, ayah: 255, text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ" },
    { surah: 3, ayah: 2,   text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ" }
  ],
  difference: {             // العبار أو الكلمات التي وقع فيها الاختلاف بين الموضعين
    verseA: "كلمة أ",
    verseB: "كلمة ب",
    note: "شرح مبسط للاختلاف"
  },
  tafsir: "توجيه الإمام الكرماني للمثال (بناءً على كتابه)",
  source: {
    book: "أسرار التكرار في القرآن",
    author: "محمود بن حمزة الكرماني",
    part: 1,            // رقم الجزء إن توفّر
    page: 45            // رقم الصفحة إن توفّر
  }
}
*/
const KIRMANI_EXAMPLES = [];

const $ = (id) => document.getElementById(id);
const state = {
  examples: KIRMANI_EXAMPLES,
  search: "",
  category: "all"
};

function escapeHtml(s){return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}

/* تظليل كلمة الاختلاف في نص الآية */
function highlightWord(text, word){
  if(!word) return escapeHtml(text);
  const re = new RegExp(`(${escapeHtmlRegExp(word)})`, "gi");
  return escapeHtml(text).replace(re, "<mark>$1</mark>");
}
function escapeHtmlRegExp(s){return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");}

function categoryLabel(c){
  const labels = {
    "all":"الكل",
    "تقديم وتأخير":"التقديم والتأخير",
    "زيادة وحذف":"الزيادة والحذف",
    "اختلاف الألفاظ":"اختلاف الألفاظ",
    "أخرى":"أخرى"
  };
  return labels[c] || c;
}

function renderCategories(){
  const container = $("lafziyaCategories");
  const cats = ["all","تقديم وتأخير","زيادة وحذف","اختلاف الألفاظ","أخرى"];
  container.innerHTML = cats.map(c=>`
    <button class="cat-btn${state.category===c?" active":""}" data-cat="${escapeHtml(c)}">${categoryLabel(c)}</button>
  `).join("");
  container.querySelectorAll(".cat-btn").forEach(btn=>{
    btn.onclick=()=>{
      state.category = btn.dataset.cat;
      renderExamples();
    };
  });
}

function renderExamples(){
  const grid = $("lafziyaGrid");
  const countEl = $("lafziyaCount");
  const notice = $("lafziyaNotice");

  let filtered = state.examples;
  if(state.category !== "all"){
    filtered = filtered.filter(e => e.category === state.category);
  }
  if(state.search){
    const q = state.search.toLowerCase();
    filtered = filtered.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.verses.some(v => v.text.toLowerCase().includes(q)) ||
      (e.difference&&(e.difference.verseA||"").toLowerCase().includes(q)) ||
      (e.difference&&(e.difference.verseB||"").toLowerCase().includes(q)) ||
      (e.tafsir||"").toLowerCase().includes(q)
    );
  }

  countEl.textContent = `عدد الأمثلة المعروضة: ${filtered.length}`;

  if(filtered.length === 0){
    grid.innerHTML = "";
    if(state.examples.length === 0){
      notice.style.display = "block";
    } else {
      notice.style.display = "none";
      grid.innerHTML = `<div class="empty-lafz"><div class="empty-art">🔍</div><p>لا توجد أمثلة تطابق بحثك أو تصنيفك المحدد.</p></div>`;
    }
    return;
  }

  notice.style.display = "none";
  grid.innerHTML = filtered.map(e=>{
    const versesHtml = e.verses.map(v=>{
      const diffWord = (e.difference && (v.surah===e.verses[0].surah && v.ayah===e.verses[0].ayah)) ? e.difference.verseA :
                       (e.difference && (v.surah===e.verses[1].surah && v.ayah===e.verses[1].ayah)) ? e.difference.verseB : null;
      return `
        <div style="margin-bottom:8px">
          <div class="lafz-verses">📖 سورة ${escapeHtml(v.surah)} • الآية ${v.ayah}</div>
          <p class="lafz-text quran">﴿ ${highlightWord(v.text, diffWord)} ﴾ <span style="font-family:inherit;font-size:14px">۝${v.ayah}</span></p>
        </div>
      `;
    }).join("");

    let diffHtml = "";
    if(e.difference){
      diffHtml = `
        <div class="diff-box">
          <b>🔤 موضع الاختلاف:</b>
          <div class="diff-item">الموضع الأول: ${escapeHtml(e.difference.verseA||"—")}</div>
          <div class="diff-item">الموضع الثاني: ${escapeHtml(e.difference.verseB||"—")}</div>
          ${e.difference.note?`<div class="diff-note">💡 ${escapeHtml(e.difference.note)}</div>`:""}
        </div>`;
    }

    const tafsirHtml = e.tafsir ? `
      <div class="diff-box" style="margin-top:8px">
        <b>📘 التوجيه (من كتاب المؤلف):</b><br>
        <div class="diff-item">${escapeHtml(e.tafsir)}</div>
      </div>` : "";

    const sourceHtml = `
      <div class="source-box">
        <b>المصدر:</b> كتاب «${escapeHtml(e.source.book||"أسرار التكرار في القرآن")}» — ${escapeHtml(e.source.author||"محمود بن حمزة الكرماني")}
        ${e.source.part?`• الجزء ${e.source.part}`:""}
        ${e.source.page?`• الصفحة ${e.source.page}`:""}
      </div>`;

    return `
      <article class="lafz-card">
        <div class="card-head">
          <div class="lafz-title">${escapeHtml(e.title)}</div>
          <span class="lafz-cat">${categoryLabel(e.category)}</span>
        </div>
        ${versesHtml}
        ${diffHtml}
        ${tafsirHtml}
        ${sourceHtml}
      </article>`;
  }).join("");
}

$("lafziyaSearch").addEventListener("input", e=>{
  state.search = e.target.value;
  renderExamples();
});

/* ---------- تشغيل ---------- */
renderCategories();
renderExamples();
