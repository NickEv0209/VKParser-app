const { contextBridge } = require("electron");
const puppeteer = require("puppeteer");
const os = require("os");

const userName = os.userInfo().username;

let parseData = [];
const SELECTORS = {
  WB: {
    title: '.product-page__title',
		image: '.slide__content img',
	},
	OZON: {
    title: '[data-widget] h1',
		image: '[data-widget="webGallery"] > div > div > div > * ~ div img',
	},
	OZON_ALT: {
    title: '[data-widget="webOutOfStock"] > div > div > div > div > div > p',
		image: '[data-widget="webOutOfStock"] > div > div > div > div > div > img',
	},
	YANDEX: {
    title: '#cardContent h1',
		image: '[role="tablist"] img',
	},
};

const main = async (settings) => {
console.log('Начинаю парсинг с настройками - ', settings)

  const { pageLink, messagesCount, headless } = settings;

  const executablePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";
  const userDataDir = `C:/Users/${userName}/AppData/Local/Google/Chrome/User Data/Default/Network`;

  const browser = await puppeteer.launch({
    headless,
    executablePath,
    userDataDir,
  });
  
  const [page] = await browser.pages()
  await page.setViewport({ width: 1280, height: 720 });

  const getResponse = async () => {
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (request.url().includes('https://api.vk.com/method/messages.getHistory')) {
        const params = new URLSearchParams(request.postData());
        params.set('count', messagesCount);
  
        request.continue({
          method: 'POST',
          postData: params.toString(),
          headers: request.headers(),
        });
      } else {
        request.continue();
      }
    });
  
    page.on('response', async response => {
      if (response.url().includes('messages.getHistory')) {
        const data = await response.json();
        parseData.push({...data.response})
      }
    });
  };

  if (!settings.pageLink.length) {
    await browser.close();
    return {error: 'Введите ссылку на диалог'};
  };


  const pageGoto = async (pageLink, timeout = 0) => {
    if(timeout > 120000) return []
    timeout += 5000;
    console.log('Пытаюсь перейти на страницу - ', pageLink)
    await page.goto(settings.pageLink, {waitUntil: 'networkidle2', timeout})
    .catch(async () => {
      !parseData.length && await pageGoto(pageLink, timeout);
    });
  };

  await getResponse();

  console.log(parseData)

  await pageGoto(pageLink);

  const getUsers = () => {
    const profiles = parseData[0].profiles;
    return profiles.map(({ id, first_name, last_name, photo_base }) => ({
      id,
      name: `${first_name} ${last_name}`,
      avatar: photo_base,
      link: `https://vk.com/im/convo/${id}`
    }));
  };

  const getLinks = async () => {
    const allLinks = [];

    const items = parseData[0].items;
    const processFwdMessage = (mess) => {
        const textLink = mess.text.match(/https?:\/\/[^\s]+/g)?.[0];
        const links = mess.attachments
            .map(attach => (attach.hasOwnProperty('link') ? attach.link.url : null))
            .filter(Boolean);

        if (textLink && !links.includes(textLink)) {
            links.push(textLink);
        }

        if (mess.hasOwnProperty('fwd_messages')) {
            mess.fwd_messages.forEach(processFwdMessage);
        }

        allLinks.push({ userID: mess.from_id, links });
    };

    const processMessage = (item) => {
        const textLink = item.text.match(/https?:\/\/[^\s]+/g)?.[0];
        const links = item.attachments
            .map(attach => (attach.hasOwnProperty('link') ? attach.link.url : null))
            .filter(Boolean);

        if (textLink && !links.includes(textLink)) {
            links.push(textLink);
        }

        allLinks.push({ userID: item.from_id, links });
    };

    for (const item of items) {
      processMessage(item);
      item.fwd_messages.forEach(mess => {
          processFwdMessage(mess);
      });
    }

    const mergedLinks = {};
    allLinks.forEach(({ userID, links }) => {
        if (!mergedLinks[userID]) {
            mergedLinks[userID] = new Set(links);
        } else {
            links.forEach(link => mergedLinks[userID].add(link));
        }
    });

    const uniqueLinks = Object.entries(mergedLinks).map(([userID, links]) => ({
        userID,
        links: Array.from(links),
    }));

    return uniqueLinks;
  };

  const getProducts = async () => {
    const products = [];
    for (const { userID, links } of allLinks) {
      for (const link of links) {
        await page.goto(link);
        await page.setJavaScriptEnabled(true);
        await page.setDefaultNavigationTimeout(0);
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36');
        await page.evaluateOnNewDocument(() => {
          Object.defineProperty(navigator, 'webdriver', {
            get: () => false,
          });
        });
        try {
          switch(true) {
            case link.includes('wildberries'): {
              await page.waitForSelector(SELECTORS.WB.image, {timeout: 5000})
              .catch(() => {return})
              break;
            }
            case link.includes('yandex.market'): {
              await page.waitForSelector(SELECTORS.YANDEX.image, {timeout: 5000})
              .catch(() => {return})
              break;
            }
            case link.includes('ozon'): {
              await page.waitForSelector(SELECTORS.OZON.image, {timeout: 5000})
              .catch(() => {return})
              break;
            }
          }
        
          const data = await page.evaluate((SELECTORS) => {
            const title =
              document.querySelector(SELECTORS.WB.title)?.textContent
              || document.querySelector(SELECTORS.YANDEX.title)?.textContent
              || document.querySelector(SELECTORS.OZON.title)?.textContent
              || document.querySelector(SELECTORS.OZON_ALT.title)?.textContent
              || "Товар не найден";
  
            const image =
              document.querySelector(SELECTORS.WB.image)?.src
              || document.querySelector(SELECTORS.YANDEX.image)?.src
              || document.querySelector(SELECTORS.OZON.image)?.src
              || document.querySelector(SELECTORS.OZON_ALT.image)?.src
              || "Нет изображения";
  
            const link = window.location.href;
  
            return { title, image, link };
          }, SELECTORS);

          products.push({ userID: Number(userID), id: Date.now(), isActive: false, ...data });
        } catch (error) {
          console.error('Ошибка при парсинге товара - ', error);
        }
      }
    }

    const users = allUsers.map(user => ({
      ...user,
      products: products.filter(product => product.userID === user.id)
    }));
    await browser.close();

    return users;
  };

  const allUsers = await getUsers();
  const allLinks = await getLinks();

  return await getProducts();
}

let cachedUsers = [];
let cachedProducts = [];

async function updateData(settings) {
  cachedUsers = await main(settings)
  .catch(() => {
    console.log('какая-то ошибка')
    cachedUsers = localStorage.getItem('users')
    return JSON.parse(cachedUsers) ?? [];
  });
  
  const getProducts = (users) => {
    const products = [];
    users.forEach(user => {
      user.products.forEach(prod => {
        products.push({
          ...prod,
          user: {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            link: user.link,
          }
        });
      });
    });
    return products;
  };

  cachedProducts = getProducts(cachedUsers);

  localStorage.setItem('users', JSON.stringify(cachedUsers))
  localStorage.setItem('products', JSON.stringify(cachedProducts))
}

contextBridge.exposeInMainWorld('electron', {
  getUsers: async () => {
    cachedUsers = localStorage.getItem('users')
    return JSON.parse(cachedUsers) ?? [];
  },
  getProducts: async () => {
    cachedProducts = localStorage.getItem('products')
    return JSON.parse(cachedProducts) ?? [];
  },
  updateData: async (settings) => {
    parseData = [];
    console.log(settings)
    await updateData(settings);
    console.log('Данные обновлены')
  }
});
