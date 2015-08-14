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
				url: '../dump/output.json',
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

		utils: {
			ellipseString: function(_text, _length) {
				return _text.substr(0, _length - 3) + "...";
			},
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

			YTP.state = 2;
			console.log('... playback');
			$('#bgModal').fadeIn().promise().done(function() {
				YTP.initPlayer();
			})

		},

		initPlayer: function() {
			var ID = YTP.worksIndex[YTP.currentArtist];
			var videoID = YTP.videosIndex[YTP.currentVideo];
			YTP.updateSubMenu();
			$('#jquery_jplayer_1').jPlayer('destroy').jPlayer({
				ready: function() {
					$(this).jPlayer('setMedia', {
						m4v: 'assets/' + YTP.works[ID]['PlaylistID'] + '/' + YTP.works[ID]['Videos']['Video'][videoID]['filename'],
					});
					$(this).jPlayer('play');
					$('#jquery_jplayer_1').fadeIn('100').promise().done();
					$('#jquery_jplayer_1').css('width', '100%');
					$('#jquery_jplayer_1').css('height', '100%');
					$('#jquery_jplayer_1 > video').css('width', '100%');
					$('#jquery_jplayer_1 > video').css('height', '100%');
				},
				swfPath: './scripts/',
				supplied: 'm4v',
				solution: "html",
				// size: {
				// 	width: YTP.works[ID]['Videos']['Video'][videoID]['resolution'][0],
				// 	height: YTP.works[ID]['Videos']['Video'][videoID]['resolution'][1]
				// },
				volume: 0.8,
				muted: false,
				keyEnabled: true,
				fullScreen: true,
				cssSelectorAncestor: '#jp_container_1',
				cssSelector: {
					videoPlay: '.jp-video-play',
					play: '.jp-play',
					pause: '.jp-pause',
					stop: '.jp-stop',
					seekBar: '.jp-seek-bar',
					playBar: '.jp-play-bar',
					mute: '.jp-mute',
					unmute: '.jp-unmute',
					volumeBar: '.jp-volume-bar',
					volumeBarValue: '.jp-volume-bar-value',
					volumeMax: '.jp-volume-max',
					playbackRateBar: '.jp-playback-rate-bar',
					playbackRateBarValue: '.jp-playback-rate-bar-value',
					currentTime: '.jp-current-time',
					duration: '.jp-duration',
					title: '.jp-title',
					fullScreen: '.jp-full-screen',
					restoreScreen: '.jp-restore-screen',
					repeat: '.jp-repeat',
					repeatOff: '.jp-repeat-off',
					gui: '.jp-gui',
					noSolution: '.jp-no-solution'
				},
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
				},
				ended: function() {

					YTP.reinitPlayer(true);

				},
				resize: function() {

				}
			});
		},

		reinitPlayer: function(_direction) {
			$('#jquery_jplayer_1').fadeOut('150').promise().done(function() {
				$('#jquery_jplayer_1').jPlayer('destroy');

				if (_direction === true) {
					YTP.currentVideo += 1;
					if (YTP.currentVideo >= YTP.totalVideos) {
						YTP.currentVideo = 0;
						YTP.stopPlayback();
					} else {
						YTP.initPlayer();
					}
				} else {
					YTP.currentVideo -= 1;
					if (YTP.currentVideo < 0) {
						YTP.stopPlayback();
					} else {
						YTP.initPlayer();
					}
				}

			});

		},

		/**
		 * stop playback of current selected video and kill video
		 */
		stopPlayback: function() {
			console.log('stop playback ...');
			$('#jquery_jplayer_1').jPlayer('destroy');
			$('#bgModal').fadeOut().promise().done(function() {
				YTP.state = 1;
				YTP.showHideMenu();
			})

		},

		/**
		 * Show help modal
		 */
		toggleHelp: function() {
			if ($('#helpModal').isVisible()) {
				$('#helpModal').fadeOut();

			} else {
				$('#helpModal').fadeIn();
			}

		},

		/**
		 * Forward/backward scrubbing
		 * @param {boolean} - _direction 	true for incrementing, false for decrementing
		 */
		nextVideo: function(_direction) {
			if (_direction === true) {
				console.log('forward next video');
				YTP.reinitPlayer(_direction);
			} else {
				YTP.reinitPlayer(_direction);
			}
		},

		/**
		 * Bind general key handlers for Storm interface
		 */
		bindKeyHandlers: function() {
			$(document).keydown(function(e) {
				switch (e.which) {
					case 27: // ESC
					case 128: // up on STORM interface
						YTP.toggleHelp();
						break;
				}
				console.log(e.which);
				switch (YTP.state) {
					case 0:
						switch (e.which) {
							case 37: // left
								break;
							case 38: // up
							case 129: // up on STORM interface
								YTP.updateCounter(false);
								break;
							case 39: // right
							case 131: // green key on STORM interface
							case 13: // enter
								YTP.openPlaylist();
								break;
							case 40: // down
							case 130: // down on STORM interface
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
							case 132: // left key on STORM interface
								YTP.state = 0;
								YTP.showHideMenu();
								break;
							case 38: // up
							case 129: // up on STORM interface
								YTP.updateCounterDetail(false);
								break;
							case 39: // right
							case 13:
							case 131: // green key on STORM interface
								YTP.startPlayback();
								break;
							case 40: // down
							case 130: // down on STORM interface
								YTP.updateCounterDetail(true);
								break;
							default:
								return; // exit this handler for other keys
						}
						break;
					case 2:
						switch (e.which) {
							case 37: // left
							case 132: // left key on STORM interface
								YTP.state = 1;
								YTP.stopPlayback();
								YTP.showHideMenu();
								break;
							case 38: // up
							case 129: // up on STORM interface
								YTP.nextVideo(false);
								break;
							case 40: // down
							case 130: // down on STORM interface
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