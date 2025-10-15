# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.
# firebase

A web-based application for sport coach to communicate and manage player. 

Login

## System Tree

```
.
├── .env
├── README.md
├── apphosting.yaml
├── components.json
├── docs/
│   └── backend.json
├── next.config.ts
├── package.json
├── src/
│   ├── ai/
│   │   ├── dev.ts
│   │   ├── flows/
│   │   │   └── analyze-performance-data.ts
│   │   └── genkit.ts
│   ├── app/
│   │   ├── coach/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   ├── dashboard-client.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   ├── parent/
│   │   │   └── page.tsx
│   │   ├── player/
│   │   │   └── page.tsx
│   │   └── teams/
│   │       └── page.tsx
│   ├── components/
│   │   ├── FirebaseErrorListener.tsx
│   │   ├── app-shell.tsx
│   │   └── ui/
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── combobox.tsx
│   │       ├── command.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── multi-select-combobox.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       └── tooltip.tsx
│   ├── context/
│   │   └── app-context.tsx
│   ├── firebase/
│   │   ├── client-provider.tsx
│   │   ├── config.ts
│   │   ├── error-emitter.ts
│   │   ├── errors.ts
│   │   ├── firestore/
│   │   │   ├── use-collection.tsx
│   │   │   └── use-doc.tsx
│   │   ├── index.ts
│   │   ├── non-blocking-login.tsx
│   │   ├── non-blocking-updates.tsx
│   │   └── provider.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   └── lib/
│       ├── data.ts
│       ├── placeholder-images.json
│       ├── placeholder-images.ts
│       ├── types.ts
│       └── utils.ts
├── tailwind.config.ts
└── tsconfig.json
```