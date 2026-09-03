/* Editorial Orgânico — narrativa assimétrica, fotografia como autoridade silenciosa e CTAs humanos. */
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Instagram,
  LoaderCircle,
  MessageCircle,
  Menu,
  MoveUpRight,
  Sparkles,
  Target,
  Utensils,
  X,
} from "lucide-react";

const heroImage = "/manus-storage/nathalia-hero-portrait_ba4799ec.jpg";
const trainingImage = "/manus-storage/nathalia-training-portrait_e68cad58.jpg";
const textureImage = "/manus-storage/nathalia-organic-texture_d4614687.png";
const markImage = "/manus-storage/nathalia-mark_9ea8669e.png";
const instagramUrl = "https://www.instagram.com/nathfonsecanutri/";
const whatsappNumber = "5521981181479";
const whatsappMessage = "Olá, Nathália! Gostaria de saber mais sobre o acompanhamento nutricional e os formatos de atendimento.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
const contactDraftKey = "nathalia-contact-draft";
const evolutionCases = [
  { before: "/manus-storage/caso-1-antes_54f2dfa5.jpg", after: "/manus-storage/caso-1-depois_9f40bf20.jpg" },
  { before: "/manus-storage/caso-2-antes_ecc7f5d3.jpg", after: "/manus-storage/caso-2-depois_5b953ccf.jpg" },
  { before: "/manus-storage/caso-3-antes_72e1b988.jpg", after: "/manus-storage/caso-3-depois_414c21bb.jpg" },
];

const messageSuggestions: Record<string, string> = {
  "Consulta de nutrição": "Gostaria de saber como funciona a consulta de nutrição.",
  "Nutrição esportiva e performance": "Gostaria de falar sobre nutrição esportiva e performance.",
  "Reeducação alimentar": "Gostaria de construir uma estratégia de reeducação alimentar.",
  "Atendimento online ou presencial": "Gostaria de saber mais sobre os formatos de atendimento.",
  "Outro assunto": "Gostaria de conversar sobre o meu objectivo e perceber como pode ajudar.",
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

const services = [
  {
    number: "01",
    title: "Emagrecimento",
    description: "Estratégias nutricionais personalizadas para quem busca redução de gordura e evolução de forma consistente.",
    icon: Target,
  },
  {
    number: "02",
    title: "Reeducação alimentar",
    description: "Construa hábitos mais equilibrados e uma alimentação que faça sentido para a sua rotina.",
    icon: Utensils,
  },
  {
    number: "03",
    title: "Nutrição esportiva",
    description: "Estratégias alimentares alinhadas à sua rotina de treinos e aos seus objetivos esportivos.",
    icon: Dumbbell,
  },
  {
    number: "04",
    title: "Performance",
    description: "Nutrição pensada para apoiar energia, recuperação e desempenho durante a sua jornada.",
    icon: Sparkles,
  },
];

const faqs = [
  ["O atendimento é presencial ou online?", "O atendimento é realizado de forma online e presencial."],
  ["O acompanhamento é personalizado?", "Sim. A proposta é considerar a sua rotina, os seus objetivos e as suas necessidades individuais."],
  ["A Nathália atende quem pratica musculação?", "Sim. A atuação inclui nutrição esportiva e performance."],
  ["O atendimento é apenas para quem quer emagrecer?", "Não. A atuação também contempla reeducação alimentar, nutrição esportiva e performance."],
  ["Como faço para agendar?", "Clique num dos botões de agendamento e entre em contacto para verificar disponibilidade e realizar o seu agendamento."],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    ["Sobre", "sobre"],
    ["Atuação", "atuacao"],
    ["Evolução", "evolucao"],
    ["Como funciona", "como-funciona"],
    ["FAQ", "faq"],
  ];

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container-editorial header-inner">
        <a className="wordmark" href="#inicio" aria-label="Nathália Fonseca, Nutrição e Performance">
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
          <a className="primary-cta mobile-nav-cta" href="#agendamento" onClick={() => setMenuOpen(false)}>Agendar consulta <ArrowRight size={14} /></a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container-editorial hero-grid">
        <div className="hero-copy reveal">
          <div className="hero-kicker eyebrow"><span className="hero-kicker-line" /> Nutrição · Performance · Bem-estar</div>
          <h1 className="display">Sua alimentação pode <em>trabalhar</em> a favor dos seus objetivos.</h1>
          <p className="hero-lead">Estratégias nutricionais personalizadas para emagrecimento, reeducação alimentar, nutrição esportiva e performance — respeitando a sua rotina e as suas necessidades.</p>
          <div className="hero-actions">
            <a className="primary-cta" href="#agendamento" onClick={() => trackEvent("cta_click", { cta: "hero_agendar_consulta" })}>Quero agendar a minha consulta <ArrowRight size={15} /></a>
            <a className="secondary-cta" href="#sobre" onClick={() => trackEvent("cta_click", { cta: "hero_conhecer_trabalho" })}>Conhecer o trabalho <ArrowDownRight size={15} /></a>
          </div>
          <div className="hero-note"><span className="hero-note-dot" /> Atendimento online e presencial</div>
        </div>
        <div className="hero-visual reveal reveal-delay-2">
          <div className="hero-photo-wrap"><img className="hero-photo" src={heroImage} alt="Nathália Fonseca em retrato editorial" /></div>
          <div className="hero-orbit" aria-hidden="true" />
          <div className="hero-stat"><strong>26,6 mil</strong><span>seguidores no Instagram · conteúdo sobre nutrição, saúde e performance</span></div>
          <span className="hero-side-label">Estratégia para a vida real</span>
        </div>
      </div>
    </section>
  );
}

function Identify() {
  const cards = [
    ["01", "Já tentou várias dietas?", "E sente dificuldade para manter os resultados?"],
    ["02", "A sua rotina é corrida?", "Você precisa de uma alimentação que realmente caiba no seu dia."],
    ["03", "Treina, mas sente que poderia evoluir?", "A sua alimentação também faz parte da sua performance."],
    ["04", "Quer mudar os seus hábitos?", "Sem depender de soluções extremas ou estratégias impossíveis de manter."],
  ];
  return (
    <section className="identify" aria-labelledby="identify-title">
      <div className="container-editorial identify-grid">
        <div className="identify-copy reveal">
          <div className="eyebrow">Talvez se identifique</div>
          <h2 id="identify-title" className="display">Você não precisa de mais uma dieta.</h2>
          <p>Precisa de uma estratégia que faça sentido para você. Cada pessoa possui uma rotina, objetivos, preferências e necessidades diferentes.</p>
          <a className="section-cta" href="#agendamento" onClick={() => trackEvent("cta_click", { cta: "identify_comecar_transformacao" })}>Quero começar a minha transformação <ArrowRight size={15} /></a>
        </div>
        <div className="identify-list reveal reveal-delay-1">
          {cards.map(([number, title, copy]) => <article className="identify-card" key={number}><span className="identify-card-number">{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="atuacao" className="services" aria-labelledby="services-title">
      <div className="container-editorial">
        <div className="services-header reveal">
          <div><div className="eyebrow">Como posso ajudar</div><h2 id="services-title" className="display">Uma estratégia nutricional alinhada ao seu objetivo.</h2></div>
          <p className="services-intro">Mais clareza para as suas escolhas, mais consistência para a sua evolução.</p>
        </div>
        <div className="services-list">
          {services.map(({ number, title, description, icon: Icon }, index) => <article className={`service-row reveal reveal-delay-${Math.min(index + 1, 3)}`} key={number}><span className="service-no">{number}</span><h3 className="service-name"><Icon className="service-icon" />{title}</h3><p className="service-description">{description}</p><span className="service-arrow" aria-hidden="true"><MoveUpRight size={15} /></span></article>)}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="about" aria-labelledby="about-title">
      <div className="container-editorial about-grid">
        <div className="about-copy reveal">
          <div className="eyebrow eyebrow-light">Um olhar mais completo sobre a sua evolução</div>
          <h2 id="about-title" className="display">Nutrição e treino olhando para o mesmo objetivo.</h2>
          <p>Além da formação em Nutrição, Nathália também atua como Personal Trainer. Essa visão integrada permite compreender melhor a relação entre alimentação, rotina de exercícios e objetivos individuais.</p>
          <div className="about-roles"><span className="role-pill">Nutricionista</span><span className="role-divider">×</span><span className="role-pill">Personal Trainer</span></div>
          <p className="about-statement">Alimentação, movimento e estratégia trabalhando juntos.</p>
        </div>
        <div className="about-photo-frame reveal reveal-delay-2"><img className="about-photo" src={trainingImage} alt="Nathália Fonseca num estúdio de treino" /></div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [["01", "Agendamento", "Escolha o melhor formato de atendimento e dê o primeiro passo."], ["02", "Avaliação", "Entendimento da sua rotina, objetivos, hábitos e necessidades."], ["03", "Estratégia", "Construção de uma estratégia nutricional personalizada."], ["04", "Acompanhamento", "Evolução acompanhada de perto, com ajustes quando necessário."]];
  return (
    <section id="como-funciona" className="process" aria-labelledby="process-title">
      <div className="container-editorial">
        <div className="process-header reveal"><div><div className="eyebrow">O caminho</div><h2 id="process-title" className="display">Simples, personalizado e direcionado para você.</h2></div><p>Um acompanhamento que começa por ouvir antes de orientar.</p></div>
        <div className="process-steps">
          {steps.map(([number, title, copy], index) => <article className={`process-step reveal reveal-delay-${Math.min(index + 1, 3)}`} key={number}><div className="process-marker">{number}</div><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </div>
    </section>
  );
}

function Evolution() {
  const [activeCase, setActiveCase] = useState(0);
  const [position, setPosition] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);

  const updatePosition = (clientX: number, element: HTMLElement) => {
    const bounds = element.getBoundingClientRect();
    const nextPosition = Math.min(100, Math.max(0, ((clientX - bounds.left) / bounds.width) * 100));
    setPosition(nextPosition);
    setHasInteracted(true);
  };

  const currentCase = evolutionCases[activeCase];
  const goToCase = (nextCase: number) => { setActiveCase((nextCase + evolutionCases.length) % evolutionCases.length); setPosition(50); setHasInteracted(false); };

  return (
    <section id="evolucao" className="evolution" aria-labelledby="evolution-title">
      <div className="container-editorial">
        <div className="evolution-intro reveal">
          <div><div className="eyebrow">Evolução</div><h2 id="evolution-title" className="display">Cada jornada começa com um primeiro passo.</h2></div>
          <div className="evolution-intro-side"><strong>Evolução não é sobre perfeição.<br />É sobre processo.</strong><p>Resultados são individuais e acontecem ao longo de um processo. Aqui, alguns exemplos de evoluções compartilhadas por pacientes, sempre respeitando as suas jornadas e objetivos.</p></div>
        </div>
        <div className="evolution-case reveal reveal-delay-1">
          <div className="evolution-case-meta"><span className="case-counter">0{activeCase + 1} <i>/ 0{evolutionCases.length}</i></span><span className="case-caption">Imagens fornecidas para apresentação de evolução · confirmar autorização antes de publicar</span></div>
          <div className="comparison-shell">
            <div className="comparison" onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); updatePosition(event.clientX, event.currentTarget); }} onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) updatePosition(event.clientX, event.currentTarget); }} onPointerUp={(event) => event.currentTarget.releasePointerCapture(event.pointerId)} onPointerCancel={(event) => event.currentTarget.releasePointerCapture(event.pointerId)}>
              <img className="comparison-image comparison-after" src={currentCase.after} alt={`Evolução do caso ${activeCase + 1}, depois`} />
              <img className="comparison-image comparison-before-image" src={currentCase.before} style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} alt={`Evolução do caso ${activeCase + 1}, antes`} />
              <span className="comparison-label comparison-label-before">Antes</span><span className="comparison-label comparison-label-after">Depois</span>
              <div className="comparison-divider" style={{ left: `${position}%` }} aria-hidden="true"><span className="comparison-handle"><ArrowLeft size={13} /><ArrowRight size={13} /></span></div>
              <input className="comparison-range" type="range" min="0" max="100" value={position} aria-label="Arraste para comparar antes e depois" onChange={(event) => { setPosition(Number(event.target.value)); setHasInteracted(true); }} />
            </div>
          </div>
          <div className="comparison-footer"><span className={hasInteracted ? "comparison-hint is-hidden" : "comparison-hint"}>Arraste para comparar <ArrowRight size={14} /></span><span className="case-detail">Evolução individual · objectivo e descrição a inserir pela profissional</span></div>
          <div className="evolution-controls"><button type="button" className="gallery-arrow" onClick={() => goToCase(activeCase - 1)} aria-label="Caso anterior"><ChevronLeft size={18} /></button><div className="gallery-dots" role="tablist" aria-label="Seleccionar caso de evolução">{evolutionCases.map((_, index) => <button type="button" role="tab" aria-selected={activeCase === index} className={`gallery-dot ${activeCase === index ? "is-active" : ""}`} onClick={() => goToCase(index)} aria-label={`Ver caso ${index + 1}`} key={index} />)}</div><button type="button" className="gallery-arrow" onClick={() => goToCase(activeCase + 1)} aria-label="Próximo caso"><ChevronRight size={18} /></button></div>
        </div>
        <div className="evolution-cta reveal reveal-delay-2"><div><h3>Quer começar a construir a sua própria evolução?</h3><p>O primeiro passo é entender onde você está e definir para onde quer chegar.</p></div><a className="section-cta" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("cta_click", { cta: "evolution_whatsapp" })}>Quero agendar a minha consulta <ArrowRight size={15} /></a></div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <div className="container-editorial">
        <div className="testimonials-top reveal"><div><div className="eyebrow">Histórias reais</div><h2 id="testimonials-title" className="display">A sua jornada pode ser a próxima.</h2></div><p className="testimonial-note">Espaço preparado para depoimentos reais, adicionados com autorização.</p></div>
        <div className="testimonial-grid">
          {["Depoimento real a inserir", "Resultado autorizado a inserir", "História real a inserir"].map((label, index) => <article className="testimonial-placeholder reveal" key={label}><div className="placeholder-top"><span className="placeholder-avatar" aria-hidden="true" /><span className="placeholder-tag">{index === 1 ? "Resultado" : "Depoimento"}</span></div><p className="placeholder-copy">{label}</p><span className="placeholder-foot">Conteúdo reservado para material fornecido pela profissional.</span></article>)}
        </div>
      </div>
    </section>
  );
}

function InstagramSection() {
  return (
    <section className="instagram" aria-labelledby="instagram-title">
      <div className="container-editorial instagram-grid">
        <div className="instagram-copy reveal"><div className="eyebrow">Acompanhe mais conteúdos</div><h2 id="instagram-title" className="display">Nutrição para a vida real.</h2><p>Conteúdos sobre alimentação, treino, saúde, emagrecimento e performance também no Instagram.</p><a className="instagram-handle" href={instagramUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("cta_click", { cta: "instagram_handle" })}><Instagram /> @nathfonsecanutri · 26,6 mil seguidores</a><div><a className="section-cta instagram-cta" href={instagramUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("cta_click", { cta: "instagram_follow" })}>Seguir no Instagram <ArrowRight size={15} /></a></div></div>
        <div className="post-grid reveal reveal-delay-2" aria-label="Espaço reservado para posts do Instagram">
          <div className="post-tile"><img src={trainingImage} alt="" /></div>
          <div className="post-tile"><img src={textureImage} alt="" /></div>
          <div className="post-tile"><div className="post-placeholder"><span>Posts reais a inserir</span></div></div>
          <div className="post-tile"><div className="post-placeholder"><span>Conteúdo da Nathália</span></div></div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppFloat() {
  return (
    <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contactar pelo WhatsApp" onClick={() => trackEvent("whatsapp_click", { placement: "floating_button" })}>
      <MessageCircle size={22} strokeWidth={2.1} />
      <span>Falar no WhatsApp</span>
    </a>
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
        toast.success("Mensagem preparada", { description: "A conversa foi aberta no WhatsApp para concluir o contacto." });
        window.localStorage.removeItem(contactDraftKey);
        setSubmitted(true);
      } catch {
        const errorMessage = "Não foi possível abrir o WhatsApp. Verifique se o navegador bloqueou a nova janela e tente novamente.";
        setRedirectError(errorMessage);
        toast.error("Não foi possível abrir o WhatsApp", { description: "Permita pop-ups para concluir o contacto." });
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
            <h2 id="contact-modal-title" className="display">O seu próximo passo começa com uma mensagem.</h2>
            <p className="modal-intro">Preencha os seus dados. Ao enviar, a conversa será aberta no WhatsApp da Nathália com a sua mensagem pronta.</p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>Nome<input name="name" type="text" autoComplete="name" placeholder="Como se chama?" value={draft.name} onChange={(event) => updateDraft("name", event.target.value)} required /></label>
              <label>Email<input name="email" type="email" autoComplete="email" placeholder="seu@email.com" value={draft.email} onChange={(event) => updateDraft("email", event.target.value)} required /></label>
              <label>Assunto<select name="subject" value={draft.subject} onChange={(event) => { const subject = event.target.value; const suggestion = messageSuggestions[subject] || ""; const shouldSuggest = !draft.message || Object.values(messageSuggestions).includes(draft.message); updateDraft("subject", subject); if (shouldSuggest) updateDraft("message", suggestion); }} required><option value="" disabled>Escolha um assunto</option><option value="Consulta de nutrição">Consulta de nutrição</option><option value="Nutrição esportiva e performance">Nutrição esportiva e performance</option><option value="Reeducação alimentar">Reeducação alimentar</option><option value="Atendimento online ou presencial">Atendimento online ou presencial</option><option value="Outro assunto">Outro assunto</option></select></label>
              <label>Como posso ajudar?<textarea name="message" rows={3} placeholder="Conte brevemente o que procura." value={draft.message} onChange={(event) => updateDraft("message", event.target.value)} required /></label>
              <label className="consent-label"><input className="consent-checkbox" name="consent" type="checkbox" checked={draft.consent} onChange={(event) => updateDraft("consent", event.target.checked)} required /><span>Concordo com o tratamento dos meus dados para receber resposta sobre este contacto.</span></label>
              {redirectError && <div className="form-error" role="alert"><strong>O WhatsApp não abriu.</strong><span>{redirectError}</span></div>}
              <button className="primary-cta" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>{isSubmitting ? <><LoaderCircle className="button-spinner" size={16} /> A preparar o WhatsApp…</> : <>Continuar no WhatsApp <ArrowRight size={15} /></>}</button>
            </form>
          </>
        ) : (
          <div className="modal-success"><div className="modal-success-mark"><MessageCircle size={24} /></div><div className="eyebrow">Mensagem preparada</div><h2 className="display">A conversa continua no WhatsApp.</h2><p className="modal-intro">Se a nova janela não abriu, use o botão abaixo para retomar o contacto.</p><a className="primary-cta" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("whatsapp_click", { placement: "contact_modal" })}>Abrir WhatsApp <ArrowRight size={15} /></a></div>
        )}
      </section>
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section id="faq" className="faq" aria-labelledby="faq-title">
      <div className="container-editorial faq-grid">
        <div className="faq-heading reveal"><div className="eyebrow">Dúvidas frequentes</div><h2 id="faq-title" className="display">Clareza para dar o próximo passo.</h2><p>Se ainda ficou alguma dúvida, entre em contacto para conversar sobre o formato mais adequado para si.</p></div>
        <div className="faq-list reveal reveal-delay-1">
          {faqs.map(([question, answer], index) => <div className="faq-item" key={question}><button className="faq-question" aria-expanded={openIndex === index} onClick={() => setOpenIndex(openIndex === index ? null : index)}><span>{question}</span><ChevronDown size={18} /></button>{openIndex === index && <div className="faq-answer">{answer}</div>}</div>)}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <section id="agendamento" className="final-cta" aria-labelledby="final-cta-title">
      <div className="container-editorial final-cta-inner">
        <div className="reveal"><div className="eyebrow eyebrow-light">O seu próximo passo começa aqui</div><h2 id="final-cta-title" className="display">Comece a cuidar da sua alimentação com uma estratégia feita para você.</h2></div>
        <div className="final-cta-copy reveal reveal-delay-2"><p>Agende o seu atendimento com Nathália Fonseca e dê o primeiro passo em direção aos seus objetivos.</p><button className="primary-cta light-cta" type="button" aria-haspopup="dialog" onClick={() => { trackEvent("cta_click", { cta: "final_agendar_consulta" }); setModalOpen(true); }}>Agendar a minha consulta <ArrowRight size={15} /></button></div><ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </section>
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

  return <div className="page-shell"><Header /><main><Hero /><div className="marquee-band" aria-hidden="true"><div className="marquee-track">{["Nutrição personalizada", "Performance possível", "Vida real", "Nutrição personalizada"].map((item, index) => <span className="marquee-item" key={`${item}-${index}`}>{item}</span>)}</div></div><Identify /><Services /><About /><Process /><Evolution /><Testimonials /><InstagramSection /><FAQ /><FinalCta /></main><WhatsAppFloat /><footer className="site-footer"><div className="container-editorial footer-inner"><p>© {new Date().getFullYear()} Nathália Fonseca · Nutrição &amp; Performance</p><a className="footer-instagram" href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={15} /> @nathfonsecanutri</a></div></footer></div>;
}
