<template>
	<v-autocomplete
        dense
		outlined	
        auto-select-first
        clerable
        v-model = "inputField[keyField]"
        :items = "renderList"
        :search-input.sync="searchText"
        label = "TIPO DE PRODUCTO"
        item-value = "id"
        item-text = "name"
        prepend-inner-icon="mdi-medical-bag"    
        :menu-props="{ offsetY: true, maxHeight: '200px' }"
        :filter="customFilter"
        :return-object = "isReturnObject"
        :loading = "loading"
        :disabled = "loading"
        @input="renderAutoSetInField()"
    >
        <!-- @input="inputField[keyField]" -->
        <template v-slot:no-data >
            <v-list-item @click="save()">
                <v-list-item-content>
                    <v-list-item-title v-html="`Click para guardar : ${ searchText }  `"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </template>
        <template v-slot:item="data">                
            <template >                 
                <v-list-item-content>
                    <v-list-item-subtitle v-html="data.item.name"></v-list-item-subtitle>
                </v-list-item-content>
            </template>
        </template>
    </v-autocomplete>
</template>
<script>
    import ProductTypeService from "@/services/ProductTypeService.js"

    export default{
        name : "MenuProductTypeComponent",
        props:["inputField", "keyField", "isReturnObject", "autoSetInField"],
        data : ()=>({            
            loading : false,
            searchText : "",
            list : [],
        }), 
        computed:{
            renderList(){
                return this.list
            }
        },  
        mounted(){
        	this.getList();
        },
        methods:{
            renderAutoSetInField(){
                if(this.autoSetInField){
                    this.inputField[this.autoSetInField] = this.isReturnObject ? this.inputField[this.keyField].id : this.inputField[this.keyField]; 
                }
            },
        	customFilter (item, queryText, itemText) {
		        const textOne = item.name.toLowerCase()
		        // const textTwo = item.abbr.toLowerCase()
		        this.searchText = queryText.toLowerCase()                
		        return textOne.indexOf(this.searchText) > -1 
		        // || textTwo.indexOf(this.searchText) > -1
		    },
            async getList(){
                try {
                    this.loading = true;
                    const service = new ProductTypeService();
                    const res = await service.getInfo();                    
                    if (res && res.data && res.data.length) {
                        this.list = res.data;
                    }
                } catch (error) {
                    console.warn("error get info ", error)
                }finally{
                    this.loading = false;
                }
            },
            async save(){
                try {
                    this.loading = true;
                    const service = new ProductTypeService();
                    const res = await service.saveInfo({
                    	name: this.searchText
                    });
                    if (res && res.data) {                        
                        this.list.push(res.data);
                    }
                } catch (error) {
                    console.warn("error save info  ", error)
                }finally{
                    this.loading = false;
                }
            }
        },
    }
</script>