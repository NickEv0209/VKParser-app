const puppeteer = require("puppeteer");
const os = require("os");

const userName = os.userInfo().username;

const CHROME_PATH = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const USER_DATA_DIR = `C:/Users/${userName}/AppData/Local/Google/Chrome/User Data/Default/Network`;

async function launchBrowser(headless) {
  const browser = await puppeteer.launch({
    headless,
    executablePath: CHROME_PATH,
    userDataDir: USER_DATA_DIR,
  });

  const [page] = await browser.pages();
  await page.setViewport({ width: 1280, height: 720 });

  return { browser, page };
}

function setupPage(page, messagesCount, onParseData) {
  page.setRequestInterception(true);

  page.on("request", (request) => {
    if (request.url().includes("https://api.vk.com/method/messages.getHistory")) {
      const params = new URLSearchParams(request.postData());
      params.set("count", messagesCount);

      request.continue({
        method: "POST",
        postData: params.toString(),
        headers: request.headers(),
      });
    } else {
      request.continue();
    }
  });

  page.on("response", async (response) => {
    if (response.url().includes("messages.getHistory")) {
      const data = await response.json();
      onParseData({ ...data.response });
    }
  });
}

async function navigateToPage(page, pageLink, parseData, timeout = 0) {
  if (timeout > 120000) return;
  const newTimeout = timeout + 5000;
  console.log("Пытаюсь перейти на страницу - ", pageLink);

  await page
    .goto(pageLink, { waitUntil: "networkidle2", timeout: newTimeout })
    .catch(async () => {
      if (!parseData.length) {
        await navigateToPage(page, pageLink, parseData, newTimeout);
      }
    });
}

module.exports = { launchBrowser, setupPage, navigateToPage };
