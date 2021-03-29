

export default function loginCheck(username, password, setRedirect, setIncorrect, setUsername, setPassword){
    console.log("here")
    let data = {
        'username' : username,
        'password' : password
      }
    fetch('/app/login',{
        method: 'post',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.status)
        .then(data => {
            console.log(data)
            if(data === 200){
                setRedirect(true)
            }
            else{
                setIncorrect(true)
                setPassword("")
                setUsername("")
            }
        })
}