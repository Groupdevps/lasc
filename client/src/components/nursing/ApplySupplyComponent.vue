<template>
     <v-row dense class ="mt-2">
        <template v-for = "(field, idxField) of supplyFields">
            <v-col
                :cols ="field.col"

            >
                <v-textarea
                    outlined
                    v-if           = "field.type == 'textarea'"
                    :label="field.text"
                    no-resize
                    rows="1"
                    class = "text-uppercase"
                    v-model ="infoInput[field.key]"
                    @input          = "(v) => {infoInput[field.key] = v.toUpperCase()}"
                ></v-textarea>
                <v-select
                    dense
                    outlined
                    v-if = "['select'].includes(field.type)"
                    v-model = "infoInput[field.key]"
                    :label  = "field.text"
                    :item-text ="field.itemText"
                    :item-value = "field.itemValue"
                    :items = "renderListed(field)"
                    @change = "actions(field, $event)"
                    class = "text-uppercase"
                ></v-select>
                    <!-- @input          = "(v) => {infoInput[field.key] = v.toUpperCase()}" -->
                <DateAuto
                    :key               = "ref + field.key"
                    v-else-if          = "field.type == 'DateAuto'"
                    :inputField        = "infoInput"
                    :keyField          = "field.key"
                    :isDisabled        = "true"
                ></DateAuto>
                    <!-- @receiveInfo       = "actions(field, $event)" -->
                    <!-- :infoToComponent   = "field"
                    :infoToDate        = "infoInput[field.key]" -->
                <dates
                    :key                 = "ref + field.key"
                    v-else-if          = "['time_picker','date_range'].includes(field.type)"
                    :info_to_component = "field"
                    :info_to_dates     = "infoInput[field.key]"
                    @receive_info      = "actions(field, $event)"
                ></dates>
            </v-col>
        </template>    
        <v-col>
            <v-btn                     
                color = "primary"       
                class = "mb-5"             
                @click = "infoInput.id ? update(): save()"
                :loading = "isLoadingSupply"
                v-show = "listToComponent && listToComponent.length > 0"
            >{{$t('save')}}</v-btn>
        </v-col>
        <v-col cols = "12">
            <!-- hide-default-footer -->
            <v-data-table
                dense
                fixed-header
                :headers="notesHeaders"
                :items="renderListNote"
                item-key="id"
                class="elevation-1"
                :height ="heightTable"
                :loading="isLoadingNote"
                :footer-props        = "{
                    showFirstLastPage   : true,
                    itemsPerPageOptions : [100],
                    showCurrentPage     : true
                }"
            >
                <template v-slot:top>
                    <v-divider 
                        class = "pa-0 ma-0 primary"
                        :inset = "true"
                    ></v-divider>
                    <span class = "pt-1 subtitle">NOTAS DE SUMINISTRO</span>   
                </template>               
            </v-data-table>
        </v-col>
    </v-row>
</template>
<script type="text/javascript">
    import SuppliesDetailsService from "@/services/ApplySuppliesDetailsService";
    import userService  from "@/services/user.service.js"

    import DateAuto         from "@/components/info/DateAutoPlaceholderComponent.vue"
    import dates            from "@/helpers/dates.vue"
    export default{
        name : "ApplySupplyComponent",
        props : ["listToComponent", "clearListSupplies", "currentPermission"],
        components:{ 
            DateAuto,
            dates,
        },
        data : ()=> ({
            ref : "ApplySuppliesTabble",            
            notesHeaders:[
                {text: "FECHA", value : "date"},
                { text : "HORA", value : "hour" },
                { text : "QUIEN SUMINISTRO", value : "whoSuppliedIt" },
                { text : "QUIEN APLICO", value : "whoAppliesIt" },
                { text : "SUMINISTRO", value : "SubSuppliesString" },
                { text : "OBSERVACION", value : "observation" },
                
            ],
            listUsersPharmacy : [],
            listUsers : [],
            listNotes : [],
            isLoadingSupply : false,
            isLoadingNote : false,
            heightTable : 250+'px',
            infoInput : {},
            btnSupply : {                
                action : "save",
                text : "Guardar",
            },
            supplyFields :[
            {
                    key : "date",
                    type : "DateAuto",
                    text : "Fecha",
                    isAuto : true,
                    isClearable :  true,
                    col : 3,
                    action : "setDate",
                },
                {
                    key : "hour",
                    type : "time_picker",
                    text : "Hora",
                    isAuto : true,
                    isClearable :  true,
                    isDisabled : true,
                    isSeconds : false,
                    col : 3,
                    action : "setDate",
                },
                {
                    key : "whoSuppliedIt", // suministra
                    type : "select",
                    text : "Quien Suministra",
                    itemValue : "name", //User.
                    itemText : "name", //User.
                    list : "renderListUsers",//renderListPharmacy
                    col : 3
                },  
                {
                    key : "whoAppliesIt", // aplica
                    type : "select",
                    text : "Quien Aplica",
                    itemValue : "name",
                    itemText : "name",
                    list : "renderListUsers",
                    col : 3
                },  
                {
                    key : "observation",
                    type : "textarea",
                    text : "Observacion",    
                    col  : 12                
                }
            ],
        }),
        created(){
            this.loadUsers();
            this.get();
        },
        mounted(){
            this.clearInput();
        },
        computed:{
            renderListNote : function(){
                return this.listNotes;
            },
            renderListPharmacy(){
                return this.listUsersPharmacy;
            }, 
            renderListUsers(){
                return this.listUsers;
            }
        },
        methods:{
            clearInput(){                
                // console.log("CLEAR ", this.$store.getters["auth/user"])
                this.infoInput = {
                    AttentionId : this.$route.params.id,
                    whoAppliesIt : this.$store.getters["auth/user"] ? this.$store.getters["auth/user"].name : "",
                    whoSuppliedIt : "",
                    hour : this.$ManagerSmith.getTimeCurrentHS(),
                    date : this.$ManagerSmith.getDateCurrent(),
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
            actions(actionn, item){
                const {action} = actionn;
                if(action == 'setDate'){
                    if(actionn.key){
                        this.infoInput[actionn.key] = item;
                    }
                }
            },
            confirmDelete(item){
                this.infoInput = {...item}
                this.$EventBus.$emit("notifications",{
                    type : "confirm_delete",
                    ID   : this.ref,
                    action : this.deleteSupplie,
                })
            },
            formatSubSupplies(item){
                if (item && item.SubSupplies && item.SubSupplies.length > 0) {
                    return item.SubSupplies.map(x=> {
                        if(x ){//&& x.Concept
                            let description = ""
                            let measuringUnit = ""
                            let administration = ""
                            let order = ""
                            // pharmacy                            
                            // if (x.Concept.description) {
                            //     description = x.Concept.description;
                            // }
                            if (x.Product && x.Product.name) {
                                description = x.Product.name + ",";
                            }

                            if (x.measuringUnit) {
                                measuringUnit = x.measuringUnit + ",";
                            }
                            if (x.administration) {
                                administration = x.administration + ",";
                            }
                            if (x.orderNumber) {
                                order = x.orderNumber
                            }
                            // if(['laboratory', 'imagesDiagnostics', 'otherServices'].includes(x.typeSupply) && x.Concept.CupsList){
                            //     description = x.Concept.CupsList.description;

                            // }else if(x.Concept.MedicationList){ // medicamentsAtc
                            //     description = x.Concept.MedicationList.description;
                            // }
                            
                            return `${description} Cantidad : ${x.cant}  ${measuringUnit} VIA : ${administration} Orden : ${order} `
                        } 
                    })
                }
                return ""
            },  
            async get(){   
                this.isLoadingSupply = true;
                const service = new SuppliesDetailsService();
                const res = await service.getDetails({attention : this.$route.params.id}); // item
                if(res && res.error){
                    this.$EventBus.$emit("notifications", {
                        type : "warning",
                        msg : "Listando detalles de suministro  "
                    })
                }else if(res && res.data){
                    this.listNotes = res.data.map(x => {
                        return {
                            ...x,
                            SubSuppliesString : this.formatSubSupplies(x), 
                        }
                    });
                    //this.infoInput.id = res.data.id;
                    //this.btnSupply.action = "update";
                    //this.btnSupply.text = "Actualizar";
                }
                this.isLoadingSupply = false;

            },
            async save(){     
                try{

                    this.isLoadingSupply = true;
                    if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {                  
                        if (!this.infoInput.whoSuppliedIt || !this.infoInput.whoAppliesIt) {
                            this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Quien Suministra y Quien aplica"});
                        }else{
                            this.infoInput.UserId = this.$store.getters["auth/userId"];                
                            this.infoInput.SubSupplies = [...this.listToComponent];                            
                            let item = this.infoInput;                        
                            const service = new SuppliesDetailsService();
                            const res = await service.saveDetail(item);
                            if(res && res.error){
                                this.$EventBus.$emit("notifications", {
                                    type : "warning",
                                    msg :  res.error.response.data.message || res.error.response.data ||  "Guardando Nota de suministro"
                                })
                            }else{
                                if(res && res.data){
                                    //this.infoInput.id = res.data.id;
                                    //this.btnSupply.action = "update";
                                    //this.btnSupply.text = "Actualizar";
                                    this.list = [];
                                    //this.listNotes.push({...res.data,  SubSuppliesString : this.formatSubSupplies(res.data) });
                                    this.get();
                                    // this.clearInputSupply();
                                    this.clearInput();
                                    this.clearListSupplies();
                                   
                                    this.$EventBus.$emit("notifications", {
                                        type : "success",
                                        msg : "Nota de Suministro agregado"
                                    })
                                }
                            }
                            
                        }
                    }

                }catch(error){
                    console.warn("Error add Apply Supply note", error)
                    this.$EventBus.$emit("notifications", { type : "warning" , msg : error.response.data.error || error.response.data  || "Error Guardando nota de Suministro "});
                }finally{
                    this.isLoadingSupply = false;                    
                }
            },
            
            async update(){
                try{
                    if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {                  
                        if (!this.infoInput.whoSuppliedIt || !this.infoInput.whoAppliesIt) {
                            this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Quien Suministra y Quien aplica"});
                        }else{      
                            let item =  this.infoInput;         
                            this.isLoadingSupply = true;
                            const service = new SuppliesDetailsService();
                            const res = await service.updateDetail(item);
                            if(res && res.error){
                                this.$EventBus.$emit("notifications", {
                                    type : "warning",
                                    msg : res.error.response.data.message || res.error.response.data || "Actualizando suministro  "
                                })

                            }else{
                                this.$EventBus.$emit("notifications", {
                                    type : "success",
                                    msg : "Actualizado Nota de Suministro"
                                })
                                this.get();

                            }
                        }
                    }
                }catch(error){
                    console.warn("Error Edit Apply Supply note", error)
                    this.$EventBus.$emit("notifications", { type : "warning" , msg : error.response.data.error || error.response.data  || "Error Editando nota de Suministro "});
                }finally{
                    this.isLoadingSupply = false;
                }
            },

            async deleteSupplie(){
                try{
                    if (this.$Helper.isPermission(this.currentPermission, "canDelete")) {                  
                        this.loading = true;
                        let item = this.infoInput;
                        const service = new SuppliesDetailsService();
                        const res = await service.deleteDetail(item);
                        if(res && res.error){
                            this.$EventBus.$emit("notifications", {
                                type : "warning",
                                msg : res.error.response.data.message || res.error.response.data || "Error eliminando suministro  "
                            })
                        }else{
                            this.$EventBus.$emit("notifications", {
                                type : "success",
                                msg : "Nota de Suministro eliminado"
                            })
                        }
                    }
                }catch(error){
                    console.warn("Error Delete Apply Supply note", error)
                    this.$EventBus.$emit("notifications", { type : "warning" , msg : error.response.data.error || error.response.data  || "Error Eliminando nota de Suministro "});
                }finally{
                    this.loading = false;
                }
            },
            async loadUsers(){
                try {
                    // const pharmacys = await userService.getUsersByRole({RoleId : 5}); // farmacia
                    // if(pharmacys && pharmacys.data && pharmacys.data.length > 0){
                    //     this.listUsersPharmacy = pharmacys.data;
                    // }
                    const response = await userService.getUsers()//getUsersByRole({RoleId : 4}); // enfermeria
                    if(response && response.data && response.data.length > 0){
                        this.listUsers = response.data;
                    }

                } catch (error) {
                    console.log("Error load users ", error)
                }
            },
        }, // methods
    };
</script>