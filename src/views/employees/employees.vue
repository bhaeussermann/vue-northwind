<template>
  <div class="container">
    <app-spinner v-if="isBusy"></app-spinner>
    <div class="title-row">
      <h1 class="title">Employees</h1>
      <v-text-field
        class="search"
        label="Search"
        v-model="searchString"
        append-icon="mdi-magnify"
        single-line
        ></v-text-field>
    </div>
    
    <v-btn class="add-button" @click="addEmployee">Add</v-btn>

    <v-skeleton-loader v-if="isLoading" type="table-thead,table-tbody"></v-skeleton-loader>

    <v-data-table
      v-if="didLoad"
      :headers="headers"
      :items="employees"
      :search="searchString"
      :disable-pagination="true"
      :hide-default-footer="true"
      >
      <template #[`item.edit-button`]="{ item }">
        <a @click="{{ editEmployee(item) }}">Edit</a>
      </template>
      <template #[`item.delete-button`]="{ item }">
        <a @click="{{ confirmDeleteEmployee(item) }}">Delete</a>
      </template>
    </v-data-table>

    <v-dialog v-model="displayEditModal" width="500" scrollable>
      <app-edit-employee
        v-bind:isShown="displayEditModal"
        v-bind:employeeId="editedEmployeeId"
        v-on:save="modalDidSave()"
        v-on:close="closeModal()"
        ></app-edit-employee>
    </v-dialog>

    <app-dialog ref="dialog"></app-dialog>
  </div>
</template>
<style scoped lang="scss">
@import 'employees.scss';
</style>
<script src="./employees.ts"></script>
