# @darkmat/shared

Shared foundation for Dark Mat Member and Coach apps.

## Modules

- `theme` — color tokens, spacing, typography (`member` + `coach` variants)
- `ui` — Screen, Card, Button, Text, Input, Banner, Spacer, IconBadge
- `providers` — ThemeProvider, AuthProvider
- `auth` — guest sessions + role helpers
- `services` — Supabase client/auth + repository pattern
- `types` — shared domain models

Import examples:

```ts
import { Screen, Card, useAppTheme } from '@darkmat/shared';
import { createAttendanceRepository } from '@darkmat/shared/services';
```
