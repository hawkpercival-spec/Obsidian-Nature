export type RootStackParamList = {
  SignIn: undefined;
  BirthYear: undefined;
  Paywall: { context?: 'intake' } | undefined;
  Intake: undefined;
  Main: undefined;
  PillarDetail: { id: number };
  SelfPillar: undefined; // Pillar I — dedicated screen
  EggDiagramGame: undefined; // Pillar I mini-game
  ArchetypalPillar: undefined; // Pillar II — dedicated screen
  TemperamentPillar: undefined; // Pillar III — dedicated screen
  BloodlettingGame: undefined; // Pillar III mini-game
  DesirePillar: undefined; // Pillar IV — dedicated screen
  NamePillar: undefined; // Pillar V — dedicated screen
  ReportDetail: { reportId: string };
};

export type IntakeStackParamList = {
  IntakeFree: undefined;
  Enneagram: undefined;
  Cognition: undefined;
  Temperament: undefined;
  Jungian: undefined;
  IntakeReport: undefined;
};

export type MainTabParamList = {
  Codex: undefined;
  Nightly: undefined;
  Dreams: undefined;
  Archetypal: undefined;
  Rituals: undefined;
  Progress: undefined;
};
