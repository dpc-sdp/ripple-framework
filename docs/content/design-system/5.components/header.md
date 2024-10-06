---
title: Header
description: The Header introduces the purpose and content of a page.
layout: page
label: Core

---

## Usage
The header informs the user what is on the page. The header must be used at the top of a page above the body content. 

It contains the page title styled as Heading 1 (H1). Optional content includes:
- introduction text
- journey links
- a call to action button, text and journey link
- image or corner graphics
- supporting campaign logo
- introduction banner.

::DocsExample
---
id: core-containers-header--default-journey-links
---
::

### When and how to use
- Keep the header simple. Trying to use all the available features (such as call to action and journey links) overwhelms and confuses users.
- Use clear calls-to-action that align with the page’s message or task.
- Only use images that add value to the content and support the message.
- Include with featured links and buttons to help users perform key tasks.
- Include an optional campaign logo.

### When and how not to use
- Don’t use a mix of reverse and default page title and introduction text styling.
- Don’t include the same links in the main banner and introduction banner.
- Don’t use with more than 6 journey links.
- Don’t overload with content.

---

## Variants

The header has 3 variants:

- default
- reverse
- image.

The default and reverse variants can be used with journey links or a call to action. This guides users to perform tasks or navigate to important information. They can display corner graphics to allow for brand recognition and visual prominence. They can also display a supporting campaign logo, if required.

The image variant can display a full-width or half-width background image.

The introduction banner can be used with all variants.

### Default

::DocsExample
---
id: core-containers-header--default-story
---
::

::DocsExample
---
id: core-containers-header--default-call-to-action
---
::

### Reverse

The reverse variant uses reversed blocked type for the title and introduction text. This adds visual prominence to the banner and information.

::DocsExample
---
id: core-containers-header--reverse-journey-links
---
::

::DocsExample
---
id: core-containers-header--reverse-call-to-action
---
::

### Image

An image can be added as a full or half-width background image. 

The full-width background image supports a title and introduction copy. It will always display as reversed-blocked type.

The half-width background image supports a title, introduction copy and an optional call to action. 

Images should not be stretched or have too low resolution. They should not be complex or include text.

::DocsExample
---
id: core-containers-header--image-reverse
---
::

::DocsExample
---
id: 
---
::

### Introduction banner

The introduction banner:
- can be used to add a content and call-to-action under the header banner
- has optional journey links or buttons
- has an optional icon that sits above the heading (H2).

::DocsExample
---
id: core-containers-header--intro-with-links
---
::

---

## Interaction with other components

When using a featured campaign banner with an image, the image can overlap the header depending on the amount of content. By default, this hides the header's bottom corner graphic.

If an Introduction banner is used, the featured campaign banner will display below that, so the bottom corner graphic will display.

::DocsImageExample
---
src: /assets/img/campaign-banner-behaviour.png
alt: 'A demonstration of the interaction between the Header component and the campaign banner, the campaign banner image slightly overlaps the header.'
---
::

---

## Theming

Headers can be themed in 2 ways:

- site colour palette
- neutral colour palette.

It will also adopt theming from the button component when displaying the call to action.

If you choose a neutral button style for your site, the header will display neutral-themed buttons.

### Site theme

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-containers-header--default-call-to-action
  ---
  ::
  ::DocsExample
  ---
  id: core-containers-header--reverse-journey-links
  ---
  ::
  ::DocsExample
  ---
  id: core-containers-header--intro-with-links
  ---
  ::
::

### Neutral theme

Implemented at a site level, headers can have a neutral theme option. This option is only applicable to the reverse-blocked type. Neutral headers have predefined neutral colour values that must be used; they cannot be edited or customised.

::DocsExample
---
id: core-containers-header--image-neutral
---
::

To create your own theme see [theming guidance for designers](https://www.vic.gov.au) or [theming guidance for developers](https://www.vic.gov.au).
