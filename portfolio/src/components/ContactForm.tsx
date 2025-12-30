import React, { useState } from "react";
import axios from "axios";
import { useLanguage } from "../context/LanguageContext";

type ContactState = { name: string; email: string; message: string };

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const ContactForm: React.FC<{
  sendTo?: string;
}> = () => {
  const { t } = useLanguage();
  const [state, setState] = useState<ContactState>({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function update(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setErrorMsg(null);

    try {
      await axios.post(`${API_URL}/messages`, {
        name: state.name,
        email: state.email,
        content: state.message,
        subject: `Message de ${state.name}`,
      });

      setSuccess(true);
      setState({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Erreur envoi message:", error);
      setSuccess(false);
      setErrorMsg("Échec de l'envoi. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3" aria-live="polite">
      <label htmlFor="name" className="text-sm text-[var(--text)]">{t('contact.name')}</label>
      <input
        id="name"
        name="name"
        title={t('contact.name')}
        placeholder={t('contact.placeholder.name')}
        value={state.name}
        onChange={update}
        className="w-full px-3 py-2 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]" />
      <label htmlFor="email" className="text-sm text-[var(--text)]">{t('contact.email')}</label>
      <input
        id="email"
        name="email"
        type="email"
        title={t('contact.email')}
        placeholder={t('contact.placeholder.email')}
        value={state.email}
        onChange={update}
        className="w-full px-3 py-2 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]" />
      <label htmlFor="message" className="text-sm text-[var(--text)]">{t('contact.message')}</label>
      <textarea
        id="message"
        name="message"
        title={t('contact.message')}
        placeholder={t('contact.placeholder.message')}
        value={state.message}
        onChange={update}
        rows={6}
        className="w-full px-3 py-2 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
        required
      />

      <div className="pt-2 flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg text-white bg-[var(--brand)] disabled:opacity-60"
        >
          {loading ? t('contact.sending') : t('contact.send')}
        </button>

        {success === true && (
          <div className="text-sm text-green-600">
            {t('contact.success')}
          </div>
        )}
        {success === false && (
          <div className="text-sm text-red-600">
            {t('contact.error')}
            {errorMsg && (
              <>
                {" "}
                <span className="block text-xs text-red-400">{errorMsg}</span>
              </>
            )}
          </div>
        )}
      </div>
    </form>
  );
};
