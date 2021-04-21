export interface EventData {
  damage: number;
  dType: 'BLUDGEONING' | 'COLD' | 'FIRE' | 'FORCE' | 'NECROTIC' | 'POISON' | 'PSYCHIC' | 'RADIANT' | 'SLASHING';
  spell: string;
  player: string;
}

export class DataFile {
  public static set1: EventData[] = [
    // CALAIS -----------------------------------------------
    {
      damage: 8,
      dType: 'FIRE',
      spell: 'FIREBOLT',
      player: 'CALAIS'
    },
    {
      damage: 5,
      dType: 'PSYCHIC',
      spell: 'MIND SLIVER',
      player: 'CALAIS'
    },
    {
      damage: 7,
      dType: 'PSYCHIC',
      spell: 'TASHAS MIND WHIP',
      player: 'CALAIS'
    },
    {
      damage: 10,
      dType: 'FIRE',
      spell: 'FIREBOLT',
      player: 'CALAIS'
    },
    {
      damage: 10,
      dType: 'PSYCHIC',
      spell: 'SHADOW BLADE',
      player: 'CALAIS'
    },
    {
      damage: 7,
      dType: 'COLD',
      spell: 'RAY OF FROST',
      player: 'CALAIS'
    },
    {
      damage: 4,
      dType: 'PSYCHIC',
      spell: 'TASHAS MIND WHIP',
      player: 'CALAIS'
    },
    {
      damage: 4,
      dType: 'FIRE',
      spell: 'FIREBOLT',
      player: 'CALAIS'
    },
    {
      damage: 16,
      dType: 'POISON',
      spell: 'CHAOS BOLT',
      player: 'CALAIS'
    },
    // ILIRIE -----------------------------------------------
    {
      damage: 17,
      dType: 'RADIANT',
      spell: 'MOONBEAM',
      player: 'ILIRIE'
    },
    {
      damage: 12,
      dType: 'RADIANT',
      spell: 'MOONBEAM',
      player: 'ILIRIE'
    },
    {
      damage: 8,
      dType: 'RADIANT',
      spell: 'MOONBEAM',
      player: 'ILIRIE'
    },
    {
      damage: 2,
      dType: 'RADIANT',
      spell: 'MOONBEAM',
      player: 'ILIRIE'
    },
    {
      damage: 6,
      dType: 'SLASHING',
      spell: 'LONGSWORD',
      player: 'ILIRIE'
    },
    {
      damage: 6,
      dType: 'RADIANT',
      spell: 'MOONBEAM',
      player: 'ILIRIE'
    },
    {
      damage: 4,
      dType: 'SLASHING',
      spell: 'LONGSWORD',
      player: 'ILIRIE'
    },
    {
      damage: 7,
      dType: 'NECROTIC',
      spell: 'TOLL THE DEAD',
      player: 'ILIRIE'
    },
    {
      damage: 13,
      dType: 'RADIANT',
      spell: 'GUIDING BOLT',
      player: 'ILIRIE'
    },
    {
      damage: 11,
      dType: 'NECROTIC',
      spell: 'TOLL THE DEAD',
      player: 'ILIRIE'
    },
    // KEMVARI -----------------------------------------------
    {
      damage: 4,
      dType: 'FORCE',
      spell: 'ELDRITCH CANNON',
      player: 'KEMVARI'
    },
    {
      damage: 6,
      dType: 'FORCE',
      spell: 'ELDRITCH CANNON',
      player: 'KEMVARI'
    },
    {
      damage: 6,
      dType: 'FIRE',
      spell: 'CREATE BONFIRE',
      player: 'KEMVARI'
    },
    {
      damage: 3,
      dType: 'FIRE',
      spell: 'CREATE BONFIRE',
      player: 'KEMVARI'
    },
    {
      damage: 3,
      dType: 'FIRE',
      spell: 'CREATE BONFIRE',
      player: 'KEMVARI'
    },
    {
      damage: 6,
      dType: 'FIRE',
      spell: 'ELDRITCH CANNON',
      player: 'KEMVARI'
    },
    {
      damage: 6,
      dType: 'FIRE',
      spell: 'CREATE BONFIRE',
      player: 'KEMVARI'
    },
    {
      damage: 8,
      dType: 'BLUDGEONING',
      spell: 'MAGIC STONE',
      player: 'KEMVARI'
    },
    {
      damage: 14,
      dType: 'BLUDGEONING',
      spell: 'CATAPULT',
      player: 'KEMVARI'
    },
    {
      damage: 7,
      dType: 'BLUDGEONING',
      spell: 'MAGIC STONE',
      player: 'KEMVARI'
    },
    {
      damage: 4,
      dType: 'BLUDGEONING',
      spell: 'MAGIC STONE',
      player: 'KEMVARI'
    },
    {
      damage: 5,
      dType: 'BLUDGEONING',
      spell: 'MAGIC STONE',
      player: 'KEMVARI'
    },
    {
      damage: 4,
      dType: 'BLUDGEONING',
      spell: 'MAGIC STONE',
      player: 'KEMVARI'
    },
    // OJJUN -----------------------------------------------
    {
      damage: 2,
      dType: 'SLASHING',
      spell: 'SCIMITAR',
      player: 'OJJUN'
    },
    {
      damage: 6,
      dType: 'SLASHING',
      spell: 'SCIMITAR',
      player: 'OJJUN'
    },
    {
      damage: 7,
      dType: 'SLASHING',
      spell: 'SCIMITAR',
      player: 'OJJUN'
    },
    {
      damage: 7,
      dType: 'SLASHING',
      spell: 'SCIMITAR',
      player: 'OJJUN'
    },
    {
      damage: 7,
      dType: 'SLASHING',
      spell: 'SCIMITAR',
      player: 'OJJUN'
    },
    {
      damage: 2,
      dType: 'BLUDGEONING',
      spell: 'LIGHT HAMMER',
      player: 'OJJUN'
    },
    {
      damage: 2,
      dType: 'BLUDGEONING',
      spell: 'LIGHT HAMMER',
      player: 'OJJUN'
    },
    {
      damage: 6,
      dType: 'RADIANT',
      spell: 'DIVINE SMITE',
      player: 'OJJUN'
    },
    // VIKTOR -----------------------------------------------
    {
      damage: 2,
      dType: 'FORCE',
      spell: 'MAGIC MISSILE',
      player: 'VIKTOR'
    },
    {
      damage: 5,
      dType: 'FORCE',
      spell: 'MAGIC MISSILE',
      player: 'VIKTOR'
    },
    {
      damage: 5,
      dType: 'FORCE',
      spell: 'MAGIC MISSILE',
      player: 'VIKTOR'
    },
    {
      damage: 3,
      dType: 'FORCE',
      spell: 'MAGIC MISSILE',
      player: 'VIKTOR'
    },
    {
      damage: 5,
      dType: 'FORCE',
      spell: 'MAGIC MISSILE',
      player: 'VIKTOR'
    },
    {
      damage: 5,
      dType: 'FORCE',
      spell: 'MAGIC MISSILE',
      player: 'VIKTOR'
    },
    {
      damage: 3,
      dType: 'NECROTIC',
      spell: 'CHILL TOUCH',
      player: 'VIKTOR'
    },
    {
      damage: 7,
      dType: 'NECROTIC',
      spell: 'CHILL TOUCH',
      player: 'VIKTOR'
    },
    {
      damage: 5,
      dType: 'FIRE',
      spell: 'DRAGONS BREATH',
      player: 'VIKTOR'
    },
    {
      damage: 4,
      dType: 'NECROTIC',
      spell: 'CHILL TOUCH',
      player: 'VIKTOR'
    },
    {
      damage: 1,
      dType: 'NECROTIC',
      spell: 'CHILL TOUCH',
      player: 'VIKTOR'
    },
    {
      damage: 7,
      dType: 'NECROTIC',
      spell: 'CHILL TOUCH',
      player: 'VIKTOR'
    }
  ];
}
