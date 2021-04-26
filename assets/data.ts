export interface ActionEvent {
  id: number;
  damageEvent?: Damage;
  healingEvent?: Healing;
  assistEvent?: Assist;
  preventionEvent?: Prevention;
  action: Action;
  source: Entity;
  encounter: Encounter;
}

export interface Menu {
  players: Players[];
  actions: Action[];
  sessions: Session[];
  encounters: Encounter[];
}


export interface Action {
  id: number;
  actionTitle: string;
  damageType: DamageType;
}

export interface Encounter {
  id: number;
  session: Session;
  description: string;
}

export interface Session {
  id: number;
  sessionTitle: string;
}

export interface Players {
  id: number;
  playerName: string;
  className: string;
  race: string;
  description: string;
  entity: Entity;
}

export interface Entity {
  id: number;
  name: string;
}

export interface Damage {
  id: number;
  targetId: Entity;
  damageVal: number;
  damageType: DamageType;
}

export interface Entity {
  id: number;
  name: string;
}

export interface Healing {
  id: number;
  targetId: Entity;
  healingVal: number;
}

export interface Assist {
  id: number;
  actionEvent: Action;
  assistVal: number;
}

export interface Prevention {
  id: number;
  targetId: Entity;
  preventionValue: number;
}

type DamageType = 'BLUDGEONING' | 'COLD' | 'FIRE' | 'FORCE' | 'NECROTIC' | 'POISON' | 'PSYCHIC' | 'RADIANT' | 'SLASHING';
