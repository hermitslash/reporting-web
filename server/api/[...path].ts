export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig();
  const proxyUrl = `${runtimeConfig.public.RS_BASE_URL}/api/${
    event.context.params!.path
  }`;
  return proxyRequest(event, proxyUrl);
});
