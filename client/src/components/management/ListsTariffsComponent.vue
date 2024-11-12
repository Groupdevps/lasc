<template>
    <v-data-table
		dense
	    fixed-header
		:headers 			 = "headers"
	 	:items 	 			 = "renderList"
	    class 	 			 = "elevation-5 ma-2"			 			   
	   	:footer-props 		 = "{
	   		showFirstLastPage   : false,	   		
	   		itemsPerPageOptions : [500, 100, 200],
	   		showCurrentPage     : false
	   	}"
	   	:loading-text 		= "$t('LoadingPeaseWait')"
        :height             = "currentHeight"
	    :loading  			= "loading"
	    			
	>
        <template v-slot:top>

            
            <v-row
                dense
            >
            <v-col cols = "4">
                <v-select
                dense
                outlined
                hide-details                
                v-model 			= "infoInput.selectSearch" 
                :item-value  		= "fieldSelect.itemValue"		
                :item-text  		= "fieldSelect.itemText"
                :placeholder 		= "fieldSelect.placeholder"
                :items  			= "renderListed(fieldSelect)" 
                :label   			= "fieldSelect.text" 
                @change 			= "changeList"
                ></v-select>
            </v-col>
            <v-col cols = "6">
                <v-text-field
                    dense
                    outlined
                    v-model = "infoInput.search"
                    :label  = "$t('search')"                    
                    @input  = "v => infoInput.search = v.toUpperCase()"
                ></v-text-field>
            </v-col>
        </v-row>
    </template>
</v-data-table>
</template>
<script>
    export default{
        name : "ListsComponent",
        data : ()=>({
            infoInput : {
                selectSearch : "",
                search : "",
            },
            loading : false,
            fieldSelect : {
                itemValue : "field",
                itemText : "name",
                placeholder : "",
                list        : "listCategory",
                //global_list : "tariff-category",
                text : "Tipo de listado"
            },
            listCategory: [
                {
                    "id": 1,
                    "name": "PROCEDIMIENTO",
                    "field" : "treatment-list",
                },
              /*   {
                    "id": 2,
                    "name": "LABORATORIO",
                    "field" : "treatment-list",
                }, */
                {
                    "id": 3,
                    "name": "MEDICAMENTOS",                  
                    "field" : "medication-list",
                },
                {
                    "id" : 4,
                    "name" : "DIAGNOSTICOS",
                    "field" : "diagnostic-list",
                },
                
                {
                    "id" : 5,
                    "name" : "MANUAL TARIFARIO",
                    "field" : "tariff-manual",
                },
                {
                    "id" : 6,
                    "name" : "CUPS",
                    "field" : "cups-list",
                }

            ],
            list    : [],            
            headers : [],
        }), // data
        created(){  
            this.changeList();
        }, // created
        computed:{
            currentHeight : function(){
                return (this.$vuetify.breakpoint.height - 245) +"px" 
            },
            renderList :function(){
                const {search, selectSearch } = this.infoInput;
                let listFilter = this.list;
                if(search){
                    const searching =search.toLowerCase()
                    if(selectSearch == "treatment-list"){     
                        listFilter = this.list.filter(x => x.cups.includes(searching) || x.description.toLowerCase().includes(searching));
                    }else if(selectSearch == "medication-list"){
                        listFilter = this.list.filter(x => x.atcCode.includes(searching) || x.description.toLowerCase().includes(searching));
                    }else if(selectSearch == "diagnostic-list"){
                        listFilter = this.list.filter(x => x.code.includes(searching) || x.description.toLowerCase().includes(searching));                    
                    }else if(selectSearch == "tariff-manual"){
                        listFilter = this.list.filter(x => (x.code && x.code.toString().includes(searching)) || x.description.toLowerCase().includes(searching));
                    }else if(selectSearch == "cups-list"){
                        listFilter = this.list.filter(x => (x.code && x.code.includes(searching)) || x.description.toLowerCase().includes(searching));                        
                    }
                }
               
                return listFilter;
            },
            currentPermission(){
                return this.$store.getters["auth/getPermission"]("ListsComponent") 
            }
        }, // computed
        methods: {
            changeList(){
                const {selectSearch } = this.infoInput;
                this.list = this.$ManagerSmith.render_listed({global_list : selectSearch});
                if(selectSearch == "treatment-list"){        
                    this.headers = [
                        { text : "CUPS", value : "cups"},
                        { text : "Descripcion", value : "description" },
                        { text : "Nivel", value : "level"},
                        { text : "Clarificacion", value : "clarification"},
                    ]            
                }else if(selectSearch == "medication-list"){
                    this.headers = [
                        { text : "Codigo atc", value : "atcCode"},
                        { text : "Descripcion", value : "description" },
                        { text : "Principio activo", value : "activePrinciple" },
                        { text : "Concentracion", value : "concentration"},
                        { text : "Clarificacion", value : "clarification"},
                        { text : "Forma Farmaceutica", value : "pharmaceuticalForm"},
                    ]
                }else if(selectSearch == "diagnostic-list"){
                    this.headers = [
                        { text : "Codigo", value : "code"},
                        { text : "Descripcion", value : "description" },
                    ]
                    
                }else if(selectSearch == "tariff-manual"){
                    this.headers = [
                        { text : "Codigo", value : "code"},
                        { text : "Descripcion", value : "description" },
                        { text : "Activo", value : "isActive"},
                        { text : "Pesos", value : "pesos"},
                        { text : "Puntos", value : "points"},
                        { text : "Grupo quirúrgico", value : "surgicalGroup"},                        
                    ]
                }else if(selectSearch == "cups-list"){
                    this.headers = [
                        { text : "Codigo", value : "code"},
                        { text : "Descripcion", value : "description" },
                    ] 
                }else{
                    this.headers = [
                        { text : "Codigo", value : "code"},
                        { text : "Descripcion", value : "description" },
                    ]
                } 
            },
            renderListed(item){
                if(item){
                    if (item.global_list) {
                        return this.$ManagerSmith.render_listed(item);
                    }else if(item.list){
                        return this[item.list];
                    }
                }
                return []
            }, //
        }, // methods
    }
</script>    
