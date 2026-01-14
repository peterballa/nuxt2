# Components structure

This project follows an Atomic Design–inspired structure, extended with domain-specific component groups.

## atoms

Small, reusable UI elements such as Button, Input, or Badge.
They contain little to no business logic and are purely presentational.

## molecules

Simple components composed of multiple atoms, for example SearchBar or FormRow.
They represent small, reusable UI blocks.

## organisms

Larger, section-level components built from atoms and molecules, such as Header, ProductGrid, or HeroSection.
They usually represent distinct areas of a page.

## page-templates

Page-level layout compositions (e.g. LandingTemplate) that define the structure of an entire page.
In Nuxt 2 projects, these often complement the pages/ directory by extracting reusable page layouts.

## icons / logos

Visual asset components, typically SVGs wrapped as Vue components, such as icons and brand logos.

## cms

Components representing content blocks coming from a CMS (e.g. ContentBlock, RichText, Teaser).
These often map 1:1 to CMS content models.

## structured-data

SEO-related components used to generate structured data (JSON-LD), such as OrganizationLd, ProductLd, or BreadcrumbLd.
