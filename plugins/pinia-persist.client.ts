import { createPersistedState } from "pinia-plugin-persistedstate";

export default defineNuxtPlugin(() => {
  const { $pinia } = useNuxtApp();

  if ($pinia && process.client) {
    $pinia.use(
      createPersistedState({
        storage: window.localStorage,
      })
    );
  }
});
