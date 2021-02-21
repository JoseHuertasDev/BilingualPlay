import { Language } from "./language";
import { Subtitle } from "./subtitles";

export class Video {
  title: string | undefined;
  route: string | undefined;
  mainSubs: Subtitle = new Subtitle;
  scondarySubs: Subtitle  = new Subtitle;
  mainLanguage: Language = new Language();
  secondaryLanguage: Language = new Language();
}
