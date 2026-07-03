// src/stories/Surfaces.stories.jsx
import React from 'react';

export default {
  title: 'Design System/Layout Archetypes',
};

export const InterfaceSandbox = () => (
  <div style={{ 
    padding: '40px 20px', 
    background: '#0F1012', 
    minHeight: '100vh', 
    color: '#E6E6E6',
    fontFamily: 'sans-serif'
  }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      
      <header style={{ marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, margin: '0 0 10px 0' }}>System Surface & Typography Sandbox</h1>
        <p style={{ color: '#C7CBD1', margin: 0 }}>Visual snapshot of uncoupled structural layout utilities tracking your live Sass modifications.</p>
      </header>

      {/* SECTION 1: VERIFYING BUFFER CLASSES */}
      <section style={{ marginBottom: '50px' }}>
        <h3 style={{ fontFamily: 'monospace', color: '#d4a857', fontSize: '0.85rem', marginBottom: '15px' }}>// SPACING BUFFERS</h3>
        <div style={{ background: '#1A1A1A', border: '1px dashed rgba(255,255,255,0.1)', padding: '15px' }}>
          <div className="f-mt-1" style={{ background: 'rgba(214,168,87,0.1)', padding: '10px' }}>
            <code>.mt-1</code> applied (Fluid offset tracking)
          </div>
          <div className="f-mt-2" style={{ background: 'rgba(214,168,87,0.1)', padding: '10px' }}>
            <code>mt-2</code> applied
          </div>
          <div className="f-mt-4" style={{ background: 'rgba(214,168,87,0.1)', padding: '10px' }}>
            <code>.mt-4</code> applied
          </div>
        </div>
      </section>

      {/* SECTION 2: SURFACE PRIMITIVES & INTERACTIVE LINKS */}
      <section>
        <h3 style={{ fontFamily: 'monospace', color: '#d4a857', fontSize: '0.85rem', marginBottom: '15px' }}>// CONTAINERS & COMPONENT FLOW</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          
          {/* Static Bento Grid Component */}
          <div className="bento">
            <h4 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>Bento Layout Primitive</h4>
            <p style={{ color: '#C7CBD1', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              Maintains dense padding constraints. Perfect for structural layouts, dashboards, and analytical data widgets.
            </p>
          </div>

          {/* Interactive Card Component */}
          <div className="card">
            <h4 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>Interactive Card Component</h4>
            <p style={{ color: '#C7CBD1', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '20px' }}>
              Features generous inner layout padding combined with cursor handling. Anchor elements nested inside here pick up the layout mechanics automatically.
            </p>
            <a href="#">Explore Case Study →</a>
          </div>

        </div>
      </section>

    </div>
  </div>
);