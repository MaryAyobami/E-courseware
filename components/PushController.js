
import React, {Component} from "react";
import PushNotification from "react-native-push-notification";
// var PushNotification = require("react-native-push-notification");

export default class PushController extends Component{
        componentDidMount(){
            PushNotification.configure({
                // (optional) Called when Token is generated (iOS and Android)
                onRegister: function(token) {
                
                },
            
                // (required) Called when a remote or local notification is opened or received
                onNotification: function(notification) {
                
            
                // process the notification here
            
                // required on iOS only 
                notification.finish(PushNotificationIOS.FetchResult.NoData);
                },
                // Android only
                senderID: "361554998365",
                // iOS only
                permissions: {
                alert: true,
                badge: true,
                sound: true
                },
                popInitialNotification: true,
                requestPermissions: true
            });
        }

        render(){
            return null;
        }
}