<template>
    <v-autocomplete
        dense
		outlined	
        clearable
        auto-select-first
        v-model = "inputField[keyField]"
        :items = "renderList"
        :label = "LabelToMenu || 'TIPO DE CIRUGIA'"
        :search-input.sync="searchText"
        item-value = "id"
        item-text = "name"
        prepend-inner-icon="mdi-needle"
        :menu-props="{ offsetY: true, maxHeight: '200px' }"
        :filter="customFilter"
        :return-object = "isReturnObject"
        :loading="loading"
        :disabled = "loading"
    >
        <!-- @input="renderAutoSetInField(inputField[keyField])"         -->
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
    import TypeSurgeryService from "@/services/TypeSurgeryService.js"
    export default{
        name : "MenuTypeSurgeryComponent",
        props : ["inputField", "keyField", "isReturnObject", "LabelToMenu", "autoSetInField", "fieldWatch"],
        data : ()=>({            
            list : [],
            loading : true,
            searchText : "",
        }), 
        watch:{
            "fieldWatch"(val){
                this.renderAutoSetInField(val);
            }
        },
        mounted(){
            this.getList();
        },
        computed:{
            renderList(){
                return this.list;
            },
        }, 
        methods:{
            renderAutoSetInField(value){                                
                if (this.autoSetInField) {
                    if (this.isReturnObject) {
                        this.inputField[this.autoSetInField]=value;
                        this.$emit("receiveSurgery", value);
                    }else{                
                        this.inputField[this.autoSetInField]= this.renderList.find(x=> x.id == value);                        
                        this.$emit("receiveSurgery", this.inputField[this.autoSetInField]);
                    }
                }

            },
            async getList(){                
                 try {
                    this.loading = true;
                    const service = new TypeSurgeryService();
                    const res = await service.getInfoNames();
                    if (res && res.data && res.data.length) {
                        this.list = res.data;
                    }
                } catch (error) {
                    console.warn("error get info type surgery supply ", error)
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
