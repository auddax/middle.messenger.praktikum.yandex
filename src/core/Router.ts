import Block from './Block';
import Route from './Route';

class Router {
  private static __instance: Router;

  private routes: Route[] | undefined;

  private history: History | undefined;

  private _currentRoute: null | Route = null;

  private readonly _rootQuery: string | undefined;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes?.push(route);

    return this;
  }

  start() {
    // window.onpopstate = ((event) => {
    //   this._onRoute(event?.currentTarget?.location?.pathname);
    // });
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    let route = this.getRoute(pathname);
    if (!route) {
      route = this.getRoute('/not-found');
      if (route) route.render();
      return;
    }

    this._currentRoute = route;
    route.navigate(pathname);
  }

  go(pathname: string) {
    this.history?.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history?.back();
  }

  forward() {
    this.history?.forward();
  }

  getRoute(pathname: string) {
    return this.routes?.find((route) => route.match(pathname));
  }
}

export default Router;
