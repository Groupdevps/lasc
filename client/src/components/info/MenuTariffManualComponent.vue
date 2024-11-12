<template>
    <v-autocomplete
        dense
		outlined	
        clearable
        auto-select-first
        v-model = "inputField[keyField]"
        :items = "renderList"
        label = "SOAT"
        item-value = "code"
        item-text = "description"        
        prepend-inner-icon="mdi-cash"    
        :menu-props="{ offsetY: true, maxHeight: '200px', maxWidth: maxWidthMenu+'px'}"
        :loading="loading"
        :return-object = "isReturnObject"
        :persistent-hint="isPersistentHint"
        :hint="renderMessageHint"           
        :ref="'autocompleteMenuTarriff'"        
        @blur="onCloseMenu"
        @focus="onMenu"                             
        :search-input.sync="search"
        :filter="()=> true"
    >
        <!-- <template v-slot:no-data>
            <span> Presionar Enter para guardar : {{ inputField[keyField] }}  </span>
        </template> -->
        <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
                <v-list-item-content>
                <v-list-item-title v-html="data.item.code"></v-list-item-title>
                <v-list-item-subtitle v-html="data.item.description"></v-list-item-subtitle>
                <v-list-item-subtitle v-html="`Valor: $${data.item?.value || '0'}`"></v-list-item-subtitle>
                </v-list-item-content>
            </template>
        </template>
    </v-autocomplete>
</template>
<script>
    export default{
        name : "MenuTariffManualComponent",
        props : ["inputField", "keyField", "isReturnObject", "isHideDetails", "isPersistentHint"],
        data : ()=>({
            list : [],
            loading : true,
            showEndMenu: false,            
            search : "",
            currentPage : 1,
            nextPage : null, 
            maxWidthMenu : 300,
        }), 
        watch: {
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
                
                this.$store.dispatch("listTariffManual/findList", {
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
                            this.list = res.data.rows;                            
                        }else{
                            this.list = [];
                        }
                        return 
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
        },
        
        computed:{
            renderList(){                               
                return this.search ? this.list : this.renderFilterList;
            },
            renderFilterList(){
                return this.$store.getters["listTariffManual/list"];
            },
            
            renderMessageHint(){
               let text="";
                if (this.isReturnObject && this.inputField &&  this.keyField && this.inputField[this.keyField]) {
                    const { code, value }=this.inputField[this.keyField]
                    text = code+' '+ (value ? '$'+value : '');
                }                
                return text || '';
            }
        }, 
        methods:{
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
                                this.$store.dispatch("listTariffManual/findList", {
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
                                            this.list = this.list.concat(res.data.rows);
                                        }
                                    }
                                    this.loading = false;
                                    this.adjustMenuWidth();
                                }).catch(error=>{

                                })
                            }
                        }else{

                            this.$store.dispatch("listTariffManual/getList").then(res=>{
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
                    const autocompleteWidth = this.$refs.autocompleteMenuTarriff.$el.clientWidth; // Obtener el ancho del autocomplete
                    const menuElement = document.querySelector('.v-menu__content');
                    this.maxWidthMenu=autocompleteWidth;                    
                    if (menuElement) {
                        menuElement.style.minWidth = `${autocompleteWidth}px`; // Establecer el ancho del menú
                        menuElement.style.maxWidth = `${autocompleteWidth}px`;
                        menuElement.style.left = `${this.$refs.autocompleteMenuTarriff.$el.getBoundingClientRect().left}px`;
                        // menuElement.style.position = 'absolute'; // Aseguramos que sea absoluto
                    }
                });
            },
             // addScrollListener() {
            //     window.addEventListener('scroll', this.handleWindowScroll, true);
            // },
            // removeScrollListener() {
            //     window.removeEventListener('scroll', this.handleWindowScroll, true);
            // },
            getList(){
                if (!this.$store.getters["listTariffManual/isList"]) {
                    this.$store.dispatch("listTariffManual/getList").then(res=>{
                        this.loading = false;
                    });
                }else{
                    this.loading= false
                }
            },
            customFilter (item, queryText, itemText) {                
                const textOne = item.code && typeof item.code == "string" ? item.code.toLowerCase() : ""
                const textTwo = item.description.toLowerCase()
                const searchText = queryText.toLowerCase()
                return textOne.indexOf(searchText) > -1 ||
                textTwo.indexOf(searchText) > -1
            },
        }
    }
</script>
