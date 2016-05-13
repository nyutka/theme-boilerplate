## Skeletal Theme
This is our basic theme. The one to rule them all. Whenever we have to build a theme this is the structure that we want to use.

## Dependencies
* [Node JS](http://nodejs.org/)
* [Gulp](http://gulpjs.com/)

## Installation
1. install NPM, see: https://docs.npmjs.com/
2. cd into the root directory of the theme where `package.json` is located.
3. install GULP, see: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md (steps 1 and 2)
4. run `npm install`
5. run `gulp`
6. open browser on http://localhost:3000/

## Running
1. `gulp`: Runs the default Gulp task. This builds the project with source maps from the `app` folder into the `build` folder, spawns a Node server, opens a new browser with the website at http://localhost:3000, and listens for subsequent changes. When you edit and save a new file, Gulp will recompile accordingly and refresh your browser window with the latest changes automatically.
2. `gulp build`: Builds project from the `app` folder into the `build`, uglifies the JS, and minifies the CSS. This should generally be run prior to committing/pushing your code to the repo.


## Folder Structure

* `app/`: All the pages of the theme go in the root  of this folder
* `app/js/`: All the JS files should be added here.
* `app/css/`: All the css, sass and whatever else that will be spit out as css in the build should be added here.
* `app/images/`: All the custom images should be added here.
* `app/fonts/`: All the custom fonts should be added here.
* `app/includes/`: This is where the html templates live.
* `build`: This is where the theme is written after it has been compiled. This directory should never be touched, since it only contains generated code.
* `gulp`: All gulp tasks go here.
* `gulpfile.js`: This references all of the tasks in `gulp/tasks/`. Tasks are broken apart for organizational purposes and referenced from this root file when you run `gulp`.
* `webpack.config.js`: This is where the configuration for the webpack lives.
* `package.json`: This contains all the js libraries required by the theme.
* `node_modules`: This is where the dependencies from package.json are saved.
* `README.md`: You're reading it.

## How it works
* Gulp runs all the task required to build the site. It runs webpack for bundling JS. It copies over all the assets inside app/ to build/ director where the compiled version of site lives.
* Webpack takes all the js (including vendor libraries) and css, and bundles them into `main.js`, `vendor.js` and `main.css`. When a theme is deployed, webpack takes care of compiling all links and making them production ready.

## Installing a new JS library
If you want to install a new library, add it to package.json. Please avoid downloading third party libraries into the JS directory.

#### Using Sourcemaps
Init leverages JS and Sass sourcemapping for easy debugging. The sourcemaps are automatically built — all you need to do is configure your browser to use them.

##### Example set up using Chrome Dev Tools:

1. Run `gulp` to get your server running.
2. In Chrome Inspector, go into settings and make sure sourcemaps are enabled for both JS _and_ CSS.
3. Open the "Sources" tab in the inspector, and in the side pane on the left, right-click and select "Add Folder to Workspace". Select the root folder of the project, from your file system.
4. At the top of the browser, Chrome will prompt you for access. Click the "Allow" button.
5. In the left side pane of the Sources tab, you should now see your project folder. Expand it and and drill down to any one of your Sass partials. Click it once. In the middle pane, an alert should come up asking if you want to map the workspace resource. Click the "more" link to expand the dialog, then click "Establish the mapping now...".
6. A list of files should come up. Select the one that matches the file you just clicked on (generally the first one).
7. Inspector will want to restart.
8. That's it! Your local files should be tied to the sourcemaps the site loads. Now, when you inspect an element, look at the CSS pane and it should have a link to the exact partial for each rule declaration.

## Common issues

#### When I run `gulp`, the command line errors out. WTF?
Make sure you've installed _ALL_ dependencies specified above. Also, make sure you have up-to-date versions of Ruby and Node.

#### Why is Gulp not picking up on changes that I made to a file?
The `watch` task only picks up on changes made to files that existed when the task was started. When you edit a Gulp task, a config file, or add any new file to the `app` folder, you must stop and restart Gulp.