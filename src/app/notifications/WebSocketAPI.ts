import * as Stomp from 'stompjs/lib/stomp.js';
import * as SockJS from 'sockjs-client/dist/sockjs.js';
import { NotificationsComponent} from './notifications.component';


export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8091/websocket';
    topic: string = "/topic/user";
    stompClient: any;
    notifiComponent: NotificationsComponent;
    reconnectDelay = 5000; // initial delay
    maxReconnectDelay = 60000; // cap
    reconnectAttempts = 0;
    maxReconnectAttempts = 12;

    constructor(notifiComponent: NotificationsComponent){
        this.notifiComponent = notifiComponent;
    }
    _connect() {
        try {
            console.log("Initialize WebSocket Connection");
            let websocket = new SockJS(this.webSocketEndPoint);
            this.stompClient = Stomp.over(websocket);
            const _this = this;
            _this.stompClient.connect({}, function (frame) {
                console.log('WebSocket connected');
                // reset reconnect state on successful connection
                _this.reconnectAttempts = 0;
                _this.reconnectDelay = 5000;
                _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                    _this.onMessageReceived(sdkEvent);
                });
            }, this.errorCallBack.bind(this));
        } catch (e) {
            console.warn("WebSocket connection failed (expected in test environment):", e.message);
        }
    };

    _disconnect() {
        if (this.stompClient !== null && this.stompClient !== undefined) {
            try {
                this.stompClient.disconnect();
            } catch (e) {
                console.warn("Error disconnecting WebSocket:", e.message);
            }
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error :any) {
        console.log("errorCallBack -> " + error)
        try {
            // exponential backoff with cap
            if (this.reconnectAttempts >= this.maxReconnectAttempts) {
                console.warn('Max reconnect attempts reached');
                return;
            }
            const delay = Math.min(this.reconnectDelay * Math.pow(1.5, this.reconnectAttempts), this.maxReconnectDelay);
            this.reconnectAttempts++;
            console.log(`WebSocket reconnect attempt #${this.reconnectAttempts} in ${delay}ms`);
            setTimeout(() => {
                this._connect();
            }, delay);
        } catch (e) {
            console.warn("Error in errorCallBack:", e.message);
        }
    }

	/**
	 * Send message to sever via web socket
	 * @param {*} message 
	 */
    _send(message:any) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/user", {}, JSON.stringify(message));
    }

    onMessageReceived(message) {
        console.log("Message Recieved from Server :: " + message);
        
        this.notifiComponent.handleMessage(JSON.stringify(message.body));
    }
}