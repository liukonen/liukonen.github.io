import { useEffect, useRef, useState } from "preact/hooks"

const emailAddress = "luke@liukonen.dev"
const formEndpoint = "https://formspree.io/f/xnnewjvy"

type Status = "idle" | "submitting" | "success" | "error"

export default function ContactSection({ contactHash }: Readonly<{ contactHash?: string }>) {
  const section = useRef<HTMLElement>(null)
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [copyFeedback, setCopyFeedback] = useState("")

  useEffect(() => {
    if (!contactHash) return

    section.current?.focus({ preventScroll: true })
    section.current?.scrollIntoView({ block: "start", behavior: "instant" })
  }, [contactHash])

  const submit = async (event: SubmitEvent) => {
    event.preventDefault()
    if (status === "submitting") return

    const form = event.currentTarget as HTMLFormElement
    const data = new FormData(form)
    const trimmedMessage = message.trim()

    if (!trimmedMessage) {
      const field = form.elements.namedItem("message") as HTMLTextAreaElement
      field.setCustomValidity("Enter a message before sending.")
      field.reportValidity()
      return
    }

    data.set("message", trimmedMessage)
    setStatus("submitting")
    setCopyFeedback("")

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" }
      })

      if (!response.ok) throw new Error("Contact form submission failed")

      setEmail("")
      setMessage("")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopyFeedback(`${label} copied.`)
    } catch {
      setCopyFeedback(`Couldn’t copy automatically. You can select and copy the ${label.toLowerCase()} manually.`)
    }
  }

  const draftUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(`Website message from ${email}`)}&body=${encodeURIComponent(message)}`

  return (
    <section ref={section} id="contact" className="l-showcase-grid c-contact" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="c-contact-panel">
        <div className="c-contact-header">
          <div>
            <h2 id="contact-title" className="home-section-title">Get in touch</h2>
            <p>I’m open to networking, collaboration, and general inquiries.</p>
          </div>
          <a className="c-contact-email-button" href={`mailto:${emailAddress}`} onClick={() => void copy(emailAddress, "Email address")}>
            {emailAddress}
          </a>
        </div>

      <form action={formEndpoint} method="POST" className="c-contact-form" onSubmit={submit} aria-label="Send Luke a message" aria-busy={status === "submitting"}>
        <label htmlFor="contact-email">Email address</label>
        <input
          id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com"
          value={email} required disabled={status === "submitting"}
          onInput={event => setEmail(event.currentTarget.value)}
        />

        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message" name="message" rows={5} value={message} required disabled={status === "submitting"}
          onInput={event => {
            event.currentTarget.setCustomValidity("")
            setMessage(event.currentTarget.value)
          }}
        />

        <div className="c-contact-actions">
          <button type="submit" className="c-btn" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Execute Send"}
          </button>
          <div className="c-contact-socials" aria-label="Social profiles">
            <a href="https://www.linkedin.com/in/lukeliukonen" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <span aria-hidden="true">·</span>
            <a href="https://github.com/liukonen" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        {status === "success" && <p className="c-contact-success" role="status">Message sent. Thanks for reaching out.</p>}
        {status === "error" && (
        <div className="c-contact-fallback">
            <p className="c-contact-error" role="alert">Your message couldn’t be sent. Try again or use your email app.</p>
            <a href={draftUrl}>Open draft in email app</a>
            <button type="button" className="c-contact-copy" onClick={() => copy(message, "Message")}>Copy message</button>
          </div>
        )}
      </form>
      <p className="c-contact-copy-feedback" role="status">{copyFeedback}</p>
      </div>
    </section>
  )
}
