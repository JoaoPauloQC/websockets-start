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
            String user = accessor.getFirstNativeHeader("user");
            accessor.getSessionAttributes().put("user",user);
            accessor.getSessionAttributes().put("chatID",chatID);
            System.out.println("Connect Session for: " + chatID);
        }
        if (StompCommand.SUBSCRIBE.equals(accessor.getCommand())) {
            String destination = accessor.getDestination();
            String user = (String) accessor.getSessionAttributes().get("user"); //
            System.out.println("USER: "+user);
            if (destination != null && destination.startsWith("/topics/pvchat/")) {
                if (user == null || user.length() < 5) {

                    System.out.println("Unathorized");
                    throw new IllegalArgumentException("Acesso negado: usuário inválido");

                }
            }
        }
        return message;
    }

}
