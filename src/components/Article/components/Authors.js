export function Authors({authors}){
    if(authors.length > 1){
      return <h4>{authors.join(", ")}</h4>
    }
    return <h2>{authors[0]}</h2>
  }