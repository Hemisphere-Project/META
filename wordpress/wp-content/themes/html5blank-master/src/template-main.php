<?php /* Template Name: Main Page */ get_header(); ?>

	<main role="main">
		<div id="fullpage">
			<div class="section">
				<!-- section -->
				<section class="slide">
					<div class="subwrap">
						<?php 
						$args = array( 'post_type' => 'intropage', 'posts_per_page' => 10 );
						$loop = new WP_Query( $args );
						while ( $loop->have_posts() ) : $loop->the_post();?>
							<div class="col-1-2 left-column">
							<div class="intro-title">
								<div class="intro-title-line-1">
									<?php echo types_render_field( "title-line-1", array() ); ?>
								</div>
								<div class="intro-title-line-2">
									<?php echo types_render_field( "title-line-2", array() ); ?>
								</div>
							</div>
							<div class="intro-subtitle">
								<?php echo types_render_field( "subtitle", array() ); ?>
							</div>
							<div class="text">
								<?php echo types_render_field( "into-text", array()); ?>
							</div>
						</div>
						<div class="col-1-2 right-column">
							<div class="intro-flair intro-box intro-box-black">
								<div class="title">&#183LAIR</div>
								<div class="text">
								<?php echo types_render_field( "flair", array()); ?>
								</div>
							</div>
							<div class="intro-credits intro-box intro-box-white">
								<div class="title">CREDITS</div>
								<div class="text">
									<?php echo types_render_field( "credits", array()); ?>
								</div>
							</div>
						</div>
						<?php endwhile; ?>
					</div>
					
				</section>
				<!-- /section -->
				<!-- section -->
				<section class="slide">
					<div class="subwrap">
						<?php 
						$args = array( 'post_type' => 'step', 'posts_per_page' => 10 );
						$loop = new WP_Query( $args );
						while ( $loop->have_posts() ) : $loop->the_post();?>
						<div class="col-1-2 ">
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
						<div class="col-2-2 ">
							<?php echo types_render_field( "button-text", array()); ?>
						</div>
						<?php endwhile; ?>
					</div>
				</section>
				<!-- /section -->
				<!-- section -->
				<section class="slide planetary-agenda">
					<div class="planetary-agenda-container">
					</div>
					<div class="right-menu">
						<?php 
						$args = array( 'post_type' => 'planetary-agenda', 'posts_per_page' => 10 );
						$loop = new WP_Query( $args );
						while ( $loop->have_posts() ) : $loop->the_post();?>
							<div class="title">
								<?php echo types_render_field( "title-selected-nodes", array() ); ?>
							</div>
							<div class="selected-paths-section">
							</div>
							<div class="buttons-group">
								<div id="generate-btn" class="button">
									<span class="text">
										<?php echo types_render_field( "generate-button", array() ); ?>
									</span>
									<span class="icon generate-ico">
									</span>
								</div>
								<div id="reset-btn" class="button">
									<span class="text">
										<?php echo types_render_field( "reset-button", array()); ?>
									</span>
									<span class="icon reset-ico">
									</span>
								</div>
								<div id="validate-btn" class="button">
									<span class="text">
										<?php echo types_render_field( "ok-button", array()); ?>
									</span>
									<span class="icon validate-ico">
									</span>
								</div>
							</div>
						<?php endwhile; ?>
					</div>
				</section>
				<!-- /section -->
				<!-- section -->
				<section class="slide">
					<div class="subwrap">
						<?php 
						$args = array( 'post_type' => 'summary', 'posts_per_page' => 10 );
						$loop = new WP_Query( $args );
						while ( $loop->have_posts() ) : $loop->the_post();?>
							<?php echo types_render_field( "summary-title", array() ); ?>
							<?php echo types_render_field( "summary-title-2", array() ); ?>
							<?php echo types_render_field( "send-button", array()); ?>
							<?php echo types_render_field( "save-as-pdf", array()); ?>
						<?php endwhile; ?>
					</div>
				</section>
				<!-- /section -->
			</div>
		</div>
	</main>


