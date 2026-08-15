# Synthetic Vertical-Pack Fixture

This directory is a **Phase-1 PoC/MVP-contract fixture**, not a real product vertical.

Its purpose is to prove that Ananas Core can discover/register a vertical configuration without:

- forking the Core runtime;
- hard-coding DIRT/Continuara behavior into Core;
- giving the vertical provider credentials directly;
- widening tool/execution permissions;
- changing conversation, project, artifact, routing, or telemetry contracts.

## Why this exists

A real DIRT implementation belongs to its later vertical phase. Requiring DIRT itself to complete the Core MVP would create a circular roadmap dependency. The synthetic fixture gives Phase 1 a neutral way to test the extension boundary first.

## Current status

`manifest.yaml` defines the intended fixture contract. Runtime validation/discovery/loading is **not implemented yet** and remains part of the Phase-1 acceptance backlog.

## Acceptance target

A future test should be able to:

1. validate this manifest against the canonical vertical-pack schema;
2. load/register the fixture through a generic Core interface;
3. observe its bounded synthetic policy/schema metadata;
4. unload/remove it without changing Core behavior;
5. prove it cannot request undeclared network/filesystem/secret permissions.

The fixture must remain synthetic and non-sensitive. Do not use real healthcare, patient, client, or proprietary data here.
