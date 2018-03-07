export interface HackathonRegistration {
  teamName: String;
  members: Member[];
  slug: String;
  idea: String;
  resources: Resource[],
  isApproved: boolean;
}

export interface Member {
  email: String;
  gitId: String;
}

export  interface Resource{
  resource: String;
}
