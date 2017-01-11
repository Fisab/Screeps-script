var harvester = require('harvester');
var upgrader = require('upgrader');
var courier = require('courier');
var builder = require('builder');

var methods = {'HARVESTER': harvester, 'UPGRADER': upgrader, 'COURIER': courier, 'BUILDER': builder};

function findTarget(creep, index){
	if(creep[2] == null)
		Memory.rooms[room].creeps[index][2] = 0;
    if(creep[0].length != 15)
        return;
	if(creep[2] != 0){
		methods[creep[1]][creep[1].toLowerCase()](creep, index);
		return;
	}
	else if(creep[1] == 'COURIER' || creep[1] == 'BUILDER'){
		var creep_ = Game.getObjectById(creep[0]);
		if(creep_ == null)
			return;
		if(creep_.carry.energy == 0)
			findEnergy(creep, index, creep_);
		else
		    methods[creep[1]][creep[1].toLowerCase()](creep, index, creep_);
	}
	else if(creep[2] == 0 && creep[1] == 'HARVESTER')
		methods[creep[1]][creep[1].toLowerCase()](creep, index);
}

function findEnergy(creep, index, creep_){
	if(Memory.rooms[creep_.room.name] == undefined)
		return;
	var flags = Memory.rooms[creep_.room.name].flags;
	var energy = {};
	for(var i = 0; i < flags.length; i++){
		if(flags[i].substr(0, flags[i].length-2) == 'harvEnCur_'+creep_.room.name){
			var energy_ = [];
			try{energy_ = Game.flags[flags[i]].pos.lookFor(LOOK_ENERGY);}catch(e){};
			if(energy_.length > 0)
				energy[energy_[0].id] = energy_[0].energy;
		}
	}
	var objEnergy = Object.keys(energy);
	var amEnergy = [];
	for(var i = 0; i < objEnergy.length; i++){
		amEnergy.push(Game.getObjectById(objEnergy[i]).energy);
	}
	amEnergy.sort(sort_);
	for(var i = 0; i < objEnergy.length; i++){
		if(amEnergy[0] == Game.getObjectById(objEnergy[i]).energy){
			Memory.rooms[creep_.room.name].creeps[index][2] = objEnergy[i];
		}
	}
}

function sort_(a,b){return b-a;}

module.exports = {
	findTarget: findTarget
}