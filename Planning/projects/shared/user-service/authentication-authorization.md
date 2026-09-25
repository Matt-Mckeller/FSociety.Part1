## Core Features

## Requirements
- Will need to have specific handling for different user types
- Will need to support different applications?
- Will need logging, password resets, management pages
- Will need compliance
- Will need data residency
- Will need to have different restrictions based on the account type / user type
- Will need to have different restrictions and features based on the age
- May even need to have different restrictions/features based on the configuration settings by organizations
- Centralized point of access for External Providers ( EdLink, Firebase or Auth0 )
- Has User Roles, Permissions
- Has Centralized UserID Value
- Will need to handle emailing myself due to multiple user types etc

## Few Shot Examples / User Stories/User Journeys?
- Todo Provide


## Common Fraud needs
- VPN Detection
- IP Reputation, Bot Detection


### Authentication & User Management
- User accounts / profiles
- Password reset flows
- Email verification
- OAuth2 / OIDC / SAML support (SSO)
- Social login (Google, Apple, Facebook, etc.)

### RBAC & Permissions
- User Roles (Multiple Per Account)
- User Permissions (Per Role & Able to be individually assigned)

### Security
- MFA / TOTP / WebAuthn (passkeys)
- Rate limits, anomaly detection, brute-force protection
- Fraud detection / anomaly detection / bot protection

### Multi-Tenancy
- Organization/tenant/multi-account models (multi-tenant support)

### Administration & Monitoring
- Admin dashboard
- Logs, audit trails, analytics
- User management APIs

### Customization & Integration
- Webhooks, event streaming, and extensibility (functions/hooks)

### Compliance & Enterprise
- Compliance (SOC2, ISO, GDPR)
- Data residency options (enterprise)

---

# Other Requirements
- Exportable NestJS Decorators For querying roles & persmissions about a user
- Access Endpoints for other apps
- API Key Management
- APP Scope ( Shared Accounts Between Apps, Different Accounts Between Apps )
- Roles & Permissions will need to be seeded
- Test Env & Test Accounts


## Eventually will need custom built fraud/alerts etc
- Student normally accesses during school hours (8am-3pm)
- VPN, Device Fingerprinting, Different Accounts
- Automated Alerting
- Etc