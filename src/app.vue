<template>
  <div>
    <header class="section">
      <h1 class="title">Northwind Manager</h1>
    </header>
    <router-view />
  </div>
</template>

<style scoped>
header {
  background: #eaeaea;
  margin-bottom: 20px;
}
</style>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
@import "~bulma/sass/base/_all";
@import "~bulma/sass/components/_all";
@import "~bulma/sass/elements/_all";
@import "~bulma/sass/layout/_all";
@import "~bulma/sass/helpers/_all";
@import "~bulma/sass/form/_all";

@import "~buefy/src/scss/utils/_all";
@import "~buefy/src/scss/components/_loading";
@import "~buefy/src/scss/components/_skeleton";
@import "~buefy/src/scss/components/_table";
@import "~buefy/src/scss/components/_datepicker";
</style>
