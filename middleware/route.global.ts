export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== from.path && import.meta.client) {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    console.log("Scroll to top");
  }
});