import { h, Component } from "preact";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export class Modal extends Component<ModalProps> {
  alertTimeout?: number;

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
        this.props.onClose();
        const alertDiv = document.createElement("div");

        alertDiv.innerHTML = [
          `<div class="alert alert-danger" role="alert">`,
          `   <div>There was an error submitting the form. You can also contact me directly via email: <a href='mailto:luke@liukonen.dev'>luke@liukonen.dev</a> and I'll get back to you as soon as I can</div>`,
          "</div>"
        ].join("");
        alertDiv.className = "alert alert-warninng";
        alertDiv.style.position = "fixed";
        alertDiv.style.top = "20px";
        alertDiv.style.right = "20px";
        alertDiv.style.padding = "10px 20px";
        alertDiv.style.zIndex = "1100";
        document.body.appendChild(alertDiv);

        // Remove after 9 seconds
        this.alertTimeout = window.setTimeout(() => {
          document.body.removeChild(alertDiv);
        }, 9000);
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
            <div class="modal-content bg-dark text-light border-0 shadow-lg">
              <div class="modal-header border-secondary">
                <h1 class="modal-title fs-5">Contact me directly</h1>
                <button
                  type="button"
                  class="btn-close btn-close-white"
                  onClick={onClose}
                />
              </div>

              <div class="modal-body">
                <p class="text-warning mb-4">
                  Hi there! I’d love to hear from you. Fill out the form below
                  and I’ll get back to you as soon as possible.
                </p>
                <form
                  action="https://formspree.io/f/xnnewjvy"
                  method="POST"
                  onSubmit={this.handleSubmit}
                >
                  <div class="input-group mb-3">
                    <div class="input-group-text w-25">
                      <i class="bi bi-envelope-at" /> Your email
                    </div>
                    <input
                      type="email"
                      class="form-control bg-white text-dark"
                      required
                      name="email"
                    />
                  </div>

                  <div class="input-group mb-3">
                    <div class="input-group-text w-25">
                      <i class="bi bi-card-text"></i> message
                    </div>
                    <textarea
                      name="message"
                      class="form-control bg-white text-dark"
                      rows={4}
                      required
                    />
                  </div>
                  <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-primary">
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
