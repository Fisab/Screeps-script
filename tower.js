function tower(room){
	var enemies = Memory.rooms[room].hostileCreeps;
	var creeps = Memory.rooms[room].creeps;
	var needHeal = null;

	if(Memory.rooms[room].needHeal.length > 0)
		needHeal = Game.getObjectById(Memory.rooms[room].needHeal[0]);

	if(needHeal == null && enemies.length == 0){
		//trasnferEnergy(room);
		return;
	}

	var towers = Memory.rooms[room].towers;

	if(needHeal != null && enemies.length == 0){
		for(var i = 0; i < towers.length; i++){
			var tower = Game.getObjectById(towers[i]);
			if(tower == undefined || tower.energy == 0)
				continue;
			tower.heal(needHeal);
		}
		return;
	}

	var enemy = Game.getObjectById(enemies[0]);

	for(var i = 0; i < towers.length; i++){
		var tower = Game.getObjectById(towers[i]);
		if(tower == undefined || tower.energy == 0)
			continue;
		tower.attack(enemy);
	}
}

function trasnferEnergy(room){
	var spawns = Memory.rooms[room].spawns;
	var target = null;
	for(var i = 0; i < Object.keys(spawns).length; i++){
		var spawn = Game.getObjectById(spawns[Object.keys(spawns)[i]].id);
		if(spawn.energy < spawn.energyCapacity){
			target = [spawn, spawn.energyCapacity - spawn.energy];
		}
	}
	var towers = Memory.rooms[room].towers;
	for(var i = 0; i < towers.length; i++){
		var tower = Game.getObjectById(towers[i]);
		if(tower == undefined || tower.energy == 0)
			continue;
		tower.transferEnergy(target[0], target[1]);
	}
}

module.exports = {
	tower: tower
}