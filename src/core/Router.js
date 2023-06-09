import routes, { BASE_URL } from '../utils/routes';

class Router {
  constructor(route) {
    this.routes = route;
  }

  pathToRegexp(path) {
    return new RegExp(`^${path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)')}$`);
  }

  render() {
    const currentPath = window.location.pathname;
    const route = this.routes.find((value) => {
      return this.pathToRegexp(this.getUrlFrom(value.path)).test(currentPath);
    });

    if (!route) {
      this.replaceTo('/');
      return;
    }

    document.querySelector('#page').innerHTML = route.html.replace(':id', this.getIdFromPath(currentPath));
  }

  getIdFromPath(path) {
    return path.match(/\d+/)?.[0];
  }

  navigateTo(url) {
    if (this.getUrlFrom(url) === window.location.pathname) return;
    window.history.pushState(null, null, BASE_URL + url);
    this.render();
  }

  replaceTo(url) {
    window.history.replaceState(null, null, BASE_URL + url);
    this.render();
  }

  getUrlFrom(url) {
    return `${BASE_URL}${url}`;
  }

  back() {
    window.history.back();
    this.render();
  }
}

const router = new Router(routes);

export default router;
