import Fetch, { FetchConfig } from '@/fetch';
import { Diagram, Program, Project, User, Version } from '@/resources';

export type ClientOptions = {
  clientKey: string;
  apiEndpoint: string;
  options?: FetchConfig;
  authorization?: string;
};

export class PublicClient {
  public project: Project;

  public version: Version;

  public program: Program;

  public diagram: Diagram;

  constructor({ clientKey, apiEndpoint, authorization, options }: ClientOptions) {
    const fetch = new Fetch({ clientKey, apiEndpoint, authorization, options });

    this.project = new Project(fetch);
    this.version = new Version(fetch);
    this.program = new Program(fetch);
    this.diagram = new Diagram(fetch);
  }
}

export class Client extends PublicClient {
  public user: User;

  constructor({ clientKey, apiEndpoint, authorization, options }: Omit<ClientOptions, 'authorization'> & { authorization: string }) {
    super({ clientKey, apiEndpoint, authorization, options });

    this.user = new User(authorization);
  }
}
