import ArrowRightCircle from '~icons/bi/arrow-right-circle'

export default function MoreFooter({ path, label }: Readonly<{ path: string; label: string }>) {
  return (
    <a href={path} className="c-more-link">
      {label} <ArrowRightCircle aria-hidden="true" />
    </a>
  )
}
