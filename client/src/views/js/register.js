// import User from '../models/user';

export default {
	name 	: "register", // just  can modify :  admin [center, role ], update user [ name, password ],  
	props 	: [
		"info_to_comp"
	],
	data 	: (vm) => ({
		// user 			: new User('', '', ''),
		ref 			: "register",
		info 			: {},
		item_info 		: null,
		centers 		: [],
		roles 			: [],
		requests 		: {
			get 	: "",
			create 	: "/api/register",
			update 	: "",
			del 	: "",
		}, 
		head 			: { 
			justify 		: "center",
			align 			: "center",
			outlined		: true,
			card_class 		: "mt-10",
			cols 			: 4,
			class_title 	: "pa-1 primary body-1 justify-center white--text",
			class_icon 		: "mx-1", 
			color_icon 		: "white",
			icon_title 		: "mdi-registered-trademark",
			title 			: vm.$t("register"),
			class_text 		: "pa-1 mb-0 pb-0",
			align_text 		: "center",
			justify_text 	: "center",
			class_divider 	: "ma-1",
			class_actions 	: "justify-center pa-1",
		},
		show 			: {
			register 	: true,
			update 		: false,			
		},
		fields 		 	: [
			{
				key 		: "center",
				type 		: "select",
				text 		: vm.$t("center"),
				class 		: "mt-1",
				list 		: "centers",
				placeholder : "", 
				item_value 	: "",
				item_text 	: "text",
				return_obj 	: true,
				cols 		: 10,
			},
			{
				key 		: "role",
				type 		: "select",
				text 		: vm.$t("job"),
				class 		: "mt-1",
				list 		: "roles",
				placeholder : "", 
				item_value 	: "",
				item_text 	: "name",
				return_obj 	: true,
				cols 		: 10,
			},
			{
				key 		: "name",
				type 		: "text",
				text 		: vm.$t("name"),
				class 		: "mt-1",
				placeholder : "", 
				cols 		: 10,
			},
			{
				key 		: "username",
				type 		: "text",
				text 		: vm.$t("username"),
				class 		: "mt-1",
				placeholder : "", 
				cols 		: 10,
			},
			{
				key 		: "email",
				type 		: "text",
				text 		: vm.$t("email"),
				class 		: "mt-1",
				placeholder : "", 
				cols 		: 10,
			},
			{
				key 		: "password",
				type 		: "password",
				text 		: vm.$t("password"),
				class 		: "mt-1",
				placeholder : "", 
				cols 		: 10,
			},
			{
				key 		: "confirmation_password",
				type 		: "password",
				text 		: vm.$t("confirm_password"),
				class 		: "mt-1",
				placeholder : "", 
				cols 		: 10,
			}, 
		],
		options 		: [
			{
				key 	: "register",
				type 	: "btn",
				is_text : false,
				color 	: "success",
				text 	: vm.$t("register"),
				action 	: "register",
			}
		] 

	}), // data
	
	created(){

	}, // created

	computed: {
	    loggedIn() {
	      	return this.$store.state.auth.status.loggedIn;
	    }
	}, // computed
	mounted() {
	    if (this.loggedIn) {
	      	this.$router.push('/profile');
	    }
	},

	methods : {
		actions(action, item, option){
			if (action) {
				if (action.action == "register") {
					this.register();
				}
			}
		}, // actions 

		register(){
			const api 	= this.requests.create;
			let info_up = { ... this.info };
			 // handleRegister() {
	      	// this.message = '';
	      	// this.submitted = true;
		      	// this.$validator.validate().then(isValid => {
		        // if (isValid) {
		    
        	this.$EventBus.$emit("notifications",{
				type 	: "primary",
				message : this.$t("registering_user"),
				loading : true,
			});
		    this.$store.dispatch('auth/register', info_up).then(
	            data => {
	             	// this.message = data.message;
	              	// this.successful = true;
	              	this.$EventBus.$emit("notifications",{
						type 	: "success",
						message : "registered"
					});
					if (this.$route && this.$route.name == "register") {
		           		this.$router.push("/login");
					}
	            },
	            error => {
	              	/*this.message =
		                (error.response && error.response.data) ||
		                error.message ||
		                error.toString();*/
		           	// this.successful = false;
					this.$EventBus.$emit("notifications",{
						type 	: "error",
						message : error
					})
	            }
	        );
		        // }
		      // });
		    // }
		}, 

		
				
	}, // methods

}; // export default