<template>
    <v-autocomplete
        dense
		outlined	
        clearable
        auto-select-first
        v-model = "inputField[keyField]"
        :items = "renderList"
        :label = "LabelToMenu || 'TIPO DE VIA'"
        :search-input.sync="searchText"
        item-value = "name"
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
                <!-- <v-list-item-subtitle v-html="data.item.description"></v-list-item-subtitle> -->
                <!-- <v-list-item-subtitle v-html="`Disponible: ${data.item.stock} ; Valor Unitario: $${data.item.unitValue || 0} `"></v-list-item-subtitle> -->

                </v-list-item-content>
            </template>
        </template>
    </v-autocomplete>
</template>
<script>
    // import TypeSurgeryService from "@/services/TypeSurgeryService.js"
    export default{
        name : "MenuTypeSurgicalRouteComponent",
        props : ["inputField", "keyField", "isReturnObject", "LabelToMenu"],
        data : ()=>({            
            list : [
                { name : "A"},
                { name : "B"},
                { name : "C"},

            ],
            loading : false,
            searchText : "",
        }), 
        mounted(){
            // this.getList();
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
                    const service = new TypeSurgeryService();
                    const res = await service.getAllInfo();
                    if (res && res.data && res.data.length) {
                        this.list = res.data;
                    }
                } catch (error) {
                    console.warn("error get info menu type surgical route ", error)
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
