// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * TipTap editor AMD module.
 *
 * @module     editor_tiptap/editor
 * @copyright  2025
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(['jquery', 'core/str'], function($, Str) {

    return {
        /**
         * Initialize the TipTap editor.
         *
         * @param {String} elementId The ID of the textarea element
         * @param {Object} options Editor configuration options
         */
        init: function(elementId, options) {
            // Wait for DOM to be ready.
            $(document).ready(function() {
                const textarea = document.getElementById(elementId);
                if (!textarea) {
                    return;
                }

                // Create editor container.
                const editorContainer = document.createElement('div');
                editorContainer.className = 'tiptap-editor-container';
                editorContainer.id = elementId + '_tiptap';

                // Create toolbar.
                const toolbar = document.createElement('div');
                toolbar.className = 'tiptap-toolbar';
                
                // Create editor content area.
                const editorContent = document.createElement('div');
                editorContent.className = 'tiptap-content';
                editorContent.contentEditable = true;
                const parser = new DOMParser();
                const parsedDoc = parser.parseFromString(textarea.value || '', 'text/html');
                // Remove dangerous elements (scripts, etc.) from the inert document.
                parsedDoc.body.querySelectorAll(
                    'script, object, embed, link[rel="import"]'
                ).forEach(function(el) { el.parentNode.removeChild(el); });
                // Remove event handler attributes and javascript: URLs.
                parsedDoc.body.querySelectorAll('*').forEach(function(el) {
                    Array.from(el.attributes).forEach(function(attr) {
                        var name = attr.name.toLowerCase();
                        // Strip all whitespace and control characters before comparing.
                        var val = attr.value.replace(/[\s\u0000-\u001f\u007f-\u009f\ufeff]/g, '');
                        if (name.startsWith('on') || /^javascript:/i.test(val)) {
                            el.removeAttribute(attr.name);
                        }
                    });
                });
                while (parsedDoc.body.firstChild) {
                    editorContent.appendChild(parsedDoc.body.firstChild);
                }

                // Build toolbar buttons.
                const buttons = [];

                if (options.enableBold) {
                    buttons.push({
                        name: 'bold',
                        icon: 'B',
                        title: 'Bold',
                        command: 'bold'
                    });
                }

                if (options.enableItalic) {
                    buttons.push({
                        name: 'italic',
                        icon: 'I',
                        title: 'Italic',
                        command: 'italic'
                    });
                }

                if (options.enableUnderline) {
                    buttons.push({
                        name: 'underline',
                        icon: 'U',
                        title: 'Underline',
                        command: 'underline'
                    });
                }

                // Add separator.
                if (buttons.length > 0) {
                    toolbar.appendChild(document.createElement('span')).className = 'separator';
                }

                // Heading buttons.
                const headingSelect = document.createElement('select');
                headingSelect.className = 'tiptap-button';
                headingSelect.innerHTML = `
                    <option value="p">Paragraph</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                `;
                headingSelect.addEventListener('change', function() {
                    document.execCommand('formatBlock', false, this.value);
                    this.value = 'p';
                });
                toolbar.appendChild(headingSelect);

                // Add separator.
                toolbar.appendChild(document.createElement('span')).className = 'separator';

                if (options.enableBulletList) {
                    buttons.push({
                        name: 'bulletlist',
                        icon: '•',
                        title: 'Bullet List',
                        command: 'insertUnorderedList'
                    });
                }

                if (options.enableOrderedList) {
                    buttons.push({
                        name: 'orderedlist',
                        icon: '1.',
                        title: 'Ordered List',
                        command: 'insertOrderedList'
                    });
                }

                if (options.enableLink) {
                    buttons.push({
                        name: 'link',
                        icon: '🔗',
                        title: 'Insert Link',
                        command: 'createLink',
                        prompt: true
                    });
                }

                // Add separator.
                if (buttons.length > 3) {
                    toolbar.appendChild(document.createElement('span')).className = 'separator';
                }

                // Undo/Redo buttons.
                buttons.push({
                    name: 'undo',
                    icon: '↶',
                    title: 'Undo',
                    command: 'undo'
                });

                buttons.push({
                    name: 'redo',
                    icon: '↷',
                    title: 'Redo',
                    command: 'redo'
                });

                // Create toolbar buttons.
                buttons.forEach(function(btn) {
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'tiptap-button';
                    button.innerHTML = btn.icon;
                    button.title = btn.title;
                    button.dataset.command = btn.command;

                    button.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        if (btn.prompt) {
                            const url = prompt('Enter URL:');
                            if (url) {
                                document.execCommand(btn.command, false, url);
                            }
                        } else {
                            document.execCommand(btn.command, false, null);
                        }
                        
                        editorContent.focus();
                    });

                    toolbar.appendChild(button);
                });

                // Assemble editor.
                editorContainer.appendChild(toolbar);
                editorContainer.appendChild(editorContent);

                // Hide original textarea.
                textarea.style.display = 'none';

                // Insert editor after textarea.
                textarea.parentNode.insertBefore(editorContainer, textarea.nextSibling);

                // Sync content to textarea on input.
                editorContent.addEventListener('input', function() {
                    textarea.value = editorContent.innerHTML;
                });

                // Sync content to textarea on blur.
                editorContent.addEventListener('blur', function() {
                    textarea.value = editorContent.innerHTML;
                });

                // Initial sync.
                textarea.value = editorContent.innerHTML;

                // Handle form submission.
                const form = textarea.closest('form');
                if (form) {
                    form.addEventListener('submit', function() {
                        textarea.value = editorContent.innerHTML;
                    });
                }
            });
        }
    };
});
