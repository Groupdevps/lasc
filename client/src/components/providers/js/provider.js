export default {
	name 	: "provider",
	props   : [
	],
	data 	: (vm) => ({
		info : {
			products : [],
			count 	 : 0,
			price    : 0,
			provider : "",
		},
		products 	: [
			{
				image 		: "example",
				title  		: "test",				
				humanPrice  : 100.00,
				unit 		: 1,  
			}
		],
		head 		: {
			title 				: vm.$t("provider"),
			class_title 		: "pa-0 body-1 primary justify-center text-h5 text-uppercase white--text",
			class_icon 			: "mx-1",
			color_icon_title 	: "white", 
			icon 				: "mdi-cart-plus",
			class_text 			: "pa-1",
			cols_products 		: 3,
			product_card_class 	: "",
			col_image_value 	: "10",
			col_text_value 		: "10",	
			card_action_class 	: "",
			width_value 		: "350px",
			height_value 		: "200px",
			height_card 		: vm.$vuetify.breakpoint.height + "px" , // "400px"
		},
		product_actions : [
			{
				key 	: "units",
				type 	: "number",
				cols 	: 5,
				text 	: vm.$t("units"),
			},
			{
				key  	: "add_to_cart",
				type 	: "btn",
				color 	: "primary",		
				text 	: vm.$t("add_to_cart"),	
				action 	: "add_to_cart" ,
				cols 	: 7,
				offset  : "2",
			}
		],
		cart_options 	: [
			{
				key 		: "count",
				type 		: "chip",
				class 		: "",
				color 		: "success",				
				class_icon 	: "mr-1",
				color_icon 	: "white",
				icon  		: "mdi-abacus",				
			},
			{
				key 		: "count",
				type 		: "chip",
				class 		: "mx-1",
				color 		: "",
				action 		: "",
				class_icon 	: "mr-1",
				color_icon 	: "",
				icon  		: "mdi-currency-usd",
			},
			{
				key 		: "",
				type 		: "btn",
				class 		: "",
				color 		: "",
				action 		: { action : "redirect" , item : "/shopping_cart"},
				class_icon 	: "mx-1",
				color_icon 	: "",
				icon  		: "mdi-cart-arrow-right",
			},
		] 
	}), // data

	created(){

	}, // created

	computed : {
		render_products: function(){
			return this.products;
		}
	}, // computed	

	methods : {
		actions(action, item, option){
			if (action) {
				if (action.action == "add_to_cart") {

				}else
				if (action.action == "redirect"){
					this.$router.push(action.item);
				}
			}
		}, // actions

		get_list(){
			const api = "/api/v1/provider";
			this.loading = true;
			this.$Axios.get(api).then(res => {
				this.loading = false;
				
				if (res && res.data &&res.data.rows) {

				}
			}).catch(er => {
				this.loading = false;
				console.warn("Error get provider ", er)
			})
		}, // get list

		save(){
			const api 		= "/api/v1/provider";
			let info_up		= this.info;
			this.loading 	= true;
			this.$Axios.post(api, info_up).then(res => {
				this.loading = false;
				
				if (res && res.data ) {

				}
			}).catch(er => {
				this.loading = false;
				console.warn("Error create provider ", er)
			})
		}, // save

		update(item){
			if (item && item.id) {

				const api 		= "/api/v1/provider/" + item.id;
				let info_up		= item;
				this.loading 	= true;
				this.$Axios.put(api, info_up).then(res => {
					this.loading = false;
					
				}).catch(er => {
					this.loading = false;
					console.warn("Error update provider ", er)
				})
			}else{
				console.warn("Required id to update")
			}
		}, // update

		del(){
			if (item && item.id) {

				const api 		= "/api/v1/provider/" + item.id;
				
				this.loading 	= true;
				this.$Axios.delete(api).then(res => {
					this.loading = false;
					
				}).catch(er => {
					this.loading = false;
					console.warn("Error delete provider ", er)
				})
			}else{
				console.warn("Required id to update")
			}
		}, // del

	}, // methods
	
}; // export default