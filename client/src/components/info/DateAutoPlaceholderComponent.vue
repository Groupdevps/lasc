<template>
    <v-menu
	    offset-x		
	    :ref 					= "ref"
	    v-model 				= "menu"
	    :close-on-content-click = "false"
	    transition 				= "scale-transition"
	    min-width 				= "200"
	  >	  
	    <template v-slot:activator = "{ on, attrs }">
	        <v-text-field	            
	            dense
	            outlined
	            clearable
	            v-model 			= "inputField[keyField]"
	          	:label              = "$t(parameter.text)"
	            placeholder         = "AAAA-MM-DD"
	            prepend-inner-icon 	= "mdi-calendar"
				class 				= "text-uppercase"
                hint                = "AAAA-MM-DD"
	            v-bind 				= "attrs"
	            v-on 				= "on"
	      		@input 			    = "renderDateTyping(inputField[keyField])" 
	            :disabled 			= "parameter.isDisabled || isDisabled"
				:readonly 			= "parameter.isReadOnly"                
                maxlength           = "10"                
                persistent-hint
	        >							
	      
	        </v-text-field>


	    </template>
	    <v-date-picker
	      	no-title
	      	scrollable
	      	dark
	      	color       = "green lighten-1"
	      	v-model 	= "datePicker"
	      	@input 		= "renderDate(datePicker)" 
	    >
	      	<v-spacer></v-spacer>
	        <v-btn
	            x-small
	            text
	            color  = "primary"
	            @click = "actions('setDate', datePicker)"
	        >	            
	        </v-btn>
	        <v-btn
	        	x-small
	            text
	            color  = "error"
	            @click = "menu = false"
	        >
	           
	        </v-btn>
	    </v-date-picker>
	</v-menu>
</template>
<script>
    export default{
        name : "DateAutoPlaceholderComponent",
        props : [
            'infoToComponent',
			'infoToDate',
			'refToComponent',
			'keyField', 'inputField', 'isDisabled'
        ],
        data : (vm)=>({
            menu  : null,
            parameter : {
                text       : "date",
                isDisabled : false,
                isReadOnly : false,
            },
            ref         : "DateAutoPlaceholderComponent", 
            date        : vm.infoToDate,
            datePicker  : "",
            isTyping    : false,
            inputRules  : [
                v => !!v && v.length >= 10 || 'Maximo de 10 caracteres' 
            ]
        }), //data
        created(){
            // this.date = this.$ManagerSmith.getDateCurrent();
            if (this.infoToComponent) {
				this.renderInfo(this.infoToComponent);
			}
			if (this.refToComponent) {
				this.ref += this.refToComponent;
			}
        },
        watch:{ 
            // infoToDate : function(val){
            //     // console.log("CHANGE DATE ext =", val, this.date)
            //     if(val && val != this.date && !this.isTyping){
            //         this.date = val;
            //     }
            // }
        }, // watch
        methods:{
            actions(action, item){
                if (action == "setDate"){
						this.menu = false;

                }
            },
            renderInfo(item){                
                if(item){
                    if(item.text){
                        this.parameter.text = item.text;
                    }
                }  
            }, 
            renderDate(item){
                if (this.ref && this.$refs && this.$refs[this.ref]) {
                    this.$refs[this.ref].save(item);
                    // this.date = item;
                    this.inputField[this.keyField] = item;
                    // this.$emit("receiveInfo", item);
                }
            },
            renderDateTyping(item){                
                if(item){
                    this.isTyping = true;
                    
                    // Validar la longitud de la cadena
                    if (item.length === 4 || item.length === 7) {
                        item += '-';                        
                    }                     
                    
                    if(item.length == 10){
                        this.isTyping = false;
                        this.$emit("receiveInfo", item);
                    }
                    
                    this.inputField[this.keyField] = item;
                }else{
                    this.isTyping = false;
                }
            }, 
            formatDate (date) {
		        if (!date) return null
		        const [year, month, day] = date.split('/')
		        return `${year}-${month}-${day}`
		    
		    }, // formatDate
        },
    }
</script>
