#!/usr/bin/python

import pafy, json, autovivi

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


def getMetaDataForVideo(_id,_plpafy):
	"""Gets all metaData for a video

    Args:
        _id: the video id index
        _plpafy: the playlist pafy object
    Returns:
        the video object
    """
	video = autovivi.AutoVivification();
	video['views'] = 100
	video['Author'] = 'Albert'
	return video

def getAllVideos(_index, _plpafy):
	"""Gets all Video for current playlist

    Args:
        _index: the current ID of the works
        _plpafy: the playlist pafy object
    Returns:
        nothing for the moment

    """
	_w[_index]['Videos']['Video'][0] = getMetaDataForVideo(23,_plpafy)

def generateJSON(_file):
	"""Generates the JSON String with all metadata 

    Args:
        _file: filepath to JSON file
    Returns:
        nothing for the moment
    """	
	artistlist = open(_file)
	artistlist =  json.load(artistlist)

	for majorkey, videoplayer in artistlist.iteritems():
		for works, value in videoplayer.iteritems():
			# check for dictionary "Works"
			if type(value) == dict:
				for k,v in sorted(value.iteritems()):
					_w[k]['Artistname'] = v['Artistname']
					_w[k]['Concept'] = v['Concept']
					_w[k]['Playlisturl'] = v['Playlisturl']
					try:
						plpafy = pafy.get_playlist(v['Playlisturl'])
						getMetaDataForPlaylist(k,plpafy)	
						getAllVideos(k,plpafy)
					except ValueError:
						print "couldn't get playlist for: " + _w[k]['Artistname']
			# check if dict value is string "Title"		
			if type(value) == unicode:
				works_output['Videoplayer']['Title'] = value


generateJSON('./artistlist_input.json')
print json.dumps(works_output,indent = 2, separators=(',', ': '))
