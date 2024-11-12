<template>
    <v-autocomplete
        dense
		outlined	
        clearable
        auto-select-first
        v-model = "inputField[keyField]"
        :items = "renderList"
        label = "Convenio"
        item-value = "numberAgreement"
        item-text = "name"
        prepend-inner-icon="mdi-handshake"    
        :menu-props="{ offsetY: true, maxHeight: '200px', maxWidth: '300px'}"
        :loading="loading"
        :return-object = "isReturnObject"
        :persistent-hint="isPersistentHint"
        :hint="renderMessageHint"
        :ref="'autocompleteMenuAgreement'"                      
        :filter="customFilter"        
        @input="renderAutoSetInField()"
    >
        <!-- <template v-slot:no-data>
           
        </template> -->
        <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
                <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                <v-list-item-subtitle v-html="data.item.percent+'%'"></v-list-item-subtitle>                
                <v-list-item-subtitle v-html="data.item.tariffManualType"></v-list-item-subtitle>                

                </v-list-item-content>
            </template>
        </template>
    </v-autocomplete>
</template>
<script>
    import AgreementService from "@/services/AgreementService.js"
    export default{
        name : "MenuAgreementComponent",
        props : ["inputField", "keyField", "isReturnObject",  "isHideDetails", "isPersistentHint", "currentPermission", "searchByNit", "autoSetInField", "isAutoSetloaded","fieldAutoSetLoaded"],
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
            // this.getList();            
        },
        watch:{
            searchByNit(val){
                // if(val){
                    this.getList();
                // }
            }
        },
        computed:{
            renderList(){
                return this.list;
            },
            renderMessageHint(){
               let text="";
                if (this.isReturnObject && this.inputField &&  this.keyField && this.inputField[this.keyField]) {
                    const { year }=this.inputField[this.keyField]
                    text = year;
                }
                return text || ''
            }
        }, 
        methods:{ 
            renderAutoSetInField(){
                if(this.autoSetInField){                    
                    this.inputField[this.autoSetInField]= this.isReturnObject ? this.inputField[this.keyField].numberAgreement : this.inputField[this.keyField]; 
                }
            },
            renderAutoSetLoaded(){
                if (this.isAutoSetloaded && this.fieldAutoSetLoaded && this.infoField && this.infoField[this.fieldAutoSetLoaded]) {
                    const item = this.list.find(x=> x[this.fieldAutoSetLoaded] == this.infoField[this.fieldAutoSetLoaded]);
                    if (item) {
                        this.infoField[this.keyField]=item;
                    }
                }
            },
            customFilter (item, queryText, itemText) {
                const textOne = item.name
                // const textTwo = item.year;
                const searchText = queryText;
                return textOne.indexOf(searchText) > -1 //||
                // textTwo.indexOf(searchText) > -1
            },
            async getList(){
                try{
                    this.loading = true;
                    const service = new AgreementService();
                    const res = await service.getInfo({nit:this.searchByNit || undefined});
                    if (res && res.data && res.data.length > 0) {
                        this.list=res.data;
                        if (res.data.length===1) {
                            this.inputField[this.keyField]=this.list[0];
                        }
                        if (this.isAutoSetloaded) {
                            this.renderAutoSetLoaded()
                        }
                    }else{
                        this.list=[];
                    }
                    
                }catch(error){
                    console.warn("Erro get agreement ", error )

                }finally{
                    this.loading= false
                }
            },
            
        }// methods
    }
</script>
