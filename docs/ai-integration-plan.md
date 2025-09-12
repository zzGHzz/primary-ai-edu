# AI Integration Plan for an HK Primary School

## Executive Summary
This plan proposes a safe, age-appropriate adoption of AI to enhance teaching and learning while meeting Hong Kong’s PDPO obligations. Given the school’s current Google Classroom usage and managed Google accounts, the core recommendation is Google Workspace for Education with Gemini. To avoid external data handling, third‑party SaaS classroom tools and custom gateways are excluded for now. Rollout focuses solely on Google-native capabilities with teacher training, governance, and measurable outcomes.

## Tooling Landscape (Shortlist)
- Google Workspace for Education + Gemini for Workspace — Google Classroom, Drive, Docs; admin controls; browser-first. Fundamentals is free; paid tiers add security and teaching features.
- Khan Academy Khanmigo: Tutor/coach aligned to curricula; teacher dashboards; student-appropriate guardrails; district licensing.
- Canva for Education: Free for K–12; templates, whiteboards; AI (Magic Write) with education safeguards.
- Quizizz (with AI) or Nearpod: Lesson/poll/quizzes; AI-assisted question generation; school/district plans.
- Private LLM via school gateway (e.g., Azure/OpenAI/GCP managed): For custom apps, ensure region selection and strict data controls.

## Safeguards & Compliance
- Data protection: Map personal data flows; store student data in approved regions; sign vendor DPAs; apply data minimization and retention policies.
- Content safety: Enable age filters/blocked prompts, disable data sharing for model training, log interactions, and provide a student-appropriate mode wherever available.
- Identity & access: SSO (Google/Microsoft), least-privilege roles, group-based access, MFA for admins.
- Monitoring: Centralized logs (Admin consoles/MDM), termly audits, incident response runbooks.
- Regulations: PDPO, school safeguarding policies, accessibility (WCAG 2.1 AA), bilingual support (English/Chinese) where practical.

## Comparative Notes
- Google + Gemini: Strong fit with Classroom and Drive; mature admin/data controls; lowest integration effort.

## Integration Architecture (High Level)
- Identity: Google Workspace as source of truth; use OUs/groups for staff, students, and classes; enable guardian summaries.
- Devices/MDM: Manage browsers/devices via Google Admin; if iPad/Windows are present, add Jamf/Intune as needed; enforce safe search and content filtering.
- Data: Drive/Docs/Slides as canonical storage; prohibit uploading sensitive PII to external LLMs; restrict third‑party app access via Admin controls.
- AI Access: Gemini for Workspace only; no third‑party SaaS or custom gateways handling school data in this phase.

## Recommendation
- Adopt Google Workspace for Education with Gemini as the sole AI platform (aligned with current Classroom and Google accounts).
- Exclude third‑party SaaS tools (Canva, Quizizz, Nearpod, Khanmigo) and custom LLM gateways to avoid external data handling.
- Revisit additional tools only after policy, consent, and on‑vendor data residency reviews are complete.

## Implementation Plan (Phased)
- Phase 0 — Governance & Readiness (Month 0–1)
  - Define policy: acceptable use, privacy, prompt safety; create a DPA register and data-flow diagrams.
  - Google Admin baseline: set data regions; restrict third‑party app access; disable data sharing for model improvement; enable audit logs; configure age-appropriate Gemini controls.
  - Classroom readiness: ensure guardian summaries, class naming conventions, and roster sync.
  - Select pilot year levels/subjects; obtain consent templates.
- Phase 1 — Pilot (Month 2–3)
  - Tools: Gemini for Workspace only; 6–8 teachers; 2–3 classes.
  - Training: 2x 90-minute sessions (Foundations; Classroom scenarios in Docs/Slides/Classroom); create exemplars and rubrics.
  - Evaluate: engagement, time saved, student outcomes; collect teacher/student feedback; review safety incidents and logs.
- Phase 2 — Expand (Month 4–6)
  - Broaden to additional year levels; automate Classroom rostering; refine OU/group policies.
  - Introduce advanced Gemini use cases (comment banks, auto-rubrics) under teacher oversight.
- Phase 3 — Scale & Optimize (Month 7–12)
  - Full-staff PD, PLCs, micro-credentials; publish Classroom/Gemini playbooks.
  - Budget for sustained licensing and support; introduce termly audits and metrics reporting.

## Success Metrics
- Teacher adoption: ≥70% using at least one AI-supported workflow weekly.
- Efficiency: ≥30% reduction in planning/marking time for pilot teachers.
- Student engagement: measurable increase in formative assessment participation and quality.
- Safety: zero critical incidents; all medium incidents resolved within SLA; audit logs reviewed termly.

## Costs & Procurement (Guidance)
- Use a TCO model: licenses (staff/student), device/MDM, training time, support, and cloud consumption for any gateway.
- Prefer EDU/licensed tiers with DPAs and admin controls; avoid consumer accounts.
- Require: data residency options, audit logs, SSO/SIS integration, content filtering, and clear SLAs.

## Teacher Training Program
- Foundations: responsible AI, prompt patterns, safeguarding, and accessibility.
- Classroom Scenarios: lesson planning, differentiation, feedback, assessment item generation, and translation supports.
- Practice & Coaching: PLCs, peer demos, co-planning; office hours.
- Certification: short micro-credentials; share exemplars and student work showcases (with consent/anonymization).

## Alignment With Current IT Settings
- Google Classroom already used for teacher–parent communication: enable and standardize guardian summaries and class naming.
- Google Docs/Slides used for assignments: prioritize Gemini in Docs/Slides scenarios and comment bank workflows.
- Managed student Google accounts: apply OU-based policies, enforce safe search, and restrict third‑party app access.

## Further Reading
- [Google Workspace + Gemini details](docs/tools/google-workspace-gemini.md)

## Excluded Tools (Rationale)
- Microsoft 365 + Copilot, Khanmigo, Canva, Quizizz, Nearpod, and custom LLM gateways are excluded in this phase to avoid external handling of school data beyond the Google Workspace tenant.

## Appendices (Templates)
- Evaluation rubric (weighted): Security (25), Pedagogy (25), UX (20), Cost (15), Integration (15).
- Vendor due-diligence checklist: DPA, data flows, residency, logging, incident response, accessibility, SSO/LMS/MDM.
- Pilot evaluation form and TCO calculator (create as separate docs in `docs/`).

> Note: Pricing and feature availability vary by region and change frequently. Validate with current vendor EDU pages and your procurement partner before purchase.
