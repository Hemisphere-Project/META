<?php /* Template Name: Main Page */ get_header(); ?>

	<main role="main">
		<div id="fullpage">
			<div class="section">
				<!-- section -->
				<section class="slide">
					<?php 
					$args = array( 'post_type' => 'intropage', 'posts_per_page' => 10 );
					$loop = new WP_Query( $args );
					while ( $loop->have_posts() ) : $loop->the_post();?>
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
					<?php endwhile; ?>
					
				</section>
				<!-- /section -->
				<!-- section -->
				<section class="slide">
					<?php 
					$args = array( 'post_type' => 'step', 'posts_per_page' => 10 );
					$loop = new WP_Query( $args );
					while ( $loop->have_posts() ) : $loop->the_post();?>
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
					<?php endwhile; ?>
					
				</section>
				<!-- /section -->
				<!-- section -->
				<section class="slide">
					<?php 
					$args = array( 'post_type' => 'planetary-agenda', 'posts_per_page' => 10 );
					$loop = new WP_Query( $args );
					while ( $loop->have_posts() ) : $loop->the_post();?>
						<?php echo types_render_field( "title-selected-nodes", array() ); ?>
						<?php echo types_render_field( "generate-button", array() ); ?>
						<?php echo types_render_field( "reset-button", array()); ?>
						<?php echo types_render_field( "ok-button", array()); ?>
					<?php endwhile; ?>
					
				</section>
				<!-- /section -->
				<!-- section -->
				<section class="slide">
					<?php 
					$args = array( 'post_type' => 'summary', 'posts_per_page' => 10 );
					$loop = new WP_Query( $args );
					while ( $loop->have_posts() ) : $loop->the_post();?>
						<?php echo types_render_field( "summary-title", array() ); ?>
						<?php echo types_render_field( "summary-title-2", array() ); ?>
						<?php echo types_render_field( "send-button", array()); ?>
						<?php echo types_render_field( "save-as-pdf", array()); ?>
					<?php endwhile; ?>
					
				</section>
				<!-- /section -->
			</div>
		</div>
	</main>


