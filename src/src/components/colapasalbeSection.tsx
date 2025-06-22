import { FunctionalComponent, h } from "preact"
import { useState } from "preact/hooks"

interface CollapsibleSectionProps {
  headerText: string
  iconOpen: string
  iconClose: string
  children?: preact.ComponentChildren
}

const CollapsibleSection: FunctionalComponent<CollapsibleSectionProps> = ({
  headerText,
  iconOpen,
  iconClose,
  children,
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div class="collapsible">
      <h5>
        {headerText}
        <button
          class="btn btn-link text-dark"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          type="button"
        >
          <i class={`bi ${expanded ? iconOpen : iconClose}`}></i>
        </button>
      </h5>
      <div class="contents" hidden={!expanded}>
        {children}
      </div>
    </div>
  )
}

export default CollapsibleSection
