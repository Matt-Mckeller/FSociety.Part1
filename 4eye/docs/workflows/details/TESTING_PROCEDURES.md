# Testing Procedures

Concise testing guidelines for 4eye development.

---

## Testing Strategy

**Phase 0-3**: Manual testing only (move fast, iterate)  
**Phase 4+**: Add automated tests for stable features

---

## Manual Testing Checklist

### Before Committing
- [ ] Feature works in dev environment
- [ ] No TypeScript errors: `npm run type-check`
- [ ] No console errors in browser
- [ ] Tested happy path + 1-2 edge cases

### Before PR/Merge
- [ ] Tested on clean branch (`npm install` from scratch)
- [ ] Works in production build: `npm run build`
- [ ] Mobile responsive (if UI change)
- [ ] Works for non-admin users (if auth related)

### Before Deploy
- [ ] Staging environment tested
- [ ] Database migrations tested (if schema changes)
- [ ] Environment variables verified
- [ ] Rollback plan documented

---

## Automated Testing (Phase 4+)

### Unit Tests
- **Where**: `*.test.ts` next to source files
- **What**: Pure functions, utilities, hooks
- **Run**: `npm test`
- **Coverage**: Aim for 70%+ on critical paths

### Integration Tests
- **Where**: `__tests__/` folders
- **What**: API endpoints, GraphQL resolvers, database operations
- **Run**: `npm run test:integration`

### E2E Tests
- **Where**: `apps/4eye-web/__tests__/e2e/`
- **Tool**: Playwright
- **What**: Critical user flows (auth, room creation, transcription)
- **Run**: `npm run test:e2e`

---

## Testing Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Unit tests (when implemented)
npm test

# Integration tests (when implemented)
npm run test:integration

# E2E tests (when implemented)
npm run test:e2e

# All checks
npm run validate  # (create this script later)
```

---

## What to Test

### Priority 1 (Critical)
- Authentication (login, signup, logout)
- Room creation and access
- Live transcription pipeline
- Payment processing
- Data privacy (no PII leaks)

### Priority 2 (Important)
- AI chat responses
- Translation accuracy
- File uploads
- Real-time sync
- Notifications

### Priority 3 (Nice to Have)
- UI edge cases
- Loading states
- Error messages
- Accessibility

---

## When Things Break

### Development
1. Check console for errors
2. Verify npm packages installed
3. Clear Next.js cache: `rm -rf .next`
4. Restart dev server

### Production
1. Check logs: `kubectl logs [pod-name]`
2. Verify environment variables
3. Check database connectivity
4. Review recent deployments

---

## Testing AI Features

### Typed AI Responses (C8 System)
- Validate response matches TypeScript interface
- Verify Zod validation catches malformed responses
- Test with different AI models (GPT-4, Claude)
- Check handling of rate limits and errors

### Prompts
- Test with various input lengths
- Verify context window limits
- Check for prompt injection vulnerabilities
- Validate output quality across verticals

---

## Performance Testing

### Manual Checks
- Page load < 2s on fast connection
- Time to interactive < 3s
- No layout shift during load
- Smooth scrolling and interactions

### Tools (Future)
- Lighthouse CI for web vitals
- Load testing with k6 or Artillery
- Database query performance monitoring

---

## Security Testing

### Manual Checks
- [ ] Authentication required for protected routes
- [ ] User can only access own data
- [ ] No sensitive data in client-side code
- [ ] HTTPS enforced in production
- [ ] CSRF protection enabled
- [ ] Rate limiting on API endpoints

### Automated (Future)
- OWASP dependency scanning
- Secret scanning in git history
- Penetration testing before public launch

---

## Test Data

### Development
- Use seed scripts: `npm run db:seed`
- Create test accounts for each role
- Use dummy data generators for realistic content

### Staging
- Mirror production structure
- Anonymized real data (optional)
- Full integration with third-party services

### Production
- Real data only
- No test accounts
- Feature flags for gradual rollouts

---

## Quick Actions

### Review Code
```bash
# Check types
npm run type-check

# Lint code
npm run lint

# Check for security issues
npm audit

# See what changed
git diff
```

### Test Feature
```bash
# Start dev server
npm run dev

# Open in browser
open http://localhost:3000

# Check network tab for API calls
# Verify in database
```

### Verify Build
```bash
# Build for production
npm run build

# Start production server
npm start

# Test critical paths manually
```

---

## Testing Mindset

- **Manual first**: Don't over-automate early
- **Test what breaks**: Focus on critical paths
- **Fast feedback**: Quick manual tests > slow automated tests
- **Iterate**: Add automation as features stabilize
- **Ship fast**: Perfect tests later, working product now
