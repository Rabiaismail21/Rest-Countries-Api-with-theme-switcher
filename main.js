const countriesContainer = document.querySelector(".countries-container");
let outerContainer = document.querySelector(".outer-container");


// fetching API data
async function fetchingData(url) {
    try {
      let response = await fetch(url);
      console.log(response.statusText);
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
      let data = await response.json();
      return data;
    } catch (error) {
      console.error(error.message);
    }
  }

//   function to show/hide the container of country detail
  function toggleContainer() {
    outerContainer.classList.toggle("toggle");
  }


//  arrow function to display the Api data 
  const displayCountriesCard = () => {
    fetchingData("https://restcountries.com/v3.1/all").then((data) => {
      for (let x = 0; x < data.length; x++) {
        const newCard = document.createElement("div");
        newCard.classList.add(
          "country-card",
          "light-country-card",
          "dark-country-card"
        );
        newCard.innerHTML = `
        <div class="country-flag">
        <img src="${data[x].flags.png}" alt="${data[x].name.common}flag">
        </div>
        <div class="country-name">
        ${data[x].name.common}</div>
        <div class="country-info">
        <h5 class="country-popu">
        Population: <span>${data[x].population.toLocaleString(
          "en-IN"
        )}</span></h5>
        <h5 class="country-region">
        Region: <span class="region-name">${data[x].region}</span></h5>
        <h5 class="country-capital">
        Capital: <span>${data[x].capital}</span></h5>
      </div>`;
        countriesContainer.append(newCard);
  
        // function to display the country detail
        const showCountryDetail = () => {

            // calling show/hide container function
          toggleContainer();
  
          // function to access country language
          function accessingLanguages() {
            const keys = Object.keys(data[x].languages);
  
            if (keys.length < 1) {
              return "object is empty";
            }
  
            const values = keys.map((key) => data[x].languages[key]);
            return values.join(", ");
          }
  
          // function to access country currency
          function accessingCurrency() {
            const currencies = data[x].currencies;
            const values = Object.values(currencies).map(
              (currency) => currency.name
            );
            return values;
          }
  
          // **************************************
          outerContainer.innerHTML = `
              <div class="country-detail-container">
              <button class="back-button back-dark-btn back-light-btn btn-text">
                <ion-icon name="arrow-back-outline" class="icon">
                </ion-icon>
                <p class="text">Back</p>
              </button>
              <div class="country-modal">
                <!-- country flag image -->
                <div id="country-flag">
                <img src="${data[x].flags.png}" alt="${data[x].name.common}flag">
                </div>
                <!-- country detail -->
                <div id="country-detail">
                  <h2 id="country-name">${data[x].name.common}</h2>
                  <div id="country-sub-detail">
                    <!-- left detail -->
                    <div id="left-detail">
                      <h5>
                        Native Name:
                        <span id="native-name">${data[x].name.official}</span>
                      </h5>
                      <h5>
                        Population:
                        <span id="country-popu">${data[
                          x
                        ].population.toLocaleString("en-IN")}</span>
                      </h5>
                      <h5>
                        Region:
                        <span id="region">${data[x].region}</span>
                      </h5>
                      <h5>
                        Sub Region:
                        <span id="sub-region">${data[x].subregion}</span>
                      </h5>
                      <h5>
                        Capital:
                        <span id="capital">${data[x].capital}</span>
                      </h5>
                    </div>
                    <!-- right detail -->
                    <div id="right-detail">
                      <h5>
                        Top Level Domain:
                        <span id="native-name">${data[x].tld}</span>
                      </h5>
                      <h5>
                        Currencies:
                        <span id="currency">${accessingCurrency()}</span>
                      </h5>
                      <h5>
                        Languages:
                        <span id="native-name">${accessingLanguages()}</span>
                      </h5>
                    </div>
                  </div>
                  <!-- border countries -->
                  <div id="country-borders">
                    <h4 id="sub-heading">Border Countries:</h4>
                    <div class="container">
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
            

            // function to access border countries with try/catch
          try {
            function accessingBorderCountries() {
              const border_countries = data[x].borders;
              const borderGroup = document.createElement("div");
              let borderBox;
              borderGroup.classList.add("border-group");
              let checkKey = "borders";
              if (checkKey in data[x]) {
                console.log(`exists`);
                border_countries.forEach((item) => {
                  borderBox = document.createElement("p");
                  borderBox.classList.add("border", "dark-border", "light-border");
                  borderBox.textContent = item;
                  borderGroup.appendChild(borderBox);
                });
              } else {
                console.log(`not exists`);
                const borderBox = document.createElement("p");
                borderBox.textContent = "No Borders";
                borderGroup.appendChild(borderBox);
              }
              return borderGroup.outerHTML;
            }
  
            // Then you can insert the dynamically generated HTML into your container
            const container = document.querySelector(".container");
            container.innerHTML = accessingBorderCountries();
          } catch (error) {
            console.log(error);
          }
        
        //   back button functionality
          let backButton = document.querySelector(".back-button");
          backButton.addEventListener("click", () => {
            toggleContainer();
          })
        };

        // event listener to show the detail of a country when a card is clicked
        newCard.addEventListener("click", showCountryDetail);
      }
    });
  };
  
  // calling function to display Api data of countries
  displayCountriesCard();