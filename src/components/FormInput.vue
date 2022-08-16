<template>
  <v-form v-model="valid" >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4">

          <v-card-text>
            Preencha os dados e informe, ao menos, uma <b>Quantidade de meses</b> ou um <b>Saldo máximo</b>
          </v-card-text>

        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <Datepicker
            v-model="form.dataIni"
            :rules="inputRules"
            :counter="10"
            label="Período inicial"
            @alteraPeriodo="alteraPeriodo($event)"
            required
          ></Datepicker>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            type="number"
            v-model="form.invIni"
            :rules="numericRules"
            label="Investimento inicial"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            type="number"
            v-model="form.dep"
            :rules="numericRules"
            label="Aporte mensal"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            type="number"
            v-model="form.taxa"
            :rules="numericRules"
            :counter="10"
            label="Taxa (Selic atual)"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            type="number"
            v-model="form.qtdMeses"
            :rules="numericOpcRules"
            label="Quantidade de meses (opcional)"
            required
          ></v-text-field>
        </v-col>

        <v-col
            cols="12"
            md="4"
            >
            <v-text-field
                type="number"
                v-model="form.saldoMax"
                :rules="numericOpcRules"
                label="Saldo máximo (opcional)"
            ></v-text-field>
        </v-col>
      </v-row>

      <v-row
        cols="12"
        md="4"
        >
        <v-col>
          <v-btn
            block
            left
            color="blue-grey"
            class="ma-2 white--text"
            @click="doCalculo"
          >
            Calcular
            <v-icon
              right
              dark
            >
              mdi-lightning-bolt-outline
            </v-icon>
          </v-btn>

        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>

import Datepicker from "./Datepicker.vue"
import axios from "axios"

export default {

    components: { Datepicker },
    data: () => ({
        form:{
            dataIni: '',
            taxa: null,
            invIni: 1800.00,
            dep: 500.00,
            qtdMeses: 36,
            saldoMax: 0
        },
        valid: false,
        inputRules: [
            v => !!v || 'Campo obrigatório',
        ],
        nameRules: [
            v => !!v || 'Nome é obrigatório',
            v => v.length <= 10 || 'Nome deve ter mais de 10 caracteres',
        ],
        emailRules: [
            v => !!v || 'E-mail é obrigatório',
            v => /.+@.+/.test(v) || 'E-mail deve ser válido',
        ],numericRules: [
            v => !!v || 'Número obrigatório',
            v => !isNaN(v) || 'Somente números',
        ],numericOpcRules: [
            v => !isNaN(v) || 'Somente números',
        ]
    }),
    methods:{
        dataAtual(){
            let hoje = new Date()
            let mes = hoje.getMonth()
            let ano = hoje.getFullYear()

            return `${ano}-${mes + 1}`
        },
        doCalculo(){
            this.$emit('do-calculo', this.form)
        },
        alteraPeriodo(periodo){
            this.form.dataIni = periodo
        }
    },
    created () {
      this.form.dataIni = this.dataAtual();
    },
    mounted () {
        axios
        .get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.4390/dados/ultimos/5?formato=json')
        .then(response => (this.form.taxa = response.data.at(-1).valor))
        .catch( () => this.form.taxa = 0.6)
    }
}
</script>

<style>

</style>
