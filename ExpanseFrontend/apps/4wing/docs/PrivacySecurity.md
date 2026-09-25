# Privacy & Security

## Principles
- All data encrypted (TLS 1.3 in transit, AES-256 at rest)
- Explicit consent required before recording
- Role-based access control
- Auto-delete options / configurable retention
- HIPAA-aware design

---

## Consent
- Clear opt-in before recording
- Separate consent for audio vs video
- Revocable at any time
- Robot status light indicates recording state

## Access Control

| Role | Access |
|------|--------|
| Counselor | Full session data |
| Client | Filtered recaps, own data |
| Supervisor | Anonymized analytics |
| Admin | System config only |

## Data Retention
- Default: 90 days (configurable)
- Client can request deletion anytime
- Raw audio/video auto-purged after processing
- Summaries retained longer than recordings

---

## Compliance

### HIPAA
- No PHI without consent
- BAA available for healthcare orgs
- Audit logging for all access
- Secure disposal procedures

### Roadmap
- [ ] SOC 2 Type II
- [ ] HIPAA certification
- [ ] GDPR compliance

---

## Incident Response
- 24-hour breach notification
- Regular security audits
- Penetration testing schedule
