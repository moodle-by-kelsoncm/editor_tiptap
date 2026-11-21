Overview - moodle-editor_tiptap
===============================

**moodle-editor_tiptap** (component ``editor_tiptap``) is a lightweight WYSIWYG text editor for Moodle. It replaces the text area of
HTML fields with an editable area and a short toolbar, and saves plain HTML, like the other Moodle editors.

The interface is inspired by the `TipTap <https://tiptap.dev/>`_ editor, but the plugin does **not** bundle the TipTap library:
it uses the editing features of the browser (``contenteditable``) and has no third-party JavaScript.

Supports Moodle 4.5 LTS and 5.3 LTS.

Key features
------------

- **Toolbar**: paragraph and headings (H1, H2, H3), bold, italic, underline, bullet and ordered lists, links, undo and redo.
- **Settings**: each formatting button (bold, italic, underline, lists and link) can be turned off by the administrator.
- **Links**: the insert link dialog accepts ``http(s)://``, ``mailto:``, relative (``/``) and anchor (``#``) links only.
- **Safe loading**: scripts, embedded objects, event handler attributes and ``javascript:`` links are removed from the text
  when it is loaded into the editor.
- **Theme colours**: the editor follows the Bootstrap colours of the theme, including the Boost colour modes.
- **Privacy**: the plugin stores no personal data.

Limitations
-----------

- No file or image upload, no media embedding, no tables and no source code view.
- Text stored in other formats (for example Moodle auto-format or Markdown) opens in the next enabled editor that supports that format.

Documentation
-------------

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   installation
   configuration
   usage
