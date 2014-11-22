js_mobile_framework
===================

JavaScript framework / template for one page applications - Loading partial HTML views (pages) and related JS page controllers (async with caching)


- This is a template / framework for one page HTML + JS applications.
- MVC
- It can be succesfully used with the Phonegap on any mobile platform.
- It uses jQuery
- Very light
- Simple to use
- Similar to jQuery Mobile (*page load)

Description:
It will load partial HTML views (pages) into the viewport,
then get related JS controller of the page and execute it.

There are default events triggered when page is loaded / destroyed:
- onPageBeforeLoad
- onPageLoadSuccess
- onPageDrawFinish
- onPageLoadFail

For every page event, there are the default handlers defined in main JS (app.js)
which are executed for every page.
For specific page, you can extend default controllers in related JS controller of the page.

