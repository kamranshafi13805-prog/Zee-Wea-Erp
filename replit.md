# Zee Wear ERP - Garment ERP System

## Overview
Zee Wear ERP is a garment Enterprise Resource Planning system designed to manage various aspects of a clothing business. It provides capabilities for managing articles, product variants, inventory (fabric, accessories, finished goods), production orders, user roles, and reporting. The system aims to streamline operations, enhance inventory control, and provide comprehensive insights for garment manufacturing and sales. Key features include SKU auto-generation, activity logging, image management, and a robust reporting suite.

## User Preferences
I want iterative development. Ask before making major changes.

## System Architecture
The system is built on a Next.js 16 frontend using the App Router, integrated with a custom Express server that mounts both Next.js and a local Express backend under `/api`. Styling is managed with Tailwind CSS v4, and UI components are custom-built in a shadcn/ui-style. The backend utilizes Express, Prisma ORM v6 with SQLite, and TypeScript. Authentication is handled with `bcryptjs` and `jsonwebtoken`.

**UI/UX Decisions:**
- Custom shadcn/ui-style components (Button, Card, Input, Badge, Toast).
- FilterPanel for reusable filtering across list pages.
- Client-side pagination.
- `PageShell` for consistent page layouts with live API fetching, debounced search, and pagination.
- Role-based access control influences UI elements (e.g., sidebar links, button visibility).
- Global search functionality.
- Dark mode support with theme toggle.
- Mobile optimization with responsive layouts, hamburger menus, and bottom sheet dialogs.

**Technical Implementations:**
- **Auth & Access Control:** JWT tokens for authentication, stored in `localStorage`. Route protection via `AuthGuard`. A custom permissions system allows dynamic control over page access and action capabilities for different user roles. Permissions are cached server-side for performance.
- **Image Management:** `multer` for image uploads, with images stored in `uploads/` and served via `/api/uploads`. Images are compressed to WebP format.
- **Reporting:** Comprehensive reporting module with 9 types of reports, dynamic filtering, summary statistics, table display, and Excel export via `exceljs`. Print-friendly CSS for reports.
- **Data Import/Export:** `exceljs` for bulk variant import. An admin-only backup system allows full database JSON export, including embedded images (base64), and handles ID mapping and duplicate detection during import.
- **SKU Auto-generation:** Automatic SKU generation for variants based on article name, color, and size.
- **Activity Logging:** Logs all stock movements and entity creation with user, action, and details.
- **Stock Constraints:** Enforces non-negative stock balances for variants, fabric, and accessories during stock-out operations.
- **Production Flow:** Production orders link to fabric consumption, automatically deduct fabric from stock, and auto-stock finished variants upon completion, tracking rejected quantities.
- **Purpose System:** Configurable custom purposes for stock in/out operations, managed via a settings page and used in reports.

**Feature Specifications:**
- **Core Modules:** Articles, Variants, Fabric, Accessories, Stock, Production Orders, Users, Reports, Activity Logs.
- **Data Management:** CRUD operations for all core entities with extensive filtering (search, collection, fabric, season, date range, etc.).
- **User Management:** Admin-only user management with role assignment (dev, admin, store, viewer). Dev role is a hidden super-admin.
- **Custom Purposes:** Allows defining and managing custom categories for stock movements.
- **Global Search:** Search across multiple entity types.
- **Reporting:** Provides detailed insights into stock, movements, production, and user activities.

## External Dependencies
- **Framework:** Next.js 16
- **Styling:** Tailwind CSS v4, `@tailwindcss/postcss`
- **UI Components:** Lucide React (icons)
- **Database:** Prisma ORM v6, SQLite (dev.db)
- **Authentication:** `bcryptjs`, `jsonwebtoken`
- **Excel Operations:** `exceljs`
- **File Uploads:** `multer`
- **Barcode:** `jsbarcode` (CODE128 format, client-side rendering)

## Recent Changes
- **2026-02-13:** Added barcode feature for variants
  - Optional unique `barcode` field on Variant model
  - Auto-generation format: ZW + timestamp(base36) + random chars
  - API: GET /variants/barcode/:barcode, POST /variants/generate-barcode/:sku
  - BarcodeDialog component with JsBarcode rendering, print support
  - Barcode column in variants table, barcode search across global search, reports
  - Backup/import includes barcode with duplicate detection
  - Excel import template updated with barcode column