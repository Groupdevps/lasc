<template>
    <v-data-table
        dense
	    fixed-header
		:headers 			 = "headers"
	 	:items 	 			 = "renderList"
	    class 	 			 = "elevation-5 ma-2"			 			   
	   	:footer-props 		 = "{
	   		showFirstLastPage   : false,	   		
	   		itemsPerPageOptions : [100],
	   		showCurrentPage     : false
	   	}"
	   	:loading-text 		= "$t('LoadingPeaseWait')"
        :height             = "200+'px'"
	    :loading  			= "loading"
        :show-select  		= "false"
        :single-select 		= "false"
        v-model 			= "selections"
        :item-key 			= "'id'"        
	    			
    >
        <template v-slot:item.download="{item}">
            <v-btn small color="error" @click="downloadMenu(item)">
                <v-icon small>mdi-download</v-icon>
            </v-btn>
        </template>
        <template v-slot:item.edit="{item}">
            <v-btn small color="primary" v-show="item.isEditable" @click="redirectTo(item)">
                <v-icon  small >mdi-pencil</v-icon>
                <!-- mdi-arrow-right-bold -->
            </v-btn>
        </template>
    </v-data-table>
    <!-- <v-card
        class="m1-5"
        width="650"
        
    >
    <v-card-text  >

        <v-container fluid style="height: 200px; overflow-y: visible;">
        <v-list  style="height :200px" dense>
            <template v-for = "(itemMenu,idxMenu) of list">

                <v-list-item v-if = "!itemMenu.subSupports" dense>
                    
                    <v-list-item-title>{{itemMenu.text}}</v-list-item-title>
                    <v-list-item-icon>
                        <v-icon @click ="downloadMenu(itemMenu)">mdi-download</v-icon>
                    </v-list-item-icon>
                </v-list-item>
                
                <v-list-group
                    v-if ="itemMenu.subSupports"
                    :value="true"
                    prepend-icon="mdi-account-circle"
                >
                    <template v-slot:activator>
                        <v-list-item-title>{{itemMenu.text}}</v-list-item-title>
                    </template>
                    <v-list-item
                        v-for="(subMenu, idxSub) in itemMenu.subSupports"
                        :key="idxSub"
                        link
                        >
                        <v-list-item-title>{{ subMenu.text }}</v-list-item-title>
                        
                        <v-list-item-icon>
                            <v-icon  @click ="downloadMenu(itemMenu)">mdi-download</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                    
                </v-list-group>
            </template>    
        </v-list>
        </v-container>
    </v-card-text>
  </v-card> -->
</template>
<script>

export default{
    name: "InvoiceSupportsComponent",
    props: ["infoToComponent"],
    data : ()=>({
        loading : false,
        list : [
        { id: 1 , typeSupport : "clinicHistory", text : "Historia Clinica", },
        { id: 2 , typeSupport : "orderMedications", text : "Orden Medicamentos"},
        { id: 3 , typeSupport : "evolutionNotes", text : "Notas medicas"},
        { id: 4 , typeSupport : "nursingNotes", text : "Notas Enfermeria"},
        { id: 5 , typeSupport : "diagnosticAids", text : "Ayudas Diagnosticas"},
        { id: 6 , typeSupport : "laboratories", text : "Laboratorios"},
        { id: 7 , typeSupport : "expenseSheet", text : "Hoja de Gastos", 
            subSupports : []
            },            
        { id: 8 , typeSupport : "urgency", text : "Urgencia", subText : "Hoja de Gastos", isEditable: true, redirectTo: "ExpenseSheetInvoice"},
        { id: 9 , typeSupport : "hospitalization", text : "Hospitalizacion", subText : "Hoja de Gastos", isEditable: true, redirectTo: "ExpenseSheetInvoice"},
        { id: 10 , typeSupport : "surgery", text : "Cirugia", subText : "Hoja de Gastos", isEditable: true, redirectTo: "ExpenseSheetInvoice"},
        { id: 11 , typeSupport : "epicrisis", text : "Epicrisis"},
    ],
        selections : [],
        infoInput : { CAU : ""},
        headers : [
            { text : "Tipo de Soporte", value : "text", align: 'center'},
            { text : "", value : "subText", align: 'start',},
            { text : "Editar", value : "edit"},
            { text : "Descargar", value : "download"},

           
        ]
    }), // data
    created(){
        if(this.infoToComponent){
            if(this.infoToComponent.AttentionId){
                this.getInfo({AttentionId : this.infoToComponent.AttentionId});
            }
        }
    }, // created
    watch:{
        infoToComponent: function(val){
            
            if(val){
                if(val.AttentionId){
                    this.getInfo({AttentionId : val.AttentionId})
                }
            }
        }
    }, // watch
    computed:{
        renderList: function(){
            return this.list;
        }
    }, // computed
    methods: {
        async getInfo(params){
            /* const service = new InvoiceDetailsService();
            const res = await service.getDetails(params);
            console.log("supports", res)
            if(res && res.data){
                
            } */
            
        },
        downloadMenu(item){

        }, 
        redirectTo(item){
            if (item) {                                              
                this.$router.push({ 
                    name    : item.redirectTo,//"DashboardNursing",
                    params  : {
                        attention       : this.$route.params.id,
                        option2 : item.typeSupport,
                    }
                        // id : this.infoToComponent?.AttentionId || this.$route.parmas.id,                            
                        // numberId : this.$route.params.numberId,
                        // option : this.$route.params.option, 
                })
                
            }
        },
    }, // methods
}
</script>
