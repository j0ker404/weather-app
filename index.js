let searchbar = document.getElementById("searchbar");

// add input event
/**
 * when input is updated then
 */
searchbar.addEventListener("change", function () {
    alert("test");
});

cityList = [];
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
        console.log('success');
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




