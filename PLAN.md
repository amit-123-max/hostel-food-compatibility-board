# Implementation Plan - SI26_P02 (Hostel Food Compatibility Board)
**Date:** 2026-09-06

## 1. Architectural Approach
I am treating the problem statement as a strict oracle. The expected output is already provided (D01 and D02 pass, count is 2, exact exclusion strings). 
I chose a "Functional Core, Imperative Shell" architecture. React will handle the UI view layer, but all business logic will remain in a pure, framework-agnostic JavaScript module.

## 2. 5-Step Plan
1. **Step 1: Data Contract (`src/data.js`):** Extract the exact residents, dishes, and initial budget (₹150).
2. **Step 2: Pure Rules Engine (`src/compatibility.js`):** Build a pure JS function for diet, allergen, and budget rules. Zero React dependencies, zero DOM interaction.
3. **Step 3: React UI Shell (`src/App.jsx`):** Build a declarative interface that calls the pure engine and renders `{ errors, compatible, exclusions, count }`.
4. **Step 4: View-Layer Search:** Implement search using React derived state (`Array.filter`). The search will narrow the view, but the computed compatible count remains untouched.
5. **Step 5: Edge Cases:** Implement strict validation for invalid states to ensure they clear the React UI completely.
## 6. AI Iteration & Rejection Log (2026-09-06)
- **Engine Generation:** The AI's first draft of `compatibility.js` failed the strict ordering contract. It appended `OVER_BUDGET` first instead of last, and iterated allergens in the wrong sequence. It also failed to implement the exact `INVALID_INPUT` error object shape.
- **Action:** I rejected the output, provided a corrective prompt enforcing the exact array-ordering rules and validation shapes required by the spec. This proves why business logic must be isolated and carefully verified.