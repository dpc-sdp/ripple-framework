---
title: Media gallery
description: A series of images users can side-scroll through.
layout: page
label: Core
links:
- text: Figma
  url: #colour
- text: Storybook
  url: #component
---

## Usage

Media Gallery collects a series of related images into a gallery. It allows users to scroll through related images. It's best used for displaying images.

It combines images and text to give users context within the content.

Media will display either landscape or portrait at predefined ratios.

See [media](/design-system/components/media/) for information relating to file type, ratios and focal point.

::DocsExample
---
id: core-containers-media-gallery--default-story
---
::

### When and how to use

- Use with related images only
- Use at least 2 images
- Always use a media title
- Include an optional caption
- Use on any page type

### When and how not to use

- Don't use for decorative purposes
- Don't use sensory images
- Don't use for a single image. Consider using the [media embed](/design-system/components/media-embed/) component
- Don't use with media unrelated to page content

---

## Theming

Media embed uses colour for:

- icons
- indicating an interaction to users
- interactive states.

It also adopts its theming from the [pagination](/design-system/components/pagination/) component.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-containers-media-gallery--default-story
  ---
  ::
::

To create your own theme, see [theming guidance for designers](https://www.vic.gov.au) or [theming guidance for developers](https://www.vic.gov.au).