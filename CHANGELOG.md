# Changelog

All notable changes to the TipTap editor plugin (`editor_tiptap`) will be documented in this file.

## 1.1.0 - 2026-11-21

First version prepared for the Moodle Marketplace.

### Changed
- Supports Moodle 4.5 LTS and 5.3 LTS (`requires` 4.5, `supported` [405, 503]); the release number follows semantic versioning.
- The JavaScript is an ES6 module with its `amd/build` files; the toolbar labels come from the language strings.
- The insert link button opens a Moodle dialog instead of the browser prompt and accepts only `http(s)://`, `mailto:`, relative and anchor links.
- Disabled toolbar buttons are really hidden: the settings now reach JavaScript as booleans (the string `'0'` was treated as enabled).
- The text given by the form is kept by the base editor class (`get_text()` returned an empty string).
- `styles.css` is loaded by Moodle only (no `$PAGE->requires->css()`), has the GPL header and uses the Bootstrap colours of the theme, including the Boost colour modes.
- The text is loaded into the editor through an allow list of elements and attributes, rebuilt from an inert parsed document: frames (`iframe srcdoc`), styles, SVG, forms, event handlers and unsafe URLs are removed (the old filter let `iframe srcdoc` and SVG animations through).
- The stored text is only rewritten when the user changes it, so unsupported content is not lost by opening and saving a form.
- Toolbar and editing area have accessible names and roles.
- Documentation describes the actual behaviour: the plugin does not bundle the TipTap library, and the Git install folder is `lib/editor/tiptap`.

### Added
- Privacy API provider (the plugin stores no personal data).
- PHPUnit tests, CI with `moodle-plugin-ci` and the release and Marketplace workflows.

### Removed
- The unused capability `editor/tiptap:use`.
- The `pt_br` language pack from the repository; translations come through AMOS.

## 1.0 - 2025-12-15

- Initial version (not released).
