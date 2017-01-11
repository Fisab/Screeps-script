function spawnCreep(room){
	var energyAv = Game.rooms[room].energyAvailable;
	var energyCapAv = Game.rooms[room].energyCapacityAvailable
	//needC == cntC or energyAv == energyOld
	//if(Memory.rooms[room].needCreeps.ALL <= Memory.rooms[room].countCreeps.ALL)// || energyAv <= oldEnergy+50)
	//	return;
	var role_ = getRole(room);

	if(role_ == undefined)
		return;


	var body = Memory.calcBody.body[role_];
	var factor = calcBody(role_, room, energyCapAv, body[body.length-1]);
	if(factor > 7 && role_ != 'COURIER')
		factor = 7;
	if( energyAv >= 300 && (Memory.rooms[room].creeps.length <= 3 || 
		(Memory.rooms[room].creeps.length > 3 && Memory.rooms[room].countCreeps.COURIER == 0))
	)
		factor = calcBody(role_, room, energyAv, body[body.length-1]);

	if(role_ == 'HARVESTER' && factor > 3)
		factor = 3;
	if(factor * body[body.length-1] > energyAv)
		return;

	var spawns = [];
	var spawns_ = Object.keys(Memory.rooms[room].spawns);
	for(var y = 0; y < spawns_.length; y++){//find spawns
		spawns.push(Game.getObjectById(Memory.rooms[room].spawns[spawns_[y]].id));
	}

	var spawn = 0;
	for(var i = 0; i < spawns.length; i++){
		if(spawns[i].spawning == null){
			spawn = spawns[i];
			break;
		}
	}
	if(spawn == 0)
		return;

	var bodyparts = [];
	for(var o = 0; o < body.length-1; o++){
		for(var k = 0; k < factor; k++){
			bodyparts.push(body[o]);
		}
	}

	var target = 0;
	var travel = 0;
	var indexOfTarget = null;
	var startRoom = spawn.pos.roomName;
	if(role_ == 'HARVESTER'){
		var sources = Memory.rooms[room].sources;
		for(var i = 0; i < sources.length; i++){
			if(sources[i].creep == 0 || Game.creeps[sources[i].creep] == undefined){
				target = sources[i].id;
				sources = sources[i];
				indexOfTarget = i;
				break;
			}
		}
		var target_ = Game.getObjectById(target);
		if(target)
			travel = spawn.pos.getRangeTo(target_);
	}
	else if(role_ == 'UPGRADER'){
		target = Game.rooms[room].controller.id;
		var target_ = Game.getObjectById(target);
		travel = spawn.pos.getRangeTo(target_);
	}

	creep = spawn.createCreep(bodyparts, null);
	Memory.rooms[room].creeps.push([creep, role_, target, travel, indexOfTarget, startRoom]);

	if(role_ == 'HARVESTER')
	    sources.creep = creep;
}

function calcBody(role, room, energyCapAv, creepCost){
	var f = energyCapAv;
	var cnt = 0;
	while(f >= creepCost){
		f -= creepCost;
		cnt++;
	}
	return cnt;
}

function getRole(room){
	nc = Memory.rooms[room].needCreeps;
	cc = Memory.rooms[room].countCreeps;
	for(var i = 0; i < Object.keys(nc).length-1; i++){
		if(nc[Object.keys(nc)[i]] > cc[Object.keys(cc)[i]]){
			return Object.keys(nc)[i];
		}
	}

}

module.exports = {
	spawnCreep: spawnCreep
}
