var YYY=YYY||{};!function(a){a.Templates={},a.Templates.siteHeader=['<div id="yt-masthead-container" class="clearfix yt-base-gutter">','    <div id="yt-masthead">','        <div class="yt-masthead-logo-container">','            <a id="logo-container" class="spf-link  masthead-logo-renderer yt-uix-sessionlink"><span class="logo masthead-logo-renderer-logo yt-sprite"></span><span class="content-region">Langenthal</span></a>',"            </div>","        </div>",'        <div id="yt-masthead-user" class="yt-uix-clickcard">','            <a class="yt-uix-button   yt-uix-sessionlink yt-uix-button-default yt-uix-button-size-default" id="upload-btn"><span class="yt-uix-button-content">27 August – 15 November 2015</span></a>','            <div class="notifications-container "><span class="yt-uix-button-icon yt-uix-button-icon-bell yt-sprite"></span>',"        </div>",'        <div class="yt-masthead-account-picker yt-uix-clickcard-content">',"        </div>","    </div>",'    <div id="yt-masthead-content">','        <form id="masthead-search" class="search-form consolidated-form">','            <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-default search-btn-component search-button" type="submit" id="search-btn">','            <span class="yt-uix-button-content">Suchen</span></button>','            <div id="masthead-search-terms" class="masthead-search-terms-border " dir="ltr">','                <input style="outline: medium none;" id="masthead-search-term" class="search-term masthead-search-renderer-input yt-uix-form-input-bidi" name="search_query" type="text">',"            </div>","        </form>","    </div>","</div>"].join("\n"),a.Templates.playlistDetailDiv=['<div class="pl-video-div yt-uix-tile" data-id="<%=indexID%>" data-title="<%=videoID%>">','	<div class="pl-video-index left">&nbsp;</div>','	<div class="pl-video-thumbnail left">','		<img src="./assets/<%=PlaylistID%>/<%=videoID%>.jpg" class="pl-video-thumbnail-img" />',"	</div>",'	<div class="pl-video-title left"><a class="pl-video-title-link yt-uix-tile-link yt-uix-sessionlink  spf-link"><%=title%></a> <br />uploaded by <a class="pl-video-title-link yt-uix-tile-link yt-uix-sessionlink spf-link"><%=username%></a>',"	</div>",'	<div class="pl-video-added-by left">Views: <%=views%></div>','	<div class="pl-video-time left"><%=duration%></div>',"</div>"].join("\n"),a.Templates.playlist=['<tr class="pl-video yt-uix-tile" data-id="<%=ID%>" data-title="<%=Title%>">','	<td class="pl-video-index"></td>','	<td class="pl-video-thumbnail">','		               <img src="./assets/<%=PlaylistID%>/default.jpg"  class="pl-playlist-thumbnail-img" />',"	</td>",'	<td class="pl-video-title"><a class="pl-video-title-link yt-uix-tile-link yt-uix-sessionlink  spf-link"><%=Title%></a>','		<div class="pl-video-owner">','			by <a href="#" class="yt-uix-sessionlink g-hovercard spf-link " data-name="playlist"><%=Artistname%></a>',"		</div>","	</td>",'	<td class="pl-video-added-by">Total views: <% print(obj.Videos.TotalViews) %></td>','	<td class="pl-video-time">','		<div class="more-menu-wrapper">','			<div class="timestamp">Total time: <% print(obj.Videos.TotalDuration) %></div>',"		</div>","	</td>","</tr>"].join("\n"),a.Templates.playlistHeader=['<table id="pl-playlist-table" class="pl-playlist-table"><tbody id="pl-playlist-list"></tbody></table>'].join("\n"),a.Templates.playlistOverview=['<div class="header">','	<div class="pl-video-index left">&nbsp;</div>','	<div class="left"><img src="./assets/<%=PlaylistID%>/default.jpg" /></div>','	<div class="left pl-video-headline" class=""><h1><%=Artistname%></h1><h3><%=Title%></h3></div>',"</div>"].join("\n"),a.Templates.playlistDetailBody=['<table id="pl-video-table" class="pl-video-table">','<tbody id="pl-video-list"></tbody></table>'].join("\n"),a.Templates.playlistContainer=['<div id="pl-video-table">',"</div>"].join("\n")}(YYY),function(a,b,c){var d={DEBUG:!0,APP:!1,consoleHolder:console,currentArtist:0,currentVideo:0,isMac:0,works:{},playerTitle:"",assetsPath:"",templates:{},worksIndex:[],videosIndex:[],totalWorks:0,totalVideos:0,state:0,debug:function(){d.DEBUG?console=d.consoleHolder:(d.consoleHolder=console,console={},console.log=function(){})},init:function(){this.debug(),this.templates=YYY.Templates,this.isMac=navigator.platform.toUpperCase().indexOf("MAC")>=0,a("#header").append(_.template(this.templates.siteHeader)),d.playerTitle=data.Videoplayer.Title,d.assetsPath=data.Videoplayer.AssetsPath,d.works=data.Videoplayer.Works,d.totalWorks=Object.keys(d.works).length,a("#masthead-search-term").val(data.Videoplayer.Title),d.initMenu(),d.bindKeyHandlers()},utils:{ellipseString:function(a,b){return a.substr(0,b-3)+"..."}},initMenu:function(){var b="",c=(d.assetsPath,_.template(this.templates.playlist)),e=_.template(this.templates.playlistHeader);a("#container").append(e),a.each(d.works,function(a,e){d.worksIndex.push(a),b+=c(e)}),a("#pl-playlist-table").append(b),a('tbody tr[data-id="'+d.worksIndex[d.currentArtist]+'"]').addClass("selected")},initSubMenu:function(){var b="",c=(d.assetsPath,0),e=_.template(this.templates.playlistDetailDiv),f=_.template(this.templates.playlistContainer),g=_.template(this.templates.playlistOverview),h=d.worksIndex[d.currentArtist];if(c=d.works[h].Videos.TotalAmount,a.each(d.works[h].Videos.Video,function(a,c){c.PlaylistID=d.works[h].PlaylistID,b+=e(c)}),a("#pl-video-table").length<1&&a("#container").append(f),a("#pl-video-table").prepend(g(d.works[h])),a("#pl-video-table").append(b),c>=12){var i=parseInt(c/2);a(".pl-video-div").addClass("smaller"),a(".pl-video-div").slice(i).wrapAll('<div class="pl-video-container-right">'),a(".pl-video-div").slice(0,i).wrapAll('<div class="pl-video-container-left">')}},updateCounter:function(a){d.currentArtist=a===!0?d.currentArtist+=1:d.currentArtist-=1,d.currentArtist<0?d.currentArtist=d.totalWorks-1:d.currentArtist>=d.totalWorks&&(d.currentArtist=0),console.log(d.worksIndex[d.currentArtist]),this.updateMenu()},updateCounterDetail:function(a){d.currentVideo=a===!0?d.currentVideo+=1:d.currentVideo-=1,d.currentVideo<0?d.currentVideo=d.totalVideos-1:d.currentVideo>=d.totalVideos&&(d.currentVideo=0),console.log(d.videosIndex[d.currentVideo]),this.updateSubMenu()},updateMenu:function(){a("#pl-playlist-table tbody tr").removeClass("selected"),a('#pl-playlist-table tbody tr[data-id="'+d.worksIndex[d.currentArtist]+'"]').addClass("selected")},updateSubMenu:function(){a("#pl-video-table div.pl-video-div").removeClass("selected"),a('#pl-video-table div.pl-video-div[data-id="'+d.videosIndex[d.currentVideo]+'"]').addClass("selected")},openPlaylist:function(){var b=d.worksIndex[d.currentArtist];d.state=1,d.currentVideo=0,a.each(d.works[b].Videos.Video,function(a,b){d.videosIndex.push(a)}),d.showHideMenu(),d.totalVideos=Object.keys(d.works[b].Videos.Video).length,d.initSubMenu(),d.updateSubMenu()},showHideMenu:function(){switch(d.state){case 0:a("#pl-playlist-table").fadeIn("150"),a("#pl-video-table").fadeOut(),a("#pl-video-table").html("");break;case 1:a("#pl-video-table").fadeIn("150"),a("#pl-playlist-table").fadeOut();break;case 2:}},startPlayback:function(){d.state=2,console.log("... playback"),a("#bgModal").fadeIn("150").promise().done(function(){d.initPlayer()})},initPlayer:function(){var b=d.worksIndex[d.currentArtist],c=d.videosIndex[d.currentVideo];d.updateSubMenu(),a("#jquery_jplayer_1").jPlayer("destroy").jPlayer({ready:function(){if(d.APP===!1)a(this).jPlayer("setMedia",{m4v:"assets/"+d.works[b].PlaylistID+"/"+d.works[b].Videos.Video[c].filename});else{var e=require("path"),f=process.execPath,g=e.dirname(f);a(this).jPlayer("setMedia",{m4v:g+e.sep+"assets/"+d.works[b].PlaylistID+"/"+d.works[b].Videos.Video[c].filename})}a(this).jPlayer("play"),setTimeout(function(){a("#jquery_jplayer_1").fadeIn("100").promise().done(),a("#jquery_jplayer_1").css("width","100%"),a("#jquery_jplayer_1").css("height","100%"),a("#jquery_jplayer_1 > video").css("width","100%"),a("#jquery_jplayer_1 > video").css("height","100%")},40)},swfPath:"./scripts/",supplied:"m4v",solution:"html",volume:.8,muted:!1,keyEnabled:!0,fullScreen:!0,cssSelectorAncestor:"#jp_container_1",cssSelector:{videoPlay:".jp-video-play",play:".jp-play",pause:".jp-pause",stop:".jp-stop",seekBar:".jp-seek-bar",playBar:".jp-play-bar",mute:".jp-mute",unmute:".jp-unmute",volumeBar:".jp-volume-bar",volumeBarValue:".jp-volume-bar-value",volumeMax:".jp-volume-max",playbackRateBar:".jp-playback-rate-bar",playbackRateBarValue:".jp-playback-rate-bar-value",currentTime:".jp-current-time",duration:".jp-duration",title:".jp-title",fullScreen:".jp-full-screen",restoreScreen:".jp-restore-screen",repeat:".jp-repeat",repeatOff:".jp-repeat-off",gui:".jp-gui",noSolution:".jp-no-solution"},keyBindings:{play:{key:32,fn:function(a){a.status.paused?a.play():a.pause()}}},ended:function(){d.reinitPlayer(!0)},resize:function(){}})},reinitPlayer:function(b){a("#jquery_jplayer_1").fadeOut("150").promise().done(function(){a("#jquery_jplayer_1").jPlayer("destroy"),b===!0?(d.currentVideo+=1,d.currentVideo>=d.totalVideos?(d.currentVideo=0,d.updateSubMenu(),d.stopPlayback()):d.initPlayer()):(d.currentVideo-=1,d.currentVideo<0?d.stopPlayback():d.initPlayer())})},stopPlayback:function(){console.log("stop playback ..."),a("#bgModal, #jquery_jplayer_1").fadeOut("100").promise().done(function(){d.state=1,d.showHideMenu(),a("#jquery_jplayer_1").jPlayer("destroy")})},toggleHelp:function(){"none"==a("#helpModal").css("display")?(a("#helpModal").fadeIn(),setTimeout(function(){"block"==a("#helpModal").css("display")&&a("#helpModal").fadeOut()},1e4)):a("#helpModal").fadeOut()},nextVideo:function(a){a===!0?(console.log("forward next video"),d.reinitPlayer(a)):d.reinitPlayer(a)},bindKeyHandlers:function(){a(document).keydown(a.debounce(function(a){switch(a.which){case 72:case 128:d.toggleHelp()}if(d.APP===!0&&27===a.which){var b=require("nw.gui");b.App.quit()}switch(d.state){case 0:switch(a.which){case 37:break;case 38:case 129:d.updateCounter(!1);break;case 39:case 131:case 13:d.openPlaylist();break;case 40:case 130:d.updateCounter(!0);break;default:return void d.updateMenu()}break;case 1:switch(a.which){case 0:d.isMac===!0&&(d.state=0,d.showHideMenu());break;case 37:case 132:d.state=0,d.showHideMenu();break;case 38:case 129:d.updateCounterDetail(!1);break;case 39:case 13:case 131:d.startPlayback();break;case 40:case 130:d.updateCounterDetail(!0);break;default:return}break;case 2:switch(a.which){case 0:d.isMac===!0&&(d.state=1,d.stopPlayback(),d.showHideMenu());break;case 37:case 132:d.state=1,d.stopPlayback(),d.showHideMenu();break;case 38:case 129:d.nextVideo(!1);break;case 40:case 130:d.nextVideo(!0);break;default:return}}a.preventDefault()},250))}};a(document).ready(function(){d.init()}),b.YTP=d}(jQuery,window);