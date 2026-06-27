import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared/constants/routes";
import "../../styles/projectsRegister.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// =====================
// 날짜 유틸
// =====================
const isLeapYear = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const getDaysInMonth = (year: number, month: number) => {
  const days = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  return days[month - 1];
};

const pad = (n: number) => String(n).padStart(2, "0");
const formatDate = (y: number, m: number, d: number) =>
  `${y}/${pad(m)}/${pad(d)}`;
const toApiDate = (y: number, m: number, d: number) =>
  `${y}-${pad(m)}-${pad(d)}`;

interface DateVal {
  year: number;
  month: number;
  day: number;
}

const compareDates = (a: DateVal, b: DateVal) => {
  if (a.year !== b.year) return a.year - b.year;
  if (a.month !== b.month) return a.month - b.month;
  return a.day - b.day;
};

// =====================
// 전체 폼 데이터 타입
// =====================
interface FormData {
  activityType: "CONTEST" | "PERSONAL_PROJECT" | "";
  title: string;
  description: string;
  projectName: string;
  projectUrl: string;
  startDate: DateVal | null;
  endDate: DateVal | null;
  deadline: DateVal | null;
  meetingType: "ONLINE" | "OFFLINE" | "HYBRID" | "";
  tags: string;
  roles: { name: string; count: number }[];
}

// =====================
// 캘린더 피커
// =====================
interface SinglePickerProps {
  value: DateVal | null;
  onChange: (d: DateVal) => void;
  minDate?: DateVal | null;
}

const SingleDatePicker: React.FC<SinglePickerProps> = ({
  value,
  onChange,
  minDate,
}) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(value?.year ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(
    value?.month ?? today.getMonth() + 1,
  );
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = new Date(viewYear, viewMonth - 1, 1).getDay();
  const isDisabled = (day: number) =>
    !minDate
      ? false
      : compareDates({ year: viewYear, month: viewMonth, day }, minDate) < 0;
  const isSelected = (day: number) =>
    value?.year === viewYear &&
    value?.month === viewMonth &&
    value?.day === day;
  const prevMonth = () => {
    if (viewMonth === 1) {
      setViewYear((y) => y - 1);
      setViewMonth(12);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 12) {
      setViewYear((y) => y + 1);
      setViewMonth(1);
    } else setViewMonth((m) => m + 1);
  };
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return (
    <div className="cal">
      <div className="cal__nav">
        <button
          className="cal__nav-btn"
          onClick={prevMonth}
        >
          ‹
        </button>
        <span className="cal__title">
          {viewYear}년 {viewMonth}월
        </span>
        <button
          className="cal__nav-btn"
          onClick={nextMonth}
        >
          ›
        </button>
      </div>
      <div className="cal__grid cal__grid--7">
        {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
          <span
            key={d}
            className="cal__dow"
          >
            {d}
          </span>
        ))}
        {cells.map((day, i) => (
          <button
            key={i}
            className={`cal__day ${day && isSelected(day) ? "cal__day--selected" : ""} ${day && isDisabled(day) ? "cal__day--disabled" : ""} ${!day ? "cal__day--empty" : ""}`}
            disabled={!day || (day ? isDisabled(day) : false)}
            onClick={() =>
              day && onChange({ year: viewYear, month: viewMonth, day })
            }
          >
            {day ?? ""}
          </button>
        ))}
      </div>
    </div>
  );
};

interface CalMonthProps {
  year: number;
  month: number;
  isStart: (y: number, m: number, d: number) => boolean;
  isEnd: (y: number, m: number, d: number) => boolean;
  isInRange: (y: number, m: number, d: number) => boolean;
  onDayClick: (y: number, m: number, d: number) => void;
}

const CalMonth: React.FC<CalMonthProps> = ({
  year,
  month,
  isStart,
  isEnd,
  isInRange,
  onDayClick,
}) => {
  const days = getDaysInMonth(year, month);
  const firstDay = new Date(year, month - 1, 1).getDay();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  return (
    <div className="cal cal--range">
      <div className="cal__month-title">
        {year}년 {month}월
      </div>
      <div className="cal__grid cal__grid--7">
        {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
          <span
            key={d}
            className="cal__dow"
          >
            {d}
          </span>
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
            onClick={() => day && onDayClick(year, month, day)}
          >
            {day ?? ""}
          </button>
        ))}
      </div>
    </div>
  );
};

interface DateRangePickerProps {
  startDate: DateVal | null;
  endDate: DateVal | null;
  onChangeStart: (d: DateVal) => void;
  onChangeEnd: (d: DateVal) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChangeStart,
  onChangeEnd,
}) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(
    startDate?.year ?? today.getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(
    startDate?.month ?? today.getMonth() + 1,
  );
  const [selecting, setSelecting] = useState<"start" | "end">("start");
  const rightYear = viewMonth === 12 ? viewYear + 1 : viewYear;
  const rightMonth = viewMonth === 12 ? 1 : viewMonth + 1;
  const isInRange = (year: number, month: number, day: number) => {
    if (!startDate || !endDate) return false;
    const cur = { year, month, day };
    return compareDates(cur, startDate) > 0 && compareDates(cur, endDate) < 0;
  };
  const isStart = (year: number, month: number, day: number) =>
    startDate?.year === year &&
    startDate?.month === month &&
    startDate?.day === day;
  const isEnd = (year: number, month: number, day: number) =>
    endDate?.year === year && endDate?.month === month && endDate?.day === day;
  const handleDayClick = (year: number, month: number, day: number) => {
    const clicked = { year, month, day };
    if (selecting === "start") {
      onChangeStart(clicked);
      if (endDate && compareDates(clicked, endDate) >= 0) onChangeEnd(null!);
      setSelecting("end");
    } else {
      if (startDate && compareDates(clicked, startDate) < 0) {
        onChangeStart(clicked);
        onChangeEnd(null!);
        setSelecting("end");
      } else {
        onChangeEnd(clicked);
        setSelecting("start");
      }
    }
  };
  const prevMonth = () => {
    if (viewMonth === 1) {
      setViewYear((y) => y - 1);
      setViewMonth(12);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 12) {
      setViewYear((y) => y + 1);
      setViewMonth(1);
    } else setViewMonth((m) => m + 1);
  };
  return (
    <div className="cal-range-wrap">
      <div className="cal-range-nav">
        <button
          className="cal__nav-btn"
          onClick={prevMonth}
        >
          ‹
        </button>
        <button
          className="cal__nav-btn"
          onClick={nextMonth}
        >
          ›
        </button>
      </div>
      <div className="cal-range-months">
        <CalMonth
          year={viewYear}
          month={viewMonth}
          isStart={isStart}
          isEnd={isEnd}
          isInRange={isInRange}
          onDayClick={handleDayClick}
        />
        <CalMonth
          year={rightYear}
          month={rightMonth}
          isStart={isStart}
          isEnd={isEnd}
          isInRange={isInRange}
          onDayClick={handleDayClick}
        />
      </div>
      <p className="cal-range-hint">
        {selecting === "start"
          ? "시작 날짜를 선택해 주세요."
          : "종료 날짜를 선택해 주세요."}
      </p>
    </div>
  );
};

// =====================
// Step 1: 활동 유형
// =====================
const Step1ActivityType: React.FC<{
  value: "CONTEST" | "PERSONAL_PROJECT" | "";
  onChange: (v: "CONTEST" | "PERSONAL_PROJECT") => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ value, onChange, onNext, onPrev }) => {
  const [error, setError] = useState("");
  const handleNext = () => {
    if (!value) {
      setError("활동 유형을 선택해 주세요.");
      return;
    }
    setError("");
    onNext();
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
            <span className="activity-label">공모전 참가</span>
            <button
              className={`activity-btn ${value === "CONTEST" ? "activity-btn--selected" : ""}`}
              onClick={() => {
                onChange("CONTEST");
                setError("");
              }}
            >
              {value === "CONTEST" ? "선택됨" : "선택 가능"}
            </button>
          </div>
          <div className="activity-item">
            <span className="activity-label">개인 프로젝트</span>
            <button
              className={`activity-btn ${value === "PERSONAL_PROJECT" ? "activity-btn--selected" : ""}`}
              onClick={() => {
                onChange("PERSONAL_PROJECT");
                setError("");
              }}
            >
              {value === "PERSONAL_PROJECT" ? "선택됨" : "선택 가능"}
            </button>
          </div>
        </div>
        {error && <p className="form-error">{error}</p>}
      </div>
      <div className="step-actions">
        <button
          className="btn btn--outline"
          onClick={onPrev}
        >
          이전
        </button>
        <button
          className="btn btn--primary"
          onClick={handleNext}
        >
          다음
        </button>
      </div>
    </section>
  );
};

// =====================
// Step 2: 기본 정보
// =====================
const Step2BasicInfo: React.FC<{
  value: {
    title: string;
    description: string;
    projectName: string;
    projectUrl: string;
  };
  onChange: (v: {
    title: string;
    description: string;
    projectName: string;
    projectUrl: string;
  }) => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ value, onChange, onNext, onPrev }) => {
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value: v } = e.target;
    onChange({ ...value, [name]: v });
    if (errors[name as keyof typeof errors])
      setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const handleNext = () => {
    const newErrors: typeof errors = {};
    if (!value.title.trim()) newErrors.title = "제목은 필수 항목입니다.";
    if (!value.description.trim())
      newErrors.description = "상세 내용은 필수 항목입니다.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
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
            <label className="form-label">
              제목 <span className="form-required">*</span>
            </label>
            <input
              className={`form-input ${errors.title ? "form-input--error" : ""}`}
              name="title"
              value={value.title}
              onChange={handleChange}
              placeholder="예: AI 기반 과제 자동화 도구"
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>
          <div className="form-field">
            <label className="form-label">
              상세 내용 <span className="form-required">*</span>
            </label>
            <textarea
              className={`form-input form-textarea ${errors.description ? "form-input--error" : ""}`}
              name="description"
              value={value.description}
              onChange={handleChange}
              placeholder="목표, 진행 방식, 기대 결과를 자유롭게 작성"
            />
            {errors.description && (
              <span className="form-error">{errors.description}</span>
            )}
          </div>
          <div className="form-field">
            <label className="form-label">공모전명</label>
            <input
              className="form-input"
              name="projectName"
              value={value.projectName}
              onChange={handleChange}
              placeholder="해당 시 기재 (없으면 공란)"
            />
          </div>
          <div className="form-field">
            <label className="form-label">공모전 링크</label>
            <input
              className="form-input"
              name="projectUrl"
              value={value.projectUrl}
              onChange={handleChange}
              placeholder="공식 페이지 URL"
            />
          </div>
        </div>
      </div>
      <div className="step-actions">
        <button
          className="btn btn--outline"
          onClick={onPrev}
        >
          이전
        </button>
        <button
          className="btn btn--primary"
          onClick={handleNext}
        >
          다음
        </button>
      </div>
    </section>
  );
};

// =====================
// Step 3: 모집 역할
// =====================
const Step3Roles: React.FC<{
  value: { name: string; count: number }[];
  onChange: (v: { name: string; count: number }[]) => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ value, onChange, onNext, onPrev }) => {
  const [newRoleName, setNewRoleName] = useState("");
  const [error, setError] = useState("");

  const defaultRoles = ["개발자", "디자이너", "기획자"];

  const getCount = (name: string) =>
    value.find((r) => r.name === name)?.count ?? 0;

  const adjust = (name: string, delta: number) => {
    const existing = value.find((r) => r.name === name);
    if (existing) {
      onChange(
        value
          .map((r) =>
            r.name === name ? { ...r, count: Math.max(0, r.count + delta) } : r,
          )
          .filter((r) => defaultRoles.includes(r.name) || r.count > 0),
      );
    } else if (delta > 0) {
      onChange([...value, { name, count: 1 }]);
    }
  };

  const addCustomRole = () => {
    if (!newRoleName.trim()) return;
    if (value.find((r) => r.name === newRoleName.trim())) return;
    onChange([...value, { name: newRoleName.trim(), count: 0 }]);
    setNewRoleName("");
  };

  const handleNext = () => {
    const total = value.reduce((a, r) => a + r.count, 0);
    if (total === 0) {
      setError("최소 1명 이상의 역할 인원을 설정해 주세요.");
      return;
    }
    setError("");
    onNext();
  };

  const allRoleNames = [
    ...defaultRoles,
    ...value.filter((r) => !defaultRoles.includes(r.name)).map((r) => r.name),
  ];

  return (
    <section className="step-section">
      <div className="step-header">
        <h2 className="step-title">3단계: 모집 역할</h2>
        <p className="step-subtitle">필요한 역할과 인원을 설정해 주세요.</p>
      </div>
      <div className="step-body">
        <div className="form-grid">
          {allRoleNames.map((name) => (
            <div
              className="form-field"
              key={name}
            >
              <label className="form-label">{name}</label>
              <div className="role-counter">
                <button
                  className="role-counter__btn"
                  onClick={() => adjust(name, -1)}
                >
                  −
                </button>
                <span className="role-counter__value">
                  인원 {getCount(name)}
                </span>
                <button
                  className="role-counter__btn"
                  onClick={() => adjust(name, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="form-field">
            <label className="form-label">+ 역할 추가</label>
            <div className="role-add">
              <input
                className="form-input role-add__input"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustomRole()}
                placeholder="새 역할 추가"
              />
              <button
                className="role-add__btn"
                onClick={addCustomRole}
              >
                추가
              </button>
            </div>
          </div>
        </div>
        {error && <p className="form-error">{error}</p>}
      </div>
      <div className="step-actions">
        <button
          className="btn btn--outline"
          onClick={onPrev}
        >
          이전
        </button>
        <button
          className="btn btn--primary"
          onClick={handleNext}
        >
          다음
        </button>
      </div>
    </section>
  );
};

// =====================
// Step 4: 세부 설정
// =====================
const Step4Detail: React.FC<{
  startDate: DateVal | null;
  endDate: DateVal | null;
  deadline: DateVal | null;
  meetingType: "ONLINE" | "OFFLINE" | "HYBRID" | "";
  tags: string;
  onChangeStartDate: (d: DateVal) => void;
  onChangeEndDate: (d: DateVal) => void;
  onChangeDeadline: (d: DateVal) => void;
  onChangeMeetingType: (v: "ONLINE" | "OFFLINE" | "HYBRID") => void;
  onChangeTags: (v: string) => void;
  onPrev: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}> = ({
  startDate,
  endDate,
  deadline,
  meetingType,
  tags,
  onChangeStartDate,
  onChangeEndDate,
  onChangeDeadline,
  onChangeMeetingType,
  onChangeTags,
  onPrev,
  onSubmit,
  isLoading,
}) => {
  const [showRangePicker, setShowRangePicker] = useState(false);
  const [showDeadlinePicker, setShowDeadlinePicker] = useState(false);
  const [errors, setErrors] = useState<{
    dateRange?: string;
    deadline?: string;
    mode?: string;
  }>({});
  const rangeRef = useRef<HTMLDivElement>(null);
  const deadlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (rangeRef.current && !rangeRef.current.contains(e.target as Node))
        setShowRangePicker(false);
      if (
        deadlineRef.current &&
        !deadlineRef.current.contains(e.target as Node)
      )
        setShowDeadlinePicker(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const dateRangeLabel =
    startDate && endDate
      ? `${formatDate(startDate.year, startDate.month, startDate.day)} ~ ${formatDate(endDate.year, endDate.month, endDate.day)}`
      : startDate
        ? `${formatDate(startDate.year, startDate.month, startDate.day)} ~ 종료일 선택`
        : "";

  const deadlineLabel = deadline
    ? formatDate(deadline.year, deadline.month, deadline.day)
    : "";

  const meetingOptions: {
    label: string;
    value: "ONLINE" | "OFFLINE" | "HYBRID";
  }[] = [
    { label: "온라인", value: "ONLINE" },
    { label: "오프라인", value: "OFFLINE" },
    { label: "온/오프라인", value: "HYBRID" },
  ];

  const handleSubmit = () => {
    const newErrors: typeof errors = {};
    if (!startDate || !endDate)
      newErrors.dateRange = "활동 기간은 필수 항목입니다.";
    if (!deadline) newErrors.deadline = "모집 마감일은 필수 항목입니다.";
    if (!meetingType) newErrors.mode = "참여 방식을 선택해 주세요.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
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
          <div
            className="form-field"
            ref={rangeRef}
          >
            <label className="form-label">
              활동 기간(시작~종료) <span className="form-required">*</span>
            </label>
            <input
              className={`form-input form-input--picker ${errors.dateRange ? "form-input--error" : ""}`}
              readOnly
              value={dateRangeLabel}
              placeholder="날짜 범위 선택"
              onClick={() => {
                setShowRangePicker((v) => !v);
                setShowDeadlinePicker(false);
              }}
            />
            {errors.dateRange && (
              <span className="form-error">{errors.dateRange}</span>
            )}
            {showRangePicker && (
              <div className="picker-dropdown">
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onChangeStart={(d) => {
                    onChangeStartDate(d);
                    setErrors((p) => ({ ...p, dateRange: "" }));
                  }}
                  onChangeEnd={(d) => {
                    onChangeEndDate(d);
                    setShowRangePicker(false);
                  }}
                />
              </div>
            )}
          </div>
          <div
            className="form-field"
            ref={deadlineRef}
          >
            <label className="form-label">
              모집 마감일 <span className="form-required">*</span>
            </label>
            <input
              className={`form-input form-input--picker ${errors.deadline ? "form-input--error" : ""}`}
              readOnly
              value={deadlineLabel}
              placeholder="날짜 선택"
              onClick={() => {
                setShowDeadlinePicker((v) => !v);
                setShowRangePicker(false);
              }}
            />
            {errors.deadline && (
              <span className="form-error">{errors.deadline}</span>
            )}
            {showDeadlinePicker && (
              <div className="picker-dropdown">
                <SingleDatePicker
                  value={deadline}
                  onChange={(d) => {
                    onChangeDeadline(d);
                    setShowDeadlinePicker(false);
                    setErrors((p) => ({ ...p, deadline: "" }));
                  }}
                />
              </div>
            )}
          </div>
          <div className="form-field">
            <label className="form-label">
              참여 방식 <span className="form-required">*</span>
            </label>
            <div style={{ display: "flex", gap: "8px" }}>
              {meetingOptions.map((opt) => (
                <button
                  key={opt.value}
                  className={`activity-btn ${meetingType === opt.value ? "activity-btn--selected" : ""}`}
                  onClick={() => {
                    onChangeMeetingType(opt.value);
                    setErrors((p) => ({ ...p, mode: "" }));
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {errors.mode && <span className="form-error">{errors.mode}</span>}
          </div>
          <div className="form-field">
            <label className="form-label">태그</label>
            <input
              className="form-input"
              value={tags}
              onChange={(e) => onChangeTags(e.target.value)}
              placeholder="예: 웹, 프론트엔드, 머신러닝"
            />
          </div>
        </div>
      </div>
      <div className="step-actions">
        <button
          className="btn btn--outline"
          onClick={onPrev}
        >
          이전
        </button>
        <button
          className="btn btn--primary"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "등록 중..." : "등록 완료"}
        </button>
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    activityType: "",
    title: "",
    description: "",
    projectName: "",
    projectUrl: "",
    startDate: null,
    endDate: null,
    deadline: null,
    meetingType: "",
    tags: "",
    roles: [
      { name: "개발자", count: 0 },
      { name: "디자이너", count: 0 },
      { name: "기획자", count: 0 },
    ],
  });

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, 4));
  const goPrev = () => {
    if (currentStep === 1) navigate(-1);
    else setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    const {
      activityType,
      title,
      description,
      projectName,
      projectUrl,
      startDate,
      endDate,
      deadline,
      meetingType,
      tags,
      roles,
    } = formData;

    const roleNameToId: Record<string, number> = {
      개발자: 1,
      프론트엔드: 2,
      디자이너: 3,
      기획자: 4,
    };

    const apiRoles = roles
      .filter((r) => r.count > 0)
      .map((r) => ({
        roleId: roleNameToId[r.name] ?? 0,
        recruitCount: r.count,
      }));

    if (
      activityType === "CONTEST" &&
      (!projectName.trim() || !projectUrl.trim())
    ) {
      window.alert("공모전 등록 시 공모전명과 공모전 링크를 입력해 주세요.");
      setCurrentStep(2);
      return;
    }

    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`${API_BASE_URL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          activityType,
          title,
          description,
          ...(projectName.trim() && { projectName }),
          ...(projectUrl.trim() && { projectUrl }),
          startDate: startDate
            ? toApiDate(startDate.year, startDate.month, startDate.day)
            : "",
          endDate: endDate
            ? toApiDate(endDate.year, endDate.month, endDate.day)
            : "",
          deadline: deadline
            ? toApiDate(deadline.year, deadline.month, deadline.day)
            : "",
          meetingType,
          tags,
          roles: apiRoles,
        }),
      });

      const data = await response.json();

      if (!data.isSuccess) {
        window.alert(data.message || "프로젝트 등록에 실패했습니다.");
        return;
      }

      window.alert("프로젝트가 등록되었습니다!");
      navigate(ROUTES.PROJECTS);
    } catch {
      window.alert("서버 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1ActivityType
            value={formData.activityType}
            onChange={(v) => setFormData((f) => ({ ...f, activityType: v }))}
            onNext={goNext}
            onPrev={goPrev}
          />
        );
      case 2:
        return (
          <Step2BasicInfo
            value={{
              title: formData.title,
              description: formData.description,
              projectName: formData.projectName,
              projectUrl: formData.projectUrl,
            }}
            onChange={(v) => setFormData((f) => ({ ...f, ...v }))}
            onNext={goNext}
            onPrev={goPrev}
          />
        );
      case 3:
        return (
          <Step3Roles
            value={formData.roles}
            onChange={(v) => setFormData((f) => ({ ...f, roles: v }))}
            onNext={goNext}
            onPrev={goPrev}
          />
        );
      case 4:
        return (
          <Step4Detail
            startDate={formData.startDate}
            endDate={formData.endDate}
            deadline={formData.deadline}
            meetingType={formData.meetingType}
            tags={formData.tags}
            onChangeStartDate={(d) =>
              setFormData((f) => ({ ...f, startDate: d }))
            }
            onChangeEndDate={(d) => setFormData((f) => ({ ...f, endDate: d }))}
            onChangeDeadline={(d) =>
              setFormData((f) => ({ ...f, deadline: d }))
            }
            onChangeMeetingType={(v) =>
              setFormData((f) => ({ ...f, meetingType: v }))
            }
            onChangeTags={(v) => setFormData((f) => ({ ...f, tags: v }))}
            onPrev={goPrev}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="pc-wrap">
      <div className="pc-header">
        <h1 className="pc-header__title">프로젝트 등록</h1>
        <p className="pc-header__subtitle">
          아이디어의 팀원을 모집할 내용을 단계별로 입력해 주세요.
        </p>
        <div className="pc-stepper">
          {steps.map((step) => (
            <button
              key={step.id}
              className={`pc-stepper__step ${currentStep === step.id ? "pc-stepper__step--active" : ""}`}
              onClick={() => setCurrentStep(step.id)}
            >
              <span className="pc-stepper__number">{step.id}</span>
              <span className="pc-stepper__label">{step.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="pc-content">{renderStep()}</div>
    </div>
  );
};
