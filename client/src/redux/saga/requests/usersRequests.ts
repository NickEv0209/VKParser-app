const savedSettings = localStorage.getItem("parserSettings");
// @ts-expect-error is necessary
const settings = JSON.parse(savedSettings);

export const getUsers = async () => {
  return await window.electron.getUsers(settings);
  // return [
  //   {
  //     id: 1,
  //     name: "test",
  //     avatar: "test",
  //     link: "test",
  //     products: [
  //       {
  //         id: 1,
  //         title: "test",
  //         image: "Нет изображения",
  //         link: "test",
  //         user: {
  //           id: 1,
  //           name: "test",
  //           avatar: "test",
  //           link: "test",
  //         },
  //         isChecked: false,
  //       },
  //     ],
  //   },
  // ];
};
