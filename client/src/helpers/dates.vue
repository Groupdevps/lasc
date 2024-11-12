<template>
	<v-menu
	    offset-y
			v-if 					= "info_compt.type == 'date_range'"
	    :ref 					= "info_compt.ref || ref"
	    v-model 				= "menu"
	    :close-on-content-click = "false"
	    transition 				= "scale-transition"
	    min-width 				= "auto"
			:range 					= "info_compt.isRange"
	  >
	    <!-- open-on-hover -->
	    <!-- :return-value.sync 		= "dates" -->
	    <template v-slot:activator = "{ on, attrs }">
	        <v-text-field
            chips
            dense
            outlined
            clearable
            hide-details
            small-chips
            :multiple		   	= "info_compt.multiple"
            v-model 			= "dates"
          	:label              = "$t(info_compt.text)"
            :placeholder        = "'AAAA-MM-DD'"
            prepend-inner-icon 	= "mdi-calendar"
						class 				= "text-uppercase"
	          v-bind 				= "attrs"
	          v-on 				= "on"
	      		@change 			= "render_date(dates)" 
	          :disabled 			= "info_compt.isDisabled"
						:readonly 			= "info_compt.isReadOnly"
	        >							
	        <!-- info_compt.placeholder		        	 -->
	            <!-- readonly -->
	        </v-text-field>
	        <!-- combobox -->

	    </template>
	    <v-date-picker
	      	no-title
	      	scrollable
	      	dark
	      	color="green lighten-1"
	      	:range  	= "info_compt.multiple"
	      	v-model 	= "dates"
	      	@input 		= "render_date(dates)" 
	    >
	      	<v-spacer></v-spacer>
	        <v-btn
	        	x-small
	            text
	            color  = "error"
	            @click = "menu = false"
	        >
	          Cancelar
	        </v-btn>
	        <v-btn
	            x-small
	            text
	            color  = "primary"
	            @click = "actions('set_dates', dates)"
	        >
	        <!-- $refs.menu.save(dates) -->
	          OK
	        </v-btn>
	    </v-date-picker>
	</v-menu>

    	<!-- time pickers -->

        <!-- :nudge-right 			= "40" -->
        <!-- open-on-hover		         -->
    <v-menu
        offset-y						
        :return-value.sync 		= "picker"
    	v-else-if 				= "info_compt.type == 'time_picker'"
        :ref 					= "info_compt.ref || ref"
        v-model 				= "menu_picker"
        :close-on-content-click = "false"
        transition 				= "scale-transition"
        max-width 				= "290px"
        min-width 				= "290px"
    >
        <template v-slot:activator="{ on, attrs }">
	        <!-- readonly -->
          <v-text-field
            dense
            outlined
            clearable
            hide-details
            v-model 	 		= "picker"
            :label 		 		= "$t(info_compt.text)"
            prepend-inner-icon 	= "mdi-clock-time-four-outline"
            v-bind 		 		= "attrs"
            v-on 		 		= "on"
						class 				= "text-uppercase"
            placeholder 		= "HH:MM:ss"
            :disabled 			= "info_compt.isDisabled"
						:readonly 			= "info_compt.isReadOnly"
          ></v-text-field>
        </template>
	        <!-- full-width -->
        <v-time-picker
	      	dark
	        no-title
	        scrollable
	        :use-seconds    = "info_compt.isSeconds"
	      	color 			="green lighten-1"
	        v-if 			= "menu_picker"
	        v-model 		= "picker"
	        format 			= "24hr"
	        @click:minute 	= "save_time(info_compt.key, picker, (info_compt.ref || ref))"
	        @change		 	= "render_date(picker)" 
        >
		<v-spacer></v-spacer>
          <v-btn
            text
            color="error"
            @click="menu_picker = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="save_time(info_compt.key, picker, (info_compt.ref || ref))"
          >
            OK
          </v-btn>
		</v-time-picker>
        <!-- minute -->
    </v-menu>
</template>
<script 
	type = "text/javascript"
>
	// import format from "@/class/formats"
	export default {
		name  : 'dates',
		props : [
			'info_to_component',
			'info_to_dates',
			'ref_to_component',
		],
		data  : () => ({
			info 	  	: {},
			list 	  	: [],
			search 	  	: '',
			info_compt 	: {},
			list_search : [],
			onInputChange   : '',
			input 			: '',
			menu 		 	: false,
			dates 		 	: null, 	
			menu_picker 	: false, // menu			
			picker 			: "00:00",
			ref 			: "dates_timer",

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

			============
			dates 		 	: [], 
			picker 			: {
				start	: "00:00", // 
				end		: "23:59",
			},
		*/
		watch : {
			/*dates: function(val){
				if (val && val.length >= 1) {
					this.render_date(val);
				}
			}, // dates*/
			info_to_component: function(val){
				if (val) {
					this.render_info(val);
				}
			}, // info_to_component	

			info_to_dates: function(val){
				//console.log("Check INFO DATE  update ", val)
				if (this.info_to_component) {
					this.render_info(this.info_to_component);
				}
			}, // info to dates 

			dates : function(val){
				if (!val) {
					this.$emit("receive_info", val)
				}
			}, 
		}, // watch

		created(){
			// let f 	= new Date();
			// console.log(f, "NEW DATE ******************")
	      	// let today = f.getFullYear() +  "/" + f.getMonth() + "/" + f.getDate();
			// let dt  	= this.formatDate(new Date());
			// this.dates.push(today, today);
			
			// setting format
		    // create formats
	      	/*let urls = {
		        url  : this.$URL,
		        face : this.$protocol + this.$localhost + ':' + this.$port_face,
		    }
	      	let moments = {
	        	momentz : this.$momentz,
	        	moment  : this.$moment
		    }
	      	// set class to variable global
	      	this.Format = new format(urls, this.$ml, moments);      */
	      	/*let temp_dev = this.$Helper.get_local('list_devices');
			if (temp_dev) {
				this.lists.devices = temp_dev;
	        	this.Format.update_list('devices', temp_dev)
			}     */
			if (this.info_to_component) {
				this.render_info(this.info_to_component);
			}
			if (this.ref_to_component) {
				this.ref += this.ref_to_component;
			}
		}, // created

		methods : {

			actions(act, item, opt){
				switch (act){
					case ('set_dates') : {
						// this.dates = item;
						this.menu = false;

					}break;
					case ('search') : {
						// this.get_list(true)
					}break;
					default : {
						console.log("this option not exist ")
					}
				};
			}, // actions

			render_info(item){
				if (item) {
					this.info_compt = item; //{...}
					// console.log("render dates ", this.info_compt, this.info_to_dates)
					
					if (item.type == 'date_range') {
						if (item.auto) {
							this.dates = this.$ManagerSmith.getDateCurrent();							
						}
						if (this.info_to_dates && this.info_to_dates.length > 0){
							if (!item.multiple){
								this.dates = "";
							}
							this.dates = this.info_to_dates;
							// this.render_date(this.dates);						
							
						}else if (this.info_to_dates) {
							this.dates = this.info_to_dates;	
							// this.render_date(this.dates);						
						/*	let datess = this.Format.format_date_picker();
							this.dates = datess;
							this.render_date(datess);*/
							// console.warn("Not found date range to asigne : ", this.info_to_dates)
						}else if (item.clearIsNull) {
							this.dates = null;
							//console.log("SET DATE NULL ", this.dates)
						}
						/*if (this.dates) {
							this.render_date(this.dates);
						}*/

					}else
					if (item.type == 'time_picker') {
						if (this.info_to_dates){
							this.picker = this.info_to_dates;
						}else if (item.clearIsNull) {
							this.picker = "";
						}else{
							if (item.key == 'end') {
								this.picker = "23:59";
							}
							// console.warn("Not found time to asigne : ", this.info_to_dates)
						}

					}

				}else{
					// console.warn("No found item for render searcher : ", item);
				}
			}, // render info

			render_date(item){
				if (item) {
					// console.log("CHANGE TIME date ", item)
					if (this.info_compt && (this.info_compt.type == 'date_range' || this.info_compt.type == 'time_picker')) {
						if (this.info_compt.type == 'date_range') {
							// console.log("date ", item)
							if (item && item.length > 0 && Array.isArray(item)) {

								item.sort(function(a,b){
								  // Turn your strings into dates, and then subtract them
								  // to get a value that is either negative, positive, or zero.
								  return  new Date(a) - new Date(b);
								});
							}
							if (this.ref && this.$refs && this.$refs[this.ref]) {
								if(this.info_compt.isRange && item.length == 2){
									this.$refs[this.ref].save(item)
								}else if(!this.info_compt.isRange){
									this.$refs[this.ref].save(item);
								}

							}
						
						}
						this.$emit("receive_info", item);
										
					}else{
						console.warn("Not found select type for return ", this.info_compt)
					}
				}else{
					console.warn("Not receive info item to send date / time : ", item);
				}
			}, // render search

			formatDate (date) {
		        if (!date) return null

		        const [year, month, day] = date.split('/')
		        return `${year}-${month}-${day}`
		    
		    }, // formatDate

			save_time(key, item, ref){
 				// console.log("TIME *********************" , item,this.$ref, this.$refs[ref], key, ref)
 				this.$refs[ref].save(this.picker); // [0]
 				this.picker = item;
 				// this.$refs[item].save(picker[item_search.key])
			},

		}, // methods

		computed : {
			

		}, // computed
	}
</script>