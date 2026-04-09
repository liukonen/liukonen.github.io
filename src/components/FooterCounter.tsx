

export default function FooterCounter({count}: Readonly<FooterProps> ) {
    return  (
        <footer>
        <p>END_OF_LIST // TOTAL_ENTRIES: {count}</p>
      </footer>
    )}

type FooterProps = {
  count: number;
}