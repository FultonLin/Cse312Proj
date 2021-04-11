export default function createCalendar(name, setRedirect, setIncorrect, setName){
    
    var token = sessionStorage.getItem("token")
    let data = {
        'name' : name,
        'token' : token,
      }
    fetch('/app/calendarcreate',{
        method: 'post',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.text())
        .then(data => {
            var res = JSON.parse(data)
            console.log(data)
            if(res.msg !== "Calendar name left blank"){
              setRedirect(true)
            }
            else{
              setIncorrect(true)
              setName("")
            }
        })
}