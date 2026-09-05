<template>
  <div class="flex min-h-screen flex-col">
    <SiteHeader />
    <main id="main-content" class="flex-1"><slot /></main>
    <SiteFooter />
    <CartDrawer />
    <LeadModal />
  </div>
</template>
