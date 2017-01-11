
//PRIORITY CLASSES INTO MEMORY
Memory.priorityClass = ['HARVESTER', 'COURIER', 'UPGRADER', 'BUILDER'];

//COUNT CREEP CLASSES INTO MEMORY
Memory.rooms = {};
for(var i = 0; i < Object.keys(Game.rooms).length; i++){
	Memory.rooms[Object.keys(Game.rooms)[i]] = {};
	Memory.rooms[Object.keys(Game.rooms)[i]].countCreeps = {'COURIER': 0,'HARVESTER': 0,'UPGRADER': 0,'BUILDER': 0, 'ALL': 0};
}


//NEED CREEP CLASSES AND INFO ABOUT SOURCE INTO MEMORY
var myRooms = Object.keys(Game.rooms);
for(var i = 0; i < myRooms.length; i++){
	var room = myRooms[i];
	Memory.rooms[room].sources = [];
	var sources = Game.rooms[Object.keys(Game.rooms)[i]].find(FIND_SOURCES);
	Memory.rooms[room].needCreeps = nc = {
		'HARVESTER': sources.length,
		'COURIER': sources.length,
		'BUILDER': 2,
		'UPGRADER': 2
	};
	nc.ALL = nc.HARVESTER + nc.COURIER + nc.UPGRADER + nc.BUILDER;

	for(var o = 0; o < sources.length; o++)
		Memory.rooms[room].sources.push({'id': sources[o].id, 'creep': 0});
	Memory.rooms[room].sources.push({'id':'213d07721c097c0', 'creep': 0});
	Memory.rooms[room].sources.push({'id':'cd680772223fb65', 'creep': 0});
}

//------------------------------------
/********************
 *	TYPE OF FLAGS	*
 ********************
 ---------------
 * upEnFl_W9N6 - this flag store energy for upgrader
 *** place: near controller/upgrader
 *** upEnFl_+roomName
 *** amout: 1
 ---------------
 * harvEnCur_W9N6_N - this flag store energy for delivery
 *** place: near sources/harvester
 *** harvEnCur_+roomName
 *** amount: sources.length
 *** N - number
 ---------------

//------------------------------------
*/
//FLAGS INTO MEMORY
var myRooms = Object.keys(Game.rooms);
var flags = Object.keys(Game.flags);
for(var i = 0; i < myRooms.length; i++){
	if(Memory.rooms[myRooms[i]] == undefined)
		continue;
	Memory.rooms[myRooms[i]].flags = [];
}
for(var j = 0; j < flags.length; j++){
	var flag = flags[j];
	var name = flag.split('_');
	Memory.rooms[name[1]].flags.push(flag);
}

//COST BODYPARTS INTO MEMORY
/*
Memory.calcBody.costBodyparts = {
	'MOVE': 50,
	'WORK': 100,
	'CARRY': 50,
	'ATTACK': 80,
	'RANGED_ATTACK': 150,
	'HEAL': 250,
	'CLAIM': 600,
	'TOUGH': 10
};
*/
Memory.calcBody = {};
Memory.calcBody.body = {};
Memory.calcBody.body.HARVESTER = [WORK,WORK,MOVE, 250];
Memory.calcBody.body.COURIER = [CARRY, MOVE, 100];
Memory.calcBody.body.UPGRADER = [WORK,WORK,CARRY,MOVE, 300];
Memory.calcBody.body.BUILDER = [WORK,CARRY,MOVE,MOVE, 250];
Memory.calcBody.body.HARVESTER_ = [WORK,MOVE, 150];

//SPAWNS INFO
//var myRooms = Object.keys(Game.rooms);
for(var i = 0; i < myRooms.length; i++){
	var room = myRooms[i];
	var spawns = Game.rooms[room].find(FIND_MY_SPAWNS);
	Memory.rooms[Object.keys(Game.rooms)[i]].spawns = {};
	for(var j = 0; j < spawns.length; j++){
		Memory.rooms[Object.keys(Game.rooms)[i]].spawns['Spawn'+Number(i+1)] = {
			'id': Game.rooms[room].find(FIND_MY_SPAWNS)[j].id
		};
	}
}

//FOR CREEPS
//var myRooms = Object.keys(Game.rooms);
Memory.otherCreeps = [];
Memory.otherCreeps[0] = 0;
//var myRooms = Object.keys(Game.rooms);
for(var i = 0; i < myRooms.length; i++){
	var room = myRooms[i];
	Memory.rooms[room].creeps = [];
}

//CONSTRUCTIONS AND STRUCTURES INTO MEMORY
var myRooms = Object.keys(Game.rooms);
for(var i = 0; i < myRooms.length; i++){
	var room = myRooms[i];
	if(Memory.rooms[room] == undefined)
		continue;
	Memory.rooms[room].constructions = [];
	Memory.rooms[room].structures = [];
}
for(var i = 0; i < myRooms.length; i++){
	var room = myRooms[i];
	if(Memory.rooms[room] == undefined)
		continue;
	var cons = Game.rooms[room].find(FIND_MY_CONSTRUCTION_SITES);
	for(var j = 0; j < cons.length; j++){
		Memory.rooms[room].constructions.push(cons[j].id);
	}
	var struct = Game.rooms[room].find(FIND_STRUCTURES);
	for(var j = 0; j < struct.length; j++){
		if(struct[j].structureType != 'controller' && struct[j].structureType != 'spawn')
			Memory.rooms[room].structures.push([struct[j].id, 0]);
	}
}
//HOSTILE CREEPS INTO MEMORY
var myRooms = Object.keys(Game.rooms);
for(var i = 0; i < myRooms.length; i++){
	var room = myRooms[i];
	Memory.rooms[room].hostileCreeps = [];
}
//TOWERS INTO MEMORY
var myRooms = Object.keys(Game.rooms);
for(var i = 0; i < myRooms.length; i++){
	var room = myRooms[i];
	Memory.rooms[room].towers = [];
	var structs = Memory.rooms[room].structures;
	for(var j = 0; j < structs.length; j++){
		var obj = Game.getObjectById(structs[j]);
		if(obj.structureType == 'tower'){
			Memory.rooms[room].towers.push(structs[j]);
		}
	}
}
//NEED HEAL CREEPS
var myRooms = Object.keys(Game.rooms);
for(var i = 0; i < myRooms.length; i++){
	var room = myRooms[i];
	Memory.rooms[room].needHeal = [];
}

//OLD CREEPS INTO MEMORY
/*
var myRooms = Object.keys(Game.rooms);
for(var i = 0; i < myRooms.length; i++){
	var room = myRooms[i];
	var creeps = Memory.rooms[room].creeps;
	for(var j = 0; j < creeps.length; j++){

	}
}
*/
//TICKERS
var myRooms = Object.keys(Game.rooms);
for(var i = 0; i < myRooms.length; i++){
	var room = myRooms[i];
	Memory.rooms[room].tickers = {};
	Memory.rooms[room].tickers.empExt = 0;}//TICKER EMPLOYMENT OF EXTENSIONS

//CLEAR CREEPS
var myRooms = Object.keys(Game.rooms);
for(var i = 0; i < myRooms.length; i++){
	var room = myRooms[i];
	Memory.rooms[room].creeps = [];
	var creeps = Game.rooms[room].find(FIND_CREEPS);
	for(var j = 0; j < creeps.length; j++){
		Memory.rooms[room].creeps.push(creeps[j].id);
	}

}


//KILL ALL CREEPS
var creeps = Game.creeps;
for(var i = 0; i < Object.keys(creeps).length; i++){
	creeps[Object.keys(creeps)[i]].suicide();
}