export default function pfpUpdate(pfp, setPfp){
    console.log("here")
    var token = sessionStorage.getItem("token")
      let data = {
        'token' : token,
        'pfp' : pfp
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
            setPfp(res[2])
        })
}