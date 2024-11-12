export default {
	name 	: "shopping_cart",
	props   : [
	],
	data 	: (vm) => ({
		ref  : "shopping_cart",	
		info : {
			products : [],
			count 	 : 0,
			price    : 0,
			provider : "",
			total 	 : 0,
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
			title 				: vm.$t("shopping_cart"),
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
			class_table 		: "elevation-1",
			height_table 		: (vm.$vuetify.breakpoint.height - 150) + "px",
		},
		total 		: 0,
		options 	: {},
		headers : [
			{ text : "title", value : "title" },
			{ text : "humanPrice", value : "humanPrice" },
			{ text : "unit", value : "unit" },
			{ text : "total", value : "total" },




		],
		product_actions : [
			// {
			// 	key 	: "units",
			// 	type 	: "number",
			// 	cols 	: 5,
			// 	text 	: vm.$t("units"),
			// },
			{
				key  	: "pay",
				type 	: "btn",
				color 	: "primary",		
				text 	: vm.$t("pay"),	
				action 	: "pay" ,
				cols 	: 1,
				offset  : "0",
			}
		],
		
	}), // data

	created(){
		this.get_list();
	}, // created

	watch : {
		options : {
			handler(){
				// this.get_list()
			}, deep : true,
		}, //options
	}, // watch

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
					this.$route.push(action.item);
				}
			}
		}, // actions

		get_list(){
			const api = "/api/v1/provider";
			this.loading = true;
			this.$Axios.get(api).then(res => {
				this.loading = false;
				
				if (res && res.data && res.data.rows) {
					this.products = res.data.rows;
					this.total    = this.products.length;
					this.products.forEach((it)=>{
						this.info.total +=  it.total;
					})
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