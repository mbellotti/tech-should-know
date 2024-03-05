export function ArticleTags({tags}) {
    const t = tags.map(tag => <span class="badge rounded-pill bg-secondary m-2"><a href={"../#/tag/"+tag}>{tag}</a></span>)
    return(
      <div className="tagGroup">
        {t}
      </div>
    )
  }