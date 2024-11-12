<template>
    <v-container fluid>
        <v-row dense>
            <v-col cols ="10">
                <span class = "caption"> BUSQUEDA POR DOCUMENTO</span>
                <v-text-field
                    dense
                    outlined
                    v-model.number		= "search"
                    :label 				= "$t('search')"
                    :placeholder 		= "$t('document')"
                    prepend-icon-inner 	= "mdi-magnify"
                    type 				= "number"
                    @keyup.enter 		= "actions({action:'searchPatient'})"
                    prepend-inner-icon  = "mdi-magnify"
                    :autofocus  		= "true"
                    :rules 				= "[v =>  (v.toString().length >= 8 || 'Minimo 8 caracteres')]"						
                    class ="text-uppercase"
                ></v-text-field>
                
            </v-col>
            <v-col cols="2">
                <v-btn color="primary" @click="actions({action:'searchPatient'})" class="mt-6">Buscar</v-btn>
            </v-col>
            <v-col cols="12">
                <v-btn
                    small 
                    color = "primary"
                    @click = "show.searchByName = !show.searchByName"                    
                >
                    <v-icon >{{!show.searchByName ? 'mdi-chevron-down' : 'mdi-chevron-up'}}</v-icon>
                    Busqueda por nombre
                </v-btn>
            </v-col>
            <v-col cols ="12" v-show = "show.searchByName">
                <span class = "caption"> BUSQUEDA POR NOMBRE</span>
                <v-row dense>

                    <template v-for ="(item, idxItem) in fields">

                        <v-col>

                            <v-text-field
                                dense
                                outlined
                                v-if                = "item.type != 'btn'"
                                v-model     		= "infoInput[item.key]"
                                :label 				= "$t(item.text)"
                                :placeholder 		= "$t(item.placeholder)"
                                :prepend-icon-inner	= "item.icon"
                                type 				= "text"
                                @keyup.enter 		= "actions(item)"
                                prepend-inner-icon  = "mdi-magnify"
                                :autofocus  		= "true"       
								@input 		 		= "(v) => infoInput[item.key] = v.toUpperCase()"
                                class ="text-uppercase"

                                
                            ></v-text-field>
                            <v-btn
                                v-else
                                color  = "primary"
                                @click = "actions(item)"

                            >
                                {{ item.text }}
                            </v-btn>
                        </v-col>
                    </template>
                </v-row>
                
            </v-col>
            <v-col cols ="12" v-show = "show.searchByName">
                <v-data-table
                    fixed-header	 
                    hide-default-footer
                    :headers = "headers"                                
                    :items 	 			 = "listRender"
                    class 	 			 = "elevation-5 text-uppercase"  		
                    :height 			= "'200px'"
                    item-key 			= "index"
                    :loading 			= "loading"
                >
                    <template
                        v-slot:item.action = "{item, index}"
                    >
                        <v-btn small color ="primary" @click ="actions({action : 'sendPatient'}, item)"> Ver Paciente </v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import PatientService 	from "@/services/PatientService.js"

    export default{
        name : "SearcherPatientComponent",
        data : (vm)=>({
            search : "",
            infoInput : {},
            listPatients : [],
            loading : false,
            show : {
                searchByName : false, 
            },
            fields : [
                {
                    key : "name",
                    text : "name",
                    type : "text",
                    enable : true,
                    icon 	: "mdi-account", 
                    action : "searchByNames",
                    cols 	: 3,
                },
                {
                    key : "secondName",                   
                    text : "second_name",
                    type : "text",
                    enable : true,
                    icon 	: "mdi-account", 
                    action : "searchByNames",
                    cols 	: 3,

                },
                {
                    key : "lastName",
                    text : "lastname",
                    type : "text",
                    enable : true,
                    icon 	: "mdi-account", 
                    action : "searchByNames",
                    cols 	: 3,
                },
                {
                    key : "secondSurname",
                    text : "second_surname",
                    type : "text",
                    enable : true,
                    icon 	: "mdi-account", 
                    action : "searchByNames",
                    cols 	: 3,
                },
                {
                    key : "btnSearch",
                    type : "btn",
                    action : "searchByNames",
                    text : "Buscar",
                }
            ],
            headers : [
                { text : vm.$t("ID"), value: "id"},
                { text : vm.$t("numberId"), value: "numberId"},
                { text : vm.$t("name"), value: "name"},
                { text : vm.$t("second_name"), value: "secondName"},
                { text : vm.$t("lastname"), value: "lastName"},
                { text : vm.$t("second_surname"), value: "secondSurname"},
                { text : vm.$t("actions"), value: "action"},

            ]
        }), // searcherPatient
        created(){
            this.setDefaultInputs()
        },
        computed:{
            listRender:function(){
                return this.listPatients;
            }
        },
        methods: {
            setDefaultInputs(){
               this.infoInput= {
                    name : "",
                    secondName :"",
                    lastName : "",
                    secondSurname : ""
                    
                } 
            },
            actions({action}, item){
                if(action == "searchPatient"){
                    if(this.search.toString().length >= 8){						
                        this.$emit("receiveActions", { action, params: {
                            numberId : this.search ,
                        }});
                     }else{
                        this.$EventBus.$emit("notifications",{
                            type 	: "warning",
                            msg : this.$t("min_8_characters"),
                        })
                    }	
                }else if(action == "sendPatient"){
                    if(item && item.id){
                        this.$emit("receiveActions", { action : "setPatientByName", params: {...item}});
                    }
                }else if(action == "searchByNames"){
                    this.getPatients();
                }
            },
            async getPatients(){
                const service   = new PatientService();
                const data      = await service.fetchByParamsName({...this.infoInput})

                if(data){
                    const {rows} = data;
                    this.listPatients = [...rows];
                }else{
                    // code
                }
            }
        }, // methods
    }
</script>