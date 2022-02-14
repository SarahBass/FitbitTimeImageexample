/*--- Import Information from user Account ---*/
import { geolocation } from "geolocation";
import { settingsStorage } from "settings";
import { me as appbit } from "appbit";
import { HeartRateSensor } from "heart-rate";
import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { battery } from 'power';
import { display } from "display";
import { today as userActivity } from "user-activity";
import {goals, today} from "user-activity";

/*--- Import Information from index.gui ---*/
let ampm = document.getElementById("ampm");
let hourhand = document.getElementById("hourhand");
let minutehand = document.getElementById("minutehand");
let minutehand2 = document.getElementById("minutehand2");
let colon = document.getElementById("colon");
let date = document.getElementById("date");
const myLabel = document.getElementById("myLabel");

/*--- Create Local Variables for Information Storage ---*/
let daytext = "day";
let monthtext = "month";

//Update the clock every second 
clock.granularity = "seconds";

clock.ontick = (evt) => {

  let today = new Date();
  let hours = today.getHours();
  let months = today.getMonth();
  let days = today.getDay();
  let dates = today.getDate();
  let years = today.getFullYear();
  let mins = util.zeroPad(today.getMinutes());
  let seconds = today.getSeconds();
  
  /*--- Update Stats for Screen ---*/
  updateScene();
  
  if (util.zeroPad(hours) <12){ampm.text = "am";}
    //or use image : ampm.image = "am.png";}
  if (util.zeroPad(hours) >= 12){ampm.text = "pm";}
    // or use image ampm.image = "background/pm.png";
  
/*--- OPTION 1: TIME IMAGES FOR 12 HOUR CLOCK---*/
  //set class of each # IMAGE individually if needed for formatting
  if (preferences.clockDisplay === "12h") {
    colon.image = "numbers/colon.png";
    myLabel.class = "myLabel";
    hours = hours % 12 || 12;
    hourhand.image = "numbers/" + hours + ".png";
  //Minute hand % 10 will return ones digit
   minutehand2.image =      "numbers/" + mins%10 + ".png";     
  //Minute hand /10 will return tens digit, but ints don't exist in Javascript
  //Use the parseInt function to turn quotient into an integer
   minutehand.image = "numbers/" + parseInt(mins/10)+ ".png";} 
    
    /*--- OPTION 2: TIME TEXT FOR 24 HOUR CLOCK ---*/
    //This is how to set a clock with text
    //Invisible until 24 hour mode selected
    else { 
    hours = util.zeroPad(hours);
    myLabel.text = `${hours}:${mins}`; 
    myLabel.class = "showLabel";
    hourhand.image = "blank.png";
    minutehand.image = "blank.png";  
    minutehand2.image = "blank.png";
    colon.image = "blank.png";
  }
  
  function updateScene() {
   
   date.text = " " + daytext + " " + monthtext + " " + dates + " " + years + " ";  
  if (months == 0){monthtext = "January";}
  else if (months == 1){monthtext =  "February";}
  else if (months == 2){monthtext =  "March";}
  else if (months == 3){monthtext =  "April";}
  else if (months == 4){monthtext =  "May";}
  else if (months == 5){monthtext =  "June";}
  else if (months == 6){monthtext =  "July";}
  else if (months == 7){monthtext =  "August";}
  else if (months == 8){monthtext =  "Septemper";}
  else if (months == 9){monthtext =  "October";}
  else if (months == 10){monthtext = "November";}
  else if (months == 11){monthtext = "December";}
  else {monthtext = "MONTH";}
    
  if (days == 0){daytext =      "Sunday,";}
  else if (days == 1){daytext = "Monday,";}
  else if (days == 2){daytext = "Tuesday,";}
  else if (days == 3){daytext = "Wednesday,";}
  else if (days == 4){daytext = "Thursday,";}
  else if (days == 5){daytext = "Friday,";}
  else if (days == 6){daytext = "Saturday,";}
  else {daytext = "DAY";}
 }
