var cat_id = [];
var events_json = [];
function createCard(info)
{
    var x  = document.createElement('div');
    x.classList.add('card');
    var y = document.createElement('h3');
    var z = document.createElement('div');
    z.classList.add('cont');
    var size  = document.createElement('div');
    size.classList.add('size');
    y.innerHTML = info.name;
    z.innerHTML = info.shortDesc;
    size.innerHTML =  "Team Size: " +info.maxTeamSize;
    x.appendChild(y); 
    x.appendChild(z); 
    x.appendChild(size);
    return x;
}
function load_events(cat)
{
 // console.log(cat)
 // console.log(events_json.data[1])
  var x = document.getElementsByClassName("card-flex")[0];
 // console.log(events_json.data[0].category)
 x.innerHTML = ""
   // console.log(cat)
  for(var i = 0;i<events_json.data.length;i=i+1)
  {
    if(events_json.data[i].category == cat)
    {
      console.log('found')
      var k = createCard(events_json.data[i]);
      x.appendChild(k);
    }
  }
}
function lol(){
           
            var itemClassName = "carouselphoto";
            var  items = document.querySelectorAll('.carouselphoto');
            console.log(items);
            var ok=["ban","lol"];
            var  totalItems = items.length;
            console.log(totalItems);
            var  slide = 0;
            var  moving = true; 
            load_events(cat_id[slide])
          // To initialise the carousel we'll want to update the DOM with our own classes
          function setInitialClasses() {
        
            // Target the last, initial, and next items and give them the relevant class.
            // This assumes there are three or more items.
            items[totalItems-1].classList.add("prev");
            items[0].classList.add("active");
            items[1].classList.add("next");
          }
        
          // Set click events to navigation buttons
        
          function setEventListeners() {
            var next = document.getElementsByClassName('carousel__button--next')[0],
                prev = document.getElementsByClassName('carousel__button--prev')[0];
        
            next.addEventListener('click', moveNext);
            prev.addEventListener('click', movePrev);
          }
        
          // Disable interaction by setting 'moving' to true for the same duration as our transition (0.5s = 500ms)
          function disableInteraction() {
            moving = true;
        
            setTimeout(function(){
              moving = false
            }, 500);
          }
        
          function moveCarouselTo(slide) {
            // Check if carousel is moving, if not, allow interaction
            
            if(!moving) {
        
              // temporarily disable interactivity
              disableInteraction();
        
              // Preemptively set variables for the current next and previous slide, as well as the potential next or previous slide.
              var newPrevious = slide - 1,
                  newNext = slide + 1,
                  oldPrevious = slide - 2,
                  oldNext = slide + 2;
        
              // Test if carousel has more than three items
              if ((totalItems - 1) > 3) {
        
                // Checks if the new potential slide is out of bounds and sets slide numbers
                if (newPrevious <= 0) {
                  oldPrevious = (totalItems - 1);
                } else if (newNext >= (totalItems - 1)){
                  oldNext = 0;
                }
        
                // Check if current slide is at the beginning or end and sets slide numbers
                if (slide === 0) {
                  newPrevious = (totalItems - 1);
                  oldPrevious = (totalItems - 2);
                  oldNext = (slide + 1);
                } else if (slide === (totalItems -1)) {
                  newPrevious = (slide - 1);
                  newNext = 0;
                  oldNext = 1;
                }
                //console.log(slide)
        
                // Now we've worked out where we are and where we're going, by adding and removing classes, we'll be triggering the carousel's transitions.
        
                // Based on the current slide, reset to default classes.
                items[oldPrevious].className = itemClassName;
                items[oldNext].className = itemClassName;
        
                // Add the new classes
                items[newPrevious].className = itemClassName + " prev";
                items[slide].className = itemClassName + " active";
                items[newNext].className = itemClassName + " next";
              }
            }
          }
        
          // Next navigation handler
          function moveNext() {
        
            // Check if moving
            if (!moving) {
        
              // If it's the last slide, reset to 0, else +1
              load_events(cat_id[slide])
              if (slide === (totalItems - 1)) {
                slide = 0;
              } else {
                slide++;
              }
              
              moveCarouselTo(slide);
            }
          }
        
          function movePrev() {
        
            if (!moving) {
              load_events(cat_id[slide])
              if (slide === 0) {
                slide = (totalItems - 1);
              } else {
                slide--;
              }
            
              moveCarouselTo(slide);
            }
          }
        
          // Initialise carousel
          function initCarousel() {
            setInitialClasses();
            setEventListeners();
        
            // Set moving to false now that the carousel is ready
            moving = false;
          }
        
          // make it rain
          initCarousel();
       // }); 
    }
function createSlide(info){
    var x = document.createElement('div');
    x.classList.add("carouselphoto");
    var y = document.createElement('div');
    y.classList.add('cat-name');
    var z = document.createElement('div');
    z.classList.add('content_events');
  var img = document.createElement('img');
    img.classList.add('nicelogo');
    y.innerHTML = info.name;
    z.innerHTML = info.description;
   img.src = "revels-blueblack_DarkBG 1.svg"
    x.appendChild(y);
   x.appendChild(img);
    x.appendChild(z);
    console.log(x);
    return x;
}

var fetch_events = function()
{
let data;
fetch('https://api.techtatva.in/events',{
    method: 'GET',
    headers: {
        "Content-Type": "application/JSON",
    },
    credentials: 'include',
    redirect: 'error',
    credentials: "omit"
}).then(res => {
    return res.json();
}).then(function (json) {
    console.log(json);
     data = json;
    //console.log(data.data);
    console.log(data.data.length)
    events_json = json;
    // for(let i=0;i<data.data.length;i++)
    // {
    //     //console.log(data.data[i].category)
    //         // var k = createCard(data.data[i]);
    //         // x.appendChild(k);
    //         events_json.push(data.data[i]);
    //         //console.log(k);
    //         // console.log(data.data[i].maxTeamSize);
        
    // }

    
})
.then(function (){
    lol();
})
.catch(function (error) {
    console.log(error);
});
}

var fetch_cat = function()
{
    fetch('https://api.techtatva.in/categories',{
        method: 'GET',
        headers: {
            "Content-Type": "application/JSON",
        },
        credentials: 'include',
        redirect: 'error',
        credentials: "omit"
        }).then(res => {
        return res.json();
        }).then(function (json) {
        console.log(json);
        console.log('lol1')
        var t = document.getElementsByClassName('carousel')[0];
        console.log(t)
        for(let i=0;i<json.data.length;i++)
        {
            var k = createSlide(json.data[i]);
          // console.log(json.data[i])
            cat_id.push(json.data[i].id);
            t.appendChild(k);
            //console.log(k)
            
        }
        fetch_events();
        })
        
}


fetch_cat();