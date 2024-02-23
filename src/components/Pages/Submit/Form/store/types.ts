export type Article = {
  authors: string[];
  title: string;
  uri: string;
};

export type Note = { text: string; id: number };
export type Reference = { cite: string; doi: string };
export type SubmissionBy = { name: string; link: string };
export type Work = { link_title: string; link_url: string };
export type Tag = { text: string; value: number; items: Article[] };

export type ArticleStore = {
  abstract: string;
  article: string;
  content: string;
  links: { link_title: string; link_url: string }[];
  notes: Note[];
  paperName: string;
  authors: string[];
  permalink: string;
  references: Reference[];
  submissionBy: { name: string; link: string };
  tags: string[];
  title: string;
};

export type ArticleParams = {
  abstract?: string;
  article?: string;
  content?: string;
  doi?: string;
  title?: string;
  authors?: string;
  submitName?: string;
  submitLink?: string;
  tags?: string[];
  links?: { link_title: string; link_url: string }[];
};
