/**
 * Created by MASTER on 04.01.2017.
 */
$(document).ready(function () {
    var socket = io.connect('http://localhost:3000');
    //if socket is not undefined
    var name = 'Пётр_' + (Math.round(Math.random() * 10000));
    var chat_win = $("#chat-slider");
    var chat_win_header = $("#chat-slider-header");
    var messages = $("#messages");
    var message_txt = $("#message_text");
    $('.chat .nick').text(name);

    function msg(nick, message) {
        var m = '<div class="msg">' +
            '<span class="user">' + safe(nick) + ':</span> '
            + safe(message) +
            '</div>';
        messages
            .append(m)
            .scrollTop(messages[0].scrollHeight);
    }

    function msg_system(message) {
        var m = '<div class="msg system">' + safe(message) + '</div>';
        messages
            .append(m)
            .scrollTop(messages[0].scrollHeight);
    }

    socket.on('connecting', function () {
        msg_system('Соединение...');
    });

    socket.on('connect', function () {
        msg_system('Соединение установлено!');
    });

    socket.on('message', function (data) {
        msg(data.name, data.message);
        message_txt.focus();
    });

    $("#message_btn").click(function () {
        var text = $("#message_text").val();
        if (text.length <= 0)
            return;
        message_txt.val("");
        socket.emit("message", {message: text, name: name});
    });

    chat_win_header.click(function(){
        var slider_height = chat_win.height();
        if(slider_height == 40){
            chat_win.animate({'height':'+=300'});
        }
        else{
            chat_win.animate({'height':'-=300'});
        }
    });

    function safe(str) {
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
});