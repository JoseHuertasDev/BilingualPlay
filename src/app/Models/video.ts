import { Subtitle } from "./subtitles";

export class Video {
  title: string | undefined;
  route: string | undefined;
  mainSubs: Subtitle | undefined;
  scondarySubs: Subtitle | undefined;
}
