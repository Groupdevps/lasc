<template>
    <v-autocomplete
        dense
		outlined	
        clearable        
        auto-select-first
        :hide-details="!isHideDetails"
        v-model = "inputField[keyField]"
        :items = "renderList"
        :label = "labelToMenu || 'CUP'"
        item-value = "id"
        item-text = "description"
        prepend-inner-icon="mdi-selection-marker"    
        :menu-props="{ offsetY: true, maxHeight: '200px', maxWidth: maxWidthMenu+'px' }"
        :return-object = "isReturnObject"
        :loading="loading"
        :persistent-hint="isPersistentHint"
        :hint="renderMessageHint"        
        :ref="'autocompleteMenuCups'"        
        @blur="onCloseMenu"
        @focus="onMenu"   
        :search-input.sync="search"
        :filter="()=> true"
        :disabled="isDisabled"
    >
        <!-- :disabled = "loading" -->
        <template v-slot:no-data>
            <!-- <span> Presionar Enter para guardar : {{ inputField[keyField] }}  </span> -->            
            <!-- <v-list-item v-for="itemLink in listLinks">
                <v-list-item-content @click="selectLink(itemLink)">
                    <v-list-item-title v-html="itemLink.code"></v-list-item-title>
                    <v-list-item-subtitle v-html="itemLink.description"></v-list-item-subtitle>                    
                </v-list-item-content>
            </v-list-item> -->
        </template>
        <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
                <v-list-item-content>
                <v-list-item-title v-html="data.item.code"></v-list-item-title>
                <v-list-item-subtitle v-html="data.item.description"></v-list-item-subtitle>
                </v-list-item-content>
            </template>
        </template>
    </v-autocomplete>
</template>
<script>
    export default{
        name : "MenuCupsListComponent",
        props : ["inputField", "keyField", "isReturnObject", "labelToMenu", "autoSelectBy", "isHideDetails", "isPersistentHint", "isDisabled" ],
        data : ()=>({            
            list : [],
            loading : true,
            search : "",
            showEndMenu: false,            
            currentPage : 1,
            nextPage : null,
            maxWidthMenu : 300,
            listLinks: [
                {
                    code  : "NS1", description : "Inmunoglobina [IGA, IGG, IGM]", isLink:true, links:[ "906826", "906826", "906828" ], listLink :[] 
                }
            ]
        }), 
        mounted(){
            this.getList();
            this.adjustMenuWidth();
            this.renderLinks();

        },
        watch:{
            isLoaded(val){ 
                if (val && this.autoSelectBy && this.isReturnObject && this.keyField && this.inputField[this.keyField] && this.renderList && this.renderList.length > 0) {
                    const idx = this.renderList.findIndex(x => x.code == this.inputField[this.keyField][this.autoSelectBy])
                    // console.log("idx ", idx )
                    if (idx >= 0 ) {
                        this.inputField[this.keyField] = this.renderList[idx];
                    }
                }
            },
            search (val) {
                // Items have already been loaded
                const temp = this.renderFilterList.filter(x=> this.customFilter(x, this.search || ''));                            
                if (temp.length > 0) {
                    this.list = temp
                    return
                }else{
                    const temp1 = this.list.filter(x=> this.customFilter(x, this.search || ''));            
                    if (temp1.length > 0) {
                        this.list = temp1
                        return
                    }   
                }
                // Items have already been requested
                if (this.loading) return
                this.loading = true
                this.$store.dispatch("listCups/findList", {
                    search : val,
                    limit : 30                                        
                }).then(res=>{
                    if (res && res.data) {
                        if (res.data.rows.length > 0) {
                            this.currentPage=1;
                            if (res.data.nextPage) {
                                this.nextPage=res.data.nextPage;
                            }                        
                            this.list = res.data.rows.map(x=>{
                                x.filterDescription = this.$Helper.normalizeText(x.description)
                                return x
                            });                            
                        }else{
                            this.list = [];
                        }
                        
                    }
                    this.loading = false;

                }).catch(error=>{
                    this.loading = false;

                })
                // Lazily load input items
            }
        
        },
        computed:{
            renderList(){                               
                return this.search ? this.list : this.renderFilterList;
            },
            renderFilterList(){
                return this.$store.getters["listCups/list"];
            },
            isLoaded(){
                return this.$store.getters["listCups/isLoaded"];
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
            async renderLinks(){
                if (this.listLinks && this.listLinks.length) {                    
                    for (const it of this.listLinks){                        
                        if (it && it.listLink && it.listLink.length==0) {
                            for(const it2 of it.links){                                
                                const finded = this.renderFilterList.find(x=> x.code==it2)
                                if (finded) {
                                    it.listLink.push(finded);
                                }else{
                                    const res = await this.$store.dispatch("listCups/findList", {
                                        search : it2,
                                        limit : 1                                        
                                    })
                                    if (res && res.data && res.data.rows && res.data.rows.length) {
                                        it.listLink.push(res.data.rows[0]);
                                    }

                                }
                            }
                        }
                        this.renderFilterList.push(it)
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
                                this.$store.dispatch("listCups/findList", {
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

                            this.$store.dispatch("listCups/getList").then(res=>{
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
                    const autocompleteWidth = this.$refs.autocompleteMenuCups.$el.clientWidth; // Obtener el ancho del autocomplete
                    const menuElement = document.querySelector('.v-menu__content');
                    this.maxWidthMenu=autocompleteWidth;                                        
                    // console.log("autocompleteWidth CUP ", this.$refs.autocompleteMenuCups )
                    if (menuElement) {
                        menuElement.style.minWidth = `${autocompleteWidth}px`; // Establecer el ancho del menú
                        menuElement.style.maxWidth = `${autocompleteWidth}px`;
                        menuElement.style.left = `${this.$refs.autocompleteMenuCups.$el.getBoundingClientRect().left}px`;
                        // menuElement.style.position = 'absolute'; // Aseguramos que sea absoluto
                    }
                });
            },
            getList(){                
                if (!this.$store.getters["listCups/isLoaded"]) {
                    this.$store.dispatch("listCups/getList").then(res=>{
                        this.loading = false;
                    });
                }else{
                    this.loading= false
                }
            },
            customFilter (item, queryText, itemText) {
                const textOne = item.code && typeof item.code == 'string' ? item.code.toLowerCase() : ""
                const textTwo = item.description.toLowerCase()
                const textThree = item.filterDescription ? item.filterDescription.toLowerCase() : ""
                const search = queryText.toLowerCase()

                return textOne.indexOf(search) > -1 ||
                textTwo.indexOf(search) > -1 ||
                textThree.indexOf(search) > -1 

            },
        }
    }
</script>
