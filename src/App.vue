<template>
  <v-app>

      <v-app-bar
        app
        absolute
        dark
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>{{appName}}</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        temporary
        app
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item @click="alternaComponente('FormInput')">
              <v-list-item-icon>
                <v-icon>mdi-application-edit</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Informar dados</v-list-item-title>
            </v-list-item>

            <v-list-item @click="alternaComponente('GridView')">
              <v-list-item-icon>
                <v-icon>mdi-table-edit</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Períodos</v-list-item-title>
            </v-list-item>

            <v-list-item @click="alternaComponente('Graphs')">
              <v-list-item-icon>
                <v-icon>mdi-chart-line</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Gráfico</v-list-item-title>
            </v-list-item>

            <v-list-item @click="alternaComponente('SelicHistory')">
              <v-list-item-icon>
                <v-icon>mdi-chart-line</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Histórico Selic</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <keep-alive>
            <component :meses="meses" @do-calculo="doCalculo($event)" :is="componente" />
        </keep-alive>

        <!-- If using vue-router -->
        <!-- <router-view></router-view> -->
      </v-container>

      <v-container fluid>
        <AdsGoogle />
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import FormInput from './components/FormInput.vue'
import GridView from './components/GridView.vue'
import Graphs from './components/Graphs.vue'
import SelicHistory from './components/SelicHistory.vue'
import AdsGoogle from './components/AdsGoogle.vue'


export default {
  name: 'App',

  components: {
      FormInput, GridView, Graphs, SelicHistory, AdsGoogle
  },
  data: () => ({
      value: 'recent',
      appName: 'COINT | Calculadora de juros compostos mensal',
      drawer: false,
      group: null,
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
