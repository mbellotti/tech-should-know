
export function Extras({references, works}) {
    const r = references.map( ref => <li><a href={"https://www.doi.org/" + ref.doi}>{ref.cite}</a></li>)
    const w = works.map( link => <li><a href={link.link_url}>{link.link_title}</a></li>)
    
    return(
  <div class="accordion accordion-flush" id="extra">
    <div class="accordion-item">
      <h2 class="accordion-header" id="extra-read-more-heading">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#extra-read-more" aria-expanded="true" aria-controls="extra-read-more">
          Read More
        </button>
      </h2>
      <div id="extra-read-more" class="accordion-collapse show" aria-labelledby="extra-read-more-heading" data-bs-parent="#extra">
        <div class="accordion-body"><ul>{w}</ul></div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="extra-reference-heading">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#extra-reference" aria-expanded="false" aria-controls="extra-reference">
          References
        </button>
      </h2>
      <div id="extra-reference" class="accordion-collapse collapse" aria-labelledby="extra-reference-heading" data-bs-parent="#extra">
        <div class="accordion-body"><ul>{r}</ul></div>
      </div>
    </div>
  </div>
    )
  }