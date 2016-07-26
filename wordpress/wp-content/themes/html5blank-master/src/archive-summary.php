<?php get_header(); ?> 
<?php if (have_posts()) : ?>   
	<?php while (have_posts()) : the_post(); ?>
		<article class="summary">
			<?php echo types_render_field( "summary-title", array() ); ?>
			<?php echo types_render_field( "summary-title-2", array() ); ?>
			<?php echo types_render_field( "send-button", array()); ?>
			<?php echo types_render_field( "save-as-pdf", array()); ?>
		</article>   
	<?php endwhile; ?> 
<?php endif; ?> 
<?php get_footer(); ?>