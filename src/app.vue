<template>
   <v-app>
    <v-app-bar app>
      <h1 class="title">Northwind Manager</h1>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
        <app-error-alert></app-error-alert>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="css">
  @import '~mdi/css/materialdesignicons.min.css';
</style>
