---
title: Detail list
description: The Detail list component shows a list of key information to users.
layout: page
label: Core

---

## Usage

Detail list displays a list with labels. This surfaces and highlights key information to users.

Each row of the Detail list comprises a:
- a label - a description or information (e.g. Location)
- content - the detail (e.g. East Gippsland).

It's used to display:
- metadata such as ‘Published date', which displays as day, month, year (e.g. 22 March 2023)
- the status of a program or grant (e.g. Opening soon, Closed).

Only use the detail list for simple information. For data or complex information, consider using a table.

::DocsExample
---
id: core-containers-description-list--with-link
---
::

### When and how to use
- Try to use single words for the label.
- Include a link if you need to.
- Keep the labels and summary content clear and concise.
- Align all summary content to the longest label.

### When and how not to use
- Don't use labels for unrelated summary content.
- Don't use to surface information that is not important to users.
- Don't use with complex or long-form content.
- Don’t use icons unrelated to the content.
- Don’t use icons that are not universally understood.

---
## Variants

Detail list has two variants:
- Default
- Icon.

### Default
The default variant displays a label followed by the content. This should be used as a first choice. 

::DocsExample
---
id: core-containers-description-list--default-story
---
::

### Icon
The icon variant displays an icon next to content. Use the icon variant for displaying information such as the status of a program or grant. 

It should only be used when meaningful and universally understood icons can be used for all list items.

::DocsExample
---
id: core-containers-description-list--icons-only
---
::

---
  
## Theming

When a link is present, the Detail list uses the link colour for interaction states.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-containers-description-list--with-link
  ---
  ::
::

To create your own theme, see [theming guidance for designers]() or [theming guidance for developers]().
