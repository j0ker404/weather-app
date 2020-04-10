let cityList = [];
// parallel arrays
let cityNames = [];
let cityIds = [];

// filter out name 
let nameFilter = function (array) {
    return (array.name).toLocaleLowerCase();
}

// filter out id 
let idFilter = function (array) {
    return array.id;
}

// fill up cityList
// make a request
axios.get('/city.list.json')
    .then(function (response) {
        // handle success
        // console.log('success');
        // console.log(response.data);

        // fill up arrays
        cityList = response.data;
        cityNames = cityList.map(nameFilter);
        cityIds = cityList.map(idFilter);
    })
    .catch(function (error) {
        console.log("Error loading city list");
        console.log(error);
    });


// main code
/**
 * openweathermap api must be used here
 */
const apiKey = "add-api-key-here";


let updateResults = false;
let searchbar = document.getElementById("searchbar");

/**
 * Function calls
 */
let update = function () {
    // console.log(searchbar.value);
    let id;
    let val = searchbar.value;
    val = (val.trim().toLocaleLowerCase()).split(" ").join(" ");
    // searchbar.value = "";
    let match = function (value) {
        return value === val;
    }
    index = cityNames.findIndex(match);
    // console.log(index);
    // if index exists
    if (index !== -1) {
        id = cityIds[index];
        // units=metric
        // perfom get request
        const base = "https://api.openweathermap.org/data/2.5/weather?";
        let unit = "units=metric";
        let idStr = "id=" + id;
        let apiStr = "appid="+apiKey;
        let url = base + idStr + "&" + apiStr + "&" + unit; 
        axios.get(url)
            .then(function (response) {
                // handle success
                // console.log('success: got weather');
                // console.log(response.data);

                // update weather description and temperature to 'currendData'
                // let currentData = [];
                // console.log(response.data.main["temp"]);
                // currentData[0] = (response.data.main["temp"]);
                // currentData[1] = (response.data.weather[0]["description"]);
                // console.log(currentData);
                
                // update results on front end 
                document.getElementById("temp-unit").style.display = "inline";
                document.getElementById("temp-val").innerHTML = Math.round(response.data.main["temp"]);
                document.getElementById("type-val").innerHTML = response.data.weather[0]["description"];

            })
            .catch(function (error) {
                console.log("Error with weather request");
                console.log(error);
            });
    } else {
        // invalid data inputed
        document.getElementById("temp-unit").style.display = "none";
        document.getElementById("temp-val").innerHTML = "Enter valid";
        document.getElementById("type-val").innerHTML = "city name";
    }
}
// add input event
/**
 * when input is updated then
 */
searchbar.addEventListener("change", function () {

    update();

});

