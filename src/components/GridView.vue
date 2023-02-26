<template>
  <v-card v-if="meses.length != 0"
    class="mt-4 mx-auto">
    <v-simple-table
      dense
      fixed-header
      height="700px"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Período
            </th>
            <th class="text-left">
              Juro mensal
            </th>
            <th class="text-left">
              Juros totais
            </th>
            <th class="text-left">
              Saldo aportes
            </th>
            <th class="text-left">
              Saldo total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in meses"
            :key="item.name"
          >
            <td>{{ item.anoMes }}</td>
            <td>{{ item.jurosAoMes }}</td>
            <td>{{ item.saldoSomenteTaxa }}</td>
            <td>{{ item.saldoSemTaxa }}</td>
            <td>{{ item.saldo }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
  <v-card v-else>
    <p>
        Informe os <strong>dados</strong> para visualizar.
    </p>
  </v-card>

</template>

<script>

export default {

    props: ['meses']
}
</script>

<style>

</style>
