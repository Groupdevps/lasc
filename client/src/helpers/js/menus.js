
	export default {
		name  : 'menus',
		props : [
			'info_to_component', // info to config default tag
			'options_to_component', // options of menu
			'list_to_component', // if content a list
			'ref_to_component',
			'setting_to_component',
			

		],
		data : () => ({
			info 		: {},
			list 		: [],
			list_icon   : [],
			options 	: {},
			info_fields : [],		
			selecteds   : [],	

		}), // data

		created(){
			if (this.info_to_component && this.options_to_component) {
				this.render_info(this.info_to_component, this.options_to_component);
			}else{
				console.warn("Required options and info for menu ");
			}
			
		}, // created
		watch : {
			info_to_component: function(val){
				if (val.tag != this.info.tag || val.icon != this.info.icon) {		
					this.render_info(val);
				}
				if (val.updated) {
					if (this.list_to_component) {						
						this.list = this.list_to_component;
					}
				}
			}, // info to component
		}, // watch


		methods : {
			actions_menu(act, item, opt){
				if (act == 'sel_tag') {
					// console.log("actions_menu : ", item);					
					this.$emit('receive_info', item);
				}
			}, // actions_menu

			render_info(item, option){
				if (item) {
					this.info = item;
				}
				if (option) {
					this.options = option;
				}
				if (this.list_to_component) {
					console.log("list menus ", this.list_to_component)
					this.list = this.list_to_component;
				}
				
				
			}, // render info


		}, //methods
	};