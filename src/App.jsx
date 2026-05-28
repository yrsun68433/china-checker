import { useState, useMemo } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const REQUIRED_COURSES = [
  { id: "NtlDev1098", code: "341 11740", name: "歐盟莫內講座—中國大陸研究學程導論", teacher: "葉國俊", semesters: "111-1、112-1、113-1、114-1" },
  { id: "NtlDev1095", code: "341 17850", name: "中國大陸研究學程導論", teacher: "葉國俊", semesters: "105-1 至 110-1" },
];

const DOMAIN_COURSES = {
  politics: {
    label: "政治領域",
    color: "#b45309",
    bg: "#fef3c7",
    courses: [
      { id: "PS7047",      code: "322 M4240", name: "中國大陸研究方法專題",           teacher: "石之瑜",  semesters: "103-1" },
      { id: "PS7507",      code: "322 M1670", name: "中共外交政策專題",               teacher: "明居正",  semesters: "105-2、106-2" },
      { id: "PS7046",      code: "322 M4230", name: "中共政治專題",                   teacher: "明居正",  semesters: "105-1、107-1" },
      { id: "PS5061",      code: "322 U1800", name: "中共黨史導論專題",               teacher: "張登及",  semesters: "105-1、107-1、109-1、111-1" },
      { id: "NtlDev7075a", code: "341 M5330", name: "中國大陸法政專題（政治）",       teacher: "李炳南",  semesters: "105-1至111-1" },
      { id: "PS7581",      code: "322 M5010", name: "國際關係理論與中共外交專題",     teacher: "張登及",  semesters: "106-1、108-1、110-1、112-1、114-1" },
      { id: "PS4002",      code: "302 49500", name: "中國大陸政治經濟發展",           teacher: "政治系",  semesters: "105-2至114-2" },
      { id: "PS3208",      code: "302 32430", name: "中國政治哲學概論",               teacher: "安井伸介",semesters: "105-2至114-2" },
      { id: "PS5676",      code: "322 U1940", name: "中國大陸政治經濟專題",           teacher: "徐斯勤",  semesters: "105-2至114-2" },
      { id: "PS3106",      code: "302 32420", name: "中國政治哲學二",                 teacher: "政治系",  semesters: "105-2至114-2" },
      { id: "NtlDev5313",  code: "341 U9280", name: "鄧小平後的大陸政經改革專題",   teacher: "周嘉辰",  semesters: "105-2至114-1" },
      { id: "PS4001",      code: "302 41710", name: "中國大陸政府與政治",             teacher: "陶儀芬",  semesters: "105-1至114-1" },
      { id: "NtlDev5295",  code: "341 U9120", name: "中國大陸與世界政治專題",         teacher: "周嘉辰",  semesters: "105-1至110-1、114-2" },
      { id: "PS7011",      code: "322 M3830", name: "中國政治思想專題",               teacher: "政治系",  semesters: "105-1至114-2" },
      { id: "PS3105",      code: "302 32410", name: "中國政治哲學一",                 teacher: "政治系",  semesters: "105-1至114-1" },
      { id: "NtlDev8045",  code: "341 D1590", name: "比較政治與中國大陸研究專題",   teacher: "周嘉辰",  semesters: "105-2等" },
      { id: "PS7042",      code: "322 M4070", name: "中國大陸政經發展專題",           teacher: "政治系",  semesters: "106-1至114-1" },
      { id: "NtlDev5317a", code: "341 U9310", name: "中國科技、政治與社會",           teacher: "劉秋婉",  semesters: "109-1至113-1" },
      { id: "NtlDev5324",  code: "341 U9380", name: "中美關係與全球治理專題",         teacher: "林竣達",  semesters: "111-1至114-1" },
      { id: "PS7591",      code: "322 M5110", name: "思想與中國個案比較專題",         teacher: "石之瑜",  semesters: "99-2等" },
      { id: "NtlDev7176",  code: "341 M6410", name: "威權體制與中國政治專題",         teacher: "周嘉辰",  semesters: "113-2" },
      { id: "PS5150",      code: "322 U2500", name: "中國大陸奢侈品消費的政治風險分析",teacher: "黃旻華",  semesters: "111-1至113-1" },
      { id: "Hist3108",    code: "103 52230", name: "現代中國與世界：1842-1911",       teacher: "王遠義",  semesters: "101-1至114-1" },
      { id: "Hist1591",    code: "103 51860", name: "現代中國與世界：1911-1979",       teacher: "王遠義",  semesters: "100-2至114-2" },
      { id: "Hist2175",    code: "103 10830", name: "中國現代史",                     teacher: "韓承樺",  semesters: "111-1、112-2、114-1" },
      { id: "Hist7246",    code: "123 M7550", name: "中國政治思想史專題",             teacher: "傅揚",    semesters: "111-1、113-1" },
      { id: "Hist1616",    code: "103 53140", name: "歷史上的中國與周邊世界",         teacher: "傅揚",    semesters: "109-2、111-1、113-1" },
    ],
  },
  law: {
    label: "法律領域",
    color: "#6d28d9",
    bg: "#ede9fe",
    courses: [
      { id: "NtlDev5170",  code: "341 U7750", name: "中華人民共和國法制專題",         teacher: "陳顯武",  semesters: "105-1至111-2" },
      { id: "NtlDev1050",  code: "341 11590", name: "中國大陸法律發展",               teacher: "陳顯武",  semesters: "106-1至110-1" },
      { id: "NtlDev7075b", code: "341 M5330", name: "中國大陸法政專題（法律）",       teacher: "李炳南",  semesters: "105-1至111-1" },
      { id: "Hist2104a",   code: "103 51660", name: "中國傳統法律、文化與社會",       teacher: "陳俊強",  semesters: "98-2至114-2" },
      { id: "Hist5126a",   code: "123 U9420", name: "中國司法社會史",                 teacher: "長谷川正人",semesters: "108-2至114-2" },
      { id: "LAW5563",     code: "A21 U3660", name: "中國法制及兩岸關係法律",         teacher: "王泰銓",  semesters: "111-2、113-2、114-2" },
    ],
  },
  society: {
    label: "社會領域",
    color: "#065f46",
    bg: "#d1fae5",
    courses: [
      { id: "Soc3016",     code: "305 61300", name: "當代中國政治與社會",             teacher: "陳志柔",  semesters: "105-2、108-1" },
      { id: "NtlDev5213a", code: "341 U8260", name: "中國經濟發展與改革專題",         teacher: "唐代彪",  semesters: "105-1至110-2" },
      { id: "NtlDev5247",  code: "341 U8630", name: "中國社會制度與變遷專題",         teacher: "施世駿",  semesters: "96-1、112-2至114-2" },
      { id: "NtlDev1038b", code: "341 11470", name: "中共的政經社發展",               teacher: "吳秀玲",  semesters: "105-1" },
      { id: "AGEC4006",    code: "607 45400", name: "中國大陸農業經濟問題",           teacher: "陸雲",    semesters: "105-2、106-2" },
      { id: "Hist2104b",   code: "103 51660", name: "中國傳統法律、文化與社會（社）", teacher: "陳俊強",  semesters: "98-2至114-2" },
      { id: "Hist5126b",   code: "123 U9420", name: "中國司法社會史（社）",           teacher: "長谷川正人",semesters: "108-2、110-2、113-2" },
    ],
  },
  economy: {
    label: "經濟領域",
    color: "#1e40af",
    bg: "#dbeafe",
    courses: [
      { id: "ECON3028",    code: "303 28000", name: "當代中國經濟",                   teacher: "張清溪",  semesters: "105-2至109-2" },
      { id: "NtlDev5213b", code: "341 U8260", name: "中國經濟發展與改革專題（經）",   teacher: "唐代彪",  semesters: "108-2至110-2" },
      { id: "AGEC4017",    code: "607 49510", name: "中國經濟（農經大學部）",         teacher: "農經系",  semesters: "107-1至114-2" },
      { id: "AGEC7111",    code: "627 M9700", name: "中國經濟（農經研究所）",         teacher: "羅竹平",  semesters: "105-1至114-2" },
      { id: "IB7089",      code: "724 M1410", name: "中國經濟專題研討",               teacher: "黃志典",  semesters: "105-1至114-1" },
      { id: "NtlDev5319",  code: "341 U9330", name: "中國金融與金融科技",             teacher: "劉秋婉",  semesters: "109-2" },
      { id: "NtlDev7152a", code: "341 M6090", name: "中國國家資本主義專題",           teacher: "林竣達",  semesters: "110-2" },
      { id: "Hist2123",    code: "103 10490", name: "中國經濟史",                     teacher: "傅揚",    semesters: "109-2至114-2" },
    ],
  },
  crossStrait: {
    label: "兩岸關係領域",
    color: "#9d174d",
    bg: "#fce7f3",
    courses: [
      { id: "PS7043",      code: "322 M3950", name: "兩岸關係專題",                   teacher: "政治所",  semesters: "104-1等" },
      { id: "JOUR7061",    code: "342 M2700", name: "兩岸三地新聞專題",               teacher: "新聞所",  semesters: "104-2、110-2、111-2" },
      { id: "JOUR7064",    code: "342 M2730", name: "國際政治與兩岸關係專題",         teacher: "明居正",  semesters: "105-2、106-2" },
      { id: "PS7532",      code: "322 M3890", name: "兩岸關係研究途徑專題",           teacher: "吳玉山",  semesters: "105-1等" },
      { id: "NtlDev5017",  code: "341 U2080", name: "兩岸關係專題研究",               teacher: "周繼祥",  semesters: "106-2至111-2" },
      { id: "NtlDev5025",  code: "341 U4060", name: "兩岸人民關係條例專題",           teacher: "陳明通",  semesters: "105-1等" },
      { id: "Hist1536",    code: "103 51140", name: "海峽兩岸關係史一",               teacher: "李君山",  semesters: "105-1至114-1" },
      { id: "Hist1537",    code: "103 51150", name: "海峽兩岸關係史二",               teacher: "李君山",  semesters: "105-2至114-2" },
      { id: "NtlDev7091",  code: "341 M5480", name: "兩岸經濟發展專題",               teacher: "葉國俊",  semesters: "105-2至110-1" },
      { id: "NtlDev7158",  code: "341 M6150", name: "歐盟莫內講座-兩岸經濟發展專題", teacher: "葉國俊",  semesters: "111-1至114-1" },
      { id: "NtlDev5062",  code: "341 U6460", name: "現階段大陸政策分析專題",         teacher: "陳明通",  semesters: "105-1至110-1" },
      { id: "PS7608",      code: "322 M5270", name: "兩岸政經互動專題（研）",         teacher: "唐欣偉",  semesters: "105-2至110-1" },
      { id: "PS5715",      code: "322 U2510", name: "兩岸政經互動專題（大）",         teacher: "左正東",  semesters: "111-2至114-1" },
      { id: "NtlDev7135",  code: "341 M5920", name: "兩岸關係理論與實務專題",         teacher: "徐銘謙",  semesters: "109-1" },
      { id: "NtlDev7153",  code: "341 M6100", name: "中國與全球氣候治理專題",         teacher: "林竣達",  semesters: "110-2至114-2" },
      { id: "LAW5563b",    code: "A21 U3660", name: "中國法制及兩岸關係法律（兩岸）", teacher: "王泰銓",  semesters: "111-2至114-2" },
    ],
  },
};

const DOMAIN_KEYS = Object.keys(DOMAIN_COURSES);
const CREDIT_OPTIONS = [1, 2, 3, 4, 5];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function computeStatus(selectedRequired, selectedDomains, cohort) {
  const hasRequired = selectedRequired.length > 0;
  const totalCredits =
    selectedRequired.reduce((s, c) => s + (c.credits || 0), 0) +
    Object.values(selectedDomains).flat().reduce((s, c) => s + (c.credits || 0), 0);
  const domainCount = DOMAIN_KEYS.filter(k => (selectedDomains[k] || []).length > 0).length;
  if (cohort === "before108") {
    return { creditReq: 20, domainReq: 3, needsIntro: false, totalCredits, domainCount, hasRequired, passed: totalCredits >= 20 && domainCount >= 3 };
  }
  return { creditReq: 15, domainReq: 2, needsIntro: true, totalCredits, domainCount, hasRequired, passed: hasRequired && totalCredits >= 15 && domainCount >= 2 };
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function ProgressBar({ value, max, color }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ background: "#e5e7eb", borderRadius: 99, height: 8, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.5s cubic-bezier(.4,0,.2,1)" }} />
    </div>
  );
}

function CreditSelector({ value, onChange, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
      {CREDIT_OPTIONS.map(n => (
        <button
          key={n}
          onClick={e => { e.stopPropagation(); onChange(n); }}
          style={{
            width: 22, height: 22, borderRadius: 4, border: "none",
            background: value === n ? color : "#e5e7eb",
            color: value === n ? "#fff" : "#6b7280",
            fontWeight: 700, fontSize: 11, cursor: "pointer",
            transition: "all 0.12s",
          }}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

function CourseRow({ course, checked, credits, onChange, onCreditsChange, domainColor, domainBg }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 10px",
      borderRadius: 7,
      background: checked ? domainBg : "transparent",
      border: checked ? `1.5px solid ${domainColor}44` : "1.5px solid transparent",
      transition: "all 0.15s",
    }}>
      <input
        type="checkbox" checked={checked} onChange={onChange}
        style={{ marginTop: 3, accentColor: domainColor, width: 15, height: 15, flexShrink: 0, cursor: "pointer" }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: "#1f2937", lineHeight: 1.4 }}>{course.name}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 3 }}>
          <span style={{ fontSize: 11, color: "#6b7280" }}>{course.code}</span>
          <span style={{ fontSize: 11, color: "#d1d5db" }}>·</span>
          <span style={{ fontSize: 11, color: "#6b7280" }}>{course.teacher}</span>
          <span style={{ fontSize: 11, color: "#d1d5db" }}>·</span>
          <span style={{ fontSize: 11, color: "#9ca3af" }}>{course.semesters}</span>
        </div>
      </div>
      {checked && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3, flexShrink: 0 }}>
          <span style={{ fontSize: 10, color: domainColor, fontWeight: 600, fontFamily: "system-ui" }}>學分</span>
          <CreditSelector value={credits} onChange={onCreditsChange} color={domainColor} />
        </div>
      )}
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

export default function App() {
  const [cohort, setCohort] = useState("after108");
  // selectedRequired: [{...course, credits}]
  const [selectedRequired, setSelectedRequired] = useState([]);
  // selectedDomains: { domainKey: [{...course, credits}] }
  const [selectedDomains, setSelectedDomains] = useState({ politics: [], law: [], society: [], economy: [], crossStrait: [] });
  const [expandedDomain, setExpandedDomain] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  const status = useMemo(() => computeStatus(selectedRequired, selectedDomains, cohort), [selectedRequired, selectedDomains, cohort]);

  const toggleRequired = (course) => {
    setSelectedRequired(prev => {
      const exists = prev.find(c => c.id === course.id);
      if (exists) return prev.filter(c => c.id !== course.id);
      return [{ ...course, credits: 3 }]; // one at a time, default 3
    });
  };

  const setRequiredCredits = (id, credits) => {
    setSelectedRequired(prev => prev.map(c => c.id === id ? { ...c, credits } : c));
  };

  const toggleDomainCourse = (dk, course) => {
    setSelectedDomains(prev => {
      const cur = prev[dk] || [];
      const exists = cur.find(c => c.id === course.id);
      if (exists) return { ...prev, [dk]: cur.filter(c => c.id !== course.id) };
      return { ...prev, [dk]: [...cur, { ...course, credits: 3 }] };
    });
  };

  const setDomainCredits = (dk, id, credits) => {
    setSelectedDomains(prev => ({
      ...prev,
      [dk]: prev[dk].map(c => c.id === id ? { ...c, credits } : c),
    }));
  };

  const allSelected = [...selectedRequired, ...Object.values(selectedDomains).flat()];

  return (
    <div style={{ fontFamily: "'Noto Serif TC', Georgia, serif", minHeight: "100vh", background: "linear-gradient(135deg, #f8f7f4 0%, #eef0f5 100%)", paddingBottom: 60 }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f1a35 0%, #1a2340 60%, #1e2d50 100%)",
        padding: "28px 24px 24px",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* decorative circles */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(147,197,253,0.05)" }} />
        <div style={{ position: "absolute", bottom: -80, left: -30, width: 200, height: 200, borderRadius: "50%", background: "rgba(147,197,253,0.04)" }} />
        {/* left accent bar */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "linear-gradient(to bottom, #60a5fa, #3b82f6)" }} />

        <div style={{ position: "relative", textAlign: "center" }}>
          {/* top label */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 10, color: "#93c5fd", letterSpacing: "0.18em",
            fontWeight: 600, marginBottom: 10, fontFamily: "system-ui",
          }}>
            <div style={{ width: 20, height: 1, background: "#60a5fa" }} />
            國立臺灣大學 · 社會科學院
            <div style={{ width: 20, height: 1, background: "#60a5fa" }} />
          </div>

          {/* main title */}
          <h1 style={{
            margin: 0,
            fontSize: "clamp(26px, 5vw, 38px)",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "0.06em",
            lineHeight: 1.1,
            fontFamily: "'Noto Serif TC', 'Source Han Serif TC', serif",
            textShadow: "0 2px 20px rgba(0,0,0,0.4)",
          }}>
            中國大陸研究學程
          </h1>

          {/* subtitle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 10 }}>
            <div style={{ height: 1, width: 32, background: "rgba(147,197,253,0.4)" }} />
            <p style={{
              margin: 0, fontSize: 13, color: "#93c5fd",
              fontFamily: "system-ui", letterSpacing: "0.14em", fontWeight: 500,
            }}>
              修課審核試算系統
            </p>
            <div style={{ height: 1, width: 32, background: "rgba(147,197,253,0.4)" }} />
          </div>
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>

        {/* Cohort selector */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 18, marginTop: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12, fontFamily: "system-ui" }}>申請學年度</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { value: "after108", label: "108學年度（含）以後", desc: "必修導論 + 跨≥2領域 + ≥15學分" },
              { value: "before108", label: "108學年度以前", desc: "跨≥3領域 + ≥20學分（無強制必修）" },
            ].map(opt => (
              <button key={opt.value} onClick={() => setCohort(opt.value)} style={{
                flex: 1, minWidth: 200, padding: "12px 16px", borderRadius: 8, cursor: "pointer",
                border: cohort === opt.value ? "2px solid #1a2340" : "2px solid #e5e7eb",
                background: cohort === opt.value ? "#1a2340" : "#f9fafb",
                color: cohort === opt.value ? "#fff" : "#374151",
                textAlign: "left", fontFamily: "system-ui", transition: "all 0.2s",
              }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{opt.label}</div>
                <div style={{ fontSize: 11, opacity: 0.7, marginTop: 3 }}>{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Status card */}
        <div style={{ background: status.passed ? "#065f46" : "#1a2340", borderRadius: 12, padding: "18px 20px", marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.12)", transition: "background 0.4s" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", fontFamily: "system-ui" }}>審核結果</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginTop: 4 }}>
                {status.passed ? "✓ 符合修畢條件" : "尚未符合條件"}
              </div>
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#fff" }}>{status.totalCredits}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "system-ui" }}>/ {status.creditReq} 學分</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#fff" }}>{status.domainCount}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "system-ui" }}>/ {status.domainReq} 領域</div>
              </div>
              {status.needsIntro && (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: status.hasRequired ? "#6ee7b7" : "#fca5a5" }}>{status.hasRequired ? "✓" : "✗"}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "system-ui" }}>必修</div>
                </div>
              )}
            </div>
          </div>
          <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 120 }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 4, fontFamily: "system-ui" }}>學分進度</div>
              <ProgressBar value={status.totalCredits} max={status.creditReq} color="#6ee7b7" />
            </div>
            <div style={{ flex: 1, minWidth: 120 }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 4, fontFamily: "system-ui" }}>領域進度</div>
              <ProgressBar value={status.domainCount} max={status.domainReq} color="#93c5fd" />
            </div>
          </div>
          <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {status.needsIntro && (
              <span style={{ fontSize: 12, color: status.hasRequired ? "#6ee7b7" : "#fca5a5", fontFamily: "system-ui" }}>
                {status.hasRequired ? "✓" : "○"} 必修導論課程
              </span>
            )}
            <span style={{ fontSize: 12, color: status.totalCredits >= status.creditReq ? "#6ee7b7" : "#fca5a5", fontFamily: "system-ui" }}>
              {status.totalCredits >= status.creditReq ? "✓" : "○"} 總學分 ≥ {status.creditReq}
            </span>
            <span style={{ fontSize: 12, color: status.domainCount >= status.domainReq ? "#6ee7b7" : "#fca5a5", fontFamily: "system-ui" }}>
              {status.domainCount >= status.domainReq ? "✓" : "○"} 跨 ≥ {status.domainReq} 領域
            </span>
          </div>
        </div>

        {/* Credit hint */}
        <div style={{ marginTop: 10, padding: "8px 12px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, fontSize: 11, color: "#1e40af", fontFamily: "system-ui", lineHeight: 1.6 }}>
          💡 勾選課程後，點擊右側數字按鈕輸入正確學分數（請至 <strong>course.ntu.edu.tw</strong> 查詢）
        </div>

        {/* Required courses */}
        {cohort === "after108" && (
          <div style={{ marginTop: 14 }}>
            <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", background: "#1a2340", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontWeight: 800, fontSize: 14, color: "#fff" }}>必修課程</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginLeft: 8, fontFamily: "system-ui" }}>二擇一</span>
                </div>
                {selectedRequired.length > 0 && (
                  <span style={{ fontSize: 12, color: "#6ee7b7", fontFamily: "system-ui" }}>
                    ✓ 已選 · {selectedRequired.reduce((s, c) => s + (c.credits || 0), 0)} 學分
                  </span>
                )}
              </div>
              <div style={{ padding: "10px 10px" }}>
                {REQUIRED_COURSES.map(course => {
                  const sel = selectedRequired.find(c => c.id === course.id);
                  return (
                    <CourseRow
                      key={course.id} course={course}
                      checked={!!sel} credits={sel?.credits}
                      onChange={() => toggleRequired(course)}
                      onCreditsChange={n => setRequiredCredits(course.id, n)}
                      domainColor="#1a2340" domainBg="#eff6ff"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Domain courses */}
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
          {DOMAIN_KEYS.map(dk => {
            const domain = DOMAIN_COURSES[dk];
            const selected = selectedDomains[dk] || [];
            const isOpen = expandedDomain === dk;
            const domainCredits = selected.reduce((s, c) => s + (c.credits || 0), 0);
            return (
              <div key={dk} style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: "1px solid #e5e7eb", overflow: "hidden" }}>
                <button onClick={() => setExpandedDomain(isOpen ? null : dk)} style={{
                  width: "100%", padding: "14px 18px",
                  background: isOpen ? domain.bg : "#fff",
                  border: "none", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  transition: "background 0.2s",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: domain.color, flexShrink: 0 }} />
                    <span style={{ fontWeight: 800, fontSize: 14, color: "#1f2937" }}>{domain.label}</span>
                    <span style={{ fontSize: 11, color: "#9ca3af", fontFamily: "system-ui" }}>{domain.courses.length} 門</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {selected.length > 0 && (
                      <span style={{ fontSize: 12, fontWeight: 700, color: domain.color, background: domain.bg, padding: "2px 8px", borderRadius: 99, fontFamily: "system-ui" }}>
                        {selected.length} 門 · {domainCredits} 學分
                      </span>
                    )}
                    <span style={{ color: "#9ca3af", fontSize: 16 }}>{isOpen ? "▲" : "▼"}</span>
                  </div>
                </button>
                {isOpen && (
                  <div style={{ padding: "8px 10px 12px", borderTop: `2px solid ${domain.color}22` }}>
                    {domain.courses.map(course => {
                      const sel = selected.find(c => c.id === course.id);
                      return (
                        <CourseRow
                          key={course.id} course={course}
                          checked={!!sel} credits={sel?.credits}
                          onChange={() => toggleDomainCourse(dk, course)}
                          onCreditsChange={n => setDomainCredits(dk, course.id, n)}
                          domainColor={domain.color} domainBg={domain.bg}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary */}
        {allSelected.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <button onClick={() => setShowSummary(!showSummary)} style={{
              width: "100%", padding: 13,
              background: "#f3f4f6", border: "1px solid #e5e7eb",
              borderRadius: 10, cursor: "pointer",
              fontWeight: 700, fontSize: 13, color: "#374151", fontFamily: "system-ui",
            }}>
              {showSummary ? "▲ 隱藏已選課程" : `▼ 查看已選課程（${allSelected.length} 門，共 ${status.totalCredits} 學分）`}
            </button>
            {showSummary && (
              <div style={{ background: "#fff", borderRadius: 10, marginTop: 8, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", background: "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                  <span style={{ fontWeight: 800, fontSize: 13, color: "#1f2937" }}>已選課程清單</span>
                </div>
                <div style={{ padding: 12 }}>
                  {cohort === "after108" && selectedRequired.map(c => (
                    <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 8px", borderRadius: 6, background: "#eff6ff", marginBottom: 4 }}>
                      <div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#1e40af" }}>必修</span>
                        <span style={{ fontSize: 13, color: "#1f2937", marginLeft: 8 }}>{c.name}</span>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#1e40af", flexShrink: 0 }}>{c.credits} 學分</span>
                    </div>
                  ))}
                  {DOMAIN_KEYS.map(dk => (selectedDomains[dk] || []).map(c => (
                    <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 8px", borderRadius: 6, background: DOMAIN_COURSES[dk].bg, marginBottom: 4 }}>
                      <div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: DOMAIN_COURSES[dk].color }}>{DOMAIN_COURSES[dk].label}</span>
                        <span style={{ fontSize: 13, color: "#1f2937", marginLeft: 8 }}>{c.name}</span>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: DOMAIN_COURSES[dk].color, flexShrink: 0 }}>{c.credits} 學分</span>
                    </div>
                  )))}
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 8px", borderTop: "2px solid #f3f4f6", marginTop: 6, fontFamily: "system-ui" }}>
                    <span style={{ fontWeight: 700, color: "#374151" }}>合計</span>
                    <span style={{ fontWeight: 800, color: "#1a2340", fontSize: 15 }}>{status.totalCredits} 學分</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer note */}
        <div style={{ marginTop: 20, padding: "12px 16px", background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10, fontSize: 11, color: "#78350f", lineHeight: 1.7, fontFamily: "system-ui" }}>
          <strong>⚠️ 注意：</strong>
          {cohort === "after108"
            ? "108學年度（含）以後申請者，須修畢必修導論（二擇一），並跨選至少 2 個領域，總學分達 15 學分以上。"
            : "108學年度以前申請者，須跨選至少 3 個領域，總學分達 20 學分以上（無強制必修導論）。"}
          　試算結果僅供參考，最終認定以學程承辦單位審核為準。
        </div>

      </div>
    </div>
  );
}
