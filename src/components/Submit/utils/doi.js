import { updateMarkup } from './form';

const validDOI = function(doi){
    const r = /10.\d{4,9}\/[-._;()/:A-Z0-9]+/gi
    return doi.match(r) != null
}

export async function getReferences(value, markup){
    if (!validDOI(value.doi)){
        return
    }

    let references = []
    const url = "https://api.crossref.org/works/"+value.doi
    const response = await fetch(url);
    try{
        const data = await response.json(); //If not available returns "Resource not found."
        references = data["message"]["reference"]
        .filter(r=>validDOI(r["doi"])) // No DOI, throw out
        .map(r => {
            let title = r["article-title"] || r["volume-title"]
            return({"cite":title, "doi":r["key"]})
        });
    }catch(error){
        console.log(error)
        return
    }finally{
        value.references = references
        updateMarkup(value, markup)
    }
}