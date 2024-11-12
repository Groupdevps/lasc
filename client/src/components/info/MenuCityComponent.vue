<template>
	<v-autocomplete
        dense
		outlined	
        auto-select-first
        v-model="inputField[keyField]"
        :items = "renderList"
        label = "MUNICIPIO"
        :search-input.sync="searchText"
        :item-value = "itemValue || 'id'"
        item-text = "name"
        prepend-inner-icon="mdi-city"    
        :menu-props="{ offsetY: true, maxHeight: '200px' }"
        :filter="customFilter"
        :loading = "loading"
        :disabled = "loading"
        :return-object = "isReturnObject"
        v-show = "isRequiredState ? infoState : true"
        @input="renderAutoSetInField()"
    >
        <!-- <template v-slot:no-data >
             <v-list-item @click="save()">
                <v-list-item-content>
                    <v-list-item-title v-html="`Click para guardar : ${ searchText }`"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </template> -->
         <template v-slot:item="data">                
            <template >                 
                <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="data.item.code"></v-list-item-subtitle>
                </v-list-item-content>
            </template>
        </template>
    </v-autocomplete>
</template>
<script>
    import CityService from "@/services/CityService.js"
	// import {cities} 		from "@/components/admissions/deparments.js"

    export default{
        name : "MenuCityComponent",
        props:["inputField", "keyField", "isReturnObject", "infoState", "isStateObject", "autoSetInField", "isRequiredState", "itemValue", "valueSetInField"],
        data : ()=>({
            loading : false,
            searchText : "",
            list : [],
        }), 
        watch:{
            "infoState"(val){                
                if (val) {
                    this.$nextTick(()=>{
                        if (this.inputField && !this.inputField[this.keyField]) {
                            this.getSearch({id: this.isStateObject ? val.code : val })
                        }
                    })
                }
            },

        },
        computed:{
            renderList(){
                return this.list
            },
            
        },  
        mounted(){
        	this.getList();
        },
        methods:{
            renderAutoSetInField(){
                if(this.autoSetInField){                    
                    if (this.isReturnObject) {
                        const tempField=this.valueSetInField || 'id';
                        this.inputField[this.autoSetInField]=this.inputField[this.keyField][tempField]; 
                    }else{
                        const tempField=this.valueSetInField || 'id';
                        if (!this.inputField[this.autoSetInField]) {
                            this.inputField[this.autoSetInField]={}
                        }                        
                        this.inputField[this.autoSetInField]=this.renderList.find(x=> x[tempField]==this.inputField[this.keyField]);
                    }
                }
            },
        	customFilter (item, queryText, itemText) {
		        const textOne = item.name.toLowerCase()
		        const textTwo = item.code.toLowerCase()
                const textThree = item.filterName.toLowerCase()

		        this.searchText = queryText.toLowerCase()

		        return textOne.indexOf(this.searchText) > -1 
		        || textTwo.indexOf(this.searchText) > -1
                || textThree.indexOf(this.searchText) > -1

		    },
            async getList(){
                try {
                    this.loading = true;
                    const service = new CityService();
                    const res = await service.getInfo();
                    if (res && res.data && res.data.length > 0) {
                        this.list = res.data.map(x=>{
                            x.filterName = this.$Helper.normalizeText(x.name)
                            return x
                        });
                    }
                } catch (error) {
                    console.warn("error get info cities ", error)
                }finally{
                    this.loading = false;
                }
            },
            async getSearch(params){
                 try {
                    this.loading = true;
                    const service = new CityService();                    
                    const res = await service.findInfo(params);                
                    if (res && res.data && res.data.length > 0) {
                        this.list = res.data.map(x=>{
                            x.filterName = this.$Helper.normalizeText(x.name)
                            return x
                        });                        
                    }else{
                        this.list = [];
                    }
                } catch (error) {
                    console.warn("error search info cities ", error)
                }finally{
                    this.loading = false;
                }
            },
            async save(){
                try {
                    this.loading = true;
                    const service = new CityService();
                    const res = await service.saveInfo({
                    	name: this.searchText
                    });
                    if (res && res.data) {
                        res.data.filterName = this.$Helper.normalizeText(res.data.name)
                        this.list.push(res.data);
                    }
                } catch (error) {
                    console.warn("error save info city ", error)
                }finally{
                    this.loading = false;
                }
            }
        }, //methods
    }
</script>