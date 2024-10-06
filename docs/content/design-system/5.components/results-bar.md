---
title: Results bar
description: Results bar displays the number of results in a list and allows a user to sort by their preferred option.
layout: page
label: Core

---

## Usage
Use the Results bar to:

- indicate the total number of results and how many per page are currently displayed 
- allow the user to sort the results by their preferred option.

The Results bar is made up of:

- a results counter 
- a sort options dropdown.

The results counter value will update the when a search term or filter is changed or applied. 

The sort dropdown allows the user to sort the results in the way that is most relevant to them. Sort options should be relevant to the content the user is searching. 

::DocsExample
---
id: 
---
::


### When and how to use
- Use on a site search page.
- Use to communicate the number of results displaying of the total number of results.

### When and how not to use
- Don’t use with sort options that are not relevant to the content.
- Don’t use with content or components other than results listing.

---

## Theming
Results bar uses colour for:

- interactive states
- icons.

The sort dropdown in an active state will adopt the same colour as the website’s focus state colour. This means a user’s experience of a the dropdown remains consistent while it transitions from the focus to an active state.

::DocsThemeChooser
  ::DocsExample
  ---
  id: 
  ---
  ::
::

To create your own theme see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming).

---

## Rationale
The active and focus states both use the site’s focus state colour. This creates a seamless user experience. If we used a different colour, keyboard users would have colour changes between focusing on and interacting with an input field. This could be jarring or confusing to users.

This occurs across all form and input elements, for a consistent experience.
