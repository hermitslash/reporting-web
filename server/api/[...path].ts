export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig();
  const proxyUrl = `${runtimeConfig.public.RS_BASE_URL + event.path}`;
  return proxyRequest(event, proxyUrl);
});
