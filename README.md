Live JavaScript regex tester

# Install

# clone submodules
 1. `git submodule update --init`

## Build jQuery (not necessary)
 1. `npm install -g grunt-cli`
 2. `cd vendor/jquery && npm install`
 3. `git checkout $(git describe --abbrev=0 --tags)`
 4. `grunt`
