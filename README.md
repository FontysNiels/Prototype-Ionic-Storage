# AEM App Connect (not this project's README)

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

<!-- belangrijke files -->

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
<!-- CSS  -->
<!-- Classnames beschrijven per component? -->

By filling the variables inside of the [`.env`](#env) file the project will be able to receive data from your AEM project. The next step in is adding CSS to your project to make it look like the AEM project.

The CSS file you can use for the project is called .... and is located at ....

When the application's components are gereated they inherent a class, these classes are:
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

<!-- .... = css file -->
These classes will already be inside of ...., ready to be used.

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
