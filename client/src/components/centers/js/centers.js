export default {
	name 	: "centers",
	data 	: (vm) => ({
		info 	: {},
		list 	: [],
		loading : false,
		head 	: {
			title 			: vm.$t("centers"),
			class_title 	: "primary body-1 pa-1 white--text",
			class_subtitle 	: "body-2 pa-0",
			class_text 		: "pa-1 pt-5",
		},
		disableds 	: {

		},
		show 		: {

		},
		fields 		: [
			{
				key 	: "name",
				text 	: vm.$t("name"),
				type 	: "text",
				class 	: "",
				icon 	: "mdi-hospital-building",
			},
			{
				key 	: "description",
				text 	: vm.$t("description"),
				type 	: "text",
				class 	: "",
				icon 	: "mdi-format-list-text",
			},
			{
				key 	: "nit",
				text 	: vm.$t("nit"),
				type 	: "text",
				class 	: "",
				icon 	: "mdi-clipboard",
			},
			{
				key 	: "points",
				text 	: vm.$t("points"),
				type 	: "text",
				class 	: "",
				icon 	: "mdi-circular",

			},
		]
	}), // data
	created(){

	}, // created

	methods : {

		save(){
			const api 		= "/api/v1/centers";
			this.loading 	= true;
			this.$Axios.post(api, this.info).then(res =>{
				this.loading 	= false;
				this.$EventBus.$emit('notifications',{
					type 	: "saved",
					message : this.$t("new_center"),
				});
			}).catch(er => {
				this.loading 	= false;
				this.$EventBus.$emit('notifications',{
					type 	: "error",
					message : er,
				});
			});
		}, //save

		update(){
			const api 		= "/api/v1/centers/" + this.info.id;
			this.loading 	= true;
			this.$Axios.put(api, this.info).then(res =>{
				this.loading 	= false;
				this.$EventBus.$emit('notifications',{
					type 	: "updated",
					message : this.$t("center"),
				});
			}).catch(er => {
				this.loading 	= false;
				this.$EventBus.$emit('notifications',{
					type 	: "error",
					message : er,
				});
			});

		}, //update

		del(){
			const api 		= "/api/v1/centers/" + this.info.id;
			this.loading 	= true;
			this.$Axios.delete(api).then(res =>{
				this.loading 	= false;
				this.$EventBus.$emit('notifications',{
					type 	: "deleted",
					message : this.$t("center"),
				});
			}).catch(er => {
				this.loading 	= false;
				this.$EventBus.$emit('notifications',{
					type 	: "error",
					message : er,
				});
			});
			
		}, //del

	}, // methods

}; // export default