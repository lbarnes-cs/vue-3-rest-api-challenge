type Image = {
  placeholder: string | null;
  source: string | null;
};

type Badges = {
  id: number;
  name: string;
  image: Image;
};

type Author = {
  affiliation: string;
  badges: Badges[];
  image: Image;
  link: string | null;
  name: string;
  username: string;
};

type Creator = Author;

type Material = {
  type: string;
  mutability: string;
  data: {
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};

export type ProtocolStats = {
  is_voted: boolean;
  number_of_accessible_forks: number;
  number_of_bookmarked_comments: number;
  number_of_bookmarks: number;
  number_of_collections: number;
  number_of_comments: number;
  number_of_equipments: number;
  number_of_exports: number;
  number_of_forks: {
    private: number;
    public: number;
  };
  number_of_protocol_comments: number;
  number_of_reagents: number;
  number_of_runs: number;
  number_of_steps: number;
  number_of_steps_comments: number;
  number_of_views: number;
  number_of_votes: number;
};

type Unit = {
  can_manage: number;
  id: number;
  name: string;
  read_only: number;
  type_id: number;
};

type Version = {
  id: number; // Unique protocol version identifier
  guid: string; // Unique protocol GUID (without dashes)
  title: string; // Protocol title
  title_html: string | null; // Protocol title with HTML tags (nullable)
  image: string | null; // URL or path to protocol image (nullable)
  version_id: number; // Version number of the protocol
  doi: string | null; // DOI of the protocol (nullable)
  uri: string; // Unique text identifier for the protocol
  published_on: number | null; // Unix timestamp for when the protocol was published (nullable)
};

// https://apidocs.protocols.io/#protocol-object
export type Protocol = {
  acknowledgements: string | null;
  authors: Author[];
  before_start: string | null; // Raw JSON
  created_on: number;
  creator: Creator;
  description: string | null; // Raw JSON
  doi: string;
  guid: string;
  guidelines: string | null;
  id: number;
  image: Image;
  link: string | null;
  materials: Material[];
  materials_text: string | null; // Raw JSON
  peer_reviewed: boolean;
  public: boolean | 1 | 0; // Handling integer 1|0 values from the API
  published_on: number | null; // Can be null as per the documentation
  stats: ProtocolStats;
  title: string;
  title_html: string;
  units: Unit[];
  uri: string;
  url: string;
  version_id: number;
  versions: Version[];
};
