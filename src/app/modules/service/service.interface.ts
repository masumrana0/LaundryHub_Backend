export type IService = {
  title: string;
  img: string;
  details: [];
  reviews: [{ name: string; review: string }];
};

export type IServiceFilterAbleFiled = { searchTerm?: string; title?: string };
