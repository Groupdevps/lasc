export default {
	name 	: "landing",
	data 	: (vm) => ({
		height_landing 	: 500,
		ref 			: "landing",
		onboarding 		: {
			screenshots : 0,
		},
		info 			: {
			contact : {},
		},
		landings : [
			{
				key 	: "start",
				class 	: "primary", 
				align	: "center",
				justify : "center",
				// style   : { background : "red"},
				sessions : [ // cards
					{ 
 						col 		: 12,
 						elevation 	: 0,
 						class_title : "justify-center black--text font-weight-bold",
 						pre_title 	: "L-ASC", // "ARSALUD",  //,
 						class_pre_title : "white--text mr-2",
						title 		: "LEY ANTITRAMITES",
						color 		: "transparent",
						class_text  : "d-flex justify-center pa-1",
						align		: "center",
						justify 	: "center",
						no_gutters 	: true,
						contents 	: [ // texts
							{
								col 		: 10,
								text 		: "LEY ANTI-TRAMITE SALUD DE LOS COLOMBIANOS",
								type 		: "texts",
								class_text	: "pa-0 white--text d-flex justify-center",							
							},
							
						],
					},
 					{
 						col 		: 5,
 						elevation 	: 0,
 						class_title : "justify-center black--text font-weight-bold",
 						pre_title 	: "",
 						class_pre_title : "",
						title 		: "",
						color 		: "transparent",
						class_text  : "d-flex justify-center pa-0",
						align		: "center",
						justify 	: "center",
						no_gutters 	: true,
						contents 	: [
							{
								col 		: 12,
								type 		: "texts",
								text 		: vm.$t("mission"),
								class_text	: "pa-0 white--text font-weight-bold text-h4",	
								/*sub_contents : [

									{
										class : "",
										text  : vm.$t("mission"),
									}
								]			*/			
							},
							{
								col 		: 12,
								type 		: "texts",
								text 		: vm.$t("organization_that_guarantees"),
								class_text	: "pa-0 white--text ",	
							},
							{
								col 		: 12,
								text 		: vm.$t("vision"),
								type 		: "texts",
								class_text	: "pa-0 white--text font-weight-bold text-h4",	
							},
							{
								col 		: 12,
								text 		: vm.$t("universal_platform"),
								type 		: "texts",
								class_text	: "pa-0 white--text",	
							},
						],
 					},
 					{
 						col 		: 6,
 						elevation 	: 0,
 						class_title : "",
 						pre_title 	: "",
 						class_pre_title : "",
						title 		: "",
						color 		: "transparent",
						class_text  : "pa-0",
						align		: "center",
						justify 	: "center",
						no_gutters 	: true,
						contents 	: [
							
							{
								col 		: 9,
								image 		: "/img/LogoArSalud.jpg",//"/images/in2.png", / landing.png
								class_image : "d-flex justify-center",
								width 		: "100%",
								height 		: "100%",
								contain 	: true,
							}
						],
 					}
				],
			},
			{
				key 	: "description",
				class 	: "", 
				align	: "center",
				justify : "center",
				style   : { background : "red"},
				
				sessions : [ // cards
					{

						col 		: 12,
 						elevation 	: 0,
 						class_title : "justify-center black--text font-weight-bold",
						title 		: vm.$t("law_enforcement"),
						color 		: "transparent",
						class_text  : "d-flex justify-center pa-1",
						align		: "center",
						justify 	: "center",
						no_gutters 	: true,
						
					},
					{

						col 		: 3,
 						elevation 	: 0,
 						class_title : "justify-center black--text font-weight-bold",
						title 		: vm.$t("less_paper"),
						color 		: "transparent",
						class_text  : "d-flex justify-center pa-1",
						align		: "center",
						justify 	: "center",
						no_gutters 	: true,
						contents 	: [ // texts
							{
								col 		: 12,								
								image 		: "/images/intro1.png",
								class_image : "d-flex justify-center",
								width 		: "100%",
								height 		: "100%",
								contain 	: true,	
							},
							{
								col 		: 12,
								type 		: "texts",
								text 		: vm.$t("system_modeled_for"),
								class_text	: "pa-0 black--text d-flex justify-center",			
									
							},
							
						],
					},
					{

						col 		: 3,
 						elevation 	: 0,
 						class_title : "justify-center black--text font-weight-bold",
						title 		: vm.$t("fewer_rows"),
						color 		: "transparent",
						class_text  : "d-flex justify-center pa-1",
						align		: "center",
						justify 	: "center",
						no_gutters 	: true,
						contents 	: [ // texts
							{
								col 		: 12,								
								image 		: "/images/intro2.png",
								class_image : "d-flex justify-center",
								width 		: "100%",
								height 		: "100%",
								contain 	: true,	
							},
							{
								col 		: 12,
								type 		: "texts",
								text 		: vm.$t("agile_and_efficient_platform"),
								class_text	: "pa-0 black--text d-flex justify-center",							
							},
							
						],
					},
					{

						col 		: 3,
 						elevation 	: 0,
 						class_title : "justify-center black--text font-weight-bold",
						title 		: vm.$t("specialist_on_time"),
						color 		: "transparent",
						class_text  : "d-flex justify-center pa-1",
						align		: "center",
						justify 	: "center",
						no_gutters 	: true,
						contents 	: [ // texts
							{
								col 		: 12,								
								image 		: "/images/intro3.png",
								class_image : "d-flex justify-center",
								width 		: "100%",
								height 		: "100%",
								contain 	: true,	
							},
							{
								col 		: 12,
								type 		: "texts",
								text 		: vm.$t("attention_of_doctors"),
								class_text	: "pa-0 black--text d-flex justify-center",							
							},
							
						],
					},
					{

						col 		: 3,
 						elevation 	: 0,
 						class_title : "justify-center black--text font-weight-bold",
						title 		: vm.$t("service"),
						color 		: "transparent",
						class_text  : "",
						align		: "center",
						justify 	: "center",
						no_gutters 	: true,
						contents 	: [ // texts 
							{
								col 		: 12,								
								image 		: "/images/serv_calidad_3.png",
								class_image : "d-flex justify-center",
								width 		: "100%",
								height 		: "100%",
								contain 	: true,	
							},
							{
								col 		: 12,
								text 		: vm.$t("because_the_user"),
								type 		: "texts",
								class_text	: "pa-0 black--text d-flex justify-center",							
							},
							
						],
					},
				],
			},
			{
				key 	: "screenshots",
				class 	: "", 
				align	: "center",
				justify : "center",
				// style   : { background : "red"} 
				sessions : [ // cards 
					{
						
 						col 		: 12,
 						elevation 	: 0,
 						class_title : "justify-center black--text font-weight-bold",
 						
						title 		: vm.$t("some_screenshots"),
						color 		: "transparent",
						class_text  : "d-flex justify-center pa-1",
						align		: "center",
						justify 	: "center",
						no_gutters 	: true,
						contents 	: [ // texts
							{
								col 				: 8,
								key 				: "screenshots",
								images_sliders 		: [
									{
										image : "/images/item-01.png",
										width : "100%",
									},
									{
										image : "/images/item-02.png",
										width : "100%",

									},
								]					
							},
							
						],
					},
						
				
				],
			},
			{
				key 	: "contacts",
				class 	: "", 
				align	: "center",
				justify : "center",
				// style   : { background : "red"} 
				sessions : [ // cards 
					{
						
 						col 		: 6,
 						elevation 	: 0,
 						class_title : "justify-center black--text font-weight-bold",
 						
						title 		: vm.$t("contact"),
						color 		: "transparent",
						class_text  : "d-flex justify-center pa-1",
						align		: "center",
						justify 	: "center",
						no_gutters 	: true,
						contents 	: [ // texts

							{
								col 		: 12,
								text 		: vm.$t("contact_name_keysi"),
								type 		: "texts",
								class_text	: "pa-0 black--text d-flex justify-center",							
							},
							{
								col 		: 12,
								text 		: vm.$t("contact_tel"),
								type 		: "texts",
								class_text	: "pa-0 black--text d-flex justify-center",							
							},
							{
								col 		: 12,
								text 		: vm.$t("contact_email"),
								type 		: "texts",
								class_text	: "pa-0 black--text d-flex justify-center",							
							},
							{
								col 		: 12,
								text 		: vm.$t("contact_email1"),
								type 		: "texts",
								class_text	: "pa-0 black--text d-flex justify-center",							
							},
							{
								col 		: 12,
								text 		: vm.$t("contact_address"),
								type 		: "texts",
								class_text	: "pa-0 black--text d-flex justify-center",							
							},
							{
								col 		: 12,
								text 		: vm.$t("conctact_city"),
								type 		: "texts",
								class_text	: "pa-0 black--text d-flex justify-center",							
							},
						]
					},
					{
						
 						col 		: 6,
 						elevation 	: 0,
						color 		: "",
						class_text  : "d-flex justify-center pa-1",
						align		: "center",
						justify 	: "center",
						no_gutters 	: true,
						outlined    : true,
						contents 	: [ // texts
							{
								col 		: 12,
								key 		: "name",  
								text_field	: vm.$t("name"),
								type 		: "text",
								class_text	: "pa-0 black--text d-flex justify-center",						
								field 		: "contact.name",	
							},
							{
								col 		: 12,
								key 		: "email",  
								text_field	: vm.$t("email"),
								type 		: "text",
								class_text	: "pa-0 black--text d-flex justify-center",							
								field 		: "contact.email",	
							},
							{
								col 		: 12,
								key 		: "message",  
								text_field	: vm.$t("message"),
								type 		: "textarea",
								class_text	: "pa-0 black--text d-flex justify-center",							
								field 		: "contact.message",	
							},
							{
								col 		: 12,
								key 		: "send",  
								text_btn	: vm.$t("send"),
								type 		: "btn",
								class_text	: "pa-0 black--text d-flex justify-center",							
								action 		: "send_to_contact",
								color 		: "primary",
							},

						]
					},
				],


			},
		] 
	}), // data

	created(){
		// console.log("height_landing ", this.$vuetify.breakpoint.height);
		this.height_landing = this.$vuetify.breakpoint.height;
	}, // created

	methods : {
		
		actions(action, item, option){
			if (action.action == "send_to_contact"){

			}
		}, // actions

	}, // methods
}; // export default