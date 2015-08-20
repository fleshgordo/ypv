# YPV Youtube playlist videoplayer

This Youtube videoplayer takes a bunch of Youtube playlists and downloads their metadata and videofiles in order to display its findings as a web-interface for playback. It heavily relies on [Pafy](https://github.com/mps-youtube/pafy) and [youtube-dl](https://rg3.github.io/youtube-dl/). The frontend part is using Yeoman and the web-generator app while using a [STORM interface](http://www.storm-interface.com/) for the final installation.

The scripts found here were written for an exhibition titled "Art and Playlists from 10 Years" at the [Kunsthaus Langenthal](http://www.kunsthauslangenthal.ch/), curated by Raffael Doerig in August 2015.  

Written by Gordan Savicic, July-Aug 2015

## INSTALL

```
sudo pip install youtube-dl
sudo pip install pafy
```

## HOWTO

### Scrape videos

`python scraper.py >> output.json`

### Frontend 

Install bower, yo and grunt-cli

`npm install -g yo bower grunt-cli gulp`

Checkout from github and install bower and node_modules:

`git clone https://github.com/fleshgordo/ypv.git`

`bower install --save`

`npm cache clean && npm install`

Now, let's start the live-server for development:

`grunt -v serve`

And build the final distro package:

`grunt -v build`

### Frontend APP

Using [web2executable](https://github.com/jyapayne/Web2Executable)

The assets folder should not be compiled inside the node-webkit app. It will be directly copied into the final built.

Check package.sh for details

### Interface

Using a Storm EZ Access 5 keys interface (older generation. EZkeys software is not compatible with. Hence, keycodes can't be reprogrammed!). 
Keycodes are:
 
* Back button: 132 (on osX this one doesn't work = keycode 0)
* Up arrow: 129
* Down arrow: 130
* Green button: 131
* Blue button (?): 128

## Appendix

### JSON Filestructure for scraper (artistlist_input.json)

```
{
	"Videoplayer": {
		"Title" : "General title for the Youtube Exhbition/Player", 
	    "Works": {
	    	"Artistname": "The name of the artist",
	    	"Concept": "Text about the playlist concept"
	    	"ID": "Incrementing ID",
	    	"Playlisturl": "The url of the playlist",
	    	"Title": "The title of the playlist",
	    	"DownloadVideosFlag": "boolean 0 for no download, 1 for download videos"
	    	"DownloadMetaFlag": "boolean 0 for no download e. q. keep metadata from existing file, 1 for live download meta"
		}
	}
}
```

### JSON Filestructure for player

```
{
    "Videoplayer": {
    	"AssetsPath" : "the path to all media assets",
    	"Title" : "General title for the Youtube Exhbition/Player", 
    	Works: {
	        "Artistname": "The artist's name",
	        "Concept": "Text about the playlist concept",
	        "Description": "A description to the playlist",
	        "ID": "Increment number; in case we want to change order of videos",
	        "PlaylistID": "The id of the playlist",
	        "PlaylistThumb": "The name of the thumbnailfile",
	        "Playlisturl": "The full url of playlist incl. https:// http://",
	        "Title": "The title of the playlist",
	        "Youtubename": "The name of the youtube author who created the playlist",
			"Videos": {
	            "TotalAmount": "The number of videos in playlist",
	            "TotalDuration": "HH:MM:SS",
	            "Video": {
					"Author": "The author of the video",
					"Description": "The video description text",
					"DownloadUrl": "The url for the video in best available resolution",
					"Duration": "HH:MM:SS",
					"Filename": "The filename of the video",
					"Filesize" : "Filesize in bytes"
					"Extension": "mp4|webm|flv",
					"IndexID": "Increment number; in case we want to change order of videos",
					"Likes": "The number of likes received for the video",
					"Resolution": "Video size as tuple (x,y)",
					"Thumbnail" : "Url to thumbnail file"
					"Title": "The title of the video",
					"Username": "The username of the uploader",
					"VideoID": "The 11-character video id"
					"Views": "The viewcount of the video",
	            }
	        }
        }
    }
}
```