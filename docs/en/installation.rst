Installation
============

Requirements
------------

- Moodle 4.5 LTS or 5.3 LTS (PHP as required by that Moodle version).
- A browser with JavaScript enabled.

From the ZIP package
--------------------

1. Download ``editor_tiptap-<version>.zip`` from the
   `GitHub releases <https://github.com/moodle-by-kelsoncm/moodle-editor_tiptap/releases>`_.
2. Go to **Site administration > Plugins > Install plugins**, upload the ZIP and follow the steps.

From Git
--------

The plugin folder is ``tiptap`` inside the editors folder: ``lib/editor/tiptap`` on Moodle 4.5 and
``public/lib/editor/tiptap`` on Moodle 5.1 and later.

.. code-block:: bash

   cd /path/to/moodle/public/lib/editor   # Moodle 4.5: /path/to/moodle/lib/editor
   git clone https://github.com/moodle-by-kelsoncm/moodle-editor_tiptap.git tiptap

Then go to **Site administration > Notifications** to finish the installation.
