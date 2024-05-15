import { registerPlugins } from "@/plugins";

import App from "./App.vue";

import { createApp, h, provide } from "vue";

import { ApolloClientSetup } from "./graphql/apollo-client";
import { DefaultApolloClient } from "@vue/apollo-composable";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, ApolloClientSetup.init());
  },
  render: () => h(App),
});

registerPlugins(app);

app.mount("#app");
