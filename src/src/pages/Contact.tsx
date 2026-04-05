import { useState } from "preact/hooks"

export default function Contact() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle")
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setStatus("submitting")

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" }
      })

      if (!res.ok) throw new Error("Form submission failed")

      // Success State
      setStatus("success")
      setEmail("")
      setMessage("")

      // Auto-clear success message after 3 seconds
      setTimeout(() => setStatus("idle"), 3000)
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  const handleCopy = () => {
    navigator.clipboard
      .writeText(message)
      .then(() => {
        console.log("[System] Payload successfully written to clipboard.")
        // Trigger your "Copied!" UI state here
      })
      .catch(err => {
        console.error("[System] Clipboard access denied.", err)
      })
  }

  const resetForm = () => {
    setStatus("idle")
  }

  // Generate the mailto link dynamically based on the current state
  const mailtoUrl = `mailto:luke@liukonen.dev?subject=${encodeURIComponent(
    `Website message from ${email}`
  )}&body=${encodeURIComponent(message)}`

  return (
    <div className="page-layer contact-view">
      <div className="breadcrumb">
        <a href="#/">~/root</a> <span className="sep">/</span> contact
      </div>

      <header className="era-header">
        <div className="header-text">
          <h1 className="gold-text">Contact Me</h1>
          <p className="sub-header">System ready for incoming transmissions.</p>
          <p className="sub-header">
            While I am not currently looking for new work, I am open to
            networking, collaboration, and general inquiries.
          </p>
        </div>
      </header>

      <section className="contact-content">
        {/* SUCCESS TOAST */}
        {status === "success" &&
          <div className="alert alert-success">
            <span className="alert-icon">✓</span> Message transmitted
            successfully. I'll get back to you soon.
          </div>}

        {/* ERROR / FALLBACK TOAST */}
        {status === "error" &&
          <div className="alert alert-danger fallback-alert">
            <div className="alert-body">
              <span className="alert-icon">⚠</span>
              <div>
                <strong>API Transmission Failed.</strong>
                <br />
                You can bypass the form and contact me directly via your email
                client.
              </div>
            </div>
            <div className="alert-actions">
              <a href={mailtoUrl} className="btn btn-primary">
                Send via Email App
              </a>
              <button onClick={handleCopy} className="btn btn-secondary">
                {copied ? "Copied!" : "Copy Message"}
              </button>
              <button onClick={resetForm} className="btn btn-text">
                Dismiss
              </button>
            </div>
          </div>}

        {/* CONTACT FORM */}
        <div className="form-container">
          <form
            action="https://formspree.io/f/xnnewjvy"
            method="POST"
            onSubmit={handleSubmit}
            className={`contact-form ${status === "error"
              ? "form-disabled"
              : ""}`}
          >
            <div className="form-group">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@domain.com"
                value={email}
                onInput={e => setEmail((e.target as HTMLInputElement).value)}
                required
                disabled={status === "submitting"}
              />
            </div>

            <div className="form-group">
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Enter your message here..."
                value={message}
                onInput={e =>
                  setMessage((e.target as HTMLTextAreaElement).value)}
                required
                disabled={status === "submitting"}
              />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-submit"
                disabled={status === "submitting" || status === "error"}
              >
                {status === "submitting" ? "TRANSMITTING..." : "EXECUTE SEND"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
