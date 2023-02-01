import { Document } from 'mongoose';
import { ICategory } from 'src/category/interface/category.interface';

export interface ICertificate extends Document {
  readonly name: string;
  readonly description: string;
  readonly category: ICategory;
  readonly url: string;
  readonly dateIni: Date;
  readonly dateEnd: Date;
}
