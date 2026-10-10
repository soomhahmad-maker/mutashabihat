/* المتشابهات — منطق التطبيق */
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
const reciterOptions = (selectedId) => RECITERS.map(r=>`<option value="${r.id}"${r.id===selectedId?" selected":""}>${r.name}</option>`).join("");
/* تبديل المقرئ داخل أي بطاقة: يحدّث مصدر الصوت دون إعادة التحميل */
function changeReciter(sel, globalNum){
  const card = sel.closest(".reciter-box") || sel.closest(".card") || sel.closest(".selected-card");
  const audio = card ? card.querySelector("audio") : null;
  if(audio){ audio.src = audioURL(sel.value, globalNum); audio.play?.().catch(()=>{}); }
  sel.dataset.reciter = sel.value;
}

const $ = (id) => document.getElementById(id);
const state = {
  surah: 2, ayah: null, ayahText: "", tafsir: "",
  globalNum: 0, surahAyahs: [],
  corpus: [], corpusMap: new Map(), corpusReady: false,
  full: [], partial: [], filter: "all",
  tafsirCache: new Map()
};

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

/* ---------- تطبيع النص العربي ---------- */
function normalizeArabic(s){
  return (s||"")
    .replace(/[\u064B-\u0652\u0670\u06D6-\u06ED]/g,"")
    .replace(/[أإآٱٲٳٵ]/g,"ا").replace(/ؤ/g,"و").replace(/ئ/g,"ي")
    .replace(/ة/g,"ه").replace(/ى/g,"ي").replace(/ۃ/g,"ه")
    .replace(/[﴿﴾۝۞«»"']/g," ")
    .replace(/[^\u0621-\u064A0-9\s]/g," ")
    .replace(/\s+/g," ").trim();
}
const normTokens = (s) => normalizeArabic(s).split(" ").filter(Boolean);
const origTokens = (s) => (s||"").replace(/[﴿﴾۝۞]/g," ").split(/\s+/).filter(Boolean);

/* أطول عبارة مشتركة متتالية */
function longestCommon(a, b){
  const m=a.length, n=b.length;
  if(!m||!n) return {len:0,startA:0,startB:0};
  let best={len:0,startA:0,startB:0};
  const prev=new Array(n+1).fill(0);
  for(let i=1;i<=m;i++){
    let diag=0;
    for(let j=1;j<=n;j++){
      const tmp=prev[j];
      if(a[i-1]===b[j-1]){
        prev[j]=diag+1;
        if(prev[j]>best.len) best={len:prev[j],startA:i-prev[j],startB:j-prev[j]};
      } else prev[j]=0;
      diag=tmp;
    }
  }
  return best;
}
function escapeHtml(s){return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}

/* تظليل الكلمات من start بطول len */
function highlightTokens(origText, start, len){
  const toks = origTokens(origText);
  return toks.map((t,i)=> (i>=start && i<start+len) ? `<mark>${escapeHtml(t)}</mark>` : escapeHtml(t)).join(" ");
}
function phraseFromTokens(normToks, start, len){ return normToks.slice(start,start+len).join(" "); }

/* ---------- قائمة السور ---------- */
function renderSurahList(q=""){
  const grid = $("surahGrid"); grid.innerHTML="";
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
$("surahSearch").addEventListener("input", e=>renderSurahList(e.target.value));

/* ---------- جلب آيات السورة (نص + تفسير) ---------- */
async function selectSurah(n){
  state.surah=n; state.ayah=null;
  renderSurahList($("surahSearch").value);
  const meta=SURAHS[n-1];
  $("ayahHeadTitle").textContent=`آيات سورة ${meta[1]} (${meta[2]})`;
  $("ayahList").innerHTML=`<p class="empty"><span class="spinner"></span> جاري تحميل الآيات والتفسير…</p>`;
  try{
    const res=await fetch(`https://api.alquran.cloud/v1/surah/${n}/editions/quran-uthmani,ar.muyassar`);
    const j=await res.json();
    if(j.code!==200||!j.data||j.data.length<2) throw new Error("bad");
    const uth=j.data[0].ayahs, taf=j.data[1].ayahs;
    state.surahAyahs=uth.map((a,i)=>({
      num:a.numberInSurah, global:a.number, text:a.text,
      tafsir:(taf[i]&&taf[i].text)||""
    }));
    renderAyahList();
  }catch(e){
    $("ayahList").innerHTML=`<p class="empty">تعذّر التحميل — تحقق من الاتصال ثم أعد المحاولة.<br><button class="mini-btn" onclick="selectSurah(${n})">إعادة المحاولة</button></p>`;
  }
}
function renderAyahList(){
  const list=$("ayahList"); list.innerHTML="";
  state.surahAyahs.forEach(a=>{
    const d=document.createElement("div");
    d.className="ayah-item"+(state.ayah===a.num?" active":"");
    d.id="ayah-"+a.num;
    d.innerHTML=`<span class="n">آية ${a.num}</span><div class="t">${escapeHtml(a.text.length>110?a.text.slice(0,110)+"…":a.text)}</div>`;
    d.onclick=()=>onAyahClick(a.num);
    list.appendChild(d);
  });
}
$("ayahSearch").addEventListener("change", e=>{
  const v=parseInt(e.target.value,10);
  if(!v) return;
  const f=state.surahAyahs.find(a=>a.num===v);
  if(f){ onAyahClick(v); $("ayah-"+v)?.scrollIntoView({behavior:"smooth",block:"center"}); }
  else alert("رقم الآية غير موجود في هذه السورة");
});

/* ---------- فهرس القرآن الكامل للبحث ---------- */
async function loadCorpus(){
  const st=$("corpusStatus"), txt=$("corpusStatusText");
  try{
    const res=await fetch("https://api.alquran.cloud/v1/quran/quran-uthmani");
    const j=await res.json();
    if(j.code!==200) throw 0;
    const all=[];
    j.data.surahs.forEach(s=>{
      s.ayahs.forEach(a=>{
        const norm=normalizeArabic(a.text);
        const item={surah:s.number,ayah:a.numberInSurah,global:a.number,text:a.text,norm,toks:norm.split(" ").filter(Boolean)};
        all.push(item);
        state.corpusMap.set(s.number+":"+a.numberInSurah,item);
      });
    });
    state.corpus=all; state.corpusReady=true;
    st.classList.add("ready"); txt.textContent=`الفهرس جاهز (${all.length} آية) ✓`;
  }catch(e){
    txt.textContent="تعذّر تجهيز الفهرس — سيُعاد المحاولة";
    setTimeout(loadCorpus, 8000);
  }
}

/* ---------- عند الضغط على آية ---------- */
function onAyahClick(num){
  const a=state.surahAyahs.find(x=>x.num===num);
  if(!a) return;
  state.ayah=num; state.ayahText=a.text; state.tafsir=a.tafsir; state.globalNum=a.global;
  document.querySelectorAll(".ayah-item").forEach(el=>el.classList.remove("active"));
  $("ayah-"+num)?.classList.add("active");
  renderSelected();
  findSimilar();
}

function renderSelected(){
  const meta=SURAHS[state.surah-1];
  const card=$("selectedCard");
  card.classList.remove("hidden");
  const tnorm=normTokens(state.ayahText);
  card.innerHTML=`
    <div class="sel-top">
      <h3>الآية المقصودة</h3>
      <div class="sel-badges"><span>سورة ${escapeHtml(meta[1])}</span><span>رقم السورة ${state.surah}</span><span>الآية ${state.ayah}</span></div>
    </div>
    <div class="sel-text quran">﴿ ${escapeHtml(state.ayahText)} ﴾ <span style="font-family:inherit;font-size:16px">۝${state.ayah}</span></div>
    <div class="sel-audio reciter-box">
      <label class="reciter-pick">🎧 المقرئ:
        <select class="reciter-select" onchange="changeReciter(this,${state.globalNum})" aria-label="اختيار المقرئ">
          ${reciterOptions(RECITERS[0].id)}
        </select>
      </label>
      <audio controls preload="none" src="${audioURL(RECITERS[0].id,state.globalNum)}"></audio>
      <small class="muted">6 مقرئين: ${RECITERS.map(r=>escapeHtml(r.name)).join(" • ")}</small>
    </div>
    <div class="tafsir"><b>📘 التفسير الميسّر (مختصر موثوق):</b><br>${escapeHtml(state.tafsir||"—")}</div>
    <div class="sel-actions">
      <button class="mini-btn" id="copyBtn">📋 نسخ الآية</button>
      <button class="mini-btn" id="copyTafBtn">📋 نسخ التفسير</button>
    </div>`;
  $("copyBtn").onclick=()=>{navigator.clipboard?.writeText(`﴿${state.ayahText}﴾ [${meta[1]}: ${state.ayah}]`);$("copyBtn").textContent="✓ تم النسخ";setTimeout(()=>$("copyBtn").textContent="📋 نسخ الآية",1500);};
  $("copyTafBtn").onclick=()=>{navigator.clipboard?.writeText(state.tafsir);$("copyTafBtn").textContent="✓ تم النسخ";setTimeout(()=>$("copyTafBtn").textContent="📋 نسخ التفسير",1500);};
  card.scrollIntoView({behavior:"smooth",block:"nearest"});
}

/* ---------- استخراج المتشابهات ---------- */
function findSimilar(){
  $("emptyResult").classList.add("hidden");
  if(!state.corpusReady){
    $("loadingSimilar").classList.remove("hidden");
    $("loadingSimilar").innerHTML=`<span class="spinner"></span> جاري تجهيز الفهرس أولًا… سيتم العرض تلقائيًا`;
    const iv=setInterval(()=>{
      if(state.corpusReady){clearInterval(iv);findSimilar();}
    },800);
    return;
  }
  $("loadingSimilar").classList.remove("hidden");
  setTimeout(()=>{
    const tNorm=normalizeArabic(state.ayahText);
    const tToks=normTokens(state.ayahText);
    const tSet=new Set(tToks);
    const full=[], part=[];
    for(const c of state.corpus){
      if(c.surah===state.surah && c.ayah===state.ayah) continue;
      if(c.norm===tNorm){ full.push({...c}); continue; }
      // ترشيح سريع: كلمتان مشتركتان على الأقل
      let common=0;
      for(const w of c.toks){ if(tSet.has(w)){common++; if(common>40)break;} }
      if(common<2) continue;
      const lcs=longestCommon(tToks,c.toks);
      if(lcs.len<2) continue;
      if(lcs.len===tToks.length && lcs.len===c.toks.length) continue;
      const pct=Math.round((2*lcs.len)/(tToks.length+c.toks.length)*100);
      const score=lcs.len*10+pct/10+Math.min(common,10)*0.4;
      part.push({...c,lcs,common,pct,score});
    }
    part.sort((a,b)=>b.score-a.score);
    state.full=full;
    state.partial=part.slice(0,30);
    $("loadingSimilar").classList.add("hidden");
    renderSimilar();
  },60);
}

/* ---------- عرض النتائج ---------- */
document.querySelectorAll(".tab").forEach(t=>{
  t.onclick=()=>{
    document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
    t.classList.add("active"); state.filter=t.dataset.filter; renderSimilar();
  };
});

function surahName(n){return SURAHS[n-1][1];}

function renderSimilar(){
  const f=state.filter;
  const showFull=f!=="partial", showPart=f!=="full";
  $("fullSection").classList.toggle("hidden",!(showFull&&state.full.length));
  $("partialSection").classList.toggle("hidden",!(showPart&&state.partial.length));
  $("fullCount").textContent=state.full.length?`${state.full.length} آية`:"";
  $("partialCount").textContent=state.partial.length?`${state.partial.length} آية`:"";
  $("resultCount").textContent=`— ${state.full.length} تطابق كلّي • ${state.partial.length} تشابه جزئي`;
  if(!state.full.length&&!state.partial.length){
    $("emptyResult").classList.remove("hidden");
    $("emptyResult").innerHTML=`<div class="empty-art">🌿</div><p><b>لا توجد متشابهات ظاهرة لهذه الآية في النطاق الحالي</b></p><p class="muted">جرّب آية أخرى — الآيات القصيرة والعبارات القرآنية المتكررة (مثل: تِلْكَ أُمَّةٌ قَدْ خَلَتْ، وَمَا اللَّهُ بِغَافِلٍ عَمَّا تَعْمَلُونَ) تعطي نتائج غنية.</p>`;
    return;
  }
  // التطابق الكلي
  $("fullList").innerHTML=state.full.map((c,i)=>`
    <article class="card full">
      <div class="card-top">
        <span class="surah-tag">📖 سورة ${escapeHtml(surahName(c.surah))} • السورة ${c.surah} • الآية ${c.ayah}</span>
        <span class="match-tag f">تطابق كلّي ✦</span>
      </div>
      <p class="card-text">﴿ ${escapeHtml(c.text)} ﴾</p>
      <div class="card-foot">
        <button class="mini-btn" onclick="jumpTo(${c.surah},${c.ayah})">↩ عرض موضعها</button>
        <button class="mini-btn" onclick="toggleTafsir(this,${c.surah},${c.ayah})">📘 التفسير</button>
        <button class="mini-btn" onclick="this.closest('.card').querySelector('.audio-box').classList.toggle('show')">🎧 التلاوة</button>
      </div>
      <div class="tafsir-box">—</div>
      <div class="tafsir-box audio-box reciter-box">
        <label class="reciter-pick">🎧 المقرئ:
          <select class="reciter-select" onchange="changeReciter(this,${c.global})" aria-label="اختيار المقرئ">${reciterOptions(RECITERS[0].id)}</select>
        </label>
        <audio controls preload="none" style="width:100%" src="${audioURL(RECITERS[0].id,c.global)}"></audio>
      </div>
    </article>`).join("");

  // التشابه الجزئي
  const tToks=normTokens(state.ayahText);
  $("partialList").innerHTML=state.partial.map(c=>{
    const hl=highlightTokens(c.text,c.lcs.startB,c.lcs.len);
    const ph=phraseFromTokens(tToks,c.lcs.startA,c.lcs.len);
    return `
    <article class="card part">
      <div class="card-top">
        <span class="surah-tag">📖 سورة ${escapeHtml(surahName(c.surah))} • السورة ${c.surah} • الآية ${c.ayah}</span>
        <span class="match-tag p">تشابه ${c.pct}% • ${c.lcs.len} كلمات</span>
      </div>
      <p class="card-text">﴿ ${hl} ﴾</p>
      <div class="phrase">🔗 العبارة المشتركة: <b>«${escapeHtml(ph)}»</b></div>
      <div class="sim-bar"><i style="width:${Math.max(c.pct,8)}%"></i></div>
      <div class="card-foot">
        <button class="mini-btn" onclick="jumpTo(${c.surah},${c.ayah})">↩ عرض موضعها</button>
        <button class="mini-btn" onclick="toggleTafsir(this,${c.surah},${c.ayah})">📘 التفسير</button>
        <button class="mini-btn" onclick="this.closest('.card').querySelector('.audio-box').classList.toggle('show')">🎧 التلاوة</button>
      </div>
      <div class="tafsir-box">—</div>
      <div class="tafsir-box audio-box reciter-box">
        <label class="reciter-pick">🎧 المقرئ:
          <select class="reciter-select" onchange="changeReciter(this,${c.global})" aria-label="اختيار المقرئ">${reciterOptions(RECITERS[0].id)}</select>
        </label>
        <audio controls preload="none" style="width:100%" src="${audioURL(RECITERS[0].id,c.global)}"></audio>
      </div>
    </article>`;
  }).join("");
}

/* تفسير آية مشابهة عند الطلب (الميسّر) */
async function toggleTafsir(btn,surah,ayah){
  const tBox=btn.closest(".card").querySelectorAll(".tafsir-box")[0];
  tBox.classList.toggle("show");
  if(tBox.dataset.loaded) return;
  const key=surah+":"+ayah;
  if(state.tafsirCache.has(key)){tBox.innerHTML=`<b>📘 التفسير الميسّر:</b><br>${escapeHtml(state.tafsirCache.get(key))}`;tBox.dataset.loaded="1";return;}
  tBox.innerHTML=`<span class="spinner"></span> جاري جلب التفسير…`;
  try{
    const r=await fetch(`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/ar.muyassar`);
    const j=await r.json();
    const t=j.data?.text||"—";
    state.tafsirCache.set(key,t);
    tBox.innerHTML=`<b>📘 التفسير الميسّر:</b><br>${escapeHtml(t)}`;
    tBox.dataset.loaded="1";
  }catch(e){tBox.innerHTML="تعذّر جلب التفسير.";}
}

/* الانتقال لموضع آية مشابهة وجعلها المقصودة */
async function jumpTo(surah,ayah){
  if(surah!==state.surah){ await selectSurah(surah); }
  onAyahClick(ayah);
  $("selectedCard").scrollIntoView({behavior:"smooth"});
  $("ayah-"+ayah)?.scrollIntoView({behavior:"smooth",block:"center"});
}

/* ---------- تشغيل ---------- */
initTheme();
renderSurahList();
selectSurah(2).then(()=>{ /* عرض تجريبي: آية لها تطابق كلي شهير */ if(state.surahAyahs.find(a=>a.num===134)) onAyahClick(134); });
loadCorpus();
