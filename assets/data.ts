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

export class DataUtils {
  static getDamageType(action: ActionEvent): string {
    return action?.damageEvent?.damageType || action.action.damageType;
  }

  static reverseMap<T>(a: { [p: string]: T }, c: (b: T) => string): { [p: string]: { originalItem: T, originalKey: string }[] } {
    return Object.entries<T>(a).reduce((d, [k, i]) => ({
      ...d,
      [c(i)]: d[c(i)]?.length ? [...d[c(i)], {originalItem: i, originalKey: k}] : [{originalItem: i, originalKey: k}]
    }), {})
      ;
  }

  static reverseMapArray<T>(a: T[], c: (b: T) => string): { [p: string]: T[] } {
    return a.reduce((d, i) => ({
      ...d,
      [c(i)]: d[c(i)]?.length ? [...d[c(i)], i] : [i]
    }), {});
  }
}

type DamageType = 'BLUDGEONING' | 'COLD' | 'FIRE' | 'FORCE' | 'NECROTIC' | 'POISON' | 'PSYCHIC' | 'RADIANT' | 'SLASHING';
