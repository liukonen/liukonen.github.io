import ArrowRightCircle from '~icons/bi/arrow-right-circle'

export default function MoreFooter({path}: Readonly<{path: string}>) {
    return  (
        <div className={"top-buffer-10"}>
          <a href={path} className="section-label interactive-link">
            <span>View More <ArrowRightCircle /></span>

          </a>
        </div>
    )
}