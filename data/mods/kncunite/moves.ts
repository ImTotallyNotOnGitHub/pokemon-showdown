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
	blazingbicyclekick: {
		num: -5012,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Blazing Bicycle Kick",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {
			distance: 1,
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
		onBasePower(basePower, pokemon, target) {
			if (target.hp < target.maxhp) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "any",
		type: "Fire"
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
	cottoncloudcrash: {
		num: -5022,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Cotton Cloud Crash",
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
		// Damages opposing Pokémon normally
		onTryMove(source, target, move) {
			// Check for Heal Block before attempting to heal later
			if (source.volatiles['healblock']) {
				this.attrLastMove('[still]');
				this.add('cant', source, 'move: Heal Block', move);
				return false;
			}
		},
		// After the damaging part, heal allies based on user's SpA
		onHitField(source, move) {
			for (const ally of source.side.allies()) {
				if (ally && ally !== source && !ally.fainted) {
					const healAmount = Math.floor(source.getStat('spa') * 0.25);
					this.heal(healAmount, ally, source);
				}
			}
		},
		secondary: null,
		target: "allAdjacent", // hits all adjacent opponents only
		type: "Grass",
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
	dracoimpact: {
		num: -5021,
		accuracy: 100,
		basePower: 150,
		category: "Physical",
		name: "Draco Impact",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {
			contact: 1,
			distance: 1,
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
		condition: {
			duration: 2,
			onInvulnerability: false,
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dragon",
	},
	dreepanddestroy: {
		num: -5020,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Dreep and Destroy",
		pp: 2,
		noPPBoosts: true,
		priority: 0,
		flags: {
			distance: 1,
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
		onBasePower(basePower, pokemon, target) {
			if (target.hp < target.maxhp) {
				return this.chainModify(1.5);
			}
		},
		multihit: 2,
		smartTarget: true,
		secondary: null,
		target: "any",
		type: "Dragon"
	},
	dustdevilformation: {
		num: -5024,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Dust Devil Formation",
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
			unite: 1
		},
		self: {
			volatileStatus: ('lockedmove'),
			boosts: {
				def: 1,
				spd: 1
			}
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	fancifulfireworks: {
		num: -5018,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Fanciful Fireworks",
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
		secondaries: [
			{
				chance: 100,
				boosts: {
					spe: -1,
				},
			}, {
				chance: 100,
				volatileStatus: 'healblock',
			},
		],
		target: "allAdjacentFoes",
		type: "Fire"
	},
	floweryfieldsforever: {
		num: -5017,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Flowery Fields Forever",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: { failcopycat: 1,
			failmefirst: 1,
			failmimic: 1,
			failinstruct: 1,
			noassist: 1,
			nosketch: 1,
			nosleeptalk: 1,
			snatch: 1,
			metronome: 1,
			unite: 1
		},
		volatileStatus: 'floweringfield',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'floweringfield');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 10);
			},
		},
		secondary: null,
		target: "allies",
		type: "Fairy",
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
	gatlinggulpmissile: {
		num: -5014,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Gatling Gulp Missile",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {
			distance: 1,
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
		multihit: 2,
		smartTarget: true,
		self: {
			volatileStatus: 'lockedmove',
		},
		onBasePower(basePower, pokemon, target) {
			if (pokemon.hp < pokemon.maxhp / 2) {
				return this.chainModify(1.5);
			}
		},
		secondary: null,
		target: "any",
		type: "Water"
	},
	healpulse: {
		num: 505,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Heal Pulse",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, distance: 1, heal: 1, allyanim: 1, metronome: 1, pulse: 1 },
        onHit(target, source) {
            const userSpA = source.getStat('spa');
            // Heal amount is 33% of the user's SpA
            const healAmount = Math.floor(userSpA / 3);
            const healed = this.heal(healAmount, target, source);
            if (!healed) {
                this.add('-message', `${target.name} could not be healed!`);
                return false;
            }
            this.add('-message', `${target.name} regained health from ${source.name}'s Heal Pulse!`);
        },
		secondary: null,
		target: "any",
		type: "Psychic",
	},
	hydrotyphoon: {
		num: -5004,
		accuracy: 100,
		basePower: 60,
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
			onSourceModifyDamage() {
				return this.chainModify(0.5);
			},
			onBeforeMovePriority: 100,
			onBeforeMove(pokemon) {
				this.debug('removing Hydro Typhoon advantage before next attack');
				pokemon.removeVolatile('hydrotyphoon');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Hydro Typhoon');
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Water",
	},
	ignitemidnight: {
		num: -5010,
		accuracy: 100,
		basePower: 180,
		category: "Special",
		name: "Ignite Midnight",
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
		target: "normal",
		type: "Ghost"
	},
	lividoutrage: {
		num: -5025,
		accuracy: 100,
		basePower: 55,
		category: "Physical",
		name: "Livid Outrage",
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
			volatileStatus: 'confusion',
		},
		multihit: [2, 5],
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dragon"
	},
	midnightslash: {
		num: -5005,
		accuracy: 100,
		basePower: 20,
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
		multihit: 8,
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Dark"
	},
	nocknock: {
		num: -5013,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Nock Nock",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {
			distance: 1,
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
		multihit: [2, 5],
		secondary: null,
		target: "allAdjacentFoes",
		type: "Grass"
	},
	psychicsolare: {
		num: -5023,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Psychic Solare",
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
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "allAdjacentFoes",
		type: "Psychic"
	},
	psykaboom: {
		num: -5006,
		accuracy: 100,
		basePower: 180,
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
		target: "normal",
		type: "Psychic"
	},
	revenantrend: {
		num: -5007,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		name: "Revenant Rend",
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
	revolvingruin: {
		num: -5021,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Revolving Ruin",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {
			distance: 1,
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
		volatileStatus: 'revolvingruin',
		condition: {
			duration: 3,
			noCopy: true,
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Revolving Ruin', '[silent]');
			},
			onModifyMovePriority: 100,
			onModifyMove(move) {
				if(move.category !== 'Status') {
					move.overrideOffensiveStat = 'atk';
				}
			},
			onSourceModifyDamage() {
				return this.chainModify(0.75);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Revolving Ruin');
			},
		},
		onHit(target, source, move) {
			this.boost({ atk: 1 }, source, source, move);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dragon",
	},
	rubblerouser: {
		num: -5015,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Rubble Rouser",
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
			unite: 1
		},
		self: {
			volatileStatus: 'rubblerouser',
		},
		condition: {
			duration: 3,
			noCopy: true,
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Rubble Rouser', '[silent]');
			},
			onDamagingHitOrder: 1,
			onDamagingHit(damage, target, source, move) {
				if (this.checkMoveMakesContact(move, source, target)) {
					this.damage(source.baseMaxhp / 5, source, target);
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Rubble Rouser');
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Rock",
	},
	seismicslam: {
		num: -5011,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Seismic Slam",
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
			unite: 1
		},
		self: {
			volatileStatus: 'seismicslam',
		},
		condition: {
			duration: 3,
			noCopy: true,
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Seismic Slam', '[silent]');
			},
			onModifyMovePriority: 100,
			onModifyMove(move) {
				if(move.category !== 'Status') {
					move.overrideOffensiveStat = 'atk';
					move.drain = [1, 2];
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Seismic Slam');
			},
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	sovereignslide: {
		num: -5023,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Sovereign Slide",
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
			unite: 1
		},
		self: {
			volatileStatus: 'sovereignslide',
		},
		condition: {
			duration: 3,
			noCopy: true,
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Sovereign Slide', '[silent]');
			},
			onDamagingHitOrder: 1,
			onDamagingHit(damage, target, source, move) {
				if (this.checkMoveMakesContact(move, source, target)) {
					source.addVolatile('whirlpool');
					this.add('-activate', source, 'move: Whirlpool', '[of] ' + target);
					this.boost({ spe: -1 }, source, target, move);
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Sovereign Slide');
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	spinningflamecombo: {
		num: -5008,
		accuracy: 95,
		basePower: 60,
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
	tripletrample: {
		num: -5019,
		accuracy: 100,
		basePower: 33,
		category: "Physical",
		name: "Triple Trample",
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
		onAfterMove(pokemon, target, move) {
			pokemon.addVolatile('tripletrample');
		},
		condition: {
			duration: 3,
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Triple Trample', '[silent]');
			},
			onModifyAtkPriority: 1,
			onModifyAtk(attacker, defender, move) {
				return this.chainModify(1.25);
			},
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onResidual(pokemon) {
				if (pokemon.activeTurns) {
					this.boost({ spe: 1 });
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Triple Trample');
			},
		},
		multihit: 3,
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Flying"
	},
	ultraswoleslam: {
		num: -5009,
		accuracy: 100,
		basePower: 75,
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
	wonderwish: {
		num: -50013,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Wonder Wish",
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
		heal: [1, 3],
        onHit(target, source, move) {
            // Define possible replacement moves
            const movePool = ['splash', 'explosion', 'hydropump', 'hyperbeam', 'block', 'closecombat', 'fly'];

            // Pick a random move from the list
            const newMove = this.sample(movePool);

            // Change this move into the selected one
            const moveSlot = source.moveSlots.find(ms => ms.id === move.id);
            if (moveSlot) {
                moveSlot.move = this.dex.moves.get(newMove).name;
                moveSlot.id = this.toID(newMove);
                moveSlot.pp = this.dex.moves.get(newMove).pp;
                moveSlot.maxpp = this.dex.moves.get(newMove).pp;
                this.add('-message', `${source.name}'s Wonder Wish transformed into ${this.dex.moves.get(newMove).name}!`);
            }
        },
		secondary: null,
		target: "allies",
		type: "Fairy"
	},
	worstnightmare: {
		num: -5016,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Worst Nightmare",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {
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
		volatileStatus: 'worstnightmare',
		onHit(target, source) {
			source.addVolatile('worstnightmare');
			target.addVolatile('worstnightmare');
			this.add('-activate', source, 'move: Worst Nightmare');
		},
        condition: {
            duration: 3,
            onStart(pokemon, source) {
                this.effectState.partner = source;
                this.add('-start', pokemon, 'Worst Nightmare');
            },

            // Trap both combatants
            onTrapPokemon(pokemon) {
                const partner = this.effectState.partner;
                if (partner && partner.isActive && !partner.fainted) {
                    pokemon.trapped = true;
                }
            },
            onDragOut(pokemon) {
                const partner = this.effectState.partner;
                if (partner && partner.isActive && !partner.fainted) {
                    this.add('-message', `${pokemon.name} cannot be dragged out of the nightmare!`);
                    return false;
                }
            },

            // ❌ Prevent selecting or hitting non-partner targets
            onTryMove(source, target, move) {
                const partner = this.effectState.partner;
                if (!partner?.isActive || partner.fainted) return;

                // Moves that target allies or the field are blocked unless it's the partner
                if (move.target === 'all' || move.target === 'allies' || move.target === 'adjacentAlly' || move.target === 'foeSide' || move.target === 'allySide') {
                    this.add('-message', `${source.name} can only focus on its fear!`);
                    return false;
                }

                // If the move is targeting someone other than the partner
                if (target && target !== partner) {
                    this.add('-message', `${source.name} is locked in a nightmare and can only target ${partner.name}!`);
                    return false;
                }
            },

            // Make them immune to other Pokémon’s attacks
            onTryHitPriority: 99,
            onTryHit(target, source, move) {
                const partner = this.effectState.partner;
                if (source === partner) return;
                this.add('-message', `${target.name} ignores ${source.name}'s attack while in the nightmare!`);
                return false;
            },

            // Break the Duel if one faints
            onFaint(pokemon) {
                const partner = this.effectState.partner;
                if (partner?.volatiles['worstnightmare']) {
                    partner.removeVolatile('worstnightmare');
                    this.add('-message', `${partner.name} is freed from the Nightmare!`);
                }
            },

            onEnd(pokemon) {
                this.add('-end', pokemon, 'Worst Nightmare');
            },
        },
		secondary: null,
		target: "adjacentFoe",
		type: "Dark",
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