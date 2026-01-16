# Branch Protection Setup Guide

This guide explains how to set up branch protection rules so that pull requests require passing tests before they can be merged.

## Required Status Checks

The following status checks must pass before a PR can be merged:

### For `dev` Branch:
- ✅ **Unit Tests** (from `tests.yml`)
- ✅ **PR Validation** (from `pr-validation.yml`)
- ✅ **E2E Tests** (optional, from `tests.yml`)

### For `main` Branch:
- ✅ **Unit Tests** (from `tests.yml`)
- ✅ **PR Validation** (from `pr-validation.yml`)

## Setting Up Branch Protection

### Step 1: Go to Repository Settings

1. Navigate to your repository: `https://github.com/waqarqazi/nsx-demo-rn`
2. Click on **Settings** tab
3. Click on **Branches** in the left sidebar

### Step 2: Add Branch Protection Rule for `dev` Branch

1. Click **Add branch protection rule**
2. In **Branch name pattern**, enter: `dev`
3. Enable the following options:

   ✅ **Require a pull request before merging**
   - ✅ Require approvals: `1` (or more as needed)
   - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require review from Code Owners (if you have CODEOWNERS file)

   ✅ **Require status checks to pass before merging**
   - ✅ Require branches to be up to date before merging
   - In **Status checks that are required**, add:
     - `Unit Tests`
     - `PR Validation`
     - `E2E Tests` (optional)

   ✅ **Require conversation resolution before merging**

   ✅ **Do not allow bypassing the above settings**

4. Click **Create** or **Save changes**

### Step 3: Add Branch Protection Rule for `main` Branch

1. Click **Add branch protection rule** again
2. In **Branch name pattern**, enter: `main`
3. Enable the following options:

   ✅ **Require a pull request before merging**
   - ✅ Require approvals: `2` (recommended for production)
   - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require review from Code Owners

   ✅ **Require status checks to pass before merging**
   - ✅ Require branches to be up to date before merging
   - In **Status checks that are required**, add:
     - `Unit Tests`
     - `PR Validation`

   ✅ **Require conversation resolution before merging**

   ✅ **Require linear history** (optional, for cleaner git history)

   ✅ **Include administrators** (recommended)

   ✅ **Do not allow bypassing the above settings**

4. Click **Create** or **Save changes**

## Workflow Status Check Names

The status checks that appear in GitHub are named after the job names in workflows:

- **Unit Tests** - From `tests.yml` → `unit-tests` job
- **E2E Tests** - From `tests.yml` → `e2e-tests` job  
- **PR Validation** - From `pr-validation.yml` → `validate-pr` job

## How It Works

1. **Developer creates PR** from `dev-waqar` → `dev` or `main`
2. **GitHub Actions automatically runs**:
   - `tests.yml` workflow (Unit Tests + E2E Tests)
   - `pr-validation.yml` workflow (PR Validation)
3. **Status checks appear** in the PR page
4. **Merge button is disabled** until all required checks pass ✅
5. **Once all checks pass**, the PR can be merged

## Testing the Setup

1. Create a test branch:
   ```bash
   git checkout -b test-pr-validation
   ```

2. Make a small change (e.g., add a comment)

3. Push and create PR:
   ```bash
   git add .
   git commit -m "Test PR validation"
   git push origin test-pr-validation
   ```

4. Create PR on GitHub from `test-pr-validation` → `dev`

5. Verify that:
   - ✅ Status checks are running
   - ✅ Merge button is disabled until checks pass
   - ✅ After checks pass, merge button becomes enabled

## Troubleshooting

### Status checks not appearing?

1. **Check workflow files are in `.github/workflows/`**
2. **Verify workflow triggers include `pull_request`**
3. **Check workflow syntax is valid** (no YAML errors)
4. **Wait a few minutes** - GitHub needs to detect new workflows

### Can't see required status checks in branch protection?

1. **Run the workflow at least once** - GitHub needs to see the job names
2. **Check job names match** what you're adding in branch protection
3. **Refresh the branch protection page**

### Tests passing but still can't merge?

1. **Check all required status checks are listed** in branch protection
2. **Verify "Require branches to be up to date"** - you may need to update your branch
3. **Check if approvals are required** - you may need reviewer approval

## Best Practices

1. **Always require PRs** - Never allow direct pushes to `main` or `dev`
2. **Require at least 1 approval** for `dev`, 2 for `main`
3. **Keep status checks fast** - Unit tests should complete quickly
4. **Make E2E tests optional** - They can be slower, make them non-blocking if needed
5. **Use CODEOWNERS** - Automatically request reviews from relevant team members

## Example Branch Protection Configuration

```
Branch: dev
├── Require pull request reviews: 1 approval
├── Require status checks:
│   ├── Unit Tests ✅
│   ├── PR Validation ✅
│   └── E2E Tests (optional) ⚠️
└── Require conversation resolution ✅

Branch: main
├── Require pull request reviews: 2 approvals
├── Require status checks:
│   ├── Unit Tests ✅
│   └── PR Validation ✅
├── Require conversation resolution ✅
└── Require linear history ✅
```

## Next Steps

After setting up branch protection:

1. ✅ Create a test PR to verify it works
2. ✅ Document the process for your team
3. ✅ Set up CODEOWNERS file (optional)
4. ✅ Configure required reviewers (optional)

Your PRs will now be protected and require passing tests before merge! 🎉
