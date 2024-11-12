import EventBus from '@/event-bus'

	export default {
		name  : 'searcher_list',
		props : [
			'update_to_component',
			'info_to_component',
			'list_to_component'
		],

			// types searcher
			// field_searcher = > just a field that return a list
			// select_searcher = > return the select item
		data  : () => ({
			info 	  	: {},
			list 	  	: [],
			search 	  	: '',
			info_compt 	: {},
			list_search : [],
			// onInputChange   : '',
			input 			: '',
			keyboard 		: false,
			select_input  	: '',
			ID_notification : 'searcher',
			auto_creates    : ["states", "cities"],
			showOnClick     : false,

		}), // data
		

		created(){
			if (this.info_to_component) {		
				this.render_info(this.info_to_component);
			}
		}, // created

		watch :{ 
			list_to_component : function (val){
				if (val && val.length > 0) {
					this.list = val;
				}
			}, // info to list
			update_to_component : function(val){
				console.log("UPDATE " + this.info_compt.key, val)
				if (val) {					
					try{
						// if (val) {
							// if (this.info_compt) {
								if (this.info_compt.key) {
									this.info = val[this.info_compt.key];
								}
							// }
						// }
						// if (JSON.stringify(val.info_compt) != JSON.stringify(this.info)) {

						// }
					}catch(e){
						console.warn("Error comparese searcher ", e)
					}
				}
			}

		}, //watch

		methods : {
			render_info(item){
				// console.log("ITEM FORM ", item, this.update_to_component)
				if (item) {
					this.info_compt = item;

					if (this.list_to_component && this.list_to_component.length > 0){
						this.list = this.list_to_component;
					}else{
						console.warn("Not found list to searcher : ", this.list_to_component)
					}
					if (this.update_to_component) {
						if (this.info_compt && this.info_compt.key && this.update_to_component[this.info_compt.key]) {
							this.info = this.update_to_component[this.info_compt.key];
						}else if (this.update_to_component) {
							this.info = this.update_to_component;

						}
					}
				}else{
					console.warn("No found item for render searcher : ", item);
				}
				// console.log("LLIST ", this.list)
			}, // render info

			render_search(item){
				console.log("render searcher ", item)
				if (this.info_compt && this.info_compt.type == 'select_search_list') {
					this.info = item[this.info_compt.show_texts[0]];
					this.$emit("receive", item);

				}else if(this.info_compt && this.info_compt.type == 'field_search') {
					console.log("send listed ")
					this.$emit("receive", this.list_search);
				}else{
					console.warn("Not found select type for return ", this.info_compt)
				}
				this.showOnClick = true;
			}, // render search
			setShowOnClick(){
				this.showOnClick = false;
			}, // setShowOnClick

			keyboard_is_active(keys, id_notification, type){
			    let key_board = false;
			    if (localStorage.getItem('virtual_Key_board')) {
			      key_board = JSON.parse(localStorage.getItem('virtual_Key_board'));
			    }       
			    console.log(key_board , "KEYbOARD ACTIVE ")
			    if (key_board) {              
			      /*if (this[keys]) {
			          this[keys] = '';
			      }*/
			      // keys         
			      this.$EventBus.$emit('active_keyboard_key',{
			        ID   : id_notification,
			        key  : keys,
			        type
			      });
			    }       
			}, // keyboard_is_active

			onInputChange(input){
				console.log("on input change", input)
				this.input = input.target.value;
			}, // onInputChange
			

		}, // methods

		computed : {
			render_list: function(){
				let vm 			= this;
				let list_filter = [];
				if (this.search) {

					list_filter = this.list.filter( item => {
						return item && item[vm.info_compt.key_search].toLowerCase().indexOf(this.search.toLowerCase()) > -1;
							
					});
					if (list_filter.length === 0 && vm.info_compt.key_search_1) {
						// console.log('find filer list')	
						list_filter = this.list.filter( item1 => {
						return item1 && item1[vm.info_compt.key_search_1].toLowerCase().indexOf(this.search.toLowerCase()) > -1;
						});
						
					}
					if (list_filter.length === 0 && vm.info_compt && vm.info_compt.global_list && this.auto_creates.includes(vm.info_compt.global_list)) {
						list_filter = [ { [vm.info_compt.key_search] : this.search}];
					}	
				}else{
					list_filter = this.list;
				}
				vm.list_search = list_filter;
				// console.log(list_filter, "*************** FILTER");
				if (this.info_compt && this.info_compt.type == 'field_searcher') {
					this.$emit('receive', list_filter);
				}
				if (list_filter && list_filter.length > 0 && typeof list_filter != "string"){

					return list_filter;
				}else{
					return [];
				}
				
			}, // render list

		}, // computed
	}