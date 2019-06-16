<?php
/**
 * Plugin Name: Facepointer WP
 * Plugin URI: https://github.com/browsehandsfree/facepointer
 * Description: Use head tracking and face gestures to move a "mouse" pointer from up to 3m (10ft) away 👋
 * Author: Oz Ramos
 * Author URI: https://browsehandsfree.com
 */
if (!defined('WPINC')) {
	die;
}

/**
 * Include scripts
 */
add_action('wp_enqueue_scripts', 'facepointer_scripts');
function facepointer_scripts() {
  wp_enqueue_script('facepointer', 'https://unpkg.com/facepointer@0.0.4/dist/facepointer.js', array(), null, true);
  wp_enqueue_style('facepointer', 'https://unpkg.com/facepointer@0.0.4/dist/facepointer.css');
}