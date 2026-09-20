# DQMS Super Admin Frontend Demo

A backend-free Next.js demonstration.

## Pages

- `/platform` - Platform Overview dashboard
- `/platform/templates` - Template Library

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The root route redirects to `/platform`.

## Working demonstration features

- Responsive platform navigation
- Overview metrics and template adoption data
- Search templates by name or industry
- Filter by industry and publication status
- Grid/list layout switch
- Create template modal
- Duplicate templates
- Publish/archive templates
- Preview and manage demo messages
- Browser persistence with `localStorage`
- Reset demonstration data

No backend or database is required. Template data persists in the current browser only.
