#!/bin/bash

echo "### compiling distro with grunt"
grunt -v build --force

## web2exectuable
echo "now you should do your nwjs packaging..."
read -rsp $'Press any key to continue...\n' -n1 key
mkdir ~/Desktop/dist/mac-x64/dist.app/Contents/Frameworks/nwjs\ Helper.app/Contents/MacOS/assets
cp -Rp ~/Documents/ypv/frontend/app/assets ~/Desktop/dist/mac-x64/dist.app/Contents/Frameworks/nwjs\ Helper.app/Contents/MacOS/
cp /Applications/Google\ Chrome.app/Contents/Versions/43.0.2357.124/Google\ Chrome\ Framework.framework/Libraries/ffmpegsumo.so  ~/Desktop/dist/mac-x64/dist.app/Contents/Frameworks/nwjs\ Framework.framework/Libraries/ffmpegsumo.so