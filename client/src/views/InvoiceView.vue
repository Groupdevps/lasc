<template>
    
        <v-card outlined>
            <v-card-title class = "justify-space-between subtitle-1 pa-0 blue darken-2 white--text font-weight-black text-uppercase ">
                <v-btn                  
                small
                color  = "warning"
                @click  = "$router.go(-1)"
                tile
            >
                <v-icon small class="mr-1">mdi-arrow-left</v-icon>
                {{ $t('go_back') }}
            </v-btn>
                <span>FORMULARIO  DE FACTURACION</span>
                <span></span>
            </v-card-title>
            <v-card-text class = "pt-2" :max-height="currentHeight">

                <v-row dense  :style = "`overflow-y : auto; overflow-x : hidden; max-height:  ${$vuetify.breakpoint.height - 130}px;`">
                    <v-col cols = "12">
                        <!-- info patiente -->
                        <FieldInvoicePatient :infoToComponent = "infoPatient" @receiveFieldsPatient="renderInfoPatient($event)"></FieldInvoicePatient>
                    </v-col>
                    <v-col cols = "12">
                        <!-- expand panel with components-->
                        <v-expansion-panels
							multiple
							v-model="panel"
						>
							<v-expansion-panel 
								dark																
								v-for = "(item, idxItem) of panels"
								:key  = "idxItem + item.key"
								class = "mb-1" 

							>
								<v-expansion-panel-header
									dark
									dense
									ripple
								 	color 	= "blue-grey darken-2"
									class 	= "body-1 pa-1 font-weight-bold text-uppercase white--text  small-pannel"
									
								>
									{{$t(item.text)}}
								</v-expansion-panel-header>
								<v-expansion-panel-content class ="pa-1 pt-3" dark>
                                    <component 
                                        :parametersToComponent="item"
                                        :infoToComponent ="infoPatient"
                                        :is= "item.component"            
                                        :currentPermission="currentPermission"                            
                                    ></component>
                                </v-expansion-panel-content>
									
							</v-expansion-panel>
						</v-expansion-panels>
                    </v-col>
                    
                    
                    
                </v-row>
            </v-card-text>
        </v-card>    
</template>
<style scoped>
    .small-pannel{
        min-height: 20px;
    }
</style>
<script>
    import FieldInvoicePatient from "@/components/biller/FieldInvoicePatientComponent.vue"
    import InvoiceDetails from "@/components/biller/BillInvoiceDetailsComponent.vue"
    import InvoiceSupports from "@/components/biller/InvoiceSupportsComponent.vue"
    import InstitutionalReports from "@/components/biller/InstitutionalReportsInvoiceComponent.vue"

    import AttentionService from "@/services/AttentionService.js";
    import InvoiceService from "@/services/InvoiceService.js"
    import CauService from "@/services/CauService.js"

    export default {
        name : "InvoiceView",
        components:{
            FieldInvoicePatient,
            InvoiceDetails,
            InvoiceSupports,
            InstitutionalReports
        },
        data : ()=>({			
            infoPatient : {Details : []},
            panel : [],
            panels : [
                {
                    key : "invoice",
                    text : "invoice",
                    component : "InvoiceDetails",
                },
                {
                    key : "supports",
                    text : "supports",
                    component : "InvoiceSupports",
                },
                {
                    key : "institutionalReports",
                    text : "institutionalReports",
                    component : "InstitutionalReports",
                },

            ]
        }), //data
        created(){
            if(this.$route && this.$route.params){                
                const AttentionId = this.$route.params.id;
                const numberId    = this.$route.params.numberId;
                this.getInfo({AttentionId, numberId});
            }
        }, // created
        computed:{
            currentHeight: function () {
                return (this.$vuetify.breakpoint.height - 295) + 'px';
            },
            currentPermission(){
                return this.$store.getters["auth/getPermission"]("Invoice");
            }
        },
        methods : {
            async getInfo(params){
                // Attention
                try {
                    if(params){
                        const attentionService = new AttentionService();
                        const invoiceService = new InvoiceService();
                        const resInvoice = await invoiceService.getInvoice({ AttentionId : params.AttentionId})                        
                        
                        let invoice = {};                            
                        if(resInvoice && resInvoice.data){
                            invoice = {...resInvoice.data};
                            invoice.administrator = invoice.payerName;
                            invoice.Agreement={ numberAgreement : invoice.numberAgreement };
                        }else{                            
                            const res = await attentionService.getAttentionById(params.AttentionId);
                            if(res){				
                                if(res.data){

                                    const attention = res.data;
                                    const { CAU , HistoryPerson} = attention;                        
                                    // this.infoPatient = {...HistoryPerson, ...this.infoPatient};           
                                    invoice.patientFullName = invoice.patientFullName || this.$Helper.formatFullName({...attention}); 
                                    invoice.entryDate = invoice.entryDate || attention.assignedDate;
                                    invoice.hour       = attention.hour;
                                    invoice.serviceType  = invoice.serviceType || attention.TypeService?.name || "";
                                    if(HistoryPerson){
                                        const {numberId, phone, age, birthDate, cellphone, address, city, currentAdministratorName, currentAdministratorNit, TypeID, administrator} = HistoryPerson;
                                        invoice.patientTypeId  = invoice.patientTypeId || TypeID?.name || TypeID?.description || ''; 
                                        invoice.patientNumberId = invoice.patientNumberId || numberId;
                                        invoice.patientAddress = invoice.patientAddress || address;
                                        invoice.patientCity = invoice.patientCity || city;
                                        invoice.patientPhone = invoice.patientPhone || phone || cellphone;
                                        invoice.patientBirthDay= birthDate;
                                        invoice.patientAge = age || this.$ManagerSmith.getAge(birthDate);
                                        invoice.administrator = invoice.payerName || currentAdministratorName;
                                        invoice.payerName = currentAdministratorName;
                                        invoice.payerNit = currentAdministratorNit;
                                        invoice.payerAddress = administrator?.Address?.address || "";
                                        invoice.payerPhone=administrator?.phone || "";
                                        invoice.payerCity=administrator?.Address?.city || ""
                                        invoice.filingDate=null
                                        invoice.filingHour=null
                                        invoice.filing=null
                                        invoice.DigitalSignatureId=null
                                        invoice.numberAgreement=""
                                        invoice.CenterId=this.$store.getters['infoCenter/getCenterId'];
                                    }
                                    if (CAU) {
                                        invoice.CAU        = CAU?.CAU;
                                        if (!invoice.CAU) {
                                            const serviceCau = new CauService();
                                            const resCau = await serviceCau.searchCau({AttentionId : params.AttentionId});
                                            if (resCau && resCau.data) {
                                                invoice.CAU = resCau.data.CAU;
                                            
                                            }
                                        }                                
                                    }
                                }
                            }   
                        }			
                        invoice.billExpeditionDate = invoice.billExpeditionDate || this.$ManagerSmith.getDateCurrent();                            
                        invoice.AttentionId = parseInt(params.AttentionId);
                        this.infoPatient =  {...this.infoPatient , ...invoice};                        
                    }
                } catch (error) {
                    console.error("Error get invoice ", error);
                }
            },
            renderInfoPatient(item){
                if(item){
                    this.infoPatient = {...item};
                }
            }
        }, // methods

    }
</script>