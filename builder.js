function builder(creep_, index, creep){
	if(creep == undefined)
		var creep = Game.getObjectById(creep_[0]);
	if(creep == undefined)
		return;
	if(creep.hits < creep.hitsMax)
		Memory.rooms[creep.room.name].needHeal.push(creep_[0]);

	if(creep_[2].length == 15)
		var target = Game.getObjectById(creep_[2]);
	else{
		var target = Game.flags[creep_[2]];
		if(Memory.rooms[creep.room.name].constructions.length > 0){
			findBuild(index, creep.room.name);
		}
	}

	if(creep_[2] == 0)
		findBuild(index, creep.room.name);

	if(target == null && creep_[2].length == 15){
		deleteBuildMem(creep_[2], creep.room.name);
		findBuild(index, creep.room.name);
		return;
	}

	if(Game.time % 90 == 0)
		findBuild(index, creep.room.name);

	if(creep.carry.energy == 0){
		if(target == null || target.energy == undefined){
			Memory.rooms[creep.room.name].creeps[index][2] = 0;
			return;
		}
		if(creep.pos.isNearTo(target)){
	        creep.pickup(target);
	        findBuild(index, creep.room.name);
	        return;
		}
	    else{
	    	creep.moveTo(target, {reusePath: 75});
	    	return;
		}
	}

	if(target.progress != undefined && creep_[2].length == 15){
		if(creep.pos.isNearTo(target)){
			creep.build(target);
			return;
		}
	    else{
	    	creep.moveTo(target, {reusePath: 75});
	    	return;
		}
	}

	else if(creep_[2].length != 15){
		if(!creep.pos.isNearTo(target))
			creep.moveTo(target, {reusePath: 75});
	}

	else if(target.hits != undefined && creep_[2].length == 15){
		if(target.hits == target.hitsMax){
			findBuild(index, creep.room.name);
			return;
		}
		if(creep.pos.isNearTo(target)){
			creep.repair(target);
			return;
		}
	    else{
	    	creep.moveTo(target, {reusePath: 75});
	    	return;
		}
	}
}

function findBuild(index, room){
	var spawns = Memory.rooms[room].spawns;
	for(var i = 0; i < Object.keys(spawns).length; i++){
		var spawn = Game.getObjectById(spawns[Object.keys(spawns)[i]].id);
		if(spawn.hits < spawn.hitsMax){
			Memory.rooms[room].creeps[index][2] = spawn.id;
			return;
		}
	}
	var builds = Memory.rooms[room].structures;
	for(var i = 0; i < Object.keys(builds).length; i++){
		var build = Game.getObjectById(builds[Object.keys(builds)[i]][0]);
		if(build == null && builds[Object.keys(builds)[i]].length == 15){
			deleteStructureMem(builds[Object.keys(builds)[i]], room);
			return;
		}
		if((build.structureType == 'wall' || build.structureTyp == 'rampart')){// && ){
			return;
		}
		if(build.hits < build.hitsMax){
			Memory.rooms[room].creeps[index][2] = build.id;
			return;
		}
	}
	var constructions = Memory.rooms[room].constructions;
	if(constructions.length > 0){
		Memory.rooms[room].creeps[index][2] = constructions[0];
		return;
	}
	Memory.rooms[room].creeps[index][2] = 'wait_'+room;

}

function deleteBuildMem(id, room){
	Memory.rooms[room].structures = [];
	var constructions = Memory.rooms[room].constructions;
	for(var i = constructions.length-1; i >= 0; i--){
		if(constructions[i] == id){
			Memory.rooms[room].constructions.splice(i, 1);
			break;
		}
	}
	var struct = Game.rooms[room].find(FIND_STRUCTURES);
	for(var j = 0; j < struct.length; j++){
		if(struct[j].structureType != 'controller' && struct[j].structureType != 'spawn')
			Memory.rooms[room].structures.push([struct[j].id, 0]);
	}
}

function deleteStructureMem(id, room){
	var structures = Memory.rooms[room].structures;
	for(var i = structures.length-1; i >= 0; i--){
		if(structures[i] == id){
			Memory.rooms[room].structures.splice(i, 1);
			break;
		}
	}
}

module.exports = {
	builder: builder
}
