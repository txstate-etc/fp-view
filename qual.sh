#!/bin/sh
# Pass version as first argument - REQUIRED.
#VER="${1:-`git symbolic-ref -q --short HEAD || git describe --tags --exact-match`}"
VER=$1
GITBRANCH=`git symbolic-ref -q --short HEAD`
GITTAG=`git describe --tags --exact-match 2>/dev/null`
COMMIT=$(git rev-parse HEAD)
integrityExit () {
  echo $1
  echo "Aborting build to preserve build tag integrity with commits." && exit 1
}
# Ensure we're building from committed changes.
if `git diff-index --quiet HEAD --`; then
  echo "Active branch $GITBRANCH is clean. Continuing with checks..."
else
  integrityExit "Active branch $GITBRANCH is dirty. Please commit changes to associate with build."
fi
# Ensure we're tagging with a version and not a branch name.
if [ "$VER" = "$GITBRANCH" ]; then
   integrityExit "Not tagging commit $COMMIT on branch $GITBRANCH with tag $GITBRANCH. Please provide a versioning argument."
fi
# Ensure our version paramenter is not in conflict with an existing commit tag.
if [[ "$GITTAG" != "" && "$GITTAG" != "$VER" ]]; then
  integrityExit "Not overwriting existing tag $GITTAG on commit $COMMIT with new tag $VER."
fi
# Ensure we're able to tag the commit with the version.
if [ "$VER" = "$GITTAG" ]; then
  echo "Commit $COMMIT is already tagged as $GITTAG."
else
  if `git tag $VER $COMMIT`; then
    echo "Tagged commit $COMMIT on branch $GITBRANCH with tag $VER."
  else
    integrityExit "Failed to tag commit $COMMIT on branch $GITBRANCH with tag $VER."
  fi
fi
# Ensure our package version is in sync with the tags.
if `npm version $VER`; then
  echo "Updated package.json version to $VER."
else
  integrityExit "Failed to update package.json version to $VER."
fi
echo "Proceeding with versioned builds..."
docker build -t registry.its.txstate.edu/search-featured-results .
docker tag registry.its.txstate.edu/search-featured-results registry.its.txstate.edu/search-featured-results:$VER
docker push registry.its.txstate.edu/search-featured-results
docker push registry.its.txstate.edu/search-featured-results:$VER
docker build -t registry.its.txstate.edu/search-featured-results-cron -f Dockerfile.cron .
docker tag registry.its.txstate.edu/search-featured-results-cron registry.its.txstate.edu/search-featured-results-cron:$VER
docker push registry.its.txstate.edu/search-featured-results-cron
docker push registry.its.txstate.edu/search-featured-results-cron:$VER
git push origin --tags
