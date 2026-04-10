const { launchBrowser, setupPage, navigateToPage } = require("./services/browser");
const { getUsers, getLinks } = require("./services/vk-parser");
const { scrapeProducts } = require("./services/product-scraper");

let parseData = [];

async function runParser(settings) {
  const { pageLink, messagesCount, headless } = settings;

  if (!pageLink.length) {
    const { browser } = await launchBrowser(headless);
    await browser.close();
    return { error: "Введите ссылку на диалог" };
  }

  const { browser, page } = await launchBrowser(headless);

  setupPage(page, messagesCount, (data) => {
    parseData.push(data);
  });

  await navigateToPage(page, pageLink, parseData);

  const users = getUsers(parseData[0].profiles);
  const links = getLinks(parseData[0].items);
  const usersWithProducts = await scrapeProducts(page, links, users);

  await browser.close();
  return usersWithProducts;
}

function resetParseData() {
  parseData = [];
}

module.exports = { runParser, resetParseData };
