

export default function FooterCounter({count}: Readonly<FooterProps> ) {
    return  (
        <footer style={{ marginTop: '100px', opacity: 0.5 }}>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem' }}>
          END_OF_LIST // TOTAL_ENTRIES: {count}
        </p>
      </footer>
    )}

type FooterProps = {
  count: number;
}