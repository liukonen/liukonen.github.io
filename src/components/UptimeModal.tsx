import { useEffect, useState } from "preact/hooks"

type MonitorData = {
  name: string
  status: number
  uptime: {
    day1: string
    day7: string
    day30: string
  }
  response: string | number
  lastCheck: number | null
}

export default function UptimeModal() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [monitors, setMonitors] = useState<MonitorData[] | null>(null)
  const [updatedAt, setUpdatedAt] = useState<number | null>(null)

  useEffect(() => {
    const handler = () => setOpen(true)
    globalThis.addEventListener("open-uptime-modal", handler)
    return () => globalThis.removeEventListener("open-uptime-modal", handler)
  }, [])

  useEffect(() => {
    if (open && !monitors) fetchUptime()
  }, [open, monitors])

  useEffect(() => {
    if (!open) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    globalThis.addEventListener("keydown", handleEscape)
    return () => globalThis.removeEventListener("keydown", handleEscape)
  }, [open])

  async function fetchUptime() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("https://uptime-api.liukonen.workers.dev/api/uptime")
      if (!res.ok) throw new Error(`Failed with status ${res.status}`)
      const data = await res.json()
      setMonitors(data.monitors)
      setUpdatedAt(data.updatedAt)
    } catch (err: any) {
      setError(err.message || "Failed to load uptime data")
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  const formattedTime = updatedAt 
    ? new Date(updatedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })
    : ""

  return (
    <div className="telemetry-overlay" onClick={() => setOpen(false)}>
      <div className="telemetry-modal" onClick={e => e.stopPropagation()}>
        
        {/* System HUD Header */}
        <div className="telemetry-header">
          <div className="header-meta">
            <h2>SYSTEM_STATUS_METRICS</h2>
            <div className="header-tags font-mono">
<span className="tag">TOPOLOGY::HYBRID_DISTRIBUTED_EDGE</span>
<span className="tag-separator">|</span>
<span className="tag">ORCHESTRATION::ISOLATED_PROCESS_NODES</span>
            </div>
          </div>
          <button className="close-btn" onClick={() => setOpen(false)} aria-label="Close modal">✕</button>
        </div>

        <div className="telemetry-content">
          {loading && <div className="telemetry-status-message font-mono">LOADING_UPSTREAM_METRICS...</div>}
          {error && <div className="telemetry-status-message error font-mono">ERROR::{error.toUpperCase()}</div>}

          {monitors && (
            <div className="telemetry-sheet">
              {/* Columns Blueprint Header with Gold Border Accent Frame */}
              <div className="sheet-header font-mono">
                <span className="col-lbl col-node">MONITOR_NODE (SINGLE_INSTANCE)</span>
                <div className="metrics-lbl-group">
                  <span className="col-lbl">1D</span>
                  <span className="col-lbl">7D</span>
                  <span className="col-lbl text-gold">30D_SLA</span>
                  <span className="col-lbl col-latency text-gold">LATENCY</span>
                  <span className="col-lbl col-pulse">STATUS</span>
                </div>
              </div>

              {/* Data Rows */}
              <div className="sheet-body">
                {monitors.map((m, idx) => (
                  <div key={idx} className="sheet-row">
                    {/* Minimal Left Boundary Anchor Indicator */}
                    <span className={`row-beacon ${m.status === 2 ? "online" : "offline"}`} />
                    
                    <div className="row-content">
                      <span className="node-name font-mono">
                        {m.name.toUpperCase().replace(/[\(\)]/g, "")}
                      </span>
                      
                      <div className="node-metrics font-mono">
                        <span className="metric-val">{parseFloat(m.uptime.day1).toFixed(2)}%</span>
                        <span className="metric-val">{parseFloat(m.uptime.day7).toFixed(2)}%</span>
                        <span className="metric-val text-gold-value">{parseFloat(m.uptime.day30).toFixed(3)}%</span>
                        <span className="metric-val latency-val text-gold-value">
                          {Number(m.response).toFixed(0)}<span className="unit">ms</span>
                        </span>
                        
                        {/* Right-Aligned Restored Glowing Pulse Vector */}
                        <span className="metric-val col-pulse-container">
                          <svg 
                            className={`pulse-vector ${m.status === 2 ? "active" : "failed"}`} 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </span>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Consolidated Systems Footer */}
        {updatedAt && (
          <div className="telemetry-footer font-mono">
            <span>ENGINE_METRICS_LAST_PULL: {formattedTime}</span>
<div className="footer-right">
    <span>DATA_SOURCE::UPTIME_ROBOT_API</span>
    <span className="tag-separator">|</span>
    <span>CACHE_EDGE::CLOUDFLARE_WORKERS</span>
  </div>
          </div>
        )}

      </div>
    </div>
  )
}