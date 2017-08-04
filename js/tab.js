/*
tab切换   
作者：郭晓波
时间：2017-08-02
*/
(function($) {
    $.tab = {
        activeTab: function() {
            //侧边栏点击增加主题内容tab
            $('.page-tabs-content a').removeClass('active');
            var url = $(this).attr('href');
            var name = $.trim($(this).text());
            var id = '';
            var flag = true;
            $('.menuTab').each(function() {
                if ($(this).data('id') == url) {
                    if (!$(this).hasClass('active')) {
                        $(this).addClass('active').siblings('.menuTab').removeClass('active');
                        $('.content .iframe').each(function() {
                            if ($(this).data('id') == url) {
                                $(this).show().siblings('.iframe').hide();
                                return false;
                            }
                        });
                    }
                    var scrollWidth = 0;
                    $(this).prevAll().each(
                        function() {
                            scrollWidth += $(this).width();
                        }
                    );
                    $('.page-tabs-content').animate({ marginLeft: 0 - scrollWidth + 'px' }, 'fast');
                    flag = false;
                    return false;
                }
            });
            if (flag) {
                //tab标签
                if (url != 'javascript:;') {
                    var str = '<a href="javascript:;" class="menuTab active" data-id="' + url + '">' + name + '<i class="fa fa-remove"></i></a>';
                    $('.menuTabs .page-tabs-content').append(str);
                    //iframe
                    var strIframe = '<iframe class="iframe" id="iframe' + id + '" width="100%" height="100%" src="' + url + '" data-id="' + url + '" frameborder="0"></iframe>';
                    $('.content').find('.iframe').hide();
                    $('.content').append(strIframe);
                }
                var visibleWidth = $('.content-tabs').width() - 170;
                var activeEleWidth = $('.page-tabs-content').width();
                if (visibleWidth > activeEleWidth) {
                    return false;
                } else {
                    //当tab超出可视宽度时，替换最左边可以关闭的第一个选项卡
                    // $('.menuTab').each(function() {
                    //     var hasc = $(this).children('i');
                    //     if (hasc.length == 0) {
                    //         $(this).next().remove();
                    //     }
                    // });
                    $.tab.scrollTab(this);
                }
            }

        },
        closeTab: function() {
            //关闭头部tab
            var closeTabId = $(this).parent('.menuTab').data('id');
            if ($(this).parent('.menuTab').hasClass('active')) {
                var activeId = $(this).parents('.menuTab').next('.menuTab:eq(0)').data('id');
                if (activeId) {
                    $(this).parents('.menuTab').next('.menuTab:eq(0)').addClass('active');
                    $('.content .iframe').each(function() {
                        if ($(this).data('id') == activeId) {
                            $(this).show().siblings('.iframe').hide();
                            return false;
                        }
                    });
                } else {
                    var preActiveID = $(this).parents('.menuTab').prev('.menuTab:eq(0)').data('id');
                    if (preActiveID) {
                        $(this).parents('.menuTab').prev('.menuTab:eq(0)').addClass('active');
                        $('.content .iframe').each(function() {
                            if ($(this).data('id') == preActiveID) {
                                $(this).show().siblings('.iframe').hide();
                                return false;
                            }
                        });
                    }
                }

                $(this).parents('.menuTab').remove();
            } else {
                $(this).parents('.menuTab').remove();
                $('.content .iframe').each(function() {
                    if ($(this).data('id') == closeTabId) {
                        $(this).remove();
                        return false;
                    }
                });
            }
        },
        switchTab: function() {
            //tab切换
            var currentId = $(this).data('id');
            if (!$(this).hasClass('active')) {
                $(this).addClass('active').siblings('.menuTab').removeClass('active');
                $('.iframe').each(function() {
                    if ($(this).data('id') == currentId) {
                        $(this).show().siblings('.iframe').hide();
                        return false;
                    }
                });
            }
        },
        freshTab: function() {
            //刷新当前页
            var currentID = $('.page-tabs-content').find('.active').attr('data-id');
            var target = $('.iframe[data-id="' + currentID + '"]');
            var url = target.attr('src');
            target.attr('src', url).load();
        },
        closeTabAll: function() {
            //关闭所有tab页，除首页
            $('.page-tabs-content').children('[data-id]').find('.fa-remove').each(function() {
                $('.iframe[data-id="' + $(this).data('id') + '"]').remove();
                $(this).parent('a').remove();
            });
            $('.page-tabs-content').children("[data-id]:first").each(function() {
                $('.iframe[data-id="' + $(this).data('id') + '"]').show();
                $(this).addClass("active");
            });
        },
        closeTabOther: function() {
            //关闭除当前页之外的所有tab页
            $('.page-tabs-content').children("[data-id]").find('.fa-remove').parents('a').not(".active").each(function() {
                $('.iframe[data-id="' + $(this).data('id') + '"]').remove();
                $(this).remove();
            });
        },
        scrollTab: function(element) {
            //移动tab
            var visibleWidth = $('.content-tabs').width() - 170;
            var activeEleWidth = $('.page-tabs-content').width();
            if (visibleWidth > activeEleWidth) {
                return false;
            } else {
                $('.page-tabs-content').animate({ marginLeft: 0 - activeEleWidth + visibleWidth + 'px' }, 'fast');
            }
        },
        scrollTabLeft: function() {
            //向左移动
            var visibleWidth = $('.content-tabs').width() - 170;
            var activeEleWidth = $('.page-tabs').width();
            if (visibleWidth > activeEleWidth) {
                return false;
            } else {
                $('.page-tabs-content').animate({ marginLeft: 0 - activeEleWidth + 'px' }, 'fast');
            }
        },
        scrollTabRight: function() {
            //回归原位tab
            $('.page-tabs-content').animate({ marginLeft: 0 + 'px' }, 'fast');
        },
        init: function() {
            $('.metismenu li a').on('click', $.tab.activeTab);
            $('.page-tabs-content').on('click', '.menuTab .fa-remove', $.tab.closeTab);
            $('.page-tabs-content').on('click', '.menuTab', $.tab.switchTab);
            $('.tabFresh').on('click', $.tab.freshTab);
            $('.tabCloseAll').on('click', $.tab.closeTabAll);
            $('.tabCloseOther').on('click', $.tab.closeTabOther);
            $('#scrollTabLeft').on('click', $.tab.scrollTabLeft);
            $('#scrollTabRight').on('click', $.tab.scrollTabRight);
        }
    };
    $(function() {
        $.tab.init();
    });

})(jQuery);