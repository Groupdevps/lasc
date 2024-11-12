<template>
	<v-container 
		fluid
		
	>
		<template
			v-for = "(item_body, idx_body) of landings"
		>
			<!-- {{ item_body.key }} -->
			<v-row
				:key 	 = "item_body.key + ref"
				:id 	 = "item_body.key"
				:class   = "item_body.class"
				:align   = "item_body.align"
				:justify = "item_body.justify"
				:style   = "`height  : ${height_landing}px`"
			>
				<!-- :style   = "item_body.style" -->
				<template 
					v-for = "(item_session, idx_session) of item_body.sessions">
					<v-col
						:cols = "item_session.col"
						:key  = " idx_body + ref + idx_session "	
					>
						<v-card 
							:outlined  =  "item_session.outlined"  
							:elevation =  "item_session.elevation"  
							:color 	   =  "item_session.color"
						>
							<v-card-title
								:class = "item_session.class_title"
								v-if   = "item_session.title"
							>
								<span
									:class = "item_session.class_pre_title"
								>
									{{ item_session.pre_title }}
								</span>	
								<span>
									{{ item_session.title }}
								</span>	
							</v-card-title>
							<v-card-text
								:class = "item_session.class_text"
							>
								<v-row
									:align      = "item_session.align"
									:justify    = "item_session.justify"
									:no-gutters = "item_session.no_gutters"
								>
									
									<template 
										v-for = "(item_cont, idx_cont) of item_session.contents" 
									>
										<v-col
											:cols = "item_cont.col"
										>
												
											<p
												v-if 	= "item_cont.text && item_cont.type == 'texts'" 
												:class 	= "item_cont.class_text"
												:key  	= " idx_body + ref + idx_cont + 'text'"	
												
											>
												{{ item_cont.text }}
											</p>
											<v-img
												v-if 	= "item_cont.image"
												:key  	= "idx_body + ref + idx_cont + 'image'"
												:src 	= "item_cont.image"
												:class 	= "item_cont.class_image"
												:width 	= "item_cont.width"
												:height = "item_cont.height" 	

											>
												
											</v-img>
											<v-window 
												v-if 	= "item_cont.images_sliders && item_cont.images_sliders.length > 0"
												v-model = "onboarding[item_cont.key]">
										      	<v-window-item
											        v-for = "(item_img, idx_img) of item_cont.images_sliders"
											        :key  = "`image_slider-${item_img}-${idx_img} `"
										      	>
											

										      			<v-img
															v-if 	= "item_img.image"
															:key  	= "idx_body + ref + idx_img + 'img_sliders'"
															:src 	= "item_img.image"
															:class 	= "item_img.class_image"
															:width 	= "item_img.width"
															:height = "item_img.height" 	

														>
															
														</v-img>
										      	</v-window-item>
										      	<v-item-group
												    mandatory
												    v-model = "onboarding[item_cont.key]"
												    class   = "text-center"
												  >
												    <v-item
												      v-for  = "(btn_slider, idx_btn_slider) of  item_cont.images_sliders"
												      :key   = "`btn-${idx_btn_slider + ref}`"
												      v-slot = "{ active, toggle }"
												    >
												      <v-btn
												        :input-value = "active"
												        icon
												        @click = "toggle"
												      >
												        <v-icon>mdi-record</v-icon>
												      </v-btn>
												    </v-item>
												  </v-item-group>
    										</v-window>

    										<v-text-field
												dense	
												outlined
												hide-details
    											v-if 	= "item_cont.text_field && ['text', 'number'].includes(item_cont.type)" 
    											:label 	= "item_cont.text_field"
												:class 	= "item_cont.class"
												:key  	= " idx_body + ref + idx_cont + 'text_field'"
												v-model = "info[item_cont.field]"
    										>
    											
    										</v-text-field>
    										<v-textarea
    											dense	
												outlined
												hide-details
    											v-if 	= "item_cont.text_field && ['textarea'].includes(item_cont.type)" 
    											:label 	= "item_cont.text_field"
												:class 	= "item_cont.class"
												:key  	= " idx_body + ref + idx_cont + 'text_area'"
												v-model = "info[item_cont.field]"
    										
    										></v-textarea>
    										<v-btn
    											small 
    											v-if 	= "item_cont.type == 'btn'"
    											:color 	= "item_cont.color"
    											@click  = "actions(item_cont)"

    										>
    											{{ item_cont.text_btn }}
    										</v-btn>
											<template
												v-if 	= "item_cont.sub_contents && item_cont.sub_contents.length > 0"
												v-for 	= "(sub_cont, idx_sub_cont) of item_cont.sub_contents" 
											>
												
												<p
													:class  = "sub_cont.class" 
													:key  	= "idx_body + ref + idx_sub_cont + 'sub_content'"									
												>
													{{ sub_cont.text }}
												</p>
											</template>
												
											</p>
										</v-col>
										
									</template>
								</v-row>
							</v-card-text>
						</v-card>

					</v-col>
				</template>
			</v-row>
		</template>
	</v-container>
</template>
<script 
 	type = "text/javascript"
 	src  = "./js/landing.js"
 ></script>