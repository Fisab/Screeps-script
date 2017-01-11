var tower = require('tower');

var allies = ['Fisab'];

function def(room){
	findHostileCreeps(room);
	tower.tower(room);
}

function findHostileCreeps(room){
	var flags_ = Memory.rooms[room].flags;
	var enterFlags = [];
	for(var i = 0; i < flags_.length; i++){
		if(flags_[i].substr(0,5) == 'enter'){
			var enterCreeps = Game.flags[flags_[i]].pos.lookFor(LOOK_CREEPS);
			if(enterCreeps.length > 0){
				var cnt = 0;
				for(var j = 0; j < allies.length; j++){
					if(enterCreeps[0].owner.username != allies[j])
						cnt++;
				}
				if(cnt == allies.length)
					Memory.rooms[room].hostileCreeps.push(enterCreeps[0].id);
			}
		}
	}
}

module.exports = {
	def: def
}