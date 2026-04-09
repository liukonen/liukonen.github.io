export default function Tags({tags}: TagsProps) {
 return (
    <>
        {tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
    </>
    )
}

type TagsProps = {tags: string[]}