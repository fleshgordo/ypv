== README youtube generator

== INSTALL

'sudo pip install youtube-dl'
'sudo pip install pafy'

== JSON FILESTRUCTURE FOR SCRAPER
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
		}
	}
}

== JSON FILESTRUCTURE FOR PLAYER

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
	        "Playlisturl": "The full url of playlist incl. https:// http://",
	        "Playlistlist": "Optional: A comma-seperated list of all urls of all playlists",
	        "Title": "The title of the playlist",
	        "Youtubename": "The name of the youtube author who created the playlist",
			"Videos": {
	            "TotalAmount": "The number of videos in playlist",
	            "TotalDuration": "HH:MM:SS",
	            "Video": {
					"Author": "The author of the video",
					"Description": "The video description text",
					"Duration": "HH:MM:SS",
					"Filename": "The filename of the video",
					"Filesize" : "Filesize in bytes"
					"Extension": "mp4|webm|flv",
					"ID": "Increment number; in case we want to change order of videos",
					"Likes": "The number of likes received for the video",
					"Thumbnail" : "Url to thumbnail file"
					"Title": "The title of the video",
					"Username": "The username of the uploader",
					"VideoID": "The 11-character video id"
					"VideoResolution": "",
					"Viewcount": "The viewcount of the video",
	            }
	        }
        }
    }
} 

== SCRAPER

