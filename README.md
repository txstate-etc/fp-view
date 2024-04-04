# FacultyProfiles-View

This is the view layer for the Faculty Profiles service stack that includes the [fp-sync](https://git.txstate.edu/mws/fp-sync) repo for synchronizing data from [Faculty Qualifications](https://itac.txst.edu/support/faculty-qual.html) (Digital Measures) and the [fp-api](https://github.com/txstate-etc/fp-api.git) repo providing a seperately maintained backend API for interacting with the data. With the Digital Measures service serving as the data entry and management system, and with the info presented in Faculty Profiles being public information, Faculty Profiles doesn't need a separate administrative interface from this view renderer.

This view renderer service provides the following pages:

- Main Screen (Homepage) routed to by `/`
  - Search Bar with optional College/Department context to search within.
  - Brief blurb about what Faculty Profiles is for visitors.
- Search Results routed to by `/search`
  - With no search value:
    - Defaults to listing all profiles or all profiles of a college/department context.
    - The sorting is not clearly discernable.
  - With search value:
    - Lists matches by type with each type of match being accessible via tabs.
    - Tabs/Types - in precedence order - are:
      - Faculty Name
      - Scholarly/Creative Work
      - Interests
      - Grants
      - Awards
      - Service
    - First tab/type precedence with corresponding matches will be the selected tab for display.
    - Searches will greedily match the search term with searched content matching on not just a full case insensitive match of the search term but if the search term begins with the searched content word.
- Colleges/Departments Page routed to by `/departments`
  - Search Bar and College/Department context like Main Screen's.
  - Tiles of Colleges with Department listed within them
    - Tiles link to search for all profiles in the corresponding college.
    - Departments link to search for all profiles in the corresponding department.
- Photos Page routed to by `/photos`
  - Flexbox photo-bank of all available profiles pictures with the associated profile's name and whether the profile picture is a face-shot photo or not.
  - The names link to the associated profile.
  - These are paged with 100 profiles per page and no discernable sort order.
- Faculty Profile Pages routed to by `/profile/:facultyID`
  - Portrait picutre (if found in Faculty Qualifications else symbolic default)
  - Directory information and conditionally (if more than one) collapsable list of department associations.
  - Anchor tag links to subsections of the page [Scholarly/Creative Work, Awards, Grants, Service]. Each link is only provided if the subsection exists for that profile.
  - `Download Faculty CV` button.
  - Biography and Interests section (if found in Faculty Qualifications)
  - Selected Scholarly/Creative Work summary section (if found in Faculty Qualifications)
    - Button at the bottom to full list of Works routed to by `/profile/:facultyID/activity/scholarly-creative`
  - Selected Awards and Grants summary tiles (each only displayed if found in Faculty Qualifications)
    - Button to full list of Awards routed to by `/profile/:facultyID/activity/awards`
    - Button to full list of Grants routed to by `/profile/:facultyID/activity/grants`
  - Selected Service Activities summary section (if found in Faculty Qualifications)
    - Button to full list of Activities routed to by `/profile/:facultyID/activity/service`
- Faculty Profiles - Details Lists routed to by sub-directories of `/profile/:facultyID/activity`
  - Scholarly/Creative Works - the `scholarly-creative` subdirectory under the profile's activities.
    - Small profile image, name, and title that navigate back to profile's home page when clicked.
    - All of the profile's Scholarly/Creative Works grouped and sorted by year descending.
  - Awards - the `awards` subdirectory under the profile's activities.
    - Small profile image, name, and title that navigate back to profile's home page when clicked.
    - All of the profile's Awards grouped and sorted by year descending.
  - Grants - the `grants` subdirectory under the profile's activities.
    - Small profile image, name, and title that navigate back to profile's home page when clicked.
    - All of the profile's Grants grouped and sorted by year descending.
  - Service Activities - the `service` subdirectory under the profile's activities.
    - Small profile image, name, and title that navigate back to profile's home page when clicked.
    - All of the profile's Service Activities grouped and sorted by year descending.

## To get started

For the following to work as a development standalone you'll need to also have the [fp-api](https://github.com/txstate-etc/fp-api.git) repo checked out to a sibling directory.

Ensure the [fp-api](https://github.com/txstate-etc/fp-api.git) is checked out to a sibling directory and run `npm install` in <u>this directory</u> and that <u>fp-api sibling directory</u> to get all npm package dependencies downloaded for working on Faculty Profiles.

Once you have both repos cloned to your development environment as sibling directories run the following under this, the fp-view, direcotry to instantiate a localhost instance at port 3000:

`docker compose up --build`

  > Do we need to add a section for cloning data from qual/prod to help seed test data?

## Minified code

Rather than using a bundler or compiler to produce chunked js scripts to load for pages this project makes use of downloaded minified code files which it hosts in support of its pages. All the following items are downloaded to the `./public/javascripts/` directory. Some, like chosen, are an entire directory structure of supporting files and scripts.

- [`chosen`](https://harvesthq.github.io/chosen/) is used for our Colleges/Departments single select drop-down and depends on `jquery` so may break when we update `jquery`. You may need to verify the dependencies between the two before updating them though it appears `chosen` contains its own dependencies needed set of minified jquery code (needs verrification).
- [`select2`](https://select2.org/) is used for our Colleges/Departments single select drop-down and depends on `jQuery` so may break when we update `jQuery`. We were previously using [`chosen`](https://harvesthq.github.io/chosen/) but that widget stopped being maintained before they implemented ARIA support which is required for our publicly facing services.
  - The `select2.min.js` file is copied from their download `dist/js` directory to `./public/javascripts`.
  - The `select2.min.css` file is copied from their download `dist/css` directory to `./public/stylesheets`.
- [`jquery`](https://jquery.com/) minified code is downloaded to the `./public/javascripts` directory and hosted from there rather than referencing/trusting latest versions from the web.
- [`jquery-ui.tabs`](http://jqueryui.com/tabs/) minified code is used with our search results tabs.
  - `jquery-ui.tabs.min.css` file is seperately hosted under `./public/stylesheets` and you may need to reference the link at the top of the existing file to figure out what rolled theme to download for this project.
  - When downloading latest versions of the `jquery-ui` library from their download page you can follow what's been done in the past:
    - Select corresponding version radial.
    - Uncheck the `Toggle All` checkbox.
    - Scroll down to `Widgets` section and check the `Tabs` checkbox. That will check all dependencies for you.
    - The Base theme is fine - I believe there's custom css overrides in place that works with those tab elements.
    - Click the `Download` button to start the download (takes a few moments before it starts).
    - From the zip file extract the folder and copy out the corresponding minified files renaming them to...
      - `jquery-ui.min.js` &rarr; `jquery-ui.tabs.min.js` copied to the `./public/javascripts` directory.
      - `jquery-ui.min.css` &rarr; `jquery-ui.tabs.min.js` copied to the `./public/stylesheets` directory.
    - Also copy the `images` directory out of the folder and into the `./public/stylesheets` as an `images` subdirectory in it.
    - The rest of the downloaded contents isn't needed and can be thrown away as those two files have everything needed for this project.

## Automated Testing

This repo uses Playwright Test to help write and execute automated test routines. The existing tests that have been defined for this repo can be found under the `./testing/tests` directory with a `.spec.ts` file extention.
