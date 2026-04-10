module.exports = {
  WB: {
    title: "#reactContainers > div > div > div > div > div > div > div > h2",
    image:
      "#reactContainers > div > div > div > div > div > div > div > div > div > div > div img",
  },
  WB_ALT: {
    title: "h1",
    image: "img[src]",
  },
  OZON: {
    title: "[data-widget] h1",
    image: '[data-widget="webGallery"] > div > div > div > * ~ div img',
  },
  OZON_ALT: {
    title: '[data-widget="webOutOfStock"] > div > div > div > div > div > p',
    image: '[data-widget="webOutOfStock"] > div > div > div > div > div > img',
  },
  YANDEX: {
    title: "#cardContent h1",
    image: '[role="tablist"] img',
  },
};
