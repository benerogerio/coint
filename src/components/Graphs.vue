<template>
    <div>
        <GraphView :itens="jurosAoMes" />
        <GraphView :itens="saldoSomenteTaxa" />
        <GraphView :itens="saldoSemTaxa" />
        <GraphView :itens="saldo" />
        <GraphView :itens="diferenca" />
    </div>
</template>

<script>

import GraphView from "./GraphView.vue";

export default {

    components: { GraphView },
    data: () => ({
        itens: []
    }),
    props: ['meses'],
    methods: {

    },
    computed: {
        jurosAoMes(){

            this.meses.array.forEach(periodo => {
                item[] = {'periodo': periodo,'valor': }
            });
            return item
        },
        saldoSomenteTaxa(){

        },
        saldoSemTaxa(){

        },saldo(){

        },diferenca(){

        }
    }

}
</script>

<style>

</style>
