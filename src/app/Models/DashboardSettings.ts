import { VideoPlayerModule } from "../video-player/video-player.module";
import { Language } from "./language";
import { FileModel } from "./FileModel";
import {  VideoModel } from "./VideoModel";

export class DashboardSettings {
  video: VideoModel = new VideoModel();
  mainLanguage: Language = new Language();
  secondaryLanguage: Language = new Language();
}
