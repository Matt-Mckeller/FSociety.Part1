# F3 — Internationalization

> UI localization: multi-language interface, locale detection, RTL support, translation management.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [decisions.md](../decisions.md)

---

## Clarification: i18n vs Translation

| Concern | Module | What It Does |
|---------|--------|--------------|
| **i18n (this module)** | F3 | UI text localization ("Sign In" → "Iniciar sesión") |
| **Content Translation** | F2 | Sermon transcript translation |

F3 handles the **app interface**. F2 handles **user-generated content**.

---

## Technology Stack

| Component | Choice | Rationale |
|-----------|--------|-----------|
| i18n Library | next-intl | Purpose-built for Next.js App Router |
| Locale Detection | Browser + User pref | Fallback chain |
| Translation Format | JSON | Simple, widely supported |
| RTL | Logical CSS properties | Native browser support |

### Why next-intl?
1. **App Router native** — works with Server Components
2. **Type-safe** — catches missing translations at build
3. **Small bundle** — only loads needed locale
4. **Good DX** — interpolation, plurals, dates

---

## Supported UI Languages (MVP)

| Code | Language | Direction | Notes |
|------|----------|-----------|-------|
| en | English | LTR | Default |
| es | Spanish | LTR | |
| pt | Portuguese | LTR | Brazilian Portuguese |
| fr | French | LTR | |
| ar | Arabic | RTL | Requires RTL layout |
| zh | Chinese | LTR | Simplified |

Same languages as F2 translation — keeps it simple.

---

## Project Structure

```
frontend/
├── messages/
│   ├── en.json
│   ├── es.json
│   ├── pt.json
│   ├── fr.json
│   ├── ar.json
│   └── zh.json
├── src/
│   ├── i18n/
│   │   ├── config.ts
│   │   ├── request.ts
│   │   └── navigation.ts
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── (routes)/
│   │   └── layout.tsx
│   └── components/
│       └── LocaleSwitcher.tsx
```

---

## Configuration

### i18n/config.ts
```typescript
export const locales = ['en', 'es', 'pt', 'fr', 'ar', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
  fr: 'Français',
  ar: 'العربية',
  zh: '中文',
};

export const rtlLocales: Locale[] = ['ar'];

export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}
```

### i18n/request.ts
```typescript
import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './config';

export default getRequestConfig(async ({ locale }) => {
  // Validate locale
  if (!locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

### next.config.js
```javascript
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other config
};

module.exports = withNextIntl(nextConfig);
```

---

## Locale Detection Strategy

```
1. URL path (/es/dashboard)
   └── Yes? Use that locale
       └── No? Continue...

2. User.preferredLanguage (if logged in)
   └── Has preference? Use it
       └── No? Continue...

3. Cookie (NEXT_LOCALE)
   └── Has cookie? Use it
       └── No? Continue...

4. Browser Accept-Language header
   └── Match supported locale? Use it
       └── No? Use default (en)
```

### Middleware Implementation
```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: 'as-needed', // Only show /es/... for non-default
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
```

---

## Translation File Structure

### messages/en.json
```json
{
  "common": {
    "appName": "4eye",
    "loading": "Loading...",
    "error": "Something went wrong",
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "close": "Close"
  },
  "auth": {
    "signIn": "Sign In",
    "signUp": "Sign Up",
    "signOut": "Sign Out",
    "email": "Email",
    "password": "Password",
    "forgotPassword": "Forgot password?",
    "noAccount": "Don't have an account?",
    "hasAccount": "Already have an account?"
  },
  "session": {
    "startSession": "Start Session",
    "endSession": "End Session",
    "joinSession": "Join Session",
    "liveNow": "Live Now",
    "transcript": "Transcript",
    "translation": "Translation",
    "selectLanguage": "Select Language",
    "selectReadingLevel": "Reading Level",
    "readingLevels": {
      "child": "Simple",
      "standard": "Standard",
      "academic": "Academic"
    }
  },
  "room": {
    "createRoom": "Create Room",
    "inviteCode": "Invite Code",
    "copyLink": "Copy Link",
    "scanQR": "Scan QR Code",
    "noRooms": "No rooms yet"
  },
  "dashboard": {
    "welcome": "Welcome, {name}",
    "recentSessions": "Recent Sessions",
    "myRooms": "My Rooms",
    "savedRecordings": "Saved Recordings"
  },
  "errors": {
    "notFound": "Page not found",
    "unauthorized": "Please sign in to continue",
    "forbidden": "You don't have access to this resource"
  }
}
```

### messages/es.json
```json
{
  "common": {
    "appName": "4eye",
    "loading": "Cargando...",
    "error": "Algo salió mal",
    "save": "Guardar",
    "cancel": "Cancelar",
    "delete": "Eliminar",
    "edit": "Editar",
    "close": "Cerrar"
  },
  "auth": {
    "signIn": "Iniciar sesión",
    "signUp": "Registrarse",
    "signOut": "Cerrar sesión",
    "email": "Correo electrónico",
    "password": "Contraseña",
    "forgotPassword": "¿Olvidaste tu contraseña?",
    "noAccount": "¿No tienes cuenta?",
    "hasAccount": "¿Ya tienes cuenta?"
  },
  "session": {
    "startSession": "Iniciar sesión",
    "endSession": "Terminar sesión",
    "joinSession": "Unirse a sesión",
    "liveNow": "En vivo",
    "transcript": "Transcripción",
    "translation": "Traducción",
    "selectLanguage": "Seleccionar idioma",
    "selectReadingLevel": "Nivel de lectura",
    "readingLevels": {
      "child": "Simple",
      "standard": "Estándar",
      "academic": "Académico"
    }
  }
}
```

### messages/ar.json (RTL)
```json
{
  "common": {
    "appName": "4eye",
    "loading": "جاري التحميل...",
    "error": "حدث خطأ ما",
    "save": "حفظ",
    "cancel": "إلغاء",
    "delete": "حذف",
    "edit": "تعديل",
    "close": "إغلاق"
  },
  "auth": {
    "signIn": "تسجيل الدخول",
    "signUp": "إنشاء حساب",
    "signOut": "تسجيل الخروج",
    "email": "البريد الإلكتروني",
    "password": "كلمة المرور",
    "forgotPassword": "نسيت كلمة المرور؟",
    "noAccount": "ليس لديك حساب؟",
    "hasAccount": "لديك حساب بالفعل؟"
  }
}
```

---

## RTL Support

### Root Layout
```tsx
// app/[locale]/layout.tsx
import { isRTL, type Locale } from '@/i18n/config';

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const dir = isRTL(locale) ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### MUI RTL Configuration
```tsx
// providers/ThemeProvider.tsx
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { useLocale } from 'next-intl';
import { isRTL } from '@/i18n/config';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const dir = isRTL(locale as any) ? 'rtl' : 'ltr';

  const theme = createTheme({
    direction: dir,
    // ... other theme config
  });

  const cacheRtl = createCache({
    key: dir === 'rtl' ? 'muirtl' : 'mui',
    stylisPlugins: dir === 'rtl' ? [prefixer, rtlPlugin] : [prefixer],
  });

  return (
    <CacheProvider value={cacheRtl}>
      <MUIThemeProvider theme={theme}>
        {children}
      </MUIThemeProvider>
    </CacheProvider>
  );
}
```

### CSS Logical Properties
```tsx
// Use logical properties for automatic RTL
const styles = {
  // Instead of: marginLeft: 16
  marginInlineStart: 16,
  
  // Instead of: paddingRight: 8
  paddingInlineEnd: 8,
  
  // Instead of: textAlign: 'left'
  textAlign: 'start',
  
  // Instead of: borderLeft: '1px solid'
  borderInlineStart: '1px solid',
};
```

---

## Using Translations

### In Server Components
```tsx
// app/[locale]/dashboard/page.tsx
import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations('dashboard');

  return (
    <Box>
      <Typography variant="h4">
        {t('welcome', { name: 'John' })}
      </Typography>
    </Box>
  );
}
```

### In Client Components
```tsx
'use client';

import { useTranslations } from 'next-intl';

export function SessionControls() {
  const t = useTranslations('session');

  return (
    <Button onClick={handleStart}>
      {t('startSession')}
    </Button>
  );
}
```

### With Interpolation & Plurals
```json
{
  "sessions": {
    "count": "{count, plural, =0 {No sessions} =1 {1 session} other {# sessions}}"
  }
}
```
```tsx
t('sessions.count', { count: 5 }); // "5 sessions"
```

---

## LocaleSwitcher Component

```tsx
// components/LocaleSwitcher.tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { MenuItem, Select } from '@mui/material';

export function LocaleSwitcher() {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    
    // Also update user preference if logged in
    if (isAuthenticated) {
      updateUserPreference({ preferredLanguage: newLocale });
    }
  };

  return (
    <Select
      value={locale}
      onChange={(e) => handleChange(e.target.value as Locale)}
      size="small"
    >
      {locales.map((loc) => (
        <MenuItem key={loc} value={loc}>
          {localeNames[loc]}
        </MenuItem>
      ))}
    </Select>
  );
}
```

---

## Country-Specific Branding

> **Status**: Preliminary planning - to be detailed during implementation phase

Beyond text translation, different countries/regions may require customized visual branding including logos, color themes, typography, and shape styles.

### Logo Variants by Country/Region

The app should support displaying different logo variations based on user location or preference. This uses the ExpanseLogo V4 component with configurable shapes.

**Available Logo Shape Variants** (see ExpanseLogoV4 in Storybook):
- **Circle** (default) — Universal, balanced
- **Square** — Structured, formal (potential for some Asian markets)
- **Triangle** — Dynamic, directional
- **Mirroring** — Horizontal flip for RTL or reversed layouts

**Potential Country Mappings** (TBD during implementation):
```typescript
// Example configuration structure (to be refined)
export const countryBrandingConfig: Record<string, BrandingConfig> = {
  'US': { logoShape: 'circle', logoVariant: 'default' },
  'CN': { logoShape: 'square', logoVariant: 'simplified' },
  'AE': { logoShape: 'circle', logoVariant: 'arabic', horizontalMirror: true },
  // More countries TBD
};
```

### Theme Colors by Country/Region

Default theme color preferences may vary by country. Users can override, but initial defaults should be region-appropriate.

**Current 4eye Theme System** (see [MUI_THEME_SYSTEM.md](../../technical/MUI_THEME_SYSTEM.md)):
- 4 color themes: primary (purple), blue, green, orange
- Each with light/dark mode (8 variations total)

**Potential Default Theme Mappings** (TBD):
```typescript
// Example structure
export const countryThemeDefaults: Record<string, ThemePreference> = {
  'US': { colorTheme: 'primary', mode: 'light' },
  'CN': { colorTheme: 'primary', mode: 'dark' },
  'JP': { colorTheme: 'blue', mode: 'light' },
  // More countries TBD
};
```

### Typography by Country/Region

Different regions require different font families for optimal readability and cultural appropriateness.

**Font Requirements**:
| Region | Primary Font | Fallback | Notes |
|--------|--------------|----------|-------|
| Western (en, es, pt, fr) | Inter | System fonts | Default MUI setup |
| **China (zh-CN)** | **Noto Sans SC** | **PingFang SC, Microsoft YaHei** | **Simplified Chinese** |
| **Taiwan/HK (zh-TW)** | **Noto Sans TC** | **PingFang TC, Microsoft JhengHei** | **Traditional Chinese** |
| Arabic (ar) | IBM Plex Sans Arabic | System Arabic fonts | RTL support needed |
| Hebrew (he) | IBM Plex Sans Hebrew | System Hebrew fonts | Future consideration |

**Implementation Notes**:
- Load fonts conditionally based on locale (avoid loading all fonts globally)
- Use Next.js font optimization (`next/font/google`)
- Consider fallback chains carefully for CJK languages
- May need separate font weights for Chinese (Bold = 700 may not render well)

**Example Font Loading**:
```typescript
// fonts/index.ts
import { Inter } from 'next/font/google';
import { Noto_Sans_SC, Noto_Sans_TC } from 'next/font/google';
import { IBM_Plex_Sans_Arabic } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
export const notoSansSC = Noto_Sans_SC({ 
  subsets: ['chinese-simplified'],
  weight: ['400', '500', '700']
});
export const notoSansTC = Noto_Sans_TC({ 
  subsets: ['chinese-traditional'],
  weight: ['400', '500', '700']
});
export const plexArabic = IBM_Plex_Sans_Arabic({ 
  subsets: ['arabic'],
  weight: ['400', '500', '700']
});

// Font selector based on locale
export function getFontForLocale(locale: string) {
  if (locale === 'zh-CN') return notoSansSC;
  if (locale === 'zh-TW') return notoSansTC;
  if (locale === 'ar') return plexArabic;
  return inter;
}
```

### Region Detection Strategy

```
1. User profile country setting (if logged in)
   └── Has preference? Use it
       └── No? Continue...

2. IP geolocation (server-side)
   └── Detected country? Use it
       └── No? Continue...

3. Browser locale hint (navigator.language → country inference)
   └── Match supported region? Use it
       └── No? Use default (US/International)
```

### Configuration Structure (Proposed)

```typescript
// i18n/branding.ts
export interface RegionalBrandingConfig {
  // Logo
  logoShape?: 'circle' | 'square' | 'triangle';
  logoMirrored?: boolean;
  
  // Theme
  defaultColorTheme?: 'primary' | 'blue' | 'green' | 'orange';
  defaultMode?: 'light' | 'dark';
  
  // Typography
  fontFamily: string;
  fontFallback: string[];
  
  // Cultural preferences
  dateFormat?: string;
  numberFormat?: string;
  currencySymbol?: string;
}

export const regionalBranding: Record<string, RegionalBrandingConfig> = {
  // To be populated during implementation
};
```

### Future Considerations

- **Symbol Grid Localization** — Grid patterns may have cultural symbolism to consider
- **Color Symbolism** — Color meanings vary by culture (e.g., red = luck in China, danger in West)
- **Iconography** — Some icons may not translate well across cultures
- **Number Formats** — Date, time, currency display varies significantly
- **Calendar Systems** — Some regions use non-Gregorian calendars

### Implementation Timeline

This country-specific branding will be detailed and implemented:
1. **After** core i18n is functional (text translation working)
2. **After** 4eye theme system is finalized
3. **During** Phase 2/3 — international expansion planning

---

## API Surface

### Mutations
```graphql
type Mutation {
  # Update user's UI language preference
  updatePreferences(input: UpdatePreferencesInput!): User!
}

input UpdatePreferencesInput {
  preferredLanguage: String  # Also used by F2
  readingLevel: ReadingLevel # Also used by F2
  uiLocale: String           # F3 specific — UI language
  countryCode: String        # Country for regional branding
  colorTheme: String         # User's theme preference
  themeMode: String          # light/dark preference
}
```

> Note: `preferredLanguage` is for content translation (F2), `uiLocale` is for UI (F3). They're often the same but can differ.

---

## Type Safety

### Generate types from translation files

```typescript
// types/i18n.d.ts
import en from '../../messages/en.json';

type Messages = typeof en;

declare global {
  // Use type safe message keys!
  interface IntlMessages extends Messages {}
}
```

Now TypeScript will error if you use a missing translation key:
```tsx
t('auth.signIn');     // ✅ OK
t('auth.typoHere');   // ❌ Type error
```

---

## Dependencies

| Dependency | Why |
|------------|-----|
| C2 Auth | Store User.uiLocale preference |
| — | No other module dependencies |

---

## Environment Variables

```env
# Default locale (optional, defaults to 'en')
NEXT_PUBLIC_DEFAULT_LOCALE=en
```

---

## Acceptance Criteria

- [ ] UI renders in 6 languages (en, es, pt, fr, ar, zh)
- [ ] Locale detected from browser on first visit
- [ ] User can switch language via LocaleSwitcher
- [ ] Language preference persists (cookie + user profile)
- [ ] Arabic displays RTL correctly
- [ ] All button/label text is translated
- [ ] Date/time formatted per locale
- [ ] Number formatting per locale
- [ ] TypeScript catches missing translation keys
- [ ] SSR works correctly (no hydration mismatch)
- [ ] Bundle only includes current locale's translations
