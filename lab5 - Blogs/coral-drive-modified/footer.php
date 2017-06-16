<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package coral-drive
 */
?>

	</div><!-- #content -->
  </div><!-- #contentwrap -->
  <div id="footerwrap">
	<footer id="colophon" class="site-footer grid-container" role="contentinfo">
		<div class="egrid <?php coral_drive_copyright_class(); ?>" id="footer-widget-copyright">
			<?php if ( is_active_sidebar( 'footer-copyright' ) ) dynamic_sidebar( 'footer-copyright' ); ?>
		</div>
		<div id="social1" class="egrid <?php coral_drive_social_class(); ?>">
			<?php if ( has_nav_menu( 'social' ) ) : ?>
					<nav class="social-navigation alignright" role="navigation" aria-label="<?php _e( 'Footer Social Links Menu', 'coral-drive' ); ?>">
						<?php
							wp_nav_menu( array(
								'theme_location' => 'social',
								'menu_class'     => 'social-links-menu',
								'depth'          => 1,
								'link_before'    => '<span class="screen-reader-text">',
								'link_after'     => '</span>' . '<i class="fa fa-question"></i>' ,
							) );
						?>
					</nav><!-- .social-navigation -->
			<?php endif; ?>
			<a id="designer" class="alignright" href="http://www.coralthemes.com/"><?php echo __( 'Coral Themes', 'coral-drive' ); ?></a>
		</div>
	</footer><!-- #colophon -->
  </div><!-- #footerwrap -->	
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
