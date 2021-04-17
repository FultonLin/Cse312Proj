

export default function DarkModeFunction(darkMode){
    console.log(darkMode)
    console.log("here")
    darkMode= !darkMode
    var token = sessionStorage.getItem("token")
      let data = {
          'token' : token,
          'darkmode': darkMode
        }
      fetch('/app/darkmode',{
        method: 'post',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.text())
        .then(data => {
            console.log(data)
            
        })
}