/* ===== التفسير الميسر — السعدي والجلالين ===== */

const SURAHS = [
[1,"الفاتحة",7,"مكية"],[2,"البقرة",286,"مدنية"],[3,"آل عمران",200,"مدنية"],[4,"النساء",176,"مدنية"],
[5,"المائدة",120,"مدنية"],[6,"الأنعام",165,"مكية"],[7,"الأعراف",206,"مكية"],[8,"الأنفال",75,"مدنية"],
[9,"التوبة",129,"مدنية"],[10,"يونس",109,"مكية"],[11,"هود",123,"مكية"],[12,"يوسف",111,"مكية"],
[13,"الرعد",43,"مدنية"],[14,"إبراهيم",52,"مكية"],[15,"الحجر",99,"مكية"],[16,"النحل",128,"مكية"],
[17,"الإسراء",111,"مكية"],[18,"الكهف",110,"مكية"],[19,"مريم",98,"مكية"],[20,"طه",135,"مكية"],
[21,"الأنبياء",112,"مكية"],[22,"الحج",78,"مدنية"],[23,"المؤمنون",118,"مكية"],[24,"النور",64,"مدنية"],
[25,"الفرقان",77,"مكية"],[26,"الشعراء",227,"مكية"],[27,"النمل",93,"مكية"],[28,"القصص",88,"مكية"],
[29,"العنكبوت",69,"مكية"],[30,"الروم",60,"مكية"],[31,"لقمان",34,"مكية"],[32,"السجدة",30,"مكية"],
[33,"الأحزاب",73,"مدنية"],[34,"سبأ",54,"مكية"],[35,"فاطر",45,"مكية"],[36,"يس",83,"مكية"],
[37,"الصافات",182,"مكية"],[38,"ص",88,"مكية"],[39,"الزمر",75,"مكية"],[40,"غافر",85,"مكية"],
[41,"فصلت",54,"مكية"],[42,"الشورى",53,"مكية"],[43,"الزخرف",89,"مكية"],[44,"الدخان",59,"مكية"],
[45,"الجاثية",37,"مكية"],[46,"الأحقاف",35,"مكية"],[47,"محمد",38,"مدنية"],[48,"الفتح",29,"مدنية"],
[49,"الحجرات",18,"مدنية"],[50,"ق",45,"مكية"],[51,"الذاريات",60,"مكية"],[52,"الطور",49,"مكية"],
[53,"النجم",62,"مكية"],[54,"القمر",55,"مكية"],[55,"الرحمن",78,"مدنية"],[56,"الواقعة",96,"مكية"],
[57,"الحديد",29,"مدنية"],[58,"المجادلة",22,"مدنية"],[59,"الحشر",24,"مدنية"],[60,"الممتحنة",13,"مدنية"],
[61,"الصف",14,"مدنية"],[62,"الجمعة",11,"مدنية"],[63,"المنافقون",11,"مدنية"],[64,"التغابن",18,"مدنية"],
[65,"الطلاق",12,"مدنية"],[66,"التحريم",12,"مدنية"],[67,"الملك",30,"مكية"],[68,"القلم",52,"مكية"],
[69,"الحاقة",52,"مكية"],[70,"المعارج",44,"مكية"],[71,"نوح",28,"مكية"],[72,"الجن",28,"مكية"],
[73,"المزمل",20,"مكية"],[74,"المدثر",56,"مكية"],[75,"القيامة",40,"مكية"],[76,"الإنسان",31,"مدنية"],
[77,"المرسلات",50,"مكية"],[78,"النبأ",40,"مكية"],[79,"النازعات",46,"مكية"],[80,"عبس",42,"مكية"],
[81,"التكوير",29,"مكية"],[82,"الانفطار",19,"مكية"],[83,"المطففين",36,"مكية"],[84,"الانشقاق",25,"مكية"],
[85,"البروج",22,"مكية"],[86,"الطارق",17,"مكية"],[87,"الأعلى",19,"مكية"],[88,"الغاشية",26,"مكية"],
[89,"الفجر",30,"مكية"],[90,"البلد",20,"مكية"],[91,"الشمس",15,"مكية"],[92,"الليل",21,"مكية"],
[93,"الضحى",11,"مكية"],[94,"الشرح",8,"مكية"],[95,"التين",8,"مكية"],[96,"العلق",19,"مكية"],
[97,"القدر",5,"مكية"],[98,"البينة",8,"مدنية"],[99,"الزلزلة",8,"مدنية"],[100,"العاديات",11,"مكية"],
[101,"القارعة",11,"مكية"],[102,"التكاثر",8,"مكية"],[103,"العصر",3,"مكية"],[104,"الهمزة",9,"مكية"],
[105,"الفيل",5,"مكية"],[106,"قريش",4,"مكية"],[107,"الماعون",7,"مكية"],[108,"الكوثر",3,"مكية"],
[109,"الكافرون",6,"مكية"],[110,"النصر",3,"مدنية"],[111,"المسد",5,"مكية"],[112,"الإخلاص",4,"مكية"],
[113,"الفلق",5,"مكية"],[114,"الناس",6,"مكية"]
];

const RECITERS = [
  { id:"ar.alafasy", name:"مشاري راشد العفاسي" },
  { id:"ar.abdulbasitmurattal", name:"عبد الباسط عبد الصمد" },
  { id:"ar.husary", name:"محمود خليل الحصري" },
  { id:"ar.minshawi", name:"محمد صديق المنشاوي" },
  { id:"ar.mahermuaiqly", name:"ماهر المعيقلي" },
  { id:"ar.ahmedajamy", name:"أحمد بن علي العجمي" }
];

const audioURL = (reciterId, globalNum) => `https://cdn.islamic.network/quran/audio/128/${reciterId}/${globalNum}.mp3`;
const tafsirURL = (edition, surah, ayah) => `https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/${edition}`;

const $ = (id) => document.getElementById(id);
const state = {
  surah: 2, ayah: null, ayahText: "", globalNum: 0,
  surahAyahs: [], tafsirCache: new Map()
};

function escapeHtml(s){return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}

/* ---------- الثيم ---------- */
function initTheme(){
  const saved = localStorage.getItem("mutashabihat-theme") || "light";
  document.documentElement.dataset.theme = saved;
  $("themeIcon").textContent = saved === "light" ? "🌙" : "☀️";
}
$("themeToggle").onclick = () => {
  const cur = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = cur;
  localStorage.setItem("mutashabihat-theme", cur);
  $("themeIcon").textContent = cur === "light" ? "🌙" : "☀️";
};

/* ---------- قائمة السور ---------- */
function renderSurahList(q=""){
  const grid = $("tafsirSurahGrid"); grid.innerHTML="";
  SURAHS.filter(s => s[1].includes(q.trim()) || String(s[0])===q.trim()).forEach(s=>{
    const b=document.createElement("button");
    b.className="surah-btn"+(state.surah===s[0]?" active":"");
    b.setAttribute("role","option");
    b.innerHTML=`<span class="surah-num">${s[0]}</span><span><b>سورة ${escapeHtml(s[1])}</b><small>${s[2]} آيات • ${s[3]}</small></span>`;
    b.onclick=()=>selectSurah(s[0]);
    grid.appendChild(b);
  });
  if(!grid.children.length) grid.innerHTML=`<p class="empty">لا نتائج — جرّب اسمًا آخر</p>`;
}
$("tafsirSurahSearch").addEventListener("input", e=>renderSurahList(e.target.value));

/* ---------- جلب آيات السورة ---------- */
async function selectSurah(n){
  state.surah=n; state.ayah=null;
  renderSurahList($("tafsirSurahSearch").value);
  const meta=SURAHS[n-1];
  $("tafsirAyahHeadTitle").textContent=`آيات سورة ${meta[1]} (${meta[2]})`;
  $("tafsirAyahList").innerHTML=`<p class="empty"><span class="spinner"></span> جاري تحميل الآيات…</p>`;
  try{
    const res=await fetch(`https://api.alquran.cloud/v1/surah/${n}/quran-uthmani`);
    const j=await res.json();
    if(j.code!==200||!j.data) throw new Error("bad");
    state.surahAyahs=j.data.ayahs.map(a=>({
      num:a.numberInSurah, global:a.number, text:a.text
    }));
    renderAyahList();
    showEmpty();
  }catch(e){
    $("tafsirAyahList").innerHTML=`<p class="empty">تعذّر التحميل — تحقق من الاتصال ثم أعد المحاولة.<br><button class="mini-btn" onclick="selectSurah(${n})">إعادة المحاولة</button></p>`;
  }
}
function renderAyahList(){
  const list=$("tafsirAyahList"); list.innerHTML="";
  state.surahAyahs.forEach(a=>{
    const d=document.createElement("div");
    d.className="ayah-item"+(state.ayah===a.num?" active":"");
    d.id="tafsirAyah-"+a.num;
    d.innerHTML=`<span class="n">آية ${a.num}</span><div class="t">${escapeHtml(a.text.length>110?a.text.slice(0,110)+"…":a.text)}</div>`;
    d.onclick=()=>onAyahClick(a.num);
    list.appendChild(d);
  });
}
$("tafsirAyahSearch").addEventListener("change", e=>{
  const v=parseInt(e.target.value,10);
  if(!v) return;
  const f=state.surahAyahs.find(a=>a.num===v);
  if(f){ onAyahClick(v); $("tafsirAyah-"+v)?.scrollIntoView({behavior:"smooth",block:"center"}); }
  else alert("رقم الآية غير موجود في هذه السورة");
});

/* ---------- عند الضغط على آية ---------- */
function onAyahClick(num){
  const a=state.surahAyahs.find(x=>x.num===num);
  if(!a) return;
  state.ayah=num; state.ayahText=a.text; state.globalNum=a.global;
  document.querySelectorAll(".ayah-item").forEach(el=>el.classList.remove("active"));
  $("tafsirAyah-"+num)?.classList.add("active");
  renderSelected();
  loadTafsir();
}

function showEmpty(){
  $("tafsirSelectedCard").classList.add("hidden");
  $("tafsirContent").classList.add("hidden");
  $("tafsirEmpty").classList.remove("hidden");
  $("tafsirLoading").classList.add("hidden");
}

function renderSelected(){
  const meta=SURAHS[state.surah-1];
  const card=$("tafsirSelectedCard");
  card.classList.remove("hidden");
  $("tafsirEmpty").classList.add("hidden");
  $("tafsirLoading").classList.remove("hidden");
  $("tafsirContent").classList.add("hidden");

  card.innerHTML=`
    <div class="sel-top">
      <h3>الآية المختارة</h3>
      <div class="sel-badges"><span>سورة ${escapeHtml(meta[1])}</span><span>رقم السورة ${state.surah}</span><span>الآية ${state.ayah}</span></div>
    </div>
    <div class="sel-text quran" id="tafsirSelectedQuranText">﴿ ${escapeHtml(state.ayahText)} ﴾ <span style="font-family:inherit;font-size:16px">۝${state.ayah}</span></div>
    <div class="sel-audio reciter-box">
      <label class="reciter-pick">🎧 المقرئ:
        <select class="reciter-select" id="tafsirReciterSelect" aria-label="اختيار المقرئ"></select>
      </label>
      <audio controls preload="none" id="tafsirSelectedAudio" style="width:100%;height:38px"></audio>
      <small class="muted">6 مقرئين: ${RECITERS.map(r=>escapeHtml(r.name)).join(" • ")}</small>
    </div>
    <div class="sel-actions">
      <button class="mini-btn" id="tafsirCopyVerse">📋 نسخ الآية</button>
    </div>`;

  $("tafsirCopyVerse").onclick=()=>{
    navigator.clipboard?.writeText(`﴿${state.ayahText}﴾ [${meta[1]}: ${state.ayah}]`);
    $("tafsirCopyVerse").textContent="✓ تم النسخ";
    setTimeout(()=>$("tafsirCopyVerse").textContent="📋 نسخ الآية",1500);
  };

  initTafsirAudio();
  card.scrollIntoView({behavior:"smooth",block:"nearest"});
}

function initTafsirAudio(){
  const select = $("tafsirReciterSelect");
  select.innerHTML = RECITERS.map(r=>`<option value="${r.id}">${r.name}</option>`).join("");
  const audio = $("tafsirSelectedAudio");
  audio.src = audioURL(RECITERS[0].id, state.globalNum);
  select.onchange = ()=>{
    audio.src = audioURL(select.value, state.globalNum);
    audio.play().catch(()=>{});
  };
}

function loadTafsir(){
  const key = state.surah + ":" + state.ayah;

  // تفسير السعدي
  $("tafsirSaadi").innerHTML = `<div class="tafsir-loading"><span class="spinner" style="display:inline-block;width:20px;height:20px;border:3px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin 1s linear infinite"></span> جاري جلب تفسير السعدي…</div>`;
  // تفسير الجلالين
  $("tafsirBaghawi").innerHTML = `<div class="tafsir-loading"><span class="spinner" style="display:inline-block;width:20px;height:20px;border:3px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin 1s linear infinite"></span> جاري جلب تفسير الجلالين…</div>`;

  // جلب تفسير السعدي
  fetch(tafsirURL("ar.al-saadi", state.surah, state.ayah))
    .then(r=>r.json())
    .then(j=>{
      if(j.code===200 && j.data && j.data.text && j.data.edition && j.data.edition.type==="tafsir"){
        $("tafsirSaadi").innerHTML = escapeHtml(j.data.text);
      } else {
        $("tafsirSaadi").innerHTML = `<div class="tafsir-error">تفسير السعدي غير متاح لهذه الآية.</div>`;
      }
    })
    .catch(()=>{ $("tafsirSaadi").innerHTML = `<div class="tafsir-error">تعذّر جلب تفسير السعدي.</div>`; });

  // جلب تفسير الجلالين
  fetch(tafsirURL("ar.jalalayn", state.surah, state.ayah))
    .then(r=>r.json())
    .then(j=>{
      if(j.code===200 && j.data && j.data.text && j.data.edition && j.data.edition.type==="tafsir"){
        $("tafsirBaghawi").innerHTML = escapeHtml(j.data.text);
      } else {
        $("tafsirBaghawi").innerHTML = `<div class="tafsir-error">تفسير الجلالين غير متاح لهذه الآية.</div>`;
      }
    })
    .catch(()=>{
      $("tafsirBaghawi").innerHTML = `<div class="tafsir-error">تعذّر جلب تفسير الجلالين.</div>`;
    });

  $("tafsirLoading").classList.add("hidden");
  $("tafsirContent").classList.remove("hidden");
  $("tafsirContent").scrollIntoView({behavior:"smooth",block:"nearest"});
}

/* ---------- تشغيل ---------- */
initTheme();
renderSurahList();
selectSurah(2);

/* قراءة معامل التفسي من الرابط URL */
const urlParams = new URLSearchParams(window.location.search);
const defaultTafsir = urlParams.get('tafsir') || 'saadi';
if(defaultTafsir === 'baghawi'){
  const saadiBox = $("tafsirSaadi").parentElement;
  const baghawiBox = $("tafsirBaghawi").parentElement;
  if(saadiBox && baghawiBox && saadiBox.parentNode){
    saadiBox.parentNode.insertBefore(baghawiBox, saadiBox);
  }
}
