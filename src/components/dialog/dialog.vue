<template>
  <v-dialog v-model="show" width="500">
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>
      <v-card-text class="body">
        <v-icon large class="icon">mdi-alert-circle</v-icon>
        <span class="message" v-html="message"></span>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="confirm()">OK</v-btn>
        <v-btn text @click="cancel()">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
@import 'dialog.scss';
</style>

<script src="./dialog.ts"></script>
