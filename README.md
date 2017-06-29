#SimpleReactReduxPanZoomApp

A simple react/redux app that creates an image pan and zoom experience!

### Getting Started

```
> git clone https://github.com/CarlosOlave/SimpleReactReduxPanZoomApp.git
> cd SimpleReactReduxPanZoomApp
> npm install
> npm start
```

Open browser and go to http://localhost:8080/

### SUPPORT

Desktop tested in Chrome 59.0.3071.115, Safari Version 9.1.2, and Firefox V53.0.2
Mobile tested in Chrome mobile simulator Iphone 5, 6, and 6S

### App Description

REACT:

This application can be broken down into three components:

1) zoom_toolbar component that contains the zoom in/out buttons
2) pan_zoom_panel component that contains the image for pan and zoom experience
3) pan_zoom_app component that is the main container and holds the zoom_toolbar and pan_zoom_panel components

because the component breakdown I decided to go with building it using React

REDUX:

The pan_zoom_panel and zoom_toolbar components need to talk to each other

1) zoom_toolbar needs to tell the pan_zoom_panel to zoom in/out
2) zoom_toolbar needs to listen to pan_zoom_panel to update the styling of its zoom in/out icons (enable or disable)
3) pan_zoom_panel needs to listen to zoom_toolbar to zoom in/out

because of these It felt appropriate to introduce REDUX as the communication bridge between the components. A different approach could be to have the pan_zoom_app container hold the state and pass callbacks between zoom_toolbar and pan_zoom_panel components

I think having REDUX is a cleaner solution and also adds a nice capability to potentially have other components update pan_zoom_panel state without much work

ZOOM/PAN:

To accomplish zoom in/out and panning effects I went with using a 2D matrix and transformations. The zoom in/out effect is accomplish by a simple X/Y scale and panning by X/Y translate. The transformation are perform against the a center origin

### Improvements

1) Add user capiblity to specify the image to zoom pan. This can be done by having an input field where they can put an image source url and upload button. Right now for the purpose of this project the image source is hardcoded in the pan_zoom_panel component

2) Another cool feature could be to have a mini navigation view of the image. The navigation view gets updated as the user zooms in/out and/or is panning. Because the app is using REDUX the new component could listen to the changes to the pan_zoom_panel state and after some translation apply the same changes to the navigation view