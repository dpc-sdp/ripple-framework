---
title: Tokens
description: Tokens are a fundamental part of the design system, providing a centralized repository of design attributes that can be reused across all design and development projects.
layout: default
---

## What are Tokens?

Tokens are a set of variables that define key attributes of a design, such as colors, typography, spacing, and other design attributes. These variables are defined once and used throughout a design system, allowing designers and developers to create consistent and cohesive interfaces.

Tokens provide a single source of truth for design attributes, which means that all members of the design and development team can refer to the same set of variables, ensuring consistency across all interfaces.

## Types of Tokens

Tokens can be broken down into various types, including:

- **Color Tokens:** Define a set of colors to be used throughout a design system.
- **Typography Tokens:** Define the typography for various parts of an interface, such as headings, body text, and captions.
- **Spacing Tokens:** Define the spacing between different elements on an interface, such as margins and padding.
- **Border Tokens:** Define the borders of different elements, such as line weight, style, and color.
- **Icon Tokens:** Define the icons that will be used throughout a design system.

## How to Use Tokens

Tokens are used by referencing their variable name in the CSS, rather than using hard-coded values. This makes it easy to update design attributes throughout an interface without having to manually update each instance of the attribute.

For example, instead of hard-coding a color value in CSS:

```css
.my-button {
  background-color: #0078d7;
  color: #fff;
}
```

You would use a color token:

```css
.my-button {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}
```

This allows you to easily update the color of the button by changing the value of the color token, rather than having to update each instance of the button.

## Conclusion

Tokens are a crucial component of a design system, providing a centralized repository of design attributes that can be easily reused throughout all design and development projects. By using tokens, designers and developers can ensure consistency and cohesiveness across all interfaces, making it easier to maintain and update designs over time.
