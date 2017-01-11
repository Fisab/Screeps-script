function clearCreeps(room){
	//creeps in rooms
	for(var i in Memory.creeps){
	    if(!Game.creeps[i])
	        delete Memory.creeps[i];
	}

	var creeps = Memory.rooms[room].creeps;
	for(var i = creeps.length-1; i >= 0; i--){
	    if(creeps[i] == undefined || creeps[i] == null || String(creeps[i][0]).length <= 3)
	        Memory.rooms[room].creeps.splice(i, 1);
		else if(creeps[i][0].length == 15 && !Game.getObjectById(creeps[i][0])){
			var role = creeps[i][1];
			Memory.rooms[room].countCreeps[role]--;
			var sources = Memory.rooms[room].sources;
			for(var j = 0; j < sources.length; j++){
				if(sources[j].id == creeps[i][2]){
					sources[j].creep = 0;
					break;
				}
			}
			Memory.rooms[room].creeps.splice(i, 1);
		}
		else if(Game.creeps[Memory.rooms[room].creeps[i][0]]){
			Memory.rooms[room].creeps[i][0] = Game.creeps[Memory.rooms[room].creeps[i][0]].id;
		}

		Memory.rooms[room].needHeal = [];
	}

	//other creeps
	var otherCreeps = Memory.otherCreeps;
	for(var i = 1; i < otherCreeps.length; i++){
		if(!Game.getObjectById(otherCreeps[i]))
			Memory.otherCreeps.splice(i, 1);
	}

	var flags = Memory.rooms[room].flags;
	for(var i = 0; i < flags.length; i++){
		if(!Game.flags[flags[i]])
			Memory.rooms[room].flags.splice(i, 1);
	}

	//hostile creeps
	var hostileCreeps = Memory.rooms[room].hostileCreeps;
	for(var i = hostileCreeps.length-1; i >= 0; i--){
		var creep = Game.getObjectById(hostileCreeps[i]);
		if(creep == null)
			Memory.rooms[room].hostileCreeps.splice(i, 1);
	}
}

function clearSpawns(room){
	var spawns = Memory.rooms[room].spawns;
	//for(var i = 0; i < spawns.length-1;)
}

module.exports = {
	clearCreeps: clearCreeps
}
