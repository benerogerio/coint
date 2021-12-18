<template>
    <div>
        <GraphView
            :nome="'Juro mensal'"
            :itens="calculaInfo('jurosAoMes')" />

        <GraphView
            :nome="'Juros totais'"
            :itens="calculaInfo('saldoSomenteTaxa')" />

        <GraphView
            :nome="'Saldo aportes'"
            :itens="calculaInfo('saldoSemTaxa')" />

        <GraphView
            :nome="'Saldo total'"
            :itens="calculaInfo('saldo')" />
    </div>
</template>

<script>

import GraphView from "./GraphView.vue";

export default {

    components: { GraphView },
    props: ['meses'],
    methods: {
        calculaInfo(info){

            let qtdItens = this.meses.length
            let maxItens = 10
            let offset   = qtdItens / maxItens

            let itens = new Object
            itens.labels = new Array
            itens.value = new Array

            let j = 0
            for (let i = 0; i < maxItens; i++) {
                j = Math.round(i * offset)

                itens.labels [i] = this.meses[j].anoMes
                itens.value [i] = this.meses[j][info]
            }

            return itens
        }
    },
    computed: {
        console(){
            return{console}
        },
        window: () => window
    }

}
</script>

<style>

</style>
