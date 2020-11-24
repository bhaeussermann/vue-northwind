<template>
  <div class="container">
    <b-loading :isFullPage="true" v-model="isSaving"></b-loading>
    <h1 class="title is-4">{{ isEditing ? 'Edit' : 'Add' }} Employee</h1>

    <form onsubmit="return false" v-on:submit="save">
      <div v-if="isLoading">
        <b-skeleton></b-skeleton>
        <b-skeleton></b-skeleton>
        <b-skeleton></b-skeleton>
        <b-skeleton></b-skeleton>
        <b-skeleton></b-skeleton>
        <b-skeleton></b-skeleton>
        <b-skeleton></b-skeleton>
        <b-skeleton></b-skeleton>
      </div>

      <div v-if="didLoad" class="form-controls">
        <b-field label="First name">
          <b-input
            v-model="employee.firstName"
            v-focus
            required
            ></b-input>
        </b-field>
        <b-field label="Last name">
          <b-input
            v-model="employee.lastName"
            required
            ></b-input>
        </b-field>
        <b-field label="Title">
          <b-input
            v-model="employee.title"
            required
            ></b-input>
        </b-field>
        <b-field label="Birth date">
          <b-datepicker
            v-model="employee.birthDate"
            :date-formatter="formatDate"
            icon="calendar"
            icon-prev="arrow-left"
            icon-next="arrow-right"
            editable
            ></b-datepicker>
        </b-field>
      </div>

      <div v-if="didFailLoading" class="error-container">
        <font-awesome-icon icon="exclamation-triangle" size="5x" />
      </div>

      <b-button type="is-primary" native-type="submit" :disabled="!didLoad">Save</b-button>
      <b-button @click="cancel">Cancel</b-button>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import 'edit-employee.scss';
</style>
<script src="./edit-employee.ts"></script>
