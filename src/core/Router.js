import routes from '../utils/routes';

const BASE_URL = process.env.NODE_ENV === 'development' ? '' : '/js-sandbox';

class Router {
  constructor(route) {
    this.routes = route;
  }

  render() {
    const route = this.routes.find((value) => value.path === window.location.pathname.replace(BASE_URL, ''));

    if (!route) {
      this.replaceTo('/');
      return;
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
