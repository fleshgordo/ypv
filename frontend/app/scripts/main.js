(function($, window, undefined) {


	var YTP = {

		/* ----------------------------------------------------------------------------------- */
		/* VARIABLES */
		/* ----------------------------------------------------------------------------------- */
		DEBUG: true,
		consoleHolder: console,
		currentArtist: 0,
		currentVideo: 0,
		works: {},
		playerTitle: '',
		assetsPath: '',
		templates: {},
		worksIndex: [],
		videosIndex: [],
		totalWorks: 0,
		totalVideos: 0,
		state: 0,

		/**
		 * Turns on/off console.log
		 */
		debug: function() {
			if (!YTP.DEBUG) {
				YTP.consoleHolder = console;
				console = {};
				console.log = function() {};
			} else {
				console = YTP.consoleHolder;
			}
		},

		/* ----------------------------------------------------------------------------------- */
		/* INIT */
		/* ----------------------------------------------------------------------------------- */

		/**
		 * Global init - load json file with data
		 */
		init: function() {
			// Disable all console.logs if DEBUG=false
			this.debug();
			this.templates = YYY.Templates;

			// load template for site header
			$('#header').append(_.template(this.templates.siteHeader));

			$.ajax({
				url: '../output.json',
				dataType: 'json',
				async: false,
				success: function(data) {
					YTP.playerTitle = data['Videoplayer']['Title'];
					YTP.assetsPath = data['Videoplayer']['AssetsPath'];
					YTP.works = data['Videoplayer']['Works'];
					YTP.totalWorks = Object.keys(YTP.works).length;
					$('#masthead-search-term').val(data['Videoplayer']['Title'])
					YTP.initMenu();
					YTP.bindKeyHandlers();
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus, errorThrown);
				}
			});
		},

		/**
		 * init the menu for the list of playlists
		 */
		initMenu: function() {
			var outputhtml = '',
				path = YTP.assetsPath,
				playlistTemplate = _.template(this.templates.playlist),
				playlistHeader = _.template(this.templates.playlistHeader);

			$('#container').append(playlistHeader);

			$.each(YTP.works, function(index, work) {
				YTP.worksIndex.push(index);
				outputhtml += playlistTemplate(work);
			});
			$('#pl-playlist-table').append(outputhtml);
			$('tbody tr[data-id="' + YTP.worksIndex[YTP.currentArtist] + '"]').addClass('selected');
		},

		/**
		 * init the submenu for the list of videos
		 */
		initSubMenu: function() {
			var outputhtml = '',
				path = YTP.assetsPath,
				playlistDetailTemplate = _.template(this.templates.playlistDetail),
				playlistDetailHeader = _.template(this.templates.playlistDetailHeader),
				ID = YTP.worksIndex[YTP.currentArtist];

			$.each(YTP.works[ID]['Videos']['Video'], function(index, work) {
				work['PlaylistID'] = YTP.works[ID]['PlaylistID'];
				outputhtml += playlistDetailTemplate(work);
			});

			if ($('#pl-video-table').length < 1) {
				$('#container').append(playlistDetailHeader);
			}

			$('#pl-video-table').append(outputhtml);
		},

		/**
		 * Updates the current selected work index
		 * @param {number} - _inc 	true for incrementing, false for decrementing
		 */
		updateCounter: function(_inc) {
			YTP.currentArtist = _inc === true ? YTP.currentArtist += 1 : YTP.currentArtist -= 1;

			if (YTP.currentArtist < 0) {
				YTP.currentArtist = YTP.totalWorks - 1;
			} else if (YTP.currentArtist >= YTP.totalWorks) {
				YTP.currentArtist = 0;
			}
			console.log(YTP.worksIndex[YTP.currentArtist]);
			this.updateMenu();
		},

		/**
		 * Updates the current selected work index
		 * @param {number} - _inc 	true for incrementing, false for decrementing
		 */
		updateCounterDetail: function(_inc) {
			//if (YTP.state === 1) {
			YTP.currentVideo = _inc === true ? YTP.currentVideo += 1 : YTP.currentVideo -= 1;

			if (YTP.currentVideo < 0) {
				YTP.currentVideo = YTP.totalVideos - 1;
			} else if (YTP.currentVideo >= YTP.totalVideos) {
				YTP.currentVideo = 0;
			}
			console.log(YTP.videosIndex[YTP.currentVideo]);
			this.updateSubMenu();
			//}
		},

		/**
		 * Adds/remove active css class for menu entry
		 */
		updateMenu: function() {
			$('#pl-playlist-table tbody tr').removeClass('selected');
			$('#pl-playlist-table tbody tr[data-id="' + YTP.worksIndex[YTP.currentArtist] + '"]').addClass('selected');
		},

		/**
		 * Adds/remove active css class for submenu entry
		 */
		updateSubMenu: function() {
			$('#pl-video-table tbody tr').removeClass('selected');
			$('#pl-video-table tr[data-id="' + YTP.videosIndex[YTP.currentVideo] + '"]').addClass('selected');
		},

		/**
		 * Opens a chosen playlist and show a list of all videos inside
		 */
		openPlaylist: function() {
			var ID = YTP.worksIndex[YTP.currentArtist];
			YTP.state = 1;
			YTP.currentVideo = 0;
			$.each(YTP.works[ID]['Videos']['Video'], function(index, work) {
				YTP.videosIndex.push(index);
			});
			YTP.showHideMenu();
			YTP.totalVideos = Object.keys(YTP.works[ID]['Videos']['Video']).length;;
			YTP.initSubMenu();
			YTP.updateSubMenu();
		},

		/**
		 * Manage appearances of menu list between different states
		 */
		showHideMenu: function() {
			switch (YTP.state) {
				case 0:
					$('#pl-playlist-table').fadeIn();
					$('#pl-video-table').fadeOut();
					$('#pl-video-table').html('');
					break
				case 1:
					$('#pl-video-table').fadeIn();
					$('#pl-playlist-table').fadeOut();
					break;
				case 2:
					break;
			}
		},

		/**
		 * start playback of current selected video
		 */
		startPlayback: function() {
			var ID = YTP.worksIndex[YTP.currentArtist];
			var videoID = YTP.videosIndex[YTP.currentVideo];
			YTP.state = 2;
			console.log('... playback');
			console.log(YTP.works[ID]['Videos']['Video'][videoID]);
			$('#jquery_jplayer_1').jPlayer('destroy').jPlayer({
				ready: function() {
					$(this).jPlayer('setMedia', {
						m4v: YTP.works[ID]['Videos'] + '/' + YTP.works[ID]['Videos']['Video'][videoID]['filename'],
					});
				},
				swfPath: './scripts/',
				supplied: 'm4v',
				solution: "html",
				volume: 0.8,
				muted: false,
				keyEnabled: true,
				cssSelectorAncestor: '#jp_container_1',
				keyBindings: {
					play: {
						key: 32, // p
						fn: function(f) {
							if (f.status.paused) {
								f.play();
							} else {
								f.pause();
							}
						}
					}
				}
			});
		},

		/**
		 * stop playback of current selected video and kill video
		 */
		stopPlayback: function() {
			console.log('stop playback ...');
		},

		/**
		 * Forward/backward scrubbing
		 * @param {boolean} - _direction 	true for incrementing, false for decrementing
		 */
		nextVideo: function(_direction) {
			if (_direction === true) {
				console.log('forward next video');
				YTP.updateCounterDetail(_direction);
			} else {
				console.log('backward video');
				YTP.updateCounterDetail(_direction);
			}
		},

		/**
		 * Bind general key handlers for Storm interface
		 */
		bindKeyHandlers: function() {
			$(document).keydown(function(e) {
				switch (YTP.state) {
					case 0:
						switch (e.which) {
							case 37: // left
								break;
							case 38: // up
								YTP.updateCounter(false);
								break;
							case 39: // right
							case 13: // enter
								YTP.openPlaylist();
								break;
							case 40: // down
								YTP.updateCounter(true);
								break;
							default:
								YTP.updateMenu();
								return;
						}
						break;
					case 1:
						switch (e.which) {
							case 37: // left
								YTP.state = 0;
								YTP.showHideMenu();
								break;
							case 38: // up
								YTP.updateCounterDetail(false);
								break;
							case 39: // right
							case 13:
								YTP.startPlayback();
								break;
							case 40: // down
								YTP.updateCounterDetail(true);
								break;
							default:
								return; // exit this handler for other keys
						}
						break;
					case 2:
						switch (e.which) {
							case 37: // left
								YTP.state = 1;
								YTP.stopPlayback();
								YTP.showHideMenu();
								console.log('exit playback go back to menu');
								break;
							case 38: // up
								YTP.nextVideo(false);
								break;
							case 40: // down
								YTP.nextVideo(true);
								break;
							default:
								return; // exit this handler for other keys
						}
						break;
				}
				e.preventDefault(); // prevent the default action (scroll / move caret)
			});
		}
	}

	$(document).ready(function() {
		YTP.init();
		YTP.openPlaylist();
	});

	// adding object to window for nicer debugging ;)
	window.YTP = YTP;

})(jQuery, window);