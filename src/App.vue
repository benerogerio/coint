<template>
  <v-app>

      <v-app-bar
        app
        elevate-on-scroll
        dark
      >
        <v-toolbar-title>{{appName}}</v-toolbar-title>
      </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <keep-alive>
            <v-fade-transition mode="out-in">
              <component :meses="meses" @do-calculo="doCalculo($event)" :is="componente" />
            </v-fade-transition>
        </keep-alive>

        <!-- If using vue-router -->
        <!-- <router-view></router-view> -->
      </v-container>

      <v-container fluid>
        <AdsGoogle />
      </v-container>
    </v-main>

    <v-footer app>
      <v-bottom-navigation v-model="value">
        <v-btn @click="alternaComponente('FormInput')" value="form">
          <span>Dados</span>

          <v-icon>mdi-application-edit</v-icon>
        </v-btn>

        <v-btn @click="alternaComponente('GridView')" value="gridview">
          <span>Períodos</span>

          <v-icon>mdi-table-edit</v-icon>
        </v-btn>

        <v-btn @click="alternaComponente('PieGraph')" value="piegraph">
          <span>Proporção</span>

          <v-icon>mdi-chart-pie</v-icon>
        </v-btn>

        <v-btn @click="alternaComponente('Graphs')" value="graphs">
          <span>Tempo</span>

          <v-icon>mdi-chart-line</v-icon>
        </v-btn>

        <v-btn @click="alternaComponente('SelicHistory')" value="history">
          <span>Selic</span>

          <v-icon>mdi-history</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
import FormInput from './components/FormInput.vue'
import GridView from './components/GridView.vue'
import Graphs from './components/Graphs.vue'
import PieGraph from './components/PieGraph.vue'
import SelicHistory from './components/SelicHistory.vue'
import AdsGoogle from './components/AdsGoogle.vue'


export default {
  name: 'App',

  components: {
      FormInput, GridView, Graphs, PieGraph, SelicHistory, AdsGoogle
  },
  data: () => ({
      value: 'form',
      appName: 'COINT | Calculadora de juros compostos',
      componente: 'FormInput',
      mes: 1,
      ano: 2021,
      meses: [],
      calcNext: true
  }),
  methods:{
      alternaComponente(componente){
          this.componente=componente
          this.drawer=false
      },
      // processa calculo
      doCalculo(form){
          if(!form)
              return false;

          var arrData;
          arrData  = form.dataIni.split('-')

          this.mes = arrData[1]
          this.ano = arrData[0]
          this.calcNext = true
          this.meses = []

          if((form.qtdMeses <= 0 && form.saldoMax <= 0)
            || isNaN(form.qtdMeses) || isNaN(form.saldoMax))
              return false;

          if(form.taxa <= 0 || isNaN(form.taxa))
              return false;

          let i = 0;
          while (this.calcNext) {
              this.meses[i] = new Object;
              this.meses[i].mes = Number(this.mes)
              this.meses[i].ano = Number(this.ano)
              this.meses[i].anoMes = Number(this.mes) + '/' + Number(this.ano)
              this.meses[i].jurosAoMes = 0

              if(i == 0){
                  if(form.taxa > 0)
                      this.meses[i].taxa = Number(form.taxa);

                  this.meses[i].saldoSomenteTaxa = 0
                  this.meses[i].saldoSemTaxa  = (form.invIni>0) ? Number(form.invIni) : Number(form.dep)
                  this.meses[i].saldo         = (form.invIni>0) ? Number(form.invIni) : Number(form.dep)
              }else if(i > 0){
                  // taxa referencia anterior
                  this.meses[i].taxa = this.meses[i - 1].taxa
                  // juros ao mes
                  this.meses[i].jurosAoMes = this.valRound((this.meses[i].taxa * this.meses[i - 1].saldo)/100)
                  // total somente taxa
                  this.meses[i].saldoSomenteTaxa = this.valRound(this.meses[i - 1].saldoSomenteTaxa + this.meses[i].jurosAoMes)
                  // total sem juros
                  this.meses[i].saldoSemTaxa = this.valRound(this.meses[i - 1].saldoSemTaxa + Number(form.dep))
                  // total com juros
                  this.meses[i].saldo = this.valRound(this.meses[i - 1].saldo + this.meses[i].jurosAoMes + Number(form.dep))
              }

              if(this.condBreak(form)){
                  this.calcNext = false;
              }else{
                  this.updateAnoMes();
                  i++;
              }
          }

          this.alternaComponente('GridView')
          this.value = 'gridview'

      },
      // condições para parar o laço
      condBreak(form){
          if(form.qtdMeses > 0){
              if(this.meses.length >= form.qtdMeses){
                  return true;
              }
          }

          if(form.saldoMax > 0){
              let lastIndex = this.meses.length - 1;
              if(this.meses[lastIndex].saldo >= form.saldoMax){
                  return true;
              }
          }

          return false;
      },
        // atualiza ano e mes no para o loop
        updateAnoMes(){
            this.mes++;
            if(this.mes > 12){
                this.mes = 1;
                this.ano++;
            }
        },
        valRound(val){
            val = val * 100;
            val = Math.round(val);
            val = val / 100;

            return val;
        }
    },
    computed:{
        console(){
            return{console}
        },
        window: () => window
    }
};
</script>

<style>

</style>
