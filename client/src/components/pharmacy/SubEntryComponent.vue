<template>
	<FormSessionLayout
		:fields="fields"
		title="INGRESO DE PRODUCTO"
		subtitle=""
		reference = "SubEntryProductsForm"
		:inputField="info"
	>
		<template v-slot:buttons>
			<v-progress-linear
				indeterminate
				color="cyan"
				:active="loading"
				absolute
			></v-progress-linear>
			<br>

			<v-spacer></v-spacer>
				<v-btn
					small
					v-show="info.id ? currentPermission.canEdit : currentPermission.canAdd  "
					:loading="loading"
					color  = "primary"
					@click  = "info.id ? confirmUpdate() : confirmSave()"
				>
					{{ info.id ? $t('update') : $t('save') }}
				</v-btn>
			<v-spacer></v-spacer>
		</template>
		<template v-slot:field-ProductId="{ itemField }">
			<MenuProductsInventory :inputField="info" keyField="ProductId" LabelToMenu="PRODUCTO"></MenuProductsInventory>
		</template>
	</FormSessionLayout>	
</template>
<script type = "text/javascript">

import fields_params from "@/components/pharmacy/js/entry_inventory_params.js"
import EntryInventoryService from "@/services/EntryInventoryService.js"

import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import MenuProductsInventory from "@/components/info/MenuProductInventoryComponent.vue"


export default {
	name : "SubEntryComponent",
	components : {
		FormSessionLayout, MenuProductsInventory
	}, //components
	props : ["listToComponent", "infoEdit", "currentPermission"],
	data : (vm) => ({		
		info 		 	: {
			
		},		
		fields 		: fields_params,		
		diagnoses  	: [],		
		reference 	: 'SubEntryProducts',		
		loading : false,
		
	}), // data

	watch:{
		infoEdit(val){
			if (val) {
				this.info = {...val};
			}
		}
	},
	mounted(){	
		if (this.infoEdit) {
			if (this.infoEdit) {
				this.info = {...this.infoEdit};
			}
		
		}
	}, // created

	computed : {
		
	}, // computed

	methods : {
		confirmSave(){
			this.$EventBus.$emit("notifications", { type : "confirm_action", ID : "confirmActionAddInventory", action: this.save })
		},
		confirmUpdate(){
			this.$EventBus.$emit("notifications", { type : "confirm_action", ID : "confirmActionUpdateInventory", action: this.update })
		},		
		async save(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {

					if (this.info && this.info.ProductId && this.info.cant) {					
						
						const service = new EntryInventoryService();
						const res = await service.saveInfo({
							...this.info,											
							UserId : this.$store.getters["auth/userId"],
						});
						if (res && res.error) {
						    this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Creando Entrada de Producto")});
						}else
						if (res && res.data) {
							this.info.id = res.data.id;
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "saved"
							});
							this.listToComponent.push({...res.data, type : "input"});
							this.$emit("CloseForm");
							this.info={};
						}
					}else{
						this.$EventBus.$emit("notifications", {
							type 	: "warning",
							msg 	: "Se requiere nombre o codigo"
						});
					}
				}
			}catch(error){
				console.warn("Error save item ", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: this.$Helper.renderErrorMessage(error, "Creando Producto")
				});
			}finally{
				this.loading = false;
			}
		},
		async update(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {
					if (this.info && this.info.ProductId && this.info.cant) {

						const service = new EntryInventoryService();
						const res = await service.updateInfo({
							id : this.info.id,		
							...this.info,													
							UserId : this.$store.getters["auth/userId"],
							
						});
						if (res && res.error) {
						    this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Actualizando Entrada de Producto")});
						}else
						if (res && res.data) {					
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "updated"
							});
							const idx = this.listToComponent.findIndex(x => x.id == this.info.id)
							if (idx >= 0) {
								this.listToComponent.splice(idx,1, {...this.info})
							}					

						}
					}else{
						this.$EventBus.$emit("notifications", { type 	: "warning", msg 	: "Se requiere Nombre o Codigo" });
					}
				}
			}catch(error){
				console.warn("Error udpate item ", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: this.$Helper.renderErrorMessage(error, "Actualizando Entrada de Producto")
				});
			}finally{
				this.loading = false;
			}
		},	
	}, // methods
};
</script>