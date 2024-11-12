<template>
	<v-select
        dense
		outlined	
        auto-select-first
        clearable
        v-model = "inputField[keyField]"
        :items = "renderList"
        label = "TIPO DE CENTRO"
        item-value = "id"
        item-text = "name"
        prepend-inner-icon="mdi-hospital-box"    
        :menu-props="{ offsetY: true, maxHeight: '200px' }"
        :filter="customFilter"
        
    >
        <!-- <template v-slot:no-data @click="save()"> -->
            <!-- <span> Click para guardar : {{ searchText }}  </span> -->
        <!-- </template> -->
    </v-select>
</template>
<script>
    import TypeCenterService from "@/services/TypeCenterService.js"    
    export default{
        name : "MenuTypeCenterComponent",
        props:["inputField", "keyField"],
        data : ()=>({
            loading : false,
            searchText : "",
            list : [],
        }), 
        computed:{
            renderList(){
                return this.$store.getters["listTypeCenter/list"]
            }
        },  
        mounted(){
        	this.getList();
        },
        methods:{
        	customFilter (item, queryText, itemText) {
		        const textOne = item.name.toLowerCase()
		        // const textTwo = item.abbr.toLowerCase()
		        this.searchText = queryText.toLowerCase()

		        return textOne.indexOf(this.searchText) > -1 
		        // || textTwo.indexOf(this.searchText) > -1
		    },
            async getList(){
                 if (!this.$store.getters["listTypeCenter/isList"]) {
                    this.$store.dispatch("listTypeCenter/getList").then(res=>{
                        this.loading = false;                      
                    });
                }else{
                    this.loading= false
                }
            },
            async save(){
                try {
                    this.loading = true;
                    const service = new TypeCenterService();
                    const res = await service.saveInfo({
                    	name: this.searchText
                    });
                    if (res && res.data) {
                        this.list.push(res.data);
                    }
                } catch (error) {
                    console.warn("error save info distric ", error)
                }finally{
                    this.loading = false;
                }
            }
        },
    }
</script>