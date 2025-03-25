const currencySelects = document.querySelectorAll("select");
        const fromFlag = document.getElementById("from-flag");
        const toFlag = document.getElementById("to-flag");
        const amountInput = document.getElementById("amount");
        const convertedAmount = document.getElementById("converted-amount");
        const convertBtn = document.getElementById("convert-btn");

        const countries = {
            "USD": "us", "EUR": "eu", "GBP": "gb", "JPY": "jp", "CAD": "ca",
            "AUD": "au", "CNY": "cn", "INR": "in", "BRL": "br", "ZAR": "za"
        };

        for (const currency in countries) {
            currencySelects.forEach(select => {
                const option = document.createElement("option");
                option.value = currency;
                option.textContent = currency;
                select.appendChild(option);
            });
        }

        function updateFlag(select, flag) {
            flag.src = `https://flagcdn.com/w320/${countries[select.value]}.png`;
        }

        currencySelects.forEach(select => {
            select.addEventListener("change", (e) => {
                updateFlag(e.target, e.target.id === "from-currency" ? fromFlag : toFlag);
            });
        });

        convertBtn.addEventListener("click", () => {
            const fromCurrency = document.getElementById("from-currency").value;
            const toCurrency = document.getElementById("to-currency").value;
            const amount = amountInput.value;

            fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
                .then(res => res.json())
                .then(data => {
                    const rate = data.rates[toCurrency];
                    convertedAmount.value = (amount * rate).toFixed(2);
                })
                .catch(error => console.error("Error fetching exchange rates:", error));
        });