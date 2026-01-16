import { useMemo, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/Contact.css";

// --- ENV (Vite) ---
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function assertEnv(name, value) {
  if (!value) console.warn(`[ENV] Falta configurar ${name} en tu .env`);
}
assertEnv("VITE_EMAILJS_SERVICE_ID", EMAILJS_SERVICE_ID);
assertEnv("VITE_EMAILJS_TEMPLATE_ID", EMAILJS_TEMPLATE_ID);
assertEnv("VITE_EMAILJS_PUBLIC_KEY", EMAILJS_PUBLIC_KEY);

const INITIAL_FORM = {
  name: "",
  email: "",
  reason: "", // lo seteamos según idioma
  message: "",
  website: "", // honeypot anti-spam
};

export default function Contact() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // reasons como lista traducida (labels cambian con el idioma)
  const reasons = useMemo(
    () => [
      { key: "webProject", label: t("contact.reasons.webProject") },
      { key: "budget", label: t("contact.reasons.budget") },
      { key: "collaboration", label: t("contact.reasons.collaboration") },
      { key: "other", label: t("contact.reasons.other") },
    ],
    [t]
  );

  // Estado del form
  const [form, setForm] = useState(() => ({
    ...INITIAL_FORM,
    reason: t("contact.reasons.webProject"),
  }));

  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const canSend = useMemo(
    () => Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY),
    []
  );

  // ✅ Si cambia el idioma, actualizamos el reason al equivalente traducido
  useEffect(() => {
    const currentKey =
      reasons.find((r) => r.label === form.reason)?.key || "webProject";

    const newLabel = t(`contact.reasons.${currentKey}`);

    setForm((p) => ({ ...p, reason: newLabel }));
    // limpiamos error de reason si existía, porque cambió el label
    setErrors((p) => ({ ...p, reason: "" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "", general: "" }));
  };

  const setReason = (val) => {
    setForm((p) => ({ ...p, reason: val }));
    setErrors((p) => ({ ...p, reason: "", general: "" }));
  };

  const validate = () => {
    const next = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      next.name = t("contact.errors.name");
    }

    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = t("contact.errors.email");
    }

    if (!form.reason?.trim()) {
      next.reason = t("contact.errors.reason");
    }

    if (!form.message.trim() || form.message.trim().length < 10) {
      next.message = t("contact.errors.message");
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Honeypot: si se llena, probablemente es bot.
    if (form.website) return;

    if (!validate()) return;

    if (!canSend) {
      setErrors((p) => ({
        ...p,
        general: t("contact.errors.missingEmailjs"),
      }));
      return;
    }

    try {
      setIsSending(true);
      setErrors((p) => ({ ...p, general: "" }));

      const templateParams = {
        user_name: form.name,
        user_email: form.email,
        reason: form.reason,
        message: form.message,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setSent(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setErrors((p) => ({
        ...p,
        general: t("contact.errors.sendFailed"),
      }));
    } finally {
      setIsSending(false);
    }
  };

  const sendAnother = () => {
    setForm({
      ...INITIAL_FORM,
      reason: t("contact.reasons.webProject"),
    });
    setErrors({});
    setSent(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="contact-page">
      <header className="contact-hero">
        <h1 className="contact-title">{t("contact.title")}</h1>
        <p className="contact-subtitle">{t("contact.subtitle")}</p>
      </header>

      <div className="contact-grid">
        {/* Columna info */}
        <div className="contact-card info-card">
          <h3 className="contact-h3">{t("contact.infoTitle")}</h3>

          <div className="contact-info">
            <div className="info-row">
              <span className="info-label">{t("contact.responseTimeLabel")}</span>
              <span className="info-text">{t("contact.responseTimeText")}</span>
            </div>

            <div className="info-row">
              <span className="info-label">{t("contact.speedUpLabel")}</span>
              <span className="info-text">{t("contact.speedUpText")}</span>
            </div>

            <div className="info-row">
              <span className="info-label">{t("contact.socialLabel")}</span>
              <div className="info-social">
                <a
                  className="chip"
                  href="https://www.instagram.com/dianasauval"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
                <a
                  className="chip"
                  href="https://www.linkedin.com/in/diana-sauval/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="chip"
                  href="https://github.com/dianaSauval"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="contact-note">
            <p>{t("contact.note")}</p>
          </div>
        </div>

        {/* Columna formulario / gracias */}
        <div className="contact-card form-card">
          {!sent ? (
            <>
              <h3 className="contact-h3">{t("contact.formTitle")}</h3>

              <form className="contact-form" onSubmit={onSubmit} noValidate>
                {/* Honeypot oculto */}
                <input
                  className="honey"
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={onChange}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="field">
                  <label htmlFor="name">{t("contact.nameLabel")}</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t("contact.namePlaceholder")}
                    value={form.name}
                    onChange={onChange}
                  />
                  {errors.name && <p className="field-error">{errors.name}</p>}
                </div>

                <div className="field">
                  <label htmlFor="email">{t("contact.emailLabel")}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("contact.emailPlaceholder")}
                    value={form.email}
                    onChange={onChange}
                  />
                  {errors.email && <p className="field-error">{errors.email}</p>}
                </div>

                {/* ✅ Custom Select */}
                <div className="field">
                  <label htmlFor="reason">{t("contact.reasonLabel")}</label>

                  <CustomSelect
                    id="reason"
                    value={form.reason}
                    options={reasons.map((r) => r.label)}
                    onChange={setReason}
                  />

                  {errors.reason && <p className="field-error">{errors.reason}</p>}
                </div>

                <div className="field">
                  <label htmlFor="message">{t("contact.messageLabel")}</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder={t("contact.messagePlaceholder")}
                    value={form.message}
                    onChange={onChange}
                  />
                  {errors.message && <p className="field-error">{errors.message}</p>}
                </div>

                {errors.general && (
                  <div className="form-status error">{errors.general}</div>
                )}

                <button className="btn-send" type="submit" disabled={isSending}>
                  {isSending ? t("contact.sending") : t("contact.send")}
                </button>

                <p className="privacy-hint">{t("contact.privacyHint")}</p>
              </form>
            </>
          ) : (
            <div className="thanks">
              <h3 className="contact-h3">{t("contact.successTitle")}</h3>
              <p className="thanks-text">{t("contact.successText")}</p>

              <div className="thanks-actions">
                <button
                  className="btn-secondary"
                  type="button"
                  onClick={() => navigate("/")}
                >
                  {t("contact.backHome")}
                </button>

                <button className="btn-send" type="button" onClick={sendAnother}>
                  {t("contact.sendAnother")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Custom Select para evitar el dropdown nativo del navegador (y sus colores).
 * Mantiene accesibilidad básica (aria) y se integra con la estética del sitio.
 */
function CustomSelect({ id, value, options, onChange }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (opt) => {
    onChange(opt);
    setOpen(false);
  };

  return (
    <div className={`cselect ${open ? "open" : ""}`}>
      <button
        id={id}
        type="button"
        className="cselect-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        onBlur={(e) => {
          if (!e.currentTarget.parentElement.contains(e.relatedTarget)) setOpen(false);
        }}
      >
        <span className="cselect-value">{value}</span>
        <span className="cselect-arrow" aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <ul className="cselect-menu" role="listbox" aria-labelledby={id}>
          {options.map((opt) => {
            const selected = opt === value;
            return (
              <li key={opt} role="option" aria-selected={selected}>
                <button
                  type="button"
                  className={`cselect-item ${selected ? "selected" : ""}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(opt)}
                >
                  {opt}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
