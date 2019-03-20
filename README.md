# Stars&Planets App

A simple demo project using MEAN stack plus Bootstrap. It's a single page app 
which allow the user to navigate through the database of stars and planets. 
The user can view the detailed information about the star by clicking it, 
can edit the information about the star and also can add new stars to the catalog.

## Versions

MongoDB `3.1.13`

Express `4.16.4`

Angular `7.2.0`

NodeJS `10.15.3`

Bootstrap `4`

## Platform

The app is being deployed to the 
[Heroku](https://stars-and-planets.herokuapp.com/) platform and uses the 
mLab as a host for the MongoDB.

## TO DO

Modify Star model in order to also keep the id of each star, 
which might be useful when editing the properties of a star.

Modify the way the star-nav component gets the data(see planets component).

Finish the star-edit component so that the changes are sent to DB.

Check if the components work with copies or references 
(use JSON.parse(JSON.stringify() to make a deep copy).

Try fix the issue when the back button is clicked and no data is displayed.

Move all server related operations to server.service.ts.
