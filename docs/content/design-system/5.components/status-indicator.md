---
title: Status Indicator
description: Display the status of content or data set.  
layout: page
label: Core

---

## Usage
The Status indicator shows a user the current status of an ongoing process. 

It can be used for displaying information such as:

- the completion status of a set of recommendations or project milestones to be implemented
- the status or closing date of a job application or grant application.

The Status indicator will update dynamically based on its dataset. The Status indicator can show progression from right to left or left to right, depending on data requirements.

::DocsExample
---
id: 
---
::


### When and how to use
- Use with concise content and labels.
- Use the complex variant for datasets with multiple statuses.

### When and how not to use
- Don’t use with long or complex labels.
- Do not use to indicate the steps of a linear process such as a form.


---

## Variants
The status indicator has two main variants:

- default
- complex.

### Default
The default variant should be used for simple datasets such as:

- application status with the closing date or days remaining
- recommendations or project milestones when there are only 2 statuse, such as complete or incomplete.

::DocsExample
---
id: 
---
::

### Complex
The default variant should be used for complex datasets such as:

- recommendations or project milestones when there are multiple categories, such as complete, incomplete, in progress and on hold.

::DocsExample
---
id: 
---
::

---

## Theming
The Status indicator uses colour to: 

- add prominence to the status/es
- display different dataset categories.

::DocsThemeChooser
  ::DocsExample
  ---
  id: 
  ---
  ::
::

To create your own theme see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming).
