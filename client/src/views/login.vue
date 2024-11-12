<template>
	<v-container fluid class = "pa-0">
	<v-row
		
		align 	= "center"
		justify = "center"
	>
		<v-col
			cols = "6"			
			:class = "$Logos.class_login" 
		>
			
				
				<v-img
					:src   = "$Logos.login"
					:width = "$Logos.width_login"
					contain
				></v-img>
			
		</v-col>
		
		<v-col
			cols = "4"

		>
			<v-card 
				outlined
			>
				<v-card-title
					:class = "head.class_title"
				>
					{{ head.title }}
				</v-card-title>	
				<v-card-text
					:class = "head.class_text"
				>
					<form

					>
						
						<template
							v-for = "(item_field, idx_field) of fields"
						>

							<v-text-field
								dense
								outlined								
								v-model 			= "user[item_field.key]"
								:prepend-inner-icon = "item_field.icon"
								:type 				= "item_field.type"
								v-if 				= "['password', 'text', 'number'].includes(item_field.type)" 
								:class 				= "item_field.class"
								:label 				= "item_field.text" 
								height 				= "20"
								@keyup.enter 		= "actions({action : 'login'})"
							></v-text-field>
						</template>
					</form>
				</v-card-text>
				<v-card-actions>
					<v-row
						no-gutters
						justify = "center"
					>
						<template
							v-for = "(item_opt, idx_option) of options"
						>							
							<v-col
								:cols = "item_opt.cols"
							>
								<v-btn
									small
									:text 	= "item_opt.is_text" 
									:color 	= "item_opt.color"
									@click 	= "actions(item_opt)"
									:class 	= "item_opt.class"
									:loading = "loading"
								>
									{{ item_opt.text }}
								</v-btn>
							</v-col>
						</template>
					</v-row>
					
				</v-card-actions>
			</v-card>	
		</v-col>
		
	</v-row>
	</v-container>
</template>
<script type = "text/javascript">
 	// src  = "./js/login.js"
	// import User from '../models/user';
export default {
	name : "login",
	data : (vm) => ({
		// user: new User('', ''),
		user 	: {},
		loading : false,
		head 	: {
			class_title : "justify-center h2 pa-0 primary white--text font-weight-bold text-uppercase",
			title 		: vm.$t("login"),
			class_text  : "pa-1 pt-3 px-2",
		},
		fields 	: [
			{
				key  : "username",
				text : vm.$t("username"),
				type : "text",
				icon : "mdi-account",
				class : "pa-0 ma-0 text-uppercase",
			},
			{
				key  : "password",
				text : vm.$t("password"),
				type : "password",
				icon : "mdi-lock",
				class : "pa-0 ma-0  text-uppercase",
			},
		],
		options : [
			/*{
				key 	: "forget_password",
				action 	: "forget_password",
				color 	: "primary",
				text 	: vm.$t("forget_password"),
				is_text : true,
				cols 	: "8",
			},*/
			{
				key 	: "login",
				action 	: "login",
				color 	: "indigo",
				text 	: vm.$t("login"),
				class   : "white--text font-weight-bold",
				cols 	: "3",
			},
		]
	}), // data
	computed: {
	    loggedIn() {
	      	return this.$store.state.auth.status.loggedIn;
	    }
	},
	created() {
	    if (this.loggedIn) {
	      this.$router.push('/dashboard');
	    }
	},

	methods : {
		actions(action, item, option){
			// console.log("actions user ", action, item, option)
			if (action.action == "login") {
				this.log_in();
			}else
			if (action.action == "forget_password") {

			}
		}, // actions 

		log_in(){
			// handleLogin() {
		      this.loading = true;
		      // this.$validator.validateAll().then(isValid => {
		        /*if (!isValid) {
		          this.loading = false;
		          return;
		        }*/
		        this.$EventBus.$emit("notifications", {
            		type 	: "primary",
            		msg 	: this.$t("loading"), // login_user
            		loading : true,
            	});
		        if (this.user.username && this.user.password) {
		          	this.$store.dispatch('auth/login', this.user).then(() => {
		            	// console.warn("success res ")
		      			this.loading = false;		            	
		              	this.$router.push('/dashboard');		           									
		              	this.$EventBus.$emit("notifications", {
		            		type 	: "success",
		            		msg 	: this.$t("user_loged"),
		            	});
		            },
		            error => {
		            	// console.warn("error res ", error)
		            	this.$EventBus.$emit("notifications", {
		            		type 	: "error",
		            		msg : typeof error.response.data == "string" &&  error.response.data.toLowerCase().includes("incorrect") ? this.$t("userOrPassIncorrect") : 
		            			typeof error.response.data == "string" && error.response.data.toLowerCase().indexOf("not found") > -1 ? 
		            			"No existen estas credenciales " : "Obteniendo respuesta"
		            	})
		              this.loading = false;
		              /*this.message =
		                (error.response && error.response.data) ||
		                error.message ||
		                error.toString();*/
		            }
		          );
		        }else{
				    this.loading = true;
		        	let requireds = " " + (!this.user.username ? this.$t("username") : "");
		        	requireds 	 += " " + (!this.user.password ? this.$t("password") : "");
		        	this.$EventBus.$emit("notifications", {
	            		type 	: "warning",
	            		msg 	: this.$t("required") + requireds
	            	})
		        }
		      // });
		    // }
		}, // log_in

		forget_password(){

		}, // forget password

	}, // methods
}; // export default
</script>