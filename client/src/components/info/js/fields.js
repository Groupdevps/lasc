export default {
	name 	: "fields",
	props 	: [
		"info_to_comp",
		"ref_to_comp",
	],
	data : (vm)=>({
		fields 	: [],
		info 	: {},
		ref 	: "",
	}), // data

	watch : {
		info(val){
			this.$emit("receive", {...this.info});
		}, // info
	},

	created(){
		

	}, //created

	computed : {
		render_list_fields: function(){

			this.ref = this.ref_to_comp;
			return this.fields = this.info_to_comp && this.info_to_comp.fields ? this.info_to_comp.fields : [];
		}, //


	}, // computed

	methods : {
		
	}

}; 