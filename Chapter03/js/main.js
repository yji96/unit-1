//initialize function called when script loads
function initialize(){
    cities();
};

//function to create a table with cities and their populations
function cities(){
    // Data with city names and population
    var cityPop = [
        { 
            city: 'Madison',
            population: 233209
        },
        {
            city: 'Milwaukee',
            population: 594833
        },
        {
            city: 'Green Bay',
            population: 104057
        },
        {
            city: 'Superior',
            population: 27244
        }
    ];

    function createTable(cityPop){
        // create a table element
        var table = document.createElement('table');

        // create a header row
        var headerRow = '<tr><th>City</th><th>Population</th></tr>';
        table.insertAdjacentHTML('beforeend', headerRow);
        console.log('Header created!')
        
        // append data rows using loop
        cityPop.forEach(city=>{
            var dataRow = '<tr><td>' + city.city +'</td><td>' + city.population + '</td></tr>';
            table.insertAdjacentHTML('beforeend', dataRow);
            console.log(`${city.city} record created!`)
        })

        document.querySelector("#mydiv").appendChild(table);
    }

    // call the addTable function
    createTable(cityPop);


    function addColumns(cityPop){
        console.log('Start add a new column!')

        // iterate rows to add a new column
        document.querySelectorAll("tr").forEach(function(row, i){
            if (i == 0){
                // Add the column name
                row.insertAdjacentHTML('beforeend', '<th>City Size</th>');
                console.log('City size now available!')
            } else {
                // define the variable of city size
                var citySize; 
                // conditional statements
                if (cityPop[i-1].population < 100000){
                    citySize = 'Small';
                } else if (cityPop[i-1].population < 500000){
                    citySize = 'Medium';
                } else {
                    citySize = 'Large';
                };
                // Add the column values
                row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
                console.log(`${cityPop[i-1].city}, popluation of ${cityPop[i-1].population}, size ${citySize}!`)
            };
        }); 
    }

    // call the function to add a new column
    addColumns(cityPop);

    function addEvents(){
        // For hover event, change the table color
        document.querySelector("table").addEventListener("mouseover", function(event){           
            // generate color for the table
            var color = "rgb(";
            for (var i=0; i<3; i++){

                var random = Math.round(Math.random() * 255);

                color += random.toString(); // num to string

                if (i<2){
                    color += ",";
                
                } else {
                    color += ")";
                };
            }
            //Change the table color
            document.querySelector("table").style.color = color; 
            console.log(`Color changed to ${color}`)
        });

        function clickme(){

            alert('Hey, you clicked me!');
        };
        // Add a click listener
        document.querySelector("table").addEventListener("click", clickme)
    }
    // call the function
    addEvents();

    // Define callback function to show the data
    function debugCallback(response){
        document.querySelector("#mydiv").insertAdjacentHTML('beforeend', '<br>GeoJSON data: ' + JSON.stringify(response) + '</br>')
    };
    
    function debugAjax(){

        // load data
        fetch("data/MegaCities.geojson")
            .then(function(response){ //when the data arrives, convert to json format
                return response.json();
            })
            .then(function(response){ // call the callback function
                debugCallback(response);
            })
    
    };

    // call the function
    debugAjax()   
    
}

// let the interpreter read through everything before reaching it
window.onload = initialize();