export default function joinCalendar(name, setGoHome) {
  var token = sessionStorage.getItem("token")
  console.log(name)
  let data = {
    'token': token,
    'name': name
  }
  fetch('/app/calendar/join', {
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
      setGoHome(true)
    })
}