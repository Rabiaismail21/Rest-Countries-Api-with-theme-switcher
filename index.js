// accessing target html elements
const dropDownIcon = document.querySelector(".dropdown-icon");
const upIcon = document.querySelector(".up-icon");
const searchRegion = document.querySelector(".search-region");
const regionOptionsMenu = document.querySelector(".region-options");
const filterRegion = document.querySelector(".filter-region");
const moonIcon = document.querySelector(".moon-icon");
const sunIcon = document.querySelector(".sun-icon");
const iconToggle = document.querySelector(".icon-toggle");
const themeText = document.querySelector(".theme-text");

// function to allow user to switch dark and light mode
const switchingTheme = () => {
    if (sunIcon.classList.contains("display-none"))
     {
      sunIcon.classList.remove("display-none");
      moonIcon.classList.add("display-none");
      themeText.innerText = "Light Mode";
      document.body.classList.add("bg-dark");
      document.body.classList.remove("bg-light");
    }
     else {
      moonIcon.classList.remove("display-none");
      sunIcon.classList.add("display-none");
      themeText.innerText = "Dark Mode";
      document.body.classList.remove("bg-dark");
      document.body.classList.add("bg-light");
    }
  };
  iconToggle.addEventListener("click", switchingTheme);

  // function to display region menu
const displayRegionOptions = () => {
    if (regionOptionsMenu.classList.contains("display-none")) {
      regionOptionsMenu.classList.remove("display-none");
      dropDownIcon.classList.add("display-none");
      upIcon.classList.remove("display-none");
    } else {
      regionOptionsMenu.classList.add("display-none");
      dropDownIcon.classList.remove("display-none");
      upIcon.classList.add("display-none");
    }
  };
  
searchRegion.addEventListener("click", displayRegionOptions);


const countryRegion = document.getElementsByClassName("region-name");
const regionNames = document.querySelectorAll(".region");

// function to display region name when user select from dropdown menu
regionNames.forEach((item) => {
    item.addEventListener("click", (e) => {
      let setregionName = e.target.innerText;
      let newRegionArr = Array.from(countryRegion);
      newRegionArr.forEach((elem) => {
        const parentElement = elem.closest(".country-card");
        if (
          (parentElement && parentElement.innerText.includes(item.innerText)) ||
          item.innerText === "All"
        ) {
          parentElement.style.display = "block";
          filterRegion.innerText = setregionName;
        } else {
          parentElement.style.display = "none";
        }
      });
    });
  });

  // function to display the country when user input the name

const inputText = document.querySelector(".input-text");
const searchIcon = document.querySelector(".search-icon");
const countryName = document.getElementsByClassName("country-name");

// function for input field
const userInput = () => {
  let enterText = inputText.value.trim();
  let firstLetter = enterText.charAt(0);
  let newLetter = firstLetter.toUpperCase();
  let remainWords = enterText.slice(1);
  let newWord = newLetter + remainWords;
  let countryArray = Array.from(countryName);

  if (enterText === "") {
    alert("Enter the country name");
  } else {
    countryArray.filter((name) => {
      if (name.innerText.includes(newWord)) {
        name.parentElement.style.display = "block";
      } else {
        name.parentElement.style.display = "none";
      }
    });
  }
};
inputText.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    userInput();
  }
});