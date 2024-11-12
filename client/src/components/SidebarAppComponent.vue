<template>
    <v-navigation-drawer 
      fixed
      clipped
      app
      temporary
      class = "mt-10"
      v-model = "menu"
      width   = "200"
      v-show  = "currentUser"
      
    >
      <v-list 
        dense

      >
        <template
          v-for  = "(item_sidebar, idx_sidebar) of modules"
          v-show = "item_sidebar.enable"
        >
          <v-list-item
            dense
            @click  = "$router.push({path : '/' + item_sidebar.url})"
            :key    = "idx_sidebar"
            v-show  = "!item_sidebar.sub_module && item_sidebar.enable"
            class   = "pl-1 ma-0"   
            height  = "15px"
          ><!-- && item_sidebar.permission_user --> 
          <v-list-item-icon

                  class = "py-0 my-1"
          >
                <v-icon
                >
                  {{ item_sidebar.icon}}
                </v-icon>
              </v-list-item-icon>

              <v-list-item-title>
                {{ item_sidebar.text }}
              </v-list-item-title>
            
          </v-list-item>
          
        </template>
      </v-list>     
    </v-navigation-drawer>
</template>
<script>
    export default {
        name : "SidebarAppComponent",
        data : ()=>({

        }),
        
    }
</script>