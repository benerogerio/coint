<template>
    <v-card v-if="meses.length > 0"
        class="mt-4 mx-auto"
        max-width="500"
    >
        <div >
            <apexchart type="line" :options="options" :series="series"></apexchart>
        </div>
    </v-card>
    <v-card v-else>
        <p class="pa-4">
            Informe os <strong>dados</strong> para visualizar.
        </p>
    </v-card>
</template>

<script>

import apexchart  from "vue-apexcharts"

export default {

    components: { apexchart },
    props: ['meses'],
    computed: {
        options(){
            return {
                chart: {
                    id: 'vuechart-totais',
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
            return [this.jurosAoMes(), this.saldoSomenteTaxa(), this.saldoSemTaxa(), this.saldo()]
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
            let qtdItens = this.meses.length

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
                itens [i] = (type == 'cat') ? this.meses[j].anoMes : this.meses[j][info]
            }

            return itens
        },
        categorias(){
            return this.calculaInfo("cat")
        },
        jurosAoMes(){
            return {'name':'Juro mensal', 'data': this.calculaInfo('serie','jurosAoMes')}
        },
        saldoSomenteTaxa(){
            return {'name':'Juros totais', 'data': this.calculaInfo('serie','saldoSomenteTaxa')}
        },
        saldoSemTaxa(){
            return {'name':'Saldo aportes', 'data': this.calculaInfo('serie','saldoSemTaxa')}
        },
        saldo(){
            return {'name':'Saldo total', 'data': this.calculaInfo('serie','saldo')}
        },
    }

}
</script>

<style>

</style>
