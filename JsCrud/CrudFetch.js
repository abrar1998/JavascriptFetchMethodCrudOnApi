

        //CREATE OPERATION
document.getElementById("saveform").addEventListener("click", function(e){
    e.preventDefault();
    var nam = document.getElementById("textname").value;
    var ema = document.getElementById("textemail").value;
    if(nam == 0 && ema == 0)
    {
        alert("Please Fill The Form:");
    }
    else
    {

        //here we will asign form fields data to the object properties then we will pass this object to the body of url as shown below
         var getstd={
        name: document.getElementById("textname").value,
        email: document.getElementById("textemail").value,
        };

    const apiUrl = "https://localhost:7047/api/Students";
    fetch(apiUrl,{
        method: 'POST',
        body: JSON.stringify(getstd), // taking object
            //OR
        
        //body: new FormData(document.getElementById("myform").value),
        headers:{
            'Content-ype':'application/json; charset=UTF-8',
                //or form data
                //'Content-type':'application/x-www-from-urlencoded',
        },
    }).then((response)=>{
        alert("Form Submitted Successfully");
    }).catch((error)=>{
        alert("Error..... Form Not Submitted")
    })
    }
   
});


    //GET ALL DATA FROM API

    // Call the function to initiate the process
    //fetchDataAndCreateTable();
    // Function to make the API request and create the table
    function fetchDataAndCreateTable() {
        let url = "https://localhost:7047/api/Students";
        // let htp = new XMLHttpRequest();
        // htp.open('GET', url, true);
        // htp.onreadystatechange = function () {
        //     if (this.readyState == 4 && this.status == 200) {
        //         // Parse the JSON response
        //         let data = JSON.parse(this.responseText);

        //         // Call a function to create and populate the table
        //         createTable(data);
        //     }
        // }

        // htp.send();
        
       
        var data;
        
        fetch(url)
        .then((response)=>{
            //console.log(response.text());
            return response.text();
        }).then((data)=>{
            //console.log(data);
             data = JSON.parse(data);
             createTable(data);

        }).catch((error)=>console.log(error));

    } 

    // Function to create and populate the HTML table
    function createTable(data) {
        // Get the table element by its ID
        let table = document.getElementById("apiDataTable");

        // Create table headers
        let headers = Object.keys(data[0]);
        let headerRow = table.insertRow(0);

        headers.forEach(header => {
            let cell = headerRow.insertCell();
            cell.textContent = header;
        });

        // Create and populate table rows
        data.forEach(item => {
            let row = table.insertRow();

            headers.forEach(header => {
                let cell = row.insertCell();
                cell.textContent = item[header];
            });
        });
    }

    
    // DELETE OPERATION
    document.getElementById("deletedataById").addEventListener("click", function(e){
        e.preventDefault();
        //DELETE
        var val = document.getElementById("delt").value;
        if(val == 0)
        {
            alert("Please Enter Id to delete..")
        }
        else
        {
            let id = document.getElementById("delt").value;
            const apiUrldelete = `https://localhost:7047/api/Students/${id}`;
            fetch(apiUrldelete,{
                method: 'DELETE'
            }).then((response)=>{
                alert("Record Deleted Successfully");
            }).catch((error)=>alert("Failed to delete.."));
        }
    });

    //UPDATE OPERATION

    // document.getElementById("updateform").addEventListener('click', function(e){
    //     e.preventDefault();
    //     let id = document.getElementById("textid").value;

    //     var Updatestd = {
    //         name: document.getElementById("textname").value,
    //         email: document.getElementById("textemail").value,
    //         };


    //     // var formid = document.getElementById("textid").value;
    //     // var formname = document.getElementById("textname").value;
    //     // var formemail = document.getElementById("textemail").value;
    //     if(id == 0 )
    //     {
    //         alert("Please Enter Details to Update Student");
    //     }
    //     else
    //     {
            
    //         const apiUrl = `https://localhost:7047/api/Students/${id}`
    //         fetch(apiUrl,{
    //             method: 'PUT',
    //             body:JSON.stringify(Updatestd),
    //             headers: {
    //                 'Content-type': 'application/json; charset=UTF-8',
    //               },
    //         }).then((response)=>{
    //             return response.json();
    //         }).then((data)=>{
    //             //console.log(data)
    //             alert("Updated Successfully..")
    //         }).catch((error)=>{
    //             //console.log(error)
    //             alert("Error... Not updated")
    //         });


    //         //.then((response)=>alert("Details Updated Successfully")).catch((error)=>console.log(error));
    //     }
        
    // });

    // document.getElementById("updateform").addEventListener('click', function (e) {
    //     e.preventDefault();
    //     let id = document.getElementById("textid").value;
    
    //     var Updatestd = {
    //         name: document.getElementById("textname").value,
    //         email: document.getElementById("textemail").value,
    //     };
    
    //     if (!id) 
    //     {
    //         alert("Please Enter Student ID to Update");
    //     } 
    //     else 
    //     {
    //         const apiUrl = `https://localhost:7047/api/Students/${id}`;
    //         fetch(apiUrl, {
    //             method: 'PUT',
    //             body: JSON.stringify(Updatestd),
    //             headers: {
    //                 'Content-type': 'application/json; charset=UTF-8',
    //             },
    //         })
    //             .then((response) => {
    //                 if (!response.ok) {
    //                    throw new Error(`HTTP error! Status: ${response.status}`);
    //                    //alert("Http error! " + response.status)
    //                 }
    //                 return response.json();
    //             })
    //             .then((data) => {
    //                 console.log(data); 
    //                 alert("Updated Successfully");
    //             })
    //             .catch((error) => {
    //                 console.error('Error:', error);
    //                 alert("Error... Not updated");
    //             });
    //     }
    // });
    

    document.getElementById("updateform").addEventListener('click', async function (e) {
        e.preventDefault();
        let id = document.getElementById("textid").value;
    
        var Updatestd = {
            name: document.getElementById("textname").value,
            email: document.getElementById("textemail").value,
        };
    
        if (!id) {
            alert("Please Enter Student ID to Update");
        } else {
            try {
                const apiUrl = `https://localhost:7047/api/Students/${id}`;
                const response = await fetch(apiUrl, {
                    method: 'PUT',
                    body: JSON.stringify(Updatestd),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = await response.json();
                console.log("Response Data:", data);
                alert("Updated Successfully");
            } catch (error) {
                console.error('Error:', error);
                alert("Error... Not updated");
            }
        }
    });
    