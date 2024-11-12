<template>
    <v-autocomplete
        dense
		outlined	
        clearable
        auto-select-first
        v-model = "inputField[keyField]"
        :items = "renderList"
        :label = "LabelToMenu || 'PRODUCTO'"
        :search-input.sync="searchText"
        item-value = "id"
        item-text = "name"
        prepend-inner-icon="mdi-selection-marker"    
        :menu-props="{ offsetY: true, maxHeight: '200px' }"
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
                <v-list-item-subtitle v-html="`Disponible: ${data.item.stock} ; Valor Unitario: $${data.item.unitValue || 0} `"></v-list-item-subtitle>

                </v-list-item-content>
            </template>
        </template>
    </v-autocomplete>
</template>
<script>
    import ProductsService from "@/services/ProductsService.js"
    export default{
        name : "MenuProductsInventoryComponent",
        props : ["inputField", "keyField", "isReturnObject", "LabelToMenu"],
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
                    const service = new ProductsService();
                    const res = await service.getAllInfo();
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
