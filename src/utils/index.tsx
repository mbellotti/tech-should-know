export function splitAuthors(authors: string) {
  if (authors == undefined) {
    return [];
  }

  const a = authors.split(",");
  return a.map((author) => author.trim());
}
