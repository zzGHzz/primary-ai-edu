# AI Tool Comparison (HK Primary Context)

This snapshot compares shortlisted AI tools for a Hong Kong primary school, focusing on
security, pedagogy, integration, and cost. Use together with the evaluation rubric and
vendor due-diligence checklist.

## Tools Compared
- Google Workspace for Education + Gemini
- Microsoft 365 + Copilot for Education
- Khan Academy Khanmigo (District/Edu)
- Canva for Education (with Magic Write)
- Quizizz / Nearpod (AI-assisted)
- Private LLM via school-managed gateway (Azure/OpenAI/GCP)

## Comparison Matrix (concise)

| Tool | Security & PDPO | Pedagogy Fit | Integration | Cost | Age Safeguards | Data Residency |
| --- | --- | --- | --- | --- | --- | --- |
| Google + Gemini | Strong admin controls; data regions; audit logs | Strong for teacher workflows in Docs/Slides/Classroom | Native with Classroom/Drive; SSO | Fundamentals free; Gemini add-ons | Admin policies; age controls evolving | Regional options (verify EDU terms) |
| M365 + Copilot | Mature enterprise controls | Good, esp. schools on M365 | Native with Teams/OneDrive/SDS | EDU licensing required | Policy controls; check student availability | Regional options (verify HK/SG) |
| Khanmigo | K–12 guardrails; edu contracts | Strong student coaching/teacher tools | Roster via LMS/SIS; web | District pricing | Strong student protections | Hosted by vendor (verify region) |
| Canva (Edu) | Edu terms; limited admin depth vs suites | Visual, whiteboards, materials | Google/M365 SSO; Drive export | Free for K–12 | Classroom-appropriate filters | Vendor-hosted (verify region) |
| Quizizz/Nearpod | Edu terms; varies by vendor | Formative assessment, quizzes | Google/M365 SSO; LMS add-ons | School/district plans | Student modes and filters | Vendor-hosted (verify region) |
| Private LLM Gateway | School-controlled; strongest logs/limits | Custom to curriculum | Custom apps; SSO; higher effort | Cloud + dev/ops costs | Fully configurable | Choose region per cloud |

## Quick Takes
- Best immediate fit: Google + Gemini for teacher workflows with lowest integration effort.
- Strong student coaching: Khanmigo in a walled garden; defer until policies/consents ready.
- Visual creation: Canva complements lesson design; keep student data minimal.
- Assessment: Quizizz/Nearpod for formative checks; validate data handling and age modes.
- Custom needs: A school gateway enables bespoke use cases with strict controls but requires
  technical capacity and budget.

## Links
- See rubric: [evaluation-rubric.md](evaluation-rubric.md)
- Due diligence: [vendor-due-diligence-checklist.md](vendor-due-diligence-checklist.md)
- Tool details: `docs/tools/*.md`

