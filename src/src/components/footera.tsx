import { FunctionalComponent } from 'preact'

const FooterA: FunctionalComponent = () => {
  return (
    <div className="container glass center">
      <a
        target="_blank"
        className="btn btn-secondary"
        href="https://github.com/liukonen"
        role="button"
        rel="noreferrer"
        aria-label="Github"
        data-toggle="tooltip"
        data-placement="top"
        title="GitHub"
      >
        <i className="bi bi-github"></i> GitHub
      </a>

      <a
        target="_blank"
        className="btn btn-primary bg-lnkdin"
        href="https://www.linkedin.com/in/lukeliukonen/"
        role="button"
        rel="noreferrer"
        aria-label="LinkedIn"
        data-toggle="tooltip"
        data-placement="top"
        title="LinkedIn"
      >
        <i className="bi bi-linkedin"></i> LinkedIn
      </a>

      <a
        className="btn btn-danger"
        href="mailto:liukonen@gmail.com?subject=GitHub_Home_Page"
        role="button"
        rel="noreferrer"
        aria-label="email"
        data-toggle="tooltip"
        data-placement="top"
        title="email"
      >
        <i className="bi bi-envelope-fill"></i> Email
      </a>

      <a
        target="_blank"
        className="btn btn-light"
        href="https://dev.to/liukonen"
        role="button"
        rel="noreferrer"
        aria-label="dev To"
        data-toggle="tooltip"
        data-placement="top"
        title="DEV Community"
      >
        <i className="bi bi-file-code-fill"></i> DEV Community
      </a>
    </div>
  )
}

export default FooterA
