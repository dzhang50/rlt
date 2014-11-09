
var $j = jQuery.noConflict();

var plane_icon = chrome.extension.getURL('img/plane_mauve.png');

// Application ID, Javascript Key
Parse.initialize("M7lfx2FsgvSMRr5pPVgpXM7lwxscDZ1oGQMfZe67", "04YFegY2SVyxpCXQz6HBFf0XQzwACId8johQKWxe");

console.log("Testing Road Less Traveled");
/*
Parse.Cloud.run('getAirport', {query: "Eiffldde Tower"}, {
	success: function(result) {
		console.log("Success");
		//console.log(result);
		var json = JSON.parse(result);
		console.log(json[0].airport);
		console.log(json);
		//console.log(json.result.geometry.location.lat+", "+json.result.geometry.location.lng);
		//console.log(json.predictions[0].description+" has a place_id of "+json.predictions[0].place_id);
	}
});
*/

var str2DOMElement = function(html) {
    var frame = document.createElement('iframe');
    frame.style.display = 'none';
    document.body.appendChild(frame);             
    frame.contentDocument.open();
    frame.contentDocument.write(html);
    frame.contentDocument.close();
    var el = frame.contentDocument.body.firstChild;
    document.body.removeChild(frame);
    return el;
}

/*
$j.get( "https://www.facebook.com/kingstonhallnyc", function( data ) {
  //$( ".result" ).html( data );
  //console.log(data);
  //console.log($j.parseHTML(data));
  var doms = $j.parseHTML(data);
  
  console.log(data.indexOf("pagesTimelineLayout"));
});
*/



function htmlescape(str) { if(typeof str=="string") { return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,"&quot;"); } return ""; }
function jsescape(str) { if(typeof str=="string") { return str.replace(/'/g,"\\'").replace(/"/g,'\\"'); } return ""; }
function parse(str) { try { return JSON.parse(str); } catch (e) { return {}; } }
function _template(s) {for (var i=1; i<arguments.length; i++) {var arg = arguments[i];if ("object"==typeof arg) { for (var key in arg) { var val = arg[key]; if (typeof val=='undefined') {val = '';} s = s.replace( new RegExp("%"+key+"%","g"),val); } }		else { s = s.replace( new RegExp("%"+i+"%","g"),arg); }	}return s;}
var convert_string_to_regex_matches = {};
function convert_string_to_regex(str) {if (typeof convert_string_to_regex_matches[str]!="undefined") { return convert_string_to_regex_matches[str]; }try {var matches = str.match(/^\/(.*?)\/(\w*)$/);var re = new RegExp(matches[1],matches[2]);convert_string_to_regex_matches[str] = re;return re;}	catch(e) { convert_string_to_regex_matches[str] = null; return null; }}
function trim(str) { if(!str){return str;} if (str.trim) { return str.trim(); } return str.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,""); }
function $(id,prop) { var el=document.getElementById(id); if(!el){return el;} if(typeof prop!="undefined"){return el[prop];} return el;}
function $each(els,func){ if (els && els.length) { if (typeof func=="string") { func = new Function(func); } for (var i=els.length-1; i>=0; i--) { func.call(els[i],els[i]); } } }
function bind(el,ev,func,capture) { if (typeof el=="string") { el = $(el); } if (typeof func=="string") { func = new Function(func); } if(typeof capture!="boolean"){capture=false;} if (el && el.addEventListener) { el.addEventListener(ev,func,capture); } }
function click(el,func,cancelBubble,preventDefault) { bind(el,'click',function(e) { func.call(this,e); if(cancelBubble!==false){ cancel_bubble(e);} if(preventDefault===true){ prevent_default(e);} },false); }
function cancel_bubble(e) { if(e && e.stopPropagation){e.stopPropagation();} }
function prevent_default(e) { if(e && e.preventDefault){e.preventDefault();} }
function hasClass(o,re) {if(!o){return false;}if (typeof re=="string") {re = new RegExp("(^|\\s)"+re+"(\\s|$)");}return (o.className && re.test(o.className));}
function addClass(o,cn) {if(!o){return;}if (o.className==null || o.className=='') { o.className = cn; return;}if (hasClass(o,cn)) { return; }o.className = o.className + " " + cn; }
function removeClass(o,re) {if(!o){return;} if (!hasClass(o,re)) { return; } if (typeof re=="string") { re = new RegExp("(^|\\s)"+re+"(\\s|$)"); } o.className = o.className.replace(re,' '); }
function toggleClass(o,cn) {if(!o){return;} if(hasClass(o,cn)) { removeClass(o,cn); return false; } else { addClass(o,cn); return true; } }
function getParentByClass(el,cn){ if (hasClass(el,cn)){return el;} while(el=el.parentNode) { if(hasClass(el,cn)) { return el; } } return null; }
function parent(el,selector,func){func=func||function(){}; if (!el||!el.parentNode){return null;} if(!selector){func(el.parentNode);return el.parentNode;} if (matchesSelector(el,selector)){func(el);return el;} while(el=el.parentNode) { if(matchesSelector(el,selector)) { func(el);return el; } } return null; }
function getParentByTag(el,tn){ tn=tn.toLowerCase();while(el=el.parentNode) { if(el && el.tagName && tn==el.tagName.toLowerCase()) { return el; } } return null; }
function parentChain(o){var s="";while(o){s+=outerHTML(o);o=o.parentNode;}return s;}
function outerHTML(o,esc){if(!o || !o.tagName){return (esc?"&lt;&gt;":"<>");}return (esc?"&lt;":"<")+o.tagName+(o.id?" id="+o.id:"")+(o.className?" class="+o.className:"")+(esc?"&gt;":">");}
function innerText(o){if(!o){return"";}if(typeof o.textContent!="undefined"){return o.textContent;} if(typeof o.innerText!="undefined"){return o.innerText;} return o.innerHTML;}
function prev(o,tag){if(!o){return null;}while(o=o.previousSibling){if(o.tagName==tag){return o;}}return null;}
function next(o,tag){if(!o){return null;}while(o=o.nextSibling){if(o.tagName==tag){return o;}}return null;}
function css(el,rules){rules.split(/\s*;\s*/).foreach(function(){ var keyval=this.split(':'); el.style[keyval[0]]=keyval[1]; });}
function removeChild(o){if(o&&o.parentNode&&o.parentNode.removeChild){o.parentNode.removeChild(o);}}
function QS(o,query,propfunc){if(typeof o=="string"){propfunc=query;query=o;o=document;}if(!o||!o.querySelector){return null;}var m=o.querySelector(query);if(!m){return null;}if(typeof propfunc=="undefined"){return m;}if(typeof propfunc=="function"){return propfunc(m);}return m[propfunc];}
function QSA(o,query,func){if(typeof o=="string"){propfunc=query;query=o;o=document;}if(!o||!o.querySelectorAll){return null;}var m=o.querySelectorAll(query);if(!m||m.length==0){return null;}if (typeof func=="string") { func = new Function(func); }if(typeof func!="function"){return m;}for(var i=0;i<m.length;i++){func.call(m[i],m[i]);}return m;}
function countVisibleElements(o,query){if(typeof o=="string"){query=o;o=document;}var p=QSA(o,query);if(!p){return 0;}var c=0;for(var i=0;i<p.length;i++){if(is_visible(p[i])){c++;}}return c;}
function match(str,regex,func){if(typeof str!="string"){return null;}var m=str.match(regex);if(m&&m.length){if(typeof func=="function"){for (var i=regex.global?0:1;i<m.length;i++){func(m[i]);}return m;}else{return m.length>1?m[regex.global?0:1]:null;}}return null;}
function url_param(url,param){return unescape(match(url,new RegExp(param+'=([^&]+)','i'))); }
function encode_url_params(o){var u="";for(var i in o){if(u!=""){u+="&";}u+=encodeURIComponent(i)+"="+encodeURIComponent(o[i]);}return u;}
function clickLink(el,bubble) {if(!el){return;}if(typeof bubble!="boolean"){bubble=true;}var e = document.createEvent('MouseEvents');e.initEvent('click',bubble,true,window,0);el.dispatchEvent(e);}
function mouseEvent(el,event,bubble) {if(!el){return;}if(typeof bubble!="boolean"){bubble=true;}var e = document.createEvent('MouseEvents');e.initEvent(event,bubble,true,window,0);el.dispatchEvent(e);}

function cookie(n) { try { return unescape(document.cookie.match('(^|;)?'+n+'=([^;]*)(;|$)')[2]); } catch(e) { return null; } }

function matchesSelector(o,sel){
	if (o.matchesSelector){return o.matchesSelector(sel);}
	if (o.mozMatchesSelector){return o.mozMatchesSelector(sel);}
	if (o.webkitMatchesSelector){return o.webkitMatchesSelector(sel);}
	if (o.msMatchesSelector){return o.msMatchesSelector(sel);}
	if (o.querySelectorAll && o.parentNode) {
		var matches = o.parentNode.querySelectorAll(sel);
		if (matches && matches.length) {
			for (var i=0; i<matches.length; i++) {
				if (matches[i]===o) { return true; }
			}
		}
	}
	return;
}


						function getData(o,container) {
							var data = o.getAttribute(container);
							if (data) {
								var attrs = parse(data,"getDataProperty");

								return attrs;
							}
							return {};
						}
						
						function getDataProperty(o,prop,container) {
							return getData(o,container)[prop];
						}
						function getStoryProperty(o,prop) { return getDataProperty(o,prop,'data-ft'); }
						
function getFbid(o,props) {
							var fbid = null;
							var utime = "";
							// Use the time of the post to uniquely identify different posts pointing to the same url
							QS(o,'abbr[data-utime]',function(abbr) {
								var data_utime = abbr.getAttribute('data-utime');
								if (data_utime) { utime = "@"+data_utime; }
							});
							// Look for the link to the story first, it is most reliable
							QS(o,'.uiStreamSource a,.timelineTimestamp a.uiLinkSubtle, a.uiLinkSubtle > abbr[data-utime], a._5pcq > abbr[data-utime]',function(a) {
								try {
									if (a&&a.tagName&&a.tagName=="ABBR"){a=a.parentNode;}
									var href = a.getAttribute('href');
									//console.log("Checking URL "+href);
									fbid = match(href,/fbid=(\d+)/);
									if (fbid && fbid>1000) {
										return fbid+utime;
									}
									fbid = match(href,/posts\/(\d+)\/?$/);
									if (fbid && fbid>1000) {
										return fbid+utime;
									}
									fbid = match(href,/permalink\/(\d+)\/?$/);
									if (fbid && fbid>1000) {
										return fbid+utime;
									}
									fbid = match(href,/video\.php\?v\=(\d+)\/?$/);
									if (fbid && fbid>1000) {
										return fbid+utime;
									}
									if (href.indexOf("/mobile/?v")==-1 && !a.getAttribute('data-appname')) {
										// The word "mobile" links to the mobile app, which is common between posts to the album Mobile Uploads
										fbid = href+utime;
									}
								} catch(e) { }
							});
							if (fbid && fbid>1000) {
								return fbid+utime;
							}
							// Some stories change their fbid, so we need to remembers the actrs involved to uniquely identify it
							var prop_keys_exist = false, key=null;
							if (props) { for (key in props) { prop_keys_exist=true; } }
							if (props && prop_keys_exist && (typeof props.sty=="undefined" || props.sty==-1 || typeof bad_fbid_sty_types[props.sty]!="undefined")) {
								var found_prop = false;
								var id = "sty"+(props.sty||-1);
								// Return the actrs instead, which can unfortunately be in random, comma-separated order
								if (props.actrs && props.actrs.split) {
									var actrs = props.actrs.split(/\s*,\s*/).sort( function(a,b) { return (a>b)?1:-1; } ).join(",");
									id+= ":"+actrs;
								}
								else {
									match(o.className,/aid_\d+/g,function(m) {
										id+=":"+m.substring(4);
									});
								}
								if (props.object_id) {
									id+=":"+props.object_id; found_prop = true;
								}
								if (props.pub_time) {
									id+=":"+props.pub_time; found_prop = true;
								}
								if (!found_prop && props.mf_story_key) {
									id+=":"+props.mf_story_key;
								}
								return id;
							}
							if (props && props.fbid) { 
								return props.fbid; 
							}
							fbid = getStoryProperty(o,'fbid');
							if (!fbid && o.id) {
								var parts = o.id.split("_");
								if (parts) {
									fbid = parts[parts.length-1];
								}
							}
							if (fbid && fbid>1000) {
								return fbid;
							}
							return null;
						}

function target(e){ var t=e.target; if (t.nodeType == 3){t=t.parentNode;} return t; }

function is_timeline() { return !!QS(document,'.timelineLayout'); }


//var storySelector = '.uiUnifiedStory,.timelineUnitContainer,.mall_post,div[data-dedupekey],div[id^="mall_post_"]';
//var storySelector = '.uiUnifiedStory,.stream_pagelet,.timelineUnitContainer,.fbTimelineCapsule,.mall_post,div[data-dedupekey],div[id^="mall_post_"]';
//var storySelector = '.uiUnifiedStory,.timelineUnitContainer,.mall_post,div[data-time],div[data-dedupekey],div[id^="mall_post_"]';
var storySelector = '.uiUnifiedStory,.userContentWrapper,.mall_post,div[data-time],div[data-dedupekey],div[id^="mall_post_"]';

function findStoriesInContainer(container) {
	if (container && container.querySelectorAll) {
		return QSA(container,storySelector);
	}
	console.log("WTF");
	return null;
}

function username() {

	// First order of business - find out who we are!
	var userid = "anonymous";
	// Find out the actual userid numeric value, not the alias
	var user_num = null;
	try {
		user_num = window.Env.user;
	} catch (e) { }
	if (!user_num) {
		try {
			user_num=cookie('c_user');
		} catch(e) { }
	}
	if (userid=="anonymous" && user_num) { userid=user_num; }
	if (!userid || userid==0 || userid=="anonymous") { return "anonymous"; }
		
	return userid;
}




function fixStory(o) {
	//console.log("Fixing story: "+o.className);
	
	var tmp = QSA(o, '.userContentWrapper');
	if(tmp) {
		if(tmp.length > 1) {
			for(var i = 0; i < tmp.length; i++) {
				fixStory(tmp[i]);
			}
			return;
		}
	}
	
	// Collapse story if troll post!
	//addClass(o, 'troll_hidden');
	//o.innerHTML = "<div>TROLL POST COLLAPSED</div>";
	//var x = QS(o, '.userContentWrapper');
	var props = getData(o,"data-ft");
	if (!props || !props.sty) {
		// Try to get the story type from the innerhtml
		var sty = match(o.innerHTML,/story_type=(\d+)/);
		if (sty) {
			props.sty = sty;
		}
	}
	
	var fbid = getFbid(o, props);
	
	var x = QS(o, '.clearfix');
	if(x) {
	
		if(hasClass(x, 'rlt_modified')) {
			return;
		}
		//var job = {cmd: 'getVotes', fbid: fbid, obj: x};
		//console.log("Pushing job getVotes " + fbid);
		//eventQueue.push(job);
		
		//x.insertAdjacentHTML("beforebegin", '<div><a href="#upvote"><img src="http://i.imgur.com/3JHoONf.png" height:></a><a href="#downvote"><img src="http://i.imgur.com/9XIrSFN.png"></a></div>');
		addClass(x, 'rlt_modified');
		
		x.parentNode.id = "post_"+fbid;
	}

	else {
		console.log("NO profile pic???");
	}
	
	var tmp = QSA(o, '.profileLink');
	if(tmp) {
		for(var i = 0; i < tmp.length; i++) {
			if(!tmp[i]) {
				return;
			}
			
			if(hasClass(tmp[i], 'rlt_modified')) {
				//console.log("Already modified, skipping");
				return;
			}
			
			
			//addClass(tmp[i], 'troll_hidden');
			addClass(tmp[i], 'rlt_modified');
			console.log(tmp[i].parentNode.innerHTML);
			var contents = tmp[i].parentNode.innerHTML;
			console.log(contents.indexOf(' at <a class="profileLink"'));
			//console.log(innerText(tmp[i]));
			if((contents.indexOf(' at ') > -1) ||
			   (contents.indexOf(' in ') > -1)) {
				//tmp[i].innerText += " TESTING 123 ";
				console.log("HREF = "+tmp[i].href);
				
				$j.ajax({
					url: tmp[i].href,
					async: false,
					success: function(data) {
						var doms = $j.parseHTML(data);
						var idx = data.indexOf("pagesTimelineLayout");
						console.log("HREF RESULT: " + idx);
					
						if(idx > -1) {
							tmp[i].insertAdjacentHTML("beforebegin", '<img id="rltIcon_'+fbid+'" src="'+plane_icon+'" height="16px" width="16px" stuff="'+tmp[i].innerHTML+'"> ');
							document.getElementById("rltIcon_"+fbid).addEventListener('click',  function(){
								//vote(true, first.fbid, document.getElementById("voteSpan_"+first.fbid));
								var stuff = document.getElementById("rltIcon_"+fbid).getAttribute("stuff");
								
								Parse.Cloud.run('getAirport', {query: stuff}, {
									success: function(result) {
									console.log("Success");
									//console.log(result);
									var json = JSON.parse(result);
									console.log(json[0].airport);
									console.log(json);
									
									alert(json[0].airport+": "+json[0].airport_name);
									//console.log(json.result.geometry.location.lat+", "+json.result.geometry.location.lng);
									//console.log(json.predictions[0].description+" has a place_id of "+json.predictions[0].place_id);
									}
								});
							});
							//console.log(tmp[i]);
						}
					
					}
				});
				/*
				$j.get(tmp[i].href, function( data ) {
					//$( ".result" ).html( data );
					//console.log(data);
					//console.log($j.parseHTML(data));
					var doms = $j.parseHTML(data);
					var idx = data.indexOf("pagesTimelineLayout");
					console.log("HREF RESULT: " + idx);
					
					if(idx > -1) {
						tmp[i].insertAdjacentHTML("beforebegin", "<div>DAN HELLO WHATS UP</div>");
					}
				});
				*/
			}
			//tmp.innerHTML = "<div>DAN HELLO WHATS UP</div>"; // + tmp.innerHTML;
			//tmp[i].insertAdjacentHTML("beforebegin", "<div>DAN HELLO WHATS UP</div>");
			//tmp[i].insertAdjacentHTML("beforebegin", '<div><a href="#upvote">Upvote</a> · <a href="#downvote">Downvote</a> · -1000</div>');
			//tmp[i].insertAdjacentHTML("beforebegin", '<div>'+userID+' '+fbid+' '+getStoryProperty(tmp[i],'fbid')+'</div>');
		}
	}
	else {
		console.log("NO profileLink!");
	}
}
						
function fixStories(o) { 
	// We are processing a live list. If we move a post to a tab, that changes the list!
	// So instead, copy all posts to an array first, then process each one
	if (o && o.length) {
	
		for (var i=0; i<o.length; i++) {
			//console.log(posts[i]);
			//var tmp = QS(posts[i], '.UFICommentWithPadding');
			//addClass(tmp, 'troll_hidden');
			//console.log(tmp);
			//fixStory(posts[i],isPageOrProfile,isGroupWall);
			fixStory(o[i]);
		}
	}
}

function onDOMContentLoaded(func) {
	if (is_document_ready()) { func(); }
	else { bind(window,'DOMContentLoaded',func,false); }
}


$j(document).ready(function() {
    console.log( "ready!" );
	
	domnodeinserted(document);
});

// Handle DOM insertions
var ignoreDomInsertedRegex = /(DOMControl_shadow|highlighterContent|uiContextualLayerPositioner|uiContextualDialogPositioner)/;
var ignoreDomInsertedParentRegex = /(highlighter|fbChatOrderedList)/;
var ignoreMutation = function(o) {
	var tn = o.tagName;
	if (o.nodeType==3) { return true; }
	if (tn=="SCRIPT" || tn=="LINK" || tn=="INPUT" || tn=="BR" || tn=="STYLE" || tn=="META") { return true; }
	var cn = o.className, pn=o.parentNode, pcn="";
	if (pn&&pn.className) {
		pcn = pn.className;
	}
	if (ignoreDomInsertedRegex.test(cn) || ignoreDomInsertedParentRegex.test(pcn)) { 
		return true; 
	}
	return false;
}

var domnodeinserted = function (o) {
	var f,id,selector,el,els;
	if (ignoreMutation(o)) { return; }
	var isGroupWall = ($('pagelet_group_mall')!=null);
	var isNewsfeed =  ($('stream_pagelet')!=null);
	var isTimeline =  ($('timeline_tab_content')!=null);
	//var isMiniFeedWall = ((getParentByClass(o,"minifeedwall")!=null) || (getParentByClass(o,"fbProfileStream")!=null) || (o.getElementsByClassName('minifeedwall').length>0));

	//if (is_timeline() || isNewsfeed || isGroupWall) {
	if (isTimeline || isNewsfeed || isGroupWall) {
	//if (isNewsfeed || isGroupWall) {
		//console.log("is timeline or group wall!");
		// If it's a story itself, process it
		if ( matchesSelector(o,storySelector)) {
			fixStory(o);
		}
		// Otherwise, process any stories within it
		else if (o && o.querySelectorAll) {
			var stories = QSA(o,storySelector);
			if (stories && stories.length>0) {
				fixStories(stories);
			}
		}
	}
};

bind(document,"DOMNodeInserted", function(e) { domnodeinserted(target(e)); });

