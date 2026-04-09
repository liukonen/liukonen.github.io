---
title: Event-Driven Stock Intelligence Platform (Homelab to Cloud)
role: Full-stack architecture / DevOps / messaging backbone / observability / end-to-end
impact: Automated stock analysis, alerts, and reporting with low-latency pipelines and zero-trust security, eliminating manual tracking
tech: Go, Bun, .NET, NATS, Protobuf, GitLab CI/CD, Ansible, Grafana, Gotify, Cloudflare Tunnel, Oracle Cloud, Alpine/Distroless Containers
weight: 3
---

# Event-Driven Stock Intelligence Platform (Homelab to Cloud)

## The "tl;dr" Pitch

I built a **hybrid, event-driven stock intelligence platform** using a Go orchestrator, NATS messaging, and a dual data layer (Redis + SQLite). All services run as **native binaries in distroless containers**, minimizing runtime overhead and attack surface. The system delivers **real-time portfolio data and AI-curated insights**, with full observability, retry logic, and sub-minute failure detection.

----------

## Technical Specs

|Layer|Technology|
|---|---|
|Orchestrator|Go|
|API Service|Bun|
|Workers|Go|
|Legacy Services|.NET|
|Messaging|NATS|
|Cache Layer|Redis|
|Persistence|SQLite|
|Observability|OpenTelemetry|
|Monitoring|Grafana|
|Uptime Checks|Uptime Kuma|
Notifications|Gotify|
|CI/CD|Gitea|
|Automation|Ansible|
|Security|Cloudflare Tunnel|
|Cloud|Oracle Cloud|
|Containers|Alpine Linux / Distroless / Scratch|

----------

## Key Features & Impact

### Centralized Orchestration

-   Go-based `portfolio` service as single entry point

### Dual Data Strategy

-   Redis for fast, regeneratable state
-   SQLite for durable persistence

### Event-Driven Backbone

-   NATS messaging for decoupled services

### Native Execution Model

-   All services run as native binaries
-   Minimal containers reduce overhead

### Observability & Reliability

-   OpenTelemetry tracing
-   NATS-based error transport
-   Built-in retry logic (3x, idempotent)

### Monitoring & Alerting

-   Grafana for metrics
-   Uptime Kuma for endpoint + NATS health checks (<1 min detection)
-   Gotify for real-time error notifications

### DevOps Maturity

-   CI/CD pipelines via GitLab
-   Infrastructure as Code via Ansible
