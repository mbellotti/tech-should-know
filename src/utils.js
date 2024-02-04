export function splitAuthors(authors){
    const a = authors.split(",")
    return a.map(author => author.trim())
}