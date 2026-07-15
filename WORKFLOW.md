# Vague vs. Precise AI Prompting: Workflow Analysis

## The Experiment
This experiment contrasts two AI development workflows for building a User Profile Settings Form in React. Branch 1 (`feature/settings-vague`) was generated using a single, vague prompt. Branch 2 (`feature/settings-precise`) was generated using an engineering-grade prompt with strict constraints, executed via Google Antigravity's Manager Surface.

## Specific Mistakes Caught (Round 1)
The `git diff` between the vague and precise branches reveals significant architectural flaws in the unconstrained output:

- **Missing Verification & Test Infrastructure:** The `package.json` diff shows that the precise branch correctly provisioned a full testing environment (`vitest`, `jsdom`, and `@testing-library/react`), whereas the vague branch wrote code in isolation with zero verification steps.
- **State Management & Validation:** The vague branch relied on brittle `useState` declarations and standard HTML5 validation attributes (`required`, `minLength`). It completely failed to implement strict schema validation. The precise branch correctly implemented the optimized `react-hook-form` context mapped to `zod`.
- **Accessibility (a11y):** The vague branch omitted `aria-invalid` and `aria-describedby` attributes on inputs, making dynamic error messages invisible to screen readers. It also lacked explicit keyboard focus states, severely degrading keyboard navigation.

## Review Effort & Time Tracking
The time distribution completely flipped between the two rounds. 
- **Round 1 (Vague):** Prompting took under 5 seconds. However, the resulting code would require at least 30-45 minutes of manual developer refactoring to meet production standards, fix accessibility bugs, rewrite the state management, and manually configure the testing environment.
- **Round 2 (Precise):** Drafting the strict engineering prompt and reviewing the Antigravity Implementation Plan took about 5-7 minutes up front. Because the constraints were clear, the generated code was instantly production-ready, accessible, and included a functional test suite. 

## Conclusion
Round two felt slower initially due to the heavy prompting and plan-review phase, but it was drastically faster end-to-end. "Writing code" is no longer the bottleneck; writing strict specifications and verifying output is the actual engineering work.