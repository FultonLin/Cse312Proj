

export default function createCheck(username,email,password, setRedirect, setIncorrect, setUsername, setEmail){
    
    let data = {
        'username' : username,
        'email' : email,
        'password' : password
      }
    fetch('/app/create',{
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
            if(res.token !== undefined){
              console.log(res.token)
              sessionStorage.setItem("token", res.token)
              setRedirect(true)
            }
            else{
                setIncorrect(true)
                setEmail("")
                setUsername("")
            }
        })
}