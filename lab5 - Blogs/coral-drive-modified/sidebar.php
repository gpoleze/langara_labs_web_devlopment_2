<?php
/**
 * The sidebar containing the main widget area.
 *
 * @package coral-drive
 */
?>

<div id="secondary" class="widget-area egrid <?php coral_drive_column_class('sidebar1'); ?>" role="complementary">
<?php 
	if ( is_active_sidebar( 'sidebar-1' ) ) {
		dynamic_sidebar( 'sidebar-1' ); 
	}
?>
</div><!-- #secondary -->
