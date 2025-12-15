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
 * TipTap editor settings.
 *
 * @package    editor_tiptap
 * @copyright  2025
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

if ($ADMIN->fulltree) {
    // Enable/disable toolbar buttons.
    $settings->add(new admin_setting_configcheckbox(
        'editor_tiptap/enablebold',
        get_string('enablebold', 'editor_tiptap'),
        get_string('enablebold_desc', 'editor_tiptap'),
        1
    ));

    $settings->add(new admin_setting_configcheckbox(
        'editor_tiptap/enableitalic',
        get_string('enableitalic', 'editor_tiptap'),
        get_string('enableitalic_desc', 'editor_tiptap'),
        1
    ));

    $settings->add(new admin_setting_configcheckbox(
        'editor_tiptap/enableunderline',
        get_string('enableunderline', 'editor_tiptap'),
        get_string('enableunderline_desc', 'editor_tiptap'),
        1
    ));

    $settings->add(new admin_setting_configcheckbox(
        'editor_tiptap/enablebulletlist',
        get_string('enablebulletlist', 'editor_tiptap'),
        get_string('enablebulletlist_desc', 'editor_tiptap'),
        1
    ));

    $settings->add(new admin_setting_configcheckbox(
        'editor_tiptap/enableorderedlist',
        get_string('enableorderedlist', 'editor_tiptap'),
        get_string('enableorderedlist_desc', 'editor_tiptap'),
        1
    ));

    $settings->add(new admin_setting_configcheckbox(
        'editor_tiptap/enablelink',
        get_string('enablelink', 'editor_tiptap'),
        get_string('enablelink_desc', 'editor_tiptap'),
        1
    ));
}
