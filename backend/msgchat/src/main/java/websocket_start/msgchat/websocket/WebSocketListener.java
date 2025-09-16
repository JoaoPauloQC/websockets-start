package websocket_start.msgchat.websocket;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;


@Component
public class WebSocketListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketListener.class);

    @EventListener
    public void handleSessionConnected(SessionConnectEvent event){
        System.out.println("Connected");
    }

    @EventListener
    public void handleSessionDisconnected(SessionDisconnectEvent event){
        System.out.println("Disconnected");
    }
}
