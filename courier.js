function courier(creep_, index, creep){
	if(creep == undefined)
		var creep = Game.getObjectById(creep_[0]);
	if(creep == undefined)
		return;
	if(creep.hits < creep.hitsMax)
		Memory.rooms[creep_[5]].needHeal.push(creep_[0]);

	if(creep_[2] == 0)
		findPointDelivery(creep, index, creep_);

	if(creep_[2].length != 15)
		var target = Game.flags[creep_[2]];
	else
		var target = Game.getObjectById(creep_[2]);

	if(target == null || target == undefined){
		Memory.rooms[creep_[5]].creeps[index][2] = 0;
		return;
	}
	if(creep.carry.energy == 0){
		if(creep.pos.isNearTo(target)){
			creep.pickup(target);
			var room_ = creep_[5];
			Memory.rooms[room_].creeps[index][2] = 0;
			return;
		}
		else{
			creep.moveTo(target, {reusePath: 75});
			return;
		}
	}
	if(target.energy == undefined && target.store == undefined){
		if(creep.pos.isEqualTo(target)){
			creep.drop(RESOURCE_ENERGY);
		    if(creep.carry.energy == 0)
			    Memory.rooms[creep_[5]].creeps[index][2] = 0;
			else
			    findPointDelivery(creep, index, creep_);
		}
		else
		    creep.moveTo(target, {reusePath: 75});
	}

	else{
		if(creep.carry.energy == 0)
			Memory.rooms[creep_[5]].creeps[index][2] = 0;
		else if(target.energy == target.energyCapacity || (target.store != undefined && target.store.energy == target.storeCapacity)){
			findPointDelivery(creep, index, creep_);
		}
		else if(creep.pos.isNearTo(target)){
			if(target.structureType == 'extension')
				Memory.rooms[creep_[5]].structures[creep_[4]][1] = 0;

			if(creep.transfer(target, RESOURCE_ENERGY) == ERR_FULL){
				findPointDelivery(creep, index, creep_);
				return;
			}
		}
		else
			creep.moveTo(target, {reusePath: 75});
	}
}

function findPointDelivery(creep, index, creep_){
	var spawns = Memory.rooms[creep_[5]].spawns;
	var keysSpawns = Object.keys(spawns);
	for(var i = 0; i < keysSpawns.length; i++){
		var spawn = Game.getObjectById(spawns[keysSpawns[i]].id);
		if(spawn.energy != spawn.energyCapacity){
			Memory.rooms[creep_[5]].creeps[index][2] = spawns[keysSpawns[i]].id;
			return;
		}

		var structs = Memory.rooms[creep_[5]].structures;
		for(var i = 0; i < structs.length; i++){
			var struct = Game.getObjectById(structs[i][0]);
			if(struct == null && structs[i][0].length == 15){
				deleteStructureMem(structs[i][0], creep_[5]);
				return;
			}
			if((struct.structureType == 'extension' || struct.structureType == 'tower') && struct.energy < struct.energyCapacity){
				if(structs[i][1] == 1 && struct.structureType == 'extension')
					continue;
				Memory.rooms[creep_[5]].creeps[index][2] = struct.id;
				if(struct.structureType == 'extension'){
					Memory.rooms[creep_[5]].structures[i][1] = 1;
					Memory.rooms[creep_[5]].creeps[index][4] = i;
				}
				return;
			}
		}
		var flag = Game.flags['upEnFl_'+creep_[5]].pos.lookFor(LOOK_ENERGY);
		var storage = creep.room.storage;
		if((flag.length > 0 && flag[0].energy < 1000) || flag.length == 0 || storage.store.energy == storage.storeCapacity)
			Memory.rooms[creep_[5]].creeps[index][2] = 'upEnFl_'+creep_[5];
		else if(creep.room.storage.store.energy < creep.room.storage.storeCapacity)
			Memory.rooms[creep_[5]].creeps[index][2] = creep.room.storage.id;
	}
}

function deleteStructureMem(id, room){
	var structures = Memory.rooms[room].structures;
	for(var i = structures.length-1; i >= 0; i--){
		if(structures[i][0] == id){
			Memory.rooms[room].structures.splice(i, 1);
			break;
		}
	}
}

module.exports = {
	courier: courier
}