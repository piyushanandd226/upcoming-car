## Quick orientation for AI coding agents

- **Project type:** Angular application (Angular v8.x). Source root: `src/`. Main module: `src/app/app.module.ts`.
- **Build & run:** use the Angular CLI scripts in `package.json`:
  - `npm install` to install deps
  - `npm start` or `ng serve` to run locally (dev server at `http://localhost:4200`)
  - `npm run build` / `ng build` to produce `dist/`
  - `npm test` runs unit tests (Karma). `npm run e2e` runs Protractor E2E.

- **Backend & integration points:** backend APIs are called directly from services using absolute URLs anchored at `http://localhost:8091`.
  - See `src/app/registration.service.ts` for most HTTP calls (login, upload, CRUD for cars).
  - WebSocket interactions are implemented with STOMP/SockJS in `src/app/notifications/WebSocketAPI.ts`; the endpoint is `http://localhost:8091/websocket` and the topic is `/topic/user`.

- **Authentication pattern:**
  - `RegistrationService.login()` posts to `/authenticate` and stores a token string into `sessionStorage` under the key `token1`.
  - Subsequent requests set an `Authorization` header built as `Bearer <token>` inside the service methods (see `registration.service.ts`).
  - Note: the login method performs manual string replacements to extract the token — this is brittle. Avoid changing the stored key or hand-rolled parsing unless you run the app and verify behavior.

- **Conventions & patterns to preserve**
  - Services include hard-coded backend URLs. Refactors that centralize the base URL should preserve the existing behavior (or update all callers and tests).
  - Authorization header is added inside service methods using `HttpHeaders`. Keep that pattern unless introducing a cross-cutting HTTP interceptor (document migration plan).
  - Components are declared in `AppModule` and not lazily loaded; adding lazy-loading changes routing and module declarations.

- **Common files to inspect before edits**
  - `src/app/registration.service.ts` — core HTTP + auth flows
  - `src/app/notifications/WebSocketAPI.ts` — WebSocket/STOMP helper
  - `src/app/app.module.ts` — top-level declarations and imports
  - `angular.json`, `package.json` — build/test targets and deps

- **Third-party libs & implications**
  - Uses `@agm/core` (maps), `@angular/material`, `ngx-bootstrap`, `bootstrap`, and `jquery` (via scripts in `angular.json`). When editing styles/scripts, update `angular.json` so builds include them.
  - Uses `stompjs` and `sockjs-client` for WebSocket. Tests or server mocks should mirror the STOMP endpoints if you add unit/integration tests.

- **Testing & CI hints**
  - Unit tests run with Karma (`karma.conf.js`) and reference `tsconfig.spec.json`.
  - E2E tests use Protractor under `e2e/` and expect a running dev server target `upcoming-car:serve`.

- **Safe change guidelines for agents**
  - Do not rename or remove the `sessionStorage` key `token1` without coordinating changes across all service calls and components that expect it.
  - When adding global behavior (for example, an HTTP interceptor to add auth headers), update `AppModule` providers and adjust tests that rely on explicit header setup.
  - When changing backend URLs, prefer adding a single `environment`-driven base URL (update both `environment.ts` and `environment.prod.ts`) and incrementally replace literals.

- **Examples (do this when editing authentication or websockets)**
  - To inspect login flow, open: `src/app/registration.service.ts` — the token extraction happens inside `login()` and then other methods read `sessionStorage.getItem('token1')` to set headers.
  - To see real-time behavior, open: `src/app/notifications/WebSocketAPI.ts` and `src/app/notifications/notifications.component.ts`.

- **What I could not infer automatically**
  - Expected Node.js runtime version isn't declared; the repo uses Angular CLI ~8.3 and TypeScript ~3.5 — prefer Node 10–12 for local reproduction.
  - Any backend contract changes (token shape, endpoints) must be verified against the running backend at `localhost:8091`.

If anything above is unclear or you'd like me to expand a specific section (for example, add migration steps for introducing an HTTP interceptor or centralizing base URLs), tell me which area to expand and I will update this file.
