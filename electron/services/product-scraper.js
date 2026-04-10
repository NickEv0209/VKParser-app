const SELECTORS = require("../config/selectors");

async function waitForPageLoad(page, link) {
  switch (true) {
    case link.includes("wildberries"): {
      await page
        .waitForSelector(SELECTORS.WB.image, { timeout: 3000 })
        .catch(() => {
          console.log("WB: основной селектор не найден, пробую alt...");
        });
      break;
    }
    case link.includes("yandex.market"): {
      await page
        .waitForSelector(SELECTORS.YANDEX.image, { timeout: 3000 })
        .catch(() => {
          return;
        });
      break;
    }
    case link.includes("ozon"): {
      await page
        .waitForSelector(SELECTORS.OZON.image, { timeout: 3000 })
        .catch(() => {
          console.log("что-то пошло не так с ozon");
          return;
        });
      break;
    }
  }
}

async function scrapeProductData(page) {
  return page.evaluate((SELECTORS) => {
    const hostname = window.location.hostname;
    const selectors = {};

    if (hostname.includes("wildberries")) {
      Object.assign(selectors, SELECTORS.WB);
    } else if (hostname.includes("yandex.market")) {
      Object.assign(selectors, SELECTORS.YANDEX);
    } else if (hostname.includes("ozon")) {
      Object.assign(selectors, SELECTORS.OZON);
    }

    const title =
      document.querySelector(selectors.title)?.textContent ||
      document.querySelector("h1")?.innerText ||
      "Товар не найден";

    const image =
      document.querySelector(selectors.image)?.src ||
      [...document.images].find(
        (img) => img.naturalHeight >= 200 && img.naturalWidth >= 200
      )?.src ||
      "Нет изображения";

    return { title, image, link: window.location.href };
  }, SELECTORS);
}

async function scrapeProducts(page, allLinks, allUsers) {
  const products = [];

  for (const { userID, links } of allLinks) {
    for (const link of links) {
      await page.goto(link);
      await page.setJavaScriptEnabled(true);
      await page.setDefaultNavigationTimeout(0);
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
      );
      await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, "webdriver", {
          get: () => false,
        });
      });

      try {
        await waitForPageLoad(page, link);
        const data = await scrapeProductData(page);

        products.push({
          userID: Number(userID),
          id: Date.now(),
          isActive: false,
          ...data,
        });
      } catch (error) {
        console.error("Ошибка при парсинге товара - ", error);
      }
    }
  }

  return allUsers.map((user) => ({
    ...user,
    products: products.filter((product) => product.userID === user.id),
  }));
}

module.exports = { scrapeProducts };
