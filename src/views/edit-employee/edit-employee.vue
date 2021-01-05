<template>
  <v-dialog v-model="show" width="500" scrollable>
    <v-form ref="form">
      <v-card>
        <app-spinner v-if="isSaving"></app-spinner>

        <v-card-title>{{ isEditing ? 'Edit' : 'Add' }} Employee</v-card-title>

        <v-card-text>
          <v-skeleton-loader v-if="isLoading" type="paragraph"></v-skeleton-loader>

          <div v-if="didLoad" class="form-controls">
            <v-text-field
              label="First name"
              v-model="employee.firstName"
              v-focus
              :rules="[rules.required]"
              ></v-text-field>
            <v-text-field
              label="Last name"
              v-model="employee.lastName"
              :rules="[rules.required]"
              ></v-text-field>
            <v-text-field
              label="Title"
              v-model="employee.title"
              :rules="[rules.required]"
              ></v-text-field>
            <app-date-picker
              label="Birth date"
              v-model="employee.birthDate"
              ></app-date-picker>
          </div>

          <div v-if="didFailLoading" class="error-container">
            <v-icon x-large>mdi-alert-outline</v-icon>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="!didLoad" @click="save">Save</v-btn>
          <v-btn @click="close">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<style scoped lang="scss">
@import 'edit-employee.scss';
</style>

<script src="./edit-employee.ts"></script>
