export function Profiles(){
    const profiles = ["rasmussen", "halpern", "clark", "dekker"]
    const p = profiles.map(pro => <a href={"..#/researcher/"+pro}><img src={"../img/"+pro+".jpg"} alt={pro}/></a>)
    return(
      <div className="profile-photo">
        {p}
      </div>
    )
  }