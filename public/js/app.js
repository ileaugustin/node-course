const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const msg1 = document.querySelector("#msg-1");
const msg2 = document.querySelector("#msg-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    msg1.textContent = "loading..."
    msg2.textContent = "";

    const location = searchElement.value;

    fetch("http://localhost:3000/weather?address=" + location)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    msg1.textContent = data.error;
                    msg2.textContent = ""
                    return;
                }

                msg1.textContent = data.location;
                msg2.textContent = data.forecast
            })
        })
})