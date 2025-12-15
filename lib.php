<?php
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
 * TipTap text editor integration.
 *
 * @package    editor_tiptap
 * @copyright  2025
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * TipTap editor class.
 *
 * @package    editor_tiptap
 * @copyright  2025
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class tiptap_texteditor extends texteditor {

    /**
     * Is the current browser supported by this editor?
     *
     * @return bool
     */
    public function supported_by_browser() {
        // TipTap requires modern browsers with JavaScript enabled.
        return true;
    }

    /**
     * Returns array of supported text formats.
     *
     * @return array
     */
    public function get_supported_formats() {
        // TipTap works with HTML.
        return array(FORMAT_HTML => FORMAT_HTML);
    }

    /**
     * Returns text format preferred by this editor.
     *
     * @return int
     */
    public function get_preferred_format() {
        return FORMAT_HTML;
    }

    /**
     * Does this editor support picking from repositories?
     *
     * @return bool
     */
    public function supports_repositories() {
        return true;
    }

    /**
     * Use this editor for given element.
     *
     * @param string $elementid
     * @param array $options Options for the editor
     * @param array $fpoptions Options for the file picker
     */
    public function use_editor($elementid, array $options = null, $fpoptions = null) {
        global $PAGE;

        // Load CSS styles.
        $PAGE->requires->css('/editor/tiptap/styles.css');

        // Load required JavaScript modules.
        $PAGE->requires->js_call_amd('editor_tiptap/editor', 'init', array(
            'elementId' => $elementid,
            'options' => $this->get_editor_config()
        ));
    }

    /**
     * Get editor configuration based on admin settings.
     *
     * @return array
     */
    protected function get_editor_config() {
        return array(
            'enableBold' => get_config('editor_tiptap', 'enablebold'),
            'enableItalic' => get_config('editor_tiptap', 'enableitalic'),
            'enableUnderline' => get_config('editor_tiptap', 'enableunderline'),
            'enableBulletList' => get_config('editor_tiptap', 'enablebulletlist'),
            'enableOrderedList' => get_config('editor_tiptap', 'enableorderedlist'),
            'enableLink' => get_config('editor_tiptap', 'enablelink'),
        );
    }

    /**
     * Returns the text from the editor.
     *
     * @return string
     */
    public function get_text() {
        // The text is stored in the textarea element.
        return '';
    }

    /**
     * Set text to the editor.
     *
     * @param string $text
     */
    public function set_text($text) {
        // Text is set via the textarea element.
    }
}
