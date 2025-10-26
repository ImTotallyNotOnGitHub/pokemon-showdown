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
	blissassistance: {
		num: -5001,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Bliss Assistance",
		pp: 1,
		noPPBoosts: true,
		priority: 5,
		flags: {
			bypasssub: 1,
			distance: 1,
			failcopycat: 1,
			failmefirst: 1,
			failmimic: 1,
			failinstruct: 1,
			noassist: 1,
			nosketch: 1,
			nosleeptalk: 1,
			protect: 1,
			unite: 1
		},
		volatileStatus: "helpinghand",
		self:{
			volatileStatus: "followme"
		},
		secondary: null,
		target: "adjacentAlly",
		type: "Normal"
	},
	coupdegrace: {
		num: -5002,
		desc: "Aegislash unleashes a ground-splitting slash, dealing doubled damage if the target is not at full HP.",
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
		num: -5003,
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
	hydrotyphoon: {
		num: -5004,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Hydro Typhoon",
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
			unite: 1
		},
		self: {
			volatileStatus: 'hydrotyphoon',
		},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Hydro Typhoon', '[silent]');
			},
			onAccuracy() {
				return true;
			},
			onSourceModifyDamage() {
				return this.chainModify(0.5);
			},
			onBeforeMovePriority: 100,
			onBeforeMove(pokemon) {
				this.debug('removing Hydro Typhoon drawback before attack');
				pokemon.removeVolatile('hydrotyphoon');
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Water",
	},
	midnightslash: {
		num: -5005,
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
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Dark"
	},
	psykaboom: {
		num: -5006,
		accuracy: 100,
		basePower: 250,
		category: "Special",
		name: "Psykaboom",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {
			charge: 1,
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
	revenantrend: {
		num: -5007,
		accuracy: 100,
		basePower: 160,
		category: "Physical",
		name: "Revenant Rend",
		pp: 1,
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
		breaksProtect: true,
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
		condition: {
			duration: 2,
			onInvulnerability: false,
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ghost",
	},
	spinningflamecombo: {
		num: -5008,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Spinning Flame Combo",
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
			punch: 1,
			protect: 1,
			unite: 1
		},
		multihit: 2,
		self: {
			boosts: {
				atk: 1,
				spe: 1
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	ultraswoleslam: {
		num: -5009,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Ultra Swole Slam",
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
			punch: 1,
			protect: 1,
			unite: 1
		},
		multihit: 2,
		onBasePower(basePower, pokemon, target) {
			if (target.hp * 2 <= target.maxhp) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
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