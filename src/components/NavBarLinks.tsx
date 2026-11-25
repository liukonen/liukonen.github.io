import portfolioData from '../data/portfolio.json'

export default function NavLinks({ onClose }: { readonly onClose: () => void }) {
  return (
    <div className="l-nav-links show">
      <a href="#/" onClick={onClose}>Home</a>
      {portfolioData.sidebar.map((item) => (
        <a href={item.path} key={item.path} onClick={onClose}>
          {item.label}
        </a>
      ))}
    </div>
  )
}
