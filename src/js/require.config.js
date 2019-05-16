require.config({
    baseUrl : "/",
    paths : {
        "header" : "js/module/header",
        "footer" : "js/module/footer",
        "jquery" : "libs/jquery/jquery-3.2.1",
        "tools" : "libs/tools",
        "login" : "js/login",
        "register" : "js/register",
        "url" : "js/module/url",
        "cookie" : "libs/jquery-plugins/jquery.cookie",
        "list" : "js/list",
        "template" : "libs/art-template/template-web",
        "detail" : "js/detail",
        "zoom" :"libs/jquery-plugins/jquery.elevateZoom-3.0.8.min",
        "swiper" : "libs/swiper/js/swiper",
        "fly" : "libs/jquery-plugins/jquery.fly"
    },
    //垫片，给不满足AMD规范的插件又要依赖于别的模块
    shim:{
        "cookie" : {
            deps : ['jquery']
        },
        "zoom" : {
            deps : ['jquery']
        },
        "fly" : {
            deps : ['jquery']
        }

    }
   
})