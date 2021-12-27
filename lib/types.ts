export type Config = {
  installPkg: boolean;
  beforeEach: () => void;
  alias: [];
  prefix: string;
  separator: string;
};
