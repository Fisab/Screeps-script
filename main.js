var spawn = require('spawn');
var garbageGrabber = require('garbageGrabber');
var findTarget = require('findTarget');
var updateRoom = require('updateRoom');
var defense = require('defense');

var myRooms = Object.keys(Game.rooms);
/*
for(var i = 0; i < myRooms.length; i++){
	var room = myRooms[i];
	if(Memory.rooms[room] == undefined)
		continue;
	var creeps_ = Memory.rooms[room].countCreeps;
	for(var j = 0; j < Object.keys(creeps_).length; j++)
		creeps_[Object.keys(creeps_)[j]] = 0;

	var creepS = Memory.rooms[room].creeps;
	for(var y = 0; y < creepS.length; y++){
		findTarget.findTarget(creepS[y], y);
		try{
			if(creepS[y][0].length == 15){
				creeps_[creepS[y][1]]++;
				creeps_.ALL++;
			}
		}catch(e){}
	}

	defense.def(room);
	garbageGrabber.clearCreeps(room);
	
	spawn.spawnCreep(room);
	if(Game.time % 5 == 0)
		updateRoom.updateRoom(room);
}
*/