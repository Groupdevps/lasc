class Sounds{

	constructor(url){
		this.sounds 	 	= {};
		this.list 		 	= [];
		this.url 			= url;
		this.lastSound  	= "";
		this.new_sound   	= null;
		this.state  		= true,
		this.sounds 	 	= [
			{	name : "sound1", url : "/sounds/sound1.mp3"}
		]
		this.runSounds([ ...this.sounds ]);

	}
	runSounds(items){
		if (items && items.length > 0) {
			items.forEach((it)=>{
				if (it && it.name) {
					this.sounds[it.name] 		=  { ...it };									
					this.sounds[it.name].audio = new Audio(it.url);
				}
			});
		}
		
	}
	disableSound(){
		this.state = false;
	}

	enableSound(){
		this.state = true;
	}

	play(key){

		if (key &&  this.sounds && this.sounds[key] && this.state){
			this.stop(this.lastSound);			
			this.sounds[key].audio.play();			
			this.lastSound = key;	
		}

	}

	stop(key){
		if (key &&  this.sounds && this.sounds[key] && this.state){			
			this.sounds[key].audio.currentTime = 0;
			this.sounds[key].audio.pause();
			this.sounds[key].audio.currentTime = 0;

		}
	}
	del(key, list){
		if (key && this.sounds &&  this.sounds[key]) {
			delete this.sounds[key];
		}
	}
}
export default  Sounds;