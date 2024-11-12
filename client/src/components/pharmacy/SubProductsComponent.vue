<template>
	<FormSessionLayout
		:fields="fields"
		title="REGISTRO DE PRODUCTO"
		subtitle=""
		reference = "ProductsForm"
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
					v-show="!loading && (info.id ? currentPermission.canEdit : currentPermission.canAdd  )"
					small
					color  = "primary"
					@click  = "info.id ? update() : save()"
				>
					{{ info.id ? $t('update') : $t('save') }}
				</v-btn>
			<v-spacer></v-spacer>
		</template>
		<template v-slot:field-ProductTypeId="{ itemField }">
			<MenuTypeProduct :inputField="info" keyField="ProductType"  :isReturnObject="true" autoSetInField="ProductTypeId" ></MenuTypeProduct>
		</template>
	</FormSessionLayout>	
</template>
<script type = "text/javascript">
import fields_params from "@/components/pharmacy/js/products_params.js"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import ProductsService from "@/services/ProductsService.js"
import MenuTypeProduct from "@/components/pharmacy/MenuProductTypeComponent.vue"

export default {
	name : "SubProductsComponent",
	components : {
		FormSessionLayout, MenuTypeProduct
	}, //components
	props : ["listToComponent", "infoEdit", "currentPermission"],
	data : (vm) => ({		
		info 		 	: {},		
		fields 		: fields_params,		
		diagnoses  	: [],		
		reference 	: 'SubProducts',		
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

	methods : {	
		async save(){
			try {
				if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
					if (this.info && this.info.name && this.info.code) {
						this.loading = true;
						const service = new ProductsService();
						const res = await service.saveInfo({
							...this.info,					
							UserId : this.$store.getters["auth/userId"],							
						});
						if (res && res.error) {
						    this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Creando Producto")});
						}else
						if (res && res.data) {
							this.info.id = res.data.id;
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "saved"
							});
							this.listToComponent.unshift({
								...res.data,
								ProductType : this.info.ProductType,
								User : {  name : this.$store.getters["auth/user"].name }
							});
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
					if (this.info && this.info.name && this.info.code) {
						const service = new ProductsService();
						const res = await service.updateInfo({
							id : this.info.id,		
							...this.info,																			
						});
						if (res && res.error) {
						    this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Actualizando Producto")});
						}else
						if (res && res.data) {					
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "updated"
							});
							const idx = this.listToComponent.findIndex(x => x.id == this.info.id)
							if (idx >= 0) {
								this.listToComponent.splice(idx,1, {
									...this.info, 
								})
							}
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
				console.warn("Error udpate item ", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: this.$Helper.renderErrorMessage(error, "Actualizando Producto")
				});
			}finally{
				this.loading = false;
			}
		},
		
		
		
	}, // methods

};
</script>