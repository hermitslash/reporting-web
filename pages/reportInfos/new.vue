<template>
    <section>
        <p class="text-2xl font-light">Add Report Info</p>
        <LazyNewReportInformation />
    </section>
</template>
<script setup>
definePageMeta({
  middleware: 'auth',
});
</script>