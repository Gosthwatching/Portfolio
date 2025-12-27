import React, { useState } from "react";
import axios from "axios";

type ContactState = { name: string; email: string; message: string };

const API_URL = "http://localhost:4000/api";

export const ContactForm: React.FC<{
  sendTo?: string;
}> = () => {
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
        subject: `Contact from ${state.name}`,
      });

      setSuccess(true);
      setState({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setSuccess(false);
      setErrorMsg("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3" aria-live="polite">
      <label htmlFor="name" className="text-sm text-[var(--text)]">Name</label>
      <input
        id="name"
        name="name"
        title="Name"
        placeholder="Your name"
        value={state.name}
        onChange={update}
        className="w-full px-3 py-2 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]" />
      <label htmlFor="email" className="text-sm text-[var(--text)]">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        title="Email"
        placeholder="Your email"
        value={state.email}
        onChange={update}
        className="w-full px-3 py-2 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]" />
      <label htmlFor="message" className="text-sm text-[var(--text)]">Message</label>
      <textarea
        id="message"
        name="message"
        title="Message"
        placeholder="Your message"
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
          {loading ? "Sending..." : "Send message"}
        </button>

        {success === true && (
          <div className="text-sm text-green-600">
            Message sent — thank you!
          </div>
        )}
        {success === false && (
          <div className="text-sm text-red-600">
            Failed to send.
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
