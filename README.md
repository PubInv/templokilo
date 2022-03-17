# pjournal (but we need a better name)

This is a system for easily using a phone or computer to upload a geolocated photo to create a spatial and temporal database. The database can then be viewed on a map.

The general purpose is to create a journalistic record that allows study or open source intelligence (OSINT).

There is a [project](https://github.com/orgs/PubInv/projects/1) tracking this repo.

## Status

This is a fork of geotagtext, a geotagging tutorial app written by Robert L. Read, Diego Aspinwall, and Neil Martis.
Currently the only expected author of this fork is Robert L. Read, although he is seeking volunteers!

As of March 10th, the project allows you to upload multiple photos and automatically extracts geolocation and time information to place markers on a map.
A color scale is used to represent time over the range of all photos uploaded. 
Clicking on a marker brings up a photo. The image below was made by walking near Barton Springs in Austin and using an iPhone to take 16 pictures.

![Screen Shot 2022-03-10 at 2 49 43 PM](https://user-images.githubusercontent.com/5296671/157765351-7674ffb8-0fbb-4c3a-9b60-4ad4dd989090.png)

As of right now, the persistence of photos in in the local file system, but the metadata is in firebase. We are going to change this operate on a local install 
of MongoDB.


## Basic Idea

The goal of this project is to allow a group of people, perhaps in an emegency situation, to geotag locations
to be on a map. Like all Public Invention projects, it is free-libre open source.

Imagine using your phone to place a red tag on a flooded area, or where a person needs help, and
green tag on a road which is passable.

More generally, the ability to quickly upload a photo and have it reliably placed in time and space
with the "EXIF" data typically embedded by modern phones will allow a GUI that is a valuable journalastic
record of an event.

In particular, this response was made in response to the invasion of the Ukraine by Russia and
the potential need for making a journalistic record of that event.

## Other Features Needed

1. The ability to enter brief descriptions
2. The ability to tag entries
3. We may need to make an app for a smartphone that can take a picture and send it directly to the database.
4. We need a security model. Although the idea is to provide free and open software as well as functionality, we may need to implement some sort of anti-vandalism features. At a minimum, a user must be free to install a private secure instance.

## Basic Technology

The web page use the geolocation feature now built in to most browsers and accessible via JavaScript.

It uses free and open map technology.

## Usage

This was recently hosted at Heroku. It uses an express server.
I am currently moving away from heroku for this app.

Like most node apps, you will want to run:

> npm install

To pull in all needed libraries.

The fundamenal way to run it without
using heroku and Procifle is to set certain environment variables that contain "secrets":

> export apiKey=
> export authDomain=
> export databaseURL=
> export mapbox_accessToken=
> export messagingSenderId=
> export projectId=
> export storageBucket=

And then run the express server:

> node server.js

The web application with then be running on port :3000.

## Ancient History

Begun by Neil Martis and Rob Read. Improved by Diego Aspinwall.
Written as a [tutorial](https://medium.com/nerd-for-tech/geotagtext-a-tutorial-a-free-geotagging-web-application-composed-of-free-tools-b42bcbcca202), then forked on Feb. 26th, 2022, the 3rd day of the invasion of Ukraine, by Robert L. Read.
