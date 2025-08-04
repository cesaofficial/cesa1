
export interface Member {
  name: string;
  post: string;
  imageUrl: string;
  linkedin: string;
  github: string;
  instagram: string;
}

export interface Team {
  name: string;
  members: Member[];
}
