import ArrowRightCircle from '~icons/bi/arrow-right-circle'

export default function MoreFooter({path}: Readonly<{path: string}>) {
    return  (
        <div className={"mt-1"}>
          <a href={path} className="f-label-mono f-clr-accent lnk">
            <span>View More <ArrowRightCircle /></span>

          </a>
        </div>
    )
}