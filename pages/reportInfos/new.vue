<template>
    <section>
        <p class="text-2xl font-light">Add Report Info</p>
        <NewReportInformation />
    </section>
</template>
<script setup>
definePageMeta({
  middleware: 'auth',
});
</script>