/* Editorial Orgânico — reestruturado conforme briefing: busca → identificação → diferencial → solução → entregáveis → prova → objeções → agendamento. */
import { FormEvent, useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { toast } from "sonner";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Flame,
  GraduationCap,
  Instagram,
  LoaderCircle,
  MapPin,
  MessageCircle,
  Menu,
  Monitor,
  Ruler,
  Scale,
  Target,
  Utensils,
  X,
  Zap,
} from "lucide-react";

const heroImage = "/manus-storage/foto1_e92b2a25.jpeg";
const trainingImage = "/manus-storage/caso-04-depois-foto6_ae94e340.jpeg";
const markImage = "/manus-storage/nathalia-mark_9ea8669e.png";
const instagramUrl = "https://www.instagram.com/nathfonsecanutri/";
const whatsappNumber = "5521981181479";
const whatsappMessage = "Olá, Nathália! Gostaria de agendar uma consulta e saber mais sobre o acompanhamento.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
const waLink = (message: string) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
const contactDraftKey = "nathalia-contact-draft";
const evolutionCases = [
  { before: "/manus-storage/caso-01-antes_8bd949ef.jpeg", after: "/manus-storage/caso-01-depois_f2d90a9c.jpeg" },
  { before: "/manus-storage/caso-02-antes_48d2fd26.jpeg", after: "/manus-storage/caso-02-depois_227ef7fa.jpeg" },
  { before: "/manus-storage/caso-03-antes_20711ff0.jpeg", after: "/manus-storage/caso-03-depois_47536166.jpeg" },
];

const messageSuggestions: Record<string, string> = {
  "Emagrecimento": "Quero emagrecer e perder gordura preservando massa muscular.",
  "Hipertrofia": "Quero ganhar massa muscular com uma alimentação alinhada ao meu treino.",
  "Definição": "Quero melhorar minha definição e composição corporal.",
  "Performance": "Quero melhorar minha performance, energia e recuperação nos treinos.",
  "Consulta online": "Gostaria de agendar uma consulta online.",
  "Consulta presencial": "Gostaria de agendar uma consulta presencial no Rio de Janeiro.",
  "Outro assunto": "Gostaria de conversar sobre meu objetivo.",
};

type TrackingData = Record<string, string>;
declare global {
  interface Window {
    umami?: { track: (name: string, data?: TrackingData) => void };
  }
}
function trackEvent(name: string, data?: TrackingData) {
  window.umami?.track(name, data);
}

/* Imagem com fallback: enquanto o arquivo não existir, o bloco mostra apenas o fundo da marca. */
function SmartImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`${className ?? ""} image-fallback`} role="img" aria-label={alt} />;
  return <img className={className} src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />;
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 22);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    ["Início", "inicio"],
    ["Objetivos", "objetivos"],
    ["Como funciona", "como-funciona"],
    ["Resultados", "resultados"],
    ["Sobre", "sobre"],
    ["Dúvidas", "duvidas"],
  ];

  return (
    <header className={`site-header ${scrolled || menuOpen ? "scrolled" : ""}`}>
      <div className="container-editorial header-inner">
        <a className="wordmark" href="#inicio" aria-label="Nathália Fonseca, Nutricionista Esportiva">
          <img className="wordmark-mark" src={markImage} alt="" />
          <span className="wordmark-text">
            <span className="wordmark-name">NATHÁLIA FONSECA</span>
            <span className="wordmark-sub">Nutrição &amp; Performance</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map(([label, id]) => <a className="nav-link" href={`#${id}`} key={id}>{label}</a>)}
        </nav>
        <a className="header-cta" href="#agendamento" onClick={() => trackEvent("cta_click", { cta: "header_agendar_consulta" })}>Agendar consulta <ArrowRight size={14} /></a>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {menuOpen && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegação móvel">
          {navItems.map(([label, id]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="primary-cta mobile-nav-cta" href="#agendamento" onClick={() => { setMenuOpen(false); trackEvent("cta_click", { cta: "mobile_nav_agendar" }); }}>Agendar consulta <ArrowRight size={14} /></a>
        </nav>
      )}
    </header>
  );
}

/* 01 · Primeira dobra */
function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container-editorial hero-grid">
        <div className="hero-copy reveal">
          <div className="hero-kicker eyebrow"><span className="hero-kicker-line" /> Nathália Fonseca · Nutricionista Esportiva</div>
          <h1 className="display">Nutricionista para emagrecimento, hipertrofia, definição e performance.</h1>
          <p className="hero-lead">Alimentação e treino trabalhando juntos para você perder gordura, ganhar massa muscular e melhorar sua composição corporal com uma estratégia possível de manter na vida real.</p>
          <ul className="hero-roles" aria-label="Formação e atuação">
            <li><Utensils size={16} /> Nutrição</li>
            <li><GraduationCap size={16} /> Educação Física</li>
            <li><Dumbbell size={16} /> Personal Trainer</li>
          </ul>
          <div className="hero-actions">
            <a className="primary-cta" href="#agendamento" onClick={() => trackEvent("cta_click", { cta: "hero_agendar_consulta" })}>Quero agendar minha consulta <ArrowRight size={15} /></a>
          </div>
          <ul className="micro-proofs">
            <li><Check size={14} /> Plano individualizado</li>
            <li><Check size={14} /> Online e presencial</li>
            <li><Check size={14} /> Nutrição + treinamento</li>
          </ul>
          <div className="hero-note"><MapPin size={14} /> Atendimento online e presencial no Rio de Janeiro</div>
        </div>
        <div className="hero-visual reveal reveal-delay-2">
          <div className="hero-photo-wrap"><img className="hero-photo" src={heroImage} alt="Nathália Fonseca, nutricionista esportiva, segurando um suco verde" fetchPriority="high" /></div>
          <div className="hero-orbit" aria-hidden="true" />
          <div className="hero-stat"><strong>26,6 mil</strong><span>seguidores no Instagram com conteúdo sobre nutrição, saúde e performance</span></div>
        </div>
      </div>
    </section>
  );
}

function GoalsBand() {
  const items: [string, LucideIcon][] = [["Emagrecimento", Flame], ["Hipertrofia", Dumbbell], ["Definição", Ruler], ["Performance", Zap]];
  return (
    <nav className="goals-band" aria-label="Objetivos atendidos">
      <div className="container-editorial goals-band-inner">
        {items.map(([label, Icon]) => <a href="#objetivos" key={label}><Icon size={16} /> {label}</a>)}
      </div>
    </nav>
  );
}

/* 02 · Identificação */
function Identify() {
  const cards: [string, string, LucideIcon][] = [
    ["Quer emagrecer e perder gordura?", "Estratégia para reduzir gordura preservando massa muscular.", Flame],
    ["Quer ganhar massa muscular?", "Alimentação alinhada ao treinamento e à hipertrofia.", Dumbbell],
    ["Treina, mas não vê evolução?", "Nutrição precisa acompanhar o estímulo e a demanda do treino.", Activity],
    ["Quer mais definição?", "Estratégia voltada à composição corporal e preservação de massa muscular.", Ruler],
    ["Busca mais performance?", "Energia, recuperação e alimentação alinhadas ao desempenho.", Zap],
    ["Já tentou várias dietas?", "O plano precisa caber na rotina para ser sustentável.", Target],
  ];
  return (
    <section className="identify" aria-labelledby="identify-title">
      <div className="container-editorial">
        <div className="identify-head reveal">
          <div className="eyebrow">Isso é para você?</div>
          <h2 id="identify-title" className="display">Você treina, faz dieta, tenta mudar a alimentação… mas o resultado não acompanha seu esforço?</h2>
          <p>Talvez você queira emagrecer, mas tenha dificuldade para manter os resultados. Talvez treine regularmente, mas não consiga ganhar massa muscular ou melhorar a definição. Ou simplesmente esteja cansado de começar dietas que não combinam com sua rotina.</p>
        </div>
        <div className="pain-grid">
          {cards.map(([title, copy, Icon], index) => (
            <article className={`pain-card reveal reveal-delay-${(index % 3) + 1}`} key={title}>
              <Icon className="pain-icon" size={22} strokeWidth={1.5} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <div className="center-cta reveal">
          <a className="primary-cta" href="#agendamento" onClick={() => trackEvent("cta_click", { cta: "identify_comecar_acompanhamento" })}>Quero começar meu acompanhamento <ArrowRight size={15} /></a>
        </div>
      </div>
    </section>
  );
}

/* 03 · Diferencial */
function Differential() {
  const flow = ["Nutrição", "Treinamento", "Recuperação", "Composição corporal", "Performance"];
  return (
    <section id="diferencial" className="about" aria-labelledby="about-title">
      <div className="container-editorial about-grid">
        <div className="about-copy reveal">
          <div className="eyebrow eyebrow-light">Nutrição + treinamento</div>
          <h2 id="about-title" className="display">Por que olhar apenas para a alimentação se o seu objetivo também depende de como você treina?</h2>
          <p>Nathália é nutricionista, formada também em Educação Física, pós-graduada em Nutrição Esportiva e Estética e atua como Personal Trainer. Essa combinação permite uma visão integrada entre alimentação, treinamento, recuperação, composição corporal e performance.</p>
          <ol className="flow-chips" aria-label="Visão integrada">
            {flow.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <p>Sua estratégia nutricional passa a conversar com aquilo que você realmente faz fora da consulta.</p>
          <p className="about-statement">Nutrição e treino olhando para o mesmo resultado.</p>
          <a className="primary-cta light-cta about-cta" href="#entregaveis" onClick={() => trackEvent("cta_click", { cta: "diferencial_conhecer_acompanhamento" })}>Conhecer o acompanhamento <ArrowRight size={15} /></a>
        </div>
        <div className="about-photo-frame reveal reveal-delay-2"><div className="about-photo-clip"><img className="about-photo" src={trainingImage} alt="Nathália Fonseca com uma refeição equilibrada e um suco" loading="lazy" /></div></div>
      </div>
      <div className="container-editorial roles-row reveal">
        <span><Utensils size={20} strokeWidth={1.5} /> Nutricionista</span>
        <i aria-hidden="true">+</i>
        <span><GraduationCap size={20} strokeWidth={1.5} /> Educação Física</span>
        <i aria-hidden="true">+</i>
        <span><Dumbbell size={20} strokeWidth={1.5} /> Personal Trainer</span>
      </div>
    </section>
  );
}

/* 04 · Objetivos */
function Goals() {
  const goals = [
    { label: "Emagrecimento", title: "Perder gordura preservando massa muscular", copy: "Estratégias nutricionais direcionadas à redução de gordura e melhora da composição corporal.", cta: "Quero emagrecer", image: "/images/objetivo-emagrecimento.jpg", alt: "Mulher medindo a cintura com fita métrica", message: messageSuggestions["Emagrecimento"] },
    { label: "Hipertrofia", title: "Ganhar massa muscular", copy: "Nutrição alinhada ao treino para favorecer construção muscular e evolução corporal.", cta: "Quero ganhar massa", image: "/images/objetivo-hipertrofia.jpg", alt: "Braço levantando um haltere na academia", message: messageSuggestions["Hipertrofia"] },
    { label: "Definição", title: "Menos gordura. Mais definição.", copy: "Estratégias para melhorar a composição corporal e evidenciar os resultados construídos no treinamento.", cta: "Quero melhorar minha definição", image: "/images/objetivo-definicao.jpg", alt: "Abdômen definido em roupa de treino", message: messageSuggestions["Definição"] },
    { label: "Performance", title: "Treinar e render melhor", copy: "Nutrição esportiva direcionada a energia, recuperação e desempenho.", cta: "Quero melhorar minha performance", image: "/images/objetivo-performance.jpg", alt: "Pernas de corredora em uma pista ao pôr do sol", message: messageSuggestions["Performance"] },
  ];
  return (
    <section id="objetivos" className="goals" aria-labelledby="goals-title">
      <div className="container-editorial">
        <div className="section-head reveal">
          <div className="eyebrow">Como posso ajudar</div>
          <h2 id="goals-title" className="display">Qual resultado você está buscando?</h2>
          <p>Estratégias nutricionais personalizadas para diferentes objetivos e momentos da sua vida.</p>
        </div>
        <div className="goal-grid">
          {goals.map((goal, index) => (
            <article className={`goal-card reveal reveal-delay-${(index % 2) + 1}`} key={goal.label}>
              <div className="goal-media"><SmartImage className="goal-image" src={goal.image} alt={goal.alt} /><span className="goal-label">{goal.label}</span></div>
              <div className="goal-body">
                <h3>{goal.title}</h3>
                <p>{goal.copy}</p>
                <a className="goal-link" href={waLink(`Olá, Nathália! ${goal.message}`)} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("cta_click", { cta: `objetivo_${goal.label.toLowerCase()}` })}>{goal.cta} <ArrowRight size={14} /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 05 · Entregáveis (somente itens confirmados no briefing) */
function Deliverables() {
  const items: [string, LucideIcon][] = [
    ["Avaliação individual da rotina e alimentação", Utensils],
    ["Análise dos objetivos e treinamento", Target],
    ["Estratégia nutricional personalizada", Activity],
    ["Plano alimentar adaptado à rotina", Check],
    ["Orientação de substituições e escolhas alimentares", Scale],
    ["Acompanhamento da evolução", Ruler],
    ["Ajustes conforme resultados e necessidades", Zap],
  ];
  return (
    <section id="entregaveis" className="deliverables" aria-labelledby="deliverables-title">
      <div className="container-editorial">
        <div className="section-head reveal">
          <div className="eyebrow">O que você vai receber</div>
          <h2 id="deliverables-title" className="display">Muito além de receber uma dieta.</h2>
        </div>
        <ul className="deliverable-list reveal reveal-delay-1">
          {items.map(([item, Icon]) => <li key={item}><span className="deliverable-icon"><Icon size={17} strokeWidth={1.6} /></span>{item}</li>)}
        </ul>
        <div className="center-cta reveal">
          <a className="primary-cta" href="#agendamento" onClick={() => trackEvent("cta_click", { cta: "entregaveis_agendar" })}>Quero agendar minha consulta <ArrowRight size={15} /></a>
        </div>
      </div>
    </section>
  );
}

/* 06 · Como funciona */
function Process() {
  const steps = [
    ["01", "Agende sua consulta", "Escolha atendimento online ou presencial."],
    ["02", "Faça sua avaliação", "Entendimento de alimentação, rotina, treinamento, histórico, preferências e objetivos."],
    ["03", "Receba sua estratégia", "Planejamento desenvolvido de acordo com suas necessidades."],
    ["04", "Coloque em prática", "Uma alimentação pensada para funcionar também fora da consulta."],
    ["05", "Acompanhe sua evolução", "Resultados avaliados e estratégia ajustada quando necessário."],
  ];
  return (
    <section id="como-funciona" className="process" aria-labelledby="process-title">
      <div className="container-editorial">
        <div className="section-head reveal">
          <div className="eyebrow">Do primeiro contato à sua evolução</div>
          <h2 id="process-title" className="display">Simples para começar. Individualizado para evoluir.</h2>
        </div>
        <ol className="process-steps">
          {steps.map(([number, title, copy], index) => <li className={`process-step reveal reveal-delay-${Math.min(index + 1, 3)}`} key={number}><div className="process-marker">{number}</div><h3>{title}</h3><p>{copy}</p></li>)}
        </ol>
        <div className="center-cta reveal">
          <a className="primary-cta" href="#agendamento" onClick={() => trackEvent("cta_click", { cta: "como_funciona_agendar" })}>Quero agendar minha consulta <ArrowRight size={15} /></a>
        </div>
      </div>
    </section>
  );
}

/* 07 · Online x presencial */
function Modalities() {
  const options = [
    { kind: "Consulta online", title: "Acompanhamento onde você estiver.", items: ["Consulta por videochamada", "Estratégia individualizada", "Plano alimentar personalizado"], cta: "Agendar consulta online", icon: Monitor, image: "/images/consulta-online.jpg", alt: "Consulta de nutrição por videochamada em um notebook", message: messageSuggestions["Consulta online"] },
    { kind: "Consulta presencial", title: "Atendimento presencial no Rio de Janeiro.", items: ["Consulta presencial", "Estratégia individualizada", "Endereço informado no agendamento"], cta: "Agendar consulta presencial", icon: MapPin, image: "/images/consulta-presencial.jpg", alt: "Consultório de nutrição com mesa, cadeiras e plantas", message: messageSuggestions["Consulta presencial"] },
  ];
  return (
    <section id="modalidades" className="modalities" aria-labelledby="modalities-title">
      <div className="container-editorial">
        <div className="section-head reveal">
          <div className="eyebrow">Formato de atendimento</div>
          <h2 id="modalities-title" className="display">Online ou presencial: escolha o formato que funciona para você.</h2>
        </div>
        <div className="modality-grid">
          {options.map(({ kind, title, items, cta, icon: Icon, image, alt, message }, index) => (
            <article className={`modality-card reveal reveal-delay-${index + 1}`} key={kind}>
              <SmartImage className="modality-image" src={image} alt={alt} />
              <div className="modality-body">
                <div className="eyebrow modality-kind"><Icon size={14} /> {kind}</div>
                <h3>{title}</h3>
                <ul>{items.map((item) => <li key={item}><Check size={15} /> {item}</li>)}</ul>
                <a className="primary-cta" href={waLink(`Olá, Nathália! ${message}`)} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("cta_click", { cta: kind === "Consulta online" ? "modalidade_online" : "modalidade_presencial" })}>{cta} <ArrowRight size={15} /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Evolution() {
  const [activeCase, setActiveCase] = useState(0);
  const [position, setPosition] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDemoActive, setIsDemoActive] = useState(false);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const demoStoppedRef = useRef(false);

  useEffect(() => {
    const comparison = comparisonRef.current;
    if (!comparison || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !demoStoppedRef.current) {
        setIsDemoActive(true);
        observer.disconnect();
      }
    }, { threshold: 0.45 });
    observer.observe(comparison);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isDemoActive || demoStoppedRef.current) return;
    let frame = 0;
    const startedAt = performance.now();
    const duration = 2200;
    const animate = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      const wave = Math.sin(eased * Math.PI * 2);
      setPosition(50 + wave * 24);
      if (progress < 1 && !demoStoppedRef.current) frame = requestAnimationFrame(animate);
      else { setPosition(50); setIsDemoActive(false); }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isDemoActive]);

  const stopDemo = () => {
    demoStoppedRef.current = true;
    setIsDemoActive(false);
  };

  const updatePosition = (clientX: number, element: HTMLElement) => {
    stopDemo();
    const bounds = element.getBoundingClientRect();
    const nextPosition = Math.min(100, Math.max(0, ((clientX - bounds.left) / bounds.width) * 100));
    setPosition(nextPosition);
    setHasInteracted(true);
  };

  const currentCase = evolutionCases[activeCase];
  const goToCase = (nextCase: number) => { stopDemo(); setActiveCase((nextCase + evolutionCases.length) % evolutionCases.length); setPosition(50); setHasInteracted(false); };

  return (
    /* 08 · Resultados reais */
    <section id="resultados" className="evolution" aria-labelledby="evolution-title">
      <div className="container-editorial">
        <div className="evolution-intro reveal">
          <div><div className="eyebrow">Resultados reais</div><h2 id="evolution-title" className="display">Estratégias diferentes. Objetivos diferentes. Evoluções reais.</h2></div>
          <div className="evolution-intro-side"><p>Cada pessoa tem um ponto de partida, uma rotina e um objetivo. Aqui estão algumas evoluções de pacientes que autorizaram e compartilharam seus resultados.</p></div>
        </div>
        <div className="evolution-case reveal reveal-delay-1">
          <div className="evolution-case-meta"><span className="case-counter">0{activeCase + 1} <i>/ 0{evolutionCases.length}</i></span><span className="case-caption">Resultados são individuais e podem variar.</span></div>
          <div className="comparison-shell">
            <div ref={comparisonRef} className={`comparison ${isDemoActive ? "is-demo-active" : ""}`} onPointerDown={(event) => { stopDemo(); event.currentTarget.setPointerCapture(event.pointerId); updatePosition(event.clientX, event.currentTarget); }} onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) updatePosition(event.clientX, event.currentTarget); }} onPointerUp={(event) => event.currentTarget.releasePointerCapture(event.pointerId)} onPointerCancel={(event) => event.currentTarget.releasePointerCapture(event.pointerId)}>
              <img className="comparison-image comparison-after" src={currentCase.after} alt={`Evolução do caso ${activeCase + 1}, depois`} loading="lazy" />
              <img className="comparison-image comparison-before-image" src={currentCase.before} style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} alt={`Evolução do caso ${activeCase + 1}, antes`} loading="lazy" />
              <span className="comparison-label comparison-label-before">Antes</span><span className="comparison-label comparison-label-after">Depois</span>
              <div className="comparison-divider" style={{ left: `${position}%` }} aria-hidden="true"><span className="comparison-handle"><ArrowLeft size={13} /><ArrowRight size={13} /></span></div>
              <input className="comparison-range" type="range" min="0" max="100" value={position} aria-label="Arraste para comparar antes e depois" onPointerDown={stopDemo} onChange={(event) => { stopDemo(); setPosition(Number(event.target.value)); setHasInteracted(true); }} />
            </div>
          </div>
          <div className="comparison-footer"><span className={hasInteracted ? "comparison-hint is-hidden" : "comparison-hint"}>Arraste para comparar <ArrowRight size={14} /></span><span className="case-detail">Evolução individual de paciente</span></div>
          <div className="evolution-controls"><button type="button" className="gallery-arrow" onClick={() => goToCase(activeCase - 1)} aria-label="Caso anterior"><ChevronLeft size={18} /></button><div className="gallery-dots" role="tablist" aria-label="Seleccionar caso de evolução">{evolutionCases.map((_, index) => <button type="button" role="tab" aria-selected={activeCase === index} className={`gallery-dot ${activeCase === index ? "is-active" : ""}`} onClick={() => goToCase(index)} aria-label={`Ver caso ${index + 1}`} key={index} />)}</div><button type="button" className="gallery-arrow" onClick={() => goToCase(activeCase + 1)} aria-label="Próximo caso"><ChevronRight size={18} /></button></div>
        </div>
        <div className="evolution-cta reveal reveal-delay-2"><div><h3>Quer começar a construir sua própria evolução?</h3><p>O primeiro passo é entender onde você está e definir para onde quer chegar.</p></div><a className="section-cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("cta_click", { cta: "resultados_whatsapp" })}>Quero agendar minha consulta <ArrowRight size={15} /></a></div>
      </div>
    </section>
  );
}
function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirectError, setRedirectError] = useState("");
  const [draft, setDraft] = useState({ name: "", email: "", subject: "", message: "", consent: false });

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    const savedDraft = window.localStorage.getItem(contactDraftKey);
    if (savedDraft) {
      try { setDraft({ ...draft, ...JSON.parse(savedDraft) }); } catch { window.localStorage.removeItem(contactDraftKey); }
    }
    setRedirectError("");
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; setSubmitted(false); setIsSubmitting(false); };
  }, [open, onClose]);

  if (!open) return null;

  const updateDraft = (field: keyof typeof draft, value: string | boolean) => {
    const nextDraft = { ...draft, [field]: value };
    setDraft(nextDraft);
    window.localStorage.setItem(contactDraftKey, JSON.stringify(nextDraft));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const consent = formData.get("consent");
    if (!consent) return;
    setRedirectError("");
    const personalizedMessage = `${whatsappMessage}\\n\\nAssunto: ${subject}\\nNome: ${name}\\nEmail: ${email}\\nMensagem: ${message}`;
    setIsSubmitting(true);
    window.setTimeout(() => {
      trackEvent("contact_form_submit", { form: "final_cta_contact", subject });
      try {
        const whatsappWindow = window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(personalizedMessage)}`, "_blank", "noopener,noreferrer");
        if (!whatsappWindow) throw new Error("popup-blocked");
        toast.success("Mensagem preparada", { description: "A conversa foi aberta no WhatsApp para concluir o contato." });
        window.localStorage.removeItem(contactDraftKey);
        setSubmitted(true);
      } catch {
        const errorMessage = "Não foi possível abrir o WhatsApp. Verifique se o navegador bloqueou a nova janela e tente novamente.";
        setRedirectError(errorMessage);
        toast.error("Não foi possível abrir o WhatsApp", { description: "Permita pop-ups para concluir o contato." });
      } finally {
        setIsSubmitting(false);
      }
    }, 650);
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Fechar formulário"><X size={19} /></button>
        {!submitted ? (
          <>
            <div className="eyebrow">Vamos conversar</div>
            <h2 id="contact-modal-title" className="display">Seu próximo passo começa com uma mensagem.</h2>
            <p className="modal-intro">Preencha seus dados. Ao enviar, a conversa abre no WhatsApp da Nathália com sua mensagem pronta.</p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>Nome<input name="name" type="text" autoComplete="name" placeholder="Seu nome" value={draft.name} onChange={(event) => updateDraft("name", event.target.value)} required /></label>
              <label>Email<input name="email" type="email" autoComplete="email" placeholder="seu@email.com" value={draft.email} onChange={(event) => updateDraft("email", event.target.value)} required /></label>
              <label>Objetivo<select name="subject" value={draft.subject} onChange={(event) => { const subject = event.target.value; const suggestion = messageSuggestions[subject] || ""; const shouldSuggest = !draft.message || Object.values(messageSuggestions).includes(draft.message); updateDraft("subject", subject); if (shouldSuggest) updateDraft("message", suggestion); }} required><option value="" disabled>Escolha um objetivo</option>{Object.keys(messageSuggestions).map((option) => <option value={option} key={option}>{option}</option>)}</select></label>
              <label>Mensagem<textarea name="message" rows={3} placeholder="Conte brevemente o que procura." value={draft.message} onChange={(event) => updateDraft("message", event.target.value)} required /></label>
              <label className="consent-label"><input className="consent-checkbox" name="consent" type="checkbox" checked={draft.consent} onChange={(event) => updateDraft("consent", event.target.checked)} required /><span>Concordo com o tratamento dos meus dados para receber resposta sobre este contato.</span></label>
              {redirectError && <div className="form-error" role="alert"><strong>O WhatsApp não abriu.</strong><span>{redirectError}</span></div>}
              <button className="primary-cta" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>{isSubmitting ? <><LoaderCircle className="button-spinner" size={16} /> Preparando o WhatsApp…</> : <>Continuar no WhatsApp <ArrowRight size={15} /></>}</button>
            </form>
          </>
        ) : (
          <div className="modal-success"><div className="modal-success-mark"><MessageCircle size={24} /></div><div className="eyebrow">Mensagem preparada</div><h2 className="display">A conversa continua no WhatsApp.</h2><p className="modal-intro">Se a nova janela não abriu, use o botão abaixo para retomar o contato.</p><a className="primary-cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("whatsapp_click", { placement: "contact_modal" })}>Abrir WhatsApp <ArrowRight size={15} /></a></div>
        )}
      </section>
    </div>
  );
}

/* 09 · Depoimentos */
function Testimonials() {
  const testimonials = [
    { name: "Vivianne", quote: "Obrigadaaaaa mais uma vez. Não teria como ter escolhido nutri melhor para começar esse processo. Bracinhos e abdômen definidos. E animada para evoluir ainda mais 💪🏻" },
    { name: "Eduarda Lanzi", quote: "Nath, queria te agradecer. Você é muuuuuito boa, nem imagina o quanto. Eu tô me adaptando de uma forma bizarra à dieta e sem muitos esforços." },
    { name: "Aline Silvares", quote: "Menina, treinar contigo realmente funciona. Minhas pernas estão lindas. Estou ficando insuportável kkkk" },
  ];
  return (
    <section id="depoimentos" className="testimonials" aria-labelledby="testimonials-title">
      <div className="container-editorial">
        <div className="section-head reveal">
          <div className="eyebrow">Depoimentos</div>
          <h2 id="testimonials-title" className="display">O que os pacientes dizem sobre o acompanhamento.</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => <figure className={`testimonial-card reveal reveal-delay-${index + 1}`} key={testimonial.name}><blockquote>“{testimonial.quote}”</blockquote><figcaption>{testimonial.name}</figcaption></figure>)}
        </div>
      </div>
    </section>
  );
}

/* 10 · Autoridade */
function Authority() {
  const tags = ["Nutrição", "Educação Física", "Nutrição Esportiva e Estética", "Personal Trainer", "Preparação Física"];
  return (
    <section id="sobre" className="authority" aria-labelledby="authority-title">
      <div className="container-editorial authority-grid">
        <div className="authority-copy reveal">
          <div className="eyebrow">Conheça Nathália Fonseca</div>
          <h2 id="authority-title" className="display">Duas formações. Uma visão mais completa sobre o seu resultado.</h2>
          <p>Nathália Fonseca é bacharel em Nutrição pela UNISUAM, pós-graduada em Nutrição Esportiva e Estética pelo Centro Universitário São Camilo e bacharel em Educação Física pela UNISUAM.</p>
          <p>Sua experiência inclui atuação com musculação, treinamento funcional, CrossFit, spinning, avaliação física, prescrição de exercícios, preparação física e acompanhamento individualizado.</p>
          <ul className="authority-tags">{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
          <a className="secondary-cta" href={instagramUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("cta_click", { cta: "sobre_instagram" })}><Instagram size={15} /> @nathfonsecanutri · 26,6 mil seguidores</a>
        </div>
        <div className="authority-photo reveal reveal-delay-2"><img src={heroImage} alt="Retrato de Nathália Fonseca" loading="lazy" /></div>
      </div>
    </section>
  );
}

/* 11 · FAQ — apenas respostas confirmadas; o restante direciona ao WhatsApp */
const faqs: [string, string][] = [
  ["Quanto custa a consulta?", "Fale pelo WhatsApp para conhecer as modalidades de acompanhamento disponíveis e os valores."],
  ["A consulta pode ser online?", "Sim. Há atendimento online e presencial."],
  ["Onde fica o atendimento presencial?", "No Rio de Janeiro. O endereço completo é informado no momento do agendamento pelo WhatsApp."],
  ["Vou receber um plano alimentar?", "Sim. O plano alimentar é adaptado à sua rotina, com orientação de substituições e escolhas alimentares."],
  ["Serve para emagrecimento?", "Sim. O acompanhamento pode ser direcionado à redução de gordura e melhora da composição corporal."],
  ["Serve para ganhar massa muscular?", "Sim. O planejamento pode ser direcionado à hipertrofia e ganho de massa muscular."],
  ["Preciso treinar?", "Não necessariamente. A estratégia depende do objetivo e do contexto individual."],
  ["Em quanto tempo vou ter resultado?", "O tempo varia conforme objetivo, ponto de partida, rotina, treinamento, adesão e características individuais. A evolução é acompanhada ao longo do processo."],
  ["Como faço para agendar?", "Clique em qualquer botão de agendamento ou fale diretamente pelo WhatsApp para verificar disponibilidade."],
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section id="duvidas" className="faq" aria-labelledby="faq-title">
      <div className="container-editorial faq-grid">
        <div className="faq-heading reveal">
          <div className="eyebrow">Dúvidas frequentes</div>
          <h2 id="faq-title" className="display">Dúvidas frequentes antes de agendar.</h2>
          <p>Não encontrou sua dúvida? Fale diretamente com a Nathália.</p>
          <a className="section-cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("whatsapp_click", { placement: "faq" })}>Falar pelo WhatsApp <ArrowRight size={15} /></a>
        </div>
        <div className="faq-list reveal reveal-delay-1">
          {faqs.map(([question, answer], index) => (
            <div className="faq-item" key={question}>
              <h3 className="faq-h3"><button className="faq-question" aria-expanded={openIndex === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenIndex(openIndex === index ? null : index)}><span>{question}</span><ChevronDown size={18} /></button></h3>
              <div id={`faq-answer-${index}`} className="faq-answer" hidden={openIndex !== index}>{answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 12 · CTA final */
function FinalCta() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <section id="agendamento" className="final-cta" aria-labelledby="final-cta-title">
      <div className="container-editorial final-cta-inner">
        <div className="reveal">
          <div className="eyebrow eyebrow-light">Pronto para começar?</div>
          <h2 id="final-cta-title" className="display">Seu objetivo pode ser emagrecer, ganhar massa ou melhorar sua performance. O primeiro passo é o mesmo: ter uma estratégia feita para você.</h2>
        </div>
        <div className="final-cta-copy reveal reveal-delay-2">
          <p className="final-signature"><strong>Nathália Fonseca</strong><br />Nutricionista · Nutrição Esportiva e Estética · Educação Física · Personal Trainer<br />Online | Presencial — Rio de Janeiro</p>
          <button className="primary-cta light-cta" type="button" aria-haspopup="dialog" onClick={() => { trackEvent("cta_click", { cta: "final_agendar_consulta" }); setModalOpen(true); }}>Quero agendar minha consulta <ArrowRight size={15} /></button>
          <a className="final-secondary" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("whatsapp_click", { placement: "final_cta" })}>Falar diretamente pelo WhatsApp <ArrowRight size={14} /></a>
        </div>
        <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </section>
  );
}

function WhatsAppFloat() {
  return (
    <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp" onClick={() => trackEvent("whatsapp_click", { placement: "floating_button" })}>
      <MessageCircle size={22} strokeWidth={2.1} />
      <span>WhatsApp</span>
    </a>
  );
}

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-shell">
      <Header />
      <main>
        <Hero />
        <GoalsBand />
        <Identify />
        <Differential />
        <Goals />
        <Deliverables />
        <Process />
        <Modalities />
        <Evolution />
        <Testimonials />
        <Authority />
        <FAQ />
        <FinalCta />
      </main>
      <WhatsAppFloat />
      <footer className="site-footer">
        <div className="container-editorial footer-inner">
          <p>© {new Date().getFullYear()} Nathália Fonseca · Nutricionista Esportiva · Atendimento online e presencial no Rio de Janeiro</p>
          <a className="footer-instagram" href={instagramUrl} target="_blank" rel="noopener noreferrer"><Instagram size={15} /> @nathfonsecanutri</a>
        </div>
      </footer>
    </div>
  );
}
