import { FunctionalComponent } from 'preact'

interface aListProps {
  listItems: { a: string }[]
  listStyle: string
}

const AList: FunctionalComponent<aListProps> = ({ listItems, listStyle }) => {
  const getStyle =
    listStyle === "1"
      ? 'list-group text-dark shadow whiteGlassList'
      : 'list-group whiteGlassList';

  return (
    <div class="container whiteGlassCardElement">
     <ul class="paneList">
       {listItems.map(({ a }) => (
         <li class="pane">{a}</li>
       ))}
     </ul>
     </div>
  )
}

export default AList