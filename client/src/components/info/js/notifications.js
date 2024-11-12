export default {
	name : "notifications",
	data : (vm)=>({
 		info 	: {},
 		list 	: [],
	}),
	computed: {
		render_notificactions: function(){
			return this.list;
		}, // render_notificactions
	}, // computed

	methods : {
		actions(actionn, item, option){

		}, // actions


	}, // methods
}; // messages