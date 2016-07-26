<?php get_header(); ?> 
<?php if (have_posts()) : ?>   
	<?php while (have_posts()) : the_post(); ?>
		<article class="step">
			<div class="col-1-2">
				<div class="step-title">
					<?php echo types_render_field( "title", array() ); ?>
				</div>
				<div class="step-subtitle">
					<?php echo types_render_field( "subtitle", array() ); ?>
				</div>
				<div class="text">
					<?php echo types_render_field( "text", array()); ?>
				</div>
			</div>
			<div class="col-2-2">
				<?php echo types_render_field( "button-text", array()); ?>
			</div>
				

		</article>   
	<?php endwhile; ?> 
<?php endif; ?> 
<?php get_footer(); ?>