<?php get_header(); ?> 
<?php if (have_posts()) : ?>   
	<?php while (have_posts()) : the_post(); ?>
		<article class="intro">
			<div class="col-1-2">
				<div class="intro-title">
					<?php echo types_render_field( "title-line-1", array() ); ?>
					<?php echo types_render_field( "title-line-2", array() ); ?>
				</div>
				<div class="intro-subtitle">
					<?php echo types_render_field( "subtitle", array() ); ?>
				</div>
				<div class="text">
					<?php echo types_render_field( "into-text", array()); ?>
				</div>
			</div>
			<div class="col-2-2">
				<div class="intro-flair">
					<?php echo types_render_field( "flair", array()); ?>
				</div>
				<div class="intro-credits">
					<?php echo types_render_field( "credits", array()); ?>
				</div>
			</div>
				

		</article>   
	<?php endwhile; ?> 
<?php endif; ?> 
<?php get_footer(); ?>