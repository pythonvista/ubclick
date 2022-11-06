<template>
  <v-app>
    <div class="lg-screen xs:hidden mdx:block">
      desktop devices
    </div>
    <div class="mob-screen xs:block mdx:hidden">
      <v-main >
      <router-view/>
    </v-main>
    </div>
    
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>
