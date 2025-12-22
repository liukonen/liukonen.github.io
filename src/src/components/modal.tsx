import { h, Component } from "preact";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export class Modal extends Component<ModalProps, { fromEmail: string }> {
  state = { fromEmail: '' };
  alertTimeout?: number;

  handleEmailInput = (e: Event) => {
    this.setState({ fromEmail: (e.target as HTMLInputElement).value });
  }; 

  componentDidUpdate(prevProps: ModalProps) {
    if (prevProps.open !== this.props.open) {
      if (this.props.open) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    }
  }

  componentWillUnmount() {
    document.body.classList.remove("modal-open");
    if (this.alertTimeout) clearTimeout(this.alertTimeout);
  }

  handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { Accept: "application/json" }
    })
      .then(res => {
        if (!res.ok) throw new Error("Form submission failed");
        // Close modal
        this.props.onClose();

        // Show alert
        const alertDiv = document.createElement("div");
        alertDiv.innerHTML = [
          `<div class="alert alert-success alert-dismissible" role="alert">`,
          `   <div>Message sent! I'll get back to you soon.</div>`,
          "</div>"
        ].join("");
        alertDiv.style.position = "fixed";
        alertDiv.style.top = "20px";
        alertDiv.style.right = "20px";
        alertDiv.style.padding = "10px 20px";
        alertDiv.style.borderRadius = "5px";
        alertDiv.style.zIndex = "1100";
        document.body.appendChild(alertDiv);

        // Remove after 3 seconds
        this.alertTimeout = window.setTimeout(() => {
          document.body.removeChild(alertDiv);
        }, 3000);

        form.reset();
      })
      .catch(() => {
        // Close modal and show a persistent alert with options
        this.props.onClose();

        const message = (formData.get("message") || "").toString();
        const from = (formData.get("email") || "").toString();
        const id = `alert-${Date.now()}`;
        const mailto = `mailto:luke@liukonen.dev?subject=${encodeURIComponent(
          `Website message from ${from}`
        )}&body=${encodeURIComponent(message)}`;

        const alertDiv = document.createElement("div");
        alertDiv.innerHTML = [
          `<div class="alert alert-danger" role="alert">`,
          `  <div>There was an error submitting the form. You can also contact me directly via email: <a href="${mailto}">Send via email</a></div>`,
          `  <div class="mt-2">`,
          `    <button class="btn btn-sm btn-outline-secondary" id="${id}-copy">Copy message</button>`,
          `    <button class="btn btn-sm btn-outline-primary ms-2" id="${id}-close">Close</button>`,
          `  </div>`,
          `</div>`
        ].join("");

        alertDiv.style.position = "fixed";
        alertDiv.style.top = "20px";
        alertDiv.style.right = "20px";
        alertDiv.style.padding = "10px 20px";
        alertDiv.style.borderRadius = "5px";
        alertDiv.style.zIndex = "1100";
        document.body.appendChild(alertDiv);

        // Attach copy handler
        const copyBtn = alertDiv.querySelector(`#${id}-copy`);
        if (copyBtn) {
          copyBtn.addEventListener("click", () => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard
                .writeText(message)
                .then(() => {
                  (copyBtn as HTMLButtonElement).textContent = "Copied!";
                })
                .catch(() => {
                  // fallback
                  const ta = document.createElement("textarea");
                  ta.value = message;
                  document.body.appendChild(ta);
                  ta.select();
                  document.execCommand("copy");
                  document.body.removeChild(ta);
                  (copyBtn as HTMLButtonElement).textContent = "Copied!";
                });
            } else {
              const ta = document.createElement("textarea");
              ta.value = message;
              document.body.appendChild(ta);
              ta.select();
              document.execCommand("copy");
              document.body.removeChild(ta);
              (copyBtn as HTMLButtonElement).textContent = "Copied!";
            }
          });
        }

        // Attach close handler
        const closeBtn = alertDiv.querySelector(`#${id}-close`);
        if (closeBtn) {
          closeBtn.addEventListener("click", () => {
            if (alertDiv.parentNode) alertDiv.parentNode.removeChild(alertDiv);
          });
        }

        form.reset();
      });
  };

  render() {
    const { open, onClose } = this.props;

    if (!open) return null;

    return (
      <div>
        {/* Backdrop */}
        <div class="modal-backdrop fade show" onClick={onClose} />

        {/* Modal */}
        <div class="modal fade show" role="dialog" aria-modal="true">
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content border-0 shadow-email email-modal">
              <form
                action="https://formspree.io/f/xnnewjvy"
                method="POST"
                onSubmit={this.handleSubmit}
              >
                <div class="modal-header email-modal-header">
                  <div class="d-flex align-items-center">
                    <i class="bi bi-envelope-fill me-2 email-icon" />
                    <div>
                      <h2 class="modal-title fs-6 mb-0">New message</h2>
                      <div class="d-flex gap-3 align-items-center">
                        <div class="text-muted small d-flex align-items-center">From:
                          <input
                            name="email"
                            type="email"
                            class="email-input ms-2"
                            placeholder="you@example.com"
                            value={this.state.fromEmail}
                            onInput={this.handleEmailInput}
                            required
                          />
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn-close"
                    onClick={onClose}
                  />
                </div>

                <div class="modal-body">
                  <div class="mb-3">
                    <textarea
                      name="message"
                      class="form-control"
                      rows={6}
                      required
                      placeholder={"Hi Luke — I'm reaching out because..."}
                    />
                  </div>

                  <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-send">
                      <i class="bi bi-send-fill"></i> Send
                    </button>
                  </div>
                </div>
              </form>
            </div> 
          </div>
        </div>
      </div>
    );
  }
}
