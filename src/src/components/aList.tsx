import { FunctionalComponent } from 'preact'

interface aListProps {
  listItems: { a: string }[]
  listStyle: string
}

const AList: FunctionalComponent<aListProps> = ({ listItems, listStyle }) => {
  const getStyle =
    listStyle === "1"
      ? 'list-group text-dark shadow whiteGlass'
      : 'list-group whiteGlass';

  return (
    <ul class={getStyle}>
      {listItems.map(({ a }) => (
        <li class="list-group-item pane">{a}</li>
      ))}
    </ul>
  )
}

export default AList