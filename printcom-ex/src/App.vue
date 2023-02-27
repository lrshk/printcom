<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/cart">Cart</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
}
</style>
