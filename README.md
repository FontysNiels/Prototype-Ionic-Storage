# AEM App Connect 

---

Welcome to the AEM App Connect repository. If you are reading this README you are probably interested in this project. This README will explain how to use the project to generate your own (mobile) applications by using data from AEM. 


## Getting started:
---
To get started, clone this project/ repository to your local device.

### Installatie
Install all the packages by running the following command:
```
npm ci
```

## Making <ins>YOUR</ins> project:
---
To generate your application using AEM App Connect you will have to edit some files and variables. The files you need to change some things in are: [`capacitor.config.ts`](#capcatorconfigts), the [`assets`](#assets) folder, [`.env`](#env), [`index.html`](#indexhtml) and [`package.json`](#packagejson).

### Capcator.config.ts
This file is responsible for the `appID` and `appName`of he generated application. These can be edited to be variables that correspond with your project in this file.

The file looks as followed:

```
const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'AEM App Connect',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};
```

You can change the variables by editing the content of `appID` and `appName` to the ones that fit your application the best. Don't forget to save this file, otherwise it won't change the variables.

### Assets
You can find the `assets` folder in the *root* of this project/ repository. This folder is ment for the icons/ logo's and or splashscreens of the application

When the application gets generated it checks this folder for any files with the name `icon.png` or `logo.png`. These will be used as the icon/ logo of the appliction.

Make sure to only use this folder for mobile application purposes, it may mess with the icon/ logo generation if you do otherwise.

For more information about the use and generation of the icons/ logo's or the splashscreens check out: https://github.com/ionic-team/capacitor-assets.

### .env
There are two variables in the `.env` file. The `VITE_ROOT_API` and `VITE_ROOT_PAGE`. To get a connection with your AEM project you will need to fill these variables. Take this example for the AEM page Simple: *http://<nolink>localhost:4503/content/wetrain/Demo/Simple.html*</nolink>.

The link will be split in two parts. The first part is the `VITE_ROOT_API` variable, this will have the full link except for the final part. The second part is the `VITE_ROOT_PAGE`, this will be the page itself without the *.html* behind it.


```
VITE_ROOT_API = http://localhost:4503/content/wetrain/Demo/
VITE_ROOT_PAGE = "Simple"
```
The code above showcases what the `.env` file would look like with both variables filled in.

### index.html
You will only need to edit the `index.html` if you want to have a web version. If this is not the case, you can skip this part.

In the `index.html` there are two things to edit. The `title` and the `icon`.

Normally the `title` looks like the example below. To edit or change this you will need to change the `<title>` element. This changes the title of the webpage.

```
<title>AEM App Connect</title>
```
The standard icon/ logo of the webpage is the `icon.png` or `logo.png` from the [`assets`](#assets) folder. If you want to change the webversion's icon/ logo you will have to change the `href` from the `<link>` element. (*Dont use the `assets` folder for to store other images, this will mess with the generation of the application's icon/ logo.*)

```
<link rel="shortcut icon" type="image/png" href="./assets/logo.png" />
```

### Package.json
The `package.json` is also only necessary if you want a webversion of the project. If not you can also skip this one.

After changing these files you can go ahead to the next step.

## CSS
---

By filling the variables inside of the [`.env`](#env) file the project will be able to receive data from your AEM project. The next step in is adding CSS to your project to make it look like the AEM project. Styling your project isn't as straight forward as you might think. In the next bit of documentation we'll try to explain how to style your application the best way possible.

#### Native Look
If you want to have a look at how to project will look on the different native platforms you can go to `App.tsx`. In this file there is a function that changes the look of the project to a native version. This code looks like:
```
setupIonicReact({
  rippleEffect: false,
  mode: 'ios',
});
```
To change the look of the application, change the value of `"mode"` to either `md` for Android or `ios` for iOS. To make sure the styling is loaded refresh the page.

If you are done with styling, comment this part:
```
  // rippleEffect: false,
  // mode: 'ios',
``` 
of the function. This has to be done because this sets the style of the project, even the native one that it generates.

___

### AEM AppConnect Styling
The CSS file we have set up for you to use is called `style.css` and is located at the `theme` folder. If you want to change the styling of the application dratically you should also look to using the `variables.css` file (more on this file later).

When the application's components are generated they inherit a class, these classes are:
- `AEMcontainer` for the container component
- `AEMexperienceFragment` for the experience fragment component
- `AEMbutton` for the button component
- `AEMtitle` for the title component
- `AEMtext` for the text component
- `AEMimage` for the image component
- `AEMseperator`for the seperator component
- `AEMteaser` for the teaser component
    - `AEMteaserpretitle` for the teaser's pretitle
    - `AEMteasertitle` for the teaser's title
    - `AEMteaserdescription` for the teaser's description
    - `AEMteaserimage` for the teaser's image

These classes will already be inside of `style.css`, ready to be used. 

___

### Working with Ionic's styling
<!-- explain that this part is about the "primary" style -->
**Style Variables**
For those who want to fully embrace Ionic's styling, check out `variables.css`. In here you will find all kinds of styling variables. To use these go to an Ionic element. An example of this would be a `IonButton`, which is located in the `buttonComponent.tsx` file. Give the `IonButton` a color variable like this:
```
<IonButton className='AEMbutton' color="primary">{button.content}</IonButton>
```
This will will give it the color that has been declared in the `variables.css`. In this case that would be `--ion-color-primary: #afccff;`(*light blue*). If there is no color defined, it automatically uses `primary`. You can freely change the colors and styling in the `variables.css` to suit your project. Using this styling method is the **prefered way of styling**.

If you want you can also change these style-variables inside the `style.css` like so:

```
body {
  --ion-background-color: white;
  --ion-color-primary: orange;
  --ion-color-primary-contrast: purple;
}
```
Changing it in the `style.css` like this will change it globally, meaning it doesn't check for darkmode anymore. If you REALY want to change the original value's in the `style.css` AND have a darkmode / lightmode check, copy it from `variables.css`.

___

<!-- explain that this part is about a specific component's style -->
**Component Styling**
Your not restricted to the value's given by `variables.css`. If you want to change the entire style of something you can change it in the `style.css` like this:
```
.AEMbutton{
  --background: #93e9be;
  --background-hover: #9ce0be;
  --background-activated: #88f4be;
  --background-focused: #88f4be;

  --color: rgb(233, 13, 134);

  --border-radius: 10px;
  --border-color: #000;
  --border-style: solid;
  --border-width: 1px;

  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);

  --ripple-color: deeppink;

  --padding-top: 10px;
  --padding-bottom: 10px;
}
```
This example shows that you can change alot more then the variables given by `variables.css`. This is just an example, so if you are curios about what else can be changed about each component we recomend going to that component's `CSS Custom Properties` part of the documentation. This is the one for the `IonButton` component: https://ionicframework.com/docs/api/button#css-custom-properties. 

**TIP:** the `--` styling only applies to Ionic elements, so if your trying to style a component such as the `AEMseperator` which is a `<hr>` this will not work.
Styling your mobile application will be a combination of Ionic CSS and normal CSS.

___
<!-- Maybe dat ik dit weghaal... idk -->
**Not Prefered way of styling:**
**WARNING:** the following part is not the prefered way of styling, if you really want to style your project this way, it's at your own risk.

For those who do not wish to work with the Ionic styling, you can change a Ionic component's color to `none` like this:
```
color={"none"}
```

This will fully remove the styling given to it. 

Because Ionic has its own style's there might be some trouble with changing it. If you want more information about what classnames Ionic gives its components you can take a look at produced `HTML` itself or you could use the `variables.css` file.

For something like a change to the background color you might have to edit `--ion-background-color` like this:
```
body{
  --ion-background-color: #000000;
}
```

**WARNING:** this will mess with the native styling of the component. If you wish to change the native styling yourself you should look in and work with the `variables.css` file.  

If you run into any other kinds of styling troubles please seek help directly from Ionic's documentation. https://ionicframework.com/docs/theming/basics

<!-- run BuildApp (name will change) -->
## Builing the mobile application
---

Once eveything is done and the application is ready to be converted to a `Android` or `iOS` application run the following command:

```
npm run BuildApp
```
This will generate the icon/ logo and the splashscreen using the images from the [`assets`](#assets) folder. After generating them it will build the application and mobile versions.

## Opening the mobile appliction
---

After you have generated the mobile versions, you want to be able to export them to a `.apk` for `Andorid` and a `.ipa` for `iOS`. To do this run the command:

```
npx cap open <platform>
```
**Inputs:**
- `platform` (required): `android`, `ios`.

From here on you can export the project as you would any other project from that platform.
<!-- maybe leg uit hoe, maar is niet deel van dit product... -->