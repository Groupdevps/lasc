<template>    
    <v-row dense class="hidden-overflow-x">
        <v-col cols="4">
            <v-card outlined class="mt-3 ml-3 pr-2">                
                <!-- digitalSignature -->
                <UploadFile                
                    @FileConverted          = "renderSetFile($event)" 
                    textComponent           = "Firma Digital" 
                    :isLoading                = "loadingFile"   
                ></UploadFile>            
                <v-img :src="signalDigital" contain :max-height="100" class="mt-3 ml-3 pr-2 mb-1"></v-img>
            </v-card>
        </v-col>
        <v-col cols="8">
            
        
            <FormSessionLayout
                :fields="fields"
                title=""
                subtitle=""
                reference = "SubRoleForm"
                :inputField="info"
            >
                <!-- signalDigitalFile -->
                
                
                <template v-slot:field-RoleId="{itemField}" >            
                    <MenuRoleComponent                
                        :inputField             = "info"
                        keyField               = "RoleId"
                    ></MenuRoleComponent>
                </template>
                <template v-slot:buttons>
                    <v-progress-linear
                        indeterminate
                        color="cyan"
                        :active="loading"
                        absolute
                    ></v-progress-linear>
                    <br>

                    <v-spacer></v-spacer>
                    <v-btn
                        v-show="!loading && (info.id ? currentPermission.canEdit : currentPermission.canAdd)"
                        small
                        color  = "primary"
                        @click  = "info.id ? update() : save()"
                    >
                        {{ info.id ? $t('update') : $t('save') }}
                    </v-btn>            
                    <v-spacer></v-spacer>
                </template>
            </FormSessionLayout>    
        </v-col>
    </v-row>
</template>

<script type="text/javascript">
 // 

import fields_params from "@/components/users/js/userParams.js"
import UserService from "@/services/user.service.js"
import DigitalSignatureService from "@/services/DigitalSignatureService.js"

import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import UploadFile           from "@/components/info/UploadFileComponent.vue"
import MenuRoleComponent    from "@/components/users/MenuRoleComponent.vue"



export default {
    name : "SubUserComponent",
    components : {
        FormSessionLayout, UploadFile, MenuRoleComponent
    }, //components
    props : ["infoToComponent", "listToComponent", "currentPermission"],
    data : (vm) => ({       
        info            : {},       
        fields      : fields_params,        
        diagnoses   : [],       
        reference   : 'SubRole',        
        loading : false,
        signalDigital : "",
        loadingFile : false,
        
    }), // data
    watch:{
        infoToComponent:function(val){
            this.renderInput(val)
        },


    },
    mounted(){
        this.renderInput(this.infoToComponent);
    },
    methods : {
        renderInput(item){
            this.info = {...item};
        },

        async renderSetFile(item){
            try{
                this.loadingFile = true;
                this.info.signalDigital = `${item}`;
                if (this.info && this.info.id) {                    
                    const service = new DigitalSignatureService();
                    const res = await service.saveInfo({
                        UserId: this.info.id,
                        name : this.info.name,
                        base64 : this.info.signalDigital,
                    });
                    if (res && res.error) {
                        this.$EventBus.$emit("notifications",{ type : "warning", msg : this.$Helper.renderErrorMessage(res.error, "Error Cargando Imagen de Firma Digital")});
                    }else if (res && res.data){
                        this.signalDigital =`${item}`;         
                    }
                }else{
                    this.signalDigital =`${item}`;                             
                }
            }catch(error){
                console.warn("Error load file ", error)
                this.$EventBus.$emit("notifications",{ type : "error", msg : this.$Helper.renderErrorMessage(error, "Cargando Imagen de Firma Digital")})
            }finally{
                this.loadingFile = false;
            }
        },
        
        async save(){
            try {
                this.loading = true;
                if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
                    if (this.info && !this.info.name && !this.info.RoleId && !this.info.email) {
                        this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Nombre, Perfil, Correo"});
                    }else{                        
                        const service = UserService;                        
                        const res = await service.saveUser({...this.info});
                        if (res && res.error) {
                            this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Creando Usuario")});
                        }else
                        if (res && res.data) {
                            this.info.id = res.data.id; 
                            this.listToComponent.push(res.data);                
                            this.$ManagerSmith.Sound.play("sound1")
                            this.$EventBus.$emit("notifications", {
                                type    : "saved"
                            });
                            this.$emit("receiveInfo", res.data);
                        }
                    }
                }
            }catch(error){
                console.warn("Error save sub user ", error);
                this.$EventBus.$emit("notifications", {
                    type    : "error",
                    msg     : this.$Helper.renderErrorMessage(error, "Creando Usuario")
                });
            }finally{
                this.loading = false;
            }
        },
        async update(){
            try {
                this.loading = true;
                  if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {
                    if (this.info && !this.info.name && !this.info.RoleId && !this.info.email) {
                        this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Nombre, Perfil, Correo"});
                    }else{        
                        const service = UserService;
                        
                        const res = await service.updateUser(this.info);
                        if (res && res.error) {
                            this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Actualizando Usuario")});
                        }else
                        if (res && res.data) {                  
                            const idx = this.listToComponent.findIndex(x => x.id == this.info.id );                 
                            if (idx >= 0) {
                                this.listToComponent.splice(idx, 1, {
                                    ...this.info,                       
                                });
                            }
                            this.$ManagerSmith.Sound.play("sound1")
                            this.$emit("receiveInfo", res.data);
                            this.$EventBus.$emit("notifications", {
                                type    : "updated"
                            });
                        }
                    }
                }
            }catch(error){
                console.warn("Error update sub user", error);
                this.$EventBus.$emit("notifications", {
                    type    : "error",
                    msg     : this.$Helper.renderErrorMessage(error, "Actualizando Usuario")
                });
            }finally{
                this.loading = false;
            }
        },
        
        
    }, // methods

};
</script>