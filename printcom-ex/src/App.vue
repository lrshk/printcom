<template>
  <header>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-menu">
        <RouterLink to="/" class="navbar-item">Home</RouterLink>
        <RouterLink to="/cart" class="navbar-item">Cart</RouterLink>
      </div>
    </nav>
  </header>
  <main class="container">
    <RouterView />
  </main>
</template>
