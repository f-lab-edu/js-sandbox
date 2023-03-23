import routes from '../utils/routes';

class Router {
  constructor(route) {
    this.routes = route;
  }

  render() {
    const route = this.routes.find((value) => value.path === window.location.pathname);

    if (!route) {
      this.replaceTo('/');
      return;
    }

    document.querySelector('#page').innerHTML = route.html;
  }

  navigateTo(url) {
    window.history.pushState(null, null, url);
    this.render();
  }

  replaceTo(url) {
    window.history.replaceState(null, null, url);
    this.render();
  }

  back() {
    window.history.back();
    this.render();
  }
}

const router = new Router(routes);

export default router;
