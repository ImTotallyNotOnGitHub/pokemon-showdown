export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	bellybash: {
		num: -5000,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Belly Bash",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {
			charge: 1,
			contact: 1,
			failcopycat: 1,
			failmefirst: 1,
			failmimic: 1,
			failinstruct: 1,
			mirror: 1,
			noassist: 1,
			nosketch: 1,
			nosleeptalk: 1,
			protect: 1,
			unite: 1
		},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (attacker.hp <= attacker.maxhp / 4 || attacker.boosts.atk >= 4) {
				return false;
			}
			this.directDamage(attacker.maxhp / 4);
			this.boost({ atk: 3 }, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Water"
	},
	coupdegrace: {
		num: -5001,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Coup de Grace",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {
			contact: 1,
			failcopycat: 1,
			failmefirst: 1,
			failmimic: 1,
			failinstruct: 1,
			mirror: 1,
			noassist: 1,
			nosketch: 1,
			nosleeptalk: 1,
			protect: 1,
			slicing: 1,
			unite: 1
		},
		onBasePower(basePower, pokemon, target) {
			if (target.hp < target.maxhp) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Ghost"
	},
	fluffycreamsupreme: {
		num: -5002,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fluffy Cream Supreme",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {
			bypasssub: 1,
			distance: 1,
			failcopycat: 1,
			failmefirst: 1,
			failmimic: 1,
			failinstruct: 1,
			heal: 1,
			noassist: 1,
			nosketch: 1,
			nosleeptalk: 1,
			protect: 1,
			snatch: 1,
			unite: 1
		},
		heal: [1, 4],
		onHit(target, source) {
			this.add('-activate', source, 'move: Fluffy Cream Supreme');
			let success = false;
			const allies = [...target.side.pokemon, ...target.side.allySide?.pokemon || []];
			for (const ally of allies) {
				if (ally !== source && !this.suppressingAbility(ally)) {
					if (ally.hasAbility('goodasgold')) {
						this.add('-immune', ally, '[from] ability: Good as Gold');
						continue;
					}
				}
				if (ally.cureStatus()) success = true;
			}
			return success;
		},
		secondary: null,
		target: "allies",
		type: "Fairy"
	},
	midnightslash: {
		num: -5003,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		name: "Midnight Slash",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {
			contact: 1,
			failcopycat: 1,
			failmefirst: 1,
			failmimic: 1,
			failinstruct: 1,
			mirror: 1,
			noassist: 1,
			nosketch: 1,
			nosleeptalk: 1,
			protect: 1,
			slicing: 1,
			unite: 1
		},
		multihit: 6,
		smartTarget: true,
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Dark"
	},
	psykaboom: {
		num: -5004,
		accuracy: 100,
		basePower: 250,
		category: "Special",
		name: "Psykaboom",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {
			failcopycat: 1,
			failmefirst: 1,
			failmimic: 1,
			failinstruct: 1,
			mirror: 1,
			noassist: 1,
			nosketch: 1,
			nosleeptalk: 1,
			protect: 1,
			slicing: 1,
			unite: 1
		},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Psychic"
	},
	bonechill: {
		num: -8001,
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "Bone Chill",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, metronome: 1 },
		status: 'fsb',
		secondary: null,
		target: "normal",
		type: "Ghost"
	},
};