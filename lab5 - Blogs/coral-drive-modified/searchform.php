<div class="search-container">
<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<fieldset>
		<input type="search" class="search-field" placeholder="<?php echo esc_attr_x( 'Search...', 'placeholder', 'coral-drive' ) ?>" value="<?php echo get_search_query(true) ?>" name="s" title="<?php echo esc_attr_x( 'Search for:', 'label', 'coral-drive' ) ?>" />
		<input type="submit" class="search-submit" value="" />
	</fieldset>
</form>
</div>