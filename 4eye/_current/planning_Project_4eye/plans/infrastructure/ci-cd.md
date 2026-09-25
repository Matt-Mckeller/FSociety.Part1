# I5 — CI/CD

> GitHub Actions pipelines for Terraform automation and application deployment.

**Status:** Partially Implemented
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md)
**Reference:** [infrastructure-as-code/bootstrap/](../../../infrastructure-as-code/bootstrap/)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CI/CD PIPELINE                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  GitHub Repository                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Push/PR Event                                                       │   │
│  │       │                                                              │   │
│  │       ▼                                                              │   │
│  │  ┌─────────────────────────────────────────────────────────────┐    │   │
│  │  │  GitHub Actions Runner                                       │    │   │
│  │  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │    │   │
│  │  │  │  Lint & Test  │  │  Build Image  │  │   Deploy       │   │    │   │
│  │  │  │  (parallel)   │  │  (Artifact    │  │   (Helm +      │   │    │   │
│  │  │  │               │  │   Registry)   │  │   kubectl)     │   │    │   │
│  │  │  └───────────────┘  └───────────────┘  └───────────────┘   │    │   │
│  │  └─────────────────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Workload Identity Federation                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  GitHub OIDC Token → GCP IAM → Service Account → Deploy to GKE      │   │
│  │  (No service account keys stored in GitHub)                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Design Decisions

| Decision | Choice | Alternatives | Rationale |
|----------|--------|--------------|-----------|
| CI/CD Platform | **GitHub Actions** | GitLab CI, Jenkins | Native GitHub, good GCP support |
| Authentication | **Workload Identity** | Service Account Keys | No secrets to rotate, GCP best practice |
| Container Registry | **Artifact Registry** | GCR, Docker Hub | GCP-native, vulnerability scanning |
| Deployment | **Helm** | Kustomize, raw manifests | Templating, values per environment |
| IaC Automation | **Manual approval** (prod) | Full auto | Safety for infrastructure changes |

---

## Workflows

### 1. Application CI (`ci.yml`)

```yaml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run test

  build:
    needs: [lint, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - run: docker build -t api -f docker/api.Dockerfile .
      - run: docker build -t web -f docker/web.Dockerfile .
```

### 2. Application Deploy (`deploy.yml`)

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    environment: staging
    permissions:
      contents: read
      id-token: write  # For Workload Identity

    steps:
      - uses: actions/checkout@v4

      - id: auth
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: ${{ secrets.WIF_PROVIDER }}
          service_account: ${{ secrets.GCP_SA_EMAIL }}

      - uses: google-github-actions/setup-gcloud@v2

      - name: Build and Push
        run: |
          gcloud auth configure-docker us-central1-docker.pkg.dev
          docker build -t us-central1-docker.pkg.dev/four-eye-ai-01/four-eye/api:${{ github.sha }} -f docker/api.Dockerfile .
          docker push us-central1-docker.pkg.dev/four-eye-ai-01/four-eye/api:${{ github.sha }}

      - name: Deploy to GKE
        run: |
          gcloud container clusters get-credentials four-eye-staging-gke --zone us-central1-a
          helm upgrade --install four-eye ./charts/four-eye \
            --namespace four-eye \
            --set api.image.tag=${{ github.sha }} \
            --set web.image.tag=${{ github.sha }}
```

### 3. Terraform Plan (`terraform-plan.yml`)

```yaml
name: Terraform Plan

on:
  pull_request:
    paths:
      - 'infrastructure-as-code/**'

jobs:
  plan:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
      pull-requests: write

    strategy:
      matrix:
        layer: [01-infrastructure-foundation, 02-databases, 03-applications]
        environment: [development]

    steps:
      - uses: actions/checkout@v4

      - id: auth
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: ${{ secrets.WIF_PROVIDER }}
          service_account: ${{ secrets.GCP_SA_TERRAFORM }}

      - uses: hashicorp/setup-terraform@v3

      - name: Terraform Plan
        working-directory: infrastructure-as-code/environments/${{ matrix.environment }}/${{ matrix.layer }}
        run: |
          terraform init
          terraform plan -no-color -out=tfplan

      - name: Comment PR
        uses: actions/github-script@v7
        with:
          script: |
            // Post plan output as PR comment
```

### 4. Terraform Apply (`terraform-apply.yml`)

```yaml
name: Terraform Apply

on:
  push:
    branches: [main]
    paths:
      - 'infrastructure-as-code/**'
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy'
        required: true
        default: 'development'
        type: choice
        options: [development, staging, production]

jobs:
  apply:
    runs-on: ubuntu-latest
    environment: ${{ github.event.inputs.environment || 'development' }}
    # ... similar to plan but with terraform apply
```

---

## Environment Promotion

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ development │ ──▶ │   staging   │ ──▶ │ production  │
│  (auto)     │     │   (auto)    │     │  (manual)   │
└─────────────┘     └─────────────┘     └─────────────┘
      │                   │                   │
      ▼                   ▼                   ▼
  Push to main      Merge to main       GitHub Release
  in feature PR     after review        or manual trigger
```

---

## Workload Identity Setup

```terraform
# bootstrap/main.tf (simplified)
resource "google_iam_workload_identity_pool" "github" {
  project                   = var.project_id
  workload_identity_pool_id = "github-pool"
}

resource "google_iam_workload_identity_pool_provider" "github" {
  project                            = var.project_id
  workload_identity_pool_id          = google_iam_workload_identity_pool.github.workload_identity_pool_id
  workload_identity_pool_provider_id = "github-provider"
  
  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.repository" = "assertion.repository"
  }
  
  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}

resource "google_service_account_iam_binding" "github_actions" {
  service_account_id = google_service_account.github_actions.name
  role               = "roles/iam.workloadIdentityUser"
  
  members = [
    "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github.name}/attribute.repository/your-org/4eye"
  ]
}
```

---

## Acceptance Criteria

### MVP
- [ ] Workload Identity Federation configured
- [ ] CI workflow runs lint/test on PRs
- [ ] Docker images pushed to Artifact Registry
- [ ] Auto-deploy to development on main push
- [ ] Terraform plan comments on infrastructure PRs

### Phase 2
- [ ] Staging auto-deploy after development success
- [ ] Production deploy with manual approval
- [ ] Terraform apply automation with state locking
- [ ] Canary deployments for production
- [ ] Rollback automation on failure
