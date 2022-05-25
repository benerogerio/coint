<template>
  <v-form v-model="valid" >
    <v-container>
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
            v-model="form.invIni"
            :rules="inputRules"
            label="Investimento inicial"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="form.dep"
            :rules="inputRules"
            label="Aporte mensal"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="form.taxa"
            :rules="inputRules"
            :counter="10"
            label="Taxa"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="form.qtdMeses"
            :rules="inputRules"
            label="Quantidade de meses"
            required
          ></v-text-field>
        </v-col>

        <v-col
            cols="12"
            md="4"
            >
            <v-text-field
                v-model="form.saldoMax"
                label="Saldo máximo"
            ></v-text-field>
        </v-col>
      </v-row>

      <v-row
        cols="12"
        md="4"
        >
        <v-col>
          <v-btn
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
