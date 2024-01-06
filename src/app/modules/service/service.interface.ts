type arrayOFString = string;

export type IService = {
  title: string;
  images: arrayOFString[];
  details: arrayOFString[];
};

export type IServiceFilterAbleFiled = { searchTerm?: string; title?: string };
