import { FileModel } from "./FileModel";

export class VideoModel extends FileModel{
  mainSubs: FileModel = new FileModel();
  secondarySubs: FileModel  = new FileModel();
}
