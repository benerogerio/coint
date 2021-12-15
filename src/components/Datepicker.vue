<template>
  <div>
    <v-dialog
        ref="dialog"
        v-model="modal"
        persistent
        :close-on-content-click="false"
        width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          :label="label"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        :active-picker.sync="activePicker"
        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
        min="1950-01-01"
        type="month"
        @change="save"
      ></v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props:['label'],
    data: () => ({
      activePicker: null,
      date: null,
      modal: false
    }),
    methods: {
      save (date) {
        this.$emit('alteraPeriodo', date)
        this.modal = false
      },
    },
  }
</script>
