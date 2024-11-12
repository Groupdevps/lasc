<template>
    <v-autocomplete
        dense
		outlined	
        clearable
        auto-select-first
        :hide-details="!isHideDetails"
        v-model = "inputField[keyField]"
        :items = "renderList"
        :label = "LabelToMenu || 'MATERIAL'"
        item-value = "id"
        item-text = "name"
        prepend-inner-icon="mdi-needle"
        :menu-props="{ offsetY: true, maxHeight: '200px' }"        
        :return-object = "isReturnObject"
        :loading="loading"
        :disabled = "loading"
        :persistent-hint="isPersistentHint"
        :hint="renderMessageHint"        
        :ref="'autocompleteMenuOsteosynthesysMaterial'"        
        @blur="onCloseMenu"
        @focus="onMenu"   
        :search-input.sync="search"
        :filter="()=> true"
    >
        <!-- @input="renderAutoSetInField(inputField[keyField])"         -->
        <!-- <template v-slot:no-data>
            <span> Presionar Enter para guardar : {{ inputField[keyField] }}  </span>
        </template> -->
        <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
                <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                <v-list-item-subtitle v-html="data.item.description"></v-list-item-subtitle>
                <!-- <v-list-item-subtitle v-html="`Disponible: ${data.item.stock} ; Valor Unitario: $${data.item.unitValue || 0} `"></v-list-item-subtitle> -->

                </v-list-item-content>
            </template>
        </template>
    </v-autocomplete>
</template>
<script>
    
    export default{
        name : "MenuOsteosynthesisMaterialComponent",
        props : ["inputField", "keyField", "isReturnObject", "LabelToMenu", "autoSetInField", "fieldWatch", "isHideDetails", "isPersistentHint", "isDisabled"],
        data : ()=>({            
            list : [],
            loading : true,
            // searchText : "",
            search : "",
            showEndMenu: false,            
            currentPage : 1,
            nextPage : null,
            maxWidthMenu : 300,
        }), 
        watch:{
            "fieldWatch"(val){
                this.renderAutoSetInField(val);
            },
            search (val) {
                // Items have already been loaded
                const temp = this.renderFilterList.filter(x=> this.customFilter(x, this.search || ''));                
                if (temp.length > 0) {
                    this.list = temp
                    return

                }
                // Items have already been requested
                if (this.loading) return
                this.loading = true
                this.$store.dispatch("listOsteosynthesisMaterial/findList", {
                    search : val,
                    limit : 30                                        
                }).then(res=>{
                    this.loading = false;
                    if (res && res.data) {
                        if (res.data.rows.length > 0) {
                            this.currentPage=1;
                            if (res.data.nextPage) {
                                this.nextPage=res.data.nextPage;
                            }                        
                            this.list = res.data.rows.map(x=>{
                                x.filterDescription = x.description ? this.$Helper.normalizeText(x.description) : x.description
                                return x
                            });                            
                        }else{
                            this.list = [];
                        }
                         
                    }

                }).catch(error=>{
                    this.loading = false;

                })
                // Lazily load input items
            }
        },
        mounted(){
            this.getList();
            this.adjustMenuWidth();
            // this.$store.dispatch("listOsteosynthesisMaterial/saveList", {
            //     name : "test",
            //     description:"test"
            // })
        },
        computed:{
            renderList(){
                 return this.search ? this.list : this.renderFilterList;
            },
            renderFilterList(){
                return this.$store.getters["listOsteosynthesisMaterial/list"];
            },
            isLoaded(){
                return this.$store.getters["listOsteosynthesisMaterial/isLoaded"];
            },
            renderMessageHint(){
                let text="";
                if (this.isReturnObject && this.inputField &&  this.keyField && this.inputField[this.keyField]) {
                    const { code }=this.inputField[this.keyField]
                    text = code;
                }
                return text || ''
            }
        }, 
        methods:{
            renderAutoSetInField(value){                                
                if (this.autoSetInField) {
                    if (this.isReturnObject) {
                        this.inputField[this.autoSetInField]=value;
                        this.$emit("receiveSurgery", value);
                    }else{                
                        this.inputField[this.autoSetInField]= this.renderList.find(x=> x.id == value);
                        this.$emit("receiveSurgery", this.inputField[this.autoSetInField]);
                    }
                }

            },
              onMenu(isOpen) {                            
                if (isOpen) {
                    // El menú se ha abierto, esperamos un tick para que se renderice el DOM
                    this.$nextTick(() => {
                        const clearTime = setTimeout(() => {
                            this.adjustMenuWidth();                            
                            const menuElement = document.querySelector('.v-menu__content');
                            if (menuElement) {
                                menuElement.addEventListener('scroll', this.onScroll);
                            }
                            clearTimeout(clearTime);
                        },300)
                    });
                } 
            },
            onCloseMenu(){                
                // El menú se ha cerrado, removemos el event listener
                const menuElement = document.querySelector('.v-menu__content');
                if (menuElement) {
                    menuElement.removeEventListener('scroll', this.onScroll);                    
                    // this.removeScrollListener(); // Remover listener de scroll cuando el menú se cierra
                }
            },
            onScroll(event) {
                const scrollElement = event.target;
              
                if (scrollElement.scrollTop + scrollElement.clientHeight >= scrollElement.scrollHeight - 5) {
                    // Si el scroll llega al final, mostramos el mensaje
                    this.showEndMenu = true;                    
                    if (!this.loading) {
                        this.loading = true;
                        if (this.search) {
                            if (this.currentPage != this.nextPage) {                                
                                this.$store.dispatch("listOsteosynthesisMaterial/findList", {
                                    search : this.search,
                                    limit : 30,
                                    page : this.nextPage                                        
                                }).then(res=>{
                                    if (res && res.data) {
                                        this.currentPage = res.data.page;
                                        if (res.data.nextPage) {
                                            this.nextPage = res.data.nextPage;
                                        }
                                        if (res.data.rows.length> 0) {
                                            this.list = this.list.concat(res.data.rows.map(x=>{
                                                x.filterDescription = this.$Helper.normalizeText(x.description)
                                                return x
                                            }));
                                        }
                                    }
                                    this.loading = false;
                                    this.adjustMenuWidth();
                                }).catch(error=>{

                                })
                            }
                        }else{

                            this.$store.dispatch("listOsteosynthesisMaterial/getList").then(res=>{
                                this.list = this.renderFilterList;
                                this.loading = false;
                                this.adjustMenuWidth();
                            });
                        }
                    }                    
                } else {
                    // Si no estamos al final, ocultamos el mensaje                    
                    this.showEndMenu = false;
                }
            },

            adjustMenuWidth(){
                this.$nextTick(() => {
                    const autocompleteWidth = this.$refs.autocompleteMenuOsteosynthesysMaterial.$el.clientWidth; // Obtener el ancho del autocomplete
                    const menuElement = document.querySelector('.v-menu__content');
                    this.maxWidthMenu=autocompleteWidth;                                        
                    // console.log("autocompleteWidth CUP ", this.$refs.autocompleteMenuOsteosynthesysMaterial )
                    if (menuElement) {
                        menuElement.style.minWidth = `${autocompleteWidth}px`; // Establecer el ancho del menú
                        menuElement.style.maxWidth = `${autocompleteWidth}px`;
                        menuElement.style.left = `${this.$refs.autocompleteMenuOsteosynthesysMaterial.$el.getBoundingClientRect().left}px`;
                        // menuElement.style.position = 'absolute'; // Aseguramos que sea absoluto
                    }
                });
            },
            async getList(){                
                try {
                    this.loading = true;
                    if (!this.$store.getters["listOsteosynthesisMaterial/isLoaded"]) {
                        this.$store.dispatch("listOsteosynthesisMaterial/getList").then(res=>{
                            this.loading = false;
                        });
                    }else{
                        this.loading= false
                    }                  
                } catch (error) {
                    console.warn("error get info type Osteosynthesis Material ", error)
                }finally{
                    this.loading = false;
                }
            },
            customFilter (item, queryText, itemText) {
                const textOne = item.name && typeof item.name == 'string' ? item.name.toLowerCase() : ""
                const textTwo = item.description ? item.description.toLowerCase() : ""
                const textThree =  item.filterDescription ? item.filterDescription.toLowerCase() : "";
                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1 ||
                textTwo.indexOf(searchText) > -1
                || textThree.indexOf(searchText) > -1
            },
        }
    }
</script>
