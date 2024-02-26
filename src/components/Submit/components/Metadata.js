import { updateMarkup } from '../utils/form';
import { getReferences } from '../utils/doi';

export function ArticleMetaData({value, markup}){
    const handleChange = (event) => {
        switch (event.target.id){
            case "paperName":
                value.current.paperName = event.target.value
                updateMarkup(value.current, markup)
                return
            case "paperAuthor":
                value.current.paperAuthor = event.target.value
                updateMarkup(value.current, markup)
                return
            case "submitName":
                value.current.submitName = event.target.value
                updateMarkup(value.current, markup)
                return
            case "submitLink": 
                value.current.submitLink = event.target.value
                updateMarkup(value.current, markup)
                return
            case "doi": 
                value.current.doi = event.target.value
                getReferences(value.current, markup)
                return
        }
      };
    

    return (
        <>
        <div class="input-group my-2">
            <input class="form-control form-control-lg generator" type="text" id="paperName" name="paperName" placeholder="Name of paper" onBlur={handleChange} defaultValue={value.current.paperName} />
            </div>
            <div class="input-group my-2">
            <input class="form-control form-control-lg generator" type="text" id="paperAuthor" name="paperAuthor" placeholder="Author(s) comma seperated" onBlur={handleChange} defaultValue={value.current.paperAuthor}/>
            </div>
            <div class="input-group my-2">
            <input class="form-control form-control-lg generator" type="text" id="doi" name="doi" placeholder="DOI Number" onBlur={handleChange} defaultValue={value.current.doi} />
            </div>
            <div class="input-group my-1">
            <input class="form-control form-control-lg generator" type="text" id="submitName" name="submitName" placeholder="Your Name" onBlur={handleChange} defaultValue={value.current.submitName} />
            </div>
            <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text">https://</span>
  </div>
  <input type="text" class="form-control generator" aria-label="link to submitter's profile" id="submitLink" name="submitLink" placeholder="Link back to you" onBlur={handleChange} defaultValue={value.current.submitLink}/>
</div>
        </>
    )
}