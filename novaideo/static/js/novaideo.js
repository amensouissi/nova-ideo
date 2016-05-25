function collapse_current_collpsein(){
  var current_btn = $(this);
  var btns = $('.navbar-toggle.collapsed');
  for(var i = 0; i<= btns.length; i++){
      var btn = $(btns[i]);
      if (btn != current_btn){
        $(btn.data('target')).collapse('hide');
      }
  }

}

function activate_explanation(event){
  if($(event.target).parents('.proposal-explanation').length == 0){
    var explanation = $($(this).find('.proposal-explanation').first());
    explanation.removeClass('hide-bloc');}
};

function close_explanation(event){
    var explanation = $($(this).parents('.proposal-explanation').first());
    explanation.addClass('hide-bloc');
};


function set_visited(){
    $.cookie('visited', 'true', {path: '/',  expires: 1});
}


function initscroll(){
   $(".result-scroll").mCustomScrollbar({
    theme:"minimal-dark",
    scrollInertia: 200,
    callbacks:{
      onTotalScroll:function(){
        $(this).trigger('scroll');
      }
    }
  });
  $('.results .mCSB_container').infinitescroll('destroy');
  $('.results .mCSB_container').infinitescroll({
    behavior: 'local',
    bufferPx: 0,

    binder: $('.result-scroll'),
    navSelector  : ".results .batch",
                   // selector for the paged navigation (it will be hidden)
    nextSelector : ".results .pager .next",
                   // selector for the NEXT link (to page 2)
    itemSelector : ".results .result-container",

    pathParse: function(path, next_page) {
       var new_path = path;
       var filter = $('#filter-'+$('.results').first().attr('id'));
       if (filter.length>0){
            var form = $($(filter).find('form').first());
            var filter_container = $(form.parents('.filter-container'));
            var progress = filter_container.find('img.loading-indicator');
            var filter_btn = $(filter_container.find('.filter-btn').first());
            var data_get = $(form).serialize();
            data_get += '&'+'op=filter_result';
            var target = $($('.pontus-main .panel-body').first());
            var target_title = $($('.pontus-main .panel-heading').first());
            var url = filter_btn.data('url');
            var filter_source = filter_btn.data('filter_source');
            if (filter_source !== ''){
              data_get += '&'+'filter_source='+filter_source;
            }
            data_get += '&'+'filter_result=true';
            data_get += '&'+'scroll=true';
            new_path += '&'+ data_get;
      };
      // var parts = new_path.match(/^(.*?batch_num=)1(.*|$)/).slice(1);
// ["http://0.0.0.0:6543/@@seemyideas?batch_num=", "&batch_size=1&action_uid=-4657697968224339750"]
// substanced Batch starts at 0, not 1
       var f = function(currPage) {
          var next_path = $($($('.results .result-container').parents('div').first()).find('.result-container').last()).data('nex_url')
          return next_path +'&'+ data_get;
       };
       return f;
    },
    loading: {
      finishedMsg: '<span class="label label-warning">'+ novaideo_translate("No more item.")+"</span>",
      img: window.location.protocol + "//" + window.location.host + "/novaideostatic/images/progress_bar.gif",
      msgText: "",
    }
  });

};


function init_content_text(){
     var texts = $('.content-text');
     for(i=0; i<texts.length; i++){
         if ($(texts[i]).height()>600){
             $(texts[i]).addClass("content-text-scroll")
         }
     }
};

function init_result_scroll(){
  var result_scrolls = $('.result-scroll');
  for(var i = 0; i<= result_scrolls.length; i++){
    var result_scroll = $(result_scrolls[i]);
    var last_child = $(result_scroll.find('.result-item').last());
    if (last_child.length > 0){
        var top = last_child.offset().top - result_scroll.offset().top  + last_child.height() + 420
        if (top < 1600){
         result_scroll.height(top);
        }
    }else{
         result_scroll.height(100);
    }
 }
};

function init_morecontent_scroll(){
  var result_scrolls = $('.more-content-carousel');
  for(var i = 0; i<= result_scrolls.length; i++){
    var result_scroll = $(result_scrolls[i]);
    var last_child = $(result_scroll.find('.search-item').last());
    if (last_child.length > 0){
        var top = last_child.offset().top - result_scroll.offset().top  + last_child.height() + 150
        if (top < 1600){
         result_scroll.height(top);
        }
    }else{
         result_scroll.height(100);
    }
 }
};


function more_content(elements, isvertical){
    try{
      elements.slick({
        vertical: isvertical,
        centerMode: true,
        dots: false,
        slidesToShow: 5,
        slidesToScroll: 5,
        // autoplay: true,
        // autoplaySpeed: 8000,
        // infinite: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
                // infinite: true,
                dots: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
         ]
       });
  }
  catch(err) {
  }

}

function init_search_results(){
  $('.proposal-opinion').on('click', activate_explanation);

  $('.proposal-opinion button.close').on('click', close_explanation);

  $('.working-group-toggle').on('click', function(){
    var $this = $(this)
      var wg_section_body = $($($this.parents('.working-group-result').first()).find('.working-group-section').first());
      var btn = $($this.find('.working-group-toggle-btn').first());
      
      if(wg_section_body.hasClass('hide-bloc')){
       btn.addClass('ion-ios7-arrow-up');
        btn.removeClass(' ion-ios7-arrow-down');
        wg_section_body.removeClass('hide-bloc');
      }else{
        btn.removeClass('ion-ios7-arrow-up');
        btn.addClass(' ion-ios7-arrow-down');
        wg_section_body.addClass('hide-bloc');
      };
      
      init_result_scroll();
        
  });
}


function scroll_to_panel(){
  var url = document.location.toString();
  if ( url.match('#') ) {
      var panel = $('#'+url.split('#')[1])
      panel.addClass('in');
      panel.animate({scrollTop : 0},800);
  }
}


$(document).on('click', '.proposal-support .token', function(){
   var $this = $(this)
   var opposit_class = $this.hasClass('token-success')? '.danger': '.success';
   var opposit = $($this.parents('.proposal-support').first().find('.label'+opposit_class).first())
   var opposit_token = $(opposit.find('.token').first())
   var parent = $($this.parents('.label').first())
   var action_url = $this.data('action')
   var mytoken = $(parent.find('.my-token').first())
   var support_nb = $(parent.find('.support-nb').first())
   var opposit_mytoken = $(opposit.find('.my-token').first())
   var opposit_support_nb = $(opposit.find('.support-nb').first())
   if(action_url){
     $.getJSON(action_url,{}, function(data) {
          if(data['state']){
            if(!data.withdraw){
             mytoken.removeClass('hide-bloc')
             var new_nb = parseInt(support_nb.text()) + 1
             support_nb.text(new_nb)
             if (data.change){
               opposit_mytoken.addClass('hide-bloc')
               var opposit_new_nb = parseInt(opposit_support_nb.text()) - 1
               opposit_support_nb.text(opposit_new_nb)
               opposit_token.data('action', data.opposit_action)
             }
            }else{
              mytoken.addClass('hide-bloc')
              var new_nb = parseInt(support_nb.text()) - 1
              support_nb.text(new_nb)
            }
            $this.data('action', data.action)
          }
        });
   }

})

$(document).on('click', '.sidebar-nav li > a.primary', function(event){
    var $this = $(this)
    if(!event.internal){
      $this.addClass('current')
      var menuevent = jQuery.Event( "click" );
      menuevent.internal = true;
      $('.sidebar-nav li > a.primary.active-item:not(.current)').trigger(menuevent);
      $this.removeClass('current')
    }
    var iconstate = $($this.find('span.icon-state'));
    if(iconstate.hasClass('ion-chevron-down')){
       iconstate.addClass('ion-chevron-up')
       .removeClass('ion-chevron-down')
    }else{
      iconstate.addClass('ion-chevron-down')
       .removeClass('ion-chevron-up')
    }
    if($this.hasClass('active-item')){
       $this.removeClass('active-item')
    }else{
      $this.addClass('active-item')
    }
    
})

function update_inline_action(url){
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
           $(target.find('.container-body')).html(action_body);
           target.slideDown();
           $this.addClass('activated')
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

function open_add_idea_form(){
$(".home-add-idea .form-group:not(.idea-text),"+
     ".home-add-idea .form-group label,"+
     ".home-add-idea .form-group.idea-text #desc").slideDown();
    $(".home-add-idea").addClass('opened').removeClass('closed')
}

function close_add_idea_form(){
   $(".home-add-idea .form-group:not(.idea-text),"+
     ".home-add-idea .form-group label,"+
     ".home-add-idea .form-group.idea-text #desc").slideUp();
    $(".home-add-idea").addClass('closed').removeClass('opened')
  }

$(document).mouseup(function (e)
{
    var container = $(".home-add-idea, .select2-results");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0
        && $(e.target).parents('body').length != 0) // ... nor a descendant of the container
    {
        if(!$(".home-add-idea .form-group.idea-text textarea").val()){
           close_add_idea_form()
        }
    }
});

$(document).on('click', '.dace-action-inline', update_inline_action);

$(document).ready(function(){
  $('.hidden-js').css('display', 'none');

  $(document).on('click','.home-add-idea form .btn', function( event ) {
    $(this).addClass('active')
  })

  $(document).on('submit','.home-add-idea form', function( event ) {
        var $this = $(this)
        var button = $($this.find('button.active').first())
        if(button.val() == 'Cancel'){
          $this.find('textarea[name="text"]').val('');
          $this.find('.deform-close-button').click()
          $(button).removeClass('active');
          close_add_idea_form()
          event.preventDefault();
           return
        }
        var parent = $($this.parents('.home-add-idea').first());
        var danger_messages_container = $(parent.find('#messagedanger'));
        var title = $this.find('input[name="title"]').val();
        if (title=='')
        {
           danger_messages_container.text( novaideo_translate("The title is required!") ).show().fadeOut( 6000 );
           event.preventDefault();
           return
        }
        var text = $this.find('textarea[name="text"]').val();
        if (text=='')
        {
           danger_messages_container.text( novaideo_translate("The abstract is required!") ).show().fadeOut( 6000 );
           event.preventDefault();
           return
        }

        var keywords = $($this.find('select[name="keywords"]')).val();
        if (!keywords || keywords.length == 0)
        {
           danger_messages_container.text( novaideo_translate("Keywords are required!")).show().fadeOut( 6000 );
           event.preventDefault();
           return
        }

        var formData = new FormData($(this)[0]);
        formData.append(button.val(), button.val())
        var url = parent.data('url')
        
        // var inputs = $($(event.target).children().filter('fieldset')[0]).find('input[type|="radio"]');
        // if (version !=''){
          // progress.show();// TODO
          var buttons = $($this.find('button'))
        $(buttons).addClass('disabled');
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(data) {
              if(data.state){
                $(data.body).hide().prependTo($('.result-container')).fadeIn(1500)
                $this.find('input[name="title"]').val(data['new_title']);
                $this.find('textarea[name="text"]').val('');
                $this.find('.deform-close-button').click()
                $(buttons).removeClass('disabled');
                $(button).removeClass('active');
                close_add_idea_form()
              }
             }
        });


       event.preventDefault();
   });

  $(".home-add-idea.closed .form-group.idea-text").click(function(e) {
      open_add_idea_form()
  });

  $(".menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
        $('.sidebar-background').toggleClass("toggled");
    });

$(".malihu-scroll").mCustomScrollbar({
    theme:"minimal-dark",
    scrollInertia: 200
  });


   

  $(".navbar-toggle.collapsed").on('click', collapse_current_collpsein);

  $('input, textarea').placeholder();

  set_visited();

  init_content_text();

  init_search_results();

  init_result_scroll();

  init_morecontent_scroll();

  initscroll();

  $('.panel-collapse.collapse .results').attr('class', 'results-collapse');

  $('.panel-collapse').on('hidden.bs.collapse', function () {
      $(this).find('.result-collapse').attr('class', 'results-collapse');
      $('.results').attr('infinitescroll', null)
  });

  $('.panel-collapse').on('shown.bs.collapse', function () {
      $(this).find('.results-collapse').attr('class', 'results');
      initscroll()
  });

  $('nav a nav-control').on('click', function(){
      $(".navbar-toggle").click();
  });

  $('.panel-collapse').on('hide.bs.collapse', function () {
    $(this).siblings().find('a span').attr('class', 'glyphicon glyphicon-plus');
  });

  $('.panel-collapse').on('show.bs.collapse', function () {
    $(this).siblings().find('a span').attr('class', 'glyphicon glyphicon-minus');
  });

  // $('.scroll-able.result-scroll').endlessScroll({
  //     fireOnce: false,
  //     callback: function(i, n, p) {
  //       $(window).scroll()
  //     }
  //   });

//code adapted from http://bootsnipp.com/snippets/featured/jquery-checkbox-buttons
$(function () {
    $('.search-choices .checkbox-inline').each(function () {

        // Settings
        var $widget = $(this),
            $checkbox = $widget.find('input:checkbox'),
            $button = $('#search-choice-'+$checkbox.attr('value')),
            color = $button.data('color'),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };

        // Event Handlers
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $button
                    .addClass('active');
                $('#'+$button.attr('id')+'-icon').removeClass('hide-bloc')
            }
            else {
                $button
                    .removeClass('active')
                $('#'+$button.attr('id')+'-icon').addClass('hide-bloc')
            }
        }

        // Initialization
        function init() {

            updateDisplay();

            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
            }
        }
        init();
    });
});

  // more_content($('.more-content-carousel.verticla'), true);
  // more_content($('.more-content-carousel:not(.vertical)'), false);

  $('.alert-block:not(.off)').hover(function(){
        var $this = $(this);
        var url = $this.data('url');
        var alert_content = $($this.find('.alerts-content').first());
        var target = $(alert_content.find('.content').first());
        alert_content.find('.loading-indicator').removeClass('hide-bloc')
        alert_content.removeClass('hide-bloc');
        $.getJSON(url,{}, function(data) {
          if(data['body']){
            target.html(data['body']);
            alert_content.find('.loading-indicator').addClass('hide-bloc')
          }
        });

    }, function(){
        var $this = $(this);
        $this.find('.alerts-content').addClass('hide-bloc')
    });

 scroll_to_panel()

});
