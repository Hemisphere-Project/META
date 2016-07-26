<?php get_header(); ?> 
<?php if (have_posts()) : ?>   
	<?php while (have_posts()) : the_post(); ?>
		<article class="planetary-agenda">
			<?php echo types_render_field( "title-selected-nodes", array() ); ?>
			<?php echo types_render_field( "generate-button", array() ); ?>
			<?php echo types_render_field( "reset-button", array()); ?>
			<?php echo types_render_field( "ok-button", array()); ?>
		</article>   
	<?php endwhile; ?> 
<?php endif; ?> 
<?php get_footer(); ?>