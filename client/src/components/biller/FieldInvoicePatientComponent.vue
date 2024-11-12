<template>
    <v-row
        dense
    >
        <template v-for = "(item, idxItem) in fields">
            <v-col :cols = "item.cols">
                <span
                    v-if  = "item.type == 'title'"
                    class = "text-uppercase font-weight-medium"
                >
                    <span v-if="item.text">
                        {{  $t(item.text)  }}
                    </span>
                    <v-divider
                        class = "pa-0 ma-0"
                        :inset = "true"
                        color = "primary"
                    ></v-divider>
                </span>
                <v-text-field
                    dense
                    outlined
                    hide-details
                    v-else-if = "['text'].includes(item.type)"
                    v-model   = "infoToComponent[item.key]"
                    :label    = "item.text"
                    :disabled = "item.isDisabled"
                    class = "text-uppercase"
                ></v-text-field>
                <v-text-field
                    dense
                    outlined
                    hide-details
                    v-else-if = "['number'].includes(item.type)"
                    type = "number"
                    v-model.number   = "infoToComponent[item.key]"
                    :label    = "item.text"
                    :disabled = "item.isDisabled"
                    class = "text-uppercase"
                    
                ></v-text-field>              
                <MenuTypeDocumentComponent
                    v-else-if = "item.key == 'patientTypeId'"
                    :inputField="infoToComponent" 
                    :keyField="item.key"          
                    valueField="description"
                ></MenuTypeDocumentComponent>
                <MenuAgreementComponent
                    v-else-if = "item.key == 'Agreement'"
                    :inputField="infoToComponent" 
                    :keyField="item.key"          
                    valueField="description"
                    :isReturnObject="true"
                    :searchByNit="infoToComponent.payerNit"
                    autoSetInField="numberAgreement"
                    :isAutoSetloaded="true"
                    fieldAutoSetLoaded="numberAgreement"
                ></MenuAgreementComponent>
                <v-autocomplete
                    dense
                    outlined
                    clearable
                    auto-select-first
                    v-else-if="item.type == 'autocomplete'"
                    v-model="infoToComponent[item.key]"
                    :items="renderListed(item)"
                    :label ="item.text"
                    :item-text="item.itemText"
                    :item-value="item.itemValue"
                    @change = "actions(item, $event)"
                    :return-object = "item.returnObject"
                    :disabled = "item.isDisabled"
                    class = "text-uppercase"
                    
                ></v-autocomplete>
                <DateAuto
                    :key 			    = "'invoiceFields'+item.key"
                    v-else-if		    = "item.type == 'DateAuto'"
                    :keyField           = "item.key"
                    :inputField         = "infoToComponent"
                    @receiveInfo	    = "actions(item, $event)"
                    :infoToComponent    = "{ text : item.text}"
                ></DateAuto>
                <dates
                    :key                = "item.key + 'fieldInvoice'"
                    v-else-if           = "item.type == 'time_picker'"
                    :info_to_component  = "item"
                    :info_to_dates      = "infoToComponent[item.key]"
                    @receive_info       = "infoToComponent[item.key] = $event"
                ></dates>
                    <!-- :infoToComponent   = "item"
                    :infoToDate 	   = "infoToComponent[item.key]" -->
            </v-col>
        </template>

        <!-- <v-col cols ="2">
            <v-btn color ="success" @click ="save" :loading = "loading"> Guardar </v-btn>
        </v-col> -->
    </v-row>
</template>
<script>
    import fields_params from "@/components/biller/js/invoice_params.js"
    import DateAuto from "@/components/info/DateAutoPlaceholderComponent.vue" 
    import MenuTypeDocumentComponent from "@/components/info/MenuTypeDocumentComponent.vue"
    import InvoiceService from "@/services/InvoiceService.js"
    import MenuAgreementComponent from "@/components/management/MenuAgreementComponent.vue"
    import dates from "@/helpers/dates.vue"

    export default{
        name : "FieldInvoicePatientComponent",
        props : ["infoToComponent"],
        components : {DateAuto, MenuTypeDocumentComponent, MenuAgreementComponent, dates},
        data : ()=>({
            // infoToComponent : {  },
            loading : false,
            fields : fields_params,
        }),
        watch:{
            // infoToComponent: function(val){                
            //     if(val){
            //         this.infoToComponent = {...val};
            //     }
            // }, 
            "infoToComponent.Agreement"(val){
                if (val) {
                    this.infoToComponent.numberAgreement=val.numberAgreement;
                }
            }
        }, // watch
        created(){

        }, // created
        methods:{
            actions(actionn, item){                
                if(actionn){
                    const {action} =actionn;
                    if(action == "setEps"){
                        const {name, nit,}  = item;
                        this.infoToComponent.payerName = name;
                        this.infoToComponent.payerNit = nit;
                    }
                }
            },
            renderListed(item){
                if(item){
                    if(item.global_list){
                        return this.$ManagerSmith.render_listed(item);
                    }else if(typeof item.list == 'string'){
                        return this[item.list]
                    }
                }
                return []
            },
            async save(){
                this.loading = true;
                try {
                    if(this.infoToComponent){
                        if(!this.infoToComponent.UserId){
                            this.infoToComponent.UserId = this.$store.getters["auth/userId"];
                        }                        
                        const service = new InvoiceService();
                        const res = await service.updateInvoice(this.infoToComponent)
                        
                        if(res && res.data){
                            this.$emit("receiveFieldsPatient", this.infoToComponent);
                            this.$EvenBus.$emit("notifications",{
                                type : "success",
                                msg : "Factura Actualizada"
                            })
                        }
                    }
                    
                } catch (error) {
                    console.error("Error updating invoice ", error );
                    this.$EvenBus.$emit("notifications",{
                        type : "error",
                        msg : "Actualizando Factura"
                    })
                }
                this.loading = false;

            }
        }


    }
</script>