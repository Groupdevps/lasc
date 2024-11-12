<template>
	<v-autocomplete
        dense
		outlined	
        clearable
        auto-select-first
        v-model = "inputField[keyField]"
        :items = "renderList"
        :label = "labelToMenu || 'USUARIO'"
        :item-value = "itemValue || 'id'"
        item-text = "name"
        prepend-inner-icon="mdi-account"    
        :menu-props="{ offsetY: true, maxHeight: '200px' }"
        :filter="customFilter"
        :return-object = "isReturnObject"
        :loading = "loading"
        :disabled = "isDisabled"
        @input="renderAutoSetInField"
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
    export default{
        name : "MenuUserComponent",
        props:["inputField", "keyField", "isReturnObject", "autoSetInField", "valueSetInField", "itemValue", "labelToMenu", "isDisabled"],
        data : ()=>({
            loading : false,
            searchText : "",
            list : [],
        }), 
        computed:{
            renderList(){                
                return this.$store.getters["listUser/list"]
            }
        },  
        mounted(){
        	this.getList();
        },
        methods:{
            renderAutoSetInField(event){
                // this.toUpperCase(event)
                if(this.autoSetInField){
                    if (this.isReturnObject) {
                        const tempField=this.valueSetInField || 'id';
                        this.inputField[this.autoSetInField]=this.inputField[this.keyField][tempField]; 
                    }else{
                        const tempField=this.valueSetInField || 'id';
                        if (!this.inputField[this.autoSetInField]) {
                            this.inputField[this.autoSetInField]=null
                        }
                        this.inputField[this.autoSetInField]= this.renderList.find(x=> x[tempField]==this.inputField[this.keyField]);
                    }
                }

            },
            toUpperCase(event) {
                // Guarda la posición del cursor
                const start = event.target.selectionStart;
                const end = event.target.selectionEnd;

                // Actualiza el valor con el texto en mayúsculas
                this.inputField[this.keyField] = event.target.value.toUpperCase();

                // Usa $nextTick para asegurar que Vue ha actualizado el DOM antes de restablecer el cursor
                this.$nextTick(() => {
                    event.target.setSelectionRange(start, end);
                });
            },
        	customFilter (item, queryText, itemText) {
		        const textOne = item.name.toLowerCase()
		        const textTwo = item.filterName.toLowerCase()
		        this.searchText = queryText.toLowerCase()

		        return textOne.indexOf(this.searchText) > -1 
		        || textTwo.indexOf(this.searchText) > -1
		    },
            async getList(){
                try {
                   if (!this.$store.getters["listUser/isList"]) {
                        this.$store.dispatch("listUser/getList").then(res=>{
                            this.loading = false;                            
                        });
                    }else{
                        this.loading= false
                    }
                } catch (error) {
                    console.warn("error get info users ", error)                
                }finally{
                    this.loading = false;
                }
            },
            /*async save(){
                try {
                    this.loading = true;
                    const service = new StateService();
                    const res = await service.saveInfo({
                    	name: this.searchText
                    });
                    if (res && res.data) {
                        this.list.push(res.data);
                    }
                } catch (error) {
                    console.warn("error save info users ", error)
                }finally{
                    this.loading = false;
                }
            }*/
        },
    }
</script>