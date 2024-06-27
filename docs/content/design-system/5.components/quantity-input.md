---
title: Quantity input
description: Allows users to input a number and increase or decrease the value with the increase and decrease controls.
layout: page
label: Core

---

## Usage
Quantity input allows users to enter a numerical value via the keyboard or incrementally increase or decrease a value using plus and minus buttons.

The Quantity input is normally used in forms. 

The Quantity input is similar to the Input field, but is only used with numerical values. 

::DocsExample
---
id: forms-
---
::

### How this component works
You must use a form label with a quantity input.

You can use an quantity input with:

- requirement label
- hint text.

#### Hint text

Hint text can be used to tell the user what or how to successfully complete an input field. For example, hint text can include:

- an overall description of the Quantity input
- specific increase or decrease values 
- minimum or maximum allowed quantities.
- Only use hint text when it’s needed. Don’t repeat the label. Don’t use it to keep the layout consistent with other fields in the form.


### When and how to use
- Always use a label for input fields.
- Use hint text to specify helpful information, such as minimum and maximum number values (e.g. ‘Minimum of # and maximum of #’).

### When and how not to use
- Never use an quantity input without a label.
- Don’t disable copy and paste.
- Don’t set a minimum or maximum input limit without explicitly saying this in the hint text.
- Don’t write ambiguous error messages; explain how the user can resolve the error.

---

## Variants
The Quantity input has 2 variants:
- default, used on white backgrounds
- reverse, used on neutral backgrounds.

### Default

::DocsExample
---
id: forms-
---
::

### Reverse

::DocsExample
---
id: forms-
---
::

### Error
All form inputs share error state styling.

Always provide clear error messages for all potential errors so users will understand why their input or selection was not valid.

When creating an error message for a quantity input, use the wording below.

**Error: quantity exceeds limit**
- Error message: ‘\[Quantity\] must be \[number\] or less'.
- Example: 'Quantity must be 50 or less'.

**Error: quantity is too low**
- Error message: ‘\[Quantityt\] must be \[number\] or more'.
- Example: 'Quantity must be 3 or less'.

**Error: quantity not within range**
- Error message: ‘\[Quantity\] must be between \[number\] and \[number\]'.
- Example: 'Quantity must be between 4 and 20'.

---

## Theming
Quantity input uses colour for:
- interactive states
- icons.

A Quantity input in an active state adopts the same colour as the site’s focus state colour so the user’s experience of the Quantity input is consistent as it transitions from a focus to an active state.

::DocsThemeChooser
  ::DocsExample
  ---
  id: forms-
  ---
  ::
::

To create your own theme see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming).

---

## Rationale
The active and focus states both use the site’s focus state colour. This creates a seamless user experience. If we used a different colour, keyboard users would have colour changes between focusing on and interacting with an input field. This could be jarring or confusing to users.

This occurs across all form and input elements, for a consistent experience.
