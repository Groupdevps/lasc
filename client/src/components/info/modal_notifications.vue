<template>
	<div>		
		<v-snackbar
			v-model  = "info.snack"
			:color   = "info.color"
			:timeout = "info.persistent ?  -1 : timeout ? timeout : time"
			:top     = "info.position  == 'top'"
			:bottom  = "info.position  == 'bottom'"
			:right   = "info.direction == 'right'"
			:left    = "info.direction == 'left'"
			:key 	 = "'snack_notifications'"
			app
		>
			<v-row 
				no-gutters
				class = "py-0"
			>
				<v-col 
					xl   = "11" 
					lg   = "11" 
					md 	 = "11" 
					xs 	 = "11" 
					cols = "11"
				>
					<v-progress-circular
				      indeterminate
				      :color  = "color_loading"
				      v-show  = "loading"
				    ></v-progress-circular>
				    <v-icon v-show="!loading">{{info.icon}}</v-icon>
					<span 
						class = "body-1 mt-1"
					>											
						{{ info.text }}
					</span>
				</v-col>
				<v-col 
					xl   = "1" 
					lg   = "1" 
					md   = "1" 
					xs   = "1" 
					cols = "1"
				>
					<v-btn
						icon
						dark
						small
						outlined
						color = "error"
						class = "elevation-5 error"
					>
						<v-icon 
							small 						
							color  = "white"
							@click = "info.snack = false"
						>
							mdi-close
						</v-icon>
					</v-btn>
					
				</v-col>
			</v-row>
			

		</v-snackbar>
		<v-dialog 
			v-model = "info.dialog" 
			:width  = "info.width ? info.width : 300" 
			v-if 	= "info.type"
			:key 	 = "'modal_notifications'"

		>
			<v-card outlined>
				<v-card-title 
					v-text = "$t('confirm')" 
					class  = "justify-center pa-0 warning white--text text-uppercase"
				></v-card-title>
				
				<v-card-text class = "pa-1 py-3 justify-center align-center text-center">
				    <v-icon>mdi-alert-circle</v-icon>					
					<span 
						class = "mb-0 subtitle-1 font-weight-bold text-uppercase"
					>
						{{ info.text }}
					</span>
				</v-card-text>
				<v-divider 
					class = "pa-0 ma-0"
				></v-divider>
				<v-card-actions>
					<v-btn
						small 
						color 	= "error"
						v-text 	= "$t('close')"
						@click 	= "render_confirm(info.ID, false)"
					></v-btn>
					<v-spacer></v-spacer>
					<v-btn
						small 
						color 	= "primary"
						v-text 	= "$t('confirm')"
						@click 	= "render_confirm(info.ID, true)"
					></v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-overlay :value="overlay">
	      	<v-progress-circular
		        indeterminate
		        size="64"
	         	:z-index="0"
	      	></v-progress-circular>
	    </v-overlay>
	</div>
</template>
<script type = "text/javascript">
	import EventBus from '@/event-bus'
	export default{
		name 	: 'modal_notifications',
		// notics_inf.vue
		props 	: ['info_to_notif'], // , 'color', 'status'
		data 	: ()=> ({
			snackbar : false,
			time 	 : 5000,
			timeout  : 0,
			info 	 : {
				snack 	: false,
				color 	: '',
				info 	: '',
				dialog 	: false,
				width  	: null, // default  => 300 
				type 	: false, // true = > snack  : false => dialog
				direction : "left"
			},
			loading 		: false,
			color_loading 	: "primary",
			overlay  		: false

		}), //data
		watch:{
			/*info: function(v){
				console.log(v, 'info notics');
				if(v.type){
					if (!v.dialog) {
						this.info.dialog=false;
						// this.$emit('close_snack_dialog', null);
					}

				}else{

					if (!v.info.snack) {
						// this.$emit('close_snack_dialog', null);
					}
				}
			}*/
		}, // watch
		methods:{
			render_notifications(msg){
				let opt  			= msg.type;
				let mssg 			= '';
				let direction_temp 	= "";
				if (msg.msg) {
					mssg = msg.msg;
					if (mssg && mssg.message == 'Network Error') {
						mssg = this.$t('no_res_server');//mssg.message
					}else{
						if (mssg && mssg.response && mssg.response.data) {
							mssg = mssg.response.data.message || mssg.response.data;
						}
					}
				}
				let text 		 = '',
					colr 		 = '',
					type_modal 	 = false,
					is_snack 	 = false,
					is_dialog 	 = false,
					is_id 		 = null,
					is_direction = 'right',
					is_position  = 'top',
					is_persist   = false,
					icon 		 = "";
				
				if (msg.loading) {
					this.loading = true;
					text = mssg;
					colr = 'secondary';				
					is_snack = true ;
				}else{
					this.loading = false;					
				}
				// console.log(opt, 'notifications')
				if (msg.direction) {
					is_direction = msg.direction;
				}
				if (msg.position) {
					is_position = msg.position;
				}
				if (msg.persistent) {
					is_persist = msg.persistent;
				}
				if (msg.timeout) {
					this.timeout = msg.timeout;
				}

				if (opt == 'saved') {
					text = this.$t('saved') +' '+mssg;
					colr = 'success';				
					icon = "mdi-checkbox-marked-circle";
					is_snack = true ;
				}
				
				if (opt == 'updated') {
					text = this.$t('updated') +' '+mssg;
					colr = 'success';				
					is_snack = true ;
					icon = "mdi-checkbox-multiple-marked-circle";
				}

				if (opt == 'deleted'){
					text = this.$t('deleted') +' '+mssg;
					colr = 'success';
					is_snack = true ;
					icon = "mdi-delete"
				}

				if (opt == 'error'){
					text = this.$t('error') +' '+mssg;
					colr = 'error';
					is_snack = true ;
					icon = "mdi-alert"
				}

				if (opt == 'warning'){
					text = mssg; // /*this.$t('warning') +' '+*/ 
					colr = 'warning';
					is_snack = true ;
					icon = "mdi-alert-circle"
				}

				if (opt == 'success') {
					text = ' ' + mssg;
					colr = 'success';				
					is_snack = true ;
					icon = "mdi-checkbox-marked-circle";
				}
				// if (opt == "") {}

				if (opt == 'connection'){
					text = mssg;
					colr = 'primary';
					is_snack = true ;
				}

				if (opt == 'confirm_delete') {
					text 		= this.$t('confirm_delete') + ' ' + mssg;					
					is_dialog 	= true ;
					type_modal 	= true ; 
					is_id 		= msg.ID;
				}
				if (opt == 'confirm_upgrade') {
					text 		= this.$t('confirm_upgrade') + ' ' + mssg;					
					is_dialog 	= true ;
					type_modal 	= true ; 
					is_id 		= msg.ID;
				}
				if (opt == 'confirm_action') {
					text 		= this.$t('confirm_action') + ' ' + mssg;					
					is_dialog 	= true ;
					type_modal 	= true ; 
					is_id 		= msg.ID;
				}

				this.info = {
					snack 		: is_snack,
					color 		: colr,
					text,
					type 		: type_modal,
					dialog 		: is_dialog,
					snack 		: is_snack,
					ID 			: is_id,
					persistent 	: is_persist,
					direction  	: is_direction,  
					position    : is_position,
					direction 	: direction_temp, 
					action 		: msg.action ? msg.action : null,					 
					icon
				};
			}, // render notifications

			render_confirm(key, opt){				
				EventBus.$emit('notifications' + key, opt)
				this.info.dialog = false;
				if (opt && this.info && this.info.action) {
					this.info.action();				
				}

				// EventBus.$off('notifications_modal' + key);
			}, // render_confirm
			
		}, // methods
		mounted(){
			EventBus.$on('notifications', (action) =>{
				this.render_notifications(action);
			})
			 
		}
	};
</script>