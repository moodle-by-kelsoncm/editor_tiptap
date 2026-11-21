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

namespace editor_tiptap;

/**
 * Tests for the TipTap text editor class.
 *
 * @package    editor_tiptap
 * @copyright  2025 Kelson da Costa Medeiros <kelsoncm@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @covers     \tiptap_texteditor
 */
final class editor_test extends \advanced_testcase {
    /**
     * Load the editor class.
     */
    protected function setUp(): void {
        global $CFG;
        parent::setUp();
        require_once($CFG->libdir . '/editorlib.php');
        $this->resetAfterTest();
    }

    /**
     * The editor is found by Moodle and works with HTML only.
     */
    public function test_editor_is_available(): void {
        $editor = get_texteditor('tiptap');
        $this->assertInstanceOf(\tiptap_texteditor::class, $editor);
        $this->assertSame([FORMAT_HTML => FORMAT_HTML], $editor->get_supported_formats());
        $this->assertSame(FORMAT_HTML, $editor->get_preferred_format());
        $this->assertTrue($editor->supported_by_browser());
    }

    /**
     * The text given by the form is kept by the base class.
     */
    public function test_text_is_kept(): void {
        $editor = new \tiptap_texteditor();
        $editor->set_text('<p>Hello</p>');
        $this->assertSame('<p>Hello</p>', $editor->get_text());
    }

    /**
     * Buttons are enabled by default and disabled buttons reach JavaScript as false.
     */
    public function test_editor_config(): void {
        $editor = new \tiptap_texteditor();
        $config = $editor->get_editor_config();
        $this->assertCount(6, $config);
        foreach ($config as $enabled) {
            $this->assertTrue($enabled);
        }

        set_config('enableunderline', 0, 'editor_tiptap');
        $config = $editor->get_editor_config();
        $this->assertFalse($config['enableUnderline']);
        $this->assertTrue($config['enableBold']);
    }

    /**
     * Using the editor loads the AMD module with the element id and the configuration.
     */
    public function test_use_editor_loads_module(): void {
        global $PAGE;
        $PAGE->set_url('/');
        set_config('enablelink', 0, 'editor_tiptap');

        $editor = new \tiptap_texteditor();
        $editor->use_editor('id_test', []);

        $code = $PAGE->requires->get_end_code();
        $this->assertStringContainsString('editor_tiptap/editor', $code);
        $this->assertStringContainsString('"id_test"', $code);
        $this->assertStringContainsString('"enableLink":false', $code);
    }
}
