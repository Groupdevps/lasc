<template>
    <v-card outlined>
        <v-card-title class="pa-0 primary subtitle-2 white--text" >
            <v-btn                  
                small
                color  = "warning"
                @click  = "$router.go(-1)"
                tile
            >
                <v-icon small class="mr-1">mdi-arrow-left</v-icon>
                {{ $t('go_back') }}
            </v-btn>
            <v-spacer></v-spacer>
            <strong>RESULTADOS DE AYUDAS DIAGNOSTICAS</strong>
            <v-spacer></v-spacer>

        </v-card-title>
        <v-card-text class="pa-2">
            <v-row dense>               
                <template v-for = "(item, idxItem) of patientFields">
                    <v-col
                        :cols = "item.cols || 3"
                    >
                        <span
                            v-if   = "item.type == 'title'"
                            class = "elevation-1 subtitle-1 font-weight-regular"
                        >   
                        <v-divider></v-divider>
                            {{ item.text }}
                            <v-divider 
                                class = "pa-0 ma-0 primary"
                                :inset = "true"
                            ></v-divider>
                        </span>
                        <span class="caption text-uppercase" v-if="item.type =='text'">                            
                            <strong> {{ item.text }} : </strong> <span>{{info[item.key]}}</span>
                        </span>
                    </v-col>
                </template>                             
               <v-col cols="5"> 
                    <v-select 
                        dense 
                        outlined
                        return-object
                        hide-details
                        clearable
                        :items="renderList"
                        v-model ="selectDiagnosticAid"
                        label= "SELECCIONAR ORDEN"
                        item-text="CupsList.description"
                        :loading="loading"
                    ></v-select>
                    <v-divider  class = "pa-0 ma-0 white"></v-divider>                    
                </v-col>
                <v-col cols="7"><v-divider class="mt-10"></v-divider></v-col>
                <v-col cols="12">
                    <SubDiagnosticAid :infoToComponent="info"  :DiagnosticAidSelected="selectDiagnosticAid" :currentPermission="currentPermission" ></SubDiagnosticAid>                    
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script type="text/javascript">
    
    import OrderService from "@/services/OrderService.js"
    import SubDiagnosticAid from "@/components/diagnosticAid/SubDiagnosticAidComponent.vue"
    
    export default{
        name : "DiagnosticAidView",
        components:{ SubDiagnosticAid },
        data : () =>({
            list : [],
            info : {},     
            loading : false,        
            selectDiagnosticAid : null,
            patientFields : [
                {type: "title", text : "DATOS DEL PACIENTE", cols : 12},
                {type: "text", text: "Nombre", key : "fullName", cols : 2},
                {type: "text", text: "Documento", key : "numberId", cols : 2},
                {type: "text", text: "Edad", key : "age", cols : 2},
                {type: "text", text: "Sexo", key : "GenderName", cols : 2},
                {type: "text", text: "EPS", key : "assignedAdministrator", cols : 2}, //assignedAdministrator
                {type: "title", text : "INFORMACION DE ATENCIÓN", cols : 12},                
                {type: "text", text: "Servicio", key : "typeService", cols : 2},
                {type: "text", text: "Numero de Atencion", key : "AttentionId", cols: 2},
                {type: "text", text: "Numero de Orden", key : "orderNumber", cols : 2},
                {type: "text", text: "Tipo de Orden", key : "typeOrder", cols : 2},

                {type: "title", text : "FORMULARIO DE RESULTADOS", cols : 12},

            ],
            
        }), // data
        mounted(){
            this.getInfo()
           
        },
        computed:{
            renderList: function(){
                return this.info.Orders;
            },
            currentPermission(){
                return this.$store.getters["auth/getPermission"]("DashboardDiagnosticAid") 
            }
        }, // computed
        methods:{
            async getInfo(){
                try {
                    this.loading = true;
                    
                    const service = new OrderService();
                    const types=[];
                    const tempOrder1= this.$store.getters["listTypesOrder/getTypeOrderByName"]("ORDEN AYUDA DIAGNOSTICA")
                    if (tempOrder1) {
                        types.push(tempOrder1.id)
                    }
                    const res = await service.searchOrders({ 
                        attention : this.$route.params.AttentionId,  
                        type : types,//[4], 
                    });
                    
                    if (res && res.data && res.data.orders && res.data.orders.length > 0) {
                        const idx = res.data.orders.findIndex(x => x.id == this.$route.params.id )
                        if (idx >= 0) {
                            let itemOrder = res.data.orders[idx];
                            const {fullName,  numberId, currentAdministratorName, age , Gender} = itemOrder.Attention.HistoryPerson;
                            this.info ={
                                fullName, 
                                numberId, 
                                age,
                                GenderName : Gender.name,
                                assignedAdministrator: currentAdministratorName, 
                                PersonId :itemOrder.Attention.PersonId, 
                                orderNumber : itemOrder.orderNumber,
                                TypeOrder : itemOrder.TypeOrder,
                                orderId : itemOrder.id,
                                typeOrder: itemOrder.TypeOrder.name,
                                OrderTypeId : itemOrder.TypeOrderId,
                                CenterId : itemOrder.CenterId,
                                TypeServiceId : itemOrder.Attention.TypeServiceId,
                                typeService : itemOrder.Attention.TypeService.name,
                                Orders : itemOrder.OrderCupsLists && itemOrder.OrderCupsLists.length > 0  ? itemOrder.OrderCupsLists : [],
                                // DispatchDetails : [], 
                                
                            }

                        }
                        // this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
                        this.info.AttentionId = this.$route.params.AttentionId;
                        // delete this.info.id;
                        // this.info.id = res.data.id;
                        
                    
                    }else{
                        
                        
                    }
                } catch (error) {
                    console.warn("Error get info  order ", error)
                }finally{
                    this.loading = false;
                }
            },
            
           
        }, // methods

    };
</script>