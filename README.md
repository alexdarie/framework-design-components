# One approach on building a standalone Web Component using Stencil

The following commands describe our setup for the StencilJS component.

``` zsh
$ npm init stencil components framework-design-components
  Need to install the following packages:
    create-stencil
  Ok to proceed? (y) y
  ...
  Happy coding!
  
$ cd framework-design-components

$ npm install

$ npx stencil generate album-view-component
  [17:51.6]  @stencil/core
  [17:51.7]  v2.16.1
  Which additional files do you want to generate? ›
     {\textcolor{teal}{Stylesheet (.css)}}
     {\textcolor{lightgray}{Spec Test  (.spec.tsx)}}
     {\textcolor{lightgray}{E2E Test (.e2e.ts)}}
  ...
  The following files have been generated:
    - ./src/components/album-view-component/album-view-component.tsx
    - ./src/components/album-view-component/album-view-component.css

$ npm install @ionic/core@latest

$ npm install ionicons

$ open .
```

Before writing the main functionilities of the web component, we import the ionic core and the ionicons.

``` js
import "@ionic/core";
import "ionicons";
```

Then, we have to build and publish to npm.

```
$ npm run build
  > framework-design-components@0.2.1 build
  > stencil build --docs

  [39:28.9]  @stencil/core
  [39:29.0]  v2.16.1
  [39:29.9]  build, framework-design-components, prod mode, started ...
  [39:30.0]  transpile started ...
  [39:31.3]  transpile finished in 1.27 s
  [39:31.3]  copy started ...
  [39:31.3]  generate custom elements started ...
  [39:31.3]  generate lazy started ...
  [39:31.7]  copy finished (2670 files) in 456 ms
  [39:35.6]  generate custom elements finished in 4.38 s
  [39:37.7]  generate lazy finished in 6.40 s
  [39:37.7]  created readme docs: album-view-component
  [39:37.8]  {\textcolor{teal}{build finished}} in 7.88 s

$ npm publish
  npm notice Publishing to https://registry.npmjs.org/
  + framework-design-components@0.2.1
```

Further on, we test the effort with an Ionic app.

``` zsh
$ ionic start testnpm blank
  Framework:
  - Angular | https://angular.io
  React   | https://reactjs.org
  Vue     | https://vuejs.org

$ cd testnpm

$ npm i firebase-tools

$ ng add @angular/fire
  ? What features would you like to setup? ng deploy -- hosting, Firestore, Cloud Storage
  Using firebase-tools version 11.0.1
  ? Which Firebase account would you like to use? alexdarie2251@gmail.com
  ✔ Preparing the list of your Firebase projects
  ? Please select a project: alexdarie
  ? Please select a hosting site: [CREATE NEW SITE]
  ? Please provide an unique, URL-friendly id for the site (<id>.web.app): test-web-components
  ✔ Preparing the list of your Firebase WEB apps
  ? Please select an app: [CREATE NEW APP]
  ? What would you like to call your app? test
  ✔ Creating your Web app
  ✔ Downloading configuration data of your Firebase WEB app

$ firebase init hosting
  ? What do you want to use as your public directory? www
  ? Configure as a single-page app (rewrite all urls to /index.html)? Yes
  ? Set up automatic builds and deploys with GitHub? No
  ? File www/index.html already exists. Overwrite? No
  i  Skipping write of www/index.html

  i  Writing configuration info to firebase.json...
  i  Writing project information to .firebaserc...

  ✔  Firebase initialization complete!

$ ionic build --prod --release

$ firebase deploy --only hosting
  === Deploying to 'alexdarie-2251'...

  i  deploying hosting
  i  hosting[alexdarie-2251]: beginning deploy...
  i  hosting[alexdarie-2251]: found 1483 files in www
  ✔  hosting[alexdarie-2251]: file upload complete
  i  hosting[alexdarie-2251]: finalizing version...
  ✔  hosting[alexdarie-2251]: version finalized
  i  hosting[alexdarie-2251]: releasing new version...
  ✔  hosting[alexdarie-2251]: release complete

  ✔  Deploy complete!

  Project Console: https://console.firebase.google.com/project/alexdarie-2251/overview
  Hosting URL: https://alexdarie-2251.web.app
```

Out data is stored on firebase, with a structure as depicted in the following screen capture.

![](https://github.com/alexdarie/framework-design-components/blob/main/readme-files/Screenshot%202022-06-08%20at%2016.50.39.png)

The final result resambles the following depiction.

![](https://github.com/alexdarie/framework-design-components/blob/main/readme-files/Screenshot%202022-06-08%20at%2016.55.01.png)
