import routes from '../utils/routes';

const BASE_URL = process.env.NODE_ENV === 'development' ? '' : '/js-sandbox';

class Router {
  constructor(route) {
    this.routes = route;
  }

  pathToRegexp(path) {
    return new RegExp(`^${path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)')}$`);
  }

  render() {
    const route = this.routes.find(
      (value) => window.location.pathname.replace(BASE_URL, '').match(this.pathToRegexp(value.path)) !== null
    );

    if (!route) {
      this.replaceTo('/');
      return;
    }

    if (route.path.includes('/:id')) {
      const id = window.location.pathname.replace(BASE_URL, '').match(/\d+/)[0];
      route.html = route.html.replace(`${route.tag}`, `${route.tag} id="${id}"`);
    }

    document.querySelector('#page').innerHTML = route.html;
  }

  navigateTo(url) {
    window.history.pushState(null, null, BASE_URL + url);
    this.render();
  }

  replaceTo(url) {
    window.history.replaceState(null, null, BASE_URL + url);
    this.render();
  }

  back() {
    window.history.back();
    this.render();
  }
}

const router = new Router(routes);

export default router;
