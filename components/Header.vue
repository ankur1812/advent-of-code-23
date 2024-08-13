<template>
  <header>
    <h2>
      <NuxtLink to="/"> Code Solver / Advent of Code '23 </NuxtLink>
    </h2>
    <div class="links">
      <NuxtLink to="/day/1"> Day 1 </NuxtLink>
      <NuxtLink to="/day/2"> Day 2 </NuxtLink>
      <NuxtLink to="/day/3"> Day 3 </NuxtLink>
    </div>
  </header>
</template>

<style scoped>
h2 a {
  text-decoration: none;
}
.links {
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
}
</style>
