import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Request } from 'express';
import {
  Category,
  CategoryDocument,
} from 'src/category/entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategory } from './interface/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<ICategory> {
    createCategoryDto.name = createCategoryDto.name.toLocaleLowerCase().trim();
    const category = await new this.categoryModel(createCategoryDto);

    return category.save();
  }

  async findAll(request: Request): Promise<ICategory[]> {
    try {
      return await this.categoryModel
        .find(request.query)
        .setOptions({ sanitizeFilter: true })
        .exec();
    } catch (error) {
      console.log('Ocurrió un error', error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(term: string) {
    try {
      let category: Category;

      if (isValidObjectId(term)) {
        category = await this.categoryModel.findById({ _id: term });
      }

      if (!category)
        category = await this.categoryModel.findOne({
          name: term.toLocaleLowerCase(),
        });
      return category;
    } catch (error) {
      console.log('Ocurrió un error', error);
      throw new InternalServerErrorException(error);
    }
  }
  async update(
    term: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ICategory> {
    try {
      let existingCategory: ICategory;

      if (isValidObjectId(term))
        existingCategory = await this.categoryModel.findByIdAndUpdate(
          term,
          updateCategoryDto,
          { new: true },
        );
      else
        existingCategory = await this.categoryModel
          .findOneAndUpdate({ name: term }, updateCategoryDto, { new: true })
          .lean();
      if (!existingCategory) {
        throw new NotFoundException(`Category #${term} not found`);
      }
      return existingCategory;
    } catch (error) {
      console.log('Ocurrió un error: ', error);
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string): Promise<ICategory> {
    try {
      const deletedCategory = await this.categoryModel.findByIdAndRemove(id);
      if (!deletedCategory) {
        throw new NotFoundException(`Category #${id} not found`);
      }
      return deletedCategory;
    } catch (error) {
      console.log('Ocurrió un error: ', error);
      throw new InternalServerErrorException(error);
    }
  }
}
