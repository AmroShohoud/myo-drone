var arDrone = require('ar-drone');
var index = require('myojs');
var keypress = require('keypress');

var client = arDrone.createClient();
var hub = new index.Hub();
var myMyo = new index.Myo();
myMyo.context = hub.connection;

keypress(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', function (ch, key) {
  // press ctrl + c to exit the program
  if (key && key.ctrl && key.name == 'c' ) { 
    process.exit();
  }
  // press 'l' to land
  else if (key.name == 'l') {
    console.log("landing");
    client.land();
    take_command = false;
    myMyo.lock();
  }
  // press 'd' to exit emergency state
  else if (key.name == 'd') {
   client.disableEmergency();
   console.log("disable emergency");
  }
});

var take_command = false;
var newAngles;
var zeroPos = null;
var curAngles;
// speeds can be anything between 0 and 1
var yawSpeed = 0.5;
var pitchSpeed = 0.5;
var rollSpeed = 0.5;

/*
Pose types:
0 - Rest
1 - Fist
2 - Wave In
3 - Wave Out
4 - Fingers Spread
5 - Double Tap
*/

var getAnglesRelativeToStart = function (input)
{
    // obtains the current angular position of arm relative to the starting zero position 
    newAngles = {
    roll: Math.round(Math.abs(input.roll - zeroPos.roll) * 10),
    pitch: Math.round(Math.abs(input.pitch - zeroPos.pitch) * 10),
    yaw: Math.round(Math.abs(input.yaw - zeroPos.yaw ) * 10)
    };
  return newAngles;
};

var getAngles = function (frame)
{
  // gives us the roll, pitch, and yaw
  var values = {
      roll: Math.atan2(2.0 * (frame.rotation.w * frame.rotation.x + frame.rotation.y * frame.rotation.z), 1.0 -  2.0 * (frame.rotation.x * frame.rotation.x + frame.rotation.y * frame.rotation.y)),
      pitch: Math.asin(Math.max(-1.0, Math.min(1.0, 2.0 * (frame.rotation.w * frame.rotation.y - frame.rotation.z * frame.rotation.x)))),
      yaw: Math.atan2(2.0 * (frame.rotation.w * frame.rotation.z + frame.rotation.x * frame.rotation.y), 1.0 - 2.0 * (frame.rotation.y * frame.rotation.y  + frame.rotation.z * frame.rotation.z))
  };
  return values;

};
hub.on('connect', function() {
  console.log("connected");
});
console.log("begin");
  
hub.on('pose', function(pose) {
  // takeoff
  if (pose.type == 1)
  {
    client.disableEmergency(); // in case drone crashed on previous run
    take_command = true; 
    console.log("taking flight");
    client.takeoff();
    myMyo.unlock(1);
  }
  // landing
  else if (pose.type == 5) 
  {
    take_command = false;
    console.log("landing");
    client.land();
    myMyo.lock();
  }
  // reset the zero position to current position of arm
  else if (pose.type == 4)
  {
    zeroPos = curAngles;
    console.log("position reset");
  }});

hub.on('frame', function(frame) {
  if (take_command === true)
  {
    curAngles = getAngles(frame);
    if (!zeroPos)
    {
      zeroPos = curAngles;
      console.log("reset zero position");
    }
    getAnglesRelativeToStart(curAngles);
    var pitchPercent = newAngles.pitch / 10;
    var yawPercent = newAngles.yaw / 10;
    //var rollPercent = newAngles.yaw / ; // roll movements are less sensitive than others

    if (newAngles.pitch > 3 && pitchPercent > yawPercent)
    {
      if (curAngles.pitch > 0)
      {
        console.log("down");
        client.down(pitchSpeed);
      }
      else
      {
        console.log("up");
        client.up(pitchSpeed);
      }
    }
    else if (newAngles.yaw > 2 && yawPercent > pitchPercent) 
    {
      if (curAngles.yaw - zeroPos.yaw > 0)
      {
        console.log("back");
        client.back(yawSpeed);
      }
      else
      {
        console.log("front");
        client.front(yawSpeed);
      }
    }
    else if (newAngles.roll > 1)
    {
      if (curAngles.roll - zeroPos.roll > 0)
      {
        console.log("right");
        client.right(rollSpeed);
      }
      else
      {
        console.log("left");
        client.left(rollSpeed);
      }
    }
    else
    {
      console.log("stop");
      client.stop();
    }
  }
});
