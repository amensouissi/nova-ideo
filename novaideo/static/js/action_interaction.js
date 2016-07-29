
function update_modal_action(event){
    var action = $(this).closest('.dace-action-modal')
    var toreplay = action.data('toreplay');
    var title = action.data('view_title');
    var modal_css_class = action.data('component_style');
    var after_exe_url = action.data('after_exe_url');
    var modal_container = $('.action-modal-container')
    modal_container.attr('class', modal_css_class+' action-modal-container modal fade')
    modal_container.data('after_exe_url', after_exe_url)
    if (Boolean(toreplay)){
      var action_body =jQuery.parseJSON(action.data('body'));
      $(modal_container.find('.modal-body')).html(action_body);
      $(modal_container.find('.modal-title')).text(title)
      try {
         deform.processCallbacks();
      }catch(err) {};
      modal_container.modal('show');
      return false
    }
    var url = action.data('updateurl');
    modal_container.css('opacity', '0')
    loading_progress()
    $.getJSON(url,{tomerge:'True', coordinates:'main'}, function(data) {
       var action_body = data['body'];
       if (action_body){
           $(modal_container.find('.modal-body')).html(action_body);
           $(modal_container.find('.modal-title')).text(title)
           modal_container.css('opacity', '1')
           modal_container.modal('show');
           try {
                deform.processCallbacks();
            }
           catch(err) {};
           finish_progress()
           return false
        }else{
           location.reload();
           return false
        }
    });
    return false;
};

function update_inline_action(){
    var $this = $(this)
    var target = $($this.parents('.search-item, .content-view').find('.actions-footer-container').first())//closest('.dace-action-inline').data('target')+'-target';
    var actions = $($this.parents('.actions-block').find('.dace-action-inline'));
    if($this.hasClass('activated')){
       target.slideUp();
       actions.removeClass('activated')
       return
    }
    actions.removeClass('activated')
    var url = $this.closest('.dace-action-inline').data('updateurl');
    $.getJSON(url,{tomerge:'True', coordinates:'main'}, function(data) {
       var action_body = data['body'];
       if (action_body){
           target.slideDown();
           $(target.find('.container-body')).html(action_body);
           $this.addClass('activated')
           init_comment_scroll(target)
           try {
                deform.processCallbacks();
            }
           catch(err) {};
        }else{
           location.reload();
           return false
        }
    });
    return false;
};

function update_sidebar_action(){
    var $this = $(this)
    var actions = $('.dace-action-sidebar');
    if($this.hasClass('activated')){
       actions.removeClass('activated')
       return
    }
    var sidebar = $('.sidebar-right-nav')
    var bar = $(".bar-right-wrapper")
    var closed = bar.hasClass('toggled')
    
    var target = $(sidebar.find('.actions-footer-container'))//closest('.dace-action-inline').data('target')+'-target';
    var toggle = $('.menu-right-toggle:not(.close)')
    var title = $($this.parents('.view-item, .content-view').first().find('.view-item-title, .content-title').first()).clone()
    title.find('.label-basic').remove()
    actions.removeClass('activated')
    var url = $this.closest('.dace-action-sidebar').data('updateurl');
    loading_progress()
    $.getJSON(url,{tomerge:'True', coordinates:'main'}, function(data) {
       var action_body = data['body'];
       if (action_body){
          var container_bodu = $(target.find('.container-body'))
           container_bodu.html(action_body);
           if(title.length > 0){
               $(sidebar.find('.sidebar-title .entity-title').first()).html(title)
           }
           $this.addClass('activated')
           try {
                deform.processCallbacks();
            }
           catch(err) {};
           if(toggle.length>0 && closed){
              toggle.click()
           }
           init_emoji($(target.find('.emoji-container:not(.emojified)')));
           rebuild_scrolls($(target.find('.malihu-scroll')))
           init_comment_scroll(target)
           finish_progress()
        }else{
           location.reload();
           return false
        }
    });
    return false;
};

function update_popover_action(){
    var $this = $(this)
    var actions = $('.dace-action-popover');
    if($this.hasClass('activated')){
       actions.removeClass('activated')
       return
    }
    var popover_container = $('.action-popover-container')
    var target = $(popover_container.find('.popover-content'))//closest('.dace-action-inline').data('target')+'-target';
    actions.removeClass('activated')
    var url = $this.closest('.dace-action-popover').data('updateurl');
    loading_progress()
    $.getJSON(url,{tomerge:'True', coordinates:'main'}, function(data) {
       var action_body = data['body'];
       if (action_body){
           target.html(action_body);
           init_emoji($(target.find('.emoji-container:not(.emojified)')));
           rebuild_scrolls($(target.find('.malihu-scroll')))
           $this.addClass('activated')
           var position = $this.offset()
           popover_container.css('top', position.top-$(document).scrollTop()-(popover_container.height()/2)+'px')
           popover_container.css('left', position.left+$this.width()-2+'px')
           popover_container.css('display', 'block')
           popover_container.addClass('in')
           try {
                deform.processCallbacks();
            }
           catch(err) {};
           init_comment_scroll(target)
           finish_progress()
        }else{
           location.reload();
           return false
        }
    });
    return false;
};


$(document).on('click', '.dace-action-sidebar', update_sidebar_action);

$(document).on('click', '.dace-action-popover', update_popover_action);

$(document).on('click', 'a.dace-action-modal', update_modal_action);


$(document).on('click', function(event){
       var popover_container = $($(event.target).parents('.action-popover-container'))
       if(popover_container.length == 0){
          var active_popover = $('.action-popover-container.in')
          if (active_popover.length >= 1){
            $('.dace-action-popover').removeClass('activated');
            active_popover.css('display', 'none')
            active_popover.removeClass('in')
            $(active_popover.find('.popover-content')).html('');
          }
       }
    });
             