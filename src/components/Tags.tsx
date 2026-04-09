export default function Tags({tags}: TagsProps) {
 return (
    <div className={"tag-wrapper"}>
        {tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
    </div>
    )
}

type TagsProps = {tags: string[]}