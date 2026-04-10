const { contextBridge } = require("electron");
const { runParser, resetParseData } = require("./index");

let cachedUsers = [];
let cachedProducts = [];

async function updateData(settings) {
  cachedUsers = await runParser(settings).catch(() => {
    console.log("какая-то ошибка");
    cachedUsers = localStorage.getItem("users");
    return JSON.parse(cachedUsers) ?? [];
  });

  const getProducts = (users) => {
    const products = [];
    users.forEach((user) => {
      user.products.forEach((prod) => {
        products.push({
          ...prod,
          user: {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            link: user.link,
          },
        });
      });
    });
    return products;
  };

  cachedProducts = getProducts(cachedUsers);

  localStorage.setItem("users", JSON.stringify(cachedUsers));
  localStorage.setItem("products", JSON.stringify(cachedProducts));
}

contextBridge.exposeInMainWorld("electron", {
  getUsers: async () => {
    cachedUsers = localStorage.getItem("users");
    return JSON.parse(cachedUsers) ?? [];
  },
  getProducts: async () => {
    cachedProducts = localStorage.getItem("products");
    return JSON.parse(cachedProducts) ?? [];
  },
  updateData: async (settings) => {
    resetParseData();
    console.log(settings);
    await updateData(settings);
    console.log("Данные обновлены");
  },
});
