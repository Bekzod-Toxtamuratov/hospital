import { Injectable, InternalServerErrorException } from "@nestjs/common";

import * as uuid from "uuid";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class FileService {
  async saveFile(file: any): Promise<string> {
    try {
      const fileName = uuid.v4() + ".jpg";
      const filePath = path.resolve(__dirname, "..", "static");
      console.log("path.join ()", path.join(filePath, fileName));

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      // console.log("file ",file)
      // console.log("file.buffer ", file.buffer);
      console.log(path.join(process.cwd(), "dist", "static", fileName));

      // console.log(file?.buffer , "bbbbbb");

      fs.writeFileSync(
        path.join(process.cwd(), "dist", "static", fileName),
        file.buffer
      );

      return fileName;
    } catch (error) {
      console.log("error saving file ", error);
      throw new InternalServerErrorException("filega yozishda xatolik bor");
    }
  }
}
