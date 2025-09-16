package websocket_start.msgchat.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;
import websocket_start.msgchat.domain.ChatInput;
import websocket_start.msgchat.domain.ChatOutput;

@Controller
public class MsgController {

    @MessageMapping("/new-msg")
    @SendTo("/topics/ws-msg")
    public ChatOutput newMsg(ChatInput input) {
        System.out.println(input.msg());
        return new ChatOutput(HtmlUtils.htmlEscape(input.name() + ": " + input.msg()));
    }

}
