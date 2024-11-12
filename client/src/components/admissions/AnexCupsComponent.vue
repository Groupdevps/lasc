<template>
    <v-data-table
        dense
        fixed-header
        class = "elevation-3"
        :headers = "headers"
        :items = "renderList"
        :loading = "loading"
        :height             = "heigthTable"
        :footer-props 		 = "{
            showFirstLastPage   : false,	   		
            itemsPerPageOptions : [100],
            showCurrentPage     : false
        }"
        :loading-text 		= "$t('LoadingPeaseWait')"
    >
        <template v-slot:top>
            <v-row dense>
                <template v-for ="field of fields">
                    <v-col :cols ="field.cols">
                        <v-text-field
                            dense
                            outlined
                            v-if = "['text','number'].includes(field.type)"
                            :label ="field.text"
                            :type = "field.type"
                            v-model = "infoInput[field.key]"
							@input 		 		= "(v) => infoInput[field.key] = v.toUpperCase()"

                        ></v-text-field>
                    </v-col>
                </template>
                <v-col>
                    <v-btn color ="primary" @click ="actions(btnAction)" :loading="loading">{{ $t(btnAction.action) }}</v-btn>
                </v-col>

            </v-row>
        </template>
        <template v-slot:item.actions="{item}">
            <v-btn-toggle mandatory dense>
                <v-btn small color="primary" @click="setEditCup(item)" :loading="loading">Editar</v-btn>
                <v-btn small color="error" @click="confirmDeleteCup(item)" :loading="loading">Eliminar</v-btn>
            </v-btn-toggle>
        </template>

    </v-data-table>
</template>
<script>
import AnexCupService from "@/services/AnexCupService.js"
export default{
    name : "AnexCupsComponent",
    props : ["listToComponent", "infoToComponent"],
    data : ()=>({
        ref : "AnexCups",
        headers :[
            {text : "Cups", value : "cups" },
            {text : "Cantidad", value : "cant" },
            {text : "Descripcion", value : "description" },
            {text : "Acciones", value : "actions" },
        ],
        loading : false,
        heigthTable  : "200px",        
        list: [],
        infoInput:{},
        btnAction : {
            action : "add",
            item : null,
        },
        bus : {},
        fields : [
            {
                key : "cups",
                type : "text",
                text : "Cups",
            },
            {
                key : "cant",
                type : "number",
                text : "Cantidad",
            },
            {
                key : "description",
                type : "text",
                text : "Descripcion",
            },
        ],
    }), //data        
    created(){
        this.get({});
    },
    computed:{
        renderList: function(){            
            this.list = this.listToComponent;
            return this.list;
        }
    },
    methods:{
        actions(actionn,item){
            if (actionn) {
                const {action} = actionn;
                if (action =="add") {
                    this.save(this.infoInput);
                }else if (action=="edit") {
                    this.update(this.infoInput);                    
                } 
            }
        }, // actions
        clearInfoInput(){
            this.infoInput = {};
        },
        confirmDeleteCup(item){
            this.btnAction.item = item;
            this.$EventBus.$emit("notifications", {
                type : "confirm_delete",
                ID : this.ref,
            })
        },
        setEditCup(item){
            this.infoInput = {...item};
            this.btnAction.action = "edit";
            this.btnAction.item = item;            
        },
        async get(params){
            this.loading = true
            try {
                if (this.infoToComponent && this.infoToComponent.id) {
                    params.Anex3Id = this.infoToComponent.id; 
                    const service = new AnexCupService();
                    const res = await  service.getAnexCup(params);
                    if (res) {
                        if (res.data && res.data.length > 0) {
                            this.listToComponent = res.data ;                                                
                        }
                    }
                }
            } catch (error) {                       
                console.warn("Error save anex cup ", error)
            }
            this.loading = false;
        },
        async save(params){
            this.loading = true
            try {
                if (this.infoToComponent && this.infoToComponent.id) {
                    params.Anex3Id = this.infoToComponent.id; 
                    const service = new AnexCupService();
                    const res = await service.saveAnexCup(params);
                    if (res) {
                        if (res.data) {
                            params.id = res.data.id;
                            this.listToComponent.push(params);    
                            this.clearInfoInput();                    
                        }
                    }
                } else {
                    params.key = new Date().getTime();
                    console.log("PARAM SAVE anex cups ",params )
                    this.listToComponent.push(params);    
                    this.clearInfoInput();   
                    
                }
            } catch (error) {
                            

                console.warn("Error save anex cup ", error)
            }
            this.loading = false;
        },
        async update(params){
            this.loading = true
            try {
                if (this.infoToComponent && this.infoToComponent.id) {
                    params.Anex3Id = this.infoToComponent.id; 
                    const service = new AnexCupService();
                    const res = await service.updateAnexCup(params);
                    if (res) {
                        if (res.data) {
                            const idx = this.listToComponent.findIndex(x => x && x.id == params.id);
                            if (idx>=0) {
                                this.listToComponent.splice(idx, 1, params);                                                    
                                this.clearInfoInput();          
                                this.btnAction.action = "add";          
                            }
                        }
                    }
                }else{
                    if (this.listToComponent && this.listToComponent.length > 0) {                        
                        const idx = this.listToComponent.findIndex(x => x && x.key === params.key);
                        if (idx>=0) {
                            this.listToComponent.splice(idx, 1, params);                                                    
                            this.clearInfoInput();          
                            this.btnAction.action = "add";          
                        }

                    }
                }
            } catch (error) {
                console.warn("Error update anex cup ", error)
            }
            this.loading = false;
        },
        async deleteCup(item){
            this.loading = true
            try {
                if (this.infoToComponent && this.infoToComponent.id) {
                    params.Anex3Id = this.infoToComponent.id; 
                    const service = new AnexCupService();
                    const res = await service.deactivateAnexCup(params);
                    if (res) {
                        if (res.data) {
                            const idx = this.listToComponent.findIndex(x => x && x.id == params.id);
                            if (idx>=0) {
                                this.listToComponent.splice(idx, 1);                                                    
                            }
                        }
                    }
                }else{
                    if (this.listToComponent && this.listToComponent.length > 0) {                 
                        const idx = this.listToComponent.findIndex(x => x && x.key == item.key);
                        if (idx>=0) {
                            this.listToComponent.splice(idx, 1);                                                    
                        }
                    }
                }
            } catch (error) {
                console.warn("Error delete anex cup ", error)
            }
            this.loading = false;

        },
    }, // methods
    mounted(){
        let temp = "notifications" + this.ref;
        this.$EventBus.$on(temp, this.bus[temp] = (actions) => {                
            if (actions && this.btnAction.item) {                    
                this.deleteCup(this.btnAction.item);
            }
        });
        
    }, // 
    beforeDestroy(){
        this.$Helper.clear_bus(this.$EventBus, this.bus, this.ref);
    }, // beforeDestroy
    
};

</script>