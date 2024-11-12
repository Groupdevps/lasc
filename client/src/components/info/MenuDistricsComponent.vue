<template>
    <v-autocomplete
        dense
		outlined	
        auto-select-first
        v-model = "inputField[keyField]"
        :items = "renderList"
        label = "BARRIO"
        :search-input.sync="search"
        item-value = "id"
        item-text = "name"
        prepend-inner-icon="mdi-home-group"    
        :menu-props="{ offsetY: true, maxHeight: '200px' }"
        clearable
        :filter="customFilter"
        :loading = "loading"
        :disabled = "loading"
        :return-object = "isReturnObject"
        v-show = "infoCity"
        @input="renderAutoSetInField()"
        :value-comparator="(a,b) => a == b"
    >
        <template v-slot:no-data >
            <v-list-item @click="save()">
                <v-list-item-content>
                    <v-list-item-title v-html="`CLICK PARA GUARDAR : ${ search || '' }  `"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </template>
    </v-autocomplete>
</template>
<script>
    import DistrictService from "@/services/DistricService.js"
    export default{
        name : "MenuDistricsComponent",
        props:["inputField", "keyField", "isReturnObject", "infoCity", "autoSetInField", "isCityObject", "valueSetInField"],
        data : ()=>({
            loading : false,
            search : "",
            list : [                
                { name : "PUERTA DE ORO"},
                { name : "CEVILLAR" },
                { name : "LAS MORAS" },
                { name : "VILLA KATANGA" },
                { name : "LAS VIOLAS" },
                { name : "SAN VICENTE" },
                { name : "LA ALIANZA" },
                { name : "LA CENTRAL" },
                { name : "NUEVA ESPERANZA" },
                { name : "LA CANDELARIA I" },
                { name : "LA CANDELARIA II" },
                { name : "DON BOSCO" },
                { name : "CIUDAD PARAIZO" },
                { name : "VILLA MARIA" },
                { name : "EL FERRY" },
                { name : "LOS CUSULES" },
                { name : "VILLA ZAMBRANO" },
                { name : "CIUDAD CAMELO" },
                { name : "VILLA DEL CARMEN" },
                { name : "PRIMERO DE MAYO" },
                { name : "CACHIMBERO" },
                { name : "EL PORVENIR" },
                { name : "CRUZ DE MAYO" },                
            ],
        }), 
        watch:{
            "infoCity"(val){                
                if (val) {                    
                    this.$nextTick(()=>{
                        this.getSearch({city: this.isCityObject ? val.code : val })
                    })
                }
            },

        },
        mounted(){
            this.getList();
        },
        computed:{
            renderList(){
                return this.list
            }
        },  
        methods:{
            renderAutoSetInField(){
                if(this.autoSetInField){
                    if (this.isReturnObject) {
                        const tempField=this.valueSetInField || 'id';
                        this.inputField[this.autoSetInField]=this.inputField[this.keyField][tempField]; 
                    }else{
                        const tempField=this.valueSetInField || 'id';
                        if (!this.inputField[this.autoSetInField]) {
                            this.inputField[this.autoSetInField]={}
                        }                        
                        this.inputField[this.autoSetInField]=this.renderList.find(x=> x[tempField]==this.inputField[this.keyField]);
                        // console.log("this.inputField[this.autoSetInField] ", this.inputField[this.autoSetInField] )
                    } 
                }                
            },           
            customFilter (item, queryText, itemText) {
                const textOne = item.name.toLowerCase()
                const textTwo = item.filterName.toLowerCase()
                this.search = queryText.toLowerCase()

                return textOne.indexOf(this.search) > -1 
                || textTwo.indexOf(this.search) > -1
            },
            async getList(){
                try {
                    this.loading = true;
                    const service = new DistrictService();
                    const res = await service.getInfo();
                    if (res && res.data && res.data.length) {
                        this.list = res.data.map(x=>{
                            x.filterName = this.$Helper.normalizeText(x.name)
                            return x
                        });
                    }
                } catch (error) {
                    console.warn("error get info districs ", error)
                }finally{
                    this.loading = false;
                }
            },
            async getSearch(params){
                 try {
                    this.loading = true;
                    const service = new DistrictService();
                    const res = await service.findInfo(params);
                    if (res && res.data && res.data.length) {
                        this.list = res.data.map(x=>{
                            x.filterName = this.$Helper.normalizeText(x.name)
                            return x
                        });     
                    }else{
                        this.list = [];
                    }
                } catch (error) {
                    console.warn("error search info districs ", error)
                }finally{
                    this.loading = false;
                }
            },
            async save(){
                try{
                    this.loading = true;
                    const service = new DistrictService();
                    const res = await service.saveInfo({
                        name : this.search,
                        CityId : this.infoCity?.id,
                        Code_city : this.infoCity?.code,

                    });
                    if (res && res.data) {
                        res.data.filterName = this.$Helper.normalizeText(res.data.name)
                        this.list.push(res.data);
                    }
                } catch (error) {
                    console.warn("error save info district ", error)
                }finally{
                    this.loading = false;
                }
            }
        },
    }
</script>
