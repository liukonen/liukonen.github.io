type BreadcrumbProps = {
  path: string;
};

export default function Breadcrumb({ path }: BreadcrumbProps) {
  // Remove leading "#/" and split
  const parts = path.replace(/^#\//, "").split("/").filter(Boolean);

  // Build cumulative paths
  const buildPath = (index: number) => {
    return "#/" + parts.slice(0, index + 1).join("/");
  };

  return (
    <div className="breadcrumb">
      {/* Root */}
      <a href="#/">~/root</a>

      {parts.map((part, i) => {
        const isLast = i === parts.length - 1;

        return (
          <span key={i}>
            <span className="sep"> / </span>

            {isLast ? (
              // Last item → NOT a link
              <span style={{ color: 'var(--gold-accent)' }}>{part}</span>
            ) : (
              <a href={buildPath(i)}>{part}</a>
            )}
          </span>
        );
      })}
    </div>
  );
}