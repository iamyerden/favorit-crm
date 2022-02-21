export class Group {
  id: bigint;
  ageGroup: string;
  weight: string;
  belt: string;

  constructor(tournament) {
    this.id = tournament.id;
    this.ageGroup = tournament.ageGroup;
    this.weight = tournament.weight;
    this.belt = tournament.belt;
  }
}
