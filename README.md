# geotagtext

This is a system for easily using a phone or computer to tag a geolocation with a simple message.
We have a prototype [here](https://pubinv.github.io/geotagtext/).

## Basic Idea

The goal of this project is to allow a group of people, perhaps in an emegency situation, to geotag locations
to be on a map. Like all Public Invention projects, it is free-libre open source.


Imagine using your phone to place a red tag on a flooded area, or where a person needs help, and
green tag on a road which is passable.

## Basic Technology

The web page use the geolocation feature now built in to most browsers and accessible via JavaScript.

It uses free and open map technology.

Currently it uses Google Firebase as a simple backend to provide shared persistence.

## Goals

The goal is to further enhance and build on the existing application thereby developing an application user interface or a
public API which can used and incorporated into existing applications or a brand new project for example during natural disaster
or in applications like Free Little Libraries or Free Little Food Pantries.

## How to Help

It is possible this project will be assisted by students of Brown University in their "CS for Social Change" class. However,
we are happy to have anyone help.

### Help us think of good uses

The easisest way to help us to help us think of compelling uses for this fundamental technology. For example,
we have toyed with the idea of creating a game: one person walks through a city laying down red dots, and the
goal of the other players is place a green dot with 10 meters of each red dot.

However, this technology could be used for much more interesting things:

* Tagging invasive plant species for removal.
* Tagging hard-to-remove litter (such as old tires) for removal.
* Marking road or trail hazzards or cleared sections.

A good designer or creative person could specify a particular target for us to work on.

### Move to Bootstrap

The current GUI was done as quickly as possible. An improved mobile-friendly GUI would be a step forward.

### Develop New Features

* Allow tags to be directly responded to. For example, a click a red dot and add a textual response like: "Yeah, picked up that tire."
* Provide a way for tags to be removed.
* Provide a way for users to create an entire new database, perhaps with a simple URL parameter, for their own purposes.
* Provide an administrative interface that lets a dataset be cleaned up.
* Provide a means for a dataset to be exported/imported.
* Allow written text and/or photos to be added to a geotag.
* Provide a "proximity feature" that allows events to be created when, for example, a green dot is placed next to a red dot.

### Document Use

The system currently gives no indication how to use it.

The internal code was hacked together as quickly as possible in about 5 2-hour sessions be Neil and Rob; it is very sloppy.

## History

Begun by Neil Martis and Rob Read.





