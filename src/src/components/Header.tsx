
export default function Header({ title, subtitle }: Readonly<HeaderProps>) {
    return (
      <header style={{ marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '600' }}>{title}</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px', maxWidth: '600px' }}>
          {subtitle}
        </p>
      </header>
    )
}

type HeaderProps = {
    title: string;
    subtitle?: string;
}