<template>
  <v-card
    class="mt-4 mx-auto"
    max-width="600"
  >
    <v-sheet
      class="v-sheet--offset mx-auto mb-4"
      color="grey"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        :show-labels="true"
        :labels="itens.labels"
        :value="itens.value"
        :auto-draw-duration="2000"
        auto-draw-easing="ease"
        color="white"
        line-width="2"
        padding="16"
        smooth="8"
      ></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="text-h6 font-weight-light">
        {{nome}}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: ['nome','itens']
  }
</script>

<style>
  .v-sheet--offset {
    top: 5px;
    position: relative;
  }
</style>
