export interface EventRegistration {
  teamName: String;
  members: Member[];
  slug: String;
}

export interface Member {
  email: String;
}
