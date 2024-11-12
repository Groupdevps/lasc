<template>
    <v-select
        dense
		outlined	
        clearable
        auto-select-first
        v-model = "inputField[keyField]"
        :items = "renderList"
        label = "GENERO"
        item-value = "id"
        item-text = "name"
        prepend-inner-icon="mdi-gender-male-female"    
        :menu-props="{ offsetY: true, maxHeight: '200px' }"
        :loading = "loading"
        :disabled = "loading || isDisabled"
        :return-object = "isReturnObject"
        @input="renderAutoSetInField()"
    >
        <!-- :rules = "rules" -->
        <!-- :filter="customFilter" -->
        <!-- :search-input.sync="searchText" -->
        <!-- <template v-slot:no-data >
            <v-list-item @click="save()">
                <v-list-item-content>
                    <v-list-item-title v-html="`CLICK PARA GUARDAR : ${ searchText }  `"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </template> -->
    </v-select>
</template>
<script>    
    export default{
        name : "MenuGenderComponent",
        props:["inputField", "keyField", "isReturnObject",  "autoSetInField", "isDisabled"],
        data : ()=>({
            loading : false,
            searchText : "",
            list : [                
                { id : 1, name : "Masculino"},
                { id : 2, name : "Femenino"},
                { id : 3, name : "Otro"},             
            ],
            rules : [(value) =>  !!value || 'Requerido.']
        }), 
        
        mounted(){
            this.getList();
        },
        computed:{
           
            renderList(){
                return this.$store.getters["listGender/list"];
            },
                    
        },  
        methods:{
            renderAutoSetInField(){
                if(this.autoSetInField){
                    this.inputField[this.autoSetInField]= this.isReturnObject ? this.inputField[this.keyField].id : this.inputField[this.keyField]; 
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
                   if (!this.$store.getters["listGender/isList"]) {
                        this.$store.dispatch("listGender/getList").then(res=>{
                            this.loading = false;
                        });
                    }else{
                        this.loading= false
                    }
                } catch (error) {
                    console.warn("error get info gender ", error)
                }finally{
                    this.loading = false;
                }
            },
            async getSearch(params){
                 try {
                    this.loading = true;
                    const service = new TypeDocumentService();
                    const res = await service.findInfo(params);
                    if (res && res.data && res.data.length) {
                        this.list = res.data;
                    }else{
                        this.list = [];
                    }
                } catch (error) {
                    console.warn("error search info gender ", error)
                }finally{
                    this.loading = false;
                }
            },
            async save(){
                try{
                    this.loading = true;
                    const service = new TypeDocumentService();
                    const res = await service.saveInfo({
                        name : this.searchText
                    });
                    if (res && res.data) {
                        this.list.push(res.data);
                    }
                } catch (error) {
                    console.warn("error save info gender ", error)
                }finally{
                    this.loading = false;
                }
            }
        },
    }
</script>
