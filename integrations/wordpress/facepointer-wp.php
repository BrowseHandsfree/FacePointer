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
  global $facepointerPlugins;
  global $facepointerDependencies;
  
  $atts = shortcode_atts([
    'id' => 0
  ], $atts);
  $post = get_post($atts['id']);
  setup_postdata($post);

  // Add JavaScript and CSS once
  if (!array_key_exists($atts['id'], $facepointerPlugins)) {
    $facepointerPlugins[$atts['id']] = true;

    if ($js = get_field('javascript')) {
      $content .= '<script>window.addEventListener("load", () => {' . $js . '})</script>';
    }
    if ($css = get_field('css')) {
      $content .= '<style>' . $css . '</style>';      
    }
  }

  // Add depedencies once
  if (have_rows('dependencies')) {
    while (have_rows('dependencies')) {
      the_row();
      $dep = get_sub_field('dependency');
      if (!array_key_exists($dep, $facepointerDependencies)) {
        $facepointerDependencies[$dep] = true;

        if (strpos($dep, '.js')) {
          $content .= '<script src="' . $dep . '"></script>';
        } elseif (strpos($dep, '.css')) {
          $content .= '<link rel="stylesheet" type="text/css" href="' . $dep . '"></script>';
        }
      }
    }
  }
  
  // Add HTML and output
  $content .= get_field('html');
  return $content;
}
add_shortcode('facepointer', 'facepointer_shortcode');