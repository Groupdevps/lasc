<template>
    <v-autocomplete
        dense
		outlined	
        clearable
        auto-select-first
        v-model = "inputField[keyField]"
        :items = "renderList"
        :label = "LabelToMenu || 'TIPO DE HABITACION'"
        :search-input.sync="search"
        item-value = "id"
        item-text = "name"
        prepend-inner-icon="mdi-home-city"    
        :menu-props="{ offsetY: true, maxHeight: '200px' }"
        :filter="customFilter"
        :return-object = "isReturnObject"
        :loading="loading"             
    >
         <template v-slot:no-data >                  
            <v-card outlined>
                 
                <v-row no-gutters class="pl-2" justify="center">
                    <v-col cols="12"><span> No existe informacion</span></v-col>
                    <v-col cols="12"><strong> CREAR </strong> <v-divider class="my-1"></v-divider></v-col>
                    
                    <v-col cols="6"> <v-text-field dense outlined hide-details v-model="info.description" :label="$t('description')" @input="v => info.description=v.toUpperCase()"></v-text-field> </v-col>
                    <v-col cols="6" class="pt-2 pl-2">TIPO DE HABITACION : {{ search ? search.toUpperCase() : "" }}</v-col>
                    
                    <v-col cols="12" class="my-1"><v-divider></v-divider></v-col>
                    <v-col cols="3"> 
                        <v-btn x-small color="primary" @click="save()" >Guardar</v-btn>
                    </v-col>
                </v-row>                        
            </v-card>          
        </template>
        <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
                <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                <v-list-item-subtitle v-html="data.item.description"></v-list-item-subtitle>
                <!-- <v-list-item-subtitle v-html="data.item.status"></v-list-item-subtitle> -->
                </v-list-item-content>
            </template>
        </template>
    </v-autocomplete>
</template>
<script>
    import RoomTypeService from "@/services/RoomTypeService.js"
    export default{
        name : "MenuRoomTypeComponent",
        props : ["inputField", "keyField", "isReturnObject", "LabelToMenu", "AttentionId", "currentPermission"],
        data : ()=>({            
            list : [],
            info: { description: "" },
            loading : true,
            search : "",
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
                    const service = new RoomTypeService();
                    const res = await service.getInfo();
                    if (res && res.data && res.data.length) {
                        this.list = res.data;
                    }
                } catch (error) {
                    console.warn("error get info  ", error)
                }finally{
                    this.loading = false;
                }
            },
            customFilter (item, queryText, itemText) {
                const textOne = item.name && typeof item.name == 'string' ? item.name.toLowerCase() : ""
                // const textTwo = item.description.toLowerCase()
                this.search = queryText.toLowerCase()
                // this.inputField[this.keyField]=this.search;
                return textOne.indexOf(this.search) > -1 //||
                // textTwo.indexOf(this.search) > -1
            },
            async save(){
                try{                    
                    this.loading=true;
                    if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
                        if (!this.info.description && !this.search ) {
                            this.$EventBus.$emit("notifications",{ type: "warning", msg : `Requiere campos de ${$t('description')} y Tipo de habitacion`})
                        }else{
                            const service =  new RoomTypeService();
                            const res = await service.saveInfo({
                                description : this.info?.description,
                                name: this.search.toUpperCase(),
                                UserId : this.$store.getters["auth/userId"]
                            }).then(res=>{
                                if (res && res.data) {
                                    this.list.push(res.data)
                                }
                                this.loading=false;
                            }).catch(error=> {

                            })
                        }
                    }
                }catch(error){
                    console.warn("Error save ", error)
                }finally{
                    this.loading=false;
                }
            }
        }
    }
</script>
