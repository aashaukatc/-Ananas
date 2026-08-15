# Ananas Insights & Operating Metrics

GitHub Insights shows repository activity; Ananas also needs product, quality, compute, and vertical metrics that explain whether the platform is becoming more useful, reliable, and economical.

Metrics must match the delivery stage. A prototype is evaluated with UX evidence; an MVP is evaluated with real functional reliability; a pilot/beta adds real-user behavior and operational metrics.

## Scope / PoC metrics

- number of critical technical assumptions open vs proven;
- PoC pass/fail result by risk question;
- reproducibility from a clean supported environment;
- architecture decision killed/changed by evidence;
- upstream capability reused vs net-new subsystem created.

## Prototype metrics

- core-flow walkthrough completion;
- navigation/task confusion points;
- artifact/chat/project comprehension;
- DIRT queue comprehension and reviewer-action clarity;
- unresolved design questions;
- prototype findings that require scope or architecture change.

Prototype metrics use synthetic data and are not market-traction claims.

## MVP product metrics

| Metric | Why it matters |
|---|---|
| task success rate | primary utility measure |
| artifact completion/reopen rate | whether chat becomes durable work |
| project resume success | context persistence quality |
| project-isolation failures | must remain zero in tested paths |
| tool success/failure rate | execution reliability |
| citation/source coverage | evidence quality |
| median time to useful result | user velocity |
| retry/fallback rate | routing reliability |
| sandbox denied-action rate | permission/control visibility |
| API/UI parity success | whether verticals can reuse the same core |

## Compute metrics

| Metric | Purpose |
|---|---|
| input/output tokens per successful task | normalize token burn by outcome |
| provider cost per successful task | direct economics |
| latency by route/model | route optimization |
| fallback frequency | primary-route health |
| cost by project/vertical | allocation and budget control |
| failed-task token burn | identify compute waste |
| retry cost share | detect unstable routing/orchestration |
| successful tasks per dollar | primary model/tool economics |

## Pilot / Beta metrics

Once real limited users are admitted:

- activation into the core project workflow;
- task completion rate;
- return-to-project / artifact reuse behavior;
- user intervention/support rate;
- crash/error/incident rate;
- p50/p95 latency;
- cost per active user and successful task;
- retention appropriate to the pilot cadence;
- onboarding completion;
- top abandonment/friction points;
- rollback/recovery events;
- support issues by severity.

Targets should be set from actual pilot baseline data rather than invented before the product has users.

## DIRT vertical metrics

DIRT metrics apply only after the relevant DIRT data/privacy and reviewer workflow exists:

- revenue at risk surfaced;
- high-confidence recoverable revenue surfaced;
- reviewer acceptance/override rate;
- false-positive rate;
- recovery-probability calibration;
- recovered amount associated with reviewed signals;
- reviewer cycle time;
- recurring root-cause families;
- preventable denial/EDI friction trend;
- cost per useful reviewed signal.

Do not report DIRT prototype sample numbers as production revenue outcomes.

## Decision rule

Do not optimize raw token volume, raw agent count, model prestige, or GitHub commit volume. Optimize:

> **successful useful work per dollar and per user minute, subject to correctness, privacy, security, and isolation gates.**

## Reporting surfaces

- GitHub Issues/Projects — delivery state and evidence links
- GitHub Actions — build/test/benchmark state
- application telemetry — product/runtime metrics
- benchmark artifacts — controlled model/framework comparisons
- Figma/research notes — prototype usability findings
- DIRT dashboards — vertical business outcomes after real DIRT implementation
