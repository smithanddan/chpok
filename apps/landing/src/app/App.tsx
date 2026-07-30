import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Camera,
  Check,
  ChevronDown,
  MapPin,
  Menu,
  Navigation,
  Send,
  X,
} from "lucide-react";

const navItems = [
  { label: "Как это работает", href: "#how" },
  { label: "Зачем это городу", href: "#city" },
  { label: "Вопросы", href: "#faq" },
];

const steps = [
  ["01", Camera, "Снимите", "Фото поможет быстро понять, что происходит."],
  ["02", MapPin, "Отметьте", "Геолокация подставится сама — останется проверить."],
  ["03", Send, "Отправьте", "Сообщение найдёт службу, которая отвечает за место."],
] as const;

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <a className="brand" href="#top" aria-label="ЧПОК — на главную"><span className="brand-spark">✦</span><span>чпок</span></a>
    <nav className="nav" aria-label="Основная навигация">{navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
    <a className="nav-cta" href="#report">Сообщить <ArrowUpRight size={16} /></a>
    <button className="menu-button" aria-label={open ? "Закрыть меню" : "Открыть меню"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    {open && <nav className="mobile-nav" aria-label="Мобильная навигация">{navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}<a href="#report" onClick={() => setOpen(false)}>Сообщить</a></nav>}
  </header>;
}

function Hero() {
  return <section className="hero" id="top">
    <div className="hero-grid" aria-hidden="true" />
    <div className="hero-copy">
      <p className="eyebrow"><i />городской сервис без бюрократии</p>
      <h1>Заметил —<br /><em>чпокни.</em></h1>
      <p className="hero-description">Сообщайте о проблемах во дворе и на улице. Чпок помогает превратить «надо бы разобраться» в понятное обращение.</p>
      <div className="hero-actions"><a className="button button-dark" href="#report">Сообщить о проблеме <ArrowUpRight size={19} /></a><a className="round-link" href="#how" aria-label="Узнать, как это работает"><ArrowDownRight size={25} /></a><span>это займёт<br />меньше минуты</span></div>
    </div>
    <div className="hero-art" aria-label="Иллюстрация: горожанка отправляет сообщение о проблеме">
      <div className="sun" />
      <div className="star star-one">✦</div><div className="star star-two">✦</div>
      <div className="speech-bubble">опа!<br /><b>нашёл</b></div>
      <img src="/illustrations/reporter.png" alt="" />
      <div className="phone"><span className="phone-top" /><div className="phone-map"><i /><i /><b><MapPin size={22} fill="currentColor" /></b></div><span className="phone-line" /><span className="phone-line small" /></div>
      <div className="hero-tag"><Check size={14} /> принято<br /><small>модерация началась</small></div>
    </div>
    <div className="hero-footer"><span>чпок.app / 2026</span><span>ваш город — ваше слово</span><span className="scroll-cue">листайте <ChevronDown size={16} /></span></div>
  </section>;
}

function How() {
  return <section className="how section" id="how">
    <div className="section-intro"><p className="eyebrow"><i />как это работает</p><h2>Меньше формы.<br /><em>Больше дела.</em></h2></div>
    <div className="step-list">{steps.map(([number, Icon, title, text], index) => <article className="step" key={title}><span className="step-number">{number}</span><div className={`step-visual visual-${index + 1}`}><Icon size={31} strokeWidth={1.8} /></div><h3>{title}</h3><p>{text}</p><ArrowDownRight className="step-arrow" size={22} /></article>)}</div>
  </section>;
}

function City() {
  return <section className="city section" id="city">
    <div className="city-art"><div className="city-card city-card-one">не жалоба,<br /><b>а сигнал</b></div><img src="/illustrations/courier.png" alt="Курьер в городе" /><div className="city-sticker">город<br />слушает</div></div>
    <div className="city-copy"><p className="eyebrow"><i />один сигнал — ясный маршрут</p><h2>Не просто <em>заметить.</em><br />Довести до тех, кто может помочь.</h2><p>Мы собираем понятные сообщения, проверяем их и передаём ответственным сервисам. Статус обращения всегда остаётся у вас под рукой.</p><div className="city-points"><span><b>01</b> без звонков</span><span><b>02</b> без поиска ведомств</span><span><b>03</b> с понятным статусом</span></div></div>
  </section>;
}

function Report() {
  return <section className="report" id="report"><div className="report-copy"><p className="eyebrow"><i />начните с одного чпока</p><h2>Город меняется,<br />когда его <em>замечают.</em></h2><p>Самокат перегородил проход? Разбита плитка? Мусор не вывозят? Отправьте короткий сигнал — мы разберёмся с маршрутом.</p><a className="button button-pink" href="mailto:hello@chpok.app">Написать команде <ArrowUpRight size={19} /></a></div><div className="report-art"><div className="report-dot dot-a" /><div className="report-dot dot-b" /><div className="report-dot dot-c" /><img src="/visuals/scooter-alert.png" alt="Иллюстрация городского инцидента" /><div className="report-note">ваш<br /><b>ход</b> →</div></div></section>;
}

function Faq() {
  const [selected, setSelected] = useState(0);
  const items = [["Что можно чпокнуть?", "Проблемы во дворе и на улице: самокаты на пути, опасные участки, мусор, поломки и всё, что делает город неудобнее или небезопаснее."], ["Куда попадёт сообщение?", "После проверки мы направляем его тем, кто отвечает за конкретную территорию или сервис."], ["Можно ли увидеть результат?", "Да. В приложении будет видно, когда обращение приняли, передали исполнителю и закрыли."]];
  return <section className="faq section" id="faq"><div><p className="eyebrow"><i />вопросы и ответы</p><h2>Всё<br /><em>понятно.</em></h2></div><div className="faq-list">{items.map(([title, text], index) => <article className={selected === index ? "active" : ""} key={title}><button onClick={() => setSelected(selected === index ? -1 : index)} aria-expanded={selected === index}><span>0{index + 1}</span><strong>{title}</strong><b>{selected === index ? "−" : "+"}</b></button>{selected === index && <p>{text}</p>}</article>)}</div></section>;
}

export default function App() { return <main><Header /><Hero /><How /><City /><Report /><Faq /><footer><a className="brand" href="#top"><span className="brand-spark">✦</span><span>чпок</span></a><p>городской сервис общественного контроля</p><a href="#top">наверх ↑</a></footer></main>; }
