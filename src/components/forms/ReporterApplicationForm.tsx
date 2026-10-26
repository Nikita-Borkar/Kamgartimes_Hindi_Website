"use client";

import { useState } from "react";
import { Send, User, Mail, Phone, MapPin, Briefcase, Link2, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { kamgarApi } from "@/services/apiClient";

export function ReporterApplicationForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [experience, setExperience] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await kamgarApi.submitReporterApplication({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city: city.trim(),
        experience: experience.trim(),
        portfolioUrl: portfolioUrl.trim(),
        coverLetter: coverLetter.trim(),
      });

      setSuccessMessage(
        "आपला पत्रकार नियुक्ती अर्ज कामगार टाइम्स संपादकीय मंडळाकडे यशस्वीरीत्या सादर झाला आहे. लवकरच आमचे संपादक आपल्याशी संपर्क साधतील."
      );
      setFullName("");
      setEmail("");
      setPhone("");
      setCity("");
      setExperience("");
      setPortfolioUrl("");
      setCoverLetter("");
    } catch (err: any) {
      setErrorMessage(
        err?.message || "अर्ज पाठवताना समस्या आली. कृपया पुन्हा प्रयत्न करा."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        background: "var(--surface, #ffffff)",
        padding: "24px",
        borderRadius: "16px",
        border: "1px solid var(--border, #e2e8f0)",
      }}
    >
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
          }}
        >
          <CheckCircle2 size={20} color="#166534" style={{ flexShrink: 0, marginTop: "2px" }} />
          <div>
            <strong>धन्यवाद!</strong>
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
          }}
        >
          <AlertCircle size={20} color="#991b1b" style={{ flexShrink: 0, marginTop: "2px" }} />
          <div>
            <strong>त्रुटि:</strong>
            <p style={{ margin: "4px 0 0" }}>{errorMessage}</p>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
            <User size={15} />
            <span>संपूर्ण नाव (Full Name) *</span>
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="उदा. अमोल सुरेश देशमुख"
            style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
          />
        </div>

        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
            <Mail size={15} />
            <span>ई-मेल (Email Address) *</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="amol@example.com"
            style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
            <Phone size={15} />
            <span>मोबाईल / व्हॉट्सअ‍ॅप नंबर *</span>
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="१० अंकी मोबाईल नंबर"
            style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
          />
        </div>

        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
            <MapPin size={15} />
            <span>जिल्हा / तालुका / शहर *</span>
          </label>
          <input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="उदा. नागपूर, सावनेर"
            style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
            <Briefcase size={15} />
            <span>पत्रकारिता अनुभव (Experience)</span>
          </label>
          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="उदा. २ वर्षे स्थानिक वृत्तपत्र / फ्रेशर"
            style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
          />
        </div>

        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
            <Link2 size={15} />
            <span>सोशल मीडिया / पोर्टफोलिओ लिंक (ऐच्छिक)</span>
          </label>
          <input
            type="url"
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            placeholder="https://facebook.com/yourprofile"
            style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
          />
        </div>
      </div>

      <div>
        <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
          <FileText size={15} />
          <span>आपल्याविषयी थोडक्यात / कव्हर लेटर (Cover Letter)</span>
        </label>
        <textarea
          rows={4}
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder="आपण कामगार टाइम्समध्ये वार्ताहर म्हणून का काम करू इच्छिता? आपल्या परिसरातील महत्त्वाच्या प्रश्नांची माहिती लिहा..."
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
          padding: "14px 28px",
          borderRadius: "8px",
          fontWeight: "700",
          fontSize: "15px",
          border: "none",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          opacity: isSubmitting ? 0.7 : 1,
          marginTop: "8px",
          transition: "background 0.2s ease",
        }}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>अर्ज पाठवत आहे...</span>
          </>
        ) : (
          <>
            <Send size={18} />
            <span>अर्ज सादर करा (Submit Application)</span>
          </>
        )}
      </button>
    </form>
  );
}
