class Router {
  constructor(routes) {
    this.routes = routes;
    this.icons = this.routes.reduce((prev, router) => {
      const { path, label, iconSrc } = router;
      if (router.path === "/") return prev;
      return [...prev, { path, label, iconSrc }];
    }, []);
  }

  render() {
    const route = this.routes.find(
      (value) => value.path === window.location.pathname
    );

    if (!route) {
      this.replaceTo("/");
      return;
    }

    document.querySelector("my-app").innerHTML = `${route.html}`;
  }

  navigateTo(url) {
    window.history.pushState(null, null, url);
    this.render();
  }

  replaceTo(url) {
    window.history.replaceState(null, null, url);
    this.render();
  }
}

const router = new Router([
  {
    path: "/",
    html: `<my-home tabindex="-1"></my-home>`,
    label: "Home",
    iconSrc: null,
  },
  {
    path: "/tetris",
    html: `<my-tetris></my-tetris>`,
    label: "Tetris",
    iconSrc: "/tetris.png",
  },
  {
    path: "/flappybird",
    html: `<my-flappybird></my-flappybird>`,
    label: "Flappy&nbsp;Bird",
    iconSrc: "/flappyBird.png",
  },
  {
    path: "/notepad",
    html: `<my-notepad></my-notepad>`,
    label: "Note&nbsp;Pad",
    iconSrc: "/notepad.png",
  },
]);

export default router;
