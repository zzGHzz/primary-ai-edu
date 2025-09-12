# Quizizz (with AI)

## Overview
Quizizz is a quiz/lesson platform with live and homework modes. AI-assisted question generation speeds up assessment creation aligned to topics and difficulty.

## Primary School Fit
- Gamified quizzes that engage younger learners.
- Homework and in-class modes; immediate feedback.

## Safeguards & Compliance
- Class codes and rostered classes; teacher control over what’s visible.
- Content moderation and report/flag options.
- Use SSO; avoid student PII in quiz titles/descriptions.

## Setup & Integration
- SSO via Google/Microsoft; import from Google Classroom.
- Align questions to learning objectives; bank items for re-use.

## Pricing & Licensing
- Free tier; school/district plans unlock admin features and reports.

## Classroom Scenarios
- Exit tickets; vocabulary practice; math fluency drills.
- Use AI to seed question sets, then edit for age-appropriateness.

## Configuration Checklist
- [ ] Enable SSO and class import
- [ ] Review AI-generated items for suitability
- [ ] Configure share settings and privacy defaults

## Diagrams
```mermaid
flowchart LR
  T[Teacher] -->|Creates Set (AI Assist)| Q[Question Bank]
  Q -->|Assigns| C[Class]
  S1[Student] --> C
  S2[Student] --> C
  C --> R[Results/Reports]
  R --> T
  subgraph Safety
    MOD[Content Review]
    PRIV[Sharing Settings]
  end
  Q --> MOD
  C --> PRIV
```
