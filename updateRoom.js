function updateRoom(room){
	updateNeedCreeps(room);
	updateExtensions(room)
}

function updateStructures(room){
	Memory.rooms[room].structures = [];
	var struct = Game.rooms[room].find(FIND_MY_STRUCTURES);
	for(var j = 0; j < struct.length; j++){
		if(struct[j].structureType != 'controller' && struct[j].structureType != 'spawn')
			Memory.rooms[room].structures.push(struct[j].id);
	}
}

function updateNeedCreeps(room){
	var needCreeps = nc = Memory.rooms[room].needCreeps;
	//var sources = Game.rooms[room].find(FIND_SOURCES);
	var sources = Memory.rooms[room].sources;
	//COURIER
	var flags = Memory.rooms[room].flags;
	var allEnergy = 0;
	var energyForUp = 0;
	for(var i = 0; i < flags.length; i++){
		if(flags[i].substr(0, flags[i].length-2) == 'harvEnCur_'+room){
			var energy_ = [];
			try{energy_ = Game.flags[flags[i]].pos.lookFor(LOOK_ENERGY);}catch(e){};
			if(energy_.length > 0)
				allEnergy += energy_[0].energy;
		}
		else if(flags[i] == 'upEnFl_'+room){
			var energy_ = Game.flags[flags[i]].pos.lookFor(LOOK_ENERGY);
			if(energy_.length > 0)
				energyForUp += energy_[0].energy;
		}
	}
	needCreeps.COURIER = Math.ceil(allEnergy/1000);
	if(needCreeps.COURIER > 4)
		needCreeps.COURIER = 4;

	//HARVESTER
	needCreeps.HARVESTER = sources.length;
	if(Memory.rooms[room].countCreeps.COURIER <= 1 && needCreeps.COURIER > 1)
		needCreeps.HARVESTER = 1;

	
	//UPGRADER
	needCreeps.UPGRADER = Math.floor((allEnergy+energyForUp)/1000);
	if(needCreeps.UPGRADER > 2)
		needCreeps.UPGRADER = 2;


	//BUILDER
	needCreeps.BUILDER = Math.floor(Memory.rooms[room].constructions.length/2);
	var structs = Memory.rooms[room].structures;
	var structsCnt = {'road': 0, 'rampart': 0, 'wall': 0};
	var allCnt = 0;
	for(var i = 0; i < structs.length; i++){//test
		structsCnt[Game.getObjectById(structs[i][0]).structureType]++;
		allCnt++;
	}
	needCreeps.BUILDER += Math.floor(allCnt/2);
	if(needCreeps.BUILDER > 2)
		needCreeps.BUILDER = 2;

	//ALL
	needCreeps.ALL = nc.HARVESTER + nc.COURIER + nc.UPGRADER + nc.BUILDER;
	Memory.rooms[room].needCreeps = needCreeps;
}

function updateExtensions(room){
	//CLEAR EMPLOYMENT OF EXTENSIONS
	if(Memory.rooms[room].tickers.empExt < 10){
		Memory.rooms[room].tickers.empExt++;
		return;
	}
	var structs = Memory.rooms[room].structures;
	for(var j = 0; j < structs.length; j++){
		var struct = Game.getObjectById(structs[j][0]);
		if(struct.structureType == 'extension' && structs[j][1] == 1){
			Memory.rooms[room].structures[j][1] = 0;
			Memory.rooms[room].tickers.empExt = 0;
		}
	}
}

module.exports = {
	updateRoom: updateRoom,
	updateStructures: updateStructures
}