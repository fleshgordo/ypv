var YYY = YYY || {};
(function(YYY) {

	YYY.Templates = {};

	YYY.Templates.siteHeader = [
		'<div id="yt-masthead-container" class="clearfix yt-base-gutter">',
		'    <div id="yt-masthead">',
		'        <div class="yt-masthead-logo-container">',
		'            <a id="logo-container" class="spf-link  masthead-logo-renderer yt-uix-sessionlink"><span class="logo masthead-logo-renderer-logo yt-sprite"></span><span class="content-region">Langenthal</span></a>',
		//	'            <!-- <div id="appbar-main-guide-notification-container"> -->
		'            </div>',
		'        </div>',
		'        <div id="yt-masthead-user" class="yt-uix-clickcard">',
		'            <a class="yt-uix-button   yt-uix-sessionlink yt-uix-button-default yt-uix-button-size-default" id="upload-btn"><span class="yt-uix-button-content">27 August – 15 November 2015</span></a>',
		'            <div class="notifications-container "><span class="yt-uix-button-icon yt-uix-button-icon-bell yt-sprite"></span>',
		'        </div>',
		'        <div class="yt-masthead-account-picker yt-uix-clickcard-content">',
		'        </div>',
		'    </div>',
		'    <div id="yt-masthead-content">',
		'        <form id="masthead-search" class="search-form consolidated-form">',
		'            <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-default search-btn-component search-button" type="submit" id="search-btn">',
		'            <span class="yt-uix-button-content">Suchen</span></button>',
		'            <div id="masthead-search-terms" class="masthead-search-terms-border " dir="ltr">',
		'                <input style="outline: medium none;" id="masthead-search-term" class="search-term masthead-search-renderer-input yt-uix-form-input-bidi" name="search_query" type="text">',
		'            </div>',
		'        </form>',
		'    </div>',
		'</div>',
	].join("\n");

	YYY.Templates.playlistDetail = [
		'<tr class="pl-video yt-uix-tile" data-id="<%=indexID%>" data-title="<%=videoID%>">',
		'	<td class="pl-video-index">&nbsp;</td>',
		'	<td class="pl-video-thumbnail">',
		'		<span class="pl-video-thumb ux-thumb-wrap contains-addto">',
		'		    <a href="" class="yt-uix-sessionlink" aria-hidden="true" ><span class="video-thumb  yt-thumb yt-thumb-72">',
		'		        <span class="yt-thumb-default">',
		'		           <span class="yt-thumb-clip">',
		'		               <img src="./assets/<%=PlaylistID%>/<%=videoID%>.jpg" />',
		'		                <span class="vertical-align"></span>',
		'		           </span>',
		'		        </span>',
		'		     </span>',
		'		   </a>',
		'		</span>',
		'	</td>',
		'	<td class="pl-video-title"><a class="pl-video-title-link yt-uix-tile-link yt-uix-sessionlink  spf-link"><%=title%></a>',
		'	</td>',
		'	<td class="pl-video-added-by"><%=description%></td>',
		'	<td class="pl-video-time">',
		'		<div class="more-menu-wrapper">',
		'			<div class="timestamp"><%=duration%></div>',
		//'			<div class="timestamp">Total videos: <%=filename%></div>',
		'		</div>',
		'	</td>',
		'</tr>'
	].join("\n");
	YYY.Templates.playlist = [
		'<tr class="pl-video yt-uix-tile" data-id="<%=ID%>" data-title="<%=Title%>">',
		'	<td class="pl-video-index"><%=ID%></td>',
		'	<td class="pl-video-thumbnail">',
		'		<span class="pl-video-thumb ux-thumb-wrap contains-addto">',
		'		    <a href="" class="yt-uix-sessionlink" aria-hidden="true" ><span class="video-thumb  yt-thumb yt-thumb-72">',
		'		        <span class="yt-thumb-default">',
		'		           <span class="yt-thumb-clip">',
		'		               <img src="./assets/<%=PlaylistID%>/default.jpg" />',
		'		                <span class="vertical-align"></span>',
		'		           </span>',
		'		        </span>',
		'		     </span>',
		'		   </a>',
		'		</span>',
		'	</td>',
		'	<td class="pl-video-title"><a class="pl-video-title-link yt-uix-tile-link yt-uix-sessionlink  spf-link"><%=Title%></a>',
		'		<div class="pl-video-owner">',
		'			by <a href="#" class="yt-uix-sessionlink g-hovercard spf-link " data-name="playlist"><%=Artistname%></a>',
		'		</div>',
		'	</td>',
		'	<td class="pl-video-added-by">Total views: <% print(obj.Videos.TotalViews) %></td>',
		'	<td class="pl-video-time">',
		'		<div class="more-menu-wrapper">',
		'			<div class="timestamp">Total time: <% print(obj.Videos.TotalDuration) %></div>',
		'			<div class="timestamp">Total videos: <% print(obj.Videos.TotalAmount) %></div>',
		'		</div>',
		'	</td>',
		'</tr>'
	].join("\n");

	YYY.Templates.playlistHeader = [
		'<table id="pl-playlist-table" class="pl-playlist-table"><tbody id="pl-playlist-list"></tbody></table>'
	].join("\n");

	YYY.Templates.playlistDetailHeader = [
		'<table id="pl-video-table" class="pl-video-table"><tbody id="pl-video-list"></tbody></table>'
	].join("\n");
})(YYY);