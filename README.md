This Node.js module maps Myo armband detections in movement to AR.Drone flight commands.

This program, requires client for controlling Parrot AR Drone 2.0, which can be downloaded here (https://github.com/felixge/node-ar-drone) and framework for Thalmic Labs Myo armband, which can be downloaded here (https://github.com/logotype/MyoJS).
May also need module for "keypress" events, found here (https://github.com/TooTallNate/keypress).

To run, just set up the Myo armband and calibrate it for your profile, then run armband.js.

<h2>Keys:</h2>
<p>ctrl + 'c' : exits the program</p>
<p>'l' : lands the drone</p>
<p>'d' : disables emergency</p>

<h2>Gestures:</h2>
<p>Double Tap (if locked) : unlock</p>
<p>Fist : takeoff</p>
<p>Double Tap (if drone is flying) : land</p>
<p>Fingers Spread : reset zero position</p>

<h2>Movements:</h2>
<p>Move Up/Down : Drone moves up/down</p>
<p>Twist Left/Right : Drone moves left/right</p>
<p>Move Hand Left : Drone moves back</p>
<p>Move Hand Right : Drone moves forward</p>
https://www.youtube.com/watch?v=AvAdgFt22ms

