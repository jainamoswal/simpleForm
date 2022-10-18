const form = document.getElementById('myForm');
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);
    fetch("https://mywebsite.dev", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        form.reset();
        grecaptcha.reset();
        document.getElementById('mySubmitBtn').disabled = true;
    })
});

function enableBtn() {
    document.getElementById('mySubmitBtn').disabled = false;
}
function disableBtn() {
    document.getElementById('mySubmitBtn').disabled = true;
}