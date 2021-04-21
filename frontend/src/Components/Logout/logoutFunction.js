export default function logoutFunction(setGoLogin) {
    var token = sessionStorage.getItem("token")
    sessionStorage.clear();
    let data = {
        'token': token
    }
    fetch('/app/logout', {
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
            setGoLogin(true)
        })
}