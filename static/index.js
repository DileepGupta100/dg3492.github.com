import Home from "./view/Home.js"
import About from "./view/About.js"
const routes = [
    { path: "/", view: Home },
    { path: "/about", view: About },
];

const route = () => {
    const matchedRoutes = routes.map(({ path, view }) => {
        return {
            match: location.pathname == path,
            path,
            view
        }
    });
    const matched = matchedRoutes.filter(r => r.match);
    const app = document.getElementById("app");
    const view = new matched[0].view();
    app.innerHTML = view.getHtml();
}

const navigateTo = (url) => {
    history.pushState(null, null, url);
    route();
}
const anchor = document.getElementsByTagName("a");
Array.from(anchor).forEach(element => {
    element.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo(e.target.href);
    });
})

document.addEventListener("DOMContentLoaded", () => {
    route();
    // register service worker
    if (navigator.serviceWorker) {
        navigator.serviceWorker
            .register("./sw_cache_ex.js")
            .then(reg => console.log('sw registerd! ', reg))
            .catch(err => console.log('Sw error ', err))
    }
    observeDom();
})

// mutation observer
function observeDom() {
    const app = document.getElementById("app");
    const callback = (mutatioList, observer) => {
        console.log('mutationList ', mutatioList)
        console.log('observer ', observer)
    }
    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver(callback);
    observer.observe(app, config);
}