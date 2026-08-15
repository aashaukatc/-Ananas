# DIRT RCM — Ananas Vertical Blueprint

## Role

DIRT (Data Intelligence for Revenue Transformation) is the first hyper-specialized product powered by Ananas. It is an RCM intelligence and audit layer, not the Ananas core itself.

**Product thesis:** clarity before automation.

DIRT should sit above existing PM/EMR/clearinghouse workflows and convert fragmented revenue-cycle data into prioritized signals, evidence-backed actions, reviewer work, and leadership visibility.

## MVP scope

### 1. No-PHI audit engine

The intelligence layer receives only fields required for financial, administrative, coding-pattern, workflow, and denial analysis. Direct patient identifiers and free-text clinical notes are excluded.

### 2. EDI/workflow signals

DIRT may classify:

- source/clearinghouse handoff failures;
- rejection families;
- enrollment friction;
- authorization signals;
- coding/modifier patterns;
- timely-filing risk;
- denial recurrence;
- AR aging and inactivity;
- reimbursement variance.

### 3. Human reviewer queue

Signals are prioritized by revenue at risk, recovery probability, age, confidence, and operational ownership. DIRT recommends; a reviewer validates or overrides high-impact actions.

### 4. Explainability and audit trail

Every signal should carry source lineage, evidence references, policy/version context, confidence, model route, recommended action, and reviewer disposition.

## Exact minimum data contract

### `audit_claim`

| Field | Type | Purpose |
|---|---|---|
| tenant_id | uuid | tenant partition |
| source_system | string | source provenance |
| source_file_id | uuid | file lineage |
| claim_key_hash | string | de-identified stable claim key |
| encounter_key_hash | string? | optional de-identified encounter grouping |
| payer_id | string | normalized payer |
| provider_key | string | non-patient provider reference |
| facility_key | string | facility reference |
| service_from | date | service date |
| service_to | date | service date range |
| place_of_service | string | POS |
| claim_status | string | normalized status |
| billed_amount | decimal | charge exposure |
| allowed_amount | decimal? | expected/allowed value |
| paid_amount | decimal | payments |
| adjustment_amount | decimal | adjustments |
| patient_resp_amount | decimal | patient responsibility amount only |
| open_balance | decimal | unresolved balance |
| days_in_ar | int | aging |
| last_activity_at | datetime | inactivity/timeliness |
| created_at | datetime | audit timestamp |

### `audit_claim_line`

| Field | Type |
|---|---|
| claim_key_hash | string |
| line_key_hash | string |
| cpt_hcpcs | string |
| modifiers | string[] |
| diagnosis_family | string[] |
| units | decimal |
| billed_amount | decimal |
| allowed_amount | decimal? |
| paid_amount | decimal |
| adjustment_amount | decimal |
| open_balance | decimal |
| denial_code | string? |
| reason_codes | string[] |
| remark_codes | string[] |
| edi_stage | string? |
| rejection_family | string? |
| auth_signal | enum |
| documentation_signal | enum |
| source_row_locator | string |

### `audit_signal`

| Field | Type |
|---|---|
| signal_id | uuid |
| claim_key_hash | string |
| line_key_hash | string? |
| signal_type | enum |
| severity | enum |
| confidence | decimal |
| revenue_at_risk | decimal |
| recovery_probability | decimal |
| root_cause_family | string |
| recommended_action_id | string |
| evidence_refs | string[] |
| model_route | string |
| created_at | datetime |

### `review_event`

| Field | Type |
|---|---|
| review_event_id | uuid |
| signal_id | uuid |
| reviewer_role | string |
| disposition | enum |
| action_taken | string |
| override_reason | string? |
| recovered_amount | decimal? |
| reviewed_at | datetime |
| policy_version | string |

## Explicitly prohibited from No-PHI intelligence payloads

- patient name;
- date of birth;
- address;
- phone/email;
- SSN;
- member/subscriber identifier;
- medical-record number;
- raw patient account identifier unless irreversibly transformed under the approved de-identification design;
- free-text clinical notes;
- images/documents containing identifiable clinical information.

The implementation must still undergo formal privacy/security review before claiming that a dataset or workflow is de-identified under applicable law or contract.

## Reviewer queue UI

Primary queue columns:

`priority | revenue_at_risk | payer | issue_family | confidence | recovery_probability | days_in_ar | owner | disposition`

Reviewer detail must show:

- evidence and source lineage;
- detected pattern/root cause;
- recommended SOP/action;
- confidence and recovery rationale;
- policy/model versions;
- reviewer decision and override reason;
- final outcome/recovered amount where known.

## MVP boundaries

DIRT MVP does not:

- submit claims;
- alter payer portals automatically;
- replace the PM/EMR;
- act as a clearinghouse;
- store clinical charts;
- make autonomous irreversible high-impact billing decisions without configured approval controls.

## Figma

Canonical product wireframes and schema: https://www.figma.com/design/mgVWhNifpTEdqdv9E487PQ
