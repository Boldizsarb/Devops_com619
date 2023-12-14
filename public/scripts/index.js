function Region({ title }) {

  //// (4)

  //check use of this variables//

  //

  //

  //

  //

  //

  //
 
  const [poi, setPoi] = React.useState([]);

  const [map, setMap] = React.useState(null);

	React.useEffect(() => {

		/// map (8)
 
		const map = L.map("map2");

		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {

			attribution:

				"Map data copyright OpenStreetMap contributors, Open Database Licence",

		}).addTo(map);
 
  

    /////////////////////////////////changes//////////////////////////////

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(successFunction, errorFunction);

    } else {

      console.log("Geolocation is not supported by this browser.");

    }

    async function successFunction(position) {

      const lat = position.coords.latitude;

      const lon = position.coords.longitude;

      try {

        const response = await fetch('/location', {

          method: 'POST',

          headers: {

            'Content-Type': 'application/json',

          },

          credentials: 'include',

          body: JSON.stringify({ lat, lon }),

        });

        if (response.ok) {

          const data = await response.json();

          console.log(data);

        } else {

          console.log('Error creating session location');

        }

         // Create a Leaflet marker with a custom icon

         L.marker([lat, lon], {

          icon: L.icon({

            iconUrl: '../public/img/current_location.png',

            iconSize: [32, 32],

            iconAnchor: [16, 32],

            popupAnchor: [0, -32],

          }),

        }).addTo(map);
 
        map.setView([lat, lon], 14);

        console.log(position);

      } catch (error) {

        console.error('Error:', error);

      }

    }

    function errorFunction(error) {

  		map.setView([51.05, -0.72], 14); // load mapfocus

      console.log("Unable to retrieve your location.");

      console.error('Error getting location:', error.message);

    }

    /////////////////////////////////changes//////////////////////////////
 
		setMap(map);
 
		let Longtitude = 0;

		let Latitude = 0;
 
		map.on("click", (e) => {

			/////////// (9)

			Latitude = e.latlng.lat;

			Longtitude = e.latlng.lng;

			const pos = [Latitude, Longtitude];

			////////////////////////////////////////////////////////////////////////////////// picture upload over

			const domDiv = document.createElement("div");

			domDiv.innerHTML = `

            <form id="poi-form">

              <h6 id="poidetails-input">Please enter the details of the POI you wich to add<h6>

                <input type="text" id="name" name="name" placeholder="Please enter the Name" class="form-control form-control-user required">

                <input type="text" id="type" name="type" placeholder="Please enter the Type" class="form-control form-control-user required">

                <input type="text" id="country" name="country" placeholder="Please enter the Country" class="form-control form-control-user required">

                <input type="text" id="region" name="region" placeholder="Please enter the Region" class="form-control form-control-user required">

                <textarea id="description" name="description" placeholder="Describe the place" class="form-control form-control-user required"></textarea>

                <button id="submit" type="submit" class="btn btn-primary btn-user btn-block">Submit</button>

            </form> `;
 
			////////////////////////////////////////////////////////////////////   // picture upload

			const domForm = document.createElement("div");

			// form for the picture

			domForm.innerHTML = `

                    <div>

                      <h6 id="add-picture">Would you like to add a picture?<h6> 

                      <input type='file' id='imageInput' /><br>

                      <button id='uploadBtn' value='Upload' class="btn btn-primary btn-user">upload</button>

                      <button id='no' value='no' class="btn btn-primary btn-user " >No </button>

                    </div>`;
 
			let popupp = false;
 
			domDiv.addEventListener("submit", (event) => {

				event.preventDefault(); /// preventing the page to reload!
 
				const formData = new FormData(event.target);

				const name = formData.get("name");

				const type = formData.get("type");

				const country = formData.get("country");

				const region = formData.get("region");

				const description = formData.get("description");

				let newPoi = {};
 
				if (

					name.trim() == "" ||

					type.trim() == "" ||

					country.trim() == "" ||

					region.trim() == "" ||

					description.trim() == ""

				) {

					alert("Please fill in all the fields!");

					return;

				} else {

					marker.bindPopup(domForm).openPopup();
 
					addEventListener("click", (event) => {

						// if the no button pressed it wont show any pictures!

						if (event.target.id === "no") {

							newPoi = {

								name: name,

								type: type,

								country: country,

								region: region,

								lon: Longtitude,

								lat: Latitude,

								description: description,

								recommendations: 0,

								image: null,

							};

							sendPoi();

							marker

								.bindPopup(

									`<h3>${name}</h3> 

                            <p> ${description}</p>`

								)

								.openPopup();

						} else if (event.target.id === "uploadBtn") {

							sendFiles();

						}

					});

					/////////// Poi upload code

					const sendPoi = async () => {

						fetch(`http://comdevops.uksouth.cloudapp.azure.com/poi/pointsOfInterest`, {

							method: "POST",

							headers: {

								"Content-Type": "application/json",

							},

							body: JSON.stringify(newPoi),

						}).then((response) => {

							if (response.status == 200) {

								alert("Place added successfully!");

								response.json().then(

									(data) => {

										// this line is picture

										popupp = true; // needed

										let poiId = data.pointOfInterestId; // returned id for the poi

										console.log(poiId);

									} // stay inside

								);

							} else if (response.status === 401) {

								// (11)

								alert("You are not logged in!");

								map.removeLayer(marker);

							} else {

								map.removeLayer(marker);

							}

							//return response.json();

						});

					};

					/////////// picture upload code

					const sendFiles = async () => {

						console.log("sending files");

						const fileInput = document.getElementById("imageInput");

						const file = fileInput.files[0]; // Create an image element to display the selected image

						const reader = new FileReader();

						reader.onload = function () {

							const img = new Image();

							img.onload = function () {

								const maxWidth = 400; // Maximum width for the resized image

								const maxHeight = 300; // Maximum height for the resized image

								let newWidth = img.width;

								let newHeight = img.height; // Resize the image if it exceeds maxWidth or maxHeight

								if (img.width > maxWidth) {

									newWidth = maxWidth;

									newHeight = (img.height * maxWidth) / img.width;

								}

								if (newHeight > maxHeight) {

									newHeight = maxHeight;

									newWidth = (img.width * maxHeight) / img.height;

								}

								const canvas = document.createElement("canvas");

								const ctx = canvas.getContext("2d");

								canvas.width = newWidth;

								canvas.height = newHeight;

								ctx.drawImage(img, 0, 0, newWidth, newHeight);

								canvas.toBlob(

									(blob) => {

										const compressedReader = new FileReader();

										compressedReader.onload = function () {

											const compressedBase64String =

												compressedReader.result.split(",")[1]; // Now you can store the compressedBase64String in your database

											const newImage = { base: compressedBase64String }; // Display the compressed and resized image

											console.log(compressedBase64String);

											fetch(`http://comdevops.uksouth.cloudapp.azure.com/image/imagesadd`, {

												method: "POST",

												headers: { "Content-Type": "application/json" },

												body: JSON.stringify(newImage),

											}).then((response) => {

												if (response.status === 200) {

													alert("Image Added");

													response.json().then((data) => {

														newPoi = {

															name: name,

															type: type,

															country: country,

															region: region,

															lon: Longtitude,

															lat: Latitude,

															description: description,

															recommendations: 0,

															image: data.imageId,

														};

														sendPoi();

														marker

															.bindPopup(

																`<h3>${name}</h3> 

                            <p> ${description}</p>

                            <img src="data:image/jpeg;base64,${compressedBase64String}">`

															)

															.openPopup();

													});

												} else if (response.status === 401) {

													alert("You are not logged in!");

												} else if (response.status === 500) {

													alert("error500");

												} else if (response.status === 413) {

													alert("responso 413");

												} else {

													console.log(response);

													alert("Error uploading image");

												}

											});

										};

										compressedReader.readAsDataURL(blob);

									},

									"image/jpeg",

									0.8

								); // Adjust quality as needed

							};

							img.src = URL.createObjectURL(file);

						};

						reader.readAsDataURL(file); // Convert the image to Base64

					};

				}

			});
 
			const marker = L.marker(pos).addTo(map);

			marker.bindPopup(domDiv).openPopup();

			//console.log(popupp)
 
			marker.on("popupclose", () => {

				/// works just removes even the good one

				if (popupp === false) {

					map.removeLayer(marker);

				}

			});

		});

		/////////////////////////////////////////////////////  session

		//async function fetchData() {

		//const response = await fetch("http://localhost:3000/user/verifylogin");

		//const jsonData = await response.json();

		//setData(jsonData.username);

		//}

		//fetchData();

		/////////////////////////////////////////////////  session

	}, []);
 
	function recommend(id) {

		const poi = {

			poi_id: id,

		};

		fetch(`http://comdevops.uksouth.cloudapp.azure.com/poi/recommend`, {

			method: "POST",

			headers: {

				"Content-Type": "application/json",

			},

			body: JSON.stringify(poi),

		}).then((response) => {

			if (response.status === 200) {

				alert("Recommendation submitted successfully!");

			} else if (response.status === 403) {

				alert("You don't have permission to do that! Please LogIn");

			}

			return response.json();

		});

	}
 
	function sharePoi(id) {

		alert(`Shared ${id}`);

	}
 
	async function fetchImage(poi) {

		if (poi.id) {

			fetch(`http://comdevops.uksouth.cloudapp.azure.com/image/images/${poi.id}`, {

				method: "GET",

			})

				.then((response) => {

					if (response.status == 404) {

						alert("There no valid image");

					} else if (response.status == 403) {

						alert("You don't have permission to do that! Please LogIn!");

					}

					return response.json(); // Get the image data as ArrayBuffer

				})

				.then((data) => {

					let basedata = data.base;
 
					/* Extract the data URL from the response JSON

          const imageBase64 = btoa(

            new Uint8Array(data).reduce((binary, byte) => {

              return binary + String.fromCharCode(byte);

            }, "")

          );*/
 
					//creating all the elements to display in the popup of each POI

					const lat = poi.lat;

					const lon = poi.lon;

					let markerLet = [lat, lon];

					const popUpDiv = document.createElement(`div`);

					popUpDiv.setAttribute(
						"class",
						"align-items-center justify-content-between "
					);

					const name = document.createTextNode(poi.name);

					const br = document.createElement(`p`);

					popUpDiv.appendChild(name);

					popUpDiv.appendChild(br);

					const image = document.createElement(`img`);

					image.setAttribute("src", `data:image/jpeg;base64,${basedata}`);

					image.setAttribute("alt", "There is no picture");

					image.setAttribute("width", "100%");

					//image.setAttribute("onError", "this.style.display='none';");

					popUpDiv.appendChild(image);

					popUpDiv.appendChild(br);

					const description = document.createTextNode(poi.description);

					popUpDiv.appendChild(description);

					popUpDiv.appendChild(br);

					const recommendBtn = document.createElement(`input`);

					recommendBtn.setAttribute("type", "button");

					recommendBtn.setAttribute("value", "Recommend");

					recommendBtn.setAttribute(

						"class",

						"d-sm-inline-block btn btn-sm btn-primary shadow-sm"

					);

					recommendBtn.addEventListener("click", recommend.bind(this, poi.id));

					popUpDiv.appendChild(recommendBtn);

					L.marker(markerLet).addTo(map).bindPopup(popUpDiv);

					map.setView([poi.lat, poi.lon], 14);

				})

				.catch((error) => {

					console.error("Error:", error.message);

				});

		}

	}

	function searchByRegion() {

		/// search /////////////// (4)
 
		const regionName = document.getElementById("searchValue").value;

		console.log(regionName);

		if (regionName.trim == "") {

			alert("Please enter a region first");

		} else {

			fetch(

				`http://comdevops.uksouth.cloudapp.azure.com/poi/pointsOfInterestByRegion/${regionName}`,

				{

					method: "GET",

				}

			)

				//.then((response) =>response.json())

				.then((response) => {

					if (response.status == 404) {

						alert("Please enter a valid region first");

					} else if (response.status == 403) {

						alert("You don't have permission to do that! Please LogIn!");

					}

					return response.json();

				})

				.then((data) => {

					setPoi(data);

					//console.log(data)

					///////////////////// Add each POI to the markers array and create a marker for it

					data.forEach((poi) => {

						///////////////////////////////////////////////////(13)

						fetchImage(poi);

					});

				});

		}
 
		/////////////////////////////////////////////// (13) till here

	}
 
	// function to click on the poi name from the list and redirect the map to it

	function takeMeThere(lon, lat) {

		/////////// (8) //// and (13)
 
		let pos = [lat, lon];

		map.setView(pos, 14);

		window.scrollTo({ top: 0, behavior: "smooth" }); // takes the user to the map!

	}
 
	const poiNameStyle = {

		// style

		cursor: "pointer",

	};
 
	return (

		<div className="container-fluid">

			<div>

				<h1 className="h3 mb-0 text-gray-800">{title}</h1>

				<div className="d-sm-flex align-items-center justify-content-between mb-4">

					<fieldset style={{ width: `100%` }}>

						<input

							type="text"

							className="form-control bg-light border-0 small"

							placeholder="Search for a Region"

							aria-label="Search"

							aria-describedby="basic-addon2"

							id="searchValue"

						/>

						<br />

						<button

							style={{ width: `100%` }}

							className="d-sm-inline-block btn btn-sm btn-primary shadow-sm"

							id="searchbtn"

							value=""

							onClick={searchByRegion}

						>

							Search

						</button>

					</fieldset>

				</div>

			</div>

			`

			<div className="d-sm-flex align-items-center mb-4">

				<div

					id="map2"

					style={{ width: `100%`, height: `50vh`}}

				></div>

			</div>

			<div className="row">

				{poi.length > 0 ? (

					poi.map((item) => (

						<div class="col-xl-3 col-md-6">

							<div className="card bg-gradient-dark text-white shadow">

								<div className="card-body">

									<div key={item.id}>

										<h3

											className="card-title"

											id="nameh3"

											style={poiNameStyle}

											onClick={() => takeMeThere(item.lon, item.lat)}

										>

											Name: {item.name}

										</h3>

										<p id="poi-type">Type: {item.type}</p>

										<p id="poi-country">Country: {item.country}</p>

										<p id="poi-region">Region: {item.region}</p>

										<p id="poi-lon">Lon: {item.lon}</p>

										<p id="poi-lat">Lat: {item.lat}</p>

										<p id="poi-description">Description: {item.description}</p>

										<p id="poi-recommendations">
											Recommendations:{item.recommendations}
										</p>

										<button

											style={{ margin: `5px` }}

											className=" d-sm-inline-block btn btn-sm btn-primary shadow-sm"

											id="recomendbut"

											onClick={() => recommend(item.id)}

										>

											Recommend

										</button>

										<button

											className=" d-sm-inline-block btn btn-sm btn-primary shadow-sm"

											id="shareBtn"

											onClick={() => sharePoi(item.id)}

										>

											Share

										</button>

									</div>

								</div>

							</div>

						</div>

					))

				) : (

					<p></p>

				)}

			</div>

		</div>

	);

}
 
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Region title="Search by region" />);
