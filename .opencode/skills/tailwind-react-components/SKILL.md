---
name: tailwind-react-components
description: Use when building or updating React 19 frontend components, pages, modals, or forms using Tailwind CSS v4, Lucide icons, and self-contained Convex hooks.
---

# Tailwind & React Components Skill

This skill governs the UI architecture, styling conventions, and component patterns for React 19 features in **Pequeños Exploradores**.

## 1. Design System & Tailwind CSS v4

- **Styling Engine:** Tailwind CSS v4 (`@import "tailwindcss";` in `src/styles/index.css`).
- **Color Palette:**
  - **Backgrounds:** Pastel tones such as `#C6E5D9` for primary page layouts.
  - **Text:** Dark slate `#1E293B` for headers and body text.
  - **Accents:** Pink (`text-pink-500`, `bg-pink-100`, `hover:bg-pink-200`) for primary highlights/buttons, Emerald (`bg-emerald-600`) for success/completion states, Sky and Orange for badges.
- **Typography:**
  - Section Headers: `.font-angkor` (e.g., `<h2 className="font-angkor text-[40px] text-[#1E293B]">`).
  - Subheadings: Bold sans-serif with drop shadows (e.g., `<h3 className="text-4xl font-bold text-pink-500 drop-shadow-sm">`).
- **Icons:** Always use `lucide-react` for all iconography (`Eye`, `Pencil`, `Check`, etc.).

## 2. Reusable Shared UI Primitives (`src/shared/`)

Always leverage existing shared components to maintain consistency:
- **`Modal`** (`@ui/Modal`): For dialog windows and detail views.
- **`List`** (`@ui/List`): For data tables and search filtering.
- **`FormLayout`** (`@shared/forms/FormLayout`): For standard form wrapper cards (`bg-white p-8 rounded-[30px] shadow-sm border border-gray-100`).
- **`BaseInput`, `BaseSelect`, `BaseSwitch`** (`@ui/...`): For form controls.

## 3. Self-Contained Component & Data Pattern

Components should be as self-contained as possible:
- **Independent Data Fetching:** Modals and pages should call their own Convex queries (`useQuery`) and mutations (`useMutation`) rather than drilling props through multiple layers.
- **Local State & Banners:** Track form inputs, editing toggles (`isEditing`), validation errors, and submission loading states (`isSubmitting`) using local `useState`. Render error feedback in clean inline banners (`bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm`).

### Example Feature Page Structure (`TeachersPage.tsx`):
```tsx
"use client";
import { useState } from "react";
import { List } from "@ui/List";
import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";
import { Eye } from "lucide-react";
import { TeacherDetailModal } from "@features/teachers/components/TeacherDetailModal";
import { FullTeacher } from "@shared/types/convex";

export default function Teachers() {
  const [selectedTeacher, setSelectedTeacher] = useState<FullTeacher | null>(null);
  const teachers = useQuery(api.teachers.queries.getTeachers);

  const columns = [
    { header: "N°", accessor: (_: FullTeacher, index: number) => index + 1 },
    { header: "Nombre", accessor: (t: FullTeacher) => t.name },
    { 
      header: "Grupos", 
      accessor: (t: FullTeacher) => (
        <button 
          onClick={() => setSelectedTeacher(t)}
          className="bg-orange-100 text-pink-600 px-3 py-1 rounded-full font-bold hover:bg-orange-200"
        >
          <Eye size={18} />
        </button>
      ) 
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#C6E5D9] flex flex-col p-8 px-6">
      <h2 className="font-angkor text-[40px] text-[#1E293B] font-normal mb-2 text-left">LISTA</h2>
      <h3 className="text-4xl font-bold text-pink-500 mb-8 drop-shadow-sm text-left">Seños</h3>
      <List<FullTeacher>
        data={teachers ?? []}
        columns={columns}
      />
      {selectedTeacher && (
        <TeacherDetailModal 
          teacher={selectedTeacher}
          isOpen={!!selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
        />
      )}
    </div>
  );
}
```
