<template>
    <v-card
        class="mt-4 mx-auto"
        max-width="500"
    >
        <div v-if="options && series">
            <apexchart type="donut" :options="options" :series="series"></apexchart>
        </div>
        <div v-else>
            Dados inexistentes
        </div>
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
                    id: 'vuechart-pie',
                    width: "100%",
                    height: "100%",
                },
                labels: this.categorias(),
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
            return [ this.saldoSomenteTaxa(), this.saldoSemTaxa() ]
        },
        console(){
            return{console}
        },
        window: () => window
    },
    methods: {
        calculaInfo(info=''){

            let qtdItens = this.meses.length



            let j = 0
            j =  qtdItens - 1

            return this.meses[j][info]
        },
        categorias(){
            return ['Juros totais', 'Saldo aportes']
        },
        saldoSomenteTaxa(){
            return this.calculaInfo('saldoSomenteTaxa')
        },
        saldoSemTaxa(){
            return this.calculaInfo('saldoSemTaxa')
        }
    }

}
</script>

<style>

</style>
