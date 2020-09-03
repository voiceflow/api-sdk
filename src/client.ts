import Fetch from '@/fetch';
import { Diagram, Program, Project, User, Version } from '@/resources';

export type ClientOptions = {
  clientKey: string;
  apiEndpoint: string;
  globalHeaders?: Record<string, string>;
  authorization?: string;
};

export class PublicClient {
  public project: Project;

  public version: Version;

  public program: Program;

  public diagram: Diagram;

  constructor({ clientKey, apiEndpoint, authorization, globalHeaders }: ClientOptions) {
    const fetch = new Fetch({ clientKey, apiEndpoint, authorization, globalHeaders });

    this.project = new Project(fetch);
    this.version = new Version(fetch);
    this.program = new Program(fetch);
    this.diagram = new Diagram(fetch);
  }
}

export class Client extends PublicClient {
  public user: User;

  constructor({ clientKey, apiEndpoint, authorization, globalHeaders }: Omit<ClientOptions, 'authorization'> & { authorization: string }) {
    super({ clientKey, apiEndpoint, authorization, globalHeaders });

    this.user = new User(authorization);
  }
}
