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
 * @copyright  2025 Kelson da Costa Medeiros <kelsoncm@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * TipTap editor class.
 *
 * @package    editor_tiptap
 * @copyright  2025 Kelson da Costa Medeiros <kelsoncm@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class tiptap_texteditor extends texteditor {
    /**
     * Is the current browser supported by this editor?
     *
     * @return bool
     */
    public function supported_by_browser() {
        // The editor needs a browser with JavaScript; Moodle only lists browsers that have it.
        return true;
    }

    /**
     * Returns array of supported text formats.
     *
     * @return array
     */
    public function get_supported_formats() {
        return [FORMAT_HTML => FORMAT_HTML];
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
     * @param array|null $options Options for the editor
     * @param stdClass|null $fpoptions Options for the file picker
     * @return void
     */
    public function use_editor($elementid, ?array $options = null, $fpoptions = null) {
        global $PAGE;

        $PAGE->requires->js_call_amd('editor_tiptap/editor', 'init', [
            $elementid,
            $this->get_editor_config(),
        ]);
    }

    /**
     * Get the toolbar configuration from the admin settings.
     *
     * @return bool[] Button name => enabled.
     */
    public function get_editor_config(): array {
        $buttons = [
            'enableBold' => 'enablebold',
            'enableItalic' => 'enableitalic',
            'enableUnderline' => 'enableunderline',
            'enableBulletList' => 'enablebulletlist',
            'enableOrderedList' => 'enableorderedlist',
            'enableLink' => 'enablelink',
        ];
        $config = [];
        foreach ($buttons as $option => $setting) {
            // Settings are stored as the strings '1' or '0', and '0' is truthy in JavaScript.
            $config[$option] = (bool) get_config('editor_tiptap', $setting);
        }
        return $config;
    }
}
