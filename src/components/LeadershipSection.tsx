import portfolioData from '../data/portfolio.json'

type LeadershipPoint = {
  id: string;
  content: string;
};

type LeadershipData = {
  leadership: {
    how: {
      text: string;
      points: LeadershipPoint[];
    };
    optimize: {
      text: string;
      items: string[];
    };
    dont: {
      text: string;
      items: string[];
    };
  };
};

const data = portfolioData as LeadershipData;

export const LeadershipSection = () => {
  const { how, optimize, dont } = data.leadership;

  return (
    <section id="leadership" aria-labelledby="leadership-title" class="leadership-section">
      <div class="page-wrapper">

        {/* HOW I LEAD */}
        <article aria-labelledby="lead-how-title">
          <h2 id="lead-how-title" class="section-label">
            // {how.text}
          </h2>

          <ul class="gold-bullets">
            {how.points.map(point => (
              <li key={point.id}>
                <strong>{point.id}:</strong>
                {point.content}
              </li>
            ))}
          </ul>
        </article>

        <div class="gold-spacer" aria-hidden="true"></div>

        {/* WHAT I OPTIMIZE FOR */}
        <article aria-labelledby="lead-opt-title">
          <h3 id="lead-opt-title" class="section-label">
            // {optimize.text}
          </h3>
                
          <ul class="gold-bullets optimize-list two-col">
            {optimize.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </article>

        <div class="gold-spacer" aria-hidden="true"></div>

        {/* WHAT I DON'T COMPROMISE ON */}
        <article aria-labelledby="lead-dont-title">
          <h3 id="lead-dont-title" class="section-label">
            // {dont.text}
          </h3>

          <ul class="gold-bullets">
            {dont.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </article>

      </div>
    </section>
  );
};