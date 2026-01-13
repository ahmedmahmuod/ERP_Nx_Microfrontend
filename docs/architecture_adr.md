# Micro-Frontend ERP Architecture (Phase 1)

Pure architectural design for Angular-based Micro-Frontend ERP system.

## Architecture Overview

### System Design Pattern

**Micro-Frontend Architecture with Module Federation**

The ERP system follows a **distributed micro-frontend approach** where:

- Independent teams own different business domains
- Each domain is a self-contained application
- Runtime integration allows dynamic composition
- Deployment independence enables continuous delivery per domain

### Core Architectural Components

```
┌─────────────────────────────────────────────┐
│           Shell Application (Host)          │
│  - Navigation orchestration                 │
│  - Authentication state management          │
│  - Global layout & theming                  │
│  - Remote application loading               │
└──────────────┬──────────────────────────────┘
               │
               │ (Runtime Federation)
               │
       ┌───────┴───────┬─────────────┬──────────┐
       │               │             │          │
   ┌───▼────┐    ┌────▼───┐    ┌────▼───┐  ┌──▼─────┐
   │ Auth   │    │Finance │    │  HR    │  │ Supply │
   │Remote  │    │Remote  │    │ Remote │  │ Remote │
   └────────┘    └────────┘    └────────┘  └────────┘
```

---

## Shell vs Remote Responsibilities

### Shell Application (Host) Responsibilities

**Primary Role**: Application orchestrator and infrastructure provider

**Core Responsibilities**:

- **Navigation & Routing**: Top-level routing, menu structure, breadcrumbs
- **Authentication & Authorization**: User session, token management, role-based access
- **Global State**: Cross-cutting concerns shared across all remotes
- **Layout & Theme**: Main application shell, header, footer, sidebar
- **Remote Loading**: Dynamic module federation, lazy loading remotes
- **Error Boundaries**: Global error handling and fallback UI
- **Shared Services**: Core services accessible to all remotes (notification, logging)

**What Shell Does NOT Do**:

- Business logic specific to any domain
- Data fetching for domain-specific features
- Domain-specific UI components

---

### Remote Applications Responsibilities

**Primary Role**: Domain-specific business functionality

**Core Responsibilities**:

- **Domain Business Logic**: All logic related to their business domain
- **Domain Data Management**: State, API calls, caching for their domain
- **Domain UI**: Complete UI for their feature set
- **Local Routing**: Internal navigation within their domain
- **Domain-specific Services**: Services only relevant to their domain

**Examples by Domain**:

**Authentication Remote**:

- Login/logout flows
- User registration
- Password management
- Session handling
- MFA workflows

**Finance Remote**:

- Accounting modules
- Invoice management
- Payment processing
- Financial reporting
- Budget tracking

**HR Remote**:

- Employee management
- Payroll processing
- Leave management
- Performance reviews
- Recruitment workflows

**Supply Chain Remote**:

- Inventory management
- Order processing
- Vendor management
- Warehouse operations
- Procurement workflows

---

## Federation Strategy

### Conceptual Approach

**Runtime Integration with Module Federation**

**Federation Model**: Host-Remote pattern with bidirectional communication

#### Loading Strategy

- **Lazy Loading**: Remotes load on-demand when user navigates to their route
- **Parallel Loading**: Multiple remotes can be active simultaneously
- **Version Independence**: Each remote can update independently
- **Fallback Mechanism**: Shell provides fallback UI if remote fails to load

#### Communication Patterns

**Shell → Remote Communication**:

- User context (authenticated user, permissions)
- Theme configuration
- Global settings
- Navigation events

**Remote → Shell Communication**:

- Navigation requests (redirect to other remotes)
- Notification triggers
- Global state updates (e.g., user profile changes)
- Error reporting

**Remote ↔ Remote Communication**:

- **Discouraged**: Direct remote-to-remote dependencies create coupling
- **Alternative**: Use Shell as mediator via events/messages
- **Exception**: Shared libraries for cross-cutting utilities

#### Dependency Sharing Strategy

**Singleton Pattern for Core Dependencies**

- **Shared as Singletons**: Angular core, common, router, forms, HTTP client
- **Version Strategy**: Strict version alignment to avoid conflicts
- **Bundle Optimization**: Shared dependencies loaded once, reused by all remotes
- **Custom Libraries**: Domain-agnostic utilities shared across applications

---

## Monorepo vs Multi-Repo Decision

### Recommended Approach: **Monorepo**

**Rationale**:

**Advantages for ERP System**:

1. **Unified Development**: Single repository for all Shell + Remotes
2. **Dependency Management**: Centralized package management, easier updates
3. **Code Sharing**: Shared libraries, types, and utilities in common workspace
4. **Atomic Changes**: Cross-application changes in single commit
5. **Build Orchestration**: Unified CI/CD pipeline for all applications
6. **Developer Experience**: Easier onboarding, single clone, consistent tooling

**Monorepo Structure**:

```
ERP/
├── projects/
│   ├── shell/              # Host application
│   ├── remote-auth/        # Authentication remote
│   ├── remote-finance/     # Finance remote
│   ├── remote-hr/          # HR remote
│   └── remote-supply/      # Supply chain remote
├── libs/
│   ├── shared-ui/          # Shared UI components
│   ├── shared-data/        # Shared data models
│   └── shared-utils/       # Shared utilities
└── tools/                  # Build and deployment tools
```

**Alternative: Multi-Repo** (Not Recommended for Initial Phase)

Would be considered if:

- Different teams with completely independent deployment schedules
- Need for strict access control per repository
- Organizational constraints require repository separation

---

## Domain Boundaries

### Domain Decomposition Strategy

**Bounded Contexts** (from Domain-Driven Design):

Each remote represents a **bounded context** with clear boundaries:

#### 1. Authentication & User Management

**Scope**: User identity, access control, session management
**Boundaries**:

- Owns user credentials, roles, permissions
- Does NOT handle business entities (employees, customers)
- Provides authentication state to other remotes

#### 2. Finance & Accounting

**Scope**: Financial transactions, accounting, budgeting
**Boundaries**:

- Owns financial records, invoices, payments
- Does NOT manage employee salaries (HR domain)
- Does NOT handle inventory costs (Supply domain handles valuation)

#### 3. Human Resources

**Scope**: Employee management, payroll, recruitment
**Boundaries**:

- Owns employee records, organizational structure
- Manages payroll but integrates with Finance for accounting entries
- Does NOT handle user authentication (Auth domain)

#### 4. Supply Chain & Inventory

**Scope**: Procurement, warehouse, inventory, vendors
**Boundaries**:

- Owns inventory records, vendor relationships
- Does NOT handle payment processing (Finance domain)
- Integrates with Finance for cost accounting

### Domain Interaction Rules

**Clear Ownership**:

- Each data entity has ONE owning domain
- Other domains reference via ID, not duplication

**Data Sharing**:

- Domains share data via APIs (future: BFF or microservices)
- No direct database access across domains
- Read-only views acceptable with clear ownership

**UI Composition**:

- Domains can embed UI from other domains (e.g., HR shows employee financial summary from Finance)
- Embedding done via micro-frontend composition, not code sharing

---

## Shared Libraries Strategy

### Conceptual Organization

**Three-Tier Shared Library Strategy**:

#### Tier 1: Foundation Libraries

**Purpose**: Core utilities used by ALL applications

**Examples**:

- **Shared UI Components**: Button, Input, Table, Modal (design system)
- **Shared Types**: Common TypeScript interfaces and types
- **Shared Utilities**: Date formatting, validation, string manipulation
- **Theme & Styling**: CSS variables, theme tokens, global styles

**Characteristics**:

- Domain-agnostic
- Stable API (breaking changes require coordination)
- High test coverage

#### Tier 2: Cross-Domain Libraries

**Purpose**: Utilities spanning multiple (but not all) domains

**Examples**:

- **Financial Utilities**: Currency formatting, tax calculations (used by Finance + HR)
- **Address Utilities**: Address validation, formatting (used by HR, Supply, Finance)
- **Reporting Utilities**: Chart components, export functions

**Characteristics**:

- Multi-domain but not universal
- Clear ownership by one domain team
- Versioned independently

#### Tier 3: Domain-Internal Libraries

**Purpose**: Code sharing within a single remote's domain

**Examples**:

- Auth domain: Token utilities, password validators
- Finance domain: Invoice calculators, payment processors

**Characteristics**:

- Private to remote application
- Can evolve rapidly without coordination
- Not exposed via Module Federation

### Dependency Management Principles

**Version Alignment**:

- Foundation libraries use exact versions across all remotes
- Breaking changes coordinated via migration plan

**Code Duplication vs Sharing**:

- **Prefer duplication** if code is simple and domains diverge
- **Prefer sharing** if logic is complex, bug-prone, or legally sensitive (e.g., tax calculations)

**Ownership Model**:

- Each shared library has a designated owner team
- Changes require owner approval
- Documentation mandatory for shared libraries

---

## Architecture Decision Records

### ADR-001: Monorepo Structure

**Decision**: Use monorepo for all Shell and Remote applications
**Rationale**: Unified tooling, easier dependency management, simplified CI/CD
**Trade-off**: Requires build orchestration, larger repository size

### ADR-002: Runtime Module Federation

**Decision**: Use Webpack Module Federation for runtime integration
**Rationale**: Deploy remotes independently, load on-demand, version isolation
**Trade-off**: Complexity in configuration, runtime loading overhead

### ADR-003: Shell as Orchestrator

**Decision**: Shell manages global concerns, Remotes own domain logic
**Rationale**: Clear separation of concerns, scalable team structure
**Trade-off**: Shell becomes critical dependency for all remotes

### ADR-004: Domain-Driven Boundaries

**Decision**: Map remotes to business domains (Auth, Finance, HR, Supply)
**Rationale**: Aligns with business organization, clear ownership
**Trade-off**: Cross-domain features require integration coordination

### ADR-005: Shared Library Tiering

**Decision**: Three-tier shared library strategy (Foundation, Cross-Domain, Internal)
**Rationale**: Balance code reuse with autonomy, minimize coupling
**Trade-off**: Governance overhead for shared libraries

---

## Next Steps (Post-Architecture Approval)

After this architecture is approved:

1. **Phase 2**: Technical implementation planning (tooling, configs, scripts)
2. **Phase 3**: Shell application setup
3. **Phase 4**: First remote creation (Authentication)
4. **Phase 5**: Integration and testing
5. **Phase 6**: Additional remotes rollout

**Phase 1 ends here. No implementation until architecture is approved.**
