<template>
  <v-data-table
    dense
    fixed-header
    :headers       = "headersToTable"
    :items         = "infoToTable"
    class          = "elevation-5 my-custom-table"                
    loading-text    = "CARGANDO... POR FAVOR ESPERE"
    :height       = "heightToTable"
    item-key      = "index"    
    :hide-default-footer = "true"
  >
    <template v-slot:item.actions="{item}">
      <v-btn        
        x-small
        color="error"
        @click="openPdfParent(item)"
        :loading="item.loading"
        v-show="isPdf"
      >
        <v-icon  small class = "mr-1">mdi-download-circle</v-icon>
        {{ $t("pdf") }}
      </v-btn>
    </template>
  </v-data-table>
</template>
<script type="text/javascript">
  export default{
    props:["headersToTable", "infoToTable", "reference", "heightToTable", "isPdf","openPdfParent"],
    data: ()=>({

    })
  }
</script>