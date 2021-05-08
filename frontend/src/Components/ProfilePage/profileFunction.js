

export default function ProfilePull(setUsername, setEmail, setDarkMode, setPfp){
    console.log("here")
    var token = sessionStorage.getItem("token")
      let data = {
          'token' : token,
        }
      fetch('/app/profile',{
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
            setUsername(res[0])
            setEmail(res[1])
            setDarkMode(res[2])
            setPfp(res[3])
        })
}