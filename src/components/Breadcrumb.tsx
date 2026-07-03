type BreadcrumbProps = {
  path: string
}

export default function Breadcrumb({ path }: Readonly<BreadcrumbProps>) {
  // Remove leading "#/" and split
  const parts = path.replace(/^#\//, "").split("/").filter(Boolean)

  // Build cumulative paths
  const buildPath = (index: number) => {
    return "#/" + parts.slice(0, index + 1).join("/")
  }

  return (
    <div className="c-breadcrumb">
      {/* Root */}
      <a href="#/">~/root</a>

      {parts.map((part, i) => {
        const isLast = i === parts.length - 1

        return (
          <span key={i}>
            <span className="sep"> / </span>

            {isLast ? (
              // Last item → NOT a link
              <span className={"f-breadcrumb-active"}>{part}</span>
            ) : (
              <a href={buildPath(i)}>{part}</a>
            )}
          </span>
        )
      })}
    </div>
  )
}