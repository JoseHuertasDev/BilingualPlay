import { VideoPlayerModule } from "../video-player/video-player.module";
import { Language } from "./language";
import { FileModel } from "./FileModel";

export class DashboardSettings {
  video: FileModel = new FileModel();
  mainSubs: FileModel = new FileModel();
  scondarySubs: FileModel  = new FileModel();
  mainLanguage: Language = new Language();
  secondaryLanguage: Language = new Language();
}
