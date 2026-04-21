import portfolioData from '../data/portfolio.json';

export default function NavLinks({ onClose }: { readonly onClose: () => void }) {
  return (
    <div className="nav-links show">
        <a href="#/" onClick={onClose}>— / HOME</a>
      {portfolioData.sidebar.map((item) => (
        <a href={item.path} onClick={onClose}  className={'top-buffer-40'}>
          — / {item.id}
        </a>
      ))}
    </div>
  );
}