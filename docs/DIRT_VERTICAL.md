# DIRT RCM — Ananas Vertical Blueprint

## Status

**Vertical scope/data contract defined. Editable prototype built. DIRT MVP is not yet implemented or released.**

DIRT follows the same delivery discipline as Ananas Core: Scope → PoC → Prototype → MVP → Pilot/Beta. See [`DELIVERY_LIFECYCLE.md`](DELIVERY_LIFECYCLE.md).

## Role

DIRT (Data Intelligence for Revenue Transformation) is the first hyper-specialized product powered by Ananas. It is an RCM intelligence and audit layer, not Ananas Core itself.

**Product thesis:** clarity before automation.

DIRT should sit above existing PM/EMR/clearinghouse workflows and convert fragmented revenue-cycle data into prioritized signals, evidence-backed actions, reviewer work, and leadership visibility.

## Privacy terminology: No-PHI is an acceptance outcome, not a field-list claim

DIRT's default external-model intelligence path is designed as a **No-PHI candidate profile**. The implementation must not claim that a payload is legally de-identified merely because obvious identifiers were removed or identifiers were hashed.

Under the HIPAA Privacy Rule, de-identification can be established through Safe Harbor or Expert Determination. For a Safe Harbor-oriented profile, all date elements more specific than year that are directly related to an individual must be removed, and the covered entity must not have actual knowledge that remaining information could identify the individual.

Official HHS guidance: https://www.hhs.gov/hipaa/for-professionals/special-topics/de-identification/index.html

Therefore the default DIRT No-PHI candidate path uses:

- no patient names, DOB, MRN, beneficiary/member IDs, account numbers, addresses, contact details, or identifiable clinical free text;
- no exact service/admission/discharge/test dates in the external-model payload;
- year-only service timing where needed;
- bucketed operational age/timeliness measures rather than exact patient-event dates;
- random/opaque surrogate instance IDs rather than hashes derived directly from patient/claim identifiers;
- a protected preprocessing/control zone for any mapping required to reconnect a surrogate to source records;
- an explicit privacy/security acceptance review before the profile is labeled production de-identified/No-PHI.

A future **Expert Determination** profile may use a different set of fields only after the required expert analysis and documentation exist. It must be a separately versioned privacy profile, not a silent relaxation of the default profile.

## MVP scope

### 1. Privacy-gated audit engine

The external-model intelligence path receives only approved fields required for financial, administrative, coding-pattern, workflow, and denial analysis.

An ingress validator/reject-quarantine boundary runs **before** the external-model path. The model is never used as the de-identification mechanism.

### 2. EDI/workflow signals

DIRT may classify:

- source/clearinghouse handoff failures;
- rejection families;
- enrollment friction;
- authorization signals;
- coding/modifier patterns;
- timely-filing risk bands;
- denial recurrence;
- AR aging bands/inactivity;
- reimbursement variance.

### 3. Human reviewer queue

Signals are prioritized by revenue at risk, recovery probability, aging band, confidence, and persisted operational ownership. DIRT recommends; a reviewer validates or overrides high-impact actions.

### 4. Explainability and audit trail

Every signal must carry source/evidence lineage, immutable model/policy/ruleset versions, confidence, recommended action, and a reconstructable assignment/reviewer history.

## Data zones

```text
PHI-capable source / preprocessing zone
  - exact source identifiers/dates where operationally required
  - access controlled
  - de-identification/privacy transformation
  - surrogate mapping kept here only
                │
                ▼
Privacy validation gate
  - schema allowlist
  - identifier/date checks
  - reject/quarantine
  - approved privacy_profile_version
                │
                ▼
Default No-PHI candidate intelligence payload
  - random surrogate instances
  - year/bucketed timing
  - approved financial/coding/admin fields
                │
                ▼
Ananas intelligence → signal → human reviewer
```

Exact service dates may remain inside the protected source/preprocessing zone for deterministic RCM calculations, but they do not cross the default No-PHI candidate external-model boundary. Derived outputs such as AR/timely-filing bands must themselves be reviewed for re-identification risk before production use.

## Exact minimum data contract

### `audit_claim_snapshot`

One immutable normalized claim state for one ingestion snapshot.

| Field | Type | Purpose |
|---|---|---|
| tenant_id | uuid | tenant partition |
| source_system | string | source provenance |
| source_batch_id | uuid | immutable ingestion batch lineage |
| claim_instance_id | uuid | random instance ID for this normalized snapshot; not derived from a patient/claim identifier |
| claim_group_token | string? | optional opaque longitudinal-linkage code only when generated/managed under an approved de-identification/re-identification design |
| payer_id | string | normalized payer |
| provider_key | string | non-patient provider reference |
| facility_key | string | facility reference |
| service_year | int | year only in default Safe Harbor-oriented candidate profile |
| place_of_service | string | POS |
| claim_status | string | normalized status |
| billed_amount | decimal | charge exposure |
| allowed_amount | decimal? | expected/allowed value |
| paid_amount | decimal | payments |
| adjustment_amount | decimal | adjustments |
| patient_resp_amount | decimal | patient responsibility amount only |
| open_balance | decimal | unresolved balance |
| ar_age_band | enum | e.g. `0_30`, `31_60`, `61_90`, `91_120`, `120_plus` |
| inactivity_band | enum | bucketed inactivity measure |
| timely_filing_risk_band | enum | approved bucketed risk measure |
| privacy_profile_version | string | transformation/allowlist version |

**Not present in the default external-model payload:** exact service date, admission/discharge date, last patient-related activity date, patient DOB, or source patient/claim identifier.

### `audit_claim_line`

Every line is bound to a specific immutable claim snapshot so repeated ingestions cannot cross-join old and new claim states.

| Field | Type |
|---|---|
| claim_instance_id | uuid |
| line_instance_id | uuid |
| source_batch_id | uuid |
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
| source_row_token | uuid | random/opaque lineage token resolvable only through the protected source/control zone |
| privacy_profile_version | string |

### `audit_signal`

| Field | Type |
|---|---|
| signal_id | uuid |
| claim_instance_id | uuid |
| line_instance_id | uuid? |
| signal_type | enum |
| severity | enum |
| confidence | decimal |
| revenue_at_risk | decimal |
| recovery_probability | decimal |
| root_cause_family | string |
| recommended_action_id | string |
| evidence_refs | uuid[] |
| model_provider | string |
| model_id | string |
| model_revision | string? |
| route_policy_version | string |
| prompt_policy_version | string |
| ruleset_version | string |
| privacy_profile_version | string |
| created_at | datetime | Ananas/DIRT system audit timestamp; not a patient event date |

Route aliases alone are insufficient for reproducibility. Immutable model/policy/ruleset versions are stored on the signal at creation time.

### `assignment_event`

Queue ownership is event-sourced so assignment/reassignment survives refresh and is auditable.

| Field | Type |
|---|---|
| assignment_event_id | uuid |
| signal_id | uuid |
| event_type | enum | `assigned`, `reassigned`, `unassigned` |
| assigned_team_id | string? |
| assigned_actor_id | string? |
| changed_by_actor_id | string |
| reason_code | string? |
| event_at | datetime |

Current queue ownership is derived from the latest valid assignment event rather than existing only as UI state.

### `review_event`

| Field | Type |
|---|---|
| review_event_id | uuid |
| signal_id | uuid |
| reviewer_actor_id | string | stable reviewer/service identity |
| reviewer_role | string | role at the time of review |
| disposition | enum |
| action_taken | string |
| override_reason | string? |
| recovered_amount | decimal? |
| reviewed_at | datetime |
| policy_version | string |

Reviewer role alone is not sufficient for accountability; the stable reviewer/service actor is recorded as well.

## Explicitly prohibited from the default No-PHI candidate external-model payload

- patient name;
- date of birth;
- exact service, admission, discharge, test, or other patient-event dates more specific than year;
- address/geography below an approved de-identification threshold/profile;
- phone/email;
- SSN;
- member/subscriber/beneficiary identifier;
- medical-record number;
- patient account number;
- raw patient or claim identifiers;
- hashes deterministically derived from patient/claim identifiers unless a separately approved de-identification design explicitly permits them;
- identifiable free-text clinical notes;
- images/documents containing identifiable clinical information;
- any remaining combination for which the organization has actual knowledge that the individual could be identified.

The implementation must undergo formal privacy/security review before claiming that a production dataset or workflow is de-identified under applicable law or contract.

## Reviewer queue UI

Primary queue columns:

`priority | revenue_at_risk | payer | issue_family | confidence | recovery_probability | ar_age_band | current_owner | disposition`

Reviewer detail must show:

- evidence and protected-source lineage reference;
- detected pattern/root cause;
- recommended SOP/action;
- confidence and recovery rationale;
- immutable model/policy/ruleset/privacy-profile versions;
- current assignment + assignment history;
- reviewer actor/role, decision, and override reason;
- final outcome/recovered amount where known.

## Existing RCM asset reuse

DIRT should reuse existing RCM ingestion, lineage, QA, normalization, and warehouse work where it is fit for purpose instead of rebuilding those layers inside Ananas.

Current integration assessment: `aashaukatc/rcm-data-platform` Issue `#11`.

Required boundary:

```text
Existing source/intake/warehouse capability
  → protected DIRT normalization/privacy adapter
  → privacy validation gate
  → audit_claim_snapshot / audit_claim_line
  → audit_signal
  → assignment_event / Human Reviewer Queue
  → review_event / measured outcome
```

Ananas Core must not inherit local MongoDB/SQL/RCM assumptions merely because an existing data platform uses them.

## DIRT MVP boundaries

DIRT MVP does not:

- submit claims;
- alter payer portals automatically;
- replace the PM/EMR;
- act as a clearinghouse;
- store clinical charts in the default external-model intelligence path;
- make autonomous irreversible high-impact billing decisions without configured approval controls;
- claim production-grade de-identification merely because direct identifiers were removed;
- treat a cryptographic hash of a patient/claim identifier as automatically Safe Harbor-compatible.

## Prototype / Figma

Canonical product/prototype file: https://www.figma.com/design/mgVWhNifpTEdqdv9E487PQ

Relevant pages:

- `02 — DIRT Reviewer Queue`
- `03 — No-PHI Data Contract`
- `04 — Delivery Lifecycle & Scope`

These are prototype/design artifacts, not evidence that DIRT MVP backend behavior is complete.
