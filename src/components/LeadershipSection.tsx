import { h } from 'preact';
import { useState } from 'preact/hooks';
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
  const { how, optimize, dont } = (portfolioData as LeadershipData).leadership;
  const [activeId, setActiveId] = useState<string | null>(null);

  const sections = [
    { id: 'how', title: `${how.text}`, content: 
      <ul class="grid-2">{how.points.map(p => <li class="bento" key={p.id}><strong class="gold-bullet">{p.id}:</strong> {p.content}</li>)}</ul> 
    },
    { id: 'opt', title: `${optimize.text}`, content: 
      <ul class="grid-2">{optimize.items.map((i, idx) => <li class="bento" key={idx}>{i}</li>)}</ul> 
    },
    { id: 'dont', title: `${dont.text}`, content: 
      <ul class="grid-2">{dont.items.map((i, idx) => <li class="bento" key={idx}>{i}</li>)}</ul> 
    }
  ];

  return (
    <section id="leadership" class="leadership-section">
      <div class="page-wrapper">
        
        {/* The consistent anchor grid */}
        <div class="grid-3">
          {sections.map((sec) => (
            <div 
              key={sec.id} 
              class={`card ${activeId === sec.id ? 'active' : ''}`}
              onClick={() => setActiveId(activeId === sec.id ? null : sec.id)}
            >
              <h2 class="section-label interactive-link">{sec.title} ▼</h2>
            </div>
          ))}
        </div>

        {/* The consistent expansion viewport with separation wrapper */}
        <div class={`expansion-viewport ${activeId ? 'is-open' : ''}`}>
          {activeId && (
            <div class="expansion-viewport-inner">
              <div class="expanded-content">
                {sections.find(s => s.id === activeId)?.content}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}