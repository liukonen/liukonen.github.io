// src/stories/Variables.stories.jsx
import React from 'react';

export default {
  title: 'Design System/Complete System Manifest',
};

// Automatically scan and grab EVERY single .sass asset file in your project dynamically
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

// 2. UNIVERSAL SELECTOR ENGINE (Captures Classes, Placeholders, Tags, Typo, Media Queries)
const extractAllSelectors = (filesObj) => {
  const definitions = [];
  
  Object.keys(filesObj).forEach((filePath) => {
    const rawText = filesObj[filePath].default || '';
    const lines = rawText.split('\n');
    let currentBlock = null;

    lines.forEach(line => {
      const trimmed = line.trim();
      
      // Skip completely empty lines or line-comments
      if (trimmed === '' || trimmed.startsWith('//')) return;

      // DETECT NEW BLOCK START:
      // Catches .classes, %placeholders, html elements (body, h1), and @media/mixin signatures
      const isSelector = trimmed.startsWith('.') || 
                         trimmed.startsWith('%') || 
                         trimmed.startsWith('@media') ||
                         /^(h[1-6]|body|p|a|code|html|input|button)[\s{,:]*/.test(trimmed);

      if (isSelector && !trimmed.includes('(')) {
        // Isolate block name clean of trailing structural brackets/colons
        const blockName = trimmed.split(/[\s{]/)[0];
        currentBlock = { 
          name: blockName, 
          properties: [], 
          source: filePath.split('/').pop(),
          type: trimmed.startsWith('.') ? 'Class' : 
                trimmed.startsWith('%') ? 'Placeholder' : 
                trimmed.startsWith('@media') ? 'Media Query' : 'Base/Typography'
        };
        definitions.push(currentBlock);
      } 
      // CAPTURE EVERY PROPERTY: No filters. If it's indented under a block, grab it.
      else if (currentBlock && (line.startsWith(' ') || line.startsWith('\t'))) {
        currentBlock.properties.push(trimmed);
      }
      // BREAK TRACKING: Line drops completely back to baseline (column 0)
      else if (currentBlock && line.length > 0 && !line.startsWith(' ') && !line.startsWith('\t')) {
        currentBlock = null;
      }
    });
  });
  return definitions;
};

export const UniversalSystemIndex = () => {
  const variables = extractAllVariables(allSassFiles);
  const selectors = extractAllSelectors(allSassFiles);

  return (
    <div style={{ padding: '40px', background: '#0F1012', minHeight: '100vh', color: '#E6E6E6', fontFamily: 'monospace', lineHeight: '1.6' }}>
      
      <header style={{ marginBottom: '40px', borderBottom: '1px solid #222', paddingBottom: '20px' }}>
        <h1 style={{ margin: '0 0 10px 0', fontFamily: 'sans-serif', letterSpacing: '-0.5px', color: '#FFF' }}>The Master SASS Manifest</h1>
        <p style={{ color: '#888', margin: 0, fontSize: '0.95rem' }}>Full-spectrum text analysis indexing every token, selector context, and structural layout variable.</p>
      </header>

      {/* SECTION 1: COMPREHENSIVE VARIABLES SUMMARY */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontFamily: 'sans-serif', color: '#d4a857', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Global Token Registry ({variables.length})</h2>
        <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #222', marginTop: '15px', borderRadius: '4px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#141517' }}>
            <thead style={{ position: 'sticky', top: 0, background: '#1A1B1E', color: '#888' }}>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #222' }}>
                <th style={{ padding: '12px' }}>TOKEN NAME</th>
                <th style={{ padding: '12px' }}>COMPILED VALUE</th>
                <th style={{ padding: '12px' }}>SOURCE FILE</th>
                <th style={{ padding: '12px' }}>PREVIEW</th>
              </tr>
            </thead>
            <tbody>
              {variables.map((v, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #222' }}>
                  <td style={{ padding: '10px', color: '#A5C261' }}>{v.name}</td>
                  <td style={{ padding: '10px', color: '#CED4DA' }}>{v.value}</td>
                  <td style={{ padding: '10px', color: '#5C6370', fontSize: '0.85rem' }}>{v.source}</td>
                  <td style={{ padding: '10px' }}>
                    {(v.value.startsWith('#') || v.value.startsWith('rgb')) && (
                      <div style={{ width: '32px', height: '16px', borderRadius: '2px', background: v.value, border: '1px solid #333' }} />
                    )}
                    {(v.value.includes('px') || v.value.includes('rem')) && !v.value.includes('-') && (
                      <div style={{ height: '4px', background: '#d4a857', width: v.value.includes('calc') ? '40px' : v.value, opacity: 0.6 }} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 2: ARCHITECTURAL BLOCKS DIRECTORY */}
      <section>
        <h2 style={{ fontFamily: 'sans-serif', color: '#d4a857', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Active System Specifications ({selectors.length})</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {selectors.map((s, i) => (
            <div key={i} style={{ background: '#141517', border: '1px solid #25262B', padding: '20px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ 
                    color: s.type === 'Class' ? '#61AFEF' : s.type === 'Placeholder' ? '#C678DD' : s.type === 'Media Query' ? '#D19A66' : '#E5C07B', 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold' 
                  }}>
                    {s.name}
                  </span>
                  <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: '#222', borderRadius: '3px', color: '#888', textTransform: 'uppercase' }}>
                    {s.type}
                  </span>
                </div>
                <div style={{ background: '#0B0C0E', padding: '12px', borderRadius: '3px', border: '1px solid #1A1B1E', overflowX: 'auto', maxHeight: '220px', overflowY: 'auto' }}>
                  {s.properties.map((prop, pi) => (
                    <div key={pi} style={{ color: prop.startsWith('@extend') || prop.startsWith('@include') ? '#C678DD' : '#ABB2BF', fontSize: '0.85rem', whiteSpace: 'pre-wrap' }}>
                      {prop}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'right', color: '#5C6370', fontSize: '0.75rem', marginTop: '10px', borderTop: '1px solid #222', paddingTop: '8px' }}>
                {s.source}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};