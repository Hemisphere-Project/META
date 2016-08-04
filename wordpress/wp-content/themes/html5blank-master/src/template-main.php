<?php /* Template Name: Main Page */ get_header(); ?>

	<main role="main">

		<div id="fullpage">
			<div class="section">
				<!-- section -->
				<section class="slide">
					<div class="borderinfo-container">
						<div id="bi-flairedu-1" class="borderinfo-element">FLAIR<br>EDUCATION</div>
					</div>
				
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
								<div class="title"><span style="font-family: ReplicaFlairStd-Regular;">&#183</span>LAIR</div>
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
					<div class="borderinfo-container">
						<div id="bi-meta-2" class="borderinfo-element">META<br>WORKSHOP</div>
						<div id="bi-flairedu-2" class="borderinfo-element">FLAIR<br>EDUCATION</div>
					</div>
					<div class="subwrap">
						<?php 
						$args = array( 'post_type' => 'step', 'posts_per_page' => 10 );
						$loop = new WP_Query( $args );
						while ( $loop->have_posts() ) : $loop->the_post();?>
						<div class="col-1-2 left-column">
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
						<div class="col-1-2 right-column">
							<div class="step-next-button simple-button">
								<span class="text sb-label">
									<?php echo types_render_field( "button-text", array()); ?>
								</span>
								<span class="icon next-ico sb-ico">
								</span>
							</div>
						</div>
						<?php endwhile; ?>
					</div>
				</section>
				<!-- /section -->
				<!-- section -->
				<section class="slide planetary-agenda">
					<div class="borderinfo-container">
						<div id="bi-meta-3" class="borderinfo-element">META<br>WORKSHOP</div>
						<div id="bi-flairedu-3" class="borderinfo-element">FLAIR<br>EDUCATION</div>
						<div id="bi-step-3" class="borderinfo-element">STEP<br>-01-</div>
						<div id="bi-title-3" class="borderinfo-element">SOCIO-POLITICAL CONTEXT GENERATION</div>
					</div>
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
								<div id="generate-btn" class="button simple-button">
									<span class="text sb-label">
										<?php echo types_render_field( "generate-button", array() ); ?>
									</span>
									<span class="icon generate-ico sb-ico">
									</span>
								</div>
								<div id="reset-btn" class="button simple-button disabled">
									<span class="text sb-label">
										<?php echo types_render_field( "reset-button", array()); ?>
									</span>
									<span class="icon reset-ico sb-ico">
									</span>
								</div>
								<div id="validate-btn" class="button simple-button disabled">
									<span class="text sb-label">
										<?php echo types_render_field( "ok-button", array()); ?>
									</span>
									<span class="icon validate-ico sb-ico">
									</span>
								</div>
							</div>
						<?php endwhile; ?>
					</div>
				</section>
				<!-- /section -->
				<!-- section -->
				<section id="summary-slide" class="slide" >
					<div class="borderinfo-container">
						<div id="bi-meta-4" class="borderinfo-element">META<br>WORKSHOP</div>
						<div id="bi-flairedu-4" class="borderinfo-element">FLAIR<br>EDUCATION</div>
						<div id="bi-step-4" class="borderinfo-element">STEP<br>-01-</div>
					</div>
					<div class="subwrap">
						<?php 
						$args = array( 'post_type' => 'summary', 'posts_per_page' => 10 );
						$loop = new WP_Query( $args );
						while ( $loop->have_posts() ) : $loop->the_post();?>
							<div class="summary-title-container">
								<span class="summary-title-1">
									<?php echo types_render_field( "summary-title", array() ); ?>
								</span>
								<span class="summary-title-2">
									<?php echo types_render_field( "summary-title-2", array() ); ?>
								</span>
							</div>
							<div class="paths-summary-container">
							<!--	<div id="Enact taxation on international financial transactions" class="path" style="border-color:#E64047"><div class="close-btn"></div><div class="axe"><span class="axe-prefix" style="color:#E64047">AXE: </span><span>STAY UNITED<span></span></span></div><div class="subcategory"><span class="category-prefix" style="color:#E64047">SUBCATEGORY: </span><span>INCREASE INTERNATIONAL COOPERATION</span></div></div><div id="Create robotic workforce legislative framework" class="path" style="border-color:#4AA6E7"><div class="close-btn"></div><div class="axe"><span class="axe-prefix" style="color:#4AA6E7">AXE: </span><span>PUSH FORWARD<span></span></span></div><div class="subcategory"><span class="category-prefix" style="color:#4AA6E7">SUBCATEGORY: </span><span>SUPPORT ROBOTICS AND AI DEVELOPMENT</span></div></div><div id="Develop MRI imaging processes" class="path" style="border-color:#4AA6E7"><div class="close-btn"></div><div class="axe"><span class="axe-prefix" style="color:#4AA6E7">AXE: </span><span>PUSH FORWARD<span></span></span></div><div class="subcategory"><span class="category-prefix" style="color:#4AA6E7">SUBCATEGORY: </span><span>FOSTER LIFE SCIENCES DEVELOPMENT</span></div></div>
							-->
							</div>
							<!--<?php echo types_render_field( "send-button", array()); ?>-->
							<div class="save-as-pdf-btn-container">
								<div id="save-as-pdf-btn" class="button simple-button">
									<span class="text sb-label">
										<?php echo types_render_field( "save-as-pdf", array()); ?>
									</span>
									<span class="icon save-as-pdf-ico sb-ico">
									</span>
								</div>
							</div>
							
							
						<?php endwhile; ?>
					</div>
				</section>
				<!-- /section -->
			</div>
		</div>
	</main>


