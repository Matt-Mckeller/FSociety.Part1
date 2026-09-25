# AI Chat Architecture and Status Review

**Reviewed:** 2026-08-23  
**Scope:** `apps/4eye-web-mockup`, `apps/api`, `packages/@4eye/ai-sdk`, `packages/@4eye/features`, `packages/@4eye/types`

## Executive Status

| Area | Status | Finding |
| --- | --- | --- |
| Chat shell and workbench | In progress | Provider composition, targeting, learning, plans, and docks are wired in the mockup. |
| Assistant response lifecycle | Fixed in this review | Pending simulated replies are now cancelled on new chat and component unmount. |
| Real text generation | Blocked | `AiChatDashboard` still returns a placeholder after a timeout; the API has no chat route or generation service. |
| Shared AI SDK | Not started | `packages/@4eye/ai-sdk/src/index.ts` is a placeholder and has no provider implementation. |
| Typed response contract | Partial | `ChatResponseData` exists, but no generation path validates or returns it. |
| Automated chat coverage | Missing | No direct chat dashboard, composer, SDK, or API AI-module tests were found. |
| Build health | Red outside this change | Web typecheck reports existing missing `js-cookie`, missing vision context, and unrelated MUI errors. |

## Bug Fixed

`AiChatDashboard` used an uncancellable `setTimeout` for the simulated assistant response. Clearing a chat could therefore be followed by an old response appearing in the new chat, and unmounting left the callback alive. The component now owns and clears its pending response timers on reset and unmount.

This is a temporary lifecycle safeguard, not a replacement for the missing API integration.

## Architecture Findings

### Current flow

`dashboard` -> `AiChatPage` -> `AiChatProviders` -> `AiChatDashboard`

The dashboard currently assembles plan/context/learning state and displays the transcript. The provider stack is app-owned, while reusable context and targeting state lives in `@4eye/features`. Contracts live in `@4eye/types`. The intended SDK boundary exists as `@4eye/ai-sdk`, but is empty.

### Target dependency direction

```text
@4eye/types (request/response schemas)
        ^
@4eye/ai-sdk (provider-neutral client + validation)
        ^
apps/api (auth, orchestration, provider configuration)
        ^
apps/4eye-web-mockup (UI adapter, streaming state, presentation)
```

`@4eye/features` should continue to own reusable context stores and pure payload builders. It should not call a provider or import the API app. The API should own secrets, provider selection, rate limits, and persistence. The web app should only know the SDK/API client contract.

## Refactoring Required

1. **Create one chat contract.** Add request, stream event, and response schemas beside the existing chat types. Validate at the boundary with Zod; derive TypeScript types where practical.
2. **Implement the SDK boundary.** Define a provider interface and a client that supports cancellation, timeout, structured `ChatResponseData`, and streaming events. Keep provider adapters behind the SDK.
3. **Add API orchestration.** Introduce `TextGenerationService` and a chat controller/resolver. The API receives the assembled context, applies server-owned policy, invokes the SDK, and returns a typed response or stream.
4. **Replace dashboard simulation.** Move request state into a small chat hook or feature store. Track request id, abort controller, pending/error/success states, and ignore late events from superseded requests.
5. **Consolidate AI interfaces.** The API currently has duplicate provider contracts under `modules/ai/interfaces` and `modules/ai/core/interfaces`. Choose `core/interfaces` as the internal location, then remove or re-export the duplicate after consumers migrate. Apply the same decision to STT and translation contracts.
6. **Add focused tests before provider rollout.** Cover timer/request cancellation, new-chat isolation, payload construction, schema rejection, provider failure, and streamed response completion.

## Filesystem Plan

| Location | Owns | Action |
| --- | --- | --- |
| `packages/@4eye/types/src/ai/chat` | Public request/response/event schemas | Make this the single wire-contract source. |
| `packages/@4eye/ai-sdk/src` | Provider-neutral client and adapters | Add `contracts`, `client`, `providers`, and `errors`; keep provider secrets out. |
| `apps/api/src/modules/ai` | HTTP boundary and orchestration | Add `chat/` and `text-generation/`; retain `core/` for shared internal ports/adapters. |
| `packages/@4eye/features/src/chat-input-context` | Context state and pure payload assembly | Keep UI-independent; add tests around deterministic payloads. |
| `apps/4eye-web-mockup/src/Tiles/appRealm/aiChat` | Dashboard composition and view components | Extract request lifecycle from the large dashboard; keep panels presentational. |
| `apps/4eye-web-mockup/src/Tiles/appRealm/aiChat/__tests__` | Chat UI regression tests | Create this directory for dashboard/composer lifecycle coverage. |
| `4eye/docs/plans` | Canonical architecture and migration plans | Keep this review as the status baseline; update status per phase. |

Do not move the entire provider stack into a shared package. The current app composition is deliberate: learning and plan state are app-tile concerns, while context/targeting are reusable feature concerns.

## Delivery Sequence

### Phase 0: Stabilize

- Keep the timer cancellation fix.
- Add a regression test for reset during the simulated response delay.
- Record existing typecheck failures separately from chat failures.

### Phase 1: Contract and local adapter

- Define validated chat request/response/stream types.
- Implement a fake SDK provider for deterministic tests.
- Replace the hard-coded string with the fake provider through the new client boundary.

### Phase 2: API path

- Add authenticated chat endpoint and `TextGenerationService`.
- Add provider configuration and error mapping.
- Test malformed responses, cancellation, timeout, and provider failure.

### Phase 3: Web integration

- Replace the fake provider with the API client.
- Preserve context summary, plan persistence, learning progression, and dock behavior.
- Add loading, retry, error, and abort states without allowing stale responses into a new chat.

### Phase 4: Cleanup and filesystem consolidation

- Remove duplicate provider interfaces after imports migrate.
- Remove placeholder comments and dead future-only registrations.
- Update the project status recap and add a migration checklist with owners.

## Acceptance Checks

- New chat never receives a response generated by the previous chat.
- Unmounting the chat produces no state update from an old request.
- A real request reaches the API and returns validated `ChatResponseData`.
- Abort, timeout, malformed response, and provider errors render recoverable UI states.
- Existing context, plan export, learning, targeting, and dock flows remain functional.
- `npm run test --workspace=apps/4eye-web-mockup` passes for chat tests.
- `npm run typecheck --workspace=apps/4eye-web-mockup` and `npm run build --workspace=apps/api` either pass or have separately tracked pre-existing failures; no new chat diagnostics are introduced.

## Immediate Next Actions

1. Add the Phase 0 lifecycle regression test.
2. Define the request/event schemas in `@4eye/types`.
3. Implement the fake SDK client and wire it through a chat hook.
4. Add the API route only after the contract and cancellation behavior are tested.
