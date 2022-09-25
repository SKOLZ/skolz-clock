import * as document from "document";

import clock from "clock";
import { battery } from "power";
import { HeartRateSensor } from "heart-rate";
import { today } from 'user-activity';
import { zeroPad } from '../common/utils.js';

clock.granularity = "minutes"; // seconds, minutes, hours

const hoursLabel = document.getElementById("hours");
const minutesLabel = document.getElementById("minutes");
const dateLabel = document.getElementById("date");
const heartRateLabel = document.getElementById("heart-rate");
const stepsLabel = document.getElementById("steps");
const batteryLabel = document.getElementById("battery");

const dayText = {
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
  6: "SAT",
  7: "SUN"
}

clock.addEventListener("tick", (e) => {
  hoursLabel.text = zeroPad(e.date.getHours());
  minutesLabel.text = zeroPad(e.date.getMinutes());
  dateLabel.text = `${dayText[e.date.getDay()]} ${e.date.getDate()}`;
  stepsLabel.text = today.adjusted.steps;
  batteryLabel.text = `${Math.floor(battery.chargeLevel)}%`;
});

if (HeartRateSensor) {
   const hrm = new HeartRateSensor();
   hrm.addEventListener("reading", () => {
     heartRateLabel.text = hrm.heartRate;
   });
   hrm.start();
}