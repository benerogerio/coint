<template>
    <v-card v-if="periodos && options && series"
        class="mt-4 mx-auto"
        max-width="500"
    >
        <div>
            <apexchart type="line" :options="options" :series="series"></apexchart>
        </div>
    </v-card>
    <div v-else>
        Um momento...
    </div>
</template>

<script>

import apexchart  from "vue-apexcharts"
import axios from "axios"

export default {
    components: { apexchart },
    data () {
        return {
            periodos: null
        }
    },
    computed: {
        options(){
            return {
                chart: {
                    id: 'vuechart-selic',
                    width: "100%",
                    height: "100%",
                },
                xaxis: {
                    categories: this.categorias()
                },
                responsive: [
                    {
                        breakpoint: 1000,
                        options: {
                            plotOptions: {
                                bar: {
                                    horizontal: false
                                }
                            },
                            legend: {
                                position: "bottom"
                            }
                        }
                    }
                ]
            }
        },
        series(){
            return [this.variacaoSelic()]
        },
        console(){
            return{console}
        },
        window: () => window
    },
    methods: {
        calculaInfo(type='cat', info=''){

            // Quantidade máxima de ítens exibidos no gráfico
            let maxItens = 14
            let qtdItens = this.periodos.length

            // define ofset para iteração proporcional dentro da quantidade máxima de ítens
            let offset   = (qtdItens <= maxItens) ? 1 : qtdItens/maxItens

            // trata quando a quantidade de ítens for menor que quantidade máxima
            maxItens = (qtdItens < maxItens) ? qtdItens : maxItens

            let j = 0
            let itens = new Array
            for (let i = 0; i < maxItens; i++) {

                // itera proporcionalmente a quantidade máxima de itens
                // trata exibição do último ítem
                j = (i == maxItens - 1) ? qtdItens - 1 : Math.round(i * offset)

                // adiciona ao array a categorias ou a informação
                itens [i] = (type == 'cat') ? this.periodos[j].data : this.periodos[j][info]
            }

            return itens
        },
        categorias(){
            return this.calculaInfo("cat")
        },
        variacaoSelic(){
            return {'name':'Variação Selic (Últimos 10 anos)', 'data': this.calculaInfo('serie','valor')}
        }
    },
    mounted () {
        axios
        .get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.4390/dados/ultimos/120?formato=json')
        .then(response => (this.periodos = response.data))
    }
}
</script>
