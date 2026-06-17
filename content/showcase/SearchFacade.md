---
title: SearchFacade - One contract. Two engines. Zero risk
role: Senior Software Engineer / Solutions Architect
impact: Cut delivery time by over 50% while eliminating rollout risk through instant, feature-flagged provider switching.
tech: DotNet, Angular, Selenium, Azure CICD
weight: 1
specs:
  Frontend: Angular
  Backend: C#
  Architecture: Interface-driven, Provider Pattern 
  Data Contracts: DTO-based design
  Feature Control: Feature Flags (region-based)
  Deployment: Azure CICD 
  Testing: Unit + Contract + Selenium Testing
  Observability: Metrics (latency, error rates)
features:
  Provider Abstraction Layer: Decoupled application logic from search providers; Enabled seamless swapping between legacy and new systems
  Feature Flag Routing: Instant toggle between providers per region/site; Eliminated risky deployments for rollouts
  DTO Standardization: Unified data contracts across systems; Reduced integration complexity and bugs
  Accelerated Delivery: Delivered full migration capability in 3 sprints vs. 1 quarter; Saved weeks of engineering effort
  Zero-Risk Rollback: No redeploy required; Immediate fallback to legacy provider on failure
---

Led the architectural redesign of a global search migration by introducing a **provider abstraction layer with feature flag routing**, eliminating the need for per-site rewrites. Delivered a production-ready dual-provider system in 3 sprints instead of a full quarter. Enabled **instant rollback, gradual rollout, and reduced development effort by weeks**.
