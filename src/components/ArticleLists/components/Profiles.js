export function Profiles(){
    const profiles = ["rasmussen", "halpern", "clark", "dekker"]
    const p = profiles.map(pro =>  <div className="profile-photo"><a href={"..#/researcher/"+pro}><img src={"../img/"+pro+".jpg"} alt={pro} className="img-fluid"/></a></div>)
    return(
      <div className="profile-photo-block clearfix">
        {p}
      </div>
    )
  }