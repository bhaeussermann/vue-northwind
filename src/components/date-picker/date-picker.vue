<template>
  <div>
    <v-text-field
      :label="label"
      v-model="displayString"
      prepend-icon="mdi-calendar"
      @blur="handleBlur($event)"
      @click="isDisplayingDatePicker = !isDisplayingDatePicker"
    ></v-text-field>
    <v-date-picker
      class="date-picker"
      v-if="isDisplayingDatePicker"
      v-model="dateString"
      no-title
      @input="isDisplayingDatePicker = false"
    ></v-date-picker>
  </div>
</template>

<script src="./date-picker.ts"></script>
