---
title: Getting Started
description: Minimal docs-site getting-started guide for eslint-plugin-stylelint-2.
---

# Getting Started

Install the package:

```bash
npm install --save-dev eslint-plugin-stylelint-2 eslint stylelint
```

Then enable the recommended preset:

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    ...stylelint2.configs.recommended,
];
```
