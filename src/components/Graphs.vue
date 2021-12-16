<template>
    <div>
        <GraphView :itens="jurosAoMes" />
        <!-- <GraphView :itens="saldoSomenteTaxa" />
        <GraphView :itens="saldoSemTaxa" />
        <GraphView :itens="saldo" />
        <GraphView :itens="diferenca" /> -->
    </div>
</template>

<script>

import GraphView from "./GraphView.vue";

export default {

    components: { GraphView },
    props: ['meses'],
    methods: {

    },
    computed: {
        jurosAoMes(){
            let i = 0;
            let itens = []
            this.meses.forEach(item => {
                itens['labels'][i] = item.anoMes
                itens['value'][i] = item.jurosAoMes
            });

            return itens
        },
        // saldoSomenteTaxa(){

        // },
        // saldoSemTaxa(){

        // },
        // saldo(){

        // },
        // diferenca(){

        // }
        console(){
            return{console}
        },
        window: () => window
    }

}
</script>

<style>

</style>
