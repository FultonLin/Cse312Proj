

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
        .then(response => response.status)
        .then(data => {
            console.log(data)
            if(data === 200){
                setRedirect(true)
            }
            else{
                setIncorrect(true)
                setEmail("")
                setUsername("")
            }
        })
}