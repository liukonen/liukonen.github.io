// src/stories/Variables.stories.jsx
import React from 'react';

export default {
  title: 'Design System/Ultimate Live Spec Engine',
};

// Automatically scan and ingest all project SASS files
const allSassFiles = import.meta.glob('../styles/**/*.sass', { query: '?raw', eager: true });

// 1. VARIABLE PARSER
const extractAllVariables = (filesObj) => {
  const variables = [];
  Object.keys(filesObj).forEach((filePath) => {
    const rawText = filesObj[filePath].default || '';
    rawText.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('$') && trimmed.includes(':')) {
        const [name, valuePart] = trimmed.split(':');
        const value = valuePart.split('//')[0].replace(';', '').trim();
        variables.push({
          name: name.trim(),
          value,
          source: filePath.split('/').pop()
        });
      }
    });
  });
  return variables;
};

// 2. CLASS PARSER
const extractClassNames = (filesObj) => {
  const classes = [];
  Object.keys(filesObj).forEach((filePath) => {
    const rawText = filesObj[filePath].default || '';
    rawText.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('.') && !trimmed.includes('(')) {
        const className = trimmed.split(/[\s{,:]/)[0].replace('.', '');
        if (className && !classes.includes(className)) {
          classes.push(className);
        }
      }
    });
  });
  return classes;
};

export const LiveSpecEngine = () => {
  const variables = extractAllVariables(allSassFiles);
  const classNames = extractClassNames(allSassFiles);

  // Group variables for easier layout scanning
  const colorTokens = variables.filter(v => v.value.startsWith('#') || v.value.startsWith('rgb'));
  const fontTokens = variables.filter(v => v.name.includes('font') || v.name.includes('family') || v.name.includes('type') || v.value.includes('Plex') || v.value.includes('Cascadia'));
  const sizeTokens = variables.filter(v => v.name.includes('size') || v.name.includes('scale') || v.name.includes('fs-'));

  return (
    <div style={{ padding: '40px', background: '#0F1012', minHeight: '100vh', color: '#E6E6E6', fontFamily: 'sans-serif', lineHeight: '1.6' }}>
      
      <header style={{ marginBottom: '50px', borderBottom: '1px solid #222', paddingBottom: '20px' }}>
        <h1 style={{ margin: '0 0 10px 0', letterSpacing: '-0.5px', color: '#FFF' }}>The Dynamic Spec Engine</h1>
        <p style={{ color: '#888', margin: 0, fontSize: '0.95rem', fontFamily: 'monospace' }}>Zero-maintenance runtime layout instantiation and automated typography specimen sheets.</p>
      </header>

      {/* SECTION 1: AUTOMATED TYPOGRAPHY SPECIMENS */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ color: '#d4a857', borderBottom: '1px solid #333', paddingBottom: '10px', fontSize: '1.4rem' }}>Automated Font Specimen Sheet</h2>
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '20px' }}>Rendering live type stacks extracted from your SASS variables:</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {fontTokens.map((f, i) => {
            // Clean up font-family declarations for inline styles
            const cleanFont = f.value.replace(/['";]/g, '');
            return (
              <div key={i} style={{ background: '#141517', padding: '25px', borderRadius: '4px', border: '1px solid #25262B' }}>
                <div style={{ fontFamily: 'monospace', color: '#61AFEF', fontSize: '0.85rem', marginBottom: '15px' }}>
                  {f.name}: {f.value}
                </div>
                {/* Visual rendering of the actual font */}
                <div style={{ fontFamily: cleanFont }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '10px', letterSpacing: '-0.5px' }}>
                    The quick brown fox jumps over the lazy dog. 1234567890
                  </div>
                  <div style={{ fontSize: '1rem', opacity: 0.7, lineHeight: '1.6' }}>
                    Sphinx of black quartz, judge my vow. Highly-optimized typographic structural scaling engine parsing parameters in real-time.
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: AUTO-GENERATED TYPE SCALES */}
      {sizeTokens.length > 0 && (
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ color: '#d4a857', borderBottom: '1px solid #333', paddingBottom: '10px', fontSize: '1.4rem' }}>Parsed Size & Scale Steppers</h2>
          <div style={{ background: '#141517', padding: '25px', borderRadius: '4px', border: '1px solid #25262B' }}>
            {sizeTokens.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', borderBottom: '1px solid #222', padding: '12px 0' }}>
                <div style={{ width: '200px', color: '#A5C261', fontFamily: 'monospace', fontSize: '0.85rem' }}>{s.name} ({s.value})</div>
                <div style={{ fontSize: `var(--${s.name}, ${s.value})`, fontWeight: 500 }}>
                  System Scale Specimen
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3: AUTOMATED SURFACE PREVIEWS */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ color: '#d4a857', borderBottom: '1px solid #333', paddingBottom: '10px', fontSize: '1.4rem' }}>Live Layout Surface Canvas</h2>
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '20px' }}>Every active CSS selector discovered inside your style tree, rendered live on standard blocks:</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '25px' }}>
          {classNames.map((className, i) => (
            <div key={i} style={{ background: '#141517', border: '1px solid #25262B', padding: '20px', borderRadius: '4px' }}>
              <div style={{ fontFamily: 'monospace', color: '#C678DD', fontSize: '0.85rem', marginBottom: '15px', fontWeight: 'bold' }}>
                .{className} <span style={{ color: '#5C6370', fontWeight: 'normal' }}>(Live Sandbox Render)</span>
              </div>
              
              {/* This div instantiates your EXACT compiled class from your SASS pipeline! */}
              <div className={className}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.2rem' }}>Dynamic Container Frame</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
                  This element is actively carrying the <code>.{className}</code> selector rules. Modify your SASS files to watch this box shift padding, tracking, and layout attributes.
                </p>
                <a href="#" style={{ display: 'inline-block', marginTop: '12px', color: '#d4a857', textDecoration: 'none', fontSize: '0.85rem' }}>
                  Interactive Context →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};