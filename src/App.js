import router from "./core/Router";

export default class App extends HTMLElement {
  connectedCallback() {
    router.render();
    window.addEventListener("popstate", () => router.render());
  }
}
