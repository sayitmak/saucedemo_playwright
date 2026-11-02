# saucedemo_playwright
# Sauce Demo Playwright Tests

[![Playwright Tests](https://github.com/sayitmak/saucedemo_playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/sayitmak/saucedemo_playwright/actions/workflows/playwright.yml)

End-to-end UI test automation for [Sauce Demo](https://www.saucedemo.com), a practice web store, built with **Playwright** and **TypeScript**.

## What's covered

- **Login error handling:** checks the exact error message for a bad login, then retries with valid credentials.
- **Data-driven bad logins:** 10 username/password combinations, run as separate tests from one data table.
- **Cart and checkout:** reads the order total, then finishes the purchase if it's under $100 or cancels if it isn't.
- **Reusable helpers:** shared login and checkout functions in `tests/functions.ts`.

## Tech

Playwright, TypeScript, Node.js, VS Code, GitHub Actions

## Project structure

```
tests/
  saucedemo.spec.ts   # test cases
  functions.ts        # reusable helper functions
.github/workflows/
  playwright.yml      # CI: runs tests on every push and pull request
playwright.config.ts  # Playwright settings
```

## Run it locally

```bash
npm ci
npx playwright install
npx playwright test saucedemo.spec.ts --project=chromium --headed
npx playwright show-report
```

## CI

Tests run automatically on GitHub Actions for each push to `main`. The HTML report is saved as a downloadable artifact on each run.hiow