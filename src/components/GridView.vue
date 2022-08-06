<template>
  <v-data-table
    :headers="cabecalho"
    :items="meses"
    :items-per-page="5"
    class="elevation-1"
    disable-sort
    dense
    locale="pt-br"
    mobile-breakpoint="350"
    :disable-items-per-page="true"
    :fixed-header="true"
  ></v-data-table>
</template>

<script>

export default {

    props:
        ['meses']
    ,
    data(){
        return{
            cabecalho: [
                {
                    text: 'Período',
                    align: 'start',
                    sortable: false,
                    value: 'anoMes' },
                { text: 'Juro mensal', value: 'jurosAoMes' },
                { text: 'Juros totais', value: 'saldoSomenteTaxa' },
                { text: 'Saldo aportes', value: 'saldoSemTaxa' },
                { text: 'Saldo total', value: 'saldo' },
                ],
            itens: this.meses,
        }
    }
}
</script>

<style>

</style>
