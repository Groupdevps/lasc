<template>
    <div>
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
           :height             = "350+'px'"
           :loading  			= "loading"
           :show-select  		= "false"
           :single-select 		= "false"
           v-model 			= "selections"
           :item-key 			= "'id'"        
           
           >
           <template v-slot:top>
                <v-container fluid>

                    <v-row dense>
                        <template v-for = "field of fields">
                            <v-col :cols="field.col">
                                <v-text-field
                                    dense
                                    outlined
                                    
                                    :label 				= "$t(field.text)"
                                    v-model 			= "infoInput[field.key]"
                                    :type 				= "field.type"
                                    v-if 				= "['text'].includes(field.type)"
                                    :prepend-inner-icon = "field.icon"
                                    :disabled 			= "field.isDisabled"
                                    @input 		 		= "(v) => infoInput[field.key] = v.toUpperCase()"
                                    :rules 				= "field.rules ? field.rules : []"
                                    :required  			= "field.isRequired"
                                    :autofocus 			= "field.autofocus"
                                    class = "text-uppercase"

                                ></v-text-field>
                                <v-text-field
                                    
                                    dense
                                    outlined
                                    
                                    :label 				= "$t(field.text)"
                                    v-model.number 		= "infoInput[field.key]"
                                    :type 				= "field.type"
                                    v-else-if			= "['number'].includes(field.type)"
                                    :prepend-inner-icon = "field.icon"											
                                    :required  			= "field.isRequired"
                                    :rules 				= "field.rules ? field.rules : []"										
                                    :disabled ="field.isDisabled"
                                    :prefix             = "field.prefix"
                                    class = "text-uppercase"
                                    
                                ></v-text-field>	                                
                                <MenuTypeDetail 
                                    v-else-if="field.type=='component' && field.key=='DetailType'" 
                                    :inputField="infoInput" 
                                    keyField="DetailType" 
                                    :isReturnObject="true"
                                ></MenuTypeDetail>
                                <template v-else-if="field.type=='component' && field.key=='Concept&Product'">
                                    
                                    <MenuProductInventory                                         
                                        v-show="['MEDICAMENTOS','INSUMOS'].includes(infoInput?.DetailType?.name)"
                                        :inputField="infoConcepts" 
                                        keyField="Product" 
                                        :isReturnObject="true"
                                    ></MenuProductInventory>  
                                    <MenuConcept                                        
                                        v-show="!['MEDICAMENTOS','INSUMOS'].includes(infoInput?.DetailType?.name)"
                                        :inputField="infoConcepts" 
                                        keyField="Concept" 
                                        :isReturnObject="true"
                                    ></MenuConcept>
                                </template>
                            </v-col>
                        </template>
                        <v-col cols ="1">
                            <v-btn 
                                color = "primary" 
                                @click ="isEditing?editDetail():saveDetail()" 
                                :loading="loading" 
                                v-show = "currentPermission.canAdd || currentPermission.canEdit"
                            > 
                                {{ isEditing?$t('update'):$t('add2')}} 
                            </v-btn>
                        </v-col>
                    </v-row>

                </v-container>
            </template> 
            
            <template v-slot:body ="{items, headers}">
            <tbody>
                <tr v-for="(item,index) in items" :key="item.id">
                    <!-- <td>{{ "" }}</td> -->
                    <!-- <td :rowspan="renderList.length" v-if ="index == 0" class = "text-center"> {{ infoInvoice.CAU }}</td>             -->
                    <td>{{typeof item.DetailType  == 'object'?item.DetailType?.name : item.DetailType  }}</td>
                    <td>{{renderConcept(item)}}</td>
                    <td>{{item.cant}}</td>
                    <td>{{item.unityValue ? $Helper.formatNumberToCop(item.unityValue): 0}}</td>
                    <td>{{item.totalValue ? $Helper.formatNumberToCop(item.totalValue): 0}}</td>
                    <td> 
                        <v-btn-toggle mandatory small>                            
                            <v-btn small color = "primary" :loading="loading" @click = "setEditDetail(item)" v-show="currentPermission.canEdit"> <v-icon small>mdi-pencil</v-icon> </v-btn>
                            <v-btn small color = "error" :loading="loading"  @click="confirmDeleteDetail(item)" v-show="currentPermission.canDelete"> <v-icon small>mdi-delete</v-icon> </v-btn>
                        </v-btn-toggle>
                    </td>
                    
                    
                </tr>
                <template  v-if = "renderList.length > 0">                             
                <tr>
                    <td :colspan="3" class="td-top-white"></td> 
                    <td class="td-top-white"><strong> SUBTOTAL :</strong> </td>
                    <td class="td-top-white">{{renderSubTotal ? $Helper.formatNumberToCop(renderSubTotal): 0}}</td>
                </tr> 
                <tr>                              
                    <td :colspan="3"></td> 
                    <td><strong> PORCENTAJE :</strong> </td>
                    <td>{{renderFee}}</td>
                </tr> 
                <tr>                              
                    <td :colspan="3"></td> 
                    <td> <strong>Total :</strong> </td>
                    <td>{{renderTotal ? $Helper.formatNumberToCop(renderTotal) : 0}}</td>
                </tr>  
                <tr>                                                                           
                    <td :colspan="4" ><strong>LETRAS :</strong> {{ $Helper.numberToLetters(renderTotal).toUpperCase() }}</td>
                </tr>  
                </template>
                    
                    <!-- <tr>
                        <td :rowspan="1" class ="pt-3"> 
                            
                        </td>
                    </tr> -->
                </tbody>            
            </template>
        
        </v-data-table>
        <div class="d-flex justify-center">
            

            <v-btn-toggle >
                <v-btn        
                    small   
                    color = "error"
                    @click = "infoToComponent.id ? updateInvoice(): saveInvoice()"
                    :loading = "loading"
                    
                    >
                    <v-icon   class = "mr-1">mdi-receipt</v-icon>
                    {{ infoToComponent.id ? 'Actualizar Factura': 'Facturar'}}
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn     
                    small   
                    color = "error"
                    @click = "downloadPDF()"
                    :loading = "loading"
                    v-show="infoToComponent.id"
                    :disabled = "isEnableDownload"
                >
                    <v-icon   class = "mr-1">mdi-download</v-icon>
                    {{ $t("pdf") }}
                </v-btn>
                <v-btn     
                    small   
                    color = "error"
                    @click = "downloadXML()"
                    :loading = "loading"
                    v-show="infoToComponent.id"
                    :disabled = "isEnableDownload"
                >
                    <v-icon   class = "mr-1">mdi-download</v-icon>
                    {{ $t("xml") }}
                </v-btn>
                
            </v-btn-toggle>
        </div>
    </div>
</template>
<style type="text/css" scoped>
    .td-top-white{
        border-top: 2px solid white; 
    }
</style>
<script>
import InvoiceDetailsService from "@/services/InvoiceDetailsService.js"
import InvoiceService from "@/services/InvoiceService.js"
import MenuTypeDetail from "@/components/biller/MenuTypeDetailComponent.vue"
import MenuProductInventory from "@/components/info/MenuProductInventoryComponent.vue"
import MenuConcept from "@/components/biller/MenuConceptComponent.vue"

export default{
    name: "BillInvoiceDetailsComponent",
    props: ["infoToComponent", "currentPermission"],
    components:{ MenuTypeDetail, MenuConcept, MenuProductInventory},
    data : ()=>({
        ref : "BillInvoiceDetails",
        loading : false,
        list : [],
        selections : [],
        infoInput : {},
        infoInvoice: { CAU : ""},
        infoConcepts : {
            Product : null,
            Concept : null,
        },
        isEnableDownload : true,        
        headers : [
            // { text : "Orden de Authorizacion", value : "CAU", align: 'center',},

            { text : "TIPO DE CONCEPTO", value : "DetailType"},
            { text : "CONCEPTO", value : "Concept"},
            { text : "CANTIDAD", value : "cant"},
            { text : "VALOR UNITARIO", value : "unityValue"},
            { text : "VALOR", value : "totalValue"},
            { text : "ACCIONES", value : "actions"}
        ],
        infoItem : null,
        isEditing : false,
        bus  : {},
        fields :[
            // {
            //     key : "typeConcept",
            //     type : "select",
            //     text : "type_concept",
            //     itemValue : "key",
            //     itemText : "text",
            //     list : "listTypeSupplie",
            //     action : "changeListCategory",
            //     col : 2
            // },
            {
                key : "DetailType", // TypeConcept
                type : "component",
                col : 2,
            },
            {
                key: "Concept&Product",
                type : "component",//combobox
                text : "Concepto",
                itemValue : "cups",
                itemText : "description",
                list : "listSupply",
                col : 3,
                returnObject : true,
            },
            // {
            //     key : "description", // TypeConcept
            //     type : "text",
            //     text : "description",
            //     col : 3,                
            // },
            // {
            //     key: "Product",
            //     type : "component",//combobox
            //     text : "product",
            //     itemValue : "cups",
            //     itemText : "description",
            //     list : "listSupply",
            //     col : 3,
            //     returnObject : true,
                
            // },
            // {
            //     key: "Tarriff",
            //     type : "combobox",
            //     text : "Tarifario",
            //     itemValue : "cups",
            //     itemText : "description",
            //     list : "listTariffs",
            //     col : 3,
            //     returnObject : true,
                
            // },
            {
                key : "cant",
                type : "number",
                text : "amount",                    
                col : 2
            },            
            {
                key : "unityValue",
                type : "number",
                text : "unitValue",                    
                col : 2,
                prefix : "$",
                isDisabled : true,
            },
            {
                key : "totalValue",
                type : "number",
                text : "total",                    
                prefix : "$",
                col : 1,
                isDisabled : true,

            },
        ],
        listSupply : [],
        listTariffs : [],
        intervalSupply : null,
        intervalTariff : null,
        listTypeSupplie : [
            { text :"Farmacia e insumos Hospitalarios", key : "pharmacy"}, // empty
            { text : "Medicamentos ATC", key : "medicamentsAtc", "name" : "CUPS", "field" : "medication-list"}, // 
            { text : "Laboratorios", key : "laboratory", "name" : "CUPS", "field" : "cups-list"}, // 
            { text : "Imágenes Diagnosticadas", key : "imagesDiagnostics", "name" : "CUPS", "field" : "cups-list"}, // cups
            { text : "Otros Servicios", key : "otherServices", "name" : "CUPS", "field" : "cups-list"}, // 
        ],
    }), // data
    created(){        
        if(this.infoToComponent){
            
            if(this.infoToComponent.AttentionId){
                this.infoInvoice = this.infoToComponent;
                // console.log("INFOT to component ",this.infoToComponent)
                // this.getInfo({id : this.infoToComponent.id});
            }
        }
    }, // created
    mounted(){
        this.clearInput();
    },
    watch:{
        "infoConcepts.Product"(val){                
            if (val) {
                this.infoInput.unityValue=val.unitValue;   
                this.infoInput.description=val?.description ||  val?.name;
                
            }
        },
        "infoConcepts.Concept"(val){                
            if (val) {
                this.infoInput.unityValue=this.infoToComponent?.Agreement?.tariffManualType=='SOAT'?val.value_soat:val.value_iss;
                this.infoInput.description=val.description_cup;
            }
        },
        "infoInput.cant"(val){
            if (val) {
                this.infoInput.totalValue = (this.infoInput?.unityValue || 0) * val; 
            }
        },
        "infoInput.DetailType"(val){
            if (val) {
                this.infoInput.DetailTypeId = val.id;
            }
        },
        infoToComponent: function(val){
            
            if(val){
                // console.log("INFO to component  watch ",this.infoToComponent)

                if(val.AttentionId){
                    this.infoInvoice = val;
                    // this.getInfo({id : val.id})
                }
            }
        },
    }, // watch
    computed:{
        renderList: function(){
            this.isEnableDownload = this.infoToComponent.Details.length > 0 ? false : true;
            return this.infoToComponent.Details;
        },
        renderTotal : function(){
            
            let {percent, tariffManualType }=this.infoToComponent?.Agreement || { percent : 0, tariffManualType: "SOAT"};
            if(!percent)percent=0;
            if (!tariffManualType)tariffManualType='SOAT';        
            const valFee = (this.renderSubTotal * percent) / 100;
            const val = tariffManualType=='SOAT' ? this.renderSubTotal - valFee :    this.renderSubTotal + valFee;
            this.infoToComponent.billSubtotal=val ? parseInt(val) : 0;
            this.infoToComponent.billSubtotalLetters= this.$Helper.numberToLetters(this.infoToComponent.billSubtotal);            
            return  this.infoToComponent.billSubtotal;
        },
        renderFee(){
            return   (this.infoToComponent?.Agreement?.percent || '0')+'%'
        },
        renderSubTotal(){
            const sum = this.renderList.reduce((accumulator, currentValue) => {              
                if (currentValue && currentValue.totalValue &&  typeof currentValue.totalValue === 'number') {
                    return accumulator + currentValue.totalValue;
                } else {
                    return accumulator;
                }
            },0);                
            return sum
        }
    }, // computed
    methods: {        
        renderConcept(item){
            if (item) {
                if (item.description) {
                    return item.description
                }else
                if (item.Concept) {
                    return item.Concept?.description_cup;
                    // if (item.Concept.MedicationList) {
                    //     return item.Concept.MedicationList.description
                    // }else if(item.Concept.CupsList){
                    //     return item.Concept.CupsList.description;
                    // }else if(item.Concept.TariffManual){
                    //     return item.Concept.TariffManual.description;
                    // }
                }else if(item.Product){
                    return item.Product?.name;
                }
            }
            return ""
        },
        
        clearInput(){
            this.infoInput = {
                // Product : null,
                // Concept : null,
                description : "",
                unityValue : 0,
                cant : 0,
                DetailType : "",
                totalValue : 0,
                attentionCode : this.$route.params?.id,
            };
            if (this.infoToComponent && this.infoToComponent.id) {
                this.infoInput.BillId=this.infoToComponent.id;
            }
        },
        setEditDetail(item){
            if(item){
                this.infoItem=item;
                this.isEditing=true;
                this.infoInput={...item};
                if (this.infoToComponent && item.id) {
                    if (!item.Concept) {
                        this.infoInput.Concept={description_cup: item?.description}                    
                    }else if(!item.Product){
                        this.infoInput.Product={name: item?.description}
                    }
                }
               
            }
        },
        confirmDeleteDetail(item){
            if (item) {
                this.infoItem=item;
                this.$EventBus.$emit("notifications",{
                    type : "confirm_delete",
                    ID   : this.ref,
                    action : this.deleteDetail
                })
            }
        },
        
       
        async getInfo(params){
            const service = new InvoiceDetailsService();
            const res = await service.getDetails(params);            
            if(res && res.data){
                if (res.data && res.data.length > 0) {
                    this.list = res.data;
                    
                }
            }
            
        },

        async saveInvoice(){//generateInvoice
            try{
                this.loading = true;
                if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
                    if (this.infoToComponent && this.infoToComponent.Details.length > 0) {
                        // const {AttentionId}= this.infoToComponent;
                        const service = new InvoiceService();
                        this.infoToComponent.UserId = this.$store.getters["auth/userId"];
                        const res = await service.saveInvoice({
                            ...this.infoToComponent,
                        })// generateInvoiceDetail({AttentionId});
                        if (res) {
                            if (res.error) {
                                this.$EventBus.$emit("notifications", { type : "warning", msg : this.$Helper.renderErrorMessage(res.error,"Error generando Factura")})
                            }else
                            if(res.data){
                                this.infoToComponent.id=res.data.id;
                                this.$ManagerSmith.Sound.play("sound1")
                                this.$EventBus.$emit("notifications", {
                                    type : "success",
                                    msg  : "Factura Generada"
                                });
                            }
                        }                        
                    }else{
                        this.$EventBus.$emit("notifications", { type : "warning", msg : "Se requiere Detalles de factura"})
                    }
                }
            }catch(error){
                console.warn("Error save invoice ", error)
                this.$EventBus.$emit("notifications", { type : "warning", msg : this.$Helper.renderErrorMessage(error,"Generando Factura")})
            }finally{
                this.loading=false;
            }
        },
        async updateInvoice(){//generateInvoice
            try{
                
                this.loading = true;
                if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {
                    if (this.infoToComponent && this.infoToComponent.id && this.infoToComponent.Details.length > 0) {
                        const service = new InvoiceService();
                        const res = await service.updateInvoice({
                            ...this.infoToComponent,
                        })// generateInvoiceDetail({AttentionId});
                        if (res) {
                            if (res.error) {
                                this.$EventBus.$emit("notifications", { type : "warning", msg : this.$Helper.renderErrorMessage(res.error,"Error Actualizando Factura")})
                            }else
                            if(res.data){         
                                this.$ManagerSmith.Sound.play("sound1")
                                this.$EventBus.$emit("notifications", {
                                    type : "success",
                                    msg  : "Factura Actualizada"
                                });           
                            }
                        }
                    }else{
                        this.$EventBus.$emit("notifications", { type : "warning", msg : "Se requiere Detalles de factura"})
                    }
                }
            }catch(error){
                console.warn("Error update invoice ", error)
                this.$EventBus.$emit("notifications", { type : "warning", msg : this.$Helper.renderErrorMessage(error,"Actualizando Factura")})

            }finally{
                this.loading=false;
            }
        },
        async downloadPDF(){
            try{
                this.loading = true;
                if(this.infoToComponent){
                    const {id}= this.infoToComponent;//AttentionId
                    const service = new InvoiceService();
                    this.$Helper.openLink(service.linkPdf({id : this.infoToComponent.id}));
                    // const res = await service.dowloadPdf({id});
                    // if(res && res.data){
                        // this.$Helper.downloadFileBlob(res.data, `${AttentionId}-factura`, "pdf");  
                    // }
                    // this.loading = false;
                }
            }catch(error){
                console.warn("Error open pdf ", error )
            }finally{
                this.loading=false;
            }
        },
        async downloadXML(){
            try{
                this.loading = true;
                if(this.infoToComponent){
                    const {id}= this.infoToComponent;//AttentionId
                    const service = new InvoiceService();
                    this.$Helper.openLink(service.linkXml({id : this.infoToComponent.id}));
                    // const res = await service.dowloadPdf({id});
                    // if(res && res.data){
                        // this.$Helper.downloadFileBlob(res.data, `${AttentionId}-factura`, "pdf");  
                    // }
                    // this.loading = false;
                }
            }catch(error){
                console.warn("Error open pdf ", error )
            }finally{
                this.loading=false;
            }
        },
        async saveDetail(){
            try{                
                this.loading = true;
                if (this.$Helper.isPermission(this.currentPermission, 'canAdd')) {
                    const params = this.infoInput;
                    if (!params.DetailType || !params.cant || !params.description) {
                        this.$EventBus.$emit("notifications",{ type: "warning", msg : "Se requiere Tipo de Detalle, Descripcion, cantidad"})
                    }else{                 
                        if(this.infoInput && this.infoToComponent && this.infoToComponent.id){
                            const params=this.infoInput;
                            params.UserId=this.$store.getters["auth/userId"];
                            const service = new InvoiceDetailsService();
                            const res = await service.saveDetailInvoice(params);
                            if(res){
                                if(res.error){
                                    this.$EventBus.$emit("notifications",{ type: "warning", msg : "Error Guardando Detalle de Factura"})
                                }else if(res.data){
                                    params.id = res.data.id
                                    this.infoToComponent.Details.push(params);
                                    this.clearInput();
                                }
                            }
                        }else{
                            this.infoToComponent.Details.push(params);
                            this.clearInput();
                        }
                    }
                }
            }catch(error){
                console.warn("Error save detail ", error)
            }finally{
                this.loading = false;
            }

        },
        async editDetail(){
            try{
                this.loading = true;                

                if (this.$Helper.isPermission(this.currentPermission, 'canEdit')) {
                    const params = this.infoInput;                    
                    if (!params.DetailType || !params.cant || !params.description) {
                        this.$EventBus.$emit("notifications",{ type: "warning", msg : "Se requiere Tipo de Detalle, Descripcion, cantidad"})
                    }else{                        
                        if (params && params.id) {
                            const service = new InvoiceDetailsService();
                            const res = await service.editDetailInvoice(params);
                            if(res){
                                if(res.error){
                                    this.$EventBus.$emit("notifications",{ type: "warning", msg : "Error Editando Detalle de Factura"})
                                }else if (res.data) {}{
                                    const idx = this.infoToComponent.Details.indexOf(this.infoItem);
                                    if (idx >= 0) {
                                        this.infoToComponent.Details.splice(idx,1,params);
                                    }                                    
                                    this.isEditing=false;
                                    this.clearInput();
                                }
                            }
                        }else{
                            const idx = this.infoToComponent.Details.indexOf(this.infoItem);
                            if (idx >= 0) {
                                this.infoToComponent.Details.splice(idx,1,params);
                            }                            
                            this.isEditing=false;
                            this.clearInput();
                        }
                    }
                }

                
            }catch(error){
                console.warn("Error edit detail ", error)
            }finally{
                this.loading=false;
                this.infoItem=null;
            }
        },
        async deleteDetail(){
            try{
                this.loading = true;
                if (this.$Helper.isPermission(this.currentPermission, 'canDelete')) {                    
                    const params = this.infoItem;                    
                    if (params) {
                        if (params.id) {
                            const service = new InvoiceDetailsService();
                            const res = await service.deleteDetail(params);
                            if (res) {
                                if (res.error) {
                                    // msg error
                                }else{
                                    const idx = this.infoToComponent.Details.indexOf(this.infoItem);
                                    if(idx >= 0){
                                        this.infoToComponent.Details.splice(idx,1);
                                    }
                                }
                            }

                        }else{
                            const idx = this.infoToComponent.Details.indexOf(this.infoItem);
                            if(idx >=0){
                                this.infoToComponent.Details.splice(idx,1);
                            }
                        }
                    }
                }
            }catch(error){
                console.warn("Error delete detail ", error)
            }finally{
                this.loading=false;
                this.infoItem=null;
            }
        },
    }, // methods    
}
</script>
