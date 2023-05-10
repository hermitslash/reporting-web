<template>
  <LazyNotificationList />
</template>
<script setup>
definePageMeta({
  middleware: 'isAdmin',
});
</script>
