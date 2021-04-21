export default function logoutFunction() {
    var token = sessionStorage.getItem("token")
    let data = {
        'token': token
    }
    fetch('/app/darkmode', {
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
            
        })
}