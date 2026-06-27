import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared/constants/routes";
import "../../styles/projectsRegister.css";

// =====================
// 날짜 유틸
// =====================
const isLeapYear = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const getDaysInMonth = (year: number, month: number) => {
  const days = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[month - 1];
};

const pad = (n: number) => String(n).padStart(2, "0");

const formatDate = (y: number, m: number, d: number) =>
  `${y}/${pad(m)}/${pad(d)}`;

interface DateVal { year: number; month: number; day: number }

const compareDates = (a: DateVal, b: DateVal) => {
  if (a.year !== b.year) return a.year - b.year;
  if (a.month !== b.month) return a.month - b.month;
  return a.day - b.day;
};

// =====================
// 캘린더 피커 (단일 날짜)
// =====================
interface SinglePickerProps {
  value: DateVal | null;
  onChange: (d: DateVal) => void;
  minDate?: DateVal | null;
}

const SingleDatePicker: React.FC<SinglePickerProps> = ({ value, onChange, minDate }) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(value?.year ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(value?.month ?? today.getMonth() + 1);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = new Date(viewYear, viewMonth - 1, 1).getDay();

  const isDisabled = (day: number) => {
    if (!minDate) return false;
    return compareDates({ year: viewYear, month: viewMonth, day }, minDate) < 0;
  };

  const isSelected = (day: number) =>
    value?.year === viewYear && value?.month === viewMonth && value?.day === day;

  const prevMonth = () => {
    if (viewMonth === 1) { setViewYear(y => y - 1); setViewMonth(12); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 12) { setViewYear(y => y + 1); setViewMonth(1); }
    else setViewMonth(m => m + 1);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="cal">
      <div className="cal__nav">
        <button className="cal__nav-btn" onClick={prevMonth}>‹</button>
        <span className="cal__title">{viewYear}년 {viewMonth}월</span>
        <button className="cal__nav-btn" onClick={nextMonth}>›</button>
      </div>
      <div className="cal__grid cal__grid--7">
        {["일","월","화","수","목","금","토"].map(d => (
          <span key={d} className="cal__dow">{d}</span>
        ))}
        {cells.map((day, i) => (
          <button
            key={i}
            className={`cal__day ${day && isSelected(day) ? "cal__day--selected" : ""} ${day && isDisabled(day) ? "cal__day--disabled" : ""} ${!day ? "cal__day--empty" : ""}`}
            disabled={!day || isDisabled(day)}
            onClick={() => day && onChange({ year: viewYear, month: viewMonth, day })}
          >
            {day ?? ""}
          </button>
        ))}
      </div>
    </div>
  );
};

// =====================
// 날짜 범위 피커
// =====================
interface DateRangePickerProps {
  startDate: DateVal | null;
  endDate: DateVal | null;
  onChangeStart: (d: DateVal) => void;
  onChangeEnd: (d: DateVal) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ startDate, endDate, onChangeStart, onChangeEnd }) => {
  const today = new Date();
  const initYear = startDate?.year ?? today.getFullYear();
  const initMonth = startDate?.month ?? today.getMonth() + 1;

  const [viewYear, setViewYear] = useState(initYear);
  const [viewMonth, setViewMonth] = useState(initMonth);
  const [selecting, setSelecting] = useState<"start" | "end">("start");

  const rightYear = viewMonth === 12 ? viewYear + 1 : viewYear;
  const rightMonth = viewMonth === 12 ? 1 : viewMonth + 1;

  const isInRange = (year: number, month: number, day: number) => {
    if (!startDate || !endDate) return false;
    const cur = { year, month, day };
    return compareDates(cur, startDate) > 0 && compareDates(cur, endDate) < 0;
  };

  const isStart = (year: number, month: number, day: number) =>
    startDate?.year === year && startDate?.month === month && startDate?.day === day;

  const isEnd = (year: number, month: number, day: number) =>
    endDate?.year === year && endDate?.month === month && endDate?.day === day;

  const handleDayClick = (year: number, month: number, day: number) => {
    const clicked = { year, month, day };
    if (selecting === "start") {
      onChangeStart(clicked);
      if (endDate && compareDates(clicked, endDate) >= 0) onChangeEnd(null as any);
      setSelecting("end");
    } else {
      if (startDate && compareDates(clicked, startDate) < 0) {
        onChangeStart(clicked);
        onChangeEnd(null as any);
        setSelecting("end");
      } else {
        onChangeEnd(clicked);
        setSelecting("start");
      }
    }
  };

  const prevMonth = () => {
    if (viewMonth === 1) { setViewYear(y => y - 1); setViewMonth(12); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 12) { setViewYear(y => y + 1); setViewMonth(1); }
    else setViewMonth(m => m + 1);
  };

  const CalMonth = ({ year, month }: { year: number; month: number }) => {
    const days = getDaysInMonth(year, month);
    const firstDay = new Date(year, month - 1, 1).getDay();
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= days; d++) cells.push(d);

    return (
      <div className="cal cal--range">
        <div className="cal__month-title">{year}년 {month}월</div>
        <div className="cal__grid cal__grid--7">
          {["일","월","화","수","목","금","토"].map(d => (
            <span key={d} className="cal__dow">{d}</span>
          ))}
          {cells.map((day, i) => (
            <button
              key={i}
              className={[
                "cal__day",
                !day ? "cal__day--empty" : "",
                day && isStart(year, month, day) ? "cal__day--start" : "",
                day && isEnd(year, month, day) ? "cal__day--end" : "",
                day && isInRange(year, month, day) ? "cal__day--in-range" : "",
              ].join(" ")}
              disabled={!day}
              onClick={() => day && handleDayClick(year, month, day)}
            >
              {day ?? ""}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="cal-range-wrap">
      <div className="cal-range-nav">
        <button className="cal__nav-btn" onClick={prevMonth}>‹</button>
        <button className="cal__nav-btn" onClick={nextMonth}>›</button>
      </div>
      <div className="cal-range-months">
        <CalMonth year={viewYear} month={viewMonth} />
        <CalMonth year={rightYear} month={rightMonth} />
      </div>
      <p className="cal-range-hint">
        {selecting === "start" ? "시작 날짜를 선택해 주세요." : "종료 날짜를 선택해 주세요."}
      </p>
    </div>
  );
};

// =====================
// Step 1: 활동 유형
// =====================
const Step1ActivityType: React.FC<{ onNext: () => void; onPrev: () => void }> = ({ onNext, onPrev }) => {
  const [selected, setSelected] = useState<"contest" | "personal" | null>(null);
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!selected) { setError("활동 유형을 선택해 주세요."); return; }
    setError(""); onNext();
  };

  return (
    <section className="step-section">
      <div className="step-header">
        <h2 className="step-title">1단계: 활동 유형</h2>
        <p className="step-subtitle">원하는 활동을 선택해 주세요.</p>
      </div>
      <div className="step-body">
        <div className="activity-grid">
          <div className="activity-item">
            <span className="activity-label">🏆 공모전 참가</span>
            <button className={`activity-btn ${selected === "contest" ? "activity-btn--selected" : ""}`} onClick={() => { setSelected("contest"); setError(""); }}>
              {selected === "contest" ? "선택됨(예: 기본)" : "선택 가능"}
            </button>
            <span className="activity-hint">대회 참여를 위한 모집</span>
          </div>
          <div className="activity-item">
            <span className="activity-label">🔧 개인 프로젝트</span>
            <button className={`activity-btn ${selected === "personal" ? "activity-btn--selected" : ""}`} onClick={() => { setSelected("personal"); setError(""); }}>
              {selected === "personal" ? "선택됨(예: 기본)" : "선택 가능"}
            </button>
            <span className="activity-hint">자율 프로젝트 팀 모집</span>
          </div>
        </div>
        {error && <p className="form-error">{error}</p>}
      </div>
      <div className="step-actions">
        <button className="btn btn--outline" onClick={onPrev}>이전</button>
        <button className="btn btn--primary" onClick={handleNext}>다음</button>
      </div>
    </section>
  );
};

// =====================
// Step 2: 기본 정보
// =====================
const Step2BasicInfo: React.FC<{ onNext: () => void; onPrev: () => void }> = ({ onNext, onPrev }) => {
  const [form, setForm] = useState({ title: "", description: "", contestName: "", contestLink: "" });
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleNext = () => {
    const newErrors: typeof errors = {};
    if (!form.title.trim()) newErrors.title = "제목은 필수 항목입니다.";
    if (!form.description.trim()) newErrors.description = "상세 내용은 필수 항목입니다.";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    onNext();
  };

  return (
    <section className="step-section">
      <div className="step-header">
        <h2 className="step-title">2단계: 기본 정보</h2>
        <p className="step-subtitle">프로젝트의 핵심 정보를 입력해 주세요.</p>
      </div>
      <div className="step-body">
        <div className="form-grid">
          <div className="form-field">
            <label className="form-label">제목 <span className="form-required">*</span></label>
            <input className={`form-input ${errors.title ? "form-input--error" : ""}`} name="title" value={form.title} onChange={handleChange} placeholder="예: AI 기반 과제 자동화 도구" />
            {errors.title ? <span className="form-error">{errors.title}</span> : <span className="form-hint">짧고 구체적으로</span>}
          </div>
          <div className="form-field">
            <label className="form-label">상세 내용 <span className="form-required">*</span></label>
            <textarea className={`form-input form-textarea ${errors.description ? "form-input--error" : ""}`} name="description" value={form.description} onChange={handleChange} placeholder="목표, 진행 방식, 기대 결과를 자유롭게 작성" />
            {errors.description ? <span className="form-error">{errors.description}</span> : <span className="form-hint">여기에 textarea</span>}
          </div>
          <div className="form-field">
            <label className="form-label">공모전명</label>
            <input className="form-input" name="contestName" value={form.contestName} onChange={handleChange} placeholder="해당 시 기재 (없으면 공란)" />
            <span className="form-hint">선택 입력</span>
          </div>
          <div className="form-field">
            <label className="form-label">공모전 링크</label>
            <input className="form-input" name="contestLink" value={form.contestLink} onChange={handleChange} placeholder="공식 페이지 URL" />
            <span className="form-hint">선택 입력</span>
          </div>
        </div>
      </div>
      <div className="step-actions">
        <button className="btn btn--outline" onClick={onPrev}>이전</button>
        <button className="btn btn--primary" onClick={handleNext}>다음</button>
      </div>
    </section>
  );
};

// =====================
// Step 3: 모집 역할
// =====================
interface CustomRole { id: number; name: string; count: number; }

const Step3Roles: React.FC<{ onNext: () => void; onPrev: () => void }> = ({ onNext, onPrev }) => {
  const [roles, setRoles] = useState({ developer: 0, designer: 0, planner: 0 });
  const [customRoles, setCustomRoles] = useState<CustomRole[]>([]);
  const [newRoleName, setNewRoleName] = useState("");
  const [error, setError] = useState("");

  const adjust = (role: keyof typeof roles, delta: number) =>
    setRoles(prev => ({ ...prev, [role]: Math.max(0, prev[role] + delta) }));

  const adjustCustom = (id: number, delta: number) =>
    setCustomRoles(prev => prev.map(r => r.id === id ? { ...r, count: Math.max(0, r.count + delta) } : r));

  const addCustomRole = () => {
    if (!newRoleName.trim()) return;
    setCustomRoles(prev => [...prev, { id: Date.now(), name: newRoleName.trim(), count: 0 }]);
    setNewRoleName("");
  };

  const handleNext = () => {
    const total = Object.values(roles).reduce((a, b) => a + b, 0) + customRoles.reduce((a, r) => a + r.count, 0);
    if (total === 0) { setError("최소 1명 이상의 역할 인원을 설정해 주세요."); return; }
    setError(""); onNext();
  };

  const RoleField = ({ roleKey, label }: { roleKey: keyof typeof roles; label: string }) => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <div className="role-counter">
        <button className="role-counter__btn" onClick={() => adjust(roleKey, -1)}>−</button>
        <span className="role-counter__value">인원 {roles[roleKey]}</span>
        <button className="role-counter__btn" onClick={() => adjust(roleKey, 1)}>+</button>
      </div>
      <span className="form-hint">+ / - 카운터</span>
    </div>
  );

  return (
    <section className="step-section">
      <div className="step-header">
        <h2 className="step-title">3단계: 모집 역할</h2>
        <p className="step-subtitle">필요한 역할과 인원을 설정해 주세요.</p>
      </div>
      <div className="step-body">
        <div className="form-grid">
          <RoleField roleKey="developer" label="개발자" />
          <RoleField roleKey="designer" label="디자이너" />
          <RoleField roleKey="planner" label="기획자" />
          {customRoles.map(role => (
            <div className="form-field" key={role.id}>
              <label className="form-label">{role.name}</label>
              <div className="role-counter">
                <button className="role-counter__btn" onClick={() => adjustCustom(role.id, -1)}>−</button>
                <span className="role-counter__value">인원 {role.count}</span>
                <button className="role-counter__btn" onClick={() => adjustCustom(role.id, 1)}>+</button>
              </div>
              <span className="form-hint">+ / - 카운터</span>
            </div>
          ))}
          <div className="form-field">
            <label className="form-label">+ 역할 추가</label>
            <div className="role-add">
              <input className="form-input role-add__input" value={newRoleName} onChange={e => setNewRoleName(e.target.value)} onKeyDown={e => e.key === "Enter" && addCustomRole()} placeholder="새 역할 추가" />
              <button className="role-add__btn" onClick={addCustomRole}>추가</button>
            </div>
            <span className="form-hint">역할명 입력 후 Enter 또는 추가 버튼</span>
          </div>
        </div>
        {error && <p className="form-error">{error}</p>}
      </div>
      <div className="step-actions">
        <button className="btn btn--outline" onClick={onPrev}>이전</button>
        <button className="btn btn--primary" onClick={handleNext}>다음</button>
      </div>
    </section>
  );
};

// =====================
// Step 4: 세부 설정
// =====================
const Step4Detail: React.FC<{ onPrev: () => void; onSubmit: () => void }> = ({ onPrev, onSubmit }) => {
  const [startDate, setStartDate] = useState<DateVal | null>(null);
  const [endDate, setEndDate] = useState<DateVal | null>(null);
  const [deadline, setDeadline] = useState<DateVal | null>(null);
  const [showRangePicker, setShowRangePicker] = useState(false);
  const [showDeadlinePicker, setShowDeadlinePicker] = useState(false);
  const [form, setForm] = useState({ online: false, offline: false, hybrid: false, tags: "" });
  const [errors, setErrors] = useState<{ dateRange?: string; deadline?: string; mode?: string }>({});

  const rangeRef = useRef<HTMLDivElement>(null);
  const deadlineRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 피커 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (rangeRef.current && !rangeRef.current.contains(e.target as Node)) setShowRangePicker(false);
      if (deadlineRef.current && !deadlineRef.current.contains(e.target as Node)) setShowDeadlinePicker(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const dateRangeLabel = startDate && endDate
    ? `${formatDate(startDate.year, startDate.month, startDate.day)} ~ ${formatDate(endDate.year, endDate.month, endDate.day)}`
    : startDate
    ? `${formatDate(startDate.year, startDate.month, startDate.day)} ~ 종료일 선택`
    : "";

  const deadlineLabel = deadline
    ? formatDate(deadline.year, deadline.month, deadline.day)
    : "";

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: checked }));
    if (errors.mode) setErrors(prev => ({ ...prev, mode: "" }));
  };

  const handleSubmit = () => {
    const newErrors: typeof errors = {};
    if (!startDate || !endDate) newErrors.dateRange = "활동 기간은 필수 항목입니다.";
    if (!deadline) newErrors.deadline = "모집 마감일은 필수 항목입니다.";
    if (!form.online && !form.offline && !form.hybrid) newErrors.mode = "참여 방식을 하나 이상 선택해 주세요.";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    onSubmit();
  };

  return (
    <section className="step-section">
      <div className="step-header">
        <h2 className="step-title">4단계: 세부 설정</h2>
        <p className="step-subtitle">일정, 참여 방식, 태그를 설정해 주세요.</p>
      </div>
      <div className="step-body">
        <div className="form-grid">

          {/* 활동 기간 */}
          <div className="form-field" ref={rangeRef}>
            <label className="form-label">활동 기간(시작~종료) <span className="form-required">*</span></label>
            <input
              className={`form-input form-input--picker ${errors.dateRange ? "form-input--error" : ""}`}
              readOnly
              value={dateRangeLabel}
              placeholder="날짜 범위 선택"
              onClick={() => { setShowRangePicker(v => !v); setShowDeadlinePicker(false); }}
            />
            {errors.dateRange ? <span className="form-error">{errors.dateRange}</span> : <span className="form-hint">시작일 선택 후 종료일 선택</span>}
            {showRangePicker && (
              <div className="picker-dropdown">
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onChangeStart={(d) => { setStartDate(d); setErrors(prev => ({ ...prev, dateRange: "" })); }}
                  onChangeEnd={(d) => { setEndDate(d); setShowRangePicker(false); }}
                />
              </div>
            )}
          </div>

          {/* 모집 마감일 */}
          <div className="form-field" ref={deadlineRef}>
            <label className="form-label">모집 마감일 <span className="form-required">*</span></label>
            <input
              className={`form-input form-input--picker ${errors.deadline ? "form-input--error" : ""}`}
              readOnly
              value={deadlineLabel}
              placeholder="날짜 선택"
              onClick={() => { setShowDeadlinePicker(v => !v); setShowRangePicker(false); }}
            />
            {errors.deadline ? <span className="form-error">{errors.deadline}</span> : <span className="form-hint">YYYY/MM/DD</span>}
            {showDeadlinePicker && (
              <div className="picker-dropdown">
                <SingleDatePicker
                  value={deadline}
                  onChange={(d) => { setDeadline(d); setShowDeadlinePicker(false); setErrors(prev => ({ ...prev, deadline: "" })); }}
                />
              </div>
            )}
          </div>

          {/* 온라인 */}
          <div className="form-field">
            <label className="form-label">온라인 <span className="form-required">*</span></label>
            <label className="toggle-chip">
              <input type="checkbox" name="online" checked={form.online} onChange={handleToggle} />
              <span className="toggle-chip__track">{form.online ? "선택됨" : "선택 가능"}</span>
            </label>
            <span className="form-hint">토글 칩</span>
          </div>

          {/* 오프라인 */}
          <div className="form-field">
            <label className="form-label">오프라인 <span className="form-required">*</span></label>
            <label className="toggle-chip">
              <input type="checkbox" name="offline" checked={form.offline} onChange={handleToggle} />
              <span className="toggle-chip__track">{form.offline ? "선택됨" : "선택 가능"}</span>
            </label>
            <span className="form-hint">토글 칩</span>
          </div>

          {/* 혼합 */}
          <div className="form-field">
            <label className="form-label">혼합 <span className="form-required">*</span></label>
            <label className="toggle-chip">
              <input type="checkbox" name="hybrid" checked={form.hybrid} onChange={handleToggle} />
              <span className="toggle-chip__track">{form.hybrid ? "선택됨" : "선택 가능"}</span>
            </label>
            {errors.mode ? <span className="form-error">{errors.mode}</span> : <span className="form-hint">토글 칩</span>}
          </div>

          {/* 태그 */}
          <div className="form-field">
            <label className="form-label">태그</label>
            <input className="form-input" name="tags" value={form.tags} onChange={e => setForm(prev => ({ ...prev, tags: e.target.value }))} placeholder="예: 웹, 프론트엔드, 머신러닝" />
            <span className="form-hint">태그 입력 필드</span>
          </div>

        </div>
      </div>
      <div className="step-actions">
        <button className="btn btn--outline" onClick={onPrev}>이전</button>
        <button className="btn btn--primary" onClick={handleSubmit}>등록 완료</button>
      </div>
    </section>
  );
};

// =====================
// Main: ProjectCreatePage
// =====================
const steps = [
  { id: 1, label: "활동 유형" },
  { id: 2, label: "기본 정보" },
  { id: 3, label: "모집 역할" },
  { id: 4, label: "세부 설정" },
];

export const ProjectCreatePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const goNext = () => setCurrentStep(s => Math.min(s + 1, 4));
  const goPrev = () => {
    if (currentStep === 1) navigate(-1);
    else setCurrentStep(s => s - 1);
  };
  const handleSubmit = () => navigate(ROUTES.HOME);

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1ActivityType onNext={goNext} onPrev={goPrev} />;
      case 2: return <Step2BasicInfo onNext={goNext} onPrev={goPrev} />;
      case 3: return <Step3Roles onNext={goNext} onPrev={goPrev} />;
      case 4: return <Step4Detail onPrev={goPrev} onSubmit={handleSubmit} />;
      default: return null;
    }
  };

  return (
    <div className="page">
      <header className="gnb">
        <div className="gnb__logo">
          <div className="gnb__logo-icon" />
          <span className="gnb__logo-text">Brace</span>
        </div>
        <nav className="gnb__nav">
          <a href="#" className="gnb__nav-link">모집하기</a>
          <a href="#" className="gnb__nav-link">마이페이지</a>
        </nav>
      </header>
      <main className="main">
        <div className="card">
          <h1 className="card__title">프로젝트 등록</h1>
          <p className="card__subtitle">아이디어의 팀원을 모집할 내용을 단계별로 입력해 주세요.</p>
          <div className="card__actions">
            <button className="btn btn--outline">도움말</button>
            <button className="btn btn--primary">저장하기</button>
          </div>
          <div className="stepper">
            {steps.map(step => (
              <button key={step.id} className={`stepper__step ${currentStep === step.id ? "stepper__step--active" : ""}`} onClick={() => setCurrentStep(step.id)}>
                <span className="stepper__step-number">{step.id}</span>
                <span className="stepper__step-label">{step.label}</span>
              </button>
            ))}
          </div>
          <div className="step-content">{renderStep()}</div>
        </div>
      </main>
      <footer className="footer">
        <div className="footer__inner">
          <span className="footer__copy">© Brace</span>
          <nav className="footer__nav">
            <a href="#" className="footer__nav-link">문의</a>
            <a href="#" className="footer__nav-link">이용 약관</a>
            <a href="#" className="footer__nav-link">개인정보 처리방침</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};