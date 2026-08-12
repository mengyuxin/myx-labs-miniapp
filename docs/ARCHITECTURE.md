# ARCHITECTURE.md

## Phase 1 Architecture

MYX Labs Mini Program uses a native WeChat Mini Program structure with TypeScript, WXML, WXSS, and JSON.

```text
Page
 ↓
Service
 ↓
Static Data
 ↓
Type
```

UI reuse follows:

```text
Page
 ↓
Component
```

## Directory Layout

```text
miniprogram/
├── pages/
│   ├── home/
│   ├── projects/
│   ├── project-detail/
│   └── about/
├── components/
│   ├── project-card/
│   ├── section-header/
│   └── empty-state/
├── data/
├── services/
├── types/
├── utils/
├── assets/
├── app.ts
├── app.json
└── app.wxss
```

## Data Flow

Pages call service modules and do not import static data directly.

- `ProjectService` reads from `data/projects.ts`.
- `ProfileService` reads from `data/profile.ts`.
- Pages receive stable `Project` and `Profile` objects from services.
- Project detail navigation passes only an `id`.

This keeps the Page layer stable if static data is later replaced by an API, CMS, or WeChat Cloud Development.

## Navigation

TabBar pages:

- `pages/home/home`
- `pages/projects/projects`
- `pages/about/about`

Secondary page:

- `pages/project-detail/project-detail`

Project detail links use:

```text
/pages/project-detail/project-detail?id=project-id
```

## External Links

Phase 1 does not open arbitrary external URLs directly. Project and website URLs are copied to the clipboard so the implementation stays compatible with WeChat Mini Program domain and web-view constraints.

