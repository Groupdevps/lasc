<template>
    <div>
        <v-data-table
            dense
            hide-default-footer
            fixed-header
            :headers="headers"
            :items="renderList"
            item-key="id"
            class="elevation-1"
            :height ="heightTable"
            :loading="loading"
        >
        <template v-slot:top>
            <v-row dense>
                <v-col cols="11">
                    <v-row dense>
                        <template v-for = "(field,idxField) of fields ">
                            <v-col
                                :cols ="field.col"
                            >
                                <v-text-field
                                    dense
                                    outlined
                                    v-if = "['text'].includes(field.type)"
                                    v-model = "infoSubInput[field.key]"
                                    :label  = "field.text"
                                    class = "text-uppercase"
                                    @input          = "(v) => {infoSubInput[field.key] = v.toUpperCase()}"
                                ></v-text-field>
                                <component 
                                    v-else-if="field.type=='component'" 
                                    :is="selectedComponent" 
                                    :inputField="infoSubInput"
                                    :AttentionId = "$route.params.id" 
                                    :keyField="field.key"
                                    :isReturnObject="true" 
                                ></component>

                                <v-text-field
                                    dense
                                    outlined
                                    v-else-if = "['number'].includes(field.type)"
                                    :type 		    = "field.type"
                                    v-model.number = "infoSubInput[field.key]"
                                    :label  = "field.text"
                                    class = "text-uppercase"
                                ></v-text-field>
                                    <!-- @input          = "(v) => {infoSubInput[field.key] = v.toUpperCase()}" -->
                                <v-select
                                    dense
                                    outlined
                                    v-if = "['select'].includes(field.type)"
                                    v-model = "infoSubInput[field.key]"
                                    :label  = "field.text"
                                    :item-text ="field.itemText"
                                    :item-value = "field.itemValue"
                                    :items = "renderListed(field)"
                                    class = "text-uppercase"
                                    @change = "actions(field, $event)"
                                    :return-object="field.isReturnObject"
                                ></v-select>
                                <v-combobox
                                    dense
                                    outlined						
                                    color 	= "primary"
                                    v-else-if			= "['combobox'].includes(field.type)"
                                    v-model 			= "infoSubInput[field.key]"
                                    :label 				= "field.text"
                                    :items 				= "renderListed(field)"
                                    :menu-props 		= "{ offsetY: true, maxHeight: '200px' }"
                                    :item-text 			= "field.itemText"
                                    :item-value 		= "field.itemValue"        
                                    :prepend-inner-icon = "field.icon"
                                    append-icon 		= "mdi-chevron-down"
                                    @change     		= "actions(field, $event)"
                                    class = "text-uppercase"
                                    @input          = "(v) => {infoSubInput[field.key] = v.toUpperCase()}"
                                ></v-combobox>    
                            
                            </v-col>
                        </template>
                    </v-row>
                </v-col>
                <v-col cols = "1">                    
                    <v-btn                     
                        color = "primary"                    
                        @click = "actions(btnSubSupply)"
                        :loading = "isLoading"
                        v-show="currentPermission.canAdd || currentPermission.canEdit"
                    >{{$t(btnSubSupply.action)}}</v-btn>
                </v-col>
            </v-row>
        </template>
        <template v-slot:item.actions="{item}">
            <v-btn-toggle mandatory>
                <v-btn x-small color="primary" @click="confirmEdit(item)" v-show="currentPermission.canEdit"> <v-icon x-small>mdi-pencil</v-icon></v-btn>
                <v-btn x-small color="error" @click="confirmDelete(item)"  v-show="currentPermission.canDelete"><v-icon x-small>mdi-delete</v-icon></v-btn>
            </v-btn-toggle>
        </template>
        <template v-slot:item.typeSupply ="{item}">
            <span>
                {{ $t(item.typeSupply) }}
            </span>
            
        </template>
    
    </v-data-table>
    <ApplySupply :listToComponent="list" :clearListSupplies="clearList" :currentPermission="currentPermission"></ApplySupply>
    </div>
</template>
<script>
    import SupplyConceptService from "@/services/SupplyConceptService";

    import ApplySupply from "@/components/nursing/ApplySupplyComponent.vue"
    
    import MenuNonSurgicalProcedures from "@/components/info/MenuNonSurgicalProceduresComponent.vue"
    import MenuDispatchSupply from "@/components/info/MenuDispatchSupplyComponent.vue"
    
    export default{
        name : "suppliesTableComponent",
        props:["AttentionId", "infoPatient", "currentPermission"],
        components:{           
            MenuNonSurgicalProcedures,
            MenuDispatchSupply,
            ApplySupply,
        },
        data : (vm)=>({
            list : [],
            ref : "SuppliesTabble",
            interval : null,
            sub_interval : null,
            bus : {},
            infoItem : null,
            headers : [
               /*  {text : "Fecha", value : "date"},
                {text : "Hora", value : "hour"}, */
                // { text : "Codigo", value : "code"},
                {text : "TIPO DE SUMNISTRO", value : "typeSupply"}, //typeSupply 
                {text : "SUMINISTRO", value : "Product.name"},//supply.description
                {text : "CANTIDAD", value : "cant"},
                {text : "UNIDAD DE MEDIDA", value : "measuringUnit"},
                {text : "ADMINISTRACION", value : "administration"},                
                {text : "ACCIONES", value : "actions"},


               /*  {text : "Aplicado por", value : "User.name"},
                {text : "Suministrado por", value : "UserApplied.id"},
                {text : "Observacion", value : "observation"}, */
            ],
            heightTable : 150+'px',            
            infoSubInput : {},
            loading   : false,
            isLoading : false,
            isDisabledActions: false,
            listTypeSupplie : [
                { text :"SUMINISTRO DISPONIBLES", key : "supplies", name: "SUMINISTRO", component: "MenuDispatchSupply"},
                { text :"PROCEDIMIENTOS", key : "procedures",  name: "PROCEDIMIENTO", component: "MenuNonSurgicalProcedures"},
                // { text :"Farmacia e insumos Hospitalarios", key : "pharmacy"}, // empty
                // { text : "Medicamentos ATC", key : "medicamentsAtc", "name" : "CUPS", "field" : "medication-list"}, // 
                // { text : "Laboratorios", key : "laboratory", "name" : "CUPS", "field" : "cups-list"}, // 
                // { text : "Imágenes Diagnosticadas", key : "imagesDiagnostics", "name" : "CUPS", "field" : "cups-list"}, // cups
                // { text : "Otros Servicios", key : "otherServices", "name" : "CUPS", "field" : "cups-list"}, // 

            ],
            
            listSupply : [],

            btnSubSupply:{                
                action : "add",
            },
            selectedComponent : "MenuDispatchSupply",
            fields : [
               
                {
                    key : "TypeSupply",
                    type : "select",
                    text : "Tipo de suministro",
                    itemValue : "component",
                    itemText : "text",
                    list : "listTypeSupplie",
                    action : "changeListCategory",
                    col : 3,
                    isReturnObject : true,
                },
                /* {
                    key : "category",
                    type : "select",
                    text : "Categoria",
                    itemValue : "id",
                    itemText : "name",
                    list : "listCategories",
                    col : 3
                }, */
                {
                    key: "Supply",
                    subKey : "TypeSupply",
                    type : "component", // combobox
                    text : "Suministro",
                    itemValue : "cups",
                    itemText : "description",
                    list : "listSupply",
                    col : 3
                    
                },
                {
                    key : "cant",
                    type : "number",
                    text : "Cantidad",                    
                    col : 2
                },
                {
                    key : "measuringUnit",
                    type : "text",
                    text : "UNIDAD DE MEDIDA",                    
                    col : 2
                },
                {
                    key : "administration",
                    type : "text",
                    text : "ADMINISTRACION",                    
                    col : 2
                },
                
                
            ],
            
            listCategories : [{
                    "id": 1,
                    "name": "PROCEDIMIENTO", // 
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
               /*  {
                    "id" : 4,
                    "name" : "DIAGNOSTICOS",
                    "field" : "diagnostic-list",
                },
                
                {
                    "id" : 5,
                    "name" : "MANUAL TARIFARIO",
                    "field" : "tariff-manual",
                }, */
                {
                    "id" : 6,
                    "name" : "CUPS",
                    "field" : "cups-list",
                }],
            
        }), // data
        created(){
            // this.clearInput();
            this.clearInputSupply();
            // if(this.AttentionId){
            //     this.infoInput.AttentionId = this.AttentionId;
            //     this.get(this.infoInput);
            // }

        },
        watch:{
            // AttentionId : function(val){
            //     if(val){
            //         this.infoInput.AttentionId = val;
            //     }
            // },
            "infoSubInput.TypeSupply"(val){
                if (val) {
                    if (val.component) {
                        this.selectedComponent = val.component;
                    }
                }

            },
            "infoSubInput.Supply"(val){
                if (val) {                                        
                    if (this.infoSubInput &&  this.infoSubInput.TypeSupply) {                        
                        this.infoSubInput.typeSupply = this.infoSubInput.TypeSupply.name;                        
                        if (this.infoSubInput.TypeSupply.component == "MenuDispatchSupply") {
                            this.infoSubInput.ProductId = val.ProductId;
                            this.infoSubInput.orderNumber = val.orderNumber;
                            this.infoSubInput.input =  "Medicamento A";
                            this.infoSubInput.description = val.name;
                            this.infoSubInput.supply = val.name;
                        }else{
                            this.infoSubInput.CupsListId = val.CupsListId;
                            this.infoSubInput.orderNumber = val.orderNumber;
                            this.infoSubInput.input =  "Procedimiento  B";
                            this.infoSubInput.description = val.description;
                            this.infoSubInput.supply = val.description;
                            this.infoSubInput.cant = 1;
                        }
                    }
                }
            }
        },
        computed:{
            renderList : function(){
                return this.list;
            },
           
        }, // computed
        methods: {
            clearList(){
                this.list = [];
            },
           
            clearInputSupply(){
                this.infoSubInput = {
                    AttentionId : this.$route.params.id,  
                    hour : this.infoSubInput.hour ? this.$ManagerSmith.getTimeCurrentHS() : "",
                    date : this.infoSubInput.date ? this.$ManagerSmith.getDateCurrent() : "",    
                    TypeSupply : this.listTypeSupplie[0],               
                }
            },
            renderListed(item){
                if(item){
                    if(item.list){
                        return this[item.list];
                    }else if(item.global_list){
                        return this.$ManagerSmith.render_listed(item);
                    }
                }
                return []
            },
            confirmEdit(item){
                this.infoSubInput = {...item};
                this.infoItem=item;
                this.btnSubSupply.action = "edit";
            },
            confirmDelete(item){
                this.infoItem =item;
                this.$EventBus.$emit("notifications",{
                    type : "confirm_delete",
                    ID : "ApplySupplyDelete",
                    action : this.deleteItem,
                })

            },
            actions(actionn,item){
                if(actionn){
                    const {action} = actionn;
                    if(action=="changeListCategory"){
                        // this.changeList(item);                        
                    }else if(action =="save"){
                        
                    }else if(action == "update"){
                       
                    }else if(action=="add"){
                        this.infoSubInput.UserId = this.$store.getters["auth/userId"];
                        this.saveSub(this.infoSubInput);
                    }else if(action=="edit"){
                        this.updateSub(this.infoSubInput);
                    }else if(action=="editItem"){
                        // this.infoInput = {...item};
                        // this.btnSupply.action = "edit";
                    }else if(action =="delItem"){
                        
                    }
                }

            }, // actions
           
            
            formatConcept(resData, item){
                if(resData && item){                    
                    return {
                        ...item,
                        Concept : resData,
                        ConceptId : resData.id                    
                    }
                }
            }, // 
           
            // changeList(item){
            //     console.log("CHANGE ", item)
            //     // pharmacy
            //     if(item == ""){ // 1 Procedimientos
            //         this.setListBySelect("treatment-list");
            //     }else if (item == "" ){ // 2  Laboratorio
            //         this.setListBySelect("treatment-list");

            //     }else if(item == "medicamentsAtc"){ //3 Medicamentos
            //         this.setListBySelect("medication-list");
                    
            //     }else if(["laboratory","imagesDiagnostics", "otherServices"].includes(item)){ //6 cups 
            //         this.setListBySelect("cups-list");
            //     }
            // }, // changeList
            // setListBySelect(listField){
            //     this.listSupply = this.$ManagerSmith.render_listed({global_list : listField}); 
            //     this.interval = setInterval(()=>{
            //         if (this.listSupply && this.listSupply.length === 0) {
            //             this.listSupply = this.$ManagerSmith.render_listed({global_list : listField});                                            
            //         }
            //         if (this.listSupply && this.listSupply.length > 0) {
            //             clearInterval(this.interval);
            //             this.interval = null;
            //         }
            //     }, 1000)
            // }, // setListByselect
            
            
            
           
            // async getSub(item){   
            //     this.isLoading = true;
            //     const service = new SuppliesDetailsService();
            //     const res = await service.getSubSuply(item);
            //     if(res && res.error){
            //         this.$EventBus.$emit("notifications", {
            //             type : "warning",
            //             msg : "Listando detalles de suministro  "
            //         })
            //     }
            //     this.isLoading = false;

            // }, 
            async saveSub(item){
                try{
                    if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {                  
                        if (!item.Supply || !item.cant) {
                            this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Suministro disponible y Cantidad"});
                        }else{

                            this.isLoading = true;
                            // console.log(" saveSub ", item )
                            // const service = new SupplyConceptService();
                            // const res = await service.saveSubSuply({
                            //     AttentionId : item.AttentionId,
                            //     hour : item.hour,
                            //     date : item.date,
                            //     typeSupply : item.typeSupply,
                            //     cant : item.cant,
                            //     description : item.description,
                            //     supply : item.description,
                            //     input : item.input,
                            //     ProductId : item.ProductId, 
                            //     CupsListId : item.CupsListId,
                            // });

                            // if(res && res.error){
                            //     this.$EventBus.$emit("notifications", {
                            //         type : "warning",
                            //         msg : res.error.response.data.message || res.error.response.data ||   "Error Guardando suministro"
                            //     })
                            // }else{
                            //     if(res && res.data){ // res && res.data
                                    this.list.push({ 
                                        // id : res.data.id,  
                                        // ConceptId : res.data.id,
                                        date : this.$ManagerSmith.getDateCurrent(),
                                        hour : this.$ManagerSmith.getTimeCurrent(),
                                        UserId : item.UserId,
                                        cant : item.cant,
                                        typeSupply : item.typeSupply,
                                        TypeSupply : item.TypeSupply,
                                        Supply : item.Supply,
                                        ProductId : item.ProductId, 
                                        input : item.input,
                                        Product : { name : item.description, ProductId : item.ProductId, orderNumber : item.orderNumber },  
                                        orderNumber : item.orderNumber,
                                        description : item.description,   
                                        measuringUnit : item.measuringUnit,
                                        administration : item.administration,                    
                                    })
                                    this.clearInputSupply();
                                    this.$EventBus.$emit("notifications", {
                                        type : "success",
                                        msg : "Aplicacion de Suministro agregado"
                                    })
                                // }
                            // }
                        }
                    }
                }catch(error){
                    console.warn("Error create apply ", error)
                    this.$EventBus.$emit("notifications", { type : "warning" , msg :  "Error Aplicando Suministro "});//error.response.data.error || error.response.data  ||
                }finally{
                    this.isLoading = false;
                }

            },
            async updateSub(item){     
                try{
                    if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {                  
                        if (!item.Supply ||  !item.cant) {
                            this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Suministro disponible y Cantidad"});
                        }else{           
                            this.isLoading = true;
                            // const service = new SupplyConceptService();
                            // const res = await service.updateSubSuply({
                            //     id : item.ConceptId || item.id,
                            //     AttentionId : item.AttentionId,
                            //     hour : item.hour,
                            //     date : item.date,
                            //     typeSupply : item.typeSupply,
                            //     cant : item.cant,
                            //     description : item.description,
                            //     supply : item.description,
                            //     input : item.input,
                            //     ProductId : item.ProductId, 
                            //     CupsListId : item.CupsListId,
                            // });
                            // if(res && res.error){
                            //     this.$EventBus.$emit("notifications", {
                            //         type : "warning",
                            //         msg : res.error.response.data.message || res.error.response.data || "Actualizando suministro"
                            //     })
                            // }else{
                            //     if(res && res.data){
                                    item.Product =  { name : item.description, ProductId : item.ProductId, orderNumber : item.orderNumber };
                                    const idx = this.list.indexOf(this.infoItem)//.findIndex(x => x.ConceptId == item.ConceptId);
                                    if (idx >= 0) {
                                        this.list.splice(idx, 1, item);
                                    }
                                    this.clearInputSupply();                                   
                                    this.$EventBus.$emit("notifications", {
                                        type : "success",
                                        msg : "Actualizado Aplicacion de Suministro"
                                    })
                                    this.btnSubSupply.action = "add";
                            //     }
                            // }
                            this.isLoading = false;
                        }
                    }
                }catch(error){
                    console.warn("Error update apply ", error)
                    this.$EventBus.$emit("notifications", { type : "warning" , msg:"Error Actualizando Aplicacion de Suministro"}) //msg : error.response.data.error || error.response.data  || 
                }finally{
                    this.isLoading = false;
                }
            },
            async deleteItem(){
                try{
                    this.loading = true;
                    if (this.$Helper.isPermission(this.currentPermission, "canDelete")) {                                      
                        // const service = new SupplyConceptService();
                        // const res = await service.deleteSubSuply({id : this.infoItem.ConceptId});
                        // if(res && res.error){
                        //     this.$EventBus.$emit("notifications", {
                        //         type : "warning",
                        //         msg : res.error.response.data.message || res.error.response.data || "Error Eliminiando Aplicacion de suministro"
                        //     })
                        // }else{
                        //     if (res && res.data) {
                                const idx = this.list.indexOf(this.infoItem);//findIndex(x => x.ConceptId == this.infoItem.ConceptId);
                                if (idx >= 0) {
                                    this.list.splice(idx, 1);
                                }
                                this.infoItem = null;
                                this.$EventBus.$emit("notifications", {
                                    type : "success",
                                    msg : "Eliminado Aplicacion de Suministro"
                                })
                            // }
                        // }
                    }

                }catch(error){
                    console.warn("Error delete ApplySupply ", error)
                    this.$EventBus.$emit("notifications", { type : "warning" , msg : error.response.data.error || error.response.data  || "Error Eliminiando Aplicacion de Suministro "});
                }finally{
                    this.loading = false;
                }
            },
          

        }, // methods
     
        // beforeDestroy(){
        //     if (this.interval) {
        //         clearInterval(this.interval);
        //         this.interval = null;
        //     }
        //     if (this.sub_interval) {
        //         clearInterval(this.sub_interval);
        //         this.sub_interval = null;
        //     }
        // }, // beforeDestroy
    };
</script>
