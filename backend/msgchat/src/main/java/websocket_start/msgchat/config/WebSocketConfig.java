package websocket_start.msgchat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import websocket_start.msgchat.websocket.WebSocketChanelInterceptor;
import org.springframework.messaging.simp.config.ChannelRegistration;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final WebSocketChanelInterceptor interceptor;

    public WebSocketConfig(WebSocketChanelInterceptor interceptor){
        this.interceptor = interceptor;
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(interceptor); // registra aqui
    }


    @Override
    public  void configureMessageBroker(MessageBrokerRegistry registry){
        registry.enableSimpleBroker("/topics");
        registry.setApplicationDestinationPrefixes("/app");
    }
    @Override
    public  void registerStompEndpoints(StompEndpointRegistry registry){
        registry.addEndpoint("/ws-msgs-start").setAllowedOriginPatterns("*");
    }
}
