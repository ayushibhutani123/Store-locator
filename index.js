let map;
const markers=[];
fetch("index.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const rawTempalte = document.getElementById(
      "productlistingtemplate"
    ).innerHTML;
    const compiledProductListingTempalte = Handlebars.compile(rawTempalte);
    const ourGeneratedTempalte = compiledProductListingTempalte(data);
    const productListingContainer = document.getElementById("sidebar");
    productListingContainer.innerHTML = ourGeneratedTempalte;
    data.stores.forEach(element => {
      const storeLocation = {
        lat: element.coordinates.latitude,
        lng: element.coordinates.longitude
      };
    const add= element.address;

      const storeElement = document.getElementById(element.id); 
     const marker= createMarker(storeLocation);
     
  storeElement.addEventListener("click",function(){
   bounce(marker);
   createinfowindow(marker, add);
  
      })
    });
     });
  function bounce(marker) {
    if (marker) {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function () {
        marker.setAnimation(null); 
      }, 2000); 
    }
    
  }
 function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 28.7041, lng: 77.1025 },
    zoom: 10,
  });
  getLocation();
}
function createMarker(location) {
 const marker= new google.maps.Marker({
    position: location,
    map: map,
    label: "A",
    title: "Your Location",
    animation: google.maps.Animation.DROP,
   });
   markers.push(marker);
   marker.addListener("click", function () {
    map.setZoom(15); 
    map.setCenter(marker.getPosition()); 
   });
   return marker;
  }
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      createMarker(userLocation); 
    });
  } else {
    console.log("Geolocation is not supported by your browser");
  }
}
function createinfowindow(marker,add){
const contentString=add;
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
  // marker.addListener("mouseover", function () {
    infowindow.open({
      anchor: marker,
      map,
    }); 
    // });
  }
window.initMap = initMap;
