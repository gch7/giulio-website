# Sanity CMS User Guide - Gamma Capital

## 📋 Table of Contents
1. [Logging into Sanity Studio](#1-login-to-sanity-studio)
2. [Managing Pages](#2-managing-pages)
3. [Editing Content](#3-editing-content)
4. [Managing Images](#4-managing-images)
5. [Preview](#5-preview)
6. [Publishing Content](#6-publishing-content)
7. [Site Settings](#7-site-settings)

---
## 1. Logging into Sanity Studio

### Accessing Studio
- **URL**: `https://your-sanity-studio-url.sanity.studio`
- Or run locally: `cd sanity && npm` Run dev` → Access `http://localhost:3333`

### Log in
1. Click **"Log in"**
2. Choose a login method (Google, GitHub, or Email)
3. After logging in, you will see the content management interface

---

## 2. Manage Pages

### Create a new page
1. Click **"Pages"** in the left sidebar
2. Click the **"+ Create new""** button or the **+** icon

3. Fill in the information:

- **Page Title**: Page name (required)

- **Slug**: Page URL (automatically generated from the title, can be adjusted)

- **Is Homepage?**: Check if this is the homepage

### Add a Section to the page
1. In the **"Page Sections"** section, click **"Add item"**

2. Choose the type of section:

- **Hero Section**: Header banner with large title, CTA buttons

- **What We Do**: Displays a list of services

- **CTA Section**: Call-to-action block

- **Three Cards**: 3 peer-to-peer service cards

- **Rich Text**: Free-form text content

### Deleting a page
1. Open the page to be deleted
2. Click the **"..."** menu in the upper right corner

3. Select **"Delete"**

---

## 3. Editing content

### Editing text
1. Click on the text field you want to edit
2. Type the new content
3. The content will automatically be saved as a draft

### Editing a link/button
1. Find the **CTA Button** or **Link** field
2. Change:

- **Text**: Content displayed

- **Href**: Path (e.g., `/memberships`, `/contact`)

- **Variant**: Display style (primary, secondary, ghost)

### Adding/deleting cards in a section
1. Open the section (Hero, What) We Do, etc.)
2. Find **"Feature Cards"** or **"Services"**
3. Click **"Add item"** to add a new card
4. Drag and drop to arrange the order
5. Click the **🗑️** icon to delete

---

## 4. Image Management

### Uploading a New Image
1. Click on the **Image** field
2. Select **"Upload"** or drag and drop the file
3. Supported formats: JPG, PNG, WebP, GIF

### Selecting an Image from the Media Library
1. Click on the **Image** field
2. Select **"Select from library"**
3. Browse and select an existing image

### Cropping/Adjusting Images
1. After uploading, click **"Edit"**

2. Use **Hotspot** to select the focus area
3. The image will automatically crop intelligently when displayed

---
## 5. Preview

### Preview before publishing
1. **Draft content** (not yet published) can be previewed.
2. Access: `https://your-website.com/api/draft?slug=PAGE_SLUG&secret=YOUR_SECRET`
3. The page will display with the **"Draft Mode"** banner in the bottom corner.

### Exit Preview Mode
- Click **"Exit"** on the Draft Mode banner
- Or access: `/api/disable-draft`

---

## 6. Publish Content

### Publishing Process
1. **Draft**: All new changes are drafts.

2. **Review**: Review the content in Studio.

3. **Publish**: Click the green **"Publish"** button.

### Publish Button

- Located in the **bottom right** corner of the editor.

- Green when there are unpublished changes.
- After publishing, the website will update in **60 seconds**.

### Rollback (Old version)
1. Click the **"..."** menu
2. Select **"History"**
3. View previous versions
4. Click **"Restore"** to revert

---

## 7. Site Settings

### Accessing Site Settings
1. Click **"Site Settings"** in the sidebar (with the ⚙️ icon)

2. This is where you manage site-wide information

### Editable Items

#### Navigation (Menu)
- **Site Name**: Website name
- **Logo**: Upload logo
- **Logo Text**: Replacement text if no logo
- **Navigation Menu Items**: Menu items
- **Navigation CTA Button**: CTA button on the menu

#### Footer
- **Footer Description**: Short description
- **Social Media Links**: Social media links
- **Footer Link Columns**: Link columns
- **Contact Email**: Contact email
- **Copyright Text**: Copyright text
- **Disclaimer**: Disclaimer

#### SEO
- **Default SEO Title**: Default SEO title
- **Default Meta Description**: SEO description
- **Default OG Image**: Image when sharing on social media

---

## 💡 Useful Tips

1. **Auto-save**: All changes are automatically saved as drafts

2. **No data loss**: You can always revert to the previous version
3. **60 seconds**: After publishing, the website updates within a maximum of 60 seconds
4. **Keyboard shortcuts**:

- `Cmd/Ctrl + S`: Save draft

- `Cmd/Ctrl + Enter`: Publish

---
## 🆘 Support

If you encounter any problems, contact:

- Email: developer@example.com

- Sanity documentation: https://www.sanity.io/docs