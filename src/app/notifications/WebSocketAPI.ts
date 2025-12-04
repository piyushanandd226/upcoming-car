import * as Stomp from 'stompjs/lib/stomp.js';
import * as SockJS from 'sockjs-client/dist/sockjs.js';
import { NotificationsComponent} from './notifications.component';


export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8091/websocket';
    topic: string = "/topic/user";
    stompClient: any;
    notifiComponent: NotificationsComponent;

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
                _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                    _this.onMessageReceived(sdkEvent);
                });
                //_this.stompClient.reconnect_delay = 2000;
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
            setTimeout(() => {
                this._connect();
            }, 5000);
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