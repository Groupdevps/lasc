import io from "socket.io-client"
class Connections{
	constructor(info_){
		this.api 		 	= info_.api;
		this.i18n 		 	= info_.i18n;
		this.connections 	= {};
		this.settings 		= {
		    //"path" : "/ws",
		    "transport"     : ['websocket'],    
		    "pingTimeout"   : 10000,
		    "reconnection"  : true,
		    "reconnect"     : false, 
		};
	}

	set_connection(info){
		this.connections[info.key].connection =  io.connect(`${api.url_socket}-${api.workspace}`, this.settings);
	}

	listen_channel(info, res){
		if (info && info.key){
			this.connections[info.key].count ++;
			this.connections[info.key].connection.on(info.channel, (message)=>{
				res(message);
			})
		}else{
			console.warn("Required key ")
		}
	}
	stop(info){
		if (info && info.key) {
			if (this.connections[info.key].count >= 2) {
				console.warn("Still connections using socket not possible close connection ", info.key);
			}else{
				this.connections[info.key].connection.disconnect();
			}

		}else{
			console.warn("Required key to close connections")

		}
	}
}

export default Connections;