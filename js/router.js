export class Router {
  constructor(routes, defaultRoute = '#/home') {
    this.routes = routes;
    this.defaultRoute = defaultRoute;
    this.currentPage = null;

    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('DOMContentLoaded', () => this.handleRoute());
  }

  handleRoute() {
    const hash = window.location.hash || this.defaultRoute;
    const matchedRoute = this.matchRoute(hash);

    if (matchedRoute) {
      this.updateSidebarActive(matchedRoute.name);
      matchedRoute.handler();
    } else {
      window.location.hash = this.defaultRoute;
    }
  }

  matchRoute(hash) {
    // Normalizes hash to match defined routes
    for (const route of this.routes) {
      if (route.path === hash || (route.path.endsWith('*') && hash.startsWith(route.path.slice(0, -1)))) {
        return route;
      }
    }
    return null;
  }

  updateSidebarActive(pageName) {
    const navItems = document.querySelectorAll('.sidebar-menu-item');
    navItems.forEach(item => {
      if (item.getAttribute('data-page') === pageName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
}
