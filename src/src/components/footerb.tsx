import { FunctionalComponent } from 'preact'

const FooterB: FunctionalComponent = () => {
  const year = new Date().getFullYear()

  return (
    <div className="glass container">
      &copy; 2020 - {year} Luke Liukonen
      <i>
        {' '}
        * this page, its contents, are opinions of my own, and represent no one
        else
      </i>
      <p>
        Please see{' '}
        <a href="https://github.com/liukonen/liukonen.github.io/blob/master/terms.md">
          Terms of service
        </a>{' '}
        for not just this page, but all apps associated within the domain of my page
      </p>
    </div>
  );
};

export default FooterB
