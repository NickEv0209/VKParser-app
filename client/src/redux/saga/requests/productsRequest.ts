const savedSettings = localStorage.getItem("parserSettings");

// @ts-expect-error is necessary
const settings = JSON.parse(savedSettings);

export const getProducts = async () => {
  return await window.electron.getProducts(settings);
  // return [
  //   {
  //     id: 1,
  //     title: "test",
  //     image: "Нет изображения",
  //     link: "test",
  //     user: {
  //       id: 1,
  //       name: "test",
  //       avatar: "test",
  //       link: "test",
  //     },
  //     isChecked: false,
  //   },
  // ];
};
