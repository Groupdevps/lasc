<template>
    <v-autocomplete
        dense
		outlined	
        auto-select-first
        v-model = "inputField[keyField]"
        :items = "renderList"
        label = "Medicamento"
        item-value = "atcCode"
        item-text = "description"
        prepend-inner-icon="mdi-selection-marker"    
        :menu-props="{ offsetY: true, maxHeight: '200px' }"
        clearable
        :filter="customFilter"
        :loading="loading"
        :return-object = "isReturnObject"
    >
        <!-- <template v-slot:no-data>
            <span> Presionar Enter para guardar : {{ inputField[keyField] }}  </span>
        </template> -->
        <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
                <v-list-item-content>
                    <v-list-item-title v-html="data.item.atcCode"></v-list-item-title>
                    <v-list-item-subtitle v-html="data.item.description"></v-list-item-subtitle>
                    <v-list-item-subtitle class="caption" v-html="data.item.activePrinciple"></v-list-item-subtitle>
                </v-list-item-content>
            </template>
        </template>
    </v-autocomplete>
</template>
<script>
    export default{
        name : "MenuMedicationListComponent",
        props : ["inputField", "keyField", "isReturnObject"],
        data : ()=>({
            list : [],
            loading : true,
        }), 
        mounted(){            
            this.getList();
        },
        computed:{
            renderList(){
                return this.$store.getters["listMedication/list"]
            }
        }, 
        methods:{
            getList(){            
                if (!this.$store.getters["listMedication/isList"]) {
                    this.$store.dispatch("listMedication/getList").then(res=>{
                        this.loading = false;
                    });
                }else{
                    this.loading= false
                }
            },
            customFilter (item, queryText, itemText) {
                const textOne = item.atcCode.toLowerCase()
                const textTwo = item.description.toLowerCase()
                const textFour = item.filterDescription.toLowerCase()
                const textThree = item.pharmaceuticalForm.toLowerCase()

                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1 ||
                textTwo.indexOf(searchText) > -1 ||
                textThree.indexOf(searchText) > -1 ||
                textFour.indexOf(searchText) > -1 
            },
        }
    }
</script>
