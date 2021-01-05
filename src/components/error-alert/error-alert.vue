<template>
  <v-snackbar color="red" v-model="show">
    {{errorMessage}}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="show = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script src="./error-alert.ts"></script>
