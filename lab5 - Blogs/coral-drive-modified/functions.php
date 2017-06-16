<?php
/**
 * coral-drive functions and definitions
 *
 * @package coral-drive
 */

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function coral_drive_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'coral_drive_content_width', 990 );
}
add_action( 'after_setup_theme', 'coral_drive_content_width', 0 );

if ( ! function_exists( 'coral_drive_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function coral_drive_setup() {

	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on coral-drive, use a find and replace
	 * to change 'coral-drive' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'coral-drive', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );
	/*
	 * This theme styles the visual editor to resemble the theme style
	 */	
	add_editor_style( 'css/editor-style.css' );
	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );
	/*
	 * Enable support for custom logo.
	 */
	add_theme_support( 'custom-logo', array( 'height' => 65, 'width' => 150, 'flex-height' => true, 'flex-width' => true, ) );
	set_post_thumbnail_size( 210, 210 );
	add_image_size( 'coral-drive-medium-large-2x', 1536 );
	add_image_size( 'coral-drive-large-2x', 1960 );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'coral-drive' ),
		'social' => __( 'Social Links Menu', 'coral-drive' ),
	) );
	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
	   'comment-form', 'comment-list', 'gallery', 'caption'
	) );

	/*
	 * Enable support for Post Formats.
	 * See http://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside', 'image', 'video', 'quote', 'link',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'coral_drive_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );

	// Add theme support for Custom Header
	$header_args = array(
		'default-image'          => get_template_directory_uri() . '/images/drive.jpg',
		'width'                  => 2560,
		'height'                 => 1440,
		'flex-width'             => true,
		'flex-height'            => true,
		'uploads'                => true,
		'random-default'         => false,
		'header-text'            => false,
		'default-text-color'     => '',
		'wp-head-callback'       => 'coral_drive_header_style',
		'admin-head-callback'    => '',
		'admin-preview-callback' => '',
	);
	add_theme_support( 'custom-header', $header_args );
	
	// Default header
	register_default_headers( array(
	'drive' => array(
		'url'           => get_template_directory_uri() . '/images/drive.jpg',
		'thumbnail_url' => get_template_directory_uri() . '/images/drive-small.jpg',
		'description'   => __( 'Default header', 'coral-drive' )
	)
	) );
	
	// Woocommerce 
    add_theme_support( 'woocommerce' );
	
	add_theme_support( 'customize-selective-refresh-widgets' );

}
endif; // coral_drive_setup
add_action( 'after_setup_theme', 'coral_drive_setup' );

function coral_drive_header_style() {
	$header_front_page = ( '1' == get_theme_mod('header_front_page_setting','1')) ? '1' : '';
	$header_allpages = ( '1' == get_theme_mod('header_allpages','')) ? '1' : '';
	$header_posts_page = ( '1' == get_theme_mod('header_posts_page_setting','')) ? '1' : '';
	$header_ids = get_theme_mod('header_post_id_setting','-999999');
	$header_arrids = explode(',', $header_ids);
	foreach($header_arrids as $key => $val) {
		$header_arrids[$key] = intval($val);
	}	
	$header_bg_image = get_header_image();
	if (($header_front_page && is_front_page()) || ($header_posts_page && is_home()) || $header_allpages || is_single($header_arrids) || is_page($header_arrids)) {	
		?>
		<style type="text/css">
		#headerwrap {
			background-image: url(<?php echo esc_url($header_bg_image); ?>);
		}
		</style>
		<?php
	} else {
		?>
		<style type="text/css">
		#headerwrap {
			display: none;
		}
		</style>
		<?php
	}
}
/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function coral_drive_widgets_init() {

	register_sidebar( array(
		'name'          => __( 'Header 1', 'coral-drive' ),
		'id'            => 'header-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );
	register_sidebar( array(
		'name'          => __( 'Header 2', 'coral-drive' ),
		'id'            => 'header-2',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );	
	register_sidebar( array(
		'name'          => __( 'Upper 1', 'coral-drive' ),
		'id'            => 'upper-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );
	register_sidebar( array(
		'name'          => __( 'Upper 2', 'coral-drive' ),
		'id'            => 'upper-2',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );
	register_sidebar( array(
		'name'          => __( 'Upper 3', 'coral-drive' ),
		'id'            => 'upper-3',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );
	register_sidebar( array(
		'name'          => __( 'Upper 4', 'coral-drive' ),
		'id'            => 'upper-4',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );
	register_sidebar( array(
		'name'          => __( 'Sidebar', 'coral-drive' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );

	register_sidebar( array(
		'name'          => __( 'Footer', 'coral-drive' ),
		'id'            => 'footer-copyright',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );
}
add_action( 'widgets_init', 'coral_drive_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function coral_drive_scripts() {

	$logoheight = absint(get_theme_mod('coral_drive_logoheight_setting', '65'));
	$title_font = wp_kses(get_theme_mod('title_font_setting', "'Russo One', sans-serif"), array(), array());
	$tagline_font = wp_kses(get_theme_mod('tagline_font_setting', "'Roboto Condensed', sans-serif"), array(), array());
	$body_font = wp_kses(get_theme_mod('body_font_setting', "'Open Sans', sans-serif"), array(), array());
	$heading_font = wp_kses(get_theme_mod('heading_font_setting', "'Roboto Condensed', sans-serif"), array(), array());
	$header_title_font = wp_kses(get_theme_mod('header_title_font_setting', "'Roboto Condensed', sans-serif"), array(), array());
	$header_title_fontsize = absint(get_theme_mod('coral_drive_header_title_size_setting', '40'));
	$header_title_letterspacing = absint(get_theme_mod('coral_drive_header_title_letterspacing_setting', '1'));
	$header_title_fontsize_mobile = min(40, $header_title_fontsize);
	$header_text_font = wp_kses(get_theme_mod('header_text_font_setting', "'Times New Roman', Times, serif"), array(), array());
	$header_text_fontsize = absint(get_theme_mod('coral_drive_header_text_size_setting', '17'));
	$header_text_letterspacing = absint(get_theme_mod('coral_drive_header_text_letterspacing_setting', '8'));
	$header_text_fontsize_mobile = min(20, $header_text_fontsize);
	$menu_font = wp_kses(get_theme_mod('menu_font_setting', "'Open Sans', sans-serif"), array(), array());	
	$title_offset = intval(get_theme_mod('coral_drive_titleoffset_setting', '10'));
	$tagline_offset = intval(get_theme_mod('coral_drive_taglineoffset_setting', '-5'));
	$title_fontsize = absint(get_theme_mod('coral_drive_titlesize_setting', '27'));	
	$tagline_fontsize = absint(get_theme_mod('coral_drive_taglinesize_setting', '14'));
	$title_color = '#' . get_theme_mod('title_color_setting', '000000');
	$title_color = ( preg_match('|^#([A-Fa-f0-9]{3}){1,2}$|', $title_color )) ? $title_color : '#000000';
	$tagline_color = '#' . get_theme_mod('tagline_color_setting', '000000');
	$tagline_color = ( preg_match('|^#([A-Fa-f0-9]{3}){1,2}$|', $tagline_color )) ? $tagline_color : '#000000';	
	$body_fontsize = absint(get_theme_mod('body_fontsize_setting', '15'));

	$header_front_page = ( '1' == get_theme_mod('header_front_page_setting','1')) ? '1' : '';
	$header_allpages = ( '1' == get_theme_mod('header_allpages','')) ? '1' : '';
	$header_posts_page = ( '1' == get_theme_mod('header_posts_page_setting','')) ? '1' : '';
	$header_ids = get_theme_mod('header_post_id_setting','-999999');
	$header_arrids = explode(',', $header_ids);
	foreach($header_arrids as $key => $val) {
		$header_arrids[$key] = intval($val);
	}	
	$header_color_scheme = absint(get_theme_mod('header_color_setting','1'));
	$keep_color = absint(get_theme_mod('coral_drive_keep_color_setting','1'));
	$isheader = 0;

	$upperwidgets_color = '#' . get_theme_mod('upperwidget_background_color_setting', 'f5f5f5');
	$upperwidgets_color = ( preg_match('|^#([A-Fa-f0-9]{3}){1,2}$|', $upperwidgets_color )) ? $upperwidgets_color : '#f5f5f5';
	$upperwidgets_textcolor = '#' . get_theme_mod('upperwidgets_text_color_setting', '404040');
	$upperwidgets_textcolor = ( preg_match('|^#([A-Fa-f0-9]{3}){1,2}$|', $upperwidgets_textcolor )) ? $upperwidgets_textcolor : '#404040';
	$upperwidgets_linkcolor = '#' . get_theme_mod('upperwidgets_link_color_setting', '0084ea');
	$upperwidgets_linkcolor = ( preg_match('|^#([A-Fa-f0-9]{3}){1,2}$|', $upperwidgets_linkcolor )) ? $upperwidgets_linkcolor : '#0084ea';
	$upperwidgets_headingcolor = '#' . get_theme_mod('upperwidgets_heading_color_setting', '222222');	
	$upperwidgets_headingcolor = ( preg_match('|^#([A-Fa-f0-9]{3}){1,2}$|', $upperwidgets_headingcolor )) ? $upperwidgets_headingcolor : '#222222';
	$upperwidgets_front_page = ( '1' == get_theme_mod('upperwidgets_front_page_setting','1')) ? '1' : '';
	$upperwidgets_allpages = ( '1' == get_theme_mod('upperwidgets_allpages','')) ? '1' : '';
	$upperwidgets_posts_page = ( '1' == get_theme_mod('upperwidgets_posts_page_setting','')) ? '1' : '';
	$upperwidgets_ids = get_theme_mod('upperwidgets_post_id_setting','-999999');
	$upperwidgets_arrids = explode(',', $upperwidgets_ids);
	foreach($upperwidgets_arrids as $key => $val) {
		$upperwidgets_arrids[$key] = intval($val);
	}	
	$upperwidgets_exclude_ids = get_theme_mod('upperwidgets_exclude_post_id_setting','-999999');
	$upperwidgets_exclude_arrids = explode(',', $upperwidgets_exclude_ids);
	foreach($upperwidgets_exclude_arrids as $key => $val) {
		$upperwidgets_exclude_arrids[$key] = intval($val);
	}	
	
	$css = "";
	if ("0" != $body_font && '' != $body_font) {
		$css .= "body, button, input, select, textarea {	font-family: {$body_font};}
		";
	}
	if ("0" != $heading_font && '' != $heading_font) {
		$css .= "h1, h2, h3, h4, h5, h6 { font-family: {$heading_font};}
		";
	}
	if ("0" != $title_font && '' != $title_font) {
		$css .= "h1.site-title, h3.site-title { font-family: {$title_font};}
		";
	}
	if ("0" != $tagline_font && '' != $tagline_font) {
		$css .= "h2.site-description, h4.site-description { font-family: {$tagline_font};}
		";
	}
	if ('' != $header_title_font && "0" != $header_title_font) {
		$css .= "h2.fullpageheader { font-family: {$header_title_font};}
		";
	}
	if ('' != $header_text_font && "0" != $header_text_font) {
		$css .= "h3.fullpageheader { font-family: {$header_text_font};}
		";
	}
	if ("0" != $menu_font && '' != $menu_font) {
		$css .= ".sm-clean a, .sm-clean a:hover, .sm-clean a:focus, .sm-clean a:active, .sm-clean ul a, .sm-clean ul a:hover, .sm-clean ul a:focus, .sm-clean ul a:active { font-family: {$menu_font};}
		";
	}

	$css .= "
		body, button, input, select, textarea {	font-size: {$body_fontsize}px;}
		h1.site-title, h3.site-title {
			margin-top: {$title_offset}px; 
			font-size: {$title_fontsize}px; 
		}
		h1.site-title a,
		h1.site-title a:visited,
		h1.site-title a:hover,
		h1.site-title a:active,
		h1.site-title a:focus,
		h3.site-title a,
		h3.site-title a:visited,
		h3.site-title a:hover,
		h3.site-title a:active,
		h3.site-title a:focus {
			color: {$title_color} !important;
		}
		
		h2.site-description, h4.site-description {
			margin-top: {$tagline_offset}px;
			font-size: {$tagline_fontsize}px;
			color: {$tagline_color};
		}
		.custom-logo {max-height: {$logoheight}px;}
		#navwrap {height: {$logoheight}px;}
	";
	
	if ("40" != $header_title_fontsize || "1" != $header_title_letterspacing) {
		$css .= "
			h2.fullpageheader {font-size: {$header_title_fontsize}px; letter-spacing: {$header_title_letterspacing}px;}
			@media screen and (max-width: 768px) {h2.fullpageheader {font-size: {$header_title_fontsize_mobile}px;}}
		";
	}	
	if ("17" != $header_text_fontsize || "8" != $header_text_letterspacing) {
		$css .= "
			h3.fullpageheader {font-size: {$header_text_fontsize}px; letter-spacing: {$header_text_letterspacing}px;}
			@media screen and (max-width: 768px) {h3.fullpageheader {font-size: {$header_text_fontsize_mobile}px;}}
		";
	}	
	
	if (($header_front_page && is_front_page()) || ($header_posts_page && is_home()) || $header_allpages || is_single($header_arrids) || is_page($header_arrids)) {
		if ( "1" == $header_color_scheme ) {
			$css .= "@media (min-width: 1025px) {
					.sm-clean a {color: #000000;}
					.sm-clean a:hover, .sm-clean a:focus, .sm-clean a:active, .sm-clean a.highlighted, .sm-clean a.current {color: #fff; text-shadow: 1px 1px 2px #000000;}
					.sm-clean ul a:hover, .sm-clean ul a:focus, .sm-clean ul a:active, .sm-clean ul a.highlighted, .sm-clean ul a.current {text-shadow: none;}
					.sm-clean a span.sub-arrow {border-color: #000000 transparent transparent transparent;}
				}
				#menu-button {
					color: #000000;
				}
				#navwrap {
					position: absolute;
					width: 100%;
					left: 0;
					top: 0;
					z-index: 100;			
				}";
				if ( "0" == $keep_color ) {
					$css .= "h1.site-title a,
							h1.site-title a:visited,
							h1.site-title a:hover,
							h1.site-title a:active,
							h1.site-title a:focus,
							h3.site-title a,
							h3.site-title a:visited,
							h3.site-title a:hover,
							h3.site-title a:active,
							h3.site-title a:focus {
								color: #000000 !important;
							}
							h2.site-description, h4.site-description {
								color: #000000 !important;
					}";
				}
		} else {
			$css .= "@media (min-width: 1025px) {
					.sm-clean a {color: #ffffff;}
					.sm-clean a:hover, .sm-clean a:focus, .sm-clean a:active, .sm-clean a.highlighted, .sm-clean a.current {color: #ffffff; text-shadow: 1px 1px 2px #000000;}
					.sm-clean ul a:hover, .sm-clean ul a:focus, .sm-clean ul a:active, .sm-clean ul a.highlighted, .sm-clean ul a.current {text-shadow: none;}
					.sm-clean a span.sub-arrow {border-color: #ffffff transparent transparent transparent;}
				}
				#menu-button {
					color: #ffffff;
				}
				h2.fullpageheader {
					text-shadow: 1px 1px 2px #000000;
					color: #ffffff;
				} 
				h3.fullpageheader {
					text-shadow: 1px 1px 2px #000000;
					color: #ffffff;
				} 
				a.button.fullpageheader, a.button.fullpageheader:visited, a.button.fullpageheader:hover, a.button.fullpageheader:active, a.button.fullpageheader:focus {
					color: #000000;
					background-color: #ffffff;
					text-decoration: none;
					box-shadow: 0px 0px 6px #aaa;
				}
				#navwrap {
					position: absolute;
					width: 100%;
					left: 0;
					top: 0;
					z-index: 100;			
				}";
				if ( "0" == $keep_color ) {
					$css .= "h1.site-title a,
							h1.site-title a:visited,
							h1.site-title a:hover,
							h1.site-title a:active,
							h1.site-title a:focus,
							h3.site-title a,
							h3.site-title a:visited,
							h3.site-title a:hover,
							h3.site-title a:active,
							h3.site-title a:focus {
								color: #ffffff !important;
							}
							h2.site-description, h4.site-description {
								color: #ffffff !important;
					}";
				}
		}
		$isheader = 1;
	} else {
		$css .= "#headerwrap {
					display: none;
				}";
	}
	if ((($upperwidgets_front_page && is_front_page()) || ($upperwidgets_posts_page && is_home()) || $upperwidgets_allpages || is_single($upperwidgets_arrids) || is_page($upperwidgets_arrids)) && (! is_single($upperwidgets_exclude_arrids) && ! is_page($upperwidgets_exclude_arrids))) {
		if ("#404040" != $upperwidgets_textcolor) {
			$css .= "
				#upperwrap, #upperwrap table caption, #upperwrap td, #upperwrap th {color: {$upperwidgets_textcolor};}
			";
		}	
		if ("#0084ea" != $upperwidgets_linkcolor) {
			$css .= "#upperwrap a, #upperwrap a:visited, #upperwrap a:hover, #upperwrap a:active, #upperwrap a:focus {color: {$upperwidgets_linkcolor};}
			";
		}
		if ("#222222" != $upperwidgets_headingcolor) {
			$css .= "
				#upperwrap .widget-title, #upperwrap h1, #upperwrap h2, #upperwrap h3, #upperwrap h4, #upperwrap h5, #upperwrap h6,
				#upperwrap h1 a, #upperwrap h2 a, #upperwrap h3 a, #upperwrap h4 a, #upperwrap h5 a, #upperwrap h6 a,
				#upperwrap h1 a:hover, #upperwrap h2 a:hover, #upperwrap h3 a:hover, #upperwrap h4 a:hover, #upperwrap h5 a:hover, #upperwrap h6 a:hover {color: {$upperwidgets_headingcolor} !important;}
			";
		}
		if ("#f5f5f5" !=  $upperwidgets_color) {
			$css .= "#upperwrap {
					background-color: {$upperwidgets_color};
					}";
		}
		$css .= "#navsep {
					display: none;
				}";	
	} elseif ( 1 == $isheader ) { 
		$css .= "#upperwrap, #navsep {
					display: none;
				}";		
	} else {	
		$css .= "#upperwrap {
					display: none;
				}";	
	}
	$googlefonts = 1;
	if ("'Roboto Condensed', sans-serif" == $header_title_font || "'Roboto Condensed', sans-serif" == $header_text_font || "'Roboto Condensed', sans-serif" == $body_font || "'Roboto Condensed', sans-serif" == $heading_font || "'Roboto Condensed', sans-serif" == $title_font || "'Roboto Condensed', sans-serif" == $tagline_font || "'Roboto Condensed', sans-serif" == $menu_font) {
		wp_enqueue_style( 'googlefonts1', "//fonts.googleapis.com/css?family=Roboto+Condensed:400,700,700italic,400italic" );
	}
	if ("'Open Sans', sans-serif" == $header_title_font || "'Open Sans', sans-serif" == $header_text_font || "'Open Sans', sans-serif" == $body_font || "'Open Sans', sans-serif" == $heading_font || "'Open Sans', sans-serif" == $title_font || "'Open Sans', sans-serif" == $tagline_font || "'Open Sans', sans-serif" == $menu_font) {
		wp_enqueue_style( 'googlefonts2', "//fonts.googleapis.com/css?family=Open+Sans:400,400italic,700,700italic" );
	}
	if ("'Russo One', sans-serif" == $header_title_font || "'Russo One', sans-serif" == $header_text_font || "'Russo One', sans-serif" == $body_font || "'Russo One', sans-serif" == $heading_font || "'Russo One', sans-serif" == $title_font || "'Russo One', sans-serif" == $tagline_font || "'Russo One', sans-serif" == $menu_font) {
		wp_enqueue_style( 'googlefonts3', "//fonts.googleapis.com/css?family=Russo+One" );
	}

	wp_enqueue_style( 'coral-drive-style', get_stylesheet_directory_uri() . '/style.css' );

	wp_add_inline_style( 'coral-drive-style', $css );
	
	wp_enqueue_script( 'coral-drive-navigation', get_template_directory_uri() . '/js/jquery.smartmenus.min.js', array('jquery'), '0.9.7', true );
	
	wp_enqueue_script( 'coral-drive-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20130115', true );
	
	$params_array = array(
		'titlefontsize' => $title_fontsize,
		'taglinefontsize' => $tagline_fontsize,
		'isheader' => $isheader
	);	

	wp_enqueue_script( 'coral-drive-script', get_template_directory_uri() . '/js/functions.js', array( 'jquery' ), '20160427', true );
	
	wp_localize_script( 'coral-drive-script', 'paramsForJs', $params_array );
	
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'coral_drive_scripts' );

/**
 * Implement the Custom Header feature.
 */
//require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';

/**
 * Create the required classes for the logo
 */
function coral_drive_logo_class() {
	$logowidth = absint(get_theme_mod('coral_drive_logowidth_setting', '35'));
	$class=" grid-". $logowidth ." tablet-grid-80 mobile-grid-80";
	echo esc_attr($class);
}	
/**
 * Create the required classes for the header widget area
 */
function coral_drive_header_right_class() {
	$logowidth = absint(get_theme_mod('coral_drive_logowidth_setting', '35'));
	$areawidth = 100 - $logowidth;
	if ( 0 != $areawidth) {
		if (34 == $areawidth || 67 == $areawidth) $areawidth = $areawidth -1;
		$class=" grid-". $areawidth ." tablet-grid-". $areawidth ." mobile-grid-100";
	} else {
		$class=" hide-on-desktop hide-on-tablet hide-on-mobile";
	}
	echo esc_attr($class);
}	
/**
 * Create the required classes for the topmenu
 */
function coral_drive_nav_class() {
	$logowidth = absint(get_theme_mod('coral_drive_logowidth_setting', '35'));
	$areawidth = 100 - $logowidth;
	if ( 0 != $areawidth) {
		if (34 == $areawidth || 67 == $areawidth) $areawidth = $areawidth -1;
		$class=" grid-". $areawidth ." tablet-grid-100 mobile-grid-100 mynavi";
	} else {
		$class=" hide-on-desktop hide-on-tablet hide-on-mobile";
	}
	return $class;
}	
/**
 * Create the required classes for the menu button
 */
function coral_drive_menu_button_class() {
	$logowidth = absint(get_theme_mod('coral_drive_logowidth_setting', '35'));
	$areawidth = 100 - $logowidth;
	if ( 0 != $areawidth) {
		if (34 == $areawidth || 67 == $areawidth) $areawidth = $areawidth -1;
		$class=" grid-". $areawidth ." tablet-grid-20 mobile-grid-20";
	} else {
		$class=" grid-100 tablet-grid-100 mobile-grid-100";
	}
	echo esc_attr($class);
}	
/**
 * Create the required classes for the site columns
 */
function coral_drive_column_class($column) {

		$sidebarwidth = absint(get_theme_mod('coral_drive_sidebarwidth_setting', '30'));
		$contentwidth = 100 - $sidebarwidth;
		if (34 == $contentwidth || 67 == $contentwidth) $contentwidth = $contentwidth -1;
		switch ($column) {
			case "content":
				$class=" grid-". $contentwidth ." tablet-grid-". $contentwidth ." mobile-grid-100 push-". $sidebarwidth ." tablet-push-". $sidebarwidth;
				break;
			case "sidebar1":
				$class=" grid-". $sidebarwidth ." tablet-grid-". $sidebarwidth ." mobile-grid-100 pull-". $contentwidth ." tablet-pull-". $contentwidth;
				break;
		}	
		echo esc_attr($class);
}
/**
 * Create the required classes for the header widgets
 */
function coral_drive_header_widget_class() {
	$numfw = 0;
	for ($i = 1; $i <= 2; $i++) {
		$argu = "header-".$i;
		if ( is_active_sidebar( $argu ) ) $numfw = $numfw + 1;
	}
	$width = ( 0 != $numfw ) ? round (100 / $numfw) : 100 ;
	$class = " grid-". $width ." tablet-grid-". $width ." mobile-grid-100";
	echo esc_attr($class);
}
/**
 * Create the required classes for the footer copyright widget
 */
function coral_drive_copyright_class() {
	$class=" grid-70 tablet-grid-70 mobile-grid-100";
	echo esc_attr($class);
}	
/**
 * Create the required classes for the footer social widget
 */
function coral_drive_social_class() {
	$class=" grid-30 tablet-grid-30 mobile-grid-100";
	echo esc_attr($class);
}	
/**
 * Create the required classes for the upper widget area
 */
function coral_drive_upper_class() {
	$dotted = get_theme_mod('upperwidgets_dotted_setting', '');
	$class = ( 1 == $dotted ) ? " dottedbg" : "" ;
	echo esc_attr($class);
}	
/**
 * Create the required classes for the upper widgets
 */
function coral_drive_upper_widget_class() {
	$numuw = 0;
	for ($i = 1; $i <= 4; $i++) {
		$argu = "upper-".$i;
		if ( is_active_sidebar( $argu ) ) $numuw = $numuw + 1;
	}
	$width = ( 0 != $numuw ) ? round (100 / $numuw) : 100 ;
	$class = " grid-". $width ." tablet-grid-". $width ." mobile-grid-100";
	echo esc_attr($class);
}

/* Change attachment page image size*/
if ( ! function_exists( "coral_drive_prepend_attachment" )) :
function coral_drive_prepend_attachment($p) {
return wp_get_attachment_link(0, 'large', false);
}
add_filter('prepend_attachment', 'coral_drive_prepend_attachment');
endif;

/* Fallback for wp_nav_menu */
function coral_drive_wp_page_menu_mine( $args = array() ) {
	$defaults = array('sort_column' => 'menu_order, post_title', 'menu_class' => 'menu', 'echo' => true, 'link_before' => '', 'link_after' => '');
	$args = wp_parse_args( $args, $defaults );

	/**
	 * Filter the arguments used to generate a page-based menu.
	 *
	 * @since 2.7.0
	 *
	 * @see wp_page_menu()
	 *
	 * @param array $args An array of page menu arguments.
	 */
	$args = apply_filters( 'wp_page_menu_args', $args );

	$menu = '';

	$list_args = $args;

	// Show Home in the menu
	if ( ! empty($args['show_home']) ) {
		if ( true === $args['show_home'] || '1' === $args['show_home'] || 1 === $args['show_home'] )
			$text = __('Home', 'coral-drive');
		else
			$text = $args['show_home'];
		$class = '';
		if ( is_front_page() && !is_paged() )
			$class = 'class="current_page_item"';
		$menu .= '<li ' . $class . '><a href="' . home_url( '/' ) . '">' . $args['link_before'] . $text . $args['link_after'] . '</a></li>';
		// If the front page is a page, add it to the exclude list
		if (get_option('show_on_front') == 'page') {
			if ( !empty( $list_args['exclude'] ) ) {
				$list_args['exclude'] .= ',';
			} else {
				$list_args['exclude'] = '';
			}
			$list_args['exclude'] .= get_option('page_on_front');
		}
	}

	$list_args['echo'] = false;
	$list_args['title_li'] = '';
	$menu .= str_replace( array( "\r", "\n", "\t" ), '', wp_list_pages($list_args) );

	if ( $menu ) {
		$menu = '<ul id="main-menu" class="sm sm-clean collapsed">' . $menu . '</ul>';
	}
	$menu = '<div class="' . esc_attr($args['menu_class']) . '">' . $menu . "</div>\n";

	/**
	 * Filter the HTML output of a page-based menu.
	 *
	 * @since 2.7.0
	 *
	 * @see wp_page_menu()
	 *
	 * @param string $menu The HTML output.
	 * @param array  $args An array of arguments.
	 */
	$menu = apply_filters( 'wp_page_menu', $menu, $args );
	if ( $args['echo'] )
		echo $menu;
	else
		return $menu;
}
/* Woocommerce support */
remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);
add_action('woocommerce_before_main_content', 'coral_drive_theme_wrapper_start', 10);
add_action('woocommerce_after_main_content', 'coral_drive_theme_wrapper_end', 10);

function coral_drive_theme_wrapper_start() {
  echo '<div id="primary" class="content-area egrid'; coral_drive_column_class('content'); echo '">
		<main id="main" class="site-main" role="main">';
}

function coral_drive_theme_wrapper_end() {
  echo '</main>	</div>';
}

// Woocommerce breadcrumbs removal
add_action( 'init', 'coral_drive_remove_wc_breadcrumbs' );
function coral_drive_remove_wc_breadcrumbs() {
    remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20, 0 );
}
// Modification of max_srcset_image_width
if ( ! function_exists( "coral_drive_max_srcset_image_width" )) :
function coral_drive_max_srcset_image_width( $max_width, $size_array ) {
    $width = $size_array[0];
 
    if ( $width > 800 ) {
        $max_width = 1960;
    }
 
    return $max_width;
}
add_filter( 'max_srcset_image_width', 'coral_drive_max_srcset_image_width', 10, 2 );
endif;
/**
 * Add custom image sizes attribute to enhance responsive image functionality
 * for content images
 *
 *
 * @param string $sizes A source size value for use in a 'sizes' attribute.
 * @param array  $size  Image size. Accepts an array of width and height
 *                      values in pixels (in that order).
 * @return string A source size value for use in a content image 'sizes' attribute.
 */
function coral_drive_content_image_sizes_attr( $sizes, $size ) {
	$width = $size[0];

	if ( 980 > $width ) {
		$sizes = '(max-width: ' . $width . 'px) 100vw, ' . $width . 'px';
	} else {
		$sizes = '(max-width: 980px) 100vw, 980px';
	}

	return $sizes;
}
add_filter( 'wp_calculate_image_sizes', 'coral_drive_content_image_sizes_attr', 10 , 2 );

// make your custom sizes selectable from your WordPress admin
add_filter( 'image_size_names_choose', 'coral_drive_my_custom_sizes' );
 
function coral_drive_my_custom_sizes( $sizes ) {
    return array_merge( $sizes, array(
        'medium_large' => __( 'Medium-Large', 'coral-drive' ),
    ) );
}
// Callback function to filter the MCE settings
function coral_drive_mce_before_init_insert_formats( $init_array ) {  
//	$init_array['menubar'] = true;

	// Define the style_formats array
	$style_formats = array(  
		// Each array child is a format with it's own settings
		array(  
			'title' => 'Buttons',  
			'items' => array(
						array(  
							'title' => 'Dark button',  
							'inline' => 'a',  
							'classes' => 'button',
							'wrapper' => true,
							),
						array(  
							'title' => 'Light button',  
							'inline' => 'a',  
							'classes' => 'button button-light',
							'wrapper' => true,
							),
						array(  
							'title' => 'Large dark button',  
							'inline' => 'a',  
							'classes' => 'button large-button-dark',
							'wrapper' => true,
							),
						array(  
							'title' => 'Large light button',  
							'inline' => 'a',  
							'classes' => 'button large-button-light',
							'wrapper' => true,
							),
						),
		),
		array(  
			'title' => 'Div',  
			'block' => 'div',  
			'wrapper' => true,
		),
	);  
	// Insert the array, JSON ENCODED, into 'style_formats'
	$init_array['style_formats'] = json_encode( $style_formats );  
	
	return $init_array;  
  
} 
// Attach callback to 'tiny_mce_before_init' 
 add_filter( 'tiny_mce_before_init', 'coral_drive_mce_before_init_insert_formats' ); 
 
/**
 * Display icons in social links menu.
 *
 * @param  string  $item_output The menu item output.
 * @param  WP_Post $item        Menu item object.
 * @param  int     $depth       Depth of the menu.
 * @param  array   $args        wp_nav_menu() arguments.
 * @return string  $item_output The menu item output with social icon.
 */
function coral_drive_nav_menu_social_icons( $item_output, $item, $depth, $args ) {
	// Get supported social icons.
	$social_icons = coral_drive_social_links_icons();

	// Change icon inside social links menu if there is supported URL.
	if ( 'social' === $args->theme_location ) {
		foreach ( $social_icons as $attr => $value ) {
			if ( false !== strpos( $item_output, $attr ) ) {
				$iconclass = esc_attr( $value );
				$item_output = str_replace( $args->link_after, '</span>' . '<i class="'. $iconclass .'"></i>', $item_output );
			}
		}
	}

	return $item_output;
}
add_filter( 'walker_nav_menu_start_el', 'coral_drive_nav_menu_social_icons', 10, 4 );

/**
 * Returns an array of supported social links (URL and icon class).
 *
 * @return array $social_links_icons
 */
function coral_drive_social_links_icons() {
	// Supported social links icons.
	$social_links_icons = array(
		'behance.net'     => 'fa fa-behance',
		'codepen.io'      => 'fa fa-codepen',
		'del.icio.us'     => 'fa fa-delicious',
		'deviantart.com'  => 'fa fa-deviantart',
		'digg.com'        => 'fa fa-digg',
		'dribbble.com'    => 'fa fa-dribbble',
		'dropbox.com'     => 'fa fa-dropbox',
		'facebook.com'    => 'fa fa-facebook',
		'feed'    		  => 'fa fa-rss',
		'flickr.com'      => 'fa fa-flickr',
		'foursquare.com'  => 'fa fa-foursquare',
		'plus.google.com' => 'fa fa-google-plus',
		'github.com'      => 'fa fa-github',
		'instagram.com'   => 'fa fa-instagram',
		'linkedin.com'    => 'fa fa-linkedin',
		'mailto:'         => 'fa fa-envelope-o',
		'medium.com'      => 'fa fa-medium',
		'pinterest.com'   => 'fa fa-pinterest-p',
		'getpocket.com'   => 'fa fa-get-pocket',
		'reddit.com'      => 'fa fa-reddit-alien',
		'skype.com'       => 'fa fa-skype',
		'skype:'          => 'fa fa-skype',
		'slideshare.net'  => 'fa fa-slideshare',
		'snapchat.com'    => 'fa fa-snapchat-ghost',
		'soundcloud.com'  => 'fa fa-soundcloud',
		'spotify.com'     => 'fa fa-spotify',
		'stumbleupon.com' => 'fa fa-stumbleupon',
		'tumblr.com'      => 'fa fa-tumblr',
		'twitch.tv'       => 'fa fa-twitch',
		'twitter.com'     => 'fa fa-twitter',
		'vimeo.com'       => 'fa fa-vimeo',
		'vine.co'         => 'fa fa-vine',
		'vk.com'          => 'fa fa-vk',
		'wordpress.org'   => 'fa fa-wordpress',
		'wordpress.com'   => 'fa fa-wordpress',
		'xing.com'   	  => 'fa fa-xing',
		'yelp.com'        => 'fa fa-yelp',
		'youtube.com'     => 'fa fa-youtube',
	);

	/**
	 * Filter social links icons.
	 *
	 * @param array $social_links_icons
	 */
	return apply_filters( 'coral_drive_social_links_icons', $social_links_icons );
} 