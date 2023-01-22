import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import { API_URL } from '@env';

interface IGetTodayMenu {
  groupId: string;
}

export interface IMenuLunchSet {
  id: string;
  price: number;
  lunchSetList: string[];
}

export interface IMenuOption {
  id: string;
  name: string;
  price: number;
}

export interface IMenu {
  id: string;
  date: Date;
  lunchSets: IMenuLunchSet[];
  options: IMenuOption[];
}

const menuApi = createApi({
  reducerPath: 'menu/api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/Menu/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: ({ mutation, query }) => ({
    getTodayMenu: query<IMenu, IGetTodayMenu>({
      query: ({ groupId }) => ({
        url: 'GetTodayMenu',
        params: { groupId }
      })
    }),
    uploadMenu: mutation<void, void>({
      query: () => ({
        url: 'UploadMenu',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          "menu": [
            "Обед за 220₽🤩",
            "📌 Салат «Пестрый крабик» (болгарский перец, яйцо, огурцы свежие, морковь, рис, кукуруза, крабовое мясо, майонез)",
            "📌 Суп «Борщ наваристый с курицей и сметаной»",
            "📌Шницель мясной с гречей в томатном соусе",
            "",
            "Обед за 240₽☺️",
            "📌 Салат «Пестрый крабик»",
            "📌 Суп «Борщ наваристый с курицей и сметаной»",
            "📌 Плов восточный с традиционными специями с курицей",
            "",
            "Обед за 260₽ 😍",
            "📌 Салат «Пестрый крабик»",
            "📌 Суп «Борщ наваристый с курочкой и сметаной»",
            "📌 Филе гриль в маринаде со спагетти",
            "",
            "📌 Замена салата на ",
            "«Цезарь» +10₽",
            "📌 Замена салата на «Русская красавица» +15₽ (томаты, огурец, яйцо, ветчина, курочка копчёная, горошек, майонез)",
            "",
            "📌Пицца «Ассорти» 65₽",
            "📌Пицца «Деревенская» 70₽",
            "📌Пирожок с картошкой 45₽",
            "📌Беляш с мясом 50₽",
            "🥤Морс 0,5 80₽",
            "🥤Компот из сухофруктов 80₽",
            "",
            "К каждому обеду прилагается хлеб, комплект одноразовых приборов, салфетки.🍴",
            "",
            "Приятного аппетита и хорошего Вам дня!☺️",
            "С ❤️Ваша Столовая «Самоварчик»"
          ],
          "groupId": "d38a8875-0b00-4efd-97ae-fd688ffacebc"
        }
      })
    })
  })

});

export const { useGetTodayMenuQuery, useLazyGetTodayMenuQuery, useUploadMenuMutation } = menuApi;

export default menuApi;