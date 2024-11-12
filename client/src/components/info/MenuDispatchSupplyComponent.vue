<template>
    <v-autocomplete
        dense
		outlined	
        auto-select-first
        v-model = "inputField[keyField]"
        :items = "renderList"
        :label = "LabelToMenu || 'SUMINISTRO DISPONIBLE'"
        :search-input.sync="searchText"
        item-value = "ProductId"
        item-text = "name"
        prepend-inner-icon="mdi-selection-marker"    
        :menu-props="{ offsetY: true, maxHeight: '200px' }"
        clearable
        :filter="customFilter"
        :return-object = "isReturnObject"
        :loading="loading"
        :disabled = "loading"
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
                <v-list-item-subtitle v-html="data.item.description"></v-list-item-subtitle>
                <v-list-item-subtitle v-html="`<strong>DISPONIBLE:</strong> ${data.item.available}`"></v-list-item-subtitle>
                <!-- total -->
                </v-list-item-content>
            </template>
        </template>
    </v-autocomplete>
</template>
<script>
    import DispatchSupplyService from "@/services/DispatchSupplyService.js"
    export default{
        name : "MenuDispatchSupplyComponent",
        props : ["inputField", "keyField", "isReturnObject", "LabelToMenu", "AttentionId" ],
        data : ()=>({            
            list : [],
            loading : true,
            searchText : "",
        }), 
        mounted(){
            this.getList();
        },
        computed:{
            renderList(){
                return this.list;
            }
        }, 
        methods:{
            async getList(){                
                 try {
                    this.loading = true;
                    const service = new DispatchSupplyService();
                    const res = await service.findInfo({attention: this.AttentionId});
                    if (res && res.data && res.data.length) {
                        this.list = res.data;
                    }
                } catch (error) {
                    console.warn("error get info products supply ", error)
                }finally{
                    this.loading = false;
                }
            },
            customFilter (item, queryText, itemText) {
                const textOne = item.name && typeof item.name == 'string' ? item.name.toLowerCase() : ""
                // const textTwo = item.description.toLowerCase()
                this.searchText = queryText.toLowerCase()

                return textOne.indexOf(this.searchText) > -1 //||
                // textTwo.indexOf(this.searchText) > -1
            },
        }
    }
</script>
