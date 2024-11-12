<template>
    <v-select
        dense
		outlined	
        clearable
        auto-select-first
        v-model = "inputField[keyField]"
        :items = "renderList"
        label = "TIPO DETALLE"
        item-value = "name"
        item-text = "name"
        prepend-inner-icon="mdi-note-multiple-outline"    
        :menu-props="{ offsetY: true, maxHeight: '200px', maxWidth: '300px'}"
        :loading="loading"
        :return-object = "isReturnObject"
        :persistent-hint="isPersistentHint"        
        :ref="'selectMenuTypeDetail'"                      
        :filter="customFilter"
        
    >
        <template v-slot:no-data>
           <span>No se encontraron datos</span>
        </template>
        <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
                <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                <!-- <v-list-item-subtitle v-html="data.item.TypeTariff"></v-list-item-subtitle>                 -->
                </v-list-item-content>
            </template>
        </template>
    </v-select>
</template>
<script>
    import DetailTypeService from "@/services/DetailTypeService.js"
    export default{
        name : "MenuTypeDetailComponent",
        props : ["inputField", "keyField", "isReturnObject",  "isHideDetails", "isPersistentHint", "currentPermission"],
        data : ()=>({
            list : [],
            info : { year : ""},
            loading : true,
            showEndMenu: false,            
            search : "",
            currentPage : 1,
            nextPage : null,
            maxWidthMenu : 300,
        }), 
        mounted(){            
            this.getList();            
        },
        computed:{
            renderList(){
                return this.list;
            },
            
        }, 
        methods:{ 
            customFilter (item, queryText, itemText) {
                const textOne = item.name;
                const textTwo = item.description;
                const searchText = queryText;
                return textOne.indexOf(searchText) > -1 ||
                textTwo.indexOf(searchText) > -1
            },
            async getList(){
                 try{
                    this.loading = true;
                    const service = new DetailTypeService();
                    const res = await service.getInfo();
                    if (res && res.data && res.data.length > 0) {
                        this.list=res.data;
                    }else{
                        this.list=[];
                    }
                    
                }catch(error){
                    console.warn("Erro get detail type ", error )

                }finally{
                    this.loading= false
                }
            },
            
        }, //methods
    }
</script>
