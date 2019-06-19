<?php
/**
 * Plugin Name: Facepointer WP
 * Plugin URI: https://github.com/browsehandsfree/facepointer
 * Description: Use head tracking and face gestures to move a "mouse" pointer from up to 3m (10ft) away 👋
 * Author: Oz Ramos
 * Author URI: https://browsehandsfree.com
 */

// Contains a list of dependencies (to prevent duplication)
$facepointerDependencies = [];
$facepointerPlugins = [];

/**
 * Include scripts
 */
function facepointer_scripts () {
  wp_enqueue_script('facepointer', 'https://unpkg.com/facepointer/dist/facepointer.js', [], false, true);
  wp_enqueue_style('facepointer', 'https://unpkg.com/facepointer/dist/facepointer.css');
}
add_action('wp_enqueue_scripts', 'facepointer_scripts');

/**
 * [facepointer id=""] Shortcode
 */
function facepointer_shortcode ($atts, $content = '') {
  global $post;
  
  $atts = shortcode_atts([
    'id' => 0
  ]);
  $post = get_post($atts['id']);
  setup_postdata($post);

  // Add JavaScript once
  if (!$facepointerPlugins[$atts['id']]) {
    $facepointerPlugins[$atts['id']] = true;
    $content .= '<script>' . get_field('javascript') . '</script>';
  }

  // Add depedencies once
  if (have_rows('dependencies')) {
    while (have_rows('dependencies')) {
      the_row();
      $dep = get_sub_field('dependency');
      if (!$facepointerDependencies[$dep]) {
        $facepointerDependencies[$dep] = true;
        $content .= '<script src="' . $dep . '"></script>';
      }
    }
  }
  
  // Add HTML and output
  $content .= $html;
  return $content;
}
add_shortcode('facepointer', 'facepointer_shortcode');