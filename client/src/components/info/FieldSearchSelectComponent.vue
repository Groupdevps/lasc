<template>
   <v-combobox
        dense
		outlined						
        v-model="infoInput"
        :label = "parameter.text"
        :items = "listItems"
        :menu-props="{ offsetY: true, maxHeight: '200px' }"
        :item-text 	= "parameter.item_text"
        :item-value = "parameter.item_value"        
        :prepend-inner-icon="parameter.icon"
        append-icon="mdi-chevron-down"
        @change     = "sendAction(infoInput)"
    ></v-combobox>
</template>
<script>
    export default{
        name : "FieldSearchSelectComponent",
        props : ["infoToComponent", "infoToField", "reference", "listToComponent"],
        data : ()=>({
            infoInput : "",
            listItems : [],
            parameter : {
                text    : "buscar",
                item_text : "name",
                item_value : "id",
                icon       : "mdi-magnify"
            }
        }), // data
        created(){
            this.renderCreated(this.infoToComponent)            
        }, 
        methods : {
            renderCreated(item){
                if(item){
                    this.parameter = {...this.parameter, ...item };
                    if(this.listToComponent && this.listToComponent.length > 0){
                        this. listItems = [...this.listToComponent];
                    }else
                    if(item.global_list){
                        this. listItems = this.renderListed(item);
                    }
                }
            }, 
            renderListed(item){
                let temp = [];
                if(item){
                    if (item.global_list) {;
						temp = this.$ManagerSmith.render_listed(item);
					}

                }                
                // temp = temp.map(x => x.name)
                return temp
            }, // 
            sendAction(item){
                if(this.parameter && item){
                    this.$emit("receiveInfo", item);
                }
            },
        }
    }
</script>