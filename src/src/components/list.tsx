import { FunctionalComponent } from 'preact'


interface ListProps {
  listItems: string[]
  listStyle: string
}

const List: FunctionalComponent<ListProps> = ({ listItems, listStyle }) => {
  const getStyle =
    listStyle === "1"
      ? 'list-group text-dark shadow whiteGlass'
      : 'list-group whiteGlass'

  return (
    <ul className={getStyle}>
      {listItems.map((item, index) => (
        <li className="list-group-item pane" key={index}>
          {item}
        </li>
      ))}
    </ul>
  )
}

export default List
