Hey WDD staff:

My code is a mess. To make your lives and my life easier here's a quick runthrough of where to look. My submission may break one or more of the requirements - please use your discretion.

-There are a ton of dependencies: run npm install and bower install before doing anything. Then, to run it on localhost, use gulp serve.

-The six JQuery functions (probably 5) are implemented in src/app/components/search/search-directive.js and src/app/components/card/card-directive.js. From my memory, I used .children, .parent, .hasClass, .css, .addClass, and .removeClass.

-My CSS is in src/app/index.scss. Don't look at the compiled CSS, it's probably not going to be a good time.

Thanks again!

-Lily
