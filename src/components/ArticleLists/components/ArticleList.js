export function ArticleList({articles}){
    const a = articles.map((article) => <li><a href={"items/" + article.uri}>{article.title}</a></li>)
    return (
      <ul>
        {a}
      </ul>
    )
  }