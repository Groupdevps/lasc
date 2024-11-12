<template>
	<!-- attach --> 
	<v-row
		dense
	>
		
	<v-col
		cols 	= "3"
		v-show 	= "info_compt.isSubSelect"
	>
		
		<v-select
			dense
			outlined
			hide-details
			v-if 				= "info_compt.isSubSelect"
			v-model 			= "info_sub_select" 
			:item-value  		= "info_compt.sub_item_value"		
			:item-text  		= "info_compt.sub_item_text"
			:placeholder 		= "info_compt.sub_placeholder"
			:items  			= "render_sub_list" 
			:label   			= "$t(info_compt.sub_text)" 
			@change 			= "changeList"
		></v-select>
	</v-col>
	<v-col
		v-show = "info_compt.type == 'select_search'"
	>
		<v-select 
			dense
			outlined
			hide-details
			absolute
			v-model 			= "info" 
			:items  			= "render_list" 
			:label   			= "$t(info_compt.text)" 
			:multiple 			= "info_compt.multiple"
			:item-value  		= "info_compt.item_text"		
			:item-text  		= "info_compt.item_text"
			:placeholder 		= "info_compt.placeholder"
			@change 			= "render_search(info)" 
			v-if				= "info_compt.type == 'select_search'"
			:prepend-inner-icon = "info_compt.icon"
	    	:return-object  	= "info_compt.return_obj" 
			:disabled 			= "info_compt.isDisabled"
			@click 				= "setShowOnClick"
	    	:menu-props 		= "{ 
	    		closeOnContentClick : showOnClick, 
	    		closeOnClick 		: true,
	    		offsetY 			: true
	    	}"
		>
	    	<!-- :return-object  	= "true"  -->

	    	<!-- @click 		 		= "$Helper.keyboard_is_active('search', ID_notification, 'text')" -->
			<!-- 
			@keyup.enter = "get_search(selected_tags)" -->
			<template 
				v-slot:selection = " { item, index } " 
			>
				<!-- v-if 			 = "info_compt.multiple" -->
		        	<!-- v-if = "index < 4" -->
		        <v-chip 
		        	x-small
		        	color = "primary"
		        >
		         	<span> 
		          		{{ item[info_compt.show_texts[0]] }}
		          	</span>
		        </v-chip>
		        <span
		          v-show = "index > 5"
		          class  = "grey--text caption"
		        >
		          (+{{ info.length - 1 }} others)
		        </span>
	      	</template>
	    	<template 
	    		v-slot:prepend-item
	    	>
	    		<!-- v-show = "setShowOnClick" -->
		      	<v-list-item

		      	>
		        	<v-list-item-content
	    				@click 	= "$Helper.keyboard_is_active('search', ID_notification, 'text')"
		        	>
				        <v-text-field 
				        	fixed        	
				        	dense			
				        	outlined
				        	hide-details
				        	v-model 	 		= "search" 
				        	:label		 		= "$t('search')" 
				        	class		 		= "mx-0 pt-0" 
				        	@input 		 		= "v => { search = v }"
				        	prepend-inner-icon  = "mdi-magnify" 
				        	:autofocus 			= "true"
				        ></v-text-field>
				       
		            </v-list-item-content>
		          </v-list-item>
		          <v-divider class = "mt-0"></v-divider>
	        </template>
	        <template v-slot:item = "{ item }">
		        <v-list-item
		          ripple
		          dense
		          @click = "render_search(item)"
		          
		        >
		          <!-- @click = "toggle" -->
		          	<!-- <v-list-item-action

		          	>
		            	<v-icon >
		              		{{ icon }}
		            	</v-icon>
		          	</v-list-item-action> -->
		          	<v-list-item-content>
		            	<v-list-item-title>
		              		{{ item[info_compt.show_texts[0]] }} 
		            	</v-list-item-title>
		            	<v-list-item-subtitle>
		            		{{   item[info_compt.show_texts[1]] }}
		            	</v-list-item-subtitle>
		          	</v-list-item-content>
		        </v-list-item>
		      </template>
	    </v-select>
    </v-col>
    <v-col
    	v-show = "info_compt.type == 'field_searcher'"
    >
		<v-text-field 
	    	dense			        	
	    	outlined
	    	hide-details
	    	v-model 	 = "search" 
	    	label		 = "Search" 
	    	class		 = "mx-4 pt-1" 
	    	append-icon  = "mdi-magnify" 
	    	@input 		 = "v => { search = v, render_list }"
	    	@click 		 = "$Helper.keyboard_is_active('search', ID_notification, 'text')"
	    	v-if	 = "info_compt.type == 'field_searcher'"
			:prepend-inner-icon = "info_compt.icon"
		></v-text-field>
		</v-col>
	</v-row>
</template>
<script 
	type = "text/javascript" 
>
	// src  = "./js/searcher.js"
	import EventBus from '@/event-bus'
	export default {
		name  : 'searcher',
		props : [
			'update_to_component',
			'info_to_component',
			'list_to_component'
		],

			// types searcher
			// field_searcher = > just a field that return a list
			// select_searcher = > return the select item
		data  : () => ({
			info 	  		: {},
			info_sub_select : null,
			list 	  		: [],
			sub_list 		: [],
			search 	  		: '',
			info_compt 		: {},
			list_search 	: [],
			// onInputChange   : '',
			input 			: '',
			keyboard 		: false,
			select_input  	: '',
			ID_notification : 'searcher',
			auto_creates    : ["states", "cities"],
			showOnClick     : false,
			interval 		: null,
			sub_interval 	: null,

		}), // data
		/*
			key 		: 'search',
					text 		: 'search',
					placeholder : 'device',
					list 		: 'list_devices',
					key_list	: 'deviceId',
					text_list 	: 'name',
					type 		: 'select_searcher',
					key_search  : 'name',
					key_search_1 : 'deviceId',
					cols 		: {
						col : 2,
					},

					key 			: "searcher_laboratories",				
				text 			: "search",
				type 			: "select_search",
				global_list 	: "cups-list",
				enable			: true,
				key_main  		: "Orders",
				icon 			: "mdi-selection-marker", 
				cols 			: 12,
				item_text  		: "description",
				item_value 		: "code",	
				show_texts  	: ["description"],
				key_search  	: "description",
				key_search_1 	: "code",
				return_obj 		: true,
				action 	   		: "set_cup_order",
				isSync  		: true, 
				isSubSelect		: true,
				subSelectList 	: "tariff-category",
				searchSubSelect : "id",
		*/

		created(){
			if (this.info_to_component) {
				// console.log("check list ", this.info_to_component , this.list_to_component)
				this.render_info(this.info_to_component);
			}
		}, // created

		watch :{ 
			list_to_component : function (val){
				// console.log("LIST , ", val )
				if (val && val.length > 0) {
					this.setList();
				}
			}, // info to list
			update_to_component : function(val){
				// console.log("UPDATE " + this.info_compt.key, val)
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

		computed : {
			render_sub_list : function(){
				return this.sub_list;
			}, // render_sub_list

			render_list: function(){
				let vm 			= this;
				let list_filter = [];

				if (this.search) {
					console.log("info_sub_select", this.info_sub_select)
					if (this.info_sub_select) {
						list_filter = this.list.filter( item => {
							return item && item[vm.info_compt.searchSubSelect] == this.info_sub_select  && item[vm.info_compt.key_search].toLowerCase().indexOf(this.search.toLowerCase()) > -1;
								
						});
					}else if(vm.info_compt && vm.info_compt.key_search){						
						list_filter = this.list.filter( item => {
							return item && item[vm.info_compt.key_search].toLowerCase().indexOf(this.search.toLowerCase()) > -1;
								
						});
					}
					if (list_filter.length === 0 && vm.info_compt.key_search_1) {
						// console.log('find filer list')	
						list_filter = this.list.filter( item1 => {
						return item1 && item1[vm.info_compt.key_search_1] && item1[vm.info_compt.key_search_1].toLowerCase().indexOf(this.search.toLowerCase()) > -1;
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
				/*[
					{
						administradora : 'test',
						nit  	: 'nit'

					},
					{
						administradora : 'test1',
						nit  	: 'nit1'
						
					}
				]*/
			}, // render list

		}, // computed

		methods : {

			setList(){
				if (this.list_to_component && this.list_to_component.length > 0){
					this.list = this.list_to_component;
				}else{
					console.warn("Not found list to searcher : ", this.list_to_component);
					this.interval = setInterval(()=>{
						if (this.info_compt && this.info_compt.global_list && this.info_compt.isSync && this.list && this.list.length === 0) {
							this.list = this.$ManagerSmith.render_listed(this.info_compt);
							// console.log("Check global_list ========================= ", this.list)
						}
						if (this.list && this.list.length > 0) {
							clearInterval(this.interval);
							this.interval = null;
						}
					}, 1000)
				}
			}, // setList
			setSubList(){
				this.sub_interval = setInterval(()=>{
					if (this.info_compt && this.info_compt.subSelectList && this.info_compt.isSync && this.sub_list && this.sub_list.length === 0) {
						this.sub_list = this.$ManagerSmith.render_listed({ global_list : this.info_compt.subSelectList});
						// console.log("Check global_list ========================= ", this.list)
					}
					if (this.sub_list && this.sub_list.length > 0) {
						clearInterval(this.sub_interval);
						this.sub_interval = null;
					}
				}, 1000)
			}, // seSubList

			render_info(item){
				// console.log("ITEM FORM ", item, this.update_to_component)
				if (item) {
					this.info_compt = item;
					if (item.isSubSelect) {
						this.setSubList();
						if (item.default) {
							this.info_sub_select = item.default;
						}
					}
					this.setList();
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
				// console.log("render searcher ", item)
				if (this.info_compt && this.info_compt.type == 'select_search') {
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
			      EventBus.$emit('active_keyboard_key',{
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
			changeList(){

			}, // changeList

		}, // methods

		

		mounted() {
			EventBus.$on('keyboard_type' + this.ID_notification, (action) =>{
				if (action) {
					console.log("INPUT TYPE : ",action.input)
					if (action.setting) {
						let { obj, key, type } =  action.setting;
						if (type == 'text') {
							this[key] = action.input;
						}else{
							this[obj][key] = action.input;
							
						}
					}
				}
			});

		}, // mounted

		beforeDestroy(){
			if (this.interval) {
				clearInterval(this.interval);
				this.interval = null;
			}
			if (this.sub_interval) {
				clearInterval(this.sub_interval);
				this.sub_interval = null;
			}
		}, // beforeDestroy
	}
</script>