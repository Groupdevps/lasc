<template>
	<v-select
		dense
		outlined
		clearable
		hide-details		
		v-model 		= "inputField[keyField]"
		:items 			= "renderList"
		item-value 		= "id"
		item-text 		= "name"
		label 			= "ESTADO"
		placeholder		= "ESTADO" 
		:return-object  = "isReturnObject"
		:loading 		= "loading"
	>
		<!-- <template v-slot:prepend-inner-icon>
			<v-icon color = "">
				{{ }}
			</v-icon>
		</template> -->
	</v-select>
</template>
<script type="text/javascript">
	
	export default{
        name : "MenuStatusComponent",
        props:["inputField", "keyField", "isReturnObject", "listAllowStatusToComponent"],
        data : ()=>({
            loading : false,
            searchText : "",
            list : [],
        }), 
        computed:{
            renderList(){            	
                return (this.listAllowStatusToComponent && this.listAllowStatusToComponent.length > 0 ? 
                	this.$store.getters["listStatus/list"].filter(x => this.listAllowStatusToComponent.includes(x.name.toLowerCase()) ) : 
                	this.$store.getters["listStatus/list"]) || [];
            }
        },  
        mounted(){
        	this.getList();
        },
        methods:{
        	customFilter (item, queryText, itemText) {
		        const textOne = item.name.toLowerCase()
		        const textTwo = item.code.toLowerCase()
		        this.searchText = queryText.toLowerCase()

		        return textOne.indexOf(this.searchText) > -1 
		        || textTwo.indexOf(this.searchText) > -1
		    },
            async getList(){
                try {
                    this.loading = true;
                   if (!this.$store.getters["listStatus/isList"]) {
	                    this.$store.dispatch("listStatus/getList");
	                }else{
	                    this.loading= false
	                }
                } catch (error) {
                    console.warn("error get info status ", error)
                }finally{
                    this.loading = false;
                }
            },
            async save(){
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
                    console.warn("error save info status ", error)
                }finally{
                    this.loading = false;
                }
            }
        },
    }
</script>