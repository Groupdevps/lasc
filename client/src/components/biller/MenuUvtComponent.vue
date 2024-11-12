<template>
    <v-autocomplete
        dense
		outlined	
        clearable
        auto-select-first
        v-model = "inputField[keyField]"
        :items = "renderList"
        label = "UVT"
        item-value = "value"
        item-text = "value"
        prepend-inner-icon="mdi-chart-box"    
        :menu-props="{ offsetY: true, maxHeight: '200px', maxWidth: '300px'}"
        :loading="loading"
        :return-object = "isReturnObject"
        :persistent-hint="isPersistentHint"
        :hint="renderMessageHint"
        :ref="'autocompleteMenuUvt'"                      
        :filter="customFilter"
        :disabled="!currentPermission.canAdd"
    >
        <template v-slot:no-data>
            <v-row no-gutters class="pl-2" justify="center">
                <v-col cols="12"><span> No existe informacion de UVT</span></v-col>
                <v-col cols="12"><strong> CREAR </strong> <v-divider class="my-1"></v-divider></v-col>
                
                <v-col cols="6"> <v-text-field dense outlined hide-details v-model="info.year" :label="$t('year')" ></v-text-field> </v-col>
                <v-col cols="6" class="pt-2 pl-2">UVT : {{ search }}</v-col>
                
                <v-col cols="12" class="my-1"><v-divider></v-divider></v-col>
                <v-col cols="3"> 
                    <v-btn x-small color="primary" @click="save" > Guardar</v-btn>
                </v-col>
            </v-row>        
        </template>
        <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
                <v-list-item-content>
                <v-list-item-title v-html="data.item.value"></v-list-item-title>
                <v-list-item-subtitle v-html="data.item.year"></v-list-item-subtitle>                
                </v-list-item-content>
            </template>
        </template>
    </v-autocomplete>
</template>
<script>
    export default{
        name : "MenuUvtComponent",
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
                return this.$store.getters["listUVT/list"];
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
            customFilter (item, queryText, itemText) {
                const textOne = item.value && typeof item.value == "integer" ? item.value.toString() : ""
                const textTwo = item.year;
                const searchText = queryText;
                return textOne.indexOf(searchText) > -1 ||
                textTwo.indexOf(searchText) > -1
            },
            getList(){
                if (!this.$store.getters["listUVT/isList"]) {
                    this.$store.dispatch("listUVT/getList").then(res=>{
                        this.loading = false;
                        if (res && res.data) {
                            this.inputField[this.keyField]=res.data;
                        }
                    });
                }else{
                    this.loading= false
                }
            },
            async save(){
                try{
                    this.loading=true;
                    if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {

                        if (!this.info.year && !this.search ) {
                            this.$EventBus.$emit("notifications",{ type: "warning", msg : `Requiere campos de ${$t('year')} y UVT`})
                        }else{
                            this.$store.dispatch("listUVT/saveList",{
                                year : this.info?.year,
                                value: parseInt(this.search),
                                UserId : this.$store.getters["auth/userId"]
                            }).then(res=>{
                                this.loading=false;
                            }).catch(error=> {

                            })
                        }
                    }
                }catch(error){

                }finally{
                    this.loading=false;
                }
            }
        }
    }
</script>
