package websocket_start.msgchat.websocket;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;

@Component
public class WebSocketChanelInterceptor implements ChannelInterceptor {

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel){
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        System.out.println("message: "+ message + " message channel: " + channel + " stompcommand.connect: "+ StompCommand.CONNECT + " acessor command: " + accessor.getCommand());
        if (StompCommand.CONNECT.equals(accessor.getCommand())){
            String chatID = accessor.getFirstNativeHeader("chatID");
            accessor.getSessionAttributes().put("chatID",chatID);
            System.out.println("Connect Session for: " + chatID);
        }
        return message;
    }

}
