<template>
    <v-autocomplete
        dense
		outlined	
        auto-select-first
        v-model = "inputField[keyField]"
        :items = "renderList"
        label = "Tratamiento"
        item-value = "cups"
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
                <v-list-item-title v-html="data.item.cups"></v-list-item-title>
                <v-list-item-subtitle v-html="data.item.description"></v-list-item-subtitle>
                </v-list-item-content>
            </template>
        </template>
    </v-autocomplete>
</template>
<script>
    export default{
        name : "MenuTreatmentListComponent",
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
                return this.$store.getters["listTreatment/list"]
            }
        }, 
        methods:{
            getList(){                
                if (!this.$store.getters["listTreatment/isList"]) {
                    this.$store.dispatch("listTreatment/getList").then(res=>{
                        this.loading = false;
                    });
                }else{
                    this.loading= false
                }
            },
            customFilter (item, queryText, itemText) {
                const textOne = item.cups.toLowerCase()
                const textTwo = item.description.toLowerCase()
                const textThree = item.filterDescription.toLowerCase()
                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1 ||
                textTwo.indexOf(searchText) > -1 || 
                textThree.indexOf(searchText) > -1

            },
        }
    }
</script>
