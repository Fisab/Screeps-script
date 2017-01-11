function harvester(creep_, index){
	var source = Game.getObjectById(creep_[2]);
	var creep = Game.getObjectById(creep_[0]);
	if(creep == undefined)
		return;
	/*if(source == null){
		var sources = Memory.rooms[creep_[5]].sources;
		for(var i = 0; i < sources.length; i++){
			if(Game.creeps[sources[i].creep] == undefined){
				Memory.rooms[creep.room.name].sources[i].creep = creep.name;
				Memory.rooms[creep.room.name].creeps[index][2] = sources[i].id;
			}
		}
	}*/
	var flag = Game.flags['harvEnCur_W9N6_'+Number(creep_[4]+1)];
	if(!creep.pos.isNearTo(flag) && creep_[4] != null){
		creep.moveTo(flag, {reusePath: 75});
	}

	if(creep.hits < creep.hitsMax)
		try{Memory.rooms[creep.room.name].needHeal.push(creep_[0]);}catch(e){};
	console.log(creep.name, creep.moveTo(source, {reusePath: 75}));
	if(creep.pos.isNearTo(source))
        creep.harvest(source)
    else
    	creep.moveTo(source, {reusePath: 75});
}


module.exports = {
	harvester: harvester
}
