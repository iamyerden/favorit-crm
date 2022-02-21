export class Tournament {
  id: bigint;
  name: string;
  tournamentDateStart: Date;
  tournamentDateEnd: Date;
  type: string;
  country: string;
  region: string;
  city: string;
  address: string;
  contactOne: string;
  contactTwo: string;
  rank: string;
  reglament: any;
  sportType: any;
  createdAt: Date;
  author: any;
  status: any;

  constructor(tournament) {
    this.id = tournament.id;
    this.name = tournament.name;
    this.tournamentDateStart = tournament.tournamentDateStart;
    this.tournamentDateEnd = tournament.tournamentDateEnd;
    this.type = tournament.type;
    this.country = tournament.country;
    this.region = tournament.region;
    this.city = tournament.city;
    this.address = tournament.address;
    this.contactOne = tournament.contactOne;
    this.contactTwo = tournament.contactTwo;
    this.rank = tournament.rank;
    this.reglament = tournament.reglament;
    this.sportType = tournament.sportType;
    this.createdAt = tournament.createdAt;
    this.author = tournament.author;
    this.status = tournament.status;
  }
}
