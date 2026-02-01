# Content Management System Handbook

Welcome to the Gamma Capital content management platform. This guide provides comprehensive instructions for managing your global institutional website, localized content, and professional service modules.

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Access the Dashboard
1. Open your browser and navigate to: `https://gammacap.ch/admin` (or `localhost:3000/admin` in development).
2. Click **"Log in"**.
3. Choose your preferred authentication method (Google, GitHub, or Email).

### Step 2: Live Visual Editing
1. From the dashboard, you can click the **"View Live"** button or use the **Preview** mode.
2. If you are in the **Preview** environment, you can click directly on page elements to be taken to their corresponding fields in the CMS.

---

## 🌍 Localization & Multi-Language

This platform supports **English (en)** and **Italian (it)**. There are two patterns for how content is translated:

### 1. Document-Level Translation (Pages)
For standard **Pages**, you create separate documents for each language. 
- Use the **Language Dropdown** at the top of the editor to switch between languages.
- You can use the **Visual Comparison** tool to see English and Italian versions side-by-side.

### 2. Field-Level Translation (Global Values)
For global settings like **UI Strings** and **Brand Settings**, translations are managed within a single document:
- You will see tabs or fields labeled with language codes.
- Ensure both versions are filled to avoid "fallback" indicators on the live site.

---

## 🗂️ Understanding the Dashboard

The sidebar is organized into three main categories:

| Category | Documents Included | Description |
|----------|--------------------|-------------|
| **Branding** | `Brand Settings` | Logos, Favicons, Social Media, and Contact Emails. |
| **Pages (Singleton)** | `Home`, `Consulting`, `Solutions`, `Memberships`, `Contact` | High-level pages with specialized, structured layouts. |
| **System** | `Site Settings`, `UI Strings` | Navigation menus, footers, system labels, and 404 pages. |
| **Page Builder** | `Pages` | Create custom landing pages using a flexible block system. |

---

## 📝 Document Reference

### 1. Brand Settings (Global)
**Location**: Dashboard → Brand Settings
- **Logos**: Primary, Light, and Dark variants for different sections.
- **Social Media**: Add platform URLs with icon auto-mapping.
- **Favicon**: Centralized management for browser tab icons.

### 2. Consulting Page (Services)
**Location**: Dashboard → Consulting Page
This page uses the **Service Section Navigator**:
- **Service Navigation**: Cards that appear at the top to jump to sections.
- **Service Sections**: Detailed descriptions for Portfolio Review, Strategy Design, etc.
- **Feature Matrix**: Add specific icons and short descriptors for each service pillar.

### 3. Site Settings (Structure)
**Location**: Dashboard → Site Settings
- **Navigation**: Manage the header menu, dropdown items, and the main CTA button.
- **Footer**: Managed as columns of links and global legal disclaimers.
- **Global SEO**: Default tracking titles and social sharing images.

---

## 🛠️ Working with Sections (Page Builder)

When creating or editing a **Page**, you can add, remove, and reorder the following blocks:

- **Hero High-Impact**: Large banner with GSAP-powered stats and badge highlights.
- **Solutions Grid**: Displays services in a clean, categorized grid layout.
- **Three Cards**: Focused feature highlight with large icons and descriptions.
- **Multi-Asset Row**: High-lighting specific asset classes (Real Estate, Crypto, etc.).
- **Rich Text Content**: Standard text block for legal pages or long-form descriptions.

---

## 🖼️ Image & Media Guidelines

| Asset Type | Recommended Spec | Tip |
|------------|------------------|-----|
| **Logo** | SVG or Transparent PNG | Use dark/light variants for better contrast. |
| **Hero Background** | 1920x1080px (WebP) | Keep focal points centered. |
| **OG Image** | 1200x630px | Essential for professional social sharing. |
| **Icons** | Selection from Lucide | Use "Icon Map" reference fields in CMS. |

---

## ✅ Best Practices

1. **Always use Alt Text**: Ensure every image has a description for SEO and Accessibility.
2. **Handle Slugs Carefully**: Do not change URL "Slugs" after a page is indexed by Google without setting up a redirect.
3. **Draft vs. Published**: Changes are auto-saved as **Drafts**. You must click the green **"Publish"** button to make them live globally.
4. **Localization Check**: Before publishing a new page, verify that its counterpart in the other language is also prepared to maintain a seamless user experience.

---

## 🆘 Troubleshooting

- **Changes not appearing?** Wait 60 seconds (CDN caching) or try a "Hard Refresh" (`Cmd + Shift + R`).
- **Validation Errors?** Check for missing required fields marked with a red asterisk.
- **Accidental Deletion?** Use the **History** tab in the top-right menu to restore a previous version of any document.

---

*Last Updated: February 2026*
