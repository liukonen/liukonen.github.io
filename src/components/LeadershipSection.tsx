import { h } from 'preact'
import { useState } from 'preact/hooks'
import portfolioData from '../data/portfolio.json'

type LeadershipPoint = {
  id: string
  content: string
}

type LeadershipData = {
  leadership: {
    how: { 
      text: string
      points: LeadershipPoint[] 
    }
    optimize: { 
      text: string
      items: string[] 
    }
    dont: { 
      text: string
      items: string[]
    }
  }
}

const data = portfolioData as LeadershipData

export const LeadershipSection = () => {
  const { how, optimize, dont } = data.leadership
  const [activeId, setActiveId] = useState<string | null>(null)

  const toggleSection = (id: string) => {
    setActiveId(activeId === id ? null : id)
  }

  const sections = [
    { 
      id: 'how', 
      title: how.text, 
      content: (
        <ul class="grid-2">
          {how.points.map(p => (
            <li class="bento" key={p.id}>
              <strong class="gold-bullet">{p.id}:</strong> {p.content}
            </li>
          ))}
        </ul>
      )
    },
    { 
      id: 'opt', 
      title: optimize.text, 
      content: (
        <ul class="grid-2">
          {optimize.items.map((i, idx) => <li class="bento" key={idx}>{i}</li>)}
        </ul>
      )
    },
    { 
      id: 'dont', 
      title: dont.text, 
      content: (
        <ul class="grid-2">
          {dont.items.map((i, idx) => <li class="bento" key={idx}>{i}</li>)}
        </ul>
      )
    }
  ]

  return (
    <section id="leadership" class="leadership-section">
      <div>
        
        {/* The Core Control Grid */}
        <div class="grid-3 leadership-controls">
          {sections.map((sec) => (
            <div key={sec.id} class="leadership-node">
              
              {/* Trigger Header */}
              <div 
                class={`card ${activeId === sec.id ? 'active' : ''}`}
                onClick={() => toggleSection(sec.id)}
              >
                <h2 class="base-label lnk">
                  {sec.title} 
                  <span class={`caret-indicator ${activeId === sec.id ? 'rotated' : ''}`}>▼</span>
                </h2>
              </div>

              {/* MOBILE VIEWPORT: Injected directly inline underneath the triggering card */}
              <div class={`mobile-expansion-drawer ${activeId === sec.id ? 'is-open' : ''}`}>
                {activeId === sec.id && (
                  <div>
                    {sec.content}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* DESKTOP VIEWPORT: Shared layout zone remaining at the baseline root */}
        <div class={`expansion-viewport desktop-only-viewport ${activeId ? 'is-open' : ''}`}>
          {activeId && (
            <div class="expansion-viewport-inner">
              <div>
                {sections.find(s => s.id === activeId)?.content}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}