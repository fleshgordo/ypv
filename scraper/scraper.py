#!/usr/bin/python

import pafy, json, autovivi
import os, urllib

# vivify our output
works_output = autovivi.AutoVivification();

# this is just to shortcut the path to the most-used dictionary
_w = works_output['Videoplayer']['Works']


def downloadVideos():
	"""Download videos

    Args:
        n: the number to get the square root of.
    Returns:
        the square root of n.
    """
	return 0

def getMetaDataForPlaylist(_index, _plpafy):
	"""Get all metaData for specified playlist

    Args:
        _index: the current ID of the works
        _plpafy: the playlist pafy object
    Returns:
        nothing for the moment
    """
	_w[_index]['Videos']['TotalAmount'] = len(_plpafy['items'])
	_w[_index]['Description'] = _plpafy['description']
	_w[_index]['PlaylistID'] = _plpafy['playlist_id']
	_w[_index]['Youtubename'] = _plpafy['author']
	_w[_index]['Title'] = _plpafy['title']

def timetosec(_time):
	if (len(_time.split(":")) == 2):
		return (int(_time.split(":")[0]) * 60) + int(_time.split(":")[1])
	elif (len(_time.split(":")) == 1):
		return _time
	elif (len(_time.split(":")) == 3):
		return (int(_time.split(":")[0]) * 3600) + (int(_time.split(":")[1]) * 60) + int(_time.split(":")[2])

def sectotime(_time):
	m, s = divmod (_time,60)
	h, m = divmod (m,60)
	return "%02d:%02d:%02d" %(h,m,s)

def getMetaDataForVideo(_id,_plpafy):
	"""Gets all metaData for a video

    Args:
        _id: the video id index
        _plpafy: the playlist pafy object
    Returns:
        the video object
    """
	video = autovivi.AutoVivification();
	video['views'] = _plpafy['items'][_id]['playlist_meta']['views']
	video['description'] = _plpafy['items'][_id]['playlist_meta']['description']
	video['duration'] = _plpafy['items'][_id]['playlist_meta']['duration']
	video['lengthseconds'] = _plpafy['items'][_id]['playlist_meta']['length_seconds']
	video['likes'] = _plpafy['items'][_id]['playlist_meta']['likes']
	video['indexID'] = _id
	video['thumbnailUrl'] = _plpafy['items'][_id]['playlist_meta']['thumbnail']
	video['title'] = _plpafy['items'][_id]['playlist_meta']['title']
	video['username'] = _plpafy['items'][_id]['playlist_meta']['author']
	video['downloadUrl'] = _plpafy['items'][_id]['pafy'].getbestvideo().url
	video['extension'] = _plpafy['items'][_id]['pafy'].getbestvideo().extension
	video['videoID'] = _plpafy['items'][_id]['pafy'].videoid
	video['filename'] = "%s.%s" %(video['videoID'], video['extension'])
	video['resolution'] = _plpafy['items'][_id]['pafy'].getbestvideo().dimensions
	video['filesize'] = _plpafy['items'][_id]['pafy'].getbestvideo().get_filesize()
	#video['videoID'] = _plpafy['items'][_id]['pafy']['duration']
	
	return video

def getAllVideos(_k, _plpafy, _download):
	"""Gets all Video for current playlist

    Args:
        _k: the current ID of the works
        _plpafy: the playlist pafy object
        _download: 0 for not downloading, 1 for fetching
    Returns:
        nothing for the moment

    """
	totalTime = 0

	for i in range(len(_plpafy['items'])):
		_w[_k]['Videos']['Video'][i] = getMetaDataForVideo(i,_plpafy)
		# download videos if download flag is set on
		if _download == 1:
			print "downloading files ..."
			downloadVideo(_k, i, _plpafy)

		totalTime += _w[_k]['Videos']['Video'][i]['lengthseconds']

	_w[_k]['Videos']['TotalDuration'] = sectotime(totalTime)


def downloadVideo(_k, _i, _plpafy):
	if not os.path.exists('assets'):
		os.makedirs('assets')
	newdir = _w[_k]['PlaylistID']
	if not os.path.exists('./assets/' + newdir):
		os.makedirs('./assets/' + newdir)
		print "creating directory: %s" %_w[_k]['PlaylistID']

	videoid = _w[_k]['Videos']['Video'][_i]['videoID']
	fileextension =  _w[_k]['Videos']['Video'][_i]['extension']
	filedestination = './assets/%s/%s.%s' %(newdir, videoid, fileextension)

	# download the video
	_plpafy['items'][_i]['pafy'].getbestvideo().download(filepath=filedestination,quiet=False)

	# download thumbnail file for previewing the playlist only from first video
	if (_i == 0):
		thumbdestination = 'assets/%s/default.jpg' %(_w[_k]['PlaylistID'])
		urllib.urlretrieve(_w[_k]['Videos']['Video'][0]['thumbnailUrl'], thumbdestination)

	# download thumbnails for each video and save as name (videoID.jpg)
	thumbdestination = 'assets/%s/%s.jpg' %(_w[_k]['PlaylistID'], videoid)
	urllib.urlretrieve(_w[_k]['Videos']['Video'][_i]['thumbnailUrl'], thumbdestination)

def generateJSON(_file):
	"""Generates the JSON String with all metadata 

    Args:
        _file: filepath to JSON file
    Returns:
        nothing for the moment
    """	
	artistlist = open(_file)
	artistlist =  json.load(artistlist)

	for key, videoplayer in artistlist.items():
		for works, value in sorted(videoplayer.items()):
			# check for dictionary "Works"
			if type(value) == dict:
				for k,v in sorted(value.items()):
					_w[k]['Artistname'] = v['Artistname']
					_w[k]['Concept'] = v['Concept']
					_w[k]['Playlisturl'] = v['Playlisturl']
					_w[k]['ID'] = k
					if v['Playlisturl'] != "":
						print "getting playlist for: " + _w[k]['Artistname']
						plpafy = pafy.get_playlist(v['Playlisturl'])
						getMetaDataForPlaylist(k,plpafy)	
						getAllVideos(k,plpafy,v['DownloadVideosFlag'])
					else:
						print "couldn't get playlist for: " + _w[k]['Artistname']
			
			# check if dict value is string "Title"		
			if type(value) == unicode:
				works_output['Videoplayer']['Title'] = value

generateJSON('./artistlist_input.json')

with open("output.json", "w") as outfile:
    json.dump(works_output, outfile, indent = 2, separators=(',', ': '))