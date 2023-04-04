function SwupLocomotiveScrollPlugin() {
  this.name = 'SwupLocomotiveScrollPlugin';
  this.locomotiveScroll = null;
}

SwupLocomotiveScrollPlugin.prototype.mount = function () {
  this.locomotiveScroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
  });
  document.addEventListener('swup:contentReplaced', this.onContentReplaced.bind(this));
};

SwupLocomotiveScrollPlugin.prototype.unmount = function () {
  this.locomotiveScroll.destroy();
  document.removeEventListener('swup:contentReplaced', this.onContentReplaced.bind(this));
};

SwupLocomotiveScrollPlugin.prototype.onContentReplaced = function () {
  this.locomotiveScroll.update();
};

Swup.on('plugins:added', function () {
  Swup.addPlugin(new SwupLocomotiveScrollPlugin());
});

module.exports = SwupLocomotiveScrollPlugin;