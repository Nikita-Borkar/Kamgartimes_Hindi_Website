"use client";

import { useState } from "react";
import { Send, User, Mail, Phone, MessageSquare, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { kamgarApi } from "@/services/apiClient";

export function ContactMessageForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await kamgarApi.submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: subject.trim() || undefined,
        message: message.trim(),
      });

      setSuccessMessage(
        "आपका संदेश कामगार टाइम्स डेस्क को सफलतापूर्वक भेज दिया गया है। हम शीघ्र ही आपसे संपर्क करेंगे।"
      );
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setErrorMessage(
        err?.message || "संदेश भेजने में समस्या आई। कृपया सीधे फोन या ईमेल द्वारा संपर्क करें।"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        background: "var(--surface, #ffffff)",
        padding: "28px",
        borderRadius: "16px",
        border: "1px solid var(--border, #e2e8f0)",
        marginTop: "32px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "700",
            color: "var(--foreground, #0f172a)",
            margin: "0 0 6px",
          }}
        >
          सीधे संदेश भेजें (Send us a Message)
        </h3>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--muted, #64748b)" }}>
          संपादकीय, सुझाव, तकनीकी सहायता या सामान्य पूछताछ के लिए नीचे दिया गया फॉर्म भरें:
        </p>
      </div>

      {successMessage && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            padding: "14px 16px",
            borderRadius: "8px",
            background: "rgba(34, 197, 94, 0.12)",
            border: "1px solid #22c55e",
            color: "#166534",
            fontSize: "0.95rem",
            marginBottom: "16px",
          }}
        >
          <CheckCircle2 size={20} color="#166534" style={{ flexShrink: 0, marginTop: "2px" }} />
          <div>
            <strong>सफलता!</strong>
            <p style={{ margin: "4px 0 0" }}>{successMessage}</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            padding: "14px 16px",
            borderRadius: "8px",
            background: "rgba(239, 68, 68, 0.12)",
            border: "1px solid #ef4444",
            color: "#991b1b",
            fontSize: "0.95rem",
            marginBottom: "16px",
          }}
        >
          <AlertCircle size={20} color="#991b1b" style={{ flexShrink: 0, marginTop: "2px" }} />
          <div>
            <strong>त्रुटि:</strong>
            <p style={{ margin: "4px 0 0" }}>{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
          <div>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
              <User size={15} />
              <span>आपका नाम (Your Name) *</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="उदा. राहुल शर्मा"
              style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
            />
          </div>

          <div>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
              <Mail size={15} />
              <span>ई-मेल (Email) *</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rahul@example.com"
              style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
          <div>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
              <Phone size={15} />
              <span>फ़ोन / मोबाइल नंबर</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10 अंकों का मोबाइल नंबर"
              style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
            />
          </div>

          <div>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
              <MessageSquare size={15} />
              <span>विषय (Subject)</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="जैसे: समाचार संशोधन, विज्ञापन या सुझाव"
              style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
            <MessageSquare size={15} />
            <span>संदेश (Your Message) *</span>
          </label>
          <textarea
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="अपना संदेश यहाँ विस्तार से लिखें..."
            style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", resize: "vertical" }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            background: "#d32f2f",
            color: "#ffffff",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "700",
            fontSize: "15px",
            border: "none",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            opacity: isSubmitting ? 0.7 : 1,
            alignSelf: "flex-start",
            transition: "background 0.2s ease",
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>भेजा जा रहा है...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>संदेश भेजें (Send Message)</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
