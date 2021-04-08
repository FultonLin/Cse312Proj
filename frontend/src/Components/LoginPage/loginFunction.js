

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
        .then(response => response.text())
        .then(data => {
            var res = JSON.parse(data)
            if(res.token !== undefined){
              sessionStorage.setItem("token", res.token)
              setRedirect(true)
            }
            else{
                console.log(res)
                setIncorrect(true)
                setPassword("")
                setUsername("")
            }
        })
}