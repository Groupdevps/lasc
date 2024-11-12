<template>
	<v-row dense>
		<v-col cols 	= "3">			
			<v-select
				dense
				outlined
				hide-details				
				return-object
				v-model 			= "category" 
				item-value  		= "name"		
				item-text  			= "name"
				placeholder 		= "Seleccionar Categoria"
				:items  			= "renderList" 
				label   			= "CATEGORIA" 
				@change 			= "changeList"
				:disabled 			= "isDisabledCategory"	 
			></v-select>
		</v-col>
		<v-col v-show="isWithExt" cols="12" md="4" sm="6">			
			<slot name="col-prepend"></slot>
		</v-col>
		<v-col>
			<component :is="selectedComponent" :inputField="inputField" :keyField="keyField" :isReturnObject="true"></component>
		</v-col>
	</v-row>
</template>
<script type="text/javascript">
	import MenuTreatmentList from "@/components/info/MenuTreatmentListComponent.vue"
	import MenuCupsList from "@/components/info/MenuCupsListComponent.vue"
	import MenuMedicationList from "@/components/info/MenuMedicationListComponent.vue"
	import MenuTariffManual from "@/components/info/MenuTariffManualComponent.vue"
	import MenuProductsSupply from "@/components/info/MenuProductsSupplyComponent.vue"
	import MenuDiagnoses from "@/components/info/MenuDiagnosesComponent.vue"

	export default{
		name: "SearcherCategoryComponent",
		props: ["startCategory", "inputField", "keyField", "isDisabledCategory", "isWithExt"],
		components:{
			MenuTreatmentList, MenuCupsList, MenuMedicationList, MenuTariffManual, MenuProductsSupply, MenuDiagnoses
		},
		data : ()=>({	
			
			category : {
				"id": 1,
                "name": "PROCEDIMIENTO",
                "field" : "treatment-list",
                component : "MenuTreatmentList",
            },
			selectedComponent : "MenuTreatmentList",			
			listCategory :  [
                {
                    "id": 1,
                    "name": "PROCEDIMIENTO",
                    "field" : "treatment-list",
                    component : "MenuTreatmentList",
                },
              /*   {
                    "id": 2,
                    "name": "LABORATORIO",
                    "field" : "treatment-list",
                }, */
                {
                    "id": 3,
                    "name": "MEDICAMENTOS",                  
                    "field" : "medication-list",
                    component : "MenuMedicationList",
                },
                {
                    "id" : 4,
                    "name" : "DIAGNOSTICOS",
                    "field" : "DiagnosticList", //diagnostic-list
                    component : "MenuDiagnoses",
                },
                
                {
                    "id" : 5,
                    "name" : "MANUAL TARIFARIO",
                    "field" : "tariff-manual",
                    component : "MenuTariffManual",
                },
                {
                    "id" : 6,
                    "name" : "CUPS",
                    "field" : "cups-list",
                    component : "MenuCupsList",
                },
                {
                    "id" : 7,
                    "name" : "SUMINISTROS",
                    "field" : "name",
                    component : "MenuProductsSupply",
                },


            ],
		}),
		created(){
			if (this.startCategory) {			
				const idx = this.listCategory.findIndex(x => x.name == this.startCategory)				
				if (idx >= 0) {
					this.category = this.listCategory[idx];
					this.changeList(this.category);		
				}
			}
		},
		computed:{
			renderList(){
				return this.listCategory;
			}
		},
		methods : {
			changeList(item){				
				this.selectedComponent = item.component;
				// this.inputField.category = item;
			}
		}
	}
</script>