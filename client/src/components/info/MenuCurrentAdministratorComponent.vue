<template>
    <v-autocomplete
        dense
		outlined	
        auto-select-first
        v-model = "inputField[keyField]"
        :items = "renderList"
        label = "EPS"
        :item-value = "valueField || 'id'"
        item-text = "name"
        prepend-inner-icon="mdi-hospital-building"    
        :menu-props="{ offsetY: true, maxHeight: '200px' }"
        clearable
        :filter="customFilter"
        :loading="loading"
        :disabled = "isDisabled"
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
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                <v-list-item-subtitle v-html="data.item.nit"></v-list-item-subtitle>
                </v-list-item-content>
            </template>
        </template>
    </v-autocomplete>
</template>
<script>
    export default{
        name : "MenuCurrentAdministratorComponent",
        props : ["inputField", "keyField", "isReturnObject", "isDisabled", "valueField"],
        data : ()=>({
            list : [],
            loading : true,
        }), 
        mounted(){                        
            this.getList();
        },
        computed:{
            renderList(){
                return this.$store.getters["listCurrentAdministrator/list"]
            }
        }, 
        methods:{
            getList(){
                if (!this.$store.getters["listCurrentAdministrator/isList"]) {
                    this.$store.dispatch("listCurrentAdministrator/getList").then(res=>{
                        this.loading = false;
                    });
                }else{
                    this.loading= false
                }
            },
            customFilter (item, queryText, itemText) {
                const textOne = item.name && typeof item.name == "string" ? item.name.toLowerCase() : ""
                const textTwo = item.nit.toLowerCase()
                const searchText = queryText.toLowerCase()
                return textOne.indexOf(searchText) > -1 ||
                textTwo.indexOf(searchText) > -1
            },
        }
    }
</script>
