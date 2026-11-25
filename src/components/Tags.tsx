type TagsProps = Readonly<{ tags: readonly string[]; concepts?: readonly string[] }>

export default function Tags({ tags, concepts = [] }: TagsProps) {
  return (
    <div className="tag-wrapper">
      {tags.map(tag => <span className="tag c-topic-tag" key={tag}>{tag}</span>)}
      {concepts.map(tag => <span className="tag c-topic-tag c-topic-tag--concept" key={tag}>{tag}</span>)}
    </div>
  )
}
