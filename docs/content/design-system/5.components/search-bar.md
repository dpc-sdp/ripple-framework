---
title: Search bar
description: Allow users to enter keywords and search content on the website.
layout: page
label: Core

---

## Usage

Search is useful for sites with a lot of pages. 

Users often rely on search to find the information they need. You can use it as an alternative to on-page navigation. 

The search bar includes:

- text - placeholder and input text
- search button label
- search button icon
- clear button icon
- optional predictive list - present suggested keywords to the user
- optional refine search link - expands to display filters to the user.

::DocsExample
---
id: core-navigation-search-bar--default-story
---
::

### How this component works 

#### Input text
Include short, descriptive placeholder text. This tells the user what they can search for.

The text the user inputs replaces the placeholder text.

#### Search button
The search button contains a button label and search icon.

Smaller devices show a responsive variant with:
- only a search icon
- no button label. 

Users know that a magnifying glass indicates a search function. Because of this, on small screens we don't pair it with the word 'search' due to space limitations. However, it is retained in the code for screen readers.

The search button must submit an action, which reduces the time it takes to use the search bar. A user can enter their own search word or select a suggestion if that option is available. The search submits once a user selects the ‘Search’ button or or hits their 'enter' or 'return' key.

The search keyword remains in the search bar when the search results load.

####  Predictive keyword list

Making suggestions can improve the user experience. This can lead to less spelling errors and less effort for the user to reach their result.

Useful suggestions can help guide users to their destination.

Keyword suggestions should be in a compact and organised list.

Provide suggestions after the user enters the third character. This reduces user effort. But don’t overwhelm users with a lot of suggestions. Keep the amount of suggestions under 10.

Allow for keyboard navigation through the suggestions:
- The user should be able to scroll through the items.
- Once the user goes past the last item, they should return to the top (and vice versa for upward keyboard scrolling).
- The Esc key should allow users to exit the list.

#### Clear button
The clear search button contains the clear symbol icon 'X'. This allows users to clear the input text from the search bar. 


### When and how to use

- Use the search bar for site search.
- Use the default search bar on a white page background
- Use the reverse search bar on a grey background
- Use the menu variant in the mega menu only
- Use only default and reverse variants with predictive list suggestions.
- Even if a label is hidden, retain it in code for screen readers.
- Keep placeholder text concise and descriptive.

### When and how not to use

- Don't use default or reverse variants in the mega menu.
- Don't use filters or refine search with the menu variant.
- Don't use multiline search inputs.
- Don't display the refine search link if no filters are available.

---

## Variants

The 3 search variants include:

- default
- reverse
- menu.

### Default

This is standard search. The button initiates search based on the text input.

::DocsExample
---
id: core-navigation-search-bar--default-story
---
::

### Reverse

Use the reverse variant when on a neutral background and you can't use the default variant.

::DocsExample
---
id: core-navigation-search-bar--reverse
---
::

### Menu

Use this in the mega menu. See [Primary Navigation](/design-system/components/primary-navigation/) for more information.

::DocsExample
---
id: core-navigation-search-bar--menu
---
::

---

## Theming

The search bar uses colour for:

- indicating an action to users
- interaction states.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-navigation-search-bar--default-story
  ---
  ::
  ::DocsExample
  ---
  id: core-navigation-search-bar--menu
  ---
  ::
::

To create your own theme, see [theming guidance for designers]() or [theming guidance for developers]().
