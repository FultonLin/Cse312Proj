import CalendarBubble from './lobbyComponents/CalendarBubble'
export default function joinedCalenadar(name, setName){
    
    var token = sessionStorage.getItem("token")
    let data = {
        'token' : token,
      }
    fetch('/app/lobby',{
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
            if(res.msg !== "incorrect"){
              setRedirect(true)
            }
            else{
              setIncorrect(true)
              setName("")
            }
        })
}