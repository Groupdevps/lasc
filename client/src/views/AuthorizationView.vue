<template>
	<v-container fluid class ="pa-0" >
			<v-card outlined>
				<v-card-title :class = "head.class_title">
					<v-btn 
						tile
						@click 	= "$router.go(-1)"
						class = "pa-1"
						color = "warning"
					>
						<v-icon class ="mx-1">
							mdi-arrow-left-circle
						</v-icon>
						{{$t('go_back')}}
					</v-btn>
					<v-spacer></v-spacer>
					<span >
						{{ $t(head.title) }}
					</span>
					<v-spacer></v-spacer>
				</v-card-title>
				<v-card-text class = "pa-2">
					<v-tabs
						fixed-tabs
						dark 
						v-model ="modelTabs"
						height 				= "35"						
						
					>
						<v-tab 
							v-for = "(itemTab,idxTab) in tabs"
							:key="itemTab+idxTab"
						>
							{{itemTab}}
						</v-tab>
						
						
					</v-tabs>
					<v-tabs-items v-model="modelTabs">
						<v-tab-item				
							v-for = "(itemTab,idxTab) in tabs"		
							:key="itemTab+idxTab"
						>
							<v-card flat>
							<v-card-text>
								<v-row v-if="itemTab == 'Autorizacion'">
									
									<template
										v-for = "(item_field, idx_field) of info_fields"
									>
										<v-col :cols = "item_field.cols">
											<v-text-field
												dense
												outlined
												v-if 	 = "['text', 'number'].includes(item_field.type)"
												v-model  = "info[item_field.key]"
												:type 	 = "item_field.type" 	
												:label   = "item_field.text"
												:readonly = "item_field.isReadable"
												:persistent-hint = "item_field.isPersistentHint"
												:hint 			 = "renderHint(item_field)"		
																			
										></v-text-field>
										<v-autocomplete
											dense
											outlined
											v-else-if = "item_field.type == 'autocomplete'"
											v-model   = "info[item_field.key]"
											:type 	  = "item_field.type" 	
											:label    = "item_field.text"
											:items    = "renderListed(item_field)"
										>
										</v-autocomplete>
										</v-col>
									</template>
									<v-col cols ="12" offset="10">
										<v-spacer></v-spacer>
										<v-btn
											:disabled = "isDisabledConfirm"
											v-show = "show.save"
											color  = "primary"
											v-text = "'Confirmar'"
											@click = "save" 
										></v-btn>				
									</v-col>
								</v-row>
								<template v-if ="itemTab == 'Anexos'">

									<v-divider 
									class = "pa-0 ma-0 primary"
									:inset = "true"
									></v-divider>
									<Anexos :infoToComponent="infoAttention"></Anexos>
								</template>	
							</v-card-text>
							</v-card>
						</v-tab-item>
						
					</v-tabs-items>
					
				</v-card-text>
			</v-card>
		
	</v-container>
</template>
<script type="text/javascript">
	import Anexos from "@/components/admissions/AnexosComponent.vue"	
	import AttentionService from "@/services/AttentionService";
	import CauService from "@/services/CauService.js"
	export default {
		name : "AuthorizationView",
		components : {
			Anexos,
		},
		data : () => ({
			isDisabledConfirm : false,
			infoAttention 	  : null,
			modelTabs 			: 0,
			info : {				
				observation : "",
				userAtentionId : "",

			},
			tabs :[
				"Autorizacion", "Anexos"
			],
			head : {
				title 		: "documentation",
				class_title : "primary h6 pa-0 white--text text-uppercase"
			},
			show : {
				save :true,

			},
			info_fields : [
				{
					key : "AttentionId",
					text : "Numero de Atencion",
					type : "number",
					isReadable : true,
					cols : 6,
					

				},
				{
					key : "CAU",
					text : "Codigo de autorizacion",
					type : "text",
					cols : 6,
					hint : "mensaje ",
					isPersistentHint : true, 
				},
				{
					key : "userAtentionId",
					text : "Atencion creada por :",
					type : "text",
					isReadable : true,
					cols : 3,
				},
				{
					key  : "UserInCau",
					text : "CAU ingresado por :",
					type : "text",
					isReadable : true,
					cols : 3,
				},
				{
					key : "Observation",
					text : "Observaciones",
					type : "text",
					cols : 6,

				}

			],
		}), // data
		created(){			
			this.getCAU();
		}, // created	
		computed:{
			currentPermission(){
				return this.$store.getters["auth/getPermission"]("AuthorizationView") // this.$route.name
			},
		},
		methods: {
			async getCAU(){
				if(this.$route && this.$route.params){
					const { attention } = this.$route.params;//id , numbreId 
					this.info.AttentionId = attention;
					const service = new CauService();					
					const dataCAU = await service.searchCau({AttentionId : attention}); 
					
					if(dataCAU && dataCAU.data){
						this.isDisabledConfirm = true;
						this.info = { ...this.info, ...dataCAU.data };
						if(this.info.User){
							this.info.UserInCau = this.info.User.username;
						}
						if(this.info.CAU){

						}
					}
					try {
							
						const attentionService = new AttentionService()
						const res = await attentionService.getAttentionById(attention);
						if(res){							
							const {User, createdAt} = res.data; 
							this.infoAttention = res.data;
							if(User){
								this.info.userAtentionId = User.username; 								
							}
							this.info.createdAttentionDate = createdAt;							
							
						}
						this.infoAttention.id = parseInt(attention);						
					} catch (error) {
						console.warn("Error get attention for cau ", error)
					}
				}
			}, //
			async save(){
				if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {					
					const service = new CauService();
					delete this.info.id
					this.info.UserId = this.$store.getters["auth/userId"];
					const res = await service.saveCau(this.info);
					if(res) {
						this.isDisabledConfirm = true;
						this.$EventBus.$emit("notifications",{
							type : "success",
							msg  : "Guardado Codigo de authorizacion"
						})
					}
				}
			},

			renderListed(item){
				if(item){
					if(item.global_list){
						const list = this.$ManagerSmith.render_listed(item);
						if(list && list.length > 0){
							return list;
						}

					}
					if(item.list){
						return this[item.list];
					}
				}
				return []
			}, // rendeList
			renderHint(item){
				if(item){
					if(item.key == "CAU"){
						return this.renderTimeLapse();
					}
				}
				return null
			},
			renderTimeLapse(){
				const {createdAttentionDate, createdAt, CAU  } = this.info; 
				let timeCAU 	= "";
				if(!CAU){
					const dateEnd 	= this.$Helper.addTimeWithMoment(createdAttentionDate, 1, 'days')
					const nowtDate	= this.$Helper.currentDateMoment();
					const diff 		= dateEnd.diff(nowtDate, 'hours');      

					if(diff > 0){                    
						timeCAU = `Por vencer en ${diff} horas`;
						          
					}else{						
						timeCAU = `Vencido hace ${Math.abs(diff)} horas`;
					}
				}else{
					timeCAU = `Ingresado : ${this.$Helper.formatDate(createdAt, "YYYY-MM-DD HH:mm")}`
				}          
				return timeCAU;
			}, // renderTimeLapse
		}, // methods
	};
</script>