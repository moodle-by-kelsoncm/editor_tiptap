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
 * Replaces the text area of a Moodle form with a content editable area and a toolbar,
 * and keeps the text area value in sync with the edited HTML.
 *
 * @module     editor_tiptap/editor
 * @copyright  2025 Kelson da Costa Medeiros <kelsoncm@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {getStrings} from 'core/str';
import ModalSaveCancel from 'core/modal_save_cancel';
import ModalEvents from 'core/modal_events';
import Templates from 'core/templates';

/** @type {string[]} Language strings used by the editor. */
const STRINGS = [
    'blockformat', 'bold', 'bulletlist', 'heading1', 'heading2', 'heading3', 'italic', 'link',
    'linkurl', 'orderedlist', 'paragraph', 'redo', 'toolbar', 'underline', 'undo',
];

/** @type {RegExp} Link targets accepted by the insert link dialog. */
const ALLOWEDURL = /^(https?:\/\/|mailto:|\/|#)/i;

/** @type {Set<string>} Elements dropped with their content. */
const DROPPED = new Set([
    'applet', 'base', 'button', 'embed', 'form', 'frame', 'frameset', 'iframe', 'input', 'link', 'math', 'meta',
    'noscript', 'object', 'option', 'script', 'select', 'style', 'svg', 'template', 'textarea',
]);

/** @type {Set<string>} Elements kept; any other element is replaced by its content. */
const ALLOWEDTAGS = new Set([
    'a', 'abbr', 'audio', 'b', 'blockquote', 'br', 'caption', 'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'div',
    'dl', 'dt', 'em', 'figcaption', 'figure', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img', 'ins', 'kbd', 'li',
    'mark', 'ol', 'p', 'picture', 'pre', 'q', 's', 'small', 'source', 'span', 'strike', 'strong', 'sub', 'sup', 'table',
    'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'track', 'u', 'ul', 'video',
]);

/** @type {Set<string>} Attributes kept on allowed elements. */
const ALLOWEDATTRS = new Set([
    'alt', 'cite', 'class', 'colspan', 'controls', 'datetime', 'dir', 'height', 'href', 'kind', 'label', 'lang',
    'poster', 'rel', 'reversed', 'rowspan', 'scope', 'src', 'srclang', 'start', 'style', 'target', 'title', 'type',
    'width',
]);

/** @type {Set<string>} Attributes that hold a URL. */
const URLATTRS = new Set(['cite', 'href', 'poster', 'src']);

/** @type {RegExp} URLs kept in content: no scheme (relative) or a safe scheme. */
const SAFEURL = /^(https?:|mailto:|tel:|[^:]*$)/i;

/** @type {RegExp} Images embedded in the content. */
const DATAIMAGE = /^data:image\/(png|gif|jpe?g|webp);/i;

/**
 * Check whether an attribute may be copied to the editable area.
 *
 * @param {string} tag Element name.
 * @param {string} name Attribute name.
 * @param {string} value Attribute value.
 * @returns {boolean}
 */
const isAllowedAttribute = (tag, name, value) => {
    if (!ALLOWEDATTRS.has(name)) {
        return false;
    }
    // eslint-disable-next-line no-control-regex
    const compact = value.replace(/[\s\u0000-\u001f\u007f-\u009f]/g, '');
    if (URLATTRS.has(name)) {
        return SAFEURL.test(compact) || (tag === 'img' && name === 'src' && DATAIMAGE.test(compact));
    }
    if (name === 'style') {
        return !/(expression|javascript:|url\()/i.test(compact);
    }
    return true;
};

/**
 * Copy the children of a parsed node into a target, rebuilding only allowed elements and attributes.
 *
 * @param {Node} source Parsed node (inert document).
 * @param {Node} target Node of the page that receives the clean copy.
 */
const copyClean = (source, target) => {
    source.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
            target.appendChild(document.createTextNode(child.textContent));
            return;
        }
        if (child.nodeType !== Node.ELEMENT_NODE) {
            return;
        }
        const tag = child.nodeName.toLowerCase();
        if (DROPPED.has(tag)) {
            return;
        }
        if (!ALLOWEDTAGS.has(tag)) {
            copyClean(child, target);
            return;
        }
        const el = document.createElement(tag);
        Array.from(child.attributes).forEach((attr) => {
            const name = attr.name.toLowerCase();
            if (isAllowedAttribute(tag, name, attr.value)) {
                el.setAttribute(name, attr.value);
            }
        });
        copyClean(child, el);
        target.appendChild(el);
    });
};

/**
 * Load the HTML of the text area into the editable area through an allow list.
 *
 * The HTML is parsed in an inert document (nothing runs or loads there) and only allowed
 * elements and attributes are rebuilt in the page, so scripts, event handlers, frames and
 * unsafe URLs never reach the editable area.
 *
 * @param {string} html HTML stored in the text area.
 * @param {HTMLElement} target Editable area.
 */
const loadContent = (html, target) => {
    const parsed = new DOMParser().parseFromString(html || '', 'text/html');
    copyClean(parsed.body, target);
};

/**
 * Create a toolbar separator.
 *
 * @returns {HTMLElement}
 */
const separator = () => {
    const span = document.createElement('span');
    span.className = 'separator';
    span.setAttribute('aria-hidden', 'true');
    return span;
};

/**
 * Ask for a URL in a modal and turn the selection into a link.
 *
 * @param {HTMLElement} content Editable area.
 * @param {Object} str Language strings.
 * @param {Function} sync Function that copies the content back to the text area.
 */
const insertLink = async(content, str, sync) => {
    const selection = window.getSelection();
    const range = selection.rangeCount ? selection.getRangeAt(0).cloneRange() : null;
    const modal = await ModalSaveCancel.create({
        title: str.link,
        body: Templates.render('editor_tiptap/link_dialog', {label: str.linkurl}),
        show: true,
        removeOnClose: true,
    });
    modal.getRoot().on(ModalEvents.save, () => {
        const input = modal.getRoot()[0].querySelector('[data-region="editor_tiptap-linkurl"]');
        const url = input ? input.value.trim() : '';
        if (!ALLOWEDURL.test(url)) {
            return;
        }
        content.focus();
        if (range) {
            selection.removeAllRanges();
            selection.addRange(range);
        }
        document.execCommand('createLink', false, url);
        sync();
    });
};

/**
 * Build the list of toolbar buttons from the configuration.
 *
 * @param {Object} options Enabled buttons.
 * @param {Object} str Language strings.
 * @returns {Array[]} Groups of buttons.
 */
const buildButtons = (options, str) => {
    const format = [];
    if (options.enableBold) {
        format.push({icon: 'B', title: str.bold, command: 'bold'});
    }
    if (options.enableItalic) {
        format.push({icon: 'I', title: str.italic, command: 'italic'});
    }
    if (options.enableUnderline) {
        format.push({icon: 'U', title: str.underline, command: 'underline'});
    }
    const lists = [];
    if (options.enableBulletList) {
        lists.push({icon: '•', title: str.bulletlist, command: 'insertUnorderedList'});
    }
    if (options.enableOrderedList) {
        lists.push({icon: '1.', title: str.orderedlist, command: 'insertOrderedList'});
    }
    if (options.enableLink) {
        lists.push({icon: '🔗', title: str.link, command: 'createLink', link: true});
    }
    const history = [
        {icon: '↶', title: str.undo, command: 'undo'},
        {icon: '↷', title: str.redo, command: 'redo'},
    ];
    return [format, lists, history].filter((group) => group.length);
};

/**
 * Create the block format selector.
 *
 * @param {Object} str Language strings.
 * @param {HTMLElement} content Editable area.
 * @param {Function} sync Function that copies the content back to the text area.
 * @returns {HTMLSelectElement}
 */
const buildBlockSelect = (str, content, sync) => {
    const select = document.createElement('select');
    select.className = 'tiptap-button';
    select.setAttribute('aria-label', str.blockformat);
    [['p', str.paragraph], ['h1', str.heading1], ['h2', str.heading2], ['h3', str.heading3]].forEach(([value, label]) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = label;
        select.appendChild(option);
    });
    select.addEventListener('change', () => {
        content.focus();
        document.execCommand('formatBlock', false, select.value);
        select.value = 'p';
        sync();
    });
    return select;
};

/**
 * Initialise the editor for a text area.
 *
 * @param {string} elementId Id of the text area.
 * @param {Object} options Enabled toolbar buttons.
 */
export const init = async(elementId, options) => {
    const textarea = document.getElementById(elementId);
    if (!textarea || textarea.dataset.editorTiptap) {
        return;
    }
    textarea.dataset.editorTiptap = 'ready';

    const values = await getStrings(STRINGS.map((key) => ({key, component: 'editor_tiptap'})));
    const str = {};
    STRINGS.forEach((key, index) => {
        str[key] = values[index];
    });

    const container = document.createElement('div');
    container.className = 'tiptap-editor-container';
    container.id = elementId + '_tiptap';

    const toolbar = document.createElement('div');
    toolbar.className = 'tiptap-toolbar';
    toolbar.setAttribute('role', 'toolbar');
    toolbar.setAttribute('aria-label', str.toolbar);
    toolbar.setAttribute('aria-controls', container.id + '_content');

    const content = document.createElement('div');
    content.className = 'tiptap-content';
    content.id = container.id + '_content';
    content.contentEditable = 'true';
    content.setAttribute('role', 'textbox');
    content.setAttribute('aria-multiline', 'true');
    const label = document.querySelector('label[for="' + elementId + '"]');
    if (label) {
        label.id = label.id || elementId + '_label';
        content.setAttribute('aria-labelledby', label.id);
    }
    loadContent(textarea.value, content);

    // The text area keeps the stored text until the user changes something, so content the
    // editor does not support (dropped by the allow list) is only lost when the text is edited.
    let changed = false;
    const sync = () => {
        changed = true;
        // Moodle's YUI adds ids (yui_...) to the nodes it handles in the page; ids are not in
        // the allow list, so they are removed from the saved HTML.
        const clean = content.cloneNode(true);
        clean.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
        textarea.value = clean.innerHTML;
    };

    toolbar.appendChild(buildBlockSelect(str, content, sync));
    buildButtons(options, str).forEach((group) => {
        toolbar.appendChild(separator());
        group.forEach((btn) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'tiptap-button';
            button.textContent = btn.icon;
            button.title = btn.title;
            button.setAttribute('aria-label', btn.title);
            button.dataset.command = btn.command;
            button.addEventListener('click', (e) => {
                e.preventDefault();
                if (btn.link) {
                    insertLink(content, str, sync);
                    return;
                }
                content.focus();
                document.execCommand(btn.command, false, null);
                sync();
            });
            toolbar.appendChild(button);
        });
    });

    container.appendChild(toolbar);
    container.appendChild(content);
    textarea.hidden = true;
    textarea.parentNode.insertBefore(container, textarea.nextSibling);

    content.addEventListener('input', sync);

    const form = textarea.closest('form');
    if (form) {
        form.addEventListener('submit', () => {
            if (changed) {
                sync();
            }
        });
    }
};
