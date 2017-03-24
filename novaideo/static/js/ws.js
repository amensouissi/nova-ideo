

(function(){
   var NovaIdeoWS = window.NovaIdeoWS = window.NovaIdeoWS || {};

   NovaIdeoWS.sock = null;

   NovaIdeoWS.ws_events_handlers = {};

   NovaIdeoWS.typing_in_process = [];

   NovaIdeoWS.connect_to_ws_server = function(){
      var wsuri;
      var wsuri = "ws://" + window.location.hostname + ":8080/ws?source_path="+window.location.pathname;

      if ("WebSocket" in window) {
         NovaIdeoWS.sock = new WebSocket(wsuri);
      } else if ("MozWebSocket" in window) {
         NovaIdeoWS.sock = new MozWebSocket(wsuri);
      } else {
         log("Browser does not support WebSocket!");
      }

      if (NovaIdeoWS.sock) {
         NovaIdeoWS.sock.onopen = function() {
         }

         NovaIdeoWS.sock.onclose = function(e) {
            NovaIdeoWS.sock = null;
         }

         NovaIdeoWS.sock.onmessage = function(e) {
            var data = JSON.parse(e.data)
            // data is a list of events. event = {'event': 'event_id': 'params': {'params_id': value, ...}}
            NovaIdeoWS.call_events_handlers(data)
         }
      }
   };
   
   NovaIdeoWS.trigger_event = function(event) {
      NovaIdeoWS.trigger_events([event])
   };

   NovaIdeoWS.trigger_events = function(events) {
      // events is a list of events. event = {'event': 'event_id': 'params': {'params_id': value, ...}}
      if (NovaIdeoWS.sock) {
         msg = {
            source: {
                source_path: window.location.pathname
            },
            events: events
         }
         var msg = JSON.stringify(msg);
         NovaIdeoWS.sock.send(msg);
      }
   };

   NovaIdeoWS.call_events_handlers = function(events){
       $.each(events, function(index){
          var event_id = this.event
          var op = NovaIdeoWS.ws_events_handlers[event_id]
          op(this.params) 
      })
   };

   NovaIdeoWS.on = function(event_id, callback){
      NovaIdeoWS.ws_events_handlers[event_id] = callback
   };


})();

function increment_channel(channel_oid){
   var channel_action = $('a.channel-action[data-channel_oid="'+channel_oid+'"]').last()
  if(channel_action.length>0){
     var action_container = channel_action.parents('div.channel-action').first()
     action_container.addClass('unread-comments')
     var comment_len_container = action_container.find('.unread-comments-len').first()
     if (comment_len_container.length>0){
        var comment_len = parseInt(comment_len_container.text())+1
        comment_len_container.text(comment_len)
     }else{
        action_container.append('<span class="unread-comments-len pull-right">1</span>')
     }
     alert_user_unread_messages()
     update_unread_messages_alerts()
  }
}

function decrement_channel(channel_oid){
   var channel_action = $('a.channel-action[data-channel_oid="'+channel_oid+'"]').last()
  if(channel_action.length>0){
     var action_container = channel_action.parents('div.channel-action').first()
     var comment_len_container = action_container.find('.unread-comments-len').first()
     if (comment_len_container.length>0){
        var comment_len = parseInt(comment_len_container.text())-1
        if(comment_len==0){
          action_container.removeClass('unread-comments')
          comment_len_container.remove()
        }else{
          comment_len_container.text(comment_len)
        }
     }
  }
}

function connection(params){
   var id = params.id
   $('.user-connection-status[data-oid="'+id+'"]').addClass('connected')
}

function disconnection(params){
   var id = params.id
   $('.user-connection-status[data-oid="'+id+'"]').removeClass('connected')
   //remove typing alerts
   $('.comment-textarea-container .message-alert #'+id).remove()
}

NovaIdeoWS.on('connection', connection)

NovaIdeoWS.on('disconnection', disconnection)

NovaIdeoWS.on('typing_comment', function(params){
   var channel_oid = params.channel_oid;
   var channel = $('.channel[data-channel_oid="'+channel_oid+'"]').last()
   if(channel.length>0){
      var user_name = params.user_name;
      var user_oid = params.user_oid
      var messages_container = channel.parents('.comment-view-block').first()
          .find('.commentform .comment-textarea-container #messageinfo').first()
      var current = messages_container.find('#'+user_oid)
      if(current.length == 0){
       messages_container.append(
         '<span id="'+user_oid+'"><strong>'+user_name+'</strong> '+novaideo_translate("is typing a message")+' <i class="ion-more typing-icon"></i></span>') 
      }
   }
})

function stop_typing_comment(params){
   var channel_oid = params.channel_oid;
   var channel = $('.channel[data-channel_oid="'+channel_oid+'"]').last()
   if(channel.length>0){
      var user_oid = params.user_oid
      var messages_container = channel.parents('.comment-view-block').first()
          .find('.commentform .comment-textarea-container #messageinfo').first()
      var current = messages_container.find('#'+user_oid)
      if(current.length > 0){
       current.remove()
      }
   }
}

NovaIdeoWS.on('stop_typing_comment', stop_typing_comment)

NovaIdeoWS.on('new_comment', function(params){
   var body = params.body;
   var channel_oid = params.channel_oid;
   var channel = $('.channel[data-channel_oid="'+channel_oid+'"]').last()
   if(channel.length>0){
      stop_typing_comment(params)
      var preview = channel.find('>.commentli.comment-preview').first()
      var new_comment = $($(body).find('li.commentli').first())
      new_comment.insertBefore(preview);
      comment_scroll_to(new_comment, true)
      init_emoji($(new_comment.find('.emoji-container:not(.emojified)')));
   }
   if(params.channel_hidden || channel.length == 0){
     increment_channel(params.channel_oid)
   }
})

NovaIdeoWS.on('new_answer', function(params){
   var body = params.body;
   var comment_oid = params.comment_parent_oid;
   var comment = $('.channel li[data-comment_id="'+comment_oid+'"]').last()
   if(comment.length>0){
      stop_typing_comment(params)
      var preview = comment.find('>.comments-container>ul.commentul>.commentli.comment-preview').first()
      var new_comment = $($(body).find('li.commentli').first())
      new_comment.insertBefore(preview);
      comment_scroll_to(new_comment, true)
      init_emoji($(new_comment.find('.emoji-container:not(.emojified)')));
   }
   if(params.channel_hidden || comment.length == 0){
     increment_channel(params.channel_oid)
   }
})

NovaIdeoWS.on('remove_comment', function(params){
   var channel_oid = params.channel_oid;
   var comment_oid = params.comment_oid;
   var channel = $('.channel[data-channel_oid="'+channel_oid+'"]').last()
   if(channel.length>0){
      var comment = channel.find('.commentli[data-comment_id="'+comment_oid+'"]')
      comment.addClass('deletion-process')
      comment.animate({height: 0, opacity: 0}, 'slow', function() {
         comment.remove();
      });
   }
   decrement_channel(channel_oid)
})

NovaIdeoWS.on('edit_comment', function(params){
   var body = params.body;
   var channel_oid = params.channel_oid;
   var comment_oid = params.comment_oid;
   var channel = $('.channel[data-channel_oid="'+channel_oid+'"]').last()
   if(channel.length>0){
      stop_typing_comment(params)
      var comment = channel.find('.commentli[data-comment_id="'+comment_oid+'"]')
      var new_comment = $($(body).find('li.commentli .comment-data').first())
      comment.find('.comment-data').first().replaceWith(new_comment)
      init_emoji($(comment.find('.emoji-container:not(.emojified)')));
      var to_animate = $(comment.find('.comment-data').first())
      if(to_animate.length>0){
       to_animate.animate({
            backgroundColor: "#fff6e5"
       }, 1000, function(){
          to_animate.animate({
            backgroundColor: "white"
       }, 1000 );
       });
     }
   }
})

NovaIdeoWS.on('new_idea', function(params){
   var idea_id = params.id;
   var home_component = $('.async-new-contents-component')
   var alert_new_idea = home_component.find('>.alert-new-idea').first()
   if(alert_new_idea.length>0){
      var ideas_ln = alert_new_idea.find('.new-content-id').length;
      ideas_ln+=1
      alert_new_idea.replaceWith('<div data-content_type="idea" class="alert-new-content alert-new-idea"><span class="icon novaideo-icon icon-idea"></span> '+novaideo_translate('View new ideas')+' (<strong class="ideas-nb">'+ideas_ln+'</strong>)</div>')
   }else{
       home_component.prepend('<div data-content_type="idea" class="alert-new-content alert-new-idea"><span class="icon novaideo-icon icon-idea"></span> '+novaideo_translate('View new idea')+'</div>')
   }
   alert_new_idea = home_component.find('>.alert-new-idea').first()
   alert_new_idea.append('<span class="new-content-id" data-content_id="'+idea_id+'"></span>')
})

NovaIdeoWS.on('new_question', function(params){
   var question_id = params.id;
   var home_component = $('.async-new-contents-component')
   var alert_new_question = home_component.find('>.alert-new-question').first()
   if(alert_new_question.length>0){
      var questions_ln = alert_new_question.find('.new-content-id').length;
      questions_ln+=1
      alert_new_question.replaceWith('<div data-content_type="question" class="alert-new-content alert-new-question"><span class="md md-live-help"></span>  '+novaideo_translate('View new questions')+' (<strong class="questions-nb">'+questions_ln+'</strong>)</div>')
   }else{
       home_component.prepend('<div data-content_type="question" class="alert-new-content alert-new-question"><span class="md md-live-help"></span>  '+novaideo_translate('View new question')+'</div>')
   }
   alert_new_question = home_component.find('>.alert-new-question').first()
   alert_new_question.append('<span class="new-content-id" data-content_id="'+question_id+'"></span>')
})

NovaIdeoWS.on('new_wg', function(params){
   var wg_id = params.id;
   var home_component = $('.async-new-contents-component')
   var alert_new_wg = home_component.find('>.alert-new-wg').first()
   if(alert_new_wg.length>0){
      var wgs_ln = alert_new_wg.find('.new-content-id').length;
      wgs_ln+=1
      alert_new_wg.replaceWith('<div data-content_type="proposal"  class="alert-new-content alert-new-wg"><span class="icon novaideo-icon icon-wg"></span> '+novaideo_translate('View new working groups')+' (<strong class="wgs-nb">'+wgs_ln+'</strong>)</div>')
   }else{
       home_component.prepend('<div data-content_type="proposal" class="alert-new-content alert-new-wg"><span class="icon novaideo-icon icon-wg"></span> '+novaideo_translate('View new working group')+'</div>')
   }
   alert_new_wg = home_component.find('>.alert-new-wg').first()
   alert_new_wg.append('<span class="new-content-id" data-content_id="'+wg_id+'"></span>')
})


$(document).on('click', '.alert-new-content', function (argument) {
  var $this = $(this)
  var content_type = $this.data('content_type')
  var container = $this.parents('.async-new-contents-component').first()
  var items_container = container.find('#results-'+content_type+'>.result-container>.scroll-items-container').first()
  if(items_container.length>0){
    var ids = jQuery.makeArray($this.find('.new-content-id').map(function(){
              return $(this).data('content_id')
           })
       )
    var url = $(document.body).data('api_url')
    var data = {
      ids: ids,
      op: 'render_listing_contents'
    }
    loading_progress()
    $.post(url, data, function(data) {
      if(data.body){
       $($(data.body).find('.scroll-item')).hide().prependTo(items_container).fadeIn(1500)
       $this.slideUp("slow", function(){
         $this.remove()
       })
      }
      finish_progress()
    });
  }
})

function user_typing(){
   var input = $(this)
   var channel = input.parents('.comment-view-block').first()
       .find('ul.channel').first()
   var val = input.val()
   var channel_oid = channel.data('channel_oid')
   if(val.length == 0){
      var index = $.inArray(channel_oid, NovaIdeoWS.typing_in_process)
      if(index>=0){
          NovaIdeoWS.typing_in_process = NovaIdeoWS.typing_in_process.splice(index, 1);
      }
      NovaIdeoWS.trigger_event({
         'event': 'stop_typing_comment',
         'params':{
            'channel_oid': channel.data('channel_oid')
         }
      })
   }else if($.inArray(channel_oid, NovaIdeoWS.typing_in_process)<0 && val.length >= 1){
    NovaIdeoWS.typing_in_process.push(channel_oid)
    NovaIdeoWS.trigger_event({
         'event': 'typing_comment',
         'params':{
            'channel_oid': channel.data('channel_oid')
         }
      })
   }
}

function user_stop_typing(){
   var input = $(this)
   var channel = input.parents('.comment-view-block').first()
       .find('ul.channel').first()
   var channel_oid = channel.data('channel_oid')
   var index = $.inArray(channel_oid, NovaIdeoWS.typing_in_process)
   if(index>=0){
      NovaIdeoWS.typing_in_process.splice(index, 1);
      NovaIdeoWS.trigger_event({
         'event': 'stop_typing_comment',
         'params':{
            'channel_oid': channel_oid
         }
       })
   }
}

$(document).on('keypress paste', '.comment-textarea-container textarea', user_typing)

$(document).on('blur', '.comment-textarea-container textarea', user_stop_typing)

$(document).on('component_loaded', function() {
   NovaIdeoWS.connect_to_ws_server()
});

$(document).on('sidebar-opened', function(event){
    var channel = $(event.item).find('ul.channel');
    if(channel.length>0){
      NovaIdeoWS.trigger_event({
         'event': 'channel_opened',
         'params':{
           'channel_oid': channel.data('channel_oid')
         }
      })
   }
})

$(document).on('sidebar-closed', function(event){
   var events = []
   var channels = $(event.items).find('ul.channel');
   if(channels.length>0){
      events = jQuery.makeArray(channels.map(function(){
            return {
            'event': 'stop_typing_comment',
            'params':{
              'channel_oid': $(this).data('channel_oid')
            }}
         })
     )
   }
   events.push({
      'event': 'all_channels_closed',
      'params':{}
   })
   NovaIdeoWS.trigger_events(events)
})

$(document).on('sidebar-items-closed', function(event){
    var channels = $(event.items).find('ul.channel');
    if(channels.length>0){
      NovaIdeoWS.trigger_events(
         jQuery.makeArray(channels.map(function(){return {
            'event': 'channel_hidden',
            'params':{
              'channel_oid': $(this).data('channel_oid')
            }}
         }))
     )
   }
})

$(document).on('comment-removed', function(event){
    NovaIdeoWS.trigger_event({
        'event': 'remove_comment',
        'params':{
          'comment_oid': event.comment_oid,
          'channel_oid': event.channel_oid
        }
     })
})

$(document).on('comment-edited', function(event){
    NovaIdeoWS.trigger_event({
      'event': 'edit_comment',
      'params':{
        'comment_oid': event.comment_oid,
        'channel_oid': event.channel_oid,
        'context_oid': event.context_oid
      }
   })
})

$(document).on('answer-added', function(event){
   NovaIdeoWS.trigger_event({
        'event': 'new_answer',
        'params':{
          'comment_oid': event.comment_oid,
          'comment_parent_oid': event.comment_parent_oid,
          'channel_oid': event.channel_oid,
          'context_oid': event.context_oid
        }
     })
})

$(document).on('comment-added', function(event){
  NovaIdeoWS.trigger_event({
      'event': 'new_comment',
      'params':{
        'comment_oid': event.comment_oid,
        'channel_oid': event.channel_oid,
        'context_oid': event.context_oid
      }
   })
})