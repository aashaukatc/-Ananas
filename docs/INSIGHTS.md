# Ananas Insights & Operating Metrics

GitHub Insights shows repository activity; Ananas also needs product and compute metrics that explain whether the platform is becoming more useful and economical.

## Phase-1 product metrics

| Metric | Why it matters |
|---|---|
| task success rate | primary utility measure |
| artifact completion rate | whether chat becomes durable work |
| project resume success | context persistence quality |
| tool success/failure rate | execution reliability |
| citation/source coverage | evidence quality |
| median time to useful result | user velocity |
| retry/fallback rate | routing reliability |

## Compute metrics

| Metric | Purpose |
|---|---|
| input/output tokens per successful task | normalize token burn by outcome |
| provider cost per successful task | direct economics |
| latency by route/model | route optimization |
| fallback frequency | primary-route health |
| cost by project/vertical | allocation and budget control |
| failed-task token burn | identify compute waste |

## DIRT vertical metrics

- revenue at risk surfaced;
- high-confidence recoverable revenue surfaced;
- reviewer acceptance/override rate;
- false-positive rate;
- recovery probability calibration;
- recovered amount associated with reviewed signals;
- reviewer cycle time;
- recurring root-cause families;
- preventable denial/EDI friction trend.

## Decision rule

Do not optimize raw token volume, raw agent count, or model prestige. Optimize **successful useful work per dollar and per user minute**, with quality/security gates.

## Reporting surfaces

- GitHub Issues/Projects: delivery state
- GitHub Actions: build/test/benchmark state
- application telemetry: product/runtime metrics
- benchmark artifacts: controlled model/framework comparisons
- DIRT dashboards: vertical business outcomes
