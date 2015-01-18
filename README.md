This Node.js module maps Myo armband detections in movement to AR.Drone flight commands.

This program, requires client for controlling Parrot AR Drone 2.0, which can be downloaded here (https://github.com/felixge/node-ar-drone) and framework for Thalmic Labs Myo armband, which can be downloaded here (https://github.com/logotype/MyoJS).

To run, just set up the Myo armband and calibrate it for your profile, then run armband.js.

Keys:
ctrl + 'c' : exits the program
'l' : lands the drone
'd' : disables emergency

Gestures:
Double Tap (if locked) : unlock
Fist : takeoff
Double Tap (if drone is flying) : land
Fingers Spread : reset zero position

Movements:
Move Up/Down : Drone moves up/down
Twist Left/Right : Drone moves left/right
Move Hand Left : Drone moves back
Move Hand Right : Drone moves forward
https://www.youtube.com/watch?v=AvAdgFt22ms

