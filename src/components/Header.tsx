
export default function Header({ title, subtitle }: Readonly<HeaderProps>) {
    return (
      <header>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </header>
    )
}

type HeaderProps = {
    title: string;
    subtitle?: string;
}