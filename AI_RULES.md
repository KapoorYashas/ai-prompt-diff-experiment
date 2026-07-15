# Project Core Tech Stack
- React (Functional components, TypeScript)
- Tailwind CSS

# AI Engineering Rules

1. **Form State & Validation:** Never use uncontrolled inputs or standard `useState` for complex forms. All forms must use `react-hook-form` and validate schemas using `zod` before submission.
2. **Accessibility (a11y) Baseline:** Every form input must be explicitly linked to a `<label>` using the `htmlFor` attribute. Error messages must be dynamically tied to their inputs using `aria-invalid` and `aria-describedby`.
3. **Verification Loop:** Do not output component code in isolation. Always write the component, followed immediately by a React Testing Library test suite that verifies error states and focus management.