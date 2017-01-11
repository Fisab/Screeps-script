function upgrader(creep_){
	var controller = Game.getObjectById(creep_[2]);
	var creep = Game.getObjectById(creep_[0]);
	if(creep == undefined)
		return;
	if(creep.hits < creep.hitsMax)
		Memory.rooms[creep.room.name].needHeal.push(creep_[0]);
	if(creep.carry.energy != 0){
		if(creep.pos.getRangeTo(controller) <= 3){
        	creep.upgradeController(controller);
        	return;
		}
        else{
        	creep.moveTo(controller, {reusePath: 75});
        	return;
        }
	}

	var flag = Game.flags['upEnFl_'+creep.room.name];
	if(flag){
		if(creep.pos.isNearTo(flag)){
			var energy = flag.pos.lookFor(LOOK_ENERGY);
			if(energy.length == 0)
				return;
			else
				creep.pickup(energy[0]);
		}
		else
			creep.moveTo(flag, {reusePath: 75});
	}
}

module.exports = {
	upgrader: upgrader
}
